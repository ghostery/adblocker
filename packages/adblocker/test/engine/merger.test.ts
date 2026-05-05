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
import FilterEngine from '../../src/engine/engine.js';
import Resources from '../../src/resources.js';
import { Metadata } from '../../src/engine/metadata.js';
import {
  binaryMerge,
  legacyMerge,
  mergeLists,
  mergeMetadata,
  mergePreprocessors,
} from '../../src/engine/merger.js';
import { type HashFunc } from '../../src/engine/merger.js';
import { Env } from '../../src/preprocessor.js';
import Request from '../../src/request.js';

describe('#mergeMetadata', () => {
  function createRawMetadata(key: string) {
    return {
      organizations: {
        [key]: {
          key,
          name: key,
          description: null,
          website_url: null,
          country: null,
          privacy_policy_url: null,
          privacy_contact: null,
          ghostery_id: null,
        },
      },
      categories: {
        [key]: {
          key,
          name: key,
          color: '#fff',
          description: key,
        },
      },
      patterns: {
        [key]: {
          key,
          name: key,
          category: key,
          organization: null,
          alias: null,
          website_url: null,
          ghostery_id: null,
          domains: [key],
          filters: [key],
        },
      },
    };
  }

  it('merges metadata from both engines', () => {
    const engine1 = FilterEngine.empty();
    engine1.metadata = new Metadata(createRawMetadata('foo'));
    const engine2 = FilterEngine.empty();
    engine2.metadata = new Metadata(createRawMetadata('bar'));

    const metadata = mergeMetadata([engine1, engine2]);
    expect(Object.keys(metadata.categories)).to.have.length(2);
    expect(Object.keys(metadata.organizations)).to.have.length(2);
    expect(Object.keys(metadata.patterns)).to.have.length(2);
  });

  it('removes duplicates', () => {
    const engine1 = FilterEngine.empty();
    engine1.metadata = new Metadata(createRawMetadata('foo'));
    const engine2 = FilterEngine.empty();
    engine2.metadata = new Metadata(createRawMetadata('foo'));

    const metadata = mergeMetadata([engine1, engine2]);
    expect(Object.keys(metadata.categories)).to.have.length(1);
    expect(Object.keys(metadata.organizations)).to.have.length(1);
    expect(Object.keys(metadata.patterns)).to.have.length(1);
  });
});

describe('#mergeLists', () => {
  it('merges lists from both engines', () => {
    const engine1 = new FilterEngine({ lists: new Map([['a', 'a']]) });
    const engine2 = new FilterEngine({ lists: new Map([['b', 'b']]) });

    expect(mergeLists([engine1, engine2])).to.deep.equal(
      new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]),
    );
    // Check that the original engines are not modified

    expect(engine1)
      .to.have.property('lists')
      .that.deep.equal(new Map([['a', 'a']]));

    expect(engine2)
      .to.have.property('lists')
      .that.deep.equal(new Map([['b', 'b']]));
  });

  it('removes duplicates', () => {
    const engine1 = new FilterEngine({ lists: new Map([['a', 'a']]) });
    const engine2 = new FilterEngine({ lists: new Map([['a', 'a']]) });

    expect(mergeLists([engine1, engine2])).to.deep.equal(new Map([['a', 'a']]));
  });
});

describe('#mergePreprocessors', () => {
  it('merges preprocessors from both engines', () => {
    const preprocessors = mergePreprocessors([
      FilterEngine.parse(
        `
          ###foo
          !#if env_test
          bar
          !#endif
        `,
        { loadPreprocessors: true },
      ),
      FilterEngine.parse(
        `
          !#if env_ghostery
          ###foo
          !#endif
          bar
        `,
        { loadPreprocessors: true },
      ),
    ]);

    expect(preprocessors).to.have.length(2);
  });

  it('removes duplicates', () => {
    const preprocessors = mergePreprocessors([
      FilterEngine.parse(
        `
          !#if env_ghostery
          bar
          !#endif
        `,
        { loadPreprocessors: true },
      ),
      FilterEngine.parse(
        `
          !#if env_ghostery
          ###foo
          !#endif
        `,
        { loadPreprocessors: true },
      ),
    ]);

    expect(preprocessors).to.have.length(1);
    expect(preprocessors[0].filterIDs).to.have.property('size', 2);
  });
});

