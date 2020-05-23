/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Config from '../config';
import { StaticDataView, EMPTY_UINT32_ARRAY, sizeOfBytes } from '../data-view';
import IFilter from '../filters/interface';

// https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
function nextPow2(v: number): number {
  v--;
  v |= v >> 1;
  v |= v >> 2;
  v |= v >> 4;
  v |= v >> 8;
  v |= v >> 16;
  v++;
  return v;
}

/**
 * Generate unique IDs for requests, which is used to avoid matching the same
 * buckets multiple times on the same request (which can happen if a token
 * appears more than once in a URL).
 */
let UID = 1;
function getNextId(): number {
  const id = UID;
  UID = (UID + 1) % 1000000000;
  return id;
}

/**
 * List of filters being indexed using the same token in the index.
 */
interface Bucket<T extends IFilter> {
  readonly filters: T[];
  lastRequestSeen: number;
}

const EMPTY_BUCKET: number = Number.MAX_SAFE_INTEGER >>> 0;

/**
 * The ReverseIndex is an accelerating data structure which allows finding a
 * subset of the filters given a list of tokens seen in a URL. It is the core
 * of the adblocker's matching capabilities and speed.
 *
 * It has mainly two caracteristics:
 * 1. It is very compact and is able to load fast.
 * 2. It is *very fast* in finding potential candidates.
 *
 * Conceptually, the reverse index dispatches filters in "buckets" (an array of
 * one or more filters). Filters living in the same bucket are guaranteed to
 * share at least one of their tokens (appearing in the pattern). For example:
 *
 *   - Bucket 1 (ads):
 *       - /ads.js
 *       - /script/ads/tracking.js
 *       - /ads/
 *   - Bucket 2 (tracking)
 *       - /tracking.js
 *       - ||tracking.com/cdn
 *
 * We see that filters in "Bucket 1" are indexed using the token "ads" and
 * "Bucket 2" using token "tracking".
 *
 * This property allows to quickly discard most of the filters when we match a
 * URL. To achieve this, the URL is tokenized in the same way filters are
 * tokenized and for each token, we check if there are some filters available.
 *
 * For example:
 *
 *  URL "https://tracking.com/" has the following tokens: "https", "tracking"
 *  and "com". We immediatly see that we only check the two filters in the
 *  "tracking" bucket since they are the only ones having a common token with
 *  the URL.
 *
 * How do we pick the token for each filter?
 * =========================================
 *
 * Each filter is only indexed *once*, which means that we need to pick one of
 * the tokens appearing in the pattern. We choose the token such that each
 * filter is indexed using the token which was the *least seen* globally. In
 * other words, we pick the most discriminative token for each filter. This is
 * done using the following algorithm:
 *   1. Tokenize all the filters which will be stored in the index
 *   2. Compute a histogram of frequency of each token (globally)
 *   3. Select the best token for each filter (lowest frequency)
 */
export default class ReverseIndex<T extends IFilter> {
  public static deserialize<T extends IFilter>(
    buffer: StaticDataView,
    deserialize: (view: StaticDataView) => T,
    optimize: (filters: T[]) => T[],
    config: Config,
  ): ReverseIndex<T> {
    const tokensLookupIndexSize = buffer.getUint32();
    const bucketsIndexSize = buffer.getUint32();
    const numberOfFilters = buffer.getUint32();

    // Alignement to 4 bytes is important here since `view` (Uint8Array) can
    // appear at any offset of `buffer`. But to be sure we can read back
    // Uint32Array directly from raw buffer, the alignement has to be a
    // multiple of 4. The same alignement is taken care of in `serialize`.
    const view = StaticDataView.fromUint8Array(buffer.getBytes(true /* align */), config);
    const tokensLookupIndex = view.getUint32ArrayView(tokensLookupIndexSize);
    const bucketsIndex = view.getUint32ArrayView(bucketsIndexSize);
    const filtersIndexStart = view.pos;
    view.seekZero(); // not strictly needed but make sure reverse index can be compared with deep equal

    return (new ReverseIndex({
      config,
      deserialize,
      filters: [],
      optimize,
    })).updateInternals({
      bucketsIndex,
      filtersIndexStart,
      numberOfFilters,
      tokensLookupIndex,
      view,
    });
  }

