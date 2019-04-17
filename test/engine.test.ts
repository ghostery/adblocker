import * as tldts from 'tldts';

import Engine from '../src/engine/engine';
import NetworkFilter from '../src/filters/network';
import Request, { makeRequest } from '../src/request';
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
  [...engine.matchAll(request)].forEach((matchingFilter) => {
    (matchingFilter.rawLine || '').split(' <+> ').forEach((f: string) => {
      matchingFilters.add(f);
    });
  });

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
    const request = makeRequest({ url: 'https://foo.com' }, tldts.parse);

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
      Engine.parse('##.selector', { loadCosmeticFilters: true }).getCosmeticsFilters({
        domain: 'foo.com',
        hostname: 'foo.com',
        url: 'https://foo.com',
      }),
    ).toEqual({
      active: true,
      scripts: [],
      styles: '.selector { display: none !important; }',
    });

    // Disabled
    expect(
      Engine.parse('##.selector', { loadCosmeticFilters: false }).getCosmeticsFilters({
        domain: 'foo.com',
        hostname: 'foo.com',
        url: 'https://foo.com',
      }),
    ).toEqual({
      active: false,
      scripts: [],
      styles: '',
    });
  });

  describe('cps policies', () => {
    it('no policy in engine', () => {
      expect(
        createEngine('this is not a csp').getCSPDirectives(
          makeRequest(
            {
              url: 'https://foo.com',
            },
            tldts.parse,
          ),
        ),
      ).toBeUndefined();
    });

    it('network filters are disabled', () => {
      expect(
        Engine.parse('||foo.com$csp=bar', { loadNetworkFilters: false }).getCSPDirectives(
          makeRequest(
            {
              url: 'https://foo.com',
            },
            tldts.parse,
          ),
        ),
      ).toBeUndefined();
    });

    it('request not supported', () => {
      // Not supported protocol
      expect(
        Engine.parse('||foo.com$csp=bar').getCSPDirectives(
          makeRequest(
            {
              url: 'ftp://foo.com',
            },
            tldts.parse,
          ),
        ),
      ).toBeUndefined();

      // Not document request
      expect(
        Engine.parse('||foo.com$csp=bar').getCSPDirectives(
          makeRequest(
            {
              type: 'script',
              url: 'ftp://foo.com',
            },
            tldts.parse,
          ),
        ),
      ).toBeUndefined();
    });

    it('does not match request', () => {
      expect(
        createEngine('||bar.com$csp=bar').getCSPDirectives(
          makeRequest(
            {
              url: 'https://foo.com',
            },
            tldts.parse,
          ),
        ),
      ).toBeUndefined();
    });

    it('matches request (1 policy)', () => {
      expect(
        createEngine('||foo.com$csp=bar').getCSPDirectives(
          makeRequest(
            {
              url: 'https://foo.com',
            },
            tldts.parse,
          ),
        ),
      ).toEqual('bar');
    });

    it('matches request (2 policy)', () => {
      const policies = createEngine(`
||foo.com$csp=bar
$csp=baz,domain=bar.com
`).getCSPDirectives(
        makeRequest(
          {
            sourceUrl: 'https://bar.com',
            url: 'https://foo.com',
          },
          tldts.parse,
        ),
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
          makeRequest(
            {
              sourceUrl: 'https://bar.com',
              url: 'https://foo.com',
            },
            tldts.parse,
          ),
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
          makeRequest(
            {
              sourceUrl: 'https://bar.com',
              url: 'https://foo.com',
            },
            tldts.parse,
          ),
        ),
      ).toBeUndefined();
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
      const request = makeRequest(
        {
          sourceUrl,
          type,
          url,
        },
        tldts.parse,
      );

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
          Engine.parse('##.selector').getCosmeticsFilters({
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
||foo.com^$generichide
~bar.*##.selector1
##.selector2
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).toBe('');
      });

      it('allows generic cosmetics if @@$generichide', () => {
        expect(
          Engine.parse(
            `
||foo.com^$generichide
##.selector
@@||foo.com^$generichide
`,
          ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
            .styles,
        ).not.toBe('');
      });
    });

    it('handles custom :styles', () => {
      expect(
        Engine.parse(
          `
##.selector :style(foo)
##.selector :style(bar)
##.selector1 :style(foo)`,
        ).getCosmeticsFilters({ domain: 'foo.com', hostname: 'foo.com', url: 'https://foo.com' })
          .styles,
      ).toEqual('.selector ,\n.selector1  { foo }\n\n.selector  { bar }');
    });

    [
      // Generic hides
      {
        hostname: 'domain.com',
        matches: ['##.adwords', '~google.*##.adwords'],
        misMatches: [],
      },
      {
        hostname: 'google.com',
        matches: ['##.adwords'],
        misMatches: ['~google.*##.adwords'],
      },
      // Negated entity exceptions do not appear in matches
      {
        hostname: 'google.com',
        matches: ['##.adwords'],
        misMatches: ['~google.com#@#.adwords'],
      },
      {
        hostname: 'google.de',
        matches: ['##.adwords'],
        misMatches: ['~google.com#@#.adwords'],
      },
      {
        hostname: 'google.com',
        matches: ['##.adwords'],
        misMatches: ['~google.*#@#.adwords'],
      },
      // Exception cancels generic rule
      {
        hostname: 'google.com',
        matches: [],
        misMatches: ['##.adwords', 'google.com#@#.adwords'],
      },
      // Exception cancels entity rule
      {
        hostname: 'google.com',
        matches: [],
        misMatches: ['google.*##.adwords', 'google.com#@#.adwords'],
      },
      // Exception cancels hostname rule
      {
        hostname: 'google.com',
        matches: [],
        misMatches: ['google.com##.adwords', 'google.com#@#.adwords'],
      },
      // Entity exception cancels generic rule
      {
        hostname: 'google.com',
        matches: [],
        misMatches: ['##.adwords', 'google.*#@#.adwords'],
      },
      // Entity exception cancels entity rule
      {
        hostname: 'google.com',
        matches: [],
        misMatches: ['google.*##.adwords', 'google.*#@#.adwords'],
      },
      // Exception does not cancel if selector is different
      {
        hostname: 'google.de',
        matches: ['##.adwords2'],
        misMatches: ['google.de#@#.adwords'],
      },
      {
        hostname: 'google.de',
        matches: ['google.de##.adwords2'],
        misMatches: ['google.de#@#.adwords'],
      },
      // Exception does not cancel if hostname is different
      {
        hostname: 'google.de',
        matches: ['##.adwords'],
        misMatches: ['google.com#@#.adwords'],
      },
      {
        hostname: 'google.com',
        matches: ['##.adwords'],
        misMatches: ['accounts.google.com#@#.adwords'],
      },
      {
        hostname: 'speedtest.net',
        matches: ['##.ad-stack'],
        misMatches: [],
      },
      {
        hostname: 'example.de',
        matches: ['###AD300Right'],
        misMatches: [],
      },
      {
        hostname: 'pokerupdate.com',
        matches: [],
        misMatches: [],
      },
      {
        hostname: 'pokerupdate.com',
        matches: ['pokerupdate.com##.related-room', 'pokerupdate.com##.prev-article'],
        misMatches: [],
      },
      {
        hostname: 'google.com',
        matches: [
          'google.com,~mail.google.com##.c[style="margin: 0pt;"]',
          '###tads + div + .c',
          '##.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '##.mw > #rcnt > #center_col > #taw > .c',
        ],
        misMatches: [],
      },
      {
        hostname: 'mail.google.com',
        matches: [
          '###tads + div + .c',
          '##.mw > #rcnt > #center_col > #taw > #tvcap > .c',
          '##.mw > #rcnt > #center_col > #taw > .c',
        ],
        misMatches: ['google.com,~mail.google.com##.c[style="margin: 0pt;"]'],
      },
      {
        hostname: 'bitbucket.org',
        matches: [],
        misMatches: [],
      },
      {
        hostname: 'bild.de',
        matches: [],
        misMatches: [
          'bild.de##script:contains(/^s*de.bild.cmsKonfig/)',
          'bild.de#@#script:contains(/^s*de.bild.cmsKonfig/)',
        ],
      },
    ].forEach((testCase: { hostname: string; matches: string[]; misMatches: string[] }) => {
      it(JSON.stringify(testCase), () => {
        // Initialize engine with all rules from test case
        const engine = createEngine([...testCase.matches, ...testCase.misMatches].join('\n'));

        const shouldMatch: Set<string> = new Set(testCase.matches);
        const shouldNotMatch: Set<string> = new Set(testCase.misMatches);

        // #getCosmeticsFilters
        const rules = engine.cosmetics.getCosmeticsFilters(
          testCase.hostname,
          tldts.getDomain(testCase.hostname) || '',
          true,
        );

        expect(rules.length).toEqual(shouldMatch.size);
        rules.forEach((rule) => {
          expect(rule.rawLine).not.toBeUndefined();
          if (rule.rawLine !== undefined) {
            if (!shouldMatch.has(rule.rawLine)) {
              throw new Error(`Expected ${rule.rawLine} to match ${testCase.hostname}`);
            }
            if (shouldNotMatch.has(rule.rawLine)) {
              throw new Error(`Expected ${rule.rawLine} not to match ${testCase.hostname}`);
            }
          }
        });
      });
    });
  });
});
