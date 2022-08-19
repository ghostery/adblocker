import { promises as fs } from 'fs';
import { resolve, join } from 'path';
import { generate } from '@remusao/smaz-generate';
import { Smaz } from '@remusao/smaz';

import { parseFilters, NetworkFilter, CosmeticFilter, fullLists, hasUnicode } from '../adblocker';

const PREFIX =
  'https://raw.githubusercontent.com/cliqz-oss/adblocker/master/packages/adblocker/assets';

async function loadAllLists(): Promise<string> {
  return (
    await Promise.all(
      fullLists
        .map((path) => join(__dirname, '..', 'assets', path.slice(PREFIX.length)))
        .map((path) => fs.readFile(path, 'utf-8')),
    )
  ).join('\n');
}

async function getCosmeticFilters(): Promise<CosmeticFilter[]> {
  return parseFilters(await loadAllLists(), {
    debug: true,
    loadCosmeticFilters: true,
    loadNetworkFilters: false,
    enableHtmlFiltering: true,
  }).cosmeticFilters;
}

async function getNetworkFilters(): Promise<NetworkFilter[]> {
  return parseFilters(await loadAllLists(), {
    debug: true,
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
    loadExtendedSelectors: true,
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
    case 'raw-cosmetic':
      return (await getCosmeticFilters()).map((f) => f.toString()).filter((f) => !hasUnicode(f));
    case 'raw-network':
      return (await getNetworkFilters()).map((f) => f.toString()).filter((f) => !hasUnicode(f));
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
  const options = kind.startsWith('raw-') ? { maxNgram: 28 } : {};
  const codebook = generate(strings, options);
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
