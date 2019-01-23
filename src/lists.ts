import StaticDataView from './data-view';
import CosmeticFilter from './filters/cosmetic';
import NetworkFilter from './filters/network';
import { fastStartsWith, fastStartsWithFrom } from './utils';

const SPACE = /\s/;

const enum FilterType {
  NOT_SUPPORTED,
  NETWORK,
  COSMETIC,
}

/**
 * Given a single line (string), checks if this would likely be a cosmetic
 * filter, a network filter or something that is not supported. This check is
 * performed before calling a more specific parser to create an instance of
 * `NetworkFilter` or `CosmeticFilter`.
 */
function detectFilterType(line: string): FilterType {
  // Ignore comments
  if (
    line.length === 1 ||
    line.charAt(0) === '!' ||
    (line.charAt(0) === '#' && SPACE.test(line.charAt(1))) ||
    fastStartsWith(line, '[Adblock')
  ) {
    return FilterType.NOT_SUPPORTED;
  }

  if (fastStartsWith(line, '|') || fastStartsWith(line, '@@|')) {
    return FilterType.NETWORK;
  }

  // Ignore Adguard cosmetics
  // `$$`
  if (line.indexOf('$$') !== -1) {
    return FilterType.NOT_SUPPORTED;
  }

  // Check if filter is cosmetics
  const sharpIndex = line.indexOf('#');
  if (sharpIndex !== -1) {
    const afterSharpIndex = sharpIndex + 1;

    // Ignore Adguard cosmetics
    // `#$#` `#@$#`
    // `#%#` `#@%#`
    // `#?#`
    if (
      fastStartsWithFrom(line, /* #@$# */ '@$#', afterSharpIndex) ||
      fastStartsWithFrom(line, /* #@%# */ '@%#', afterSharpIndex) ||
      fastStartsWithFrom(line, /* #%# */ '%#', afterSharpIndex) ||
      fastStartsWithFrom(line, /* #$# */ '$#', afterSharpIndex) ||
      fastStartsWithFrom(line, /* #?# */ '?#', afterSharpIndex)
    ) {
      return FilterType.NOT_SUPPORTED;
    } else if (
      fastStartsWithFrom(line, /* ## */ '#', afterSharpIndex) ||
      fastStartsWithFrom(line, /* #@# */ '@#', afterSharpIndex)
    ) {
      // Parse supported cosmetic filter
      // `##` `#@#`
      return FilterType.COSMETIC;
    }
  }

  // Everything else is a network filter
  return FilterType.NETWORK;
}

export function groupFiltersByType(
  filters: Array<CosmeticFilter | NetworkFilter | null>,
): { cosmeticFilters: CosmeticFilter[]; networkFilters: NetworkFilter[] } {
  const networkFilters = [];
  const cosmeticFilters = [];

  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    if (filter !== null) {
      if (filter.isCosmeticFilter()) {
        cosmeticFilters.push(filter as CosmeticFilter);
      } else {
        networkFilters.push(filter as NetworkFilter);
      }
    }
  }

  return { networkFilters, cosmeticFilters };
}

export function f(strings: TemplateStringsArray): NetworkFilter | CosmeticFilter | null {
  const rawFilter = strings.raw[0];
  const filterType = detectFilterType(rawFilter);

  let filter: NetworkFilter | CosmeticFilter | null = null;
  if (filterType === FilterType.NETWORK) {
    filter = NetworkFilter.parse(rawFilter);
  } else if (filterType === FilterType.COSMETIC) {
    filter = CosmeticFilter.parse(rawFilter);
  }

  if (filter !== null) {
    filter.rawLine = rawFilter;
  }

  return filter;
}

