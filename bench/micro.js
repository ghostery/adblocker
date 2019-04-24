/* eslint-disable no-bitwise */

const { FiltersEngine, fastHash, tokenize, parseFilters } = require('../');
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
  return FiltersEngine.deserialize(serialized);
}

function benchStringHashing({ filters }) {
  let dummy = 0;
  for (let i = 0; i < filters.length; i += 1) {
    dummy = (dummy + fastHash(filters[i])) >>> 0;
  }
  return dummy;
}

function benchStringTokenize({ filters }) {
  let dummy = 0;
  for (let i = 0; i < filters.length; i += 1) {
    dummy = (dummy + tokenize(filters[i]).length) >>> ;
  }
  return dummy;
}

function benchParsingImpl(lists, options) {
  return parseFilters(lists, options);
}

function benchCosmeticsFiltersParsing({ combinedLists }) {
  return benchParsingImpl(combinedLists, {
    loadCosmeticFilters: true,
    loadNetworkFilters: false,
  });
}

function benchNetworkFiltersParsing({ combinedLists }) {
  return benchParsingImpl(combinedLists, {
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
  });
}

function benchGetNetworkTokens({ networkFilters }) {
  let dummy = 0;

  for (let i = 0; i < networkFilters.length; i += 1) {
    dummy = (dummy + networkFilters[i].getTokens().length) >>> 0;
  }

  return dummy;
}

function benchGetCosmeticTokens({ cosmeticFilters }) {
  let dummy = 0;

  for (let i = 0; i < cosmeticFilters.length; i += 1) {
    dummy = (dummy + cosmeticFilters[i].getTokens().length) >>> 0;
  }

  return dummy;
}

module.exports = {
  benchCosmeticsFiltersParsing,
  benchEngineCreation,
  benchEngineDeserialization,
  benchEngineSerialization,
  benchNetworkFiltersParsing,
  benchStringHashing,
  benchStringTokenize,
  benchGetNetworkTokens,
  benchGetCosmeticTokens,
};
