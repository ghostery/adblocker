import Engine from '../src/engine/engine';
// import requests from './data/requests';
// import { loadAllLists, loadResources } from './utils';

describe('#FiltersEngine', async () => {
  // const lists = await loadAllLists();
  // const resources = await loadResources();
  // let engine: Engine | null = null;

  // const createEngine = (extraFilter: string) => {
  //   const newEngine = new Engine({
  //     loadCosmeticFilters: true,
  //     loadNetworkFilters: false,
  //     optimizeAOT: false,
  //     version: 1,
  //   });

  //   newEngine.onUpdateResource([{ filters: resources, checksum: '' }]);
  //   newEngine.onUpdateFilters([{
  //     asset: 'lists',
  //     checksum: '',
  //     filters: lists,
  //   }, {
  //     asset: 'extraFilter',
  //     checksum: '',
  //     filters: extraFilter,
  //   }], new Set());

  //   return newEngine;
  // };

  // Load all filters + add individual filters
  // requests.forEach((request) => {
  //   const filter = request.filter || request.exception;
  //   it(`it matches ${request.filter}`, () => {
  //     engine = createEngine(request.filter || request.exception);
  //   });
  // });

  // Load all filters from request
});

function checkEngine() {
  const engine = new Engine({
    loadCosmeticFilters: true,
    loadNetworkFilters: false,
    optimizeAOT: false,
    version: 1,
  });

  engine.onUpdateFilters(
    [{ filters: '## .foo', checksum: '', asset: '' }],
    new Set(),
  );

  // TODO - check results
  engine.getCosmeticsFilters('', [['.foo']]);
}

describe('Engine Cosmetics', () => {
  it('TODO', () => {
    checkEngine();
  });
});
