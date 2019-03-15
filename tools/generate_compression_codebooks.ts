import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { generate } from 'tsmaz';

import { parseFilters } from '../index';

function readAsset(filepath: string): string {
  return readFileSync(resolve(__dirname, '../', filepath), 'utf-8');
}

function loadAllLists(): string {
  return [
    'assets/adguard/mobile.txt',
    'assets/easylist-downloads.adblockplus.org/antiadblockfilters.txt',
    'assets/easylist.to/easylist/easylist.txt',
    'assets/easylist.to/easylist/easyprivacy.txt',
    'assets/easylist.to/easylistgermany/easylistgermany.txt',
    'assets/pgl.yoyo.org/adservers/serverlist.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
  ]
    .map(readAsset)
    .join('\n');
}

function main() {
  const { networkFilters, cosmeticFilters } = parseFilters(loadAllLists());

  // Collect all cosmetic strings
  const cosmeticSelectorStrings: string[] = [];
  for (const filter of cosmeticFilters) {
    cosmeticSelectorStrings.push(filter.getSelector());
  }

  // Collect all network strings
  const networkCSPStrings: string[] = [];
  const networkFilterStrings: string[] = [];
  const networkHostnameStrings: string[] = [];
  const networkRedirectStrings: string[] = [];
  for (const filter of networkFilters) {
    if (filter.csp !== undefined) {
      networkCSPStrings.push(filter.csp);
    }

    if (filter.filter !== undefined) {
      networkFilterStrings.push(filter.filter);
    }

    if (filter.hostname !== undefined) {
      networkHostnameStrings.push(filter.hostname);
    }

    if (filter.redirect !== undefined) {
      networkRedirectStrings.push(filter.redirect);
    }
  }

  // Generate codebooks
  [
    { strings: networkCSPStrings, output: 'network-csp' },
    { strings: networkRedirectStrings, output: 'network-redirect' },
    { strings: networkFilterStrings, output: 'network-filter' },
    { strings: cosmeticSelectorStrings, output: 'cosmetic-selector' },
    { strings: networkHostnameStrings, output: 'network-hostname' },
  ].forEach(({ strings, output }) => {
    console.log(`Generate codebook ${output} using ${strings.length} strings.`);
    const codebook = generate(strings);
    writeFileSync(
      resolve(__dirname, `../src/codebooks/${output}.ts`),
      `/* tslint:disable */\nexport default ${JSON.stringify(codebook, null, 2)};`,
      'utf-8',
    );
  });
}

main();
