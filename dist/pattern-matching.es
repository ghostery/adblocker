function noop(filters) {
    return filters;
}
var ReverseIndex = (function () {
    function ReverseIndex(filters, getTokens, _a) {
        var _b = _a === void 0 ? {
            enableOptimizations: true,
            optimizer: noop
        } : _a, _c = _b.enableOptimizations, enableOptimizations = _c === void 0 ? true : _c, _d = _b.optimizer, optimizer = _d === void 0 ? noop : _d;
        this.index = new Map();
        this.size = 0;
        this.optimizer = enableOptimizations ? optimizer : noop;
        this.getTokens = getTokens;
        this.addFilters(filters);
    }
    ReverseIndex.prototype.iterMatchingFilters = function (tokens, cb) {
        for (var j = 0; j < tokens.length; j += 1) {
            if (this.iterBucket(tokens[j], cb) === false) {
                return;
            }
        }
        this.iterBucket(0, cb);
    };
    ReverseIndex.prototype.optimizeAheadOfTime = function () {
        var _this = this;
        if (this.optimizer) {
            this.index.forEach(function (bucket) {
                _this.optimize(bucket, true);
            });
        }
    };
    ReverseIndex.prototype.addFilters = function (iterFilters) {
        var _this = this;
        var idToTokens = new Map();
        var histogram = new Map();
        iterFilters(function (filter) {
            var multiTokens = _this.getTokens(filter);
            idToTokens.set(filter.id, {
                filter: filter,
                multiTokens: multiTokens
            });
            for (var i = 0; i < multiTokens.length; i += 1) {
                var tokens = multiTokens[i];
                for (var j = 0; j < tokens.length; j += 1) {
                    var token = tokens[j];
                    histogram.set(token, (histogram.get(token) || 0) + 1);
                }
            }
        });
        this.size = idToTokens.size;
        idToTokens.forEach(function (_a) {
            var filter = _a.filter, multiTokens = _a.multiTokens;
            var wildCardInserted = false;
            for (var i = 0; i < multiTokens.length; i += 1) {
                var tokens = multiTokens[i];
                var bestToken = 0;
                var count = idToTokens.size;
                for (var k = 0; k < tokens.length; k += 1) {
                    var token = tokens[k];
                    var tokenCount = histogram.get(token);
                    if (tokenCount < count) {
                        bestToken = token;
                        count = tokenCount;
                    }
                }
                if (bestToken === 0) {
                    if (wildCardInserted) {
                        continue;
                    }
                    else {
                        wildCardInserted = true;
                    }
                }
                var bucket = _this.index.get(bestToken);
                if (bucket === undefined) {
                    _this.index.set(bestToken, {
                        filters: [filter],
                        hit: 0,
                        optimized: false
                    });
                }
                else {
                    bucket.filters.push(filter);
                }
            }
        });
    };
    ReverseIndex.prototype.optimize = function (bucket, force) {
        if (force === void 0) { force = false; }
        if (this.optimizer && !bucket.optimized && (force || bucket.hit >= 5)) {
            if (bucket.filters.length > 1) {
                bucket.filters = this.optimizer(bucket.filters);
            }
            bucket.optimized = true;
        }
    };
    ReverseIndex.prototype.iterBucket = function (token, cb) {
        var bucket = this.index.get(token);
        if (bucket !== undefined) {
            bucket.hit += 1;
            this.optimize(bucket);
            var filters = bucket.filters;
            for (var k = 0; k < filters.length; k += 1) {
                if (cb(filters[k]) === false) {
                    return false;
                }
            }
        }
        return true;
    };
    return ReverseIndex;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function compactTokens(tokens) {
    var sorted = tokens.sort();
    var lastIndex = 1;
    for (var i = 1; i < sorted.length; i += 1) {
        if (sorted[lastIndex - 1] !== sorted[i]) {
            sorted[lastIndex] = sorted[i];
            lastIndex += 1;
        }
    }
    return sorted.subarray(0, lastIndex);
}
function hasEmptyIntersection(s1, s2) {
    var i = 0;
    var j = 0;
    while (i < s1.length && j < s2.length && s1[i] !== s2[j]) {
        if (s1[i] < s2[j]) {
            i += 1;
        }
        else if (s2[j] < s1[i]) {
            j += 1;
        }
    }
    return !(i < s1.length && j < s2.length);
}
function concatTypedArrays() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    var totalSize = 0;
    for (var i = 0; i < arrays.length; i += 1) {
        totalSize += arrays[i].length;
    }
    var result = new Uint32Array(totalSize);
    var index = 0;
    for (var i = 0; i < arrays.length; i += 1) {
        var array = arrays[i];
        for (var j = 0; j < array.length; j += 1) {
            result[index] = array[j];
            index += 1;
        }
    }
    return result;
}
function mergeCompactSets() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    return compactTokens(concatTypedArrays.apply(void 0, __spread(arrays)));
}

