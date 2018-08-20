import { CosmeticFilter } from '../parsing/cosmetic-filter';
import { parseJSResource, parseList } from '../parsing/list';
import { NetworkFilter } from '../parsing/network-filter';
import { IRawRequest, processRawRequest } from '../request/raw';
import { serializeEngine } from '../serialization';

import CosmeticFilterBucket from './bucket/cosmetics';
import NetworkFilterBucket from './bucket/network';
import IList from './list';

// Polyfill for `btoa`
function btoaPolyfill(buffer: string): string {
  if (typeof btoa !== 'undefined') {
    return btoa(buffer);
  } else if (typeof Buffer !== 'undefined') {
    return new Buffer(buffer).toString('base64');
  }
  return buffer;
}

/**
 * Append all elements of `array` to the end of `target`.
 *
 * Example:
 * >>> extend([1, 2, 3], [4, 5, 6, 7])
 *  [1, 2, 3, 4, 5, 6, 7]
 */
function extend<T>(target: T[], array: T[]): T[] {
  for (let i = 0; i < array.length; i += 1) {
    target.push(array[i]);
  }
  return target;
}

function collectAllFilters(lists: Map<string, IList>): {
  filters: NetworkFilter[];
  exceptions: NetworkFilter[];
  redirects: NetworkFilter[];
  importants: NetworkFilter[];
  cosmetics: CosmeticFilter[];
} {
  const filters: NetworkFilter[] = [];
  const exceptions: NetworkFilter[] = [];
  const redirects: NetworkFilter[] = [];
  const importants: NetworkFilter[] = [];
  const cosmetics: CosmeticFilter[] = [];

  lists.forEach((list) => {
    extend(filters, list.filters);
    extend(exceptions, list.exceptions);
    extend(importants, list.importants);
    extend(redirects, list.redirects);
    extend(cosmetics, list.cosmetics);
  });

  return {
    cosmetics,
    exceptions,
    filters,
    importants,
    redirects,
  };
}

export default class FilterEngine {
  public version: number;
  public lists: Map<string, IList>;

  public exceptions: NetworkFilterBucket;
  public importants: NetworkFilterBucket;
  public redirects: NetworkFilterBucket;
  public filters: NetworkFilterBucket;
  public cosmetics: CosmeticFilterBucket;

  public resourceChecksum: string;
  public js: Map<string, string>;
  public resources: Map<string, { contentType: string; data: string }>;

  public loadCosmeticFilters: boolean;
  public loadNetworkFilters: boolean;
  public optimizeAOT: boolean;

  constructor({
    loadCosmeticFilters,
    loadNetworkFilters,
    optimizeAOT,
    version,
  }: {
    loadCosmeticFilters: boolean,
    loadNetworkFilters: boolean,
    optimizeAOT: boolean,
    version: number,
  }) {
    // Options
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadNetworkFilters = loadNetworkFilters;
    this.optimizeAOT = optimizeAOT;
    this.version = version;

    this.lists = new Map();

    // @@filter
    this.exceptions = new NetworkFilterBucket('exceptions');
    // $important
    this.importants = new NetworkFilterBucket('importants');
    // $redirect
    this.redirects = new NetworkFilterBucket('redirects');
    // All other filters
    this.filters = new NetworkFilterBucket('filters');
    // Cosmetic filters
    this.cosmetics = new CosmeticFilterBucket();

    // Injections
    this.resourceChecksum = '';
    this.js = new Map();
    this.resources = new Map();
  }

  get size() {
    return (
      this.exceptions.size +
      this.importants.size +
      this.redirects.size +
      this.cosmetics.size +
      this.filters.size
    );
  }

  public hasList(asset: string, checksum: string): boolean {
    const list = this.lists.get(asset);
    if (list !== undefined) {
      return list.checksum === checksum;
    }
    return false;
  }

  public onUpdateResource(
    updates: Array<{ filters: string; checksum: string }>,
  ): void {
    for (let i = 0; i < updates.length; i += 1) {
      const { filters, checksum } = updates[i];

      // NOTE: Here we can only handle one resource file at a time.
      this.resourceChecksum = checksum;
      const typeToResource = parseJSResource(filters);

      // the resource containing javascirpts to be injected
      const js = typeToResource.get('application/javascript');
      if (js !== undefined) {
        this.js = js;
      }

      // Create a mapping from resource name to { contentType, data }
      // used for request redirection.
      typeToResource.forEach((resources, contentType) => {
        resources.forEach((data, name) => {
          this.resources.set(name, {
            contentType,
            data,
          });
        });
      });
    }
  }

