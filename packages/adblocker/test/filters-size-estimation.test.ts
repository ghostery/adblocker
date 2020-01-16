/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import StaticDataView from '../src/data-view';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';
import { loadAllLists } from './utils';

describe('Make sure size estimate is accurate', () => {
  const { cosmeticFilters, networkFilters } = parseFilters(loadAllLists(), { debug: true });

  function testSizeEstimate<T extends IFilter>(filters: T[], compression: boolean): void {
    const buffer = StaticDataView.allocate(1000000, { enableCompression: compression });

    for (let i = 0; i < filters.length; i += 1) {
      const filter = filters[i];
      const estimate = filter.getSerializedSize(compression);

      // Serialize filter
      buffer.seekZero();
      filter.serialize(buffer);
      const realSize = buffer.pos;

      if (realSize !== estimate) {
        throw new Error(`${filter.toString()} got ${estimate} expected ${realSize}`);
      } else {
        expect(realSize).toBe(estimate);
      }
    }
  }

  it('network', () => {
    testSizeEstimate<NetworkFilter>(networkFilters, false);
  });

  it('network (compression)', () => {
    testSizeEstimate<NetworkFilter>(networkFilters, true);
  });

  it('cosmetic', () => {
    testSizeEstimate<CosmeticFilter>(cosmeticFilters, false);
  });

  it('cosmetic (compression)', () => {
    testSizeEstimate<CosmeticFilter>(cosmeticFilters, true);
  });
});
