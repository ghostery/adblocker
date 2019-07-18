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
/**
 * Given a single line (string), checks if this would likely be a cosmetic
 * filter, a network filter or something that is not supported. This check is
 * performed before calling a more specific parser to create an instance of
 * `NetworkFilter` or `CosmeticFilter`.
 */
function detectFilterType(line) {
    // Ignore empty line
    if (line.length === 0 || line.length === 1) {
        return 0 /* NOT_SUPPORTED */;
    }
    // Ignore comments
    var firstCharCode = line.charCodeAt(0);
    var secondCharCode = line.charCodeAt(1);
    if (firstCharCode === 33 /* '!' */ ||
        (firstCharCode === 35 /* '#' */ && secondCharCode <= 32) ||
        (firstCharCode === 91 /* '[' */ && fastStartsWith(line, '[Adblock'))) {
        return 0 /* NOT_SUPPORTED */;
    }
    // Fast heuristics to detect network filters
    var lastCharCode = line.charCodeAt(line.length - 1);
    if (firstCharCode === 36 /* '$' */ ||
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
        lastCharCode === 124 /* '|' */) {
        return 1 /* NETWORK */;
    }
    // Ignore Adguard cosmetics
    // `$$` = HTML filtering rules
    var dollarIndex = line.indexOf('$');
    if (dollarIndex !== -1 && dollarIndex !== line.length - 1) {
        var afterDollarIndex = dollarIndex + 1;
        var afterDollarCharCode = line.charCodeAt(afterDollarIndex);
        // Ignore Adguard HTML rewrite rules
        if (afterDollarCharCode === 36 /* '$' */ ||
            (afterDollarCharCode === 64 /* '@' */ &&
                fastStartsWithFrom(line, /* $@$ */ '@$', afterDollarIndex))) {
            return 0 /* NOT_SUPPORTED */;
        }
    }
    // Check if filter is cosmetics
    var sharpIndex = line.indexOf('#');
    if (sharpIndex !== -1 && sharpIndex !== line.length - 1) {
        var afterSharpIndex = sharpIndex + 1;
        var afterSharpCharCode = line.charCodeAt(afterSharpIndex);
        if (afterSharpCharCode === 35 /* '#'*/ ||
            (afterSharpCharCode === 64 /* '@' */ &&
                fastStartsWithFrom(line, /* #@# */ '@#', afterSharpIndex))) {
            // Parse supported cosmetic filter
            // `##` `#@#`
            return 2 /* COSMETIC */;
        }
        else if ((afterSharpCharCode === 64 /* '@'*/ &&
            (fastStartsWithFrom(line, /* #@$# */ '@$#', afterSharpIndex) ||
                fastStartsWithFrom(line, /* #@%# */ '@%#', afterSharpIndex))) ||
            (afterSharpCharCode === 37 /* '%' */ &&
                fastStartsWithFrom(line, /* #%# */ '%#', afterSharpIndex)) ||
            (afterSharpCharCode === 36 /* '$' */ &&
                fastStartsWithFrom(line, /* #$# */ '$#', afterSharpIndex)) ||
            (afterSharpCharCode === 63 /* '?' */ &&
                fastStartsWithFrom(line, /* #?# */ '?#', afterSharpIndex))) {
            // Ignore Adguard cosmetics
            // `#$#` `#@$#`
            // `#%#` `#@%#`
            // `#?#`
            return 0 /* NOT_SUPPORTED */;
        }
    }
    // Everything else is a network filter
    return 1 /* NETWORK */;
}
export function parseFilter(filter) {
    var filterType = detectFilterType(filter);
    if (filterType === 1 /* NETWORK */) {
        return NetworkFilter.parse(filter, true);
    }
    else if (filterType === 2 /* COSMETIC */) {
        return CosmeticFilter.parse(filter, true);
    }
    return null;
}
export function f(strings) {
    return parseFilter(strings[0]);
}
export function parseFilters(list, config) {
    if (config === void 0) { config = new Config(); }
    config = new Config(config);
    var networkFilters = [];
    var cosmeticFilters = [];
    var lines = list.split('\n');
    for (var i = 0; i < lines.length; i += 1) {
        var line = lines[i];
        // Check if `line` should be trimmed before parsing
        var isTrimmingNeeded = line.length > 1 && (line.charCodeAt(0) <= 32 || line.charCodeAt(line.length - 1) <= 32);
        if (isTrimmingNeeded) {
            line = line.trim();
        }
        // Detect if filter is supported, network or cosmetic
        var filterType = detectFilterType(line);
        if (filterType === 1 /* NETWORK */ && config.loadNetworkFilters === true) {
            var filter = NetworkFilter.parse(line, config.debug);
            if (filter !== null) {
                networkFilters.push(filter);
            }
        }
        else if (filterType === 2 /* COSMETIC */ && config.loadCosmeticFilters === true) {
            var filter = CosmeticFilter.parse(line, config.debug);
            if (filter !== null) {
                if (config.loadGenericCosmeticsFilters === true || filter.isGenericHide() === false) {
                    cosmeticFilters.push(filter);
                }
            }
        }
    }
    return { networkFilters: networkFilters, cosmeticFilters: cosmeticFilters };
}
function getFilters(list, config) {
    var _a = parseFilters(list, config), networkFilters = _a.networkFilters, cosmeticFilters = _a.cosmeticFilters;
    var filters = [];
    return filters.concat(networkFilters).concat(cosmeticFilters);
}
/**
 * Helper used to return a set of lines as strings where each line is
 * guaranteed to be a valid filter (i.e.: comments, empty lines and
 * un-supported filters are dropped).
 */
