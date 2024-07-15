/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { StaticDataView, sizeOfBytes, EMPTY_UINT32_ARRAY } from '../data-view.js';
import { nextPow2 } from './reverse-index.js';

const EMPTY_BUCKET: number = Number.MAX_SAFE_INTEGER >>> 0;

/**
 * This is a simpler version of reverse-index data structure which implements
 * a simple Map-like class, backed by compact typed arrays. This means that
 * the structure can be serialized to a typed array very quickly and loaded
 * back instantly.
 */
export class CompactMap<T> {
  public static deserialize<T>(
    buffer: StaticDataView,
    deserialize: (view: StaticDataView) => T,
  ): CompactMap<T> {
    const tokensLookupIndexSize = buffer.getUint32();
    const bucketsIndexSize = buffer.getUint32();
    const numberOfValues = buffer.getUint32();

    // Alignement to 4 bytes is important here since `view` (Uint8Array) can
    // appear at any offset of `buffer`. But to be sure we can read back
    // Uint32Array directly from raw buffer, the alignement has to be a
    // multiple of 4. The same alignement is taken care of in `serialize`.
    const view = StaticDataView.fromUint8Array(buffer.getBytes(true /* align */), {
      enableCompression: false,
    });
    const tokensLookupIndex = view.getUint32ArrayView(tokensLookupIndexSize);
    const bucketsIndex = view.getUint32ArrayView(bucketsIndexSize);
    const valuesIndexStart = view.pos;
    view.seekZero(); // not strictly needed but make sure reverse index can be compared with deep equal

    return new CompactMap({
      deserialize,
      // Left empty on purpose since we don't need these to deserialize (all
      // the data is already in the serialized data).
      values: [],
      getKeys: () => [],
      getSerializedSize: () => 0,
      serialize: () => {
        /* Empty */
      },
    }).updateInternals({
      bucketsIndex,
      valuesIndexStart,
      numberOfValues,
      tokensLookupIndex,
      view,
    });
  }

  // In-memory cache used to keep track of metadata which has already been
  // loaded from the compact representation (i.e.: this.view). It is not
  // strictly necessary but will speed-up retrival of popular patterns
  // (since we do not have to perform the lookup again).
  private readonly cache: Map<number, T[]> = new Map();

  private bucketsIndex: Uint32Array = EMPTY_UINT32_ARRAY;
  private tokensLookupIndex: Uint32Array = EMPTY_UINT32_ARRAY;
  private valuesIndexStart: number = 0;
  private numberOfValues: number = 0;
  private view: StaticDataView;

  private readonly deserializeValue: (view: StaticDataView) => T;

  constructor({
    serialize,
    deserialize,
    getKeys,
    getSerializedSize,
    values,
  }: {
    serialize: (value: T, view: StaticDataView) => void;
    deserialize: (view: StaticDataView) => T;
    getKeys: (value: T) => number[];
    getSerializedSize: (value: T) => number;
    values: T[];
  }) {
    this.view = StaticDataView.empty({ enableCompression: false });

    this.deserializeValue = deserialize;

    if (values.length !== 0) {
      const patternsKeys: number[][] = [];

      // Keep track of the final size of the buckets index. `bucketsIndexSize`
      // is the number of indexed values, multiplied by 2 (since we store both
      // the `key` a value is indexed with and the index of the value itself).
      let bucketsIndexSize = 0;

      // Create a list of all values which will be part of the map. This means
      // computing an estimation of the buffer size needed to store this index.
      let estimatedBufferSize = 0;
      for (const value of values) {
        estimatedBufferSize += getSerializedSize(value);
      }

      // No values given; reset to empty index and abort.
      if (values.length === 0) {
        this.updateInternals({
          bucketsIndex: EMPTY_UINT32_ARRAY,
          valuesIndexStart: 0,
          numberOfValues: 0,
          tokensLookupIndex: EMPTY_UINT32_ARRAY,
          view: StaticDataView.empty({ enableCompression: false }),
        });
        return;
      }

      for (const value of values) {
        // Get keys from `value` and store the result in `patternsKeys` which
        // will be used in the next step to select the best key for each value.
        const keys = getKeys(value);
        patternsKeys.push(keys);
        bucketsIndexSize += 2 * keys.length; // key + value index
      }

      // Add size of bucketsIndex to total size (x4 because these are 32 bits numbers)
      estimatedBufferSize += bucketsIndexSize * 4;

      // Prepare "tokens index" (see documentation in constructor of `ReverseIndex` class).
      const tokensLookupIndexSize: number = Math.max(2, nextPow2(values.length));
      const mask: number = tokensLookupIndexSize - 1;
      const suffixes: [number, number][][] = [];
      for (let i = 0; i < tokensLookupIndexSize; i += 1) {
        suffixes.push([]);
      }

      // Add size of tokensLookupIndex to total size (x4 because these are 32 bits numbers)
      estimatedBufferSize += tokensLookupIndexSize * 4;

      // At this point we know the number of bytes needed for the compact
      // representation of this map ("tokens index" + "buckets index" +
      // "values index"). We allocate it at once and proceed with populating it.
      const buffer = StaticDataView.allocate(estimatedBufferSize, { enableCompression: false });
      const tokensLookupIndex = buffer.getUint32ArrayView(tokensLookupIndexSize);
      const bucketsIndex = buffer.getUint32ArrayView(bucketsIndexSize);
      const valuesIndexStart = buffer.getPos();

      // For each value, find the best token (least seen) based on histogram.
      // Since we are iterating again on the values, we populate "values index"
      // in the same loop and keep track of their indices so that we can later
      // populate "buckets index".
      for (let i = 0; i < patternsKeys.length; i += 1) {
        const value: T = values[i];
        const keys: number[] = patternsKeys[i];

        // Serialize this value and keep track of its index in the byte array;
        // it will be used in "buckets index" to point to this value.
        const valueIndex = buffer.pos;
        serialize(value, buffer);

        for (const key of keys) {
          // `key & mask` represents the N last bits of `key`. We group all
          // values indexed with the same `key` sharing the same N bits.
          suffixes[key & mask].push([key, valueIndex]);
        }
      }

      // Populate "tokens index" and "buckets index" based on keys for each value.
      let indexInBucketsIndex = 0;
      for (let i = 0; i < tokensLookupIndexSize; i += 1) {
        const valuesForMask: [number, number][] = suffixes[i];
        tokensLookupIndex[i] = indexInBucketsIndex;
        for (const [token, valueIndex] of valuesForMask) {
          bucketsIndex[indexInBucketsIndex++] = token;
          bucketsIndex[indexInBucketsIndex++] = valueIndex;
        }
      }

      // Update internals
      this.updateInternals({
        bucketsIndex,
        valuesIndexStart,
        numberOfValues: patternsKeys.length,
        tokensLookupIndex,
        view: buffer,
      });
    }
  }

