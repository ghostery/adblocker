const adblocker = require('../dist/adblocker.cjs.js');
const { createEngine } = require('./utils');


function benchEngineCreation({ lists, resources }) {
  return createEngine(lists, resources, {
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: false,
  });
}

function benchEngineSerialization({ engine }) {
  return engine.serialize();
}

function benchEngineDeserialization({ serialized }) {
  return adblocker.FiltersEngine.deserialize(serialized);
}

function benchStringHashing({ filters }) {
  let dummy = 0;
  for (let i = 0; i < filters.length; i += 1) {
    dummy = (dummy + adblocker.fastHash(filters[i])) % 1000000000;
  }
  return dummy;
}

function benchStringTokenize({ filters }) {
  let dummy = 0;
  for (let i = 0; i < filters.length; i += 1) {
    dummy = (dummy + adblocker.tokenize(filters[i]).length) % 1000000000;
  }
  return dummy;
}

function benchParsingImpl(lists, { loadNetworkFilters, loadCosmeticFilters }) {
  let dummy = 0;

  for (let i = 0; i < lists.length; i += 1) {
    dummy = (dummy + adblocker.parseFilters(lists[i], {
      loadNetworkFilters,
      loadCosmeticFilters,
    }).networkFilters.length) % 100000;
  }

  return dummy;
}

function benchCosmeticsFiltersParsing({ lists }) {
  return benchParsingImpl(lists, {
    loadCosmeticFilters: true,
    loadNetworkFilters: false,
  });
}

function benchNetworkFiltersParsing({ lists }) {
  return benchParsingImpl(lists, {
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
  });
}


module.exports = {
  benchCosmeticsFiltersParsing,
  benchEngineCreation,
  benchEngineSerialization,
  benchEngineDeserialization,
  benchNetworkFiltersParsing,
  benchStringHashing,
  benchStringTokenize,

};
