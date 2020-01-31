/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { promises as fs } from 'fs';
import { join } from 'path';

import { CosmeticFilter, detectFilterType, NetworkFilter } from '../adblocker';


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

async function loadAllLists() {
  const assets = await Promise.all(
    [
      '../assets/easylist/easylist.txt',
      '../assets/easylist/easylistgermany.txt',
      '../assets/easylist/easyprivacy.txt',
      '../assets/fanboy/annoyance.txt',
      '../assets/easylist/easylist-cookie.txt',
      '../assets/peter-lowe/serverlist.txt',
      '../assets/ublock-origin/annoyances.txt',
      '../assets/ublock-origin/badware.txt',
      '../assets/ublock-origin/filters.txt',
      '../assets/ublock-origin/privacy.txt',
      '../assets/ublock-origin/resource-abuse.txt',
      '../assets/ublock-origin/unbreak.txt',
    ].map((p) => fs.readFile(join(__dirname, p), 'utf-8')),
  );

  return assets.join('\n');
}

type Key =
  | 'redirect-rule='
  | 'popunder'
  | 'popup'
  | 'webrtc'
  | 'inline-script'
  | 'genericblock'
  | 'all'
  | ':has('
  | ':xpath('
  | '^script:has-text('
  | ':nth-of-type('
  | ':nth-ancestor('
  | ':matches-css-before('
  | ':matches-css('
  | ':if('
  | ':has-text('
  | '#@#+js('
  | 'redirect=none'
  | '+js()';

(async () => {
  const unsupported: Counter<Key> = new Counter();
  const raw = await loadAllLists();
  for (const line of raw.split(/\s*[\r\n]+\s*/g)) {
    const type = detectFilterType(line);
    if (type === 1) {

      if (line.includes('redirect=none')) {
        unsupported.incr('redirect=none');
        continue;
      }

      if (line.includes('#@#+js(')) {
        unsupported.incr('#@#+js(');
        continue;
      }

      if (line.includes('+js()')) {
        unsupported.incr('+js()');
        continue;
      }
      const parsed = NetworkFilter.parse(line);
      let optionStart = line.lastIndexOf('$');
      if (optionStart === -1) {
        optionStart = 0;
      }

      if (parsed === null) {
        let found = false;

        const patterns: Key[] = [
          'popunder',
          'popup',
          'webrtc',
          'genericblock',
        ];

        for (const pattern of patterns) {
          if (line.includes(pattern, optionStart)) {
            found = true;
            unsupported.incr(pattern);
          }
        }

        if (found === false) {
          console.log('network', line);
        }
      }
    } else if (type === 2) {
      // const i1 = line.indexOf('##');
      // if (i1 !== -1) {
      //   console.log('!!!', line.slice(i1 + 2));
      // }

      // const i2 = line.indexOf('#@#');
      // if (i2 !== -1) {
      //   console.log('???', line.slice(i2 + 3));
      // }

      const parsed = CosmeticFilter.parse(line);
      if (parsed === null) {
        let found = false;

        const patterns: Key[] = [
          ':has(',
          ':xpath(',
          '^script:has-text(',
          ':nth-of-type(',
          ':nth-ancestor(',
          ':matches-css-before(',
          ':matches-css(',
          ':if(',
          ':has-text(',
        ];

        for (const pattern of patterns) {
          if (line.includes(pattern)) {
            found = true;
            unsupported.incr(pattern);
          }
        }

        if (found === false) {
          console.log('cosmetic', line);
        }
      }
    }
  }

  for (const [name, count] of unsupported.entries().sort(([_1, c1], [_2, c2]) => c2 -c1)) {
    console.log(`+ ${name} = ${count}`);
  }
})();
