import { CosmeticFilter } from '../parsing/cosmetic-filter';
import IFilter from '../parsing/interface';
import { parseJSResource, parseList } from '../parsing/list';
import { NetworkFilter } from '../parsing/network-filter';
import Request, { IRequestInitialization } from '../request';
import { serializeEngine } from '../serialization';

import CosmeticFilterBucket from './bucket/cosmetics';
import NetworkFilterBucket from './bucket/network';
import IList from './list';

// Polyfill for `btoa`
function btoaPolyfill(buffer: string): string {
  if (typeof btoa !== 'undefined') {
    return btoa(buffer);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer).toString('base64');
  }
  return buffer;
}

// tslint:disable-next-line variable-name
function noopIter<T extends IFilter>(_cb: (f: T) => void): void {
  // no-op
}

function iterFilters<F extends IFilter>(
  lists: Map<string, IList>,
  select: (l: IList) => F[],
  cb: (f: F) => void,
): void {
  lists.forEach((list: IList) => {
    const filters: F[] = select(list);
    for (let i = 0; i < filters.length; i += 1) {
      cb(filters[i]);
    }
  });
}

interface IOptions {
  loadCosmeticFilters: boolean;
  loadNetworkFilters: boolean;
  optimizeAOT: boolean;
  enableOptimizations: boolean;
  version: number;
}

export default class FilterEngine {
  public version: number;
  public lists: Map<string, IList>;

  public exceptions: NetworkFilterBucket;
  public importants: NetworkFilterBucket;
  public redirects: NetworkFilterBucket;
  public filters: NetworkFilterBucket;
  public cosmetics: CosmeticFilterBucket;

  public size: number;

  public resourceChecksum: string;
  public js: Map<string, string>;
  public resources: Map<string, { contentType: string; data: string }>;

  public loadCosmeticFilters: boolean;
  public loadNetworkFilters: boolean;
  public optimizeAOT: boolean;
  public enableOptimizations: boolean;

  constructor({
    enableOptimizations = true,
    loadCosmeticFilters = true,
    loadNetworkFilters = true,
    optimizeAOT = true,
    version,
  }: IOptions) {
    // Options
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadNetworkFilters = loadNetworkFilters;
    this.optimizeAOT = optimizeAOT;
    this.enableOptimizations = enableOptimizations;
    this.version = version;

    this.lists = new Map();
    this.size = 0;

    // @@filter
    this.exceptions = new NetworkFilterBucket('exceptions', noopIter);
    // $important
    this.importants = new NetworkFilterBucket('importants', noopIter);
    // $redirect
    this.redirects = new NetworkFilterBucket('redirects', noopIter);
    // All other filters
    this.filters = new NetworkFilterBucket('filters', noopIter);
    // Cosmetic filters
    this.cosmetics = new CosmeticFilterBucket(noopIter);

    // Injections
    this.resourceChecksum = '';
    this.js = new Map();
    this.resources = new Map();
  }

  public serialize(): Uint8Array {
    return serializeEngine(this);
  }

  public hasList(asset: string, checksum: string): boolean {
    const list = this.lists.get(asset);
    if (list !== undefined) {
      return list.checksum === checksum;
    }
    return false;
  }

  public onUpdateResource(updates: Array<{ filters: string; checksum: string }>): void {
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
    loadedAssets: Set<string> = new Set(),
    debug: boolean = false,
  ): void {
    // Remove assets if needed
    this.lists.forEach((_, asset) => {
      if (!loadedAssets.has(asset)) {
        this.lists.delete(asset);
      }
    });

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
    this.filters = new NetworkFilterBucket(
      'filters',
      (cb: (f: NetworkFilter) => void) => iterFilters(this.lists, (l) => l.filters, cb),
      this.enableOptimizations,
    );
    this.exceptions = new NetworkFilterBucket(
      'exceptions',
      (cb: (f: NetworkFilter) => void) => iterFilters(this.lists, (l) => l.exceptions, cb),
      this.enableOptimizations,
    );
    this.importants = new NetworkFilterBucket(
      'importants',
      (cb: (f: NetworkFilter) => void) => iterFilters(this.lists, (l) => l.importants, cb),
      this.enableOptimizations,
    );
    this.redirects = new NetworkFilterBucket(
      'redirects',
      (cb: (f: NetworkFilter) => void) => iterFilters(this.lists, (l) => l.redirects, cb),
      this.enableOptimizations,
    );

    // Eagerly collect filters in this case only
    this.cosmetics = new CosmeticFilterBucket((cb: (f: CosmeticFilter) => void) =>
      iterFilters(this.lists, (l) => l.cosmetics, cb),
    );

    // Update size
    this.size =
      this.exceptions.size +
      this.importants.size +
      this.redirects.size +
      this.cosmetics.size +
      this.filters.size;

    // Optimize ahead of time if asked for
    if (this.optimizeAOT) {
      this.optimize();
    }
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

  public matchAll(rawRequest: Partial<IRequestInitialization>): Set<NetworkFilter> {
    const request = new Request(rawRequest);

    const filters = [];
    if (request.isSupported) {
      filters.push(...this.importants.matchAll(request));
      filters.push(...this.filters.matchAll(request));
      filters.push(...this.exceptions.matchAll(request));
      filters.push(...this.redirects.matchAll(request));
    }

    return new Set(filters);
  }

  public match(
    rawRequest: Partial<IRequestInitialization>,
  ): {
    match: boolean;
    redirect?: string;
    exception?: NetworkFilter;
    filter?: NetworkFilter;
  } {
    if (!this.loadNetworkFilters) {
      return { match: false };
    }

    // Transforms { url, sourceUrl, cpt } into a more complete request context
    // containing domains, general domains and tokens for this request. This
    // context will be used during the matching in the engine.
    const request = new Request(rawRequest);

    let filter: NetworkFilter | undefined;
    let exception: NetworkFilter | undefined;
    let redirect: string | undefined;

    if (request.isSupported) {
      // Check the filters in the following order:
      // 1. $important (not subject to exceptions)
      // 2. redirection ($redirect=resource)
      // 3. normal filters
      // 4. exceptions
      filter = this.importants.match(request);

      if (filter === undefined) {
        // Check if there is a redirect or a normal match
        filter = this.redirects.match(request);
        if (filter === undefined) {
          filter = this.filters.match(request);
        }

        // If we found something, check for exceptions
        if (filter !== undefined) {
          exception = this.exceptions.match(request);
        }
      }

      // If there is a match
      if (filter !== undefined) {
        if (filter.isRedirect()) {
          const redirectResource = this.resources.get(filter.getRedirect());
          if (redirectResource !== undefined) {
            const { data, contentType } = redirectResource;
            let dataUrl;
            if (contentType.indexOf(';') !== -1) {
              dataUrl = `data:${contentType},${data}`;
            } else {
              dataUrl = `data:${contentType};base64,${btoaPolyfill(data)}`;
            }

            redirect = dataUrl.trim();
          } // TODO - else, throw an exception
        }
      }
    }

    return {
      exception,
      filter,
      match: exception === undefined && filter !== undefined,
      redirect,
    };
  }
}
