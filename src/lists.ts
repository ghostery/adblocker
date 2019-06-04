/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Config from './config';
import CosmeticFilter from './filters/cosmetic';
import NetworkFilter from './filters/network';
import { fastStartsWith, fastStartsWithFrom } from './utils';

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
  // Ignore empty line
  if (line.length === 0 || line.length === 1) {
    return FilterType.NOT_SUPPORTED;
  }

  // Ignore comments
  const firstCharCode: number = line.charCodeAt(0);
  const secondCharCode: number = line.charCodeAt(1);
  if (
    firstCharCode === 33 /* '!' */ ||
    (firstCharCode === 35 /* '#' */ && secondCharCode <= 32) ||
    (firstCharCode === 91 /* '[' */ && fastStartsWith(line, '[Adblock'))
  ) {
    return FilterType.NOT_SUPPORTED;
  }

  // Fast heuristics to detect network filters
  const lastCharCode: number = line.charCodeAt(line.length - 1);
  if (
    firstCharCode === 36 /* '$' */ ||
    firstCharCode === 38 /* '&' */ ||
    firstCharCode === 42 /* '*' */ ||
    firstCharCode === 45 /* '-' */ ||
    firstCharCode === 46 /* '.' */ ||
    firstCharCode === 47 /* '/' */ ||
    firstCharCode === 58 /* ':' */ ||
    firstCharCode === 61 /* '=' */ ||
    firstCharCode === 63 /* '?' */ ||
    firstCharCode === 64 /* '@' */ ||
    firstCharCode === 95 /* '_' */ ||
    firstCharCode === 124 /* '|' */ ||
    lastCharCode === 124 /* '|' */
  ) {
    return FilterType.NETWORK;
  }

  // Ignore Adguard cosmetics
  // `$$` = HTML filtering rules
  const dollarIndex: number = line.indexOf('$');
  if (dollarIndex !== -1 && dollarIndex !== line.length - 1) {
    const afterDollarIndex = dollarIndex + 1;
    const afterDollarCharCode = line.charCodeAt(afterDollarIndex);

    // Ignore Adguard HTML rewrite rules
    if (
      afterDollarCharCode === 36 /* '$' */ ||
      (afterDollarCharCode === 64 /* '@' */ &&
        fastStartsWithFrom(line, /* $@$ */ '@$', afterDollarIndex))
    ) {
      return FilterType.NOT_SUPPORTED;
    }
  }

  // Check if filter is cosmetics
  const sharpIndex: number = line.indexOf('#');
  if (sharpIndex !== -1 && sharpIndex !== line.length - 1) {
    const afterSharpIndex = sharpIndex + 1;
    const afterSharpCharCode = line.charCodeAt(afterSharpIndex);

    if (
      afterSharpCharCode === 35 /* '#'*/ ||
      (afterSharpCharCode === 64 /* '@' */ &&
        fastStartsWithFrom(line, /* #@# */ '@#', afterSharpIndex))
    ) {
      // Parse supported cosmetic filter
      // `##` `#@#`
      return FilterType.COSMETIC;
    } else if (
      (afterSharpCharCode === 64 /* '@'*/ &&
        (fastStartsWithFrom(line, /* #@$# */ '@$#', afterSharpIndex) ||
          fastStartsWithFrom(line, /* #@%# */ '@%#', afterSharpIndex))) ||
      (afterSharpCharCode === 37 /* '%' */ &&
        fastStartsWithFrom(line, /* #%# */ '%#', afterSharpIndex)) ||
      (afterSharpCharCode === 36 /* '$' */ &&
        fastStartsWithFrom(line, /* #$# */ '$#', afterSharpIndex)) ||
      (afterSharpCharCode === 63 /* '?' */ &&
        fastStartsWithFrom(line, /* #?# */ '?#', afterSharpIndex))
    ) {
      // Ignore Adguard cosmetics
      // `#$#` `#@$#`
      // `#%#` `#@%#`
      // `#?#`
      return FilterType.NOT_SUPPORTED;
    }
  }

  // Everything else is a network filter
  return FilterType.NETWORK;
}