  private updateInternals({
    bucketsIndex,
    valuesIndexStart,
    numberOfValues,
    tokensLookupIndex,
    view,
  }: {
    bucketsIndex: Uint32Array;
    valuesIndexStart: number;
    numberOfValues: number;
    tokensLookupIndex: Uint32Array;
    view: StaticDataView;
  }): CompactMap<T> {
    this.bucketsIndex = bucketsIndex;
    this.valuesIndexStart = valuesIndexStart;
    this.numberOfValues = numberOfValues;
    this.tokensLookupIndex = tokensLookupIndex;
    this.view = view;
    view.seekZero();
    return this;
  }

  public getValues(): T[] {
    const values: T[] = [];

    if (this.numberOfValues === 0) {
      return values;
    }

    // set view cursor at the start of "values index"
    this.view.setPos(this.valuesIndexStart);

    for (let i = 0; i < this.numberOfValues; i += 1) {
      values.push(this.deserializeValue(this.view));
    }

    this.view.seekZero();

    return values;
  }

  /**
   * Estimate the number of bytes needed to serialize this instance of `Map`.
   */
  public getSerializedSize(): number {
    // 12 = 4 bytes (tokensLookupIndex.length) + 4 bytes (bucketsIndex.length) + 4 bytes (numberOfValues)
    return 12 + sizeOfBytes(this.view.buffer, true /* align */);
  }

  /**
   * Dump this index to `buffer`.
   */
  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32(this.tokensLookupIndex.length);
    buffer.pushUint32(this.bucketsIndex.length);
    buffer.pushUint32(this.numberOfValues);

    // Aligmenent is crucial here, see comment in `deserialize` for more info.
    buffer.pushBytes(this.view.buffer, true /* align */);
  }

  public get(key: number): T[] {
    const cachedValues = this.cache.get(key);
    if (cachedValues !== undefined) {
      return cachedValues;
    }

    const offset = key & (this.tokensLookupIndex.length - 1);
    const startOfBucket = this.tokensLookupIndex[offset];

    // We do not have any values for this token
    if (startOfBucket === EMPTY_BUCKET) {
      return [];
    }

    // Since we do not store explicitly the number of values in each
    // "bucket", we check the index of the next one and use it to infer the
    // number of values (each value being stored as a token + index to the
    // "values store")
    const endOfBucket =
      offset === this.tokensLookupIndex.length - 1
        ? this.bucketsIndex.length
        : this.tokensLookupIndex[offset + 1];

    // Get indices of values indexed with `token`, if any.
    const valuesIndices: number[] = [];
    for (let i = startOfBucket; i < endOfBucket; i += 2) {
      const currentToken = this.bucketsIndex[i];
      if (currentToken === key) {
        valuesIndices.push(this.bucketsIndex[i + 1]);
      }
    }

    // No value indexed with `token`.
    if (valuesIndices.length === 0) {
      return []; // continue looking for a match
    }

    // If we have values for `token` then deserialize values in memory and
    // create a `Bucket` instance to hold them for future access.
    const values: T[] = [];
    const view = this.view;
    for (let i = 0; i < valuesIndices.length; i += 1) {
      view.setPos(valuesIndices[i]);
      values.push(this.deserializeValue(view));
    }

    this.cache.set(key, values);
    return values;
  }
}
