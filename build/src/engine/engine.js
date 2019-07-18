/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Config from '../config';
import StaticDataView from '../data-view';
import { parseFilters } from '../lists';
import Request from '../request';
import Resources from '../resources';
import CosmeticFilterBucket from './bucket/cosmetic';
import NetworkFilterBucket from './bucket/network';
export var ENGINE_VERSION = 29;
// Polyfill for `btoa`
function btoaPolyfill(buffer) {
    if (typeof btoa !== 'undefined') {
        return btoa(buffer);
    }
    else if (typeof Buffer !== 'undefined') {
        return Buffer.from(buffer).toString('base64');
    }
    return buffer;
}
var FilterEngine = /** @class */ (function () {
    function FilterEngine(_a) {
        var _b = _a === void 0 ? {} : _a, 
        // Optionally initialize the engine with filters
        _c = _b.cosmeticFilters, 
        // Optionally initialize the engine with filters
        cosmeticFilters = _c === void 0 ? [] : _c, _d = _b.networkFilters, networkFilters = _d === void 0 ? [] : _d, _e = _b.config, config = _e === void 0 ? new Config() : _e, _f = _b.lists, lists = _f === void 0 ? new Map() : _f;
        this.config = config;
        // Subscription management: disabled by default
        this.lists = lists;
        // $csp=
        this.csp = new NetworkFilterBucket({ config: this.config });
        // $generichide
        this.genericHides = new NetworkFilterBucket({ config: this.config });
        // @@filter
        this.exceptions = new NetworkFilterBucket({ config: this.config });
        // $important
        this.importants = new NetworkFilterBucket({ config: this.config });
        // $redirect
        this.redirects = new NetworkFilterBucket({ config: this.config });
        // All other filters
        this.filters = new NetworkFilterBucket({ config: this.config });
        // Cosmetic filters
        this.cosmetics = new CosmeticFilterBucket({ config: this.config });
        // Injections
        this.resources = new Resources();
        if (networkFilters.length !== 0 || cosmeticFilters.length !== 0) {
            this.update({
                newCosmeticFilters: cosmeticFilters,
                newNetworkFilters: networkFilters
            });
        }
    }
    FilterEngine.parse = function (filters, options) {
        if (options === void 0) { options = {}; }
        var config = new Config(options);
        return new this(Object.assign({}, parseFilters(filters, config), { config: config }));
    };
    FilterEngine.deserialize = function (serialized) {
        var buffer = StaticDataView.fromUint8Array(serialized, {
            enableCompression: false
        });
        // Before starting deserialization, we make sure that the version of the
        // serialized engine is the same as the current source code. If not, we
        // start fresh and create a new engine from the lists.
        var serializedEngineVersion = buffer.getUint8();
        if (ENGINE_VERSION !== serializedEngineVersion) {
            throw new Error("serialized engine version mismatch, expected " + ENGINE_VERSION + " but got " + serializedEngineVersion);
        }
        // Create a new engine with same options
        var config = Config.deserialize(buffer);
        // Optionally turn compression ON
        if (config.enableCompression) {
            buffer.enableCompression = true;
        }
        // Also make sure that the built-in checksum is correct. This allows to
        // detect data corruption and start fresh if the serialized version was
        // altered.
        if (config.integrityCheck) {
            var currentPos = buffer.pos;
            buffer.pos = serialized.length - 4;
            var checksum = buffer.checksum();
            var expected = buffer.getUint32();
            if (checksum !== expected) {
                throw new Error("serialized engine checksum mismatch, expected " + expected + " but got " + checksum);
            }
            buffer.pos = currentPos;
        }
        var engine = new this({ config: config });
        // Deserialize resources
        engine.resources = Resources.deserialize(buffer);
        // Deserialize lists
        var lists = new Map();
        var numberOfLists = buffer.getUint16();
        for (var i = 0; i < numberOfLists; i += 1) {
            lists.set(buffer.getASCII(), buffer.getASCII());
        }
        engine.lists = lists;
        // Deserialize buckets
        engine.filters = NetworkFilterBucket.deserialize(buffer, config);
        engine.exceptions = NetworkFilterBucket.deserialize(buffer, config);
        engine.importants = NetworkFilterBucket.deserialize(buffer, config);
        engine.redirects = NetworkFilterBucket.deserialize(buffer, config);
        engine.csp = NetworkFilterBucket.deserialize(buffer, config);
        engine.genericHides = NetworkFilterBucket.deserialize(buffer, config);
        engine.cosmetics = CosmeticFilterBucket.deserialize(buffer, config);
        return engine;
    };
    /**
     * Creates a binary representation of the full engine. It can be stored
     * on-disk for faster loading of the adblocker. The `deserialize` static
     * method of Engine can be used to restore the engine.
     */
    FilterEngine.prototype.serialize = function (array) {
        // Create a big buffer! It should always be bigger than the serialized
        // engine since `StaticDataView` will neither resize it nor detect overflows
        // (for efficiency purposes).
        var buffer = StaticDataView.fromUint8Array(array || new Uint8Array(9000000), this.config);
        buffer.pushUint8(ENGINE_VERSION);
        // Config
        this.config.serialize(buffer);
        // Resources (js, resources)
        this.resources.serialize(buffer);
        // Serialize the state of lists (names and checksums)
        buffer.pushUint16(this.lists.size);
        var entries = Array.from(this.lists.entries()).sort();
        for (var i = 0; i < entries.length; i += 1) {
            buffer.pushASCII(entries[i][0]);
            buffer.pushASCII(entries[i][1]);
        }
        // Filters buckets
        this.filters.serialize(buffer);
        this.exceptions.serialize(buffer);
        this.importants.serialize(buffer);
        this.redirects.serialize(buffer);
        this.csp.serialize(buffer);
        this.genericHides.serialize(buffer);
        this.cosmetics.serialize(buffer);
        // Append a checksum at the end
        if (this.config.integrityCheck) {
            buffer.pushUint32(buffer.checksum());
        }
        return buffer.slice();
    };
    /**
     * Update engine with new filters or resources.
     */
    FilterEngine.prototype.loadedLists = function () {
        return Array.from(this.lists.keys());
    };
    FilterEngine.prototype.hasList = function (name, checksum) {
        return this.lists.has(name) && this.lists.get(name) === checksum;
    };
    /**
     * Update engine with `resources.txt` content.
     */
    FilterEngine.prototype.updateResources = function (data, checksum) {
        if (this.resources.checksum === checksum) {
            return false;
        }
        this.resources = Resources.parse(data, { checksum: checksum });
        return true;
    };
    FilterEngine.prototype.getFilters = function () {
        var cosmeticFilters = [];
        var networkFilters = [];
        return {
            cosmeticFilters: cosmeticFilters.concat(this.cosmetics.getFilters()),
            networkFilters: networkFilters.concat(this.filters.getFilters(), this.exceptions.getFilters(), this.importants.getFilters(), this.redirects.getFilters(), this.csp.getFilters(), this.genericHides.getFilters())
        };
    };
    /**
     * Update engine with new filters as well as optionally removed filters.
     */
    FilterEngine.prototype.update = function (_a) {
        var _b = _a.newNetworkFilters, newNetworkFilters = _b === void 0 ? [] : _b, _c = _a.newCosmeticFilters, newCosmeticFilters = _c === void 0 ? [] : _c, _d = _a.removedCosmeticFilters, removedCosmeticFilters = _d === void 0 ? [] : _d, _e = _a.removedNetworkFilters, removedNetworkFilters = _e === void 0 ? [] : _e;
        var updated = false;
        // Update cosmetic filters
        if (this.config.loadCosmeticFilters &&
            (newCosmeticFilters.length !== 0 || removedCosmeticFilters.length !== 0)) {
            updated = true;
            this.cosmetics.update(newCosmeticFilters, removedCosmeticFilters.length === 0 ? undefined : new Set(removedCosmeticFilters));
        }
        // Update network filters
        if (this.config.loadNetworkFilters &&
            (newNetworkFilters.length !== 0 || removedNetworkFilters.length !== 0)) {
            updated = true;
            var filters = [];
            var csp = [];
            var exceptions = [];
            var importants = [];
            var redirects = [];
            var genericHides = [];
            for (var i = 0; i < newNetworkFilters.length; i += 1) {
                var filter = newNetworkFilters[i];
                // NOTE: it's important to check for $generichide and $csp before
                // exceptions and important as we store all of them in the same filter
                // bucket. The check for exceptions is done at match-time directly.
                if (filter.isCSP()) {
                    csp.push(filter);
                }
                else if (filter.isGenericHide()) {
                    genericHides.push(filter);
                }
                else if (filter.isException()) {
                    exceptions.push(filter);
                }
                else if (filter.isImportant()) {
                    importants.push(filter);
                }
                else if (filter.isRedirect()) {
                    redirects.push(filter);
                }
                else {
                    filters.push(filter);
                }
            }
            var removedNetworkFiltersSet = removedNetworkFilters.length === 0 ? undefined : new Set(removedNetworkFilters);
            // Update buckets in-place
            this.filters.update(filters, removedNetworkFiltersSet);
            this.csp.update(csp, removedNetworkFiltersSet);
            this.exceptions.update(exceptions, removedNetworkFiltersSet);
            this.importants.update(importants, removedNetworkFiltersSet);
            this.redirects.update(redirects, removedNetworkFiltersSet);
            this.genericHides.update(genericHides, removedNetworkFiltersSet);
        }
        return updated;
    };
    FilterEngine.prototype.updateFromDiff = function (_a) {
        var added = _a.added, removed = _a.removed;
        var newCosmeticFilters = [];
        var newNetworkFilters = [];
        var removedCosmeticFilters = [];
        var removedNetworkFilters = [];
        if (removed !== undefined && removed.length !== 0) {
            var _b = parseFilters(removed.join('\n'), this.config), networkFilters = _b.networkFilters, cosmeticFilters = _b.cosmeticFilters;
            Array.prototype.push.apply(removedCosmeticFilters, cosmeticFilters);
            Array.prototype.push.apply(removedNetworkFilters, networkFilters);
        }
        if (added !== undefined && added.length !== 0) {
            var _c = parseFilters(added.join('\n'), this.config), networkFilters = _c.networkFilters, cosmeticFilters = _c.cosmeticFilters;
            Array.prototype.push.apply(newCosmeticFilters, cosmeticFilters);
            Array.prototype.push.apply(newNetworkFilters, networkFilters);
        }
        return this.update({
            newCosmeticFilters: newCosmeticFilters,
            newNetworkFilters: newNetworkFilters,
            removedCosmeticFilters: removedCosmeticFilters.map(function (f) { return f.getId(); }),
            removedNetworkFilters: removedNetworkFilters.map(function (f) { return f.getId(); })
        });
    };
    /**
     * Matching APIs. The following methods are used to retrieve matching filters
     * either to apply cosmetics on a page or alter network requests.
     */
    FilterEngine.prototype.getGenericCosmetics = function () {
        return {
            active: false,
            extended: [],
            scripts: [],
            styles: ''
        };
    };
    /**
     * Given `hostname` and `domain` of a page (or frame), return the list of
     * styles and scripts to inject in the page.
     */
    FilterEngine.prototype.getCosmeticsFilters = function (_a) {
        var 
        // Page information
        url = _a.url, hostname = _a.hostname, domain = _a.domain, 
        // DOM information
        classes = _a.classes, hrefs = _a.hrefs, ids = _a.ids, 
        // Allows to specify which rules to return
        _b = _a.getBaseRules, 
        // Allows to specify which rules to return
        getBaseRules = _b === void 0 ? true : _b, _c = _a.getInjectionRules, getInjectionRules = _c === void 0 ? true : _c, _d = _a.getRulesFromDOM, getRulesFromDOM = _d === void 0 ? true : _d, _e = _a.getRulesFromHostname, getRulesFromHostname = _e === void 0 ? true : _e;
        if (this.config.loadCosmeticFilters === false) {
            return {
                active: false,
                extended: [],
                scripts: [],
                styles: ''
            };
        }
        // Check if there is some generichide
        var genericHides = this.genericHides.matchAll(Request.fromRawDetails({
            domain: domain || '',
            hostname: hostname,
            url: url,
            sourceDomain: '',
            sourceHostname: '',
            sourceUrl: ''
        }));
        // Get $generichide filter with highest priority:
        // $generichide,important > $generichide > @@$generichide
        var genericHideFilter = null;
        var currentScore = 0;
        for (var i = 0; i < genericHides.length; i += 1) {
            var filter = genericHides[i];
            // To encode priority between filters, we create a bitmask with the following:
            // $important,generichide = 100 (takes precedence)
            // $generichide           = 010 (exception to @@$generichide)
            // @@$generichide         = 001 (forbids generic hide filters)
            var score = (filter.isImportant() ? 4 : 0) | (filter.isException() ? 1 : 2);
            // Highest `score` has precedence
            if (score > currentScore) {
                currentScore = score;
                genericHideFilter = filter;
            }
        }
        // Check that there is at least one $generichide match and no exception
        var allowGenericHides = genericHideFilter === null || genericHideFilter.isException() === false;
        // Lookup injections as well as stylesheets
        var _f = this.cosmetics.getCosmeticsFilters({
            domain: domain || '',
            hostname: hostname,
            classes: classes,
            hrefs: hrefs,
            ids: ids,
            allowGenericHides: allowGenericHides,
            getBaseRules: getBaseRules,
            getInjectionRules: getInjectionRules,
            getRulesFromDOM: getRulesFromDOM,
            getRulesFromHostname: getRulesFromHostname
        }), injections = _f.injections, stylesheet = _f.stylesheet;
        // Perform interpolation for injected scripts
        var scripts = [];
        for (var i = 0; i < injections.length; i += 1) {
            var script = injections[i].getScript(this.resources.js);
            if (script !== undefined) {
                scripts.push(script);
            }
        }
        return {
            active: true,
            extended: [],
            scripts: scripts,
            styles: stylesheet
        };
    };
    /**
     * Given a `request`, return all matching network filters found in the engine.
     */
    FilterEngine.prototype.matchAll = function (request) {
        var filters = [];
        if (request.isSupported) {
            Array.prototype.push.apply(filters, this.importants.matchAll(request));
            Array.prototype.push.apply(filters, this.filters.matchAll(request));
            Array.prototype.push.apply(filters, this.exceptions.matchAll(request));
            Array.prototype.push.apply(filters, this.csp.matchAll(request));
            Array.prototype.push.apply(filters, this.genericHides.matchAll(request));
            Array.prototype.push.apply(filters, this.redirects.matchAll(request));
        }
        return new Set(filters);
    };
    /**
     * Given a "main_frame" request, check if some content security policies
     * should be injected in the page.
     */
    FilterEngine.prototype.getCSPDirectives = function (request) {
        if (!this.config.loadNetworkFilters) {
            return undefined;
        }
        if (request.isSupported !== true || request.type !== 'main_frame') {
            return undefined;
        }
        var matches = this.csp.matchAll(request);
        // No $csp filter found
        if (matches.length === 0) {
            return undefined;
        }
        // Collect all CSP directives and keep track of exceptions
        var disabledCsp = new Set();
        var enabledCsp = new Set();
        for (var i = 0; i < matches.length; i += 1) {
            var filter = matches[i];
            if (filter.isException()) {
                if (filter.csp === undefined) {
                    // All CSP directives are disabled for this site
                    return undefined;
                }
                disabledCsp.add(filter.csp);
            }
            else {
                enabledCsp.add(filter.csp);
            }
        }
        // Combine all CSPs (except the black-listed ones)
        return (Array.from(enabledCsp)
            .filter(function (csp) { return !disabledCsp.has(csp); })
            .join('; ') || undefined);
    };
    /**
     * Decide if a network request (usually from WebRequest API) should be
     * blocked, redirected or allowed.
     */
    FilterEngine.prototype.match = function (request) {
        if (!this.config.loadNetworkFilters) {
            return { match: false, redirect: undefined, exception: undefined, filter: undefined };
        }
        var filter;
        var exception;
        var redirect;
        if (request.isSupported) {
            // Check the filters in the following order:
            // 1. $important (not subject to exceptions)
            // 2. redirection ($redirect=resource)
            // 3. normal filters
            // 4. exceptions
            filter = this.importants.match(request);
            if (filter === undefined) {
                // Check if there is a redirect or a normal match
                filter = this.redirects.match(request);
                if (filter === undefined) {
                    filter = this.filters.match(request);
                }
                // If we found something, check for exceptions
                if (filter !== undefined) {
                    exception = this.exceptions.match(request);
                }
            }
            // If there is a match
            if (filter !== undefined) {
                if (filter.isRedirect()) {
                    var redirectResource = this.resources.getResource(filter.getRedirect());
                    if (redirectResource !== undefined) {
                        var data = redirectResource.data, contentType = redirectResource.contentType;
                        var dataUrl = void 0;
                        if (contentType.indexOf(';') !== -1) {
                            dataUrl = "data:" + contentType + "," + data;
                        }
                        else {
                            dataUrl = "data:" + contentType + ";base64," + btoaPolyfill(data);
                        }
                        redirect = {
                            body: data,
                            contentType: contentType,
                            dataUrl: dataUrl.trim()
                        };
                    } // TODO - else, throw an exception
                }
            }
        }
        return {
            exception: exception,
            filter: filter,
            match: exception === undefined && filter !== undefined,
            redirect: redirect
        };
    };
    return FilterEngine;
}());
export default FilterEngine;
