import { parse } from 'tldjs';
import { matchCosmeticFilter, matchNetworkFilter } from './filters-matching';
import networkFiltersOptimizer from './optimizer';
import { CosmeticFilter } from './parsing/cosmetic-filter';
import { parseJSResource, parseList } from './parsing/list';
import { NetworkFilter } from './parsing/network-filter';
import ReverseIndex from './reverse-index';
import { serializeEngine } from './serialization';
import { fastHash, fastStartsWith, tokenize } from './utils';

interface IRawRequest {
  url: string;
  sourceUrl: string;
  cpt: number;
}

interface IRequest {
  url: string;
  tokens: number[];
  hostGD: string;
  hostname: string;

  sourceUrl: string;
  sourceGD: string;
  sourceHostname: string;

  cpt: number;
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

function collectAllFilters(lists): {
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

/**
 * Accelerating data structure for network filters matching. Makes use of the
 * reverse index structure defined above.
 */
export class NetworkFilterBucket {
  public name: string;
  public index: ReverseIndex<NetworkFilter>;

  constructor(name, filters: NetworkFilter[] = []) {
    this.name = name;
    this.index = new ReverseIndex(filters, (filter) => filter.getTokens(), {
      optimizer: networkFiltersOptimizer,
    });
  }

  get size() {
    return this.index.size;
  }

  public report() {
    return this.index.report();
  }

  public optimizeAheadOfTime() {
    this.index.optimizeAheadOfTime();
  }

  public match(request): NetworkFilter | null {
    let match = null;

    const checkMatch = (filter) => {
      if (matchNetworkFilter(filter, request)) {
        match = filter;
        return false; // Break iteration
      }

      return true; // Continue iterating on buckets
    };

    this.index.iterMatchingFilters(request.tokens, checkMatch);
    return match;
  }
}

export class CosmeticFilterBucket {
  public hostnameIndex: ReverseIndex<CosmeticFilter>;
  public selectorIndex: ReverseIndex<CosmeticFilter>;

  constructor(filters: CosmeticFilter[] = []) {
    // This accelerating data structure is used to retrieve cosmetic filters for
    // a given hostname. We only store filters having at least one hostname
    // specified and we index each filter several time (one time per hostname).
    this.hostnameIndex = new ReverseIndex(
      (filters || []).filter((f) => f.hasHostnames()),
      (filter) => {
        const multiTokens: number[][] = [];
        filter.hostnames.split(',').forEach((h) => {
          multiTokens.push(tokenize(h));
        });
        return multiTokens;
      },
      { multiKeys: true },
    );

    // Store cosmetic filters dispatched using their selector. This will allow a
    // fast look-up when we need to get a set of rules to inject in a window,
    // based on some node information.
    this.selectorIndex = new ReverseIndex(
      (filters || []).filter((f) => !(f.isScriptBlock() || f.isScriptInject())),
      (filter) => filter.getTokensSelector(),
      {},
    );
  }

  get size() {
    return this.hostnameIndex.size + this.selectorIndex.size;
  }

  public createContentScriptResponse(
    rules,
  ): {
    active: boolean;
    blockedScripts: string[];
    scripts: string[];
    styles: string[];
  } {
    const styles: string[] = [];
    const scripts: string[] = [];
    const blockedScripts: string[] = [];

    for (let i = 0; i < rules.length; i += 1) {
      const rule: CosmeticFilter = rules[i];
      const selector: string = rule.getSelector();

      if (rule.isScriptBlock()) {
        blockedScripts.push(selector);
      } else if (rule.isScriptInject()) {
        scripts.push(selector);
      } else {
        styles.push(selector);
      }
    }

    return {
      active: true,
      blockedScripts,
      scripts,
      styles,
    };
  }

  public getDomainRules(
    hostname: string,
    js: Map<string, string>,
  ): CosmeticFilter[] {
    // Collect matching rules
    const rules: Array<{ rule: CosmeticFilter; hostname: string }> = [];
    const checkMatch = (rule) => {
      const result = matchCosmeticFilter(rule, hostname);
      if (result !== null) {
        // Update script injection rule
        if (rule.isScriptInject()) {
          const ruleWithScript = new CosmeticFilter(rule);
          let scriptName = rule.getSelector();
          let scriptArguments: string[] = [];
          if (scriptName.indexOf(',') !== -1) {
            const parts = scriptName.split(',');
            scriptName = parts[0];
            scriptArguments = parts.slice(1).map((s) => s.trim());
          }

          let script = js.get(scriptName);
          if (script !== undefined) {
            for (let i = 0; i < scriptArguments.length; i += 1) {
              script = script.replace(`{{${++i}}}`, scriptArguments[i]);
            }

            ruleWithScript.selector = script;
            rules.push({
              hostname: result.hostname,
              rule: ruleWithScript,
            });
          } // TODO - else throw an exception?
        } else {
          rules.push({
            hostname: result.hostname,
            rule,
          });
        }
      }

      return true;
    };

    this.hostnameIndex.iterMatchingFilters(tokenize(hostname), checkMatch);

    return this.filterExceptions(rules);
  }

  public getMatchingRules(
    hostname: string,
    nodeInfo: string[][],
  ): CosmeticFilter[] {
    // Collect all selectors
    const tokens = new Set();
    for (let i = 0; i < nodeInfo.length; i += 1) {
      const node = nodeInfo[i];
      // For each attribute of the node: [id, tagName, className] = node
      for (let j = 0; j < node.length; j += 1) {
        tokens.add(fastHash(node[j]));
      }
    }

    // Collect matching rules
    const rules: Array<{ hostname: string; rule: CosmeticFilter }> = [];
    const checkMatch = (rule) => {
      const result = matchCosmeticFilter(rule, hostname);
      if (result !== null) {
        rules.push({
          hostname: result.hostname,
          rule,
        });
      }

      return true;
    };

    this.selectorIndex.iterMatchingFilters([...tokens], checkMatch);

    return this.filterExceptions(rules);
  }

  private filterExceptions(
    matches: Array<{ rule: CosmeticFilter; hostname: string }>,
  ): CosmeticFilter[] {
    const matchingRules = new Map();

    for (let i = 0; i < matches.length; i += 1) {
      const { rule, hostname } = matches[i];
      const selector = rule.getSelector();
      const isException = fastStartsWith(hostname, '~');
      if (matchingRules.has(selector)) {
        const otherRule = matchingRules.get(selector);

        if (
          rule.isUnhide() ||
          isException ||
          hostname.length > otherRule.hostname.length
        ) {
          // Take the longest hostname
          matchingRules.set(selector, {
            hostname,
            isException,
            rule,
          });
        }
      } else {
        // Add rule
        matchingRules.set(selector, {
          hostname,
          isException,
          rule,
        });
      }
    }

    const rules: CosmeticFilter[] = [];
    matchingRules.forEach(({ rule, isException }) => {
      if (!isException && !rule.isUnhide()) {
        rules.push(rule);
      }
    });

    return rules;
  }
}

export function processRawRequest(request: IRawRequest): IRequest {
  // Extract hostname
  const url = request.url.toLowerCase();
  const { hostname, domain } = parse(url);

  // Process source url
  let sourceUrl = request.sourceUrl;
  let sourceHostname = '';
  let sourceGD = '';

  if (sourceUrl) {
    // It can happen when source is not a valid URL, then we simply
    // leave `sourceHostname` and `sourceGD` as empty strings to allow
    // some filter matching on the request URL itself.
    sourceUrl = sourceUrl.toLowerCase();
    const sourceUrlParts = parse(sourceUrl);
    sourceHostname = sourceUrlParts.hostname || '';
    sourceGD = sourceUrlParts.domain || '';
  }

  // Wrap informations needed to match the request
  return {
    cpt: request.cpt,
    tokens: tokenize(url),

    // SourceUrl
    sourceGD,
    sourceHostname,
    sourceUrl,

    // Url
    hostGD: domain,
    hostname,
    url,
  };
}

export interface IList {
  checksum: string;
  cosmetics: CosmeticFilter[];
  exceptions: NetworkFilter[];
  filters: NetworkFilter[];
  importants: NetworkFilter[];
  redirects: NetworkFilter[];
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

  constructor(options) {
    const {
      loadCosmeticFilters,
      loadNetworkFilters,
      optimizeAOT,
      version,
    } = options;

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
      this.filters.optimizeAheadOfTime();
      this.exceptions.optimizeAheadOfTime();
      this.importants.optimizeAheadOfTime();
      this.redirects.optimizeAheadOfTime();
      // Cosmetic bucket does not expose any optimization yet.
      // this.cosmetics.optimizeAheadOfTime();
    }

    return serialized;
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
    filter?: NetworkFilter,
  } {
    if (!this.loadNetworkFilters) {
      return { match: false };
    }

    // Transforms { url, sourceUrl, cpt } into a more complete request context
    // containing domains, general domains and tokens for this request. This
    // context will be used during the matching in the engine.
    const request: IRequest = processRawRequest(rawRequest);

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
            dataUrl = `data:${contentType};base64,${btoa(data)}`;
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
