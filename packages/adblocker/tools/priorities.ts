/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { promises as fs } from 'fs';
import { join } from 'path';

import {
  fullLists,
  CosmeticFilter,
  detectFilterType,
  NetworkFilter,
  FilterType,
} from '../adblocker';

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

  for (const [name, count] of unsupported.entries().sort(([_1, c1], [_2, c2]) => c2 - c1)) {
    console.log(`+ ${name} = ${count}`);
  }

  console.log({
    numberOfFiltersSupported,
    numberOfFiltersUnsupported,
    percentage: 100 - 100.0 * (numberOfFiltersUnsupported / numberOfFiltersSupported),
  });
})();
