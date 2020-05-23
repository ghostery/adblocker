/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import Config from '../src/config';
import { StaticDataView } from '../src/data-view';
import {
  noopOptimizeCosmetic,
  noopOptimizeNetwork,
  optimizeNetwork,
} from '../src/engine/optimizer';
import ReverseIndex from '../src/engine/reverse-index';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';
import { fastHash, tokenize } from '../src/utils';
import { allLists } from './utils';

describe('ReverseIndex', () => {
  const { cosmeticFilters, networkFilters } = parseFilters(allLists, { debug: true });

  [new Config({ enableCompression: true }), new Config({ enableCompression: false })].forEach(
    (config) => {
      describe(`compression = ${config.enableCompression}`, () => {
        describe('#serialize', () => {
          function testSerializeIndexImpl<T extends IFilter>(
            filters: T[],
            deserialize: (buffer: StaticDataView) => T,
            optimize: (_: T[]) => T[],
          ): void {
            const reverseIndex = new ReverseIndex({
              config,
              deserialize,
              filters,
              optimize,
            });

            // Serialize index
            const buffer = StaticDataView.allocate(reverseIndex.getSerializedSize(), config);
            reverseIndex.serialize(buffer);

            // Make sure that we predicted serialized size properly
            expect(buffer.pos).to.equal(buffer.buffer.byteLength);

            // Deserialize
            buffer.seekZero();

            const deserialized = ReverseIndex.deserialize(buffer, deserialize, optimize, config);
            expect(deserialized).to.eql(reverseIndex);
          }

          it('network (optimize = false)', () => {
            testSerializeIndexImpl(networkFilters, NetworkFilter.deserialize, noopOptimizeNetwork);
          });

          it('network (optimize = true)', () => {
            testSerializeIndexImpl(networkFilters, NetworkFilter.deserialize, optimizeNetwork);
          });

          it('cosmetic', () => {
            testSerializeIndexImpl(
              cosmeticFilters,
              CosmeticFilter.deserialize,
              noopOptimizeCosmetic,
            );
          });
        });

        describe('#getFilters', () => {
          it('network (optimize = false)', () => {
            expect(
              new ReverseIndex({
                config,
                deserialize: NetworkFilter.deserialize,
                filters: networkFilters,
                optimize: noopOptimizeNetwork,
              }).getFilters(),
            ).to.eql(networkFilters);
          });

          it('network (optimize = true)', () => {
            expect(
              new ReverseIndex({
                config,
                deserialize: NetworkFilter.deserialize,
                filters: networkFilters,
                optimize: optimizeNetwork,
              }).getFilters(),
            ).to.eql(networkFilters);
          });

          it('cosmetic', () => {
            expect(
              new ReverseIndex({
                config,
                deserialize: CosmeticFilter.deserialize,
                filters: cosmeticFilters,
                optimize: noopOptimizeCosmetic,
              }).getFilters(),
            ).to.eql(cosmeticFilters);
          });
        });

        for (const optimize of [noopOptimizeNetwork, optimizeNetwork]) {
          describe(`optimize = ${optimize !== noopOptimizeNetwork}`, () => {
            it('#update', () => {
              const reverseIndex = new ReverseIndex({
                config,
                deserialize: NetworkFilter.deserialize,
                filters: parseFilters('||foo.com', { loadCosmeticFilters: false, debug: true })
                  .networkFilters,
                optimize,
              });

              // Expect our filter to be listed
              let filters = reverseIndex.getFilters();
              expect(filters.map((f) => f.rawLine)).to.eql(['||foo.com']);

              // Add one new filter
              reverseIndex.update(
                parseFilters('||bar.com', { loadCosmeticFilters: false, debug: true })
                  .networkFilters,
                undefined,
              );
              filters = reverseIndex.getFilters();
              expect(filters.map((f) => f.rawLine)).to.eql(['||foo.com', '||bar.com']);

              // Add a third filter and remove the two others
              reverseIndex.update(
                parseFilters('||baz.com', { loadCosmeticFilters: false, debug: true })
                  .networkFilters,
                new Set(filters.map((f) => f.getId())),
              );
              filters = reverseIndex.getFilters();
              expect(filters.map((f) => f.rawLine)).to.eql(['||baz.com']);

              // Update with no filters
              reverseIndex.update([], new Set(reverseIndex.getFilters().map((f) => f.getId())));
              expect(reverseIndex.getFilters()).to.eql([]);
            });

            describe('#iterMatchingFilters', () => {
              const emptyIndex = new ReverseIndex({
                config,
                deserialize: NetworkFilter.deserialize,
                filters: [],
                optimize,
              });
              const filters = `
||foo.com
/ads/tracker.js$image
|woot|$redirect=noop.js
      `;
              const exampleIndex = new ReverseIndex({
                config,
                deserialize: NetworkFilter.deserialize,
                filters: parseFilters(filters, { loadCosmeticFilters: false, debug: true })
                  .networkFilters,
                optimize,
              });

              it('works on empty index', () => {
                let matches = 0;
                const cb = (_: NetworkFilter) => {
                  matches += 1;
                  return true;
                };

                // No tokens
                emptyIndex.iterMatchingFilters(new Uint32Array(0), cb);
                expect(matches).to.equal(0);

                // Some tokens
                emptyIndex.iterMatchingFilters(tokenize('foo bar baz', false, false), cb);
                expect(matches).to.equal(0);
              });

              it('handle no match', () => {
                for (let i = 0; i < 100; i += 1) {
                  let matches = 0;
                  const cb = (_: NetworkFilter) => {
                    matches += 1;
                    return true;
                  };

                  // No tokens
                  exampleIndex.iterMatchingFilters(new Uint32Array([i]), cb);
                  expect(matches).to.equal(0);
                }
              });

              describe('finds matches', () => {
                const matches: Set<string | undefined> = new Set();
                let ret: boolean = true;
                const cb = (f: NetworkFilter) => {
                  matches.add(f.rawLine);
                  return ret;
                };

                [
                  ['foo', ['||foo.com']],
                  ['com', []], // filter was indexed using 'foo' and not 'com'
                  ['ads', ['/ads/tracker.js$image']],
                  ['foo.ads', ['||foo.com', '/ads/tracker.js$image']],
                  ['woot', ['|woot|$redirect=noop.js']],
                  ['https://bar.foo.com/ads/tracker.js', ['||foo.com', '/ads/tracker.js$image']],
                ].forEach(([input, expected]) => {
                  describe(`token=${input}, expected=${JSON.stringify(expected)}`, () => {
                    it('get all matches', () => {
                      matches.clear();
                      ret = true; // iterate on all filters
                      exampleIndex.iterMatchingFilters(tokenize(input as string, false, false), cb);
                      expect(matches).to.eql(new Set(expected));
                    });

                    it('check early termination', () => {
                      matches.clear();
                      ret = false; // early termination on first filter
                      exampleIndex.iterMatchingFilters(tokenize(input as string, false, false), cb);
                      expect(matches.size).to.equal(expected.length === 0 ? 0 : 1);
                    });
                  });
                });
              });

              it('stores filters without tokens in wildcard bucket', () => {
                const index = new ReverseIndex({
                  config,
                  deserialize: NetworkFilter.deserialize,
                  filters: parseFilters(
                    `
wildcard
||foo.com
      `,
                    { loadCosmeticFilters: false, debug: true },
                  ).networkFilters,
                  optimize,
                });

                const matches: Set<string | undefined> = new Set();
                const cb = (f: NetworkFilter) => {
                  matches.add(f.rawLine);
                  return true;
                };

                // Wildcard filter is always returned
                [
                  ['foo', ['||foo.com', 'wildcard']],
                  ['com', ['wildcard']], // filter was indexed using 'foo' and not 'com'
                ].forEach(([input, expected]) => {
                  // Get all matches
                  matches.clear();
                  index.iterMatchingFilters(tokenize(input as string, false, false), cb);
                  expect(matches).to.eql(new Set(expected));
                });
              });
            });

            describe('#getTokens', () => {
              it('no token if empty', () => {
                expect(
                  new ReverseIndex({
                    config,
                    deserialize: NetworkFilter.deserialize,
                    filters: [],
                    optimize,
                  }).getTokens(),
                ).to.eql(new Uint32Array(0));
              });

              it('returns all indexing tokens', () => {
                expect(
                  new ReverseIndex({
                    config,
                    deserialize: NetworkFilter.deserialize,
                    filters: parseFilters(`
/ads^
/foo^
-bar-
          `).networkFilters,
                    optimize,
                  })
                    .getTokens()
                    .sort(),
                ).to.eql(
                  new Uint32Array([fastHash('ads'), fastHash('foo'), fastHash('bar')]).sort(),
                );
              });
            });
          });
        }
      });
    },
  );
});