describe('#legacyMerge', () => {
  it('throws with no or one engine', () => {
    const error = 'merging engines requires at least two engines';
    // @ts-expect-error Expected to throw an error
    expect(() => legacyMerge.call(FilterEngine)).to.throw(error);
    expect(() => legacyMerge.call(FilterEngine, [])).to.throw(error);
    expect(() => legacyMerge.call(FilterEngine, [FilterEngine.empty()])).to.throw(error);
  });

  it('merges empty engines', () => {
    const filters = legacyMerge
      .call(FilterEngine, [FilterEngine.empty(), FilterEngine.empty()])
      .getFilters();
    expect(filters).to.have.property('networkFilters').that.have.length(0);
    expect(filters).to.have.property('cosmeticFilters').that.have.length(0);
  });

  context('with network filters', () => {
    it('merges filters from both engines', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('foo'), FilterEngine.parse('bar')])
        .getFilters();
      expect(filters).to.have.property('networkFilters').that.have.length(2);
    });

    it('removes duplicates', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('foo$third-party'), FilterEngine.parse('foo$3p')])
        .getFilters();
      expect(filters).to.have.property('networkFilters').that.have.length(1);
    });

    it('merges $removeparam', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('foo$removeparam=zar'), FilterEngine.parse('bar')])
        .getFilters();
      expect(filters).to.have.property('networkFilters').that.have.length(2);
    });
  });

  context('with cosmetic filters', () => {
    it('merges filters from both engines', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('###foo'), FilterEngine.parse('###bar')])
        .getFilters();
      expect(filters).to.have.property('cosmeticFilters').that.have.length(2);
    });

    it('removes duplicates', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('###foo'), FilterEngine.parse('###foo')])
        .getFilters();
      expect(filters).to.have.property('cosmeticFilters').that.have.length(1);
    });
  });

  context('configs', () => {
    it('does not throw with different configs - takes values from first', () => {
      const engine1 = FilterEngine.empty({ loadCosmeticFilters: true });
      const engine2 = FilterEngine.empty({ loadCosmeticFilters: false });
      const engine = legacyMerge.call(FilterEngine, [engine1, engine2]);
      expect(engine.config).to.have.property('loadCosmeticFilters').that.equal(true);
    });

    it('throws on inconsistent compression', () => {
      const engine1 = FilterEngine.empty({ enableCompression: true });
      const engine2 = FilterEngine.empty({ enableCompression: false });
      expect(() => legacyMerge.call(FilterEngine, [engine1, engine2])).to.throw(
        'compression of all merged engines must match with the first one: "true" but got: "false"',
      );
    });

    it('allows config override', () => {
      const engine1 = FilterEngine.empty({ enableCompression: false });
      const engine2 = FilterEngine.empty({ enableCompression: false });
      const engine = legacyMerge.call(FilterEngine, [engine1, engine2], {
        overrideConfig: { enableCompression: true },
      });
      expect(engine.config).to.have.property('enableCompression').that.equal(true);
    });
  });

  context('with resources', () => {
    it('throws with different checksums', () => {
      const engine1 = FilterEngine.empty();
      const engine2 = FilterEngine.empty();
      engine1.resources = new Resources({ checksum: '1' });
      engine2.resources = new Resources({ checksum: '2' });
      expect(() => legacyMerge.call(FilterEngine, [engine1, engine2])).to.throw(
        'resource checksum of all merged engines must match with the first one: "1" but got: "2"',
      );
    });
  });
});

