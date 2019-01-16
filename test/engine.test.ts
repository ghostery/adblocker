import * as tldts from 'tldts';

import Engine from '../src/engine/engine';
import { makeRequest } from '../src/request';

import requests from './data/requests';

function createEngine(filters: string, enableOptimizations: boolean = true) {
  const newEngine = new Engine({
    debug: true,
    enableOptimizations,
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
  });

  newEngine.onUpdateFilters(
    [
      {
        asset: 'filters',
        checksum: '',
        filters,
      },
    ],
    new Set(),
  );

  return newEngine;
}

describe('#FiltersEngine', () => {
  describe('filters with bug id', () => {
    it('matches bug filter', () => {
      const filter = createEngine('||foo.com$bug=42').match(
        makeRequest(
          {
            url: 'https://foo.com',
          },
          tldts,
        ),
      ).filter;
      expect(filter).not.toBeUndefined();
      if (filter !== undefined) {
        expect(filter.bug).toEqual(42);
      }
    });

    it('matches bug filter exception', () => {
      const exception = createEngine(`
||foo.com$bug=42
@@$bug=42,domain=bar.com
`).match(
        makeRequest(
          {
            sourceUrl: 'https://bar.com',
            url: 'https://foo.com',
          },
          tldts,
        ),
      ).exception;
      expect(exception).not.toBeUndefined();
      if (exception !== undefined) {
        expect(exception.bug).toEqual(42);
      }
    });

    it('matches bug filter exception (only if filter has bug)', () => {
      const exception = createEngine(`
||foo.com
@@$bug=42,domain=bar.com
`).match(
        makeRequest(
          {
            sourceUrl: 'https://bar.com',
            url: 'https://foo.com',
          },
          tldts,
        ),
      ).exception;
      expect(exception).toBeUndefined();
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
            tldts,
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
            tldts,
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
            tldts,
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
          tldts,
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
            tldts,
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
            tldts,
          ),
        ),
      ).toBeUndefined();
    });
  });

  describe('network filters', () => {
    const allRequestFilters = requests.map(({ filters }) => filters.join('\n')).join('\n');

    [
      { enableOptimizations: true, allFilters: '' },
      { enableOptimizations: false, allFilters: '' },
      { enableOptimizations: true, allFilters: allRequestFilters },
      { enableOptimizations: false, allFilters: allRequestFilters },
    ].forEach((setup) => {
      describe(`initialized with optimization: ${
        setup.enableOptimizations
      } and filters: ${!!setup.allFilters}`, () => {
        const engine = createEngine(setup.allFilters, setup.enableOptimizations);

        requests.forEach(({ filters, type, url, sourceUrl }) => {
          filters.forEach((filter) => {
            it(`${filter}, ${type} matches url=${url}, sourceUrl=${sourceUrl}`, () => {
              // Update engine with this specific filter only if the engine is
              // initially empty.
              if (setup.allFilters.length === 0) {
                engine.onUpdateFilters(
                  [
                    {
                      asset: 'extraFilters',
                      checksum: '',
                      filters: filter,
                    },
                  ],
                  new Set(['filters']),
                );
              }

              const matchingFilters = new Set();
              [
                ...engine.matchAll(
                  makeRequest(
                    {
                      sourceUrl,
                      type,
                      url,
                    },
                    tldts,
                  ),
                ),
              ].forEach((optimizedFilter) => {
                (optimizedFilter.rawLine || '').split(' <+> ').forEach((f: string) => {
                  matchingFilters.add(f);
                });
              });

              expect(matchingFilters).toContain(filter);
            });
          });
        });
      });
    });
  });

  describe('cosmetic filters', () => {
    describe('#getCosmeticsFilters', () => {
      [
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
        it(`${testCase.hostname}`, () => {
          // Initialize engine with all rules from test case
          const engine = createEngine([...testCase.matches, ...testCase.misMatches].join('\n'));

          const shouldMatch: Set<string> = new Set(testCase.matches);
          const shouldNotMatch: Set<string> = new Set(testCase.misMatches);

          // #getCosmeticFilters
          const rules = engine.cosmetics.getCosmeticsFilters(
            testCase.hostname,
            tldts.getDomain(testCase.hostname) || '',
            (id) => engine.lists.getCosmeticFilter(id),
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
});
