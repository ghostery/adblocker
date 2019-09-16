/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getDomain } from 'tldts-experimental';

import Engine from '../src/engine/engine';
import NetworkFilter from '../src/filters/network';
import Request, { RequestType } from '../src/request';
import Resources from '../src/resources';

import requests from './data/requests';

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
    expect(result.filter).not.toBeUndefined();
    if (
      result.filter !== undefined &&
      result.filter.rawLine !== undefined &&
      !result.filter.rawLine.includes('<+>')
    ) {
      expect(importants).toContainEqual(result.filter.rawLine);

      // Handle case where important filter is also a redirect
      if (filter.isRedirect()) {
        expect(redirects).toContainEqual(result.filter.rawLine);
      }
    }

    expect(result.exception).toBeUndefined();

    if (!filter.isRedirect()) {
      expect(result.redirect).toBeUndefined();
    }

    expect(result.match).toBeTruthy();
  } else if (
    filter.isException() &&
    normalFilters.length !== 0 &&
    !testFiltersInIsolation &&
    importants.length === 0
  ) {
    const result = engine.match(request);
    expect(result.exception).not.toBeUndefined();
    if (
      result.exception !== undefined &&
      result.exception.rawLine !== undefined &&
      !result.exception.rawLine.includes('<+>')
    ) {
      expect(exceptions).toContainEqual(result.exception.rawLine);
    }

    expect(result.filter).not.toBeUndefined();
    expect(result.redirect).toBeUndefined();
    expect(result.match).toBeFalsy();
  } else if (filter.isRedirect() && exceptions.length === 0 && importants.length === 0) {
    const result = engine.match(request);
    expect(result.filter).not.toBeUndefined();
    if (
      result.filter !== undefined &&
      result.filter.rawLine !== undefined &&
      !result.filter.rawLine.includes('<+>')
    ) {
      expect(redirects).toContainEqual(result.filter.rawLine);
    }

    expect(result.exception).toBeUndefined();
    expect(result.redirect).not.toBeUndefined();
    expect(result.match).toBeTruthy();
  }

  expect(matchingFilters).toContain(filter.rawLine);
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
    expect(
      Engine.parse('||foo.com', { loadNetworkFilters: true }).match(request).match,
    ).toBeTruthy();

    // Disabled
    expect(
      Engine.parse('||foo.com', { loadNetworkFilters: false }).match(request).match,
    ).toBeFalsy();
  });

  it('cosmetic filters are disabled', () => {
    // Enabled
    expect(
      Engine.parse('##selector', { loadCosmeticFilters: true }).getCosmeticsFilters({
        domain: 'foo.com',
        hostname: 'foo.com',
        url: 'https://foo.com',
      }),
    ).toEqual({
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
    ).toEqual({
      active: false,
      extended: [],
      scripts: [],
      styles: '',
    });
  });

  describe('cps policies', () => {
    it('no policy in engine', () => {
      expect(
        createEngine('this is not a csp').getCSPDirectives(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ),
      ).toBeUndefined();
    });

    it('network filters are disabled', () => {
      expect(
        Engine.parse('||foo.com$csp=bar', { loadNetworkFilters: false }).getCSPDirectives(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ),
      ).toBeUndefined();
    });

    it('request not supported', () => {
      // Not supported protocol
      expect(
        Engine.parse('||foo.com$csp=bar').getCSPDirectives(
          Request.fromRawDetails({
            url: 'ftp://foo.com',
          }),
        ),
      ).toBeUndefined();

      // Not document request
      expect(
        Engine.parse('||foo.com$csp=bar').getCSPDirectives(
          Request.fromRawDetails({
            type: 'script',
            url: 'ftp://foo.com',
          }),
        ),
      ).toBeUndefined();
    });

    it('does not match request', () => {
      expect(
        createEngine('||bar.com$csp=bar').getCSPDirectives(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ),
      ).toBeUndefined();
    });

    it('matches request (1 policy)', () => {
      expect(
        createEngine('||foo.com$csp=bar').getCSPDirectives(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ),
      ).toEqual('bar');
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

      expect(policies).not.toBeUndefined();
      if (policies !== undefined) {
        expect(policies.split('; ').sort()).toEqual(['bar', 'baz']);
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
      ).toEqual('bar');
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
      ).toBeUndefined();
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
      expect(createEngine('||foo.com$badfilter').match(request).match).toBe(false);
    });

    it('cancels filter with same ID', () => {
      expect(
        createEngine(`
||foo.com$domain=bar.com|foo.com,badfilter
||foo.com$domain=foo.com|bar.com
`).match(request).match,
      ).toBe(false);
    });

    it('does not cancel similar filter', () => {
      expect(
        createEngine(`
||foo.com$domain=bar.com|foo.com,badfilter
||foo.com$domain=foo.com|bar.com,image
`).match(request).match,
      ).toBe(true);
    });

    it('works with update as well', () => {
      const badfilter = NetworkFilter.parse('||foo.com$domain=bar.com|foo.com,badfilter');
      expect(badfilter).not.toBeNull();
      if (badfilter === null) {
        return;
      }

      // Initially, no $badfilter
      const engine = Engine.parse('||foo.com$domain=foo.com|bar.com', { debug: true });
      expect(engine.match(request).match).toBe(true);

      // Add $badfilter
      engine.update({
        newNetworkFilters: [badfilter],
      });
      expect(engine.match(request).match).toBe(false);

      // Remove $badfilter
      engine.update({
        removedNetworkFilters: [badfilter.getId()],
      });
      expect(engine.match(request).match).toBe(true);
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
        expect(parsed).not.toBeNull();
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
        const engine = Engine.parse('##+js(script.js,arg1)');
        engine.resources = Resources.parse('script.js application/javascript\n{{1}}', {
          checksum: '',
        });
        expect(
          engine.getCosmeticsFilters({
            domain: 'foo.com',
            hostname: 'foo.com',
            url: 'https://foo.com',
          }).scripts,
        ).toEqual(['arg1']);
      });

      it('script missing', () => {
        expect(
          Engine.parse('##+js(foo,arg1)').getCosmeticsFilters({
            domain: 'foo.com',
            hostname: 'foo.com',
            url: 'https://foo.com',
          }).scripts,
        ).toEqual([]);
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
        ).not.toBe('');
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
        ).toBe('');
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
        ).not.toBe('');
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
        ).not.toBe('');
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
        ).toBe('');
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
      ).toEqual('selector ,\nselector1  { foo }\n\nselector  { bar }');
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

          // #getCosmeticsFilters
          const { styles, scripts } = engine.getCosmeticsFilters({
            domain: getDomain(hostname) || '',
            hostname,
            url: `https://${hostname}`,

            classes,
            hrefs,
            ids,
          });

          expect(scripts).toHaveLength(injections.length);
          expect(scripts.sort()).toEqual(injections.sort());

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

          expect(selectors).toHaveLength(matches.length);
          expect(selectors.sort()).toEqual(matches.sort());
        });
      },
    );
  });
});
