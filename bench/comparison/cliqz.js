const path = require('path');

const { FiltersEngine } = require(path.resolve(__dirname, '../../'));

module.exports = (rawList) => {
  const engine = FiltersEngine.deserialize(
    new Uint8Array(FiltersEngine.parse(rawList, { loadCosmeticFilters: false }).serialize()),
  );

  return request => engine.match(request).match;
};
