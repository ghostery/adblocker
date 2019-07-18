/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import NetworkFilter from '../filters/network';
import { setBit } from '../utils';
function processRegex(r) {
    return "(?:" + r.source + ")";
}
function escape(s) {
    return "(?:" + s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + ")";
}
function setWithDefault(map, key, value) {
    var bucket = map.get(key);
    if (bucket === undefined) {
        bucket = [];
        map.set(key, bucket);
    }
    bucket.push(value);
}
function groupBy(filters, criteria) {
    var grouped = new Map();
    for (var i = 0; i < filters.length; i += 1) {
        var filter = filters[i];
        setWithDefault(grouped, criteria(filter), filter);
    }
    return Array.from(grouped.values());
}
function splitBy(filters, condition) {
    var positive = [];
    var negative = [];
    for (var i = 0; i < filters.length; i += 1) {
        var filter = filters[i];
        if (condition(filter)) {
            positive.push(filter);
        }
        else {
            negative.push(filter);
        }
    }
    return {
        negative: negative,
        positive: positive
    };
}
var OPTIMIZATIONS = [
    // TODO - add filter deduplication
    {
        description: 'Group idential filter with same mask but different domains in single filters',
        fusion: function (filters) {
            var domains = new Set();
            var notDomains = new Set();
            for (var i = 0; i < filters.length; i += 1) {
                var _a = filters[i], optDomains = _a.optDomains, optNotDomains = _a.optNotDomains;
                if (optDomains !== undefined) {
                    optDomains.forEach(function (d) {
                        domains.add(d);
                    });
                }
                if (optNotDomains !== undefined) {
                    optNotDomains.forEach(function (d) {
                        notDomains.add(d);
                    });
                }
            }
            return new NetworkFilter(Object.assign({}, filters[0], {
                optDomains: domains.size > 0 ? new Uint32Array(domains).sort() : undefined,
                optNotDomains: notDomains.size > 0 ? new Uint32Array(notDomains).sort() : undefined,
                rawLine: filters[0].rawLine !== undefined
                    ? filters.map(function (_a) {
                        var rawLine = _a.rawLine;
                        return rawLine;
                    }).join(' <+> ')
                    : undefined
            }));
        },
        groupByCriteria: function (filter) {
            return filter.getHostname() + filter.getFilter() + filter.getMask() + filter.getRedirect();
        },
        select: function (filter) {
            return !filter.isFuzzy() &&
                !filter.isCSP() &&
                (filter.hasOptDomains() || filter.hasOptNotDomains());
        }
    },
    {
        description: 'Group simple patterns, into a single filter',
        fusion: function (filters) {
            var patterns = [];
            for (var i = 0; i < filters.length; i += 1) {
                var f = filters[i];
                if (f.isRegex()) {
                    patterns.push(processRegex(f.getRegex()));
                }
                else if (f.isRightAnchor()) {
                    patterns.push(escape(f.getFilter()) + "$");
                }
                else if (f.isLeftAnchor()) {
                    patterns.push("^" + escape(f.getFilter()));
                }
                else {
                    patterns.push(escape(f.getFilter()));
                }
            }
            return new NetworkFilter(Object.assign({}, filters[0], {
                mask: setBit(filters[0].mask, 67108864 /* isRegex */),
                rawLine: filters[0].rawLine !== undefined
                    ? filters.map(function (_a) {
                        var rawLine = _a.rawLine;
                        return rawLine;
                    }).join(' <+> ')
                    : undefined,
                regex: new RegExp(patterns.join('|'))
            }));
        },
        groupByCriteria: function (filter) { return '' + filter.getMask(); },
        select: function (filter) {
            return !filter.isFuzzy() &&
                !filter.hasOptDomains() &&
                !filter.hasOptNotDomains() &&
                !filter.isHostnameAnchor() &&
                !filter.isRedirect() &&
                !filter.isCSP();
        }
    },
];
/**
 * Optimizer which returns the list of original filters.
 */
export function noopOptimizeNetwork(filters) {
    return filters;
}
export function noopOptimizeCosmetic(filters) {
    return filters;
}
/**
 * Fusion a set of `filters` by applying optimizations sequentially.
 */
export function optimizeNetwork(filters) {
    var fused = [];
    var toFuse = filters;
    OPTIMIZATIONS.forEach(function (_a) {
        var select = _a.select, fusion = _a.fusion, groupByCriteria = _a.groupByCriteria;
        var _b = splitBy(toFuse, select), positive = _b.positive, negative = _b.negative;
        toFuse = negative;
        groupBy(positive, groupByCriteria).forEach(function (group) {
            if (group.length > 1) {
                fused.push(fusion(group));
            }
            else {
                toFuse.push(group[0]);
            }
        });
    });
    for (var i = 0; i < toFuse.length; i += 1) {
        fused.push(toFuse[i]);
    }
    return fused;
}
