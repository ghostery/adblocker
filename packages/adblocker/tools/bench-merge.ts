/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';

import { FiltersEngine, adsLists, adsAndTrackingLists, fullLists } from '../src/index.js';

const PREFIX =
  'https://raw.githubusercontent.com/ghostery/adblocker/master/packages/adblocker/assets';

const LISTS = {
  ads: adsLists,
  tracking: adsAndTrackingLists,
  full: fullLists,
};

type ListName = keyof typeof LISTS;

function getListName(): ListName {
  const name = process.argv[2] ?? 'ads';
  if (name === 'ads' || name === 'tracking' || name === 'full') {
    return name;
  }

  throw new Error(`Unknown list set "${name}". Expected one of: ads, tracking, full.`);
}

function loadFromLocalAssets(lists: string[]): string[] {
  return lists.map((path) =>
    readFileSync(join(import.meta.dirname, '..', 'assets', path.slice(PREFIX.length)), 'utf-8'),
  );
}

function time(name: string, runs: number, cb: () => void): void {
  const times: number[] = [];

  for (let i = 0; i < runs; i += 1) {
    const start = performance.now();
    cb();
    times.push(performance.now() - start);
  }

  const min = Math.min(...times);
  const avg = times.reduce((total, value) => total + value, 0) / times.length;

  console.log(`${name}: min=${min.toFixed(2)}ms avg=${avg.toFixed(2)}ms`);
}

(() => {
  const listName = getListName();
  const runs = Number(process.env.BENCH_MERGE_RUNS ?? 10);
  const rawLists = loadFromLocalAssets(LISTS[listName]);
  const engines = rawLists.map((raw) =>
    FiltersEngine.parse(raw, {
      debug: false,
      enableCompression: true,
    }),
  );

  console.log(`Merge benchmark: ${listName}`);
  console.log(`Sources: ${engines.length}`);
  console.log(`Runs: ${runs}`);

  time('legacy merge', runs, () => {
    FiltersEngine.merge(engines);
  });

  time('binary merge', runs, () => {
    FiltersEngine.merge(engines, { useBinaryMerge: true });
  });
})();