function getBit(n, mask) {
    return !!(n & mask);
}
function setBit(n, mask) {
    return n | mask;
}
function clearBit(n, mask) {
    return n & ~mask;
}
function fastHashBetween(str, begin, end) {
    var hash = 5407;
    for (var i = begin; i < end; i += 1) {
        hash = (hash * 31) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
}
function fastHash(str) {
    if (!str) {
        return 0;
    }
    return fastHashBetween(str, 0, str.length);
}
function fastStartsWith(haystack, needle) {
    if (haystack.length < needle.length) {
        return false;
    }
    var ceil = needle.length;
    for (var i = 0; i < ceil; i += 1) {
        if (haystack[i] !== needle[i]) {
            return false;
        }
    }
    return true;
}
function fastStartsWithFrom(haystack, needle, start) {
    if (haystack.length - start < needle.length) {
        return false;
    }
    var ceil = start + needle.length;
    for (var i = start; i < ceil; i += 1) {
        if (haystack[i] !== needle[i - start]) {
            return false;
        }
    }
    return true;
}
function isDigit(ch) {
    return ch >= 48 && ch <= 57;
}
function isAlpha(ch) {
    ch &= ~32;
    return ch >= 65 && ch <= 90;
}
function isAlphaExtended(ch) {
    return ch >= 192 && ch <= 450;
}
function isAllowed(ch) {
    return isDigit(ch) || isAlpha(ch) || isAlphaExtended(ch);
}
function fastTokenizer(pattern, isAllowedCode, allowRegexSurround) {
    if (allowRegexSurround === void 0) { allowRegexSurround = false; }
    var tokens = [];
    var inside = false;
    var start = 0;
    var length = 0;
    for (var i = 0, len = pattern.length; i < len; i += 1) {
        var ch = pattern.charCodeAt(i);
        if (isAllowedCode(ch)) {
            if (!inside) {
                inside = true;
                start = i;
                length = 0;
            }
            length += 1;
        }
        else if (inside) {
            inside = false;
            if (allowRegexSurround || ch !== 42) {
                tokens.push(fastHashBetween(pattern, start, start + length));
            }
        }
    }
    if (inside) {
        tokens.push(fastHashBetween(pattern, start, start + length));
    }
    return tokens;
}
function tokenize(pattern) {
    return fastTokenizer(pattern, isAllowed, false);
}
function createFuzzySignature(pattern) {
    return compactTokens(new Uint32Array(tokenize(pattern)));
}

function isAnchoredByHostname(filterHostname, hostname) {
    if (filterHostname.length === 0) {
        return true;
    }
    if (filterHostname.length > hostname.length) {
        return false;
    }
    var matchIndex = hostname.indexOf(filterHostname);
    if (matchIndex === -1) {
        return false;
    }
    return ((matchIndex === 0 && (hostname.length === filterHostname.length ||
        filterHostname[filterHostname.length - 1] === '.' ||
        hostname[filterHostname.length] === '.')) ||
        ((hostname[matchIndex - 1] === '.' || filterHostname[0] === '.') && ((hostname.length - matchIndex) === filterHostname.length ||
            filterHostname[filterHostname.length - 1] === '.' ||
            hostname[matchIndex + filterHostname.length] === '.')));
}
function getUrlAfterHostname(url, hostname) {
    return url.substring(url.indexOf(hostname) + hostname.length);
}
function checkPatternFuzzyFilter(filter, request) {
    var signature = filter.getFuzzySignature();
    if (request.fuzzySignature === undefined) {
        request.fuzzySignature = createFuzzySignature(request.url);
    }
    var requestSignature = request.fuzzySignature;
    if (signature.length > requestSignature.length) {
        return false;
    }
    var lastIndex = 0;
    for (var i = 0; i < signature.length; i += 1) {
        var c = signature[i];
        var j = requestSignature.indexOf(c, lastIndex);
        if (j === -1) {
            return false;
        }
        lastIndex = j + 1;
    }
    return true;
}
function checkPatternPlainFilter(filter, request) {
    var url = request.url;
    return url.indexOf(filter.getFilter()) !== -1;
}
function checkPatternRightAnchorFilter(filter, request) {
    var url = request.url;
    return url.endsWith(filter.getFilter());
}
function checkPatternLeftAnchorFilter(filter, request) {
    var url = request.url;
    return fastStartsWith(url, filter.getFilter());
}
function checkPatternLeftRightAnchorFilter(filter, request) {
    var url = request.url;
    return url === filter.getFilter();
}
function checkPatternRegexFilter(filter, request) {
    var url = request.url;
    return filter.getRegex().test(url);
}
function checkPatternHostnameAnchorRegexFilter(filter, request) {
    var url = request.url, hostname = request.hostname;
    if (isAnchoredByHostname(filter.getHostname(), hostname)) {
        var urlAfterHostname = getUrlAfterHostname(url, filter.getHostname());
        return checkPatternRegexFilter(filter, __assign({}, request, { url: urlAfterHostname }));
    }
    return false;
}
function checkPatternHostnameRightAnchorFilter(filter, request) {
    var url = request.url, hostname = request.hostname;
    if (isAnchoredByHostname(filter.getHostname(), hostname)) {
        var urlAfterHostname = getUrlAfterHostname(url, filter.getHostname());
        return filter.getFilter() === urlAfterHostname;
    }
    return false;
}
function checkPatternHostnameAnchorFilter(filter, request) {
    var url = request.url, hostname = request.hostname;
    if (isAnchoredByHostname(filter.getHostname(), hostname)) {
        var urlAfterHostname = getUrlAfterHostname(url, filter.getHostname());
        return fastStartsWith(urlAfterHostname, filter.getFilter());
    }
    return false;
}
function checkPatternHostnameAnchorFuzzyFilter(filter, request) {
    var hostname = request.hostname;
    if (isAnchoredByHostname(filter.getHostname(), hostname)) {
        return checkPatternFuzzyFilter(filter, request);
    }
    return false;
}
function checkPattern(filter, request) {
    if (filter.isHostnameAnchor()) {
        if (filter.isRegex()) {
            return checkPatternHostnameAnchorRegexFilter(filter, request);
        }
        else if (filter.isRightAnchor()) {
            return checkPatternHostnameRightAnchorFilter(filter, request);
        }
        else if (filter.isFuzzy()) {
            return checkPatternHostnameAnchorFuzzyFilter(filter, request);
        }
        return checkPatternHostnameAnchorFilter(filter, request);
    }
    else if (filter.isRegex()) {
        return checkPatternRegexFilter(filter, request);
    }
    else if (filter.isLeftAnchor() && filter.isRightAnchor()) {
        return checkPatternLeftRightAnchorFilter(filter, request);
    }
    else if (filter.isLeftAnchor()) {
        return checkPatternLeftAnchorFilter(filter, request);
    }
    else if (filter.isRightAnchor()) {
        return checkPatternRightAnchorFilter(filter, request);
    }
    else if (filter.isFuzzy()) {
        return checkPatternFuzzyFilter(filter, request);
    }
    return checkPatternPlainFilter(filter, request);
}
function checkOptions(filter, request) {
    if (!filter.isCptAllowed(request.cpt)) {
        return false;
    }
    var sHost = request.sourceHostname;
    var sHostGD = request.sourceGD;
    var hostGD = request.hostGD;
    var isFirstParty = sHostGD === hostGD;
    if (!filter.firstParty() && isFirstParty) {
        return false;
    }
    if (!filter.thirdParty() && !isFirstParty) {
        return false;
    }
    if (filter.hasOptDomains()) {
        var optDomains = filter.getOptDomains();
        if (optDomains.size > 0 &&
            !(optDomains.has(sHostGD) || optDomains.has(sHost))) {
            return false;
        }
    }
    if (filter.hasOptNotDomains()) {
        var optNotDomains = filter.getOptNotDomains();
        if (optNotDomains.size > 0 &&
            (optNotDomains.has(sHostGD) || optNotDomains.has(sHost))) {
            return false;
        }
    }
    return true;
}
function matchNetworkFilter(filter, request) {
    return checkOptions(filter, request) && checkPattern(filter, request);
}

var FROM_ANY = 1 |
    2 |
    4 |
    8 |
    16 |
    32 |
    64 |
    128 |
    256 |
    512 |
    1024 |
    2048 |
    4096 |
    8192 |
    16384 |
    32768 |
    65536;
var CPT_TO_MASK = {
    1: 16,
    2: 64,
    3: 1,
    4: 128,
    5: 4,
    7: 256,
    10: 32,
    11: 1024,
    12: 8,
    13: 4096,
    14: 8192,
    15: 2,
    16: 512,
    17: 65536,
    18: 16384,
    19: 32768,
    20: 2048,
    21: 1
};
var SEPARATOR = /[/^*]/;
function compileRegex(filterStr, isRightAnchor, isLeftAnchor, matchCase) {
    var filter = filterStr;
    filter = filter.replace(/([|.$+?{}()[\]\\])/g, '\\$1');
    filter = filter.replace(/\*/g, '.*');
    filter = filter.replace(/\^/g, '(?:[^\\w\\d_.%-]|$)');
    if (isRightAnchor) {
        filter = filter + "$";
    }
    if (isLeftAnchor) {
        filter = "^" + filter;
    }
    if (matchCase) {
        return new RegExp(filter);
    }
    return new RegExp(filter, 'i');
}
function parseDomainsOption(domains) {
    return new Set(domains ? domains.split('|') : []);
}
var NetworkFilter = (function () {
    function NetworkFilter(_a) {
        var mask = _a.mask, filter = _a.filter, optDomains = _a.optDomains, optNotDomains = _a.optNotDomains, redirect = _a.redirect, hostname = _a.hostname, id = _a.id;
        this.id = id;
        this.mask = mask;
        this.filter = filter;
        this.optDomains = optDomains;
        this.optNotDomains = optNotDomains;
        this.redirect = redirect;
        this.hostname = hostname;
        this.fuzzySignature = null;
        this.optDomainsSet = null;
        this.optNotDomainsSet = null;
        this.regex = null;
        this.rawLine = null;
    }
    NetworkFilter.prototype.isCosmeticFilter = function () {
        return false;
    };
    NetworkFilter.prototype.isNetworkFilter = function () {
        return true;
    };
    NetworkFilter.prototype.toString = function () {
        var filter = '';
        if (this.isException()) {
            filter += '@@';
        }
        if (this.isHostnameAnchor()) {
            filter += '||';
        }
        if (this.isLeftAnchor()) {
            filter += '|';
        }
        if (this.hasHostname()) {
            filter += this.getHostname();
            filter += '^';
        }
        if (!this.isRegex()) {
            filter += this.getFilter();
        }
        else {
            filter += this.getRegex().source;
        }
        var options = [];
        if (!this.fromAny()) {
            if (this.isFuzzy()) {
                options.push('fuzzy');
            }
            if (this.fromImage()) {
                options.push('image');
            }
            if (this.fromMedia()) {
                options.push('media');
            }
            if (this.fromObject()) {
                options.push('object');
            }
            if (this.fromObjectSubrequest()) {
                options.push('object-subrequest');
            }
            if (this.fromOther()) {
                options.push('other');
            }
            if (this.fromPing()) {
                options.push('ping');
            }
            if (this.fromScript()) {
                options.push('script');
            }
            if (this.fromStylesheet()) {
                options.push('stylesheet');
            }
            if (this.fromSubdocument()) {
                options.push('subdocument');
            }
            if (this.fromWebsocket()) {
                options.push('websocket');
            }
            if (this.fromXmlHttpRequest()) {
                options.push('xmlhttprequest');
            }
            if (this.fromFont()) {
                options.push('font');
            }
        }
        if (this.isImportant()) {
            options.push('important');
        }
        if (this.isRedirect()) {
            options.push("redirect=" + this.getRedirect());
        }
        if (this.firstParty() !== this.thirdParty()) {
            if (this.firstParty()) {
                options.push('first-party');
            }
            if (this.thirdParty()) {
                options.push('third-party');
            }
        }
        if (this.hasOptDomains() || this.hasOptNotDomains()) {
            var domains_1 = __spread(this.getOptDomains());
            this.getOptNotDomains().forEach(function (nd) { return domains_1.push("~" + nd); });
            options.push("domain=" + domains_1.join('|'));
        }
        if (options.length > 0) {
            filter += "$" + options.join(',');
        }
        if (this.isRightAnchor()) {
            filter += '|';
        }
        return filter;
    };
    NetworkFilter.prototype.hasFilter = function () {
        return !!this.filter;
    };
    NetworkFilter.prototype.hasOptNotDomains = function () {
        return !!this.optNotDomains;
    };
    NetworkFilter.prototype.getOptNotDomains = function () {
        this.optNotDomainsSet =
            this.optNotDomainsSet || parseDomainsOption(this.optNotDomains);
        return this.optNotDomainsSet;
    };
    NetworkFilter.prototype.hasOptDomains = function () {
        return !!this.optDomains;
    };
    NetworkFilter.prototype.getOptDomains = function () {
        this.optDomainsSet =
            this.optDomainsSet || parseDomainsOption(this.optDomains);
        return this.optDomainsSet;
    };
    NetworkFilter.prototype.getMask = function () {
        return this.mask;
    };
    NetworkFilter.prototype.isRedirect = function () {
        return !!this.redirect;
    };
    NetworkFilter.prototype.getRedirect = function () {
        return this.redirect;
    };
    NetworkFilter.prototype.hasHostname = function () {
        return !!this.hostname;
    };
    NetworkFilter.prototype.getHostname = function () {
        return this.hostname;
    };
    NetworkFilter.prototype.getFilter = function () {
        return this.filter;
    };
    NetworkFilter.prototype.setRegex = function (re) {
        this.regex = re;
        this.mask = setBit(this.mask, 16777216);
        this.mask = clearBit(this.mask, 8388608);
    };
    NetworkFilter.prototype.getRegex = function () {
        if (this.regex === null) {
            this.regex = compileRegex(this.filter, this.isRightAnchor(), this.isLeftAnchor(), this.matchCase());
        }
        return this.regex;
    };
    NetworkFilter.prototype.getFuzzySignature = function () {
        if (this.fuzzySignature === null) {
            this.fuzzySignature = createFuzzySignature(this.filter);
        }
        return this.fuzzySignature;
    };
    NetworkFilter.prototype.getTokens = function () {
        return [tokenize(this.filter).concat(tokenize(this.hostname))];
    };
    NetworkFilter.prototype.isCptAllowed = function (cpt) {
        var mask = CPT_TO_MASK[cpt];
        if (mask !== undefined) {
            return getBit(this.mask, mask);
        }
        return false;
    };
    NetworkFilter.prototype.isFuzzy = function () {
        return getBit(this.mask, 524288);
    };
    NetworkFilter.prototype.isException = function () {
        return getBit(this.mask, 268435456);
    };
    NetworkFilter.prototype.isHostnameAnchor = function () {
        return getBit(this.mask, 134217728);
    };
    NetworkFilter.prototype.isRightAnchor = function () {
        return getBit(this.mask, 67108864);
    };
    NetworkFilter.prototype.isLeftAnchor = function () {
        return getBit(this.mask, 33554432);
    };
    NetworkFilter.prototype.matchCase = function () {
        return getBit(this.mask, 262144);
    };
    NetworkFilter.prototype.isImportant = function () {
        return getBit(this.mask, 131072);
    };
    NetworkFilter.prototype.isRegex = function () {
        return getBit(this.mask, 16777216);
    };
    NetworkFilter.prototype.isPlain = function () {
        return !getBit(this.mask, 16777216);
    };
    NetworkFilter.prototype.isHostname = function () {
        return getBit(this.mask, 4194304);
    };
    NetworkFilter.prototype.fromAny = function () {
        return (this.mask & FROM_ANY) === FROM_ANY;
    };
    NetworkFilter.prototype.thirdParty = function () {
        return getBit(this.mask, 1048576);
    };
    NetworkFilter.prototype.firstParty = function () {
        return getBit(this.mask, 2097152);
    };
    NetworkFilter.prototype.fromImage = function () {
        return getBit(this.mask, 1);
    };
    NetworkFilter.prototype.fromMedia = function () {
        return getBit(this.mask, 2);
    };
    NetworkFilter.prototype.fromObject = function () {
        return getBit(this.mask, 4);
    };
    NetworkFilter.prototype.fromObjectSubrequest = function () {
        return getBit(this.mask, 8);
    };
    NetworkFilter.prototype.fromOther = function () {
        return getBit(this.mask, 16);
    };
    NetworkFilter.prototype.fromPing = function () {
        return getBit(this.mask, 32);
    };
    NetworkFilter.prototype.fromScript = function () {
        return getBit(this.mask, 64);
    };
    NetworkFilter.prototype.fromStylesheet = function () {
        return getBit(this.mask, 128);
    };
    NetworkFilter.prototype.fromSubdocument = function () {
        return getBit(this.mask, 256);
    };
    NetworkFilter.prototype.fromWebsocket = function () {
        return getBit(this.mask, 512);
    };
    NetworkFilter.prototype.fromXmlHttpRequest = function () {
        return getBit(this.mask, 1024);
    };
    NetworkFilter.prototype.fromFont = function () {
        return getBit(this.mask, 8192);
    };
    return NetworkFilter;
}());
function setNetworkMask(mask, m, value) {
    if (value === true) {
        return setBit(mask, m);
    }
    return clearBit(mask, m);
}
function checkIsRegex(filter, start, end) {
    var starIndex = filter.indexOf('*', start);
    var separatorIndex = filter.indexOf('^', start);
    return ((starIndex !== -1 && starIndex < end) ||
        (separatorIndex !== -1 && separatorIndex < end));
}
function parseNetworkFilter(rawLine) {
    var line = rawLine;
    var mask = 1048576 | 2097152;
    var cptMaskPositive = 0;
    var cptMaskNegative = FROM_ANY;
    var filter = null;
    var hostname = null;
    var optDomains = '';
    var optNotDomains = '';
    var redirect = '';
    var filterIndexStart = 0;
    var filterIndexEnd = line.length;
    if (fastStartsWith(line, '@@')) {
        filterIndexStart += 2;
        mask = setBit(mask, 268435456);
    }
    var optionsIndex = line.indexOf('$', filterIndexStart);
    if (optionsIndex !== -1) {
        filterIndexEnd = optionsIndex;
        var rawOptions = line.substr(optionsIndex + 1);
        var options = rawOptions.split(',');
        for (var i = 0; i < options.length; i += 1) {
            var rawOption = options[i];
            var negation = false;
            var option = rawOption;
            if (fastStartsWith(option, '~')) {
                negation = true;
                option = option.substr(1);
            }
            else {
                negation = false;
            }
            var optionValues = [];
            if (option.indexOf('=') !== -1) {
                var optionAndValues = option.split('=', 2);
                option = optionAndValues[0];
                optionValues = optionAndValues[1].split('|');
            }
            switch (option) {
                case 'domain': {
                    var optDomainsArray = [];
                    var optNotDomainsArray = [];
                    for (var j = 0; j < optionValues.length; j += 1) {
                        var value = optionValues[j];
                        if (value) {
                            if (fastStartsWith(value, '~')) {
                                optNotDomainsArray.push(value.substr(1));
                            }
                            else {
                                optDomainsArray.push(value);
                            }
                        }
                    }
                    if (optDomainsArray.length > 0) {
                        optDomains = optDomainsArray.join('|');
                    }
                    if (optNotDomainsArray.length > 0) {
                        optNotDomains = optNotDomainsArray.join('|');
                    }
                    break;
                }
                case 'important':
                    if (negation) {
                        return null;
                    }
                    mask = setBit(mask, 131072);
                    break;
                case 'match-case':
                    if (negation) {
                        return null;
                    }
                    mask = setBit(mask, 262144);
                    break;
                case 'third-party':
                    if (negation) {
                        mask = clearBit(mask, 1048576);
                    }
                    else {
                        mask = clearBit(mask, 2097152);
                    }
                    break;
                case 'first-party':
                    if (negation) {
                        mask = clearBit(mask, 2097152);
                    }
                    else {
                        mask = clearBit(mask, 1048576);
                    }
                    break;
                case 'fuzzy':
                    mask = setBit(mask, 524288);
                    break;
                case 'collapse':
                    break;
                case 'redirect':
                    if (negation) {
                        return null;
                    }
                    if (optionValues.length === 0) {
                        return null;
                    }
                    redirect = optionValues[0];
                    break;
                default: {
                    var optionMask = 0;
                    switch (option) {
                        case 'image':
                            optionMask = 1;
                            break;
                        case 'media':
                            optionMask = 2;
                            break;
                        case 'object':
                            optionMask = 4;
                            break;
                        case 'object-subrequest':
                            optionMask = 8;
                            break;
                        case 'other':
                            optionMask = 16;
                            break;
                        case 'ping':
                            optionMask = 32;
                            break;
                        case 'script':
                            optionMask = 64;
                            break;
                        case 'stylesheet':
                            optionMask = 128;
                            break;
                        case 'subdocument':
                            optionMask = 256;
                            break;
                        case 'xmlhttprequest':
                            optionMask = 1024;
                            break;
                        case 'websocket':
                            optionMask = 512;
                            break;
                        case 'font':
                            optionMask = 8192;
                            break;
                        default:
                            return null;
                    }
                    if (optionMask === 0) {
                        return null;
                    }
                    if (negation) {
                        cptMaskNegative = clearBit(cptMaskNegative, optionMask);
                    }
                    else {
                        cptMaskPositive = setBit(cptMaskPositive, optionMask);
                    }
                    break;
                }
            }
        }
    }
    if (cptMaskPositive === 0) {
        mask |= cptMaskNegative;
    }
    else if (cptMaskNegative === FROM_ANY) {
        mask |= cptMaskPositive;
    }
    else {
        mask |= cptMaskPositive & cptMaskNegative;
    }
    if (fastStartsWith(line, '127.0.0.1')) {
        hostname = line.substr(line.lastIndexOf(' ') + 1);
        filter = '';
        mask = clearBit(mask, 16777216);
        mask = setBit(mask, 4194304);
        mask = setBit(mask, 134217728);
    }
    else {
        if (line[filterIndexEnd - 1] === '|') {
            mask = setBit(mask, 67108864);
            filterIndexEnd -= 1;
        }
        if (fastStartsWithFrom(line, '||', filterIndexStart)) {
            mask = setBit(mask, 134217728);
            filterIndexStart += 2;
        }
        else if (line[filterIndexStart] === '|') {
            mask = setBit(mask, 33554432);
            filterIndexStart += 1;
        }
        if (line.charAt(filterIndexEnd - 1) === '*' &&
            filterIndexEnd - filterIndexStart > 1) {
            filterIndexEnd -= 1;
        }
        var isRegex = checkIsRegex(line, filterIndexStart, filterIndexEnd);
        mask = setNetworkMask(mask, 16777216, isRegex);
        var isHostnameAnchor = getBit(mask, 134217728);
        if (!isRegex && isHostnameAnchor) {
            var slashIndex = line.indexOf('/', filterIndexStart);
            if (slashIndex !== -1) {
                hostname = line.slice(filterIndexStart, slashIndex);
                filterIndexStart = slashIndex;
            }
            else {
                hostname = line.slice(filterIndexStart, filterIndexEnd);
                filter = '';
            }
        }
        else if (isRegex && isHostnameAnchor) {
            var firstSeparator = line.search(SEPARATOR);
            if (firstSeparator !== -1) {
                hostname = line.slice(filterIndexStart, firstSeparator);
                filterIndexStart = firstSeparator;
                if (filterIndexEnd - filterIndexStart === 1 &&
                    line.charAt(filterIndexStart) === '^') {
                    filter = '';
                    mask = clearBit(mask, 16777216);
                }
                else {
                    mask = setNetworkMask(mask, 16777216, checkIsRegex(line, filterIndexStart, filterIndexEnd));
                }
            }
        }
    }
    if (filter === null) {
        filter = line.slice(filterIndexStart, filterIndexEnd).toLowerCase();
    }
    var finalHostname = '';
    if (hostname !== null) {
        finalHostname = hostname;
    }
    var finalFilter = '';
    if (filter !== null) {
        finalFilter = filter;
    }
    if (getBit(mask, 134217728) &&
        fastStartsWith(finalHostname, 'www.')) {
        finalHostname = finalHostname.slice(4);
    }
    if (finalHostname !== '') {
        finalHostname = finalHostname.toLowerCase();
    }
    var id = fastHash(line);
    return new NetworkFilter({
        filter: finalFilter,
        hostname: finalHostname,
        id: id,
        mask: mask,
        optDomains: optDomains,
        optNotDomains: optNotDomains,
        redirect: redirect
    });
}

function mkRequest(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.url, url = _c === void 0 ? '' : _c, _d = _b.hostname, hostname = _d === void 0 ? '' : _d, _e = _b.domain, domain = _e === void 0 ? '' : _e, _f = _b.sourceHostname, sourceHostname = _f === void 0 ? '' : _f, _g = _b.sourceDomain, sourceDomain = _g === void 0 ? '' : _g, _h = _b.cpt, cpt = _h === void 0 ? 6 : _h;
    return {
        cpt: cpt,
        tokens: tokenize(url),
        sourceGD: sourceDomain,
        sourceHostname: sourceHostname,
        hostGD: domain,
        hostname: hostname,
        url: url.toLowerCase(),
        fuzzySignature: undefined
    };
}

export { ReverseIndex, matchNetworkFilter, parseNetworkFilter, mkRequest, tokenize, createFuzzySignature, compactTokens, hasEmptyIntersection, mergeCompactSets };
