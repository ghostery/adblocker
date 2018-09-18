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

function injectCSSRule(rule, doc) {
    var css = doc.createElement('style');
    css.type = 'text/css';
    css.id = 'cliqz-adblokcer-css-rules';
    var parent = doc.head || doc.documentElement;
    parent.appendChild(css);
    css.appendChild(doc.createTextNode(rule));
}
function injectScript(s, doc) {
    var autoRemoveScript = "\n    try {\n      " + s + "\n    } catch (ex) { }\n\n    (function() {\n      var currentScript = document.currentScript;\n      var parent = currentScript && currentScript.parentNode;\n\n      if (parent) {\n        parent.removeChild(currentScript);\n      }\n    })();\n  ";
    var script = doc.createElement('script');
    script.type = 'text/javascript';
    script.id = 'cliqz-adblocker-script';
    script.appendChild(doc.createTextNode(autoRemoveScript));
    var parent = doc.head || doc.documentElement;
    parent.appendChild(script);
}
function blockScript(filter, doc) {
    var filterRE = new RegExp(filter);
    doc.addEventListener('beforescriptexecute', function (ev) {
        var target = ev.target;
        if (target.textContent && filterRE.test(target.textContent)) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    });
}
function overrideUserAgent() {
    var script = function () {
        Object.defineProperty(navigator, 'userAgent', {
            get: function () { return 'Mozilla/5.0 Gecko Firefox'; }
        });
    };
    injectScript("(" + script.toString() + ")()", window.document);
}
var CosmeticInjection = (function () {
    function CosmeticInjection(window, backgroundAction) {
        this.window = window;
        this.backgroundAction = backgroundAction;
        this.mutationObserver = null;
        this.injectedRules = new Set();
        this.injectedScripts = new Set();
        this.blockedScripts = new Set();
        this.observedNodes = new Set();
        this.backgroundAction('getCosmeticsForDomain');
        this.onMutation([{ target: this.window.document.body }]);
        this.startObserving();
    }
    CosmeticInjection.prototype.unload = function () {
        if (this.mutationObserver) {
            try {
                this.mutationObserver.disconnect();
            }
            catch (e) {
            }
        }
    };
    CosmeticInjection.prototype.handleResponseFromBackground = function (_a) {
        var active = _a.active, scripts = _a.scripts, blockedScripts = _a.blockedScripts, styles = _a.styles;
        if (!active) {
            this.unload();
            return;
        }
        for (var i = 0; i < scripts.length; i += 1) {
            var script = scripts[i];
            if (!this.injectedScripts.has(script)) {
                injectScript(script, this.window.document);
                this.injectedScripts.add(script);
            }
        }
        for (var i = 0; i < blockedScripts.length; i += 1) {
            var script = blockedScripts[i];
            if (!this.blockedScripts.has(script)) {
                blockScript(script, this.window.document);
                this.blockedScripts.add(script);
            }
        }
        this.handleRules(styles);
    };
    CosmeticInjection.prototype.handleRules = function (rules) {
        var rulesToInject = [];
        for (var i = 0; i < rules.length; i += 1) {
            var rule = rules[i];
            if (!this.injectedRules.has(rule)) {
                try {
                    if (!this.window.document.querySelector(rule)) {
                        continue;
                    }
                }
                catch (e) {
                    continue;
                }
                this.injectedRules.add(rule);
                rulesToInject.push(" :root " + rule);
            }
        }
        if (rulesToInject.length > 0) {
            injectCSSRule(rulesToInject.join(' ,') + " {display:none !important;}", this.window.document);
        }
    };
    CosmeticInjection.prototype.onMutation = function (mutations) {
        var _this = this;
        var targets = new Set(mutations.map(function (m) { return m.target; }).filter(function (t) { return t; }));
        if (targets.size > 100) {
            targets = new Set([this.window.document.body]);
        }
        if (targets.size === 0) {
            return;
        }
        var nodeInfo = new Set();
        targets.forEach(function (target) {
            var nodes = target.querySelectorAll('*');
            for (var i = 0; i < nodes.length; i += 1) {
                var node = nodes[i];
                if (node.hidden) {
                    continue;
                }
                if (node.id) {
                    var selector = "#" + node.id;
                    if (!_this.observedNodes.has(selector)) {
                        nodeInfo.add(selector);
                        _this.observedNodes.add(selector);
                    }
                }
                if (node.tagName) {
                    var selector = node.tagName;
                    if (!_this.observedNodes.has(selector)) {
                        nodeInfo.add(selector);
                        _this.observedNodes.add(selector);
                    }
                }
                if (node.className && node.className.split) {
                    node.className.split(' ').forEach(function (name) {
                        var selector = "." + name;
                        if (!_this.observedNodes.has(selector)) {
                            nodeInfo.add(selector);
                            _this.observedNodes.add(selector);
                        }
                    });
                }
            }
        });
        if (nodeInfo.size > 0) {
            this.backgroundAction('getCosmeticsForNodes', [__spread(nodeInfo)]);
        }
    };
    CosmeticInjection.prototype.startObserving = function () {
        var _this = this;
        if (this.window.MutationObserver !== undefined) {
            this.mutationObserver = new this.window.MutationObserver(function (mutations) {
                return _this.onMutation(mutations);
            });
            this.mutationObserver.observe(this.window.document, {
                childList: true,
                subtree: true
            });
        }
    };
    return CosmeticInjection;
}());

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
function isAllowedCSS(ch) {
    return (isDigit(ch) ||
        isAlpha(ch) ||
        ch === 95 ||
        ch === 45 ||
        ch === 46 ||
        ch === 35);
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
function tokenizeCSS(pattern) {
    return fastTokenizer(pattern, isAllowedCSS, true);
}
function createFuzzySignature(pattern) {
    return compactTokens(new Uint32Array(tokenize(pattern)));
}

var CosmeticFilter = (function () {
    function CosmeticFilter(_a) {
        var mask = _a.mask, selector = _a.selector, hostnames = _a.hostnames, id = _a.id;
        this.id = id;
        this.mask = mask;
        this.selector = selector;
        this.hostnames = hostnames;
        this.hostnamesArray = null;
        this.rawLine = null;
    }
    CosmeticFilter.prototype.isCosmeticFilter = function () {
        return true;
    };
    CosmeticFilter.prototype.isNetworkFilter = function () {
        return false;
    };
    CosmeticFilter.prototype.toString = function () {
        var filter = '';
        if (this.hasHostnames()) {
            filter += this.hostnames;
        }
        if (this.isUnhide()) {
            filter += '#@#';
        }
        else {
            filter += '##';
        }
        if (this.isScriptInject()) {
            filter += 'script:inject(';
            filter += this.selector;
            filter += ')';
        }
        else if (this.isScriptBlock()) {
            filter += 'script:contains(';
            filter += this.selector;
            filter += ')';
        }
        else {
            filter += this.selector;
        }
        return filter;
    };
    CosmeticFilter.prototype.getTokens = function () {
        return [this.getTokensSelector()];
    };
    CosmeticFilter.prototype.getTokensSelector = function () {
        if (this.isScriptInject() || this.isScriptBlock()) {
            return [];
        }
        var sepIndex = this.selector.lastIndexOf('>');
        if (sepIndex !== -1) {
            return tokenizeCSS(this.selector.substr(sepIndex));
        }
        return tokenizeCSS(this.selector);
    };
    CosmeticFilter.prototype.getSelector = function () {
        return this.selector;
    };
    CosmeticFilter.prototype.hasHostnames = function () {
        return !!this.hostnames;
    };
    CosmeticFilter.prototype.getHostnames = function () {
        if (this.hostnamesArray === null) {
            if (this.hasHostnames()) {
                this.hostnamesArray = this.hostnames.split(',').sort(function (h1, h2) {
                    if (h1.length > h2.length) {
                        return -1;
                    }
                    else if (h1.length < h2.length) {
                        return 1;
                    }
                    return 0;
                });
            }
            else {
                this.hostnamesArray = [];
            }
        }
        return this.hostnamesArray;
    };
    CosmeticFilter.prototype.isUnhide = function () {
        return getBit(this.mask, 1);
    };
    CosmeticFilter.prototype.isScriptInject = function () {
        return getBit(this.mask, 2);
    };
    CosmeticFilter.prototype.isScriptBlock = function () {
        return getBit(this.mask, 4);
    };
    return CosmeticFilter;
}());
function parseCosmeticFilter(line) {
    var mask = 0;
    var selector = '';
    var hostnames = '';
    var sharpIndex = line.indexOf('#');
    var afterSharpIndex = sharpIndex + 1;
    var suffixStartIndex = afterSharpIndex + 1;
    if (line[afterSharpIndex] === '@') {
        mask = setBit(mask, 1);
        suffixStartIndex += 1;
    }
    if (sharpIndex > 0) {
        hostnames = line.substring(0, sharpIndex);
    }
    selector = line.substr(suffixStartIndex);
    if (fastStartsWith(selector, 'script:')) {
        var scriptMethodIndex = 'script:'.length;
        var scriptSelectorIndexStart = scriptMethodIndex;
        var scriptSelectorIndexEnd = selector.length - 1;
        if (fastStartsWithFrom(selector, 'inject(', scriptMethodIndex)) {
            mask = setBit(mask, 2);
            scriptSelectorIndexStart += 'inject('.length;
        }
        else if (fastStartsWithFrom(selector, 'contains(', scriptMethodIndex)) {
            mask = setBit(mask, 4);
            scriptSelectorIndexStart += 'contains('.length;
            if (selector[scriptSelectorIndexStart] === '/' &&
                selector[scriptSelectorIndexEnd - 1] === '/') {
                scriptSelectorIndexStart += 1;
                scriptSelectorIndexEnd -= 1;
            }
        }
        selector = selector.substring(scriptSelectorIndexStart, scriptSelectorIndexEnd);
    }
    if (selector === null ||
        selector.length === 0 ||
        selector.endsWith('}') ||
        selector.indexOf('##') !== -1 ||
        (getBit(mask, 1) && hostnames.length === 0)) {
        return null;
    }
    var id = fastHash(line);
    return new CosmeticFilter({
        hostnames: hostnames,
        id: id,
        mask: mask,
        selector: selector
    });
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

var SPACE = /\s/;
function detectFilterType(line) {
    if (line.length === 1 ||
        line.charAt(0) === '!' ||
        (line.charAt(0) === '#' && SPACE.test(line.charAt(1))) ||
        fastStartsWith(line, '[Adblock')) {
        return 0;
    }
    if (fastStartsWith(line, '|') || fastStartsWith(line, '@@|')) {
        return 1;
    }
    if (line.indexOf('$$') !== -1) {
        return 0;
    }
    var sharpIndex = line.indexOf('#');
    if (sharpIndex > -1) {
        var afterSharpIndex = sharpIndex + 1;
        if (fastStartsWithFrom(line, '@$#', afterSharpIndex) ||
            fastStartsWithFrom(line, '@%#', afterSharpIndex) ||
            fastStartsWithFrom(line, '%#', afterSharpIndex) ||
            fastStartsWithFrom(line, '$#', afterSharpIndex)) {
            return 0;
        }
        else if (fastStartsWithFrom(line, '#', afterSharpIndex) ||
            fastStartsWithFrom(line, '@#', afterSharpIndex)) {
            return 2;
        }
    }
    return 1;
}
function f(strings) {
    var rawFilter = strings.raw[0];
    var filterType = detectFilterType(rawFilter);
    if (filterType === 1) {
        return parseNetworkFilter(rawFilter);
    }
    else if (filterType === 2) {
        return parseCosmeticFilter(rawFilter);
    }
    return null;
}
function parseList(data, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.loadNetworkFilters, loadNetworkFilters = _c === void 0 ? true : _c, _d = _b.loadCosmeticFilters, loadCosmeticFilters = _d === void 0 ? true : _d, _e = _b.debug, debug = _e === void 0 ? false : _e;
    var networkFilters = [];
    var cosmeticFilters = [];
    var lines = data.split('\n');
    for (var i = 0; i < lines.length; i += 1) {
        var line = lines[i].trim();
        if (line.length > 0) {
            var filterType = detectFilterType(line);
            if (filterType === 1 && loadNetworkFilters) {
                var filter = parseNetworkFilter(line);
                if (filter !== null) {
                    networkFilters.push(filter);
                    if (debug) {
                        filter.rawLine = line;
                    }
                }
            }
            else if (filterType === 2 && loadCosmeticFilters) {
                var filter = parseCosmeticFilter(line);
                if (filter !== null) {
                    cosmeticFilters.push(filter);
                    if (debug) {
                        filter.rawLine = line;
                    }
                }
            }
        }
    }
    return {
        cosmeticFilters: cosmeticFilters,
        networkFilters: networkFilters
    };
}
function parseJSResource(data) {
    var state = 'end';
    var tmpContent = '';
    var name = '';
    var type = '';
    var parsed = new Map();
    var lines = data.split('\n');
    lines.forEach(function (line) {
        var _a;
        var trimmed = line.trim();
        if (fastStartsWith(trimmed, '#')) {
            state = 'comment';
        }
        else if (!trimmed) {
            state = 'end';
        }
        else if (state !== 'content' &&
            !type &&
            trimmed.split(' ').length === 2) {
            state = 'title';
        }
        else {
            state = 'content';
        }
        switch (state) {
            case 'end':
                if (tmpContent) {
                    var map = parsed.get(type);
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
                _a = __read(trimmed.split(' '), 2), name = _a[0], type = _a[1];
                break;
            case 'content':
                tmpContent += trimmed + "\n";
                break;
            default:
        }
    });
    if (tmpContent) {
        var map = parsed.get(type);
        if (map === undefined) {
            map = new Map();
            parsed.set(type, map);
        }
        map.set(name, tmpContent);
    }
    return parsed;
}

const maxInt = 2147483647;
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128;
const delimiter = '-';
const regexPunycode = /^xn--/;
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
const errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};
const baseMinusTMin = base - tMin;
const floor = Math.floor;
function error(type) {
	throw new RangeError(errors[type]);
}
function map(array, fn) {
	const result = [];
	let length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}
function mapDomain(string, fn) {
	const parts = string.split('@');
	let result = '';
	if (parts.length > 1) {
		result = parts[0] + '@';
		string = parts[1];
	}
	string = string.replace(regexSeparators, '\x2E');
	const labels = string.split('.');
	const encoded = map(labels, fn).join('.');
	return result + encoded;
}
const basicToDigit = function(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};
const adapt = function(delta, numPoints, firstTime) {
	let k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (                       ; delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
const decode = function(input) {
	const output = [];
	const inputLength = input.length;
	let i = 0;
	let n = initialN;
	let bias = initialBias;
	let basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}
	for (let j = 0; j < basic; ++j) {
		if (input.charCodeAt(j) >= 0x80) {
			error('not-basic');
		}
		output.push(input.charCodeAt(j));
	}
	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength;                          ) {
		let oldi = i;
		for (let w = 1, k = base;                   ; k += base) {
			if (index >= inputLength) {
				error('invalid-input');
			}
			const digit = basicToDigit(input.charCodeAt(index++));
			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error('overflow');
			}
			i += digit * w;
			const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
			if (digit < t) {
				break;
			}
			const baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error('overflow');
			}
			w *= baseMinusT;
		}
		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);
		if (floor(i / out) > maxInt - n) {
			error('overflow');
		}
		n += floor(i / out);
		i %= out;
		output.splice(i++, 0, n);
	}
	return String.fromCodePoint(...output);
};
const toUnicode = function(input) {
	return mapDomain(input, function(string) {
		return regexPunycode.test(string)
			? decode(string.slice(4).toLowerCase())
			: string;
	});
};

function startsWith(str, prefix) {
    if (str.length < prefix.length) {
        return false;
    }
    var ceil = prefix.length;
    for (var i = 0; i < ceil; i += 1) {
        if (str[i] !== prefix[i]) {
            return false;
        }
    }
    return true;
}

function longestMatch(a, b) {
    if (a.index === -1) {
        return b;
    }
    else if (b.index === -1) {
        return a;
    }
    else if (a.index < b.index) {
        return a;
    }
    return b;
}
function insertInTrie(rule, trie) {
    var parts = rule.parts;
    var node = trie;
    for (var i = 0; i < parts.length; i += 1) {
        var part = parts[i];
        var nextNode = node[part];
        if (nextNode === undefined) {
            nextNode = Object.create(null);
            node[part] = nextNode;
        }
        node = nextNode;
    }
    node.$ = rule.isIcann ? 1 : 2;
    return trie;
}
function lookupInTrie(parts, trie, index, allowedMask) {
    var nextNode;
    var lookupResult = {
        index: -1,
        isIcann: false
    };
    if (trie.$ !== undefined && (trie.$ & allowedMask) !== 0) {
        lookupResult.index = index + 1;
        lookupResult.isIcann = trie.$ === 1;
    }
    if (index === -1) {
        return lookupResult;
    }
    nextNode = trie[parts[index]];
    if (nextNode !== undefined) {
        lookupResult = longestMatch(lookupResult, lookupInTrie(parts, nextNode, index - 1, allowedMask));
    }
    nextNode = trie['*'];
    if (nextNode !== undefined) {
        lookupResult = longestMatch(lookupResult, lookupInTrie(parts, nextNode, index - 1, allowedMask));
    }
    return lookupResult;
}
function hasPunycode(parts) {
    for (var i = 0; i < parts.length; i += 1) {
        if (startsWith(parts[i], 'xn--')) {
            return true;
        }
    }
    return false;
}
function decodePunycodeLabels(parts) {
    var decoded = parts.slice();
    for (var i = 0; i < parts.length; i += 1) {
        if (startsWith(parts[i], 'xn--')) {
            decoded[i] = toUnicode(parts[i]);
        }
    }
    return decoded;
}
var SuffixTrie = (function () {
    function SuffixTrie(rules) {
        this.exceptions = Object.create(null);
        this.rules = Object.create(null);
        for (var i = 0; i < rules.length; i += 1) {
            var rule = rules[i];
            if (rule.exception) {
                insertInTrie(rule, this.exceptions);
            }
            else {
                insertInTrie(rule, this.rules);
            }
        }
    }
    SuffixTrie.prototype.hasTld = function (value) {
        return this.rules[value] !== undefined;
    };
    SuffixTrie.prototype.suffixLookup = function (hostname, options) {
        var allowIcannDomains = options.allowIcannDomains;
        var allowPrivateDomains = options.allowPrivateDomains;
        var hostnameParts = hostname.split('.');
        var parts = hostnameParts;
        if (hasPunycode(parts)) {
            parts = decodePunycodeLabels(parts);
        }
        var allowedMask = 0;
        if (allowPrivateDomains === true) {
            allowedMask |= 2;
        }
        if (allowIcannDomains === true) {
            allowedMask |= 1;
        }
        var lookupResult = lookupInTrie(parts, this.rules, parts.length - 1, allowedMask);
        if (lookupResult.index === -1) {
            return null;
        }
        var exceptionLookupResult = lookupInTrie(parts, this.exceptions, parts.length - 1, allowedMask);
        if (exceptionLookupResult.index !== -1) {
            return {
                isIcann: exceptionLookupResult.isIcann,
                publicSuffix: hostnameParts.slice(exceptionLookupResult.index + 1).join('.')
            };
        }
        return {
            isIcann: lookupResult.isIcann,
            publicSuffix: hostnameParts.slice(lookupResult.index).join('.')
        };
    };
    return SuffixTrie;
}());

function parse(body) {
    var beginPrivateDomains = '// ===BEGIN PRIVATE DOMAINS===';
    var lines = body.split('\n');
    var rules = [];
    var isIcann = true;
    for (var i = 0; i < lines.length; i += 1) {
        var line = lines[i].trim();
        if (line.length === 0) {
            continue;
        }
        if (startsWith(line, '//')) {
            if (startsWith(line, beginPrivateDomains)) {
                isIcann = false;
            }
            continue;
        }
        var spaceIndex = line.indexOf(' ');
        if (spaceIndex !== -1) {
            line = line.substr(0, spaceIndex);
        }
        var exception = false;
        if (line[0] === '!') {
            line = line.substr(1);
            exception = true;
        }
        var parts = line.split('.').reverse();
        for (var j = 0; j < parts.length; j += 1) {
            var part = parts[j];
            if (startsWith(part, 'xn--')) {
                parts[j] = toUnicode(part);
            }
        }
        rules.push({
            exception: exception,
            isIcann: isIcann,
            parts: parts,
            source: lines[i]
        });
    }
    return new SuffixTrie(rules);
}

function getRules() {
    return parse("\n// This Source Code Form is subject to the terms of the Mozilla Public\n// License, v. 2.0. If a copy of the MPL was not distributed with this\n// file, You can obtain one at https://mozilla.org/MPL/2.0/.\n\n// Please pull this list from, and only from https://publicsuffix.org/list/public_suffix_list.dat,\n// rather than any other VCS sites. Pulling from any other URL is not guaranteed to be supported.\n\n// Instructions on pulling and using this list can be found at https://publicsuffix.org/list/.\n\n// ===BEGIN ICANN DOMAINS===\n\n// ac : https://en.wikipedia.org/wiki/.ac\nac\ncom.ac\nedu.ac\ngov.ac\nnet.ac\nmil.ac\norg.ac\n\n// ad : https://en.wikipedia.org/wiki/.ad\nad\nnom.ad\n\n// ae : https://en.wikipedia.org/wiki/.ae\n// see also: \"Domain Name Eligibility Policy\" at http://www.aeda.ae/eng/aepolicy.php\nae\nco.ae\nnet.ae\norg.ae\nsch.ae\nac.ae\ngov.ae\nmil.ae\n\n// aero : see https://www.information.aero/index.php?id=66\naero\naccident-investigation.aero\naccident-prevention.aero\naerobatic.aero\naeroclub.aero\naerodrome.aero\nagents.aero\naircraft.aero\nairline.aero\nairport.aero\nair-surveillance.aero\nairtraffic.aero\nair-traffic-control.aero\nambulance.aero\namusement.aero\nassociation.aero\nauthor.aero\nballooning.aero\nbroker.aero\ncaa.aero\ncargo.aero\ncatering.aero\ncertification.aero\nchampionship.aero\ncharter.aero\ncivilaviation.aero\nclub.aero\nconference.aero\nconsultant.aero\nconsulting.aero\ncontrol.aero\ncouncil.aero\ncrew.aero\ndesign.aero\ndgca.aero\neducator.aero\nemergency.aero\nengine.aero\nengineer.aero\nentertainment.aero\nequipment.aero\nexchange.aero\nexpress.aero\nfederation.aero\nflight.aero\nfreight.aero\nfuel.aero\ngliding.aero\ngovernment.aero\ngroundhandling.aero\ngroup.aero\nhanggliding.aero\nhomebuilt.aero\ninsurance.aero\njournal.aero\njournalist.aero\nleasing.aero\nlogistics.aero\nmagazine.aero\nmaintenance.aero\nmedia.aero\nmicrolight.aero\nmodelling.aero\nnavigation.aero\nparachuting.aero\nparagliding.aero\npassenger-association.aero\npilot.aero\npress.aero\nproduction.aero\nrecreation.aero\nrepbody.aero\nres.aero\nresearch.aero\nrotorcraft.aero\nsafety.aero\nscientist.aero\nservices.aero\nshow.aero\nskydiving.aero\nsoftware.aero\nstudent.aero\ntrader.aero\ntrading.aero\ntrainer.aero\nunion.aero\nworkinggroup.aero\nworks.aero\n\n// af : http://www.nic.af/help.jsp\naf\ngov.af\ncom.af\norg.af\nnet.af\nedu.af\n\n// ag : http://www.nic.ag/prices.htm\nag\ncom.ag\norg.ag\nnet.ag\nco.ag\nnom.ag\n\n// ai : http://nic.com.ai/\nai\noff.ai\ncom.ai\nnet.ai\norg.ai\n\n// al : http://www.ert.gov.al/ert_alb/faq_det.html?Id=31\nal\ncom.al\nedu.al\ngov.al\nmil.al\nnet.al\norg.al\n\n// am : https://en.wikipedia.org/wiki/.am\nam\n\n// ao : https://en.wikipedia.org/wiki/.ao\n// http://www.dns.ao/REGISTR.DOC\nao\ned.ao\ngv.ao\nog.ao\nco.ao\npb.ao\nit.ao\n\n// aq : https://en.wikipedia.org/wiki/.aq\naq\n\n// ar : https://nic.ar/nic-argentina/normativa-vigente\nar\ncom.ar\nedu.ar\ngob.ar\ngov.ar\nint.ar\nmil.ar\nmusica.ar\nnet.ar\norg.ar\ntur.ar\n\n// arpa : https://en.wikipedia.org/wiki/.arpa\n// Confirmed by registry <iana-questions@icann.org> 2008-06-18\narpa\ne164.arpa\nin-addr.arpa\nip6.arpa\niris.arpa\nuri.arpa\nurn.arpa\n\n// as : https://en.wikipedia.org/wiki/.as\nas\ngov.as\n\n// asia : https://en.wikipedia.org/wiki/.asia\nasia\n\n// at : https://en.wikipedia.org/wiki/.at\n// Confirmed by registry <it@nic.at> 2008-06-17\nat\nac.at\nco.at\ngv.at\nor.at\n\n// au : https://en.wikipedia.org/wiki/.au\n// http://www.auda.org.au/\nau\n// 2LDs\ncom.au\nnet.au\norg.au\nedu.au\ngov.au\nasn.au\nid.au\n// Historic 2LDs (closed to new registration, but sites still exist)\ninfo.au\nconf.au\noz.au\n// CGDNs - http://www.cgdn.org.au/\nact.au\nnsw.au\nnt.au\nqld.au\nsa.au\ntas.au\nvic.au\nwa.au\n// 3LDs\nact.edu.au\nnsw.edu.au\nnt.edu.au\nqld.edu.au\nsa.edu.au\ntas.edu.au\nvic.edu.au\nwa.edu.au\n// act.gov.au  Bug 984824 - Removed at request of Greg Tankard\n// nsw.gov.au  Bug 547985 - Removed at request of <Shae.Donelan@services.nsw.gov.au>\n// nt.gov.au  Bug 940478 - Removed at request of Greg Connors <Greg.Connors@nt.gov.au>\nqld.gov.au\nsa.gov.au\ntas.gov.au\nvic.gov.au\nwa.gov.au\n\n// aw : https://en.wikipedia.org/wiki/.aw\naw\ncom.aw\n\n// ax : https://en.wikipedia.org/wiki/.ax\nax\n\n// az : https://en.wikipedia.org/wiki/.az\naz\ncom.az\nnet.az\nint.az\ngov.az\norg.az\nedu.az\ninfo.az\npp.az\nmil.az\nname.az\npro.az\nbiz.az\n\n// ba : http://nic.ba/users_data/files/pravilnik_o_registraciji.pdf\nba\ncom.ba\nedu.ba\ngov.ba\nmil.ba\nnet.ba\norg.ba\n\n// bb : https://en.wikipedia.org/wiki/.bb\nbb\nbiz.bb\nco.bb\ncom.bb\nedu.bb\ngov.bb\ninfo.bb\nnet.bb\norg.bb\nstore.bb\ntv.bb\n\n// bd : https://en.wikipedia.org/wiki/.bd\n*.bd\n\n// be : https://en.wikipedia.org/wiki/.be\n// Confirmed by registry <tech@dns.be> 2008-06-08\nbe\nac.be\n\n// bf : https://en.wikipedia.org/wiki/.bf\nbf\ngov.bf\n\n// bg : https://en.wikipedia.org/wiki/.bg\n// https://www.register.bg/user/static/rules/en/index.html\nbg\na.bg\nb.bg\nc.bg\nd.bg\ne.bg\nf.bg\ng.bg\nh.bg\ni.bg\nj.bg\nk.bg\nl.bg\nm.bg\nn.bg\no.bg\np.bg\nq.bg\nr.bg\ns.bg\nt.bg\nu.bg\nv.bg\nw.bg\nx.bg\ny.bg\nz.bg\n0.bg\n1.bg\n2.bg\n3.bg\n4.bg\n5.bg\n6.bg\n7.bg\n8.bg\n9.bg\n\n// bh : https://en.wikipedia.org/wiki/.bh\nbh\ncom.bh\nedu.bh\nnet.bh\norg.bh\ngov.bh\n\n// bi : https://en.wikipedia.org/wiki/.bi\n// http://whois.nic.bi/\nbi\nco.bi\ncom.bi\nedu.bi\nor.bi\norg.bi\n\n// biz : https://en.wikipedia.org/wiki/.biz\nbiz\n\n// bj : https://en.wikipedia.org/wiki/.bj\nbj\nasso.bj\nbarreau.bj\ngouv.bj\n\n// bm : http://www.bermudanic.bm/dnr-text.txt\nbm\ncom.bm\nedu.bm\ngov.bm\nnet.bm\norg.bm\n\n// bn : http://www.bnnic.bn/faqs\nbn\ncom.bn\nedu.bn\ngov.bn\nnet.bn\norg.bn\n\n// bo : https://nic.bo/delegacion2015.php#h-1.10\nbo\ncom.bo\nedu.bo\ngob.bo\nint.bo\norg.bo\nnet.bo\nmil.bo\ntv.bo\nweb.bo\n// Social Domains\nacademia.bo\nagro.bo\narte.bo\nblog.bo\nbolivia.bo\nciencia.bo\ncooperativa.bo\ndemocracia.bo\ndeporte.bo\necologia.bo\neconomia.bo\nempresa.bo\nindigena.bo\nindustria.bo\ninfo.bo\nmedicina.bo\nmovimiento.bo\nmusica.bo\nnatural.bo\nnombre.bo\nnoticias.bo\npatria.bo\npolitica.bo\nprofesional.bo\nplurinacional.bo\npueblo.bo\nrevista.bo\nsalud.bo\ntecnologia.bo\ntksat.bo\ntransporte.bo\nwiki.bo\n\n// br : http://registro.br/dominio/categoria.html\n// Submitted by registry <fneves@registro.br>\nbr\n9guacu.br\nabc.br\nadm.br\nadv.br\nagr.br\naju.br\nam.br\nanani.br\naparecida.br\narq.br\nart.br\nato.br\nb.br\nbarueri.br\nbelem.br\nbhz.br\nbio.br\nblog.br\nbmd.br\nboavista.br\nbsb.br\ncampinagrande.br\ncampinas.br\ncaxias.br\ncim.br\ncng.br\ncnt.br\ncom.br\ncontagem.br\ncoop.br\ncri.br\ncuiaba.br\ncuritiba.br\ndef.br\necn.br\neco.br\nedu.br\nemp.br\neng.br\nesp.br\netc.br\neti.br\nfar.br\nfeira.br\nflog.br\nfloripa.br\nfm.br\nfnd.br\nfortal.br\nfot.br\nfoz.br\nfst.br\ng12.br\nggf.br\ngoiania.br\ngov.br\n// gov.br 26 states + df https://en.wikipedia.org/wiki/States_of_Brazil\nac.gov.br\nal.gov.br\nam.gov.br\nap.gov.br\nba.gov.br\nce.gov.br\ndf.gov.br\nes.gov.br\ngo.gov.br\nma.gov.br\nmg.gov.br\nms.gov.br\nmt.gov.br\npa.gov.br\npb.gov.br\npe.gov.br\npi.gov.br\npr.gov.br\nrj.gov.br\nrn.gov.br\nro.gov.br\nrr.gov.br\nrs.gov.br\nsc.gov.br\nse.gov.br\nsp.gov.br\nto.gov.br\ngru.br\nimb.br\nind.br\ninf.br\njab.br\njampa.br\njdf.br\njoinville.br\njor.br\njus.br\nleg.br\nlel.br\nlondrina.br\nmacapa.br\nmaceio.br\nmanaus.br\nmaringa.br\nmat.br\nmed.br\nmil.br\nmorena.br\nmp.br\nmus.br\nnatal.br\nnet.br\nniteroi.br\n*.nom.br\nnot.br\nntr.br\nodo.br\nong.br\norg.br\nosasco.br\npalmas.br\npoa.br\nppg.br\npro.br\npsc.br\npsi.br\npvh.br\nqsl.br\nradio.br\nrec.br\nrecife.br\nribeirao.br\nrio.br\nriobranco.br\nriopreto.br\nsalvador.br\nsampa.br\nsantamaria.br\nsantoandre.br\nsaobernardo.br\nsaogonca.br\nsjc.br\nslg.br\nslz.br\nsorocaba.br\nsrv.br\ntaxi.br\nteo.br\nthe.br\ntmp.br\ntrd.br\ntur.br\ntv.br\nudi.br\nvet.br\nvix.br\nvlog.br\nwiki.br\nzlg.br\n\n// bs : http://www.nic.bs/rules.html\nbs\ncom.bs\nnet.bs\norg.bs\nedu.bs\ngov.bs\n\n// bt : https://en.wikipedia.org/wiki/.bt\nbt\ncom.bt\nedu.bt\ngov.bt\nnet.bt\norg.bt\n\n// bv : No registrations at this time.\n// Submitted by registry <jarle@uninett.no>\nbv\n\n// bw : https://en.wikipedia.org/wiki/.bw\n// http://www.gobin.info/domainname/bw.doc\n// list of other 2nd level tlds ?\nbw\nco.bw\norg.bw\n\n// by : https://en.wikipedia.org/wiki/.by\n// http://tld.by/rules_2006_en.html\n// list of other 2nd level tlds ?\nby\ngov.by\nmil.by\n// Official information does not indicate that com.by is a reserved\n// second-level domain, but it's being used as one (see www.google.com.by and\n// www.yahoo.com.by, for example), so we list it here for safety's sake.\ncom.by\n\n// http://hoster.by/\nof.by\n\n// bz : https://en.wikipedia.org/wiki/.bz\n// http://www.belizenic.bz/\nbz\ncom.bz\nnet.bz\norg.bz\nedu.bz\ngov.bz\n\n// ca : https://en.wikipedia.org/wiki/.ca\nca\n// ca geographical names\nab.ca\nbc.ca\nmb.ca\nnb.ca\nnf.ca\nnl.ca\nns.ca\nnt.ca\nnu.ca\non.ca\npe.ca\nqc.ca\nsk.ca\nyk.ca\n// gc.ca: https://en.wikipedia.org/wiki/.gc.ca\n// see also: http://registry.gc.ca/en/SubdomainFAQ\ngc.ca\n\n// cat : https://en.wikipedia.org/wiki/.cat\ncat\n\n// cc : https://en.wikipedia.org/wiki/.cc\ncc\n\n// cd : https://en.wikipedia.org/wiki/.cd\n// see also: https://www.nic.cd/domain/insertDomain_2.jsp?act=1\ncd\ngov.cd\n\n// cf : https://en.wikipedia.org/wiki/.cf\ncf\n\n// cg : https://en.wikipedia.org/wiki/.cg\ncg\n\n// ch : https://en.wikipedia.org/wiki/.ch\nch\n\n// ci : https://en.wikipedia.org/wiki/.ci\n// http://www.nic.ci/index.php?page=charte\nci\norg.ci\nor.ci\ncom.ci\nco.ci\nedu.ci\ned.ci\nac.ci\nnet.ci\ngo.ci\nasso.ci\na\u00E9roport.ci\nint.ci\npresse.ci\nmd.ci\ngouv.ci\n\n// ck : https://en.wikipedia.org/wiki/.ck\n*.ck\n!www.ck\n\n// cl : https://en.wikipedia.org/wiki/.cl\ncl\ngov.cl\ngob.cl\nco.cl\nmil.cl\n\n// cm : https://en.wikipedia.org/wiki/.cm plus bug 981927\ncm\nco.cm\ncom.cm\ngov.cm\nnet.cm\n\n// cn : https://en.wikipedia.org/wiki/.cn\n// Submitted by registry <tanyaling@cnnic.cn>\ncn\nac.cn\ncom.cn\nedu.cn\ngov.cn\nnet.cn\norg.cn\nmil.cn\n\u516C\u53F8.cn\n\u7F51\u7EDC.cn\n\u7DB2\u7D61.cn\n// cn geographic names\nah.cn\nbj.cn\ncq.cn\nfj.cn\ngd.cn\ngs.cn\ngz.cn\ngx.cn\nha.cn\nhb.cn\nhe.cn\nhi.cn\nhl.cn\nhn.cn\njl.cn\njs.cn\njx.cn\nln.cn\nnm.cn\nnx.cn\nqh.cn\nsc.cn\nsd.cn\nsh.cn\nsn.cn\nsx.cn\ntj.cn\nxj.cn\nxz.cn\nyn.cn\nzj.cn\nhk.cn\nmo.cn\ntw.cn\n\n// co : https://en.wikipedia.org/wiki/.co\n// Submitted by registry <tecnico@uniandes.edu.co>\nco\narts.co\ncom.co\nedu.co\nfirm.co\ngov.co\ninfo.co\nint.co\nmil.co\nnet.co\nnom.co\norg.co\nrec.co\nweb.co\n\n// com : https://en.wikipedia.org/wiki/.com\ncom\n\n// coop : https://en.wikipedia.org/wiki/.coop\ncoop\n\n// cr : http://www.nic.cr/niccr_publico/showRegistroDominiosScreen.do\ncr\nac.cr\nco.cr\ned.cr\nfi.cr\ngo.cr\nor.cr\nsa.cr\n\n// cu : https://en.wikipedia.org/wiki/.cu\ncu\ncom.cu\nedu.cu\norg.cu\nnet.cu\ngov.cu\ninf.cu\n\n// cv : https://en.wikipedia.org/wiki/.cv\ncv\n\n// cw : http://www.una.cw/cw_registry/\n// Confirmed by registry <registry@una.net> 2013-03-26\ncw\ncom.cw\nedu.cw\nnet.cw\norg.cw\n\n// cx : https://en.wikipedia.org/wiki/.cx\n// list of other 2nd level tlds ?\ncx\ngov.cx\n\n// cy : http://www.nic.cy/\n// Submitted by registry Panayiotou Fotia <cydns@ucy.ac.cy>\ncy\nac.cy\nbiz.cy\ncom.cy\nekloges.cy\ngov.cy\nltd.cy\nname.cy\nnet.cy\norg.cy\nparliament.cy\npress.cy\npro.cy\ntm.cy\n\n// cz : https://en.wikipedia.org/wiki/.cz\ncz\n\n// de : https://en.wikipedia.org/wiki/.de\n// Confirmed by registry <ops@denic.de> (with technical\n// reservations) 2008-07-01\nde\n\n// dj : https://en.wikipedia.org/wiki/.dj\ndj\n\n// dk : https://en.wikipedia.org/wiki/.dk\n// Confirmed by registry <robert@dk-hostmaster.dk> 2008-06-17\ndk\n\n// dm : https://en.wikipedia.org/wiki/.dm\ndm\ncom.dm\nnet.dm\norg.dm\nedu.dm\ngov.dm\n\n// do : https://en.wikipedia.org/wiki/.do\ndo\nart.do\ncom.do\nedu.do\ngob.do\ngov.do\nmil.do\nnet.do\norg.do\nsld.do\nweb.do\n\n// dz : https://en.wikipedia.org/wiki/.dz\ndz\ncom.dz\norg.dz\nnet.dz\ngov.dz\nedu.dz\nasso.dz\npol.dz\nart.dz\n\n// ec : http://www.nic.ec/reg/paso1.asp\n// Submitted by registry <vabboud@nic.ec>\nec\ncom.ec\ninfo.ec\nnet.ec\nfin.ec\nk12.ec\nmed.ec\npro.ec\norg.ec\nedu.ec\ngov.ec\ngob.ec\nmil.ec\n\n// edu : https://en.wikipedia.org/wiki/.edu\nedu\n\n// ee : http://www.eenet.ee/EENet/dom_reeglid.html#lisa_B\nee\nedu.ee\ngov.ee\nriik.ee\nlib.ee\nmed.ee\ncom.ee\npri.ee\naip.ee\norg.ee\nfie.ee\n\n// eg : https://en.wikipedia.org/wiki/.eg\neg\ncom.eg\nedu.eg\neun.eg\ngov.eg\nmil.eg\nname.eg\nnet.eg\norg.eg\nsci.eg\n\n// er : https://en.wikipedia.org/wiki/.er\n*.er\n\n// es : https://www.nic.es/site_ingles/ingles/dominios/index.html\nes\ncom.es\nnom.es\norg.es\ngob.es\nedu.es\n\n// et : https://en.wikipedia.org/wiki/.et\net\ncom.et\ngov.et\norg.et\nedu.et\nbiz.et\nname.et\ninfo.et\nnet.et\n\n// eu : https://en.wikipedia.org/wiki/.eu\neu\n\n// fi : https://en.wikipedia.org/wiki/.fi\nfi\n// aland.fi : https://en.wikipedia.org/wiki/.ax\n// This domain is being phased out in favor of .ax. As there are still many\n// domains under aland.fi, we still keep it on the list until aland.fi is\n// completely removed.\n// TODO: Check for updates (expected to be phased out around Q1/2009)\naland.fi\n\n// fj : https://en.wikipedia.org/wiki/.fj\n*.fj\n\n// fk : https://en.wikipedia.org/wiki/.fk\n*.fk\n\n// fm : https://en.wikipedia.org/wiki/.fm\nfm\n\n// fo : https://en.wikipedia.org/wiki/.fo\nfo\n\n// fr : http://www.afnic.fr/\n// domaines descriptifs : http://www.afnic.fr/obtenir/chartes/nommage-fr/annexe-descriptifs\nfr\ncom.fr\nasso.fr\nnom.fr\nprd.fr\npresse.fr\ntm.fr\n// domaines sectoriels : http://www.afnic.fr/obtenir/chartes/nommage-fr/annexe-sectoriels\naeroport.fr\nassedic.fr\navocat.fr\navoues.fr\ncci.fr\nchambagri.fr\nchirurgiens-dentistes.fr\nexperts-comptables.fr\ngeometre-expert.fr\ngouv.fr\ngreta.fr\nhuissier-justice.fr\nmedecin.fr\nnotaires.fr\npharmacien.fr\nport.fr\nveterinaire.fr\n\n// ga : https://en.wikipedia.org/wiki/.ga\nga\n\n// gb : This registry is effectively dormant\n// Submitted by registry <Damien.Shaw@ja.net>\ngb\n\n// gd : https://en.wikipedia.org/wiki/.gd\ngd\n\n// ge : http://www.nic.net.ge/policy_en.pdf\nge\ncom.ge\nedu.ge\ngov.ge\norg.ge\nmil.ge\nnet.ge\npvt.ge\n\n// gf : https://en.wikipedia.org/wiki/.gf\ngf\n\n// gg : http://www.channelisles.net/register-domains/\n// Confirmed by registry <nigel@channelisles.net> 2013-11-28\ngg\nco.gg\nnet.gg\norg.gg\n\n// gh : https://en.wikipedia.org/wiki/.gh\n// see also: http://www.nic.gh/reg_now.php\n// Although domains directly at second level are not possible at the moment,\n// they have been possible for some time and may come back.\ngh\ncom.gh\nedu.gh\ngov.gh\norg.gh\nmil.gh\n\n// gi : http://www.nic.gi/rules.html\ngi\ncom.gi\nltd.gi\ngov.gi\nmod.gi\nedu.gi\norg.gi\n\n// gl : https://en.wikipedia.org/wiki/.gl\n// http://nic.gl\ngl\nco.gl\ncom.gl\nedu.gl\nnet.gl\norg.gl\n\n// gm : http://www.nic.gm/htmlpages%5Cgm-policy.htm\ngm\n\n// gn : http://psg.com/dns/gn/gn.txt\n// Submitted by registry <randy@psg.com>\ngn\nac.gn\ncom.gn\nedu.gn\ngov.gn\norg.gn\nnet.gn\n\n// gov : https://en.wikipedia.org/wiki/.gov\ngov\n\n// gp : http://www.nic.gp/index.php?lang=en\ngp\ncom.gp\nnet.gp\nmobi.gp\nedu.gp\norg.gp\nasso.gp\n\n// gq : https://en.wikipedia.org/wiki/.gq\ngq\n\n// gr : https://grweb.ics.forth.gr/english/1617-B-2005.html\n// Submitted by registry <segred@ics.forth.gr>\ngr\ncom.gr\nedu.gr\nnet.gr\norg.gr\ngov.gr\n\n// gs : https://en.wikipedia.org/wiki/.gs\ngs\n\n// gt : http://www.gt/politicas_de_registro.html\ngt\ncom.gt\nedu.gt\ngob.gt\nind.gt\nmil.gt\nnet.gt\norg.gt\n\n// gu : http://gadao.gov.gu/register.html\n// University of Guam : https://www.uog.edu\n// Submitted by uognoc@triton.uog.edu\ngu\ncom.gu\nedu.gu\ngov.gu\nguam.gu\ninfo.gu\nnet.gu\norg.gu\nweb.gu\n\n// gw : https://en.wikipedia.org/wiki/.gw\ngw\n\n// gy : https://en.wikipedia.org/wiki/.gy\n// http://registry.gy/\ngy\nco.gy\ncom.gy\nedu.gy\ngov.gy\nnet.gy\norg.gy\n\n// hk : https://www.hkirc.hk\n// Submitted by registry <hk.tech@hkirc.hk>\nhk\ncom.hk\nedu.hk\ngov.hk\nidv.hk\nnet.hk\norg.hk\n\u516C\u53F8.hk\n\u6559\u80B2.hk\n\u654E\u80B2.hk\n\u653F\u5E9C.hk\n\u500B\u4EBA.hk\n\u4E2A\u4EBA.hk\n\u7B87\u4EBA.hk\n\u7DB2\u7EDC.hk\n\u7F51\u7EDC.hk\n\u7EC4\u7E54.hk\n\u7DB2\u7D61.hk\n\u7F51\u7D61.hk\n\u7EC4\u7EC7.hk\n\u7D44\u7E54.hk\n\u7D44\u7EC7.hk\n\n// hm : https://en.wikipedia.org/wiki/.hm\nhm\n\n// hn : http://www.nic.hn/politicas/ps02,,05.html\nhn\ncom.hn\nedu.hn\norg.hn\nnet.hn\nmil.hn\ngob.hn\n\n// hr : http://www.dns.hr/documents/pdf/HRTLD-regulations.pdf\nhr\niz.hr\nfrom.hr\nname.hr\ncom.hr\n\n// ht : http://www.nic.ht/info/charte.cfm\nht\ncom.ht\nshop.ht\nfirm.ht\ninfo.ht\nadult.ht\nnet.ht\npro.ht\norg.ht\nmed.ht\nart.ht\ncoop.ht\npol.ht\nasso.ht\nedu.ht\nrel.ht\ngouv.ht\nperso.ht\n\n// hu : http://www.domain.hu/domain/English/sld.html\n// Confirmed by registry <pasztor@iszt.hu> 2008-06-12\nhu\nco.hu\ninfo.hu\norg.hu\npriv.hu\nsport.hu\ntm.hu\n2000.hu\nagrar.hu\nbolt.hu\ncasino.hu\ncity.hu\nerotica.hu\nerotika.hu\nfilm.hu\nforum.hu\ngames.hu\nhotel.hu\ningatlan.hu\njogasz.hu\nkonyvelo.hu\nlakas.hu\nmedia.hu\nnews.hu\nreklam.hu\nsex.hu\nshop.hu\nsuli.hu\nszex.hu\ntozsde.hu\nutazas.hu\nvideo.hu\n\n// id : https://pandi.id/en/domain/registration-requirements/\nid\nac.id\nbiz.id\nco.id\ndesa.id\ngo.id\nmil.id\nmy.id\nnet.id\nor.id\nponpes.id\nsch.id\nweb.id\n\n// ie : https://en.wikipedia.org/wiki/.ie\nie\ngov.ie\n\n// il : http://www.isoc.org.il/domains/\nil\nac.il\nco.il\ngov.il\nidf.il\nk12.il\nmuni.il\nnet.il\norg.il\n\n// im : https://www.nic.im/\n// Submitted by registry <info@nic.im>\nim\nac.im\nco.im\ncom.im\nltd.co.im\nnet.im\norg.im\nplc.co.im\ntt.im\ntv.im\n\n// in : https://en.wikipedia.org/wiki/.in\n// see also: https://registry.in/Policies\n// Please note, that nic.in is not an official eTLD, but used by most\n// government institutions.\nin\nco.in\nfirm.in\nnet.in\norg.in\ngen.in\nind.in\nnic.in\nac.in\nedu.in\nres.in\ngov.in\nmil.in\n\n// info : https://en.wikipedia.org/wiki/.info\ninfo\n\n// int : https://en.wikipedia.org/wiki/.int\n// Confirmed by registry <iana-questions@icann.org> 2008-06-18\nint\neu.int\n\n// io : http://www.nic.io/rules.html\n// list of other 2nd level tlds ?\nio\ncom.io\n\n// iq : http://www.cmc.iq/english/iq/iqregister1.htm\niq\ngov.iq\nedu.iq\nmil.iq\ncom.iq\norg.iq\nnet.iq\n\n// ir : http://www.nic.ir/Terms_and_Conditions_ir,_Appendix_1_Domain_Rules\n// Also see http://www.nic.ir/Internationalized_Domain_Names\n// Two <iran>.ir entries added at request of <tech-team@nic.ir>, 2010-04-16\nir\nac.ir\nco.ir\ngov.ir\nid.ir\nnet.ir\norg.ir\nsch.ir\n// xn--mgba3a4f16a.ir (<iran>.ir, Persian YEH)\n\u0627\u06CC\u0631\u0627\u0646.ir\n// xn--mgba3a4fra.ir (<iran>.ir, Arabic YEH)\n\u0627\u064A\u0631\u0627\u0646.ir\n\n// is : http://www.isnic.is/domain/rules.php\n// Confirmed by registry <marius@isgate.is> 2008-12-06\nis\nnet.is\ncom.is\nedu.is\ngov.is\norg.is\nint.is\n\n// it : https://en.wikipedia.org/wiki/.it\nit\ngov.it\nedu.it\n// Reserved geo-names (regions and provinces):\n// http://www.nic.it/sites/default/files/docs/Regulation_assignation_v7.1.pdf\n// Regions\nabr.it\nabruzzo.it\naosta-valley.it\naostavalley.it\nbas.it\nbasilicata.it\ncal.it\ncalabria.it\ncam.it\ncampania.it\nemilia-romagna.it\nemiliaromagna.it\nemr.it\nfriuli-v-giulia.it\nfriuli-ve-giulia.it\nfriuli-vegiulia.it\nfriuli-venezia-giulia.it\nfriuli-veneziagiulia.it\nfriuli-vgiulia.it\nfriuliv-giulia.it\nfriulive-giulia.it\nfriulivegiulia.it\nfriulivenezia-giulia.it\nfriuliveneziagiulia.it\nfriulivgiulia.it\nfvg.it\nlaz.it\nlazio.it\nlig.it\nliguria.it\nlom.it\nlombardia.it\nlombardy.it\nlucania.it\nmar.it\nmarche.it\nmol.it\nmolise.it\npiedmont.it\npiemonte.it\npmn.it\npug.it\npuglia.it\nsar.it\nsardegna.it\nsardinia.it\nsic.it\nsicilia.it\nsicily.it\ntaa.it\ntos.it\ntoscana.it\ntrentin-sud-tirol.it\ntrentin-su\u0308d-tirol.it\ntrentin-sudtirol.it\ntrentin-su\u0308dtirol.it\ntrentin-sued-tirol.it\ntrentin-suedtirol.it\ntrentino-a-adige.it\ntrentino-aadige.it\ntrentino-alto-adige.it\ntrentino-altoadige.it\ntrentino-s-tirol.it\ntrentino-stirol.it\ntrentino-sud-tirol.it\ntrentino-su\u0308d-tirol.it\ntrentino-sudtirol.it\ntrentino-su\u0308dtirol.it\ntrentino-sued-tirol.it\ntrentino-suedtirol.it\ntrentino.it\ntrentinoa-adige.it\ntrentinoaadige.it\ntrentinoalto-adige.it\ntrentinoaltoadige.it\ntrentinos-tirol.it\ntrentinostirol.it\ntrentinosud-tirol.it\ntrentinosu\u0308d-tirol.it\ntrentinosudtirol.it\ntrentinosu\u0308dtirol.it\ntrentinosued-tirol.it\ntrentinosuedtirol.it\ntrentinsud-tirol.it\ntrentinsu\u0308d-tirol.it\ntrentinsudtirol.it\ntrentinsu\u0308dtirol.it\ntrentinsued-tirol.it\ntrentinsuedtirol.it\ntuscany.it\numb.it\numbria.it\nval-d-aosta.it\nval-daosta.it\nvald-aosta.it\nvaldaosta.it\nvalle-aosta.it\nvalle-d-aosta.it\nvalle-daosta.it\nvalleaosta.it\nvalled-aosta.it\nvalledaosta.it\nvallee-aoste.it\nvalle\u0301e-aoste.it\nvallee-d-aoste.it\nvalle\u0301e-d-aoste.it\nvalleeaoste.it\nvalle\u0301eaoste.it\nvalleedaoste.it\nvalle\u0301edaoste.it\nvao.it\nvda.it\nven.it\nveneto.it\n// Provinces\nag.it\nagrigento.it\nal.it\nalessandria.it\nalto-adige.it\naltoadige.it\nan.it\nancona.it\nandria-barletta-trani.it\nandria-trani-barletta.it\nandriabarlettatrani.it\nandriatranibarletta.it\nao.it\naosta.it\naoste.it\nap.it\naq.it\naquila.it\nar.it\narezzo.it\nascoli-piceno.it\nascolipiceno.it\nasti.it\nat.it\nav.it\navellino.it\nba.it\nbalsan-sudtirol.it\nbalsan-su\u0308dtirol.it\nbalsan-suedtirol.it\nbalsan.it\nbari.it\nbarletta-trani-andria.it\nbarlettatraniandria.it\nbelluno.it\nbenevento.it\nbergamo.it\nbg.it\nbi.it\nbiella.it\nbl.it\nbn.it\nbo.it\nbologna.it\nbolzano-altoadige.it\nbolzano.it\nbozen-sudtirol.it\nbozen-su\u0308dtirol.it\nbozen-suedtirol.it\nbozen.it\nbr.it\nbrescia.it\nbrindisi.it\nbs.it\nbt.it\nbulsan-sudtirol.it\nbulsan-su\u0308dtirol.it\nbulsan-suedtirol.it\nbulsan.it\nbz.it\nca.it\ncagliari.it\ncaltanissetta.it\ncampidano-medio.it\ncampidanomedio.it\ncampobasso.it\ncarbonia-iglesias.it\ncarboniaiglesias.it\ncarrara-massa.it\ncarraramassa.it\ncaserta.it\ncatania.it\ncatanzaro.it\ncb.it\nce.it\ncesena-forli.it\ncesena-forli\u0300.it\ncesenaforli.it\ncesenaforli\u0300.it\nch.it\nchieti.it\nci.it\ncl.it\ncn.it\nco.it\ncomo.it\ncosenza.it\ncr.it\ncremona.it\ncrotone.it\ncs.it\nct.it\ncuneo.it\ncz.it\ndell-ogliastra.it\ndellogliastra.it\nen.it\nenna.it\nfc.it\nfe.it\nfermo.it\nferrara.it\nfg.it\nfi.it\nfirenze.it\nflorence.it\nfm.it\nfoggia.it\nforli-cesena.it\nforli\u0300-cesena.it\nforlicesena.it\nforli\u0300cesena.it\nfr.it\nfrosinone.it\nge.it\ngenoa.it\ngenova.it\ngo.it\ngorizia.it\ngr.it\ngrosseto.it\niglesias-carbonia.it\niglesiascarbonia.it\nim.it\nimperia.it\nis.it\nisernia.it\nkr.it\nla-spezia.it\nlaquila.it\nlaspezia.it\nlatina.it\nlc.it\nle.it\nlecce.it\nlecco.it\nli.it\nlivorno.it\nlo.it\nlodi.it\nlt.it\nlu.it\nlucca.it\nmacerata.it\nmantova.it\nmassa-carrara.it\nmassacarrara.it\nmatera.it\nmb.it\nmc.it\nme.it\nmedio-campidano.it\nmediocampidano.it\nmessina.it\nmi.it\nmilan.it\nmilano.it\nmn.it\nmo.it\nmodena.it\nmonza-brianza.it\nmonza-e-della-brianza.it\nmonza.it\nmonzabrianza.it\nmonzaebrianza.it\nmonzaedellabrianza.it\nms.it\nmt.it\nna.it\nnaples.it\nnapoli.it\nno.it\nnovara.it\nnu.it\nnuoro.it\nog.it\nogliastra.it\nolbia-tempio.it\nolbiatempio.it\nor.it\noristano.it\not.it\npa.it\npadova.it\npadua.it\npalermo.it\nparma.it\npavia.it\npc.it\npd.it\npe.it\nperugia.it\npesaro-urbino.it\npesarourbino.it\npescara.it\npg.it\npi.it\npiacenza.it\npisa.it\npistoia.it\npn.it\npo.it\npordenone.it\npotenza.it\npr.it\nprato.it\npt.it\npu.it\npv.it\npz.it\nra.it\nragusa.it\nravenna.it\nrc.it\nre.it\nreggio-calabria.it\nreggio-emilia.it\nreggiocalabria.it\nreggioemilia.it\nrg.it\nri.it\nrieti.it\nrimini.it\nrm.it\nrn.it\nro.it\nroma.it\nrome.it\nrovigo.it\nsa.it\nsalerno.it\nsassari.it\nsavona.it\nsi.it\nsiena.it\nsiracusa.it\nso.it\nsondrio.it\nsp.it\nsr.it\nss.it\nsuedtirol.it\nsu\u0308dtirol.it\nsv.it\nta.it\ntaranto.it\nte.it\ntempio-olbia.it\ntempioolbia.it\nteramo.it\nterni.it\ntn.it\nto.it\ntorino.it\ntp.it\ntr.it\ntrani-andria-barletta.it\ntrani-barletta-andria.it\ntraniandriabarletta.it\ntranibarlettaandria.it\ntrapani.it\ntrento.it\ntreviso.it\ntrieste.it\nts.it\nturin.it\ntv.it\nud.it\nudine.it\nurbino-pesaro.it\nurbinopesaro.it\nva.it\nvarese.it\nvb.it\nvc.it\nve.it\nvenezia.it\nvenice.it\nverbania.it\nvercelli.it\nverona.it\nvi.it\nvibo-valentia.it\nvibovalentia.it\nvicenza.it\nviterbo.it\nvr.it\nvs.it\nvt.it\nvv.it\n\n// je : http://www.channelisles.net/register-domains/\n// Confirmed by registry <nigel@channelisles.net> 2013-11-28\nje\nco.je\nnet.je\norg.je\n\n// jm : http://www.com.jm/register.html\n*.jm\n\n// jo : http://www.dns.jo/Registration_policy.aspx\njo\ncom.jo\norg.jo\nnet.jo\nedu.jo\nsch.jo\ngov.jo\nmil.jo\nname.jo\n\n// jobs : https://en.wikipedia.org/wiki/.jobs\njobs\n\n// jp : https://en.wikipedia.org/wiki/.jp\n// http://jprs.co.jp/en/jpdomain.html\n// Submitted by registry <info@jprs.jp>\njp\n// jp organizational type names\nac.jp\nad.jp\nco.jp\ned.jp\ngo.jp\ngr.jp\nlg.jp\nne.jp\nor.jp\n// jp prefecture type names\naichi.jp\nakita.jp\naomori.jp\nchiba.jp\nehime.jp\nfukui.jp\nfukuoka.jp\nfukushima.jp\ngifu.jp\ngunma.jp\nhiroshima.jp\nhokkaido.jp\nhyogo.jp\nibaraki.jp\nishikawa.jp\niwate.jp\nkagawa.jp\nkagoshima.jp\nkanagawa.jp\nkochi.jp\nkumamoto.jp\nkyoto.jp\nmie.jp\nmiyagi.jp\nmiyazaki.jp\nnagano.jp\nnagasaki.jp\nnara.jp\nniigata.jp\noita.jp\nokayama.jp\nokinawa.jp\nosaka.jp\nsaga.jp\nsaitama.jp\nshiga.jp\nshimane.jp\nshizuoka.jp\ntochigi.jp\ntokushima.jp\ntokyo.jp\ntottori.jp\ntoyama.jp\nwakayama.jp\nyamagata.jp\nyamaguchi.jp\nyamanashi.jp\n\u6803\u6728.jp\n\u611B\u77E5.jp\n\u611B\u5A9B.jp\n\u5175\u5EAB.jp\n\u718A\u672C.jp\n\u8328\u57CE.jp\n\u5317\u6D77\u9053.jp\n\u5343\u8449.jp\n\u548C\u6B4C\u5C71.jp\n\u9577\u5D0E.jp\n\u9577\u91CE.jp\n\u65B0\u6F5F.jp\n\u9752\u68EE.jp\n\u9759\u5CA1.jp\n\u6771\u4EAC.jp\n\u77F3\u5DDD.jp\n\u57FC\u7389.jp\n\u4E09\u91CD.jp\n\u4EAC\u90FD.jp\n\u4F50\u8CC0.jp\n\u5927\u5206.jp\n\u5927\u962A.jp\n\u5948\u826F.jp\n\u5BAE\u57CE.jp\n\u5BAE\u5D0E.jp\n\u5BCC\u5C71.jp\n\u5C71\u53E3.jp\n\u5C71\u5F62.jp\n\u5C71\u68A8.jp\n\u5CA9\u624B.jp\n\u5C90\u961C.jp\n\u5CA1\u5C71.jp\n\u5CF6\u6839.jp\n\u5E83\u5CF6.jp\n\u5FB3\u5CF6.jp\n\u6C96\u7E04.jp\n\u6ECB\u8CC0.jp\n\u795E\u5948\u5DDD.jp\n\u798F\u4E95.jp\n\u798F\u5CA1.jp\n\u798F\u5CF6.jp\n\u79CB\u7530.jp\n\u7FA4\u99AC.jp\n\u9999\u5DDD.jp\n\u9AD8\u77E5.jp\n\u9CE5\u53D6.jp\n\u9E7F\u5150\u5CF6.jp\n// jp geographic type names\n// http://jprs.jp/doc/rule/saisoku-1.html\n*.kawasaki.jp\n*.kitakyushu.jp\n*.kobe.jp\n*.nagoya.jp\n*.sapporo.jp\n*.sendai.jp\n*.yokohama.jp\n!city.kawasaki.jp\n!city.kitakyushu.jp\n!city.kobe.jp\n!city.nagoya.jp\n!city.sapporo.jp\n!city.sendai.jp\n!city.yokohama.jp\n// 4th level registration\naisai.aichi.jp\nama.aichi.jp\nanjo.aichi.jp\nasuke.aichi.jp\nchiryu.aichi.jp\nchita.aichi.jp\nfuso.aichi.jp\ngamagori.aichi.jp\nhanda.aichi.jp\nhazu.aichi.jp\nhekinan.aichi.jp\nhigashiura.aichi.jp\nichinomiya.aichi.jp\ninazawa.aichi.jp\ninuyama.aichi.jp\nisshiki.aichi.jp\niwakura.aichi.jp\nkanie.aichi.jp\nkariya.aichi.jp\nkasugai.aichi.jp\nkira.aichi.jp\nkiyosu.aichi.jp\nkomaki.aichi.jp\nkonan.aichi.jp\nkota.aichi.jp\nmihama.aichi.jp\nmiyoshi.aichi.jp\nnishio.aichi.jp\nnisshin.aichi.jp\nobu.aichi.jp\noguchi.aichi.jp\noharu.aichi.jp\nokazaki.aichi.jp\nowariasahi.aichi.jp\nseto.aichi.jp\nshikatsu.aichi.jp\nshinshiro.aichi.jp\nshitara.aichi.jp\ntahara.aichi.jp\ntakahama.aichi.jp\ntobishima.aichi.jp\ntoei.aichi.jp\ntogo.aichi.jp\ntokai.aichi.jp\ntokoname.aichi.jp\ntoyoake.aichi.jp\ntoyohashi.aichi.jp\ntoyokawa.aichi.jp\ntoyone.aichi.jp\ntoyota.aichi.jp\ntsushima.aichi.jp\nyatomi.aichi.jp\nakita.akita.jp\ndaisen.akita.jp\nfujisato.akita.jp\ngojome.akita.jp\nhachirogata.akita.jp\nhappou.akita.jp\nhigashinaruse.akita.jp\nhonjo.akita.jp\nhonjyo.akita.jp\nikawa.akita.jp\nkamikoani.akita.jp\nkamioka.akita.jp\nkatagami.akita.jp\nkazuno.akita.jp\nkitaakita.akita.jp\nkosaka.akita.jp\nkyowa.akita.jp\nmisato.akita.jp\nmitane.akita.jp\nmoriyoshi.akita.jp\nnikaho.akita.jp\nnoshiro.akita.jp\nodate.akita.jp\noga.akita.jp\nogata.akita.jp\nsemboku.akita.jp\nyokote.akita.jp\nyurihonjo.akita.jp\naomori.aomori.jp\ngonohe.aomori.jp\nhachinohe.aomori.jp\nhashikami.aomori.jp\nhiranai.aomori.jp\nhirosaki.aomori.jp\nitayanagi.aomori.jp\nkuroishi.aomori.jp\nmisawa.aomori.jp\nmutsu.aomori.jp\nnakadomari.aomori.jp\nnoheji.aomori.jp\noirase.aomori.jp\nowani.aomori.jp\nrokunohe.aomori.jp\nsannohe.aomori.jp\nshichinohe.aomori.jp\nshingo.aomori.jp\ntakko.aomori.jp\ntowada.aomori.jp\ntsugaru.aomori.jp\ntsuruta.aomori.jp\nabiko.chiba.jp\nasahi.chiba.jp\nchonan.chiba.jp\nchosei.chiba.jp\nchoshi.chiba.jp\nchuo.chiba.jp\nfunabashi.chiba.jp\nfuttsu.chiba.jp\nhanamigawa.chiba.jp\nichihara.chiba.jp\nichikawa.chiba.jp\nichinomiya.chiba.jp\ninzai.chiba.jp\nisumi.chiba.jp\nkamagaya.chiba.jp\nkamogawa.chiba.jp\nkashiwa.chiba.jp\nkatori.chiba.jp\nkatsuura.chiba.jp\nkimitsu.chiba.jp\nkisarazu.chiba.jp\nkozaki.chiba.jp\nkujukuri.chiba.jp\nkyonan.chiba.jp\nmatsudo.chiba.jp\nmidori.chiba.jp\nmihama.chiba.jp\nminamiboso.chiba.jp\nmobara.chiba.jp\nmutsuzawa.chiba.jp\nnagara.chiba.jp\nnagareyama.chiba.jp\nnarashino.chiba.jp\nnarita.chiba.jp\nnoda.chiba.jp\noamishirasato.chiba.jp\nomigawa.chiba.jp\nonjuku.chiba.jp\notaki.chiba.jp\nsakae.chiba.jp\nsakura.chiba.jp\nshimofusa.chiba.jp\nshirako.chiba.jp\nshiroi.chiba.jp\nshisui.chiba.jp\nsodegaura.chiba.jp\nsosa.chiba.jp\ntako.chiba.jp\ntateyama.chiba.jp\ntogane.chiba.jp\ntohnosho.chiba.jp\ntomisato.chiba.jp\nurayasu.chiba.jp\nyachimata.chiba.jp\nyachiyo.chiba.jp\nyokaichiba.chiba.jp\nyokoshibahikari.chiba.jp\nyotsukaido.chiba.jp\nainan.ehime.jp\nhonai.ehime.jp\nikata.ehime.jp\nimabari.ehime.jp\niyo.ehime.jp\nkamijima.ehime.jp\nkihoku.ehime.jp\nkumakogen.ehime.jp\nmasaki.ehime.jp\nmatsuno.ehime.jp\nmatsuyama.ehime.jp\nnamikata.ehime.jp\nniihama.ehime.jp\nozu.ehime.jp\nsaijo.ehime.jp\nseiyo.ehime.jp\nshikokuchuo.ehime.jp\ntobe.ehime.jp\ntoon.ehime.jp\nuchiko.ehime.jp\nuwajima.ehime.jp\nyawatahama.ehime.jp\nechizen.fukui.jp\neiheiji.fukui.jp\nfukui.fukui.jp\nikeda.fukui.jp\nkatsuyama.fukui.jp\nmihama.fukui.jp\nminamiechizen.fukui.jp\nobama.fukui.jp\nohi.fukui.jp\nono.fukui.jp\nsabae.fukui.jp\nsakai.fukui.jp\ntakahama.fukui.jp\ntsuruga.fukui.jp\nwakasa.fukui.jp\nashiya.fukuoka.jp\nbuzen.fukuoka.jp\nchikugo.fukuoka.jp\nchikuho.fukuoka.jp\nchikujo.fukuoka.jp\nchikushino.fukuoka.jp\nchikuzen.fukuoka.jp\nchuo.fukuoka.jp\ndazaifu.fukuoka.jp\nfukuchi.fukuoka.jp\nhakata.fukuoka.jp\nhigashi.fukuoka.jp\nhirokawa.fukuoka.jp\nhisayama.fukuoka.jp\niizuka.fukuoka.jp\ninatsuki.fukuoka.jp\nkaho.fukuoka.jp\nkasuga.fukuoka.jp\nkasuya.fukuoka.jp\nkawara.fukuoka.jp\nkeisen.fukuoka.jp\nkoga.fukuoka.jp\nkurate.fukuoka.jp\nkurogi.fukuoka.jp\nkurume.fukuoka.jp\nminami.fukuoka.jp\nmiyako.fukuoka.jp\nmiyama.fukuoka.jp\nmiyawaka.fukuoka.jp\nmizumaki.fukuoka.jp\nmunakata.fukuoka.jp\nnakagawa.fukuoka.jp\nnakama.fukuoka.jp\nnishi.fukuoka.jp\nnogata.fukuoka.jp\nogori.fukuoka.jp\nokagaki.fukuoka.jp\nokawa.fukuoka.jp\noki.fukuoka.jp\nomuta.fukuoka.jp\nonga.fukuoka.jp\nonojo.fukuoka.jp\noto.fukuoka.jp\nsaigawa.fukuoka.jp\nsasaguri.fukuoka.jp\nshingu.fukuoka.jp\nshinyoshitomi.fukuoka.jp\nshonai.fukuoka.jp\nsoeda.fukuoka.jp\nsue.fukuoka.jp\ntachiarai.fukuoka.jp\ntagawa.fukuoka.jp\ntakata.fukuoka.jp\ntoho.fukuoka.jp\ntoyotsu.fukuoka.jp\ntsuiki.fukuoka.jp\nukiha.fukuoka.jp\numi.fukuoka.jp\nusui.fukuoka.jp\nyamada.fukuoka.jp\nyame.fukuoka.jp\nyanagawa.fukuoka.jp\nyukuhashi.fukuoka.jp\naizubange.fukushima.jp\naizumisato.fukushima.jp\naizuwakamatsu.fukushima.jp\nasakawa.fukushima.jp\nbandai.fukushima.jp\ndate.fukushima.jp\nfukushima.fukushima.jp\nfurudono.fukushima.jp\nfutaba.fukushima.jp\nhanawa.fukushima.jp\nhigashi.fukushima.jp\nhirata.fukushima.jp\nhirono.fukushima.jp\niitate.fukushima.jp\ninawashiro.fukushima.jp\nishikawa.fukushima.jp\niwaki.fukushima.jp\nizumizaki.fukushima.jp\nkagamiishi.fukushima.jp\nkaneyama.fukushima.jp\nkawamata.fukushima.jp\nkitakata.fukushima.jp\nkitashiobara.fukushima.jp\nkoori.fukushima.jp\nkoriyama.fukushima.jp\nkunimi.fukushima.jp\nmiharu.fukushima.jp\nmishima.fukushima.jp\nnamie.fukushima.jp\nnango.fukushima.jp\nnishiaizu.fukushima.jp\nnishigo.fukushima.jp\nokuma.fukushima.jp\nomotego.fukushima.jp\nono.fukushima.jp\notama.fukushima.jp\nsamegawa.fukushima.jp\nshimogo.fukushima.jp\nshirakawa.fukushima.jp\nshowa.fukushima.jp\nsoma.fukushima.jp\nsukagawa.fukushima.jp\ntaishin.fukushima.jp\ntamakawa.fukushima.jp\ntanagura.fukushima.jp\ntenei.fukushima.jp\nyabuki.fukushima.jp\nyamato.fukushima.jp\nyamatsuri.fukushima.jp\nyanaizu.fukushima.jp\nyugawa.fukushima.jp\nanpachi.gifu.jp\nena.gifu.jp\ngifu.gifu.jp\nginan.gifu.jp\ngodo.gifu.jp\ngujo.gifu.jp\nhashima.gifu.jp\nhichiso.gifu.jp\nhida.gifu.jp\nhigashishirakawa.gifu.jp\nibigawa.gifu.jp\nikeda.gifu.jp\nkakamigahara.gifu.jp\nkani.gifu.jp\nkasahara.gifu.jp\nkasamatsu.gifu.jp\nkawaue.gifu.jp\nkitagata.gifu.jp\nmino.gifu.jp\nminokamo.gifu.jp\nmitake.gifu.jp\nmizunami.gifu.jp\nmotosu.gifu.jp\nnakatsugawa.gifu.jp\nogaki.gifu.jp\nsakahogi.gifu.jp\nseki.gifu.jp\nsekigahara.gifu.jp\nshirakawa.gifu.jp\ntajimi.gifu.jp\ntakayama.gifu.jp\ntarui.gifu.jp\ntoki.gifu.jp\ntomika.gifu.jp\nwanouchi.gifu.jp\nyamagata.gifu.jp\nyaotsu.gifu.jp\nyoro.gifu.jp\nannaka.gunma.jp\nchiyoda.gunma.jp\nfujioka.gunma.jp\nhigashiagatsuma.gunma.jp\nisesaki.gunma.jp\nitakura.gunma.jp\nkanna.gunma.jp\nkanra.gunma.jp\nkatashina.gunma.jp\nkawaba.gunma.jp\nkiryu.gunma.jp\nkusatsu.gunma.jp\nmaebashi.gunma.jp\nmeiwa.gunma.jp\nmidori.gunma.jp\nminakami.gunma.jp\nnaganohara.gunma.jp\nnakanojo.gunma.jp\nnanmoku.gunma.jp\nnumata.gunma.jp\noizumi.gunma.jp\nora.gunma.jp\nota.gunma.jp\nshibukawa.gunma.jp\nshimonita.gunma.jp\nshinto.gunma.jp\nshowa.gunma.jp\ntakasaki.gunma.jp\ntakayama.gunma.jp\ntamamura.gunma.jp\ntatebayashi.gunma.jp\ntomioka.gunma.jp\ntsukiyono.gunma.jp\ntsumagoi.gunma.jp\nueno.gunma.jp\nyoshioka.gunma.jp\nasaminami.hiroshima.jp\ndaiwa.hiroshima.jp\netajima.hiroshima.jp\nfuchu.hiroshima.jp\nfukuyama.hiroshima.jp\nhatsukaichi.hiroshima.jp\nhigashihiroshima.hiroshima.jp\nhongo.hiroshima.jp\njinsekikogen.hiroshima.jp\nkaita.hiroshima.jp\nkui.hiroshima.jp\nkumano.hiroshima.jp\nkure.hiroshima.jp\nmihara.hiroshima.jp\nmiyoshi.hiroshima.jp\nnaka.hiroshima.jp\nonomichi.hiroshima.jp\nosakikamijima.hiroshima.jp\notake.hiroshima.jp\nsaka.hiroshima.jp\nsera.hiroshima.jp\nseranishi.hiroshima.jp\nshinichi.hiroshima.jp\nshobara.hiroshima.jp\ntakehara.hiroshima.jp\nabashiri.hokkaido.jp\nabira.hokkaido.jp\naibetsu.hokkaido.jp\nakabira.hokkaido.jp\nakkeshi.hokkaido.jp\nasahikawa.hokkaido.jp\nashibetsu.hokkaido.jp\nashoro.hokkaido.jp\nassabu.hokkaido.jp\natsuma.hokkaido.jp\nbibai.hokkaido.jp\nbiei.hokkaido.jp\nbifuka.hokkaido.jp\nbihoro.hokkaido.jp\nbiratori.hokkaido.jp\nchippubetsu.hokkaido.jp\nchitose.hokkaido.jp\ndate.hokkaido.jp\nebetsu.hokkaido.jp\nembetsu.hokkaido.jp\neniwa.hokkaido.jp\nerimo.hokkaido.jp\nesan.hokkaido.jp\nesashi.hokkaido.jp\nfukagawa.hokkaido.jp\nfukushima.hokkaido.jp\nfurano.hokkaido.jp\nfurubira.hokkaido.jp\nhaboro.hokkaido.jp\nhakodate.hokkaido.jp\nhamatonbetsu.hokkaido.jp\nhidaka.hokkaido.jp\nhigashikagura.hokkaido.jp\nhigashikawa.hokkaido.jp\nhiroo.hokkaido.jp\nhokuryu.hokkaido.jp\nhokuto.hokkaido.jp\nhonbetsu.hokkaido.jp\nhorokanai.hokkaido.jp\nhoronobe.hokkaido.jp\nikeda.hokkaido.jp\nimakane.hokkaido.jp\nishikari.hokkaido.jp\niwamizawa.hokkaido.jp\niwanai.hokkaido.jp\nkamifurano.hokkaido.jp\nkamikawa.hokkaido.jp\nkamishihoro.hokkaido.jp\nkamisunagawa.hokkaido.jp\nkamoenai.hokkaido.jp\nkayabe.hokkaido.jp\nkembuchi.hokkaido.jp\nkikonai.hokkaido.jp\nkimobetsu.hokkaido.jp\nkitahiroshima.hokkaido.jp\nkitami.hokkaido.jp\nkiyosato.hokkaido.jp\nkoshimizu.hokkaido.jp\nkunneppu.hokkaido.jp\nkuriyama.hokkaido.jp\nkuromatsunai.hokkaido.jp\nkushiro.hokkaido.jp\nkutchan.hokkaido.jp\nkyowa.hokkaido.jp\nmashike.hokkaido.jp\nmatsumae.hokkaido.jp\nmikasa.hokkaido.jp\nminamifurano.hokkaido.jp\nmombetsu.hokkaido.jp\nmoseushi.hokkaido.jp\nmukawa.hokkaido.jp\nmuroran.hokkaido.jp\nnaie.hokkaido.jp\nnakagawa.hokkaido.jp\nnakasatsunai.hokkaido.jp\nnakatombetsu.hokkaido.jp\nnanae.hokkaido.jp\nnanporo.hokkaido.jp\nnayoro.hokkaido.jp\nnemuro.hokkaido.jp\nniikappu.hokkaido.jp\nniki.hokkaido.jp\nnishiokoppe.hokkaido.jp\nnoboribetsu.hokkaido.jp\nnumata.hokkaido.jp\nobihiro.hokkaido.jp\nobira.hokkaido.jp\noketo.hokkaido.jp\nokoppe.hokkaido.jp\notaru.hokkaido.jp\notobe.hokkaido.jp\notofuke.hokkaido.jp\notoineppu.hokkaido.jp\noumu.hokkaido.jp\nozora.hokkaido.jp\npippu.hokkaido.jp\nrankoshi.hokkaido.jp\nrebun.hokkaido.jp\nrikubetsu.hokkaido.jp\nrishiri.hokkaido.jp\nrishirifuji.hokkaido.jp\nsaroma.hokkaido.jp\nsarufutsu.hokkaido.jp\nshakotan.hokkaido.jp\nshari.hokkaido.jp\nshibecha.hokkaido.jp\nshibetsu.hokkaido.jp\nshikabe.hokkaido.jp\nshikaoi.hokkaido.jp\nshimamaki.hokkaido.jp\nshimizu.hokkaido.jp\nshimokawa.hokkaido.jp\nshinshinotsu.hokkaido.jp\nshintoku.hokkaido.jp\nshiranuka.hokkaido.jp\nshiraoi.hokkaido.jp\nshiriuchi.hokkaido.jp\nsobetsu.hokkaido.jp\nsunagawa.hokkaido.jp\ntaiki.hokkaido.jp\ntakasu.hokkaido.jp\ntakikawa.hokkaido.jp\ntakinoue.hokkaido.jp\nteshikaga.hokkaido.jp\ntobetsu.hokkaido.jp\ntohma.hokkaido.jp\ntomakomai.hokkaido.jp\ntomari.hokkaido.jp\ntoya.hokkaido.jp\ntoyako.hokkaido.jp\ntoyotomi.hokkaido.jp\ntoyoura.hokkaido.jp\ntsubetsu.hokkaido.jp\ntsukigata.hokkaido.jp\nurakawa.hokkaido.jp\nurausu.hokkaido.jp\nuryu.hokkaido.jp\nutashinai.hokkaido.jp\nwakkanai.hokkaido.jp\nwassamu.hokkaido.jp\nyakumo.hokkaido.jp\nyoichi.hokkaido.jp\naioi.hyogo.jp\nakashi.hyogo.jp\nako.hyogo.jp\namagasaki.hyogo.jp\naogaki.hyogo.jp\nasago.hyogo.jp\nashiya.hyogo.jp\nawaji.hyogo.jp\nfukusaki.hyogo.jp\ngoshiki.hyogo.jp\nharima.hyogo.jp\nhimeji.hyogo.jp\nichikawa.hyogo.jp\ninagawa.hyogo.jp\nitami.hyogo.jp\nkakogawa.hyogo.jp\nkamigori.hyogo.jp\nkamikawa.hyogo.jp\nkasai.hyogo.jp\nkasuga.hyogo.jp\nkawanishi.hyogo.jp\nmiki.hyogo.jp\nminamiawaji.hyogo.jp\nnishinomiya.hyogo.jp\nnishiwaki.hyogo.jp\nono.hyogo.jp\nsanda.hyogo.jp\nsannan.hyogo.jp\nsasayama.hyogo.jp\nsayo.hyogo.jp\nshingu.hyogo.jp\nshinonsen.hyogo.jp\nshiso.hyogo.jp\nsumoto.hyogo.jp\ntaishi.hyogo.jp\ntaka.hyogo.jp\ntakarazuka.hyogo.jp\ntakasago.hyogo.jp\ntakino.hyogo.jp\ntamba.hyogo.jp\ntatsuno.hyogo.jp\ntoyooka.hyogo.jp\nyabu.hyogo.jp\nyashiro.hyogo.jp\nyoka.hyogo.jp\nyokawa.hyogo.jp\nami.ibaraki.jp\nasahi.ibaraki.jp\nbando.ibaraki.jp\nchikusei.ibaraki.jp\ndaigo.ibaraki.jp\nfujishiro.ibaraki.jp\nhitachi.ibaraki.jp\nhitachinaka.ibaraki.jp\nhitachiomiya.ibaraki.jp\nhitachiota.ibaraki.jp\nibaraki.ibaraki.jp\nina.ibaraki.jp\ninashiki.ibaraki.jp\nitako.ibaraki.jp\niwama.ibaraki.jp\njoso.ibaraki.jp\nkamisu.ibaraki.jp\nkasama.ibaraki.jp\nkashima.ibaraki.jp\nkasumigaura.ibaraki.jp\nkoga.ibaraki.jp\nmiho.ibaraki.jp\nmito.ibaraki.jp\nmoriya.ibaraki.jp\nnaka.ibaraki.jp\nnamegata.ibaraki.jp\noarai.ibaraki.jp\nogawa.ibaraki.jp\nomitama.ibaraki.jp\nryugasaki.ibaraki.jp\nsakai.ibaraki.jp\nsakuragawa.ibaraki.jp\nshimodate.ibaraki.jp\nshimotsuma.ibaraki.jp\nshirosato.ibaraki.jp\nsowa.ibaraki.jp\nsuifu.ibaraki.jp\ntakahagi.ibaraki.jp\ntamatsukuri.ibaraki.jp\ntokai.ibaraki.jp\ntomobe.ibaraki.jp\ntone.ibaraki.jp\ntoride.ibaraki.jp\ntsuchiura.ibaraki.jp\ntsukuba.ibaraki.jp\nuchihara.ibaraki.jp\nushiku.ibaraki.jp\nyachiyo.ibaraki.jp\nyamagata.ibaraki.jp\nyawara.ibaraki.jp\nyuki.ibaraki.jp\nanamizu.ishikawa.jp\nhakui.ishikawa.jp\nhakusan.ishikawa.jp\nkaga.ishikawa.jp\nkahoku.ishikawa.jp\nkanazawa.ishikawa.jp\nkawakita.ishikawa.jp\nkomatsu.ishikawa.jp\nnakanoto.ishikawa.jp\nnanao.ishikawa.jp\nnomi.ishikawa.jp\nnonoichi.ishikawa.jp\nnoto.ishikawa.jp\nshika.ishikawa.jp\nsuzu.ishikawa.jp\ntsubata.ishikawa.jp\ntsurugi.ishikawa.jp\nuchinada.ishikawa.jp\nwajima.ishikawa.jp\nfudai.iwate.jp\nfujisawa.iwate.jp\nhanamaki.iwate.jp\nhiraizumi.iwate.jp\nhirono.iwate.jp\nichinohe.iwate.jp\nichinoseki.iwate.jp\niwaizumi.iwate.jp\niwate.iwate.jp\njoboji.iwate.jp\nkamaishi.iwate.jp\nkanegasaki.iwate.jp\nkarumai.iwate.jp\nkawai.iwate.jp\nkitakami.iwate.jp\nkuji.iwate.jp\nkunohe.iwate.jp\nkuzumaki.iwate.jp\nmiyako.iwate.jp\nmizusawa.iwate.jp\nmorioka.iwate.jp\nninohe.iwate.jp\nnoda.iwate.jp\nofunato.iwate.jp\noshu.iwate.jp\notsuchi.iwate.jp\nrikuzentakata.iwate.jp\nshiwa.iwate.jp\nshizukuishi.iwate.jp\nsumita.iwate.jp\ntanohata.iwate.jp\ntono.iwate.jp\nyahaba.iwate.jp\nyamada.iwate.jp\nayagawa.kagawa.jp\nhigashikagawa.kagawa.jp\nkanonji.kagawa.jp\nkotohira.kagawa.jp\nmanno.kagawa.jp\nmarugame.kagawa.jp\nmitoyo.kagawa.jp\nnaoshima.kagawa.jp\nsanuki.kagawa.jp\ntadotsu.kagawa.jp\ntakamatsu.kagawa.jp\ntonosho.kagawa.jp\nuchinomi.kagawa.jp\nutazu.kagawa.jp\nzentsuji.kagawa.jp\nakune.kagoshima.jp\namami.kagoshima.jp\nhioki.kagoshima.jp\nisa.kagoshima.jp\nisen.kagoshima.jp\nizumi.kagoshima.jp\nkagoshima.kagoshima.jp\nkanoya.kagoshima.jp\nkawanabe.kagoshima.jp\nkinko.kagoshima.jp\nkouyama.kagoshima.jp\nmakurazaki.kagoshima.jp\nmatsumoto.kagoshima.jp\nminamitane.kagoshima.jp\nnakatane.kagoshima.jp\nnishinoomote.kagoshima.jp\nsatsumasendai.kagoshima.jp\nsoo.kagoshima.jp\ntarumizu.kagoshima.jp\nyusui.kagoshima.jp\naikawa.kanagawa.jp\natsugi.kanagawa.jp\nayase.kanagawa.jp\nchigasaki.kanagawa.jp\nebina.kanagawa.jp\nfujisawa.kanagawa.jp\nhadano.kanagawa.jp\nhakone.kanagawa.jp\nhiratsuka.kanagawa.jp\nisehara.kanagawa.jp\nkaisei.kanagawa.jp\nkamakura.kanagawa.jp\nkiyokawa.kanagawa.jp\nmatsuda.kanagawa.jp\nminamiashigara.kanagawa.jp\nmiura.kanagawa.jp\nnakai.kanagawa.jp\nninomiya.kanagawa.jp\nodawara.kanagawa.jp\noi.kanagawa.jp\noiso.kanagawa.jp\nsagamihara.kanagawa.jp\nsamukawa.kanagawa.jp\ntsukui.kanagawa.jp\nyamakita.kanagawa.jp\nyamato.kanagawa.jp\nyokosuka.kanagawa.jp\nyugawara.kanagawa.jp\nzama.kanagawa.jp\nzushi.kanagawa.jp\naki.kochi.jp\ngeisei.kochi.jp\nhidaka.kochi.jp\nhigashitsuno.kochi.jp\nino.kochi.jp\nkagami.kochi.jp\nkami.kochi.jp\nkitagawa.kochi.jp\nkochi.kochi.jp\nmihara.kochi.jp\nmotoyama.kochi.jp\nmuroto.kochi.jp\nnahari.kochi.jp\nnakamura.kochi.jp\nnankoku.kochi.jp\nnishitosa.kochi.jp\nniyodogawa.kochi.jp\nochi.kochi.jp\nokawa.kochi.jp\notoyo.kochi.jp\notsuki.kochi.jp\nsakawa.kochi.jp\nsukumo.kochi.jp\nsusaki.kochi.jp\ntosa.kochi.jp\ntosashimizu.kochi.jp\ntoyo.kochi.jp\ntsuno.kochi.jp\numaji.kochi.jp\nyasuda.kochi.jp\nyusuhara.kochi.jp\namakusa.kumamoto.jp\narao.kumamoto.jp\naso.kumamoto.jp\nchoyo.kumamoto.jp\ngyokuto.kumamoto.jp\nkamiamakusa.kumamoto.jp\nkikuchi.kumamoto.jp\nkumamoto.kumamoto.jp\nmashiki.kumamoto.jp\nmifune.kumamoto.jp\nminamata.kumamoto.jp\nminamioguni.kumamoto.jp\nnagasu.kumamoto.jp\nnishihara.kumamoto.jp\noguni.kumamoto.jp\nozu.kumamoto.jp\nsumoto.kumamoto.jp\ntakamori.kumamoto.jp\nuki.kumamoto.jp\nuto.kumamoto.jp\nyamaga.kumamoto.jp\nyamato.kumamoto.jp\nyatsushiro.kumamoto.jp\nayabe.kyoto.jp\nfukuchiyama.kyoto.jp\nhigashiyama.kyoto.jp\nide.kyoto.jp\nine.kyoto.jp\njoyo.kyoto.jp\nkameoka.kyoto.jp\nkamo.kyoto.jp\nkita.kyoto.jp\nkizu.kyoto.jp\nkumiyama.kyoto.jp\nkyotamba.kyoto.jp\nkyotanabe.kyoto.jp\nkyotango.kyoto.jp\nmaizuru.kyoto.jp\nminami.kyoto.jp\nminamiyamashiro.kyoto.jp\nmiyazu.kyoto.jp\nmuko.kyoto.jp\nnagaokakyo.kyoto.jp\nnakagyo.kyoto.jp\nnantan.kyoto.jp\noyamazaki.kyoto.jp\nsakyo.kyoto.jp\nseika.kyoto.jp\ntanabe.kyoto.jp\nuji.kyoto.jp\nujitawara.kyoto.jp\nwazuka.kyoto.jp\nyamashina.kyoto.jp\nyawata.kyoto.jp\nasahi.mie.jp\ninabe.mie.jp\nise.mie.jp\nkameyama.mie.jp\nkawagoe.mie.jp\nkiho.mie.jp\nkisosaki.mie.jp\nkiwa.mie.jp\nkomono.mie.jp\nkumano.mie.jp\nkuwana.mie.jp\nmatsusaka.mie.jp\nmeiwa.mie.jp\nmihama.mie.jp\nminamiise.mie.jp\nmisugi.mie.jp\nmiyama.mie.jp\nnabari.mie.jp\nshima.mie.jp\nsuzuka.mie.jp\ntado.mie.jp\ntaiki.mie.jp\ntaki.mie.jp\ntamaki.mie.jp\ntoba.mie.jp\ntsu.mie.jp\nudono.mie.jp\nureshino.mie.jp\nwatarai.mie.jp\nyokkaichi.mie.jp\nfurukawa.miyagi.jp\nhigashimatsushima.miyagi.jp\nishinomaki.miyagi.jp\niwanuma.miyagi.jp\nkakuda.miyagi.jp\nkami.miyagi.jp\nkawasaki.miyagi.jp\nmarumori.miyagi.jp\nmatsushima.miyagi.jp\nminamisanriku.miyagi.jp\nmisato.miyagi.jp\nmurata.miyagi.jp\nnatori.miyagi.jp\nogawara.miyagi.jp\nohira.miyagi.jp\nonagawa.miyagi.jp\nosaki.miyagi.jp\nrifu.miyagi.jp\nsemine.miyagi.jp\nshibata.miyagi.jp\nshichikashuku.miyagi.jp\nshikama.miyagi.jp\nshiogama.miyagi.jp\nshiroishi.miyagi.jp\ntagajo.miyagi.jp\ntaiwa.miyagi.jp\ntome.miyagi.jp\ntomiya.miyagi.jp\nwakuya.miyagi.jp\nwatari.miyagi.jp\nyamamoto.miyagi.jp\nzao.miyagi.jp\naya.miyazaki.jp\nebino.miyazaki.jp\ngokase.miyazaki.jp\nhyuga.miyazaki.jp\nkadogawa.miyazaki.jp\nkawaminami.miyazaki.jp\nkijo.miyazaki.jp\nkitagawa.miyazaki.jp\nkitakata.miyazaki.jp\nkitaura.miyazaki.jp\nkobayashi.miyazaki.jp\nkunitomi.miyazaki.jp\nkushima.miyazaki.jp\nmimata.miyazaki.jp\nmiyakonojo.miyazaki.jp\nmiyazaki.miyazaki.jp\nmorotsuka.miyazaki.jp\nnichinan.miyazaki.jp\nnishimera.miyazaki.jp\nnobeoka.miyazaki.jp\nsaito.miyazaki.jp\nshiiba.miyazaki.jp\nshintomi.miyazaki.jp\ntakaharu.miyazaki.jp\ntakanabe.miyazaki.jp\ntakazaki.miyazaki.jp\ntsuno.miyazaki.jp\nachi.nagano.jp\nagematsu.nagano.jp\nanan.nagano.jp\naoki.nagano.jp\nasahi.nagano.jp\nazumino.nagano.jp\nchikuhoku.nagano.jp\nchikuma.nagano.jp\nchino.nagano.jp\nfujimi.nagano.jp\nhakuba.nagano.jp\nhara.nagano.jp\nhiraya.nagano.jp\niida.nagano.jp\niijima.nagano.jp\niiyama.nagano.jp\niizuna.nagano.jp\nikeda.nagano.jp\nikusaka.nagano.jp\nina.nagano.jp\nkaruizawa.nagano.jp\nkawakami.nagano.jp\nkiso.nagano.jp\nkisofukushima.nagano.jp\nkitaaiki.nagano.jp\nkomagane.nagano.jp\nkomoro.nagano.jp\nmatsukawa.nagano.jp\nmatsumoto.nagano.jp\nmiasa.nagano.jp\nminamiaiki.nagano.jp\nminamimaki.nagano.jp\nminamiminowa.nagano.jp\nminowa.nagano.jp\nmiyada.nagano.jp\nmiyota.nagano.jp\nmochizuki.nagano.jp\nnagano.nagano.jp\nnagawa.nagano.jp\nnagiso.nagano.jp\nnakagawa.nagano.jp\nnakano.nagano.jp\nnozawaonsen.nagano.jp\nobuse.nagano.jp\nogawa.nagano.jp\nokaya.nagano.jp\nomachi.nagano.jp\nomi.nagano.jp\nookuwa.nagano.jp\nooshika.nagano.jp\notaki.nagano.jp\notari.nagano.jp\nsakae.nagano.jp\nsakaki.nagano.jp\nsaku.nagano.jp\nsakuho.nagano.jp\nshimosuwa.nagano.jp\nshinanomachi.nagano.jp\nshiojiri.nagano.jp\nsuwa.nagano.jp\nsuzaka.nagano.jp\ntakagi.nagano.jp\ntakamori.nagano.jp\ntakayama.nagano.jp\ntateshina.nagano.jp\ntatsuno.nagano.jp\ntogakushi.nagano.jp\ntogura.nagano.jp\ntomi.nagano.jp\nueda.nagano.jp\nwada.nagano.jp\nyamagata.nagano.jp\nyamanouchi.nagano.jp\nyasaka.nagano.jp\nyasuoka.nagano.jp\nchijiwa.nagasaki.jp\nfutsu.nagasaki.jp\ngoto.nagasaki.jp\nhasami.nagasaki.jp\nhirado.nagasaki.jp\niki.nagasaki.jp\nisahaya.nagasaki.jp\nkawatana.nagasaki.jp\nkuchinotsu.nagasaki.jp\nmatsuura.nagasaki.jp\nnagasaki.nagasaki.jp\nobama.nagasaki.jp\nomura.nagasaki.jp\noseto.nagasaki.jp\nsaikai.nagasaki.jp\nsasebo.nagasaki.jp\nseihi.nagasaki.jp\nshimabara.nagasaki.jp\nshinkamigoto.nagasaki.jp\ntogitsu.nagasaki.jp\ntsushima.nagasaki.jp\nunzen.nagasaki.jp\nando.nara.jp\ngose.nara.jp\nheguri.nara.jp\nhigashiyoshino.nara.jp\nikaruga.nara.jp\nikoma.nara.jp\nkamikitayama.nara.jp\nkanmaki.nara.jp\nkashiba.nara.jp\nkashihara.nara.jp\nkatsuragi.nara.jp\nkawai.nara.jp\nkawakami.nara.jp\nkawanishi.nara.jp\nkoryo.nara.jp\nkurotaki.nara.jp\nmitsue.nara.jp\nmiyake.nara.jp\nnara.nara.jp\nnosegawa.nara.jp\noji.nara.jp\nouda.nara.jp\noyodo.nara.jp\nsakurai.nara.jp\nsango.nara.jp\nshimoichi.nara.jp\nshimokitayama.nara.jp\nshinjo.nara.jp\nsoni.nara.jp\ntakatori.nara.jp\ntawaramoto.nara.jp\ntenkawa.nara.jp\ntenri.nara.jp\nuda.nara.jp\nyamatokoriyama.nara.jp\nyamatotakada.nara.jp\nyamazoe.nara.jp\nyoshino.nara.jp\naga.niigata.jp\nagano.niigata.jp\ngosen.niigata.jp\nitoigawa.niigata.jp\nizumozaki.niigata.jp\njoetsu.niigata.jp\nkamo.niigata.jp\nkariwa.niigata.jp\nkashiwazaki.niigata.jp\nminamiuonuma.niigata.jp\nmitsuke.niigata.jp\nmuika.niigata.jp\nmurakami.niigata.jp\nmyoko.niigata.jp\nnagaoka.niigata.jp\nniigata.niigata.jp\nojiya.niigata.jp\nomi.niigata.jp\nsado.niigata.jp\nsanjo.niigata.jp\nseiro.niigata.jp\nseirou.niigata.jp\nsekikawa.niigata.jp\nshibata.niigata.jp\ntagami.niigata.jp\ntainai.niigata.jp\ntochio.niigata.jp\ntokamachi.niigata.jp\ntsubame.niigata.jp\ntsunan.niigata.jp\nuonuma.niigata.jp\nyahiko.niigata.jp\nyoita.niigata.jp\nyuzawa.niigata.jp\nbeppu.oita.jp\nbungoono.oita.jp\nbungotakada.oita.jp\nhasama.oita.jp\nhiji.oita.jp\nhimeshima.oita.jp\nhita.oita.jp\nkamitsue.oita.jp\nkokonoe.oita.jp\nkuju.oita.jp\nkunisaki.oita.jp\nkusu.oita.jp\noita.oita.jp\nsaiki.oita.jp\ntaketa.oita.jp\ntsukumi.oita.jp\nusa.oita.jp\nusuki.oita.jp\nyufu.oita.jp\nakaiwa.okayama.jp\nasakuchi.okayama.jp\nbizen.okayama.jp\nhayashima.okayama.jp\nibara.okayama.jp\nkagamino.okayama.jp\nkasaoka.okayama.jp\nkibichuo.okayama.jp\nkumenan.okayama.jp\nkurashiki.okayama.jp\nmaniwa.okayama.jp\nmisaki.okayama.jp\nnagi.okayama.jp\nniimi.okayama.jp\nnishiawakura.okayama.jp\nokayama.okayama.jp\nsatosho.okayama.jp\nsetouchi.okayama.jp\nshinjo.okayama.jp\nshoo.okayama.jp\nsoja.okayama.jp\ntakahashi.okayama.jp\ntamano.okayama.jp\ntsuyama.okayama.jp\nwake.okayama.jp\nyakage.okayama.jp\naguni.okinawa.jp\nginowan.okinawa.jp\nginoza.okinawa.jp\ngushikami.okinawa.jp\nhaebaru.okinawa.jp\nhigashi.okinawa.jp\nhirara.okinawa.jp\niheya.okinawa.jp\nishigaki.okinawa.jp\nishikawa.okinawa.jp\nitoman.okinawa.jp\nizena.okinawa.jp\nkadena.okinawa.jp\nkin.okinawa.jp\nkitadaito.okinawa.jp\nkitanakagusuku.okinawa.jp\nkumejima.okinawa.jp\nkunigami.okinawa.jp\nminamidaito.okinawa.jp\nmotobu.okinawa.jp\nnago.okinawa.jp\nnaha.okinawa.jp\nnakagusuku.okinawa.jp\nnakijin.okinawa.jp\nnanjo.okinawa.jp\nnishihara.okinawa.jp\nogimi.okinawa.jp\nokinawa.okinawa.jp\nonna.okinawa.jp\nshimoji.okinawa.jp\ntaketomi.okinawa.jp\ntarama.okinawa.jp\ntokashiki.okinawa.jp\ntomigusuku.okinawa.jp\ntonaki.okinawa.jp\nurasoe.okinawa.jp\nuruma.okinawa.jp\nyaese.okinawa.jp\nyomitan.okinawa.jp\nyonabaru.okinawa.jp\nyonaguni.okinawa.jp\nzamami.okinawa.jp\nabeno.osaka.jp\nchihayaakasaka.osaka.jp\nchuo.osaka.jp\ndaito.osaka.jp\nfujiidera.osaka.jp\nhabikino.osaka.jp\nhannan.osaka.jp\nhigashiosaka.osaka.jp\nhigashisumiyoshi.osaka.jp\nhigashiyodogawa.osaka.jp\nhirakata.osaka.jp\nibaraki.osaka.jp\nikeda.osaka.jp\nizumi.osaka.jp\nizumiotsu.osaka.jp\nizumisano.osaka.jp\nkadoma.osaka.jp\nkaizuka.osaka.jp\nkanan.osaka.jp\nkashiwara.osaka.jp\nkatano.osaka.jp\nkawachinagano.osaka.jp\nkishiwada.osaka.jp\nkita.osaka.jp\nkumatori.osaka.jp\nmatsubara.osaka.jp\nminato.osaka.jp\nminoh.osaka.jp\nmisaki.osaka.jp\nmoriguchi.osaka.jp\nneyagawa.osaka.jp\nnishi.osaka.jp\nnose.osaka.jp\nosakasayama.osaka.jp\nsakai.osaka.jp\nsayama.osaka.jp\nsennan.osaka.jp\nsettsu.osaka.jp\nshijonawate.osaka.jp\nshimamoto.osaka.jp\nsuita.osaka.jp\ntadaoka.osaka.jp\ntaishi.osaka.jp\ntajiri.osaka.jp\ntakaishi.osaka.jp\ntakatsuki.osaka.jp\ntondabayashi.osaka.jp\ntoyonaka.osaka.jp\ntoyono.osaka.jp\nyao.osaka.jp\nariake.saga.jp\narita.saga.jp\nfukudomi.saga.jp\ngenkai.saga.jp\nhamatama.saga.jp\nhizen.saga.jp\nimari.saga.jp\nkamimine.saga.jp\nkanzaki.saga.jp\nkaratsu.saga.jp\nkashima.saga.jp\nkitagata.saga.jp\nkitahata.saga.jp\nkiyama.saga.jp\nkouhoku.saga.jp\nkyuragi.saga.jp\nnishiarita.saga.jp\nogi.saga.jp\nomachi.saga.jp\nouchi.saga.jp\nsaga.saga.jp\nshiroishi.saga.jp\ntaku.saga.jp\ntara.saga.jp\ntosu.saga.jp\nyoshinogari.saga.jp\narakawa.saitama.jp\nasaka.saitama.jp\nchichibu.saitama.jp\nfujimi.saitama.jp\nfujimino.saitama.jp\nfukaya.saitama.jp\nhanno.saitama.jp\nhanyu.saitama.jp\nhasuda.saitama.jp\nhatogaya.saitama.jp\nhatoyama.saitama.jp\nhidaka.saitama.jp\nhigashichichibu.saitama.jp\nhigashimatsuyama.saitama.jp\nhonjo.saitama.jp\nina.saitama.jp\niruma.saitama.jp\niwatsuki.saitama.jp\nkamiizumi.saitama.jp\nkamikawa.saitama.jp\nkamisato.saitama.jp\nkasukabe.saitama.jp\nkawagoe.saitama.jp\nkawaguchi.saitama.jp\nkawajima.saitama.jp\nkazo.saitama.jp\nkitamoto.saitama.jp\nkoshigaya.saitama.jp\nkounosu.saitama.jp\nkuki.saitama.jp\nkumagaya.saitama.jp\nmatsubushi.saitama.jp\nminano.saitama.jp\nmisato.saitama.jp\nmiyashiro.saitama.jp\nmiyoshi.saitama.jp\nmoroyama.saitama.jp\nnagatoro.saitama.jp\nnamegawa.saitama.jp\nniiza.saitama.jp\nogano.saitama.jp\nogawa.saitama.jp\nogose.saitama.jp\nokegawa.saitama.jp\nomiya.saitama.jp\notaki.saitama.jp\nranzan.saitama.jp\nryokami.saitama.jp\nsaitama.saitama.jp\nsakado.saitama.jp\nsatte.saitama.jp\nsayama.saitama.jp\nshiki.saitama.jp\nshiraoka.saitama.jp\nsoka.saitama.jp\nsugito.saitama.jp\ntoda.saitama.jp\ntokigawa.saitama.jp\ntokorozawa.saitama.jp\ntsurugashima.saitama.jp\nurawa.saitama.jp\nwarabi.saitama.jp\nyashio.saitama.jp\nyokoze.saitama.jp\nyono.saitama.jp\nyorii.saitama.jp\nyoshida.saitama.jp\nyoshikawa.saitama.jp\nyoshimi.saitama.jp\naisho.shiga.jp\ngamo.shiga.jp\nhigashiomi.shiga.jp\nhikone.shiga.jp\nkoka.shiga.jp\nkonan.shiga.jp\nkosei.shiga.jp\nkoto.shiga.jp\nkusatsu.shiga.jp\nmaibara.shiga.jp\nmoriyama.shiga.jp\nnagahama.shiga.jp\nnishiazai.shiga.jp\nnotogawa.shiga.jp\nomihachiman.shiga.jp\notsu.shiga.jp\nritto.shiga.jp\nryuoh.shiga.jp\ntakashima.shiga.jp\ntakatsuki.shiga.jp\ntorahime.shiga.jp\ntoyosato.shiga.jp\nyasu.shiga.jp\nakagi.shimane.jp\nama.shimane.jp\ngotsu.shimane.jp\nhamada.shimane.jp\nhigashiizumo.shimane.jp\nhikawa.shimane.jp\nhikimi.shimane.jp\nizumo.shimane.jp\nkakinoki.shimane.jp\nmasuda.shimane.jp\nmatsue.shimane.jp\nmisato.shimane.jp\nnishinoshima.shimane.jp\nohda.shimane.jp\nokinoshima.shimane.jp\nokuizumo.shimane.jp\nshimane.shimane.jp\ntamayu.shimane.jp\ntsuwano.shimane.jp\nunnan.shimane.jp\nyakumo.shimane.jp\nyasugi.shimane.jp\nyatsuka.shimane.jp\narai.shizuoka.jp\natami.shizuoka.jp\nfuji.shizuoka.jp\nfujieda.shizuoka.jp\nfujikawa.shizuoka.jp\nfujinomiya.shizuoka.jp\nfukuroi.shizuoka.jp\ngotemba.shizuoka.jp\nhaibara.shizuoka.jp\nhamamatsu.shizuoka.jp\nhigashiizu.shizuoka.jp\nito.shizuoka.jp\niwata.shizuoka.jp\nizu.shizuoka.jp\nizunokuni.shizuoka.jp\nkakegawa.shizuoka.jp\nkannami.shizuoka.jp\nkawanehon.shizuoka.jp\nkawazu.shizuoka.jp\nkikugawa.shizuoka.jp\nkosai.shizuoka.jp\nmakinohara.shizuoka.jp\nmatsuzaki.shizuoka.jp\nminamiizu.shizuoka.jp\nmishima.shizuoka.jp\nmorimachi.shizuoka.jp\nnishiizu.shizuoka.jp\nnumazu.shizuoka.jp\nomaezaki.shizuoka.jp\nshimada.shizuoka.jp\nshimizu.shizuoka.jp\nshimoda.shizuoka.jp\nshizuoka.shizuoka.jp\nsusono.shizuoka.jp\nyaizu.shizuoka.jp\nyoshida.shizuoka.jp\nashikaga.tochigi.jp\nbato.tochigi.jp\nhaga.tochigi.jp\nichikai.tochigi.jp\niwafune.tochigi.jp\nkaminokawa.tochigi.jp\nkanuma.tochigi.jp\nkarasuyama.tochigi.jp\nkuroiso.tochigi.jp\nmashiko.tochigi.jp\nmibu.tochigi.jp\nmoka.tochigi.jp\nmotegi.tochigi.jp\nnasu.tochigi.jp\nnasushiobara.tochigi.jp\nnikko.tochigi.jp\nnishikata.tochigi.jp\nnogi.tochigi.jp\nohira.tochigi.jp\nohtawara.tochigi.jp\noyama.tochigi.jp\nsakura.tochigi.jp\nsano.tochigi.jp\nshimotsuke.tochigi.jp\nshioya.tochigi.jp\ntakanezawa.tochigi.jp\ntochigi.tochigi.jp\ntsuga.tochigi.jp\nujiie.tochigi.jp\nutsunomiya.tochigi.jp\nyaita.tochigi.jp\naizumi.tokushima.jp\nanan.tokushima.jp\nichiba.tokushima.jp\nitano.tokushima.jp\nkainan.tokushima.jp\nkomatsushima.tokushima.jp\nmatsushige.tokushima.jp\nmima.tokushima.jp\nminami.tokushima.jp\nmiyoshi.tokushima.jp\nmugi.tokushima.jp\nnakagawa.tokushima.jp\nnaruto.tokushima.jp\nsanagochi.tokushima.jp\nshishikui.tokushima.jp\ntokushima.tokushima.jp\nwajiki.tokushima.jp\nadachi.tokyo.jp\nakiruno.tokyo.jp\nakishima.tokyo.jp\naogashima.tokyo.jp\narakawa.tokyo.jp\nbunkyo.tokyo.jp\nchiyoda.tokyo.jp\nchofu.tokyo.jp\nchuo.tokyo.jp\nedogawa.tokyo.jp\nfuchu.tokyo.jp\nfussa.tokyo.jp\nhachijo.tokyo.jp\nhachioji.tokyo.jp\nhamura.tokyo.jp\nhigashikurume.tokyo.jp\nhigashimurayama.tokyo.jp\nhigashiyamato.tokyo.jp\nhino.tokyo.jp\nhinode.tokyo.jp\nhinohara.tokyo.jp\ninagi.tokyo.jp\nitabashi.tokyo.jp\nkatsushika.tokyo.jp\nkita.tokyo.jp\nkiyose.tokyo.jp\nkodaira.tokyo.jp\nkoganei.tokyo.jp\nkokubunji.tokyo.jp\nkomae.tokyo.jp\nkoto.tokyo.jp\nkouzushima.tokyo.jp\nkunitachi.tokyo.jp\nmachida.tokyo.jp\nmeguro.tokyo.jp\nminato.tokyo.jp\nmitaka.tokyo.jp\nmizuho.tokyo.jp\nmusashimurayama.tokyo.jp\nmusashino.tokyo.jp\nnakano.tokyo.jp\nnerima.tokyo.jp\nogasawara.tokyo.jp\nokutama.tokyo.jp\nome.tokyo.jp\noshima.tokyo.jp\nota.tokyo.jp\nsetagaya.tokyo.jp\nshibuya.tokyo.jp\nshinagawa.tokyo.jp\nshinjuku.tokyo.jp\nsuginami.tokyo.jp\nsumida.tokyo.jp\ntachikawa.tokyo.jp\ntaito.tokyo.jp\ntama.tokyo.jp\ntoshima.tokyo.jp\nchizu.tottori.jp\nhino.tottori.jp\nkawahara.tottori.jp\nkoge.tottori.jp\nkotoura.tottori.jp\nmisasa.tottori.jp\nnanbu.tottori.jp\nnichinan.tottori.jp\nsakaiminato.tottori.jp\ntottori.tottori.jp\nwakasa.tottori.jp\nyazu.tottori.jp\nyonago.tottori.jp\nasahi.toyama.jp\nfuchu.toyama.jp\nfukumitsu.toyama.jp\nfunahashi.toyama.jp\nhimi.toyama.jp\nimizu.toyama.jp\ninami.toyama.jp\njohana.toyama.jp\nkamiichi.toyama.jp\nkurobe.toyama.jp\nnakaniikawa.toyama.jp\nnamerikawa.toyama.jp\nnanto.toyama.jp\nnyuzen.toyama.jp\noyabe.toyama.jp\ntaira.toyama.jp\ntakaoka.toyama.jp\ntateyama.toyama.jp\ntoga.toyama.jp\ntonami.toyama.jp\ntoyama.toyama.jp\nunazuki.toyama.jp\nuozu.toyama.jp\nyamada.toyama.jp\narida.wakayama.jp\naridagawa.wakayama.jp\ngobo.wakayama.jp\nhashimoto.wakayama.jp\nhidaka.wakayama.jp\nhirogawa.wakayama.jp\ninami.wakayama.jp\niwade.wakayama.jp\nkainan.wakayama.jp\nkamitonda.wakayama.jp\nkatsuragi.wakayama.jp\nkimino.wakayama.jp\nkinokawa.wakayama.jp\nkitayama.wakayama.jp\nkoya.wakayama.jp\nkoza.wakayama.jp\nkozagawa.wakayama.jp\nkudoyama.wakayama.jp\nkushimoto.wakayama.jp\nmihama.wakayama.jp\nmisato.wakayama.jp\nnachikatsuura.wakayama.jp\nshingu.wakayama.jp\nshirahama.wakayama.jp\ntaiji.wakayama.jp\ntanabe.wakayama.jp\nwakayama.wakayama.jp\nyuasa.wakayama.jp\nyura.wakayama.jp\nasahi.yamagata.jp\nfunagata.yamagata.jp\nhigashine.yamagata.jp\niide.yamagata.jp\nkahoku.yamagata.jp\nkaminoyama.yamagata.jp\nkaneyama.yamagata.jp\nkawanishi.yamagata.jp\nmamurogawa.yamagata.jp\nmikawa.yamagata.jp\nmurayama.yamagata.jp\nnagai.yamagata.jp\nnakayama.yamagata.jp\nnanyo.yamagata.jp\nnishikawa.yamagata.jp\nobanazawa.yamagata.jp\noe.yamagata.jp\noguni.yamagata.jp\nohkura.yamagata.jp\noishida.yamagata.jp\nsagae.yamagata.jp\nsakata.yamagata.jp\nsakegawa.yamagata.jp\nshinjo.yamagata.jp\nshirataka.yamagata.jp\nshonai.yamagata.jp\ntakahata.yamagata.jp\ntendo.yamagata.jp\ntozawa.yamagata.jp\ntsuruoka.yamagata.jp\nyamagata.yamagata.jp\nyamanobe.yamagata.jp\nyonezawa.yamagata.jp\nyuza.yamagata.jp\nabu.yamaguchi.jp\nhagi.yamaguchi.jp\nhikari.yamaguchi.jp\nhofu.yamaguchi.jp\niwakuni.yamaguchi.jp\nkudamatsu.yamaguchi.jp\nmitou.yamaguchi.jp\nnagato.yamaguchi.jp\noshima.yamaguchi.jp\nshimonoseki.yamaguchi.jp\nshunan.yamaguchi.jp\ntabuse.yamaguchi.jp\ntokuyama.yamaguchi.jp\ntoyota.yamaguchi.jp\nube.yamaguchi.jp\nyuu.yamaguchi.jp\nchuo.yamanashi.jp\ndoshi.yamanashi.jp\nfuefuki.yamanashi.jp\nfujikawa.yamanashi.jp\nfujikawaguchiko.yamanashi.jp\nfujiyoshida.yamanashi.jp\nhayakawa.yamanashi.jp\nhokuto.yamanashi.jp\nichikawamisato.yamanashi.jp\nkai.yamanashi.jp\nkofu.yamanashi.jp\nkoshu.yamanashi.jp\nkosuge.yamanashi.jp\nminami-alps.yamanashi.jp\nminobu.yamanashi.jp\nnakamichi.yamanashi.jp\nnanbu.yamanashi.jp\nnarusawa.yamanashi.jp\nnirasaki.yamanashi.jp\nnishikatsura.yamanashi.jp\noshino.yamanashi.jp\notsuki.yamanashi.jp\nshowa.yamanashi.jp\ntabayama.yamanashi.jp\ntsuru.yamanashi.jp\nuenohara.yamanashi.jp\nyamanakako.yamanashi.jp\nyamanashi.yamanashi.jp\n\n// ke : http://www.kenic.or.ke/index.php/en/ke-domains/ke-domains\nke\nac.ke\nco.ke\ngo.ke\ninfo.ke\nme.ke\nmobi.ke\nne.ke\nor.ke\nsc.ke\n\n// kg : http://www.domain.kg/dmn_n.html\nkg\norg.kg\nnet.kg\ncom.kg\nedu.kg\ngov.kg\nmil.kg\n\n// kh : http://www.mptc.gov.kh/dns_registration.htm\n*.kh\n\n// ki : http://www.ki/dns/index.html\nki\nedu.ki\nbiz.ki\nnet.ki\norg.ki\ngov.ki\ninfo.ki\ncom.ki\n\n// km : https://en.wikipedia.org/wiki/.km\n// http://www.domaine.km/documents/charte.doc\nkm\norg.km\nnom.km\ngov.km\nprd.km\ntm.km\nedu.km\nmil.km\nass.km\ncom.km\n// These are only mentioned as proposed suggestions at domaine.km, but\n// https://en.wikipedia.org/wiki/.km says they're available for registration:\ncoop.km\nasso.km\npresse.km\nmedecin.km\nnotaires.km\npharmaciens.km\nveterinaire.km\ngouv.km\n\n// kn : https://en.wikipedia.org/wiki/.kn\n// http://www.dot.kn/domainRules.html\nkn\nnet.kn\norg.kn\nedu.kn\ngov.kn\n\n// kp : http://www.kcce.kp/en_index.php\nkp\ncom.kp\nedu.kp\ngov.kp\norg.kp\nrep.kp\ntra.kp\n\n// kr : https://en.wikipedia.org/wiki/.kr\n// see also: http://domain.nida.or.kr/eng/registration.jsp\nkr\nac.kr\nco.kr\nes.kr\ngo.kr\nhs.kr\nkg.kr\nmil.kr\nms.kr\nne.kr\nor.kr\npe.kr\nre.kr\nsc.kr\n// kr geographical names\nbusan.kr\nchungbuk.kr\nchungnam.kr\ndaegu.kr\ndaejeon.kr\ngangwon.kr\ngwangju.kr\ngyeongbuk.kr\ngyeonggi.kr\ngyeongnam.kr\nincheon.kr\njeju.kr\njeonbuk.kr\njeonnam.kr\nseoul.kr\nulsan.kr\n\n// kw : https://www.nic.kw/policies/\n// Confirmed by registry <nic.tech@citra.gov.kw>\nkw\ncom.kw\nedu.kw\nemb.kw\ngov.kw\nind.kw\nnet.kw\norg.kw\n\n// ky : http://www.icta.ky/da_ky_reg_dom.php\n// Confirmed by registry <kysupport@perimeterusa.com> 2008-06-17\nky\nedu.ky\ngov.ky\ncom.ky\norg.ky\nnet.ky\n\n// kz : https://en.wikipedia.org/wiki/.kz\n// see also: http://www.nic.kz/rules/index.jsp\nkz\norg.kz\nedu.kz\nnet.kz\ngov.kz\nmil.kz\ncom.kz\n\n// la : https://en.wikipedia.org/wiki/.la\n// Submitted by registry <gavin.brown@nic.la>\nla\nint.la\nnet.la\ninfo.la\nedu.la\ngov.la\nper.la\ncom.la\norg.la\n\n// lb : https://en.wikipedia.org/wiki/.lb\n// Submitted by registry <randy@psg.com>\nlb\ncom.lb\nedu.lb\ngov.lb\nnet.lb\norg.lb\n\n// lc : https://en.wikipedia.org/wiki/.lc\n// see also: http://www.nic.lc/rules.htm\nlc\ncom.lc\nnet.lc\nco.lc\norg.lc\nedu.lc\ngov.lc\n\n// li : https://en.wikipedia.org/wiki/.li\nli\n\n// lk : http://www.nic.lk/seclevpr.html\nlk\ngov.lk\nsch.lk\nnet.lk\nint.lk\ncom.lk\norg.lk\nedu.lk\nngo.lk\nsoc.lk\nweb.lk\nltd.lk\nassn.lk\ngrp.lk\nhotel.lk\nac.lk\n\n// lr : http://psg.com/dns/lr/lr.txt\n// Submitted by registry <randy@psg.com>\nlr\ncom.lr\nedu.lr\ngov.lr\norg.lr\nnet.lr\n\n// ls : https://en.wikipedia.org/wiki/.ls\nls\nco.ls\norg.ls\n\n// lt : https://en.wikipedia.org/wiki/.lt\nlt\n// gov.lt : http://www.gov.lt/index_en.php\ngov.lt\n\n// lu : http://www.dns.lu/en/\nlu\n\n// lv : http://www.nic.lv/DNS/En/generic.php\nlv\ncom.lv\nedu.lv\ngov.lv\norg.lv\nmil.lv\nid.lv\nnet.lv\nasn.lv\nconf.lv\n\n// ly : http://www.nic.ly/regulations.php\nly\ncom.ly\nnet.ly\ngov.ly\nplc.ly\nedu.ly\nsch.ly\nmed.ly\norg.ly\nid.ly\n\n// ma : https://en.wikipedia.org/wiki/.ma\n// http://www.anrt.ma/fr/admin/download/upload/file_fr782.pdf\nma\nco.ma\nnet.ma\ngov.ma\norg.ma\nac.ma\npress.ma\n\n// mc : http://www.nic.mc/\nmc\ntm.mc\nasso.mc\n\n// md : https://en.wikipedia.org/wiki/.md\nmd\n\n// me : https://en.wikipedia.org/wiki/.me\nme\nco.me\nnet.me\norg.me\nedu.me\nac.me\ngov.me\nits.me\npriv.me\n\n// mg : http://nic.mg/nicmg/?page_id=39\nmg\norg.mg\nnom.mg\ngov.mg\nprd.mg\ntm.mg\nedu.mg\nmil.mg\ncom.mg\nco.mg\n\n// mh : https://en.wikipedia.org/wiki/.mh\nmh\n\n// mil : https://en.wikipedia.org/wiki/.mil\nmil\n\n// mk : https://en.wikipedia.org/wiki/.mk\n// see also: http://dns.marnet.net.mk/postapka.php\nmk\ncom.mk\norg.mk\nnet.mk\nedu.mk\ngov.mk\ninf.mk\nname.mk\n\n// ml : http://www.gobin.info/domainname/ml-template.doc\n// see also: https://en.wikipedia.org/wiki/.ml\nml\ncom.ml\nedu.ml\ngouv.ml\ngov.ml\nnet.ml\norg.ml\npresse.ml\n\n// mm : https://en.wikipedia.org/wiki/.mm\n*.mm\n\n// mn : https://en.wikipedia.org/wiki/.mn\nmn\ngov.mn\nedu.mn\norg.mn\n\n// mo : http://www.monic.net.mo/\nmo\ncom.mo\nnet.mo\norg.mo\nedu.mo\ngov.mo\n\n// mobi : https://en.wikipedia.org/wiki/.mobi\nmobi\n\n// mp : http://www.dot.mp/\n// Confirmed by registry <dcamacho@saipan.com> 2008-06-17\nmp\n\n// mq : https://en.wikipedia.org/wiki/.mq\nmq\n\n// mr : https://en.wikipedia.org/wiki/.mr\nmr\ngov.mr\n\n// ms : http://www.nic.ms/pdf/MS_Domain_Name_Rules.pdf\nms\ncom.ms\nedu.ms\ngov.ms\nnet.ms\norg.ms\n\n// mt : https://www.nic.org.mt/go/policy\n// Submitted by registry <help@nic.org.mt>\nmt\ncom.mt\nedu.mt\nnet.mt\norg.mt\n\n// mu : https://en.wikipedia.org/wiki/.mu\nmu\ncom.mu\nnet.mu\norg.mu\ngov.mu\nac.mu\nco.mu\nor.mu\n\n// museum : http://about.museum/naming/\n// http://index.museum/\nmuseum\nacademy.museum\nagriculture.museum\nair.museum\nairguard.museum\nalabama.museum\nalaska.museum\namber.museum\nambulance.museum\namerican.museum\namericana.museum\namericanantiques.museum\namericanart.museum\namsterdam.museum\nand.museum\nannefrank.museum\nanthro.museum\nanthropology.museum\nantiques.museum\naquarium.museum\narboretum.museum\narchaeological.museum\narchaeology.museum\narchitecture.museum\nart.museum\nartanddesign.museum\nartcenter.museum\nartdeco.museum\narteducation.museum\nartgallery.museum\narts.museum\nartsandcrafts.museum\nasmatart.museum\nassassination.museum\nassisi.museum\nassociation.museum\nastronomy.museum\natlanta.museum\naustin.museum\naustralia.museum\nautomotive.museum\naviation.museum\naxis.museum\nbadajoz.museum\nbaghdad.museum\nbahn.museum\nbale.museum\nbaltimore.museum\nbarcelona.museum\nbaseball.museum\nbasel.museum\nbaths.museum\nbauern.museum\nbeauxarts.museum\nbeeldengeluid.museum\nbellevue.museum\nbergbau.museum\nberkeley.museum\nberlin.museum\nbern.museum\nbible.museum\nbilbao.museum\nbill.museum\nbirdart.museum\nbirthplace.museum\nbonn.museum\nboston.museum\nbotanical.museum\nbotanicalgarden.museum\nbotanicgarden.museum\nbotany.museum\nbrandywinevalley.museum\nbrasil.museum\nbristol.museum\nbritish.museum\nbritishcolumbia.museum\nbroadcast.museum\nbrunel.museum\nbrussel.museum\nbrussels.museum\nbruxelles.museum\nbuilding.museum\nburghof.museum\nbus.museum\nbushey.museum\ncadaques.museum\ncalifornia.museum\ncambridge.museum\ncan.museum\ncanada.museum\ncapebreton.museum\ncarrier.museum\ncartoonart.museum\ncasadelamoneda.museum\ncastle.museum\ncastres.museum\nceltic.museum\ncenter.museum\nchattanooga.museum\ncheltenham.museum\nchesapeakebay.museum\nchicago.museum\nchildren.museum\nchildrens.museum\nchildrensgarden.museum\nchiropractic.museum\nchocolate.museum\nchristiansburg.museum\ncincinnati.museum\ncinema.museum\ncircus.museum\ncivilisation.museum\ncivilization.museum\ncivilwar.museum\nclinton.museum\nclock.museum\ncoal.museum\ncoastaldefence.museum\ncody.museum\ncoldwar.museum\ncollection.museum\ncolonialwilliamsburg.museum\ncoloradoplateau.museum\ncolumbia.museum\ncolumbus.museum\ncommunication.museum\ncommunications.museum\ncommunity.museum\ncomputer.museum\ncomputerhistory.museum\ncomunica\u00E7\u00F5es.museum\ncontemporary.museum\ncontemporaryart.museum\nconvent.museum\ncopenhagen.museum\ncorporation.museum\ncorreios-e-telecomunica\u00E7\u00F5es.museum\ncorvette.museum\ncostume.museum\ncountryestate.museum\ncounty.museum\ncrafts.museum\ncranbrook.museum\ncreation.museum\ncultural.museum\nculturalcenter.museum\nculture.museum\ncyber.museum\ncymru.museum\ndali.museum\ndallas.museum\ndatabase.museum\nddr.museum\ndecorativearts.museum\ndelaware.museum\ndelmenhorst.museum\ndenmark.museum\ndepot.museum\ndesign.museum\ndetroit.museum\ndinosaur.museum\ndiscovery.museum\ndolls.museum\ndonostia.museum\ndurham.museum\neastafrica.museum\neastcoast.museum\neducation.museum\neducational.museum\negyptian.museum\neisenbahn.museum\nelburg.museum\nelvendrell.museum\nembroidery.museum\nencyclopedic.museum\nengland.museum\nentomology.museum\nenvironment.museum\nenvironmentalconservation.museum\nepilepsy.museum\nessex.museum\nestate.museum\nethnology.museum\nexeter.museum\nexhibition.museum\nfamily.museum\nfarm.museum\nfarmequipment.museum\nfarmers.museum\nfarmstead.museum\nfield.museum\nfigueres.museum\nfilatelia.museum\nfilm.museum\nfineart.museum\nfinearts.museum\nfinland.museum\nflanders.museum\nflorida.museum\nforce.museum\nfortmissoula.museum\nfortworth.museum\nfoundation.museum\nfrancaise.museum\nfrankfurt.museum\nfranziskaner.museum\nfreemasonry.museum\nfreiburg.museum\nfribourg.museum\nfrog.museum\nfundacio.museum\nfurniture.museum\ngallery.museum\ngarden.museum\ngateway.museum\ngeelvinck.museum\ngemological.museum\ngeology.museum\ngeorgia.museum\ngiessen.museum\nglas.museum\nglass.museum\ngorge.museum\ngrandrapids.museum\ngraz.museum\nguernsey.museum\nhalloffame.museum\nhamburg.museum\nhandson.museum\nharvestcelebration.museum\nhawaii.museum\nhealth.museum\nheimatunduhren.museum\nhellas.museum\nhelsinki.museum\nhembygdsforbund.museum\nheritage.museum\nhistoire.museum\nhistorical.museum\nhistoricalsociety.museum\nhistorichouses.museum\nhistorisch.museum\nhistorisches.museum\nhistory.museum\nhistoryofscience.museum\nhorology.museum\nhouse.museum\nhumanities.museum\nillustration.museum\nimageandsound.museum\nindian.museum\nindiana.museum\nindianapolis.museum\nindianmarket.museum\nintelligence.museum\ninteractive.museum\niraq.museum\niron.museum\nisleofman.museum\njamison.museum\njefferson.museum\njerusalem.museum\njewelry.museum\njewish.museum\njewishart.museum\njfk.museum\njournalism.museum\njudaica.museum\njudygarland.museum\njuedisches.museum\njuif.museum\nkarate.museum\nkarikatur.museum\nkids.museum\nkoebenhavn.museum\nkoeln.museum\nkunst.museum\nkunstsammlung.museum\nkunstunddesign.museum\nlabor.museum\nlabour.museum\nlajolla.museum\nlancashire.museum\nlandes.museum\nlans.museum\nl\u00E4ns.museum\nlarsson.museum\nlewismiller.museum\nlincoln.museum\nlinz.museum\nliving.museum\nlivinghistory.museum\nlocalhistory.museum\nlondon.museum\nlosangeles.museum\nlouvre.museum\nloyalist.museum\nlucerne.museum\nluxembourg.museum\nluzern.museum\nmad.museum\nmadrid.museum\nmallorca.museum\nmanchester.museum\nmansion.museum\nmansions.museum\nmanx.museum\nmarburg.museum\nmaritime.museum\nmaritimo.museum\nmaryland.museum\nmarylhurst.museum\nmedia.museum\nmedical.museum\nmedizinhistorisches.museum\nmeeres.museum\nmemorial.museum\nmesaverde.museum\nmichigan.museum\nmidatlantic.museum\nmilitary.museum\nmill.museum\nminers.museum\nmining.museum\nminnesota.museum\nmissile.museum\nmissoula.museum\nmodern.museum\nmoma.museum\nmoney.museum\nmonmouth.museum\nmonticello.museum\nmontreal.museum\nmoscow.museum\nmotorcycle.museum\nmuenchen.museum\nmuenster.museum\nmulhouse.museum\nmuncie.museum\nmuseet.museum\nmuseumcenter.museum\nmuseumvereniging.museum\nmusic.museum\nnational.museum\nnationalfirearms.museum\nnationalheritage.museum\nnativeamerican.museum\nnaturalhistory.museum\nnaturalhistorymuseum.museum\nnaturalsciences.museum\nnature.museum\nnaturhistorisches.museum\nnatuurwetenschappen.museum\nnaumburg.museum\nnaval.museum\nnebraska.museum\nneues.museum\nnewhampshire.museum\nnewjersey.museum\nnewmexico.museum\nnewport.museum\nnewspaper.museum\nnewyork.museum\nniepce.museum\nnorfolk.museum\nnorth.museum\nnrw.museum\nnuernberg.museum\nnuremberg.museum\nnyc.museum\nnyny.museum\noceanographic.museum\noceanographique.museum\nomaha.museum\nonline.museum\nontario.museum\nopenair.museum\noregon.museum\noregontrail.museum\notago.museum\noxford.museum\npacific.museum\npaderborn.museum\npalace.museum\npaleo.museum\npalmsprings.museum\npanama.museum\nparis.museum\npasadena.museum\npharmacy.museum\nphiladelphia.museum\nphiladelphiaarea.museum\nphilately.museum\nphoenix.museum\nphotography.museum\npilots.museum\npittsburgh.museum\nplanetarium.museum\nplantation.museum\nplants.museum\nplaza.museum\nportal.museum\nportland.museum\nportlligat.museum\nposts-and-telecommunications.museum\npreservation.museum\npresidio.museum\npress.museum\nproject.museum\npublic.museum\npubol.museum\nquebec.museum\nrailroad.museum\nrailway.museum\nresearch.museum\nresistance.museum\nriodejaneiro.museum\nrochester.museum\nrockart.museum\nroma.museum\nrussia.museum\nsaintlouis.museum\nsalem.museum\nsalvadordali.museum\nsalzburg.museum\nsandiego.museum\nsanfrancisco.museum\nsantabarbara.museum\nsantacruz.museum\nsantafe.museum\nsaskatchewan.museum\nsatx.museum\nsavannahga.museum\nschlesisches.museum\nschoenbrunn.museum\nschokoladen.museum\nschool.museum\nschweiz.museum\nscience.museum\nscienceandhistory.museum\nscienceandindustry.museum\nsciencecenter.museum\nsciencecenters.museum\nscience-fiction.museum\nsciencehistory.museum\nsciences.museum\nsciencesnaturelles.museum\nscotland.museum\nseaport.museum\nsettlement.museum\nsettlers.museum\nshell.museum\nsherbrooke.museum\nsibenik.museum\nsilk.museum\nski.museum\nskole.museum\nsociety.museum\nsologne.museum\nsoundandvision.museum\nsouthcarolina.museum\nsouthwest.museum\nspace.museum\nspy.museum\nsquare.museum\nstadt.museum\nstalbans.museum\nstarnberg.museum\nstate.museum\nstateofdelaware.museum\nstation.museum\nsteam.museum\nsteiermark.museum\nstjohn.museum\nstockholm.museum\nstpetersburg.museum\nstuttgart.museum\nsuisse.museum\nsurgeonshall.museum\nsurrey.museum\nsvizzera.museum\nsweden.museum\nsydney.museum\ntank.museum\ntcm.museum\ntechnology.museum\ntelekommunikation.museum\ntelevision.museum\ntexas.museum\ntextile.museum\ntheater.museum\ntime.museum\ntimekeeping.museum\ntopology.museum\ntorino.museum\ntouch.museum\ntown.museum\ntransport.museum\ntree.museum\ntrolley.museum\ntrust.museum\ntrustee.museum\nuhren.museum\nulm.museum\nundersea.museum\nuniversity.museum\nusa.museum\nusantiques.museum\nusarts.museum\nuscountryestate.museum\nusculture.museum\nusdecorativearts.museum\nusgarden.museum\nushistory.museum\nushuaia.museum\nuslivinghistory.museum\nutah.museum\nuvic.museum\nvalley.museum\nvantaa.museum\nversailles.museum\nviking.museum\nvillage.museum\nvirginia.museum\nvirtual.museum\nvirtuel.museum\nvlaanderen.museum\nvolkenkunde.museum\nwales.museum\nwallonie.museum\nwar.museum\nwashingtondc.museum\nwatchandclock.museum\nwatch-and-clock.museum\nwestern.museum\nwestfalen.museum\nwhaling.museum\nwildlife.museum\nwilliamsburg.museum\nwindmill.museum\nworkshop.museum\nyork.museum\nyorkshire.museum\nyosemite.museum\nyouth.museum\nzoological.museum\nzoology.museum\n\u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD.museum\n\u0438\u043A\u043E\u043C.museum\n\n// mv : https://en.wikipedia.org/wiki/.mv\n// \"mv\" included because, contra Wikipedia, google.mv exists.\nmv\naero.mv\nbiz.mv\ncom.mv\ncoop.mv\nedu.mv\ngov.mv\ninfo.mv\nint.mv\nmil.mv\nmuseum.mv\nname.mv\nnet.mv\norg.mv\npro.mv\n\n// mw : http://www.registrar.mw/\nmw\nac.mw\nbiz.mw\nco.mw\ncom.mw\ncoop.mw\nedu.mw\ngov.mw\nint.mw\nmuseum.mw\nnet.mw\norg.mw\n\n// mx : http://www.nic.mx/\n// Submitted by registry <farias@nic.mx>\nmx\ncom.mx\norg.mx\ngob.mx\nedu.mx\nnet.mx\n\n// my : http://www.mynic.net.my/\nmy\ncom.my\nnet.my\norg.my\ngov.my\nedu.my\nmil.my\nname.my\n\n// mz : http://www.uem.mz/\n// Submitted by registry <antonio@uem.mz>\nmz\nac.mz\nadv.mz\nco.mz\nedu.mz\ngov.mz\nmil.mz\nnet.mz\norg.mz\n\n// na : http://www.na-nic.com.na/\n// http://www.info.na/domain/\nna\ninfo.na\npro.na\nname.na\nschool.na\nor.na\ndr.na\nus.na\nmx.na\nca.na\nin.na\ncc.na\ntv.na\nws.na\nmobi.na\nco.na\ncom.na\norg.na\n\n// name : has 2nd-level tlds, but there's no list of them\nname\n\n// nc : http://www.cctld.nc/\nnc\nasso.nc\nnom.nc\n\n// ne : https://en.wikipedia.org/wiki/.ne\nne\n\n// net : https://en.wikipedia.org/wiki/.net\nnet\n\n// nf : https://en.wikipedia.org/wiki/.nf\nnf\ncom.nf\nnet.nf\nper.nf\nrec.nf\nweb.nf\narts.nf\nfirm.nf\ninfo.nf\nother.nf\nstore.nf\n\n// ng : http://www.nira.org.ng/index.php/join-us/register-ng-domain/189-nira-slds\nng\ncom.ng\nedu.ng\ngov.ng\ni.ng\nmil.ng\nmobi.ng\nname.ng\nnet.ng\norg.ng\nsch.ng\n\n// ni : http://www.nic.ni/\nni\nac.ni\nbiz.ni\nco.ni\ncom.ni\nedu.ni\ngob.ni\nin.ni\ninfo.ni\nint.ni\nmil.ni\nnet.ni\nnom.ni\norg.ni\nweb.ni\n\n// nl : https://en.wikipedia.org/wiki/.nl\n//      https://www.sidn.nl/\n//      ccTLD for the Netherlands\nnl\n\n// BV.nl will be a registry for dutch BV's (besloten vennootschap)\nbv.nl\n\n// no : http://www.norid.no/regelverk/index.en.html\n// The Norwegian registry has declined to notify us of updates. The web pages\n// referenced below are the official source of the data. There is also an\n// announce mailing list:\n// https://postlister.uninett.no/sympa/info/norid-diskusjon\nno\n// Norid generic domains : http://www.norid.no/regelverk/vedlegg-c.en.html\nfhs.no\nvgs.no\nfylkesbibl.no\nfolkebibl.no\nmuseum.no\nidrett.no\npriv.no\n// Non-Norid generic domains : http://www.norid.no/regelverk/vedlegg-d.en.html\nmil.no\nstat.no\ndep.no\nkommune.no\nherad.no\n// no geographical names : http://www.norid.no/regelverk/vedlegg-b.en.html\n// counties\naa.no\nah.no\nbu.no\nfm.no\nhl.no\nhm.no\njan-mayen.no\nmr.no\nnl.no\nnt.no\nof.no\nol.no\noslo.no\nrl.no\nsf.no\nst.no\nsvalbard.no\ntm.no\ntr.no\nva.no\nvf.no\n// primary and lower secondary schools per county\ngs.aa.no\ngs.ah.no\ngs.bu.no\ngs.fm.no\ngs.hl.no\ngs.hm.no\ngs.jan-mayen.no\ngs.mr.no\ngs.nl.no\ngs.nt.no\ngs.of.no\ngs.ol.no\ngs.oslo.no\ngs.rl.no\ngs.sf.no\ngs.st.no\ngs.svalbard.no\ngs.tm.no\ngs.tr.no\ngs.va.no\ngs.vf.no\n// cities\nakrehamn.no\n\u00E5krehamn.no\nalgard.no\n\u00E5lg\u00E5rd.no\narna.no\nbrumunddal.no\nbryne.no\nbronnoysund.no\nbr\u00F8nn\u00F8ysund.no\ndrobak.no\ndr\u00F8bak.no\negersund.no\nfetsund.no\nfloro.no\nflor\u00F8.no\nfredrikstad.no\nhokksund.no\nhonefoss.no\nh\u00F8nefoss.no\njessheim.no\njorpeland.no\nj\u00F8rpeland.no\nkirkenes.no\nkopervik.no\nkrokstadelva.no\nlangevag.no\nlangev\u00E5g.no\nleirvik.no\nmjondalen.no\nmj\u00F8ndalen.no\nmo-i-rana.no\nmosjoen.no\nmosj\u00F8en.no\nnesoddtangen.no\norkanger.no\nosoyro.no\nos\u00F8yro.no\nraholt.no\nr\u00E5holt.no\nsandnessjoen.no\nsandnessj\u00F8en.no\nskedsmokorset.no\nslattum.no\nspjelkavik.no\nstathelle.no\nstavern.no\nstjordalshalsen.no\nstj\u00F8rdalshalsen.no\ntananger.no\ntranby.no\nvossevangen.no\n// communities\nafjord.no\n\u00E5fjord.no\nagdenes.no\nal.no\n\u00E5l.no\nalesund.no\n\u00E5lesund.no\nalstahaug.no\nalta.no\n\u00E1lt\u00E1.no\nalaheadju.no\n\u00E1laheadju.no\nalvdal.no\namli.no\n\u00E5mli.no\namot.no\n\u00E5mot.no\nandebu.no\nandoy.no\nand\u00F8y.no\nandasuolo.no\nardal.no\n\u00E5rdal.no\naremark.no\narendal.no\n\u00E5s.no\naseral.no\n\u00E5seral.no\nasker.no\naskim.no\naskvoll.no\naskoy.no\nask\u00F8y.no\nasnes.no\n\u00E5snes.no\naudnedaln.no\naukra.no\naure.no\naurland.no\naurskog-holand.no\naurskog-h\u00F8land.no\naustevoll.no\naustrheim.no\naveroy.no\naver\u00F8y.no\nbalestrand.no\nballangen.no\nbalat.no\nb\u00E1l\u00E1t.no\nbalsfjord.no\nbahccavuotna.no\nb\u00E1hccavuotna.no\nbamble.no\nbardu.no\nbeardu.no\nbeiarn.no\nbajddar.no\nb\u00E1jddar.no\nbaidar.no\nb\u00E1id\u00E1r.no\nberg.no\nbergen.no\nberlevag.no\nberlev\u00E5g.no\nbearalvahki.no\nbearalv\u00E1hki.no\nbindal.no\nbirkenes.no\nbjarkoy.no\nbjark\u00F8y.no\nbjerkreim.no\nbjugn.no\nbodo.no\nbod\u00F8.no\nbadaddja.no\nb\u00E5d\u00E5ddj\u00E5.no\nbudejju.no\nbokn.no\nbremanger.no\nbronnoy.no\nbr\u00F8nn\u00F8y.no\nbygland.no\nbykle.no\nbarum.no\nb\u00E6rum.no\nbo.telemark.no\nb\u00F8.telemark.no\nbo.nordland.no\nb\u00F8.nordland.no\nbievat.no\nbiev\u00E1t.no\nbomlo.no\nb\u00F8mlo.no\nbatsfjord.no\nb\u00E5tsfjord.no\nbahcavuotna.no\nb\u00E1hcavuotna.no\ndovre.no\ndrammen.no\ndrangedal.no\ndyroy.no\ndyr\u00F8y.no\ndonna.no\nd\u00F8nna.no\neid.no\neidfjord.no\neidsberg.no\neidskog.no\neidsvoll.no\neigersund.no\nelverum.no\nenebakk.no\nengerdal.no\netne.no\netnedal.no\nevenes.no\nevenassi.no\neven\u00E1\u0161\u0161i.no\nevje-og-hornnes.no\nfarsund.no\nfauske.no\nfuossko.no\nfuoisku.no\nfedje.no\nfet.no\nfinnoy.no\nfinn\u00F8y.no\nfitjar.no\nfjaler.no\nfjell.no\nflakstad.no\nflatanger.no\nflekkefjord.no\nflesberg.no\nflora.no\nfla.no\nfl\u00E5.no\nfolldal.no\nforsand.no\nfosnes.no\nfrei.no\nfrogn.no\nfroland.no\nfrosta.no\nfrana.no\nfr\u00E6na.no\nfroya.no\nfr\u00F8ya.no\nfusa.no\nfyresdal.no\nforde.no\nf\u00F8rde.no\ngamvik.no\ngangaviika.no\ng\u00E1\u014Bgaviika.no\ngaular.no\ngausdal.no\ngildeskal.no\ngildesk\u00E5l.no\ngiske.no\ngjemnes.no\ngjerdrum.no\ngjerstad.no\ngjesdal.no\ngjovik.no\ngj\u00F8vik.no\ngloppen.no\ngol.no\ngran.no\ngrane.no\ngranvin.no\ngratangen.no\ngrimstad.no\ngrong.no\nkraanghke.no\nkr\u00E5anghke.no\ngrue.no\ngulen.no\nhadsel.no\nhalden.no\nhalsa.no\nhamar.no\nhamaroy.no\nhabmer.no\nh\u00E1bmer.no\nhapmir.no\nh\u00E1pmir.no\nhammerfest.no\nhammarfeasta.no\nh\u00E1mm\u00E1rfeasta.no\nharam.no\nhareid.no\nharstad.no\nhasvik.no\naknoluokta.no\n\u00E1k\u014Boluokta.no\nhattfjelldal.no\naarborte.no\nhaugesund.no\nhemne.no\nhemnes.no\nhemsedal.no\nheroy.more-og-romsdal.no\nher\u00F8y.m\u00F8re-og-romsdal.no\nheroy.nordland.no\nher\u00F8y.nordland.no\nhitra.no\nhjartdal.no\nhjelmeland.no\nhobol.no\nhob\u00F8l.no\nhof.no\nhol.no\nhole.no\nholmestrand.no\nholtalen.no\nholt\u00E5len.no\nhornindal.no\nhorten.no\nhurdal.no\nhurum.no\nhvaler.no\nhyllestad.no\nhagebostad.no\nh\u00E6gebostad.no\nhoyanger.no\nh\u00F8yanger.no\nhoylandet.no\nh\u00F8ylandet.no\nha.no\nh\u00E5.no\nibestad.no\ninderoy.no\ninder\u00F8y.no\niveland.no\njevnaker.no\njondal.no\njolster.no\nj\u00F8lster.no\nkarasjok.no\nkarasjohka.no\nk\u00E1r\u00E1\u0161johka.no\nkarlsoy.no\ngalsa.no\ng\u00E1ls\u00E1.no\nkarmoy.no\nkarm\u00F8y.no\nkautokeino.no\nguovdageaidnu.no\nklepp.no\nklabu.no\nkl\u00E6bu.no\nkongsberg.no\nkongsvinger.no\nkragero.no\nkrager\u00F8.no\nkristiansand.no\nkristiansund.no\nkrodsherad.no\nkr\u00F8dsherad.no\nkvalsund.no\nrahkkeravju.no\nr\u00E1hkker\u00E1vju.no\nkvam.no\nkvinesdal.no\nkvinnherad.no\nkviteseid.no\nkvitsoy.no\nkvits\u00F8y.no\nkvafjord.no\nkv\u00E6fjord.no\ngiehtavuoatna.no\nkvanangen.no\nkv\u00E6nangen.no\nnavuotna.no\nn\u00E1vuotna.no\nkafjord.no\nk\u00E5fjord.no\ngaivuotna.no\ng\u00E1ivuotna.no\nlarvik.no\nlavangen.no\nlavagis.no\nloabat.no\nloab\u00E1t.no\nlebesby.no\ndavvesiida.no\nleikanger.no\nleirfjord.no\nleka.no\nleksvik.no\nlenvik.no\nleangaviika.no\nlea\u014Bgaviika.no\nlesja.no\nlevanger.no\nlier.no\nlierne.no\nlillehammer.no\nlillesand.no\nlindesnes.no\nlindas.no\nlind\u00E5s.no\nlom.no\nloppa.no\nlahppi.no\nl\u00E1hppi.no\nlund.no\nlunner.no\nluroy.no\nlur\u00F8y.no\nluster.no\nlyngdal.no\nlyngen.no\nivgu.no\nlardal.no\nlerdal.no\nl\u00E6rdal.no\nlodingen.no\nl\u00F8dingen.no\nlorenskog.no\nl\u00F8renskog.no\nloten.no\nl\u00F8ten.no\nmalvik.no\nmasoy.no\nm\u00E5s\u00F8y.no\nmuosat.no\nmuos\u00E1t.no\nmandal.no\nmarker.no\nmarnardal.no\nmasfjorden.no\nmeland.no\nmeldal.no\nmelhus.no\nmeloy.no\nmel\u00F8y.no\nmeraker.no\nmer\u00E5ker.no\nmoareke.no\nmo\u00E5reke.no\nmidsund.no\nmidtre-gauldal.no\nmodalen.no\nmodum.no\nmolde.no\nmoskenes.no\nmoss.no\nmosvik.no\nmalselv.no\nm\u00E5lselv.no\nmalatvuopmi.no\nm\u00E1latvuopmi.no\nnamdalseid.no\naejrie.no\nnamsos.no\nnamsskogan.no\nnaamesjevuemie.no\nn\u00E5\u00E5mesjevuemie.no\nlaakesvuemie.no\nnannestad.no\nnarvik.no\nnarviika.no\nnaustdal.no\nnedre-eiker.no\nnes.akershus.no\nnes.buskerud.no\nnesna.no\nnesodden.no\nnesseby.no\nunjarga.no\nunj\u00E1rga.no\nnesset.no\nnissedal.no\nnittedal.no\nnord-aurdal.no\nnord-fron.no\nnord-odal.no\nnorddal.no\nnordkapp.no\ndavvenjarga.no\ndavvenj\u00E1rga.no\nnordre-land.no\nnordreisa.no\nraisa.no\nr\u00E1isa.no\nnore-og-uvdal.no\nnotodden.no\nnaroy.no\nn\u00E6r\u00F8y.no\nnotteroy.no\nn\u00F8tter\u00F8y.no\nodda.no\noksnes.no\n\u00F8ksnes.no\noppdal.no\noppegard.no\noppeg\u00E5rd.no\norkdal.no\norland.no\n\u00F8rland.no\norskog.no\n\u00F8rskog.no\norsta.no\n\u00F8rsta.no\nos.hedmark.no\nos.hordaland.no\nosen.no\nosteroy.no\noster\u00F8y.no\nostre-toten.no\n\u00F8stre-toten.no\noverhalla.no\novre-eiker.no\n\u00F8vre-eiker.no\noyer.no\n\u00F8yer.no\noygarden.no\n\u00F8ygarden.no\noystre-slidre.no\n\u00F8ystre-slidre.no\nporsanger.no\nporsangu.no\npors\u00E1\u014Bgu.no\nporsgrunn.no\nradoy.no\nrad\u00F8y.no\nrakkestad.no\nrana.no\nruovat.no\nrandaberg.no\nrauma.no\nrendalen.no\nrennebu.no\nrennesoy.no\nrennes\u00F8y.no\nrindal.no\nringebu.no\nringerike.no\nringsaker.no\nrissa.no\nrisor.no\nris\u00F8r.no\nroan.no\nrollag.no\nrygge.no\nralingen.no\nr\u00E6lingen.no\nrodoy.no\nr\u00F8d\u00F8y.no\nromskog.no\nr\u00F8mskog.no\nroros.no\nr\u00F8ros.no\nrost.no\nr\u00F8st.no\nroyken.no\nr\u00F8yken.no\nroyrvik.no\nr\u00F8yrvik.no\nrade.no\nr\u00E5de.no\nsalangen.no\nsiellak.no\nsaltdal.no\nsalat.no\ns\u00E1l\u00E1t.no\ns\u00E1lat.no\nsamnanger.no\nsande.more-og-romsdal.no\nsande.m\u00F8re-og-romsdal.no\nsande.vestfold.no\nsandefjord.no\nsandnes.no\nsandoy.no\nsand\u00F8y.no\nsarpsborg.no\nsauda.no\nsauherad.no\nsel.no\nselbu.no\nselje.no\nseljord.no\nsigdal.no\nsiljan.no\nsirdal.no\nskaun.no\nskedsmo.no\nski.no\nskien.no\nskiptvet.no\nskjervoy.no\nskjerv\u00F8y.no\nskierva.no\nskierv\u00E1.no\nskjak.no\nskj\u00E5k.no\nskodje.no\nskanland.no\nsk\u00E5nland.no\nskanit.no\nsk\u00E1nit.no\nsmola.no\nsm\u00F8la.no\nsnillfjord.no\nsnasa.no\nsn\u00E5sa.no\nsnoasa.no\nsnaase.no\nsn\u00E5ase.no\nsogndal.no\nsokndal.no\nsola.no\nsolund.no\nsongdalen.no\nsortland.no\nspydeberg.no\nstange.no\nstavanger.no\nsteigen.no\nsteinkjer.no\nstjordal.no\nstj\u00F8rdal.no\nstokke.no\nstor-elvdal.no\nstord.no\nstordal.no\nstorfjord.no\nomasvuotna.no\nstrand.no\nstranda.no\nstryn.no\nsula.no\nsuldal.no\nsund.no\nsunndal.no\nsurnadal.no\nsveio.no\nsvelvik.no\nsykkylven.no\nsogne.no\ns\u00F8gne.no\nsomna.no\ns\u00F8mna.no\nsondre-land.no\ns\u00F8ndre-land.no\nsor-aurdal.no\ns\u00F8r-aurdal.no\nsor-fron.no\ns\u00F8r-fron.no\nsor-odal.no\ns\u00F8r-odal.no\nsor-varanger.no\ns\u00F8r-varanger.no\nmatta-varjjat.no\nm\u00E1tta-v\u00E1rjjat.no\nsorfold.no\ns\u00F8rfold.no\nsorreisa.no\ns\u00F8rreisa.no\nsorum.no\ns\u00F8rum.no\ntana.no\ndeatnu.no\ntime.no\ntingvoll.no\ntinn.no\ntjeldsund.no\ndielddanuorri.no\ntjome.no\ntj\u00F8me.no\ntokke.no\ntolga.no\ntorsken.no\ntranoy.no\ntran\u00F8y.no\ntromso.no\ntroms\u00F8.no\ntromsa.no\nromsa.no\ntrondheim.no\ntroandin.no\ntrysil.no\ntrana.no\ntr\u00E6na.no\ntrogstad.no\ntr\u00F8gstad.no\ntvedestrand.no\ntydal.no\ntynset.no\ntysfjord.no\ndivtasvuodna.no\ndivttasvuotna.no\ntysnes.no\ntysvar.no\ntysv\u00E6r.no\ntonsberg.no\nt\u00F8nsberg.no\nullensaker.no\nullensvang.no\nulvik.no\nutsira.no\nvadso.no\nvads\u00F8.no\ncahcesuolo.no\n\u010D\u00E1hcesuolo.no\nvaksdal.no\nvalle.no\nvang.no\nvanylven.no\nvardo.no\nvard\u00F8.no\nvarggat.no\nv\u00E1rgg\u00E1t.no\nvefsn.no\nvaapste.no\nvega.no\nvegarshei.no\nveg\u00E5rshei.no\nvennesla.no\nverdal.no\nverran.no\nvestby.no\nvestnes.no\nvestre-slidre.no\nvestre-toten.no\nvestvagoy.no\nvestv\u00E5g\u00F8y.no\nvevelstad.no\nvik.no\nvikna.no\nvindafjord.no\nvolda.no\nvoss.no\nvaroy.no\nv\u00E6r\u00F8y.no\nvagan.no\nv\u00E5gan.no\nvoagat.no\nvagsoy.no\nv\u00E5gs\u00F8y.no\nvaga.no\nv\u00E5g\u00E5.no\nvaler.ostfold.no\nv\u00E5ler.\u00F8stfold.no\nvaler.hedmark.no\nv\u00E5ler.hedmark.no\n\n// np : http://www.mos.com.np/register.html\n*.np\n\n// nr : http://cenpac.net.nr/dns/index.html\n// Submitted by registry <technician@cenpac.net.nr>\nnr\nbiz.nr\ninfo.nr\ngov.nr\nedu.nr\norg.nr\nnet.nr\ncom.nr\n\n// nu : https://en.wikipedia.org/wiki/.nu\nnu\n\n// nz : https://en.wikipedia.org/wiki/.nz\n// Submitted by registry <jay@nzrs.net.nz>\nnz\nac.nz\nco.nz\ncri.nz\ngeek.nz\ngen.nz\ngovt.nz\nhealth.nz\niwi.nz\nkiwi.nz\nmaori.nz\nmil.nz\nm\u0101ori.nz\nnet.nz\norg.nz\nparliament.nz\nschool.nz\n\n// om : https://en.wikipedia.org/wiki/.om\nom\nco.om\ncom.om\nedu.om\ngov.om\nmed.om\nmuseum.om\nnet.om\norg.om\npro.om\n\n// onion : https://tools.ietf.org/html/rfc7686\nonion\n\n// org : https://en.wikipedia.org/wiki/.org\norg\n\n// pa : http://www.nic.pa/\n// Some additional second level \"domains\" resolve directly as hostnames, such as\n// pannet.pa, so we add a rule for \"pa\".\npa\nac.pa\ngob.pa\ncom.pa\norg.pa\nsld.pa\nedu.pa\nnet.pa\ning.pa\nabo.pa\nmed.pa\nnom.pa\n\n// pe : https://www.nic.pe/InformeFinalComision.pdf\npe\nedu.pe\ngob.pe\nnom.pe\nmil.pe\norg.pe\ncom.pe\nnet.pe\n\n// pf : http://www.gobin.info/domainname/formulaire-pf.pdf\npf\ncom.pf\norg.pf\nedu.pf\n\n// pg : https://en.wikipedia.org/wiki/.pg\n*.pg\n\n// ph : http://www.domains.ph/FAQ2.asp\n// Submitted by registry <jed@email.com.ph>\nph\ncom.ph\nnet.ph\norg.ph\ngov.ph\nedu.ph\nngo.ph\nmil.ph\ni.ph\n\n// pk : http://pk5.pknic.net.pk/pk5/msgNamepk.PK\npk\ncom.pk\nnet.pk\nedu.pk\norg.pk\nfam.pk\nbiz.pk\nweb.pk\ngov.pk\ngob.pk\ngok.pk\ngon.pk\ngop.pk\ngos.pk\ninfo.pk\n\n// pl http://www.dns.pl/english/index.html\n// Submitted by registry\npl\ncom.pl\nnet.pl\norg.pl\n// pl functional domains (http://www.dns.pl/english/index.html)\naid.pl\nagro.pl\natm.pl\nauto.pl\nbiz.pl\nedu.pl\ngmina.pl\ngsm.pl\ninfo.pl\nmail.pl\nmiasta.pl\nmedia.pl\nmil.pl\nnieruchomosci.pl\nnom.pl\npc.pl\npowiat.pl\npriv.pl\nrealestate.pl\nrel.pl\nsex.pl\nshop.pl\nsklep.pl\nsos.pl\nszkola.pl\ntargi.pl\ntm.pl\ntourism.pl\ntravel.pl\nturystyka.pl\n// Government domains\ngov.pl\nap.gov.pl\nic.gov.pl\nis.gov.pl\nus.gov.pl\nkmpsp.gov.pl\nkppsp.gov.pl\nkwpsp.gov.pl\npsp.gov.pl\nwskr.gov.pl\nkwp.gov.pl\nmw.gov.pl\nug.gov.pl\num.gov.pl\numig.gov.pl\nugim.gov.pl\nupow.gov.pl\nuw.gov.pl\nstarostwo.gov.pl\npa.gov.pl\npo.gov.pl\npsse.gov.pl\npup.gov.pl\nrzgw.gov.pl\nsa.gov.pl\nso.gov.pl\nsr.gov.pl\nwsa.gov.pl\nsko.gov.pl\nuzs.gov.pl\nwiih.gov.pl\nwinb.gov.pl\npinb.gov.pl\nwios.gov.pl\nwitd.gov.pl\nwzmiuw.gov.pl\npiw.gov.pl\nwiw.gov.pl\ngriw.gov.pl\nwif.gov.pl\noum.gov.pl\nsdn.gov.pl\nzp.gov.pl\nuppo.gov.pl\nmup.gov.pl\nwuoz.gov.pl\nkonsulat.gov.pl\noirm.gov.pl\n// pl regional domains (http://www.dns.pl/english/index.html)\naugustow.pl\nbabia-gora.pl\nbedzin.pl\nbeskidy.pl\nbialowieza.pl\nbialystok.pl\nbielawa.pl\nbieszczady.pl\nboleslawiec.pl\nbydgoszcz.pl\nbytom.pl\ncieszyn.pl\nczeladz.pl\nczest.pl\ndlugoleka.pl\nelblag.pl\nelk.pl\nglogow.pl\ngniezno.pl\ngorlice.pl\ngrajewo.pl\nilawa.pl\njaworzno.pl\njelenia-gora.pl\njgora.pl\nkalisz.pl\nkazimierz-dolny.pl\nkarpacz.pl\nkartuzy.pl\nkaszuby.pl\nkatowice.pl\nkepno.pl\nketrzyn.pl\nklodzko.pl\nkobierzyce.pl\nkolobrzeg.pl\nkonin.pl\nkonskowola.pl\nkutno.pl\nlapy.pl\nlebork.pl\nlegnica.pl\nlezajsk.pl\nlimanowa.pl\nlomza.pl\nlowicz.pl\nlubin.pl\nlukow.pl\nmalbork.pl\nmalopolska.pl\nmazowsze.pl\nmazury.pl\nmielec.pl\nmielno.pl\nmragowo.pl\nnaklo.pl\nnowaruda.pl\nnysa.pl\nolawa.pl\nolecko.pl\nolkusz.pl\nolsztyn.pl\nopoczno.pl\nopole.pl\nostroda.pl\nostroleka.pl\nostrowiec.pl\nostrowwlkp.pl\npila.pl\npisz.pl\npodhale.pl\npodlasie.pl\npolkowice.pl\npomorze.pl\npomorskie.pl\nprochowice.pl\npruszkow.pl\nprzeworsk.pl\npulawy.pl\nradom.pl\nrawa-maz.pl\nrybnik.pl\nrzeszow.pl\nsanok.pl\nsejny.pl\nslask.pl\nslupsk.pl\nsosnowiec.pl\nstalowa-wola.pl\nskoczow.pl\nstarachowice.pl\nstargard.pl\nsuwalki.pl\nswidnica.pl\nswiebodzin.pl\nswinoujscie.pl\nszczecin.pl\nszczytno.pl\ntarnobrzeg.pl\ntgory.pl\nturek.pl\ntychy.pl\nustka.pl\nwalbrzych.pl\nwarmia.pl\nwarszawa.pl\nwaw.pl\nwegrow.pl\nwielun.pl\nwlocl.pl\nwloclawek.pl\nwodzislaw.pl\nwolomin.pl\nwroclaw.pl\nzachpomor.pl\nzagan.pl\nzarow.pl\nzgora.pl\nzgorzelec.pl\n\n// pm : http://www.afnic.fr/medias/documents/AFNIC-naming-policy2012.pdf\npm\n\n// pn : http://www.government.pn/PnRegistry/policies.htm\npn\ngov.pn\nco.pn\norg.pn\nedu.pn\nnet.pn\n\n// post : https://en.wikipedia.org/wiki/.post\npost\n\n// pr : http://www.nic.pr/index.asp?f=1\npr\ncom.pr\nnet.pr\norg.pr\ngov.pr\nedu.pr\nisla.pr\npro.pr\nbiz.pr\ninfo.pr\nname.pr\n// these aren't mentioned on nic.pr, but on https://en.wikipedia.org/wiki/.pr\nest.pr\nprof.pr\nac.pr\n\n// pro : http://registry.pro/get-pro\npro\naaa.pro\naca.pro\nacct.pro\navocat.pro\nbar.pro\ncpa.pro\neng.pro\njur.pro\nlaw.pro\nmed.pro\nrecht.pro\n\n// ps : https://en.wikipedia.org/wiki/.ps\n// http://www.nic.ps/registration/policy.html#reg\nps\nedu.ps\ngov.ps\nsec.ps\nplo.ps\ncom.ps\norg.ps\nnet.ps\n\n// pt : http://online.dns.pt/dns/start_dns\npt\nnet.pt\ngov.pt\norg.pt\nedu.pt\nint.pt\npubl.pt\ncom.pt\nnome.pt\n\n// pw : https://en.wikipedia.org/wiki/.pw\npw\nco.pw\nne.pw\nor.pw\ned.pw\ngo.pw\nbelau.pw\n\n// py : http://www.nic.py/pautas.html#seccion_9\n// Submitted by registry\npy\ncom.py\ncoop.py\nedu.py\ngov.py\nmil.py\nnet.py\norg.py\n\n// qa : http://domains.qa/en/\nqa\ncom.qa\nedu.qa\ngov.qa\nmil.qa\nname.qa\nnet.qa\norg.qa\nsch.qa\n\n// re : http://www.afnic.re/obtenir/chartes/nommage-re/annexe-descriptifs\nre\nasso.re\ncom.re\nnom.re\n\n// ro : http://www.rotld.ro/\nro\narts.ro\ncom.ro\nfirm.ro\ninfo.ro\nnom.ro\nnt.ro\norg.ro\nrec.ro\nstore.ro\ntm.ro\nwww.ro\n\n// rs : https://www.rnids.rs/en/domains/national-domains\nrs\nac.rs\nco.rs\nedu.rs\ngov.rs\nin.rs\norg.rs\n\n// ru : https://cctld.ru/en/domains/domens_ru/reserved/\nru\nac.ru\nedu.ru\ngov.ru\nint.ru\nmil.ru\ntest.ru\n\n// rw : http://www.nic.rw/cgi-bin/policy.pl\nrw\ngov.rw\nnet.rw\nedu.rw\nac.rw\ncom.rw\nco.rw\nint.rw\nmil.rw\ngouv.rw\n\n// sa : http://www.nic.net.sa/\nsa\ncom.sa\nnet.sa\norg.sa\ngov.sa\nmed.sa\npub.sa\nedu.sa\nsch.sa\n\n// sb : http://www.sbnic.net.sb/\n// Submitted by registry <lee.humphries@telekom.com.sb>\nsb\ncom.sb\nedu.sb\ngov.sb\nnet.sb\norg.sb\n\n// sc : http://www.nic.sc/\nsc\ncom.sc\ngov.sc\nnet.sc\norg.sc\nedu.sc\n\n// sd : http://www.isoc.sd/sudanic.isoc.sd/billing_pricing.htm\n// Submitted by registry <admin@isoc.sd>\nsd\ncom.sd\nnet.sd\norg.sd\nedu.sd\nmed.sd\ntv.sd\ngov.sd\ninfo.sd\n\n// se : https://en.wikipedia.org/wiki/.se\n// Submitted by registry <patrik.wallstrom@iis.se>\nse\na.se\nac.se\nb.se\nbd.se\nbrand.se\nc.se\nd.se\ne.se\nf.se\nfh.se\nfhsk.se\nfhv.se\ng.se\nh.se\ni.se\nk.se\nkomforb.se\nkommunalforbund.se\nkomvux.se\nl.se\nlanbib.se\nm.se\nn.se\nnaturbruksgymn.se\no.se\norg.se\np.se\nparti.se\npp.se\npress.se\nr.se\ns.se\nt.se\ntm.se\nu.se\nw.se\nx.se\ny.se\nz.se\n\n// sg : http://www.nic.net.sg/page/registration-policies-procedures-and-guidelines\nsg\ncom.sg\nnet.sg\norg.sg\ngov.sg\nedu.sg\nper.sg\n\n// sh : http://www.nic.sh/registrar.html\nsh\ncom.sh\nnet.sh\ngov.sh\norg.sh\nmil.sh\n\n// si : https://en.wikipedia.org/wiki/.si\nsi\n\n// sj : No registrations at this time.\n// Submitted by registry <jarle@uninett.no>\nsj\n\n// sk : https://en.wikipedia.org/wiki/.sk\n// list of 2nd level domains ?\nsk\n\n// sl : http://www.nic.sl\n// Submitted by registry <adam@neoip.com>\nsl\ncom.sl\nnet.sl\nedu.sl\ngov.sl\norg.sl\n\n// sm : https://en.wikipedia.org/wiki/.sm\nsm\n\n// sn : https://en.wikipedia.org/wiki/.sn\nsn\nart.sn\ncom.sn\nedu.sn\ngouv.sn\norg.sn\nperso.sn\nuniv.sn\n\n// so : http://www.soregistry.com/\nso\ncom.so\nnet.so\norg.so\n\n// sr : https://en.wikipedia.org/wiki/.sr\nsr\n\n// st : http://www.nic.st/html/policyrules/\nst\nco.st\ncom.st\nconsulado.st\nedu.st\nembaixada.st\ngov.st\nmil.st\nnet.st\norg.st\nprincipe.st\nsaotome.st\nstore.st\n\n// su : https://en.wikipedia.org/wiki/.su\nsu\n\n// sv : http://www.svnet.org.sv/niveldos.pdf\nsv\ncom.sv\nedu.sv\ngob.sv\norg.sv\nred.sv\n\n// sx : https://en.wikipedia.org/wiki/.sx\n// Submitted by registry <jcvignes@openregistry.com>\nsx\ngov.sx\n\n// sy : https://en.wikipedia.org/wiki/.sy\n// see also: http://www.gobin.info/domainname/sy.doc\nsy\nedu.sy\ngov.sy\nnet.sy\nmil.sy\ncom.sy\norg.sy\n\n// sz : https://en.wikipedia.org/wiki/.sz\n// http://www.sispa.org.sz/\nsz\nco.sz\nac.sz\norg.sz\n\n// tc : https://en.wikipedia.org/wiki/.tc\ntc\n\n// td : https://en.wikipedia.org/wiki/.td\ntd\n\n// tel: https://en.wikipedia.org/wiki/.tel\n// http://www.telnic.org/\ntel\n\n// tf : https://en.wikipedia.org/wiki/.tf\ntf\n\n// tg : https://en.wikipedia.org/wiki/.tg\n// http://www.nic.tg/\ntg\n\n// th : https://en.wikipedia.org/wiki/.th\n// Submitted by registry <krit@thains.co.th>\nth\nac.th\nco.th\ngo.th\nin.th\nmi.th\nnet.th\nor.th\n\n// tj : http://www.nic.tj/policy.html\ntj\nac.tj\nbiz.tj\nco.tj\ncom.tj\nedu.tj\ngo.tj\ngov.tj\nint.tj\nmil.tj\nname.tj\nnet.tj\nnic.tj\norg.tj\ntest.tj\nweb.tj\n\n// tk : https://en.wikipedia.org/wiki/.tk\ntk\n\n// tl : https://en.wikipedia.org/wiki/.tl\ntl\ngov.tl\n\n// tm : http://www.nic.tm/local.html\ntm\ncom.tm\nco.tm\norg.tm\nnet.tm\nnom.tm\ngov.tm\nmil.tm\nedu.tm\n\n// tn : https://en.wikipedia.org/wiki/.tn\n// http://whois.ati.tn/\ntn\ncom.tn\nens.tn\nfin.tn\ngov.tn\nind.tn\nintl.tn\nnat.tn\nnet.tn\norg.tn\ninfo.tn\nperso.tn\ntourism.tn\nedunet.tn\nrnrt.tn\nrns.tn\nrnu.tn\nmincom.tn\nagrinet.tn\ndefense.tn\nturen.tn\n\n// to : https://en.wikipedia.org/wiki/.to\n// Submitted by registry <egullich@colo.to>\nto\ncom.to\ngov.to\nnet.to\norg.to\nedu.to\nmil.to\n\n// subTLDs: https://www.nic.tr/forms/eng/policies.pdf\n//     and: https://www.nic.tr/forms/politikalar.pdf\n// Submitted by <mehmetgurevin@gmail.com>\ntr\ncom.tr\ninfo.tr\nbiz.tr\nnet.tr\norg.tr\nweb.tr\ngen.tr\ntv.tr\nav.tr\ndr.tr\nbbs.tr\nname.tr\ntel.tr\ngov.tr\nbel.tr\npol.tr\nmil.tr\nk12.tr\nedu.tr\nkep.tr\n\n// Used by Northern Cyprus\nnc.tr\n\n// Used by government agencies of Northern Cyprus\ngov.nc.tr\n\n// tt : http://www.nic.tt/\ntt\nco.tt\ncom.tt\norg.tt\nnet.tt\nbiz.tt\ninfo.tt\npro.tt\nint.tt\ncoop.tt\njobs.tt\nmobi.tt\ntravel.tt\nmuseum.tt\naero.tt\nname.tt\ngov.tt\nedu.tt\n\n// tv : https://en.wikipedia.org/wiki/.tv\n// Not listing any 2LDs as reserved since none seem to exist in practice,\n// Wikipedia notwithstanding.\ntv\n\n// tw : https://en.wikipedia.org/wiki/.tw\ntw\nedu.tw\ngov.tw\nmil.tw\ncom.tw\nnet.tw\norg.tw\nidv.tw\ngame.tw\nebiz.tw\nclub.tw\n\u7DB2\u8DEF.tw\n\u7D44\u7E54.tw\n\u5546\u696D.tw\n\n// tz : http://www.tznic.or.tz/index.php/domains\n// Submitted by registry <manager@tznic.or.tz>\ntz\nac.tz\nco.tz\ngo.tz\nhotel.tz\ninfo.tz\nme.tz\nmil.tz\nmobi.tz\nne.tz\nor.tz\nsc.tz\ntv.tz\n\n// ua : https://hostmaster.ua/policy/?ua\n// Submitted by registry <dk@cctld.ua>\nua\n// ua 2LD\ncom.ua\nedu.ua\ngov.ua\nin.ua\nnet.ua\norg.ua\n// ua geographic names\n// https://hostmaster.ua/2ld/\ncherkassy.ua\ncherkasy.ua\nchernigov.ua\nchernihiv.ua\nchernivtsi.ua\nchernovtsy.ua\nck.ua\ncn.ua\ncr.ua\ncrimea.ua\ncv.ua\ndn.ua\ndnepropetrovsk.ua\ndnipropetrovsk.ua\ndominic.ua\ndonetsk.ua\ndp.ua\nif.ua\nivano-frankivsk.ua\nkh.ua\nkharkiv.ua\nkharkov.ua\nkherson.ua\nkhmelnitskiy.ua\nkhmelnytskyi.ua\nkiev.ua\nkirovograd.ua\nkm.ua\nkr.ua\nkrym.ua\nks.ua\nkv.ua\nkyiv.ua\nlg.ua\nlt.ua\nlugansk.ua\nlutsk.ua\nlv.ua\nlviv.ua\nmk.ua\nmykolaiv.ua\nnikolaev.ua\nod.ua\nodesa.ua\nodessa.ua\npl.ua\npoltava.ua\nrivne.ua\nrovno.ua\nrv.ua\nsb.ua\nsebastopol.ua\nsevastopol.ua\nsm.ua\nsumy.ua\nte.ua\nternopil.ua\nuz.ua\nuzhgorod.ua\nvinnica.ua\nvinnytsia.ua\nvn.ua\nvolyn.ua\nyalta.ua\nzaporizhzhe.ua\nzaporizhzhia.ua\nzhitomir.ua\nzhytomyr.ua\nzp.ua\nzt.ua\n\n// ug : https://www.registry.co.ug/\nug\nco.ug\nor.ug\nac.ug\nsc.ug\ngo.ug\nne.ug\ncom.ug\norg.ug\n\n// uk : https://en.wikipedia.org/wiki/.uk\n// Submitted by registry <Michael.Daly@nominet.org.uk>\nuk\nac.uk\nco.uk\ngov.uk\nltd.uk\nme.uk\nnet.uk\nnhs.uk\norg.uk\nplc.uk\npolice.uk\n*.sch.uk\n\n// us : https://en.wikipedia.org/wiki/.us\nus\ndni.us\nfed.us\nisa.us\nkids.us\nnsn.us\n// us geographic names\nak.us\nal.us\nar.us\nas.us\naz.us\nca.us\nco.us\nct.us\ndc.us\nde.us\nfl.us\nga.us\ngu.us\nhi.us\nia.us\nid.us\nil.us\nin.us\nks.us\nky.us\nla.us\nma.us\nmd.us\nme.us\nmi.us\nmn.us\nmo.us\nms.us\nmt.us\nnc.us\nnd.us\nne.us\nnh.us\nnj.us\nnm.us\nnv.us\nny.us\noh.us\nok.us\nor.us\npa.us\npr.us\nri.us\nsc.us\nsd.us\ntn.us\ntx.us\nut.us\nvi.us\nvt.us\nva.us\nwa.us\nwi.us\nwv.us\nwy.us\n// The registrar notes several more specific domains available in each state,\n// such as state.*.us, dst.*.us, etc., but resolution of these is somewhat\n// haphazard; in some states these domains resolve as addresses, while in others\n// only subdomains are available, or even nothing at all. We include the\n// most common ones where it's clear that different sites are different\n// entities.\nk12.ak.us\nk12.al.us\nk12.ar.us\nk12.as.us\nk12.az.us\nk12.ca.us\nk12.co.us\nk12.ct.us\nk12.dc.us\nk12.de.us\nk12.fl.us\nk12.ga.us\nk12.gu.us\n// k12.hi.us  Bug 614565 - Hawaii has a state-wide DOE login\nk12.ia.us\nk12.id.us\nk12.il.us\nk12.in.us\nk12.ks.us\nk12.ky.us\nk12.la.us\nk12.ma.us\nk12.md.us\nk12.me.us\nk12.mi.us\nk12.mn.us\nk12.mo.us\nk12.ms.us\nk12.mt.us\nk12.nc.us\n// k12.nd.us  Bug 1028347 - Removed at request of Travis Rosso <trossow@nd.gov>\nk12.ne.us\nk12.nh.us\nk12.nj.us\nk12.nm.us\nk12.nv.us\nk12.ny.us\nk12.oh.us\nk12.ok.us\nk12.or.us\nk12.pa.us\nk12.pr.us\nk12.ri.us\nk12.sc.us\n// k12.sd.us  Bug 934131 - Removed at request of James Booze <James.Booze@k12.sd.us>\nk12.tn.us\nk12.tx.us\nk12.ut.us\nk12.vi.us\nk12.vt.us\nk12.va.us\nk12.wa.us\nk12.wi.us\n// k12.wv.us  Bug 947705 - Removed at request of Verne Britton <verne@wvnet.edu>\nk12.wy.us\ncc.ak.us\ncc.al.us\ncc.ar.us\ncc.as.us\ncc.az.us\ncc.ca.us\ncc.co.us\ncc.ct.us\ncc.dc.us\ncc.de.us\ncc.fl.us\ncc.ga.us\ncc.gu.us\ncc.hi.us\ncc.ia.us\ncc.id.us\ncc.il.us\ncc.in.us\ncc.ks.us\ncc.ky.us\ncc.la.us\ncc.ma.us\ncc.md.us\ncc.me.us\ncc.mi.us\ncc.mn.us\ncc.mo.us\ncc.ms.us\ncc.mt.us\ncc.nc.us\ncc.nd.us\ncc.ne.us\ncc.nh.us\ncc.nj.us\ncc.nm.us\ncc.nv.us\ncc.ny.us\ncc.oh.us\ncc.ok.us\ncc.or.us\ncc.pa.us\ncc.pr.us\ncc.ri.us\ncc.sc.us\ncc.sd.us\ncc.tn.us\ncc.tx.us\ncc.ut.us\ncc.vi.us\ncc.vt.us\ncc.va.us\ncc.wa.us\ncc.wi.us\ncc.wv.us\ncc.wy.us\nlib.ak.us\nlib.al.us\nlib.ar.us\nlib.as.us\nlib.az.us\nlib.ca.us\nlib.co.us\nlib.ct.us\nlib.dc.us\n// lib.de.us  Issue #243 - Moved to Private section at request of Ed Moore <Ed.Moore@lib.de.us>\nlib.fl.us\nlib.ga.us\nlib.gu.us\nlib.hi.us\nlib.ia.us\nlib.id.us\nlib.il.us\nlib.in.us\nlib.ks.us\nlib.ky.us\nlib.la.us\nlib.ma.us\nlib.md.us\nlib.me.us\nlib.mi.us\nlib.mn.us\nlib.mo.us\nlib.ms.us\nlib.mt.us\nlib.nc.us\nlib.nd.us\nlib.ne.us\nlib.nh.us\nlib.nj.us\nlib.nm.us\nlib.nv.us\nlib.ny.us\nlib.oh.us\nlib.ok.us\nlib.or.us\nlib.pa.us\nlib.pr.us\nlib.ri.us\nlib.sc.us\nlib.sd.us\nlib.tn.us\nlib.tx.us\nlib.ut.us\nlib.vi.us\nlib.vt.us\nlib.va.us\nlib.wa.us\nlib.wi.us\n// lib.wv.us  Bug 941670 - Removed at request of Larry W Arnold <arnold@wvlc.lib.wv.us>\nlib.wy.us\n// k12.ma.us contains school districts in Massachusetts. The 4LDs are\n//  managed independently except for private (PVT), charter (CHTR) and\n//  parochial (PAROCH) schools.  Those are delegated directly to the\n//  5LD operators.   <k12-ma-hostmaster _ at _ rsuc.gweep.net>\npvt.k12.ma.us\nchtr.k12.ma.us\nparoch.k12.ma.us\n// Merit Network, Inc. maintains the registry for =~ /(k12|cc|lib).mi.us/ and the following\n//    see also: http://domreg.merit.edu\n//    see also: whois -h whois.domreg.merit.edu help\nann-arbor.mi.us\ncog.mi.us\ndst.mi.us\neaton.mi.us\ngen.mi.us\nmus.mi.us\ntec.mi.us\nwashtenaw.mi.us\n\n// uy : http://www.nic.org.uy/\nuy\ncom.uy\nedu.uy\ngub.uy\nmil.uy\nnet.uy\norg.uy\n\n// uz : http://www.reg.uz/\nuz\nco.uz\ncom.uz\nnet.uz\norg.uz\n\n// va : https://en.wikipedia.org/wiki/.va\nva\n\n// vc : https://en.wikipedia.org/wiki/.vc\n// Submitted by registry <kshah@ca.afilias.info>\nvc\ncom.vc\nnet.vc\norg.vc\ngov.vc\nmil.vc\nedu.vc\n\n// ve : https://registro.nic.ve/\n// Submitted by registry\nve\narts.ve\nco.ve\ncom.ve\ne12.ve\nedu.ve\nfirm.ve\ngob.ve\ngov.ve\ninfo.ve\nint.ve\nmil.ve\nnet.ve\norg.ve\nrec.ve\nstore.ve\ntec.ve\nweb.ve\n\n// vg : https://en.wikipedia.org/wiki/.vg\nvg\n\n// vi : http://www.nic.vi/newdomainform.htm\n// http://www.nic.vi/Domain_Rules/body_domain_rules.html indicates some other\n// TLDs are \"reserved\", such as edu.vi and gov.vi, but doesn't actually say they\n// are available for registration (which they do not seem to be).\nvi\nco.vi\ncom.vi\nk12.vi\nnet.vi\norg.vi\n\n// vn : https://www.dot.vn/vnnic/vnnic/domainregistration.jsp\nvn\ncom.vn\nnet.vn\norg.vn\nedu.vn\ngov.vn\nint.vn\nac.vn\nbiz.vn\ninfo.vn\nname.vn\npro.vn\nhealth.vn\n\n// vu : https://en.wikipedia.org/wiki/.vu\n// http://www.vunic.vu/\nvu\ncom.vu\nedu.vu\nnet.vu\norg.vu\n\n// wf : http://www.afnic.fr/medias/documents/AFNIC-naming-policy2012.pdf\nwf\n\n// ws : https://en.wikipedia.org/wiki/.ws\n// http://samoanic.ws/index.dhtml\nws\ncom.ws\nnet.ws\norg.ws\ngov.ws\nedu.ws\n\n// yt : http://www.afnic.fr/medias/documents/AFNIC-naming-policy2012.pdf\nyt\n\n// IDN ccTLDs\n// When submitting patches, please maintain a sort by ISO 3166 ccTLD, then\n// U-label, and follow this format:\n// // A-Label (\"<Latin renderings>\", <language name>[, variant info]) : <ISO 3166 ccTLD>\n// // [sponsoring org]\n// U-Label\n\n// xn--mgbaam7a8h (\"Emerat\", Arabic) : AE\n// http://nic.ae/english/arabicdomain/rules.jsp\n\u0627\u0645\u0627\u0631\u0627\u062A\n\n// xn--y9a3aq (\"hye\", Armenian) : AM\n// ISOC AM (operated by .am Registry)\n\u0570\u0561\u0575\n\n// xn--54b7fta0cc (\"Bangla\", Bangla) : BD\n\u09AC\u09BE\u0982\u09B2\u09BE\n\n// xn--90ae (\"bg\", Bulgarian) : BG\n\u0431\u0433\n\n// xn--90ais (\"bel\", Belarusian/Russian Cyrillic) : BY\n// Operated by .by registry\n\u0431\u0435\u043B\n\n// xn--fiqs8s (\"Zhongguo/China\", Chinese, Simplified) : CN\n// CNNIC\n// http://cnnic.cn/html/Dir/2005/10/11/3218.htm\n\u4E2D\u56FD\n\n// xn--fiqz9s (\"Zhongguo/China\", Chinese, Traditional) : CN\n// CNNIC\n// http://cnnic.cn/html/Dir/2005/10/11/3218.htm\n\u4E2D\u570B\n\n// xn--lgbbat1ad8j (\"Algeria/Al Jazair\", Arabic) : DZ\n\u0627\u0644\u062C\u0632\u0627\u0626\u0631\n\n// xn--wgbh1c (\"Egypt/Masr\", Arabic) : EG\n// http://www.dotmasr.eg/\n\u0645\u0635\u0631\n\n// xn--e1a4c (\"eu\", Cyrillic) : EU\n\u0435\u044E\n\n// xn--node (\"ge\", Georgian Mkhedruli) : GE\n\u10D2\u10D4\n\n// xn--qxam (\"el\", Greek) : GR\n// Hellenic Ministry of Infrastructure, Transport, and Networks\n\u03B5\u03BB\n\n// xn--j6w193g (\"Hong Kong\", Chinese) : HK\n// https://www.hkirc.hk\n// Submitted by registry <hk.tech@hkirc.hk>\n// https://www.hkirc.hk/content.jsp?id=30#!/34\n\u9999\u6E2F\n\u516C\u53F8.\u9999\u6E2F\n\u6559\u80B2.\u9999\u6E2F\n\u653F\u5E9C.\u9999\u6E2F\n\u500B\u4EBA.\u9999\u6E2F\n\u7DB2\u7D61.\u9999\u6E2F\n\u7D44\u7E54.\u9999\u6E2F\n\n// xn--2scrj9c (\"Bharat\", Kannada) : IN\n// India\n\u0CAD\u0CBE\u0CB0\u0CA4\n\n// xn--3hcrj9c (\"Bharat\", Oriya) : IN\n// India\n\u0B2D\u0B3E\u0B30\u0B24\n\n// xn--45br5cyl (\"Bharatam\", Assamese) : IN\n// India\n\u09AD\u09BE\u09F0\u09A4\n\n// xn--h2breg3eve (\"Bharatam\", Sanskrit) : IN\n// India\n\u092D\u093E\u0930\u0924\u092E\u094D\n\n// xn--h2brj9c8c (\"Bharot\", Santali) : IN\n// India\n\u092D\u093E\u0930\u094B\u0924\n\n// xn--mgbgu82a (\"Bharat\", Sindhi) : IN\n// India\n\u0680\u0627\u0631\u062A\n\n// xn--rvc1e0am3e (\"Bharatam\", Malayalam) : IN\n// India\n\u0D2D\u0D3E\u0D30\u0D24\u0D02\n\n// xn--h2brj9c (\"Bharat\", Devanagari) : IN\n// India\n\u092D\u093E\u0930\u0924\n\n// xn--mgbbh1a (\"Bharat\", Kashmiri) : IN\n// India\n\u0628\u0627\u0631\u062A\n\n// xn--mgbbh1a71e (\"Bharat\", Arabic) : IN\n// India\n\u0628\u06BE\u0627\u0631\u062A\n\n// xn--fpcrj9c3d (\"Bharat\", Telugu) : IN\n// India\n\u0C2D\u0C3E\u0C30\u0C24\u0C4D\n\n// xn--gecrj9c (\"Bharat\", Gujarati) : IN\n// India\n\u0AAD\u0ABE\u0AB0\u0AA4\n\n// xn--s9brj9c (\"Bharat\", Gurmukhi) : IN\n// India\n\u0A2D\u0A3E\u0A30\u0A24\n\n// xn--45brj9c (\"Bharat\", Bengali) : IN\n// India\n\u09AD\u09BE\u09B0\u09A4\n\n// xn--xkc2dl3a5ee0h (\"India\", Tamil) : IN\n// India\n\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE\n\n// xn--mgba3a4f16a (\"Iran\", Persian) : IR\n\u0627\u06CC\u0631\u0627\u0646\n\n// xn--mgba3a4fra (\"Iran\", Arabic) : IR\n\u0627\u064A\u0631\u0627\u0646\n\n// xn--mgbtx2b (\"Iraq\", Arabic) : IQ\n// Communications and Media Commission\n\u0639\u0631\u0627\u0642\n\n// xn--mgbayh7gpa (\"al-Ordon\", Arabic) : JO\n// National Information Technology Center (NITC)\n// Royal Scientific Society, Al-Jubeiha\n\u0627\u0644\u0627\u0631\u062F\u0646\n\n// xn--3e0b707e (\"Republic of Korea\", Hangul) : KR\n\uD55C\uAD6D\n\n// xn--80ao21a (\"Kaz\", Kazakh) : KZ\n\u049B\u0430\u0437\n\n// xn--fzc2c9e2c (\"Lanka\", Sinhalese-Sinhala) : LK\n// http://nic.lk\n\u0DBD\u0D82\u0D9A\u0DCF\n\n// xn--xkc2al3hye2a (\"Ilangai\", Tamil) : LK\n// http://nic.lk\n\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8\n\n// xn--mgbc0a9azcg (\"Morocco/al-Maghrib\", Arabic) : MA\n\u0627\u0644\u0645\u063A\u0631\u0628\n\n// xn--d1alf (\"mkd\", Macedonian) : MK\n// MARnet\n\u043C\u043A\u0434\n\n// xn--l1acc (\"mon\", Mongolian) : MN\n\u043C\u043E\u043D\n\n// xn--mix891f (\"Macao\", Chinese, Traditional) : MO\n// MONIC / HNET Asia (Registry Operator for .mo)\n\u6FB3\u9580\n\n// xn--mix082f (\"Macao\", Chinese, Simplified) : MO\n\u6FB3\u95E8\n\n// xn--mgbx4cd0ab (\"Malaysia\", Malay) : MY\n\u0645\u0644\u064A\u0633\u064A\u0627\n\n// xn--mgb9awbf (\"Oman\", Arabic) : OM\n\u0639\u0645\u0627\u0646\n\n// xn--mgbai9azgqp6j (\"Pakistan\", Urdu/Arabic) : PK\n\u067E\u0627\u06A9\u0633\u062A\u0627\u0646\n\n// xn--mgbai9a5eva00b (\"Pakistan\", Urdu/Arabic, variant) : PK\n\u067E\u0627\u0643\u0633\u062A\u0627\u0646\n\n// xn--ygbi2ammx (\"Falasteen\", Arabic) : PS\n// The Palestinian National Internet Naming Authority (PNINA)\n// http://www.pnina.ps\n\u0641\u0644\u0633\u0637\u064A\u0646\n\n// xn--90a3ac (\"srb\", Cyrillic) : RS\n// https://www.rnids.rs/en/domains/national-domains\n\u0441\u0440\u0431\n\u043F\u0440.\u0441\u0440\u0431\n\u043E\u0440\u0433.\u0441\u0440\u0431\n\u043E\u0431\u0440.\u0441\u0440\u0431\n\u043E\u0434.\u0441\u0440\u0431\n\u0443\u043F\u0440.\u0441\u0440\u0431\n\u0430\u043A.\u0441\u0440\u0431\n\n// xn--p1ai (\"rf\", Russian-Cyrillic) : RU\n// http://www.cctld.ru/en/docs/rulesrf.php\n\u0440\u0444\n\n// xn--wgbl6a (\"Qatar\", Arabic) : QA\n// http://www.ict.gov.qa/\n\u0642\u0637\u0631\n\n// xn--mgberp4a5d4ar (\"AlSaudiah\", Arabic) : SA\n// http://www.nic.net.sa/\n\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629\n\n// xn--mgberp4a5d4a87g (\"AlSaudiah\", Arabic, variant)  : SA\n\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u0629\n\n// xn--mgbqly7c0a67fbc (\"AlSaudiah\", Arabic, variant) : SA\n\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u06C3\n\n// xn--mgbqly7cvafr (\"AlSaudiah\", Arabic, variant) : SA\n\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0647\n\n// xn--mgbpl2fh (\"sudan\", Arabic) : SD\n// Operated by .sd registry\n\u0633\u0648\u062F\u0627\u0646\n\n// xn--yfro4i67o Singapore (\"Singapore\", Chinese) : SG\n\u65B0\u52A0\u5761\n\n// xn--clchc0ea0b2g2a9gcd (\"Singapore\", Tamil) : SG\n\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD\n\n// xn--ogbpf8fl (\"Syria\", Arabic) : SY\n\u0633\u0648\u0631\u064A\u0629\n\n// xn--mgbtf8fl (\"Syria\", Arabic, variant) : SY\n\u0633\u0648\u0631\u064A\u0627\n\n// xn--o3cw4h (\"Thai\", Thai) : TH\n// http://www.thnic.co.th\n\u0E44\u0E17\u0E22\n\u0E28\u0E36\u0E01\u0E29\u0E32.\u0E44\u0E17\u0E22\n\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08.\u0E44\u0E17\u0E22\n\u0E23\u0E31\u0E10\u0E1A\u0E32\u0E25.\u0E44\u0E17\u0E22\n\u0E17\u0E2B\u0E32\u0E23.\u0E44\u0E17\u0E22\n\u0E40\u0E19\u0E47\u0E15.\u0E44\u0E17\u0E22\n\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E23.\u0E44\u0E17\u0E22\n\n// xn--pgbs0dh (\"Tunisia\", Arabic) : TN\n// http://nic.tn\n\u062A\u0648\u0646\u0633\n\n// xn--kpry57d (\"Taiwan\", Chinese, Traditional) : TW\n// http://www.twnic.net/english/dn/dn_07a.htm\n\u53F0\u7063\n\n// xn--kprw13d (\"Taiwan\", Chinese, Simplified) : TW\n// http://www.twnic.net/english/dn/dn_07a.htm\n\u53F0\u6E7E\n\n// xn--nnx388a (\"Taiwan\", Chinese, variant) : TW\n\u81FA\u7063\n\n// xn--j1amh (\"ukr\", Cyrillic) : UA\n\u0443\u043A\u0440\n\n// xn--mgb2ddes (\"AlYemen\", Arabic) : YE\n\u0627\u0644\u064A\u0645\u0646\n\n// xxx : http://icmregistry.com\nxxx\n\n// ye : http://www.y.net.ye/services/domain_name.htm\n*.ye\n\n// za : http://www.zadna.org.za/content/page/domain-information\nac.za\nagric.za\nalt.za\nco.za\nedu.za\ngov.za\ngrondar.za\nlaw.za\nmil.za\nnet.za\nngo.za\nnis.za\nnom.za\norg.za\nschool.za\ntm.za\nweb.za\n\n// zm : https://zicta.zm/\n// Submitted by registry <info@zicta.zm>\nzm\nac.zm\nbiz.zm\nco.zm\ncom.zm\nedu.zm\ngov.zm\ninfo.zm\nmil.zm\nnet.zm\norg.zm\nsch.zm\n\n// zw : https://www.potraz.gov.zw/\n// Confirmed by registry <bmtengwa@potraz.gov.zw> 2017-01-25\nzw\nac.zw\nco.zw\ngov.zw\nmil.zw\norg.zw\n\n\n// newGTLDs\n// List of new gTLDs imported from https://newgtlds.icann.org/newgtlds.csv on 2018-05-08T19:40:37Z\n// This list is auto-generated, don't edit it manually.\n\n// aaa : 2015-02-26 American Automobile Association, Inc.\naaa\n\n// aarp : 2015-05-21 AARP\naarp\n\n// abarth : 2015-07-30 Fiat Chrysler Automobiles N.V.\nabarth\n\n// abb : 2014-10-24 ABB Ltd\nabb\n\n// abbott : 2014-07-24 Abbott Laboratories, Inc.\nabbott\n\n// abbvie : 2015-07-30 AbbVie Inc.\nabbvie\n\n// abc : 2015-07-30 Disney Enterprises, Inc.\nabc\n\n// able : 2015-06-25 Able Inc.\nable\n\n// abogado : 2014-04-24 Minds + Machines Group Limited\nabogado\n\n// abudhabi : 2015-07-30 Abu Dhabi Systems and Information Centre\nabudhabi\n\n// academy : 2013-11-07 Binky Moon, LLC\nacademy\n\n// accenture : 2014-08-15 Accenture plc\naccenture\n\n// accountant : 2014-11-20 dot Accountant Limited\naccountant\n\n// accountants : 2014-03-20 Binky Moon, LLC\naccountants\n\n// aco : 2015-01-08 ACO Severin Ahlmann GmbH & Co. KG\naco\n\n// active : 2014-05-01 Active Network, LLC\nactive\n\n// actor : 2013-12-12 United TLD Holdco Ltd.\nactor\n\n// adac : 2015-07-16 Allgemeiner Deutscher Automobil-Club e.V. (ADAC)\nadac\n\n// ads : 2014-12-04 Charleston Road Registry Inc.\nads\n\n// adult : 2014-10-16 ICM Registry AD LLC\nadult\n\n// aeg : 2015-03-19 Aktiebolaget Electrolux\naeg\n\n// aetna : 2015-05-21 Aetna Life Insurance Company\naetna\n\n// afamilycompany : 2015-07-23 Johnson Shareholdings, Inc.\nafamilycompany\n\n// afl : 2014-10-02 Australian Football League\nafl\n\n// africa : 2014-03-24 ZA Central Registry NPC trading as Registry.Africa\nafrica\n\n// agakhan : 2015-04-23 Fondation Aga Khan (Aga Khan Foundation)\nagakhan\n\n// agency : 2013-11-14 Binky Moon, LLC\nagency\n\n// aig : 2014-12-18 American International Group, Inc.\naig\n\n// aigo : 2015-08-06 aigo Digital Technology Co,Ltd.\naigo\n\n// airbus : 2015-07-30 Airbus S.A.S.\nairbus\n\n// airforce : 2014-03-06 United TLD Holdco Ltd.\nairforce\n\n// airtel : 2014-10-24 Bharti Airtel Limited\nairtel\n\n// akdn : 2015-04-23 Fondation Aga Khan (Aga Khan Foundation)\nakdn\n\n// alfaromeo : 2015-07-31 Fiat Chrysler Automobiles N.V.\nalfaromeo\n\n// alibaba : 2015-01-15 Alibaba Group Holding Limited\nalibaba\n\n// alipay : 2015-01-15 Alibaba Group Holding Limited\nalipay\n\n// allfinanz : 2014-07-03 Allfinanz Deutsche Verm\u00F6gensberatung Aktiengesellschaft\nallfinanz\n\n// allstate : 2015-07-31 Allstate Fire and Casualty Insurance Company\nallstate\n\n// ally : 2015-06-18 Ally Financial Inc.\nally\n\n// alsace : 2014-07-02 Region Grand Est\nalsace\n\n// alstom : 2015-07-30 ALSTOM\nalstom\n\n// americanexpress : 2015-07-31 American Express Travel Related Services Company, Inc.\namericanexpress\n\n// americanfamily : 2015-07-23 AmFam, Inc.\namericanfamily\n\n// amex : 2015-07-31 American Express Travel Related Services Company, Inc.\namex\n\n// amfam : 2015-07-23 AmFam, Inc.\namfam\n\n// amica : 2015-05-28 Amica Mutual Insurance Company\namica\n\n// amsterdam : 2014-07-24 Gemeente Amsterdam\namsterdam\n\n// analytics : 2014-12-18 Campus IP LLC\nanalytics\n\n// android : 2014-08-07 Charleston Road Registry Inc.\nandroid\n\n// anquan : 2015-01-08 QIHOO 360 TECHNOLOGY CO. LTD.\nanquan\n\n// anz : 2015-07-31 Australia and New Zealand Banking Group Limited\nanz\n\n// aol : 2015-09-17 Oath Inc.\naol\n\n// apartments : 2014-12-11 Binky Moon, LLC\napartments\n\n// app : 2015-05-14 Charleston Road Registry Inc.\napp\n\n// apple : 2015-05-14 Apple Inc.\napple\n\n// aquarelle : 2014-07-24 Aquarelle.com\naquarelle\n\n// arab : 2015-11-12 League of Arab States\narab\n\n// aramco : 2014-11-20 Aramco Services Company\naramco\n\n// archi : 2014-02-06 Afilias plc\narchi\n\n// army : 2014-03-06 United TLD Holdco Ltd.\narmy\n\n// art : 2016-03-24 UK Creative Ideas Limited\nart\n\n// arte : 2014-12-11 Association Relative \u00E0 la T\u00E9l\u00E9vision Europ\u00E9enne G.E.I.E.\narte\n\n// asda : 2015-07-31 Wal-Mart Stores, Inc.\nasda\n\n// associates : 2014-03-06 Binky Moon, LLC\nassociates\n\n// athleta : 2015-07-30 The Gap, Inc.\nathleta\n\n// attorney : 2014-03-20 United TLD Holdco Ltd.\nattorney\n\n// auction : 2014-03-20 United TLD Holdco Ltd.\nauction\n\n// audi : 2015-05-21 AUDI Aktiengesellschaft\naudi\n\n// audible : 2015-06-25 Amazon Registry Services, Inc.\naudible\n\n// audio : 2014-03-20 Uniregistry, Corp.\naudio\n\n// auspost : 2015-08-13 Australian Postal Corporation\nauspost\n\n// author : 2014-12-18 Amazon Registry Services, Inc.\nauthor\n\n// auto : 2014-11-13 Cars\u00A0Registry Limited\nauto\n\n// autos : 2014-01-09 DERAutos, LLC\nautos\n\n// avianca : 2015-01-08 Aerovias del Continente Americano S.A. Avianca\navianca\n\n// aws : 2015-06-25 Amazon Registry Services, Inc.\naws\n\n// axa : 2013-12-19 AXA SA\naxa\n\n// azure : 2014-12-18 Microsoft Corporation\nazure\n\n// baby : 2015-04-09 Johnson & Johnson Services, Inc.\nbaby\n\n// baidu : 2015-01-08 Baidu, Inc.\nbaidu\n\n// banamex : 2015-07-30 Citigroup Inc.\nbanamex\n\n// bananarepublic : 2015-07-31 The Gap, Inc.\nbananarepublic\n\n// band : 2014-06-12 United TLD Holdco Ltd.\nband\n\n// bank : 2014-09-25 fTLD Registry Services LLC\nbank\n\n// bar : 2013-12-12 Punto 2012 Sociedad Anonima Promotora de Inversion de Capital Variable\nbar\n\n// barcelona : 2014-07-24 Municipi de Barcelona\nbarcelona\n\n// barclaycard : 2014-11-20 Barclays Bank PLC\nbarclaycard\n\n// barclays : 2014-11-20 Barclays Bank PLC\nbarclays\n\n// barefoot : 2015-06-11 Gallo Vineyards, Inc.\nbarefoot\n\n// bargains : 2013-11-14 Binky Moon, LLC\nbargains\n\n// baseball : 2015-10-29 MLB Advanced Media DH, LLC\nbaseball\n\n// basketball : 2015-08-20 F\u00E9d\u00E9ration Internationale de Basketball (FIBA)\nbasketball\n\n// bauhaus : 2014-04-17 Werkhaus GmbH\nbauhaus\n\n// bayern : 2014-01-23 Bayern Connect GmbH\nbayern\n\n// bbc : 2014-12-18 British Broadcasting Corporation\nbbc\n\n// bbt : 2015-07-23 BB&T Corporation\nbbt\n\n// bbva : 2014-10-02 BANCO BILBAO VIZCAYA ARGENTARIA, S.A.\nbbva\n\n// bcg : 2015-04-02 The Boston Consulting Group, Inc.\nbcg\n\n// bcn : 2014-07-24 Municipi de Barcelona\nbcn\n\n// beats : 2015-05-14 Beats Electronics, LLC\nbeats\n\n// beauty : 2015-12-03 L'Or\u00E9al\nbeauty\n\n// beer : 2014-01-09 Minds + Machines Group Limited\nbeer\n\n// bentley : 2014-12-18 Bentley Motors Limited\nbentley\n\n// berlin : 2013-10-31 dotBERLIN GmbH & Co. KG\nberlin\n\n// best : 2013-12-19 BestTLD Pty Ltd\nbest\n\n// bestbuy : 2015-07-31 BBY Solutions, Inc.\nbestbuy\n\n// bet : 2015-05-07 Afilias plc\nbet\n\n// bharti : 2014-01-09 Bharti Enterprises (Holding) Private Limited\nbharti\n\n// bible : 2014-06-19 American Bible Society\nbible\n\n// bid : 2013-12-19 dot Bid Limited\nbid\n\n// bike : 2013-08-27 Binky Moon, LLC\nbike\n\n// bing : 2014-12-18 Microsoft Corporation\nbing\n\n// bingo : 2014-12-04 Binky Moon, LLC\nbingo\n\n// bio : 2014-03-06 Afilias plc\nbio\n\n// black : 2014-01-16 Afilias plc\nblack\n\n// blackfriday : 2014-01-16 Uniregistry, Corp.\nblackfriday\n\n// blanco : 2015-07-16 BLANCO GmbH + Co KG\nblanco\n\n// blockbuster : 2015-07-30 Dish DBS Corporation\nblockbuster\n\n// blog : 2015-05-14 Knock Knock WHOIS There, LLC\nblog\n\n// bloomberg : 2014-07-17 Bloomberg IP Holdings LLC\nbloomberg\n\n// blue : 2013-11-07 Afilias plc\nblue\n\n// bms : 2014-10-30 Bristol-Myers Squibb Company\nbms\n\n// bmw : 2014-01-09 Bayerische Motoren Werke Aktiengesellschaft\nbmw\n\n// bnl : 2014-07-24 Banca Nazionale del Lavoro\nbnl\n\n// bnpparibas : 2014-05-29 BNP Paribas\nbnpparibas\n\n// boats : 2014-12-04 DERBoats, LLC\nboats\n\n// boehringer : 2015-07-09 Boehringer Ingelheim International GmbH\nboehringer\n\n// bofa : 2015-07-31 Bank of America Corporation\nbofa\n\n// bom : 2014-10-16 N\u00FAcleo de Informa\u00E7\u00E3o e Coordena\u00E7\u00E3o do Ponto BR - NIC.br\nbom\n\n// bond : 2014-06-05 Bond University Limited\nbond\n\n// boo : 2014-01-30 Charleston Road Registry Inc.\nboo\n\n// book : 2015-08-27 Amazon Registry Services, Inc.\nbook\n\n// booking : 2015-07-16 Booking.com B.V.\nbooking\n\n// bosch : 2015-06-18 Robert Bosch GMBH\nbosch\n\n// bostik : 2015-05-28 Bostik SA\nbostik\n\n// boston : 2015-12-10 Boston TLD Management, LLC\nboston\n\n// bot : 2014-12-18 Amazon Registry Services, Inc.\nbot\n\n// boutique : 2013-11-14 Binky Moon, LLC\nboutique\n\n// box : 2015-11-12 NS1 Limited\nbox\n\n// bradesco : 2014-12-18 Banco Bradesco S.A.\nbradesco\n\n// bridgestone : 2014-12-18 Bridgestone Corporation\nbridgestone\n\n// broadway : 2014-12-22 Celebrate Broadway, Inc.\nbroadway\n\n// broker : 2014-12-11 Dotbroker Registry Limited\nbroker\n\n// brother : 2015-01-29 Brother Industries, Ltd.\nbrother\n\n// brussels : 2014-02-06 DNS.be vzw\nbrussels\n\n// budapest : 2013-11-21 Minds + Machines Group Limited\nbudapest\n\n// bugatti : 2015-07-23 Bugatti International SA\nbugatti\n\n// build : 2013-11-07 Plan Bee LLC\nbuild\n\n// builders : 2013-11-07 Binky Moon, LLC\nbuilders\n\n// business : 2013-11-07 Binky Moon, LLC\nbusiness\n\n// buy : 2014-12-18 Amazon Registry Services, Inc.\nbuy\n\n// buzz : 2013-10-02 DOTSTRATEGY CO.\nbuzz\n\n// bzh : 2014-02-27 Association www.bzh\nbzh\n\n// cab : 2013-10-24 Binky Moon, LLC\ncab\n\n// cafe : 2015-02-11 Binky Moon, LLC\ncafe\n\n// cal : 2014-07-24 Charleston Road Registry Inc.\ncal\n\n// call : 2014-12-18 Amazon Registry Services, Inc.\ncall\n\n// calvinklein : 2015-07-30 PVH gTLD Holdings LLC\ncalvinklein\n\n// cam : 2016-04-21 AC Webconnecting Holding B.V.\ncam\n\n// camera : 2013-08-27 Binky Moon, LLC\ncamera\n\n// camp : 2013-11-07 Binky Moon, LLC\ncamp\n\n// cancerresearch : 2014-05-15 Australian Cancer Research Foundation\ncancerresearch\n\n// canon : 2014-09-12 Canon Inc.\ncanon\n\n// capetown : 2014-03-24 ZA Central Registry NPC trading as ZA Central Registry\ncapetown\n\n// capital : 2014-03-06 Binky Moon, LLC\ncapital\n\n// capitalone : 2015-08-06 Capital One Financial Corporation\ncapitalone\n\n// car : 2015-01-22 Cars\u00A0Registry Limited\ncar\n\n// caravan : 2013-12-12 Caravan International, Inc.\ncaravan\n\n// cards : 2013-12-05 Binky Moon, LLC\ncards\n\n// care : 2014-03-06 Binky Moon, LLC\ncare\n\n// career : 2013-10-09 dotCareer LLC\ncareer\n\n// careers : 2013-10-02 Binky Moon, LLC\ncareers\n\n// cars : 2014-11-13 Cars\u00A0Registry Limited\ncars\n\n// cartier : 2014-06-23 Richemont DNS Inc.\ncartier\n\n// casa : 2013-11-21 Minds + Machines Group Limited\ncasa\n\n// case : 2015-09-03 CNH Industrial N.V.\ncase\n\n// caseih : 2015-09-03 CNH Industrial N.V.\ncaseih\n\n// cash : 2014-03-06 Binky Moon, LLC\ncash\n\n// casino : 2014-12-18 Binky Moon, LLC\ncasino\n\n// catering : 2013-12-05 Binky Moon, LLC\ncatering\n\n// catholic : 2015-10-21 Pontificium Consilium de Comunicationibus Socialibus (PCCS) (Pontifical Council for Social Communication)\ncatholic\n\n// cba : 2014-06-26 COMMONWEALTH BANK OF AUSTRALIA\ncba\n\n// cbn : 2014-08-22 The Christian Broadcasting Network, Inc.\ncbn\n\n// cbre : 2015-07-02 CBRE, Inc.\ncbre\n\n// cbs : 2015-08-06 CBS Domains Inc.\ncbs\n\n// ceb : 2015-04-09 The Corporate Executive Board Company\nceb\n\n// center : 2013-11-07 Binky Moon, LLC\ncenter\n\n// ceo : 2013-11-07 CEOTLD Pty Ltd\nceo\n\n// cern : 2014-06-05 European Organization for Nuclear Research (\"CERN\")\ncern\n\n// cfa : 2014-08-28 CFA Institute\ncfa\n\n// cfd : 2014-12-11 DotCFD Registry Limited\ncfd\n\n// chanel : 2015-04-09 Chanel International B.V.\nchanel\n\n// channel : 2014-05-08 Charleston Road Registry Inc.\nchannel\n\n// charity : 2018-04-11 Corn Lake, LLC\ncharity\n\n// chase : 2015-04-30 JPMorgan Chase Bank, National Association\nchase\n\n// chat : 2014-12-04 Binky Moon, LLC\nchat\n\n// cheap : 2013-11-14 Binky Moon, LLC\ncheap\n\n// chintai : 2015-06-11 CHINTAI Corporation\nchintai\n\n// christmas : 2013-11-21 Uniregistry, Corp.\nchristmas\n\n// chrome : 2014-07-24 Charleston Road Registry Inc.\nchrome\n\n// chrysler : 2015-07-30 FCA US LLC.\nchrysler\n\n// church : 2014-02-06 Binky Moon, LLC\nchurch\n\n// cipriani : 2015-02-19 Hotel Cipriani Srl\ncipriani\n\n// circle : 2014-12-18 Amazon Registry Services, Inc.\ncircle\n\n// cisco : 2014-12-22 Cisco Technology, Inc.\ncisco\n\n// citadel : 2015-07-23 Citadel Domain LLC\ncitadel\n\n// citi : 2015-07-30 Citigroup Inc.\nciti\n\n// citic : 2014-01-09 CITIC Group Corporation\ncitic\n\n// city : 2014-05-29 Binky Moon, LLC\ncity\n\n// cityeats : 2014-12-11 Lifestyle Domain Holdings, Inc.\ncityeats\n\n// claims : 2014-03-20 Binky Moon, LLC\nclaims\n\n// cleaning : 2013-12-05 Binky Moon, LLC\ncleaning\n\n// click : 2014-06-05 Uniregistry, Corp.\nclick\n\n// clinic : 2014-03-20 Binky Moon, LLC\nclinic\n\n// clinique : 2015-10-01 The Est\u00E9e Lauder Companies Inc.\nclinique\n\n// clothing : 2013-08-27 Binky Moon, LLC\nclothing\n\n// cloud : 2015-04-16 Aruba PEC S.p.A.\ncloud\n\n// club : 2013-11-08 .CLUB DOMAINS, LLC\nclub\n\n// clubmed : 2015-06-25 Club M\u00E9diterran\u00E9e S.A.\nclubmed\n\n// coach : 2014-10-09 Binky Moon, LLC\ncoach\n\n// codes : 2013-10-31 Binky Moon, LLC\ncodes\n\n// coffee : 2013-10-17 Binky Moon, LLC\ncoffee\n\n// college : 2014-01-16 XYZ.COM LLC\ncollege\n\n// cologne : 2014-02-05 punkt.wien GmbH\ncologne\n\n// comcast : 2015-07-23 Comcast IP Holdings I, LLC\ncomcast\n\n// commbank : 2014-06-26 COMMONWEALTH BANK OF AUSTRALIA\ncommbank\n\n// community : 2013-12-05 Binky Moon, LLC\ncommunity\n\n// company : 2013-11-07 Binky Moon, LLC\ncompany\n\n// compare : 2015-10-08 iSelect Ltd\ncompare\n\n// computer : 2013-10-24 Binky Moon, LLC\ncomputer\n\n// comsec : 2015-01-08 VeriSign, Inc.\ncomsec\n\n// condos : 2013-12-05 Binky Moon, LLC\ncondos\n\n// construction : 2013-09-16 Binky Moon, LLC\nconstruction\n\n// consulting : 2013-12-05 United TLD Holdco Ltd.\nconsulting\n\n// contact : 2015-01-08 Top Level Spectrum, Inc.\ncontact\n\n// contractors : 2013-09-10 Binky Moon, LLC\ncontractors\n\n// cooking : 2013-11-21 Minds + Machines Group Limited\ncooking\n\n// cookingchannel : 2015-07-02 Lifestyle Domain Holdings, Inc.\ncookingchannel\n\n// cool : 2013-11-14 Binky Moon, LLC\ncool\n\n// corsica : 2014-09-25 Collectivit\u00E9 de Corse\ncorsica\n\n// country : 2013-12-19 DotCountry LLC\ncountry\n\n// coupon : 2015-02-26 Amazon Registry Services, Inc.\ncoupon\n\n// coupons : 2015-03-26 Binky Moon, LLC\ncoupons\n\n// courses : 2014-12-04 OPEN UNIVERSITIES AUSTRALIA PTY LTD\ncourses\n\n// credit : 2014-03-20 Binky Moon, LLC\ncredit\n\n// creditcard : 2014-03-20 Binky Moon, LLC\ncreditcard\n\n// creditunion : 2015-01-22 CUNA Performance Resources, LLC\ncreditunion\n\n// cricket : 2014-10-09 dot Cricket Limited\ncricket\n\n// crown : 2014-10-24 Crown Equipment Corporation\ncrown\n\n// crs : 2014-04-03 Federated Co-operatives Limited\ncrs\n\n// cruise : 2015-12-10 Viking River Cruises (Bermuda) Ltd.\ncruise\n\n// cruises : 2013-12-05 Binky Moon, LLC\ncruises\n\n// csc : 2014-09-25 Alliance-One Services, Inc.\ncsc\n\n// cuisinella : 2014-04-03 SALM S.A.S.\ncuisinella\n\n// cymru : 2014-05-08 Nominet UK\ncymru\n\n// cyou : 2015-01-22 Beijing Gamease Age Digital Technology Co., Ltd.\ncyou\n\n// dabur : 2014-02-06 Dabur India Limited\ndabur\n\n// dad : 2014-01-23 Charleston Road Registry Inc.\ndad\n\n// dance : 2013-10-24 United TLD Holdco Ltd.\ndance\n\n// data : 2016-06-02 Dish DBS Corporation\ndata\n\n// date : 2014-11-20 dot Date Limited\ndate\n\n// dating : 2013-12-05 Binky Moon, LLC\ndating\n\n// datsun : 2014-03-27 NISSAN MOTOR CO., LTD.\ndatsun\n\n// day : 2014-01-30 Charleston Road Registry Inc.\nday\n\n// dclk : 2014-11-20 Charleston Road Registry Inc.\ndclk\n\n// dds : 2015-05-07 Minds + Machines Group Limited\ndds\n\n// deal : 2015-06-25 Amazon Registry Services, Inc.\ndeal\n\n// dealer : 2014-12-22 Dealer Dot Com, Inc.\ndealer\n\n// deals : 2014-05-22 Binky Moon, LLC\ndeals\n\n// degree : 2014-03-06 United TLD Holdco Ltd.\ndegree\n\n// delivery : 2014-09-11 Binky Moon, LLC\ndelivery\n\n// dell : 2014-10-24 Dell Inc.\ndell\n\n// deloitte : 2015-07-31 Deloitte Touche Tohmatsu\ndeloitte\n\n// delta : 2015-02-19 Delta Air Lines, Inc.\ndelta\n\n// democrat : 2013-10-24 United TLD Holdco Ltd.\ndemocrat\n\n// dental : 2014-03-20 Binky Moon, LLC\ndental\n\n// dentist : 2014-03-20 United TLD Holdco Ltd.\ndentist\n\n// desi : 2013-11-14 Desi Networks LLC\ndesi\n\n// design : 2014-11-07 Top Level Design, LLC\ndesign\n\n// dev : 2014-10-16 Charleston Road Registry Inc.\ndev\n\n// dhl : 2015-07-23 Deutsche Post AG\ndhl\n\n// diamonds : 2013-09-22 Binky Moon, LLC\ndiamonds\n\n// diet : 2014-06-26 Uniregistry, Corp.\ndiet\n\n// digital : 2014-03-06 Binky Moon, LLC\ndigital\n\n// direct : 2014-04-10 Binky Moon, LLC\ndirect\n\n// directory : 2013-09-20 Binky Moon, LLC\ndirectory\n\n// discount : 2014-03-06 Binky Moon, LLC\ndiscount\n\n// discover : 2015-07-23 Discover Financial Services\ndiscover\n\n// dish : 2015-07-30 Dish DBS Corporation\ndish\n\n// diy : 2015-11-05 Lifestyle Domain Holdings, Inc.\ndiy\n\n// dnp : 2013-12-13 Dai Nippon Printing Co., Ltd.\ndnp\n\n// docs : 2014-10-16 Charleston Road Registry Inc.\ndocs\n\n// doctor : 2016-06-02 Binky Moon, LLC\ndoctor\n\n// dodge : 2015-07-30 FCA US LLC.\ndodge\n\n// dog : 2014-12-04 Binky Moon, LLC\ndog\n\n// doha : 2014-09-18 Communications Regulatory Authority (CRA)\ndoha\n\n// domains : 2013-10-17 Binky Moon, LLC\ndomains\n\n// dot : 2015-05-21 Dish DBS Corporation\ndot\n\n// download : 2014-11-20 dot Support Limited\ndownload\n\n// drive : 2015-03-05 Charleston Road Registry Inc.\ndrive\n\n// dtv : 2015-06-04 Dish DBS Corporation\ndtv\n\n// dubai : 2015-01-01 Dubai Smart Government Department\ndubai\n\n// duck : 2015-07-23 Johnson Shareholdings, Inc.\nduck\n\n// dunlop : 2015-07-02 The Goodyear Tire & Rubber Company\ndunlop\n\n// duns : 2015-08-06 The Dun & Bradstreet Corporation\nduns\n\n// dupont : 2015-06-25 E. I. du Pont de Nemours and Company\ndupont\n\n// durban : 2014-03-24 ZA Central Registry NPC trading as ZA Central Registry\ndurban\n\n// dvag : 2014-06-23 Deutsche Verm\u00F6gensberatung Aktiengesellschaft DVAG\ndvag\n\n// dvr : 2016-05-26 Hughes Satellite Systems Corporation\ndvr\n\n// earth : 2014-12-04 Interlink Co., Ltd.\nearth\n\n// eat : 2014-01-23 Charleston Road Registry Inc.\neat\n\n// eco : 2016-07-08 Big Room Inc.\neco\n\n// edeka : 2014-12-18 EDEKA Verband kaufm\u00E4nnischer Genossenschaften e.V.\nedeka\n\n// education : 2013-11-07 Binky Moon, LLC\neducation\n\n// email : 2013-10-31 Binky Moon, LLC\nemail\n\n// emerck : 2014-04-03 Merck KGaA\nemerck\n\n// energy : 2014-09-11 Binky Moon, LLC\nenergy\n\n// engineer : 2014-03-06 United TLD Holdco Ltd.\nengineer\n\n// engineering : 2014-03-06 Binky Moon, LLC\nengineering\n\n// enterprises : 2013-09-20 Binky Moon, LLC\nenterprises\n\n// epost : 2015-07-23 Deutsche Post AG\nepost\n\n// epson : 2014-12-04 Seiko Epson Corporation\nepson\n\n// equipment : 2013-08-27 Binky Moon, LLC\nequipment\n\n// ericsson : 2015-07-09 Telefonaktiebolaget L M Ericsson\nericsson\n\n// erni : 2014-04-03 ERNI Group Holding AG\nerni\n\n// esq : 2014-05-08 Charleston Road Registry Inc.\nesq\n\n// estate : 2013-08-27 Binky Moon, LLC\nestate\n\n// esurance : 2015-07-23 Esurance Insurance Company\nesurance\n\n// etisalat : 2015-09-03 Emirates Telecommunications Corporation (trading as Etisalat)\netisalat\n\n// eurovision : 2014-04-24 European Broadcasting Union (EBU)\neurovision\n\n// eus : 2013-12-12 Puntueus Fundazioa\neus\n\n// events : 2013-12-05 Binky Moon, LLC\nevents\n\n// everbank : 2014-05-15 EverBank\neverbank\n\n// exchange : 2014-03-06 Binky Moon, LLC\nexchange\n\n// expert : 2013-11-21 Binky Moon, LLC\nexpert\n\n// exposed : 2013-12-05 Binky Moon, LLC\nexposed\n\n// express : 2015-02-11 Binky Moon, LLC\nexpress\n\n// extraspace : 2015-05-14 Extra Space Storage LLC\nextraspace\n\n// fage : 2014-12-18 Fage International S.A.\nfage\n\n// fail : 2014-03-06 Binky Moon, LLC\nfail\n\n// fairwinds : 2014-11-13 FairWinds Partners, LLC\nfairwinds\n\n// faith : 2014-11-20 dot Faith Limited\nfaith\n\n// family : 2015-04-02 United TLD Holdco Ltd.\nfamily\n\n// fan : 2014-03-06 Asiamix Digital Limited\nfan\n\n// fans : 2014-11-07 Asiamix Digital Limited\nfans\n\n// farm : 2013-11-07 Binky Moon, LLC\nfarm\n\n// farmers : 2015-07-09 Farmers Insurance Exchange\nfarmers\n\n// fashion : 2014-07-03 Minds + Machines Group Limited\nfashion\n\n// fast : 2014-12-18 Amazon Registry Services, Inc.\nfast\n\n// fedex : 2015-08-06 Federal Express Corporation\nfedex\n\n// feedback : 2013-12-19 Top Level Spectrum, Inc.\nfeedback\n\n// ferrari : 2015-07-31 Fiat Chrysler Automobiles N.V.\nferrari\n\n// ferrero : 2014-12-18 Ferrero Trading Lux S.A.\nferrero\n\n// fiat : 2015-07-31 Fiat Chrysler Automobiles N.V.\nfiat\n\n// fidelity : 2015-07-30 Fidelity Brokerage Services LLC\nfidelity\n\n// fido : 2015-08-06 Rogers Communications Canada Inc.\nfido\n\n// film : 2015-01-08 Motion Picture Domain Registry Pty Ltd\nfilm\n\n// final : 2014-10-16 N\u00FAcleo de Informa\u00E7\u00E3o e Coordena\u00E7\u00E3o do Ponto BR - NIC.br\nfinal\n\n// finance : 2014-03-20 Binky Moon, LLC\nfinance\n\n// financial : 2014-03-06 Binky Moon, LLC\nfinancial\n\n// fire : 2015-06-25 Amazon Registry Services, Inc.\nfire\n\n// firestone : 2014-12-18 Bridgestone Licensing Services, Inc\nfirestone\n\n// firmdale : 2014-03-27 Firmdale Holdings Limited\nfirmdale\n\n// fish : 2013-12-12 Binky Moon, LLC\nfish\n\n// fishing : 2013-11-21 Minds + Machines Group Limited\nfishing\n\n// fit : 2014-11-07 Minds + Machines Group Limited\nfit\n\n// fitness : 2014-03-06 Binky Moon, LLC\nfitness\n\n// flickr : 2015-04-02 Yahoo! Domain Services Inc.\nflickr\n\n// flights : 2013-12-05 Binky Moon, LLC\nflights\n\n// flir : 2015-07-23 FLIR Systems, Inc.\nflir\n\n// florist : 2013-11-07 Binky Moon, LLC\nflorist\n\n// flowers : 2014-10-09 Uniregistry, Corp.\nflowers\n\n// fly : 2014-05-08 Charleston Road Registry Inc.\nfly\n\n// foo : 2014-01-23 Charleston Road Registry Inc.\nfoo\n\n// food : 2016-04-21 Lifestyle Domain Holdings, Inc.\nfood\n\n// foodnetwork : 2015-07-02 Lifestyle Domain Holdings, Inc.\nfoodnetwork\n\n// football : 2014-12-18 Binky Moon, LLC\nfootball\n\n// ford : 2014-11-13 Ford Motor Company\nford\n\n// forex : 2014-12-11 Dotforex Registry Limited\nforex\n\n// forsale : 2014-05-22 United TLD Holdco Ltd.\nforsale\n\n// forum : 2015-04-02 Fegistry, LLC\nforum\n\n// foundation : 2013-12-05 Binky Moon, LLC\nfoundation\n\n// fox : 2015-09-11 FOX Registry, LLC\nfox\n\n// free : 2015-12-10 Amazon Registry Services, Inc.\nfree\n\n// fresenius : 2015-07-30 Fresenius Immobilien-Verwaltungs-GmbH\nfresenius\n\n// frl : 2014-05-15 FRLregistry B.V.\nfrl\n\n// frogans : 2013-12-19 OP3FT\nfrogans\n\n// frontdoor : 2015-07-02 Lifestyle Domain Holdings, Inc.\nfrontdoor\n\n// frontier : 2015-02-05 Frontier Communications Corporation\nfrontier\n\n// ftr : 2015-07-16 Frontier Communications Corporation\nftr\n\n// fujitsu : 2015-07-30 Fujitsu Limited\nfujitsu\n\n// fujixerox : 2015-07-23 Xerox DNHC LLC\nfujixerox\n\n// fun : 2016-01-14 DotSpace Inc.\nfun\n\n// fund : 2014-03-20 Binky Moon, LLC\nfund\n\n// furniture : 2014-03-20 Binky Moon, LLC\nfurniture\n\n// futbol : 2013-09-20 United TLD Holdco Ltd.\nfutbol\n\n// fyi : 2015-04-02 Binky Moon, LLC\nfyi\n\n// gal : 2013-11-07 Asociaci\u00F3n puntoGAL\ngal\n\n// gallery : 2013-09-13 Binky Moon, LLC\ngallery\n\n// gallo : 2015-06-11 Gallo Vineyards, Inc.\ngallo\n\n// gallup : 2015-02-19 Gallup, Inc.\ngallup\n\n// game : 2015-05-28 Uniregistry, Corp.\ngame\n\n// games : 2015-05-28 United TLD Holdco Ltd.\ngames\n\n// gap : 2015-07-31 The Gap, Inc.\ngap\n\n// garden : 2014-06-26 Minds + Machines Group Limited\ngarden\n\n// gbiz : 2014-07-17 Charleston Road Registry Inc.\ngbiz\n\n// gdn : 2014-07-31 Joint Stock Company \"Navigation-information systems\"\ngdn\n\n// gea : 2014-12-04 GEA Group Aktiengesellschaft\ngea\n\n// gent : 2014-01-23 COMBELL NV\ngent\n\n// genting : 2015-03-12 Resorts World Inc Pte. Ltd.\ngenting\n\n// george : 2015-07-31 Wal-Mart Stores, Inc.\ngeorge\n\n// ggee : 2014-01-09 GMO Internet, Inc.\nggee\n\n// gift : 2013-10-17 DotGift, LLC\ngift\n\n// gifts : 2014-07-03 Binky Moon, LLC\ngifts\n\n// gives : 2014-03-06 United TLD Holdco Ltd.\ngives\n\n// giving : 2014-11-13 Giving Limited\ngiving\n\n// glade : 2015-07-23 Johnson Shareholdings, Inc.\nglade\n\n// glass : 2013-11-07 Binky Moon, LLC\nglass\n\n// gle : 2014-07-24 Charleston Road Registry Inc.\ngle\n\n// global : 2014-04-17 Dot Global Domain Registry Limited\nglobal\n\n// globo : 2013-12-19 Globo Comunica\u00E7\u00E3o e Participa\u00E7\u00F5es S.A\nglobo\n\n// gmail : 2014-05-01 Charleston Road Registry Inc.\ngmail\n\n// gmbh : 2016-01-29 Binky Moon, LLC\ngmbh\n\n// gmo : 2014-01-09 GMO Internet Pte. Ltd.\ngmo\n\n// gmx : 2014-04-24 1&1 Mail & Media GmbH\ngmx\n\n// godaddy : 2015-07-23 Go Daddy East, LLC\ngodaddy\n\n// gold : 2015-01-22 Binky Moon, LLC\ngold\n\n// goldpoint : 2014-11-20 YODOBASHI CAMERA CO.,LTD.\ngoldpoint\n\n// golf : 2014-12-18 Binky Moon, LLC\ngolf\n\n// goo : 2014-12-18 NTT Resonant Inc.\ngoo\n\n// goodhands : 2015-07-31 Allstate Fire and Casualty Insurance Company\ngoodhands\n\n// goodyear : 2015-07-02 The Goodyear Tire & Rubber Company\ngoodyear\n\n// goog : 2014-11-20 Charleston Road Registry Inc.\ngoog\n\n// google : 2014-07-24 Charleston Road Registry Inc.\ngoogle\n\n// gop : 2014-01-16 Republican State Leadership Committee, Inc.\ngop\n\n// got : 2014-12-18 Amazon Registry Services, Inc.\ngot\n\n// grainger : 2015-05-07 Grainger Registry Services, LLC\ngrainger\n\n// graphics : 2013-09-13 Binky Moon, LLC\ngraphics\n\n// gratis : 2014-03-20 Binky Moon, LLC\ngratis\n\n// green : 2014-05-08 Afilias plc\ngreen\n\n// gripe : 2014-03-06 Binky Moon, LLC\ngripe\n\n// grocery : 2016-06-16 Wal-Mart Stores, Inc.\ngrocery\n\n// group : 2014-08-15 Binky Moon, LLC\ngroup\n\n// guardian : 2015-07-30 The Guardian Life Insurance Company of America\nguardian\n\n// gucci : 2014-11-13 Guccio Gucci S.p.a.\ngucci\n\n// guge : 2014-08-28 Charleston Road Registry Inc.\nguge\n\n// guide : 2013-09-13 Binky Moon, LLC\nguide\n\n// guitars : 2013-11-14 Uniregistry, Corp.\nguitars\n\n// guru : 2013-08-27 Binky Moon, LLC\nguru\n\n// hair : 2015-12-03 L'Or\u00E9al\nhair\n\n// hamburg : 2014-02-20 Hamburg Top-Level-Domain GmbH\nhamburg\n\n// hangout : 2014-11-13 Charleston Road Registry Inc.\nhangout\n\n// haus : 2013-12-05 United TLD Holdco Ltd.\nhaus\n\n// hbo : 2015-07-30 HBO Registry Services, Inc.\nhbo\n\n// hdfc : 2015-07-30 HOUSING DEVELOPMENT FINANCE CORPORATION LIMITED\nhdfc\n\n// hdfcbank : 2015-02-12 HDFC Bank Limited\nhdfcbank\n\n// health : 2015-02-11 DotHealth, LLC\nhealth\n\n// healthcare : 2014-06-12 Binky Moon, LLC\nhealthcare\n\n// help : 2014-06-26 Uniregistry, Corp.\nhelp\n\n// helsinki : 2015-02-05 City of Helsinki\nhelsinki\n\n// here : 2014-02-06 Charleston Road Registry Inc.\nhere\n\n// hermes : 2014-07-10 HERMES INTERNATIONAL\nhermes\n\n// hgtv : 2015-07-02 Lifestyle Domain Holdings, Inc.\nhgtv\n\n// hiphop : 2014-03-06 Uniregistry, Corp.\nhiphop\n\n// hisamitsu : 2015-07-16 Hisamitsu Pharmaceutical Co.,Inc.\nhisamitsu\n\n// hitachi : 2014-10-31 Hitachi, Ltd.\nhitachi\n\n// hiv : 2014-03-13 Uniregistry, Corp.\nhiv\n\n// hkt : 2015-05-14 PCCW-HKT DataCom Services Limited\nhkt\n\n// hockey : 2015-03-19 Binky Moon, LLC\nhockey\n\n// holdings : 2013-08-27 Binky Moon, LLC\nholdings\n\n// holiday : 2013-11-07 Binky Moon, LLC\nholiday\n\n// homedepot : 2015-04-02 Home Depot Product Authority, LLC\nhomedepot\n\n// homegoods : 2015-07-16 The TJX Companies, Inc.\nhomegoods\n\n// homes : 2014-01-09 DERHomes, LLC\nhomes\n\n// homesense : 2015-07-16 The TJX Companies, Inc.\nhomesense\n\n// honda : 2014-12-18 Honda Motor Co., Ltd.\nhonda\n\n// honeywell : 2015-07-23 Honeywell GTLD LLC\nhoneywell\n\n// horse : 2013-11-21 Minds + Machines Group Limited\nhorse\n\n// hospital : 2016-10-20 Binky Moon, LLC\nhospital\n\n// host : 2014-04-17 DotHost Inc.\nhost\n\n// hosting : 2014-05-29 Uniregistry, Corp.\nhosting\n\n// hot : 2015-08-27 Amazon Registry Services, Inc.\nhot\n\n// hoteles : 2015-03-05 Travel Reservations SRL\nhoteles\n\n// hotels : 2016-04-07 Booking.com B.V.\nhotels\n\n// hotmail : 2014-12-18 Microsoft Corporation\nhotmail\n\n// house : 2013-11-07 Binky Moon, LLC\nhouse\n\n// how : 2014-01-23 Charleston Road Registry Inc.\nhow\n\n// hsbc : 2014-10-24 HSBC Global Services (UK) Limited\nhsbc\n\n// hughes : 2015-07-30 Hughes Satellite Systems Corporation\nhughes\n\n// hyatt : 2015-07-30 Hyatt GTLD, L.L.C.\nhyatt\n\n// hyundai : 2015-07-09 Hyundai Motor Company\nhyundai\n\n// ibm : 2014-07-31 International Business Machines Corporation\nibm\n\n// icbc : 2015-02-19 Industrial and Commercial Bank of China Limited\nicbc\n\n// ice : 2014-10-30 IntercontinentalExchange, Inc.\nice\n\n// icu : 2015-01-08 ShortDot SA\nicu\n\n// ieee : 2015-07-23 IEEE Global LLC\nieee\n\n// ifm : 2014-01-30 ifm electronic gmbh\nifm\n\n// ikano : 2015-07-09 Ikano S.A.\nikano\n\n// imamat : 2015-08-06 Fondation Aga Khan (Aga Khan Foundation)\nimamat\n\n// imdb : 2015-06-25 Amazon Registry Services, Inc.\nimdb\n\n// immo : 2014-07-10 Binky Moon, LLC\nimmo\n\n// immobilien : 2013-11-07 United TLD Holdco Ltd.\nimmobilien\n\n// inc : 2018-03-10 GTLD Limited\ninc\n\n// industries : 2013-12-05 Binky Moon, LLC\nindustries\n\n// infiniti : 2014-03-27 NISSAN MOTOR CO., LTD.\ninfiniti\n\n// ing : 2014-01-23 Charleston Road Registry Inc.\ning\n\n// ink : 2013-12-05 Top Level Design, LLC\nink\n\n// institute : 2013-11-07 Binky Moon, LLC\ninstitute\n\n// insurance : 2015-02-19 fTLD Registry Services LLC\ninsurance\n\n// insure : 2014-03-20 Binky Moon, LLC\ninsure\n\n// intel : 2015-08-06 Intel Corporation\nintel\n\n// international : 2013-11-07 Binky Moon, LLC\ninternational\n\n// intuit : 2015-07-30 Intuit Administrative Services, Inc.\nintuit\n\n// investments : 2014-03-20 Binky Moon, LLC\ninvestments\n\n// ipiranga : 2014-08-28 Ipiranga Produtos de Petroleo S.A.\nipiranga\n\n// irish : 2014-08-07 Binky Moon, LLC\nirish\n\n// iselect : 2015-02-11 iSelect Ltd\niselect\n\n// ismaili : 2015-08-06 Fondation Aga Khan (Aga Khan Foundation)\nismaili\n\n// ist : 2014-08-28 Istanbul Metropolitan Municipality\nist\n\n// istanbul : 2014-08-28 Istanbul Metropolitan Municipality\nistanbul\n\n// itau : 2014-10-02 Itau Unibanco Holding S.A.\nitau\n\n// itv : 2015-07-09 ITV Services Limited\nitv\n\n// iveco : 2015-09-03 CNH Industrial N.V.\niveco\n\n// jaguar : 2014-11-13 Jaguar Land Rover Ltd\njaguar\n\n// java : 2014-06-19 Oracle Corporation\njava\n\n// jcb : 2014-11-20 JCB Co., Ltd.\njcb\n\n// jcp : 2015-04-23 JCP Media, Inc.\njcp\n\n// jeep : 2015-07-30 FCA US LLC.\njeep\n\n// jetzt : 2014-01-09 Binky Moon, LLC\njetzt\n\n// jewelry : 2015-03-05 Binky Moon, LLC\njewelry\n\n// jio : 2015-04-02 Reliance Industries Limited\njio\n\n// jlc : 2014-12-04 Richemont DNS Inc.\njlc\n\n// jll : 2015-04-02 Jones Lang LaSalle Incorporated\njll\n\n// jmp : 2015-03-26 Matrix IP LLC\njmp\n\n// jnj : 2015-06-18 Johnson & Johnson Services, Inc.\njnj\n\n// joburg : 2014-03-24 ZA Central Registry NPC trading as ZA Central Registry\njoburg\n\n// jot : 2014-12-18 Amazon Registry Services, Inc.\njot\n\n// joy : 2014-12-18 Amazon Registry Services, Inc.\njoy\n\n// jpmorgan : 2015-04-30 JPMorgan Chase Bank, National Association\njpmorgan\n\n// jprs : 2014-09-18 Japan Registry Services Co., Ltd.\njprs\n\n// juegos : 2014-03-20 Uniregistry, Corp.\njuegos\n\n// juniper : 2015-07-30 JUNIPER NETWORKS, INC.\njuniper\n\n// kaufen : 2013-11-07 United TLD Holdco Ltd.\nkaufen\n\n// kddi : 2014-09-12 KDDI CORPORATION\nkddi\n\n// kerryhotels : 2015-04-30 Kerry Trading Co. Limited\nkerryhotels\n\n// kerrylogistics : 2015-04-09 Kerry Trading Co. Limited\nkerrylogistics\n\n// kerryproperties : 2015-04-09 Kerry Trading Co. Limited\nkerryproperties\n\n// kfh : 2014-12-04 Kuwait Finance House\nkfh\n\n// kia : 2015-07-09 KIA MOTORS CORPORATION\nkia\n\n// kim : 2013-09-23 Afilias plc\nkim\n\n// kinder : 2014-11-07 Ferrero Trading Lux S.A.\nkinder\n\n// kindle : 2015-06-25 Amazon Registry Services, Inc.\nkindle\n\n// kitchen : 2013-09-20 Binky Moon, LLC\nkitchen\n\n// kiwi : 2013-09-20 DOT KIWI LIMITED\nkiwi\n\n// koeln : 2014-01-09 punkt.wien GmbH\nkoeln\n\n// komatsu : 2015-01-08 Komatsu Ltd.\nkomatsu\n\n// kosher : 2015-08-20 Kosher Marketing Assets LLC\nkosher\n\n// kpmg : 2015-04-23 KPMG International Cooperative (KPMG International Genossenschaft)\nkpmg\n\n// kpn : 2015-01-08 Koninklijke KPN N.V.\nkpn\n\n// krd : 2013-12-05 KRG Department of Information Technology\nkrd\n\n// kred : 2013-12-19 KredTLD Pty Ltd\nkred\n\n// kuokgroup : 2015-04-09 Kerry Trading Co. Limited\nkuokgroup\n\n// kyoto : 2014-11-07 Academic Institution: Kyoto Jyoho Gakuen\nkyoto\n\n// lacaixa : 2014-01-09 Fundaci\u00F3n Bancaria Caixa d\u2019Estalvis i Pensions de Barcelona, \u201Cla Caixa\u201D\nlacaixa\n\n// ladbrokes : 2015-08-06 LADBROKES INTERNATIONAL PLC\nladbrokes\n\n// lamborghini : 2015-06-04 Automobili Lamborghini S.p.A.\nlamborghini\n\n// lamer : 2015-10-01 The Est\u00E9e Lauder Companies Inc.\nlamer\n\n// lancaster : 2015-02-12 LANCASTER\nlancaster\n\n// lancia : 2015-07-31 Fiat Chrysler Automobiles N.V.\nlancia\n\n// lancome : 2015-07-23 L'Or\u00E9al\nlancome\n\n// land : 2013-09-10 Binky Moon, LLC\nland\n\n// landrover : 2014-11-13 Jaguar Land Rover Ltd\nlandrover\n\n// lanxess : 2015-07-30 LANXESS Corporation\nlanxess\n\n// lasalle : 2015-04-02 Jones Lang LaSalle Incorporated\nlasalle\n\n// lat : 2014-10-16 ECOM-LAC Federaci\u00F2n de Latinoam\u00E8rica y el Caribe para Internet y el Comercio Electr\u00F2nico\nlat\n\n// latino : 2015-07-30 Dish DBS Corporation\nlatino\n\n// latrobe : 2014-06-16 La Trobe University\nlatrobe\n\n// law : 2015-01-22 Minds + Machines Group Limited\nlaw\n\n// lawyer : 2014-03-20 United TLD Holdco Ltd.\nlawyer\n\n// lds : 2014-03-20 IRI Domain Management, LLC (\"Applicant\")\nlds\n\n// lease : 2014-03-06 Binky Moon, LLC\nlease\n\n// leclerc : 2014-08-07 A.C.D. LEC Association des Centres Distributeurs Edouard Leclerc\nleclerc\n\n// lefrak : 2015-07-16 LeFrak Organization, Inc.\nlefrak\n\n// legal : 2014-10-16 Binky Moon, LLC\nlegal\n\n// lego : 2015-07-16 LEGO Juris A/S\nlego\n\n// lexus : 2015-04-23 TOYOTA MOTOR CORPORATION\nlexus\n\n// lgbt : 2014-05-08 Afilias plc\nlgbt\n\n// liaison : 2014-10-02 Liaison Technologies, Incorporated\nliaison\n\n// lidl : 2014-09-18 Schwarz Domains und Services GmbH & Co. KG\nlidl\n\n// life : 2014-02-06 Binky Moon, LLC\nlife\n\n// lifeinsurance : 2015-01-15 American Council of Life Insurers\nlifeinsurance\n\n// lifestyle : 2014-12-11 Lifestyle Domain Holdings, Inc.\nlifestyle\n\n// lighting : 2013-08-27 Binky Moon, LLC\nlighting\n\n// like : 2014-12-18 Amazon Registry Services, Inc.\nlike\n\n// lilly : 2015-07-31 Eli Lilly and Company\nlilly\n\n// limited : 2014-03-06 Binky Moon, LLC\nlimited\n\n// limo : 2013-10-17 Binky Moon, LLC\nlimo\n\n// lincoln : 2014-11-13 Ford Motor Company\nlincoln\n\n// linde : 2014-12-04 Linde Aktiengesellschaft\nlinde\n\n// link : 2013-11-14 Uniregistry, Corp.\nlink\n\n// lipsy : 2015-06-25 Lipsy Ltd\nlipsy\n\n// live : 2014-12-04 United TLD Holdco Ltd.\nlive\n\n// living : 2015-07-30 Lifestyle Domain Holdings, Inc.\nliving\n\n// lixil : 2015-03-19 LIXIL Group Corporation\nlixil\n\n// llc : 2017-12-14 Afilias plc\nllc\n\n// loan : 2014-11-20 dot Loan Limited\nloan\n\n// loans : 2014-03-20 Binky Moon, LLC\nloans\n\n// locker : 2015-06-04 Dish DBS Corporation\nlocker\n\n// locus : 2015-06-25 Locus Analytics LLC\nlocus\n\n// loft : 2015-07-30 Annco, Inc.\nloft\n\n// lol : 2015-01-30 Uniregistry, Corp.\nlol\n\n// london : 2013-11-14 Dot London Domains Limited\nlondon\n\n// lotte : 2014-11-07 Lotte Holdings Co., Ltd.\nlotte\n\n// lotto : 2014-04-10 Afilias plc\nlotto\n\n// love : 2014-12-22 Merchant Law Group LLP\nlove\n\n// lpl : 2015-07-30 LPL Holdings, Inc.\nlpl\n\n// lplfinancial : 2015-07-30 LPL Holdings, Inc.\nlplfinancial\n\n// ltd : 2014-09-25 Binky Moon, LLC\nltd\n\n// ltda : 2014-04-17 InterNetX, Corp\nltda\n\n// lundbeck : 2015-08-06 H. Lundbeck A/S\nlundbeck\n\n// lupin : 2014-11-07 LUPIN LIMITED\nlupin\n\n// luxe : 2014-01-09 Minds + Machines Group Limited\nluxe\n\n// luxury : 2013-10-17 Luxury Partners, LLC\nluxury\n\n// macys : 2015-07-31 Macys, Inc.\nmacys\n\n// madrid : 2014-05-01 Comunidad de Madrid\nmadrid\n\n// maif : 2014-10-02 Mutuelle Assurance Instituteur France (MAIF)\nmaif\n\n// maison : 2013-12-05 Binky Moon, LLC\nmaison\n\n// makeup : 2015-01-15 L'Or\u00E9al\nmakeup\n\n// man : 2014-12-04 MAN SE\nman\n\n// management : 2013-11-07 Binky Moon, LLC\nmanagement\n\n// mango : 2013-10-24 PUNTO FA S.L.\nmango\n\n// map : 2016-06-09 Charleston Road Registry Inc.\nmap\n\n// market : 2014-03-06 United TLD Holdco Ltd.\nmarket\n\n// marketing : 2013-11-07 Binky Moon, LLC\nmarketing\n\n// markets : 2014-12-11 Dotmarkets Registry Limited\nmarkets\n\n// marriott : 2014-10-09 Marriott Worldwide Corporation\nmarriott\n\n// marshalls : 2015-07-16 The TJX Companies, Inc.\nmarshalls\n\n// maserati : 2015-07-31 Fiat Chrysler Automobiles N.V.\nmaserati\n\n// mattel : 2015-08-06 Mattel Sites, Inc.\nmattel\n\n// mba : 2015-04-02 Binky Moon, LLC\nmba\n\n// mckinsey : 2015-07-31 McKinsey Holdings, Inc.\nmckinsey\n\n// med : 2015-08-06 Medistry LLC\nmed\n\n// media : 2014-03-06 Binky Moon, LLC\nmedia\n\n// meet : 2014-01-16 Charleston Road Registry Inc.\nmeet\n\n// melbourne : 2014-05-29 The Crown in right of the State of Victoria, represented by its Department of State Development, Business and Innovation\nmelbourne\n\n// meme : 2014-01-30 Charleston Road Registry Inc.\nmeme\n\n// memorial : 2014-10-16 Dog Beach, LLC\nmemorial\n\n// men : 2015-02-26 Exclusive Registry Limited\nmen\n\n// menu : 2013-09-11 Wedding TLD2, LLC\nmenu\n\n// merckmsd : 2016-07-14 MSD Registry Holdings, Inc.\nmerckmsd\n\n// metlife : 2015-05-07 MetLife Services and Solutions, LLC\nmetlife\n\n// miami : 2013-12-19 Minds + Machines Group Limited\nmiami\n\n// microsoft : 2014-12-18 Microsoft Corporation\nmicrosoft\n\n// mini : 2014-01-09 Bayerische Motoren Werke Aktiengesellschaft\nmini\n\n// mint : 2015-07-30 Intuit Administrative Services, Inc.\nmint\n\n// mit : 2015-07-02 Massachusetts Institute of Technology\nmit\n\n// mitsubishi : 2015-07-23 Mitsubishi Corporation\nmitsubishi\n\n// mlb : 2015-05-21 MLB Advanced Media DH, LLC\nmlb\n\n// mls : 2015-04-23 The Canadian Real Estate Association\nmls\n\n// mma : 2014-11-07 MMA IARD\nmma\n\n// mobile : 2016-06-02 Dish DBS Corporation\nmobile\n\n// mobily : 2014-12-18 GreenTech Consultancy Company W.L.L.\nmobily\n\n// moda : 2013-11-07 United TLD Holdco Ltd.\nmoda\n\n// moe : 2013-11-13 Interlink Co., Ltd.\nmoe\n\n// moi : 2014-12-18 Amazon Registry Services, Inc.\nmoi\n\n// mom : 2015-04-16 Uniregistry, Corp.\nmom\n\n// monash : 2013-09-30 Monash University\nmonash\n\n// money : 2014-10-16 Binky Moon, LLC\nmoney\n\n// monster : 2015-09-11 Monster Worldwide, Inc.\nmonster\n\n// mopar : 2015-07-30 FCA US LLC.\nmopar\n\n// mormon : 2013-12-05 IRI Domain Management, LLC (\"Applicant\")\nmormon\n\n// mortgage : 2014-03-20 United TLD Holdco Ltd.\nmortgage\n\n// moscow : 2013-12-19 Foundation for Assistance for Internet Technologies and Infrastructure Development (FAITID)\nmoscow\n\n// moto : 2015-06-04 Motorola Trademark Holdings, LLC\nmoto\n\n// motorcycles : 2014-01-09 DERMotorcycles, LLC\nmotorcycles\n\n// mov : 2014-01-30 Charleston Road Registry Inc.\nmov\n\n// movie : 2015-02-05 Binky Moon, LLC\nmovie\n\n// movistar : 2014-10-16 Telef\u00F3nica S.A.\nmovistar\n\n// msd : 2015-07-23 MSD Registry Holdings, Inc.\nmsd\n\n// mtn : 2014-12-04 MTN Dubai Limited\nmtn\n\n// mtr : 2015-03-12 MTR Corporation Limited\nmtr\n\n// mutual : 2015-04-02 Northwestern Mutual MU TLD Registry, LLC\nmutual\n\n// nab : 2015-08-20 National Australia Bank Limited\nnab\n\n// nadex : 2014-12-11 Nadex Domains, Inc.\nnadex\n\n// nagoya : 2013-10-24 GMO Registry, Inc.\nnagoya\n\n// nationwide : 2015-07-23 Nationwide Mutual Insurance Company\nnationwide\n\n// natura : 2015-03-12 NATURA COSM\u00C9TICOS S.A.\nnatura\n\n// navy : 2014-03-06 United TLD Holdco Ltd.\nnavy\n\n// nba : 2015-07-31 NBA REGISTRY, LLC\nnba\n\n// nec : 2015-01-08 NEC Corporation\nnec\n\n// netbank : 2014-06-26 COMMONWEALTH BANK OF AUSTRALIA\nnetbank\n\n// netflix : 2015-06-18 Netflix, Inc.\nnetflix\n\n// network : 2013-11-14 Binky Moon, LLC\nnetwork\n\n// neustar : 2013-12-05 Registry Services, LLC\nneustar\n\n// new : 2014-01-30 Charleston Road Registry Inc.\nnew\n\n// newholland : 2015-09-03 CNH Industrial N.V.\nnewholland\n\n// news : 2014-12-18 United TLD Holdco Ltd.\nnews\n\n// next : 2015-06-18 Next plc\nnext\n\n// nextdirect : 2015-06-18 Next plc\nnextdirect\n\n// nexus : 2014-07-24 Charleston Road Registry Inc.\nnexus\n\n// nfl : 2015-07-23 NFL Reg Ops LLC\nnfl\n\n// ngo : 2014-03-06 Public Interest Registry\nngo\n\n// nhk : 2014-02-13 Japan Broadcasting Corporation (NHK)\nnhk\n\n// nico : 2014-12-04 DWANGO Co., Ltd.\nnico\n\n// nike : 2015-07-23 NIKE, Inc.\nnike\n\n// nikon : 2015-05-21 NIKON CORPORATION\nnikon\n\n// ninja : 2013-11-07 United TLD Holdco Ltd.\nninja\n\n// nissan : 2014-03-27 NISSAN MOTOR CO., LTD.\nnissan\n\n// nissay : 2015-10-29 Nippon Life Insurance Company\nnissay\n\n// nokia : 2015-01-08 Nokia Corporation\nnokia\n\n// northwesternmutual : 2015-06-18 Northwestern Mutual Registry, LLC\nnorthwesternmutual\n\n// norton : 2014-12-04 Symantec Corporation\nnorton\n\n// now : 2015-06-25 Amazon Registry Services, Inc.\nnow\n\n// nowruz : 2014-09-04 Asia Green IT System Bilgisayar San. ve Tic. Ltd. Sti.\nnowruz\n\n// nowtv : 2015-05-14 Starbucks (HK) Limited\nnowtv\n\n// nra : 2014-05-22 NRA Holdings Company, INC.\nnra\n\n// nrw : 2013-11-21 Minds + Machines GmbH\nnrw\n\n// ntt : 2014-10-31 NIPPON TELEGRAPH AND TELEPHONE CORPORATION\nntt\n\n// nyc : 2014-01-23 The City of New York by and through the New York City Department of Information Technology & Telecommunications\nnyc\n\n// obi : 2014-09-25 OBI Group Holding SE & Co. KGaA\nobi\n\n// observer : 2015-04-30 Top Level Spectrum, Inc.\nobserver\n\n// off : 2015-07-23 Johnson Shareholdings, Inc.\noff\n\n// office : 2015-03-12 Microsoft Corporation\noffice\n\n// okinawa : 2013-12-05 BRregistry, Inc.\nokinawa\n\n// olayan : 2015-05-14 Crescent Holding GmbH\nolayan\n\n// olayangroup : 2015-05-14 Crescent Holding GmbH\nolayangroup\n\n// oldnavy : 2015-07-31 The Gap, Inc.\noldnavy\n\n// ollo : 2015-06-04 Dish DBS Corporation\nollo\n\n// omega : 2015-01-08 The Swatch Group Ltd\nomega\n\n// one : 2014-11-07 One.com A/S\none\n\n// ong : 2014-03-06 Public Interest Registry\nong\n\n// onl : 2013-09-16 I-Registry Ltd.\nonl\n\n// online : 2015-01-15 DotOnline Inc.\nonline\n\n// onyourside : 2015-07-23 Nationwide Mutual Insurance Company\nonyourside\n\n// ooo : 2014-01-09 INFIBEAM INCORPORATION LIMITED\nooo\n\n// open : 2015-07-31 American Express Travel Related Services Company, Inc.\nopen\n\n// oracle : 2014-06-19 Oracle Corporation\noracle\n\n// orange : 2015-03-12 Orange Brand Services Limited\norange\n\n// organic : 2014-03-27 Afilias plc\norganic\n\n// origins : 2015-10-01 The Est\u00E9e Lauder Companies Inc.\norigins\n\n// osaka : 2014-09-04 Osaka Registry Co., Ltd.\nosaka\n\n// otsuka : 2013-10-11 Otsuka Holdings Co., Ltd.\notsuka\n\n// ott : 2015-06-04 Dish DBS Corporation\nott\n\n// ovh : 2014-01-16 OVH SAS\novh\n\n// page : 2014-12-04 Charleston Road Registry Inc.\npage\n\n// panasonic : 2015-07-30 Panasonic Corporation\npanasonic\n\n// panerai : 2014-11-07 Richemont DNS Inc.\npanerai\n\n// paris : 2014-01-30 City of Paris\nparis\n\n// pars : 2014-09-04 Asia Green IT System Bilgisayar San. ve Tic. Ltd. Sti.\npars\n\n// partners : 2013-12-05 Binky Moon, LLC\npartners\n\n// parts : 2013-12-05 Binky Moon, LLC\nparts\n\n// party : 2014-09-11 Blue Sky Registry Limited\nparty\n\n// passagens : 2015-03-05 Travel Reservations SRL\npassagens\n\n// pay : 2015-08-27 Amazon Registry Services, Inc.\npay\n\n// pccw : 2015-05-14 PCCW Enterprises Limited\npccw\n\n// pet : 2015-05-07 Afilias plc\npet\n\n// pfizer : 2015-09-11 Pfizer Inc.\npfizer\n\n// pharmacy : 2014-06-19 National Association of Boards of Pharmacy\npharmacy\n\n// phd : 2016-07-28 Charleston Road Registry Inc.\nphd\n\n// philips : 2014-11-07 Koninklijke Philips N.V.\nphilips\n\n// phone : 2016-06-02 Dish DBS Corporation\nphone\n\n// photo : 2013-11-14 Uniregistry, Corp.\nphoto\n\n// photography : 2013-09-20 Binky Moon, LLC\nphotography\n\n// photos : 2013-10-17 Binky Moon, LLC\nphotos\n\n// physio : 2014-05-01 PhysBiz Pty Ltd\nphysio\n\n// piaget : 2014-10-16 Richemont DNS Inc.\npiaget\n\n// pics : 2013-11-14 Uniregistry, Corp.\npics\n\n// pictet : 2014-06-26 Pictet Europe S.A.\npictet\n\n// pictures : 2014-03-06 Binky Moon, LLC\npictures\n\n// pid : 2015-01-08 Top Level Spectrum, Inc.\npid\n\n// pin : 2014-12-18 Amazon Registry Services, Inc.\npin\n\n// ping : 2015-06-11 Ping Registry Provider, Inc.\nping\n\n// pink : 2013-10-01 Afilias plc\npink\n\n// pioneer : 2015-07-16 Pioneer Corporation\npioneer\n\n// pizza : 2014-06-26 Binky Moon, LLC\npizza\n\n// place : 2014-04-24 Binky Moon, LLC\nplace\n\n// play : 2015-03-05 Charleston Road Registry Inc.\nplay\n\n// playstation : 2015-07-02 Sony Computer Entertainment Inc.\nplaystation\n\n// plumbing : 2013-09-10 Binky Moon, LLC\nplumbing\n\n// plus : 2015-02-05 Binky Moon, LLC\nplus\n\n// pnc : 2015-07-02 PNC Domain Co., LLC\npnc\n\n// pohl : 2014-06-23 Deutsche Verm\u00F6gensberatung Aktiengesellschaft DVAG\npohl\n\n// poker : 2014-07-03 Afilias plc\npoker\n\n// politie : 2015-08-20 Politie Nederland\npolitie\n\n// porn : 2014-10-16 ICM Registry PN LLC\nporn\n\n// pramerica : 2015-07-30 Prudential Financial, Inc.\npramerica\n\n// praxi : 2013-12-05 Praxi S.p.A.\npraxi\n\n// press : 2014-04-03 DotPress Inc.\npress\n\n// prime : 2015-06-25 Amazon Registry Services, Inc.\nprime\n\n// prod : 2014-01-23 Charleston Road Registry Inc.\nprod\n\n// productions : 2013-12-05 Binky Moon, LLC\nproductions\n\n// prof : 2014-07-24 Charleston Road Registry Inc.\nprof\n\n// progressive : 2015-07-23 Progressive Casualty Insurance Company\nprogressive\n\n// promo : 2014-12-18 Afilias plc\npromo\n\n// properties : 2013-12-05 Binky Moon, LLC\nproperties\n\n// property : 2014-05-22 Uniregistry, Corp.\nproperty\n\n// protection : 2015-04-23 XYZ.COM LLC\nprotection\n\n// pru : 2015-07-30 Prudential Financial, Inc.\npru\n\n// prudential : 2015-07-30 Prudential Financial, Inc.\nprudential\n\n// pub : 2013-12-12 United TLD Holdco Ltd.\npub\n\n// pwc : 2015-10-29 PricewaterhouseCoopers LLP\npwc\n\n// qpon : 2013-11-14 dotCOOL, Inc.\nqpon\n\n// quebec : 2013-12-19 PointQu\u00E9bec Inc\nquebec\n\n// quest : 2015-03-26 Quest ION Limited\nquest\n\n// qvc : 2015-07-30 QVC, Inc.\nqvc\n\n// racing : 2014-12-04 Premier Registry Limited\nracing\n\n// radio : 2016-07-21 European Broadcasting Union (EBU)\nradio\n\n// raid : 2015-07-23 Johnson Shareholdings, Inc.\nraid\n\n// read : 2014-12-18 Amazon Registry Services, Inc.\nread\n\n// realestate : 2015-09-11 dotRealEstate LLC\nrealestate\n\n// realtor : 2014-05-29 Real Estate Domains LLC\nrealtor\n\n// realty : 2015-03-19 Fegistry, LLC\nrealty\n\n// recipes : 2013-10-17 Binky Moon, LLC\nrecipes\n\n// red : 2013-11-07 Afilias plc\nred\n\n// redstone : 2014-10-31 Redstone Haute Couture Co., Ltd.\nredstone\n\n// redumbrella : 2015-03-26 Travelers TLD, LLC\nredumbrella\n\n// rehab : 2014-03-06 United TLD Holdco Ltd.\nrehab\n\n// reise : 2014-03-13 Binky Moon, LLC\nreise\n\n// reisen : 2014-03-06 Binky Moon, LLC\nreisen\n\n// reit : 2014-09-04 National Association of Real Estate Investment Trusts, Inc.\nreit\n\n// reliance : 2015-04-02 Reliance Industries Limited\nreliance\n\n// ren : 2013-12-12 Beijing Qianxiang Wangjing Technology Development Co., Ltd.\nren\n\n// rent : 2014-12-04 XYZ.COM LLC\nrent\n\n// rentals : 2013-12-05 Binky Moon, LLC\nrentals\n\n// repair : 2013-11-07 Binky Moon, LLC\nrepair\n\n// report : 2013-12-05 Binky Moon, LLC\nreport\n\n// republican : 2014-03-20 United TLD Holdco Ltd.\nrepublican\n\n// rest : 2013-12-19 Punto 2012 Sociedad Anonima Promotora de Inversion de Capital Variable\nrest\n\n// restaurant : 2014-07-03 Binky Moon, LLC\nrestaurant\n\n// review : 2014-11-20 dot Review Limited\nreview\n\n// reviews : 2013-09-13 United TLD Holdco Ltd.\nreviews\n\n// rexroth : 2015-06-18 Robert Bosch GMBH\nrexroth\n\n// rich : 2013-11-21 I-Registry Ltd.\nrich\n\n// richardli : 2015-05-14 Pacific Century Asset Management (HK) Limited\nrichardli\n\n// ricoh : 2014-11-20 Ricoh Company, Ltd.\nricoh\n\n// rightathome : 2015-07-23 Johnson Shareholdings, Inc.\nrightathome\n\n// ril : 2015-04-02 Reliance Industries Limited\nril\n\n// rio : 2014-02-27 Empresa Municipal de Inform\u00E1tica SA - IPLANRIO\nrio\n\n// rip : 2014-07-10 United TLD Holdco Ltd.\nrip\n\n// rmit : 2015-11-19 Royal Melbourne Institute of Technology\nrmit\n\n// rocher : 2014-12-18 Ferrero Trading Lux S.A.\nrocher\n\n// rocks : 2013-11-14 United TLD Holdco Ltd.\nrocks\n\n// rodeo : 2013-12-19 Minds + Machines Group Limited\nrodeo\n\n// rogers : 2015-08-06 Rogers Communications Canada Inc.\nrogers\n\n// room : 2014-12-18 Amazon Registry Services, Inc.\nroom\n\n// rsvp : 2014-05-08 Charleston Road Registry Inc.\nrsvp\n\n// rugby : 2016-12-15 World Rugby Strategic Developments Limited\nrugby\n\n// ruhr : 2013-10-02 regiodot GmbH & Co. KG\nruhr\n\n// run : 2015-03-19 Binky Moon, LLC\nrun\n\n// rwe : 2015-04-02 RWE AG\nrwe\n\n// ryukyu : 2014-01-09 BRregistry, Inc.\nryukyu\n\n// saarland : 2013-12-12 dotSaarland GmbH\nsaarland\n\n// safe : 2014-12-18 Amazon Registry Services, Inc.\nsafe\n\n// safety : 2015-01-08 Safety Registry Services, LLC.\nsafety\n\n// sakura : 2014-12-18 SAKURA Internet Inc.\nsakura\n\n// sale : 2014-10-16 United TLD Holdco Ltd.\nsale\n\n// salon : 2014-12-11 Binky Moon, LLC\nsalon\n\n// samsclub : 2015-07-31 Wal-Mart Stores, Inc.\nsamsclub\n\n// samsung : 2014-04-03 SAMSUNG SDS CO., LTD\nsamsung\n\n// sandvik : 2014-11-13 Sandvik AB\nsandvik\n\n// sandvikcoromant : 2014-11-07 Sandvik AB\nsandvikcoromant\n\n// sanofi : 2014-10-09 Sanofi\nsanofi\n\n// sap : 2014-03-27 SAP AG\nsap\n\n// sarl : 2014-07-03 Binky Moon, LLC\nsarl\n\n// sas : 2015-04-02 Research IP LLC\nsas\n\n// save : 2015-06-25 Amazon Registry Services, Inc.\nsave\n\n// saxo : 2014-10-31 Saxo Bank A/S\nsaxo\n\n// sbi : 2015-03-12 STATE BANK OF INDIA\nsbi\n\n// sbs : 2014-11-07 SPECIAL BROADCASTING SERVICE CORPORATION\nsbs\n\n// sca : 2014-03-13 SVENSKA CELLULOSA AKTIEBOLAGET SCA (publ)\nsca\n\n// scb : 2014-02-20 The Siam Commercial Bank Public Company Limited (\"SCB\")\nscb\n\n// schaeffler : 2015-08-06 Schaeffler Technologies AG & Co. KG\nschaeffler\n\n// schmidt : 2014-04-03 SALM S.A.S.\nschmidt\n\n// scholarships : 2014-04-24 Scholarships.com, LLC\nscholarships\n\n// school : 2014-12-18 Binky Moon, LLC\nschool\n\n// schule : 2014-03-06 Binky Moon, LLC\nschule\n\n// schwarz : 2014-09-18 Schwarz Domains und Services GmbH & Co. KG\nschwarz\n\n// science : 2014-09-11 dot Science Limited\nscience\n\n// scjohnson : 2015-07-23 Johnson Shareholdings, Inc.\nscjohnson\n\n// scor : 2014-10-31 SCOR SE\nscor\n\n// scot : 2014-01-23 Dot Scot Registry Limited\nscot\n\n// search : 2016-06-09 Charleston Road Registry Inc.\nsearch\n\n// seat : 2014-05-22 SEAT, S.A. (Sociedad Unipersonal)\nseat\n\n// secure : 2015-08-27 Amazon Registry Services, Inc.\nsecure\n\n// security : 2015-05-14 XYZ.COM LLC\nsecurity\n\n// seek : 2014-12-04 Seek Limited\nseek\n\n// select : 2015-10-08 iSelect Ltd\nselect\n\n// sener : 2014-10-24 Sener Ingenier\u00EDa y Sistemas, S.A.\nsener\n\n// services : 2014-02-27 Binky Moon, LLC\nservices\n\n// ses : 2015-07-23 SES\nses\n\n// seven : 2015-08-06 Seven West Media Ltd\nseven\n\n// sew : 2014-07-17 SEW-EURODRIVE GmbH & Co KG\nsew\n\n// sex : 2014-11-13 ICM Registry SX LLC\nsex\n\n// sexy : 2013-09-11 Uniregistry, Corp.\nsexy\n\n// sfr : 2015-08-13 Societe Francaise du Radiotelephone - SFR\nsfr\n\n// shangrila : 2015-09-03 Shangri\u2010La International Hotel Management Limited\nshangrila\n\n// sharp : 2014-05-01 Sharp Corporation\nsharp\n\n// shaw : 2015-04-23 Shaw Cablesystems G.P.\nshaw\n\n// shell : 2015-07-30 Shell Information Technology International Inc\nshell\n\n// shia : 2014-09-04 Asia Green IT System Bilgisayar San. ve Tic. Ltd. Sti.\nshia\n\n// shiksha : 2013-11-14 Afilias plc\nshiksha\n\n// shoes : 2013-10-02 Binky Moon, LLC\nshoes\n\n// shop : 2016-04-08 GMO Registry, Inc.\nshop\n\n// shopping : 2016-03-31 Binky Moon, LLC\nshopping\n\n// shouji : 2015-01-08 QIHOO 360 TECHNOLOGY CO. LTD.\nshouji\n\n// show : 2015-03-05 Binky Moon, LLC\nshow\n\n// showtime : 2015-08-06 CBS Domains Inc.\nshowtime\n\n// shriram : 2014-01-23 Shriram Capital Ltd.\nshriram\n\n// silk : 2015-06-25 Amazon Registry Services, Inc.\nsilk\n\n// sina : 2015-03-12 Sina Corporation\nsina\n\n// singles : 2013-08-27 Binky Moon, LLC\nsingles\n\n// site : 2015-01-15 DotSite Inc.\nsite\n\n// ski : 2015-04-09 Afilias plc\nski\n\n// skin : 2015-01-15 L'Or\u00E9al\nskin\n\n// sky : 2014-06-19 Sky International AG\nsky\n\n// skype : 2014-12-18 Microsoft Corporation\nskype\n\n// sling : 2015-07-30 Hughes Satellite Systems Corporation\nsling\n\n// smart : 2015-07-09 Smart Communications, Inc. (SMART)\nsmart\n\n// smile : 2014-12-18 Amazon Registry Services, Inc.\nsmile\n\n// sncf : 2015-02-19 Soci\u00E9t\u00E9 Nationale des Chemins de fer Francais S N C F\nsncf\n\n// soccer : 2015-03-26 Binky Moon, LLC\nsoccer\n\n// social : 2013-11-07 United TLD Holdco Ltd.\nsocial\n\n// softbank : 2015-07-02 SoftBank Corp.\nsoftbank\n\n// software : 2014-03-20 United TLD Holdco Ltd.\nsoftware\n\n// sohu : 2013-12-19 Sohu.com Limited\nsohu\n\n// solar : 2013-11-07 Binky Moon, LLC\nsolar\n\n// solutions : 2013-11-07 Binky Moon, LLC\nsolutions\n\n// song : 2015-02-26 Amazon Registry Services, Inc.\nsong\n\n// sony : 2015-01-08 Sony Corporation\nsony\n\n// soy : 2014-01-23 Charleston Road Registry Inc.\nsoy\n\n// space : 2014-04-03 DotSpace Inc.\nspace\n\n// spiegel : 2014-02-05 SPIEGEL-Verlag Rudolf Augstein GmbH & Co. KG\nspiegel\n\n// sport : 2017-11-16 Global Association of International Sports Federations (GAISF)\nsport\n\n// spot : 2015-02-26 Amazon Registry Services, Inc.\nspot\n\n// spreadbetting : 2014-12-11 Dotspreadbetting Registry Limited\nspreadbetting\n\n// srl : 2015-05-07 InterNetX, Corp\nsrl\n\n// srt : 2015-07-30 FCA US LLC.\nsrt\n\n// stada : 2014-11-13 STADA Arzneimittel AG\nstada\n\n// staples : 2015-07-30 Staples, Inc.\nstaples\n\n// star : 2015-01-08 Star India Private Limited\nstar\n\n// starhub : 2015-02-05 StarHub Ltd\nstarhub\n\n// statebank : 2015-03-12 STATE BANK OF INDIA\nstatebank\n\n// statefarm : 2015-07-30 State Farm Mutual Automobile Insurance Company\nstatefarm\n\n// statoil : 2014-12-04 Statoil ASA\nstatoil\n\n// stc : 2014-10-09 Saudi Telecom Company\nstc\n\n// stcgroup : 2014-10-09 Saudi Telecom Company\nstcgroup\n\n// stockholm : 2014-12-18 Stockholms kommun\nstockholm\n\n// storage : 2014-12-22 XYZ.COM LLC\nstorage\n\n// store : 2015-04-09 DotStore Inc.\nstore\n\n// stream : 2016-01-08 dot Stream Limited\nstream\n\n// studio : 2015-02-11 United TLD Holdco Ltd.\nstudio\n\n// study : 2014-12-11 OPEN UNIVERSITIES AUSTRALIA PTY LTD\nstudy\n\n// style : 2014-12-04 Binky Moon, LLC\nstyle\n\n// sucks : 2014-12-22 Vox Populi Registry Ltd.\nsucks\n\n// supplies : 2013-12-19 Binky Moon, LLC\nsupplies\n\n// supply : 2013-12-19 Binky Moon, LLC\nsupply\n\n// support : 2013-10-24 Binky Moon, LLC\nsupport\n\n// surf : 2014-01-09 Minds + Machines Group Limited\nsurf\n\n// surgery : 2014-03-20 Binky Moon, LLC\nsurgery\n\n// suzuki : 2014-02-20 SUZUKI MOTOR CORPORATION\nsuzuki\n\n// swatch : 2015-01-08 The Swatch Group Ltd\nswatch\n\n// swiftcover : 2015-07-23 Swiftcover Insurance Services Limited\nswiftcover\n\n// swiss : 2014-10-16 Swiss Confederation\nswiss\n\n// sydney : 2014-09-18 State of New South Wales, Department of Premier and Cabinet\nsydney\n\n// symantec : 2014-12-04 Symantec Corporation\nsymantec\n\n// systems : 2013-11-07 Binky Moon, LLC\nsystems\n\n// tab : 2014-12-04 Tabcorp Holdings Limited\ntab\n\n// taipei : 2014-07-10 Taipei City Government\ntaipei\n\n// talk : 2015-04-09 Amazon Registry Services, Inc.\ntalk\n\n// taobao : 2015-01-15 Alibaba Group Holding Limited\ntaobao\n\n// target : 2015-07-31 Target Domain Holdings, LLC\ntarget\n\n// tatamotors : 2015-03-12 Tata Motors Ltd\ntatamotors\n\n// tatar : 2014-04-24 Limited Liability Company \"Coordination Center of Regional Domain of Tatarstan Republic\"\ntatar\n\n// tattoo : 2013-08-30 Uniregistry, Corp.\ntattoo\n\n// tax : 2014-03-20 Binky Moon, LLC\ntax\n\n// taxi : 2015-03-19 Binky Moon, LLC\ntaxi\n\n// tci : 2014-09-12 Asia Green IT System Bilgisayar San. ve Tic. Ltd. Sti.\ntci\n\n// tdk : 2015-06-11 TDK Corporation\ntdk\n\n// team : 2015-03-05 Binky Moon, LLC\nteam\n\n// tech : 2015-01-30 Personals TLD Inc.\ntech\n\n// technology : 2013-09-13 Binky Moon, LLC\ntechnology\n\n// telecity : 2015-02-19 TelecityGroup International Limited\ntelecity\n\n// telefonica : 2014-10-16 Telef\u00F3nica S.A.\ntelefonica\n\n// temasek : 2014-08-07 Temasek Holdings (Private) Limited\ntemasek\n\n// tennis : 2014-12-04 Binky Moon, LLC\ntennis\n\n// teva : 2015-07-02 Teva Pharmaceutical Industries Limited\nteva\n\n// thd : 2015-04-02 Home Depot Product Authority, LLC\nthd\n\n// theater : 2015-03-19 Binky Moon, LLC\ntheater\n\n// theatre : 2015-05-07 XYZ.COM LLC\ntheatre\n\n// tiaa : 2015-07-23 Teachers Insurance and Annuity Association of America\ntiaa\n\n// tickets : 2015-02-05 Accent Media Limited\ntickets\n\n// tienda : 2013-11-14 Binky Moon, LLC\ntienda\n\n// tiffany : 2015-01-30 Tiffany and Company\ntiffany\n\n// tips : 2013-09-20 Binky Moon, LLC\ntips\n\n// tires : 2014-11-07 Binky Moon, LLC\ntires\n\n// tirol : 2014-04-24 punkt Tirol GmbH\ntirol\n\n// tjmaxx : 2015-07-16 The TJX Companies, Inc.\ntjmaxx\n\n// tjx : 2015-07-16 The TJX Companies, Inc.\ntjx\n\n// tkmaxx : 2015-07-16 The TJX Companies, Inc.\ntkmaxx\n\n// tmall : 2015-01-15 Alibaba Group Holding Limited\ntmall\n\n// today : 2013-09-20 Binky Moon, LLC\ntoday\n\n// tokyo : 2013-11-13 GMO Registry, Inc.\ntokyo\n\n// tools : 2013-11-21 Binky Moon, LLC\ntools\n\n// top : 2014-03-20 .TOP Registry\ntop\n\n// toray : 2014-12-18 Toray Industries, Inc.\ntoray\n\n// toshiba : 2014-04-10 TOSHIBA Corporation\ntoshiba\n\n// total : 2015-08-06 Total SA\ntotal\n\n// tours : 2015-01-22 Binky Moon, LLC\ntours\n\n// town : 2014-03-06 Binky Moon, LLC\ntown\n\n// toyota : 2015-04-23 TOYOTA MOTOR CORPORATION\ntoyota\n\n// toys : 2014-03-06 Binky Moon, LLC\ntoys\n\n// trade : 2014-01-23 Elite Registry Limited\ntrade\n\n// trading : 2014-12-11 Dottrading Registry Limited\ntrading\n\n// training : 2013-11-07 Binky Moon, LLC\ntraining\n\n// travel :  Dog Beach, LLC\ntravel\n\n// travelchannel : 2015-07-02 Lifestyle Domain Holdings, Inc.\ntravelchannel\n\n// travelers : 2015-03-26 Travelers TLD, LLC\ntravelers\n\n// travelersinsurance : 2015-03-26 Travelers TLD, LLC\ntravelersinsurance\n\n// trust : 2014-10-16 NCC Group Inc.\ntrust\n\n// trv : 2015-03-26 Travelers TLD, LLC\ntrv\n\n// tube : 2015-06-11 Latin American Telecom LLC\ntube\n\n// tui : 2014-07-03 TUI AG\ntui\n\n// tunes : 2015-02-26 Amazon Registry Services, Inc.\ntunes\n\n// tushu : 2014-12-18 Amazon Registry Services, Inc.\ntushu\n\n// tvs : 2015-02-19 T V SUNDRAM IYENGAR  & SONS LIMITED\ntvs\n\n// ubank : 2015-08-20 National Australia Bank Limited\nubank\n\n// ubs : 2014-12-11 UBS AG\nubs\n\n// uconnect : 2015-07-30 FCA US LLC.\nuconnect\n\n// unicom : 2015-10-15 China United Network Communications Corporation Limited\nunicom\n\n// university : 2014-03-06 Binky Moon, LLC\nuniversity\n\n// uno : 2013-09-11 Dot Latin LLC\nuno\n\n// uol : 2014-05-01 UBN INTERNET LTDA.\nuol\n\n// ups : 2015-06-25 UPS Market Driver, Inc.\nups\n\n// vacations : 2013-12-05 Binky Moon, LLC\nvacations\n\n// vana : 2014-12-11 Lifestyle Domain Holdings, Inc.\nvana\n\n// vanguard : 2015-09-03 The Vanguard Group, Inc.\nvanguard\n\n// vegas : 2014-01-16 Dot Vegas, Inc.\nvegas\n\n// ventures : 2013-08-27 Binky Moon, LLC\nventures\n\n// verisign : 2015-08-13 VeriSign, Inc.\nverisign\n\n// versicherung : 2014-03-20 TLD-BOX Registrydienstleistungen GmbH\nversicherung\n\n// vet : 2014-03-06 United TLD Holdco Ltd.\nvet\n\n// viajes : 2013-10-17 Binky Moon, LLC\nviajes\n\n// video : 2014-10-16 United TLD Holdco Ltd.\nvideo\n\n// vig : 2015-05-14 VIENNA INSURANCE GROUP AG Wiener Versicherung Gruppe\nvig\n\n// viking : 2015-04-02 Viking River Cruises (Bermuda) Ltd.\nviking\n\n// villas : 2013-12-05 Binky Moon, LLC\nvillas\n\n// vin : 2015-06-18 Binky Moon, LLC\nvin\n\n// vip : 2015-01-22 Minds + Machines Group Limited\nvip\n\n// virgin : 2014-09-25 Virgin Enterprises Limited\nvirgin\n\n// visa : 2015-07-30 Visa Worldwide Pte. Limited\nvisa\n\n// vision : 2013-12-05 Binky Moon, LLC\nvision\n\n// vista : 2014-09-18 Vistaprint Limited\nvista\n\n// vistaprint : 2014-09-18 Vistaprint Limited\nvistaprint\n\n// viva : 2014-11-07 Saudi Telecom Company\nviva\n\n// vivo : 2015-07-31 Telefonica Brasil S.A.\nvivo\n\n// vlaanderen : 2014-02-06 DNS.be vzw\nvlaanderen\n\n// vodka : 2013-12-19 Minds + Machines Group Limited\nvodka\n\n// volkswagen : 2015-05-14 Volkswagen Group of America Inc.\nvolkswagen\n\n// volvo : 2015-11-12 Volvo Holding Sverige Aktiebolag\nvolvo\n\n// vote : 2013-11-21 Monolith Registry LLC\nvote\n\n// voting : 2013-11-13 Valuetainment Corp.\nvoting\n\n// voto : 2013-11-21 Monolith Registry LLC\nvoto\n\n// voyage : 2013-08-27 Binky Moon, LLC\nvoyage\n\n// vuelos : 2015-03-05 Travel Reservations SRL\nvuelos\n\n// wales : 2014-05-08 Nominet UK\nwales\n\n// walmart : 2015-07-31 Wal-Mart Stores, Inc.\nwalmart\n\n// walter : 2014-11-13 Sandvik AB\nwalter\n\n// wang : 2013-10-24 Zodiac Wang Limited\nwang\n\n// wanggou : 2014-12-18 Amazon Registry Services, Inc.\nwanggou\n\n// warman : 2015-06-18 Weir Group IP Limited\nwarman\n\n// watch : 2013-11-14 Binky Moon, LLC\nwatch\n\n// watches : 2014-12-22 Richemont DNS Inc.\nwatches\n\n// weather : 2015-01-08 International Business Machines Corporation\nweather\n\n// weatherchannel : 2015-03-12 International Business Machines Corporation\nweatherchannel\n\n// webcam : 2014-01-23 dot Webcam Limited\nwebcam\n\n// weber : 2015-06-04 Saint-Gobain Weber SA\nweber\n\n// website : 2014-04-03 DotWebsite Inc.\nwebsite\n\n// wed : 2013-10-01 Atgron, Inc.\nwed\n\n// wedding : 2014-04-24 Minds + Machines Group Limited\nwedding\n\n// weibo : 2015-03-05 Sina Corporation\nweibo\n\n// weir : 2015-01-29 Weir Group IP Limited\nweir\n\n// whoswho : 2014-02-20 Who's Who Registry\nwhoswho\n\n// wien : 2013-10-28 punkt.wien GmbH\nwien\n\n// wiki : 2013-11-07 Top Level Design, LLC\nwiki\n\n// williamhill : 2014-03-13 William Hill Organization Limited\nwilliamhill\n\n// win : 2014-11-20 First Registry Limited\nwin\n\n// windows : 2014-12-18 Microsoft Corporation\nwindows\n\n// wine : 2015-06-18 Binky Moon, LLC\nwine\n\n// winners : 2015-07-16 The TJX Companies, Inc.\nwinners\n\n// wme : 2014-02-13 William Morris Endeavor Entertainment, LLC\nwme\n\n// wolterskluwer : 2015-08-06 Wolters Kluwer N.V.\nwolterskluwer\n\n// woodside : 2015-07-09 Woodside Petroleum Limited\nwoodside\n\n// work : 2013-12-19 Minds + Machines Group Limited\nwork\n\n// works : 2013-11-14 Binky Moon, LLC\nworks\n\n// world : 2014-06-12 Binky Moon, LLC\nworld\n\n// wow : 2015-10-08 Amazon Registry Services, Inc.\nwow\n\n// wtc : 2013-12-19 World Trade Centers Association, Inc.\nwtc\n\n// wtf : 2014-03-06 Binky Moon, LLC\nwtf\n\n// xbox : 2014-12-18 Microsoft Corporation\nxbox\n\n// xerox : 2014-10-24 Xerox DNHC LLC\nxerox\n\n// xfinity : 2015-07-09 Comcast IP Holdings I, LLC\nxfinity\n\n// xihuan : 2015-01-08 QIHOO 360 TECHNOLOGY CO. LTD.\nxihuan\n\n// xin : 2014-12-11 Elegant Leader Limited\nxin\n\n// xn--11b4c3d : 2015-01-15 VeriSign Sarl\n\u0915\u0949\u092E\n\n// xn--1ck2e1b : 2015-02-26 Amazon Registry Services, Inc.\n\u30BB\u30FC\u30EB\n\n// xn--1qqw23a : 2014-01-09 Guangzhou YU Wei Information Technology Co., Ltd.\n\u4F5B\u5C71\n\n// xn--30rr7y : 2014-06-12 Excellent First Limited\n\u6148\u5584\n\n// xn--3bst00m : 2013-09-13 Eagle Horizon Limited\n\u96C6\u56E2\n\n// xn--3ds443g : 2013-09-08 TLD REGISTRY LIMITED\n\u5728\u7EBF\n\n// xn--3oq18vl8pn36a : 2015-07-02 Volkswagen (China) Investment Co., Ltd.\n\u5927\u4F17\u6C7D\u8F66\n\n// xn--3pxu8k : 2015-01-15 VeriSign Sarl\n\u70B9\u770B\n\n// xn--42c2d9a : 2015-01-15 VeriSign Sarl\n\u0E04\u0E2D\u0E21\n\n// xn--45q11c : 2013-11-21 Zodiac Gemini Ltd\n\u516B\u5366\n\n// xn--4gbrim : 2013-10-04 Suhub Electronic Establishment\n\u0645\u0648\u0642\u0639\n\n// xn--55qw42g : 2013-11-08 China Organizational Name Administration Center\n\u516C\u76CA\n\n// xn--55qx5d : 2013-11-14 China Internet Network Information Center (CNNIC)\n\u516C\u53F8\n\n// xn--5su34j936bgsg : 2015-09-03 Shangri\u2010La International Hotel Management Limited\n\u9999\u683C\u91CC\u62C9\n\n// xn--5tzm5g : 2014-12-22 Global Website TLD Asia Limited\n\u7F51\u7AD9\n\n// xn--6frz82g : 2013-09-23 Afilias plc\n\u79FB\u52A8\n\n// xn--6qq986b3xl : 2013-09-13 Tycoon Treasure Limited\n\u6211\u7231\u4F60\n\n// xn--80adxhks : 2013-12-19 Foundation for Assistance for Internet Technologies and Infrastructure Development (FAITID)\n\u043C\u043E\u0441\u043A\u0432\u0430\n\n// xn--80aqecdr1a : 2015-10-21 Pontificium Consilium de Comunicationibus Socialibus (PCCS) (Pontifical Council for Social Communication)\n\u043A\u0430\u0442\u043E\u043B\u0438\u043A\n\n// xn--80asehdb : 2013-07-14 CORE Association\n\u043E\u043D\u043B\u0430\u0439\u043D\n\n// xn--80aswg : 2013-07-14 CORE Association\n\u0441\u0430\u0439\u0442\n\n// xn--8y0a063a : 2015-03-26 China United Network Communications Corporation Limited\n\u8054\u901A\n\n// xn--9dbq2a : 2015-01-15 VeriSign Sarl\n\u05E7\u05D5\u05DD\n\n// xn--9et52u : 2014-06-12 RISE VICTORY LIMITED\n\u65F6\u5C1A\n\n// xn--9krt00a : 2015-03-12 Sina Corporation\n\u5FAE\u535A\n\n// xn--b4w605ferd : 2014-08-07 Temasek Holdings (Private) Limited\n\u6DE1\u9A6C\u9521\n\n// xn--bck1b9a5dre4c : 2015-02-26 Amazon Registry Services, Inc.\n\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3\n\n// xn--c1avg : 2013-11-14 Public Interest Registry\n\u043E\u0440\u0433\n\n// xn--c2br7g : 2015-01-15 VeriSign Sarl\n\u0928\u0947\u091F\n\n// xn--cck2b3b : 2015-02-26 Amazon Registry Services, Inc.\n\u30B9\u30C8\u30A2\n\n// xn--cg4bki : 2013-09-27 SAMSUNG SDS CO., LTD\n\uC0BC\uC131\n\n// xn--czr694b : 2014-01-16 Dot Trademark TLD Holding Company Limited\n\u5546\u6807\n\n// xn--czrs0t : 2013-12-19 Binky Moon, LLC\n\u5546\u5E97\n\n// xn--czru2d : 2013-11-21 Zodiac Aquarius Limited\n\u5546\u57CE\n\n// xn--d1acj3b : 2013-11-20 The Foundation for Network Initiatives \u201CThe Smart Internet\u201D\n\u0434\u0435\u0442\u0438\n\n// xn--eckvdtc9d : 2014-12-18 Amazon Registry Services, Inc.\n\u30DD\u30A4\u30F3\u30C8\n\n// xn--efvy88h : 2014-08-22 Guangzhou YU Wei Information Technology Co., Ltd.\n\u65B0\u95FB\n\n// xn--estv75g : 2015-02-19 Industrial and Commercial Bank of China Limited\n\u5DE5\u884C\n\n// xn--fct429k : 2015-04-09 Amazon Registry Services, Inc.\n\u5BB6\u96FB\n\n// xn--fhbei : 2015-01-15 VeriSign Sarl\n\u0643\u0648\u0645\n\n// xn--fiq228c5hs : 2013-09-08 TLD REGISTRY LIMITED\n\u4E2D\u6587\u7F51\n\n// xn--fiq64b : 2013-10-14 CITIC Group Corporation\n\u4E2D\u4FE1\n\n// xn--fjq720a : 2014-05-22 Binky Moon, LLC\n\u5A31\u4E50\n\n// xn--flw351e : 2014-07-31 Charleston Road Registry Inc.\n\u8C37\u6B4C\n\n// xn--fzys8d69uvgm : 2015-05-14 PCCW Enterprises Limited\n\u96FB\u8A0A\u76C8\u79D1\n\n// xn--g2xx48c : 2015-01-30 Minds + Machines Group Limited\n\u8D2D\u7269\n\n// xn--gckr3f0f : 2015-02-26 Amazon Registry Services, Inc.\n\u30AF\u30E9\u30A6\u30C9\n\n// xn--gk3at1e : 2015-10-08 Amazon Registry Services, Inc.\n\u901A\u8CA9\n\n// xn--hxt814e : 2014-05-15 Zodiac Taurus Limited\n\u7F51\u5E97\n\n// xn--i1b6b1a6a2e : 2013-11-14 Public Interest Registry\n\u0938\u0902\u0917\u0920\u0928\n\n// xn--imr513n : 2014-12-11 Dot Trademark TLD Holding Company Limited\n\u9910\u5385\n\n// xn--io0a7i : 2013-11-14 China Internet Network Information Center (CNNIC)\n\u7F51\u7EDC\n\n// xn--j1aef : 2015-01-15 VeriSign Sarl\n\u043A\u043E\u043C\n\n// xn--jlq61u9w7b : 2015-01-08 Nokia Corporation\n\u8BFA\u57FA\u4E9A\n\n// xn--jvr189m : 2015-02-26 Amazon Registry Services, Inc.\n\u98DF\u54C1\n\n// xn--kcrx77d1x4a : 2014-11-07 Koninklijke Philips N.V.\n\u98DE\u5229\u6D66\n\n// xn--kpu716f : 2014-12-22 Richemont DNS Inc.\n\u624B\u8868\n\n// xn--kput3i : 2014-02-13 Beijing RITT-Net Technology Development Co., Ltd\n\u624B\u673A\n\n// xn--mgba3a3ejt : 2014-11-20 Aramco Services Company\n\u0627\u0631\u0627\u0645\u0643\u0648\n\n// xn--mgba7c0bbn0a : 2015-05-14 Crescent Holding GmbH\n\u0627\u0644\u0639\u0644\u064A\u0627\u0646\n\n// xn--mgbaakc7dvf : 2015-09-03 Emirates Telecommunications Corporation (trading as Etisalat)\n\u0627\u062A\u0635\u0627\u0644\u0627\u062A\n\n// xn--mgbab2bd : 2013-10-31 CORE Association\n\u0628\u0627\u0632\u0627\u0631\n\n// xn--mgbb9fbpob : 2014-12-18 GreenTech Consultancy Company W.L.L.\n\u0645\u0648\u0628\u0627\u064A\u0644\u064A\n\n// xn--mgbca7dzdo : 2015-07-30 Abu Dhabi Systems and Information Centre\n\u0627\u0628\u0648\u0638\u0628\u064A\n\n// xn--mgbi4ecexp : 2015-10-21 Pontificium Consilium de Comunicationibus Socialibus (PCCS) (Pontifical Council for Social Communication)\n\u0643\u0627\u062B\u0648\u0644\u064A\u0643\n\n// xn--mgbt3dhd : 2014-09-04 Asia Green IT System Bilgisayar San. ve Tic. Ltd. Sti.\n\u0647\u0645\u0631\u0627\u0647\n\n// xn--mk1bu44c : 2015-01-15 VeriSign Sarl\n\uB2F7\uCEF4\n\n// xn--mxtq1m : 2014-03-06 Net-Chinese Co., Ltd.\n\u653F\u5E9C\n\n// xn--ngbc5azd : 2013-07-13 International Domain Registry Pty. Ltd.\n\u0634\u0628\u0643\u0629\n\n// xn--ngbe9e0a : 2014-12-04 Kuwait Finance House\n\u0628\u064A\u062A\u0643\n\n// xn--ngbrx : 2015-11-12 League of Arab States\n\u0639\u0631\u0628\n\n// xn--nqv7f : 2013-11-14 Public Interest Registry\n\u673A\u6784\n\n// xn--nqv7fs00ema : 2013-11-14 Public Interest Registry\n\u7EC4\u7EC7\u673A\u6784\n\n// xn--nyqy26a : 2014-11-07 Stable Tone Limited\n\u5065\u5EB7\n\n// xn--otu796d : 2017-08-06 Dot Trademark TLD Holding Company Limited\n\u62DB\u8058\n\n// xn--p1acf : 2013-12-12 Rusnames Limited\n\u0440\u0443\u0441\n\n// xn--pbt977c : 2014-12-22 Richemont DNS Inc.\n\u73E0\u5B9D\n\n// xn--pssy2u : 2015-01-15 VeriSign Sarl\n\u5927\u62FF\n\n// xn--q9jyb4c : 2013-09-17 Charleston Road Registry Inc.\n\u307F\u3093\u306A\n\n// xn--qcka1pmc : 2014-07-31 Charleston Road Registry Inc.\n\u30B0\u30FC\u30B0\u30EB\n\n// xn--rhqv96g : 2013-09-11 Stable Tone Limited\n\u4E16\u754C\n\n// xn--rovu88b : 2015-02-26 Amazon Registry Services, Inc.\n\u66F8\u7C4D\n\n// xn--ses554g : 2014-01-16 KNET Co., Ltd.\n\u7F51\u5740\n\n// xn--t60b56a : 2015-01-15 VeriSign Sarl\n\uB2F7\uB137\n\n// xn--tckwe : 2015-01-15 VeriSign Sarl\n\u30B3\u30E0\n\n// xn--tiq49xqyj : 2015-10-21 Pontificium Consilium de Comunicationibus Socialibus (PCCS) (Pontifical Council for Social Communication)\n\u5929\u4E3B\u6559\n\n// xn--unup4y : 2013-07-14 Binky Moon, LLC\n\u6E38\u620F\n\n// xn--vermgensberater-ctb : 2014-06-23 Deutsche Verm\u00F6gensberatung Aktiengesellschaft DVAG\nverm\u00F6gensberater\n\n// xn--vermgensberatung-pwb : 2014-06-23 Deutsche Verm\u00F6gensberatung Aktiengesellschaft DVAG\nverm\u00F6gensberatung\n\n// xn--vhquv : 2013-08-27 Binky Moon, LLC\n\u4F01\u4E1A\n\n// xn--vuq861b : 2014-10-16 Beijing Tele-info Network Technology Co., Ltd.\n\u4FE1\u606F\n\n// xn--w4r85el8fhu5dnra : 2015-04-30 Kerry Trading Co. Limited\n\u5609\u91CC\u5927\u9152\u5E97\n\n// xn--w4rs40l : 2015-07-30 Kerry Trading Co. Limited\n\u5609\u91CC\n\n// xn--xhq521b : 2013-11-14 Guangzhou YU Wei Information Technology Co., Ltd.\n\u5E7F\u4E1C\n\n// xn--zfr164b : 2013-11-08 China Organizational Name Administration Center\n\u653F\u52A1\n\n// xyz : 2013-12-05 XYZ.COM LLC\nxyz\n\n// yachts : 2014-01-09 DERYachts, LLC\nyachts\n\n// yahoo : 2015-04-02 Yahoo! Domain Services Inc.\nyahoo\n\n// yamaxun : 2014-12-18 Amazon Registry Services, Inc.\nyamaxun\n\n// yandex : 2014-04-10 YANDEX, LLC\nyandex\n\n// yodobashi : 2014-11-20 YODOBASHI CAMERA CO.,LTD.\nyodobashi\n\n// yoga : 2014-05-29 Minds + Machines Group Limited\nyoga\n\n// yokohama : 2013-12-12 GMO Registry, Inc.\nyokohama\n\n// you : 2015-04-09 Amazon Registry Services, Inc.\nyou\n\n// youtube : 2014-05-01 Charleston Road Registry Inc.\nyoutube\n\n// yun : 2015-01-08 QIHOO 360 TECHNOLOGY CO. LTD.\nyun\n\n// zappos : 2015-06-25 Amazon Registry Services, Inc.\nzappos\n\n// zara : 2014-11-07 Industria de Dise\u00F1o Textil, S.A. (INDITEX, S.A.)\nzara\n\n// zero : 2014-12-18 Amazon Registry Services, Inc.\nzero\n\n// zip : 2014-05-08 Charleston Road Registry Inc.\nzip\n\n// zippo : 2015-07-02 Zadco Company\nzippo\n\n// zone : 2013-11-14 Binky Moon, LLC\nzone\n\n// zuerich : 2014-11-07 Kanton Z\u00FCrich (Canton of Zurich)\nzuerich\n\n\n// ===END ICANN DOMAINS===\n// ===BEGIN PRIVATE DOMAINS===\n// (Note: these are in alphabetical order by company name)\n\n// 1GB LLC : https://www.1gb.ua/\n// Submitted by 1GB LLC <noc@1gb.com.ua>\ncc.ua\ninf.ua\nltd.ua\n\n// Agnat sp. z o.o. : https://domena.pl\n// Submitted by Przemyslaw Plewa <it-admin@domena.pl>\nbeep.pl\n\n// Alces Software Ltd : http://alces-software.com\n// Submitted by Mark J. Titorenko <mark.titorenko@alces-software.com>\n*.compute.estate\n*.alces.network\n\n// alwaysdata : https://www.alwaysdata.com\n// Submitted by Cyril <admin@alwaysdata.com>\nalwaysdata.net\n\n// Amazon CloudFront : https://aws.amazon.com/cloudfront/\n// Submitted by Donavan Miller <donavanm@amazon.com>\ncloudfront.net\n\n// Amazon Elastic Compute Cloud : https://aws.amazon.com/ec2/\n// Submitted by Luke Wells <psl-maintainers@amazon.com>\n*.compute.amazonaws.com\n*.compute-1.amazonaws.com\n*.compute.amazonaws.com.cn\nus-east-1.amazonaws.com\n\n// Amazon Elastic Beanstalk : https://aws.amazon.com/elasticbeanstalk/\n// Submitted by Luke Wells <psl-maintainers@amazon.com>\ncn-north-1.eb.amazonaws.com.cn\ncn-northwest-1.eb.amazonaws.com.cn\nelasticbeanstalk.com\nap-northeast-1.elasticbeanstalk.com\nap-northeast-2.elasticbeanstalk.com\nap-northeast-3.elasticbeanstalk.com\nap-south-1.elasticbeanstalk.com\nap-southeast-1.elasticbeanstalk.com\nap-southeast-2.elasticbeanstalk.com\nca-central-1.elasticbeanstalk.com\neu-central-1.elasticbeanstalk.com\neu-west-1.elasticbeanstalk.com\neu-west-2.elasticbeanstalk.com\neu-west-3.elasticbeanstalk.com\nsa-east-1.elasticbeanstalk.com\nus-east-1.elasticbeanstalk.com\nus-east-2.elasticbeanstalk.com\nus-gov-west-1.elasticbeanstalk.com\nus-west-1.elasticbeanstalk.com\nus-west-2.elasticbeanstalk.com\n\n// Amazon Elastic Load Balancing : https://aws.amazon.com/elasticloadbalancing/\n// Submitted by Luke Wells <psl-maintainers@amazon.com>\n*.elb.amazonaws.com\n*.elb.amazonaws.com.cn\n\n// Amazon S3 : https://aws.amazon.com/s3/\n// Submitted by Luke Wells <psl-maintainers@amazon.com>\ns3.amazonaws.com\ns3-ap-northeast-1.amazonaws.com\ns3-ap-northeast-2.amazonaws.com\ns3-ap-south-1.amazonaws.com\ns3-ap-southeast-1.amazonaws.com\ns3-ap-southeast-2.amazonaws.com\ns3-ca-central-1.amazonaws.com\ns3-eu-central-1.amazonaws.com\ns3-eu-west-1.amazonaws.com\ns3-eu-west-2.amazonaws.com\ns3-eu-west-3.amazonaws.com\ns3-external-1.amazonaws.com\ns3-fips-us-gov-west-1.amazonaws.com\ns3-sa-east-1.amazonaws.com\ns3-us-gov-west-1.amazonaws.com\ns3-us-east-2.amazonaws.com\ns3-us-west-1.amazonaws.com\ns3-us-west-2.amazonaws.com\ns3.ap-northeast-2.amazonaws.com\ns3.ap-south-1.amazonaws.com\ns3.cn-north-1.amazonaws.com.cn\ns3.ca-central-1.amazonaws.com\ns3.eu-central-1.amazonaws.com\ns3.eu-west-2.amazonaws.com\ns3.eu-west-3.amazonaws.com\ns3.us-east-2.amazonaws.com\ns3.dualstack.ap-northeast-1.amazonaws.com\ns3.dualstack.ap-northeast-2.amazonaws.com\ns3.dualstack.ap-south-1.amazonaws.com\ns3.dualstack.ap-southeast-1.amazonaws.com\ns3.dualstack.ap-southeast-2.amazonaws.com\ns3.dualstack.ca-central-1.amazonaws.com\ns3.dualstack.eu-central-1.amazonaws.com\ns3.dualstack.eu-west-1.amazonaws.com\ns3.dualstack.eu-west-2.amazonaws.com\ns3.dualstack.eu-west-3.amazonaws.com\ns3.dualstack.sa-east-1.amazonaws.com\ns3.dualstack.us-east-1.amazonaws.com\ns3.dualstack.us-east-2.amazonaws.com\ns3-website-us-east-1.amazonaws.com\ns3-website-us-west-1.amazonaws.com\ns3-website-us-west-2.amazonaws.com\ns3-website-ap-northeast-1.amazonaws.com\ns3-website-ap-southeast-1.amazonaws.com\ns3-website-ap-southeast-2.amazonaws.com\ns3-website-eu-west-1.amazonaws.com\ns3-website-sa-east-1.amazonaws.com\ns3-website.ap-northeast-2.amazonaws.com\ns3-website.ap-south-1.amazonaws.com\ns3-website.ca-central-1.amazonaws.com\ns3-website.eu-central-1.amazonaws.com\ns3-website.eu-west-2.amazonaws.com\ns3-website.eu-west-3.amazonaws.com\ns3-website.us-east-2.amazonaws.com\n\n// Amune : https://amune.org/\n// Submitted by Team Amune <cert@amune.org>\nt3l3p0rt.net\ntele.amune.org\n\n// Aptible : https://www.aptible.com/\n// Submitted by Thomas Orozco <thomas@aptible.com>\non-aptible.com\n\n// Asociaci\u00F3n Amigos de la Inform\u00E1tica \"Euskalamiga\" : http://encounter.eus/\n// Submitted by Hector Martin <marcan@euskalencounter.org>\nuser.party.eus\n\n// Association potager.org : https://potager.org/\n// Submitted by Lunar <jardiniers@potager.org>\npimienta.org\npoivron.org\npotager.org\nsweetpepper.org\n\n// ASUSTOR Inc. : http://www.asustor.com\n// Submitted by Vincent Tseng <vincenttseng@asustor.com>\nmyasustor.com\n\n// AVM : https://avm.de\n// Submitted by Andreas Weise <a.weise@avm.de>\nmyfritz.net\n\n// AW AdvisorWebsites.com Software Inc : https://advisorwebsites.com\n// Submitted by James Kennedy <domains@advisorwebsites.com>\n*.awdev.ca\n*.advisor.ws\n\n// backplane : https://www.backplane.io\n// Submitted by Anthony Voutas <anthony@backplane.io>\nbackplaneapp.io\n\n// BetaInABox\n// Submitted by Adrian <adrian@betainabox.com>\nbetainabox.com\n\n// BinaryLane : http://www.binarylane.com\n// Submitted by Nathan O'Sullivan <nathan@mammoth.com.au>\nbnr.la\n\n// Blackbaud, Inc. : https://www.blackbaud.com\n// Submitted by Paul Crowder <paul.crowder@blackbaud.com>\nblackbaudcdn.net\n\n// Boomla : https://boomla.com\n// Submitted by Tibor Halter <thalter@boomla.com>\nboomla.net\n\n// Boxfuse : https://boxfuse.com\n// Submitted by Axel Fontaine <axel@boxfuse.com>\nboxfuse.io\n\n// bplaced : https://www.bplaced.net/\n// Submitted by Miroslav Bozic <security@bplaced.net>\nsquare7.ch\nbplaced.com\nbplaced.de\nsquare7.de\nbplaced.net\nsquare7.net\n\n// BrowserSafetyMark\n// Submitted by Dave Tharp <browsersafetymark.io@quicinc.com>\nbrowsersafetymark.io\n\n// callidomus : https://www.callidomus.com/\n// Submitted by Marcus Popp <admin@callidomus.com>\nmycd.eu\n\n// CentralNic : http://www.centralnic.com/names/domains\n// Submitted by registry <gavin.brown@centralnic.com>\nae.org\nar.com\nbr.com\ncn.com\ncom.de\ncom.se\nde.com\neu.com\ngb.com\ngb.net\nhu.com\nhu.net\njp.net\njpn.com\nkr.com\nmex.com\nno.com\nqc.com\nru.com\nsa.com\nse.net\nuk.com\nuk.net\nus.com\nuy.com\nza.bz\nza.com\n\n// Africa.com Web Solutions Ltd : https://registry.africa.com\n// Submitted by Gavin Brown <gavin.brown@centralnic.com>\nafrica.com\n\n// iDOT Services Limited : http://www.domain.gr.com\n// Submitted by Gavin Brown <gavin.brown@centralnic.com>\ngr.com\n\n// Radix FZC : http://domains.in.net\n// Submitted by Gavin Brown <gavin.brown@centralnic.com>\nin.net\n\n// US REGISTRY LLC : http://us.org\n// Submitted by Gavin Brown <gavin.brown@centralnic.com>\nus.org\n\n// co.com Registry, LLC : https://registry.co.com\n// Submitted by Gavin Brown <gavin.brown@centralnic.com>\nco.com\n\n// c.la : http://www.c.la/\nc.la\n\n// certmgr.org : https://certmgr.org\n// Submitted by B. Blechschmidt <hostmaster@certmgr.org>\ncertmgr.org\n\n// Citrix : https://citrix.com\n// Submitted by Alex Stoddard <alex.stoddard@citrix.com>\nxenapponazure.com\n\n// ClearVox : http://www.clearvox.nl/\n// Submitted by Leon Rowland <leon@clearvox.nl>\nvirtueeldomein.nl\n\n// Clever Cloud : https://www.clever-cloud.com/\n// Submitted by Quentin Adam <noc@clever-cloud.com>\ncleverapps.io\n\n// Cloud66 : https://www.cloud66.com/\n// Submitted by Khash Sajadi <khash@cloud66.com>\nc66.me\ncloud66.ws\n\n// CloudAccess.net : https://www.cloudaccess.net/\n// Submitted by Pawel Panek <noc@cloudaccess.net>\njdevcloud.com\nwpdevcloud.com\ncloudaccess.host\nfreesite.host\ncloudaccess.net\n\n// cloudControl : https://www.cloudcontrol.com/\n// Submitted by Tobias Wilken <tw@cloudcontrol.com>\ncloudcontrolled.com\ncloudcontrolapp.com\n\n// co.ca : http://registry.co.ca/\nco.ca\n\n// Co & Co : https://co-co.nl/\n// Submitted by Govert Versluis <govert@co-co.nl>\n*.otap.co\n\n// i-registry s.r.o. : http://www.i-registry.cz/\n// Submitted by Martin Semrad <semrad@i-registry.cz>\nco.cz\n\n// CDN77.com : http://www.cdn77.com\n// Submitted by Jan Krpes <jan.krpes@cdn77.com>\nc.cdn77.org\ncdn77-ssl.net\nr.cdn77.net\nrsc.cdn77.org\nssl.origin.cdn77-secure.org\n\n// Cloud DNS Ltd : http://www.cloudns.net\n// Submitted by Aleksander Hristov <noc@cloudns.net>\ncloudns.asia\ncloudns.biz\ncloudns.club\ncloudns.cc\ncloudns.eu\ncloudns.in\ncloudns.info\ncloudns.org\ncloudns.pro\ncloudns.pw\ncloudns.us\n\n// Cloudeity Inc : https://cloudeity.com\n// Submitted by Stefan Dimitrov <contact@cloudeity.com>\ncloudeity.net\n\n// CNPY : https://cnpy.gdn\n// Submitted by Angelo Gladding <angelo@lahacker.net>\ncnpy.gdn\n\n// CoDNS B.V.\nco.nl\nco.no\n\n// Combell.com : https://www.combell.com\n// Submitted by Thomas Wouters <thomas.wouters@combellgroup.com>\nwebhosting.be\nhosting-cluster.nl\n\n// COSIMO GmbH : http://www.cosimo.de\n// Submitted by Rene Marticke <rmarticke@cosimo.de>\ndyn.cosidns.de\ndynamisches-dns.de\ndnsupdater.de\ninternet-dns.de\nl-o-g-i-n.de\ndynamic-dns.info\nfeste-ip.net\nknx-server.net\nstatic-access.net\n\n// Craynic, s.r.o. : http://www.craynic.com/\n// Submitted by Ales Krajnik <ales.krajnik@craynic.com>\nrealm.cz\n\n// Cryptonomic : https://cryptonomic.net/\n// Submitted by Andrew Cady <public-suffix-list@cryptonomic.net>\n*.cryptonomic.net\n\n// Cupcake : https://cupcake.io/\n// Submitted by Jonathan Rudenberg <jonathan@cupcake.io>\ncupcake.is\n\n// cyon GmbH : https://www.cyon.ch/\n// Submitted by Dominic Luechinger <dol@cyon.ch>\ncyon.link\ncyon.site\n\n// Daplie, Inc : https://daplie.com\n// Submitted by AJ ONeal <aj@daplie.com>\ndaplie.me\nlocalhost.daplie.me\n\n// Datto, Inc. : https://www.datto.com/\n// Submitted by Philipp Heckel <ph@datto.com>\ndattolocal.com\ndattorelay.com\ndattoweb.com\nmydatto.com\ndattolocal.net\nmydatto.net\n\n// Dansk.net : http://www.dansk.net/\n// Submitted by Anani Voule <digital@digital.co.dk>\nbiz.dk\nco.dk\nfirm.dk\nreg.dk\nstore.dk\n\n// Debian : https://www.debian.org/\n// Submitted by Peter Palfrader / Debian Sysadmin Team <dsa-publicsuffixlist@debian.org>\ndebian.net\n\n// deSEC : https://desec.io/\n// Submitted by Peter Thomassen <peter@desec.io>\ndedyn.io\n\n// DNShome : https://www.dnshome.de/\n// Submitted by Norbert Auler <mail@dnshome.de>\ndnshome.de\n\n// DrayTek Corp. : https://www.draytek.com/\n// Submitted by Paul Fang <mis@draytek.com>\ndrayddns.com\n\n// DreamHost : http://www.dreamhost.com/\n// Submitted by Andrew Farmer <andrew.farmer@dreamhost.com>\ndreamhosters.com\n\n// Drobo : http://www.drobo.com/\n// Submitted by Ricardo Padilha <rpadilha@drobo.com>\nmydrobo.com\n\n// Drud Holdings, LLC. : https://www.drud.com/\n// Submitted by Kevin Bridges <kevin@drud.com>\ndrud.io\ndrud.us\n\n// DuckDNS : http://www.duckdns.org/\n// Submitted by Richard Harper <richard@duckdns.org>\nduckdns.org\n\n// dy.fi : http://dy.fi/\n// Submitted by Heikki Hannikainen <hessu@hes.iki.fi>\ndy.fi\ntunk.org\n\n// DynDNS.com : http://www.dyndns.com/services/dns/dyndns/\ndyndns-at-home.com\ndyndns-at-work.com\ndyndns-blog.com\ndyndns-free.com\ndyndns-home.com\ndyndns-ip.com\ndyndns-mail.com\ndyndns-office.com\ndyndns-pics.com\ndyndns-remote.com\ndyndns-server.com\ndyndns-web.com\ndyndns-wiki.com\ndyndns-work.com\ndyndns.biz\ndyndns.info\ndyndns.org\ndyndns.tv\nat-band-camp.net\nath.cx\nbarrel-of-knowledge.info\nbarrell-of-knowledge.info\nbetter-than.tv\nblogdns.com\nblogdns.net\nblogdns.org\nblogsite.org\nboldlygoingnowhere.org\nbroke-it.net\nbuyshouses.net\ncechire.com\ndnsalias.com\ndnsalias.net\ndnsalias.org\ndnsdojo.com\ndnsdojo.net\ndnsdojo.org\ndoes-it.net\ndoesntexist.com\ndoesntexist.org\ndontexist.com\ndontexist.net\ndontexist.org\ndoomdns.com\ndoomdns.org\ndvrdns.org\ndyn-o-saur.com\ndynalias.com\ndynalias.net\ndynalias.org\ndynathome.net\ndyndns.ws\nendofinternet.net\nendofinternet.org\nendoftheinternet.org\nest-a-la-maison.com\nest-a-la-masion.com\nest-le-patron.com\nest-mon-blogueur.com\nfor-better.biz\nfor-more.biz\nfor-our.info\nfor-some.biz\nfor-the.biz\nforgot.her.name\nforgot.his.name\nfrom-ak.com\nfrom-al.com\nfrom-ar.com\nfrom-az.net\nfrom-ca.com\nfrom-co.net\nfrom-ct.com\nfrom-dc.com\nfrom-de.com\nfrom-fl.com\nfrom-ga.com\nfrom-hi.com\nfrom-ia.com\nfrom-id.com\nfrom-il.com\nfrom-in.com\nfrom-ks.com\nfrom-ky.com\nfrom-la.net\nfrom-ma.com\nfrom-md.com\nfrom-me.org\nfrom-mi.com\nfrom-mn.com\nfrom-mo.com\nfrom-ms.com\nfrom-mt.com\nfrom-nc.com\nfrom-nd.com\nfrom-ne.com\nfrom-nh.com\nfrom-nj.com\nfrom-nm.com\nfrom-nv.com\nfrom-ny.net\nfrom-oh.com\nfrom-ok.com\nfrom-or.com\nfrom-pa.com\nfrom-pr.com\nfrom-ri.com\nfrom-sc.com\nfrom-sd.com\nfrom-tn.com\nfrom-tx.com\nfrom-ut.com\nfrom-va.com\nfrom-vt.com\nfrom-wa.com\nfrom-wi.com\nfrom-wv.com\nfrom-wy.com\nftpaccess.cc\nfuettertdasnetz.de\ngame-host.org\ngame-server.cc\ngetmyip.com\ngets-it.net\ngo.dyndns.org\ngotdns.com\ngotdns.org\ngroks-the.info\ngroks-this.info\nham-radio-op.net\nhere-for-more.info\nhobby-site.com\nhobby-site.org\nhome.dyndns.org\nhomedns.org\nhomeftp.net\nhomeftp.org\nhomeip.net\nhomelinux.com\nhomelinux.net\nhomelinux.org\nhomeunix.com\nhomeunix.net\nhomeunix.org\niamallama.com\nin-the-band.net\nis-a-anarchist.com\nis-a-blogger.com\nis-a-bookkeeper.com\nis-a-bruinsfan.org\nis-a-bulls-fan.com\nis-a-candidate.org\nis-a-caterer.com\nis-a-celticsfan.org\nis-a-chef.com\nis-a-chef.net\nis-a-chef.org\nis-a-conservative.com\nis-a-cpa.com\nis-a-cubicle-slave.com\nis-a-democrat.com\nis-a-designer.com\nis-a-doctor.com\nis-a-financialadvisor.com\nis-a-geek.com\nis-a-geek.net\nis-a-geek.org\nis-a-green.com\nis-a-guru.com\nis-a-hard-worker.com\nis-a-hunter.com\nis-a-knight.org\nis-a-landscaper.com\nis-a-lawyer.com\nis-a-liberal.com\nis-a-libertarian.com\nis-a-linux-user.org\nis-a-llama.com\nis-a-musician.com\nis-a-nascarfan.com\nis-a-nurse.com\nis-a-painter.com\nis-a-patsfan.org\nis-a-personaltrainer.com\nis-a-photographer.com\nis-a-player.com\nis-a-republican.com\nis-a-rockstar.com\nis-a-socialist.com\nis-a-soxfan.org\nis-a-student.com\nis-a-teacher.com\nis-a-techie.com\nis-a-therapist.com\nis-an-accountant.com\nis-an-actor.com\nis-an-actress.com\nis-an-anarchist.com\nis-an-artist.com\nis-an-engineer.com\nis-an-entertainer.com\nis-by.us\nis-certified.com\nis-found.org\nis-gone.com\nis-into-anime.com\nis-into-cars.com\nis-into-cartoons.com\nis-into-games.com\nis-leet.com\nis-lost.org\nis-not-certified.com\nis-saved.org\nis-slick.com\nis-uberleet.com\nis-very-bad.org\nis-very-evil.org\nis-very-good.org\nis-very-nice.org\nis-very-sweet.org\nis-with-theband.com\nisa-geek.com\nisa-geek.net\nisa-geek.org\nisa-hockeynut.com\nissmarterthanyou.com\nisteingeek.de\nistmein.de\nkicks-ass.net\nkicks-ass.org\nknowsitall.info\nland-4-sale.us\nlebtimnetz.de\nleitungsen.de\nlikes-pie.com\nlikescandy.com\nmerseine.nu\nmine.nu\nmisconfused.org\nmypets.ws\nmyphotos.cc\nneat-url.com\noffice-on-the.net\non-the-web.tv\npodzone.net\npodzone.org\nreadmyblog.org\nsaves-the-whales.com\nscrapper-site.net\nscrapping.cc\nselfip.biz\nselfip.com\nselfip.info\nselfip.net\nselfip.org\nsells-for-less.com\nsells-for-u.com\nsells-it.net\nsellsyourhome.org\nservebbs.com\nservebbs.net\nservebbs.org\nserveftp.net\nserveftp.org\nservegame.org\nshacknet.nu\nsimple-url.com\nspace-to-rent.com\nstuff-4-sale.org\nstuff-4-sale.us\nteaches-yoga.com\nthruhere.net\ntraeumtgerade.de\nwebhop.biz\nwebhop.info\nwebhop.net\nwebhop.org\nworse-than.tv\nwritesthisblog.com\n\n// ddnss.de : https://www.ddnss.de/\n// Submitted by Robert Niedziela <webmaster@ddnss.de>\nddnss.de\ndyn.ddnss.de\ndyndns.ddnss.de\ndyndns1.de\ndyn-ip24.de\nhome-webserver.de\ndyn.home-webserver.de\nmyhome-server.de\nddnss.org\n\n// Definima : http://www.definima.com/\n// Submitted by Maxence Bitterli <maxence@definima.com>\ndefinima.net\ndefinima.io\n\n// dnstrace.pro : https://dnstrace.pro/\n// Submitted by Chris Partridge <chris@partridge.tech>\nbci.dnstrace.pro\n\n// Dynu.com : https://www.dynu.com/\n// Submitted by Sue Ye <sue@dynu.com>\nddnsfree.com\nddnsgeek.com\ngiize.com\ngleeze.com\nkozow.com\nloseyourip.com\nooguy.com\ntheworkpc.com\ncasacam.net\ndynu.net\naccesscam.org\ncamdvr.org\nfreeddns.org\nmywire.org\nwebredirect.org\nmyddns.rocks\nblogsite.xyz\n\n// dynv6 : https://dynv6.com\n// Submitted by Dominik Menke <dom@digineo.de>\ndynv6.net\n\n// E4YOU spol. s.r.o. : https://e4you.cz/\n// Submitted by Vladimir Dudr <info@e4you.cz>\ne4.cz\n\n// Enalean SAS: https://www.enalean.com\n// Submitted by Thomas Cottier <thomas.cottier@enalean.com>\nmytuleap.com\n\n// Enonic : http://enonic.com/\n// Submitted by Erik Kaareng-Sunde <esu@enonic.com>\nenonic.io\ncustomer.enonic.io\n\n// EU.org https://eu.org/\n// Submitted by Pierre Beyssac <hostmaster@eu.org>\neu.org\nal.eu.org\nasso.eu.org\nat.eu.org\nau.eu.org\nbe.eu.org\nbg.eu.org\nca.eu.org\ncd.eu.org\nch.eu.org\ncn.eu.org\ncy.eu.org\ncz.eu.org\nde.eu.org\ndk.eu.org\nedu.eu.org\nee.eu.org\nes.eu.org\nfi.eu.org\nfr.eu.org\ngr.eu.org\nhr.eu.org\nhu.eu.org\nie.eu.org\nil.eu.org\nin.eu.org\nint.eu.org\nis.eu.org\nit.eu.org\njp.eu.org\nkr.eu.org\nlt.eu.org\nlu.eu.org\nlv.eu.org\nmc.eu.org\nme.eu.org\nmk.eu.org\nmt.eu.org\nmy.eu.org\nnet.eu.org\nng.eu.org\nnl.eu.org\nno.eu.org\nnz.eu.org\nparis.eu.org\npl.eu.org\npt.eu.org\nq-a.eu.org\nro.eu.org\nru.eu.org\nse.eu.org\nsi.eu.org\nsk.eu.org\ntr.eu.org\nuk.eu.org\nus.eu.org\n\n// Evennode : http://www.evennode.com/\n// Submitted by Michal Kralik <support@evennode.com>\neu-1.evennode.com\neu-2.evennode.com\neu-3.evennode.com\neu-4.evennode.com\nus-1.evennode.com\nus-2.evennode.com\nus-3.evennode.com\nus-4.evennode.com\n\n// eDirect Corp. : https://hosting.url.com.tw/\n// Submitted by C.S. chang <cschang@corp.url.com.tw>\ntwmail.cc\ntwmail.net\ntwmail.org\nmymailer.com.tw\nurl.tw\n\n// Facebook, Inc.\n// Submitted by Peter Ruibal <public-suffix@fb.com>\napps.fbsbx.com\n\n// FAITID : https://faitid.org/\n// Submitted by Maxim Alzoba <tech.contact@faitid.org>\n// https://www.flexireg.net/stat_info\nru.net\nadygeya.ru\nbashkiria.ru\nbir.ru\ncbg.ru\ncom.ru\ndagestan.ru\ngrozny.ru\nkalmykia.ru\nkustanai.ru\nmarine.ru\nmordovia.ru\nmsk.ru\nmytis.ru\nnalchik.ru\nnov.ru\npyatigorsk.ru\nspb.ru\nvladikavkaz.ru\nvladimir.ru\nabkhazia.su\nadygeya.su\naktyubinsk.su\narkhangelsk.su\narmenia.su\nashgabad.su\nazerbaijan.su\nbalashov.su\nbashkiria.su\nbryansk.su\nbukhara.su\nchimkent.su\ndagestan.su\neast-kazakhstan.su\nexnet.su\ngeorgia.su\ngrozny.su\nivanovo.su\njambyl.su\nkalmykia.su\nkaluga.su\nkaracol.su\nkaraganda.su\nkarelia.su\nkhakassia.su\nkrasnodar.su\nkurgan.su\nkustanai.su\nlenug.su\nmangyshlak.su\nmordovia.su\nmsk.su\nmurmansk.su\nnalchik.su\nnavoi.su\nnorth-kazakhstan.su\nnov.su\nobninsk.su\npenza.su\npokrovsk.su\nsochi.su\nspb.su\ntashkent.su\ntermez.su\ntogliatti.su\ntroitsk.su\ntselinograd.su\ntula.su\ntuva.su\nvladikavkaz.su\nvladimir.su\nvologda.su\n\n// Fancy Bits, LLC : http://getchannels.com\n// Submitted by Aman Gupta <aman@getchannels.com>\nchannelsdvr.net\n\n// Fastly Inc. : http://www.fastly.com/\n// Submitted by Fastly Security <security@fastly.com>\nfastlylb.net\nmap.fastlylb.net\nfreetls.fastly.net\nmap.fastly.net\na.prod.fastly.net\nglobal.prod.fastly.net\na.ssl.fastly.net\nb.ssl.fastly.net\nglobal.ssl.fastly.net\n\n// FASTVPS EESTI OU : https://fastvps.ru/\n// Submitted by Likhachev Vasiliy <lihachev@fastvps.ru>\nfastpanel.direct\nfastvps-server.com\n\n// Featherhead : https://featherhead.xyz/\n// Submitted by Simon Menke <simon@featherhead.xyz>\nfhapp.xyz\n\n// Fedora : https://fedoraproject.org/\n// submitted by Patrick Uiterwijk <puiterwijk@fedoraproject.org>\nfedorainfracloud.org\nfedorapeople.org\ncloud.fedoraproject.org\napp.os.fedoraproject.org\napp.os.stg.fedoraproject.org\n\n// Filegear Inc. : https://www.filegear.com\n// Submitted by Jason Zhu <jason@owtware.com>\nfilegear.me\n\n// Firebase, Inc.\n// Submitted by Chris Raynor <chris@firebase.com>\nfirebaseapp.com\n\n// Flynn : https://flynn.io\n// Submitted by Jonathan Rudenberg <jonathan@flynn.io>\nflynnhub.com\nflynnhosting.net\n\n// Freebox : http://www.freebox.fr\n// Submitted by Romain Fliedel <rfliedel@freebox.fr>\nfreebox-os.com\nfreeboxos.com\nfbx-os.fr\nfbxos.fr\nfreebox-os.fr\nfreeboxos.fr\n\n// freedesktop.org : https://www.freedesktop.org\n// Submitted by Daniel Stone <daniel@fooishbar.org>\nfreedesktop.org\n\n// Futureweb OG : http://www.futureweb.at\n// Submitted by Andreas Schnederle-Wagner <schnederle@futureweb.at>\n*.futurecms.at\n*.ex.futurecms.at\n*.in.futurecms.at\nfuturehosting.at\nfuturemailing.at\n*.ex.ortsinfo.at\n*.kunden.ortsinfo.at\n*.statics.cloud\n\n// GDS : https://www.gov.uk/service-manual/operations/operating-servicegovuk-subdomains\n// Submitted by David Illsley <david.illsley@digital.cabinet-office.gov.uk>\nservice.gov.uk\n\n// GitHub, Inc.\n// Submitted by Patrick Toomey <security@github.com>\ngithub.io\ngithubusercontent.com\n\n// GitLab, Inc.\n// Submitted by Alex Hanselka <alex@gitlab.com>\ngitlab.io\n\n// UKHomeOffice : https://www.gov.uk/government/organisations/home-office\n// Submitted by Jon Shanks <jon.shanks@digital.homeoffice.gov.uk>\nhomeoffice.gov.uk\n\n// GlobeHosting, Inc.\n// Submitted by Zoltan Egresi <egresi@globehosting.com>\nro.im\nshop.ro\n\n// GoIP DNS Services : http://www.goip.de\n// Submitted by Christian Poulter <milchstrasse@goip.de>\ngoip.de\n\n// Google, Inc.\n// Submitted by Eduardo Vela <evn@google.com>\n*.0emm.com\nappspot.com\nblogspot.ae\nblogspot.al\nblogspot.am\nblogspot.ba\nblogspot.be\nblogspot.bg\nblogspot.bj\nblogspot.ca\nblogspot.cf\nblogspot.ch\nblogspot.cl\nblogspot.co.at\nblogspot.co.id\nblogspot.co.il\nblogspot.co.ke\nblogspot.co.nz\nblogspot.co.uk\nblogspot.co.za\nblogspot.com\nblogspot.com.ar\nblogspot.com.au\nblogspot.com.br\nblogspot.com.by\nblogspot.com.co\nblogspot.com.cy\nblogspot.com.ee\nblogspot.com.eg\nblogspot.com.es\nblogspot.com.mt\nblogspot.com.ng\nblogspot.com.tr\nblogspot.com.uy\nblogspot.cv\nblogspot.cz\nblogspot.de\nblogspot.dk\nblogspot.fi\nblogspot.fr\nblogspot.gr\nblogspot.hk\nblogspot.hr\nblogspot.hu\nblogspot.ie\nblogspot.in\nblogspot.is\nblogspot.it\nblogspot.jp\nblogspot.kr\nblogspot.li\nblogspot.lt\nblogspot.lu\nblogspot.md\nblogspot.mk\nblogspot.mr\nblogspot.mx\nblogspot.my\nblogspot.nl\nblogspot.no\nblogspot.pe\nblogspot.pt\nblogspot.qa\nblogspot.re\nblogspot.ro\nblogspot.rs\nblogspot.ru\nblogspot.se\nblogspot.sg\nblogspot.si\nblogspot.sk\nblogspot.sn\nblogspot.td\nblogspot.tw\nblogspot.ug\nblogspot.vn\ncloudfunctions.net\ncloud.goog\ncodespot.com\ngoogleapis.com\ngooglecode.com\npagespeedmobilizer.com\npublishproxy.com\nwithgoogle.com\nwithyoutube.com\n\n// Hashbang : https://hashbang.sh\nhashbang.sh\n\n// Hasura : https://hasura.io\n// Submitted by Shahidh K Muhammed <shahidh@hasura.io>\nhasura.app\nhasura-app.io\n\n// Hepforge : https://www.hepforge.org\n// Submitted by David Grellscheid <admin@hepforge.org>\nhepforge.org\n\n// Heroku : https://www.heroku.com/\n// Submitted by Tom Maher <tmaher@heroku.com>\nherokuapp.com\nherokussl.com\n\n// Hibernating Rhinos\n// Submitted by Oren Eini <oren@ravendb.net>\nmyravendb.com\nravendb.community\nravendb.me\ndevelopment.run\nravendb.run\n\n// Ici la Lune : http://www.icilalune.com/\n// Submitted by Simon Morvan <simon@icilalune.com>\nmoonscale.net\n\n// iki.fi\n// Submitted by Hannu Aronsson <haa@iki.fi>\niki.fi\n\n// info.at : http://www.info.at/\nbiz.at\ninfo.at\n\n// info.cx : http://info.cx\n// Submitted by Jacob Slater <whois@igloo.to>\ninfo.cx\n\n// Interlegis : http://www.interlegis.leg.br\n// Submitted by Gabriel Ferreira <registrobr@interlegis.leg.br>\nac.leg.br\nal.leg.br\nam.leg.br\nap.leg.br\nba.leg.br\nce.leg.br\ndf.leg.br\nes.leg.br\ngo.leg.br\nma.leg.br\nmg.leg.br\nms.leg.br\nmt.leg.br\npa.leg.br\npb.leg.br\npe.leg.br\npi.leg.br\npr.leg.br\nrj.leg.br\nrn.leg.br\nro.leg.br\nrr.leg.br\nrs.leg.br\nsc.leg.br\nse.leg.br\nsp.leg.br\nto.leg.br\n\n// intermetrics GmbH : https://pixolino.com/\n// Submitted by Wolfgang Schwarz <admin@intermetrics.de>\npixolino.com\n\n// IPiFony Systems, Inc. : https://www.ipifony.com/\n// Submitted by Matthew Hardeman <mhardeman@ipifony.com>\nipifony.net\n\n// IServ GmbH : https://iserv.eu\n// Submitted by Kim-Alexander Brodowski <kim.brodowski@iserv.eu>\nmein-iserv.de\ntest-iserv.de\n\n// Jino : https://www.jino.ru\n// Submitted by Sergey Ulyashin <ulyashin@jino.ru>\nmyjino.ru\n*.hosting.myjino.ru\n*.landing.myjino.ru\n*.spectrum.myjino.ru\n*.vps.myjino.ru\n\n// Joyent : https://www.joyent.com/\n// Submitted by Brian Bennett <brian.bennett@joyent.com>\n*.triton.zone\n*.cns.joyent.com\n\n// JS.ORG : http://dns.js.org\n// Submitted by Stefan Keim <admin@js.org>\njs.org\n\n// Keyweb AG : https://www.keyweb.de\n// Submitted by Martin Dannehl <postmaster@keymachine.de>\nkeymachine.de\n\n// KnightPoint Systems, LLC : http://www.knightpoint.com/\n// Submitted by Roy Keene <rkeene@knightpoint.com>\nknightpoint.systems\n\n// .KRD : http://nic.krd/data/krd/Registration%20Policy.pdf\nco.krd\nedu.krd\n\n// LCube - Professional hosting e.K. : https://www.lcube-webhosting.de\n// Submitted by Lars Laehn <info@lcube.de>\ngit-repos.de\nlcube-server.de\nsvn-repos.de\n\n// Lightmaker Property Manager, Inc. : https://app.lmpm.com/\n// Submitted by Greg Holland <greg.holland@lmpm.com>\napp.lmpm.com\n\n// Linki Tools UG : https://linki.tools\n// Submitted by Paulo Matos <pmatos@linki.tools>\nlinkitools.space\n\n// linkyard ldt: https://www.linkyard.ch/\n// Submitted by Mario Siegenthaler <mario.siegenthaler@linkyard.ch>\nlinkyard.cloud\nlinkyard-cloud.ch\n\n// LiquidNet Ltd : http://www.liquidnetlimited.com/\n// Submitted by Victor Velchev <admin@liquidnetlimited.com>\nwe.bs\n\n// Lug.org.uk : https://lug.org.uk\n// Submitted by Jon Spriggs <admin@lug.org.uk>\nuklugs.org\nglug.org.uk\nlug.org.uk\nlugs.org.uk\n\n// Lukanet Ltd : https://lukanet.com\n// Submitted by Anton Avramov <register@lukanet.com>\nbarsy.bg\nbarsy.co.uk\nbarsyonline.co.uk\nbarsycenter.com\nbarsyonline.com\nbarsy.club\nbarsy.de\nbarsy.eu\nbarsy.in\nbarsy.info\nbarsy.io\nbarsy.me\nbarsy.menu\nbarsy.mobi\nbarsy.net\nbarsy.online\nbarsy.org\nbarsy.pro\nbarsy.pub\nbarsy.shop\nbarsy.site\nbarsy.support\nbarsy.uk\n\n// Magento Commerce\n// Submitted by Damien Tournoud <dtournoud@magento.cloud>\n*.magentosite.cloud\n\n// May First - People Link : https://mayfirst.org/\n// Submitted by Jamie McClelland <info@mayfirst.org>\nmayfirst.info\nmayfirst.org\n\n// Mail.Ru Group : https://hb.cldmail.ru\n// Submitted by Ilya Zaretskiy <zaretskiy@corp.mail.ru>\nhb.cldmail.ru\n\n// Memset hosting : https://www.memset.com\n// Submitted by Tom Whitwell <domains@memset.com>\nminiserver.com\nmemset.net\n\n// MetaCentrum, CESNET z.s.p.o. : https://www.metacentrum.cz/en/\n// Submitted by Zden\u011Bk \u0160ustr <zdenek.sustr@cesnet.cz>\ncloud.metacentrum.cz\ncustom.metacentrum.cz\n\n// MetaCentrum, CESNET z.s.p.o. : https://www.metacentrum.cz/en/\n// Submitted by Radim Jan\u010Da <janca@cesnet.cz>\nflt.cloud.muni.cz\nusr.cloud.muni.cz\n\n// Meteor Development Group : https://www.meteor.com/hosting\n// Submitted by Pierre Carrier <pierre@meteor.com>\nmeteorapp.com\neu.meteorapp.com\n\n// Michau Enterprises Limited : http://www.co.pl/\nco.pl\n\n// Microsoft Corporation : http://microsoft.com\n// Submitted by Justin Luk <juluk@microsoft.com>\nazurecontainer.io\nazurewebsites.net\nazure-mobile.net\ncloudapp.net\n\n// Mozilla Corporation : https://mozilla.com\n// Submitted by Ben Francis <bfrancis@mozilla.com>\nmozilla-iot.org\n\n// Mozilla Foundation : https://mozilla.org/\n// Submitted by glob <glob@mozilla.com>\nbmoattachments.org\n\n// MSK-IX : https://www.msk-ix.ru/\n// Submitted by Khannanov Roman <r.khannanov@msk-ix.ru>\nnet.ru\norg.ru\npp.ru\n\n// Netlify : https://www.netlify.com\n// Submitted by Jessica Parsons <jessica@netlify.com>\nbitballoon.com\nnetlify.com\n\n// Neustar Inc.\n// Submitted by Trung Tran <Trung.Tran@neustar.biz>\n4u.com\n\n// ngrok : https://ngrok.com/\n// Submitted by Alan Shreve <alan@ngrok.com>\nngrok.io\n\n// Nimbus Hosting Ltd. : https://www.nimbushosting.co.uk/\n// Submitted by Nicholas Ford <nick@nimbushosting.co.uk>\nnh-serv.co.uk\n\n// NFSN, Inc. : https://www.NearlyFreeSpeech.NET/\n// Submitted by Jeff Wheelhouse <support@nearlyfreespeech.net>\nnfshost.com\n\n// Now-DNS : https://now-dns.com\n// Submitted by Steve Russell <steve@now-dns.com>\ndnsking.ch\nmypi.co\nn4t.co\n001www.com\nddnslive.com\nmyiphost.com\nforumz.info\n16-b.it\n32-b.it\n64-b.it\nsoundcast.me\ntcp4.me\ndnsup.net\nhicam.net\nnow-dns.net\nownip.net\nvpndns.net\ndynserv.org\nnow-dns.org\nx443.pw\nnow-dns.top\nntdll.top\nfreeddns.us\ncrafting.xyz\nzapto.xyz\n\n// nsupdate.info : https://www.nsupdate.info/\n// Submitted by Thomas Waldmann <info@nsupdate.info>\nnsupdate.info\nnerdpol.ovh\n\n// No-IP.com : https://noip.com/\n// Submitted by Deven Reza <publicsuffixlist@noip.com>\nblogsyte.com\nbrasilia.me\ncable-modem.org\nciscofreak.com\ncollegefan.org\ncouchpotatofries.org\ndamnserver.com\nddns.me\nditchyourip.com\ndnsfor.me\ndnsiskinky.com\ndvrcam.info\ndynns.com\neating-organic.net\nfantasyleague.cc\ngeekgalaxy.com\ngolffan.us\nhealth-carereform.com\nhomesecuritymac.com\nhomesecuritypc.com\nhopto.me\nilovecollege.info\nloginto.me\nmlbfan.org\nmmafan.biz\nmyactivedirectory.com\nmydissent.net\nmyeffect.net\nmymediapc.net\nmypsx.net\nmysecuritycamera.com\nmysecuritycamera.net\nmysecuritycamera.org\nnet-freaks.com\nnflfan.org\nnhlfan.net\nno-ip.ca\nno-ip.co.uk\nno-ip.net\nnoip.us\nonthewifi.com\npgafan.net\npoint2this.com\npointto.us\nprivatizehealthinsurance.net\nquicksytes.com\nread-books.org\nsecuritytactics.com\nserveexchange.com\nservehumour.com\nservep2p.com\nservesarcasm.com\nstufftoread.com\nufcfan.org\nunusualperson.com\nworkisboring.com\n3utilities.com\nbounceme.net\nddns.net\nddnsking.com\ngotdns.ch\nhopto.org\nmyftp.biz\nmyftp.org\nmyvnc.com\nno-ip.biz\nno-ip.info\nno-ip.org\nnoip.me\nredirectme.net\nservebeer.com\nserveblog.net\nservecounterstrike.com\nserveftp.com\nservegame.com\nservehalflife.com\nservehttp.com\nserveirc.com\nserveminecraft.net\nservemp3.com\nservepics.com\nservequake.com\nsytes.net\nwebhop.me\nzapto.org\n\n// NodeArt : https://nodeart.io\n// Submitted by Konstantin Nosov <Nosov@nodeart.io>\nstage.nodeart.io\n\n// Nodum B.V. : https://nodum.io/\n// Submitted by Wietse Wind <hello+publicsuffixlist@nodum.io>\nnodum.co\nnodum.io\n\n// Nucleos Inc. : https://nucleos.com\n// Submitted by Piotr Zduniak <piotr@nucleos.com>\npcloud.host\n\n// NYC.mn : http://www.information.nyc.mn\n// Submitted by Matthew Brown <mattbrown@nyc.mn>\nnyc.mn\n\n// NymNom : https://nymnom.com/\n// Submitted by Dave McCormack <dave.mccormack@nymnom.com>\nnom.ae\nnom.af\nnom.ai\nnom.al\nnym.by\nnym.bz\nnom.cl\nnom.gd\nnom.ge\nnom.gl\nnym.gr\nnom.gt\nnym.gy\nnom.hn\nnym.ie\nnom.im\nnom.ke\nnym.kz\nnym.la\nnym.lc\nnom.li\nnym.li\nnym.lt\nnym.lu\nnym.me\nnom.mk\nnym.mn\nnym.mx\nnom.nu\nnym.nz\nnym.pe\nnym.pt\nnom.pw\nnom.qa\nnym.ro\nnom.rs\nnom.si\nnym.sk\nnom.st\nnym.su\nnym.sx\nnom.tj\nnym.tw\nnom.ug\nnom.uy\nnom.vc\nnom.vg\n\n// Octopodal Solutions, LLC. : https://ulterius.io/\n// Submitted by Andrew Sampson <andrew@ulterius.io>\ncya.gg\n\n// Omnibond Systems, LLC. : https://www.omnibond.com\n// Submitted by Cole Estep <cole@omnibond.com>\ncloudycluster.net\n\n// One Fold Media : http://www.onefoldmedia.com/\n// Submitted by Eddie Jones <eddie@onefoldmedia.com>\nnid.io\n\n// OpenCraft GmbH : http://opencraft.com/\n// Submitted by Sven Marnach <sven@opencraft.com>\nopencraft.hosting\n\n// Opera Software, A.S.A.\n// Submitted by Yngve Pettersen <yngve@opera.com>\noperaunite.com\n\n// OutSystems\n// Submitted by Duarte Santos <domain-admin@outsystemscloud.com>\noutsystemscloud.com\n\n// OwnProvider GmbH: http://www.ownprovider.com\n// Submitted by Jan Moennich <jan.moennich@ownprovider.com>\nownprovider.com\nown.pm\n\n// OX : http://www.ox.rs\n// Submitted by Adam Grand <webmaster@mail.ox.rs>\nox.rs\n\n// oy.lc\n// Submitted by Charly Coste <changaco@changaco.oy.lc>\noy.lc\n\n// Pagefog : https://pagefog.com/\n// Submitted by Derek Myers <derek@pagefog.com>\npgfog.com\n\n// Pagefront : https://www.pagefronthq.com/\n// Submitted by Jason Kriss <jason@pagefronthq.com>\npagefrontapp.com\n\n// .pl domains (grandfathered)\nart.pl\ngliwice.pl\nkrakow.pl\npoznan.pl\nwroc.pl\nzakopane.pl\n\n// Pantheon Systems, Inc. : https://pantheon.io/\n// Submitted by Gary Dylina <gary@pantheon.io>\npantheonsite.io\ngotpantheon.com\n\n// Peplink | Pepwave : http://peplink.com/\n// Submitted by Steve Leung <steveleung@peplink.com>\nmypep.link\n\n// Planet-Work : https://www.planet-work.com/\n// Submitted by Fr\u00E9d\u00E9ric VANNI\u00C8RE <f.vanniere@planet-work.com>\non-web.fr\n\n// Platform.sh : https://platform.sh\n// Submitted by Nikola Kotur <nikola@platform.sh>\n*.platform.sh\n*.platformsh.site\n\n// prgmr.com : https://prgmr.com/\n// Submitted by Sarah Newman <owner@prgmr.com>\nxen.prgmr.com\n\n// priv.at : http://www.nic.priv.at/\n// Submitted by registry <lendl@nic.at>\npriv.at\n\n// Protonet GmbH : http://protonet.io\n// Submitted by Martin Meier <admin@protonet.io>\nprotonet.io\n\n// Publication Presse Communication SARL : https://ppcom.fr\n// Submitted by Yaacov Akiba Slama <admin@chirurgiens-dentistes-en-france.fr>\nchirurgiens-dentistes-en-france.fr\nbyen.site\n\n// Russian Academy of Sciences\n// Submitted by Tech Support <support@rasnet.ru>\nras.ru\n\n// QA2\n// Submitted by Daniel Dent (https://www.danieldent.com/)\nqa2.com\n\n// QNAP System Inc : https://www.qnap.com\n// Submitted by Nick Chang <nickchang@qnap.com>\ndev-myqnapcloud.com\nalpha-myqnapcloud.com\nmyqnapcloud.com\n\n// Quip : https://quip.com\n// Submitted by Patrick Linehan <plinehan@quip.com>\n*.quipelements.com\n\n// Qutheory LLC : http://qutheory.io\n// Submitted by Jonas Schwartz <jonas@qutheory.io>\nvapor.cloud\nvaporcloud.io\n\n// Rackmaze LLC : https://www.rackmaze.com\n// Submitted by Kirill Pertsev <kika@rackmaze.com>\nrackmaze.com\nrackmaze.net\n\n// Red Hat, Inc. OpenShift : https://openshift.redhat.com/\n// Submitted by Tim Kramer <tkramer@rhcloud.com>\nrhcloud.com\n\n// Resin.io : https://resin.io\n// Submitted by Tim Perry <tim@resin.io>\nresindevice.io\ndevices.resinstaging.io\n\n// RethinkDB : https://www.rethinkdb.com/\n// Submitted by Chris Kastorff <info@rethinkdb.com>\nhzc.io\n\n// Revitalised Limited : http://www.revitalised.co.uk\n// Submitted by Jack Price <jack@revitalised.co.uk>\nwellbeingzone.eu\nptplus.fit\nwellbeingzone.co.uk\n\n// Sandstorm Development Group, Inc. : https://sandcats.io/\n// Submitted by Asheesh Laroia <asheesh@sandstorm.io>\nsandcats.io\n\n// SBE network solutions GmbH : https://www.sbe.de/\n// Submitted by Norman Meilick <nm@sbe.de>\nlogoip.de\nlogoip.com\n\n// schokokeks.org GbR : https://schokokeks.org/\n// Submitted by Hanno B\u00F6ck <hanno@schokokeks.org>\nschokokeks.net\n\n// Scry Security : http://www.scrysec.com\n// Submitted by Shante Adam <shante@skyhat.io>\nscrysec.com\n\n// Securepoint GmbH : https://www.securepoint.de\n// Submitted by Erik Anders <erik.anders@securepoint.de>\nfirewall-gateway.com\nfirewall-gateway.de\nmy-gateway.de\nmy-router.de\nspdns.de\nspdns.eu\nfirewall-gateway.net\nmy-firewall.org\nmyfirewall.org\nspdns.org\n\n// SensioLabs, SAS : https://sensiolabs.com/\n// Submitted by Fabien Potencier <fabien.potencier@sensiolabs.com>\n*.s5y.io\n*.sensiosite.cloud\n\n// Service Online LLC : http://drs.ua/\n// Submitted by Serhii Bulakh <support@drs.ua>\nbiz.ua\nco.ua\npp.ua\n\n// ShiftEdit : https://shiftedit.net/\n// Submitted by Adam Jimenez <adam@shiftcreate.com>\nshiftedit.io\n\n// Shopblocks : http://www.shopblocks.com/\n// Submitted by Alex Bowers <alex@shopblocks.com>\nmyshopblocks.com\n\n// SinaAppEngine : http://sae.sina.com.cn/\n// Submitted by SinaAppEngine <saesupport@sinacloud.com>\n1kapp.com\nappchizi.com\napplinzi.com\nsinaapp.com\nvipsinaapp.com\n\n// Skyhat : http://www.skyhat.io\n// Submitted by Shante Adam <shante@skyhat.io>\nbounty-full.com\nalpha.bounty-full.com\nbeta.bounty-full.com\n\n// staticland : https://static.land\n// Submitted by Seth Vincent <sethvincent@gmail.com>\nstatic.land\ndev.static.land\nsites.static.land\n\n// SourceLair PC : https://www.sourcelair.com\n// Submitted by Antonis Kalipetis <akalipetis@sourcelair.com>\napps.lair.io\n*.stolos.io\n\n// SpaceKit : https://www.spacekit.io/\n// Submitted by Reza Akhavan <spacekit.io@gmail.com>\nspacekit.io\n\n// SpeedPartner GmbH: https://www.speedpartner.de/\n// Submitted by Stefan Neufeind <info@speedpartner.de>\ncustomer.speedpartner.de\n\n// Storj Labs Inc. : https://storj.io/\n// Submitted by Philip Hutchins <hostmaster@storj.io>\nstorj.farm\n\n// Studenten Net Twente : http://www.snt.utwente.nl/\n// Submitted by Silke Hofstra <syscom@snt.utwente.nl>\nutwente.io\n\n// Sub 6 Limited: http://www.sub6.com\n// Submitted by Dan Miller <dm@sub6.com>\ntemp-dns.com\n\n// Synology, Inc. : https://www.synology.com/\n// Submitted by Rony Weng <ronyweng@synology.com>\ndiskstation.me\ndscloud.biz\ndscloud.me\ndscloud.mobi\ndsmynas.com\ndsmynas.net\ndsmynas.org\nfamilyds.com\nfamilyds.net\nfamilyds.org\ni234.me\nmyds.me\nsynology.me\nvpnplus.to\n\n// TAIFUN Software AG : http://taifun-software.de\n// Submitted by Bjoern Henke <dev-server@taifun-software.de>\ntaifun-dns.de\n\n// TASK geographical domains (www.task.gda.pl/uslugi/dns)\ngda.pl\ngdansk.pl\ngdynia.pl\nmed.pl\nsopot.pl\n\n// The Gwiddle Foundation : https://gwiddlefoundation.org.uk\n// Submitted by Joshua Bayfield <joshua.bayfield@gwiddlefoundation.org.uk>\ngwiddle.co.uk\n\n// Thingdust AG : https://thingdust.com/\n// Submitted by Adrian Imboden <adi@thingdust.com>\ncust.dev.thingdust.io\ncust.disrec.thingdust.io\ncust.prod.thingdust.io\ncust.testing.thingdust.io\n\n// TownNews.com : http://www.townnews.com\n// Submitted by Dustin Ward <dward@townnews.com>\nbloxcms.com\ntownnews-staging.com\n\n// TrafficPlex GmbH : https://www.trafficplex.de/\n// Submitted by Phillipp R\u00F6ll <phillipp.roell@trafficplex.de>\n12hp.at\n2ix.at\n4lima.at\nlima-city.at\n12hp.ch\n2ix.ch\n4lima.ch\nlima-city.ch\ntrafficplex.cloud\nde.cool\n12hp.de\n2ix.de\n4lima.de\nlima-city.de\n1337.pictures\nclan.rip\nlima-city.rocks\nwebspace.rocks\nlima.zone\n\n// TransIP : https://www.transip.nl\n// Submitted by Rory Breuk <rbreuk@transip.nl>\n*.transurl.be\n*.transurl.eu\n*.transurl.nl\n\n// TuxFamily : http://tuxfamily.org\n// Submitted by TuxFamily administrators <adm@staff.tuxfamily.org>\ntuxfamily.org\n\n// TwoDNS : https://www.twodns.de/\n// Submitted by TwoDNS-Support <support@two-dns.de>\ndd-dns.de\ndiskstation.eu\ndiskstation.org\ndray-dns.de\ndraydns.de\ndyn-vpn.de\ndynvpn.de\nmein-vigor.de\nmy-vigor.de\nmy-wan.de\nsyno-ds.de\nsynology-diskstation.de\nsynology-ds.de\n\n// Uberspace : https://uberspace.de\n// Submitted by Moritz Werner <mwerner@jonaspasche.com>\nuber.space\n*.uberspace.de\n\n// UDR Limited : http://www.udr.hk.com\n// Submitted by registry <hostmaster@udr.hk.com>\nhk.com\nhk.org\nltd.hk\ninc.hk\n\n// United Gameserver GmbH : https://united-gameserver.de\n// Submitted by Stefan Schwarz <sysadm@united-gameserver.de>\nvirtualuser.de\nvirtual-user.de\n\n// .US\n// Submitted by Ed Moore <Ed.Moore@lib.de.us>\nlib.de.us\n\n// VeryPositive SIA : http://very.lv\n// Submitted by Danko Aleksejevs <danko@very.lv>\n2038.io\n\n// Viprinet Europe GmbH : http://www.viprinet.com\n// Submitted by Simon Kissel <hostmaster@viprinet.com>\nrouter.management\n\n// Virtual-Info : https://www.virtual-info.info/\n// Submitted by Adnan RIHAN <hostmaster@v-info.info>\nv-info.info\n\n// WeDeploy by Liferay, Inc. : https://www.wedeploy.com\n// Submitted by Henrique Vicente <security@wedeploy.com>\nwedeploy.io\nwedeploy.me\nwedeploy.sh\n\n// Western Digital Technologies, Inc : https://www.wdc.com\n// Submitted by Jung Jin <jungseok.jin@wdc.com>\nremotewd.com\n\n// Wikimedia Labs : https://wikitech.wikimedia.org\n// Submitted by Yuvi Panda <yuvipanda@wikimedia.org>\nwmflabs.org\n\n// XenonCloud GbR: https://xenoncloud.net\n// Submitted by Julian Uphoff <publicsuffixlist@xenoncloud.net>\nhalf.host\n\n// XnBay Technology : http://www.xnbay.com/\n// Submitted by XnBay Developer <developer.xncloud@gmail.com>\nxnbay.com\nu2.xnbay.com\nu2-local.xnbay.com\n\n// XS4ALL Internet bv : https://www.xs4all.nl/\n// Submitted by Daniel Mostertman <unixbeheer+publicsuffix@xs4all.net>\ncistron.nl\ndemon.nl\nxs4all.space\n\n// YesCourse Pty Ltd : https://yescourse.com\n// Submitted by Atul Bhouraskar <atul@yescourse.com>\nofficial.academy\n\n// Yola : https://www.yola.com/\n// Submitted by Stefano Rivera <stefano@yola.com>\nyolasite.com\n\n// Yombo : https://yombo.net\n// Submitted by Mitch Schwenk <mitch@yombo.net>\nybo.faith\nyombo.me\nhomelink.one\nybo.party\nybo.review\nybo.science\nybo.trade\n\n// Yunohost : https://yunohost.org\n// Submitted by Valentin Grimaud <security@yunohost.org>\nnohost.me\nnoho.st\n\n// ZaNiC : http://www.za.net/\n// Submitted by registry <hostmaster@nic.za.net>\nza.net\nza.org\n\n// Zeit, Inc. : https://zeit.domains/\n// Submitted by Olli Vanhoja <olli@zeit.co>\nnow.sh\n\n// Zone.id : https://zone.id/\n// Submitted by Su Hendro <admin@zone.id>\nzone.id\n\n// ===END PRIVATE DOMAINS===\n\n  ");
}

function endsWith(str, pattern) {
    return (str.lastIndexOf(pattern) === (str.length - pattern.length));
}
function shareSameDomainSuffix(hostname, vhost) {
    if (endsWith(hostname, vhost)) {
        return (hostname.length === vhost.length ||
            hostname[hostname.length - vhost.length - 1] === '.');
    }
    return false;
}
function extractDomainWithSuffix(hostname, publicSuffix) {
    var publicSuffixIndex = hostname.length - publicSuffix.length - 2;
    var lastDotBeforeSuffixIndex = hostname.lastIndexOf('.', publicSuffixIndex);
    if (lastDotBeforeSuffixIndex === -1) {
        return hostname;
    }
    return hostname.substr(lastDotBeforeSuffixIndex + 1);
}
function getDomain(suffix, hostname, options) {
    var validHosts = options.validHosts;
    for (var i = 0; i < validHosts.length; i += 1) {
        var vhost = validHosts[i];
        if (shareSameDomainSuffix(hostname, vhost)) {
            return vhost;
        }
    }
    if (suffix === null) {
        return null;
    }
    if (suffix.length === hostname.length) {
        return null;
    }
    return extractDomainWithSuffix(hostname, suffix);
}

function isProbablyIpv4(hostname) {
    var numberOfDots = 0;
    for (var i = 0; i < hostname.length; i += 1) {
        var code = hostname.charCodeAt(i);
        if (code === 46) {
            numberOfDots += 1;
        }
        else if (code < 48 || code > 57) {
            return false;
        }
    }
    return (numberOfDots === 3 &&
        hostname[0] !== '.' &&
        hostname[hostname.length - 1] !== '.');
}
function isProbablyIpv6(hostname) {
    var hasColon = false;
    for (var i = 0; i < hostname.length; i += 1) {
        var code = hostname.charCodeAt(i);
        if (code === 58) {
            hasColon = true;
        }
        else if (!((code >= 48 && code <= 57) ||
            (code >= 97 && code <= 102))) {
            return false;
        }
    }
    return hasColon;
}
function isIp(hostname) {
    return (isProbablyIpv6(hostname) || isProbablyIpv4(hostname));
}

var isValidIDNA = (function () {
    var lookup = new Uint8Array((new Uint32Array([
        ,
        67043328, 134217726, 134217726, , 69207040, 4286578687, 4286578687, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294964959, 4294705151, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 262083, 20511, 4294967295, 4294967295, 4294967295, 3168796671, 4294956864, 4294967291, 4294967295, 4290772991, 4294967295, 4294967295, 4294967295, 4294967295, 4294966523, 4294967295, 4294967295, 4294967295, 4294967295, 4294901759, 41943039, 4294967294, 4294836479, 3221225471, 4294901942, 460799, 134152192, 4294967295, 4294967295, 4294951935, 4294967295, 4294967295, 2683305983, 2684354047, 4294901760, 4294967295, 4294961151, 4294967295, 4294967295, 262143, 4294967295, 71303167, 4294967295, 16383, 268435455, 2047, , 1071644671, 4293918720, 4294967291, 4294967295, 4294967295, 4294967295, 4294901711, 4294549487, 4089839103, 2961209759, 268697551, 4294543342, 3547201023, 1577204103, 4194240, 4294688750, 4092460543, 80831, 4261478351, 4294549486, 4092460543, 2965387679, 196559, 3594373100, 3288319768, 8469959, 65472, 4294828015, 3825204735, 123747807, 65487, 4294828015, 4092591615, 1080049119, 458703, 4294828015, 4294967295, 2163244511, 4227923919, 4236247020, 805044223, 4284449919, 851904, 4294967294, 134217727, 67076095, , 4277151126, 1006628014, 4093591391, , 50331649, 3265266687, 4294967039, 4294844415, 4278190047, 536870911, 64, , 4294967295, 4294967295, 4294902783, 4294967295, 1073741823, 4294967295, 4294910143, 4160749567, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 1031749119, 4294967295, 4294917631, 2134769663, 4286578493, 4294967295, 4282253311, 4294967295, 3892314111, , 65535, 4294967295, 4294967295, 1061158911, 4294967294, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294942719, 134217726, 4294967295, 4294967295, 33425407, 2088959, 2097151, 1048575, 909311, 4294967295, 4294967295, 814743551, 1023, 67057664, 4294967295, 4294967295, 16777215, 4294967295, 4294903807, 4294967295, 4194303, 2147483647, 268374015, 4294967232, 2047999, 4294967295, 4294905855, 67044351, , 268435455, 4294967295, 2147483647, 2684354559, 67044351, 1073676416, , , 4294967295, 4294967295, 67047423, 1046528, 4294967295, 4294967295, 4294967295, 1048575, 4294967295, 16777215, 4294960127, 1073741823, 511, , 4294377472, 67108863, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4227858431, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 1061158911, 4294967295, 2868854591, 1073741823, 16711935, 1340014847, 265228252, 266084351, , , , 2147614720, 536805376, , 536805376, 131042, 1043332228, 4093623632, 17376, , 24, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294934527, 2147483647, 4294967295, 4294967295, 4294967295, 4294967295, 1046559, 4294967295, 4294910143, 4294967295, 2147516671, 8388607, 2139062143, 2139062143, 4294967295, , 32768, , , , , , , , , , , , , , , 224, 406780928, 4294967294, 4294967295, 3867148287, 4294967294, 4294967295, 4294967295, 4294967264, 4294868991, 4294967295, 4294967295, 32767, 134217727, , 4294901760, , , , , , , , , , , , , , , , , 1, , 128, 524288, , , , , , , , , 1073741824, , , , 67125248, , , , , , , , , , , , , , , , , , , , , , , , 16777216, , , 16384, , , 2147581952, , , , , 524288, , , , , , , 16384, , , , , , , , , 16384, , , , 1, , , , , , , , , , , , , , , , , , , , , , , , , , , 4194304, , , , , , , , 2147483648, , , , , , , , , , , , , , , 8388608, , , , 135168, 536870912, , , , , , , , 4194304, , , , , , , , , , , , 4096, 2, , , , , , 520, , 268435456, 8192, , , , , , , , , , , , , , 128, 603979776, 2281701484, 12582912, , , , , , , , , , , , , , , , , , , , , , 8388608, 2147483648, 15, , , 66584576, , , , , 2113536, , , 4294705151, 4294966783, 4294967295, 4261412607, 4290772991, 4026531831, 4294963199, 2835349375, 4290772863, 4284350207, 4294967278, 4294836223, 4294946815, 3758096379, 4294962879, 3489660923, 4294901759, 3740270591, 4277927931, 4026531839, 2138570749, 4261412860, 2130706423, 4285528057, 4160749567, 4294964991, 4277631995, 3220963310, 4294950887, 4211073013, 2146697211, 4294684671, 4294967295, 4294967295, 4294443007, 4261412799, 4294950879, 4294967279, 4293766895, 4294950877, 3070230503, 4288413055, 3623878651, 4294957823, 4294967294, 4227822589, 2617212895, 2147483519, 4227858430, 4294967291, 3758092287, 4294966783, 4294966271, 4292870143, 4294967295, 4290772991, 4242538495, 4294967295, 4294967167, 4227858430, 4294967295, 4294967295, 4294967295, 4278190078, 4294964191, 4018141182, 2143156207, 3755999229, 3217028351, 4227858431, 4261380095, 3871342527, 4286447583, 3758096365, 4271898359, 4278173687, 4290772861, 4294967039, 3078487039, 4294967295, 4269801471, 4294967295, 4290707455, 4286578494, 4292870143, 4288674815, 4294893542, 4292870077, 4294311645, 4290248695, 4127195135, 4294967295, 4294967295, 4286578687, 4294967295, 4294967167, 4294967295, 4294897583, 4260364287, 4294803455, 4294958975, 4294965247, 4294443007, 4294868991, 4294958079, 4261412863, 4294672319, 3187638268, 4294901695, 4017880575, 4219469567, 4294967295, 4160749566, 4290772407, 4227858431, 4294967295, 4294967263, 4260364287, 3755999230, 4292870143, 4294967295, 4160714751, 4286054399, 4294967294, 4290772983, 4260886503, 3951034351, 4290772991, 4294705151, 2147483647, 4294835967, 4294967295, 4294705151, 4227858431, 4294967294, 4261410815, 4294950911, 3623878655, 4294967295, 4294967295, 4227825663, 4294901735, 2013249531, 4026527739, 4294967295, 4294967287, 4290772991, 4293787645, 4294311935, 4294967263, 3216769023, 3758096351, 3221094267, 4241883135, 4294967295, 1476395006, 4018143167, 4127195135, 4292345855, 4294930431, 4294967263, 4259315711, 4286578687, 4294967295, 3758088191, 4294967231, 3221225471, 4294966271, 4286577663, 4284350463, 4160749567, 2147483647, 4294440959, 4294967295, 4294836223, 4294967295, 4294967167, 3892314111, 4227857919, 3221225471, 4294967231, 4290740221, 4292869887, 4259299295, 2147482619, 4294967039, 2080374778, 3758088191, 4227857407, 3219128319, 4009622783, 1040186351, 3212836863, 4135579647, 4294958847, 4294967286, 2952527871, 4294955007, 2138505215, 4294934527, 4261412731, 4294966767, 4294967295, 4294967167, 4290772735, 1610612735, 4284481535, 4261412863, 4292870141, 4294901631, 3137339391, 4227858431, 4259315711, 4278190047, 4261412823, 4294967259, 4294966783, 3221225471, 4294959103, 4294967295, 2147483647, 4294967291, 4279894014, 4294967295, 4026531831, 4286578671, 4026006527, 4294885375, 3724508095, 3221094399, 4278189294, 4294966783, 4160733183, 4292853759, 3732930558, 3755847423, 4294967295, 4278190079, 4294967295, 4226678271, 4026530815, 3992969215, 4294967263, 4294946815, 4294967295, 4294967294, 4278190079, 4293918719, 4026531835, 4294967279, 4294967295, 4294836223, 4290772989, 4290576383, 4294967295, 1073741823, 4277927865, 4294966271, 4294963199, 3288330239, 4292868095, 4294967295, 4160749567, 4294967287, 4294965231, 4294967295, 4294966011, 4261412863, 2063597567, 4286578687, 4294377439, 3755999231, 4294377471, 4294967295, 4294948735, 4159963135, 4152352765, 4290509823, 4292870143, 3221225471, 4294967039, 4293394415, 4286578687, 4294957055, 4290764799, 4290770879, 4294438911, 4227334143, 4284348414, 4293885902, 4292788191, 4294967295, 4294967295, 3221223423, 4294967295, 4294967295, 4294901755, 4294967039, 4294443007, 4294967295, 4026531839, 4294967295, 4294967293, 4160225261, 4278190079, 3187671039, 4278189439, 4160749567, 3753902063, 4294967295, 4294962303, 4294965247, 4294967295, 4293918718, 3218866173, 4093509629, 4294967263, 4286578175, 4026531839, 4294950911, 4294967295, 4294963199, 4292722639, 4294443007, 4294959103, 4290248409, 4261406717, 4294965247, 4294950906, 2147481597, 4294967291, 4294967279, 4290772991, 3221225455, 3757834237, 4291821487, 4294967167, 4290772975, 4294932411, 4290772991, 4294967039, 4294967295, 4294705019, 4278124543, 2145378046, 4290510846, 4261412863, 4288655359, 3221225279, 4026531327, 4285525871, 4294967295, 4294966653, 4206882815, 4294967295, 4294933487, 4093640699, 3321888767, 4286578619, 4024434175, 2147483519, 4294966655, 4294443003, 4294934527, 4294967295, 4294639575, 4294967295, 4227858431, 4160749567, 4294918143, 3755737087, 4290772991, 4227334015, 4294963199, 4093116415, 1879048085, 4294967295, 4294958071, 4227849983, 4278190063, 4276092923, 4294967023, 4294434815, 536868831, 4278190079, 4294967295, 4160749567, 4294967279, 3758096383, 4294967295, 4294967295, 4294967295, 4294967295, 3892314111, 4261412797, 4294967295, 4252958703, 4293918719, 3753902079, 4294967279, 4294966271, 4026499071, 4294967294, 4294967231, 4293902079, 4260888127, 2147483647, 4294967295, 4286578663, 4291821567, 4294967295, 4294967295, 4290707439, 4294967295, 4294965247, 4294868975, 4294443007, 4294967279, 4294967293, 4294967263, 4294963199, 4294705151, 4294967295, 4026531835, 4294900735, 4294901759, 4292870143, 4294967295, 4294967295, 3221225471, 4294967295, 4294959039, 2133852159, 4294967295, 4278190079, 4294967295, 4292870135, 4286578687, 4294967287, 4294959103, 4294901727, 4294180863, 4294897663, 2147483647, 4294443007, 4160487423, 4294963199, 4025991167, 3755909111, 4286578687, 4286578687, 4292870143, 4294704639, 4294967230, 4292870143, 3758096254, 3758096383, 3758063615, 4294967263, 4294836223, 4261396479, 4294967295, 4227858431, 4294901759, 4294705023, 4227850239, 1862270847, 4227858431, 4294967295, 4294967295, 4294967295, 4294958527, 4294934519, 4294967279, 4294967295, 3755999199, 4260290559, 3891199999, 4294967295, 3722428415, 4260364191, 3758094332, 4294965247, 3741319151, 2147483391, 4286545919, 4294901759, 4294963199, 4294967295, 2130443775, 4294967295, 4024434169, 4160708477, 4294967295, 4294967295, 4294967295, 4294967295, 4278190079, 4277272558, 2146435071, 4160747383, 4294967231, 4273993727, 4286578175, 4294574077, 4294967295, 4294967295, 4026531839, 4294967295, 4294967231, 4294967294, 4294967263, 4294965245, 4294705151, 4294934463, 4250910719, 4160749567, 4281860091, 4261412845, 4294901759, 4294934527, 4227850239, 4294967293, 4294967295, 3758096383, 4294442991, 4294966263, 4294967167, 4294967295, 4286573567, 4294967230, 4294967295, 4294967295, 4294965247, 4294692863, 4290772991, 4294966271, 3489660927, 4261412863, 4160749567, 4276092927, 2147483135, 4294967279, 4294934526, 2146959359, 4294967291, 4294967287, 4294965759, 3221225453, 3758096383, 4159700991, 4294967291, 4026531839, 4294770687, 4294967295, 2130147067, 4026529789, 4160747518, 4294967295, 4294443006, 796917755, 4294967279, 4294950903, 4160745471, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 3170893823, 4286578655, 4276617215, 3724541949, 4294967295, 4294967295, 3221224863, 4282384383, 1979711487, 1539305465, 4292835327, 4294967295, 4026531631, 4084203519, 4285005823, 4286570492, 4292870135, 4160748927, 3218931199, 4294705150, 4026531839, 2147483647, 3153591263, 4290772859, 4294966975, 4294967295, 4286578687, 4294966143, 4143837165, 4261412863, 4160749567, 3690979311, 4294967295, 4294967295, 2147483647, 4294967295, 4292868030, 4269735935, 4160749567, 3741188095, 4294967287, 4294967295, 3758095871, 4286578431, 4294900974, 4159700474, 3757047807, 4286513150, 4294705147, 4261408255, 4294967295, 4294967291, 4290772991, 4294967284, 4294967295, 4294803451, 4160749549, 4294967295, 4294967295, 4294967295, 4294967295, 4294823935, 4024434559, 4294967295, 4294959103, 4292870143, 3758079999, 4294967294, 4026530815, 4022321151, 4294967295, 4294967295, 4160749567, 3204349951, 4294830075, 4294967295, 4294832127, 4293787639, 4294967231, 4294442975, 4294959103, 4294967295, 53, , 1024, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 8191, , 4294901760, 1073741823, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294909951, 4095, 4294967295, 3220242431, 4294967295, 4294967295, 4294967295, 196671, 4286578688, 4294967292, 4294967295, 4294967295, 4294965759, 16744447, , 4286578688, 4294967295, 255, 4294967295, 1048575, 4294967295, 4294967295, 67043391, 687865855, 4294967295, 4294918143, 1048575, 536870911, 4294967295, 4294967295, 67076097, 2147483647, 4294967295, 8388607, 67059711, 4236247039, 4294967295, 4294967295, 939524103, 8191999, 8289918, 4294934399, 4160749567, 4294901823, 4294967295, 4294967295, 4294967295, 67057663, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294901775, 4294965375, 268435455, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294918143, 4294967295, 4294967295, 67108863, , 3774349439, 1602223615, 4294967259, 4294967295, 4294967295, 262143, 4294443008, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 1073741823, 4294901760, 4294967295, 4294770687, 4294967295, 255, 268369920, 65535, 65535, , 4292804608, 4294967295, 4294967295, 4294967295, 536870911, 67043328, 134217726, 134217726, 4294967232, 4294967295, 2147483647, 486341884, , 4294963199, 3087007615, 1073692671, , 4294967295, 4294967295, 4294967295, 134217727, , , , , , , , 536870912, , , , , 536870911, 4294967295, 131071, 1, 4294967295, 4294959104, 4294902781, 134217727, 1073741823, 4294967295, 65295, , 4294967295, 4294967295, 4294967295, 4294967295, 1073741823, 4294902783, 4279238655, 268435455, 4294967295, 4294902015, 4294967295, 15, , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 8388607, 4194303, 255, , , , , 4294966591, 2445279231, 4194303, 8388607, 2147483647, , , 3670015, 4194303, 67108863, , , 4294967295, 3238002687, , , 4277137519, 2265972735, , 536870911, 536870911, , 4294967039, 127, 4294967295, 4194303, 4194303, 524287, 262143, , , , 4294967295, 4294967295, 511, , 4294967295, 524287, 4294967295, 524287, , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 127, 2147549120, 4294967295, 134217727, 4294901760, 67043839, 4294967295, 4292870143, 4294901760, 5242879, 4294967295, 4294967295, 402594847, , 4294705151, 1090519039, , , 3221208447, 4294902271, 4294967295, 67045375, 4294549487, 4092460543, 3766565279, 2039759, , , , , 4294967295, 4294967295, 67045375, , 4294967295, 4294967295, 67043519, , , , , , 4294967295, 4282384383, 1056964609, , 4294967295, 4294967295, 67043345, , 4294967295, 16777215, 1023, , 3825205247, 67047423, , , , , , , , , , , , 4294967295, 4294967295, 2147484671, , , , , , , , , 4294967295, 2147483647, 4294901888, 4294967295, 67108815, , 4294967295, 33554431, , , , , , , , , 4294966783, 4286578687, 67043329, 4294705152, 4294770687, 8388351, , , 4294966143, 3028287487, 67043583, , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 67108863, , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 15, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 32767, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 127, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 33554431, 2147483647, 1023, , , 4294901760, 2047999, 4294967295, 8388607, 67043343, 3774873592, 65535, , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294901791, 2147483647, 4294934528, , , 3, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4096, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 524287, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 2147483647, , , 4294901760, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 268435455, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 536807423, 1677656575, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4161266656, 4071, 15360, , , , , 28, , , , , , , , , , , , , , 4294967295, 4294967295, 4292870143, 4294967295, 3758096383, 3959414372, 4294967279, 4294967295, 3755993023, 2080374783, 4294835295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967103, 4160749565, 4160749567, 4292870143, 4292870143, 4294934527, 4294934527, 4294966783, 4294966783, 4294954999, 4294967295, , , , , , , , , , , , , , , , , 4294967295, 4169138175, 4294967295, 2105343, 4160749584, 65534, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4194303871, 2011, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 8323103, , 4294967295, 4294967295, 67045375, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967279, 184024726, 2862017156, 1593309078, 268434431, 268434414, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4194304, , 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 1048576, 1, , , , , , 536870912, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 65538, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 4294967295, 1073741823, , ,
    ].map(function (x) { return x === undefined ? 0 : x; }))).buffer);
    return function (x) { return ((x > 917759 && x < 918000) ||
        (x < 195102 && (lookup[x >>> 3] & (1 << (x % 8))) !== 0)); };
})();

function containsUnderscore(hostname) {
    return hostname.indexOf('_') !== -1;
}
function isValidHostname(hostname) {
    if (hostname.length > 255) {
        return false;
    }
    if (hostname.length === 0) {
        return false;
    }
    var firstCharCode = hostname.codePointAt(0);
    if (firstCharCode === undefined) {
        return false;
    }
    if (!isValidIDNA(firstCharCode)) {
        return false;
    }
    var lastDotIndex = -1;
    var lastCharCode;
    var len = hostname.length;
    for (var i = 0; i < len; i += 1) {
        var code = hostname.codePointAt(i);
        if (code === undefined) {
            return false;
        }
        else if (code === 46) {
            if ((i - lastDotIndex) > 64 ||
                lastCharCode === 46 ||
                lastCharCode === 45 ||
                lastCharCode === 95) {
                return false;
            }
            lastDotIndex = i;
        }
        else if (!(isValidIDNA(code) || code === 45 || code === 95)) {
            return false;
        }
        lastCharCode = code;
    }
    return ((len - lastDotIndex - 1) <= 63 &&
        lastCharCode !== 45);
}
function isValid(hostname, options) {
    return (isValidHostname(hostname) && (options.strictHostnameValidation === false || !containsUnderscore(hostname)));
}

function trimTrailingDots(value) {
    if (value[value.length - 1] === '.') {
        return value.slice(0, value.length - 1);
    }
    return value;
}
function isTrimmingNeeded(value) {
    return (value.length > 0 && (value.charCodeAt(0) <= 32 ||
        value.charCodeAt(value.length - 1) <= 32));
}
function isSchemeChar(code) {
    var lowerCaseCode = code | 32;
    return ((lowerCaseCode >= 97 && lowerCaseCode <= 122) ||
        (lowerCaseCode >= 48 && lowerCaseCode <= 57) ||
        lowerCaseCode === 46 ||
        lowerCaseCode === 45 ||
        lowerCaseCode === 43);
}
function extractHostname(url, options) {
    if (isTrimmingNeeded(url)) {
        url = url.trim();
    }
    if (isValid(url, options)) {
        return trimTrailingDots(url);
    }
    var start = 0;
    var end = url.length;
    if (startsWith(url, '//')) {
        start = 2;
    }
    else {
        var indexOfProtocol = url.indexOf('://');
        if (indexOfProtocol !== -1) {
            start = indexOfProtocol + 3;
            for (var i = 0; i < indexOfProtocol; i += 1) {
                if (!isSchemeChar(url.charCodeAt(i))) {
                    return null;
                }
            }
        }
    }
    var indexOfSlash = url.indexOf('/', start);
    if (indexOfSlash !== -1) {
        end = indexOfSlash;
    }
    var indexOfParams = url.indexOf('?', start);
    if (indexOfParams !== -1 && indexOfParams < end) {
        end = indexOfParams;
    }
    var indexOfFragments = url.indexOf('#', start);
    if (indexOfFragments !== -1 && indexOfFragments < end) {
        end = indexOfFragments;
    }
    var indexOfIdentifier = url.indexOf('@', start);
    if (indexOfIdentifier !== -1 && indexOfIdentifier < end) {
        start = indexOfIdentifier + 1;
    }
    if (url.charAt(start) === '[') {
        var indexOfClosingBracket = url.indexOf(']', start);
        if (indexOfClosingBracket !== -1) {
            return url.slice(start + 1, indexOfClosingBracket);
        }
        return null;
    }
    else {
        var indexOfPort = url.indexOf(':', start);
        if (indexOfPort !== -1 && indexOfPort < end) {
            end = indexOfPort;
        }
    }
    return trimTrailingDots(url.slice(start, end));
}

var defaultOptions = {
    allowIcannDomains: true,
    allowPrivateDomains: false,
    extractHostname: extractHostname,
    strictHostnameValidation: false,
    validHosts: []
};
function setDefaults(options) {
    if (options === undefined) {
        return defaultOptions;
    }
    return Object.assign({}, defaultOptions, options);
}

function extractTldFromHost(hostname) {
    var lastDotIndex = hostname.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return null;
    }
    return hostname.substr(lastDotIndex + 1);
}

function getPublicSuffix(rules, hostname, options) {
    if (rules.hasTld(hostname)) {
        return {
            isIcann: false,
            isPrivate: false,
            publicSuffix: hostname
        };
    }
    var candidate = rules.suffixLookup(hostname, options);
    if (candidate === null) {
        return {
            isIcann: false,
            isPrivate: false,
            publicSuffix: extractTldFromHost(hostname)
        };
    }
    return candidate;
}

function getSubdomain(hostname, domain) {
    if (domain === null) {
        return null;
    }
    return hostname.substr(0, hostname.length - domain.length - 1);
}

function parseImplFactory(trie) {
    if (trie === void 0) { trie = getRules(); }
    return function (url, partialOptions, step) {
        if (step === void 0) { step = 4; }
        var options = setDefaults(partialOptions);
        var result = {
            domain: null,
            host: null,
            isIcann: null,
            isIp: false,
            isPrivate: null,
            isValid: null,
            publicSuffix: null,
            subdomain: null
        };
        var host = options.extractHostname(url, options);
        if (host === null) {
            result.isIp = false;
            result.isValid = false;
            return result;
        }
        result.host = host.toLowerCase();
        result.isIp = isIp(result.host);
        if (result.isIp) {
            result.isValid = true;
            return result;
        }
        result.isValid = isValid(result.host, options);
        if (result.isValid === false) {
            return result;
        }
        if (step === 0) {
            return result;
        }
        var publicSuffixResult = getPublicSuffix(trie, result.host, options);
        result.publicSuffix = publicSuffixResult.publicSuffix;
        result.isPrivate = publicSuffixResult.isPrivate;
        result.isIcann = publicSuffixResult.isIcann;
        if (step === 1) {
            return result;
        }
        result.domain = getDomain(result.publicSuffix, result.host, options);
        if (step === 2) {
            return result;
        }
        result.subdomain = getSubdomain(result.host, result.domain);
        return result;
    };
}
var parseImpl = parseImplFactory();
function parse$1(url, options) {
    return parseImpl(url, options);
}
function getPublicSuffix$1(url, options) {
    return parseImpl(url, options, 1).publicSuffix;
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

function processRawRequest(request) {
    var url = request.url.toLowerCase();
    var _a = parse$1(url), host = _a.host, domain = _a.domain;
    var sourceUrl = request.sourceUrl;
    var sourceHostname = '';
    var sourceDomain = '';
    if (sourceUrl) {
        sourceUrl = sourceUrl.toLowerCase();
        var sourceUrlParts = parse$1(sourceUrl);
        sourceHostname = sourceUrlParts.host || '';
        sourceDomain = sourceUrlParts.domain || '';
    }
    return mkRequest({
        cpt: request.cpt,
        sourceDomain: sourceDomain,
        sourceHostname: sourceHostname,
        domain: domain || '',
        hostname: host || '',
        url: url
    });
}

function fromString(str) {
    var res = new Uint8Array(str.length);
    var len = str.length;
    for (var i = 0; i < len; i += 1) {
        res[i] = str.charCodeAt(i);
    }
    return res;
}
function encode(s) {
    return fromString(unescape(encodeURIComponent(s)));
}
function decode$1(bytes) {
    return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
}

var DynamicDataView = (function () {
    function DynamicDataView(length) {
        this.buffer = new Uint8Array(length);
        this.pos = 0;
    }
    DynamicDataView.prototype.seek = function (pos) {
        if (pos === void 0) { pos = 0; }
        this.pos = pos;
    };
    DynamicDataView.prototype.crop = function () {
        return this.buffer.subarray(0, this.pos);
    };
    DynamicDataView.prototype.set = function (buffer) {
        this.buffer = new Uint8Array(buffer);
        this.seek(0);
    };
    DynamicDataView.prototype.pushBytes = function (bytes) {
        this.checkShouldResize(bytes.byteLength);
        this.buffer.set(bytes, this.pos);
        this.pos += bytes.byteLength;
    };
    DynamicDataView.prototype.pushByte = function (octet) {
        this.pushUint8(octet);
    };
    DynamicDataView.prototype.pushUint8 = function (uint8) {
        this.checkShouldResize(1);
        this.buffer[this.pos] = uint8;
        this.pos += 1;
    };
    DynamicDataView.prototype.pushUint16 = function (uint16) {
        this.checkShouldResize(2);
        this.buffer[this.pos] = uint16 >>> 8;
        this.buffer[this.pos + 1] = uint16;
        this.pos += 2;
    };
    DynamicDataView.prototype.pushUint32 = function (uint32) {
        this.checkShouldResize(4);
        this.buffer[this.pos] = uint32 >>> 24;
        this.buffer[this.pos + 1] = uint32 >>> 16;
        this.buffer[this.pos + 2] = uint32 >>> 8;
        this.buffer[this.pos + 3] = uint32;
        this.pos += 4;
    };
    DynamicDataView.prototype.pushUTF8 = function (str) {
        var buffer = encode(str);
        this.pushUint16(buffer.byteLength);
        this.pushBytes(buffer);
    };
    DynamicDataView.prototype.pushStr = function (str) {
        var originalPos = this.pos;
        var foundUnicode = false;
        this.checkShouldResize(2 + str.length);
        this.pushUint16(str.length);
        var offset = this.pos;
        var buffer = this.buffer;
        for (var i = 0; i < str.length && !foundUnicode; i += 1) {
            var ch = str.charCodeAt(i);
            buffer[offset + i] = ch;
            foundUnicode = foundUnicode || ch > 127;
        }
        if (foundUnicode) {
            this.pos = originalPos;
            this.pushUTF8(str);
        }
        else {
            this.pos += str.length;
        }
    };
    DynamicDataView.prototype.getBytes = function (n) {
        var bytes = this.buffer.subarray(this.pos, this.pos + n);
        this.pos += n;
        return bytes;
    };
    DynamicDataView.prototype.getByte = function () {
        return this.getUint8();
    };
    DynamicDataView.prototype.getUint8 = function () {
        var uint8 = this.buffer[this.pos];
        this.pos += 1;
        return uint8;
    };
    DynamicDataView.prototype.getUint16 = function () {
        var uint16 = ((this.buffer[this.pos] << 8) |
            this.buffer[this.pos + 1]) >>> 0;
        this.pos += 2;
        return uint16;
    };
    DynamicDataView.prototype.getUint32 = function () {
        var uint32 = (((this.buffer[this.pos] << 24) >>> 0) +
            ((this.buffer[this.pos + 1] << 16) |
                (this.buffer[this.pos + 2] << 8) |
                this.buffer[this.pos + 3])) >>> 0;
        this.pos += 4;
        return uint32;
    };
    DynamicDataView.prototype.getUTF8 = function () {
        return decode$1(this.getBytes(this.getUint16()));
    };
    DynamicDataView.prototype.getStr = function () {
        var originalPos = this.pos;
        var size = this.getUint16();
        var i = 0;
        for (; i < size && this.buffer[this.pos + i] <= 127; i += 1) {
        }
        if (i < size) {
            this.pos = originalPos;
            return this.getUTF8();
        }
        return String.fromCharCode.apply(null, this.getBytes(size));
    };
    DynamicDataView.prototype.checkShouldResize = function (n) {
        if (this.pos + n >= this.buffer.byteLength) {
            this.resize(n);
        }
    };
    DynamicDataView.prototype.resize = function (n) {
        if (n === void 0) { n = 0; }
        var newBuffer = new Uint8Array(Math.floor((this.pos + n) * 1.5));
        newBuffer.set(this.buffer);
        this.buffer = newBuffer;
    };
    return DynamicDataView;
}());

function serializeNetworkFilter(filter, buffer) {
    var numberOfOptionalParts = 0;
    if (filter.isRedirect()) {
        numberOfOptionalParts = 5;
    }
    else if (filter.hasOptNotDomains()) {
        numberOfOptionalParts = 4;
    }
    else if (filter.hasOptDomains()) {
        numberOfOptionalParts = 3;
    }
    else if (filter.hasFilter()) {
        numberOfOptionalParts = 2;
    }
    else if (filter.hasHostname()) {
        numberOfOptionalParts = 1;
    }
    buffer.pushUint8(numberOfOptionalParts);
    buffer.pushUint32(filter.mask);
    buffer.pushUint32(filter.id);
    if (numberOfOptionalParts === 0) {
        return;
    }
    buffer.pushStr(filter.hostname);
    if (numberOfOptionalParts === 1) {
        return;
    }
    buffer.pushStr(filter.filter);
    if (numberOfOptionalParts === 2) {
        return;
    }
    buffer.pushStr(filter.optDomains);
    if (numberOfOptionalParts === 3) {
        return;
    }
    buffer.pushStr(filter.optNotDomains);
    if (numberOfOptionalParts === 4) {
        return;
    }
    buffer.pushStr(filter.redirect);
}
function deserializeNetworkFilter(buffer) {
    var numberOfOptionalParts = buffer.getUint8();
    var mask = buffer.getUint32();
    var id = buffer.getUint32();
    var hostname = numberOfOptionalParts > 0 ? buffer.getStr() : '';
    var filter = numberOfOptionalParts > 1 ? buffer.getStr() : '';
    var optDomains = numberOfOptionalParts > 2 ? buffer.getStr() : '';
    var optNotDomains = numberOfOptionalParts > 3 ? buffer.getStr() : '';
    var redirect = numberOfOptionalParts > 4 ? buffer.getStr() : '';
    return new NetworkFilter({
        filter: filter,
        hostname: hostname,
        id: id,
        mask: mask,
        optDomains: optDomains,
        optNotDomains: optNotDomains,
        redirect: redirect
    });
}
function serializeCosmeticFilter(filter, buffer) {
    buffer.pushUint8(filter.mask);
    buffer.pushUint32(filter.id);
    buffer.pushStr(filter.selector);
    buffer.pushStr(filter.hostnames);
}
function deserializeCosmeticFilter(buffer) {
    var mask = buffer.getUint8();
    var id = buffer.getUint32();
    var selector = buffer.getStr();
    var hostnames = buffer.getStr();
    return new CosmeticFilter({
        hostnames: hostnames,
        id: id,
        mask: mask,
        selector: selector
    });
}
function serializeNetworkFilters(filters, buffer) {
    buffer.pushUint32(filters.length);
    for (var i = 0; i < filters.length; i += 1) {
        serializeNetworkFilter(filters[i], buffer);
    }
}
function serializeCosmeticFilters(filters, buffer) {
    buffer.pushUint32(filters.length);
    for (var i = 0; i < filters.length; i += 1) {
        serializeCosmeticFilter(filters[i], buffer);
    }
}
function deserializeNetworkFilters(buffer, allFilters) {
    var length = buffer.getUint32();
    var filters = [];
    for (var i = 0; i < length; i += 1) {
        var filter = deserializeNetworkFilter(buffer);
        filters.push(filter);
        allFilters.set(filter.id, filter);
    }
    return filters;
}
function deserializeCosmeticFilters(buffer, allFilters) {
    var length = buffer.getUint32();
    var filters = [];
    for (var i = 0; i < length; i += 1) {
        var filter = deserializeCosmeticFilter(buffer);
        filters.push(filter);
        allFilters.set(filter.id, filter);
    }
    return filters;
}
function serializeLists(buffer, lists) {
    buffer.pushUint8(lists.size);
    lists.forEach(function (list, asset) {
        buffer.pushStr(asset);
        buffer.pushStr(list.checksum);
        serializeCosmeticFilters(list.cosmetics, buffer);
        serializeNetworkFilters(list.exceptions, buffer);
        serializeNetworkFilters(list.filters, buffer);
        serializeNetworkFilters(list.importants, buffer);
        serializeNetworkFilters(list.redirects, buffer);
    });
}
function deserializeLists(buffer) {
    var lists = new Map();
    var networkFilters = new Map();
    var cosmeticFilters = new Map();
    var size = buffer.getUint8();
    for (var i = 0; i < size; i += 1) {
        lists.set(buffer.getStr(), {
            checksum: buffer.getStr(),
            cosmetics: deserializeCosmeticFilters(buffer, cosmeticFilters),
            exceptions: deserializeNetworkFilters(buffer, networkFilters),
            filters: deserializeNetworkFilters(buffer, networkFilters),
            importants: deserializeNetworkFilters(buffer, networkFilters),
            redirects: deserializeNetworkFilters(buffer, networkFilters)
        });
    }
    return {
        cosmeticFilters: cosmeticFilters,
        lists: lists,
        networkFilters: networkFilters
    };
}
function serializeBucket(token, filters, buffer) {
    buffer.pushUint16(filters.length);
    buffer.pushUint32(token);
    for (var i = 0; i < filters.length; i += 1) {
        buffer.pushUint32(filters[i].id);
    }
}
function deserializeBucket(buffer, filters) {
    var bucket = [];
    var length = buffer.getUint16();
    var token = buffer.getUint32();
    for (var i = 0; i < length; i += 1) {
        var id = buffer.getUint32();
        var filter = filters.get(id);
        if (filter !== undefined) {
            bucket.push(filter);
        }
    }
    return {
        bucket: {
            filters: bucket,
            hit: 0,
            optimized: false
        },
        token: token
    };
}
function serializeReverseIndex(reverseIndex, buffer) {
    var index = reverseIndex.index;
    var tokens = __spread(index.keys());
    buffer.pushUint32(reverseIndex.size);
    buffer.pushUint32(tokens.length);
    index.forEach(function (bucket, token) {
        serializeBucket(token, bucket.filters, buffer);
    });
}
function deserializeReverseIndex(buffer, index, filters) {
    var deserializedIndex = new Map();
    var size = buffer.getUint32();
    var numberOfTokens = buffer.getUint32();
    for (var i = 0; i < numberOfTokens; i += 1) {
        var _a = deserializeBucket(buffer, filters), token = _a.token, bucket = _a.bucket;
        deserializedIndex.set(token, bucket);
    }
    index.index = deserializedIndex;
    index.size = size;
    return index;
}
function serializeResources(engine, buffer) {
    buffer.pushStr(engine.resourceChecksum);
    buffer.pushUint8(engine.js.size);
    engine.js.forEach(function (resource, name) {
        buffer.pushStr(name);
        buffer.pushStr(resource);
    });
    buffer.pushUint8(engine.resources.size);
    engine.resources.forEach(function (_a, name) {
        var contentType = _a.contentType, data = _a.data;
        buffer.pushStr(name);
        buffer.pushStr(contentType);
        buffer.pushStr(data);
    });
}
function deserializeResources(buffer) {
    var js = new Map();
    var resources = new Map();
    var resourceChecksum = buffer.getStr();
    var jsSize = buffer.getUint8();
    for (var i = 0; i < jsSize; i += 1) {
        js.set(buffer.getStr(), buffer.getStr());
    }
    var resourcesSize = buffer.getUint8();
    for (var i = 0; i < resourcesSize; i += 1) {
        resources.set(buffer.getStr(), {
            contentType: buffer.getStr(),
            data: buffer.getStr()
        });
    }
    return {
        js: js,
        resourceChecksum: resourceChecksum,
        resources: resources
    };
}
function serializeEngine(engine) {
    var buffer = new DynamicDataView(4000000);
    buffer.pushUint8(engine.version);
    buffer.pushUint8(Number(engine.enableOptimizations));
    buffer.pushUint8(Number(engine.loadCosmeticFilters));
    buffer.pushUint8(Number(engine.loadNetworkFilters));
    buffer.pushUint8(Number(engine.optimizeAOT));
    serializeResources(engine, buffer);
    serializeLists(buffer, engine.lists);
    serializeReverseIndex(engine.filters.index, buffer);
    serializeReverseIndex(engine.exceptions.index, buffer);
    serializeReverseIndex(engine.importants.index, buffer);
    serializeReverseIndex(engine.redirects.index, buffer);
    serializeReverseIndex(engine.cosmetics.hostnameIndex, buffer);
    serializeReverseIndex(engine.cosmetics.selectorIndex, buffer);
    return buffer.crop();
}
function deserializeEngine(serialized, version) {
    var buffer = new DynamicDataView(0);
    buffer.set(serialized);
    var serializedEngineVersion = buffer.getUint8();
    if (version !== serializedEngineVersion) {
        throw new Error('serialized engine version mismatch');
    }
    var options = {
        enableOptimizations: Boolean(buffer.getUint8()),
        loadCosmeticFilters: Boolean(buffer.getUint8()),
        loadNetworkFilters: Boolean(buffer.getUint8()),
        optimizeAOT: Boolean(buffer.getUint8()),
        version: serializedEngineVersion
    };
    var engine = new FilterEngine(options);
    var _a = deserializeResources(buffer), js = _a.js, resources = _a.resources, resourceChecksum = _a.resourceChecksum;
    engine.js = js;
    engine.resources = resources;
    engine.resourceChecksum = resourceChecksum;
    var _b = deserializeLists(buffer), lists = _b.lists, networkFilters = _b.networkFilters, cosmeticFilters = _b.cosmeticFilters;
    engine.lists = lists;
    deserializeReverseIndex(buffer, engine.filters.index, networkFilters);
    deserializeReverseIndex(buffer, engine.exceptions.index, networkFilters);
    deserializeReverseIndex(buffer, engine.importants.index, networkFilters);
    deserializeReverseIndex(buffer, engine.redirects.index, networkFilters);
    deserializeReverseIndex(buffer, engine.cosmetics.hostnameIndex, cosmeticFilters);
    deserializeReverseIndex(buffer, engine.cosmetics.selectorIndex, cosmeticFilters);
    return engine;
}

function checkHostnamesPartialMatch(hostname, hostnamePattern) {
    var pattern = hostnamePattern;
    if (fastStartsWith(hostnamePattern, '~')) {
        pattern = pattern.substr(1);
    }
    if (hostname.endsWith(pattern)) {
        var patternIndex = hostname.length - pattern.length;
        if (patternIndex === 0 || hostname[patternIndex - 1] === '.') {
            return true;
        }
    }
    return false;
}
function matchHostname(hostname, hostnamePattern) {
    if (hostnamePattern.endsWith('.*')) {
        var entity = hostnamePattern.slice(0, -2);
        var publicSuffix = getPublicSuffix$1(hostname);
        if (!publicSuffix) {
            return false;
        }
        var hostnameWithoutSuffix = hostname.substr(0, hostname.length - publicSuffix.length - 1);
        if (hostnameWithoutSuffix.length > 0) {
            return checkHostnamesPartialMatch(hostnameWithoutSuffix, entity);
        }
        return false;
    }
    return checkHostnamesPartialMatch(hostname, hostnamePattern);
}
function matchCosmeticFilter(filter, hostname) {
    if (filter.hasHostnames() && hostname) {
        var hostnames = filter.getHostnames();
        for (var i = 0; i < hostnames.length; i += 1) {
            if (matchHostname(hostname, hostnames[i])) {
                return { hostname: hostnames[i] };
            }
        }
        return null;
    }
    return { hostname: '' };
}

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

var CosmeticFilterBucket = (function () {
    function CosmeticFilterBucket(filters) {
        this.hostnameIndex = new ReverseIndex(function (cb) { return filters(function (f) {
            if (f.hasHostnames()) {
                cb(f);
            }
        }); }, function (filter) {
            var multiTokens = [];
            filter.hostnames.split(',').forEach(function (h) {
                multiTokens.push(tokenize(h));
            });
            return multiTokens;
        });
        this.selectorIndex = new ReverseIndex(function (cb) { return filters(function (f) {
            if (f.hasHostnames()) {
                if (!(f.isScriptBlock() || f.isScriptInject())) {
                    cb(f);
                }
            }
        }); }, function (filter) { return filter.getTokens(); });
        this.size = this.hostnameIndex.size + this.selectorIndex.size;
    }
    CosmeticFilterBucket.prototype.createContentScriptResponse = function (rules) {
        var styles = [];
        var scripts = [];
        var blockedScripts = [];
        for (var i = 0; i < rules.length; i += 1) {
            var rule = rules[i];
            var selector = rule.getSelector();
            if (rule.isScriptBlock()) {
                blockedScripts.push(selector);
            }
            else if (rule.isScriptInject()) {
                scripts.push(selector);
            }
            else {
                styles.push(selector);
            }
        }
        return {
            active: true,
            blockedScripts: blockedScripts,
            scripts: scripts,
            styles: styles
        };
    };
    CosmeticFilterBucket.prototype.getDomainRules = function (hostname, js) {
        var rules = [];
        var checkMatch = function (rule) {
            var result = matchCosmeticFilter(rule, hostname);
            if (result !== null) {
                if (rule.isScriptInject()) {
                    var ruleWithScript = new CosmeticFilter(rule);
                    var scriptName = rule.getSelector();
                    var scriptArguments = [];
                    if (scriptName.indexOf(',') !== -1) {
                        var parts = scriptName.split(',');
                        scriptName = parts[0];
                        scriptArguments = parts.slice(1).map(function (s) { return s.trim(); });
                    }
                    var script = js.get(scriptName);
                    if (script !== undefined) {
                        for (var i = 0; i < scriptArguments.length; i += 1) {
                            script = script.replace("{{" + (i + 1) + "}}", scriptArguments[i]);
                        }
                        ruleWithScript.selector = script;
                        rules.push({
                            hostname: result.hostname,
                            rule: ruleWithScript
                        });
                    }
                }
                else {
                    rules.push({
                        hostname: result.hostname,
                        rule: rule
                    });
                }
            }
            return true;
        };
        this.hostnameIndex.iterMatchingFilters(tokenize(hostname), checkMatch);
        return this.filterExceptions(rules);
    };
    CosmeticFilterBucket.prototype.getMatchingRules = function (hostname, nodeInfo) {
        var tokens = new Set();
        for (var i = 0; i < nodeInfo.length; i += 1) {
            var node = nodeInfo[i];
            for (var j = 0; j < node.length; j += 1) {
                tokens.add(fastHash(node[j]));
            }
        }
        var rules = [];
        var checkMatch = function (rule) {
            var result = matchCosmeticFilter(rule, hostname);
            if (result !== null) {
                rules.push({
                    hostname: result.hostname,
                    rule: rule
                });
            }
            return true;
        };
        this.selectorIndex.iterMatchingFilters(__spread(tokens), checkMatch);
        return this.filterExceptions(rules);
    };
    CosmeticFilterBucket.prototype.filterExceptions = function (matches) {
        var matchingRules = new Map();
        for (var i = 0; i < matches.length; i += 1) {
            var _a = matches[i], rule = _a.rule, hostname = _a.hostname;
            var selector = rule.getSelector();
            var isException = fastStartsWith(hostname, '~');
            if (matchingRules.has(selector)) {
                var otherRule = matchingRules.get(selector);
                if (rule.isUnhide() ||
                    isException ||
                    hostname.length > otherRule.hostname.length) {
                    matchingRules.set(selector, {
                        hostname: hostname,
                        isException: isException,
                        rule: rule
                    });
                }
            }
            else {
                matchingRules.set(selector, {
                    hostname: hostname,
                    isException: isException,
                    rule: rule
                });
            }
        }
        var rules = [];
        matchingRules.forEach(function (_a) {
            var rule = _a.rule, isException = _a.isException;
            if (!isException && !rule.isUnhide()) {
                rules.push(rule);
            }
        });
        return rules;
    };
    return CosmeticFilterBucket;
}());

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

function processRegex(r) {
    return "(?:" + r.source + ")";
}
function escape$1(s) {
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
    return __spread(grouped.values());
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
    {
        description: 'Group simple patterns, into a single filter',
        fusion: function (filters) {
            var filter = new NetworkFilter(filters[0]);
            var patterns = new Set();
            for (var i = 0; i < filters.length; i += 1) {
                var f = filters[i];
                if (f.isRegex()) {
                    patterns.add(processRegex(f.getRegex()));
                }
                else if (f.isRightAnchor()) {
                    patterns.add(escape$1(f.getFilter()) + "$");
                }
                else if (f.isLeftAnchor()) {
                    patterns.add("^" + escape$1(f.getFilter()));
                }
                else {
                    patterns.add(escape$1(f.getFilter()));
                }
            }
            if (patterns.size > 1) {
                filter.setRegex(new RegExp(__spread(patterns).join('|')));
            }
            return filter;
        },
        groupByCriteria: function (filter) { return '' + filter.getMask(); },
        select: function (filter) { return (!filter.isFuzzy() &&
            !filter.hasOptDomains() &&
            !filter.hasOptNotDomains() &&
            !filter.isHostname() &&
            !filter.isHostnameAnchor() &&
            !filter.isRedirect()); }
    },
];
function optimize(filters) {
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

var NetworkFilterBucket = (function () {
    function NetworkFilterBucket(name, filters, enableOptimizations) {
        if (enableOptimizations === void 0) { enableOptimizations = true; }
        this.name = name;
        this.index = new ReverseIndex(filters, function (filter) { return filter.getTokens(); }, {
            enableOptimizations: enableOptimizations,
            optimizer: optimize
        });
        this.size = this.index.size;
    }
    NetworkFilterBucket.prototype.optimizeAheadOfTime = function () {
        this.index.optimizeAheadOfTime();
    };
    NetworkFilterBucket.prototype.match = function (request) {
        var match;
        var checkMatch = function (filter) {
            if (matchNetworkFilter(filter, request)) {
                match = filter;
                return false;
            }
            return true;
        };
        this.index.iterMatchingFilters(request.tokens, checkMatch);
        return match;
    };
    return NetworkFilterBucket;
}());

function btoaPolyfill(buffer) {
    if (typeof btoa !== 'undefined') {
        return btoa(buffer);
    }
    else if (typeof Buffer !== 'undefined') {
        return Buffer.from(buffer).toString('base64');
    }
    return buffer;
}
function noopIter(_cb) {
}
function iterFilters(lists, select, cb) {
    lists.forEach(function (list) {
        var filters = select(list);
        for (var i = 0; i < filters.length; i += 1) {
            cb(filters[i]);
        }
    });
}
var FilterEngine = (function () {
    function FilterEngine(_a) {
        var _b = _a.enableOptimizations, enableOptimizations = _b === void 0 ? true : _b, _c = _a.loadCosmeticFilters, loadCosmeticFilters = _c === void 0 ? true : _c, _d = _a.loadNetworkFilters, loadNetworkFilters = _d === void 0 ? true : _d, _e = _a.optimizeAOT, optimizeAOT = _e === void 0 ? true : _e, version = _a.version;
        this.loadCosmeticFilters = loadCosmeticFilters;
        this.loadNetworkFilters = loadNetworkFilters;
        this.optimizeAOT = optimizeAOT;
        this.enableOptimizations = enableOptimizations;
        this.version = version;
        this.lists = new Map();
        this.size = 0;
        this.exceptions = new NetworkFilterBucket('exceptions', noopIter);
        this.importants = new NetworkFilterBucket('importants', noopIter);
        this.redirects = new NetworkFilterBucket('redirects', noopIter);
        this.filters = new NetworkFilterBucket('filters', noopIter);
        this.cosmetics = new CosmeticFilterBucket(noopIter);
        this.resourceChecksum = '';
        this.js = new Map();
        this.resources = new Map();
    }
    FilterEngine.prototype.hasList = function (asset, checksum) {
        var list = this.lists.get(asset);
        if (list !== undefined) {
            return list.checksum === checksum;
        }
        return false;
    };
    FilterEngine.prototype.onUpdateResource = function (updates) {
        var _this = this;
        for (var i = 0; i < updates.length; i += 1) {
            var _a = updates[i], filters = _a.filters, checksum = _a.checksum;
            this.resourceChecksum = checksum;
            var typeToResource = parseJSResource(filters);
            var js = typeToResource.get('application/javascript');
            if (js !== undefined) {
                this.js = js;
            }
            typeToResource.forEach(function (resources, contentType) {
                resources.forEach(function (data, name) {
                    _this.resources.set(name, {
                        contentType: contentType,
                        data: data
                    });
                });
            });
        }
    };
    FilterEngine.prototype.onUpdateFilters = function (lists, loadedAssets, onDiskCache, debug) {
        var _this = this;
        if (loadedAssets === void 0) { loadedAssets = new Set(); }
        if (onDiskCache === void 0) { onDiskCache = false; }
        if (debug === void 0) { debug = false; }
        var updated = false;
        this.lists.forEach(function (_, asset) {
            if (!loadedAssets.has(asset)) {
                _this.lists["delete"](asset);
                updated = true;
            }
        });
        if (lists.length > 0) {
            updated = true;
        }
        for (var i = 0; i < lists.length; i += 1) {
            var _a = lists[i], asset = _a.asset, filters = _a.filters, checksum = _a.checksum;
            var _b = parseList(filters, {
                debug: debug,
                loadCosmeticFilters: this.loadCosmeticFilters,
                loadNetworkFilters: this.loadNetworkFilters
            }), cosmeticFilters = _b.cosmeticFilters, networkFilters = _b.networkFilters;
            var miscFilters = [];
            var exceptions = [];
            var importants = [];
            var redirects = [];
            for (var j = 0; j < networkFilters.length; j += 1) {
                var filter = networkFilters[j];
                if (filter.isException()) {
                    exceptions.push(filter);
                }
                else if (filter.isImportant()) {
                    importants.push(filter);
                }
                else if (filter.isRedirect()) {
                    redirects.push(filter);
                }
                else {
                    miscFilters.push(filter);
                }
            }
            this.lists.set(asset, {
                checksum: checksum,
                cosmetics: cosmeticFilters,
                exceptions: exceptions,
                filters: miscFilters,
                importants: importants,
                redirects: redirects
            });
        }
        this.filters = new NetworkFilterBucket('filters', function (cb) { return iterFilters(_this.lists, function (l) { return l.filters; }, cb); }, this.enableOptimizations);
        this.exceptions = new NetworkFilterBucket('exceptions', function (cb) { return iterFilters(_this.lists, function (l) { return l.exceptions; }, cb); }, this.enableOptimizations);
        this.importants = new NetworkFilterBucket('importants', function (cb) { return iterFilters(_this.lists, function (l) { return l.importants; }, cb); }, this.enableOptimizations);
        this.redirects = new NetworkFilterBucket('redirects', function (cb) { return iterFilters(_this.lists, function (l) { return l.redirects; }, cb); }, this.enableOptimizations);
        this.cosmetics = new CosmeticFilterBucket(function (cb) { return iterFilters(_this.lists, function (l) { return l.cosmetics; }, cb); });
        this.size = (this.exceptions.size +
            this.importants.size +
            this.redirects.size +
            this.cosmetics.size +
            this.filters.size);
        var serialized = null;
        if (updated && onDiskCache) {
            serialized = serializeEngine(this);
        }
        if (this.optimizeAOT) {
            this.optimize();
        }
        return serialized;
    };
    FilterEngine.prototype.optimize = function () {
        this.filters.optimizeAheadOfTime();
        this.exceptions.optimizeAheadOfTime();
        this.importants.optimizeAheadOfTime();
        this.redirects.optimizeAheadOfTime();
    };
    FilterEngine.prototype.getCosmeticsFilters = function (hostname, nodes) {
        if (!this.loadCosmeticFilters) {
            return this.cosmetics.createContentScriptResponse([]);
        }
        return this.cosmetics.createContentScriptResponse(this.cosmetics.getMatchingRules(hostname, nodes));
    };
    FilterEngine.prototype.getDomainFilters = function (hostname) {
        if (!this.loadCosmeticFilters) {
            return this.cosmetics.createContentScriptResponse([]);
        }
        return this.cosmetics.createContentScriptResponse(this.cosmetics.getDomainRules(hostname, this.js));
    };
    FilterEngine.prototype.match = function (rawRequest) {
        if (!this.loadNetworkFilters) {
            return { match: false };
        }
        var request = processRawRequest(rawRequest);
        var filter;
        var exception;
        filter = this.importants.match(request);
        if (filter === undefined) {
            filter = this.redirects.match(request);
            if (filter === undefined) {
                filter = this.filters.match(request);
            }
            if (filter !== undefined) {
                exception = this.exceptions.match(request);
            }
        }
        if (filter !== undefined) {
            if (filter.isRedirect()) {
                var redirect = this.resources.get(filter.getRedirect());
                if (redirect !== undefined) {
                    var data = redirect.data, contentType = redirect.contentType;
                    var dataUrl = void 0;
                    if (contentType.indexOf(';') !== -1) {
                        dataUrl = "data:" + contentType + "," + data;
                    }
                    else {
                        dataUrl = "data:" + contentType + ";base64," + btoaPolyfill(data);
                    }
                    return {
                        exception: exception,
                        filter: filter,
                        match: true,
                        redirect: dataUrl.trim()
                    };
                }
            }
            return {
                exception: exception,
                filter: filter,
                match: true
            };
        }
        return {
            exception: exception,
            filter: filter,
            match: false
        };
    };
    return FilterEngine;
}());

export { CosmeticInjection as CosmeticsInjection, overrideUserAgent, FilterEngine as FiltersEngine, ReverseIndex, processRawRequest, deserializeEngine, matchCosmeticFilter, matchNetworkFilter, parseCosmeticFilter, parseNetworkFilter, f, parseList, compactTokens, hasEmptyIntersection, mergeCompactSets, tokenize, fastHash };
