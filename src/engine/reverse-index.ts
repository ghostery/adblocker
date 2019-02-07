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
interface Bucket<T extends IFilter> {
  readonly filters: T[];
  lastRequestSeen: number;
}

const EMPTY_BUCKET = Number.MAX_SAFE_INTEGER >>> 0;
const EMPTY_UINT32_ARRAY = new Uint32Array(0);

/**
 * The ReverseIndex is an accelerating data structure which allows finding a
 * subset of the filters given a list of token seen in a URL. It is the core of
 * the adblocker's matching capabilities.
 *
 * It has mainly two caracteristics:
 * 1. It should be very compact and be able to load fast.
 * 2. It should be *very fast*.
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
    optimize: (filters: T[]) => T[] = noopOptimize,
  ): ReverseIndex<T> {
    const tokensLookupIndexSize = buffer.getUint32();
    const tokensLookupIndexStart = buffer.getUint32();
    const bucketsIndexSize = buffer.getUint32();

    // Alignement to 4 bytes is important here since `view` (Uint8Array) can
    // appear at any offset of `buffer`. But to be sure we can read back
    // Uint32Array directly from raw buffer, the alignement has to be a multiple
    // of 4. The same alignement is taken care of in `serialize`.
    buffer.align(4);
    const view = StaticDataView.fromUint8Array(buffer.getBytes());

    // Read Uint32Array views on top of byte array for fast access.
    view.setPos(tokensLookupIndexStart);
    const tokensLookupIndex = view.getUint32ArrayView(tokensLookupIndexSize);
    const bucketsIndex = view.getUint32ArrayView(bucketsIndexSize);
    view.seekZero();

    return new ReverseIndex<T>({
      deserialize,
      optimize,

      // Packed internal representation
      bucketsIndex,
      tokensLookupIndex,
      view,
    });
  }

  // Attributes used as fast-access *views* on top of the typed array. They
  // share the same internal buffer as `view`.
  private bucketsIndex: Uint32Array;
  private tokensLookupIndex: Uint32Array;

  // Compact representation. All the data for this reverse index is stored in
  // this Uint8Array. This is both very compact and allows to serialize and
  // deserialize at the speed of light.
  private view: StaticDataView;

  // Because this index can store different kinds of filters (e.g. NetworkFilter
  // and CosmeticFilter) we need to specify a function used to load them back
  // from their serialization form at matching time. This function takes a data
  // view with `pos` at the righ offset (start of a filter) and returns an
  // instance of the filter itself which will be used for matching.
  private deserializeFilter: (view: StaticDataView) => T;

  // Optionally, filters in a given bucket can be "optimized" when loaded in
  // memory from the view. Optimizations aim at making sub-sequent matching more
  // efficient; for example by reducing the number of filters.
  private readonly optimize: (filters: T[]) => T[];

  // In-memory cache used to keep track of buckets which have been loaded from
  // the compact representation (i.e.: this.view). It is not strictly necessary
  // but will speed-up retrival of popular filters.
  private cache: Map<number, Bucket<T>>;

  constructor({
    deserialize,
    filters = [],
    optimize = noopOptimize,

    // These arguments are only used while initializing the reverse index from
    // its serialized representation. By default they are initialized such as
    // the index is empty (no filter).
    bucketsIndex,
    tokensLookupIndex,
    view,
  }: {
    deserialize: (view: StaticDataView) => T;
    filters?: T[];
    optimize?: (filters: T[]) => T[];

    // This section contains arguments which are used while initializing a
    // reverse index from its compact form (e.g.: after serialization)
    bucketsIndex?: Uint32Array;
    tokensLookupIndex?: Uint32Array;

    bucketsIndexSize?: number;
    tokensLookupIndexSize?: number;
    view?: StaticDataView;
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
    // Optionaly initialize the index with given filters.
    this.bucketsIndex = bucketsIndex || EMPTY_UINT32_ARRAY;
    this.tokensLookupIndex = tokensLookupIndex || EMPTY_UINT32_ARRAY;
    this.view = view || StaticDataView.empty();

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

    for (let i = 0; i < this.bucketsIndex.length; i += 2) {
      tokens.add(this.bucketsIndex[i]);
    }

    return new Uint32Array(tokens);
  }

  /**
   * Dump this index to `buffer`.
   */
  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32(this.tokensLookupIndex.length);
    buffer.pushUint32(this.tokensLookupIndex.byteOffset);
    buffer.pushUint32(this.bucketsIndex.length);

    // Aligmenent is crucial here, see comment in `deserialize` for more info.
    buffer.align(4);
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
      this.bucketsIndex = EMPTY_UINT32_ARRAY;
      this.tokensLookupIndex = EMPTY_UINT32_ARRAY;
      this.view = StaticDataView.empty();
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
    for (let i = 0; i < tokensLookupIndexSize; i += 1) {
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

    // Keep track of the final size of the buckets index
    let bucketsIndexSize = 0;

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
        bucketsIndexSize += 2;
        prefixes[bestToken & mask].push({
          index: filterIndex,
          token: bestToken,
        });
      }
    }

    // We finished dumping all the filters so now starts the buckets index section
    const tokensLookupIndexStart = buffer.getPos();
    const tokensLookupIndex = buffer.getUint32ArrayView(tokensLookupIndexSize);
    const bucketsIndex = buffer.getUint32ArrayView(bucketsIndexSize);
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

    this.view = StaticDataView.fromUint8Array(buffer.slice());
    this.cache = new Map();

    // Also keep Uint32Array views sharing the same buffer as `this.view` (only
    // needed for faster access while matching but does not need to be serialized).
    // NOTE: it's important that these indices point to `this.view` and not
    // `buffer`, otherwise we will be leaking memory.
    this.view.setPos(tokensLookupIndexStart);
    this.tokensLookupIndex = this.view.getUint32ArrayView(tokensLookupIndexSize);
    this.bucketsIndex = this.view.getUint32ArrayView(bucketsIndexSize);
    this.view.seekZero();
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
      // number of filters (each filter being stored as a 32bits token + 32bits
      // index to the "filters store")
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
