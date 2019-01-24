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
    const name: string = buffer.getASCII();
    const checksum: string = buffer.getASCII();

    const debug = buffer.getBool();
    const loadCosmeticFilters = buffer.getBool();
    const loadNetworkFilters = buffer.getBool();

    const list = new List({
      debug,
      loadCosmeticFilters,
      loadNetworkFilters,
      name,
    });

    list.checksum = checksum;
    list.cosmeticFilterIds = new Set(buffer.getUint32Array());
    list.networkFilterIds = new Set(buffer.getUint32Array());

    return list;
  }

  public checksum: string;
  public readonly name: string;
  public readonly loadCosmeticFilters: boolean;
  public readonly loadNetworkFilters: boolean;
  public readonly debug: boolean;

  public networkFilterIds: Set<number>;
  public cosmeticFilterIds: Set<number>;

  constructor({
    name,
    debug = false,
    loadCosmeticFilters = true,
    loadNetworkFilters = true,
  }: {
    debug?: boolean;
    loadCosmeticFilters?: boolean;
    loadNetworkFilters?: boolean;
    name: string;
  }) {
    this.debug = debug;
    this.name = name;
    this.checksum = '';
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadNetworkFilters = loadNetworkFilters;

    // Keep track of currently loaded filters TODO - could make use of a typed
    // array to allow fast serialization/deserialization as well as less memory
    // usage (use compact set abstraction)
    this.cosmeticFilterIds = new Set();
    this.networkFilterIds = new Set();
  }

  public getNetworkFiltersIds(): number[] {
    return [...this.networkFilterIds];
  }

  public getCosmeticFiltersIds(): number[] {
    return [...this.cosmeticFilterIds];
  }

  public update(list: string, checksum: string): IListDiff {
    this.checksum = checksum;

    const newCosmeticFilters: CosmeticFilter[] = [];
    const newCosmeticFilterIds: Set<number> = new Set();

    const newNetworkFilters: NetworkFilter[] = [];
    const newNetworkFilterIds: Set<number> = new Set();

    // Parse new filters
    const { cosmeticFilters, networkFilters } = parseFilters(list, {
      debug: this.debug,
      loadCosmeticFilters: this.loadCosmeticFilters,
      loadNetworkFilters: this.loadNetworkFilters,
    });

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
      (id) => !newNetworkFilterIds.has(id),
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
    buffer.pushASCII(this.name);
    buffer.pushASCII(this.checksum);

    buffer.pushBool(this.debug);
    buffer.pushBool(this.loadCosmeticFilters);
    buffer.pushBool(this.loadNetworkFilters);

    buffer.pushUint32Array(new Uint32Array([...this.cosmeticFilterIds]));
    buffer.pushUint32Array(new Uint32Array([...this.networkFilterIds]));
  }
}

export interface IListsOptions {
  loadCosmeticFilters?: boolean;
  loadNetworkFilters?: boolean;
  debug?: boolean;
}

export default class Lists {
  public static deserialize(buffer: StaticDataView): Lists {
    const debug = buffer.getBool();
    const loadCosmeticFilters = buffer.getBool();
    const loadNetworkFilters = buffer.getBool();

    const lists = new Lists({
      debug,
      loadCosmeticFilters,
      loadNetworkFilters,
    });

    const numberOfLists = buffer.getUint16();
    for (let i = 0; i < numberOfLists; i += 1) {
      const list = List.deserialize(buffer);
      lists.lists.set(list.name, list);
    }

    return lists;
  }

  public readonly lists: Map<string, List>;
  public readonly loadNetworkFilters: boolean;
  public readonly loadCosmeticFilters: boolean;
  public readonly debug: boolean;

  constructor({
    debug = false,
    loadCosmeticFilters = true,
    loadNetworkFilters = true,
  }: IListsOptions) {
    this.lists = new Map();
    this.loadNetworkFilters = loadNetworkFilters;
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.debug = debug;
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushBool(this.debug);
    buffer.pushBool(this.loadCosmeticFilters);
    buffer.pushBool(this.loadNetworkFilters);

    buffer.pushUint16(this.lists.size);
    this.lists.forEach((list) => {
      list.serialize(buffer);
    });
  }

  public getLoaded(): string[] {
    return [...this.lists.keys()];
  }

  public has(name: string, checksum: string): boolean {
    const list: List | undefined = this.lists.get(name);
    if (list !== undefined && list.checksum === checksum) {
      return true;
    }
    return false;
  }

  public delete(names: string[]): IListDiff {
    const removedNetworkFilters: number[] = [];
    const removedCosmeticFilters: number[] = [];

    for (let i = 0; i < names.length; i += 1) {
      const name = names[i];
      const list: List | undefined = this.lists.get(name);
      if (list !== undefined) {
        removedNetworkFilters.push(...list.getNetworkFiltersIds());
        removedCosmeticFilters.push(...list.getCosmeticFiltersIds());
        this.lists.delete(name);
      }
    }

    return {
      cosmeticFilters: [],
      networkFilters: [],
      removedCosmeticFilters,
      removedNetworkFilters,
    };
  }

  public update(lists: Array<{ name: string; checksum: string; list: string }>): IListDiff {
    const networkFilters: NetworkFilter[] = [];
    const removedNetworkFilters: number[] = [];
    const cosmeticFilters: CosmeticFilter[] = [];
    const removedCosmeticFilters: number[] = [];

    for (let i = 0; i < lists.length; i += 1) {
      const { name, list, checksum } = lists[i];
      const currentList =
        this.lists.get(name) ||
        new List({
          debug: this.debug,
          loadCosmeticFilters: this.loadCosmeticFilters,
          loadNetworkFilters: this.loadNetworkFilters,
          name,
        });
      this.lists.set(name, currentList);

      // Nothing to be done
      if (currentList.checksum === checksum) {
        continue;
      }

      const diff = currentList.update(list, checksum);
      networkFilters.push(...diff.networkFilters);
      removedNetworkFilters.push(...diff.removedNetworkFilters);
      cosmeticFilters.push(...diff.cosmeticFilters);
      removedCosmeticFilters.push(...diff.removedCosmeticFilters);
    }

    return {
      cosmeticFilters,
      networkFilters,
      removedCosmeticFilters,
      removedNetworkFilters,
    };
  }
}
