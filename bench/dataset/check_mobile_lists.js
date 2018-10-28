const fs = require('fs');
const path = require('path');

const adblocker = require(path.resolve(__dirname, '../../dist/adblocker.umd.min.js'));


function loadLists() {
  return {
    lists: [
      fs.readFileSync(path.resolve(__dirname, './mobile_filters.txt'), { encoding: 'utf-8' }),
    ],
    resources: fs.readFileSync(
      path.resolve(
        __dirname,
        '../../assets/',
        'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt',
      ),
      { encoding: 'utf-8' },
    ),
  };
}

function createEngine(lists, resources) {
  const engine = new adblocker.FiltersEngine({
    enableOptimizations: true,
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: true,
    version: 1,
  });

  engine.onUpdateResource([{ filters: resources, checksum: '' }]);
  const serialized = engine.onUpdateFilters(
    lists.map((filters, i) => ({
      asset: `${i}`,
      checksum: '',
      filters,
    })),
    new Set(),
    true,
    true,
  );

  return {
    engine,
    serialized,
  };
}

function main() {
  const { lists, resources } = loadLists();
  const { engine } = createEngine(lists, resources);
}

main();
