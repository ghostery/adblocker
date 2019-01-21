import StaticDataView from '../data-view';
import IFilter from '../filters/interface';
import { fastHash } from '../utils';

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

function noopOptimize<T>(filters: T[]): T[] {
  return filters;
}

let UID = 1;
function getNextId() {
  const id = UID;
  UID = (UID + 1) % 1000000000;
  return id;
}

export class Bucket<T extends IFilter> {
  public readonly filters: T[];
  public lastRequestSeen: number;

  constructor(filters: T[] = []) {
    this.filters = filters;
    this.lastRequestSeen = 0;
  }
}

// This global variable is used to optionally store a bit mask answering
// approximatly to the question: "do we *likely* have an entry for this token in
// the reverse index?". Because this is only approximate and we do not want to
// pay the cost of this for each instance of a ReverseIndex, it's stored
// globally and updated by all the indices.
// let TOKEN_MASK: Uint32Array | undefined;
// function getGlobalMask(): Uint32Array {
//   if (TOKEN_MASK === undefined) {
//     TOKEN_MASK = new Uint32Array(1000000);
//   }
//   return TOKEN_MASK;
// }

/**
 * Accelerating data structure based on a reverse token index. The creation of
 * the index follows the following algorithm:
 *   1. Tokenize each filter
 *   2. Compute a histogram of frequency of each token (globally)
 *   3. Select the best token for each filter (lowest frequency)
 *
 * By default, each filter is only indexed once, using its token having the
 * lowest global frequency. This is to minimize the size of buckets.
 *
 * The ReverseIndex can be extended in two ways to provide more advanced
 * features:
 *   1. It is possible to provide an `optimize` function, which takes as input
 *   a list of filters (typically the content of a bucket) and returns another
 *   list of filters (new content of the bucket), more compact/efficient. This
 *   allows to dynamically optimize the filters and make matching time and memory
 *   consumption lower. This optimization can be done ahead of time on all
 *   buckets, or dynamically when a bucket is 'hot' (hit several times).
 *
 *   Currently this is only available for network filters.
 *
 *   2. Insert a filter multiple times (with multiple keys). It is sometimes
 *   needed to insert the same filter at different keys. For this purpose
 *   `getTokens` should return a list of list of tokens, so that it can be
 *   inserted several times. If you want it to be inserted only once, then
 *   returning a list of only one list of tokens will do the trick.
 *
 *   For each set of tokens returned by the `getTokens` function, the filter
 *   will be inserted once. This is currently used only for hostname dispatch of
 *   cosmetic filters.
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

    reverseIndex.tokensLookupIndex = buffer.getUint32ArrayStrict();
    reverseIndex.filtersIndex = buffer.getBytes();

    return reverseIndex;
  }

  private tokensLookupIndex: Uint32Array;
  private filtersIndex: Uint8Array;
  private cache: Map<number, Bucket<T>>;
  private deserializeFilter: (view: StaticDataView) => T;

  private readonly optimize: (filters: T[]) => T[];

  constructor({
    deserialize,
    filters = [],
    optimize = noopOptimize,
  }: {
    deserialize: (view: StaticDataView) => T;
    filters?: T[];
    optimize?: (filters: T[]) => T[];
  }) {
    // Expected number of filters in this index.
    this.deserializeFilter = deserialize;

    // First index: keys are a suffix of `token` and values are indices pointing
    // to the start of filters for buckets having this token. By checking the
    // value of the next index
    this.tokensLookupIndex = new Uint32Array(0);

    // This array contains all the filters instances, serialized. Each filter is
    // prefixed by the token of its bucket:
    //
    // |tok1|filter1|tok2|filter2|tok2|filter2|...
    //
    // To navigate this compact representation, `tokensLookupIndex` is needed;
    // it allows to jump to sections of this array corresponding to some
    // specific tokens.
    this.filtersIndex = new Uint8Array(0);

    // Contains a mapping from [token] to `Bucket` (contains a list of filters).
    // This will be populated lazily as buckets are needed.
    this.cache = new Map();

    // Function used to optimize filters stored in buckets.
    this.optimize = optimize;

    if (filters.length !== 0) {
      this.update(filters, []);
    }
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32ArrayStrict(this.tokensLookupIndex);
    buffer.pushBytes(this.filtersIndex);
  }

  /**
   * Iterate on all filters found in buckets associated with the given list of
   * tokens. The callback is called on each of them. Early termination can be
   * achieved if the callback returns `false`.
   */
  public iterMatchingFilters(tokens: Uint32Array, cb: (f: T) => boolean): void {
    // Each request is assigned an ID so that we can keep track of the last
    // request seen by each bucket in the reverse index. This provides a cheap
    // way to prevent filters from being inspected more than once per request.
    const requestId = getNextId();

    for (let i = 0; i < tokens.length; i += 1) {
      if (this.iterBucket(tokens[i], requestId, cb) === false) {
        return;
      }
    }

    // Fallback to 0 bucket if nothing was found before.
    this.iterBucket(0, requestId, cb);
  }

  /**
   * Re-create the internal data-structure of the reverse index *in-place*. It
   * needs to be called using a generator function (which accepts a callback) to
   * iterate over *all the filters* we want to store in the index. Knowing all
   * the filters at construction time allows to find the optimal shape of the
   * index and speed-up look-ups. Although this might increase the time of
   * initialization, one needs to keep in mind that the index is created once,
   * but used many times to look-up filters (potentially thousands of times).
   */
  public update(newFilters: T[], removedFilters: number[]): void {
    let totalNumberOfTokens = 0;

    const removed = new Set(removedFilters);

    // Keep track of all filters with their tokens
    const filters: Array<{ filter: T; multiTokens: Uint32Array[] }> = [];

    const histogram = new Counter<number>();

    // Load all filters contained in this index, omitting the filters with ids
    // is in the `removed` set.
    const view = StaticDataView.fromUint8Array(this.filtersIndex);
    while (view.dataAvailable()) {
      view.getUint32(); // ignore token used to index this filter before update
      const filter = this.deserializeFilter(view); // TODO - `T` can be CosmeticFilter or NetworkFilter
      if (!removed.has(filter.getId())) {
        const multiTokens = filter.getTokens();
        filters.push({
          filter,
          multiTokens,
        });

        for (let j = 0; j < multiTokens.length; j += 1) {
          const tokens = multiTokens[j];
          for (let k = 0; k < tokens.length; k += 1) {
            totalNumberOfTokens += 1;
            histogram.incr(tokens[k]);
          }
        }
      }
    }

    // Process new filters
    for (let i = 0; i < newFilters.length; i += 1) {
      const filter = newFilters[i];
      const multiTokens = filter.getTokens();
      filters.push({
        filter,
        multiTokens,
      });

      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens = multiTokens[j];
        for (let k = 0; k < tokens.length; k += 1) {
          totalNumberOfTokens += 1;
          histogram.incr(tokens[k]);
        }
      }
    }

    // No filter given; reset to empty bucket
    if (filters.length === 0) {
      this.tokensLookupIndex = new Uint32Array(0);
      this.filtersIndex = new Uint8Array(0);
      this.cache = new Map();
      return;
    }

    // Add an heavy weight on these common patterns because they appear in
    // almost all URLs. If there is a choice, then filters should use other
    // tokens than those.
    ['http', 'https', 'www', 'com'].forEach((badToken) => {
      histogram.set(fastHash(badToken), totalNumberOfTokens);
    });

    // Build compact representation of filters
    const bits = 16;
    const mask = 2 ** bits - 1;
    const prefixes: Array<Array<{ token: number; filter: T }>> = [];
    for (let i = 0; i <= mask; i += 1) {
      prefixes.push([]);
    }

    // For each filter, take the best token (least seen)
    for (let i = 0; i < filters.length; i += 1) {
      const { filter, multiTokens } = filters[i];
      let wildCardInserted: boolean = false;

      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens: Uint32Array = multiTokens[j];

        let bestToken: number = 0;
        let minCount: number = totalNumberOfTokens + 1;
        for (let k = 0; k < tokens.length; k += 1) {
          const tokenCount = histogram.get(tokens[k]);
          if (tokenCount <= minCount) {
            minCount = tokenCount;
            bestToken = tokens[k];

            if (minCount === 1) {
              break;
            }
          }
        }

        // Only allow each filter to be present one time in the wildcard
        if (bestToken === 0) {
          if (wildCardInserted === true) {
            continue;
          }
          wildCardInserted = true;
        }

        prefixes[bestToken & mask].push({ token: bestToken, filter });
      }
    }

    // Create compact representation
    const buffer = new StaticDataView(4000000);
    const tokensLookupIndex = new Uint32Array(mask + 1);
    const emptyBucket = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i <= mask; i += 1) {
      const filtersForMask = prefixes[i];
      if (filtersForMask.length === 0) {
        tokensLookupIndex[mask] = emptyBucket;
      } else {
        tokensLookupIndex[i] = buffer.getPos();
        for (let j = 0; j < filtersForMask.length; j += 1) {
          const { token, filter } = filtersForMask[j];
          buffer.pushUint32(token);
          filter.serialize(buffer); // push filter
        }
      }
    }

    // Update reverse index
    this.cache = new Map();
    this.tokensLookupIndex = tokensLookupIndex;
    this.filtersIndex = buffer.crop().slice();
  }

  /**
   * If a bucket exists for the given token, call the callback on each filter
   * found inside. An early termination mechanism is built-in, to stop iterating
   * as soon as `false` is returned from the callback.
   */
  private iterBucket(token: number, requestId: number, cb: (f: T) => boolean): boolean {
    let bucket: Bucket<T> | undefined = this.cache.get(token);

    // Lazily create bucket if it does not yet exist. Lookup the compact bucket
    // representation and find all filters being associated with `token`. Create
    // a `Bucket` out of them and store them in cache.
    if (bucket === undefined) {
      const mask = this.tokensLookupIndex.length - 1;
      const prefix = token & mask;
      const startOfBucket = this.tokensLookupIndex[prefix];
      const endOfBucket =
        prefix === mask ? this.filtersIndex.length : this.tokensLookupIndex[prefix + 1];
      const buffer = new StaticDataView(0, this.filtersIndex);
      buffer.setPos(startOfBucket);

      // Deserialize all buckets (each bucket containing one or more filters)
      const deserializedBuckets: Map<number, T[]> = new Map();
      while (buffer.getPos() !== endOfBucket) {
        const bestToken = buffer.getUint32();
        const currentFilter = this.deserializeFilter(buffer);
        let currentBucket: T[] | undefined = deserializedBuckets.get(bestToken);
        if (currentBucket === undefined) {
          currentBucket = [currentFilter];
          deserializedBuckets.set(bestToken, currentBucket);
        } else {
          currentBucket.push(currentFilter);
        }
      }

      // Update cache
      deserializedBuckets.forEach((filters, bestToken) => {
        if (this.cache.has(bestToken)) {
          throw new Error(`token already in cache; that should not happen! ${bestToken}`);
        }

        this.cache.set(
          bestToken,
          new Bucket(filters.length > 1 ? this.optimize(filters) : filters),
        );
      });

      bucket = this.cache.get(token);
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
