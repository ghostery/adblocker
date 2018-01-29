import {
  fastStartsWith,
  fastStartsWithFrom,
} from '../utils';

import { parseCosmeticFilter } from './cosmetic-filter';
import { parseNetworkFilter } from './network-filter';

import CosmeticFilter from '../types/cosmetics';
import NetworkFilter from '../types/filter';

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
  if (sharpIndex > -1) {
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

  if (filterType === FilterType.NETWORK) {
    return parseNetworkFilter(rawFilter);
  } else if (filterType === FilterType.COSMETIC) {
    return parseCosmeticFilter(rawFilter);
  }

  return null;
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
          networkFilters.push(filter);
          // In debug mode, keep the original line
          if (debug) {
            filter.rawLine = line;
          }
        }
      } else if (filterType === FilterType.COSMETIC && loadCosmeticFilters) {
        const filter = parseCosmeticFilter(line);
        if (filter !== null) {
          cosmeticFilters.push(filter);
          // In debug mode, keep the original line
          if (debug) {
            filter.rawLine = line;
          }
        }
      }
    }
  }

  return {
    cosmeticFilters,
    networkFilters,
  };
}

export function parseJSResource(
  data: string,
): Map<string, Map<string, string>> {
  let state: string = 'end';
  let tmpContent: string = '';
  let name: string = '';

  let type: string = '';
  const parsed: Map<string, Map<string, string>> = new Map();
  const lines: string[] = data.split('\n');

  lines.forEach(line => {
    const trimmed: string = line.trim();

    if (fastStartsWith(trimmed, '#')) {
      state = 'comment';
    } else if (!trimmed) {
      state = 'end';
    } else if (
      state !== 'content' &&
      !type &&
      trimmed.split(' ').length === 2
    ) {
      state = 'title';
    } else {
      state = 'content';
    }

    switch (state) {
      case 'end':
        if (tmpContent) {
          let map = parsed.get(type);
          if (map === undefined) {
            map = new Map();
            parsed.set(type, map);
          }

          map.set(name, tmpContent);
          tmpContent = '';
          type = '';
        }
        break;
      case 'comment':
        break;
      case 'title':
        [name, type] = trimmed.split(' ');
        break;
      case 'content':
        tmpContent += `${trimmed}\n`;
        break;
      default:
    }
  });

  if (tmpContent) {
    let map = parsed.get(type);
    if (map === undefined) {
      map = new Map();
      parsed.set(type, map);
    }

    map.set(name, tmpContent);
  }

  return parsed;
}
