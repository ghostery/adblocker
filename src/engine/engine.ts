import { CosmeticFilter } from '../parsing/cosmetic-filter';
import IFilter from '../parsing/interface';
import { parseList } from '../parsing/list';
import { NetworkFilter } from '../parsing/network-filter';
import Request, { RequestType } from '../request';
import Resources from '../resources';
import { serializeEngine } from '../serialization';

import CosmeticFilterBucket from './bucket/cosmetics';
import NetworkFilterBucket from './bucket/network';
import IList from './list';

import { createStylesheet } from '../content/injection';

// Polyfill for `btoa`
function btoaPolyfill(buffer: string): string {
  if (typeof btoa !== 'undefined') {
    return btoa(buffer);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer).toString('base64');
  }
  return buffer;
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
}

export default class FilterEngine {
  public lists: Map<string, IList>;

  public csp: NetworkFilterBucket;
  public exceptions: NetworkFilterBucket;
  public importants: NetworkFilterBucket;
  public redirects: NetworkFilterBucket;
  public filters: NetworkFilterBucket;
  public cosmetics: CosmeticFilterBucket;

  public size: number;

  public resources: Resources;

  public loadCosmeticFilters: boolean;
  public loadNetworkFilters: boolean;
  public optimizeAOT: boolean;
  public enableOptimizations: boolean;

  constructor({
    enableOptimizations = true,
    loadCosmeticFilters = true,
    loadNetworkFilters = true,
    optimizeAOT = true,
  }: IOptions) {
    // Options
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadNetworkFilters = loadNetworkFilters;
    this.optimizeAOT = optimizeAOT;
    this.enableOptimizations = enableOptimizations;

    this.lists = new Map();
    this.size = 0;

    // $csp=
    this.csp = new NetworkFilterBucket('csp', undefined, false);
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
    this.resources = new Resources();
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

  public onUpdateResource(data: string, checksum: string): void {
    this.resources = Resources.fromString(data, checksum);
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
      const csp: NetworkFilter[] = [];
      const importants: NetworkFilter[] = [];
      const redirects: NetworkFilter[] = [];

      // Dispatch filters into their bucket
      for (let j = 0; j < networkFilters.length; j += 1) {
        const filter = networkFilters[j];
        if (filter.isCSP()) {
          csp.push(filter);
        } else if (filter.isException()) {
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
        csp,
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
    this.csp = new NetworkFilterBucket(
      'csp',
      (cb: (f: NetworkFilter) => void) => iterFilters(this.lists, (l) => l.csp, cb),
      false, // Disable optimizations
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
      this.cosmetics.size +
      this.csp.size +
      this.exceptions.size +
      this.filters.size +
      this.importants.size +
      this.redirects.size;

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
