/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Config from '../../config.js';
import { StaticDataView } from '../../data-view.js';
import NetworkFilter from '../../filters/network.js';
import CosmeticFilter from '../../filters/cosmetic.js';
import Request from '../../request.js';
import { noopOptimizeNetwork, optimizeNetwork, noopOptimizeCosmetic } from '../optimizer.js';
import ReverseIndex from '../reverse-index.js';
import { createLookupTokens } from './cosmetic.js';

export default class HTMLBucket {
  public static deserialize(buffer: StaticDataView, config: Config): HTMLBucket {
    const bucket = new HTMLBucket({ config });

    bucket.networkIndex = ReverseIndex.deserialize(
      buffer,
      NetworkFilter.deserialize,
      config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork,
      config,
    );

    bucket.exceptionsIndex = ReverseIndex.deserialize(
      buffer,
      NetworkFilter.deserialize,
      config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork,
      config,
    );

    bucket.cosmeticIndex = ReverseIndex.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      noopOptimizeCosmetic,
      config,
    );

    bucket.unhideIndex = ReverseIndex.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      noopOptimizeCosmetic,
      config,
    );

    return bucket;
  }

  public networkIndex: ReverseIndex<NetworkFilter>;
  public exceptionsIndex: ReverseIndex<NetworkFilter>;
  public cosmeticIndex: ReverseIndex<CosmeticFilter>;
  public unhideIndex: ReverseIndex<CosmeticFilter>;

  constructor({
    filters = [],
    config,
  }: {
    filters?: (CosmeticFilter | NetworkFilter)[];
    config: Config;
  }) {
    this.networkIndex = new ReverseIndex({
      config,
      deserialize: NetworkFilter.deserialize,
      filters: [],
      optimize: config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork,
    });

    this.exceptionsIndex = new ReverseIndex({
      config,
      deserialize: NetworkFilter.deserialize,
      filters: [],
      optimize: config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork,
    });

    this.cosmeticIndex = new ReverseIndex({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      optimize: noopOptimizeCosmetic,
    });

    this.unhideIndex = new ReverseIndex({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      optimize: noopOptimizeCosmetic,
    });

    if (filters.length !== 0) {
      this.update(filters, undefined);
    }
  }

  public update(
    newFilters: (NetworkFilter | CosmeticFilter)[],
    removedFilters: Set<number> | undefined,
  ): void {
    const networkFilters: NetworkFilter[] = [];
    const exceptionFilters: NetworkFilter[] = [];
    const cosmeticFilters: CosmeticFilter[] = [];
    const unhideFilters: CosmeticFilter[] = [];

    for (const filter of newFilters) {
      if (filter.isNetworkFilter()) {
        const networkFilter = filter as NetworkFilter;
        if (networkFilter.isException()) {
          exceptionFilters.push(networkFilter);
        } else {
          networkFilters.push(networkFilter);
        }
      } else if (filter.isCosmeticFilter()) {
        const cosmeticFilter = filter as CosmeticFilter;
        if (cosmeticFilter.isUnhide()) {
          unhideFilters.push(cosmeticFilter);
        } else {
          cosmeticFilters.push(cosmeticFilter);
        }
      }
    }

    this.networkIndex.update(networkFilters, removedFilters);
    this.exceptionsIndex.update(exceptionFilters, removedFilters);
    this.cosmeticIndex.update(cosmeticFilters, removedFilters);
    this.unhideIndex.update(unhideFilters, removedFilters);
  }

  public serialize(buffer: StaticDataView): void {
    this.networkIndex.serialize(buffer);
    this.exceptionsIndex.serialize(buffer);
    this.cosmeticIndex.serialize(buffer);
    this.unhideIndex.serialize(buffer);
  }

  public getSerializedSize(): number {
    return (
      this.networkIndex.getSerializedSize() +
      this.exceptionsIndex.getSerializedSize() +
      this.cosmeticIndex.getSerializedSize() +
      this.unhideIndex.getSerializedSize()
    );
  }

  public getHTMLFilters(
    request: Request,
    isFilterExcluded?: (filter: NetworkFilter | CosmeticFilter) => boolean,
  ): {
    networkFilters: NetworkFilter[];
    cosmeticFilters: CosmeticFilter[];
    exceptions: NetworkFilter[];
    unhides: CosmeticFilter[];
  } {
    const networkFilters: NetworkFilter[] = [];
    const cosmeticFilters: CosmeticFilter[] = [];
    const exceptions: NetworkFilter[] = [];
    const unhides: CosmeticFilter[] = [];

    this.networkIndex.iterMatchingFilters(request.getTokens(), (filter: NetworkFilter) => {
      if (filter.match(request) && !isFilterExcluded?.(filter)) {
        networkFilters.push(filter);
      }
      return true;
    });

    this.exceptionsIndex.iterMatchingFilters(request.getTokens(), (filter: NetworkFilter) => {
      if (filter.match(request) && !isFilterExcluded?.(filter)) {
        exceptions.push(filter);
      }
      return true;
    });

    if (request.isMainFrame()) {
      const { hostname, domain = '' } = request;
      const hostnameTokens = createLookupTokens(hostname, domain);
      this.cosmeticIndex.iterMatchingFilters(hostnameTokens, (filter: CosmeticFilter) => {
        if (filter.match(hostname, domain) && !isFilterExcluded?.(filter)) {
          cosmeticFilters.push(filter);
        }
        return true;
      });

      // If we found at least one candidate, check if we have unhidden rules.
      if (cosmeticFilters.length !== 0) {
        this.unhideIndex.iterMatchingFilters(hostnameTokens, (rule: CosmeticFilter) => {
          if (rule.match(hostname, domain) && !isFilterExcluded?.(rule)) {
            unhides.push(rule);
          }

          return true;
        });
      }
    }

    return {
      networkFilters,
      cosmeticFilters,
      unhides,
      exceptions,
    };
  }

  public getFilters(): (NetworkFilter | CosmeticFilter)[] {
    const filters: (NetworkFilter | CosmeticFilter)[] = [];
    return filters.concat(
      this.networkIndex.getFilters(),
      this.exceptionsIndex.getFilters(),
      this.cosmeticIndex.getFilters(),
      this.unhideIndex.getFilters(),
    );
  }
}
