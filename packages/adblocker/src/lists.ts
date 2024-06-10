/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Config from './config';
import CosmeticFilter from './filters/cosmetic';
import NetworkFilter from './filters/network';
import Preprocessor, { PreprocessorTokens, detectPreprocessor } from './preprocessor';
import { fastStartsWith, fastStartsWithFrom } from './utils';

export const enum FilterType {
  NOT_SUPPORTED = 0,
  NETWORK = 1,
  COSMETIC = 2,
}

/**
 * Given a single line (string), checks if this would likely be a cosmetic
 * filter, a network filter or something that is not supported. This check is
 * performed before calling a more specific parser to create an instance of
 * `NetworkFilter` or `CosmeticFilter`.
 */
export function detectFilterType(line: string): FilterType {
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
      // TODO - support ADB/AdGuard extended css selectors
      // || (afterSharpCharCode === 63 /* '?' */ &&
      //   fastStartsWithFrom(line, /* #?# */ '?#', afterSharpIndex))
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

export function parseFilter(filter: string): NetworkFilter | CosmeticFilter | null {
  const filterType = detectFilterType(filter);

  if (filterType === FilterType.NETWORK) {
    return NetworkFilter.parse(filter, true);
  } else if (filterType === FilterType.COSMETIC) {
    return CosmeticFilter.parse(filter, true);
  }

  return null;
}

export function f(strings: TemplateStringsArray): NetworkFilter | CosmeticFilter | null {
  return parseFilter(strings[0]);
}

export function parseFilters(
  list: string,
  config: Partial<Config> = new Config(),
): {
  networkFilters: NetworkFilter[];
  cosmeticFilters: CosmeticFilter[];
  preprocessors: Preprocessor[];
} {
  config = new Config(config);

  const networkFilters: NetworkFilter[] = [];
  const cosmeticFilters: CosmeticFilter[] = [];
  const lines = list.split('\n');

  const preprocessors: Preprocessor[] = [];
  const preprocessorStack: Preprocessor[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i];

    // Check if `line` should be left-trimmed
    if (line.length !== 0 && line.charCodeAt(0) <= 32) {
      line = line.trim();
    }

    // Handle continuations
    if (line.length > 2) {
      while (
        i < lines.length - 1 &&
        line.charCodeAt(line.length - 1) === 92 &&
        line.charCodeAt(line.length - 2) === 32
      ) {
        line = line.slice(0, -2);

        const nextLine = lines[i + 1];
        if (
          nextLine.length > 4 &&
          nextLine.charCodeAt(0) === 32 &&
          nextLine.charCodeAt(1) === 32 &&
          nextLine.charCodeAt(2) === 32 &&
          nextLine.charCodeAt(3) === 32 &&
          nextLine.charCodeAt(4) !== 32
        ) {
          line += nextLine.slice(4);
          i += 1;
        } else {
          break;
        }
      }
    }

    // Check if `line` should be right-trimmed
    if (line.length !== 0 && line.charCodeAt(line.length - 1) <= 32) {
      line = line.trim();
    }

    // Detect if filter is supported, network or cosmetic
    const filterType = detectFilterType(line);

    if (filterType === FilterType.NETWORK && config.loadNetworkFilters === true) {
      const filter = NetworkFilter.parse(line, config.debug);
      if (filter !== null) {
        networkFilters.push(filter);
        if (preprocessorStack.length > 0) {
          preprocessorStack[preprocessorStack.length - 1].filterIDs.add(filter.getId());
        }
      }
    } else if (filterType === FilterType.COSMETIC && config.loadCosmeticFilters === true) {
      const filter = CosmeticFilter.parse(line, config.debug);
      if (filter !== null) {
        if (config.loadGenericCosmeticsFilters === true || filter.isGenericHide() === false) {
          cosmeticFilters.push(filter);
          if (preprocessorStack.length > 0) {
            preprocessorStack[preprocessorStack.length - 1].filterIDs.add(filter.getId());
          }
        }
      }
    } else if (config.loadPreprocessors) {
      const preprocessorToken = detectPreprocessor(line);

      if (preprocessorToken === PreprocessorTokens.BEGIF) {
        if (preprocessorStack.length > 0) {
          preprocessorStack.push(
            new Preprocessor({
              condition: `(${preprocessorStack[preprocessorStack.length - 1].condition})&&(${Preprocessor.getCondition(line)})`,
            }),
          );
        } else {
          preprocessorStack.push(Preprocessor.parse(line));
        }
      } else if (
        (preprocessorToken === PreprocessorTokens.ENDIF ||
          preprocessorToken === PreprocessorTokens.ELSE) &&
        preprocessorStack.length > 0
      ) {
        const lastPreprocessor = preprocessorStack.pop()!;

        preprocessors.push(lastPreprocessor);

        if (preprocessorToken === PreprocessorTokens.ELSE) {
          preprocessorStack.push(
            new Preprocessor({
              condition: `!(${lastPreprocessor.condition})`,
            }),
          );
        }
      }
    }
  }

  return {
    networkFilters,
    cosmeticFilters,
    preprocessors: preprocessors.filter((preprocessor) => preprocessor.filterIDs.size > 0),
  };
}

