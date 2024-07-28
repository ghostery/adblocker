/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { getDomain } from 'tldts-experimental';

import Engine, { EngineEventHandlers } from '../../src/engine/engine.js';
import NetworkFilter from '../../src/filters/network.js';
import Request, { RequestType } from '../../src/request.js';
import Resources, { Resource } from '../../src/resources.js';

import requests from '../data/requests.js';
import { loadEasyListFilters, typedArrayEqual } from '../utils.js';
import FilterEngine from '../../src/engine/engine.js';
import { fastHash } from '../../src/utils.js';
import { Metadata } from '../../src/engine/metadata.js';

/**
 * Helper function used in the Engine tests. All the assertions are performed by
 * this function. It will be called to tests the different configurations of
 * engines, for each of the requests and all of the filters.
 */
function test({
  engine,
  filter,
  testFiltersInIsolation,
  resources,
  request,
  importants,
  redirects,
  exceptions,
  normalFilters,
}: {
  engine: Engine;
  filter: NetworkFilter;
  testFiltersInIsolation: boolean;
  resources: Resources;
  request: Request;
  importants: string[];
  redirects: string[];
  exceptions: string[];
  normalFilters: string[];
}): void {
  // it(`[engine] isolation=${testFiltersInIsolation} optimized=${engine.enableOptimizations} ${
  //   filter.rawLine
  // }`, () => {
  // Set correct resources in `engine` (`resources` is expected to have been
  // created using the matching redirect filters for the current Request so
  // that all redirect matches will have a corresponding resource in
  // `resources`).
  engine.resources = resources;

  // Collect all matching filters for this request.
  const matchingFilters = new Set();
  for (const matchingFilter of Array.from(engine.matchAll(request))) {
    (matchingFilter.rawLine || '').split(' <+> ').forEach((f: string) => {
      matchingFilters.add(f);
    });
  }

  // Check if one of the filters is a special case: important,
  // exception or redirect; and perform extra checks then.
  if (filter.isImportant()) {
    const result = engine.match(request);
    expect(result.filter).not.to.be.undefined;
    if (
      result.filter !== undefined &&
      result.filter.rawLine !== undefined &&
      !result.filter.rawLine.includes('<+>')
    ) {
      expect(importants).to.include(result.filter.rawLine);

      // Handle case where important filter is also a redirect
      if (filter.isRedirect()) {
        expect(redirects).to.include(result.filter.rawLine);
      }
    }

    expect(result.exception).to.be.undefined;

    if (!filter.isRedirect()) {
      expect(result.redirect).to.be.undefined;
    }

    expect(result.match).to.be.true;
  } else if (
    filter.isException() &&
    normalFilters.length !== 0 &&
    !testFiltersInIsolation &&
    importants.length === 0
  ) {
    const result = engine.match(request);
    expect(result.exception).not.to.be.undefined;
    if (
      result.exception !== undefined &&
      result.exception.rawLine !== undefined &&
      !result.exception.rawLine.includes('<+>')
    ) {
      expect(exceptions).to.include(result.exception.rawLine);
    }

    expect(result.filter).not.to.be.undefined;
    expect(result.redirect).to.be.undefined;
    expect(result.match).to.be.false;
  } else if (filter.isRedirect() && exceptions.length === 0 && importants.length === 0) {
    const result = engine.match(request);
    expect(result.filter).not.to.be.undefined;
    if (
      result.filter !== undefined &&
      result.filter.rawLine !== undefined &&
      !result.filter.rawLine.includes('<+>')
    ) {
      expect(redirects).to.include(result.filter.rawLine);
    }

    expect(result.exception).to.be.undefined;
    expect(result.redirect).not.to.be.undefined;
    expect(result.match).to.be.true;
  }

  expect(matchingFilters).to.include(filter.rawLine);
  // });
}

function buildResourcesFromRequests(filters: NetworkFilter[]): Resources {
  const resources: string[] = [];

  filters.forEach((filter) => {
    if (filter.redirect !== undefined) {
      const redirect = filter.redirect;

      // Guess resource type
      let type = 'application/javascript';
      if (redirect.endsWith('.gif')) {
        type = 'image/gif;base64';
      }

      resources.push(`${redirect} ${type}\n${redirect}`);
    }
  });

  return Resources.parse(resources.join('\n\n'), { checksum: '' });
}

function createEngine(filters: string, enableOptimizations: boolean = true) {
  return Engine.parse(filters, {
    debug: true,
    enableOptimizations,
  });
}

