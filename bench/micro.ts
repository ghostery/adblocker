/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  Config,
  CosmeticFilter,
  FiltersEngine,
  NetworkFilter,
  parseFilters,
  Request,
  tokenize,
} from '@cliqz/adblocker';
import { createEngine, domains500 } from './utils';

export function benchEngineCreation({ lists, resources }: { lists: string[]; resources: string }) {
  return createEngine(lists, resources, {
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: false,
  });
}

export function benchEngineSerialization({ engine }: { engine: FiltersEngine }) {
  return engine.serialize();
}

export function benchEngineDeserialization({
  serialized,
}: {
  serialized: Uint8Array | undefined;
}): FiltersEngine | undefined {
  if (serialized !== undefined) {
    return FiltersEngine.deserialize(serialized);
  }
  return undefined;
}

export function benchStringTokenize({ filters }: { filters: string[] }) {
  let dummy = 0;
  for (let i = 0; i < filters.length; i += 1) {
    dummy = (dummy + tokenize(filters[i]).length) >>> 0;
  }
  return dummy;
}

export function benchParsingImpl(lists: string, options: Partial<Config>) {
  return parseFilters(lists, options);
}

export function benchCosmeticsFiltersParsing({ combinedLists }: { combinedLists: string }) {
  return benchParsingImpl(combinedLists, {
    loadCosmeticFilters: true,
    loadNetworkFilters: false,
  });
}

export function benchNetworkFiltersParsing({ combinedLists }: { combinedLists: string }) {
  return benchParsingImpl(combinedLists, {
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
  });
}

export function benchGetNetworkTokens({ networkFilters }: { networkFilters: NetworkFilter[] }) {
  let dummy = 0;

  for (let i = 0; i < networkFilters.length; i += 1) {
    dummy = (dummy + networkFilters[i].getTokens().length) >>> 0;
  }

  return dummy;
}

export function benchGetCosmeticTokens({
  cosmeticFilters,
}: {
  cosmeticFilters: CosmeticFilter[];
}) {
  let dummy = 0;

  for (let i = 0; i < cosmeticFilters.length; i += 1) {
    dummy = (dummy + cosmeticFilters[i].getTokens().length) >>> 0;
  }

  return dummy;
}

export function benchGetCosmeticsFilters({ engine }: { engine: FiltersEngine }) {
  for (let i = 0; i < domains500.length; i += 1) {
    const domain = domains500[i];
    engine.getCosmeticsFilters({
      domain,
      hostname: domain,
      url: `https://${domain}`,
    });
  }
}

export function benchRequestParsing({
  requests,
}: {
  requests: { url: string; frameUrl: string; cpt: string }[];
}) {
  for (let i = 0; i < requests.length; i += 1) {
    const { url, frameUrl, cpt } = requests[i];
    Request.fromRawDetails({
      sourceUrl: frameUrl,
      // @ts-ignore
      type: cpt,
      url,
    });
  }
}
