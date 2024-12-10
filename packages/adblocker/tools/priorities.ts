/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { existsSync, promises as fs, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  fullLists,
  CosmeticFilter,
  detectFilterType,
  NetworkFilter,
  FilterType,
} from '../src/index.js';

class Counter<K> {
  private counter: Map<K, number>;

  constructor() {
    this.counter = new Map<K, number>();
  }

  public incr(key: K): void {
    this.counter.set(key, (this.counter.get(key) || 0) + 1);
  }

  public get(key: K): number {
    return this.counter.get(key) || 0;
  }

  public set(key: K, value: number): void {
    this.counter.set(key, value);
  }

  public entries(): [K, number][] {
    return Array.from(this.counter.entries());
  }
}

function getCliOptions(args = process.argv.slice(2)) {
  args = args
    .map((arg) => arg.trim().toLowerCase())
    // Trim - or -- prefix for arguments
    .map((arg) => (arg.length === 2 ? arg.slice(1) : arg.slice(2)));

  const config = {
    useOriginFilters: ['use-origin-filters', 'o'],
    ignoreCache: ['ignore-cache', 'i'],
  };
  const options: Record<keyof typeof config, boolean> = {
    useOriginFilters: false,
    ignoreCache: false,
  };

  for (const [key, matches] of Object.entries(config)) {
    if (args.find((arg) => matches.includes(arg))) {
      options[key as keyof typeof config] = true;
    }
  }

  return options;
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const PREFIX =
  'https://raw.githubusercontent.com/ghostery/adblocker/master/packages/adblocker/assets';
const CACHE_DIR = './.list-cache';
const CACHE_THRESHOLD = 1000 * 60 * 60 * 24 * 3; // 3 days

async function loadAllListsFromLocal(): Promise<string> {
  return (
    await Promise.all(
      fullLists
        .map((path) => join(__dirname, '..', 'assets', path.slice(PREFIX.length)))
        .map((path) => fs.readFile(path, 'utf-8')),
    )
  ).join('\n');
}

function retrieveRemoteUrl(url: string): string {
  const path = url.slice(PREFIX.length);
  const [, owner, variant] = path.split('/');

  switch (owner) {
    case 'ublock-origin': {
      return 'https://ublockorigin.github.io/uAssets/filters/' + variant;
    }
    case 'easylist': {
      return 'https://easylist.to/easylist/' + variant;
    }
    case 'peter-lowe': {
      return 'https://pgl.yoyo.org/as/serverlist.php?hostformat=adblockplus&mimetype=plaintext';
    }
    default: {
      throw new Error('Unknown filter list URL format: ' + path);
    }
  }
}

function retrieveCacheUrl(remoteUrl: string): string {
  const key = remoteUrl.split('/').slice(-2).join('_');
  return join(CACHE_DIR, key);
}

async function fetchList(url: string): Promise<string> {
  const maxRetries = 5;
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`[INFO] Fetching "${url}"...`);

      const response = await fetch(url);
      const body = await response.text();

      return body;
    } catch (error) {
      console.warn(`[WARN] Failed to fetch "${url}"... retring (${i + 1}/${maxRetries})`);
    }
  }

  console.error(`[ERROR] Failed to fetch "${url}"!`);
  return '';
}

function retrieveListCache(cacheUrl: string): string {
  if (existsSync(cacheUrl) === false) {
    return '';
  }

  const body = readFileSync(cacheUrl, 'utf8');
  const timestampEndsAt = body.indexOf('=');
  if (timestampEndsAt === -1) {
    console.error(`[ERROR] Invalid cache entry found on "${cacheUrl}"!`);
    return '';
  }

  const timestamp = parseInt(body.slice(0, timestampEndsAt), 10);
  if (timestamp + CACHE_THRESHOLD < Date.now()) {
    return '';
  }

  return body.slice(timestampEndsAt + 1);
}

async function loadAllListsFromRemote(ignoreCache: boolean): Promise<string> {
  const contents: string[] = [];
  const errors: string[] = [];

  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  for (const remoteUrl of fullLists.map(retrieveRemoteUrl)) {
    const cacheUrl = retrieveCacheUrl(remoteUrl);
    let body = retrieveListCache(cacheUrl);
    if (ignoreCache || body.length === 0) {
      body = await fetchList(remoteUrl);
    }
    // Mark as an error when tried both cache and remote then all failed
    if (body.length === 0) {
      errors.push(remoteUrl);
    } else {
      // Update cache
      writeFileSync(cacheUrl, body, 'utf8');
      contents.push(body);
    }
  }

  console.warn(`[WARN] Possibly failed sources:
${errors.map((error) => `  - "${error}"`).join('\n')}`);

  return contents.join('\n');
}

