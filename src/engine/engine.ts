import StaticDataView from '../data-view';
import CosmeticFilter from '../filters/cosmetic';
import NetworkFilter from '../filters/network';
import Request, { RequestType } from '../request';
import Resources from '../resources';

import Lists, { IListDiff, parseFilters } from '../lists';
import CosmeticFilterBucket from './bucket/cosmetic';
import NetworkFilterBucket from './bucket/network';

import { createStylesheet } from '../content/injection';

export const ENGINE_VERSION = 21;

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
  enableUpdates: boolean;
}

export default class FilterEngine {
  public static parse(filters: string, options: Partial<IOptions> = {}): FilterEngine {
    return new FilterEngine({
      ...parseFilters(filters, options),
      ...options,
    });
  }

  public static deserialize(serialized: Uint8Array): FilterEngine {
    const buffer = StaticDataView.fromUint8Array(serialized);

    // Before starting deserialization, we make sure that the version of the
    // serialized engine is the same as the current source code. If not, we start
    // fresh and create a new engine from the lists.
    const serializedEngineVersion = buffer.getUint8();
    if (ENGINE_VERSION !== serializedEngineVersion) {
      throw new Error(
        `serialized engine version mismatch current is ${ENGINE_VERSION} but got ${serializedEngineVersion}`,
      );
    }

    // Create a new engine with same options
    const engine = new FilterEngine({
      debug: false,
      enableOptimizations: buffer.getBool(),
      enableUpdates: buffer.getBool(),
      loadCosmeticFilters: buffer.getBool(),
      loadNetworkFilters: buffer.getBool(),
    });

    // Deserialize resources
    engine.resources = Resources.deserialize(buffer);

    // Deserialize lists
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

  public readonly debug: boolean;
  public readonly enableOptimizations: boolean;
  public readonly enableUpdates: boolean;
  public readonly loadCosmeticFilters: boolean;
  public readonly loadNetworkFilters: boolean;

  constructor({
    // Optionally initialize the engine with filters
    cosmeticFilters = [],
    networkFilters = [],

    // Options
    debug = false,
    enableOptimizations = true,
    enableUpdates = true,
    loadCosmeticFilters = true,
    loadNetworkFilters = true,
  }: {
    cosmeticFilters?: CosmeticFilter[];
    networkFilters?: NetworkFilter[];
  } & Partial<IOptions> = {}) {
    // Options
    this.debug = debug;
    this.enableOptimizations = enableOptimizations;
    this.enableUpdates = enableUpdates;
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadNetworkFilters = loadNetworkFilters;

    // Subscription management: disabled by default
    this.lists = new Lists({
      debug: this.debug,
      loadCosmeticFilters: this.loadCosmeticFilters,
      loadNetworkFilters: this.loadNetworkFilters,
    });

    // $csp=
    this.csp = new NetworkFilterBucket({ enableOptimizations: false });
    // @@filter
    this.exceptions = new NetworkFilterBucket({ enableOptimizations });
    // $important
    this.importants = new NetworkFilterBucket({ enableOptimizations });
    // $redirect
    this.redirects = new NetworkFilterBucket({ enableOptimizations });
    // All other filters
    this.filters = new NetworkFilterBucket({ enableOptimizations });
    // Cosmetic filters
    this.cosmetics = new CosmeticFilterBucket();

    // Injections
    this.resources = new Resources();

    if (networkFilters.length !== 0 || cosmeticFilters.length !== 0) {
      this.update({
        newCosmeticFilters: cosmeticFilters,
        newNetworkFilters: networkFilters,
      });
    }
  }

  /**
   * Creates a binary representation of the full engine. It can be stored
   * on-disk for faster loading of the adblocker. The `deserialize` static
   * method of Engine can be used to restore the engine.
   */
  public serialize(array?: Uint8Array): Uint8Array {
    // Create a big buffer! It should always be bigger than the serialized
    // engine since `StaticDataView` will neither resize it nor detect overflows
    // (for efficiency purposes).
    const buffer = StaticDataView.fromUint8Array(array || new Uint8Array(9000000));

    buffer.pushUint8(ENGINE_VERSION);

    buffer.pushBool(this.enableOptimizations);
    buffer.pushBool(this.enableUpdates);
    buffer.pushBool(this.loadCosmeticFilters);
    buffer.pushBool(this.loadNetworkFilters);

    // Resources (js, resources)
    this.resources.serialize(buffer);

    // Subscription management
    this.lists.serialize(buffer);

    // Filters buckets
    this.filters.serialize(buffer);
    this.exceptions.serialize(buffer);
    this.importants.serialize(buffer);
    this.redirects.serialize(buffer);
    this.csp.serialize(buffer);
    this.cosmetics.serialize(buffer);

    return buffer.slice();
  }

  /**
   * Update engine with new filters or resources.
   */

  public loadedLists(): string[] {
    return this.lists.getLoaded();
  }

  public hasList(name: string, checksum: string): boolean {
    return this.lists.has(name, checksum);
  }

  public deleteLists(names: string[]): boolean {
    return this.update(this.lists.delete(names));
  }

  public deleteList(name: string): boolean {
    return this.update(this.lists.delete([name]));
  }

  public updateLists(lists: Array<{ name: string; checksum: string; list: string }>): boolean {
    if (this.enableUpdates === false) {
      return false;
    }

    return this.update(this.lists.update(lists));
  }

  public updateList({
    name,
    checksum,
    list,
  }: {
    name: string;
    checksum: string;
    list: string;
  }): boolean {
    return this.updateLists([{ name, checksum, list }]);
  }

  /**
   * Update engine with `resources.txt` content.
   */
  public updateResources(data: string, checksum: string): boolean {
    if (this.enableUpdates === false) {
      return false;
    }

    if (this.resources.checksum === checksum) {
      return false;
    }

    this.resources = Resources.parse(data, { checksum });
    return true;
  }

  /**
   * Update engine with new filters as well as optionally removed filters.
   */
  public update({
    newNetworkFilters = [],
    newCosmeticFilters = [],
    removedCosmeticFilters = [],
    removedNetworkFilters = [],
  }: Partial<IListDiff>): boolean {
    if (this.enableUpdates === false) {
      return false;
    }

    let updated: boolean = false;

    // Update cosmetic filters
    if (
      this.loadCosmeticFilters &&
      (newCosmeticFilters.length !== 0 || removedCosmeticFilters.length !== 0)
    ) {
      updated = true;
      this.cosmetics.update(
        newCosmeticFilters,
        removedCosmeticFilters.length === 0 ? undefined : new Set(removedCosmeticFilters),
      );
    }

    // Update network filters
    if (
      this.loadNetworkFilters &&
      (newNetworkFilters.length !== 0 || removedNetworkFilters.length !== 0)
    ) {
      updated = true;
      const filters: NetworkFilter[] = [];
      const csp: NetworkFilter[] = [];
      const exceptions: NetworkFilter[] = [];
      const importants: NetworkFilter[] = [];
      const redirects: NetworkFilter[] = [];

      for (let i = 0; i < newNetworkFilters.length; i += 1) {
        const filter = newNetworkFilters[i];
        if (filter.isCSP()) {
          csp.push(filter);
        } else if (filter.isException()) {
          exceptions.push(filter);
        } else if (filter.isImportant()) {
          importants.push(filter);
        } else if (filter.isRedirect()) {
          redirects.push(filter);
        } else {
          filters.push(filter);
        }
      }

      const removedNetworkFiltersSet: Set<number> | undefined =
        removedNetworkFilters.length === 0 ? undefined : new Set(removedNetworkFilters);

      // Update buckets in-place
      this.filters.update(filters, removedNetworkFiltersSet);
      this.csp.update(csp, removedNetworkFiltersSet);
      this.exceptions.update(exceptions, removedNetworkFiltersSet);
      this.importants.update(importants, removedNetworkFiltersSet);
      this.redirects.update(redirects, removedNetworkFiltersSet);
    }

    return updated;
  }

  /**
   * Matching APIs. The following methods are used to retrieve matching filters
   * either to apply cosmetics on a page or alter network requests.
   */

  /**
   * Given `hostname` and `domain` of a page (or frame), return the list of
   * styles and scripts to inject in the page.
   */
  public getCosmeticsFilters(hostname: string, domain: string | null | undefined) {
    const selectorsPerStyle: Map<string, string[]> = new Map();
    const scripts: string[] = [];
    const blockedScripts: string[] = [];

    if (this.loadCosmeticFilters) {
      const rules = this.cosmetics.getCosmeticsFilters(hostname, domain || '');
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

  /**
   * Given a `request`, return all matching network filters found in the engine.
   */
  public matchAll(request: Request): Set<NetworkFilter> {
    const filters: NetworkFilter[] = [];
    if (request.isSupported) {
      filters.push(...this.importants.matchAll(request));
      filters.push(...this.filters.matchAll(request));
      filters.push(...this.exceptions.matchAll(request));
      filters.push(...this.csp.matchAll(request));
      filters.push(...this.redirects.matchAll(request));
    }

    return new Set(filters);
  }

  /**
   * Given a "main_frame" request, check if some content security policies
   * should be injected in the page.
   */
  public getCSPDirectives(request: Request): string | undefined {
    if (!this.loadNetworkFilters) {
      return undefined;
    }

    if (request.isSupported !== true || request.type !== RequestType.document) {
      return undefined;
    }

    const matches = this.csp.matchAll(request);

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

  /**
   * Decide if a network request (usually from WebRequest API) should be
   * blocked, redirected or allowed.
   */
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
          // Set `bug` of request
          if (filter.hasBug()) {
            request.bug = filter.bug;
          }

          exception = this.exceptions.match(request);
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
