import { fastStartsWith, fastStartsWithFrom } from '../utils';

import { CosmeticFilter, parseCosmeticFilter } from './cosmetic-filter';
import { NetworkFilter, parseNetworkFilter } from './network-filter';

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
    if (
      fastStartsWithFrom(line, /* #@$# */ '@$#', afterSharpIndex) ||
      fastStartsWithFrom(line, /* #@%# */ '@%#', afterSharpIndex) ||
      fastStartsWithFrom(line, /* #%# */ '%#', afterSharpIndex) ||
      fastStartsWithFrom(line, /* #$# */ '$#', afterSharpIndex)
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
    filter = parseNetworkFilter(rawFilter);
  } else if (filterType === FilterType.COSMETIC) {
    filter = parseCosmeticFilter(rawFilter);
  }

  if (filter !== null) {
    filter.rawLine = rawFilter;
  }

  return filter;
}

export function parseList(
  data: string,
  { loadNetworkFilters = true, loadCosmeticFilters = true, debug = false } = {},
): { networkFilters: NetworkFilter[]; cosmeticFilters: CosmeticFilter[] } {
  const networkFilters: NetworkFilter[] = [];
  const cosmeticFilters: CosmeticFilter[] = [];
  const lines = data.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    if (line.length > 0) {
      const filterType = detectFilterType(line);

      if (filterType === FilterType.NETWORK && loadNetworkFilters) {
        const filter = parseNetworkFilter(line);
        if (filter !== null) {
          // In debug mode, keep the original line
          if (debug === true) {
            filter.rawLine = line;
          }
          networkFilters.push(filter);
        }
      } else if (filterType === FilterType.COSMETIC && loadCosmeticFilters) {
        const filter = parseCosmeticFilter(line);
        if (filter !== null) {
          // In debug mode, keep the original line
          if (debug === true) {
            filter.rawLine = line;
          }
          cosmeticFilters.push(filter);
        }
      }
    }
  }

  return {
    cosmeticFilters,
    networkFilters,
  };
}

export function parseJSResource(data: string): Map<string, Map<string, string>> {
  const resources = new Map();
  const trimComments = (str: string) => str.replace(/^#.*$/gm, '');
  const chunks = data.split('\n\n');

  for (let i = 1; i < chunks.length; i += 1) {
    const resource = trimComments(chunks[i]).trim();
    const firstNewLine = resource.indexOf('\n');
    const [name, type] = resource.slice(0, firstNewLine).split(' ');
    const body = resource.slice(firstNewLine + 1);

    if (name === undefined || type === undefined || body === undefined) {
      continue;
    }

    if (!resources.has(type)) {
      resources.set(type, new Map());
    }
    resources.get(type).set(name, body);
  }

  return resources;
}