export function parseFilters(
  list: string,
  {
    loadNetworkFilters = true,
    loadCosmeticFilters = true,
    debug = false,
  }: {
    loadNetworkFilters?: boolean;
    loadCosmeticFilters?: boolean;
    debug?: boolean;
  } = {},
): { networkFilters: NetworkFilter[]; cosmeticFilters: CosmeticFilter[] } {
  const networkFilters: NetworkFilter[] = [];
  const cosmeticFilters: CosmeticFilter[] = [];

  const lines = list.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    if (line.length > 0) {
      const filterType = detectFilterType(line);

      if (filterType === FilterType.NETWORK && loadNetworkFilters) {
        const filter = NetworkFilter.parse(line, debug);
        if (filter !== null) {
          networkFilters.push(filter);
        }
      } else if (filterType === FilterType.COSMETIC && loadCosmeticFilters) {
        const filter = CosmeticFilter.parse(line, debug);
        if (filter !== null) {
          cosmeticFilters.push(filter);
        }
      }
    }
  }

  return { networkFilters, cosmeticFilters };
}

export interface IListDiff {
  networkFilters: NetworkFilter[];
  cosmeticFilters: CosmeticFilter[];
  removedCosmeticFilters: number[];
  removedNetworkFilters: number[];
}

export function serializeListDiff(_: IListDiff): Uint8Array {
  const view = new StaticDataView(4000000);
  // TODO
  return view.crop();
}

export function deserializeListDiff(_: Uint8Array): IListDiff {
  // const view = StaticDataView.fromUint8Array(buffer);
  // TODO

  return {
    cosmeticFilters: [],
    networkFilters: [],
    removedCosmeticFilters: [],
    removedNetworkFilters: [],
  };
}

export class List {
  public static deserialize(buffer: StaticDataView): List {
    const checksum: string = buffer.getASCII();
    const loadCosmeticFilters: boolean = Boolean(buffer.getByte());
    const loadNetworkFilters: boolean = Boolean(buffer.getByte());
    const url: string = buffer.getASCII();

    const list = new List({
      checksum,
      loadCosmeticFilters,
      loadNetworkFilters,
      url,
    });

    list.cosmeticFilterIds = new Set(buffer.getUint32Array());
    list.networkFilterIds = new Set(buffer.getUint32Array());

    return list;
  }

  public checksum: string;
  public readonly loadCosmeticFilters: boolean;
  public readonly loadNetworkFilters: boolean;
  public readonly url: string;

  public networkFilterIds: Set<number>;
  public cosmeticFilterIds: Set<number>;

  constructor({
    checksum = '',
    loadCosmeticFilters = true,
    loadNetworkFilters = true,
    url,
  }: {
    checksum?: string;
    loadCosmeticFilters?: boolean;
    loadNetworkFilters?: boolean;
    url: string;
  }) {
    this.checksum = checksum;
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadNetworkFilters = loadNetworkFilters;
    this.url = url;

    // Keep track of currently loaded filters TODO - could make use of a typed
    // array to allow fast serialization/deserialization as well as less memory
    // usage
    this.cosmeticFilterIds = new Set();
    this.networkFilterIds = new Set();
  }

  public update(raw: string, checksum: string): IListDiff {
    // Update current checksum
    this.checksum = checksum;

    // Parse new filters
    const { cosmeticFilters, networkFilters } = parseFilters(raw, {
      loadCosmeticFilters: this.loadCosmeticFilters,
      loadNetworkFilters: this.loadNetworkFilters,
    });

    const newCosmeticFilters: CosmeticFilter[] = [];
    const newCosmeticFilterIds: Set<number> = new Set();

    const newNetworkFilters: NetworkFilter[] = [];
    const newNetworkFilterIds: Set<number> = new Set();

    for (let i = 0; i < cosmeticFilters.length; i += 1) {
      const filter = cosmeticFilters[i];
      newCosmeticFilterIds.add(filter.getId());
      if (!this.cosmeticFilterIds.has(filter.getId())) {
        newCosmeticFilters.push(filter);
      }
    }

    for (let i = 0; i < networkFilters.length; i += 1) {
      const filter = networkFilters[i];
      newNetworkFilterIds.add(filter.getId());
      if (!this.networkFilterIds.has(filter.getId())) {
        newNetworkFilters.push(filter);
      }
    }

    // Detect list of IDs which have been removed
    const removedNetworkFilters: number[] = [...this.cosmeticFilterIds].filter(
      (id) => !newCosmeticFilterIds.has(id),
    );
    const removedCosmeticFilters: number[] = [...this.cosmeticFilterIds].filter(
      (id) => !newCosmeticFilterIds.has(id),
    );

    // Update list of filter IDs
    this.cosmeticFilterIds = newCosmeticFilterIds;
    this.networkFilterIds = newNetworkFilterIds;

    return {
      cosmeticFilters: newCosmeticFilters,
      networkFilters: newNetworkFilters,
      removedCosmeticFilters,
      removedNetworkFilters,
    };
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushASCII(this.checksum);
    buffer.pushByte(Number(this.loadCosmeticFilters));
    buffer.pushByte(Number(this.loadNetworkFilters));
    buffer.pushASCII(this.url);

    buffer.pushUint32Array(new Uint32Array([...this.cosmeticFilterIds]));
    buffer.pushUint32Array(new Uint32Array([...this.networkFilterIds]));
  }
}

