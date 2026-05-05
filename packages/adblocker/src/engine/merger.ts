/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Config from '../config.js';
import CosmeticFilter from '../filters/cosmetic.js';
import NetworkFilter from '../filters/network.js';
import Preprocessor from '../preprocessor.js';
import Resources from '../resources.js';
import CosmeticFilterBucket from './bucket/cosmetic.js';
import FiltersContainer from './bucket/filters.js';
import HTMLBucket from './bucket/html.js';
import NetworkFilterBucket from './bucket/network.js';
import PreprocessorBucket from './bucket/preprocessor.js';
import FilterEngine from './engine.js';
import { Metadata } from './metadata.js';
import { ICategory } from './metadata/categories.js';
import { IOrganization } from './metadata/organizations.js';
import { IPattern } from './metadata/patterns.js';
import ReverseIndex from './reverse-index.js';

export type HashFunc = (arr: Uint8Array, beg: number, end: number) => number | string | bigint;

export type MergeOptions = {
  skipResources?: boolean;
  overrideConfig?: Partial<Config>;

  // `binaryMerge` specifics;
  useBinaryMerge?: boolean;
  // See the comment in reverse-index.ts for this option.
  hashFunc?: HashFunc;
};

type MetadataCollection = {
  organizations: Record<string, IOrganization>;
  categories: Record<string, ICategory>;
  patterns: Record<string, IPattern>;
};

export function mergeMetadata<T extends typeof FilterEngine>(
  engines: InstanceType<T>[],
): MetadataCollection {
  const metadata: MetadataCollection = {
    organizations: {},
    categories: {},
    patterns: {},
  };

  for (const engine of engines) {
    if (engine.metadata !== undefined) {
      for (const organization of engine.metadata.organizations.getValues()) {
        if (metadata.organizations[organization.key] === undefined) {
          metadata.organizations[organization.key] = organization;
        }
      }
      for (const category of engine.metadata.categories.getValues()) {
        if (metadata.categories[category.key] === undefined) {
          metadata.categories[category.key] = category;
        }
      }
      for (const pattern of engine.metadata.patterns.getValues()) {
        if (metadata.patterns[pattern.key] === undefined) {
          metadata.patterns[pattern.key] = pattern;
        }
      }
    }
  }

  return metadata;
}

export function mergeLists<T extends typeof FilterEngine>(
  engines: InstanceType<T>[],
): Map<string, string> {
  const lists = new Map<string, string>();

  for (const engine of engines) {
    for (const [key, value] of engine.lists) {
      if (lists.has(key)) {
        continue;
      }

      lists.set(key, value);
    }
  }

  return lists;
}

export function mergePreprocessors<T extends typeof FilterEngine>(
  engines: InstanceType<T>[],
): Preprocessor[] {
  const preprocessors: Preprocessor[] = [];

  for (const engine of engines) {
    for (const preprocessor of engine.preprocessors.preprocessors) {
      const local = preprocessors.find((local) => local.condition === preprocessor.condition);

      if (local === undefined) {
        preprocessors.push(
          new Preprocessor({
            condition: preprocessor.condition,
            filterIDs: new Set(preprocessor.filterIDs),
          }),
        );

        continue;
      }

      for (const filterID of preprocessor.filterIDs) {
        local.filterIDs.add(filterID);
      }
    }
  }

  return preprocessors;
}

function hasMetadata(metadata: MetadataCollection): boolean {
  return (
    Object.keys(metadata.categories).length +
      Object.keys(metadata.organizations).length +
      Object.keys(metadata.patterns).length !==
    0
  );
}

/**
 * Legacy semantic merge implementation, moved out of `FilterEngine.merge` so it
 * can live next to byte-level merging during the transition.
 */
export function legacyMerge<T extends typeof FilterEngine>(
  this: T,
  engines: InstanceType<T>[],
  { skipResources = false, overrideConfig = {} }: MergeOptions = {},
): InstanceType<T> {
  if (!engines || engines.length < 2) {
    throw new Error('merging engines requires at least two engines');
  }

  for (const engine of engines) {
    if (engine.config.enableCompression !== engines[0].config.enableCompression) {
      throw new Error(
        `compression of all merged engines must match with the first one: "${engines[0].config.enableCompression}" but got: "${engine.config.enableCompression}"`,
      );
    }
  }

  const networkFilters: Map<number, NetworkFilter> = new Map();
  const cosmeticFilters: Map<number, CosmeticFilter> = new Map();

  const metadata = mergeMetadata(engines);
  const lists = mergeLists(engines);
  const preprocessors = mergePreprocessors(engines);

  for (const engine of engines) {
    const filters = engine.getFilters();

    for (const networkFilter of filters.networkFilters) {
      networkFilters.set(networkFilter.getId(), networkFilter);
    }

    for (const cosmeticFilter of filters.cosmeticFilters) {
      cosmeticFilters.set(cosmeticFilter.getId(), cosmeticFilter);
    }
  }

  const engine = new this({
    networkFilters: Array.from(networkFilters.values()),
    cosmeticFilters: Array.from(cosmeticFilters.values()),
    preprocessors,

    lists,
    config: new Config({ ...engines[0].config, ...overrideConfig }),
  }) as InstanceType<T>;

  if (hasMetadata(metadata)) {
    engine.metadata = new Metadata(metadata);
  }

  if (skipResources !== true) {
    for (const engine of engines.slice(1)) {
      if (engine.resources.checksum !== engines[0].resources.checksum) {
        throw new Error(
          `resource checksum of all merged engines must match with the first one: "${engines[0].resources.checksum}" but got: "${engine.resources.checksum}"`,
        );
      }
    }
    engine.resources = Resources.copy(engines[0].resources);
  }

  return engine;
}