  // Internal, compact representation of the reverse index. It contains three
  // distinct parts stored in the same typed array:
  //
  // 1. "tokens lookup index" allows to identify a sub-set of buckets which
  // likely contain filters for a given token. It is an approximate dispatch
  // table which maps a mask of N bits (N being smaller than 31 bits, the size
  // of a token) to a list of buckets having a 'token' sharing these same N
  // bits sub-set. If the binary representation of the token for bucket1 is
  // 101010 and suffix has size 3, then we would lookup the "tokens lookup
  // index" using the last 3 bits "010" which would give us the offset in our
  // typed array where we can start reading the filters of buckets having a
  // token ending with the same 3 bits. The value of N is always a power of 2
  // depending on the total number of filters stored in the index; determined
  // at the time `update(...)` is called.
  //
  // 2. "buckets index" is an array which associates tokens to filters. The
  // structure is: token, filter, token, filter, etc. To identify all the
  // filters indexed with 'token' a naive approach would be to iterate on
  // "buckets index" and collect all the filters indexed with 'token'. This
  // would be *very inefficient*! To make this process faster, filters in
  // "buckets index" are grouped so that buckets sharing the same suffix of N
  // bits in their indexing token (see "tokens lookup index") are stored side
  // by side in the typed array. To know where this section start given a
  // particular token, we use "tokens lookup index" which associated the suffix
  // of size N to an index in "buckets index". From there we can iterate on the
  // candidates.
  //
  // 3. "filters index" contains the filters themselves. "buckets index"
  // presented earlier does not contain filters, but an index to the "filters
  // index". This allows a filter to be indexed multiple times without
  // introducing any overhead; the filter can be associated with multiple
  // tokens in "buckets index" (each pointing to the same place in "filters
  // index") but its actual representation is stored only once in "filters
  // index".

  private bucketsIndex: Uint32Array = EMPTY_UINT32_ARRAY;
  private filtersIndexStart: number = 0;
  private numberOfFilters: number = 0;
  private tokensLookupIndex: Uint32Array = EMPTY_UINT32_ARRAY;
  private view: StaticDataView;

  // In-memory cache used to keep track of buckets which have been loaded from
  // the compact representation (i.e.: this.view). It is not strictly necessary
  // but will speed-up retrival of popular filters (since we do not have to
  // perform the lookup in "tokens index" and "buckets index" everytime).
  private readonly cache: Map<number, Bucket<T>> = new Map();

  // Function used to load a filter (e.g.: CosmeticFilter or NetworkFilter)
  // from its compact representation in the "filters index" section of the
  // typed array. Each filter exposes a `serialize(...)` method which is used
  // to store it in `this.view` (section "filters index"). While matching we
  // need to retrieve the instance of the filter to perform matching and use
  // `this.deserializeFilter(...)` to do so.
  private readonly deserializeFilter: (view: StaticDataView) => T;

  // Optional function which will be used to optimize a list of filters
  // in-memory. Typically this is used while matching when a list of filters is
  // loaded in memory and stored in `this.cache`. Before using the bucket, we
  // call `this.optimize(...)` on the list of filters to allow some
  // optimizations to be performed (e.g.: fusion of similar filters, etc.).
  // Have a look into `./src/engine/optimizer.ts` for examples of such
  // optimizations.
  private readonly optimize: (filters: T[]) => T[];
  private readonly config: Readonly<Config>;

  constructor({
    deserialize,
    filters,
    optimize,
    config,
  }: {
    deserialize: (view: StaticDataView) => T;
    filters: T[];
    optimize: (filters: T[]) => T[];
    config: Config;
  }) {
    this.view = StaticDataView.empty(config);
    this.deserializeFilter = deserialize;
    this.optimize = optimize;
    this.config = config;

    if (filters.length !== 0) {
      this.update(filters, undefined);
    }
  }

  /**
   * Load all filters from this index in memory (i.e.: deserialize them from
   * the byte array into NetworkFilter or CosmeticFilter instances). This is
   * mostly useful for debugging or testing purposes.
   */
  public getFilters(): T[] {
    const filters: T[] = [];

    if (this.numberOfFilters === 0) {
      return filters;
    }

    // set view cursor at the start of "filters index"
    this.view.setPos(this.filtersIndexStart);

    for (let i = 0; i < this.numberOfFilters; i += 1) {
      filters.push(this.deserializeFilter(this.view));
    }

    return filters;
  }

