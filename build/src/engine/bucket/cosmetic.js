/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { compactTokens, concatTypedArrays } from '../../compact-set';
import CosmeticFilter, { DEFAULT_HIDDING_STYLE, getEntityHashesFromLabelsBackward, getHostnameHashesFromLabelsBackward, } from '../../filters/cosmetic';
import { hashStrings, tokenizeFilter } from '../../utils';
import { noopOptimizeCosmetic } from '../optimizer';
import ReverseIndex from '../reverse-index';
import FiltersContainer from './filters';
/**
 * Given a list of CSS selectors, create a valid stylesheet ready to be
 * injected in the page. This also takes care to no create rules with too many
 * selectors for Chrome, see: https://crbug.com/804179
 */
export function createStylesheet(rules, style) {
    if (rules.length === 0) {
        return '';
    }
    var maximumNumberOfSelectors = 1024;
    var parts = [];
    var styleStr = " { " + style + " }";
    for (var i = 0; i < rules.length; i += maximumNumberOfSelectors) {
        // Accumulate up to `maximumNumberOfSelectors` selectors into `selector`.
        // We use string concatenation here since it's faster than using
        // `Array.prototype.join`.
        var selector = rules[i];
        for (var j = i + 1, end = Math.min(rules.length, i + maximumNumberOfSelectors); j < end; j += 1) {
            selector += ',\n' + rules[j];
        }
        // Insert CSS after last selector (e.g.: `{ display: none }`)
        selector += styleStr;
        // If `rules` has less then the limit, we can short-circuit here
        if (rules.length < maximumNumberOfSelectors) {
            return selector;
        }
        // Keep track of this chunk and process next ones
        parts.push(selector);
    }
    // Join all chunks together
    return parts.join('\n');
}
/**
 * If at least one filter from `rules` has a custom style (e.g.: `##.foo
 * :style(...)`) then we fallback to `createStylesheetFromRulesWithCustomStyles`
 * which is slower then `createStylesheetFromRules`.
 */
function createStylesheetFromRulesWithCustomStyles(rules) {
    var selectorsPerStyle = new Map();
    for (var i = 0; i < rules.length; i += 1) {
        var rule = rules[i];
        var style = rule.getStyle();
        var selectors = selectorsPerStyle.get(style);
        if (selectors === undefined) {
            selectorsPerStyle.set(style, [rule.getSelector()]);
        }
        else {
            selectors.push(rule.getSelector());
        }
    }
    var stylesheets = [];
    var selectorsPerStyleArray = Array.from(selectorsPerStyle.entries());
    for (var i = 0; i < selectorsPerStyleArray.length; i += 1) {
        var style = selectorsPerStyleArray[i][0];
        var selectors = selectorsPerStyleArray[i][1];
        stylesheets.push(createStylesheet(selectors, style));
    }
    return stylesheets.join('\n\n');
}
/**
 * Given a list of cosmetic filters, create a stylesheet ready to be injected.
 * This function is optimistic and will assume there is no `:style` filter in
 * `rules`. In case one is found on the way, we fallback to the slower
 * `createStylesheetFromRulesWithCustomStyles` function.
 */
function createStylesheetFromRules(rules) {
    var selectors = [];
    for (var i = 0; i < rules.length; i += 1) {
        var rule = rules[i];
        if (rule.hasCustomStyle()) {
            return createStylesheetFromRulesWithCustomStyles(rules);
        }
        selectors.push(rule.selector);
    }
    return createStylesheet(selectors, DEFAULT_HIDDING_STYLE);
}
function createLookupTokens(hostname, domain) {
    var hostnamesHashes = getHostnameHashesFromLabelsBackward(hostname, domain);
    var entitiesHashes = getEntityHashesFromLabelsBackward(hostname, domain);
    var tokens = new Uint32Array(hostnamesHashes.length + entitiesHashes.length);
    var index = 0;
    for (var i = 0; i < hostnamesHashes.length; i += 1) {
        tokens[index++] = hostnamesHashes[i];
    }
    for (var i = 0; i < entitiesHashes.length; i += 1) {
        tokens[index++] = entitiesHashes[i];
    }
    return tokens;
}
/**
 * Efficient container for CosmeticFilter instances. Allows to quickly
 * retrieved scripts and stylesheets to inject in pages for a specific
 * hostname/domain.
 */