function mergeNetworkFilterBucket(
  sources: NetworkFilterBucket[],
  config: Config,
  hashFunc?: HashFunc,
): NetworkFilterBucket {
  const bucket = new NetworkFilterBucket({ config });

  bucket.index = ReverseIndex.merge(
    sources.map((source) => source.index),
    { hashFunc },
  );
  bucket.badFilters = FiltersContainer.merge(
    sources.map((source) => source.badFilters),
    { hashFunc },
  );

  return bucket;
}

function mergeCosmeticFilterBucket(
  sources: CosmeticFilterBucket[],
  config: Config,
  hashFunc?: HashFunc,
): CosmeticFilterBucket {
  const bucket = new CosmeticFilterBucket({ config });

  bucket.genericRules = FiltersContainer.merge(
    sources.map((source) => source.genericRules),
    { hashFunc },
  );
  bucket.classesIndex = ReverseIndex.merge(
    sources.map((source) => source.classesIndex),
    { hashFunc },
  );
  bucket.hostnameIndex = ReverseIndex.merge(
    sources.map((source) => source.hostnameIndex),
    { hashFunc },
  );
  bucket.hrefsIndex = ReverseIndex.merge(
    sources.map((source) => source.hrefsIndex),
    { hashFunc },
  );
  bucket.idsIndex = ReverseIndex.merge(
    sources.map((source) => source.idsIndex),
    { hashFunc },
  );
  bucket.unhideIndex = ReverseIndex.merge(
    sources.map((source) => source.unhideIndex),
    { hashFunc },
  );

  return bucket;
}

function mergeHTMLBucket(sources: HTMLBucket[], config: Config, hashFunc?: HashFunc): HTMLBucket {
  const bucket = new HTMLBucket({ config });

  bucket.networkIndex = ReverseIndex.merge(
    sources.map((source) => source.networkIndex),
    { hashFunc },
  );
  bucket.exceptionsIndex = ReverseIndex.merge(
    sources.map((source) => source.exceptionsIndex),
    { hashFunc },
  );
  bucket.cosmeticIndex = ReverseIndex.merge(
    sources.map((source) => source.cosmeticIndex),
    { hashFunc },
  );
  bucket.unhideIndex = ReverseIndex.merge(
    sources.map((source) => source.unhideIndex),
    { hashFunc },
  );

  return bucket;
}

export function binaryMerge<T extends typeof FilterEngine>(
  this: T,
  engines: InstanceType<T>[],
  { skipResources = false, overrideConfig = {}, hashFunc }: MergeOptions = {},
): InstanceType<T> {
  if (!engines || engines.length < 2) {
    throw new Error('merging engines requires at least two engines');
  }

  for (const engine of engines) {
    if (engine.config.enableCompression !== engines[0].config.enableCompression) {
      throw new Error(
        `compression of all merged engines must match with the first one: "${engines[0].config.enableCompression}" but got: "${engine.config.enableCompression}"`,
      );
    }

    if (engine.config.debug === true) {
      throw new Error(
        'merging engines with binaryMerge method is not allowed with debug mode strictly!',
      );
    }
  }

  if (overrideConfig.debug === true || overrideConfig.enableCompression === true) {
    throw new Error(
      `the resulting engine cannot have debug or compression when merging engines with binaryMerge method!`,
    );
  }

  const metadata = mergeMetadata(engines);
  const lists = mergeLists(engines);
  const preprocessors = mergePreprocessors(engines);

  const config = new Config({ ...engines[0].config, ...overrideConfig });
  const engine = new this({
    config,
    lists,
  }) as InstanceType<T>;

  engine.preprocessors = new PreprocessorBucket({ preprocessors });

  engine.importants = mergeNetworkFilterBucket(
    engines.map((source) => source.importants),
    config,
    hashFunc,
  );
  engine.redirects = mergeNetworkFilterBucket(
    engines.map((source) => source.redirects),
    config,
    hashFunc,
  );
  engine.removeparams = mergeNetworkFilterBucket(
    engines.map((source) => source.removeparams),
    config,
    hashFunc,
  );
  engine.filters = mergeNetworkFilterBucket(
    engines.map((source) => source.filters),
    config,
    hashFunc,
  );
  engine.exceptions = mergeNetworkFilterBucket(
    engines.map((source) => source.exceptions),
    config,
    hashFunc,
  );

  engine.csp = mergeNetworkFilterBucket(
    engines.map((source) => source.csp),
    config,
    hashFunc,
  );
  engine.cosmetics = mergeCosmeticFilterBucket(
    engines.map((source) => source.cosmetics),
    config,
    hashFunc,
  );
  engine.hideExceptions = mergeNetworkFilterBucket(
    engines.map((source) => source.hideExceptions),
    config,
    hashFunc,
  );

  engine.htmlFilters = mergeHTMLBucket(
    engines.map((source) => source.htmlFilters),
    config,
    hashFunc,
  );

  if (hasMetadata(metadata)) {
    engine.metadata = new Metadata(metadata);
  }

  if (skipResources !== true) {
    for (const engine of engines.slice(1)) {
      if (engine.resources.checksum !== engines[0].resources.checksum) {
        throw new Error(
          `resource checksum of all merged engines must match with the first one: "${engines[0].resources.checksum}" but got: "${engine.resources.checksum}"`,
        );
      }
    }
    engine.resources = Resources.copy(engines[0].resources);
  }

  return engine;
}
