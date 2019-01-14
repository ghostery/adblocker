import StaticDataView from '../../data-view';
import NetworkFilter from '../../filters/network';
import Request from '../../request';
import networkFiltersOptimizer from '../optimizer';
import ReverseIndex from '../reverse-index';

/**
 * Accelerating data structure for network filters matching. Makes use of the
 * reverse index structure defined above.
 */
export default class NetworkFilterBucket {
  public static deserialize(buffer: StaticDataView): NetworkFilterBucket {
    const enableOptimizations = Boolean(buffer.getUint8());
    const bucket = new NetworkFilterBucket(undefined, enableOptimizations);
    bucket.index = ReverseIndex.deserialize(
      buffer,
      enableOptimizations ? networkFiltersOptimizer : undefined,
    );
    return bucket;
  }

  public index: ReverseIndex<NetworkFilter>;
  public enableOptimizations: boolean;

  constructor(
    filters?: (cb: (f: NetworkFilter) => void) => void,
    enableOptimizations: boolean = true,
  ) {
    this.enableOptimizations = enableOptimizations;
    this.index = new ReverseIndex<NetworkFilter>(
      filters,
      enableOptimizations ? networkFiltersOptimizer : undefined,
    );
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushUint8(Number(this.enableOptimizations));
    this.index.serialize(buffer);
  }

  public matchAll(
    request: Request,
    getFilter: (id: number) => NetworkFilter | undefined,
  ): NetworkFilter[] {
    const filters: NetworkFilter[] = [];

    this.index.iterMatchingFilters(request.getTokens(), getFilter, (filter: NetworkFilter) => {
      if (filter.match(request)) {
        filters.push(filter);
      }
      return true;
    });

    return filters;
  }

  public match(
    request: Request,
    getFilter: (id: number) => NetworkFilter | undefined,
  ): NetworkFilter | undefined {
    let match: NetworkFilter | undefined;

    this.index.iterMatchingFilters(request.getTokens(), getFilter, (filter: NetworkFilter) => {
      if (filter.match(request)) {
        match = filter;
        return false;
      }
      return true;
    });

    return match;
  }
}