export type Country =
  | 'de'
  | 'germany'
  | 'es'
  | 'spain'
  | 'fr'
  | 'france'
  | 'he'
  | 'hebrew'
  | 'it'
  | 'italy'
  | 'ja'
  | 'japan'
  | 'lv'
  | 'latvia'
  | 'pl'
  | 'poland'
  | 'pt'
  | 'portugal'
  | 'ro'
  | 'romania'
  | 'sl'
  | 'slovenia'
  | 'sv'
  | 'sweden'
  | 'th'
  | 'thailand'
  | 'zh'
  | 'china';

export interface IListsOptions {
  allowedListsUrl: string;
  countryListsEnabled?: boolean;
  fetch: (url: string) => Promise<string>;
  loadCosmeticFilters?: boolean;
  loadNetworkFilters?: boolean;
  loadedCountries?: Country[];
}

/* Class responsible for loading, persisting and updating filters lists.
 */
export default class Lists {
  public static deserialize(
    buffer: StaticDataView,
    options: { fetch: (url: string) => Promise<string> },
  ): Lists {
    const allowedListsUrl = buffer.getASCII();
    const resourcesChecksum = buffer.getASCII();
    const countryListsEnabled = buffer.getBool();
    const loadNetworkFilters = buffer.getBool();
    const loadCosmeticFilters = buffer.getBool();

    const loadedCountries: Country[] = [];
    const numberOfLoadedCountries = buffer.getUint16();
    for (let i = 0; i < numberOfLoadedCountries; i += 1) {
      loadedCountries.push(buffer.getASCII() as Country);
    }

    const lists = new Lists({
      ...options,
      allowedListsUrl,
      countryListsEnabled,
      loadCosmeticFilters,
      loadNetworkFilters,
      loadedCountries,
    });

    lists.resourcesChecksum = resourcesChecksum;

    // Lists
    const numberOfLists = buffer.getUint16();
    for (let i = 0; i < numberOfLists; i += 1) {
      const list = List.deserialize(buffer);
      lists.lists.set(list.url, list);
    }

    return lists;
  }
  public readonly allowedListsUrl: string;
  public readonly countryListsEnabled: boolean;
  public readonly lists: Map<string, List>;
  public readonly loadedCountries: Set<Country>;
  public readonly loadNetworkFilters: boolean;
  public readonly loadCosmeticFilters: boolean;

  private resourcesChecksum: string;
  private readonly fetch: (url: string) => Promise<string>;

