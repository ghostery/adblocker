/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import NetworkFilter, { NETWORK_FILTER_MASK } from '../../filters/network';
import { setBit } from '../../utils';
import { Optimization, optimize } from './utils';

function processRegex(r: RegExp): string {
  return `(?:${r.source})`;
}

function escape(s: string): string {
  return `(?:${s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`;
}

const OPTIMIZATIONS: Array<Optimization<NetworkFilter>> = [
  // TODO - add filter deduplication
  {
    description: 'Group idential filter with same mask but different domains in single filters',
    fusion: (filters: NetworkFilter[]) => {
      const domains: Set<number> = new Set();
      const notDomains: Set<number> = new Set();

      for (let i = 0; i < filters.length; i += 1) {
        const { optDomains, optNotDomains } = filters[i];
        if (optDomains !== undefined) {
          optDomains.forEach((d) => {
            domains.add(d);
          });
        }
        if (optNotDomains !== undefined) {
          optNotDomains.forEach((d) => {
            notDomains.add(d);
          });
        }
      }

      return new NetworkFilter(
        Object.assign({}, filters[0], {
          optDomains: domains.size > 0 ? new Uint32Array(domains).sort() : undefined,
          optNotDomains: notDomains.size > 0 ? new Uint32Array(notDomains).sort() : undefined,
          rawLine:
            filters[0].rawLine !== undefined
              ? filters.map(({ rawLine }) => rawLine).join(' <+> ')
              : undefined,
        }),
      );
    },
    groupByCriteria: (filter: NetworkFilter) =>
      filter.getHostname() + filter.getFilter() + filter.getMask() + filter.getRedirect(),
    select: (filter: NetworkFilter) =>
      !filter.isFuzzy() &&
      !filter.isCSP() &&
      (filter.hasOptDomains() || filter.hasOptNotDomains()),
  },
  {
    description: 'Group simple patterns, into a single filter',
    fusion: (filters: NetworkFilter[]) => {
      const patterns: string[] = [];
      for (let i = 0; i < filters.length; i += 1) {
        const f = filters[i];
        if (f.isRegex()) {
          patterns.push(processRegex(f.getRegex()));
        } else if (f.isRightAnchor()) {
          patterns.push(`${escape(f.getFilter())}$`);
        } else if (f.isLeftAnchor()) {
          patterns.push(`^${escape(f.getFilter())}`);
        } else {
          patterns.push(escape(f.getFilter()));
        }
      }

      return new NetworkFilter(
        Object.assign({}, filters[0], {
          mask: setBit(filters[0].mask, NETWORK_FILTER_MASK.isRegex),
          rawLine:
            filters[0].rawLine !== undefined
              ? filters.map(({ rawLine }) => rawLine).join(' <+> ')
              : undefined,
          regex: new RegExp(patterns.join('|')),
        }),
      );
    },
    groupByCriteria: (filter: NetworkFilter) => '' + filter.getMask(),
    select: (filter: NetworkFilter) =>
      !filter.isFuzzy() &&
      !filter.hasOptDomains() &&
      !filter.hasOptNotDomains() &&
      !filter.isHostnameAnchor() &&
      !filter.isRedirect() &&
      !filter.isCSP(),
  },
];

/**
 * Optimizer which returns the list of original filters.
 */
export function noopOptimizeNetwork(filters: NetworkFilter[]): NetworkFilter[] {
  return filters;
}

/**
 * Fusion a set of `filters` by applying optimizations sequentially.
 */
export function optimizeNetwork(filters: NetworkFilter[]): NetworkFilter[] {
  return optimize(OPTIMIZATIONS, filters);
}
