const adblocker = require('../dist/adblocker.cjs.js');
const { createEngine } = require('./utils');


function benchEngineCreation({ lists, resources }) {
  return createEngine(lists, resources, {
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: false,
  });
}

function benchEngineOptimization({ engine }) {
  return engine.optimize();
}

function benchEngineSerialization({ engine }) {
  return engine.serialize();
}

function benchEngineDeserialization({ serialized }) {
  return adblocker.deserializeEngine(serialized, 1);
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
    dummy = (dummy + adblocker.parseList(lists[i], {
      loadNetworkFilters,
      loadCosmeticFilters,
      debug: false,
    }).length) % 100000;
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
  benchEngineOptimization,
  benchEngineSerialization,
  benchEngineDeserialization,
  benchNetworkFiltersParsing,
  benchStringHashing,
  benchStringTokenize,

};
