/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Config from '../config';
import StaticDataView, { EMPTY_UINT32_ARRAY } from '../data-view';
import IFilter from '../filters/interface';
import { fastHash } from '../utils';

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
 * Counter implemented on top of Map.
 */
class Counter<K> {
  private counter: Map<K, number>;

  constructor() {
    this.counter = new Map<K, number>();
  }

  public incr(key: K): void {
    this.counter.set(key, (this.counter.get(key) || 0) + 1);
  }

  public get(key: K): number {
    return this.counter.get(key) || 0;
  }

  public set(key: K, value: number): void {
    this.counter.set(key, value);
  }
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
 * subset of the filters given a list of token seen in a URL. It is the core of
 * the adblocker's matching capabilities.
 *
 * It has mainly two caracteristics:
 * 1. It should be very compact and be able to load fast.
 * 2. It should be *very fast* in finding potential candidates.
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
 * the tokens appearing in the pattern. We choose the token such has each filter
 * is indexed using the token which was the *least seen* globally. In other
 * words, we pick the most discriminative token for each filter. This is done
 * using the following algorithm:
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

  // Internal. Compact representation of the reverse index. It contains three distinct parts:
  //
  // 1. The list of all filters contained in this index, serialized
  // contiguously (one after the other) in the typed array starting at index
  // 0. This would look like: |f1|f2|f3|...|fn| Note that not all filters use
  // the same amount of memory (or number of bytes) so the only way to
  // navigate the compact representation at this point is to iterate through
  // all of them from first to last. Which is why we need a small "index" to
  // help us navigate this compact representation and leads us to the second
  // section of `this.view`.
  //
  // 2. buckets index which conceptually can be understood as a way to group
  // several buckets in the same neighborhood of the typed array. It could
  // look something like: |bucket1|bucket2|bucket3|...| each bucket could
  // contain multiple filters. In reality, for each section of this bucket
  // index, we know how many filters there are and the filters for multiple
  // buckets are interleaved. For example if the index starts with a section
  // containing |bucket1|bucket2|bucket3| and these bucket have tokens `tok1`,
  // `tok2` and `tok3` respectively, then the final representation in memory
  // could be: |tok1|f1|tok2|f2|tok1|f3|tok3|f4|tok2|f5| (where `f1`, `f2`,
  // etc. are indices to the serialized representation of each filter, in the
  // same array, described in 1. above).
  //
  // 3. The last part is called "tokens lookup index" and allows to locate the
  // bucket given a suffix of the indexing token. If the binary representation
  // of the token for bucket1 is 101010 and prefix has size 3, then we would
  // lookup the "tokens lookup index" using the last 3 bits "010" which would
  // give us the offset in our typed array where we can start reading the
  // filters of buckets having a token ending with the same 3 bits.
  // Optionaly initialize the index with given filters.
  private bucketsIndex: Uint32Array = EMPTY_UINT32_ARRAY;
  private filtersIndexStart: number = 0;
  private numberOfFilters: number = 0;
  private tokensLookupIndex: Uint32Array = EMPTY_UINT32_ARRAY;
  private view: StaticDataView;

  // In-memory cache used to keep track of buckets which have been loaded from
  // the compact representation (i.e.: this.view). It is not strictly necessary
  // but will speed-up retrival of popular filters.
  private readonly cache: Map<number, Bucket<T>> = new Map();

  // Because this index can store different kinds of filters (e.g. NetworkFilter
  // and CosmeticFilter) we need to specify a function used to load them back
  // from their serialization form at matching time. This function takes a data
  // view with `pos` at the righ offset (start of a filter) and returns an
  // instance of the filter itself which will be used for matching.
  private readonly deserializeFilter: (view: StaticDataView) => T;

  // Optionally, filters in a given bucket can be "optimized" when loaded in
  // memory from the view. Optimizations aim at making sub-sequent matching more
  // efficient; for example by reducing the number of filters.
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

    // Function used to load a filter (e.g.: CosmeticFilter or NetworkFilter)
    // from its compact representation. Each filter exposes a `serialize` method
    // which is used to store it in `this.view`. While matching we need to
    // retrieve the instance of the filter to perform matching and use
    // `this.deserializeFilter` to do so.
    this.deserializeFilter = deserialize;