describe('#FiltersEngine', () => {
  it('network filters are disabled', () => {
    const request = Request.fromRawDetails({ url: 'https://foo.com' });

    // Enabled
    expect(Engine.parse('||foo.com', { loadNetworkFilters: true }).match(request).match).to.be
      .true;

    // Disabled
    expect(Engine.parse('||foo.com', { loadNetworkFilters: false }).match(request).match).to.be
      .false;
  });

  it('cosmetic filters are disabled', () => {
    // Enabled
    expect(
      Engine.parse('##selector', { loadCosmeticFilters: true }).getCosmeticsFilters({
        domain: 'foo.com',
        hostname: 'foo.com',
        url: 'https://foo.com',
      }),
    ).to.eql({
      active: true,
      extended: [],
      scripts: [],
      styles: 'selector { display: none !important; }',
    });

    // Disabled
    expect(
      Engine.parse('##selector', { loadCosmeticFilters: false }).getCosmeticsFilters({
        domain: 'foo.com',
        hostname: 'foo.com',
        url: 'https://foo.com',
      }),
    ).to.eql({
      active: false,
      extended: [],
      scripts: [],
      styles: '',
    });
  });

  describe('csp policies', () => {
    it('no policy in engine', () => {
      expect(
        createEngine('this is not a csp').getCSPDirectives(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ),
      ).to.be.undefined;
    });

    it('network filters are disabled', () => {
      expect(
        Engine.parse('||foo.com$csp=bar', { loadNetworkFilters: false }).getCSPDirectives(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ),
      ).to.be.undefined;
    });

    it('request not supported', () => {
      // Not supported protocol
      expect(
        Engine.parse('||foo.com$csp=bar').getCSPDirectives(
          Request.fromRawDetails({
            url: 'ftp://foo.com',
          }),
        ),
      ).to.be.undefined;

      // Not document request
      expect(
        Engine.parse('||foo.com$csp=bar').getCSPDirectives(
          Request.fromRawDetails({
            type: 'script',
            url: 'ftp://foo.com',
          }),
        ),
      ).to.be.undefined;
    });

    it('does not match request', () => {
      expect(
        createEngine('||bar.com$csp=bar').getCSPDirectives(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ),
      ).to.be.undefined;
    });

    it('matches request (1 policy)', () => {
      expect(
        createEngine('||foo.com$csp=bar').getCSPDirectives(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ),
      ).to.equal('bar');
    });

    it('matches request (2 policy)', () => {
      const policies = createEngine(`
||foo.com$csp=bar
$csp=baz,domain=bar.com
`).getCSPDirectives(
        Request.fromRawDetails({
          sourceUrl: 'https://bar.com',
          url: 'https://foo.com',
        }),
      );

      expect(policies).not.to.be.undefined;
      if (policies !== undefined) {
        expect(policies.split('; ').sort()).to.eql(['bar', 'baz']);
      }
    });

    it('matches request (1 policy with one exception)', () => {
      expect(
        createEngine(`
||foo.com$csp=bar
@@$csp=baz
$csp=baz,domain=bar.com
`).getCSPDirectives(
          Request.fromRawDetails({
            sourceUrl: 'https://bar.com',
            url: 'https://foo.com',
          }),
        ),
      ).to.equal('bar');
    });

    it('exception global exception', () => {
      expect(
        createEngine(`
@@$csp,domain=bar.com
||foo.com$csp=bar
@@$csp=baz
$csp=baz,domain=bar.com
`).getCSPDirectives(
          Request.fromRawDetails({
            sourceUrl: 'https://bar.com',
            url: 'https://foo.com',
          }),
        ),
      ).to.be.undefined;
    });
  });

  describe('badfilter', () => {
    const request = Request.fromRawDetails({
      sourceUrl: 'https://bar.com',
      type: 'image',
      url: 'https://foo.com',
    });
    // - from Engine.parse
    // - new filter in Engine.update
    // - works after serialization/deserialization?
    it('does not match on its own', () => {
      expect(createEngine('||foo.com$badfilter').match(request).match).to.be.false;
    });

    it('cancels filter with same ID', () => {
      expect(
        createEngine(`
||foo.com$domain=bar.com|foo.com,badfilter
||foo.com$domain=foo.com|bar.com
`).match(request).match,
      ).to.be.false;
    });

    it('does not cancel similar filter', () => {
      expect(
        createEngine(`
||foo.com$domain=bar.com|foo.com,badfilter
||foo.com$domain=foo.com|bar.com,image
`).match(request).match,
      ).to.be.true;
    });

    it('cancels exceptions', () => {
      expect(
        createEngine(`
@@||foo.com^
||foo.com^
`).match(request).match,
      ).to.be.false;

      expect(
        createEngine(`
@@||foo.com^
@@||foo.com^$badfilter
||foo.com^
`).match(request).match,
      ).to.be.true;
    });

    it('works with update as well', () => {
      const badfilter = NetworkFilter.parse('||foo.com$domain=bar.com|foo.com,badfilter');
      expect(badfilter).not.to.be.null;
      if (badfilter === null) {
        return;
      }

      // Initially, no $badfilter
      const engine = Engine.parse('||foo.com$domain=foo.com|bar.com', { debug: true });
      expect(engine.match(request).match).to.be.true;

      // Add $badfilter
      engine.update({
        newNetworkFilters: [badfilter],
      });
      expect(engine.match(request).match).to.be.false;

      // Remove $badfilter
      engine.update({
        removedNetworkFilters: [badfilter.getId()],
      });
      expect(engine.match(request).match).to.be.true;
    });
  });

  describe('redirect', () => {
    const request = Request.fromRawDetails({
      sourceUrl: 'https://bar.com',
      type: 'image',
      url: 'https://foo.com',
    });

    const createEngineWithResource = (filters: string[], resource: string) => {
      const engine = createEngine(filters.join('\n'));
      engine.resources.js.set(resource, resource);
      engine.resources.resources.set(resource, {
        body: resource,
        contentType: 'application/javascript',
      });
      return engine;
    };

    it('normal redirect', () => {
      const { filter, exception, match, redirect } = createEngineWithResource(
        ['||foo.com$image,redirect=foo.js'],
        'foo.js',
      ).match(request);
      expect(match).to.be.true;
      expect(exception).to.be.undefined;
      expect(filter).not.to.be.undefined;
      expect((filter as NetworkFilter).toString()).to.equal('||foo.com$image,redirect=foo.js');
      expect(redirect).to.eql({
        body: 'foo.js',
        contentType: 'application/javascript',
        dataUrl: 'data:application/javascript;base64,Zm9vLmpz',
      });
    });

    it('redirect-rule does not match on its own', () => {
      const { filter, exception, match, redirect } = createEngineWithResource(
        ['||foo.com$image,redirect-rule=foo.js'],
        'foo.js',
      ).match(request);
      expect(match).to.be.false;
      expect(exception).to.be.undefined;
      expect(filter).to.be.undefined;
      expect(redirect).to.be.undefined;
    });

    it('redirect-rule matches if request was blocked', () => {
      const { filter, exception, match, redirect } = createEngineWithResource(
        ['||foo.com$image,redirect-rule=foo.js', '||foo.com$image'],
        'foo.js',
      ).match(request);
      expect(match).to.be.true;
      expect(exception).to.be.undefined;
      expect(filter).not.to.be.undefined;
      expect((filter as NetworkFilter).toString()).to.equal(
        '||foo.com$image,redirect-rule=foo.js',
      );
      expect(redirect).to.eql({
        body: 'foo.js',
        contentType: 'application/javascript',
        dataUrl: 'data:application/javascript;base64,Zm9vLmpz',
      });
    });

    it('redirect=none cancels redirect-rule', () => {
      const { filter, exception, match, redirect } = createEngineWithResource(
        [
          '||foo.com$image,redirect-rule=foo.js',
          '||foo.com$image',
          '||foo.com$image,redirect=none',
        ],
        'foo.js',
      ).match(request);
      expect(match).to.be.false;
      expect(exception).not.to.be.undefined;
      expect((exception as NetworkFilter).toString()).to.equal('||foo.com$image,redirect=none');
      expect(filter).not.to.be.undefined;
      expect((filter as NetworkFilter).toString()).to.equal(
        '||foo.com$image,redirect-rule=foo.js',
      );
      expect(redirect).to.be.undefined;
    });

    it('redirect=none cancels redirect', () => {
      const { filter, exception, match, redirect } = createEngineWithResource(
        ['||foo.com$image,redirect=foo.js', '||foo.com$image', '||foo.com$image,redirect=none'],
        'foo.js',
      ).match(request);
      expect(match).to.be.false;
      expect(exception).not.to.be.undefined;
      expect((exception as NetworkFilter).toString()).to.equal('||foo.com$image,redirect=none');
      expect(filter).not.to.be.undefined;
      expect((filter as NetworkFilter).toString()).to.equal('||foo.com$image,redirect=foo.js');
      expect(redirect).to.be.undefined;
    });

    it('exception rule also cancels redirect', () => {
      const { filter, exception, match, redirect } = createEngineWithResource(
        ['||foo.com$image,redirect=foo.js', '||foo.com$image', '@@||foo.com$image'],
        'foo.js',
      ).match(request);

      expect(match).to.be.false;
      expect(exception).not.to.be.undefined;
      expect((exception as NetworkFilter).toString()).to.equal('@@||foo.com$image');
      expect(filter).not.to.be.undefined;
      expect((filter as NetworkFilter).toString()).to.equal('||foo.com$image,redirect=foo.js');
      expect(redirect).to.be.undefined;
    });
  });

  describe('network filters', () => {
    // Collect all filters from all requests in the dataset. Each test case
    // contains one request as well as a list of filters matching this request
    // (exceptions, normal filters, etc.). We create a big list of filters out
    // of them.
    const allRequestFilters = requests.map(({ filters }) => filters.join('\n')).join('\n');

    // Create several base engines to be used in different scenarii:
    // - Engine with *no filter* optimizations *enabled*
    // - Engine with *no filter* optimizations *disabled*
    // - Engine with *all filters* optimizations *enabled*
    // - Engine with *all filters* optimizations *disabled*
    const engineFullOptimized = Engine.parse(allRequestFilters, {
      debug: true,
      enableOptimizations: true,
    });
    const engineFull = Engine.parse(allRequestFilters, {
      debug: true,
      enableOptimizations: false,
    });

    // For each request, make sure that we get the correct match in 4 different
    // setups:
    // - Engine with only the filter being tested
    // - Engine with all the filters
    // - Engine with optimizations enabled
    // - Engine with optimizations disabled
    for (let i = 0; i < requests.length; i += 1) {
      const { filters, type, url, sourceUrl } = requests[i];

      // Dispatch `filters` into the following categories: exception, important,
      // redirects or normal filters. This will be used later to check the
      // output of Engine.match. Additionally, we keep the list of NetworkFilter
      // instances.
      const exceptions: string[] = [];
      const importants: string[] = [];
      const redirects: string[] = [];
      const normalFilters: string[] = [];
      const parsedFilters: NetworkFilter[] = [];
      for (let j = 0; j < filters.length; j += 1) {
        const filter = filters[j];
        const parsed = NetworkFilter.parse(filter, true);
        expect(parsed).not.to.be.null;
        if (parsed !== null) {
          parsedFilters.push(parsed);

          if (parsed.isException()) {
            exceptions.push(filter);
          }

          if (parsed.isImportant()) {
            importants.push(filter);
          }

          if (parsed.isRedirect()) {
            redirects.push(filter);
          }

          if (!parsed.isRedirect() && !parsed.isException() && !parsed.isImportant()) {
            normalFilters.push(filter);
          }
        }
      }

      // Prepare a fake `resources.txt` created from the list of filters of type
      // `redirect` in `filters`. A resource of the right name will be created
      // for each of them.
      const resources = buildResourcesFromRequests(parsedFilters);

      // Create an instance of `Request` to be shared for all the calls to
      // `Engine.match` or `Engine.matchAll`.
      const request = Request.fromRawDetails({
        sourceUrl,
        type: type as RequestType,
        url,
      });

      it(`[request] type=${type} url=${url}, sourceUrl=${sourceUrl}`, () => {
        // Check each filter individually
        for (let j = 0; j < parsedFilters.length; j += 1) {
          const filter = parsedFilters[j];
          const baseConfig = {
            exceptions,
            filter,
            importants,
            normalFilters,
            redirects,
            request,
            resources,
          };

          // Engine with only this filter
          test({
            ...baseConfig,
            engine: new Engine({ networkFilters: [filter] }),
            testFiltersInIsolation: true,
          });

          // All filters with optimizations enabled
          test({
            ...baseConfig,
            engine: engineFullOptimized,
            testFiltersInIsolation: false,
          });

          // All filters with optimizations disabled
          test({
            ...baseConfig,
            engine: engineFull,
            testFiltersInIsolation: false,
          });
        }
      });
    }
  });

  describe('#getCosmeticsFilters', () => {
    describe('script injections', () => {
      it('injects script', () => {
        const engine = Engine.parse('foo.com##+js(script.js,arg1)');
        engine.resources = Resources.parse('script.js application/javascript\n{{1}}', {
          checksum: '',
        });
        expect(
          engine.getCosmeticsFilters({
            domain: 'foo.com',
            hostname: 'foo.com',
            url: 'https://foo.com',
          }).scripts,
        ).to.eql(['arg1']);
      });

      it('script missing', () => {
        expect(
          Engine.parse('foo.com##+js(foo,arg1)').getCosmeticsFilters({
            domain: 'foo.com',
            hostname: 'foo.com',
            url: 'https://foo.com',
          }).scripts,
        ).to.eql([]);
      });
    });

    describe('elemhide', () => {
      it('disables cosmetics if domain matches', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$elemhide
foo.com##selector1
##selector1
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).to.equal('');
      });
    });

    describe('specifichide', () => {
      it('allows specific cosmetics by default', () => {
        expect(
          Engine.parse('foo.com##selector').getCosmeticsFilters({
            domain: 'foo.com',
            hostname: 'foo.com',
            url: 'https://foo.com',
          }).styles,
        ).not.to.equal('');
      });

      it('disables specific cosmetics if domain matches', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$specifichide
foo.com##selector1
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).to.equal('');
      });

      it('allows specific cosmetics if $specifichide', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$specifichide
foo.com##selector
||foo.com^$specifichide
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).not.to.equal('');
      });

      it('allows specific cosmetics if $specifichide,important', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$important,specifichide
foo.com##selector
||foo.com^$specifichide,important
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).not.to.equal('');
      });

      it('disables specific cosmetics if @@$specifichide,important', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$important,specifichide
foo.com##selector
foo.com##.selector
foo.com###selector
||foo.com^$specifichide
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).to.equal('');
      });

      it('disabling specific hides does not impact scriptlets', () => {
        const engine = Engine.parse(['@@||foo.com^$specifichide', 'foo.com##+js(foo)'].join('\n'));
        engine.resources.js.set('foo', '');
        expect(
          engine.getCosmeticsFilters({
            domain: 'foo.com',
            hostname: 'foo.com',
            url: 'https://foo.com',
          }).scripts,
        ).to.have.lengthOf(1);
      });
    });

    describe('generichide', () => {
      it('allows generic cosmetics by default', () => {
        expect(
          Engine.parse('##selector').getCosmeticsFilters({
            domain: 'foo.com',
            hostname: 'foo.com',
            url: 'https://foo.com',
          }).styles,
        ).not.to.equal('');
      });

      it('disables generic cosmetics if domain matches', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$generichide
~bar.*##selector1
##selector2
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).to.equal('');
      });

      it('allows generic cosmetics if $generichide', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$generichide
##selector
||foo.com^$generichide
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).not.to.equal('');
      });

      it('allows generic cosmetics if $generichide,important', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$important,generichide
##selector
||foo.com^$generichide,important
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).not.to.equal('');
      });

      it('disables generic cosmetics if @@$generichide,important', () => {
        expect(
          Engine.parse(
            `
@@||foo.com^$important,generichide
##selector
##.selector
###selector
||foo.com^$generichide
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).to.equal('');
      });
    });

    it('handles custom :styles', () => {
      expect(
        Engine.parse(
          `
##selector :style(foo)
##selector :style(bar)
##selector1 :style(foo)`,
        ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
          .styles,
      ).to.equal('selector ,\nselector1  { foo }\n\nselector  { bar }');
    });

    [
      // Unhide
      // ======
      // = unhide without domain
      {
        filters: ['##selector'],
        hostname: 'foo.com',
        injections: [],
        matches: ['selector'],
      },
      {
        filters: ['#@#selector', '##selector'],
        hostname: 'foo.com',
        injections: [],
        matches: [],
      },

      // = unhide without domain + class
      {
        classes: ['selector'],
        filters: ['##.selector'],
        hostname: 'foo.com',
        injections: [],
        matches: ['.selector'],
      },
      {
        classes: ['selector'],
        filters: ['#@#.selector', '##.selector'],
        hostname: 'foo.com',
        injections: [],
        matches: [],
      },

      // = unhide without domain + id
      {
        filters: ['###selector'],
        hostname: 'foo.com',
        ids: ['selector'],
        injections: [],
        matches: ['#selector'],
      },
      {
        filters: ['###selector', '#@##selector'],
        hostname: 'foo.com',
        ids: ['selector'],
        injections: [],
        matches: [],
      },

      // = unhide without domain + href
      {
        filters: ['##a[href="https://foo"]'],
        hostname: 'foo.com',
        hrefs: ['https://foo.com/bar'],
        injections: [],
        matches: ['a[href="https://foo"]'],
      },
      {
        filters: ['##a[href="https://foo"]', '#@#a[href="https://foo"]'],
        hostname: 'foo.com',
        hrefs: ['https://foo.com/bar'],
        injections: [],
        matches: [],
      },

      // = unhide +js() exception
      {
        filters: ['foo.com##+js(scriptlet)'],
        hostname: 'foo.com',
        hrefs: [],
        injections: ['scriptlet'],
        matches: [],
      },
      {
        filters: ['foo.com##+js(scriptlet)', 'foo.com#@#+js(scriptlet)'],
        hostname: 'foo.com',
        hrefs: [],
        injections: [],
        matches: [],
      },

      // = unhide +js() disable
      {
        filters: [
          'foo.com##+js(scriptlet1)',
          'foo.com##+js(scriptlet2)',
          // 'foo.com#@#+js()',
        ],
        hostname: 'foo.com',
        hrefs: [],
        injections: ['scriptlet1', 'scriptlet2'],
        matches: [],
      },
      {
        filters: [
          'foo.com##+js(scriptlet1)',
          'foo.com##+js(scriptlet2)',
          'foo.com#@#+js()', // specific to hostname
        ],
        hostname: 'foo.com',
        hrefs: [],
        injections: [],
        matches: [],
      },
      {
        filters: [
          'foo.com##+js(scriptlet1)',
          'foo.com##+js(scriptlet2)',
          '#@#+js()', // applies to all hostnames
        ],
        hostname: 'foo.com',
        hrefs: [],
        injections: [],
        matches: [],
      },

      // Generic Hides
      // =============
      // Filters which are not classes, ids or hrefs are matched using the
      // generic index so we expect them to be returned even without providing
      // any DOM information.
      {
        filters: ['##adwords1', '~google.*##adwords2'],
        hostname: 'domain.com',
        injections: [],
        matches: ['adwords1', 'adwords2'],
      },
      // Selectors ids, classes and hrefs are not returned without DOM information.
      {
        filters: [
          '##.adwords1',
          '~google.*##.adwords2',
          '##[href="https://foo"]',
          '##[href^="https://foo"]',
          '##[href*="https://foo"]',
          '##a[href*="https://foo"]',
        ],
        hostname: 'domain.com',
        injections: [],
        matches: [],
      },
      // Return filters with correct DOM info
      // .class
      {
        filters: [
          '##.adwords1',
          '~google.*###adwords2',
          '##[href="https://foo"]',
          '##[href^="https://foo"]',
          '##[href*="https://foo"]',
          '##a[href*="https://foo"]',
        ],

        classes: ['foo', 'bar', 'adwords1'],
        hostname: 'domain.com',
        injections: [],
        matches: ['.adwords1'],
      },
      // #id
      {
        filters: [
          '##.adwords1',
          '~google.*###adwords2',
          '##[href="https://foo"]',
          '##[href^="https://foo"]',
          '##[href*="https://foo"]',
          '##a[href*="https://foo"]',
        ],

        hostname: 'domain.com',
        ids: ['foo', 'bar', 'adwords2'],
        injections: [],
        matches: ['#adwords2'],
      },
      // hrefs
      {
        filters: [
          '##.adwords1',
          '~google.*###adwords2',
          '##[href="https://foo.com"]',
          '##[href^="https://bar.com"]',
          '##[href*="https://baz.net"]',
          '##a[href*="http://foo.com"]',
        ],

        hostname: 'domain.com',
        hrefs: ['https://foo.com', 'https://bar.com'],
        injections: [],
        matches: [
          '[href="https://foo.com"]',
          '[href^="https://bar.com"]',
          'a[href*="http://foo.com"]',
        ],
      },
      // DOM-specific selectors should be subjected to exceptions in hostname and entities
      // = no matching class
      {
        classes: [],
        filters: ['~foo.com##.selector'],
        hostname: 'bar.com',
        injections: [],
        matches: [],
      },

      // = matching class + domain
      {
        classes: ['selector'],
        filters: ['~foo.com##.selector'],
        hostname: 'bar.com',
        injections: [],
        matches: ['.selector'],
      },

      // = domain exception
      {
        classes: ['selector'],
        filters: ['~foo.com##.selector'],
        hostname: 'foo.com',
        injections: [],
        matches: [],
      },

      // = entity exception
      {
        classes: ['selector'],
        filters: ['~foo.*##.selector'],
        hostname: 'foo.com',
        injections: [],
        matches: [],
      },
      {
        classes: ['selector'],
        filters: ['~foo.*##.selector'],
        hostname: 'foo.co.uk',
        injections: [],
        matches: [],
      },

      // ==========
      {
        filters: ['##adwords1', '~google.*##adwords2'],
        hostname: 'google.com',
        injections: [],
        matches: ['adwords1'],
      },
      // Negated entity exceptions do not appear in matches
      {
        filters: ['##adwords1', '~google.com#@#adwords2'],
        hostname: 'google.com',
        injections: [],
        matches: ['adwords1'],
      },
      {
        filters: ['##adwords1', '~google.com#@#adwords2'],
        hostname: 'google.de',
        injections: [],
        matches: ['adwords1'],
      },
      {
        filters: ['##adwords1', '~google.*#@#adwords2'],
        hostname: 'google.com',
        injections: [],
        matches: ['adwords1'],
      },
      // Exception cancels generic rule
      {
        filters: ['##adwords1', 'google.com#@#adwords1'],
        hostname: 'google.com',
        injections: [],
        matches: [],
      },
      // Exception cancels entity rule
      {
        filters: ['google.*##adwords1', 'google.com#@#adwords1'],
        hostname: 'google.com',
        injections: [],
        matches: [],
      },
      // Exception cancels hostname rule
      {
        filters: ['google.com##adwords1', 'google.com#@#adwords1'],
        hostname: 'google.com',
        injections: [],
        matches: [],
      },
      // Entity exception cancels generic rule
      {
        filters: ['##adwords1', 'google.*#@#adwords1'],
        hostname: 'google.com',
        injections: [],
        matches: [],
      },
      // Entity exception cancels entity rule
      {
        filters: ['google.*##adwords1', 'google.*#@#adwords1'],
        hostname: 'google.com',
        injections: [],
        matches: [],
      },
      // Exception does not cancel if selector is different
      {
        filters: ['##adwords1', 'google.de#@#adwords2'],
        hostname: 'google.de',
        injections: [],
        matches: ['adwords1'],
      },
      {
        filters: ['google.de##adwords1', 'google.de#@#adwords2'],
        hostname: 'google.de',
        injections: [],
        matches: ['adwords1'],
      },
      // Exception does not cancel if hostname is different
      {
        filters: ['##adwords1', 'google.com#@#adwords1'],
        hostname: 'google.de',
        injections: [],
        matches: ['adwords1'],
      },
      {
        filters: ['##adwords1', 'accounts.google.com#@#adwords1'],
        hostname: 'google.com',
        injections: [],
        matches: ['adwords1'],
      },
      // Hostname matching hostname vs. domain
      // = domain constraint matches hostname with subdomains
      {
        filters: ['baz.com##selector'],
        hostname: 'foo.bar.baz.com',
        injections: [],
        matches: ['selector'],
      },
      // = entity constraint matches hostname with subdomains
      {
        filters: ['baz.*##selector'],
        hostname: 'foo.bar.baz.com',
        injections: [],
        matches: ['selector'],
      },
      {
        filters: ['baz.*##selector'],
        hostname: 'foo.bar.baz.co.uk',
        injections: [],
        matches: ['selector'],
      },
      // = domain exception matches hostname with subdomain
      {
        filters: ['~baz.de##selector'],
        hostname: 'foo.bar.baz.de',
        injections: [],
        matches: [],
      },
      // = entity exception matches hostname with subdomain
      {
        filters: ['~baz.*##selector'],
        hostname: 'foo.bar.baz.co.uk',
        injections: [],
        matches: [],
      },

      // ===
      {
        filters: ['##ad-stack'],
        hostname: 'speedtest.net',
        injections: [],
        matches: ['ad-stack'],
      },
      {
        filters: ['##AD300Right'],
        hostname: 'example.de',
        injections: [],
        matches: ['AD300Right'],
      },
      {
        filters: [],
        hostname: 'pokerupdate.com',
        injections: [],
        matches: [],
      },
      {
        filters: ['pokerupdate.com##related-room', 'pokerupdate.com##prev-article'],
        hostname: 'pokerupdate.com',
        injections: [],
        matches: ['related-room', 'prev-article'],
      },
      {
        filters: [
          'google.com,~mail.google.com##.class[style="margin: 0pt;"]1',
          '~mail.google.com##.class[style="margin: 0pt;"]2',
          '###tads + div + .c',
          '##.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '##.mw > #rcnt > #center_col > #taw > .c',
        ],
        hostname: 'google.com',
        injections: [],
        matches: [
          '.class[style="margin: 0pt;"]1',
          '.class[style="margin: 0pt;"]2',
          '#tads + div + .c',
          '.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '.mw > #rcnt > #center_col > #taw > .c',
        ],

        classes: ['class', 'mw'],
        ids: ['tads'],
      },
      {
        filters: [
          'google.com,~mail.google.com##.class[style="margin: 0pt;"]1',
          '~mail.google.com##.class[style="margin: 0pt;"]2',
          '###tads + div + .c',
          '##.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '##.mw > #rcnt > #center_col > #taw > .c',
        ],
        hostname: 'google.com',
        injections: [],
        matches: [
          '.class[style="margin: 0pt;"]1',
          '#tads + div + .c',
          '.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '.mw > #rcnt > #center_col > #taw > .c',
        ],

        classes: ['mw'],
        ids: ['tads'],
      },
      {
        filters: [
          'google.com,~mail.google.com##.class[style="margin: 0pt;"]',
          '###tads + div + .c',
          '##.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '##.mw > #rcnt > #center_col > #taw > .c',
        ],
        hostname: 'google.com',
        injections: [],
        matches: ['.class[style="margin: 0pt;"]', '#tads + div + .c'],

        ids: ['tads'],
      },
      {
        filters: [
          'google.com,~mail.google.com##.class[style="margin: 0pt;"]',
          '###tads + div + .c',
          '##.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '##.mw > #rcnt > #center_col > #taw > .c',
        ],
        hostname: 'google.com',
        injections: [],
        matches: ['.class[style="margin: 0pt;"]'],
      },
      {
        filters: [
          'google.com,~mail.google.com##.class[style="margin: 0pt;"]',
          '###tads + div + .c',
          '##.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '##.mw > #rcnt > #center_col > #taw > .c',
        ],
        hostname: 'mail.google.com',
        injections: [],
        matches: [
          '#tads + div + .c',
          '.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '.mw > #rcnt > #center_col > #taw > .c',
        ],

        classes: ['class', 'mw'],
        ids: ['tads'],
      },
      {
        filters: [],
        hostname: 'bitbucket.org',
        injections: [],
        matches: [],
      },
    ].forEach(
      ({
        classes,
        filters,
        hostname,
        hrefs,
        ids,
        injections,
        matches,
      }: {
        filters: string[];
        hostname: string;
        matches: string[];
        injections: string[];

        // DOM info
        classes?: string[];
        hrefs?: string[];
        ids?: string[];
      }) => {
        it(JSON.stringify({ filters, hostname, matches, injections }), () => {
          // Initialize engine with all rules from test case
          const engine = createEngine(filters.join('\n'));
          engine.resources.js.set('scriptlet', 'scriptlet');
          engine.resources.js.set('scriptlet1', 'scriptlet1');
          engine.resources.js.set('scriptlet2', 'scriptlet2');

          // #getCosmeticsFilters
          const { styles, scripts } = engine.getCosmeticsFilters({
            domain: getDomain(hostname) || '',
            hostname,
            url: `https://${hostname}`,

            classes,
            hrefs,
            ids,
          });

          expect(scripts).to.have.lengthOf(injections.length);
          expect(scripts.sort()).to.eql(injections.sort());

          // Parse stylesheets to get selectors back
          const selectors: string[] = [];
          if (styles.length !== 0) {
            for (const stylesheet of styles.trim().split('\n\n')) {
              const parts = stylesheet.trim().split(',\n');
              selectors.push(...parts.slice(0, -1));

              // Handle last one separately since it has the CSS rule
              const last = parts[parts.length - 1];
              selectors.push(last.slice(0, last.lastIndexOf('{')).trim());
            }
          }

          expect(selectors).to.have.lengthOf(matches.length);
          expect(selectors.sort()).to.eql(matches.sort());
        });
      },
    );
  });

  describe('#merge', () => {
    it('throws with no or one engine', () => {
      const error = 'merging engines requires at least two engines';
      // @ts-expect-error Expected to throw an error
      expect(() => FilterEngine.merge()).to.throw(error);
      expect(() => FilterEngine.merge([])).to.throw(error);
      expect(() => FilterEngine.merge([FilterEngine.empty()])).to.throw(error);
    });

    it('megers empty engines', () => {
      const filters = FilterEngine.merge([
        FilterEngine.empty(),
        FilterEngine.empty(),
      ]).getFilters();
      expect(filters).to.have.property('networkFilters').that.have.length(0);
      expect(filters).to.have.property('cosmeticFilters').that.have.length(0);
    });

    context('with network filters', () => {
      it('merges filters from both engines', () => {
        const filters = FilterEngine.merge([
          FilterEngine.parse('foo'),
          FilterEngine.parse('bar'),
        ]).getFilters();
        expect(filters).to.have.property('networkFilters').that.have.length(2);
      });

      it('removes duplicates', () => {
        const filters = FilterEngine.merge([
          FilterEngine.parse('foo$third-party'),
          FilterEngine.parse('foo$3p'),
        ]).getFilters();
        expect(filters).to.have.property('networkFilters').that.have.length(1);
      });
    });

    context('with cosmetic filters', () => {
      it('merges filters from both engines', () => {
        const filters = FilterEngine.merge([
          FilterEngine.parse('###foo'),
          FilterEngine.parse('###bar'),
        ]).getFilters();
        expect(filters).to.have.property('cosmeticFilters').that.have.length(2);
      });

      it('removes duplicates', () => {
        const filters = FilterEngine.merge([
          FilterEngine.parse('###foo'),
          FilterEngine.parse('###foo'),
        ]).getFilters();
        expect(filters).to.have.property('cosmeticFilters').that.have.length(1);
      });
    });

    context('with lists', () => {
      it('merges lists from both engines', () => {
        const engine1 = new FilterEngine({ lists: new Map([['a', 'a']]) });
        const engine2 = new FilterEngine({ lists: new Map([['b', 'b']]) });
        expect(FilterEngine.merge([engine1, engine2]))
          .to.have.property('lists')
          .that.deep.equal(
            new Map([
              ['a', 'a'],
              ['b', 'b'],
            ]),
          );
      });

      it('removes duplicates', () => {
        const engine1 = new FilterEngine({ lists: new Map([['a', 'a']]) });
        const engine2 = new FilterEngine({ lists: new Map([['a', 'a']]) });
        expect(FilterEngine.merge([engine1, engine2]))
          .to.have.property('lists')
          .that.deep.equal(new Map([['a', 'a']]));
      });
    });

    context('with preprocessors', () => {
      it('merges preprocessors from both engines', () => {
        const engine = FilterEngine.merge([
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
        const filters = engine.getFilters();
        expect(filters).to.have.property('cosmeticFilters').that.have.length(1);
        expect(filters).to.have.property('networkFilters').that.have.length(1);
        expect(engine.preprocessors.preprocessors).to.have.length(2);
      });

      it('removes duplicates', () => {
        const engine = FilterEngine.merge([
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
        const filters = engine.getFilters();
        expect(filters).to.have.property('cosmeticFilters').that.have.length(1);
        expect(filters).to.have.property('networkFilters').that.have.length(1);
        expect(engine.preprocessors.preprocessors).to.have.length(1);
        expect(engine.preprocessors.preprocessors[0].filterIDs).to.have.property('size', 2);
      });
    });

    context('with metadata', () => {
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

        const engine = FilterEngine.merge([engine1, engine2]);
        expect(engine.metadata).not.to.be.undefined;
        expect(engine.metadata!.getCategories()).to.have.length(2);
        expect(engine.metadata!.getOrganizations()).to.have.length(2);
        expect(engine.metadata!.getPatterns()).to.have.length(2);
      });

      it('removes duplicates', () => {
        const engine1 = FilterEngine.empty();
        engine1.metadata = new Metadata(createRawMetadata('foo'));
        const engine2 = FilterEngine.empty();
        engine2.metadata = new Metadata(createRawMetadata('foo'));

        const engine = FilterEngine.merge([engine1, engine2]);
        expect(engine.metadata).not.to.be.undefined;
        expect(engine.metadata!.getCategories()).to.have.length(1);
        expect(engine.metadata!.getOrganizations()).to.have.length(1);
        expect(engine.metadata!.getPatterns()).to.have.length(1);
      });
    });

    context('with resources', () => {
      function resourcesToText(mappings: Map<string, Resource>[]) {
        const merged: Map<string, Resource> = new Map();
        for (const resources of mappings) {
          for (const [name, resource] of resources) {
            if (!merged.has(name)) {
              merged.set(name, resource);
            }
          }
        }

        return [...merged.entries()]
          .reduce((state, [name, resource]) => {
            return [...state, `${name} ${resource.contentType}\n${resource.body}`];
          }, [] as string[])
          .join('\n\n');
      }

      const resources1 = `a.js application/javascript
function () { console.log(1) }`;
      const resources2 = `b.js application/javascript
function () { console.log(2) }`;

      it('merges resources from both engines', () => {
        const engine1 = FilterEngine.empty();
        const engine2 = FilterEngine.empty();
        engine1.updateResources(resources1, '1');
        engine2.updateResources(resources2, '2');

        const engine = FilterEngine.merge([engine1, engine2]);
        expect(engine.resources.js.size).to.be.eql(4);
        expect(engine.resources.checksum).to.be.eql(
          fastHash(
            resourcesToText([engine1.resources.resources, engine2.resources.resources]),
          ).toString(16),
        );
      });

      it('removes duplicates', () => {
        const engine1 = FilterEngine.empty();
        const engine2 = FilterEngine.empty();
        engine1.updateResources(resources1, '1');
        engine2.updateResources(resources1, '2');

        const engine = FilterEngine.merge([engine1, engine2]);
        expect(engine.resources.js.size).to.be.eql(2);
        expect(engine.resources.checksum).to.be.eql(
          fastHash(resourcesToText([engine1.resources.resources])).toString(16),
        );
      });
    });
  });
});

