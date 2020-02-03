import { promises as fs } from 'fs';
import { resolve } from 'path';
import { generate } from '@remusao/smaz-generate';
import { Smaz } from '@remusao/smaz';

import { parseFilters, NetworkFilter, CosmeticFilter } from '../adblocker';

function readAsset(filepath: string): Promise<string> {
  return fs.readFile(resolve(__dirname, '../', filepath), 'utf-8');
}

async function loadAllLists(): Promise<string> {
  return Promise.all(
    [
      'assets/easylist/easylist-cookie.txt',
      'assets/easylist/easylist.txt',
      'assets/easylist/easylistgermany.txt',
      'assets/easylist/easyprivacy.txt',
      'assets/fanboy/annoyance.txt',
      'assets/peter-lowe/serverlist.txt',
      'assets/ublock-origin/annoyances.txt',
      'assets/ublock-origin/badware.txt',
      'assets/ublock-origin/filters.txt',
      'assets/ublock-origin/privacy.txt',
      'assets/ublock-origin/resource-abuse.txt',
      'assets/ublock-origin/unbreak.txt',
    ].map(readAsset),
  ).then((strings) => strings.join('\n'));
}

async function getCosmeticFilters(): Promise<CosmeticFilter[]> {
  return parseFilters(await loadAllLists(), {
    loadCosmeticFilters: true,
    loadNetworkFilters: false,
  }).cosmeticFilters;
}

async function getNetworkFilters(): Promise<NetworkFilter[]> {
  return parseFilters(await loadAllLists(), {
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
  }).networkFilters;
}

async function getStrings(kind: string): Promise<string[]> {
  switch (kind) {
    case 'network-csp':
      return (await getNetworkFilters())
        .filter((filter) => filter.isUnicode() === false)
        .map(({ csp }) => csp || '')
        .filter((csp) => csp.length !== 0);
    case 'network-redirect':
      return (await getNetworkFilters())
        .filter((filter) => filter.isUnicode() === false)
        .map(({ redirect }) => redirect || '')
        .filter((redirect) => redirect.length !== 0);
    case 'network-filter':
      return (await getNetworkFilters())
        .filter((filter) => filter.isUnicode() === false)
        .map(({ filter }) => filter || '')
        .filter((filter) => filter.length !== 0);
    case 'network-hostname':
      return (await getNetworkFilters())
        .filter((filter) => filter.isUnicode() === false)
        .map(({ hostname }) => hostname || '')
        .filter((hostname) => hostname.length !== 0);
    case 'cosmetic-selector':
      return (await getCosmeticFilters())
        .filter((filter) => filter.isUnicode() === false)
        .map(({ selector }) => selector || '')
        .filter((selector) => selector.length !== 0);
    default:
      throw new Error(`Unsupported codebook: ${kind}`);
  }
}

function validateCodebook(codebook: string[], strings: string[]): void {
  console.log('Validating codebook', codebook);
  console.log(`Checking ${strings.length} strings...`);

  const smaz = new Smaz(codebook);
  let maxSize = 0;
  let minSize = Number.MAX_SAFE_INTEGER;
  let totalSize = 0;
  let totalCompressed = 0;

  for (const str of strings) {
    const compressed = smaz.compress(str);
    const original = smaz.decompress(compressed);
    if (original !== str) {
      throw new Error(`Mismatch: ${str} vs. ${original} (compressed: ${compressed})`);
    }

    totalSize += str.length;
    totalCompressed += compressed.length;
    maxSize = Math.max(maxSize, str.length);
    minSize = Math.min(minSize, str.length);
  }

  console.log('Codebook validated:', {
    maxSize,
    minSize,
    totalSize,
    totalCompressed,
    compressionRatio: 100.0 * ((totalSize - totalCompressed) / totalSize),
  });
}

async function generateCodebook(kind: string): Promise<string[]> {
  const strings = await getStrings(kind);
  console.log(`Generate codebook ${kind} using ${strings.length} strings.`);
  const codebook = generate(strings);
  validateCodebook(codebook, strings);
  return codebook;
}

(async () => {
  const kind = process.argv[process.argv.length - 1];
  const codebook = await generateCodebook(kind);
  const output = resolve(__dirname, `../src/codebooks/${kind}.ts`);
  console.log('Updating', output);
  await fs.writeFile(
    output,
    [
      '/*!',
      ' * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.',
      ' *',
      ' * This Source Code Form is subject to the terms of the Mozilla Public',
      ' * License, v. 2.0. If a copy of the MPL was not distributed with this',
      ' * file, You can obtain one at https://mozilla.org/MPL/2.0/.',
      ' */',
      '/* tslint:disable quotemark */',
      `export default ${JSON.stringify(
        codebook.sort((str1, str2) => {
          if (str1.length !== str2.length) {
            return str2.length - str1.length;
          }

          return str1.localeCompare(str2);
        }),
        null,
        2,
      )};`,
    ].join('\n'),
    'utf-8',
  );
})();
