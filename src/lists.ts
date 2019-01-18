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

function serializeNetworkFilters(filters: NetworkFilter[], buffer: StaticDataView): void {
  buffer.pushUint32(filters.length);
  for (let i = 0; i < filters.length; i += 1) {
    filters[i].serialize(buffer);
  }
}

function serializeCosmeticFilters(filters: CosmeticFilter[], buffer: StaticDataView): void {
  buffer.pushUint32(filters.length);
  for (let i = 0; i < filters.length; i += 1) {
    filters[i].serialize(buffer);
  }
}

function deserializeNetworkFilters(buffer: StaticDataView): NetworkFilter[] {
  const length = buffer.getUint32();
  const filters: NetworkFilter[] = [];
  for (let i = 0; i < length; i += 1) {
    filters.push(NetworkFilter.deserialize(buffer));
  }

  return filters;
}

function deserializeCosmeticFilters(buffer: StaticDataView): CosmeticFilter[] {
  const length = buffer.getUint32();
  const filters: CosmeticFilter[] = [];
  for (let i = 0; i < length; i += 1) {
    filters.push(CosmeticFilter.deserialize(buffer));
  }

  return filters;
}

export class CompactList {
  public static deserialize(buffer: StaticDataView): CompactList {
    return new CompactList({
      checksum: buffer.getASCIIStrict(),
      cosmeticFilters: buffer.crop(), // TODO
      networkFilters: buffer.crop(), // TODO
    });
  }

  public readonly checksum: string;
  private readonly cosmeticFilters: Uint8Array;
  private readonly networkFilters: Uint8Array;

  constructor({
    checksum,
    cosmeticFilters,
    networkFilters,
  }: {
    checksum: string;
    cosmeticFilters: Uint8Array;
    networkFilters: Uint8Array;
  }) {
    this.checksum = checksum;
    this.cosmeticFilters = cosmeticFilters;
    this.networkFilters = networkFilters;
  }

  /**
   * Re-create the in-memory `List` instance from `CompactList`
   */
  public toList(): List {
    const filters: NetworkFilter[] = [];
    const csp: NetworkFilter[] = [];
    const exceptions: NetworkFilter[] = [];
    const importants: NetworkFilter[] = [];
    const redirects: NetworkFilter[] = [];

    const networkFilters = deserializeNetworkFilters(
      StaticDataView.fromUint8Array(this.networkFilters),
    );
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

    return new List({
      checksum: this.checksum,
      cosmetics: deserializeCosmeticFilters(StaticDataView.fromUint8Array(this.cosmeticFilters)),
      csp,
      exceptions,
      filters,
      importants,
      redirects,
    });
  }

  public getNetworkFilter(_: number[]): NetworkFilter[] {
    return [];
  }

  public getCosmeticFilter(_: number[]): CosmeticFilter[] {
    return [];
  }
}

export class List {
  public static parse(
    list: string,
    {
      checksum = '',
      loadNetworkFilters = true,
      loadCosmeticFilters = true,
      debug = false,
    }: {
      checksum?: string;
      loadNetworkFilters?: boolean;
      loadCosmeticFilters?: boolean;
      debug?: boolean;
    } = {},
  ): List {
    const filters: NetworkFilter[] = [];
    const exceptions: NetworkFilter[] = [];
    const csp: NetworkFilter[] = [];
    const importants: NetworkFilter[] = [];
    const redirects: NetworkFilter[] = [];
    const cosmetics: CosmeticFilter[] = [];

    const lines = list.split('\n');

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i].trim();

      if (line.length > 0) {
        const filterType = detectFilterType(line);

        if (filterType === FilterType.NETWORK && loadNetworkFilters) {
          const filter = NetworkFilter.parse(line);
          if (filter !== null) {
            // In debug mode, keep the original line
            if (debug === true) {
              filter.rawLine = line;
            }

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
        } else if (filterType === FilterType.COSMETIC && loadCosmeticFilters) {
          const filter = CosmeticFilter.parse(line);
          if (filter !== null) {
            // In debug mode, keep the original line
            if (debug === true) {
              filter.rawLine = line;
            }
            cosmetics.push(filter);
          }
        }
      }
    }

