/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { IMessageFromBackground } from '@ghostery/adblocker-content';
import { URLSearchParams } from '@ghostery/url-parser';

import Config from '../config.js';
import { StaticDataView, sizeOfASCII, sizeOfByte, sizeOfBool } from '../data-view.js';
import { EventEmitter } from '../events.js';
import {
  adsAndTrackingLists,
  adsLists,
  Fetch,
  fetchLists,
  fetchResources,
  fullLists,
} from '../fetch.js';
import { HTMLSelector } from '../html-filtering.js';
import CosmeticFilter, { normalizeSelector } from '../filters/cosmetic.js';
import NetworkFilter from '../filters/network.js';
import { block } from '../filters/dsl.js';
import { FilterType, IListDiff, IPartialRawDiff, parseFilters } from '../lists.js';
import Request from '../request.js';
import Resources from '../resources.js';
import CosmeticFilterBucket from './bucket/cosmetic.js';
import NetworkFilterBucket from './bucket/network.js';
import HTMLBucket from './bucket/html.js';
import { Metadata, IPatternLookupResult } from './metadata.js';
import Preprocessor, { Env } from '../preprocessor.js';
import PreprocessorBucket from './bucket/preprocessor.js';
import IFilter from '../filters/interface.js';
import { ICategory } from './metadata/categories.js';
import { IOrganization } from './metadata/organizations.js';
import { IPattern } from './metadata/patterns.js';

export const ENGINE_VERSION = 783;

function shouldApplyHideException(filters: NetworkFilter[]): boolean {
  if (filters.length === 0) {
    return false;
  }

  // Get $Xhide filter with highest priority:
  // $Xhide,important > $Xhide > @@$Xhide
  let genericHideFilter: NetworkFilter | undefined;
  let currentScore = 0;
  for (const filter of filters) {
    // To encode priority between filters, we create a bitmask with the following:
    // $important,Xhide = 100 (takes precedence)
    // $Xhide           = 010 (exception to @@$Xhide)
    // @@$Xhide         = 001 (forbids Xhide filters)
    const score: number = (filter.isImportant() ? 4 : 0) | (filter.isException() ? 1 : 2);

    // Highest `score` has precedence
    if (score >= currentScore) {
      currentScore = score;
      genericHideFilter = filter;
    }
  }

  if (genericHideFilter === undefined) {
    return false;
  }

  // Check that there is at least one $generichide match and no exception
  return genericHideFilter.isException();
}

export interface BlockingResponse {
  match: boolean;
  redirect:
    | undefined
    | {
        filename: string;
        body: string;
        contentType: string;
        dataUrl: string;
      };
  rewrite:
    | undefined
    | {
        url: undefined | string;
      };
  exception: NetworkFilter | undefined;
  filter: NetworkFilter | undefined;
  metadata: IPatternLookupResult[] | undefined;
}

export interface Caching {
  path: string;
  read: (path: string) => Promise<Uint8Array>;
  write: (path: string, buffer: Uint8Array) => Promise<void>;
}

type NetworkFilterMatchingContext = {
  request: Request;
  filterType: FilterType.NETWORK;
};

type CosmeticFilterMatchingContext =
  | {
      url: string;
      callerContext: any; // Additional context given from user
      filterType: FilterType.COSMETIC;
    }
  | {
      request: Request; // For HTML Filters
      filterType: FilterType.COSMETIC;
    };

type NetworkFilterMatchEvent = (request: Request, result: BlockingResponse) => void;

export type EngineEventHandlers = {
  'request-allowed': NetworkFilterMatchEvent;
  'request-blocked': NetworkFilterMatchEvent;
  'request-redirected': NetworkFilterMatchEvent;
  'request-whitelisted': NetworkFilterMatchEvent;
  'csp-injected': (request: Request, csps: string) => void;
  'html-filtered': (htmlSelectors: HTMLSelector[], url: string) => void;
  'script-injected': (script: string, url: string) => void;
  'style-injected': (style: string, url: string) => void;
  'filter-matched': (
    match: {
      filter?: CosmeticFilter | NetworkFilter | undefined;
      exception?: CosmeticFilter | NetworkFilter | undefined;
    },
    context: CosmeticFilterMatchingContext | NetworkFilterMatchingContext,
  ) => any;
};

export default class FilterEngine extends EventEmitter<EngineEventHandlers> {
  private static fromCached<T extends typeof FilterEngine>(
    this: T,
    init: () => Promise<InstanceType<T>>,
    caching?: Caching,
  ): Promise<InstanceType<T>> {
    if (caching === undefined) {
      return init();
    }

    const { path, read, write } = caching;
    return read(path)
      .then((buffer) => this.deserialize(buffer) as InstanceType<T>)
      .catch(() => init().then((engine) => write(path, engine.serialize()).then(() => engine)));
  }

  public static empty<T extends FilterEngine>(
    this: new (...args: any[]) => T,
    config: Partial<Config> = {},
  ): T {
    return new this({ config });
  }

  /**
   * Create an instance of `FiltersEngine` (or subclass like `ElectronBlocker`,
   * etc.), from the list of subscriptions provided as argument (e.g.:
   * EasyList).
   *
   * Lists are fetched using the instance of `fetch` provided as a first
   * argument. Optionally resources.txt and config can be provided.
   */
  public static fromLists<T extends typeof FilterEngine>(
    this: T,
    fetch: Fetch,
    urls: string[],
    config: Partial<Config> = {},
    caching?: Caching,
  ): Promise<InstanceType<T>> {
    return this.fromCached(() => {
      const listsPromises = fetchLists(fetch, urls);
      const resourcesPromise = fetchResources(fetch);

      return Promise.all([listsPromises, resourcesPromise]).then(([lists, resources]) => {
        const engine = this.parse(lists.join('\n'), config);
        if (resources !== undefined) {
          engine.updateResources(resources, '' + resources.length);
        }

        return engine as InstanceType<T>;
      });
    }, caching);
  }

