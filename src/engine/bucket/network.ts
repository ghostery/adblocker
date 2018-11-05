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
      filter.hit += 1;
      let continueIteration = true;
      const start = process.hrtime();
      if (matchNetworkFilter(filter, request)) {
        filter.match += 1;
        match = filter;
        continueIteration = false; // break iteration
      }
      const diff = process.hrtime(start);
      filter.cumulTime += (diff[0] * 1000000000 + diff[1]) / 1000000;

      return continueIteration;
    });

    return match;
  }
}
