/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Filter from '../../filters/interface';

function setWithDefault<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  let bucket = map.get(key);
  if (bucket === undefined) {
    bucket = [];
    map.set(key, bucket);
  }
  bucket.push(value);
}

function groupBy<T extends Filter>(
  filters: T[],
  criteria: (filter: T) => string,
): T[][] {
  const grouped: Map<string, T[]> = new Map();
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    setWithDefault(grouped, criteria(filter), filter);
  }
  return Array.from(grouped.values());
}

function splitBy<T extends Filter>(
  filters: T[],
  condition: (filter: T) => boolean,
): {
  positive: T[];
  negative: T[];
} {
  const positive: T[] = [];
  const negative: T[] = [];

  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    if (condition(filter) === true) {
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

export interface Optimization<T extends Filter> {
  description: string;
  groupByCriteria: (filter: T) => string;
  select: (filter: T) => boolean;
  fusion: (filters: T[]) => T;
}

/**
 * Fusion a set of `filters` by applying optimizations sequentially.
 */
export function optimize<T extends Filter>(optimizations: Array<Optimization<T>>, filters: T[]): T[] {
  const fused: T[] = [];
  let toFuse = filters;

  for (let i = 0; i < optimizations.length; i += 1) {
    const { select, fusion, groupByCriteria } = optimizations[i];
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