async function loadAllLists(): Promise<string> {
  const options = getCliOptions();

  if (options.useOriginFilters) {
    return loadAllListsFromRemote(options.ignoreCache);
  }

  return loadAllListsFromLocal();
}

(async () => {
  let numberOfFiltersSupported = 0;
  let numberOfFiltersUnsupported = 0;

  const unsupported: Counter<string> = new Counter();
  for (const line of (await loadAllLists()).split(/\s*[\r\n]+\s*/g)) {
    switch (detectFilterType(line)) {
      case FilterType.NETWORK: {
        // Filter is not supported as is, try to find out why.
        if (NetworkFilter.parse(line) === null) {
          numberOfFiltersUnsupported += 1;
          const optionStart = line.lastIndexOf('$');

          // No option and not supported
          if (optionStart === -1) {
            unsupported.incr(line);
            continue;
          }

          // Not supported even without options
          if (NetworkFilter.parse(line.slice(0, optionStart)) === null) {
            unsupported.incr(line);
            continue;
          }

          // Try to drop each option and check if one is causing the filter parsing
          // failure. If we can't find one such option, we just report the full line
          // as not being supported.
          let found = false;
          const options = line.slice(optionStart + 1).split(',');
          for (const option of options) {
            if (NetworkFilter.parse(`${line.slice(0, optionStart)}$${option}`) === null) {
              found = true;
              unsupported.incr(option);
            }
          }

          if (found === false) {
            unsupported.incr(line);
          }
        } else {
          numberOfFiltersSupported += 1;
        }
        break;
      }
      case FilterType.COSMETIC: {
        // Filter is not supported as is, try to find out why.
        if (CosmeticFilter.parse(line) === null) {
          numberOfFiltersUnsupported += 1;

          // Most likely the issue is one or more procedural filters so we will
          // try to identify all of them and strip them one by one from the raw
          // line. Each time we strip an operator, we check if the filter can be
          // parsed.
          let indexOfColon = line.indexOf(':');
          let strippedFilter = line;
          let found = false;

          while (indexOfColon !== -1) {
            // Detect something of the form: :<operator>(
            const indexOfParenthesis = strippedFilter.indexOf('(', indexOfColon);
            if (indexOfParenthesis !== -1) {
              // Make sure 'operator' looks valid.
              const operator = strippedFilter.slice(indexOfColon, indexOfParenthesis);
              if (/^:[a-z-]+$/.test(operator)) {
                const filterWithoutOperator = `${strippedFilter.slice(
                  0,
                  indexOfColon,
                )}${strippedFilter.slice(indexOfParenthesis)}`;
                unsupported.incr(operator);

                if (CosmeticFilter.parse(filterWithoutOperator) !== null) {
                  found = true;
                  break;
                }

                strippedFilter = filterWithoutOperator;
              }
            }

            indexOfColon = strippedFilter.indexOf(':', indexOfColon + 1);
          }

          if (found === false) {
            unsupported.incr(line);
          }
        } else {
          numberOfFiltersSupported += 1;
        }
        break;
      }
      default: {
        if (
          line.length !== 0 &&
          line.startsWith('!') === false &&
          line.startsWith('[Adblock') === false
        ) {
          numberOfFiltersUnsupported += 1;
          const indexOfSharp = line.indexOf('#');
          if (indexOfSharp !== -1 && line.startsWith('#?#', indexOfSharp)) {
            unsupported.incr('#?#');
          } else {
            unsupported.incr(line);
          }
        }
        break;
      }
    }
  }

  for (const [name, count] of unsupported.entries().sort(([, c1], [, c2]) => c2 - c1)) {
    console.log(`+ ${name} = ${count}`);
  }

  console.log({
    numberOfFiltersSupported,
    numberOfFiltersUnsupported,
    percentage: 100 - 100.0 * (numberOfFiltersUnsupported / numberOfFiltersSupported),
  });
})();
