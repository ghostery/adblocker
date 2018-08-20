import IFilter from '../parsing/interface';

function nope(arg: any) {
  return arg;
}

export interface IBucket<T extends IFilter> {
  hit: number;
  optimized: boolean;
  filters: T[];
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
  private getTokens: (filter: IFilter) => number[][];

  constructor(
    filters: T[],
    getTokens: (filter: IFilter) => number[][],
    { optimizer = nope } = {},
  ) {
    // Mapping from tokens to filters
    this.index = new Map();
    this.size = 0;

    this.optimizer = optimizer;
    this.getTokens = getTokens;

    this.addFilters(filters || []);
  }

  /**
   * Iterate on all filters found in buckets associated with the given list of
   * tokens. The callback is called on each of them. Early termination can be
   * achieved if the callback returns `false`.
   */
  public iterMatchingFilters(tokens: number[], cb: (f: T) => boolean): void {
    // Doing so will make sure that time to find a match is minimized over time
    for (let j = 0; j < tokens.length; j += 1) {
      if (this.iterBucket(tokens[j], cb) === false) {
        return;
      }
    }

    // Fallback to 0 bucket if nothing was found before.
    this.iterBucket(0, cb);
  }

  /**
   * Returns a report (string) of bucket sizes to be printed on the console.
   * This is mainly designed for debugging purposes.
   */
  public report(): string {
    const sizes: Map<number, number> = new Map();
    // Report size of buckets
    let strResult = '';
    this.index.forEach((bucket, token) => {
      const filters = bucket.filters;
      sizes.set(filters.length, (sizes.get(filters.length) || 0) + 1);
      if (length > 5) {
        strResult = strResult.concat(
          `adblocker size bucket "${token}" => ${filters.length}\n`,
        );
        filters.forEach((f) => {
          strResult = strResult.concat(`    ${f.toString()} ${f.mask}\n`);
        });
      }
    });

    sizes.forEach((count, size) => {
      strResult = strResult.concat(
        `adblocker sizes ${size} => ${count} buckets\n`,
      );
    });

    return strResult;
  }

  /**
   * Force optimization of all buckets.
   */
  public optimizeAheadOfTime(): void {
    if (this.optimizer) {
      this.index.forEach((bucket) => {
        this.optimize(bucket, true /* force optimization */);
      });
    }
  }

  private addFilters(filters: T[]): void {
    const length = filters.length;
    this.size = length;

    const idToTokens = new Map();
    const histogram = new Map();

    // Update histogram with new tokens
    for (let i = 0; i < filters.length; i += 1) {
      const filter = filters[i];

      // Deal with filters generating several sets of tokens
      // (eg: cosmetic filters and their hostnames)
      const multiTokens = this.getTokens(filter);

      idToTokens.set(filter.id, multiTokens);
      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens = multiTokens[j];
        for (let k = 0; k < tokens.length; k += 1) {
          const token = tokens[k];
          histogram.set(token, (histogram.get(token) || 0) + 1);
        }
      }
    }

    // For each filter, take the best token (least seen)
    for (let i = 0; i < filters.length; i += 1) {
      let wildCardInserted = false;
      const filter = filters[i];
      const multiTokens = idToTokens.get(filter.id);

      for (let j = 0; j < multiTokens.length; j += 1) {
        const tokens = multiTokens[j];

        // Empty token is used as a wild-card
        let bestToken = 0;
        let count = length;
        for (let k = 0; k < tokens.length; k += 1) {
          const token = tokens[k];
          const tokenCount = histogram.get(token);
          if (tokenCount < count) {
            bestToken = token;
            count = tokenCount;
          }
        }

        // Only allow each filter to be present one time in the wildcard
        if (bestToken === 0) {
          if (wildCardInserted) {
            continue;
          } else {
            wildCardInserted = true;
          }
        }

        // Add filter to the corresponding bucket
        const bucket = this.index.get(bestToken);
        if (bucket === undefined) {
          this.index.set(bestToken, {
            filters: [filter],
            hit: 0,
            optimized: false,
          });
        } else {
          bucket.filters.push(filter);
        }
      }
    }
  }

  private optimize(bucket: IBucket<T>, force: boolean = false): void {
    // TODO - number of hits should depend on size of the bucket as payoff from
    // big buckets will be higher than on small buckets.
    if (this.optimizer && !bucket.optimized && (force || bucket.hit >= 5)) {
      if (bucket.filters.length > 1) {
        bucket.filters = this.optimizer(bucket.filters);
      }

      bucket.optimized = true;
    }
  }

  /**
   * If a bucket exist for the given `token`, call the callback on each filter
   * found inside. An early termination mechanism is built-in, to stop iterating
   * as soon as `false` is returned from the callback.
   */
  private iterBucket(token: number, cb: (f: T) => boolean): boolean {
    const bucket = this.index.get(token);
    if (bucket !== undefined) {
      bucket.hit += 1;
      // this.optimize(bucket);

      const filters = bucket.filters;
      for (let k = 0; k < filters.length; k += 1) {
        // Break the loop if the callback returns `false`
        if (cb(filters[k]) === false) {
          return false;
        }
      }
    }

    return true;
  }
}
