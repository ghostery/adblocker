import Engine from '../src/engine/engine';

describe('Engine', () => {
  it('TODO', () => {
    // TODO
  });
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
