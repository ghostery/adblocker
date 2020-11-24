/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Config from '../../config';
import { StaticDataView } from '../../data-view';
import NetworkFilter from '../../filters/network';
import Request from '../../request';
import { noopOptimizeNetwork, optimizeNetwork } from '../optimizer';
import ReverseIndex from '../reverse-index';
import FiltersContainer from './filters';

/**
 * Accelerating data structure for network filters matching.
 */
export default class NetworkFilterBucket {
  public static deserialize(buffer: StaticDataView, config: Config): NetworkFilterBucket {
    const bucket = new NetworkFilterBucket({ config });

    bucket.index = ReverseIndex.deserialize(
      buffer,
      NetworkFilter.deserialize,
      config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork,
      config,
    );

    bucket.badFilters = FiltersContainer.deserialize(buffer, NetworkFilter.deserialize, config);

    return bucket;
  }

  public index: ReverseIndex<NetworkFilter>;

  // `badFilters` are filters specifying a $badfilter option. They can be used
  // to disable completely another filter (usually to fix breakage). They are
  // stored separately so that we can quickly check if matching filters (from
  // `match` and `matchAll` methods) should be ignored or not.
  public badFilters: FiltersContainer<NetworkFilter>;

  // Lazy attribute containing IDs of $badfilter to quickly check which filters
  // should be disabled (only one lookup is needed).
  private badFiltersIds: Set<number> | null;

  constructor({ filters = [], config }: { filters?: NetworkFilter[]; config: Config }) {
    this.index = new ReverseIndex({
      config,
      deserialize: NetworkFilter.deserialize,
      filters: [],
      optimize: config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork,
    });

    this.badFiltersIds = null;
    this.badFilters = new FiltersContainer({
      config,
      deserialize: NetworkFilter.deserialize,
      filters: [],
    });

    if (filters.length !== 0) {
      this.update(filters, undefined);
    }
  }

  public getFilters(): NetworkFilter[] {
    const filters: NetworkFilter[] = [];
    return filters.concat(this.badFilters.getFilters(), this.index.getFilters());
  }

  public update(newFilters: NetworkFilter[], removedFilters: Set<number> | undefined): void {
    const badFilters: NetworkFilter[] = [];
    const remaining: NetworkFilter[] = [];
    for (const filter of newFilters) {
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

  public getSerializedSize(): number {
    return this.badFilters.getSerializedSize() + this.index.getSerializedSize();
  }

  public serialize(buffer: StaticDataView): void {
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
      for (const badFilter of badFilters) {
        badFiltersIds.add(badFilter.getIdWithoutBadFilter());
      }
      this.badFiltersIds = badFiltersIds;
    }

    return this.badFiltersIds.has(filter.getId());
  }
}