export function getLinesWithFilters(list, config) {
    if (config === void 0) { config = new Config(); }
    // Set config to `debug` so that we keep track of raw lines for each filter
    return new Set(getFilters(list, new Config(Object.assign({}, config, { debug: true }))).map(function (_a) {
        var rawLine = _a.rawLine;
        return rawLine;
    }));
}
/**
 * Given two versions of the same subscription (e.g.: EasyList) as a string,
 * generate a raw diff (i.e.: a list of filters added and filters removed, in
 * their raw string form).
 */
export function generateDiff(prevRevision, newRevision, config) {
    if (config === void 0) { config = new Config(); }
    // Set config to `debug` so that we keep track of raw lines for each filter
    var debugConfig = new Config(Object.assign({}, config, { debug: true }));
    var prevRevisionFilters = getFilters(prevRevision, debugConfig);
    var prevRevisionIds = new Set(prevRevisionFilters.map(function (filter) { return filter.getId(); }));
    var newRevisionFilters = getFilters(newRevision, debugConfig);
    var newRevisionIds = new Set(newRevisionFilters.map(function (filter) { return filter.getId(); }));
    // Check which filters were added, based on ID
    var added = new Set();
    for (var i = 0; i < newRevisionFilters.length; i += 1) {
        var filter = newRevisionFilters[i];
        if (!prevRevisionIds.has(filter.getId())) {
            added.add(filter.rawLine);
        }
    }
    // Check which filters were removed, based on ID
    var removed = new Set();
    for (var i = 0; i < prevRevisionFilters.length; i += 1) {
        var filter = prevRevisionFilters[i];
        if (!newRevisionIds.has(filter.getId())) {
            removed.add(filter.rawLine);
        }
    }
    return { added: Array.from(added), removed: Array.from(removed) };
}
/**
 * Merge several raw diffs into one, taking care of accumulating added and
 * removed filters, even if several diffs add/remove the same ones.
 */
export function mergeDiffs(diffs) {
    var addedCumul = new Set();
    var removedCumul = new Set();
    for (var i = 0; i < diffs.length; i += 1) {
        var _a = diffs[i], added = _a.added, removed = _a.removed;
        if (added !== undefined) {
            for (var j = 0; j < added.length; j += 1) {
                var str = added[j];
                if (removedCumul.has(str)) {
                    removedCumul["delete"](str);
                }
                addedCumul.add(str);
            }
        }
        if (removed !== undefined) {
            for (var j = 0; j < removed.length; j += 1) {
                var str = removed[j];
                if (addedCumul.has(str)) {
                    addedCumul["delete"](str);
                }
                removedCumul.add(str);
            }
        }
    }
    return {
        added: Array.from(addedCumul),
        removed: Array.from(removedCumul)
    };
}
