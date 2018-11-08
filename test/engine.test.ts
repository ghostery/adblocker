import Engine from '../src/engine/engine';
import requests from './data/requests';

function createEngine(filters: string, enableOptimizations: boolean) {
  const newEngine = new Engine({
    enableOptimizations,
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: true,
    version: 1,
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
    true,
  );

  return newEngine;
}

describe('#FiltersEngine', () => {
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
                  true,
                );
              }

              const matchingFilters = new Set();
              [
                ...engine.matchAll({
                  sourceUrl,
                  type,
                  url,
                }),
              ].forEach((optimizedFilter) => {
                (optimizedFilter.rawLine || '').split(' <+> ').forEach((f) => {
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
    describe('hostnames', () => {
      [
        {
          hostname: 'bild.de',
          matches: [],
          misMatches: [
            'bild.de##script:contains(/^s*de.bild.cmsKonfig/)',
            'bild.de#@#script:contains(/^s*de.bild.cmsKonfig/)',
          ],
        },
      ].forEach((testCase: { hostname: string; matches: string[]; misMatches: string[] }) => {
        it(testCase.hostname, () => {
          const engine = createEngine(
            [...testCase.matches, ...testCase.misMatches].join('\n'),
            true,
          );

          const shouldMatch: Set<string> = new Set(testCase.matches);
          const shouldNotMatch: Set<string> = new Set(testCase.misMatches);

          const rules = engine.cosmetics.getDomainRules(testCase.hostname, engine.js);
          expect(rules.length).toEqual(shouldMatch.size);
          rules.forEach((rule) => {
            expect(rule.rawLine).not.toBeNull();
            if (rule.rawLine !== undefined && !shouldMatch.has(rule.rawLine)) {
              throw new Error(`Expected node ${testCase.hostname} ` + ` to match ${rule.rawLine}`);
            }
            if (rule.rawLine !== undefined && shouldNotMatch.has(rule.rawLine)) {
              throw new Error(
                `Expected node ${testCase.hostname} ` + ` not to match ${rule.rawLine}`,
              );
            }
          });
        });
      });
    });

    describe('nodes', () => {
      [
        {
          hostname: 'google.com',
          matches: ['##.adwords'],
          misMatches: ['accounts.google.com#@#.adwords'],
          node: ['.adwords'],
        },
        {
          hostname: 'speedtest.net',
          matches: ['##.ad-stack'],
          misMatches: [],
          node: ['.ad-stack'],
        },
        {
          hostname: 'example.de',
          matches: ['###AD300Right'],
          misMatches: [],
          node: ['#AD300Right'],
        },
        {
          hostname: 'pokerupdate.com',
          matches: [],
          misMatches: [],
          node: ['#not_an_ad'],
        },
        {
          hostname: 'pokerupdate.com',
          matches: ['pokerupdate.com##.related-room', 'pokerupdate.com##.prev-article'],
          misMatches: [],
          node: ['.related-room', '.prev-article'],
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
          node: ['.c'],
        },
        {
          hostname: 'mail.google.com',
          matches: [
            '###tads + div + .c',
            '##.mw > #rcnt > #center_col > #taw > #tvcap > .c',
            '##.mw > #rcnt > #center_col > #taw > .c',
          ],
          misMatches: ['google.com,~mail.google.com##.c[style="margin: 0pt;"]'],
          node: ['.c'],
        },
        {
          hostname: 'bitbucket.org',
          matches: [],
          misMatches: [],
          node: ['.p'],
        },
      ].forEach(
        (testCase: {
          hostname: string;
          matches: string[];
          misMatches: string[];
          node: string[];
        }) => {
          it(`${testCase.hostname}: ${JSON.stringify(testCase.node)}`, () => {
            const engine = createEngine(
              [...testCase.matches, ...testCase.misMatches].join('\n'),
              true,
            );

            const shouldMatch: Set<string> = new Set(testCase.matches);
            const shouldNotMatch: Set<string> = new Set(testCase.misMatches);

            const rules = engine.cosmetics.getMatchingRules(testCase.hostname, [testCase.node]);
            expect(rules.length).toEqual(shouldMatch.size);
            rules.forEach((rule) => {
              expect(rule.rawLine).not.toBeNull();
              if (rule.rawLine !== undefined && !shouldMatch.has(rule.rawLine)) {
                throw new Error(
                  `Expected node ${testCase.hostname} + ` +
                    `${JSON.stringify(testCase.node)}` +
                    ` to match ${rule.rawLine} ${JSON.stringify(rule)}`,
                );
              }
              if (rule.rawLine !== undefined && shouldNotMatch.has(rule.rawLine)) {
                throw new Error(
                  `Expected node ${testCase.hostname} + ` +
                    `${JSON.stringify(testCase.node)}` +
                    ` not to match ${rule.rawLine} ${JSON.stringify(rule)}`,
                );
              }
            });
          });
        },
      );
    });
  });
});
