/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { FiltersEngine } from '../adblocker';
import { loadEasyListFilters, typedArrayEqual } from './utils';

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
