import matchNetworkFilter from '../../matching/network';
import { NetworkFilter } from '../../parsing/network-filter';
import Request from '../../request';

import networkFiltersOptimizer from '../optimizer';
import ReverseIndex from '../reverse-index';

/**
 * Accelerating data structure for network filters matching. Makes use of the
 * reverse index structure defined above.
 */
export default class NetworkFilterBucket {
  public name: string;
  public index: ReverseIndex<NetworkFilter>;
  public size: number;

  constructor(
    name: string,
    filters: (cb: (f: NetworkFilter) => void) => void,
    enableOptimizations = true,
  ) {
    this.name = name;
    this.index = new ReverseIndex<NetworkFilter>(
      filters,
      (filter: NetworkFilter) => filter.getTokens(),
      {
        enableOptimizations,
        optimizer: networkFiltersOptimizer,
      },
    );
    this.size = this.index.size;
  }

  public optimizeAheadOfTime() {
    this.index.optimizeAheadOfTime();
  }

  public match(request: Request): NetworkFilter | undefined {
    let match: NetworkFilter | undefined;

    this.index.iterMatchingFilters(request.getTokens(), (filter: NetworkFilter) => {
      let continueIteration = true;
      if (matchNetworkFilter(filter, request)) {
        match = filter;
        continueIteration = false; // break iteration
      }

      return continueIteration;
    });

    return match;
  }
}