    return new List({
      checksum,
      cosmetics,
      csp,
      exceptions,
      filters,
      importants,
      redirects,
    });
  }

  public readonly checksum: string;
  private readonly cosmetics: CosmeticFilter[];
  private readonly exceptions: NetworkFilter[];
  private readonly csp: NetworkFilter[];
  private readonly filters: NetworkFilter[];
  private readonly importants: NetworkFilter[];
  private readonly redirects: NetworkFilter[];

  constructor({
    checksum,
    cosmetics,
    exceptions,
    csp,
    filters,
    importants,
    redirects,
  }: {
    checksum: string;
    cosmetics: CosmeticFilter[];
    csp: NetworkFilter[];
    exceptions: NetworkFilter[];
    filters: NetworkFilter[];
    importants: NetworkFilter[];
    redirects: NetworkFilter[];
  }) {
    this.checksum = checksum;
    this.cosmetics = cosmetics;
    this.csp = csp;
    this.exceptions = exceptions;
    this.filters = filters;
    this.importants = importants;
    this.redirects = redirects;
  }

  public getNetworkFilter(id: number): NetworkFilter | undefined {
    return this.networkIds.get(id);
  }

  public getCosmeticFilter(id: number): CosmeticFilter | undefined {
    return this.cosmeticIds.get(id);
  }

  public getNetworkFilters(): NetworkFilter[] {
    return [
      ...this.getNetworkFilterExceptions(),
      ...this.getNetworkFilterCSP(),
      ...this.getNetworkFilterNormal(),
      ...this.getNetworkFilterRedirects(),
      ...this.getNetworkFilterImportants(),
    ];
  }

  public getCosmeticFilters(): CosmeticFilter[] {
    return this.cosmetics;
  }

  public getNetworkFilterNormal(): NetworkFilter[] {
    return this.filters;
  }

  public getNetworkFilterExceptions(): NetworkFilter[] {
    return this.exceptions;
  }

  public getNetworkFilterCSP(): NetworkFilter[] {
    return this.csp;
  }

  public getNetworkFilterImportants(): NetworkFilter[] {
    return this.importants;
  }

  public getNetworkFilterRedirects(): NetworkFilter[] {
    return this.redirects;
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushASCIIStrict(this.checksum);
    serializeCosmeticFilters(this.cosmetics, buffer);
    serializeNetworkFilters(this.csp, buffer);
    serializeNetworkFilters(this.exceptions, buffer);
    serializeNetworkFilters(this.filters, buffer);
    serializeNetworkFilters(this.importants, buffer);
    serializeNetworkFilters(this.redirects, buffer);
  }
}

export default class Lists {
  public static deserialize(buffer: StaticDataView): Lists {
    const lists: Map<string, CompactList> = new Map();

    const size = buffer.getUint8();
    for (let i = 0; i < size; i += 1) {
      lists.set(buffer.getASCIIStrict(), CompactList.deserialize(buffer));
    }

    return new Lists(lists);
  }

  public readonly lists: Map<string, CompactList>;
  private readonly newLists: Map<string, List>;

  constructor(lists: Map<string, CompactList> = new Map()) {
    this.lists = lists;
    this.newLists = new Map();
  }

  public has(asset: string, checksum: string): boolean {
    // Check in-memory lists
    const list = this.lists.get(asset);
    if (list !== undefined) {
      return list.checksum === checksum;
    }

    // Check compact lists
    const compactList = this.newLists.get(asset);
    if (compactList !== undefined) {
      return compactList.checksum === checksum;
    }

    return false;
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushUint8(this.lists.size);

    this.newLists.forEach((list, asset) => {
      buffer.pushASCIIStrict(asset);
      list.serialize(buffer);
    });

    // TODO - serialize CompactList (this.lists)
    // TODO - while serializing List from `this.newLists`, remove them and
    // populate CompactList from them. This way, after a call to `serialize`,
    // all lists are store in their compact form.
  }