  /**
   * Return an array of all the tokens currently used as keys of the "buckets index".
   */
  public getTokens(): Uint32Array {
    const tokens: Set<number> = new Set();

    for (let i = 0; i < this.bucketsIndex.length; i += 2) {
      tokens.add(this.bucketsIndex[i]);
    }

    return new Uint32Array(tokens);
  }

  /**
   * Estimate the number of bytes needed to serialize this instance of `ReverseIndex`.
   */
  public getSerializedSize(): number {
    // 12 = 4 bytes (tokensLookupIndex.length) + 4 bytes (bucketsIndex.length) + 4 bytes (numberOfFilters)
    return 12 + sizeOfBytes(this.view.buffer, true /* align */);
  }

  /**
   * Dump this index to `buffer`.
   */
  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32(this.tokensLookupIndex.length);
    buffer.pushUint32(this.bucketsIndex.length);
    buffer.pushUint32(this.numberOfFilters);

    // Aligmenent is crucial here, see comment in `deserialize` for more info.
    buffer.pushBytes(this.view.buffer, true /* align */);
  }

  /**
   * Iterate on all filters found in buckets associated with the given list of
   * tokens. The callback is called on each of them. Early termination can be
   * achieved if the callback returns `false`.
   *
   * This will not check if each filter returned would match a given request but
   * is instead used as a list of potential candidates (much smaller than the
   * total set of filters; typically between 5 and 10 filters will be checked).
   */
  public iterMatchingFilters(tokens: Uint32Array, cb: (f: T) => boolean): void {
    // Each request is assigned an ID so that we can keep track of the last
    // request seen by each bucket in the reverse index. This provides a cheap
    // way to prevent filters from being inspected more than once per request
    // (which could happen if the same token appears more than once in the URL).
    const requestId = getNextId();

    for (let i = 0; i < tokens.length; i += 1) {
      if (this.iterBucket(tokens[i], requestId, cb) === false) {
        return;
      }
    }

    // Fallback to 0 (i.e.: wildcard bucket) bucket if nothing was found before.
    this.iterBucket(0, requestId, cb);
  }

  /**
   * Re-create the internal data-structure of the reverse index *in-place*. It
   * needs to be called with a list of new filters and optionally a list of ids
   * (as returned by either NetworkFilter.getId() or CosmeticFilter.getId())
   * which need to be removed from the index.
   */
  public update(newFilters: T[], removedFilters: Set<number> | undefined): void {
    // Reset internal cache on each update
    if (this.cache.size !== 0) {
      this.cache.clear();
    }

    const compression = this.config.enableCompression;
    let totalNumberOfTokens = 0;
    let totalNumberOfIndexedFilters = 0;
    const filtersTokens: Uint32Array[][] = [];

    // Keep track of the final size of the buckets index. `bucketsIndexSize` is
    // the number of indexed filters, multiplied by 2 (since we store both the
    // token a filter is indexed with and the index of the filter).
    let bucketsIndexSize = 0;

    // Re-use the current size of "filters index" as a starting point so that
    // we only need to update with new or removed filters. This saves time if
    // we perform a small update on an existing index.
    let estimatedBufferSize = this.view.buffer.byteLength - this.filtersIndexStart;

    // Create a list of all filters which will be part of the index. This means
    // loading existing filters, removing the ones that need to be deleted and
    // adding the new ones.  At the same time, we update the estimation of
    // buffer size needed to store this index.
    let filters: T[] = this.getFilters();
    if (filters.length !== 0) {
      // If there is at least one existing filter, then we check if some should
      // be removed. We subtract their size from the total estimated buffer
      // size.
      if (removedFilters !== undefined && removedFilters.size !== 0) {
        filters = filters.filter((f) => {
          if (removedFilters.has(f.getId())) {
            estimatedBufferSize -= f.getSerializedSize(compression);
            return false;
          }

          return true;
        });
      }

      // Add new filters to the list and also update estimated size
      for (let i = 0; i < newFilters.length; i += 1) {
        const filter = newFilters[i];
        estimatedBufferSize += filter.getSerializedSize(compression);
        filters.push(filter);
      }
    } else {
      // In the case where there is no existing filter in the index (happens on
      // initialization), then we can take a fast-path and not check removed
      // filters at all. There is also no need to copy the array of filters.
      filters = newFilters;
      for (let i = 0; i < newFilters.length; i += 1) {
        estimatedBufferSize += newFilters[i].getSerializedSize(compression);
      }
    }

    // No filters given; reset to empty index and abort.
    if (filters.length === 0) {
      this.updateInternals({
        bucketsIndex: EMPTY_UINT32_ARRAY,
        filtersIndexStart: 0,
        numberOfFilters: 0,
        tokensLookupIndex: EMPTY_UINT32_ARRAY,
        view: StaticDataView.empty(this.config),
      });
      return;
    }

    // When we run in `debug` mode, we enable fully deterministic updates of
    // internal data-structures. To this effect, we sort all filters before
    // insertion.
    if (this.config.debug === true) {
      filters.sort((f1: T, f2: T): number => f1.getId() - f2.getId());
    }

    const histogram = new Uint32Array(Math.max(nextPow2(2 * filters.length), 256));

    // Tokenize all filters stored in this index. And compute a histogram of
    // tokens so that we can decide how to index each filter efficiently.
    for (let i = 0; i < filters.length; i += 1) {
      const filter = filters[i];

      // Tokenize `filter` and store the result in `filtersTokens` which will
      // be used in the next step to select the best token for each filter.
      const multiTokens = filter.getTokens();
      filtersTokens.push(multiTokens);

      // Update estimated size of "buckets index" based on number of times this
      // particular filter will be indexed.
      bucketsIndexSize += 2 * multiTokens.length; // token + filter index
      totalNumberOfIndexedFilters += multiTokens.length;

      // Each filter can be indexed more than once, so `getTokens(...)` returns
      // multiple sets of tokens. We iterate on all of them and update the
      // histogram for each.
      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens = multiTokens[j];
        totalNumberOfTokens += tokens.length;
        for (let k = 0; k < tokens.length; k += 1) {
          histogram[tokens[k] % histogram.length] += 1;
        }
      }
    }

    // Add size of bucketsIndex to total size (x4 because these are 32 bits numbers)
    estimatedBufferSize += bucketsIndexSize * 4;

    // Prepare "tokens index" (see documentation in constructor of `ReverseIndex` class above).
    const tokensLookupIndexSize: number = Math.max(2, nextPow2(totalNumberOfIndexedFilters));
    const mask: number = tokensLookupIndexSize - 1;
    const suffixes: [number, number][][] = [];
    for (let i = 0; i < tokensLookupIndexSize; i += 1) {
      suffixes.push([]);
    }

    // Add size of tokensLookupIndex to total size (x4 because these are 32 bits numbers)
    estimatedBufferSize += tokensLookupIndexSize * 4;

    // At this point we know the number of bytes needed for the compact
    // representation of this reverse index ("tokens index" + "buckets index" +
    // "filters index"). We allocate it at once and proceed with populating it.
    const buffer = StaticDataView.allocate(estimatedBufferSize, this.config);
    const tokensLookupIndex = buffer.getUint32ArrayView(tokensLookupIndexSize);
    const bucketsIndex = buffer.getUint32ArrayView(bucketsIndexSize);
    const filtersIndexStart = buffer.getPos();

    // For each filter, find the best token (least seen) based on histogram.
    // Since we are iterating again on the filters, we populate "filters index"
    // in the same loop and keep track of their indices so that we can later
    // populate "buckets index".
    for (let i = 0; i < filtersTokens.length; i += 1) {
      const filter: T = filters[i];
      const multiTokens: Uint32Array[] = filtersTokens[i];

      // Serialize this filter and keep track of its index in the byte array;
      // it will be used in "buckets index" to point to this filter.
      const filterIndex = buffer.pos;
      filter.serialize(buffer);

      // Index the filter once per "tokens"
      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens: Uint32Array = multiTokens[j];

        // Find best token (least seen) from `tokens` using `histogram`.
        let bestToken: number = 0; // default = wildcard bucket
        let minCount: number = totalNumberOfTokens + 1;
        for (let k = 0; k < tokens.length; k += 1) {
          const tokenCount = histogram[tokens[k] % histogram.length];
          if (tokenCount < minCount) {
            minCount = tokenCount;
            bestToken = tokens[k];

            // Fast path, if the current token has only been seen once, we can
            // stop iterating since we will not find a better alternarive!
            if (minCount === 1) {
              break;
            }
          }
        }

        // `bestToken & mask` represents the N last bits of `bestToken`. We
        // group all filters indexed with a token sharing the same N bits.
        suffixes[bestToken & mask].push([bestToken, filterIndex]);
      }
    }

    // Populate "tokens index" and "buckets index" based on best token found for each filter.
    let indexInBucketsIndex = 0;
    for (let i = 0; i < tokensLookupIndexSize; i += 1) {
      const filtersForMask = suffixes[i];
      tokensLookupIndex[i] = indexInBucketsIndex;
      for (let j = 0; j < filtersForMask.length; j += 1) {
        bucketsIndex[indexInBucketsIndex++] = filtersForMask[j][0];
        bucketsIndex[indexInBucketsIndex++] = filtersForMask[j][1];
      }
    }

    // Update internals
    buffer.seekZero();
    this.updateInternals({
      bucketsIndex,
      filtersIndexStart,
      numberOfFilters: filtersTokens.length,
      tokensLookupIndex,
      view: buffer,
    });
  }

  private updateInternals({
    bucketsIndex,
    filtersIndexStart,
    numberOfFilters,
    tokensLookupIndex,
    view,
  }: {
    bucketsIndex: Uint32Array;
    filtersIndexStart: number;
    numberOfFilters: number;
    tokensLookupIndex: Uint32Array;
    view: StaticDataView;
  }): ReverseIndex<T> {
    this.bucketsIndex = bucketsIndex;
    this.filtersIndexStart = filtersIndexStart;
    this.numberOfFilters = numberOfFilters;
    this.tokensLookupIndex = tokensLookupIndex;
    this.view = view;
    return this;
  }

  /**
   * If a bucket exists for the given token, call the callback on each filter
   * found inside. An early termination mechanism is built-in, to stop iterating
   * as soon as `false` is returned from the callback.
   */
  private iterBucket(token: number, requestId: number, cb: (f: T) => boolean): boolean {
    let bucket: Bucket<T> | undefined = this.cache.get(token);

    // Lazily create bucket if it does not yet exist in memory. Lookup the
    // compact bucket representation and find all filters being associated with
    // `token`. Create a `Bucket` out of them and store them in cache.
    if (bucket === undefined) {
      const offset = token & (this.tokensLookupIndex.length - 1);
      const startOfBucket = this.tokensLookupIndex[offset];

      // We do not have any filters for this token
      if (startOfBucket === EMPTY_BUCKET) {
        return true;
      }

      // Since we do not store explicitly the number of filters in each
      // "bucket", we check the index of the next one and use it to infer the
      // number of filters (each filter being stored as a token + index to the
      // "filters store")
      const endOfBucket =
        offset === this.tokensLookupIndex.length - 1
          ? this.bucketsIndex.length
          : this.tokensLookupIndex[offset + 1];

      // Get indices of filters indexed with `token`, if any.
      const filtersIndices: number[] = [];
      for (let i = startOfBucket; i < endOfBucket; i += 2) {
        const currentToken = this.bucketsIndex[i];
        if (currentToken === token) {
          filtersIndices.push(this.bucketsIndex[i + 1]);
        }
      }

      // No filter indexed with `token`.
      if (filtersIndices.length === 0) {
        return true; // continue looking for a match
      }

      // If we have filters for `token` then deserialize filters in memory and
      // create a `Bucket` instance to hold them for future access.
      const filters: T[] = [];
      const view = this.view;
      for (let i = 0; i < filtersIndices.length; i += 1) {
        view.setPos(filtersIndices[i]);
        filters.push(this.deserializeFilter(view));
      }

      // Create new bucket with found filters (only optimize if we have more
      // than one filter).
      bucket = {
        filters: filters.length > 1 ? this.optimize(filters) : filters,
        lastRequestSeen: -1, // safe because all ids are positive
      };

      this.cache.set(token, bucket);
    }

    // Look for matching filter in this bucket
    if (bucket.lastRequestSeen !== requestId) {
      bucket.lastRequestSeen = requestId;
      const filters = bucket.filters;
      for (let i = 0; i < filters.length; i += 1) {
        // Break the loop if the callback returns `false`
        if (cb(filters[i]) === false) {
          // Whenever we get a match from a filter, we also swap it one
          // position up in the list. This way, over time, popular filters will
          // be first and might match earlier. This should decrease the time
          // needed to get a match.
          if (i > 0) {
            const filter = filters[i];
            filters[i] = filters[i - 1];
            filters[i - 1] = filter;
          }

          return false;
        }
      }
    }

    return true;
  }
}