  /**
   * Initialize blocker of *ads only*.
   *
   * Attempt to initialize a blocking engine using a pre-built version served
   * from Ghostery's CDN. If this fails (e.g.: if no pre-built engine is available
   * for this version of the library), then falls-back to using `fromLists(...)`
   * method with the same subscriptions.
   */
  public static fromPrebuiltAdsOnly<T extends typeof FilterEngine>(
    this: T,
    fetchImpl: Fetch = fetch,
    caching?: Caching,
  ): Promise<InstanceType<T>> {
    return this.fromLists(fetchImpl, adsLists, {}, caching);
  }

  /**
   * Same as `fromPrebuiltAdsOnly(...)` but also contains rules to block
   * tracking (i.e.: using extra lists such as EasyPrivacy and more).
   */
  public static fromPrebuiltAdsAndTracking<T extends typeof FilterEngine>(
    this: T,
    fetchImpl: Fetch = fetch,
    caching?: Caching,
  ): Promise<InstanceType<T>> {
    return this.fromLists(fetchImpl, adsAndTrackingLists, {}, caching);
  }

  /**
   * Same as `fromPrebuiltAdsAndTracking(...)` but also contains annoyances
   * rules to block things like cookie notices.
   */
  public static fromPrebuiltFull<T extends typeof FilterEngine>(
    this: T,
    fetchImpl: Fetch = fetch,
    caching?: Caching,
  ): Promise<InstanceType<T>> {
    return this.fromLists(fetchImpl, fullLists, {}, caching);
  }

  public static fromTrackerDB<T extends typeof FilterEngine>(
    this: T,
    rawJsonDump: any,
    options: Partial<Config> = {},
  ): InstanceType<T> {
    const config = new Config(options);
    const metadata = new Metadata(rawJsonDump);
    const filters: string[] = [];

    for (const pattern of metadata.getPatterns()) {
      filters.push(...pattern.filters);
    }

    const engine = this.parse(filters.join('\n'), config);
    engine.metadata = metadata;

    return engine as InstanceType<T>;
  }

