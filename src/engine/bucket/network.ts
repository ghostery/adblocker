import matchNetworkFilter from '../../matching/network';
import { NetworkFilter } from '../../parsing/network-filter';
import { IRequest } from '../../request/interface';

import networkFiltersOptimizer from '../optimizer';
import ReverseIndex from '../reverse-index';

/**
 * Accelerating data structure for network filters matching. Makes use of the
 * reverse index structure defined above.
 */
export default class NetworkFilterBucket {
  public name: string;
  public index: ReverseIndex<NetworkFilter>;

  constructor(name: string, filters: NetworkFilter[] = []) {
    this.name = name;
    this.index = new ReverseIndex(filters, (filter) => filter.getTokens(), {
      optimizer: networkFiltersOptimizer,
    });
  }

  get size() {
    return this.index.size;
  }

  public report() {
    return this.index.report();
  }

  public optimizeAheadOfTime() {
    this.index.optimizeAheadOfTime();
  }

  public match(request: IRequest): NetworkFilter | null {
    let match = null;

    const checkMatch = (filter: NetworkFilter) => {
      if (matchNetworkFilter(filter, request)) {
        match = filter;
        return false; // Break iteration
      }

      return true; // Continue iterating on buckets
    };

    this.index.iterMatchingFilters(request.tokens, checkMatch);
    return match;
  }
}