  public onUpdateFilters(
    lists: Array<{ filters: string; checksum: string; asset: string }>,
    loadedAssets: Set<string>,
    onDiskCache: boolean = false,
    debug: boolean = false,
  ): Uint8Array | null {
    let updated = false;

    // Remove assets if needed
    this.lists.forEach((_, asset) => {
      if (!loadedAssets.has(asset)) {
        this.lists.delete(asset);
        updated = true;
      }
    });

    // Mark the engine as updated, so that it will be serialized on disk
    if (lists.length > 0) {
      updated = true;
    }

    // Parse all filters and update `this.lists`
    for (let i = 0; i < lists.length; i += 1) {
      const { asset, filters, checksum } = lists[i];

      // Parse and dispatch filters depending on type
      const { cosmeticFilters, networkFilters } = parseList(filters, {
        debug,
        loadCosmeticFilters: this.loadCosmeticFilters,
        loadNetworkFilters: this.loadNetworkFilters,
      });

      // Network filters
      const miscFilters: NetworkFilter[] = [];
      const exceptions: NetworkFilter[] = [];
      const importants: NetworkFilter[] = [];
      const redirects: NetworkFilter[] = [];

      // Dispatch filters into their bucket
      for (let j = 0; j < networkFilters.length; j += 1) {
        const filter = networkFilters[j];
        if (filter.isException()) {
          exceptions.push(filter);
        } else if (filter.isImportant()) {
          importants.push(filter);
        } else if (filter.isRedirect()) {
          redirects.push(filter);
        } else {
          miscFilters.push(filter);
        }
      }

      this.lists.set(asset, {
        checksum,
        cosmetics: cosmeticFilters,
        exceptions,
        filters: miscFilters,
        importants,
        redirects,
      });
    }

    // Re-create all buckets
    const allFilters = collectAllFilters(this.lists);

    this.filters = new NetworkFilterBucket('filters', allFilters.filters);
    this.exceptions = new NetworkFilterBucket(
      'exceptions',
      allFilters.exceptions,
    );
    this.importants = new NetworkFilterBucket(
      'importants',
      allFilters.importants,
    );
    this.redirects = new NetworkFilterBucket('redirects', allFilters.redirects);
    this.cosmetics = new CosmeticFilterBucket(allFilters.cosmetics);

    // Serialize engine
    let serialized: Uint8Array | null = null;
    if (updated && onDiskCache) {
      serialized = serializeEngine(this);
    }

    // Optimize ahead of time if asked for
    if (this.optimizeAOT) {
      this.optimize();
    }

    return serialized;
  }

  public optimize() {
    this.filters.optimizeAheadOfTime();
    this.exceptions.optimizeAheadOfTime();
    this.importants.optimizeAheadOfTime();
    this.redirects.optimizeAheadOfTime();
    // Cosmetic bucket does not expose any optimization yet.
    // this.cosmetics.optimizeAheadOfTime();
  }

  public getCosmeticsFilters(hostname: string, nodes: string[][]) {
    if (!this.loadCosmeticFilters) {
      return this.cosmetics.createContentScriptResponse([]);
    }

    return this.cosmetics.createContentScriptResponse(
      this.cosmetics.getMatchingRules(hostname, nodes),
    );
  }

  public getDomainFilters(hostname: string) {
    if (!this.loadCosmeticFilters) {
      return this.cosmetics.createContentScriptResponse([]);
    }

    return this.cosmetics.createContentScriptResponse(
      this.cosmetics.getDomainRules(hostname, this.js),
    );
  }

  public match(
    rawRequest: IRawRequest,
  ): {
    match: boolean,
    redirect?: string,
    exception?: boolean,
    filter?: string,
  } {
    if (!this.loadNetworkFilters) {
      return { match: false };
    }

    // Transforms { url, sourceUrl, cpt } into a more complete request context
    // containing domains, general domains and tokens for this request. This
    // context will be used during the matching in the engine.
    const request = processRawRequest(rawRequest);

    let result: NetworkFilter | null = null;
    let exception: NetworkFilter | null = null;

    // Check the filters in the following order:
    // 1. $important (not subject to exceptions)
    // 2. redirection ($redirect=resource)
    // 3. normal filters
    // 4. exceptions
    result = this.importants.match(request);

    if (result === null) {
      // Check if there is a redirect or a normal match
      result = this.redirects.match(request);
      if (result === null) {
        result = this.filters.match(request);
      }

      // If we found something, check for exceptions
      if (result !== null) {
        exception = this.exceptions.match(request);
        if (exception !== null) {
          result = null;
        }
      }
    }

    // If there is a match
    let filter;
    if (result !== null) {
      filter = result.toString();
    } else if (exception !== null) {
      filter = exception.toString();
    }

    if (result !== null) {
      if (result.isRedirect()) {
        const redirect = this.resources.get(result.getRedirect());
        if (redirect !== undefined) {
          const { data, contentType } = redirect;
          let dataUrl;
          if (contentType.indexOf(';') !== -1) {
            dataUrl = `data:${contentType},${data}`;
          } else {
            dataUrl = `data:${contentType};base64,${btoaPolyfill(data)}`;
          }

          return {
            filter,
            match: true,
            redirect: dataUrl.trim(),
          };
        } // TODO - else, throw an exception
      }
      return {
        filter,
        match: true,
      };
    }

    return {
      exception: exception !== null,
      filter,
      match: false,
    };
  }
}
