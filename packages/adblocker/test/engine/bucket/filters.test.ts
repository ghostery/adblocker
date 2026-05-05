/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';
import xxhash from 'xxhash-wasm';

import Config from '../../../src/config.js';
import { StaticDataView } from '../../../src/data-view.js';
import FiltersContainer from '../../../src/engine/bucket/filters.js';
import CosmeticFilter from '../../../src/filters/cosmetic.js';
import NetworkFilter from '../../../src/filters/network.js';
import { parseFilters } from '../../../src/lists.js';
import { allLists } from '../../utils.js';
import { type HashFunc } from '../../../src/engine/merger.js';

describe('#FiltersContainer', () => {
  for (const config of [
    new Config({ enableCompression: true }),
    new Config({ enableCompression: false }),
  ]) {
    describe(`compression = ${config.enableCompression}`, () => {
      describe('#serialize', () => {
        it('stores an empty container as count-only', () => {
          const container = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });

          expect(container.offsets.length).to.equal(0);
          expect(container.filters.byteLength).to.equal(0);

          const serialized = StaticDataView.allocate(container.getSerializedSize(), config);
          container.serialize(serialized);
          serialized.seekZero();
          expect(serialized.getUint32()).to.equal(0);
        });

        it('stores count, offsets, and independently deserializable network filters', () => {
          const filters = parseFilters(
            '||foo.com\n/ads/tracker.js$image\n|woot|$redirect=noop.js',
            {
              debug: true,
              loadCosmeticFilters: false,
            },
          ).networkFilters;
          const container = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters,
          });

          expect(container.offsets.length).to.equal(filters.length + 1);
          const offsets = Array.from(container.offsets);

          expect(offsets[0]).to.equal(0);
          for (let i = 0; i < filters.length; i += 1) {
            expect(offsets[i + 1]).to.be.greaterThan(offsets[i]);
            const segment = container.filters.subarray(offsets[i], offsets[i + 1]);
            const segmentView = StaticDataView.fromUint8Array(segment, config);
            const deserialized = NetworkFilter.deserialize(segmentView);
            expect(segmentView.pos).to.equal(segment.byteLength);
            expect(deserialized).to.eql(filters[i]);
          }
          expect(offsets[offsets.length - 1]).to.equal(container.filters.byteLength);
          expect(container.getFilters()).to.eql(filters);

          const serialized = StaticDataView.allocate(container.getSerializedSize(), config);
          container.serialize(serialized);
          expect(serialized.pos).to.equal(serialized.buffer.byteLength);
          serialized.seekZero();
          const deserialized = FiltersContainer.deserialize(
            serialized,
            NetworkFilter.deserialize,
            config,
          );
          expect(deserialized.offsets).to.eql(container.offsets);
          expect(deserialized.filters).to.eql(container.filters);
          expect(deserialized.getFilters()).to.eql(filters);
        });
      });

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

      describe('#merge', () => {
        let hashFunc: HashFunc;

        before(async () => {
          const hasher = await xxhash();
          hashFunc = (arr: Uint8Array, beg: number, end: number) =>
            hasher.h64Raw(arr.subarray(beg, end));
        });

        it('throws on fewer than two source containers', () => {
          const empty = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          expect(() => FiltersContainer.merge([])).to.throw();
          expect(() => FiltersContainer.merge([empty])).to.throw();
        });

        it('throws for debug=true source', () => {
          const debugConfig = new Config({
            debug: true,
            enableCompression: config.enableCompression,
          });
          const sourceA = new FiltersContainer({
            config: debugConfig,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          const sourceB = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          expect(() => FiltersContainer.merge([sourceA, sourceB])).to.throw();
        });

        it('throws for mixed compression settings', () => {
          const sourceA = new FiltersContainer({
            config: new Config({ enableCompression: true }),
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          const sourceB = new FiltersContainer({
            config: new Config({ enableCompression: false }),
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          expect(() => FiltersContainer.merge([sourceA, sourceB])).to.throw();
        });

        it('merges two empty containers', () => {
          const sourceA = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          const sourceB = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          const merged = FiltersContainer.merge([sourceA, sourceB], { hashFunc });
          expect(merged.offsets.length).to.equal(0);
          expect(merged.filters.byteLength).to.equal(0);
          expect(merged.getSerializedSize()).to.equal(4);
          expect(merged.getFilters()).to.eql([]);
        });

        it('merges empty and non-empty containers', () => {
          const filters = parseFilters('/alpha-one^\n/beta-two^').networkFilters;
          const empty = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          const nonEmpty = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters,
          });
          expect(FiltersContainer.merge([empty, nonEmpty], { hashFunc }).getFilters()).to.eql(
            filters,
          );
        });

        it('deduplicates overlapping network filters in first-seen order', () => {
          const sourceAFilters = parseFilters(
            '/alpha-one^\n/beta-two^\n/gamma-three^',
          ).networkFilters;
          const sourceBFilters = parseFilters('/beta-two^\n/delta-four^').networkFilters;
          const sourceA = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: sourceAFilters,
          });
          const sourceB = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: sourceBFilters,
          });
          const expected = parseFilters(
            '/alpha-one^\n/beta-two^\n/gamma-three^\n/delta-four^',
          ).networkFilters;
          expect(FiltersContainer.merge([sourceA, sourceB], { hashFunc }).getFilters()).to.eql(
            expected,
          );
        });

        it('serializes and deserializes a merged container', () => {
          const sourceA = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: parseFilters('/alpha-one^').networkFilters,
          });
          const sourceB = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: parseFilters('/beta-two^').networkFilters,
          });
          const merged = FiltersContainer.merge([sourceA, sourceB], { hashFunc });
          const buffer = StaticDataView.allocate(merged.getSerializedSize(), config);
          merged.serialize(buffer);
          expect(buffer.pos).to.equal(buffer.buffer.byteLength);
          buffer.seekZero();
          const deserialized = FiltersContainer.deserialize(
            buffer,
            NetworkFilter.deserialize,
            config,
          );
          expect(deserialized.offsets).to.eql(merged.offsets);
          expect(deserialized.filters).to.eql(merged.filters);
          expect(deserialized.getFilters()).to.eql(merged.getFilters());
        });

        it('deduplicates cosmetic filters', () => {
          const filters = parseFilters('example.com##.ad-banner\nexample.org##.sponsor', {
            debug: false,
          }).cosmeticFilters;
          const sourceA = new FiltersContainer({
            config,
            deserialize: CosmeticFilter.deserialize,
            filters,
          });
          const sourceB = new FiltersContainer({
            config,
            deserialize: CosmeticFilter.deserialize,
            filters,
          });
          expect(FiltersContainer.merge([sourceA, sourceB], { hashFunc }).getFilters()).to.eql(
            filters,
          );
        });

        it('passes valid serialized network filter ranges to the supplied hash function', () => {
          const filters = parseFilters('/alpha-one^\n/beta-two^').networkFilters;
          const sourceA = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters,
          });
          const sourceB = new FiltersContainer({
            config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
          });
          const seen: NetworkFilter[] = [];
          const recordingHashFunc: HashFunc = (arr, beg, end) => {
            seen.push(
              NetworkFilter.deserialize(
                StaticDataView.fromUint8Array(arr.subarray(beg, end), config),
              ),
            );
            return hashFunc(arr, beg, end);
          };
          FiltersContainer.merge([sourceA, sourceB], { hashFunc: recordingHashFunc });
          expect(seen).to.eql(filters);
        });
      });
    });
  }
});
