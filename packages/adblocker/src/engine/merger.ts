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

type MergeOptions = {
  skipResources?: boolean;
  overrideConfig?: Partial<Config>;
};

type MergedMetadata = {
  organizations: Record<string, IOrganization>;
  categories: Record<string, ICategory>;
  patterns: Record<string, IPattern>;
};

function mergeMetadata<T extends typeof FilterEngine>(engines: InstanceType<T>[]): MergedMetadata {
  const metadata: MergedMetadata = {
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

function hasMetadata(metadata: MergedMetadata): boolean {
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

  const lists = new Map<string, string>();

  const networkFilters: Map<number, NetworkFilter> = new Map();
  const cosmeticFilters: Map<number, CosmeticFilter> = new Map();
  const preprocessors: Preprocessor[] = [];

  const metadata = mergeMetadata(engines);

  for (const engine of engines) {
    const filters = engine.getFilters();

    for (const networkFilter of filters.networkFilters) {
      networkFilters.set(networkFilter.getId(), networkFilter);
    }

    for (const cosmeticFilter of filters.cosmeticFilters) {
      cosmeticFilters.set(cosmeticFilter.getId(), cosmeticFilter);
    }

    for (const preprocessor of engine.preprocessors.preprocessors) {
      preprocessors.push(preprocessor);
    }

    for (const [key, value] of engine.lists) {
      if (lists.has(key)) {
        continue;
      }

      lists.set(key, value);
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
): NetworkFilterBucket {
  const bucket = new NetworkFilterBucket({ config });

  bucket.index = ReverseIndex.merge(sources.map((source) => source.index));
  bucket.badFilters = FiltersContainer.merge(sources.map((source) => source.badFilters));

  return bucket;
}

function mergeCosmeticFilterBucket(
  sources: CosmeticFilterBucket[],
  config: Config,
): CosmeticFilterBucket {
  const bucket = new CosmeticFilterBucket({ config });

  bucket.genericRules = FiltersContainer.merge(sources.map((source) => source.genericRules));
  bucket.classesIndex = ReverseIndex.merge(sources.map((source) => source.classesIndex));
  bucket.hostnameIndex = ReverseIndex.merge(sources.map((source) => source.hostnameIndex));
  bucket.hrefsIndex = ReverseIndex.merge(sources.map((source) => source.hrefsIndex));
  bucket.idsIndex = ReverseIndex.merge(sources.map((source) => source.idsIndex));
  bucket.unhideIndex = ReverseIndex.merge(sources.map((source) => source.unhideIndex));

  return bucket;
}

function mergeHTMLBucket(sources: HTMLBucket[], config: Config): HTMLBucket {
  const bucket = new HTMLBucket({ config });

  bucket.networkIndex = ReverseIndex.merge(sources.map((source) => source.networkIndex));
  bucket.exceptionsIndex = ReverseIndex.merge(sources.map((source) => source.exceptionsIndex));
  bucket.cosmeticIndex = ReverseIndex.merge(sources.map((source) => source.cosmeticIndex));
  bucket.unhideIndex = ReverseIndex.merge(sources.map((source) => source.unhideIndex));

  return bucket;
}

export function binaryMerge<T extends typeof FilterEngine>(
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

    if (engine.config.debug === true) {
      throw new Error(
        'merging engines with binaryMerge method is not allowed with debug mode strictly!',
      );
    }
  }

  const lists = new Map<string, string>();
  const preprocessors = [];

  const metadata = mergeMetadata(engines);

  for (const engine of engines) {
    for (const preprocessor of engine.preprocessors.preprocessors) {
      preprocessors.push(preprocessor);
    }

    for (const [key, value] of engine.lists) {
      if (lists.has(key)) {
        continue;
      }

      lists.set(key, value);
    }
  }

  const config = new Config({ ...engines[0].config, ...overrideConfig });
  const engine = new this({
    config,
    lists,
  }) as InstanceType<T>;

  engine.preprocessors = new PreprocessorBucket({ preprocessors });

  engine.importants = mergeNetworkFilterBucket(
    engines.map((source) => source.importants),
    config,
  );
  engine.redirects = mergeNetworkFilterBucket(
    engines.map((source) => source.redirects),
    config,
  );
  engine.removeparams = mergeNetworkFilterBucket(
    engines.map((source) => source.removeparams),
    config,
  );
  engine.filters = mergeNetworkFilterBucket(
    engines.map((source) => source.filters),
    config,
  );
  engine.exceptions = mergeNetworkFilterBucket(
    engines.map((source) => source.exceptions),
    config,
  );

  engine.csp = mergeNetworkFilterBucket(
    engines.map((source) => source.csp),
    config,
  );
  engine.cosmetics = mergeCosmeticFilterBucket(
    engines.map((source) => source.cosmetics),
    config,
  );
  engine.hideExceptions = mergeNetworkFilterBucket(
    engines.map((source) => source.hideExceptions),
    config,
  );

  engine.htmlFilters = mergeHTMLBucket(
    engines.map((source) => source.htmlFilters),
    config,
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