describe('#binaryMerge', () => {
  let hashFunc: HashFunc;

  before(async () => {
    // Having custom hash function is unavoidable in the real world scenario and
    // it's nice to have an example in the test code.
    const hasher = await xxhash();
    hashFunc = (arr: Uint8Array, beg: number, end: number) => {
      return hasher.h64Raw(arr.subarray(beg, end));
    };
  });

  const cosmeticDetails = {
    classes: ['generic', 'unhidden', 'cls'],
    domain: 'example.com',
    hostname: 'example.com',
    url: 'https://example.com/',
  };

  const resources = new Resources({
    checksum: 'binary-merge-test-resources',
    resources: [
      {
        name: 'foo.js',
        aliases: [],
        body: 'foo.js',
        contentType: 'application/javascript',
      },
    ],
    scriptlets: [
      {
        name: 'script.js',
        aliases: [],
        body: 'function script() {}',
        dependencies: [],
        executionWorld: 'MAIN',
        requiresTrust: false,
      },
    ],
  });

  context('with filters', () => {
    it('preserves network rule disabling and precedence behavior', () => {
      expect(
        binaryMerge
          .call(
            FilterEngine,
            [FilterEngine.parse('||foo.com^'), FilterEngine.parse('||foo.com^$badfilter')],
            { hashFunc },
          )
          .match(
            Request.fromRawDetails({
              sourceUrl: 'https://source.example/',
              type: 'script',
              url: 'https://foo.com/ad.js',
            }),
          ).match,
      ).to.equal(false);

      expect(
        binaryMerge
          .call(
            FilterEngine,
            [FilterEngine.parse('||bar.com^'), FilterEngine.parse('@@||bar.com^')],
            { hashFunc },
          )
          .match(
            Request.fromRawDetails({
              sourceUrl: 'https://source.example/',
              type: 'script',
              url: 'https://bar.com/ad.js',
            }),
          ).match,
      ).to.equal(false);

      const importantEngine = binaryMerge.call(
        FilterEngine,
        [FilterEngine.parse('@@||baz.com^'), FilterEngine.parse('||baz.com^$important')],
        { hashFunc },
      );
      expect(
        importantEngine.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'script',
            url: 'https://baz.com/ad.js',
          }),
        ).match,
      ).to.equal(true);
    });

    it('preserves redirect, redirect-rule, and redirect=none behavior', () => {
      const redirectEngine = binaryMerge.call(
        FilterEngine,
        [
          FilterEngine.parse('||redirect.example^$image,redirect=foo.js'),
          FilterEngine.parse('||rule.example^$image,redirect-rule=foo.js\n||rule.example^$image'),
        ],
        { hashFunc },
      );
      redirectEngine.resources = resources;

      expect(
        redirectEngine.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'image',
            url: 'https://redirect.example/ad.png',
          }),
        ).redirect,
      ).to.have.property('filename', 'foo.js');
      expect(
        redirectEngine.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'image',
            url: 'https://rule.example/ad.png',
          }),
        ).redirect,
      ).to.have.property('filename', 'foo.js');

      const noneEngine = binaryMerge.call(
        FilterEngine,
        [
          FilterEngine.parse('||none.example^$image,redirect-rule=foo.js\n||none.example^$image'),
          FilterEngine.parse('||none.example^$image,redirect=none'),
        ],
        { hashFunc },
      );
      noneEngine.resources = resources;
      expect(
        noneEngine.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'image',
            url: 'https://none.example/ad.png',
          }),
        ).redirect,
      ).to.equal(undefined);
    });

    it('preserves removeparam filters and exceptions', () => {
      expect(
        binaryMerge
          .call(
            FilterEngine,
            [
              FilterEngine.parse('||example.com^$removeparam=x'),
              FilterEngine.parse('||noop.example^'),
            ],
            { hashFunc },
          )
          .match(
            Request.fromRawDetails({
              sourceUrl: 'https://source.example/',
              type: 'document',
              url: 'https://example.com/?x=1&y=2',
            }),
          ).rewrite?.url,
      ).to.equal('https://example.com/?y=2');

      expect(
        binaryMerge
          .call(
            FilterEngine,
            [
              FilterEngine.parse('||example.com^$removeparam=x'),
              FilterEngine.parse('@@||example.com^$removeparam=x'),
            ],
            { hashFunc },
          )
          .match(
            Request.fromRawDetails({
              sourceUrl: 'https://source.example/',
              type: 'document',
              url: 'https://example.com/?x=1&y=2',
            }),
          ).rewrite,
      ).to.equal(undefined);
    });

    it('preserves CSP filters and CSP exceptions', () => {
      expect(
        binaryMerge
          .call(
            FilterEngine,
            [
              FilterEngine.parse("||example.com^$csp=script-src 'none'"),
              FilterEngine.parse('||noop.example^'),
            ],
            { hashFunc },
          )
          .getCSPDirectives(
            Request.fromRawDetails({
              sourceUrl: 'https://source.example/',
              url: 'https://example.com/',
            }),
          ),
      ).to.equal("script-src 'none'");
      expect(
        binaryMerge
          .call(
            FilterEngine,
            [
              FilterEngine.parse("||example.com^$csp=script-src 'none'"),
              FilterEngine.parse('@@||example.com^$csp'),
            ],
            { hashFunc },
          )
          .getCSPDirectives(
            Request.fromRawDetails({
              sourceUrl: 'https://source.example/',
              url: 'https://example.com/',
            }),
          ),
      ).to.equal(undefined);
    });

    it('preserves HTML filtering rules', () => {
      expect(
        binaryMerge
          .call(
            FilterEngine,
            [
              FilterEngine.parse('example.com##^script:has-text(alert)', {
                enableHtmlFiltering: true,
              }),
              FilterEngine.empty({ enableHtmlFiltering: true }),
            ],
            { hashFunc },
          )
          .getHtmlFilters(
            Request.fromRawDetails({
              sourceUrl: 'https://source.example/',
              url: 'https://example.com/',
            }),
          ),
      ).to.deep.equal([['script', ['alert']]]);
    });

    it('preserves cosmetic hiding, exceptions, scriptlets, and unhide behavior', () => {
      const engine = binaryMerge.call(
        FilterEngine,
        [
          FilterEngine.parse(
            '##.generic\nexample.com##.specific\n#@#.unhidden\nexample.com##+js(script.js,arg)',
          ),
          FilterEngine.parse('##.unhidden'),
        ],
        { hashFunc },
      );
      engine.resources = resources;
      const cosmetics = engine.getCosmeticsFilters(cosmeticDetails);

      expect(cosmetics.styles).to.include('.generic');
      expect(cosmetics.styles).to.include('.specific');
      expect(cosmetics.styles).to.include('display: none !important;');
      expect(cosmetics.styles).not.to.include('.unhidden { display: none !important; }');
      expect(cosmetics.scripts).to.have.length(1);

      const scriptletExceptionEngine = binaryMerge.call(
        FilterEngine,
        [
          FilterEngine.parse('example.com##+js(script.js,arg)'),
          FilterEngine.parse('example.com#@#+js(script.js,arg)'),
        ],
        { hashFunc },
      );
      scriptletExceptionEngine.resources = resources;
      expect(scriptletExceptionEngine.getCosmeticsFilters(cosmeticDetails).scripts).to.have.length(
        0,
      );
    });

    it('preserves extended selectors depending on loadExtendedSelectors', () => {
      const enabled = binaryMerge
        .call(
          FilterEngine,
          [
            FilterEngine.parse('example.com##.cls:has-text(ad)', {
              loadExtendedSelectors: true,
            }),
            FilterEngine.parse('##.base', { loadExtendedSelectors: true }),
          ],
          { hashFunc },
        )
        .getCosmeticsFilters(cosmeticDetails);
      expect(enabled.extended).to.have.length(1);
      expect(enabled.styles).not.to.include(':has-text');

      const disabled = binaryMerge
        .call(
          FilterEngine,
          [
            FilterEngine.parse('example.com##.cls:has-text(ad)', {
              loadExtendedSelectors: false,
            }),
            FilterEngine.parse('##.base', { loadExtendedSelectors: false }),
          ],
          { hashFunc },
        )
        .getCosmeticsFilters(cosmeticDetails);
      expect(disabled.extended).to.have.length(0);
      expect(disabled.styles).not.to.include(':has-text');
    });

    it('preserves preprocessor-gated filters before and after updateEnv', () => {
      const engine = binaryMerge.call(
        FilterEngine,
        [
          FilterEngine.parse(
            '!#if ext_binary_merge\n||enabled.example^\n!#else\n||disabled.example^\n!#endif',
            { loadPreprocessors: true },
          ),
          FilterEngine.empty({ loadPreprocessors: true }),
        ],
        { hashFunc },
      );
      const env = new Env();

      expect(
        engine.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'script',
            url: 'https://disabled.example/ad.js',
          }),
        ).match,
      ).to.equal(true);
      env.set('ext_binary_merge', true);
      engine.updateEnv(env);
      expect(
        engine.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'script',
            url: 'https://enabled.example/ad.js',
          }),
        ).match,
      ).to.equal(true);
      expect(
        engine.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'script',
            url: 'https://disabled.example/ad.js',
          }),
        ).match,
      ).to.equal(false);
    });
  });

  context('configs', () => {
    it('applies requested overrideConfig values', () => {
      for (const key of [
        'loadExceptionFilters',
        'loadCSPFilters',
        'enableHtmlFiltering',
        'loadExtendedSelectors',
        'loadPreprocessors',
        'enableInMemoryCache',
        'enableOptimizations',
      ] as const) {
        const engine = binaryMerge.call(
          FilterEngine,
          [FilterEngine.empty(), FilterEngine.empty()],
          { hashFunc, overrideConfig: { [key]: false } },
        );
        expect(engine.config).to.have.property(key).that.equal(false);
      }

      const networkDisabled = binaryMerge.call(
        FilterEngine,
        [FilterEngine.parse('||example.com^'), FilterEngine.empty()],
        { hashFunc, overrideConfig: { loadNetworkFilters: false } },
      );
      expect(networkDisabled.config).to.have.property('loadNetworkFilters').that.equal(false);
      expect(
        networkDisabled.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'script',
            url: 'https://example.com/ad.js',
          }),
        ).match,
      ).to.equal(false);
      expect(networkDisabled.getFilters().networkFilters).to.have.length(0);

      const exceptionsDisabled = binaryMerge.call(
        FilterEngine,
        [FilterEngine.parse('||example.com^'), FilterEngine.parse('@@||example.com^')],
        { hashFunc, overrideConfig: { loadExceptionFilters: false } },
      );
      expect(exceptionsDisabled.config).to.have.property('loadExceptionFilters').that.equal(false);
      expect(
        exceptionsDisabled.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'script',
            url: 'https://example.com/ad.js',
          }),
        ).match,
      ).to.equal(true);
      expect(exceptionsDisabled.getFilters().networkFilters).to.have.length(1);

      const cspDisabled = binaryMerge.call(
        FilterEngine,
        [FilterEngine.parse("||example.com^$csp=script-src 'none'"), FilterEngine.empty()],
        { hashFunc, overrideConfig: { loadCSPFilters: false } },
      );
      expect(cspDisabled.config).to.have.property('loadCSPFilters').that.equal(false);
      expect(
        cspDisabled.getCSPDirectives(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            url: 'https://example.com/',
          }),
        ),
      ).to.equal(undefined);
      expect(cspDisabled.getFilters().networkFilters).to.have.length(0);

      const cosmeticsDisabled = binaryMerge.call(
        FilterEngine,
        [FilterEngine.parse('##.ad'), FilterEngine.empty()],
        { hashFunc, overrideConfig: { loadCosmeticFilters: false } },
      );
      expect(cosmeticsDisabled.config).to.have.property('loadCosmeticFilters').that.equal(false);
      expect(cosmeticsDisabled.getCosmeticsFilters(cosmeticDetails).active).to.equal(false);
      expect(cosmeticsDisabled.getFilters().cosmeticFilters).to.have.length(0);

      const htmlDisabled = binaryMerge.call(
        FilterEngine,
        [
          FilterEngine.parse('example.com##^script:has-text(alert)', {
            enableHtmlFiltering: true,
          }),
          FilterEngine.empty({ enableHtmlFiltering: true }),
        ],
        { hashFunc, overrideConfig: { enableHtmlFiltering: false } },
      );
      expect(htmlDisabled.config).to.have.property('enableHtmlFiltering').that.equal(false);
      expect(
        htmlDisabled.getHtmlFilters(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            url: 'https://example.com/',
          }),
        ),
      ).to.deep.equal([]);
      expect(htmlDisabled.getFilters().cosmeticFilters).to.have.length(0);

      const extendedDisabled = binaryMerge.call(
        FilterEngine,
        [
          FilterEngine.parse('example.com##.cls:has-text(ad)', {
            loadExtendedSelectors: true,
          }),
          FilterEngine.empty({ loadExtendedSelectors: true }),
        ],
        { hashFunc, overrideConfig: { loadExtendedSelectors: false } },
      );
      expect(extendedDisabled.config).to.have.property('loadExtendedSelectors').that.equal(false);
      expect(extendedDisabled.getCosmeticsFilters(cosmeticDetails).extended).to.have.length(0);

      const preprocessorsDisabled = binaryMerge.call(
        FilterEngine,
        [
          FilterEngine.parse(
            '!#if ext_binary_merge\n||enabled.example^\n!#else\n||disabled.example^\n!#endif',
            { loadPreprocessors: true },
          ),
          FilterEngine.empty({ loadPreprocessors: true }),
        ],
        { hashFunc, overrideConfig: { loadPreprocessors: false } },
      );
      const env = new Env();
      env.set('ext_binary_merge', true);
      preprocessorsDisabled.updateEnv(env);
      expect(preprocessorsDisabled.config).to.have.property('loadPreprocessors').that.equal(false);
      expect(
        preprocessorsDisabled.match(
          Request.fromRawDetails({
            sourceUrl: 'https://source.example/',
            type: 'script',
            url: 'https://disabled.example/ad.js',
          }),
        ).match,
      ).to.equal(true);
    });
  });
});
