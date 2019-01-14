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

function noFilter<T>(_: (f: T) => void): void {
  /* do nothing */
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

const EMPTY_BUCKET = new Bucket([]);

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
    optimize: (filters: T[]) => T[] = noopOptimize,
  ): ReverseIndex<T> {
    const reverseIndex = new ReverseIndex<T>(noFilter, optimize);
    reverseIndex.index = buffer.getUint32ArrayStrict();
    return reverseIndex;
  }

  public index: Uint32Array;
  private cache: Map<number, Bucket<T>>;

  private readonly optimize: (filters: T[]) => T[];

  constructor(
    filters: (cb: (f: T) => void) => void = noFilter,
    optimize: (filters: T[]) => T[] = noopOptimize,
  ) {
    this.index = new Uint32Array(0);
    this.cache = new Map();
    this.optimize = optimize;

    this.addFilters(filters);
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32ArrayStrict(this.index);
  }

  /**
   * Iterate on all filters found in buckets associated with the given list of
   * tokens. The callback is called on each of them. Early termination can be
   * achieved if the callback returns `false`.
   */
  public iterMatchingFilters(
    tokens: Uint32Array,
    getFilter: (id: number) => T | undefined,
    cb: (f: T) => boolean,
  ): void {
    // Each request is assigned an ID so that we can keep track of the last
    // request seen by each bucket in the reverse index. This provides a cheap
    // way to prevent filters from being inspected more than once per request.
    const requestId = getNextId();

    for (let i = 0; i < tokens.length; i += 1) {
      if (this.iterBucket(tokens[i], requestId, getFilter, cb) === false) {
        return;
      }
    }

    // Fallback to 0 bucket if nothing was found before.
    this.iterBucket(0, requestId, getFilter, cb);
  }

  private addFilters(iterFilters: (cb: (f: T) => void) => void): void {
    let totalNumberOfTokens = 0;

    // Keep track of all filters with their tokens
    const filters: Array<{ filter: T; multiTokens: Uint32Array[] }> = [];

    // TODO - use HyperLogLog here to avoid high memory consumption?
    const histogram = new Counter<number>();

    // Count number of occurrences of each token, globally
    iterFilters((filter: T) => {
      const multiTokens = filter.getTokens();
      filters.push({
        filter,
        multiTokens,
      });

      for (let i = 0; i < multiTokens.length; i += 1) {
        const tokens = multiTokens[i];
        for (let j = 0; j < tokens.length; j += 1) {
          totalNumberOfTokens += 1;
          histogram.incr(tokens[j]);
        }
      }
    });

    // No filter given
    if (filters.length === 0) {
      this.index = new Uint32Array(0);
      this.cache = new Map();
      return;
    }

    // Add an heavy weight on these common patterns because they appear in
    // almost all URLs. If there is a choice, then filters should use other
    // tokens than those.
    ['http', 'https', 'www', 'com'].forEach((badToken) => {
      histogram.set(fastHash(badToken), totalNumberOfTokens);
    });

    // For each filter, take the best token (least seen)
    const index = [];
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

        index.push(bestToken);
        index.push(filter.getId());
      }
    }

    // Update state of the reverse index
    this.index = new Uint32Array(index);
    this.cache = new Map();
  }

  /**
   * If a bucket exists for the given token, call the callback on each filter
   * found inside. An early termination mechanism is built-in, to stop iterating
   * as soon as `false` is returned from the callback.
   */
  private iterBucket(
    token: number,
    requestId: number,
    getFilter: (id: number) => T | undefined,
    cb: (f: T) => boolean,
  ): boolean {
    let bucket: Bucket<T> | undefined = this.cache.get(token);

    // Lazily create bucket if it does not yet exist. Lookup the compact bucket
    // representation and find all filters being associated with `token`. Create
    // a `Bucket` out of them and store them in cache.
    if (bucket === undefined) {
      // TODO - implement using binary search instead of linear search for
      // speed boost!
      const filters: T[] = [];
      for (let i = 0; i < this.index.length; i += 2) {
        if (this.index[i] === token) {
          const filter = getFilter(this.index[i + 1]);
          if (filter !== undefined) {
            filters.push(filter);
          }
        }
      }

      // NOTE: If we create `Bucket` instances for all tokens, even when there
      // is no filter, it's going to use a lot of memory (as in: memory leak!).
      // We should probably not do this. But at the very least we are going to
      // have one key for each in `this.cache`. And the number of keys could
      // potentially grow to 2^31-1. The alternative would be to do the lookup
      // on the packed data-structure every time, which will probably be slow
      // (log(n) where n is the number of filters in the index).
      bucket =
        filters.length === 0
          ? EMPTY_BUCKET
          : new Bucket(filters.length > 1 ? this.optimize(filters) : filters);
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
