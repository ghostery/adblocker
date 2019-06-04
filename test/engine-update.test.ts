/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { FiltersEngine } from '../adblocker';
import { loadEasyListFilters, typedArrayEqual } from './utils';

import axios from 'axios';
import { brotliDecompressSync } from 'zlib';
import { generateDiff } from '../../adblocker';

describe('diff updates', () => {
  function testUpdates(name: string, baseFilters: string[]): void {
    describe(name, () => {
      const base = FiltersEngine.parse(baseFilters.join('\n'), {
        debug: false,
        enableCompression: false,
        enableOptimizations: false,
        integrityCheck: false,
        loadCosmeticFilters: false,
        loadGenericCosmeticsFilters: false,
        loadNetworkFilters: true,
      });
      const baseSerialized = base.serialize();

      const getSerialized = () => baseSerialized.slice();
      const getEngine = () => FiltersEngine.deserialize(getSerialized());

      it('stays the same with empty update', () => {
        const engine = getEngine();
        const updated = engine.updateFromDiff({});
        expect(updated).toBe(false);
        expect(typedArrayEqual(engine.serialize(), getSerialized())).toBe(true);
      });

      it('stays the same with adding removing same filters', () => {
        const filtersAdded = [
          '||hostname*^bar|$image,domain=foo.com|baz.co.uk',
          '||hostname*^bar|$image,domain=foo.com|baz.co.uk,generichide',

          '||hostame*^bar|$image,domain=foo.com|baz.co.uk,badfilter',
          '||hostame*^bar|$image,domain=foo.com|baz.co.uk',

          'ads$csp=foo',
          'tracker$redirect=foo.js',

          '@@||f*o*o.com^$~media',
          '/very_important/ads.js$important,script',

          'foo.com,bar.*##.selector',
          '#@#.selector',
          '##+js(inject.js,arg1,arg2)',
        ];
        const filtersRemoved = Array.from(filtersAdded);

        const engine = getEngine();

        // Add filters
        let updated = engine.updateFromDiff({ added: filtersAdded });
        expect(updated).toBe(true);
        expect(typedArrayEqual(engine.serialize(), getSerialized())).toBe(false);

        // Remove same filters
        updated = engine.updateFromDiff({ removed: filtersRemoved });
        expect(updated).toBe(true);
        expect(typedArrayEqual(engine.serialize(), getSerialized())).toBe(true);
      });
    });
  }

  testUpdates('empty engine', []);
  testUpdates('easylist engine', loadEasyListFilters());
});

/**
 * This test should not run as part of the regular test-suite because it takes
 * too long. On the other hand, it can be useful to run it from time to time to
 * make sure that engine updates work on all available diffs from CDN.
 */
describe.skip('stress test', () => {
  jest.setTimeout(3000000);

  function urlOfRevision(list: string, rev: string): string {
    return `https://cdn.cliqz.com/adblocker/resources/${list}/${rev}/list.txt`;
  }

  const REVISIONS_CACHE: Map<string, string> = new Map();

  async function getRevision(url: string): Promise<string> {
    const cached = REVISIONS_CACHE.get(url);
    if (cached !== undefined) {
      return cached;
    }

    let data = (await axios.get(url)).data;

    if (!data.startsWith('[Ad')) {
      const buffer = Buffer.from(
        (await axios.get(url, {
          responseType: 'arraybuffer',
        })).data,
      );
      data = brotliDecompressSync(buffer).toString('utf-8');
    }

    REVISIONS_CACHE.set(url, data);

    return data;
  }

  const ENGINES_CACHE: Map<string, Uint8Array> = new Map();

  function getEngine(list: string): Uint8Array {
    const cached = ENGINES_CACHE.get(list);
    if (cached !== undefined) {
      return cached.slice();
    }

    const engine = FiltersEngine.parse(list, { debug: true });
    const serialized = engine.serialize();
    ENGINES_CACHE.set(list, serialized);

    return serialized.slice();
  }

  for (const list of ['easyprivacy', 'easylist']) {
    it(list, async () => {
      const meta = (await axios.get(
        `https://cdn.cliqz.com/adblocker/resources/${list}/metadata.json`,
      )).data;

      // Skip the first one which will not have any previous rev
      const previousRevisions = [...meta.previousRevisions, meta.latestRevision];
      for (let i = 1; i < previousRevisions.length; i += 1) {
        const currentRevision = previousRevisions[i];
        const currentList = await getRevision(urlOfRevision(list, currentRevision));

        for (let j = Math.max(i - 7, 0); j < i; j += 1) {
          const previousRevision = previousRevisions[j];
          const previousList = await getRevision(urlOfRevision(list, previousRevision));

          // Generate diff between two versions
          const diff = generateDiff(previousList, currentList);

          // Check that previous rev and current rev do not yield the same Engine
          const currentEngine = FiltersEngine.deserialize(getEngine(currentList));
          const previousEngineSerialized = getEngine(previousList);
          expect(currentEngine).not.toEqual(FiltersEngine.deserialize(previousEngineSerialized));

          // Update `previousEngine` with diff and expect to find `currentEngine`
          const previousEngine = FiltersEngine.deserialize(previousEngineSerialized);
          const updated = previousEngine.updateFromDiff(diff);
          expect(updated).toBe(true);

          const updatedEngineFilters = previousEngine.getFilters();
          const currentEngineFilters = currentEngine.getFilters();

          // Check that cosmetic filters are the same
          expect(new Set(updatedEngineFilters.cosmeticFilters.map((f) => f.toString()))).toEqual(
            new Set(currentEngineFilters.cosmeticFilters.map((f) => f.toString())),
          );

          // Check that network filters are the same
          expect(new Set(updatedEngineFilters.networkFilters.map((f) => f.toString()))).toEqual(
            new Set(currentEngineFilters.networkFilters.map((f) => f.toString())),
          );
        }
      }
    });
  }
});
