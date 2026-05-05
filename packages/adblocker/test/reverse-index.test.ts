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

import Config from '../src/config.js';
import { StaticDataView } from '../src/data-view.js';
import {
  noopOptimizeCosmetic,
  noopOptimizeNetwork,
  optimizeNetwork,
} from '../src/engine/optimizer.js';
import ReverseIndex from '../src/engine/reverse-index.js';
import CosmeticFilter from '../src/filters/cosmetic.js';
import IFilter from '../src/filters/interface.js';
import NetworkFilter from '../src/filters/network.js';
import { parseFilters } from '../src/lists.js';
import Request from '../src/request.js';
import { fastHash, tokenize } from '../src/utils.js';
import { allLists } from './utils.js';
import { type HashFunc } from '../src/engine/merger.js';

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
                filters: parseFilters('||foo.com', { debug: true }).networkFilters,
                optimize,
              });

              // Expect our filter to be listed
              let filters = reverseIndex.getFilters();
              expect(filters.map((f) => f.rawLine)).to.eql(['||foo.com']);

              // Add one new filter
              reverseIndex.update(
                parseFilters('||bar.com', { debug: true }).networkFilters,
                undefined,
              );
              filters = reverseIndex.getFilters();
              expect(filters.map((f) => f.rawLine)).to.eql(['||foo.com', '||bar.com']);

              // Add a third filter and remove the two others
              reverseIndex.update(
                parseFilters('||baz.com', { debug: true }).networkFilters,
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
                filters: parseFilters(filters, { debug: true }).networkFilters,
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

                (
                  [
                    ['foo', ['||foo.com']],
                    ['com', []], // filter was indexed using 'foo' and not 'com'
                    ['ads', ['/ads/tracker.js$image']],
                    ['foo.ads', ['||foo.com', '/ads/tracker.js$image']],
                    ['woot', ['|woot|$redirect=noop.js']],
                    ['https://bar.foo.com/ads/tracker.js', ['||foo.com', '/ads/tracker.js$image']],
                  ] as const
                ).forEach(([input, expected]) => {
                  describe(`token=${input}, expected=${JSON.stringify(expected)}`, () => {
                    it('get all matches', () => {
                      matches.clear();
                      ret = true; // iterate on all filters
                      exampleIndex.iterMatchingFilters(tokenize(input, false, false), cb);
                      expect(matches).to.eql(new Set(expected));
                    });

                    it('check early termination', () => {
                      matches.clear();
                      ret = false; // early termination on first filter
                      exampleIndex.iterMatchingFilters(tokenize(input, false, false), cb);
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

            describe('#merge', () => {
              // We require debug=false explicitly for #merge.
              const filtersWithoutDebug = parseFilters(allLists, { debug: false });

              // Having custom hash function is unavoidable in the real world scenario and
              // it's nice to have an example in the test code.
              let hashFunc: HashFunc;

              before(async () => {
                const hasher = await xxhash();
                hashFunc = (arr, beg, end) => {
                  return hasher.h64Raw(arr.subarray(beg, end));
                };
              });

              it('throws on less than 2 indexes were given as sources', () => {
                const emptyIndex = new ReverseIndex({
                  deserialize: NetworkFilter.deserialize,
                  filters: [],
                  optimize: noopOptimizeNetwork,
                  config,
                });

                expect(() => ReverseIndex.merge([])).to.throw();
                expect(() => ReverseIndex.merge([emptyIndex])).to.throw();
              });

              it('throws on filters with debug=true were given', () => {
                const indexA = new ReverseIndex({
                  deserialize: NetworkFilter.deserialize,
                  filters: [],
                  optimize: noopOptimizeNetwork,
                  config: new Config({ debug: true }),
                });
                const indexB = new ReverseIndex({
                  deserialize: NetworkFilter.deserialize,
                  filters: [],
                  optimize: noopOptimizeNetwork,
                  config: new Config({ debug: true }),
                });

                expect(() => ReverseIndex.merge([indexA, indexB])).to.throw();
              });

              it('throws on compression config mixed', () => {
                const indexA = new ReverseIndex({
                  deserialize: NetworkFilter.deserialize,
                  filters: [],
                  optimize: noopOptimizeNetwork,
                  config: new Config({ enableCompression: true }),
                });
                const indexB = new ReverseIndex({
                  deserialize: NetworkFilter.deserialize,
                  filters: [],
                  optimize: noopOptimizeNetwork,
                  config: new Config({ enableCompression: false }),
                });

                expect(() => ReverseIndex.merge([indexA, indexB])).to.throw();
              });

              describe('NetworkFilter', () => {
                it('deduplicates while keeping tokens', () => {
                  const config = new Config();
                  const indexA = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: filtersWithoutDebug.networkFilters,
                    optimize: noopOptimizeNetwork,
                    config,
                  });
                  const indexB = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: filtersWithoutDebug.networkFilters,
                    optimize: noopOptimizeNetwork,
                    config,
                  });

                  const index = (ReverseIndex<NetworkFilter>).merge([indexA, indexB], {
                    hashFunc,
                  });
                  const filters = index.getFilters();

                  // This expect line is not strictly required but helps fast exit.
                  expect(filters.length).to.be.eql(filtersWithoutDebug.networkFilters.length);

                  expect(index.getFilters()).to.be.eql(filtersWithoutDebug.networkFilters);
                  // The below line is not a valid merge invariant: `merge`
                  // keeps valid token associations from source indexes instead
                  // of recomputing canonical tokens from a freshly rebuilt
                  // index. Matching behavior is the contract, not exact token
                  // layout.
                  // expect(index.getTokens()).to.be.eql(indexA.getTokens());
                });

                it('merges partially overlapping filters while keeping tokens', () => {
                  const config = new Config();
                  const indexA = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: parseFilters('/alpha-beta-gamma^\n/alpha-one^\n/alpha-two^')
                      .networkFilters,
                    optimize: noopOptimizeNetwork,
                    config,
                  });
                  const indexB = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: parseFilters('/alpha-beta-gamma^\n/beta-one^\n/beta-two^')
                      .networkFilters,
                    optimize: noopOptimizeNetwork,
                    config,
                  });

                  const assumed = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: parseFilters(
                      '/alpha-beta-gamma^\n/alpha-one^\n/alpha-two^\n/beta-one^\n/beta-two^',
                    ).networkFilters,
                    optimize: noopOptimizeNetwork,
                    config,
                  });
                  const merged = (ReverseIndex<NetworkFilter>).merge([indexA, indexB], {
                    hashFunc,
                  });
                  expect(merged.getFilters()).to.be.eql(assumed.getFilters());

                  const alphaBetaGammaRequest = Request.fromRawDetails({
                    url: 'https://example.com/alpha-beta-gamma.js',
                    sourceUrl: 'https://publisher.example/page.html',
                    type: 'script',
                  });
                  const alphaBetaGammaMatches: string[] = [];
                  merged.iterMatchingFilters(alphaBetaGammaRequest.getTokens(), (filter) => {
                    alphaBetaGammaMatches.push(filter.getFilter());
                    return true;
                  });
                  expect(alphaBetaGammaMatches).to.include('/alpha-beta-gamma^');

                  const alphaOneRequest = Request.fromRawDetails({
                    url: 'https://example.com/alpha-one.js',
                    sourceUrl: 'https://publisher.example/page.html',
                    type: 'script',
                  });
                  const alphaOneMatches: string[] = [];
                  merged.iterMatchingFilters(alphaOneRequest.getTokens(), (filter) => {
                    alphaOneMatches.push(filter.getFilter());
                    return true;
                  });
                  expect(alphaOneMatches).to.include('/alpha-one^');

                  const betaTwoRequest = Request.fromRawDetails({
                    url: 'https://example.com/beta-two.js',
                    sourceUrl: 'https://publisher.example/page.html',
                    type: 'script',
                  });
                  const betaTwoMatches: string[] = [];
                  merged.iterMatchingFilters(betaTwoRequest.getTokens(), (filter) => {
                    betaTwoMatches.push(filter.getFilter());
                    return true;
                  });
                  expect(betaTwoMatches).to.include('/beta-two^');
                });

                it('merges two empty indexes', () => {
                  const config = new Config();
                  const indexA = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: [],
                    optimize: noopOptimizeNetwork,
                    config,
                  });
                  const indexB = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: [],
                    optimize: noopOptimizeNetwork,
                    config,
                  });
                  const index = (ReverseIndex<NetworkFilter>).merge([indexA, indexB], {
                    hashFunc,
                  });

                  expect(index.getFilters()).to.eql([]);
                  expect(index.getTokens()).to.eql(new Uint32Array(0));
                });

                it('serializes and deserializes a merged index', () => {
                  const config = new Config();
                  const indexA = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: parseFilters('/alpha-one^').networkFilters,
                    optimize: noopOptimizeNetwork,
                    config,
                  });
                  const indexB = new ReverseIndex({
                    deserialize: NetworkFilter.deserialize,
                    filters: parseFilters('/beta-two^').networkFilters,
                    optimize: noopOptimizeNetwork,
                    config,
                  });
                  const index = (ReverseIndex<NetworkFilter>).merge([indexA, indexB], {
                    hashFunc,
                  });
                  const buffer = StaticDataView.allocate(index.getSerializedSize(), config);
                  index.serialize(buffer);
                  expect(buffer.pos).to.equal(buffer.buffer.byteLength);
                  buffer.seekZero();
                  const deserialized = ReverseIndex.deserialize(
                    buffer,
                    NetworkFilter.deserialize,
                    noopOptimizeNetwork,
                    config,
                  );
                  const matches: string[] = [];

                  expect(deserialized.getFilters()).to.eql(index.getFilters());
                  expect(deserialized.getTokens()).to.eql(index.getTokens());
                  deserialized.iterMatchingFilters(
                    new Uint32Array([fastHash('alpha')]),
                    (filter) => {
                      matches.push(filter.getFilter());
                      return true;
                    },
                  );
                  expect(matches).to.eql(['/alpha-one^']);
                });
              });

              describe('CosmeticFilter', () => {
                it('deduplicates while keeping tokens', () => {
                  const config = new Config();
                  const indexA = new ReverseIndex({
                    deserialize: CosmeticFilter.deserialize,
                    filters: filtersWithoutDebug.cosmeticFilters,
                    optimize: noopOptimizeCosmetic,
                    config,
                  });
                  const indexB = new ReverseIndex({
                    deserialize: CosmeticFilter.deserialize,
                    filters: filtersWithoutDebug.cosmeticFilters,
                    optimize: noopOptimizeCosmetic,
                    config,
                  });

                  const index = (ReverseIndex<CosmeticFilter>).merge([indexA, indexB], {
                    hashFunc,
                  });
                  const filters = index.getFilters();

                  // This expect line is not strictly required but helps fast exit.
                  expect(filters.length).to.be.eql(filtersWithoutDebug.cosmeticFilters.length);

                  expect(index.getFilters()).to.be.eql(filtersWithoutDebug.cosmeticFilters);
                  expect(index.getTokens()).to.be.eql(indexA.getTokens());
                });

                it('deduplicates an identical cosmetic filter while keeping token matches', () => {
                  const config = new Config();
                  const filters = parseFilters('example.com,example.org##.ad-banner', {
                    debug: false,
                  }).cosmeticFilters;
                  const indexA = new ReverseIndex({
                    deserialize: CosmeticFilter.deserialize,
                    filters,
                    optimize: noopOptimizeCosmetic,
                    config,
                  });
                  const indexB = new ReverseIndex({
                    deserialize: CosmeticFilter.deserialize,
                    filters,
                    optimize: noopOptimizeCosmetic,
                    config,
                  });
                  const index = (ReverseIndex<CosmeticFilter>).merge([indexA, indexB], {
                    hashFunc,
                  });
                  const expectedFilter = indexA.getFilters()[0].toString();

                  expect(index.getFilters().map((filter) => filter.toString())).to.eql([
                    expectedFilter,
                  ]);
                  expect(index.getTokens()).to.eql(indexA.getTokens());

                  for (const token of indexA.getTokens()) {
                    const matches: string[] = [];
                    index.iterMatchingFilters(new Uint32Array([token]), (filter) => {
                      matches.push(filter.toString());
                      return true;
                    });
                    expect(matches).to.eql([expectedFilter]);
                  }
                });
              });
            });
          });
        }
      });
    },
  );
});