  public iterCosmeticFilters(cb: (f: CosmeticFilter) => void): void {
    this.lists.forEach((list: CompactList) => {
      const filters = list.cosmetics;
      for (let i = 0; i < filters.length; i += 1) {
        cb(filters[i]);
      }
    });
  }

  public iterNetworkFiltersExceptions(cb: (f: NetworkFilter) => void): void {
    this.lists.forEach((list: CompactList) => {
      const filters = list.getNetworkFilterExceptions();
      for (let i = 0; i < filters.length; i += 1) {
        cb(filters[i]);
      }
    });
  }

  public iterNetworkFiltersCSP(cb: (f: NetworkFilter) => void): void {
    this.lists.forEach((list: CompactList) => {
      const filters = list.getNetworkFilterCSP();
      for (let i = 0; i < filters.length; i += 1) {
        cb(filters[i]);
      }
    });
  }

  public iterNetworkFiltersImportants(cb: (f: NetworkFilter) => void): void {
    this.lists.forEach((list: CompactList) => {
      const filters = list.getNetworkFilterImportants();
      for (let i = 0; i < filters.length; i += 1) {
        cb(filters[i]);
      }
    });
  }
  public iterNetworkFiltersRedirects(cb: (f: NetworkFilter) => void): void {
    this.lists.forEach((list: CompactList) => {
      const filters = list.getNetworkFilterRedirects();
      for (let i = 0; i < filters.length; i += 1) {
        cb(filters[i]);
      }
    });
  }
  public iterNetworkFiltersNormal(cb: (f: NetworkFilter) => void): void {
    this.lists.forEach((list: CompactList) => {
      const filters = list.getNetworkFilterNormal();
      for (let i = 0; i < filters.length; i += 1) {
        cb(filters[i]);
      }
    });
  }

  public iterNetworkFilters(cb: (f: NetworkFilter) => void): void {
    this.iterNetworkFiltersExceptions(cb);
    this.iterNetworkFiltersCSP(cb);
    this.iterNetworkFiltersImportants(cb);
    this.iterNetworkFiltersRedirects(cb);
    this.iterNetworkFiltersNormal(cb);
  }

  public update({
    lists,
    loadCosmeticFilters,
    loadNetworkFilters,
    loadedAssets = new Set(),
    debug = false,
  }: {
    lists: Array<{ filters: string; checksum: string; asset: string }>;
    loadCosmeticFilters: boolean;
    loadNetworkFilters: boolean;
    loadedAssets: Set<string>;
    debug: boolean;
  }): boolean {
    let updated: boolean = false;

    // Remove assets if needed
    this.lists.forEach((_, asset) => {
      if (!loadedAssets.has(asset)) {
        updated = true;
        this.lists.delete(asset);
      }
    });

    this.newLists.forEach((_, asset) => {
      if (!loadedAssets.has(asset)) {
        updated = true;
        this.newLists.delete(asset);
      }
    });

    // Parse all filters and update `this.lists`
    for (let i = 0; i < lists.length; i += 1) {
      const { asset, filters, checksum } = lists[i];

      if (!this.has(asset, checksum)) {
        updated = true;
        this.newLists.set(
          asset,
          List.parse(filters, {
            checksum,
            debug,
            loadCosmeticFilters,
            loadNetworkFilters,
          }),
        );
      }
    }

    return updated;
  }

  public getCosmeticFilter(id: number): CosmeticFilter | undefined {
    let filter: CosmeticFilter | undefined;

    this.lists.forEach((list) => {
      if (filter === undefined) {
        filter = list.getCosmeticFilter(id);
      }
    });

    return filter;
  }

  public getNetworkFilter(id: number): NetworkFilter | undefined {
    let filter: NetworkFilter | undefined;

    this.lists.forEach((list) => {
      if (filter === undefined) {
        filter = list.getNetworkFilter(id);
      }
    });

    return filter;
  }
}
