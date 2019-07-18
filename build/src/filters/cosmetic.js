/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import StaticDataView, { EMPTY_UINT32_ARRAY } from '../data-view';
import { toASCII } from '../punycode';
import { binLookup, fastHash, fastStartsWithFrom, getBit, hasUnicode, setBit, tokenizeFilter, } from '../utils';
var EMPTY_TOKENS = [EMPTY_UINT32_ARRAY];
export var DEFAULT_HIDDING_STYLE = 'display: none !important;';
export function hashHostnameBackward(hostname) {
    var hash = 5381;
    for (var j = hostname.length - 1; j >= 0; j -= 1) {
        hash = (hash * 33) ^ hostname.charCodeAt(j);
    }
    return hash >>> 0;
}
export function getHashesFromLabelsBackward(hostname, end, startOfDomain) {
    var hashes = [];
    var hash = 5381;
    // Compute hash backward, label per label
    for (var i = end - 1; i >= 0; i -= 1) {
        // Process label
        if (hostname[i] === '.' && i < startOfDomain) {
            hashes.push(hash >>> 0);
        }
        // Update hash
        hash = (hash * 33) ^ hostname.charCodeAt(i);
    }
    hashes.push(hash >>> 0);
    return hashes;
}
export function getEntityHashesFromLabelsBackward(hostname, domain) {
    var hostnameWithoutPublicSuffix = getHostnameWithoutPublicSuffix(hostname, domain);
    if (hostnameWithoutPublicSuffix !== null) {
        return getHashesFromLabelsBackward(hostnameWithoutPublicSuffix, hostnameWithoutPublicSuffix.length, hostnameWithoutPublicSuffix.length);
    }
    return [];
}
export function getHostnameHashesFromLabelsBackward(hostname, domain) {
    return getHashesFromLabelsBackward(hostname, hostname.length, hostname.length - domain.length);
}
/**
 * Given a hostname and its domain, return the hostname without the public
 * suffix. We know that the domain, with one less label on the left, will be a
 * the public suffix; and from there we know which trailing portion of
 * `hostname` we should remove.
 */
export function getHostnameWithoutPublicSuffix(hostname, domain) {
    var hostnameWithoutPublicSuffix = null;
    var indexOfDot = domain.indexOf('.');
    if (indexOfDot !== -1) {
        var publicSuffix = domain.slice(indexOfDot + 1);
        hostnameWithoutPublicSuffix = hostname.slice(0, -publicSuffix.length - 1);
    }
    return hostnameWithoutPublicSuffix;
}
/**
 * Given a `selector` starting with either '#' or '.' check if what follows is
 * a simple CSS selector: /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/
 */
function isSimpleSelector(selector) {
    for (var i = 1; i < selector.length; i += 1) {
        var code = selector.charCodeAt(i);
        if (!(code === 45 /* '-' */ ||
            code === 95 /* '_' */ ||
            (code >= 48 && code <= 57) /* [0-9] */ ||
            (code >= 65 && code <= 90) /* [A-Z] */ ||
            (code >= 97 && code <= 122)) /* [a-z] */) {
            if (i < selector.length - 1) {
                // Check if what follows is a ' >' or ' ~' or ' +', in which case we
                // also consider it a simple selector and the token this filter can be
                // indexed with is the first selector.
                var nextCode = selector.charCodeAt(i + 1);
                if (code === 91 /* '[' */ ||
                    (code === 32 /* ' ' */ &&
                        (nextCode === 62 /* '>' */ ||
                            nextCode === 43 /* '+' */ ||
                            nextCode === 126 /* '~' */ ||
                            nextCode === 46 /* '.' */ ||
                            nextCode === 35)) /* '#' */) {
                    return true;
                }
            }
            return false;
        }
    }
    return true;
}
/**
 * Given a `selector` starting with either 'a[' or '[', check if what follows
 * is a simple href attribute selector of the form: 'href^=' or 'href*='.
 */
