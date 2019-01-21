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
    const bucket = new NetworkFilterBucket({ enableOptimizations });
    bucket.index = ReverseIndex.deserialize(
      buffer,
      NetworkFilter.deserialize,
      enableOptimizations ? networkFiltersOptimizer : undefined,
    );
    return bucket;
  }

  public index: ReverseIndex<NetworkFilter>;
  public enableOptimizations: boolean;

  constructor({
    filters = [],
    enableOptimizations = true,
  }: {
    filters?: NetworkFilter[];
    enableOptimizations?: boolean;
  } = {}) {
    this.enableOptimizations = enableOptimizations;
    this.index = new ReverseIndex<NetworkFilter>({
      deserialize: NetworkFilter.deserialize,
      filters,
      optimize: enableOptimizations ? networkFiltersOptimizer : undefined,
    });
  }

  public update(newFilters: NetworkFilter[], removedFilters: number[] = []): void {
    this.index.update(newFilters, removedFilters);
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushUint8(Number(this.enableOptimizations));
    this.index.serialize(buffer);
  }

  public matchAll(request: Request): NetworkFilter[] {
    const filters: NetworkFilter[] = [];

    this.index.iterMatchingFilters(request.getTokens(), (filter: NetworkFilter) => {
      if (filter.match(request)) {
        filters.push(filter);
      }
      return true;
    });

    return filters;
  }

  public match(request: Request): NetworkFilter | undefined {
    let match: NetworkFilter | undefined;

    this.index.iterMatchingFilters(request.getTokens(), (filter: NetworkFilter) => {
      if (filter.match(request)) {
        match = filter;
        return false;
      }
      return true;
    });

    return match;
  }
}
