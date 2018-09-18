import Engine from '../src/engine/engine';
import { parseNetworkFilter } from '../src/parsing/network-filter';
import requests from './data/requests';
import { types } from './utils';

function createEngine(filters: string, enableOptimizations: boolean) {
  const newEngine = new Engine({
    enableOptimizations,
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: true,
    version: 1,
  });

  newEngine.onUpdateFilters([{
    asset: 'filters',
    checksum: '',
    filters,
  }]);

  return newEngine;
}

describe('#FiltersEngine', () => {
  const allRequestFilters =
    requests
      .map(({ filter, exception }) => `${filter || ''}\n${exception || ''}`)
      .join('\n');

  [
    { enableOptimizations: true, allFilters: '' },
    { enableOptimizations: false, allFilters: '' },
    { enableOptimizations: true, allFilters: allRequestFilters },
    { enableOptimizations: false, allFilters: allRequestFilters },
  ].forEach((setup) => {
    describe(`initialized with optimization: ${setup.enableOptimizations} and filters: ${!!setup.allFilters}`, () => {
      const engine = createEngine(setup.allFilters, setup.enableOptimizations);

      requests.forEach(({ filter, exception, cpt, url, sourceUrl }) => {
        it(`${filter}, ${exception}, ${cpt}, ${url}, ${sourceUrl}`, () => {
          // Update engine with this specific filter only if the engine is
          // initially empty.
          if (setup.allFilters.length === 0) {
            engine.onUpdateFilters([{
              asset: 'extraFilters',
              checksum: '',
              filters: `${filter || ''}\n${exception || ''}`,
            }], new Set(['filters']));
          }

          const result = engine.match({
            cpt: types[cpt],
            sourceUrl,
            url,
          });

          // Check filter
          if (filter !== undefined) {
            expect(result.filter).not.toBeUndefined();
            if (setup.enableOptimizations === false || setup.allFilters.length === 0) {
              expect('' + result.filter).toEqual('' + parseNetworkFilter(filter));
            }
          } else {
            expect(result.filter).toBeUndefined();
          }

          // Check exception
          if (exception !== undefined) {
            expect(result.exception).not.toBeUndefined();
            expect('' + result.exception).toEqual('' + parseNetworkFilter(exception));
          } else {
            expect(result.exception).toBeUndefined();
          }
        });
      });
    });
  });
});
