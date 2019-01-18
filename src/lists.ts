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

export class List {
  public static deserialize(buffer: StaticDataView): List {
    return new List({
      checksum: buffer.getASCIIStrict(),
      cosmetics: deserializeCosmeticFilters(buffer),
      csp: deserializeNetworkFilters(buffer),
      exceptions: deserializeNetworkFilters(buffer),
      filters: deserializeNetworkFilters(buffer),
      importants: deserializeNetworkFilters(buffer),
      redirects: deserializeNetworkFilters(buffer),
    });
  }

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
  public readonly cosmetics: CosmeticFilter[];
  public readonly exceptions: NetworkFilter[];
  public readonly csp: NetworkFilter[];
  public readonly filters: NetworkFilter[];
  public readonly importants: NetworkFilter[];
  public readonly redirects: NetworkFilter[];

  private readonly networkIds: Map<number, NetworkFilter>;
  private readonly cosmeticIds: Map<number, CosmeticFilter>;

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
    this.exceptions = exceptions;
    this.csp = csp;
    this.filters = filters;
    this.importants = importants;
    this.redirects = redirects;

    this.cosmeticIds = new Map();
    this.networkIds = new Map();
    this.initIdsMappings();
  }

  public getNetworkFilters(): NetworkFilter[] {
    return [
      ...this.exceptions,
      ...this.csp,
      ...this.filters,
      ...this.importants,
      ...this.redirects,
    ];
  }

  public getNetworkFilter(id: number): NetworkFilter | undefined {
    return this.networkIds.get(id);
  }

  public getCosmeticFilters(): CosmeticFilter[] {
    return this.cosmetics;
  }

  public getCosmeticFilter(id: number): CosmeticFilter | undefined {
    return this.cosmeticIds.get(id);
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

  private initIdsMappings(): void {
    // TODO - this should be populated lazily from the serialized form
    // id mapping
    this.cosmeticIds.clear();
    this.getCosmeticFilters().forEach((filter) => {
      this.cosmeticIds.set(filter.getId(), filter);
    });

    this.networkIds.clear();
    this.getNetworkFilters().forEach((filter) => {
      this.networkIds.set(filter.getId(), filter);
    });
  }
}

export default class Lists {
  public static deserialize(buffer: StaticDataView): Lists {
    const lists = new Map();

    const size = buffer.getUint8();
    for (let i = 0; i < size; i += 1) {
      lists.set(buffer.getASCIIStrict(), List.deserialize(buffer));
    }

    return new Lists(lists);
  }

  public readonly lists: Map<string, List>;

  private readonly networkIdsCache: Map<number, NetworkFilter>;
  private readonly cosmeticIdsCache: Map<number, CosmeticFilter>;

  constructor(lists: Map<string, List> = new Map()) {
    this.lists = lists;

    this.networkIdsCache = new Map();
    this.cosmeticIdsCache = new Map();
  }

  public has(asset: string, checksum: string): boolean {
    const list = this.lists.get(asset);
    if (list !== undefined) {
      return list.checksum === checksum;
    }
    return false;
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushUint8(this.lists.size);
    this.lists.forEach((list, asset) => {
      buffer.pushASCIIStrict(asset);
      list.serialize(buffer);
    });
  }

  public iterCosmeticFilters(cb: (f: CosmeticFilter) => void): void {
    this.lists.forEach((list: List) => {
      const filters = list.cosmetics;
      for (let i = 0; i < filters.length; i += 1) {
        cb(filters[i]);
      }
    });
  }

  public iterNetworkFilters(
    cb: (f: NetworkFilter) => void,
    select: (l: List) => NetworkFilter[],
  ): void {
    this.lists.forEach((list: List) => {
      const filters = select(list);
      for (let i = 0; i < filters.length; i += 1) {
        cb(filters[i]);
      }
    });
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
    // Remove assets if needed
    this.lists.forEach((_, asset) => {
      if (!loadedAssets.has(asset)) {
        this.lists.delete(asset);
      }
    });

    // Parse all filters and update `this.lists`
    for (let i = 0; i < lists.length; i += 1) {
      const { asset, filters, checksum } = lists[i];

      if (!this.has(asset, checksum)) {
        this.lists.set(
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

    // TODO - only reset cache if a list was updated
    this.networkIdsCache.clear();
    this.cosmeticIdsCache.clear();

    // TODO - return true only if at least one list was updated
    return true;
  }

  public getCosmeticFilter(id: number): CosmeticFilter | undefined {
    let filter: CosmeticFilter | undefined = this.cosmeticIdsCache.get(id);
    if (filter !== undefined) {
      return filter;
    }

    this.lists.forEach((list) => {
      if (filter === undefined) {
        filter = list.getCosmeticFilter(id);
      }
    });

    if (filter !== undefined) {
      this.cosmeticIdsCache.set(id, filter);
      return filter;
    }

    return;
  }

  public getNetworkFilter(id: number): NetworkFilter | undefined {
    let filter: NetworkFilter | undefined = this.networkIdsCache.get(id);
    if (filter !== undefined) {
      return filter;
    }

    this.lists.forEach((list) => {
      if (filter === undefined) {
        filter = list.getNetworkFilter(id);
      }
    });

    if (filter !== undefined) {
      this.networkIdsCache.set(id, filter);
      return filter;
    }

    return;
  }
}
