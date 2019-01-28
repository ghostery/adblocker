import StaticDataView from '../data-view';
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
 * Optimizer which returns the list of original filters.
 */
function noopOptimize<T>(filters: T[]): T[] {
  return filters;
}

/**
 * Generate unique IDs for requests, which is used to avoid matching the same
 * buckets multiple times on the same request (which can happen if a token
 * appears more than once in a URL).
 */
let UID = 1;
function getNextId() {
  const id = UID;
  UID = (UID + 1) % 1000000000;
  return id;
}

/**
 * List of filters being indexed using the same token in the index.
 */
class Bucket<T extends IFilter> {
  public readonly filters: T[];
  public lastRequestSeen: number;

  constructor(filters: T[] = []) {
    this.filters = filters;
    this.lastRequestSeen = 0;
  }
}

/**
 * The ReverseIndex is an accelerating data structure which allows finding a
 * subset of the filters given a list of token seen in a URL. It is the core of
 * the adblocker's matching capabilities.
 *
 * It has mainly two caracteristics:
 * 1. It should be very compact and be able to load fast.
 * 2. It should be very fast.
 *
 * Conceptually, the reverse index dispatches filters in "buckets" (an array of
 * one or more filters). Filters living in the same bucket are guaranteed to
 * share at least one of their token (appearing in the pattern). For example:
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
    optimize: (filters: T[]) => T[] = noopOptimize,
  ): ReverseIndex<T> {
    const reverseIndex = new ReverseIndex<T>({
      deserialize,
      optimize,
    });

    reverseIndex.tokensLookupIndexSize = buffer.getUint32();
    reverseIndex.tokensLookupIndexStart = buffer.getUint32();

    reverseIndex.view = StaticDataView.fromUint8Array(buffer.getBytes());

    return reverseIndex;
  }

  // Compact representation
  private tokensLookupIndexStart: number;
  private tokensLookupIndexSize: number;
  private view: StaticDataView;

  private deserializeFilter: (view: StaticDataView) => T;
  private readonly optimize: (filters: T[]) => T[];

  // In-memory cache used to keep track of buckets which have been loaded from
  // the compact representation (i.e.: this.view). It is not strictly necessary
  // but will speed-up retrival of popular filters.
  private cache: Map<number, Bucket<T>>;

  constructor({
    deserialize,
    filters = [],
    optimize = noopOptimize,
  }: {
    deserialize: (view: StaticDataView) => T;
    filters?: T[];
    optimize?: (filters: T[]) => T[];
  }) {
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

    // Cache deserialized buckets in memory for faster retrieval. It is a
    // mapping from token to `Bucket`.
    this.cache = new Map();

    // Compact representation of the reverse index (described at the top level
    // comment of this class). It contains three distinct parts:
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
    this.view = new StaticDataView(0);
    this.tokensLookupIndexSize = 0;
    this.tokensLookupIndexStart = 0;

    // Optionaly initialize the index with given filters.
    if (filters.length !== 0) {
      this.update(filters);
    }
  }

  /**
   * Load all filters from this index in memory (i.e.: deserialize them from the
   * byte array into NetworkFilter or CosmeticFilter instances).
   */
  public getFilters(): T[] {
    const view = this.view;
    view.seekZero();
    const numberOfFilters = view.getUint32();
    const filters: T[] = [];

    for (let i = 0; i < numberOfFilters; i += 1) {
      filters.push(this.deserializeFilter(view));
    }

    return filters;
  }

  /**
   * Return an array of all the tokens currently used as keys of the index.
   */
  public getTokens(): Uint32Array {
    const tokens: Set<number> = new Set();
    const view = this.view;

    for (let i = 0; i < this.tokensLookupIndexSize; i += 1) {
      view.setPos(this.tokensLookupIndexStart + 4 * i);
      const startOfBucket = view.getUint32();

      // We do not have any filters for this token
      if (startOfBucket !== Number.MAX_SAFE_INTEGER) {
        view.setPos(startOfBucket);

        const numberOfFilters = view.getByte();
        for (let j = 0; j < numberOfFilters; j += 1) {
          tokens.add(view.getUint32());
          view.pos += 4; // skip index of corresponding filter
        }
      }
    }

    return new Uint32Array(tokens);
  }

  /**
   * Dump this index to `buffer`.
   */
  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32(this.tokensLookupIndexSize);
    buffer.pushUint32(this.tokensLookupIndexStart);
    buffer.pushBytes(this.view.buffer);
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
  public update(newFilters: T[], removedFilters?: Set<number>): void {
    let totalNumberOfTokens = 0;
    let totalNumberOfIndexedFilters = 0;
    const filtersTokens: Array<{ filter: T; multiTokens: Uint32Array[] }> = [];
    const histogram = new Counter<number>();

    // Compute tokens for all filters (the ones already contained in the index
    // *plus* the new ones *minus* the ones removed ).
    [this.getFilters(), newFilters].forEach((filters) => {
      for (let i = 0; i < filters.length; i += 1) {
        const filter = filters[i];
        if (removedFilters === undefined || !removedFilters.has(filter.getId())) {
          const multiTokens = filter.getTokens();
          filtersTokens.push({
            filter,
            multiTokens,
          });

          for (let j = 0; j < multiTokens.length; j += 1) {
            const tokens = multiTokens[j];
            totalNumberOfIndexedFilters += 1;
            for (let k = 0; k < tokens.length; k += 1) {
              totalNumberOfTokens += 1;
              histogram.incr(tokens[k]);
            }
          }
        }
      }
    });

    // No filters given; reset to empty bucket
    if (filtersTokens.length === 0) {
      this.view = new StaticDataView(0);
      this.tokensLookupIndexSize = 0;
      this.tokensLookupIndexStart = 0;
      this.cache = new Map();
      return;
    }

    // Add an heavy weight on these common patterns because they appear in
    // almost all URLs. If there is a choice, then filters should use other
    // tokens than those.
    ['http', 'https', 'www', 'com'].forEach((badToken) => {
      histogram.set(fastHash(badToken), totalNumberOfTokens);
    });

    // Prepare tokensLookupIndex. This is an array where keys are suffixes of N
    // bits from tokens (the ones used to index filters in the index) and values
    // are indices to compact representation of buckets. Each bucket contains a
    // list of filters associated with a token with identical N bits suffix.
    // This allows to quickly identify the potential filters given a query
    // token.
    const tokensLookupIndexSize = Math.max(2, nextPow2(totalNumberOfIndexedFilters));
    const mask = tokensLookupIndexSize - 1;
    const prefixes: Array<Array<{ token: number; index: number }>> = [];
    for (let i = 0; i <= mask; i += 1) {
      prefixes.push([]);
    }

    // This byte array contains all the filters serialized consecutively. Having
    // them separately from the reverse index structure allows filters to be
    // indexed more than once while not paying extra storage cost.
    // `buffer` is a contiguous chunk of memory which will be used to store 3
    // kinds of data:
    // 1. The first section contains all the filters stored in the index
    // 2. The second section contains the compact buckets where filter having
    // their indexing token sharing the last N bits are grouped together.
    const buffer = new StaticDataView(6000000);
    buffer.pushUint32(filtersTokens.length);

    // For each filter, find the best token (least seen)
    for (let i = 0; i < filtersTokens.length; i += 1) {
      const { filter, multiTokens } = filtersTokens[i];

      // Serialize this filter and keep track of its index in the byte array
      const filterIndex = buffer.getPos();
      filter.serialize(buffer);

      // Index the filter once per "tokens"
      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens: Uint32Array = multiTokens[j];

        // Find best token (least seen) from `tokens` using `histogram`.
        let bestToken: number = 0;
        let minCount: number = totalNumberOfTokens + 1;
        for (let k = 0; k < tokens.length; k += 1) {
          const tokenCount = histogram.get(tokens[k]);
          if (tokenCount <= minCount) {
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

    // We finished dumping all the filters so now starts the buckets index section
    const tokensLookupIndex = new Uint32Array(tokensLookupIndexSize);
    const emptyBucket = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < tokensLookupIndexSize; i += 1) {
      const filtersForMask = prefixes[i];
      if (filtersForMask.length === 0) {
        tokensLookupIndex[mask] = emptyBucket;
      } else {
        tokensLookupIndex[i] = buffer.getPos();
        buffer.pushByte(filtersForMask.length);
        for (let j = 0; j < filtersForMask.length; j += 1) {
          const { token, index } = filtersForMask[j];
          buffer.pushUint32(token);
          buffer.pushUint32(index);
        }
      }
    }

    // Write lookupIndex in buffer. It will be used to locate the corresponding
    // bucket, in the same buffer.
    const tokensLookupIndexStart = buffer.getPos();
    for (let i = 0; i < tokensLookupIndexSize; i += 1) {
      buffer.pushUint32(tokensLookupIndex[i]);
    }

    this.cache = new Map();
    this.tokensLookupIndexStart = tokensLookupIndexStart;
    this.tokensLookupIndexSize = tokensLookupIndexSize;
    this.view = StaticDataView.fromUint8Array(buffer.slice());
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
      const offset = token & (this.tokensLookupIndexSize - 1);

      const view = this.view;
      view.setPos(this.tokensLookupIndexStart + 4 * offset);
      const startOfBucket = view.getUint32();

      // We do not have any filters for this token
      if (startOfBucket === Number.MAX_SAFE_INTEGER) {
        return true;
      }

      // Get indices of filters indexed with `token`, if any.
      view.setPos(startOfBucket);

      const numberOfFilters = view.getByte();
      const filtersIndices: number[] = [];
      for (let i = 0; i < numberOfFilters; i += 1) {
        const currentToken = view.getUint32();
        if (currentToken === token) {
          filtersIndices.push(view.getUint32());
        } else {
          view.pos += 4; // skip one 32bits number
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
        view.setPos(filtersIndices[i]);
        filters.push(this.deserializeFilter(view));
      }

      bucket = new Bucket(filters.length > 1 ? this.optimize(filters) : filters);
      this.cache.set(token, bucket);
    }

    // Look for matching filter in this bucket
    if (bucket !== undefined && bucket.lastRequestSeen !== requestId) {
      bucket.lastRequestSeen = requestId;
      const filters = bucket.filters;
      for (let i = 0; i < filters.length; i += 1) {
        // Break the loop if the callback returns `false`
        if (cb(filters[i]) === false) {
          // Whenever we get a match from a filter, we also swap it one position
          // up in the list. This way, over time, popular filters will be first
          // and might match earlier. This should decrease the time needed to
          // get a match.
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
