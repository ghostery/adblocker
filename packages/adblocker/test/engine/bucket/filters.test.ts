/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import Config from '../../../src/config';
import FiltersContainer from '../../../src/engine/bucket/filters';
import CosmeticFilter from '../../../src/filters/cosmetic';
import NetworkFilter from '../../../src/filters/network';
import { parseFilters } from '../../../src/lists';
import { allLists } from '../../utils';

describe('#FiltersContainer', () => {
  for (const config of [
    new Config({ enableCompression: true }),
    new Config({ enableCompression: false }),
  ]) {
    describe(`compression = ${config.enableCompression}`, () => {
      describe('#update', () => {
        let container: FiltersContainer<NetworkFilter>;
        const filters = [
          NetworkFilter.parse('||foo.com', true) as NetworkFilter,
          NetworkFilter.parse('||bar.com', true) as NetworkFilter,
          NetworkFilter.parse('||baz.com', true) as NetworkFilter,
        ];

        beforeEach(() => {
          container = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
        });

        it('with no filters', () => {
          expect(container.getFilters()).to.have.lengthOf(0);
          container.update([], undefined);
          expect(container.getFilters()).to.have.lengthOf(0);
        });

        it('with one filter', () => {
          expect(container.getFilters()).to.have.lengthOf(0);
          container.update([filters[0]], undefined);
          expect(container.getFilters().map((f: NetworkFilter) => f.rawLine)).to.eql([
            filters[0].rawLine,
          ]);
        });

        it('with one filter', () => {
          container.update([filters[0]], undefined);
          container.update([], undefined);
          expect(container.getFilters().map((f: NetworkFilter) => f.rawLine)).to.eql([
            filters[0].rawLine,
          ]);
        });

        it('deletes one filter', () => {
          container.update([filters[0]], undefined);
          container.update([], new Set([filters[0].getId()]));
          expect(container.getFilters()).to.have.lengthOf(0);
        });

        it('deletes and adds one filter', () => {
          container.update([filters[0]], undefined);
          container.update([filters[1]], new Set([filters[0].getId()]));
          expect(container.getFilters().map((f: NetworkFilter) => f.rawLine)).to.eql([
            filters[1].rawLine,
          ]);
        });

        it('multiple updates', () => {
          container.update([filters[0]], undefined);
          container.update([filters[1], filters[2]], new Set([filters[0].getId()]));
          expect(container.getFilters().map((f: NetworkFilter) => f.rawLine)).to.eql([
            filters[1].rawLine,
            filters[2].rawLine,
          ]);
          container.update([], new Set([filters[2].getId(), filters[1].getId()]));
          expect(container.getFilters()).to.have.lengthOf(0);
        });
      });

      describe('#getFilters', () => {
        it('network', () => {
          const filters = parseFilters(allLists, {
            debug: true,
            loadCosmeticFilters: false,
          }).networkFilters;

          expect(
            new FiltersContainer({
              config,
              deserialize: NetworkFilter.deserialize,
              filters,
            }).getFilters(),
          ).to.eql(filters);
        });

        it('cosmetic', () => {
          const filters = parseFilters(allLists, {
            debug: true,
            loadNetworkFilters: false,
          }).cosmeticFilters;

          expect(
            new FiltersContainer({
              config,
              deserialize: CosmeticFilter.deserialize,
              filters,
            }).getFilters(),
          ).to.eql(filters);
        });
      });
    });
  }
});
