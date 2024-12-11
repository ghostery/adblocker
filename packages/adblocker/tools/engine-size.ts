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

import {
  FiltersEngine,
  adsLists,
  adsAndTrackingLists,
  fullLists,
  Resources,
} from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PREFIX =
  'https://raw.githubusercontent.com/ghostery/adblocker/master/packages/adblocker/assets';

async function loadFromLocalAssets(lists: string[]): Promise<string> {
  return lists
    .map((path) => join(__dirname, '..', 'assets', path.slice(PREFIX.length)))
    .map((path) => readFileSync(path, 'utf-8'))
    .join('\n');
}

function loadAdsLists(): Promise<string> {
  return loadFromLocalAssets(adsLists);
}

function loadAdsAndTrackingLists(): Promise<string> {
  return loadFromLocalAssets(adsAndTrackingLists);
}

function loadFullLists(): Promise<string> {
  return loadFromLocalAssets(fullLists);
}

function loadResources(): Resources {
  return Resources.parse(
    readFileSync(join(__dirname, '..', 'assets', 'ublock-origin', 'resources.json'), 'utf8'),
    {
      checksum: '',
    },
  );
}

(async () => {
  for (const [name, raw] of [
    ['ads', await loadAdsLists()],
    ['ads + trackers', await loadAdsAndTrackingLists()],
    ['ads + trackers + annoyances', await loadFullLists()],
  ]) {
    for (const config of [
      { loadNetworkFilters: true, loadCosmeticFilters: true },
      { loadNetworkFilters: false, loadCosmeticFilters: true },
      { loadNetworkFilters: true, loadCosmeticFilters: false },
    ]) {
      for (const includeResources of [false, true]) {
        const engine = FiltersEngine.parse(raw, { enableCompression: true, ...config });
        if (includeResources) {
          engine.resources = loadResources();
        }
        const { networkFilters, cosmeticFilters } = engine.getFilters();
        console.log(
          `> ${name} (${networkFilters.length} network + ${cosmeticFilters.length} hide + ${engine.resources.resources.length + engine.resources.scriptlets.length} resources)`,
        );
        for (const [compression, compress] of [
          ['raw', (b: Uint8Array) => b],
          ['gzip', gzipSync],
          ['brotli', brotliCompressSync],
        ] as [string, (b: Uint8Array) => Uint8Array][]) {
          console.log(' +', compression, compress(engine.serialize()).byteLength, 'bytes');
        }
      }
    }
  }
})();