  /**
   * Merges compatible engines into one.
   *
   * This action references objects from the source engines, including
   * network filters, cosmetic filters, preprocessors, metadata, and lists.
   * These objects are not deep-copied, so modifying them directly can have
   * unintended side effects.
   * However, resources are deep-copied from the first engine.
   *
   * Optionally, you can specify a second parameter to skip merging specific resources.
   * If resource merging is skipped, the resulting engine will be assigned empty resources.
   */
  public static merge<T extends typeof FilterEngine>(
    this: T,
    engines: InstanceType<T>[],
    {
      skipResources = false,
      overrideConfig = {},
    }: {
      skipResources?: boolean;
      overrideConfig?: Partial<Config>;
    } = {},
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

    const lists = new Map();

    const networkFilters: Map<number, NetworkFilter> = new Map();
    const cosmeticFilters: Map<number, CosmeticFilter> = new Map();
    const preprocessors: Preprocessor[] = [];

    const metadata: {
      organizations: Record<string, IOrganization>;
      categories: Record<string, ICategory>;
      patterns: Record<string, IPattern>;
    } = {
      organizations: {},
      categories: {},
      patterns: {},
    };

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

    const engine = new this({
      networkFilters: Array.from(networkFilters.values()),
      cosmeticFilters: Array.from(cosmeticFilters.values()),
      preprocessors,

      lists,
      config: new Config({ ...engines[0].config, ...overrideConfig }),
    }) as InstanceType<T>;

    if (
      Object.keys(metadata.categories).length +
        Object.keys(metadata.organizations).length +
        Object.keys(metadata.patterns).length !==
      0
    ) {
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

  public static parse<T extends FilterEngine>(
    this: new (...args: any[]) => T,
    filters: string,
    options: Partial<Config> = {},
  ): T {
    const config = new Config(options);
    return new this({
      ...parseFilters(filters, config),
      config,
    });
  }

  public static deserialize<T extends FilterEngine>(
    this: new (...args: any[]) => T,
    serialized: Uint8Array,
  ): T {
    const buffer = StaticDataView.fromUint8Array(serialized, {
      enableCompression: false,
    });

    // Before starting deserialization, we make sure that the version of the
    // serialized engine is the same as the current source code. If not, we
    // start fresh and create a new engine from the lists.
    const serializedEngineVersion = buffer.getUint16();
    if (ENGINE_VERSION !== serializedEngineVersion) {
      throw new Error(
        `serialized engine version mismatch, expected ${ENGINE_VERSION} but got ${serializedEngineVersion}`,
      );
    }

    // Create a new engine with same options
    const config = Config.deserialize(buffer);

    // Optionally turn compression ON
    if (config.enableCompression) {
      buffer.enableCompression();
    }

    // Also make sure that the built-in checksum is correct. This allows to
    // detect data corruption and start fresh if the serialized version was
    // altered.
    if (config.integrityCheck) {
      const currentPos = buffer.pos;
      buffer.pos = serialized.length - 4;
      const checksum = buffer.checksum();
      const expected = buffer.getUint32();
      if (checksum !== expected) {
        throw new Error(
          `serialized engine checksum mismatch, expected ${expected} but got ${checksum}`,
        );
      }
      buffer.pos = currentPos;
    }

    const engine = new this({ config });

    // Deserialize resources
    engine.resources = Resources.deserialize(buffer);

    // Deserialize lists
    const lists = new Map();
    const numberOfLists = buffer.getUint16();
    for (let i = 0; i < numberOfLists; i += 1) {
      lists.set(buffer.getASCII(), buffer.getASCII());
    }
    engine.lists = lists;

    // Deserialize preprocessors
    engine.preprocessors = PreprocessorBucket.deserialize(buffer);

    // Deserialize buckets
    engine.importants = NetworkFilterBucket.deserialize(buffer, config);
    engine.redirects = NetworkFilterBucket.deserialize(buffer, config);
    engine.removeparams = NetworkFilterBucket.deserialize(buffer, config);
    engine.filters = NetworkFilterBucket.deserialize(buffer, config);
    engine.exceptions = NetworkFilterBucket.deserialize(buffer, config);

    engine.csp = NetworkFilterBucket.deserialize(buffer, config);
    engine.cosmetics = CosmeticFilterBucket.deserialize(buffer, config);
    engine.hideExceptions = NetworkFilterBucket.deserialize(buffer, config);

    engine.htmlFilters = HTMLBucket.deserialize(buffer, config);

    // Optionally deserialize metadata
    const hasMetadata = buffer.getBool();
    if (hasMetadata) {
      engine.metadata = Metadata.deserialize(buffer);
    }

    buffer.seekZero();

    return engine;
  }

  public lists: Map<string, string>;

  public preprocessors: PreprocessorBucket;

  public csp: NetworkFilterBucket;
  public hideExceptions: NetworkFilterBucket;
  public exceptions: NetworkFilterBucket;
  public importants: NetworkFilterBucket;
  public redirects: NetworkFilterBucket;
  public removeparams: NetworkFilterBucket;
  public filters: NetworkFilterBucket;
  public cosmetics: CosmeticFilterBucket;
  public htmlFilters: HTMLBucket;

  public metadata: Metadata | undefined;
  public resources: Resources;
  public readonly config: Config;

  constructor({
    // Optionally initialize the engine with filters
    cosmeticFilters = [],
    networkFilters = [],
    preprocessors = [],

    config = new Config(),
    lists = new Map(),
  }: {
    cosmeticFilters?: CosmeticFilter[];
    networkFilters?: NetworkFilter[];
    preprocessors?: Preprocessor[];
    lists?: Map<string, string>;
    config?: Partial<Config>;
  } = {}) {
    super(); // init super-class EventEmitter

    this.config = new Config(config);

    // Subscription management: disabled by default
    this.lists = lists;

    // Preprocessors
    this.preprocessors = new PreprocessorBucket({});

    // $csp=
    this.csp = new NetworkFilterBucket({ config: this.config });
    // $elemhide
    // $generichide
    // $specifichide
    this.hideExceptions = new NetworkFilterBucket({ config: this.config });
    // @@filter
    this.exceptions = new NetworkFilterBucket({ config: this.config });
    // $important
    this.importants = new NetworkFilterBucket({ config: this.config });
    // $redirect
    this.redirects = new NetworkFilterBucket({ config: this.config });
    // $removeparam
    this.removeparams = new NetworkFilterBucket({ config: this.config });
    // All other filters
    this.filters = new NetworkFilterBucket({ config: this.config });
    // Cosmetic filters
    this.cosmetics = new CosmeticFilterBucket({ config: this.config });
    // HTML filters
    this.htmlFilters = new HTMLBucket({ config: this.config });

    // Injections
    this.resources = new Resources();

    if (networkFilters.length !== 0 || cosmeticFilters.length !== 0) {
      this.update({
        newCosmeticFilters: cosmeticFilters,
        newNetworkFilters: networkFilters,
        newPreprocessors: preprocessors,
      });
    }
  }

  private isFilterExcluded(filter: IFilter): boolean {
    return this.preprocessors.isFilterExcluded(filter);
  }

  public updateEnv(env: Env) {
    this.preprocessors.updateEnv(env);
  }

  /**
   * Estimate the number of bytes needed to serialize this instance of
   * `FiltersEngine` using the `serialize(...)` method. It is used internally
   * by `serialize(...)` to allocate a buffer of the right size and you should
   * not have to call it yourself most of the time.
   *
   * There are cases where we cannot estimate statically the exact size of the
   * resulting buffer (due to alignement which needs to be performed); this
   * method will return a safe estimate which will always be at least equal to
   * the real number of bytes needed, or bigger (usually of a few bytes only:
   * ~20 bytes is to be expected).
   */
  public getSerializedSize(): number {
    let estimatedSize: number =
      sizeOfByte() + // engine version
      this.config.getSerializedSize() +
      this.resources.getSerializedSize() +
      this.preprocessors.getSerializedSize() +
      this.filters.getSerializedSize() +
      this.exceptions.getSerializedSize() +
      this.importants.getSerializedSize() +
      this.redirects.getSerializedSize() +
      this.removeparams.getSerializedSize() +
      this.csp.getSerializedSize() +
      this.cosmetics.getSerializedSize() +
      this.hideExceptions.getSerializedSize() +
      this.htmlFilters.getSerializedSize() +
      4; // checksum

    // Estimate size of `this.lists` which stores information of checksum for each list.
    for (const [name, checksum] of this.lists) {
      estimatedSize += sizeOfASCII(name) + sizeOfASCII(checksum);
    }

    estimatedSize += sizeOfBool();
    if (this.metadata !== undefined) {
      estimatedSize += this.metadata.getSerializedSize();
    }

    return estimatedSize;
  }

  /**
   * Creates a binary representation of the full engine. It can be stored
   * on-disk for faster loading of the adblocker. The `deserialize` static
   * method of Engine can be used to restore the engine.
   */
  public serialize(array?: Uint8Array): Uint8Array {
    const buffer = StaticDataView.fromUint8Array(
      array || new Uint8Array(this.getSerializedSize()),
      this.config,
    );

    buffer.pushUint16(ENGINE_VERSION);

    // Config
    this.config.serialize(buffer);

    // Resources (js, resources)
    this.resources.serialize(buffer);

    // Serialize the state of lists (names and checksums)
    buffer.pushUint16(this.lists.size);
    for (const [name, value] of Array.from(this.lists.entries()).sort()) {
      buffer.pushASCII(name);
      buffer.pushASCII(value);
    }

    // Preprocessors
    this.preprocessors.serialize(buffer);

    // Filters buckets
    this.importants.serialize(buffer);
    this.redirects.serialize(buffer);
    this.removeparams.serialize(buffer);
    this.filters.serialize(buffer);
    this.exceptions.serialize(buffer);

    this.csp.serialize(buffer);
    this.cosmetics.serialize(buffer);
    this.hideExceptions.serialize(buffer);
    this.htmlFilters.serialize(buffer);

    // Optionally serialize metadata
    buffer.pushBool(this.metadata !== undefined);
    if (this.metadata !== undefined) {
      this.metadata.serialize(buffer);
    }

    // Optionally append a checksum at the end
    if (this.config.integrityCheck) {
      buffer.pushUint32(buffer.checksum());
    }

    return buffer.subarray();
  }

  /**
   * Update engine with new filters or resources.
   */
  public loadedLists(): string[] {
    return Array.from(this.lists.keys());
  }

  public hasList(name: string, checksum: string): boolean {
    return this.lists.has(name) && this.lists.get(name) === checksum;
  }

  /**
   * Update engine with `resources.txt` content.
   */
  public updateResources(data: string, checksum: string): boolean {
    if (this.resources.checksum === checksum) {
      return false;
    }

    this.resources = Resources.parse(data, { checksum });
    return true;
  }

  public getFilters(): { networkFilters: NetworkFilter[]; cosmeticFilters: CosmeticFilter[] } {
    const cosmeticFilters: CosmeticFilter[] = this.cosmetics.getFilters();
    const networkFilters: NetworkFilter[] = [
      ...this.filters.getFilters(),
      ...this.exceptions.getFilters(),
      ...this.importants.getFilters(),
      ...this.redirects.getFilters(),
      ...this.csp.getFilters(),
      ...this.hideExceptions.getFilters(),
    ];

    for (const filter of this.htmlFilters.getFilters()) {
      if (filter.isNetworkFilter()) {
        networkFilters.push(filter);
      } else if (filter.isCosmeticFilter()) {
        cosmeticFilters.push(filter);
      }
    }

    return {
      cosmeticFilters,
      networkFilters,
    };
  }

  /**
   * Update engine with new filters as well as optionally removed filters.
   */
  public update(
    {
      newNetworkFilters = [],
      newCosmeticFilters = [],
      newPreprocessors = [],
      removedCosmeticFilters = [],
      removedNetworkFilters = [],
      removedPreprocessors = [],
    }: Partial<IListDiff>,
    env: Env = new Env(),
  ): boolean {
    let updated: boolean = false;

    // Update preprocessors
    if (
      this.config.loadPreprocessors &&
      (newPreprocessors.length !== 0 || removedPreprocessors.length !== 0)
    ) {
      updated = true;
      this.preprocessors.update(
        {
          added: newPreprocessors,
          removed: removedPreprocessors,
        },
        env,
      );
    }

    const htmlFilters: (CosmeticFilter | NetworkFilter)[] = [];

    // Update cosmetic filters
    if (
      this.config.loadCosmeticFilters &&
      (newCosmeticFilters.length !== 0 || removedCosmeticFilters.length !== 0)
    ) {
      updated = true;
      const cosmeticFitlers: CosmeticFilter[] = [];

      for (const filter of newCosmeticFilters) {
        if (filter.isHtmlFiltering()) {
          htmlFilters.push(filter);
        } else {
          cosmeticFitlers.push(filter);
        }
      }

      this.cosmetics.update(
        cosmeticFitlers,
        removedCosmeticFilters.length === 0 ? undefined : new Set(removedCosmeticFilters),
        this.config,
      );
    }

    // Update network filters
    if (
      this.config.loadNetworkFilters &&
      (newNetworkFilters.length !== 0 || removedNetworkFilters.length !== 0)
    ) {
      updated = true;
      const filters: NetworkFilter[] = [];
      const csp: NetworkFilter[] = [];
      const exceptions: NetworkFilter[] = [];
      const importants: NetworkFilter[] = [];
      const redirects: NetworkFilter[] = [];
      const removeparams: NetworkFilter[] = [];
      const hideExceptions: NetworkFilter[] = [];

      for (const filter of newNetworkFilters) {
        // NOTE: it's important to check for $generichide, $elemhide,
        // $specifichide and $csp before exceptions and important as we store
        // all of them in the same filter bucket. The check for exceptions is
        // done at match-time directly.
        if (filter.isCSP()) {
          csp.push(filter);
        } else if (filter.isHtmlFilteringRule()) {
          htmlFilters.push(filter);
        } else if (filter.isGenericHide() || filter.isSpecificHide()) {
          hideExceptions.push(filter);
        } else if (filter.isException()) {
          if (filter.isRemoveParam()) {
            removeparams.push(filter);
          } else {
            exceptions.push(filter);
          }
        } else if (filter.isImportant()) {
          importants.push(filter);
        } else if (filter.isRedirect()) {
          redirects.push(filter);
        } else if (filter.isRemoveParam()) {
          removeparams.push(filter);
        } else {
          filters.push(filter);
        }
      }

      const removedNetworkFiltersSet: Set<number> | undefined =
        removedNetworkFilters.length === 0 ? undefined : new Set(removedNetworkFilters);

      // Update buckets in-place
      this.importants.update(importants, removedNetworkFiltersSet);
      this.redirects.update(redirects, removedNetworkFiltersSet);
      this.removeparams.update(removeparams, removedNetworkFiltersSet);
      this.filters.update(filters, removedNetworkFiltersSet);

      if (this.config.loadExceptionFilters === true) {
        this.exceptions.update(exceptions, removedNetworkFiltersSet);
      }

      if (this.config.loadCSPFilters === true) {
        this.csp.update(csp, removedNetworkFiltersSet);
      }

      this.hideExceptions.update(hideExceptions, removedNetworkFiltersSet);
    }

    if (
      this.config.enableHtmlFiltering &&
      (htmlFilters.length !== 0 ||
        removedNetworkFilters.length !== 0 ||
        removedCosmeticFilters.length !== 0)
    ) {
      const removeFilters = new Set([...removedNetworkFilters, ...removedCosmeticFilters]);
      this.htmlFilters.update(htmlFilters, removeFilters);
    }

    return updated;
  }

  public updateFromDiff({ added, removed, preprocessors }: IPartialRawDiff, env?: Env): boolean {
    const newCosmeticFilters: CosmeticFilter[] = [];
    const newNetworkFilters: NetworkFilter[] = [];
    const newPreprocessors: Preprocessor[] = [];
    const removedCosmeticFilters: CosmeticFilter[] = [];
    const removedNetworkFilters: NetworkFilter[] = [];
    const removedPreprocessors: Preprocessor[] = [];

    if (removed !== undefined && removed.length !== 0) {
      const { networkFilters, cosmeticFilters } = parseFilters(removed.join('\n'), this.config);
      Array.prototype.push.apply(removedCosmeticFilters, cosmeticFilters);
      Array.prototype.push.apply(removedNetworkFilters, networkFilters);
    }

    if (added !== undefined && added.length !== 0) {
      const { networkFilters, cosmeticFilters } = parseFilters(added.join('\n'), this.config);
      Array.prototype.push.apply(newCosmeticFilters, cosmeticFilters);
      Array.prototype.push.apply(newNetworkFilters, networkFilters);
    }

    if (preprocessors !== undefined) {
      for (const [condition, details] of Object.entries(preprocessors)) {
        if (details.removed !== undefined && details.removed.length !== 0) {
          const { networkFilters, cosmeticFilters } = parseFilters(
            details.removed.join('\n'),
            this.config,
          );
          const filterIDs = new Set<number>(
            ([] as number[])
              .concat(cosmeticFilters.map((filter) => filter.getId()))
              .concat(networkFilters.map((filter) => filter.getId())),
          );

          removedPreprocessors.push(
            new Preprocessor({
              condition,
              filterIDs,
            }),
          );
        }

        if (details.added !== undefined && details.added.length !== 0) {
          const { networkFilters, cosmeticFilters } = parseFilters(
            details.added.join('\n'),
            this.config,
          );
          const filterIDs = new Set<number>(
            ([] as number[])
              .concat(cosmeticFilters.map((filter) => filter.getId()))
              .concat(networkFilters.map((filter) => filter.getId())),
          );

          newPreprocessors.push(
            new Preprocessor({
              condition,
              filterIDs,
            }),
          );
        }
      }
    }

    return this.update(
      {
        newCosmeticFilters,
        newNetworkFilters,
        newPreprocessors,
        removedCosmeticFilters: removedCosmeticFilters.map((f) => f.getId()),
        removedNetworkFilters: removedNetworkFilters.map((f) => f.getId()),
        removedPreprocessors,
      },
      env,
    );
  }

  /**
   * Return a list of HTML filtering rules.
   */
  public getHtmlFilters(request: Request): HTMLSelector[] {
    const htmlSelectors: HTMLSelector[] = [];

    if (this.config.enableHtmlFiltering === false) {
      return htmlSelectors;
    }

    const { networkFilters, exceptions, cosmeticFilters, unhides } =
      this.htmlFilters.getHTMLFilters(request, this.isFilterExcluded.bind(this));

    if (cosmeticFilters.length !== 0) {
      const unhideMap = new Map(unhides.map((unhide) => [unhide.getSelector(), unhide]));

      for (const filter of cosmeticFilters) {
        const extended = filter.getExtendedSelector();
        if (extended === undefined) {
          continue;
        }
        const unhide = unhideMap.get(filter.getSelector());
        if (unhide === undefined) {
          htmlSelectors.push(extended);
        }
        this.emit(
          'filter-matched',
          { filter, exception: unhide },
          {
            request,
            filterType: FilterType.COSMETIC,
          },
        );
      }
    }

    if (networkFilters.length !== 0) {
      const exceptionsMap = new Map();
      let replaceDisabledException;
      for (const exception of exceptions) {
        const optionValue = exception.optionValue;
        if (optionValue === '') {
          replaceDisabledException = exception;
          break;
        }
        exceptionsMap.set(optionValue, exception);
      }

      for (const filter of networkFilters) {
        const modifier = filter.getHtmlModifier();

        if (modifier === null) {
          continue;
        }

        const exception = replaceDisabledException || exceptionsMap.get(filter.optionValue);

        this.emit(
          'filter-matched',
          { filter, exception },
          {
            request,
            filterType: FilterType.NETWORK,
          },
        );

        if (exception === undefined) {
          htmlSelectors.push(['replace', modifier]);
        }
      }
    }

    if (htmlSelectors.length !== 0) {
      this.emit('html-filtered', htmlSelectors, request.url);
    }

    return htmlSelectors;
  }

  /**
   * Given `hostname` and `domain` of a page (or frame), return the list of
   * styles and scripts to inject in the page.
   */
  public getCosmeticsFilters({
    // Page information
    url,
    hostname,
    domain,

    // DOM information
    classes,
    hrefs,
    ids,

    // Allows to specify which rules to return
    getBaseRules = true,
    getInjectionRules = true,
    getExtendedRules = true,
    getRulesFromDOM = true,
    getRulesFromHostname = true,

    hidingStyle,
    callerContext,
  }: {
    url: string;
    hostname: string;
    domain: string | null | undefined;

    classes?: string[] | undefined;
    hrefs?: string[] | undefined;
    ids?: string[] | undefined;

    getBaseRules?: boolean;
    getInjectionRules?: boolean;
    getExtendedRules?: boolean;
    getRulesFromDOM?: boolean;
    getRulesFromHostname?: boolean;

    hidingStyle?: string | undefined;
    callerContext?: any | undefined;
  }): IMessageFromBackground {
    if (this.config.loadCosmeticFilters === false) {
      return {
        active: false,
        extended: [],
        scripts: [],
        styles: '',
      };
    }

    const { matches, allowGenericHides } = this.matchCosmeticFilters({
      url,
      hostname,
      domain,
      classes,
      hrefs,
      ids,
      getRulesFromDOM,
      getRulesFromHostname,
      getInjectionRules,
      getExtendedRules,
      callerContext,
    });

    const filters = [];

    for (const { filter, exception } of matches) {
      if (exception === undefined) {
        filters.push(filter);
      }
    }

    const { extended, scripts, styles } = this.injectCosmeticFilters(filters, {
      url,
      injectScriptlets: getInjectionRules,
      injectExtended: getExtendedRules,
      allowGenericHides,
      getBaseRules,
      hidingStyle,
    });

    return {
      active: true,
      extended,
      scripts,
      styles,
    };
  }

  /**
   * Prepares cosmetic filters to be injected by compiling them to stylesheets, scripts and extented selector ASTs.
   */
  public injectCosmeticFilters(
    filters: CosmeticFilter[],
    {
      url,

      injectStyles = true,
      injectScriptlets,
      injectExtended,

      allowGenericHides = true,
      getBaseRules,
      hidingStyle,
    }: {
      url: string;

      injectStyles?: boolean;
      injectScriptlets: boolean;
      injectExtended: boolean;

      allowGenericHides?: boolean;
      hidingStyle?: string | undefined;
      getBaseRules?: boolean;
    },
  ): {
    scripts: string[];
    extended: IMessageFromBackground['extended'];
    styles: string;
  } {
    const scripts = [];
    const styleFilters = [];
    const extendedFilters = [];

    for (const filter of filters) {
      if (injectScriptlets && filter.isScriptInject()) {
        const script = filter.getScript(this.resources.getScriptlet.bind(this.resources));
        if (script !== undefined) {
          scripts.push(script);
        }
      } else if (filter.isExtended()) {
        if (injectExtended === true && this.config.loadExtendedSelectors) {
          extendedFilters.push(filter);
        }
      } else if (injectStyles === true) {
        styleFilters.push(filter);
      }
    }

    const stylesheets = this.cosmetics.getStylesheetsFromFilters(
      {
        filters: styleFilters,
        extendedFilters,
      },
      { getBaseRules, allowGenericHides, hidingStyle },
    );

    for (const script of scripts) {
      this.emit('script-injected', script, url);
    }

    if (stylesheets.stylesheet.length !== 0) {
      this.emit('style-injected', stylesheets.stylesheet, url);
    }

    return {
      extended: stylesheets.extended,
      scripts,
      styles: stylesheets.stylesheet,
    };
  }

  public matchCosmeticFilters({
    // Page information
    url,
    hostname,
    domain,

    // DOM information
    classes,
    hrefs,
    ids,

    getRulesFromDOM = true,
    getRulesFromHostname = true,
    getInjectionRules,
    getExtendedRules,

    callerContext,
  }: {
    url: string;
    hostname: string;
    domain: string | null | undefined;

    classes?: string[] | undefined;
    hrefs?: string[] | undefined;
    ids?: string[] | undefined;

    getRulesFromDOM?: boolean;
    getRulesFromHostname?: boolean;
    getInjectionRules?: boolean;
    getExtendedRules?: boolean;

    callerContext?: any | undefined;
  }): {
    matches: {
      filter: CosmeticFilter;
      exception: CosmeticFilter | undefined;
    }[];
    allowGenericHides: boolean;
  } {
    domain ||= '';

    let allowGenericHides = true;
    let allowSpecificHides = true;

    const exceptions = this.hideExceptions.matchAll(
      Request.fromRawDetails({
        domain,
        hostname,
        url,

        sourceDomain: '',
        sourceHostname: '',
        sourceUrl: '',
      }),
      this.isFilterExcluded.bind(this),
    );

    const genericHides: NetworkFilter[] = [];
    const specificHides: NetworkFilter[] = [];
    for (const filter of exceptions) {
      if (filter.isElemHide()) {
        allowGenericHides = false;
        allowSpecificHides = false;
        break;
      }

      if (filter.isSpecificHide()) {
        specificHides.push(filter);
      } else if (filter.isGenericHide()) {
        genericHides.push(filter);
      }
    }

    if (allowGenericHides === true) {
      allowGenericHides = shouldApplyHideException(genericHides) === false;
    }

    if (allowSpecificHides === true) {
      allowSpecificHides = shouldApplyHideException(specificHides) === false;
    }

    const { filters, unhides } = this.cosmetics.getCosmeticsFilters({
      domain,
      hostname,

      classes,
      hrefs,
      ids,

      allowGenericHides,
      allowSpecificHides,

      getRulesFromDOM,
      getRulesFromHostname,

      isFilterExcluded: this.isFilterExcluded.bind(this),
    });

    let injectionsDisabledFilter: CosmeticFilter | undefined = undefined;
    const unhideExceptions: Map<string, CosmeticFilter> = new Map();

    for (const unhide of unhides) {
      if (
        unhide.isScriptInject() === true &&
        unhide.isUnhide() === true &&
        unhide.getSelector().length === 0
      ) {
        injectionsDisabledFilter = unhide;
      } else {
        unhideExceptions.set(
          normalizeSelector(unhide, this.resources.getScriptletCanonicalName.bind(this.resources)),
          unhide,
        );
      }
    }

    const matches: { filter: CosmeticFilter; exception: CosmeticFilter | undefined }[] = [];

    for (const filter of filters) {
      if (filter.isExtended() && getExtendedRules === false) {
        continue;
      }

      let exception = unhideExceptions.get(
        normalizeSelector(filter, this.resources.getScriptletCanonicalName.bind(this.resources)),
      );

      if (filter.isScriptInject()) {
        if (injectionsDisabledFilter !== undefined) {
          exception = injectionsDisabledFilter;
        }
        if (getInjectionRules === false) {
          continue;
        }
      }

      matches.push({ filter, exception });

      this.emit(
        'filter-matched',
        {
          filter,
          exception,
        },
        {
          url,
          callerContext,
          filterType: FilterType.COSMETIC,
        },
      );
    }

    return {
      matches,
      allowGenericHides,
    };
  }

  /**
   * Given a `request`, return all matching network filters found in the engine.
   */
  public matchAll(request: Request): Set<NetworkFilter> {
    const filters: NetworkFilter[] = [];

    if (request.isSupported) {
      Array.prototype.push.apply(
        filters,
        this.importants.matchAll(request, this.isFilterExcluded.bind(this)),
      );
      Array.prototype.push.apply(
        filters,
        this.filters.matchAll(request, this.isFilterExcluded.bind(this)),
      );
      Array.prototype.push.apply(
        filters,
        this.exceptions.matchAll(request, this.isFilterExcluded.bind(this)),
      );
      Array.prototype.push.apply(
        filters,
        this.csp.matchAll(request, this.isFilterExcluded.bind(this)),
      );
      Array.prototype.push.apply(
        filters,
        this.hideExceptions.matchAll(request, this.isFilterExcluded.bind(this)),
      );
      Array.prototype.push.apply(
        filters,
        this.redirects.matchAll(request, this.isFilterExcluded.bind(this)),
      );
    }

    return new Set(filters);
  }

  /**
   * Given a "main_frame" request, check if some content security policies
   * should be injected in the page.
   */
  public getCSPDirectives(request: Request): string | undefined {
    if (!this.config.loadNetworkFilters) {
      return undefined;
    }

    if (request.isSupported !== true || request.isMainFrame() === false) {
      return undefined;
    }

    const matches = this.csp.matchAll(request, this.isFilterExcluded.bind(this));

    // No $csp filter found
    if (matches.length === 0) {
      return undefined;
    }

    // Collect all CSP directives and keep track of exceptions
    const cspExceptions: Map<string | undefined, NetworkFilter> = new Map();
    const cspFilters: NetworkFilter[] = [];

    for (const filter of matches) {
      if (filter.isException()) {
        if (filter.csp === undefined) {
          // All CSP directives are disabled for this site
          this.emit(
            'filter-matched',
            { exception: filter },
            { request, filterType: FilterType.NETWORK },
          );
          return undefined;
        }
        cspExceptions.set(filter.csp, filter);
      } else {
        cspFilters.push(filter);
      }
    }

    if (cspFilters.length === 0) {
      return undefined;
    }

    const enabledCsp = new Set();

    // Combine all CSPs (except the black-listed ones)
    for (const filter of cspFilters.values()) {
      const exception = cspExceptions.get(filter.csp);
      if (exception === undefined) {
        enabledCsp.add(filter.csp);
      }
      this.emit(
        'filter-matched',
        { filter, exception },
        { request, filterType: FilterType.NETWORK },
      );
    }

    const csps = Array.from(enabledCsp).join('; ');

    if (csps.length > 0) {
      this.emit('csp-injected', request, csps);
    }

    return csps;
  }

  /**
   * Decide if a network request (usually from WebRequest API) should be
   * blocked, redirected or allowed.
   */
  public match(request: Request, withMetadata: boolean | undefined = false): BlockingResponse {
    const result: BlockingResponse = {
      exception: undefined,
      filter: undefined,
      match: false,
      redirect: undefined,
      rewrite: undefined,
      metadata: undefined,
    };

    if (!this.config.loadNetworkFilters) {
      return result;
    }

    if (request.isSupported) {
      // Check the filters in the following order:
      // 1. $important (not subject to exceptions)
      // 2. redirection ($redirect=resource)
      // 3. normal filters
      // 4. exceptions
      // 5. url rewrites ($removeparam)
      result.filter = this.importants.match(request, this.isFilterExcluded.bind(this));

      let redirectNone: NetworkFilter | undefined;
      let redirectRule: NetworkFilter | undefined;

      // If `result.filter` is `undefined`, it means there was no $important
      // filter found so far. We look for a $redirect filter.  There is some
      // extra logic to handle special cases like redirect-rule and
      // redirect=none.
      //
      // * If redirect=none is found, then cancel all redirects.
      // * Else if redirect-rule is found, only redirect if request would be blocked.
      // * Else if redirect is found, redirect.
      if (result.filter === undefined) {
        const redirects = this.redirects
          .matchAll(request, this.isFilterExcluded.bind(this))
          // highest priorty wins
          .sort((a, b) => b.getRedirectPriority() - a.getRedirectPriority());

        // There is some extra logic to handle special cases like
        // redirect-rule and redirect=none.
        //
        // * If redirect=none is found, then cancel all redirects.
        // * Else if redirect-rule is found, only redirect if request would be blocked.
        // * Else if redirect is found, redirect.
        if (redirects.length !== 0) {
          for (const filter of redirects) {
            if (filter.getRedirectResource() === 'none') {
              redirectNone = filter;
            } else if (filter.isRedirectRule()) {
              if (redirectRule === undefined) {
                redirectRule = filter;
              }
            } else if (result.filter === undefined) {
              result.filter = filter;
            }
          }
        }

        // If `result.filter` is still `undefined`, it means that there was no
        // redirection rule triggered for the request. We look for a normal
        // match.
        if (result.filter === undefined) {
          result.filter = this.filters.match(request, this.isFilterExcluded.bind(this));

          // If we found a match, and a `$redirect-rule` as found previously,
          // then we transform the match into a redirect, following the
          // semantics of redirect-rule.
          if (redirectRule !== undefined && result.filter !== undefined) {
            result.filter = redirectRule;
          }
        }

        // If we found either a redirection rule or a normal match, then check
        // for exceptions which could apply on the request and un-block it.
        if (result.filter !== undefined) {
          result.exception = this.exceptions.match(request, this.isFilterExcluded.bind(this));
        }

        // If the request is allowed in any way, we match request removeparam.
        if (result.filter === undefined) {
          const searchParamSeparatorIndex = request.url.indexOf('?');
          if (
            searchParamSeparatorIndex !== -1 &&
            searchParamSeparatorIndex !== request.url.length - 1
          ) {
            const searchParamLiteral = request.url.slice(searchParamSeparatorIndex);
            const searchParams = new URLSearchParams(searchParamLiteral);
            let modified = false;

            // Handle $removeparam filters:
            // 1st priority: @@||<entity>$removeparam
            // 2nd priority: ||<entity>$removeparam
            // 3rd priority: @@||<entity>$removeparam=x
            // 4th priority: ||<entity>$removeparam=x
            const removeparamFilters: Map<string, NetworkFilter> = new Map();
            const removeparamExceptions: Map<string, NetworkFilter> = new Map();
            for (const filter of this.removeparams.matchAll(
              request,
              this.isFilterExcluded.bind(this),
            )) {
              if (filter.isException()) {
                removeparamExceptions.set(filter.removeparam!, filter);
              } else {
                removeparamFilters.set(filter.removeparam!, filter);
              }
            }
            const removeparamIgnoreFilter: NetworkFilter | undefined =
              // `result.exception` is conditionally matched only if `result.filter` is available.
              (result.filter === undefined
                ? this.exceptions.match(request, this.isFilterExcluded.bind(this))
                : result.exception) || removeparamExceptions.get('');

            for (const [key, filter] of removeparamFilters) {
              // Remove all params in case of option value is empty.
              // We will not match individual exceptions since it has a higher priority than them.
              if (key === '') {
                // In case of non-existence of global exception, we will remove all params.
                if (removeparamIgnoreFilter === undefined) {
                  // We need to collect all keys before the execution of `delete()`.
                  // Running `delete()` will inference with an iterator and its inner index.
                  for (const key of Array.from(searchParams.keys())) {
                    searchParams.delete(key);
                  }
                  modified = true;
                }
                this.emit(
                  'filter-matched',
                  { filter, exception: removeparamIgnoreFilter },
                  { request, filterType: FilterType.NETWORK },
                );
                break;
              }

              if (
                !key.startsWith('~') &&
                // Try to find `?${key}` pattern.
                searchParamLiteral.slice(1, key.length + 1) !== key &&
                !searchParamLiteral.includes(`&${key}`)
              ) {
                continue;
              }

              const exception = removeparamExceptions.get(key) ?? removeparamIgnoreFilter;
              if (exception === undefined) {
                // Handle removeparam inversions.
                if (key.startsWith('~')) {
                  const inversionKey = key.slice(1);
                  for (const param of Array.from(searchParams.keys())) {
                    if (param !== inversionKey && !removeparamExceptions.has(param)) {
                      searchParams.delete(param);
                      modified = true;
                    }
                  }
                } else {
                  searchParams.delete(key);
                  modified = true;
                }
              }
              this.emit(
                'filter-matched',
                { filter, exception },
                { request, filterType: FilterType.NETWORK },
              );
            }

            if (modified) {
              let url = request.url.slice(0, searchParamSeparatorIndex);
              if (searchParams.size > 0) {
                url += '?' + searchParams.toString();
              }

              result.rewrite = {
                url,
              };
            }
          }
        }
      }

      // If there was a redirect match and no exception was found, then we
      // proceed and process the redirect rule. This means two things:
      //
      // 1. Check if there's a removeparam exception was found, which acts as exception.
      // 2. Check if a redirect=none rule was found, which acts as exception.
      // 3. If no exception was found, prepare `result.redirect` response.
      if (
        result.filter !== undefined &&
        result.exception === undefined &&
        result.filter.isRedirect()
      ) {
        if (redirectNone !== undefined) {
          result.exception = redirectNone;
        } else {
          result.redirect = this.resources.getResource(result.filter.getRedirectResource());
        }
      }
    }

    result.match = result.exception === undefined && result.filter !== undefined;

    if (result.filter) {
      this.emit(
        'filter-matched',
        { filter: result.filter, exception: result.exception },
        { request, filterType: FilterType.NETWORK },
      );
    }

    if (result.exception !== undefined) {
      this.emit('request-whitelisted', request, result);
    } else if (result.redirect !== undefined) {
      this.emit('request-redirected', request, result);
    } else if (result.filter !== undefined) {
      this.emit('request-blocked', request, result);
    } else {
      this.emit('request-allowed', request, result);
    }

    if (withMetadata === true && result.filter !== undefined && this.metadata) {
      result.metadata = this.metadata.fromFilter(result.filter);
    }

    return result;
  }

  public getPatternMetadata(
    request: Request,
    { getDomainMetadata = false } = {},
  ): IPatternLookupResult[] {
    if (this.metadata === undefined) {
      return [];
    }

    const seenPatterns = new Set();
    const patterns: IPatternLookupResult[] = [];
    for (const filter of this.matchAll(request)) {
      for (const patternInfo of this.metadata.fromFilter(filter)) {
        if (!seenPatterns.has(patternInfo.pattern.key)) {
          seenPatterns.add(patternInfo.pattern.key);
          patterns.push(patternInfo);
        }
      }
    }

    if (getDomainMetadata) {
      for (const patternInfo of this.metadata.fromDomain(request.hostname)) {
        if (!seenPatterns.has(patternInfo.pattern.key)) {
          seenPatterns.add(patternInfo.pattern.key);
          patterns.push(patternInfo);
        }
      }
    }

    return patterns;
  }

  public blockScripts() {
    this.updateFromDiff({
      added: [block().scripts().redirectTo('javascript').toString()],
    });
    return this;
  }

  public blockImages() {
    this.updateFromDiff({
      added: [block().images().redirectTo('png').toString()],
    });
    return this;
  }

  public blockMedias() {
    this.updateFromDiff({
      added: [block().medias().redirectTo('mp4').toString()],
    });
    return this;
  }

  public blockFrames() {
    this.updateFromDiff({
      added: [block().frames().redirectTo('html').toString()],
    });
    return this;
  }

  public blockFonts() {
    this.updateFromDiff({
      added: [block().fonts().toString()],
    });
    return this;
  }

  public blockStyles() {
    this.updateFromDiff({
      added: [block().styles().toString()],
    });
    return this;
  }
}