function getFilters(
  list: string,
  config?: Partial<Config>,
): {
  filters: (NetworkFilter | CosmeticFilter)[];
  preprocessors: Preprocessor[];
} {
  const { networkFilters, cosmeticFilters, preprocessors } = parseFilters(list, config);
  const filters: (NetworkFilter | CosmeticFilter)[] = [];
  return {
    filters: filters.concat(networkFilters).concat(cosmeticFilters),
    preprocessors,
  };
}

export interface IListDiff {
  newNetworkFilters: NetworkFilter[];
  newCosmeticFilters: CosmeticFilter[];
  newPreprocessors: Preprocessor[];
  removedCosmeticFilters: number[];
  removedNetworkFilters: number[];
  removedPreprocessors: Preprocessor[];
}

interface IBaseDiff {
  added: string[];
  removed: string[];
}

interface IPreprocessorDiff {
  [key: string]: IBaseDiff;
}

export interface IRawDiff extends IBaseDiff {
  preprocessors?: IPreprocessorDiff;
}

export type IPartialRawDiff = Partial<IBaseDiff> & {
  preprocessors?: { [key: string]: Partial<IBaseDiff> };
};

/**
 * Helper used to return a set of lines as strings where each line is
 * guaranteed to be a valid filter (i.e.: comments, empty lines and
 * un-supported filters are dropped).
 */
export function getLinesWithFilters(
  list: string,
  config: Partial<Config> = new Config(),
): Set<string> {
  // Set config to `debug` so that we keep track of raw lines for each filter
  return new Set(
    getFilters(list, new Config(Object.assign({}, config, { debug: true }))).filters.map(
      ({ rawLine }) => rawLine as string,
    ),
  );
}

/**
 * Given two versions of the same subscription (e.g.: EasyList) as a string,
 * generate a raw diff (i.e.: a list of filters added and filters removed, in
 * their raw string form).
 */