export function f(strings: TemplateStringsArray): NetworkFilter | CosmeticFilter | null {
  const rawFilter = strings[0];
  const filterType = detectFilterType(rawFilter);

  if (filterType === FilterType.NETWORK) {
    return NetworkFilter.parse(rawFilter, true);
  } else if (filterType === FilterType.COSMETIC) {
    return CosmeticFilter.parse(rawFilter, true);
  }

  return null;
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
    let line = lines[i];

    // Check if `line` should be trimmed before parsing
    const isTrimmingNeeded =
      line.length > 1 && (line.charCodeAt(0) <= 32 || line.charCodeAt(line.length - 1) <= 32);
    if (isTrimmingNeeded) {
      line = line.trim();
    }

    // Detect if filter is supported, network or cosmetic
    const filterType = detectFilterType(line);

    if (filterType === FilterType.NETWORK && config.loadNetworkFilters === true) {
      const filter = NetworkFilter.parse(line, config.debug);
      if (filter !== null) {
        networkFilters.push(filter);
      }
    } else if (filterType === FilterType.COSMETIC && config.loadCosmeticFilters === true) {
      const filter = CosmeticFilter.parse(line, config.debug);
      if (filter !== null) {
        if (config.loadGenericCosmeticsFilters === true || filter.isGenericHide() === false) {
          cosmeticFilters.push(filter);
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

export interface IRawDiff {
  added: string[];
  removed: string[];
}

/**
 * Helper used to return a set of lines as strings where each line is
 * guaranteed to be a valid filter (i.e.: comments, empty lines and
 * un-supported filters are dropped).
 */
export function getLinesWithFilters(raw: string): Set<string> {
  const {
    networkFilters,
    cosmeticFilters,
  }: {
    networkFilters: NetworkFilter[];
    cosmeticFilters: CosmeticFilter[];
  } = parseFilters(raw, {
    debug: true,
  });

  return new Set(
    networkFilters
      .map((filter) => filter.rawLine as string)
      .concat(cosmeticFilters.map((filter) => filter.rawLine as string)),
  );
}

/**
 * Given two versions of the same subscription (e.g.: EasyList) as a string,
 * generate a raw diff (i.e.: a list of lines added and lines removed).
 */
export function generateDiff(prevRevision: string, newRevision: string): IRawDiff {
  const prevRevisionLines: Set<string> = getLinesWithFilters(prevRevision);
  const newRevisionLines: Set<string> = getLinesWithFilters(newRevision);

  const added: string[] = [];
  const removed: string[] = [];

  newRevisionLines.forEach((line) => {
    if (!prevRevisionLines.has(line)) {
      added.push(line);
    }
  });

  prevRevisionLines.forEach((line) => {
    if (!newRevisionLines.has(line)) {
      removed.push(line);
    }
  });

  return { added, removed };
}

/**
 * Merge several raw diffs into one, taking care of accumulating added and
 * removed filters, even if several diffs add/remove the same ones.
 */
export function mergeDiffs(diffs: Array<Partial<IRawDiff>>): IRawDiff {
  const addedCumul: Set<string> = new Set();
  const removedCumul: Set<string> = new Set();

  for (let i = 0; i < diffs.length; i += 1) {
    const { added, removed } = diffs[i];

    if (added !== undefined) {
      for (let j = 0; j < added.length; j += 1) {
        const str = added[j];
        if (removedCumul.has(str)) {
          removedCumul.delete(str);
        }
        addedCumul.add(str);
      }
    }

    if (removed !== undefined) {
      for (let j = 0; j < removed.length; j += 1) {
        const str = removed[j];
        if (addedCumul.has(str)) {
          addedCumul.delete(str);
        }
        removedCumul.add(str);
      }
    }
  }

  return {
    added: Array.from(addedCumul),
    removed: Array.from(removedCumul),
  };
}
