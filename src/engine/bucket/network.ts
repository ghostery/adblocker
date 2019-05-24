/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import StaticDataView from '../../data-view';
import NetworkFilter from '../../filters/network';
import Request from '../../request';
import networkFiltersOptimizer from '../optimizer';
import ReverseIndex from '../reverse-index';
import FiltersContainer from './filters';

/**
 * Accelerating data structure for network filters matching.
 */
export default class NetworkFilterBucket {
  public static deserialize(buffer: StaticDataView): NetworkFilterBucket {
    const enableOptimizations = buffer.getBool();
    const bucket = new NetworkFilterBucket({ enableOptimizations });

    bucket.index = ReverseIndex.deserialize(
      buffer,
      NetworkFilter.deserialize,
      enableOptimizations ? networkFiltersOptimizer : undefined,
    );

    bucket.badFilters = FiltersContainer.deserialize(buffer, NetworkFilter.deserialize);

    return bucket;
  }

  // Optimizations allow to speed-up the matching of filters when they are
  // loaded in memory from the reverse index.
  public enableOptimizations: boolean;

  public index: ReverseIndex<NetworkFilter>;

  // `badFilters` are filters specifying a $badfilter option. They can be used
  // to disable completely another filter (usually to fix breakage). They are
  // stored separately so that we can quickly check if matching filters (from
  // `match` and `matchAll` methods) should be ignored or not.
  public badFilters: FiltersContainer<NetworkFilter>;

  // Lazy attribute containing IDs of $badfilter to quickly check which filters
  // should be disabled (only one lookup is needed).
  private badFiltersIds: Set<number> | null;

  constructor({
    filters = [],
    enableOptimizations = true,
  }: {
    filters?: NetworkFilter[];
    enableOptimizations?: boolean;
  } = {}) {
    this.enableOptimizations = enableOptimizations;

    this.index = new ReverseIndex({
      deserialize: NetworkFilter.deserialize,
      optimize: enableOptimizations ? networkFiltersOptimizer : undefined,
    });

    this.badFiltersIds = null;
    this.badFilters = new FiltersContainer({ deserialize: NetworkFilter.deserialize });

    if (filters.length !== 0) {
      this.update(filters);
    }
  }

  public update(newFilters: NetworkFilter[], removedFilters?: Set<number>): void {
    const badFilters: NetworkFilter[] = [];
    const remaining: NetworkFilter[] = [];
    for (let i = 0; i < newFilters.length; i += 1) {
      const filter = newFilters[i];
      if (filter.isBadFilter()) {
        badFilters.push(filter);
      } else {
        remaining.push(filter);
      }
    }

    this.badFilters.update(badFilters, removedFilters);
    this.index.update(remaining, removedFilters);
    this.badFiltersIds = null;
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushBool(this.enableOptimizations);
    this.index.serialize(buffer);
    this.badFilters.serialize(buffer);
  }

  public matchAll(request: Request): NetworkFilter[] {
    const filters: NetworkFilter[] = [];

    this.index.iterMatchingFilters(request.getTokens(), (filter: NetworkFilter) => {
      if (filter.match(request) && this.isFilterDisabled(filter) === false) {
        filters.push(filter);
      }
      return true;
    });

    return filters;
  }

  public match(request: Request): NetworkFilter | undefined {
    let match: NetworkFilter | undefined;

    this.index.iterMatchingFilters(request.getTokens(), (filter: NetworkFilter) => {
      if (filter.match(request) && this.isFilterDisabled(filter) === false) {
        match = filter;
        return false;
      }
      return true;
    });

    return match;
  }

  /**
   * Given a matching filter, check if it is disabled by a $badfilter
   */
  private isFilterDisabled(filter: NetworkFilter): boolean {
    // Lazily load information about bad filters in memory. The only thing we
    // keep in memory is the list of IDs from $badfilter (ignoring the
    // $badfilter option from mask). This allows to check if a matching filter
    // should be ignored just by doing a lookup in a set of IDs.
    if (this.badFiltersIds === null) {
      const badFilters = this.badFilters.getFilters();

      // Shortcut if there is no badfilter in this bucket
      if (badFilters.length === 0) {
        return false;
      }

      // Create in-memory list of disabled filter IDs
      const badFiltersIds: Set<number> = new Set();
      for (let i = 0; i < badFilters.length; i += 1) {
        badFiltersIds.add(badFilters[i].getIdWithoutBadFilter());
      }
      this.badFiltersIds = badFiltersIds;
    }

    return this.badFiltersIds.has(filter.getId());
  }
}
