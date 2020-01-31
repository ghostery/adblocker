import { promises as fs } from 'fs';
import { resolve } from 'path';
import { generate } from 'tsmaz';

import { parseFilters, NetworkFilter, CosmeticFilter } from '../adblocker';

function readAsset(filepath: string): Promise<string> {
  return fs.readFile(resolve(__dirname, '../', filepath), 'utf-8');
}

async function loadAllLists(): Promise<string> {
  return Promise.all(
    [
      'assets/easylist/easylist.txt',
      'assets/easylist/easylistgermany.txt',
      'assets/easylist/easyprivacy.txt',
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
        .map(({ csp }) => csp || '')
        .filter((csp) => csp.length !== 0);
    case 'network-redirect':
      return (await getNetworkFilters())
        .map(({ redirect }) => redirect || '')
        .filter((redirect) => redirect.length !== 0);
    case 'network-filter':
      return (await getNetworkFilters())
        .map(({ filter }) => filter || '')
        .filter((filter) => filter.length !== 0);
    case 'network-hostname':
      return (await getNetworkFilters())
        .map(({ hostname }) => hostname || '')
        .filter((hostname) => hostname.length !== 0);
    case 'cosmetic-selector':
      return (await getCosmeticFilters())
        .map(({ selector }) => selector || '')
        .filter((selector) => selector.length !== 0);
    default:
      throw new Error(`Unsupported codebook: ${kind}`);
  }
}

async function generateCodebook(kind: string): Promise<string[]> {
  const strings = await getStrings(kind);
  console.log(`Generate codebook ${kind} using ${strings.length} strings.`);
  return generate(strings);
}

(async () => {
  const kind = process.argv[process.argv.length - 1];
  const codebook = await generateCodebook(kind);
  await fs.writeFile(
    resolve(__dirname, `../src/codebooks/${kind}.ts`),
    `/* tslint:disable */\nexport default ${JSON.stringify(codebook, null, 2)};\n`,
    'utf-8',
  );
})();
