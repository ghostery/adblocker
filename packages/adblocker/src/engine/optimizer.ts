/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import CosmeticFilter from '../filters/cosmetic';
import NetworkFilter, { NETWORK_FILTER_MASK } from '../filters/network';
import { setBit } from '../utils';
import { Domains } from '../engine/domains';

function processRegex(r: RegExp): string {
  return `(?:${r.source})`;
}

function escape(s: string): string {
  return `(?:${s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`;
}

function setWithDefault<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  let bucket = map.get(key);
  if (bucket === undefined) {
    bucket = [];
    map.set(key, bucket);
  }
  bucket.push(value);
}

function groupBy(
  filters: NetworkFilter[],
  criteria: (filter: NetworkFilter) => string,
): NetworkFilter[][] {
  const grouped: Map<string, NetworkFilter[]> = new Map();
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    setWithDefault(grouped, criteria(filter), filter);
  }
  return Array.from(grouped.values());
}

function splitBy(
  filters: NetworkFilter[],
  condition: (filter: NetworkFilter) => boolean,
): {
  positive: NetworkFilter[];
  negative: NetworkFilter[];
} {
  const positive: NetworkFilter[] = [];
  const negative: NetworkFilter[] = [];

  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    if (condition(filter)) {
      positive.push(filter);
    } else {
      negative.push(filter);
    }
  }

  return {
    negative,
    positive,
  };
}

interface IOptimization {
  description: string;
  groupByCriteria: (filter: NetworkFilter) => string;
  select: (filter: NetworkFilter) => boolean;
  fusion: (filters: NetworkFilter[]) => NetworkFilter;
}

const OPTIMIZATIONS: IOptimization[] = [
  {
    description: 'Remove duplicated filters by ID',
    fusion: (filters: NetworkFilter[]) => filters[0],
    groupByCriteria: (filter: NetworkFilter) => '' + filter.getId(),
    select: () => true,
  },
  {
    description: 'Group idential filter with same mask but different domains in single filters',
    fusion: (filters: NetworkFilter[]) => {
      const hostnames: Set<number> = new Set();
      const notHostnames: Set<number> = new Set();
      const entities: Set<number> = new Set();
      const notEntities: Set<number> = new Set();

      for (let i = 0; i < filters.length; i += 1) {
        const { domains } = filters[i]
        if (domains !== undefined) {
          if (domains.hostnames !== undefined) {
            for (const hash of domains.hostnames) {
              hostnames.add(hash);
            }
          }

          if (domains.entities !== undefined) {
            for (const hash of domains.entities) {
              entities.add(hash);
            }
          }

          if (domains.notHostnames !== undefined) {
            for (const hash of domains.notHostnames) {
              notHostnames.add(hash);
            }
          }

          if (domains.notEntities !== undefined) {
            for (const hash of domains.notEntities) {
              notEntities.add(hash);
            }
          }
        }
      }

      return new NetworkFilter(
        Object.assign({}, filters[0], {
          domains: new Domains({
            hostnames: hostnames.size !== 0 ? new Uint32Array(hostnames).sort() : undefined,
            entities: entities.size !== 0 ? new Uint32Array(entities).sort() : undefined,
            notHostnames: notHostnames.size !== 0 ? new Uint32Array(notHostnames).sort() : undefined,
            notEntities: notEntities.size !== 0 ? new Uint32Array(notEntities).sort() : undefined,
          }),
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
      filter.denyallow === undefined &&
      filter.domains !== undefined,
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
    groupByCriteria: (filter: NetworkFilter) => '' + (
      filter.getMask() &
      ~NETWORK_FILTER_MASK.isRegex &
      ~NETWORK_FILTER_MASK.isFullRegex
    ),
    select: (filter: NetworkFilter) =>
      !filter.isFuzzy() &&
      filter.domains === undefined &&
      filter.denyallow === undefined &&
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

export function noopOptimizeCosmetic(filters: CosmeticFilter[]): CosmeticFilter[] {
  return filters;
}

/**
 * Fusion a set of `filters` by applying optimizations sequentially.
 */
export function optimizeNetwork(filters: NetworkFilter[]): NetworkFilter[] {
  const fused: NetworkFilter[] = [];
  let toFuse = filters;

  for (let i = 0; i < OPTIMIZATIONS.length; i += 1) {
    const { select, fusion, groupByCriteria } = OPTIMIZATIONS[i];
    const { positive, negative } = splitBy(toFuse, select);
    toFuse = negative;

    const groups = groupBy(positive, groupByCriteria);
    for (let j = 0; j < groups.length; j += 1) {
      const group = groups[j];
      if (group.length > 1) {
        fused.push(fusion(group));
      } else {
        toFuse.push(group[0]);
      }
    }
  }

  for (let i = 0; i < toFuse.length; i += 1) {
    fused.push(toFuse[i]);
  }

  return fused;
}
