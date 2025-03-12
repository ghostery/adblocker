/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync } from 'node:zlib';

import { FiltersEngine, adsLists, adsAndTrackingLists, fullLists } from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PREFIX =
  'https://raw.githubusercontent.com/ghostery/adblocker/master/packages/adblocker/assets';

function loadFromLocalAssets(lists: string[]): string {
  return lists
    .map((path) => join(__dirname, '..', 'assets', path.slice(PREFIX.length)))
    .map((path) => readFileSync(path, 'utf-8'))
    .join('\n');
}

function loadAdsLists(): string {
  return loadFromLocalAssets(adsLists);
}

function loadAdsAndTrackingLists(): string {
  return loadFromLocalAssets(adsAndTrackingLists);
}

function loadFullLists(): string {
  return loadFromLocalAssets(fullLists);
}

(() => {
  for (const [name, raw] of [
    ['ads', loadAdsLists()],
    ['ads + trackers', loadAdsAndTrackingLists()],
    ['ads + trackers + annoyances', loadFullLists()],
  ]) {
    for (const config of [
      { loadNetworkFilters: true, loadCosmeticFilters: true },
      { loadNetworkFilters: false, loadCosmeticFilters: true },
      { loadNetworkFilters: true, loadCosmeticFilters: false },
    ]) {
      const engine = FiltersEngine.parse(raw, { enableCompression: true, ...config });
      const { networkFilters, cosmeticFilters } = engine.getFilters();
      console.log(`> ${name} (${networkFilters.length} network + ${cosmeticFilters.length} hide)`);
      for (const [compression, compress] of [
        ['raw', (b: Uint8Array) => b],
        ['gzip', gzipSync],
        ['brotli', brotliCompressSync],
      ] as [string, (b: Uint8Array) => Uint8Array][]) {
        console.log(' +', compression, compress(engine.serialize()).byteLength, 'bytes');
      }
    }
  }
})();
