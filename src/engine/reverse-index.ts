import IFilter from '../parsing/interface';
import { fastHash } from '../utils';

class DefaultMap<K, V> {
  private map: Map<K, V>;
  private ctr: () => V;

  constructor(ctr: () => V) {
    this.map = new Map<K, V>();
    this.ctr = ctr;
  }

  public getMap() {
    return this.map;
  }

  public set(key: K, value: V) {
    this.map.set(key, value);
  }

  public get(key: K): V {
    let value = this.map.get(key);
    if (value === undefined) {
      value = this.ctr();
      this.map.set(key, value);
    }
    return value;
  }
}

function noop<T>(filters: T[]): T[] {
  return filters;
}

let UID = 1;
function getNextId() {
  const id = UID;
  UID = (UID + 1) % 1000000000;
  return id;
}

export interface IBucket<T extends IFilter> {
  filters: T[];
  magic: number;
  optimized: boolean;
  originals: T[] | undefined;
}

export function newBucket<T extends IFilter>(filters: T[] = []): IBucket<T> {
  return {
    filters,
    magic: 0,
    optimized: false,
    originals: undefined,
  };
}

interface IOptions<T> {
  optimizer: (filters: T[]) => T[];
  enableOptimizations: boolean;
}

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
 *   1. It is possible to provide an `optimizer` function, which takes as input
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
  public size: number;
  public index: Map<number, IBucket<T>>;

  private optimizer: (filters: T[]) => T[];
  private getTokens: (filter: T) => Uint32Array[];

  constructor(
    filters: (cb: (f: T) => void) => void,
    getTokens: (filter: T) => Uint32Array[],
    { enableOptimizations = true, optimizer = noop }: Partial<IOptions<T>> = {
      enableOptimizations: true,
      optimizer: noop,
    },
  ) {
    // Mapping from tokens to filters
    this.index = new Map();
    this.size = 0;

    this.optimizer = enableOptimizations ? optimizer : noop;
    this.getTokens = getTokens;

    this.addFilters(filters);
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
   * Force optimization of all buckets.
   */
  public optimizeAheadOfTime(): void {
    if (this.optimizer !== undefined) {
      this.index.forEach((bucket) => {
        if (bucket.optimized === false) {
          this.optimize(bucket);
        }
      });
    }
  }

  private addFilters(iterFilters: (cb: (f: T) => void) => void): void {
    let totalNumberOfTokens = 0;

    // Keep track of all filters with their tokens
    const filters: Array<{ filter: T; multiTokens: Uint32Array[] }> = [];

    // Index will be used both as a histogram while constructing buckets and
    // then as the final reverse index. We re-use the same Map to avoid having
    // to construct two big ones.
    const index = new DefaultMap<number, IBucket<T>>(newBucket);

    // The wildcard bucket will contains some filters for which we could not
    // find any valid token.
    const wildcardBucket = index.get(0);

    // Count number of occurrences of each token, globally
    iterFilters((filter: T) => {
      const multiTokens = this.getTokens(filter);
      filters.push({
        filter,
        multiTokens,
      });

      for (let i = 0; i < multiTokens.length; i += 1) {
        const tokens = multiTokens[i];
        for (let j = 0; j < tokens.length; j += 1) {
          totalNumberOfTokens += 1;
          index.get(tokens[j]).magic += 1;
        }
      }
    });

    // Add an heavy weight on these common patterns because they appear in
    // almost all URLs. If there is a choice, then filters should use other
    // tokens than those.
    ['http', 'https', 'www', 'com'].forEach((badToken) => {
      index.get(fastHash(badToken)).magic = totalNumberOfTokens;
    });

    // For each filter, take the best token (least seen)
    for (let i = 0; i < filters.length; i += 1) {
      const { filter, multiTokens } = filters[i];
      let wildCardInserted = false;

      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens = multiTokens[j];

        let bestBucket;
        let count = totalNumberOfTokens + 1;
        for (let k = 0; k < tokens.length; k += 1) {
          const bucket = index.get(tokens[k]);
          if (bucket.magic <= count) {
            count = bucket.magic;
            bestBucket = bucket;

            if (count === 1) {
              break;
            }
          }
        }

        // Only allow each filter to be present one time in the wildcard
        if (bestBucket === undefined) {
          if (wildCardInserted === false) {
            wildCardInserted = true;
            wildcardBucket.filters.push(filter);
          }
        } else {
          bestBucket.filters.push(filter);
        }
      }
    }

    this.size = filters.length;
    this.index = index.getMap();

    // Clean-up empty buckets
    this.index.forEach((bucket, key, map) => {
      bucket.magic = 0;
      if (bucket.filters.length === 0) {
        map.delete(key);
      }
    });
  }

  private optimize(bucket: IBucket<T>): void {
    if (this.optimizer !== undefined && bucket.optimized === false) {
      if (bucket.filters.length > 1) {
        bucket.originals = bucket.filters;
        bucket.filters = this.optimizer(bucket.filters);
      }

      bucket.optimized = true;
    }
  }

  /**
   * If a bucket exists for the given token, call the callback on each filter
   * found inside. An early termination mechanism is built-in, to stop iterating
   * as soon as `false` is returned from the callback.
   */
  private iterBucket(token: number, requestId: number, cb: (f: T) => boolean): boolean {
    const bucket = this.index.get(token);
    if (bucket !== undefined && bucket.magic !== requestId) {
      bucket.magic = requestId;

      if (bucket.optimized === false) {
        this.optimize(bucket);
      }

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
