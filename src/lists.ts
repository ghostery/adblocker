import Config from './config';
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

export function parseFilters(
  list: string,
  config: Partial<Config> = new Config(),
): { networkFilters: NetworkFilter[]; cosmeticFilters: CosmeticFilter[] } {
  config = new Config(config);

  const networkFilters: NetworkFilter[] = [];
  const cosmeticFilters: CosmeticFilter[] = [];

  const lines = list.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    if (line.length > 0) {
      const filterType = detectFilterType(line);

      if (filterType === FilterType.NETWORK && config.loadNetworkFilters) {
        const filter = NetworkFilter.parse(line, config.debug);
        if (filter !== null) {
          networkFilters.push(filter);
        }
      } else if (filterType === FilterType.COSMETIC && config.loadCosmeticFilters) {
        const filter = CosmeticFilter.parse(line, config.debug);
        if (filter !== null) {
          if (config.loadGenericCosmeticsFilters === true || filter.isGenericHide() === false) {
            cosmeticFilters.push(filter);
          }
        }
      }
    }
  }

  return { networkFilters, cosmeticFilters };
}

export interface IListDiff {
  newNetworkFilters: NetworkFilter[];
  newCosmeticFilters: CosmeticFilter[];
  removedCosmeticFilters: number[];
  removedNetworkFilters: number[];
}
