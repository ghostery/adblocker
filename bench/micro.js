/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/* eslint-disable no-bitwise */

const { FiltersEngine, fastHash, tokenize, parseFilters } = require('../');
const { createEngine, domains500 } = require('./utils');


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
    dummy = (dummy + tokenize(filters[i]).length) >>> 0;
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

function benchGetCosmeticsFilters({ engine }) {
  for (let i = 0; i < domains500.length; i += 1) {
    const domain = domains500[i];
    engine.getCosmeticsFilters({
      url: `https://${domain}`,
      hostname: domain,
      domain,
    });
  }
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
  benchGetCosmeticsFilters,
};
