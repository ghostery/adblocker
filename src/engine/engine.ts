import StaticDataView from '../data-view';
import CosmeticFilter from '../filters/cosmetic';
import NetworkFilter from '../filters/network';
import Request, { RequestType } from '../request';
import Resources from '../resources';

import Lists from '../lists';
import CosmeticFilterBucket from './bucket/cosmetic';
import NetworkFilterBucket from './bucket/network';

import { createStylesheet } from '../content/injection';

export const ENGINE_VERSION = 16;

// Polyfill for `btoa`
function btoaPolyfill(buffer: string): string {
  if (typeof btoa !== 'undefined') {
    return btoa(buffer);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer).toString('base64');
  }
  return buffer;
}

interface IOptions {
  debug: boolean;
  enableOptimizations: boolean;
  loadCosmeticFilters: boolean;
  loadNetworkFilters: boolean;
}

export default class FilterEngine {
  public static parse(filters: string, options: Partial<IOptions> = {}): FilterEngine {
    const engine = new FilterEngine(options);
    engine.onUpdateFilters([{ filters, checksum: '', asset: '<anonymous>' }]);
    return engine;
  }

  public static deserialize(serialized: Uint8Array): FilterEngine {
    const buffer = new StaticDataView(0, serialized);

    // Before starting deserialization, we make sure that the version of the
    // serialized engine is the same as the current source code. If not, we start
    // fresh and create a new engine from the lists.
    const serializedEngineVersion = buffer.getUint8();
    if (ENGINE_VERSION !== serializedEngineVersion) {
      throw new Error('serialized engine version mismatch');
    }

    // Create a new engine with same options
    const engine = new FilterEngine({
      debug: false,
      enableOptimizations: Boolean(buffer.getUint8()),
      loadCosmeticFilters: Boolean(buffer.getUint8()),
      loadNetworkFilters: Boolean(buffer.getUint8()),
    });

    // Deserialize resources
    engine.resources = Resources.deserialize(buffer);

    // Deserialize lists + filters
    engine.lists = Lists.deserialize(buffer);

    // Deserialize buckets
    engine.filters = NetworkFilterBucket.deserialize(buffer);
    engine.exceptions = NetworkFilterBucket.deserialize(buffer);
    engine.importants = NetworkFilterBucket.deserialize(buffer);
    engine.redirects = NetworkFilterBucket.deserialize(buffer);
    engine.csp = NetworkFilterBucket.deserialize(buffer);
    engine.cosmetics = CosmeticFilterBucket.deserialize(buffer);

    return engine;
  }

  public lists: Lists;

  public csp: NetworkFilterBucket;
  public exceptions: NetworkFilterBucket;
  public importants: NetworkFilterBucket;
  public redirects: NetworkFilterBucket;
  public filters: NetworkFilterBucket;
  public cosmetics: CosmeticFilterBucket;

  public resources: Resources;

  public readonly loadCosmeticFilters: boolean;
  public readonly loadNetworkFilters: boolean;
  public readonly enableOptimizations: boolean;
  public readonly debug: boolean;

  constructor({
    enableOptimizations = true,
    loadCosmeticFilters = true,
    loadNetworkFilters = true,
    debug = false,
  }: Partial<IOptions> = {}) {
    // Options
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadNetworkFilters = loadNetworkFilters;
    this.enableOptimizations = enableOptimizations;
    this.debug = debug;

    this.lists = new Lists();

    // $csp=
    this.csp = new NetworkFilterBucket(undefined, false);
    // @@filter
    this.exceptions = new NetworkFilterBucket();
    // $important
    this.importants = new NetworkFilterBucket();
    // $redirect
    this.redirects = new NetworkFilterBucket();
    // All other filters
    this.filters = new NetworkFilterBucket();
    // Cosmetic filters
    this.cosmetics = new CosmeticFilterBucket();

    // Injections
    this.resources = new Resources();
  }

  /**
   * Creates a binary representation of the full engine. It can be stored
   * on-disk for faster loading of the adblocker. The `deserialize` static
   * method of Engine can be used to restore the engine.
   */
  public serialize(): Uint8Array {
    // Create a big buffer! It should always be bigger than the serialized
    // engine since `StaticDataView` will neither resize it nor detect overflows
    // (for efficiency purposes).
    const buffer = new StaticDataView(8000000);

    buffer.pushUint8(ENGINE_VERSION);
    buffer.pushUint8(Number(this.enableOptimizations));
    buffer.pushUint8(Number(this.loadCosmeticFilters));
    buffer.pushUint8(Number(this.loadNetworkFilters));

    // Resources (js, resources)
    this.resources.serialize(buffer);

    // Lists
    this.lists.serialize(buffer);

    // Network Filters Buckets
    this.filters.serialize(buffer);
    this.exceptions.serialize(buffer);
    this.importants.serialize(buffer);
    this.redirects.serialize(buffer);
    this.csp.serialize(buffer);

    // Cosmecit Filters Bucket
    this.cosmetics.serialize(buffer);

    return buffer.crop();
  }

  public hasList(asset: string, checksum: string): boolean {
    return this.lists.has(asset, checksum);
  }

  public onUpdateResource(data: string, checksum: string): void {
    if (checksum !== this.resources.checksum) {
      this.resources = Resources.parse(data, { checksum });
    }
  }