    // Optional function which will be used to optimize a list of filters
    // in-memory. Typically this is used while matching when a list of filters
    // are loaded in memory and stored in `this.cache`. Before using the bucket,
    // we can `this.optimize` on the list of filters to allow some optimizations
    // to be performed (e.g.: fusion of similar filters, etc.). Have a look into
    // `./src/engine/optimizer.ts` for examples of such optimizations.
    this.optimize = optimize;
    this.config = config;

    if (filters.length !== 0) {
      this.update(filters, undefined);
    }
  }

  /**
   * Load all filters from this index in memory (i.e.: deserialize them from the
   * byte array into NetworkFilter or CosmeticFilter instances).
   */
  public getFilters(): T[] {
    const filters: T[] = [];

    if (this.numberOfFilters === 0) {
      return filters;
    }

    // set view cursor at the start of filters index
    this.view.setPos(this.filtersIndexStart);

    for (let i = 0; i < this.numberOfFilters; i += 1) {
      filters.push(this.deserializeFilter(this.view));
    }

    return filters;
  }

  /**
   * Return an array of all the tokens currently used as keys of the index.
   */
  public getTokens(): Uint32Array {
    const tokens: Set<number> = new Set();

    for (let i = 0; i < this.bucketsIndex.length; i += 2) {
      tokens.add(this.bucketsIndex[i]);
    }

    return new Uint32Array(tokens);
  }

  public getSerializedSize(): number {
    // 12 = 4 bytes (tokensLookupIndex.length) + 4 bytes (bucketsIndex.length) + 4 bytes (numberOfFilters)
    return 12 + StaticDataView.sizeOfBytes(this.view.buffer, true /* align */);
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
    const compression = this.config.enableCompression;
    this.cache.clear();

    let totalNumberOfTokens = 0;
    let totalNumberOfIndexedFilters = 0;
    const filtersTokens: Array<{ filter: T; multiTokens: Uint32Array[] }> = [];
    const histogram = new Counter<number>();

    // Keep track of the final size of the buckets index. `bucketsIndexSize` is
    // the number of indexed filters, multiplied by 2 (since we store both the
    // token a filter is indexed with and the index of the filter).
    let bucketsIndexSize = 0;
    let estimatedBufferSize = this.view.buffer.byteLength - this.filtersIndexStart;

    // Compute tokens for all filters (the ones already contained in the index
    // *plus* the new ones *minus* the ones removed).
    const existingFilters = this.getFilters();
    const shouldCheckRemovedFilters: boolean = (
      existingFilters.length !== 0 &&
      removedFilters !== undefined &&
      removedFilters.size !== 0
    );

    // Update estimated view size with new filters
    for (let i = 0; i < newFilters.length; i += 1) {
      estimatedBufferSize += newFilters[i].getSerializedSize(compression);
    }

    let filters = existingFilters;
    if (filters.length === 0) {
      // If the reverse index is currently empty, then `filters` is simply `newFilters`
      filters = newFilters;
    } else {
      for (let i = 0; i < newFilters.length; i += 1) {
        filters.push(newFilters[i]);
      }
    }

    // When we run in `debug` mode, we enable fully deterministic updates of
    // internal data-structure. To this effect, we sort all filters before
    // insertion.
    if (this.config.debug === true) {
      filters.sort((f1: T, f2: T): number => f1.getId() - f2.getId());
    }

    for (let i = 0; i < filters.length; i += 1) {
      const filter = filters[i];
      if (
        shouldCheckRemovedFilters === false ||
        (removedFilters !== undefined && removedFilters.has(filter.getId()) === false)
      ) {
        // Tokenize filter
        const multiTokens = filter.getTokens();
        filtersTokens.push({
          filter,
          multiTokens,
        });

        for (let j = 0; j < multiTokens.length; j += 1) {
          bucketsIndexSize += 2; // token + filter index

          // Update tokens histogram
          const tokens = multiTokens[j];
          totalNumberOfIndexedFilters += 1;
          totalNumberOfTokens += tokens.length;
          for (let k = 0; k < tokens.length; k += 1) {
            histogram.incr(tokens[k]);
          }
        }
      } else {
        // Filter was removed so we just remove its size from total needed size
        estimatedBufferSize -= filter.getSerializedSize(compression);
      }
    }

    // Add size of bucketsIndex to total size (* 4 because these are 32 bits numbers)
    estimatedBufferSize += bucketsIndexSize * 4;

    // No filters given; reset to empty bucket
    if (filtersTokens.length === 0) {
      this.updateInternals({
        bucketsIndex: EMPTY_UINT32_ARRAY,
        filtersIndexStart: 0,
        numberOfFilters: 0,
        tokensLookupIndex: EMPTY_UINT32_ARRAY,
        view: StaticDataView.empty(this.config),
      });
      return;
    }

    // Add an heavy weight on these common patterns because they appear in
    // almost all URLs. If there is a choice, then filters should use other
    // tokens than those.
    histogram.set(fastHash('http'), totalNumberOfTokens);
    histogram.set(fastHash('https'), totalNumberOfTokens);
    histogram.set(fastHash('www'), totalNumberOfTokens);
    histogram.set(fastHash('com'), totalNumberOfTokens);
    // TODO - consider adding more of these, check on requests dataset

    // Prepare `tokensLookupIndex`. This is an array where keys are suffixes of
    // N bits from tokens (the ones used to index filters in the index) and
    // values are indices to compact representation of buckets. Each bucket
    // contains a list of filters associated with a token with identical N bits
    // suffix. This allows to quickly identify the potential filters given a
    // query token.
    const tokensLookupIndexSize: number = Math.max(2, nextPow2(totalNumberOfIndexedFilters));
    const mask: number = tokensLookupIndexSize - 1;
    const prefixes: Array<Array<{ token: number; index: number }>> = [];
    for (let i = 0; i < tokensLookupIndexSize; i += 1) {
      prefixes.push([]);
    }

    // Add size of tokensLookupIndex to total size
    estimatedBufferSize += tokensLookupIndexSize * 4;

    // This byte array contains all the filters serialized consecutively.
    // Having them separately from the reverse index structure allows filters
    // to be indexed more than once while not paying extra storage cost.
    // `buffer` is a contiguous chunk of memory which will be used to store 3
    // kinds of data:
    // 1. The first section contains all the filters stored in the index
    // 2. The second section contains the compact buckets where filters having
    // their indexing token sharing the last N bits are grouped together.
    const buffer = StaticDataView.allocate(estimatedBufferSize, this.config);

    // Allocate views for tokens and buckets
    const tokensLookupIndex = buffer.getUint32ArrayView(tokensLookupIndexSize);
    const bucketsIndex = buffer.getUint32ArrayView(bucketsIndexSize);
    const filtersIndexStart = buffer.getPos();

    // For each filter, find the best token (least seen)
    for (let i = 0; i < filtersTokens.length; i += 1) {
      const filterTokens = filtersTokens[i];
      const filter: T = filterTokens.filter;
      const multiTokens: Uint32Array[] = filterTokens.multiTokens;

      // Serialize this filter and keep track of its index in the byte array
      const filterIndex = buffer.pos;
      filter.serialize(buffer);

      // Index the filter once per "tokens"
      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens: Uint32Array = multiTokens[j];

        // Find best token (least seen) from `tokens` using `histogram`.
        let bestToken: number = 0;
        let minCount: number = totalNumberOfTokens + 1;
        for (let k = 0; k < tokens.length; k += 1) {
          const tokenCount = histogram.get(tokens[k]);
          if (tokenCount < minCount) {
            minCount = tokenCount;
            bestToken = tokens[k];

            // Fast path, if the current token has only been seen once, we can
            // stop iterating since we will not find better!
            if (minCount === 1) {
              break;
            }
          }
        }

        // `bestToken & mask` represents the N last bits of `bestToken`. We
        // group all filters indexed with a token sharing the same N bits.
        prefixes[bestToken & mask].push({
          index: filterIndex,
          token: bestToken,
        });
      }
    }

    // Populate tokens and buckets indices
    let indexInBucketsIndex = 0;
    for (let i = 0; i < tokensLookupIndexSize; i += 1) {
      const filtersForMask = prefixes[i];
      tokensLookupIndex[i] = indexInBucketsIndex;
      for (let j = 0; j < filtersForMask.length; j += 1) {
        const { token, index } = filtersForMask[j];
        bucketsIndex[indexInBucketsIndex++] = token;
        bucketsIndex[indexInBucketsIndex++] = index;
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
      for (let i = 0; i < filtersIndices.length; i += 1) {
        this.view.setPos(filtersIndices[i]);
        filters.push(this.deserializeFilter(this.view));
      }

      // Create new bucket with found filters (only optimize if we have more
      // than one filter).
      bucket = {
        filters: filters.length > 1 ? this.optimize(filters) : filters,
        lastRequestSeen: 0,
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