  constructor({
    allowedListsUrl,
    countryListsEnabled = false,
    fetch,
    loadCosmeticFilters = true,
    loadNetworkFilters = true,
    loadedCountries = [],
  }: IListsOptions) {
    this.allowedListsUrl = allowedListsUrl;
    this.countryListsEnabled = countryListsEnabled;
    this.lists = new Map();
    this.loadedCountries = new Set(loadedCountries);
    this.loadNetworkFilters = loadNetworkFilters;
    this.loadCosmeticFilters = loadCosmeticFilters;

    this.fetch = fetch;

    this.resourcesChecksum = '';
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushASCII(this.allowedListsUrl);
    buffer.pushASCII(this.resourcesChecksum);
    buffer.pushBool(this.countryListsEnabled);
    buffer.pushBool(this.loadNetworkFilters);
    buffer.pushBool(this.loadCosmeticFilters);

    // Loaded countries
    buffer.pushUint16(this.loadedCountries.size);
    this.loadedCountries.forEach((country) => {
      buffer.pushASCII(country);
    });

    // Lists
    buffer.pushUint16(this.lists.size);
    this.lists.forEach((list) => {
      list.serialize(buffer);
    });
  }

  /**
   * Enable the use of filters specific to the given country.
   */
  public enableCountry(country: Country): void {
    this.loadedCountries.add(country);
  }

  /**
   * Trigger updating of all remotly fetched resources. This includes:
   * - resources.txt file used for script injection and request redirections
   * - base lists (e.g.: easylist)
   * - country specific lists (e.g.: easylistgermany)
   *
   * This method will first get the latest version of the `allowed_list.json`
   * file which specifies the set of available subscriptions as well as their
   * checksums.
   *
   * It will then proceed to fetching missing or out-dated resources.
   */
  public updateSubscriptions(): Promise<
    IListDiff & {
      resources?: string;
      resourcesChecksum?: string;
    }
  > {
    const cosmeticFilters: CosmeticFilter[] = [];
    const networkFilters: NetworkFilter[] = [];
    const removedCosmeticFilters: number[] = [];
    const removedNetworkFilters: number[] = [];
    let newResources: string | undefined;
    let newResourcesChecksum: string | undefined;

    // Update allowed lists file
    return this.fetch(this.allowedListsUrl)
      .then(JSON.parse)
      .then(({ allowed_lists, country_lists, js_resources }) => {
        const promises: Array<Promise<void>> = [];

        // Update resources if needed
        const resourcesUrl = Object.keys(js_resources)[0];
        if (js_resources[resourcesUrl].checksum !== this.resourcesChecksum) {
          promises.push(
            this.fetch(resourcesUrl).then((response) => {
              newResources = response;
              this.resourcesChecksum = js_resources[resourcesUrl].checksum;
              newResourcesChecksum = this.resourcesChecksum;
            }),
          );
        }

        // Collect Urls of lists to fetch/update
        const enabledLists: Array<{ url: string; checksum: string }> = [];

        // Collect from normal lists
        Object.keys(allowed_lists).forEach((url) => {
          const { checksum } = allowed_lists[url];
          enabledLists.push({ url, checksum });
        });

        // Collect from country lists
        Object.keys(country_lists).forEach((url) => {
          const { checksum, language } = allowed_lists[url];
          if (this.loadedCountries.has(language)) {
            enabledLists.push({ url, checksum });
          }
        });

        // Fetch and update or create lists as needed
        enabledLists.forEach(({ url, checksum }) => {
          const list: List =
            this.lists.get(url) ||
            new List({
              loadCosmeticFilters: this.loadCosmeticFilters,
              loadNetworkFilters: this.loadNetworkFilters,
              url,
            });

          // Skip list as there is not available update
          if (list.checksum === checksum) {
            return;
          }

          this.lists.set(url, list);

          promises.push(
            this.fetch(url).then((listContent) => {
              const diff = list.update(listContent, checksum);
              networkFilters.push(...diff.networkFilters);
              cosmeticFilters.push(...diff.cosmeticFilters);
              removedNetworkFilters.push(...diff.removedNetworkFilters);
              removedCosmeticFilters.push(...diff.removedCosmeticFilters);
            }),
          );
        });

        return Promise.all(promises);
      })
      .then(() => ({
        cosmeticFilters,
        networkFilters,
        removedCosmeticFilters,
        removedNetworkFilters,
        resources: newResources,
        resourcesChecksum: newResourcesChecksum,
      }));
  }
}