var CosmeticFilterBucket = /** @class */ (function () {
    function CosmeticFilterBucket(_a) {
        var _b = _a.filters, filters = _b === void 0 ? [] : _b, config = _a.config;
        this.genericRules = new FiltersContainer({
            config: config,
            deserialize: CosmeticFilter.deserialize,
            filters: []
        });
        this.unhideIndex = new ReverseIndex({
            config: config,
            deserialize: CosmeticFilter.deserialize,
            filters: [],
            optimize: noopOptimizeCosmetic
        });
        this.hostnameIndex = new ReverseIndex({
            config: config,
            deserialize: CosmeticFilter.deserialize,
            filters: [],
            optimize: noopOptimizeCosmetic
        });
        this.classesIndex = new ReverseIndex({
            config: config,
            deserialize: CosmeticFilter.deserialize,
            filters: [],
            optimize: noopOptimizeCosmetic
        });
        this.idsIndex = new ReverseIndex({
            config: config,
            deserialize: CosmeticFilter.deserialize,
            filters: [],
            optimize: noopOptimizeCosmetic
        });
        this.hrefsIndex = new ReverseIndex({
            config: config,
            deserialize: CosmeticFilter.deserialize,
            filters: [],
            optimize: noopOptimizeCosmetic
        });
        // In-memory cache, lazily initialized
        this.baseStylesheet = null;
        this.extraGenericRules = null;
        if (filters.length !== 0) {
            this.update(filters, undefined);
        }
    }
    CosmeticFilterBucket.deserialize = function (buffer, config) {
        var bucket = new CosmeticFilterBucket({ config: config });
        bucket.genericRules = FiltersContainer.deserialize(buffer, CosmeticFilter.deserialize, config);
        bucket.unhideIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
        bucket.hostnameIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
        // DOM indices
        bucket.classesIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
        bucket.idsIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
        bucket.hrefsIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
        return bucket;
    };
    CosmeticFilterBucket.prototype.getFilters = function () {
        var filters = [];
        return filters.concat(this.classesIndex.getFilters(), this.genericRules.getFilters(), this.hostnameIndex.getFilters(), this.hrefsIndex.getFilters(), this.idsIndex.getFilters(), this.unhideIndex.getFilters());
    };
    CosmeticFilterBucket.prototype.update = function (newFilters, removedFilters) {
        var unHideRules = [];
        var genericHideRules = [];
        var hostnameSpecificRules = [];
        var classSelectors = [];
        var idSelectors = [];
        var hrefSelectors = [];
        for (var i = 0; i < newFilters.length; i += 1) {
            var rule = newFilters[i];
            if (rule.isUnhide()) {
                unHideRules.push(rule);
            }
            else if (rule.isGenericHide()) {
                if (rule.isClassSelector()) {
                    classSelectors.push(rule);
                }
                else if (rule.isIdSelector()) {
                    idSelectors.push(rule);
                }
                else if (rule.isHrefSelector()) {
                    hrefSelectors.push(rule);
                }
                else {
                    genericHideRules.push(rule);
                }
            }
            else {
                hostnameSpecificRules.push(rule);
            }
        }
        this.genericRules.update(genericHideRules, removedFilters);
        this.unhideIndex.update(unHideRules, removedFilters);
        this.hostnameIndex.update(hostnameSpecificRules, removedFilters);
        this.classesIndex.update(classSelectors, removedFilters);
        this.idsIndex.update(idSelectors, removedFilters);
        this.hrefsIndex.update(hrefSelectors, removedFilters);
    };
    CosmeticFilterBucket.prototype.serialize = function (buffer) {
        this.genericRules.serialize(buffer);
        this.unhideIndex.serialize(buffer);
        this.hostnameIndex.serialize(buffer);
        this.classesIndex.serialize(buffer);
        this.idsIndex.serialize(buffer);
        this.hrefsIndex.serialize(buffer);
    };
    /**
     * Request cosmetics and scripts to inject in a page.
     */
    CosmeticFilterBucket.prototype.getCosmeticsFilters = function (_a) {
        var domain = _a.domain, hostname = _a.hostname, _b = _a.classes, classes = _b === void 0 ? [] : _b, _c = _a.hrefs, hrefs = _c === void 0 ? [] : _c, _d = _a.ids, ids = _d === void 0 ? [] : _d, _e = _a.allowGenericHides, allowGenericHides = _e === void 0 ? true : _e, 
        // Allows to specify which rules to return
        _f = _a.getBaseRules, 
        // Allows to specify which rules to return
        getBaseRules = _f === void 0 ? true : _f, _g = _a.getInjectionRules, getInjectionRules = _g === void 0 ? true : _g, _h = _a.getRulesFromDOM, getRulesFromDOM = _h === void 0 ? true : _h, _j = _a.getRulesFromHostname, getRulesFromHostname = _j === void 0 ? true : _j;
        // Tokens from `hostname` and `domain` which will be used to lookup filters
        // from the reverse index. The same tokens are re-used for multiple indices.
        var hostnameTokens = createLookupTokens(hostname, domain);
        var rules = [];
        // =======================================================================
        // Rules: hostname-specific
        // =======================================================================
        // Collect matching rules which specify a hostname constraint.
        if (getRulesFromHostname === true) {
            this.hostnameIndex.iterMatchingFilters(hostnameTokens, function (rule) {
                if (rule.match(hostname, domain)) {
                    rules.push(rule);
                }
                return true;
            });
        }
        // =======================================================================
        // Rules: generic hide
        // =======================================================================
        // Optionally, collect genericHide rules. We need to make sure the `rule`
        // matches the hostname and domain since some generic rules can specify
        // negated hostnames and entities (e.g.: ~foo.*##generic).
        if (allowGenericHides === true && getRulesFromHostname === true) {
            var genericRules = this.getGenericRules();
            for (var i = 0; i < genericRules.length; i += 1) {
                var rule = genericRules[i];
                if (rule.match(hostname, domain) === true) {
                    rules.push(rule);
                }
            }
        }
        // =======================================================================
        // Class selector based
        // =======================================================================
        if (allowGenericHides === true && getRulesFromDOM === true && classes.length !== 0) {
            this.classesIndex.iterMatchingFilters(hashStrings(classes), function (rule) {
                if (rule.match(hostname, domain)) {
                    rules.push(rule);
                }
                return true;
            });
        }
        // =======================================================================
        // Id selector based
        // =======================================================================
        if (allowGenericHides === true && getRulesFromDOM === true && ids.length !== 0) {
            this.idsIndex.iterMatchingFilters(hashStrings(ids), function (rule) {
                if (rule.match(hostname, domain)) {
                    rules.push(rule);
                }
                return true;
            });
        }
        // =======================================================================
        // Href selector based
        // =======================================================================
        if (allowGenericHides === true && getRulesFromDOM === true && hrefs.length !== 0) {
            this.hrefsIndex.iterMatchingFilters(compactTokens(concatTypedArrays(hrefs.map(function (href) { return tokenizeFilter(href, false, true); }))), function (rule) {
                if (rule.match(hostname, domain)) {
                    rules.push(rule);
                }
                return true;
            });
        }
        var injections = [];
        var styles = [];
        // If we found at least one candidate, check if we have unhidden rules,
        // apply them and dispatch rules into `injections` (i.e.: '+js(...)') and
        // `styles` (i.e.: '##rule').
        if (rules.length !== 0) {
            // =======================================================================
            // Rules: unhide
            // =======================================================================
            // Collect unhidden selectors. They will be used to filter-out canceled
            // rules from other indices.
            var disabledRules_1 = new Set();
            this.unhideIndex.iterMatchingFilters(hostnameTokens, function (rule) {
                if (rule.match(hostname, domain)) {
                    disabledRules_1.add(rule.getSelector());
                }
                return true;
            });
            // Apply unhide rules + dispatch
            for (var i = 0; i < rules.length; i += 1) {
                var rule = rules[i];
                // Make sure `rule` is not un-hidden by a #@# filter
                if (disabledRules_1.size !== 0 && disabledRules_1.has(rule.getSelector())) {
                    continue;
                }
                // Dispatch rules in `injections` or `styles` depending on type
                if (getInjectionRules === true && rule.isScriptInject()) {
                    injections.push(rule);
                }
                else {
                    styles.push(rule);
                }
            }
        }
        // Create final stylesheet
        var stylesheet = getBaseRules === false || allowGenericHides === false ? '' : this.getBaseStylesheet();
        if (styles.length !== 0) {
            if (stylesheet.length !== 0) {
                stylesheet += '\n\n';
            }
            stylesheet += createStylesheetFromRules(styles);
        }
        return {
            injections: injections,
            stylesheet: stylesheet
        };
    };
    /**
     * Return the list of filters which can potentially be un-hidden by another
     * rule currently contained in the cosmetic bucket.
     */
    CosmeticFilterBucket.prototype.getGenericRules = function () {
        if (this.extraGenericRules === null) {
            return this.lazyPopulateGenericRulesCache().genericRules;
        }
        return this.extraGenericRules;
    };
    /**
     * The base stylesheet is made of generic filters (not specific to any
     * hostname) which cannot be hidden (i.e.: there is currently no rule which
     * might hide their selector). This means that it will never change and is
     * the same for all sites. We generate it once and re-use it any-time we want
     * to inject it.
     */
    CosmeticFilterBucket.prototype.getBaseStylesheet = function () {
        if (this.baseStylesheet === null) {
            return this.lazyPopulateGenericRulesCache().baseStylesheet;
        }
        return this.baseStylesheet;
    };
    /**
     * This is used to lazily generate both the list of generic rules which can
     * *potentially be un-hidden* (i.e.: there exists at least once unhide rule
     * for the selector) and a stylesheet containing all selectors which cannot
     * be un-hidden. Since this list will not change between updates we can
     * generate once and use many times.
     */
    CosmeticFilterBucket.prototype.lazyPopulateGenericRulesCache = function () {
        if (this.baseStylesheet === null || this.extraGenericRules === null) {
            // Collect all selectors which can be subjected to an unhide rule
            var unHideRules = this.unhideIndex.getFilters();
            var canBeHiddenSelectors = new Set();
            for (var i = 0; i < unHideRules.length; i += 1) {
                canBeHiddenSelectors.add(unHideRules[i].getSelector());
            }
            // Split generic rules into two groups:
            // 1. Rules which cannot be hidden
            // 2. Rules which can be hidden on some domains
            //
            // This allows to create a base stylesheet which we know will never
            // change then keep a minority of rules in-memory which can potentially
            // be hidden.
            var genericRules = this.genericRules.getFilters();
            var cannotBeHiddenRules = [];
            var canBeHiddenRules = [];
            for (var i = 0; i < genericRules.length; i += 1) {
                var rule = genericRules[i];
                if (rule.hasCustomStyle() ||
                    rule.isScriptInject() ||
                    rule.hasHostnameConstraint() ||
                    canBeHiddenSelectors.has(rule.getSelector())) {
                    canBeHiddenRules.push(rule);
                }
                else {
                    cannotBeHiddenRules.push(rule);
                }
            }
            this.baseStylesheet = createStylesheetFromRules(cannotBeHiddenRules);
            this.extraGenericRules = canBeHiddenRules;
        }
        return {
            baseStylesheet: this.baseStylesheet,
            genericRules: this.extraGenericRules
        };
    };
    return CosmeticFilterBucket;
}());
export default CosmeticFilterBucket;