export function generateDiff(
  prevRevision: string,
  newRevision: string,
  config: Partial<Config> = new Config(),
): IRawDiff {
  // Set config to `debug` so that we keep track of raw lines for each filter
  const debugConfig = new Config(Object.assign({}, config, { debug: true }));

  const prevRevisionData = getFilters(prevRevision, debugConfig);
  const prevRevisionIds = new Set(prevRevisionData.filters.map((filter) => filter.getId()));

  const newRevisionData = getFilters(newRevision, debugConfig);
  const newRevisionIds = new Set(newRevisionData.filters.map((filter) => filter.getId()));

  // Check which filters were added, based on ID
  const added: Set<string> = new Set();
  for (const filter of newRevisionData.filters) {
    if (!prevRevisionIds.has(filter.getId())) {
      added.add(filter.rawLine as string);
    }
  }

  // Check which filters were removed, based on ID
  const removed: Set<string> = new Set();
  for (const filter of prevRevisionData.filters) {
    if (!newRevisionIds.has(filter.getId())) {
      removed.add(filter.rawLine as string);
    }
  }

  // Fast exit if we don't want to handle preprocessors.
  if (!config.loadPreprocessors) {
    return {
      added: Array.from(added),
      removed: Array.from(removed),
      preprocessors: {},
    };
  }

  const index: Map<number, string> = new Map();

  for (const filter of newRevisionData.filters) {
    index.set(filter.getId(), filter.rawLine as string);
  }

  for (const filter of prevRevisionData.filters) {
    index.set(filter.getId(), filter.rawLine as string);
  }

  // Create preprocessor diffs
  const preprocessors: IPreprocessorDiff = {};

  // Get the diff of preprocessors
  for (const preprocessor of prevRevisionData.preprocessors) {
    // Find the same preprocessor in `newRevisionData`
    const newPreprocessor = newRevisionData.preprocessors.find(
      (newPreprocessor) => newPreprocessor.condition === preprocessor.condition,
    );

    // If the preprocessor in the revision is not found, it means the whole block was removed
    if (!newPreprocessor) {
      const removedInScope = new Set<string>();

      // Remove all filters
      for (const filterID of preprocessor.filterIDs) {
        removedInScope.add(index.get(filterID)!);
      }

      preprocessors[preprocessor.condition] = {
        added: [],
        removed: Array.from(removedInScope),
      };

      continue;
    }

    // If the preprocessor in the revision is found, it means the block was updated
    // Create subsets
    const scope = {
      added: new Set<string>(),
      removed: new Set<string>(),
    };

    for (const filterID of preprocessor.filterIDs) {
      if (!newPreprocessor.filterIDs.has(filterID)) {
        scope.removed.add(index.get(filterID)!);
      }
    }

    for (const filterID of newPreprocessor.filterIDs) {
      if (!preprocessor.filterIDs.has(filterID)) {
        scope.added.add(index.get(filterID)!);
      }
    }

    preprocessors[preprocessor.condition] = {
      added: Array.from(scope.added),
      removed: Array.from(scope.removed),
    };
  }

  // Iterate over only "added" preprocessors
  for (const preprocessor of newRevisionData.preprocessors) {
    // If the preprocessor in the previous revision was not found, it means the whole block was added
    if (!preprocessors[preprocessor.condition]) {
      const addedInScope = new Set<string>();

      // Remove all filters
      for (const filterID of preprocessor.filterIDs) {
        addedInScope.add(index.get(filterID)!);
      }

      preprocessors[preprocessor.condition] = {
        added: Array.from(addedInScope),
        removed: [],
      };
    }
  }

  for (const [condition, { added, removed }] of Object.entries(preprocessors)) {
    if (added.length === 0 && removed.length === 0) {
      delete preprocessors[condition];
    }
  }

  return {
    added: Array.from(added),
    removed: Array.from(removed),
    // For the filters under `preprocessors` property, it doesn't mean those are "filters".
    // Those are "a list of filters affected by preprocessors" not the "filters" itself.
    // Therefore, they shouldn't be treated as filters.
    // Instead, we put "filters" in `added` and `removed` properties.
    // This provides backward-compatibility and simplicity.
    preprocessors,
  };
}

/**
 * Merge several raw diffs into one, taking care of accumulating added and
 * removed filters, even if several diffs add/remove the same ones.
 */
export function mergeDiffs(diffs: IPartialRawDiff[]): IRawDiff {
  const addedCumul: Set<string> = new Set();
  const removedCumul: Set<string> = new Set();
  const preprocessorsCumul: { [key: string]: { added: Set<string>; removed: Set<string> } } = {};

  for (const { added, removed, preprocessors } of diffs) {
    if (added !== undefined) {
      for (const str of added) {
        if (removedCumul.has(str)) {
          removedCumul.delete(str);
        }
        addedCumul.add(str);
      }
    }

    if (removed !== undefined) {
      for (const str of removed) {
        if (addedCumul.has(str)) {
          addedCumul.delete(str);
        }
        removedCumul.add(str);
      }
    }

    if (!preprocessors) {
      continue;
    }

    for (const [condition, details] of Object.entries(preprocessors)) {
      if (!preprocessorsCumul[condition]) {
        preprocessorsCumul[condition] = {
          added: details.added !== undefined ? new Set(details.added) : new Set(),
          removed: details.removed !== undefined ? new Set(details.removed) : new Set(),
        };
      } else {
        if (details.added !== undefined) {
          for (const str of details.added) {
            if (preprocessorsCumul[condition].removed.has(str)) {
              preprocessorsCumul[condition].removed.delete(str);
            }
            preprocessorsCumul[condition].added.add(str);
          }
        }

        if (details.removed !== undefined) {
          for (const str of details.removed) {
            if (preprocessorsCumul[condition].added.has(str)) {
              preprocessorsCumul[condition].added.delete(str);
            }
            preprocessorsCumul[condition].removed.add(str);
          }
        }
      }
    }
  }

  return {
    added: Array.from(addedCumul),
    removed: Array.from(removedCumul),
    preprocessors: Object.fromEntries(
      Object.entries(preprocessorsCumul).map(([condition, details]) => [
        condition,
        {
          added: Array.from(details.added),
          removed: Array.from(details.removed),
        },
      ]),
    ),
  };
}