  public onUpdateFilters(
    lists: Array<{ filters: string; checksum: string; asset: string }>,
    loadedAssets: Set<string> = new Set(),
  ): boolean {
    const updated = this.lists.update({
      debug: this.debug,
      lists,
      loadCosmeticFilters: this.loadCosmeticFilters,
      loadNetworkFilters: this.loadNetworkFilters,
      loadedAssets,
    });

    if (updated) {
      // Re-create all buckets
      this.filters = new NetworkFilterBucket(
        (cb: (f: NetworkFilter) => void) => this.lists.iterNetworkFilters(cb, (l) => l.filters),
        this.enableOptimizations,
      );
      this.csp = new NetworkFilterBucket(
        (cb: (f: NetworkFilter) => void) => this.lists.iterNetworkFilters(cb, (l) => l.csp),
        false, // Disable optimizations
      );
      this.exceptions = new NetworkFilterBucket(
        (cb: (f: NetworkFilter) => void) => this.lists.iterNetworkFilters(cb, (l) => l.exceptions),
        this.enableOptimizations,
      );
      this.importants = new NetworkFilterBucket(
        (cb: (f: NetworkFilter) => void) => this.lists.iterNetworkFilters(cb, (l) => l.importants),
        this.enableOptimizations,
      );
      this.redirects = new NetworkFilterBucket(
        (cb: (f: NetworkFilter) => void) => this.lists.iterNetworkFilters(cb, (l) => l.redirects),
        this.enableOptimizations,
      );

      this.cosmetics = new CosmeticFilterBucket((cb: (f: CosmeticFilter) => void) =>
        this.lists.iterCosmeticFilters(cb),
      );
    }

    return updated;
  }

  public getCosmeticsFilters(hostname: string, domain: string | null | undefined) {
    const selectorsPerStyle: Map<string, string[]> = new Map();
    const scripts: string[] = [];
    const blockedScripts: string[] = [];

    if (this.loadCosmeticFilters) {
      const rules = this.cosmetics.getCosmeticsFilters(hostname, domain || '', (id) =>
        this.lists.getCosmeticFilter(id),
      );
      for (let i = 0; i < rules.length; i += 1) {
        const rule: CosmeticFilter = rules[i];

        if (rule.isScriptBlock()) {
          blockedScripts.push(rule.getSelector());
        } else if (rule.isScriptInject()) {
          const script = rule.getScript(this.resources.js);
          if (script !== undefined) {
            scripts.push(script);
          }
        } else {
          const style = rule.getStyle();
          const selectors = selectorsPerStyle.get(style);
          if (selectors === undefined) {
            selectorsPerStyle.set(style, [rule.getSelector()]);
          } else {
            selectors.push(rule.getSelector());
          }
        }
      }
    }

    const stylesheets: string[] = [];
    selectorsPerStyle.forEach((selectors, style) => {
      stylesheets.push(createStylesheet(selectors, style));
    });

    return {
      active: this.loadCosmeticFilters,
      blockedScripts,
      scripts,
      styles: stylesheets.join('\n\n'),
    };
  }

  public matchAll(request: Request): Set<NetworkFilter> {
    const filters: NetworkFilter[] = [];
    const getFilter = (id: number) => this.lists.getNetworkFilter(id);
    if (request.isSupported) {
      filters.push(...this.importants.matchAll(request, getFilter));
      filters.push(...this.filters.matchAll(request, getFilter));
      filters.push(...this.exceptions.matchAll(request, getFilter));
      filters.push(...this.csp.matchAll(request, getFilter));
      filters.push(...this.redirects.matchAll(request, getFilter));
    }

    return new Set(filters);
  }

  public getCSPDirectives(request: Request): string | undefined {
    if (!this.loadNetworkFilters) {
      return undefined;
    }

    if (request.isSupported !== true || request.type !== RequestType.document) {
      return undefined;
    }

    const matches = this.csp.matchAll(request, (id) => this.lists.getNetworkFilter(id));

    // Collect all CSP directives and keep track of exceptions
    const disabledCsp = new Set();
    const enabledCsp = new Set();
    for (let i = 0; i < matches.length; i += 1) {
      const filter = matches[i];
      if (filter.isException()) {
        if (filter.csp === undefined) {
          // All CSP directives are disabled for this site
          return undefined;
        }
        disabledCsp.add(filter.csp);
      } else {
        enabledCsp.add(filter.csp);
      }
    }

    // Combine all CSPs (except the black-listed ones)
    return [...enabledCsp].filter((csp) => !disabledCsp.has(csp)).join('; ') || undefined;
  }

  public match(
    request: Request,
  ): {
    match: boolean;
    redirect?: string;
    exception?: NetworkFilter;
    filter?: NetworkFilter;
  } {
    if (!this.loadNetworkFilters) {
      return { match: false };
    }

    let filter: NetworkFilter | undefined;
    let exception: NetworkFilter | undefined;
    let redirect: string | undefined;

    if (request.isSupported) {
      const getFilter = (id: number) => this.lists.getNetworkFilter(id);

      // Check the filters in the following order:
      // 1. $important (not subject to exceptions)
      // 2. redirection ($redirect=resource)
      // 3. normal filters
      // 4. exceptions
      filter = this.importants.match(request, getFilter);

      if (filter === undefined) {
        // Check if there is a redirect or a normal match
        filter = this.redirects.match(request, getFilter);
        if (filter === undefined) {
          filter = this.filters.match(request, getFilter);
        }

        // If we found something, check for exceptions
        if (filter !== undefined) {
          // Set `bug` of request
          if (filter.hasBug()) {
            request.bug = filter.bug;
          }

          exception = this.exceptions.match(request, getFilter);
        }
      }

      // If there is a match
      if (filter !== undefined) {
        if (filter.isRedirect()) {
          const redirectResource = this.resources.getResource(filter.getRedirect());
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
