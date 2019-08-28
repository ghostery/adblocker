/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { mergeCompactSets } from '../../compact-set';
import CosmeticFilter from '../../filters/cosmetic';
import { Optimization, optimize } from './utils';

/**
 * Optimizer which returns the list of original filters.
 */
export function noopOptimizeCosmetic(filters: CosmeticFilter[]): CosmeticFilter[] {
  return filters;
}

const OPTIMIZATIONS: Array<Optimization<CosmeticFilter>> = [
  {
    description: 'Group cosmetics sharing the same selector',
    fusion: (filters: CosmeticFilter[]) => {
      // Aggregate over all filters
      const entities: Uint32Array[] = [];
      const hostnames: Uint32Array[] = [];
      const notEntities: Uint32Array[] = [];
      const notHostnames: Uint32Array[] = [];

      let rawLine: string | undefined;
      let matchAllHostnames = false;

      // Accumulate hostnames/entities for all `filters`
      for (let i = 0; i < filters.length; i += 1) {
        const filter = filters[i];
        // Special case where one of the filters is generic (matches any domain, modulo exceptions)
        if (filter.entities === undefined && filter.hostnames === undefined) {
          matchAllHostnames = true;
        }

        // Accumulate hostname constraints
        if (matchAllHostnames === false) {
          if (filter.entities !== undefined) {
            entities.push(filter.entities);
          }

          if (filter.hostnames !== undefined) {
            hostnames.push(filter.hostnames);
          }
        }

        if (filter.notEntities !== undefined) {
          notEntities.push(filter.notEntities);
        }

        if (filter.notHostnames !== undefined) {
          notHostnames.push(filter.notHostnames);
        }
      }

      // If we are in `debug` mode, combine rawLine from all `filters`
      if (filters[0].rawLine !== undefined) {
        let firstHashIndex = -1;
        const rawHosts: string[] = []; // list of hostname constraints

        for (let i = 0; i < filters.length; i += 1) {
          const filter = filters[i];

          if (filter.rawLine !== undefined) {
            firstHashIndex = filter.rawLine.indexOf('#');
            if (firstHashIndex !== 0) {
              const hosts = filter.rawLine.slice(0, firstHashIndex);
              const parts: string[] = hosts.split(',');
              for (let j = 0; j < parts.length; j += 1) {
                const part = parts[j];
                if (matchAllHostnames === false || part.startsWith('~')) {
                  rawHosts.push(part);
                }
              }
            }
          }
        }

        // @ts-ignore
        rawLine = `${rawHosts.join(',')}${filters[filters.length - 1].rawLine.slice(
          firstHashIndex,
        )}`;
      }

      // console.log('combine', filters.length, filters.map(f => f.toString()), rawLine);

      return new CosmeticFilter({
        mask: filters[0].mask,
        selector: filters[0].selector,

        entities:
          matchAllHostnames === true || entities.length === 0
            ? undefined
            : mergeCompactSets(entities),
        hostnames:
          matchAllHostnames === true || hostnames.length === 0
            ? undefined
            : mergeCompactSets(hostnames),

        notEntities: notEntities.length === 0 ? undefined : mergeCompactSets(notEntities),
        notHostnames:
          notHostnames.length === 0 ? undefined : mergeCompactSets(notHostnames),

        style: undefined,

        rawLine,
      });
    },
    groupByCriteria: (filter: CosmeticFilter): string => `${filter.mask}${filter.selector}`,
    select: (filter: CosmeticFilter): boolean => filter.hasCustomStyle() === false,
  },
];

/**
 * Fusion a set of `filters` by applying optimizations sequentially.
 */
export function optimizeCosmetic(filters: CosmeticFilter[]): CosmeticFilter[] {
  return optimize(OPTIMIZATIONS, filters);
}