function isSimpleHrefSelector(selector, start) {
    return (selector.startsWith('href^="', start) ||
        selector.startsWith('href*="', start) ||
        selector.startsWith('href="', start));
}
/**
 * Validate CSS selector. There is a fast path for simple selectors (e.g.: #foo
 * or .bar) which are the most common case. For complex ones, we rely on
 * `Element.matches` (if available).
 */
var isValidCss = (function () {
    var div = typeof document !== 'undefined'
        ? document.createElement('div')
        : {
            matches: function () {
                /* noop */
            }
        };
    var matches = function (selector) { return div.matches(selector); };
    var validSelectorRe = /^[#.]?[\w-.]+$/;
    return function isValidCssImpl(selector) {
        if (validSelectorRe.test(selector)) {
            return true;
        }
        try {
            matches(selector);
        }
        catch (ex) {
            return false;
        }
        return true;
    };
})();
function computeFilterId(mask, selector, hostnames, entities, notHostnames, notEntities, style) {
    var hash = (5408 * 33) ^ mask;
    if (selector !== undefined) {
        for (var i = 0; i < selector.length; i += 1) {
            hash = (hash * 33) ^ selector.charCodeAt(i);
        }
    }
    if (hostnames !== undefined) {
        for (var i = 0; i < hostnames.length; i += 1) {
            hash = (hash * 33) ^ hostnames[i];
        }
    }
    if (entities !== undefined) {
        for (var i = 0; i < entities.length; i += 1) {
            hash = (hash * 33) ^ entities[i];
        }
    }
    if (notHostnames !== undefined) {
        for (var i = 0; i < notHostnames.length; i += 1) {
            hash = (hash * 33) ^ notHostnames[i];
        }
    }
    if (notEntities !== undefined) {
        for (var i = 0; i < notEntities.length; i += 1) {
            hash = (hash * 33) ^ notEntities[i];
        }
    }
    if (style !== undefined) {
        for (var i = 0; i < style.length; i += 1) {
            hash = (hash * 33) ^ style.charCodeAt(i);
        }
    }
    return hash >>> 0;
}
/***************************************************************************
 *  Cosmetic filters parsing
 * ************************************************************************ */
var CosmeticFilter = /** @class */ (function () {
    function CosmeticFilter(_a) {
        var mask = _a.mask, selector = _a.selector, entities = _a.entities, hostnames = _a.hostnames, notEntities = _a.notEntities, notHostnames = _a.notHostnames, rawLine = _a.rawLine, style = _a.style;
        this.mask = mask;
        this.selector = selector;
        // Hostname constraints
        this.entities = entities;
        this.hostnames = hostnames;
        // Hostname exceptions
        this.notEntities = notEntities;
        this.notHostnames = notHostnames;
        this.style = style;
        this.id = undefined;
        this.rawLine = rawLine;
    }
    /**
     * Given a line that we know contains a cosmetic filter, create a CosmeticFiler
     * instance out of it. This function should be *very* efficient, as it will be
     * used to parse tens of thousands of lines.
     */
    CosmeticFilter.parse = function (line, debug) {
        if (debug === void 0) { debug = false; }
        // Mask to store attributes. Each flag (unhide, scriptInject, etc.) takes
        // only 1 bit at a specific offset defined in COSMETICS_MASK.  cf:
        // COSMETICS_MASK for the offset of each property
        var mask = 0;
        var selector;
        var hostnames;
        var notHostnames;
        var entities;
        var notEntities;
        var style;
        var sharpIndex = line.indexOf('#');
        // Start parsing the line
        var afterSharpIndex = sharpIndex + 1;
        var suffixStartIndex = afterSharpIndex + 1;
        // hostname1,hostname2#@#.selector
        //                    ^^ ^
        //                    || |
        //                    || suffixStartIndex
        //                    |afterSharpIndex
        //                    sharpIndex
        // Check if unhide
        if (line.length > afterSharpIndex && line[afterSharpIndex] === '@') {
            mask = setBit(mask, 1 /* unhide */);
            suffixStartIndex += 1;
        }
        // Parse hostnames and entitites as well as their negations.
        //
        // - ~hostname##.selector
        // - hostname##.selector
        // - entity.*##.selector
        // - ~entity.*##.selector
        //
        // Each kind will have its own Uint32Array containing hashes, sorted by
        // number of labels considered. This allows a compact representation of
        // hostnames and fast matching without any string copy.
        if (sharpIndex > 0) {
            var entitiesArray = [];
            var notEntitiesArray = [];
            var hostnamesArray = [];
            var notHostnamesArray = [];
            var parts = line.slice(0, sharpIndex).split(',');
            for (var i = 0; i < parts.length; i += 1) {
                var hostname = parts[i];
                if (hasUnicode(hostname)) {
                    hostname = toASCII(hostname);
                    mask = setBit(mask, 4 /* isUnicode */);
                }
                var negation = hostname.charCodeAt(0) === 126 /* '~' */;
                var entity = hostname.charCodeAt(hostname.length - 1) === 42 /* '*' */ &&
                    hostname.charCodeAt(hostname.length - 2) === 46 /* '.' */;
                var start = negation ? 1 : 0;
                var end = entity ? hostname.length - 2 : hostname.length;
                var hash = hashHostnameBackward(negation === true || entity === true ? hostname.slice(start, end) : hostname);
                if (negation) {
                    if (entity) {
                        notEntitiesArray.push(hash);
                    }
                    else {
                        notHostnamesArray.push(hash);
                    }
                }
                else {
                    if (entity) {
                        entitiesArray.push(hash);
                    }
                    else {
                        hostnamesArray.push(hash);
                    }
                }
            }
            if (entitiesArray.length !== 0) {
                entities = new Uint32Array(entitiesArray).sort();
            }
            if (hostnamesArray.length !== 0) {
                hostnames = new Uint32Array(hostnamesArray).sort();
            }
            if (notEntitiesArray.length !== 0) {
                notEntities = new Uint32Array(notEntitiesArray).sort();
            }
            if (notHostnamesArray.length !== 0) {
                notHostnames = new Uint32Array(notHostnamesArray).sort();
            }
        }
        // Deal with script:inject and script:contains
        if (line.length - suffixStartIndex > 7 &&
            line.charCodeAt(suffixStartIndex) === 115 /* 's' */ &&
            fastStartsWithFrom(line, 'script:', suffixStartIndex)) {
            //      script:inject(.......)
            //                    ^      ^
            //   script:contains(/......./)
            //                    ^      ^
            //    script:contains(selector[, args])
            //           ^        ^               ^^
            //           |        |          |    ||
            //           |        |          |    |selector.length
            //           |        |          |    scriptSelectorIndexEnd
            //           |        |          |scriptArguments
            //           |        scriptSelectorIndexStart
            //           scriptMethodIndex
            var scriptMethodIndex = suffixStartIndex + 7;
            var scriptSelectorIndexStart = scriptMethodIndex;
            var scriptSelectorIndexEnd = line.length - 1;
            if (fastStartsWithFrom(line, 'inject(', scriptMethodIndex)) {
                mask = setBit(mask, 2 /* scriptInject */);
                scriptSelectorIndexStart += 7;
            }
            selector = line.slice(scriptSelectorIndexStart, scriptSelectorIndexEnd);
        }
        else if (line.length - suffixStartIndex > 4 &&
            line.charCodeAt(suffixStartIndex) === 43 /* '+' */ &&
            fastStartsWithFrom(line, '+js(', suffixStartIndex)) {
            mask = setBit(mask, 2 /* scriptInject */);
            selector = line.slice(suffixStartIndex + 4, line.length - 1);
        }
        else {
            // Detect special syntax
            var indexOfColon = line.indexOf(':', suffixStartIndex);
            while (indexOfColon !== -1) {
                var indexAfterColon = indexOfColon + 1;
                if (fastStartsWithFrom(line, 'style', indexAfterColon)) {
                    // ##selector :style(...)
                    if (line[indexAfterColon + 5] === '(' && line[line.length - 1] === ')') {
                        selector = line.slice(suffixStartIndex, indexOfColon);
                        style = line.slice(indexAfterColon + 6, -1);
                    }
                    else {
                        return null;
                    }
                }
                else if (fastStartsWithFrom(line, '-abp-', indexAfterColon) ||
                    fastStartsWithFrom(line, 'contains', indexAfterColon) ||
                    fastStartsWithFrom(line, 'has', indexAfterColon) ||
                    fastStartsWithFrom(line, 'if', indexAfterColon) ||
                    fastStartsWithFrom(line, 'if-not', indexAfterColon) ||
                    fastStartsWithFrom(line, 'matches-css', indexAfterColon) ||
                    fastStartsWithFrom(line, 'matches-css-after', indexAfterColon) ||
                    fastStartsWithFrom(line, 'matches-css-before', indexAfterColon) ||
                    fastStartsWithFrom(line, 'not', indexAfterColon) ||
                    fastStartsWithFrom(line, 'properties', indexAfterColon) ||
                    fastStartsWithFrom(line, 'subject', indexAfterColon) ||
                    fastStartsWithFrom(line, 'xpath', indexAfterColon)) {
                    return null;
                }
                indexOfColon = line.indexOf(':', indexAfterColon);
            }
            // If we reach this point, filter is not extended syntax
            if (selector === undefined && suffixStartIndex < line.length) {
                selector = line.slice(suffixStartIndex);
            }
            if (selector === undefined || !isValidCss(selector)) {
                // Not a valid selector
                return null;
            }
        }
        // Check if unicode appears in selector
        if (selector !== undefined) {
            if (hasUnicode(selector)) {
                mask = setBit(mask, 4 /* isUnicode */);
            }
            var c0 = selector.charCodeAt(0);
            var c1 = selector.charCodeAt(1);
            var c2 = selector.charCodeAt(2);
            // Check if we have a specific case of simple selector (id, class or
            // href) These are the most common filters and will benefit greatly from
            // a custom dispatch mechanism.
            if (getBit(mask, 2 /* scriptInject */) === false) {
                if (c0 === 46 /* '.' */ && isSimpleSelector(selector)) {
                    mask = setBit(mask, 8 /* isClassSelector */);
                }
                else if (c0 === 35 /* '#' */ && isSimpleSelector(selector)) {
                    mask = setBit(mask, 16 /* isIdSelector */);
                }
                else if (c0 === 97 /* a */ &&
                    c1 === 91 /* '[' */ &&
                    c2 === 104 /* 'h' */ &&
                    isSimpleHrefSelector(selector, 2)) {
                    mask = setBit(mask, 32 /* isHrefSelector */);
                }
                else if (c0 === 91 /* '[' */ &&
                    c1 === 104 /* 'h' */ &&
                    isSimpleHrefSelector(selector, 1)) {
                    mask = setBit(mask, 32 /* isHrefSelector */);
                }
            }
        }
        return new CosmeticFilter({
            entities: entities,
            hostnames: hostnames,
            mask: mask,
            notEntities: notEntities,
            notHostnames: notHostnames,
            rawLine: debug === true ? line : undefined,
            selector: selector,
            style: style
        });
    };
    /**
     * Deserialize cosmetic filters. The code accessing the buffer should be
     * symetrical to the one in `serializeCosmeticFilter`.
     */
    CosmeticFilter.deserialize = function (buffer) {
        var mask = buffer.getUint8();
        var isUnicode = getBit(mask, 4 /* isUnicode */);
        var optionalParts = buffer.getUint8();
        var selector = isUnicode ? buffer.getUTF8() : buffer.getCosmeticSelector();
        // The order of these fields should be the same as when we serialize them.
        return new CosmeticFilter({
            // Mandatory fields
            mask: mask,
            selector: selector,
            // Optional fields
            entities: (optionalParts & 1) === 1 ? buffer.getUint32Array() : undefined,
            hostnames: (optionalParts & 2) === 2 ? buffer.getUint32Array() : undefined,
            notEntities: (optionalParts & 4) === 4 ? buffer.getUint32Array() : undefined,
            notHostnames: (optionalParts & 8) === 8 ? buffer.getUint32Array() : undefined,
            rawLine: (optionalParts & 16) === 16
                ? isUnicode
                    ? buffer.getUTF8()
                    : buffer.getASCII()
                : undefined,
            style: (optionalParts & 32) === 32 ? buffer.getASCII() : undefined
        });
    };
    CosmeticFilter.prototype.isCosmeticFilter = function () {
        return true;
    };
    CosmeticFilter.prototype.isNetworkFilter = function () {
        return false;
    };
    /**
     * The format of a cosmetic filter is:
     *
     * | mask | selector length | selector... | hostnames length | hostnames...
     *   32     16                              16
     *
     * The header (mask) is 32 bits, then we have a total of 32 bits to store the
     * length of `selector` and `hostnames` (16 bits each).
     *
     * Improvements similar to the onces mentioned in `serializeNetworkFilters`
     * could be applied here, to get a more compact representation.
     */
    CosmeticFilter.prototype.serialize = function (buffer) {
        // Mandatory fields
        buffer.pushUint8(this.mask);
        var index = buffer.getPos();
        buffer.pushUint8(0);
        if (this.isUnicode()) {
            buffer.pushUTF8(this.selector);
        }
        else {
            buffer.pushCosmeticSelector(this.selector);
        }
        // This bit-mask indicates which optional parts of the filter were serialized.
        var optionalParts = 0;
        if (this.entities !== undefined) {
            optionalParts |= 1;
            buffer.pushUint32Array(this.entities);
        }
        if (this.hostnames !== undefined) {
            optionalParts |= 2;
            buffer.pushUint32Array(this.hostnames);
        }
        if (this.notEntities !== undefined) {
            optionalParts |= 4;
            buffer.pushUint32Array(this.notEntities);
        }
        if (this.notHostnames !== undefined) {
            optionalParts |= 8;
            buffer.pushUint32Array(this.notHostnames);
        }
        if (this.rawLine !== undefined) {
            optionalParts |= 16;
            if (this.isUnicode()) {
                buffer.pushUTF8(this.rawLine);
            }
            else {
                buffer.pushASCII(this.rawLine);
            }
        }
        if (this.style !== undefined) {
            optionalParts |= 32;
            buffer.pushASCII(this.style);
        }
        buffer.setByte(index, optionalParts);
    };
    /**
     * Return an estimation of the size (in bytes) needed to persist this filter
     * in a DataView. This does not need to be 100% accurate but should be an
     * upper-bound. It should also be as fast as possible.
     */
    CosmeticFilter.prototype.getSerializedSize = function () {
        var estimate = 1 + 1; // mask (1 byte) + optional parts (1 byte)
        if (this.isUnicode()) {
            estimate += StaticDataView.sizeOfUTF8(this.selector);
        }
        else {
            estimate += StaticDataView.sizeOfASCII(this.selector);
        }
        if (this.entities !== undefined) {
            estimate += StaticDataView.sizeOfUint32Array(this.entities);
        }
        if (this.hostnames !== undefined) {
            estimate += StaticDataView.sizeOfUint32Array(this.hostnames);
        }
        if (this.notHostnames !== undefined) {
            estimate += StaticDataView.sizeOfUint32Array(this.notHostnames);
        }
        if (this.notEntities !== undefined) {
            estimate += StaticDataView.sizeOfUint32Array(this.notEntities);
        }
        if (this.rawLine !== undefined) {
            if (this.isUnicode()) {
                estimate += StaticDataView.sizeOfUTF8(this.rawLine);
            }
            else {
                estimate += StaticDataView.sizeOfASCII(this.rawLine);
            }
        }
        if (this.style !== undefined) {
            estimate += StaticDataView.sizeOfASCII(this.style);
        }
        return estimate;
    };
    /**
     * Create a more human-readable version of this filter. It is mainly used for
     * debugging purpose, as it will expand the values stored in the bit mask.
     */
    CosmeticFilter.prototype.toString = function () {
        if (this.rawLine !== undefined) {
            return this.rawLine;
        }
        var filter = '';
        if (this.hostnames !== undefined ||
            this.entities !== undefined ||
            this.notHostnames !== undefined ||
            this.notEntities !== undefined) {
            filter += '<hostnames>';
        }
        if (this.isUnhide()) {
            filter += '#@#';
        }
        else {
            filter += '##';
        }
        if (this.isScriptInject()) {
            filter += '+js(';
            filter += this.selector;
            filter += ')';
        }
        else {
            filter += this.selector;
        }
        return filter;
    };
    CosmeticFilter.prototype.match = function (hostname, domain) {
        // Not constraint on hostname, match is true
        if (this.hasHostnameConstraint() === false) {
            return true;
        }
        // No `hostname` available but this filter has some constraints on hostname.
        if (!hostname && this.hasHostnameConstraint()) {
            return false;
        }
        var entitiesHashes = this.entities !== undefined || this.notEntities !== undefined
            ? getEntityHashesFromLabelsBackward(hostname, domain)
            : [];
        var hostnameHashes = this.hostnames !== undefined || this.notHostnames !== undefined
            ? getHostnameHashesFromLabelsBackward(hostname, domain)
            : [];
        // Check if `hostname` is blacklisted
        if (this.notHostnames !== undefined) {
            for (var i = 0; i < hostnameHashes.length; i += 1) {
                if (binLookup(this.notHostnames, hostnameHashes[i])) {
                    return false;
                }
            }
        }
        // Check if `hostname` is blacklisted by *entity*
        if (this.notEntities !== undefined) {
            for (var i = 0; i < entitiesHashes.length; i += 1) {
                if (binLookup(this.notEntities, entitiesHashes[i])) {
                    return false;
                }
            }
        }
        // Check if `hostname` is allowed
        if (this.hostnames !== undefined || this.entities !== undefined) {
            if (this.hostnames !== undefined) {
                for (var i = 0; i < hostnameHashes.length; i += 1) {
                    if (binLookup(this.hostnames, hostnameHashes[i])) {
                        return true;
                    }
                }
            }
            if (this.entities !== undefined) {
                for (var i = 0; i < entitiesHashes.length; i += 1) {
                    if (binLookup(this.entities, entitiesHashes[i])) {
                        return true;
                    }
                }
            }
            return false;
        }
        return true;
    };
    /**
     * Get tokens for this filter. It can be indexed multiple times if multiple
     * hostnames are specified (e.g.: host1,host2##.selector).
     */
    CosmeticFilter.prototype.getTokens = function () {
        var tokens = [];
        // Note, we do not need to use negated domains or entities as tokens here
        // since they will by definition not match on their own, unless accompanied
        // by a domain or entity. Instead, they are handled in
        // `CosmeticFilterBucket.getCosmeticsFilters`.
        if (this.hostnames !== undefined) {
            for (var i = 0; i < this.hostnames.length; i += 1) {
                tokens.push(new Uint32Array([this.hostnames[i]]));
            }
        }
        if (this.entities !== undefined) {
            for (var i = 0; i < this.entities.length; i += 1) {
                tokens.push(new Uint32Array([this.entities[i]]));
            }
        }
        // Here we only take selector into account if the filter is not unHide.
        // TODO - add more detailed comment
        if (tokens.length === 0 && this.isUnhide() === false) {
            if (this.isIdSelector() || this.isClassSelector()) {
                var endOfSelector = this.selector.length;
                // Check if there is a space or '['
                var indexOfSpace = this.selector.indexOf(' ');
                if (indexOfSpace !== -1) {
                    endOfSelector = indexOfSpace;
                }
                var indexOfBracket = this.selector.indexOf('[');
                if (indexOfBracket !== -1 && indexOfBracket < endOfSelector) {
                    endOfSelector = indexOfBracket;
                }
                tokens.push(new Uint32Array([fastHash(this.selector.slice(1, endOfSelector))]));
            }
            else if (this.isHrefSelector()) {
                var selector = this.getSelector();
                // Locate 'href' in selector
                var hrefIndex = selector.indexOf('href');
                if (hrefIndex === -1) {
                    return EMPTY_TOKENS;
                }
                hrefIndex += 4;
                // Tokenize optimally depending on the kind of selector: 'href=',
                // 'href*=', 'href^='.
                var skipFirstToken = false;
                var skipLastToken = true;
                if (selector.charCodeAt(hrefIndex) === 42 /* '*' */) {
                    // skip: '*'
                    skipFirstToken = true;
                    hrefIndex += 1;
                }
                else if (selector.charCodeAt(hrefIndex) === 94 /* '^' */) {
                    // skip: '^'
                    hrefIndex += 1;
                }
                else {
                    skipLastToken = false;
                }
                hrefIndex += 2; // skip:  '="'
                // Locate end of href
                var hrefEnd = selector.indexOf('"', hrefIndex);
                if (hrefEnd === -1) {
                    // That cannot happen unless the filter is not well-formed. In this
                    // case, we just return no tokens, which will result in this filter
                    // ending up in the "wildcard" bucket of the index.
                    return EMPTY_TOKENS;
                }
                tokens.push(new Uint32Array(tokenizeFilter(this.selector.slice(hrefIndex, hrefEnd), skipFirstToken, skipLastToken)));
            }
        }
        if (tokens.length === 0) {
            return EMPTY_TOKENS;
        }
        return tokens;
    };
    CosmeticFilter.prototype.getScript = function (js) {
        var scriptName = this.getSelector();
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
            return script;
        } // TODO - else throw an exception?
        return undefined;
    };
    CosmeticFilter.prototype.hasHostnameConstraint = function () {
        return (this.hostnames !== undefined ||
            this.entities !== undefined ||
            this.notEntities !== undefined ||
            this.notHostnames !== undefined);
    };
    CosmeticFilter.prototype.getId = function () {
        if (this.id === undefined) {
            this.id = computeFilterId(this.mask, this.selector, this.hostnames, this.entities, this.notHostnames, this.notEntities, this.style);
        }
        return this.id;
    };
    CosmeticFilter.prototype.hasCustomStyle = function () {
        return this.style !== undefined;
    };
    CosmeticFilter.prototype.getStyle = function () {
        return this.style || DEFAULT_HIDDING_STYLE;
    };
    CosmeticFilter.prototype.getSelector = function () {
        return this.selector;
    };
    CosmeticFilter.prototype.isUnhide = function () {
        return getBit(this.mask, 1 /* unhide */);
    };
    CosmeticFilter.prototype.isScriptInject = function () {
        return getBit(this.mask, 2 /* scriptInject */);
    };
    CosmeticFilter.prototype.isCSS = function () {
        return this.isScriptInject() === false;
    };
    CosmeticFilter.prototype.isIdSelector = function () {
        return getBit(this.mask, 16 /* isIdSelector */);
    };
    CosmeticFilter.prototype.isClassSelector = function () {
        return getBit(this.mask, 8 /* isClassSelector */);
    };
    CosmeticFilter.prototype.isHrefSelector = function () {
        return getBit(this.mask, 32 /* isHrefSelector */);
    };
    CosmeticFilter.prototype.isUnicode = function () {
        return getBit(this.mask, 4 /* isUnicode */);
    };
    // A generic hide cosmetic filter is one that:
    //
    // * Do not have a domain specified. "Hide this element on all domains"
    // * Have only domain exceptions specified. "Hide this element on all domains except example.com"
    //
    // For example: ~example.com##.ad  is a generic filter as well!
    CosmeticFilter.prototype.isGenericHide = function () {
        return this.hostnames === undefined && this.entities === undefined;
    };
    return CosmeticFilter;
}());
export default CosmeticFilter;
