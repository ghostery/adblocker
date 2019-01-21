import StaticDataView from '../data-view';
import CosmeticFilter from '../filters/cosmetic';
import NetworkFilter from '../filters/network';
import Request, { RequestType } from '../request';
import Resources from '../resources';

import Lists, { IListDiff, IListsOptions, parseFilters } from '../lists';
import CosmeticFilterBucket from './bucket/cosmetic';
import NetworkFilterBucket from './bucket/network';

import { createStylesheet } from '../content/injection';

export const ENGINE_VERSION = 17;

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

  public static deserialize(
    serialized: Uint8Array,
    { fetch }: { fetch?: (url: string) => Promise<string> } = {},
  ): FilterEngine {
    const buffer = StaticDataView.fromUint8Array(serialized);

    // Before starting deserialization, we make sure that the version of the
    // serialized engine is the same as the current source code. If not, we start
    // fresh and create a new engine from the lists.
    const serializedEngineVersion = buffer.getUint8();
    if (ENGINE_VERSION !== serializedEngineVersion) {
      throw new Error('serialized engine version mismatch');
    }

    const subscriptionsEnabled = buffer.getBool();
    if (subscriptionsEnabled && fetch === undefined) {
      throw new Error(
        'Could not serialize Engine with subscriptions enabled without specifying an implementation for fetch',
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

    // Deserialize subscription lists
    if (subscriptionsEnabled && fetch !== undefined) {
      engine.lists = Lists.deserialize(buffer, { fetch });
    }

    // Deserialize buckets
    engine.filters = NetworkFilterBucket.deserialize(buffer);
    engine.exceptions = NetworkFilterBucket.deserialize(buffer);
    engine.importants = NetworkFilterBucket.deserialize(buffer);
    engine.redirects = NetworkFilterBucket.deserialize(buffer);
    engine.csp = NetworkFilterBucket.deserialize(buffer);
    engine.cosmetics = CosmeticFilterBucket.deserialize(buffer);

    return engine;
  }

  public lists: Lists | undefined;

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
    this.lists = undefined;

    // $csp=
    this.csp = new NetworkFilterBucket({ enableOptimizations: false });
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

    if (networkFilters.length !== 0 || cosmeticFilters.length !== 0) {
      this.update({
        cosmeticFilters,
        networkFilters,
        removedCosmeticFilters: [],
        removedNetworkFilters: [],
      });
    }
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

    buffer.pushBool(this.lists !== undefined); // subscriptions enabled?
    buffer.pushBool(this.enableOptimizations);
    buffer.pushBool(this.enableUpdates);
    buffer.pushBool(this.loadCosmeticFilters);
    buffer.pushBool(this.loadNetworkFilters);

    // Resources (js, resources)
    this.resources.serialize(buffer);

    // Subscription management
    if (this.lists !== undefined) {
      this.lists.serialize(buffer);
    }

    // Filters buckets
    this.filters.serialize(buffer);
    this.exceptions.serialize(buffer);
    this.importants.serialize(buffer);
    this.redirects.serialize(buffer);
    this.csp.serialize(buffer);
    this.cosmetics.serialize(buffer);

    return buffer.crop();
  }

  /**
   * Lists management. Deal with subscribed lists.
   */
  public enabledSubscriptions(options: IListsOptions): void {
    this.lists = new Lists({
      ...options,
      loadCosmeticFilters: this.loadCosmeticFilters,
      loadNetworkFilters: this.loadNetworkFilters,
    });
  }

  public updateSubscriptions(_: string): Promise<void> {
    if (this.lists === undefined) {
      return Promise.reject(new Error('Subscriptions not enabled on engine'));
    }

    return this.lists
      .updateSubscriptions()
      .then(
        ({
          cosmeticFilters,
          networkFilters,
          removedCosmeticFilters,
          removedNetworkFilters,
          resources,
          resourcesChecksum,
        }) => {
          if (resources !== undefined && resourcesChecksum !== undefined) {
            this.updateResource(resources, resourcesChecksum);
          }

          if (
            cosmeticFilters.length !== 0 ||
            networkFilters.length !== 0 ||
            removedNetworkFilters.length !== 0 ||
            removedCosmeticFilters.length !== 0
          ) {
            this.update({
              cosmeticFilters,
              networkFilters,
              removedCosmeticFilters,
              removedNetworkFilters,
            });
          }
        },
      );
  }

  /**
   * Update engine with new filters or resources.
   */

  /**
   * Update engine with `resources.txt` content.
   */
  public updateResource(data: string, checksum: string): void {
    if (this.enableUpdates === false) {
      return;
    }

    this.resources = Resources.parse(data, { checksum });
  }

  /**
   * Update engine with new filters as well as optionally removed filters.
   */
  public update({
    networkFilters = [],
    cosmeticFilters = [],
    removedCosmeticFilters = [],
    removedNetworkFilters = [],
  }: IListDiff): void {
    const filters: NetworkFilter[] = [];
    const csp: NetworkFilter[] = [];
    const exceptions: NetworkFilter[] = [];
    const importants: NetworkFilter[] = [];
    const redirects: NetworkFilter[] = [];

    for (let i = 0; i < networkFilters.length; i += 1) {
      const filter = networkFilters[i];
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

    // Update buckets in-place
    this.filters.update(filters, removedNetworkFilters);
    this.csp.update(csp, removedNetworkFilters);
    this.exceptions.update(exceptions, removedNetworkFilters);
    this.importants.update(importants, removedNetworkFilters);
    this.redirects.update(redirects, removedNetworkFilters);

    this.cosmetics.update(cosmeticFilters, removedCosmeticFilters);
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
