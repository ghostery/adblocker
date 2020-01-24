import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { generate } from 'tsmaz';

import { parseFilters } from '../adblocker';

function readAsset(filepath: string): string {
  return readFileSync(resolve(__dirname, '../', filepath), 'utf-8');
}

function loadAllLists(): string {
  return [
    'assets/easylist/easylist.txt',
    'assets/easylist/easylistgermany.txt',
    'assets/easylist/easyprivacy.txt',
    'assets/fanboy/annoyance.txt',
    'assets/fanboy/cookiemonster.txt',
    'assets/peter-lowe/serverlist.txt',
    'assets/ublock-origin/annoyances.txt',
    'assets/ublock-origin/badware.txt',
    'assets/ublock-origin/filters.txt',
    'assets/ublock-origin/privacy.txt',
    'assets/ublock-origin/resource-abuse.txt',
    'assets/ublock-origin/unbreak.txt',
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
    { strings: networkHostnameStrings, output: 'network-hostname' },
    { strings: cosmeticSelectorStrings, output: 'cosmetic-selector' },
  ].forEach(({ strings, output }) => {
    console.log(`Generate codebook ${output} using ${strings.length} strings.`);
    const codebook = generate(strings);
    writeFileSync(
      resolve(__dirname, `../src/codebooks/${output}.ts`),
      `/* tslint:disable */\nexport default ${JSON.stringify(codebook, null, 2)};\n`,
      'utf-8',
    );
  });
}

main();
