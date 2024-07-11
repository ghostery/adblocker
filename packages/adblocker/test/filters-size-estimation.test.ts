/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { StaticDataView } from '../src/data-view.js';
import CosmeticFilter from '../src/filters/cosmetic.js';
import IFilter from '../src/filters/interface.js';
import NetworkFilter from '../src/filters/network.js';
import { parseFilters } from '../src/lists.js';
import { allLists } from './utils.js';

describe('Make sure size estimate is accurate', () => {
  const { cosmeticFilters, networkFilters } = parseFilters(allLists, { debug: true });

  function testSizeEstimate<T extends IFilter>(filters: T[], compression: boolean): void {
    const buffer = StaticDataView.allocate(1000000, { enableCompression: compression });

    for (let i = 0; i < filters.length; i += 1) {
      const filter = filters[i];
      const estimate = filter.getSerializedSize(compression);

      // Serialize filter
      buffer.seekZero();
      filter.serialize(buffer);
      const realSize = buffer.pos;

      if (estimate !== realSize) {
        expect(estimate, filter.toString()).to.equal(realSize);
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