describe('diff updates', () => {
  function testUpdates(name: string, baseFilters: string[]): void {
    describe(name, () => {
      const base = Engine.parse(baseFilters.join('\n'), {
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
      const getEngine = () => Engine.deserialize(getSerialized());

      it('stays the same with empty update', () => {
        const engine = getEngine();
        const updated = engine.updateFromDiff({});
        expect(updated).to.be.false;
        expect(typedArrayEqual(engine.serialize(), getSerialized())).to.be.true;
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
        expect(updated).to.be.true;
        expect(typedArrayEqual(engine.serialize(), getSerialized())).to.be.false;

        // Remove same filters
        updated = engine.updateFromDiff({ removed: filtersRemoved });
        expect(updated).to.be.true;
        expect(typedArrayEqual(engine.serialize(), getSerialized())).to.be.true;
      });
    });
  }

  testUpdates('empty engine', []);
  testUpdates('easylist engine', loadEasyListFilters());
});

describe('events', () => {
  async function createEventAwaiter<
    Name extends keyof EngineEventHandlers,
    Handler extends EngineEventHandlers[Name],
    Arguments extends Parameters<Handler>,
  >(engine: Engine, name: Name, limit = 1) {
    return new Promise<Arguments[]>((resolve, reject) => {
      const callbacks: Arguments[] = [];

      const timeout = setTimeout(() => {
        engine.unsubscribe(name, handler);

        if (callbacks.length === 0) {
          reject(
            new Error(
              `Timeout reached before catching an event type of "${name}" within a second!`,
            ),
          );
        }

        resolve(callbacks);
      }, 1000);

      const handler = (...args: any) => {
        callbacks.push(args as Arguments);

        if (callbacks.length === limit) {
          engine.unsubscribe(name, handler);

          clearTimeout(timeout);
          resolve(callbacks);
        }
      };

      engine.on(name, handler);
    });
  }

  it('emits filter-matched', async () => {
    const engine = createEngine('||foo.com');
    const awaiter = createEventAwaiter(engine, 'filter-matched');

    engine.match(
      Request.fromRawDetails({
        url: 'http://foo.com',
      }),
    );

    const [[{ filter, exception }]] = await awaiter;

    expect(filter!.toString()).to.be.equal('||foo.com');
    expect(exception).to.be.equal(undefined);
  });

  it('emits exception in filter-matched', async () => {
    const engine = createEngine(`
      ||bar.com
      @@||bar.com
    `);
    const awaiter = createEventAwaiter(engine, 'filter-matched');

    engine.match(
      Request.fromRawDetails({
        url: 'http://bar.com',
      }),
    );

    const [[{ filter, exception }]] = await awaiter;

    expect(filter!.toString()).to.be.equal('||bar.com');
    expect(exception!.toString()).to.be.equal('@@||bar.com');
  });
});
