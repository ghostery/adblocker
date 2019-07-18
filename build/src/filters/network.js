/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import StaticDataView from '../data-view';
import { toASCII } from '../punycode';
import TokensBuffer from '../tokens-buffer';
import { binLookup, bitCount, clearBit, createFuzzySignature, fastHash, fastStartsWith, fastStartsWithFrom, getBit, hasUnicode, isAlpha, isDigit, setBit, tokenizeFilterInPlace, tokenizeRegexInPlace, } from '../utils';
var TOKENS_BUFFER = new TokensBuffer(200);
var HTTP_HASH = fastHash('http');
var HTTPS_HASH = fastHash('https');
function isAllowedHostname(ch) {
    return (isDigit(ch) || isAlpha(ch) || ch === 95 /* '_' */ || ch === 45 /* '-' */ || ch === 46 /* '.' */);
}
/**
 * Mask used when a network filter can be applied on any content type.
 */
var FROM_ANY = 1 /* fromDocument */ |
    2 /* fromFont */ |
    16 /* fromImage */ |
    32 /* fromMedia */ |
    64 /* fromObject */ |
    128 /* fromOther */ |
    256 /* fromPing */ |
    512 /* fromScript */ |
    1024 /* fromStylesheet */ |
    2048 /* fromSubdocument */ |
    4096 /* fromWebsocket */ |
    8192 /* fromXmlHttpRequest */;
/**
 * Map content type value to mask the corresponding mask.
 * ref: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy
 */
var REQUEST_TYPE_TO_MASK = {
    beacon: 256 /* fromPing */,
    document: 1 /* fromDocument */,
    fetch: 8192 /* fromXmlHttpRequest */,
    font: 2 /* fromFont */,
    image: 16 /* fromImage */,
    imageset: 16 /* fromImage */,
    mainFrame: 1 /* fromDocument */,
    main_frame: 1 /* fromDocument */,
    media: 32 /* fromMedia */,
    object: 64 /* fromObject */,
    object_subrequest: 64 /* fromObject */,
    ping: 256 /* fromPing */,
    script: 512 /* fromScript */,
    stylesheet: 1024 /* fromStylesheet */,
    subFrame: 2048 /* fromSubdocument */,
    sub_frame: 2048 /* fromSubdocument */,
    websocket: 4096 /* fromWebsocket */,
    xhr: 8192 /* fromXmlHttpRequest */,
    xmlhttprequest: 8192 /* fromXmlHttpRequest */,
    // Other
    csp_report: 128 /* fromOther */,
    eventsource: 128 /* fromOther */,
    manifest: 128 /* fromOther */,
    other: 128 /* fromOther */,
    speculative: 128 /* fromOther */,
    texttrack: 128 /* fromOther */,
    web_manifest: 128 /* fromOther */,
    xbl: 128 /* fromOther */,
    xml_dtd: 128 /* fromOther */,
    xslt: 128 /* fromOther */
};
function computeFilterId(csp, mask, filter, hostname, optDomains, optNotDomains, redirect) {
    var hash = (5408 * 33) ^ mask;
    if (csp !== undefined) {
        for (var i = 0; i < csp.length; i += 1) {
            hash = (hash * 33) ^ csp.charCodeAt(i);
        }
    }
    if (optDomains !== undefined) {
        for (var i = 0; i < optDomains.length; i += 1) {
            hash = (hash * 33) ^ optDomains[i];
        }
    }
    if (optNotDomains !== undefined) {
        for (var i = 0; i < optNotDomains.length; i += 1) {
            hash = (hash * 33) ^ optNotDomains[i];
        }
    }
    if (filter !== undefined) {
        for (var i = 0; i < filter.length; i += 1) {
            hash = (hash * 33) ^ filter.charCodeAt(i);
        }
    }
    if (hostname !== undefined) {
        for (var i = 0; i < hostname.length; i += 1) {
            hash = (hash * 33) ^ hostname.charCodeAt(i);
        }
    }
    if (redirect !== undefined) {
        for (var i = 0; i < redirect.length; i += 1) {
            hash = (hash * 33) ^ redirect.charCodeAt(i);
        }
    }
    return hash >>> 0;
}
/**
 * Compiles a filter pattern to a regex. This is only performed *lazily* for
 * filters containing at least a * or ^ symbol. Because Regexes are expansive,
 * we try to convert some patterns to plain filters.
 */
function compileRegex(filter, isLeftAnchor, isRightAnchor, isFullRegex) {
    if (isFullRegex === true) {
        return new RegExp(filter.slice(1, filter.length - 1), 'i');
    }
    // Escape special regex characters: |.$+?{}()[]\
    filter = filter.replace(/([|.$+?{}()[\]\\])/g, '\\$1');
    // * can match anything
    filter = filter.replace(/\*/g, '.*');
    // ^ can match any separator or the end of the pattern
    filter = filter.replace(/\^/g, '(?:[^\\w\\d_.%-]|$)');
    // Should match end of url
    if (isRightAnchor) {
        filter = filter + "$";
    }
    if (isLeftAnchor) {
        filter = "^" + filter;
    }
    return new RegExp(filter, 'i');
}
var EMPTY_ARRAY = new Uint32Array([]);
var MATCH_ALL = new RegExp('');
var NetworkFilter = /** @class */ (function () {
    function NetworkFilter(_a) {
        var csp = _a.csp, filter = _a.filter, hostname = _a.hostname, mask = _a.mask, optDomains = _a.optDomains, optNotDomains = _a.optNotDomains, rawLine = _a.rawLine, redirect = _a.redirect, regex = _a.regex;
        this.csp = csp;
        this.filter = filter;
        this.hostname = hostname;
        this.mask = mask;
        this.optDomains = optDomains;
        this.optNotDomains = optNotDomains;
        this.redirect = redirect;
        this.rawLine = rawLine;
        this.id = undefined;
        this.fuzzySignature = undefined;
        this.regex = regex;
    }
    NetworkFilter.parse = function (line, debug) {
        if (debug === void 0) { debug = false; }
        // Represent options as a bitmask
        var mask = 16777216 /* thirdParty */ |
            16384 /* firstParty */ |
            8 /* fromHttps */ |
            4 /* fromHttp */;
        // Temporary masks for positive (e.g.: $script) and negative (e.g.: $~script)
        // content type options.
        var cptMaskPositive = 0;
        var cptMaskNegative = FROM_ANY;
        var hostname;
        var optDomains;
        var optNotDomains;
        var redirect;
        var csp;
        // Start parsing
        var filterIndexStart = 0;
        var filterIndexEnd = line.length;
        // @@filter == Exception
        if (line.charCodeAt(0) === 64 /* '@' */ && line.charCodeAt(1) === 64 /* '@' */) {
            filterIndexStart += 2;
            mask = setBit(mask, 262144 /* isException */);
        }
        // filter$options == Options
        // ^     ^
        // |     |
        // |     optionsIndex
        // filterIndexStart
        var optionsIndex = line.lastIndexOf('$');
        if (optionsIndex !== -1 && line.charCodeAt(optionsIndex + 1) !== 47 /* '/' */) {
            // Parse options and set flags
            filterIndexEnd = optionsIndex;
            // --------------------------------------------------------------------- //
            // parseOptions
            // --------------------------------------------------------------------- //
            var options = line.slice(optionsIndex + 1).split(',');
            for (var i = 0; i < options.length; i += 1) {
                var rawOption = options[i];
                var negation = rawOption.charCodeAt(0) === 126 /* '~' */;
                var option = negation === true ? rawOption.slice(1) : rawOption;
                // Check for options: option=value1|value2
                var optionValue = '';
                var indexOfEqual = option.indexOf('=');
                if (indexOfEqual !== -1) {
                    optionValue = option.slice(indexOfEqual + 1);
                    option = option.slice(0, indexOfEqual);
                }
                switch (option) {
                    case 'domain': {
                        // domain list starting or ending with '|' is invalid
                        if (optionValue.charCodeAt(0) === 124 /* '|' */ ||
                            optionValue.charCodeAt(optionValue.length - 1) === 124 /* '|' */) {
                            return null;
                        }
                        var optionValues = optionValue.split('|');
                        var optDomainsArray = [];
                        var optNotDomainsArray = [];
                        for (var j = 0; j < optionValues.length; j += 1) {
                            var value = optionValues[j];
                            if (value) {
                                if (value.charCodeAt(0) === 126 /* '~' */) {
                                    optNotDomainsArray.push(fastHash(value.slice(1)));
                                }
                                else {
                                    optDomainsArray.push(fastHash(value));
                                }
                            }
                        }
                        if (optDomainsArray.length > 0) {
                            optDomains = new Uint32Array(optDomainsArray).sort();
                        }
                        if (optNotDomainsArray.length > 0) {
                            optNotDomains = new Uint32Array(optNotDomainsArray).sort();
                        }
                        break;
                    }
                    case 'badfilter':
                        mask = setBit(mask, 65536 /* isBadFilter */);
                        break;
                    case 'important':
                        // Note: `negation` should always be `false` here.
                        if (negation) {
                            return null;
                        }
                        mask = setBit(mask, 2097152 /* isImportant */);
                        break;
                    case 'match-case':
                        // Note: `negation` should always be `false` here.
                        if (negation) {
                            return null;
                        }
                        // We currently consider all filters to be case-insensitive.
                        break;
                    case '3p':
                    case 'third-party':
                        if (negation) {
                            // ~third-party means we should clear the flag
                            mask = clearBit(mask, 16777216 /* thirdParty */);
                        }
                        else {
                            // third-party means ~first-party
                            mask = clearBit(mask, 16384 /* firstParty */);
                        }
                        break;
                    case '1p':
                    case 'first-party':
                        if (negation) {
                            // ~first-party means we should clear the flag
                            mask = clearBit(mask, 16384 /* firstParty */);
                        }
                        else {
                            // first-party means ~third-party
                            mask = clearBit(mask, 16777216 /* thirdParty */);
                        }
                        break;
                    case 'fuzzy':
                        mask = setBit(mask, 32768 /* fuzzyMatch */);
                        break;
                    case 'collapse':
                        break;
                    case 'redirect':
                        // Negation of redirection doesn't make sense
                        if (negation) {
                            return null;
                        }
                        // Ignore this filter if no redirection resource is specified
                        if (optionValue.length === 0) {
                            return null;
                        }
                        redirect = optionValue;
                        break;
                    case 'csp':
                        mask = setBit(mask, 131072 /* isCSP */);
                        if (optionValue.length > 0) {
                            csp = optionValue;
                        }
                        break;
                    case 'elemhide':
                    case 'generichide':
                        mask = setBit(mask, 524288 /* isGenericHide */);
                        break;
                    default: {
                        // Handle content type options separatly
                        var optionMask = 0;
                        switch (option) {
                            case 'image':
                                optionMask = 16 /* fromImage */;
                                break;
                            case 'media':
                                optionMask = 32 /* fromMedia */;
                                break;
                            case 'object':
                            case 'object-subrequest':
                                optionMask = 64 /* fromObject */;
                                break;
                            case 'other':
                                optionMask = 128 /* fromOther */;
                                break;
                            case 'ping':
                            case 'beacon':
                                optionMask = 256 /* fromPing */;
                                break;
                            case 'script':
                                optionMask = 512 /* fromScript */;
                                break;
                            case 'css':
                            case 'stylesheet':
                                optionMask = 1024 /* fromStylesheet */;
                                break;
                            case 'frame':
                            case 'subdocument':
                                optionMask = 2048 /* fromSubdocument */;
                                break;
                            case 'xhr':
                            case 'xmlhttprequest':
                                optionMask = 8192 /* fromXmlHttpRequest */;
                                break;
                            case 'websocket':
                                optionMask = 4096 /* fromWebsocket */;
                                break;
                            case 'font':
                                optionMask = 2 /* fromFont */;
                                break;
                            case 'doc':
                            case 'document':
                                optionMask = 1 /* fromDocument */;
                                break;
                            default:
                                // Disable this filter if we don't support all the options
                                return null;
                        }
                        // We got a valid cpt option, update mask
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
            // End of option parsing
            // --------------------------------------------------------------------- //
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
        // Identify kind of pattern
        var filter;
        // Detect Regexps (i.e.: /pattern/)
        if (filterIndexEnd - filterIndexStart >= 2 &&
            line.charCodeAt(filterIndexStart) === 47 /* '/' */ &&
            line.charCodeAt(filterIndexEnd - 1) === 47 /* '/' */) {
            // Some extra ideas which could be applied to RegExp filters:
            // * convert rules without any special RegExp syntax to plain patterns
            // * remove extra `isFullRegex` flag since `isRegex` might be enough
            // * apply some optimizations on the fly: /^https?:\\/\\/rest => isHttp + isHttps + rest
            filter = line.slice(filterIndexStart, filterIndexEnd);
            // Validate RegExp to make sure this rule is fine
            try {
                compileRegex(filter, false /* isLeftAnchor */, false /* isRightAnchor */, true /* isFullRegex */);
            }
            catch (ex) {
                return null; // invalid RegExp
            }
            mask = setBit(mask, 33554432 /* isFullRegex */);
        }
        else {
            // Deal with hostname pattern
            if (filterIndexEnd > 0 && line.charCodeAt(filterIndexEnd - 1) === 124 /* '|' */) {
                mask = setBit(mask, 8388608 /* isRightAnchor */);
                filterIndexEnd -= 1;
            }
            if (filterIndexStart < filterIndexEnd &&
                line.charCodeAt(filterIndexStart) === 124 /* '|' */) {
                if (filterIndexStart < filterIndexEnd - 1 &&
                    line.charCodeAt(filterIndexStart + 1) === 124 /* '|' */) {
                    mask = setBit(mask, 1048576 /* isHostnameAnchor */);
                    filterIndexStart += 2;
                }
                else {
                    mask = setBit(mask, 4194304 /* isLeftAnchor */);
                    filterIndexStart += 1;
                }
            }
            // const isRegex = checkIsRegex(line, filterIndexStart, filterIndexEnd);
            // mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isRegex, isRegex);
            if (getBit(mask, 1048576 /* isHostnameAnchor */)) {
                // Split at the first character which is not allowed in a hostname
                var firstSeparator = filterIndexStart;
                while (firstSeparator < filterIndexEnd &&
                    isAllowedHostname(line.charCodeAt(firstSeparator)) === true) {
                    firstSeparator += 1;
                }
                // No separator found so hostname has full length
                if (firstSeparator === filterIndexEnd) {
                    hostname = line.slice(filterIndexStart, filterIndexEnd);
                    filterIndexStart = filterIndexEnd;
                    // mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
                }
                else {
                    // Found a separator
                    hostname = line.slice(filterIndexStart, firstSeparator);
                    filterIndexStart = firstSeparator;
                    var separatorCode = line.charCodeAt(firstSeparator);
                    if (separatorCode === 94 /* '^' */) {
                        // If the only symbol remaining for the selector is '^' then ignore it
                        // but set the filter as right anchored since there should not be any
                        // other label on the right
                        if (filterIndexEnd - filterIndexStart === 1) {
                            filterIndexStart = filterIndexEnd;
                            mask = setBit(mask, 8388608 /* isRightAnchor */);
                        }
                        else {
                            mask = setBit(mask, 67108864 /* isRegex */);
                            mask = setBit(mask, 4194304 /* isLeftAnchor */);
                        }
                    }
                    else if (separatorCode === 42 /* '*' */) {
                        mask = setBit(mask, 67108864 /* isRegex */);
                        // mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
                    }
                    else {
                        mask = setBit(mask, 4194304 /* isLeftAnchor */);
                    }
                }
            }
            // Remove trailing '*'
            if (filterIndexEnd - filterIndexStart > 0 &&
                line.charCodeAt(filterIndexEnd - 1) === 42 /* '*' */) {
                filterIndexEnd -= 1;
            }
            // Remove leading '*' if the filter is not hostname anchored.
            if (getBit(mask, 1048576 /* isHostnameAnchor */) === false &&
                filterIndexEnd - filterIndexStart > 0 &&
                line.charCodeAt(filterIndexStart) === 42 /* '*' */) {
                mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                filterIndexStart += 1;
            }
            // Transform filters on protocol (http, https, ws)
            if (getBit(mask, 4194304 /* isLeftAnchor */)) {
                if (filterIndexEnd - filterIndexStart === 5 &&
                    fastStartsWithFrom(line, 'ws://', filterIndexStart)) {
                    mask = setBit(mask, 4096 /* fromWebsocket */);
                    mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                    filterIndexStart = filterIndexEnd;
                }
                else if (filterIndexEnd - filterIndexStart === 7 &&
                    fastStartsWithFrom(line, 'http://', filterIndexStart)) {
                    mask = setBit(mask, 4 /* fromHttp */);
                    mask = clearBit(mask, 8 /* fromHttps */);
                    mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                    filterIndexStart = filterIndexEnd;
                }
                else if (filterIndexEnd - filterIndexStart === 8 &&
                    fastStartsWithFrom(line, 'https://', filterIndexStart)) {
                    mask = setBit(mask, 8 /* fromHttps */);
                    mask = clearBit(mask, 4 /* fromHttp */);
                    mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                    filterIndexStart = filterIndexEnd;
                }
                else if (filterIndexEnd - filterIndexStart === 8 &&
                    fastStartsWithFrom(line, 'http*://', filterIndexStart)) {
                    mask = setBit(mask, 8 /* fromHttps */);
                    mask = setBit(mask, 4 /* fromHttp */);
                    mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                    filterIndexStart = filterIndexEnd;
                }
            }
            if (filterIndexEnd - filterIndexStart > 0) {
                filter = line.slice(filterIndexStart, filterIndexEnd).toLowerCase();
                mask = setNetworkMask(mask, 134217728 /* isUnicode */, hasUnicode(filter));
                if (getBit(mask, 67108864 /* isRegex */) === false) {
                    mask = setNetworkMask(mask, 67108864 /* isRegex */, checkIsRegex(filter, 0, filter.length));
                }
            }
            // TODO
            // - ignore hostname anchor is not hostname provided
            if (hostname !== undefined) {
                if (getBit(mask, 1048576 /* isHostnameAnchor */) &&
                    fastStartsWith(hostname, 'www.')) {
                    hostname = hostname.slice(4);
                }
                hostname = hostname.toLowerCase();
                if (hasUnicode(hostname)) {
                    mask = setNetworkMask(mask, 134217728 /* isUnicode */, true);
                    hostname = toASCII(hostname);
                }
            }
        }
        return new NetworkFilter({
            csp: csp,
            filter: filter,
            hostname: hostname,
            mask: mask,
            optDomains: optDomains,
            optNotDomains: optNotDomains,
            rawLine: debug === true ? line : undefined,
            redirect: redirect,
            regex: undefined
        });
    };
    /**
     * Deserialize network filters. The code accessing the buffer should be
     * symetrical to the one in `serializeNetworkFilter`.
     */
    NetworkFilter.deserialize = function (buffer) {
        var mask = buffer.getUint32();
        var optionalParts = buffer.getUint8();
        var isUnicode = getBit(mask, 134217728 /* isUnicode */);
        // The order of these statements is important. Since `buffer.getX()` will
        // internally increment the position of next byte to read, they need to be
        // retrieved in the exact same order they were serialized (check
        // `serializeNetworkFilter`).
        return new NetworkFilter({
            // Mandatory field
            mask: mask,
            // Optional parts
            csp: (optionalParts & 1) === 1 ? buffer.getNetworkCSP() : undefined,
            filter: (optionalParts & 2) === 2
                ? isUnicode
                    ? buffer.getUTF8()
                    : buffer.getNetworkFilter()
                : undefined,
            hostname: (optionalParts & 4) === 4 ? buffer.getNetworkHostname() : undefined,
            optDomains: (optionalParts & 8) === 8 ? buffer.getUint32Array() : undefined,
            optNotDomains: (optionalParts & 16) === 16 ? buffer.getUint32Array() : undefined,
            rawLine: (optionalParts & 32) === 32
                ? isUnicode
                    ? buffer.getUTF8()
                    : buffer.getASCII()
                : undefined,
            redirect: (optionalParts & 64) === 64 ? buffer.getNetworkRedirect() : undefined,
            regex: undefined
        });
    };
    NetworkFilter.prototype.isCosmeticFilter = function () {
        return false;
    };
    NetworkFilter.prototype.isNetworkFilter = function () {
        return true;
    };
    NetworkFilter.prototype.match = function (request) {
        return checkOptions(this, request) && checkPattern(this, request);
    };
    /**
     * To allow for a more compact representation of network filters, the
     * representation is composed of a mandatory header, and some optional
     *
     * Header:
     * =======
     *
     *  | opt | mask
     *     8     32
     *
     * For an empty filter having no pattern, hostname, the minimum size is: 42 bits.
     *
     * Then for each optional part (filter, hostname optDomains, optNotDomains,
     * redirect), it takes 16 bits for the length of the string + the length of the
     * string in bytes.
     *
     * The optional parts are written in order of there number of occurrence in the
     * filter list used by the adblocker. The most common being `hostname`, then
     * `filter`, `optDomains`, `optNotDomains`, `redirect`.
     *
     * Example:
     * ========
     *
     * @@||cliqz.com would result in a serialized version:
     *
     * | 1 | mask | 9 | c | l | i | q | z | . | c | o | m  (16 bytes)
     *
     * In this case, the serialized version is actually bigger than the original
     * filter, but faster to deserialize. In the future, we could optimize the
     * representation to compact small filters better.
     *
     * Ideas:
     *  * variable length encoding for the mask (if not option, take max 1 byte).
     *  * first byte could contain the mask as well if small enough.
     *  * when packing ascii string, store several of them in each byte.
     */
    NetworkFilter.prototype.serialize = function (buffer) {
        buffer.pushUint32(this.mask);
        var index = buffer.getPos();
        buffer.pushUint8(0);
        // This bit-mask indicates which optional parts of the filter were serialized.
        var optionalParts = 0;
        if (this.csp !== undefined) {
            optionalParts |= 1;
            buffer.pushNetworkCSP(this.csp);
        }
        if (this.filter !== undefined) {
            optionalParts |= 2;
            if (this.isUnicode()) {
                buffer.pushUTF8(this.filter);
            }
            else {
                buffer.pushNetworkFilter(this.filter);
            }
        }
        if (this.hostname !== undefined) {
            optionalParts |= 4;
            buffer.pushNetworkHostname(this.hostname);
        }
        if (this.optDomains !== undefined) {
            optionalParts |= 8;
            buffer.pushUint32Array(this.optDomains);
        }
        if (this.optNotDomains !== undefined) {
            optionalParts |= 16;
            buffer.pushUint32Array(this.optNotDomains);
        }
        if (this.rawLine !== undefined) {
            optionalParts |= 32;
            if (this.isUnicode()) {
                buffer.pushUTF8(this.rawLine);
            }
            else {
                buffer.pushASCII(this.rawLine);
            }
        }
        if (this.redirect !== undefined) {
            optionalParts |= 64;
            buffer.pushNetworkRedirect(this.redirect);
        }
        buffer.setByte(index, optionalParts);
    };
    NetworkFilter.prototype.getSerializedSize = function () {
        var estimate = 4 + 1; // mask = 4 bytes // optional parts = 1 byte
        if (this.csp !== undefined) {
            estimate += StaticDataView.sizeOfASCII(this.csp);
        }
        if (this.filter !== undefined) {
            if (this.isUnicode()) {
                estimate += StaticDataView.sizeOfUTF8(this.filter);
            }
            else {
                estimate += StaticDataView.sizeOfASCII(this.filter);
            }
        }
        if (this.hostname !== undefined) {
            estimate += StaticDataView.sizeOfASCII(this.hostname);
        }
        if (this.optDomains !== undefined) {
            estimate += StaticDataView.sizeOfUint32Array(this.optDomains);
        }
        if (this.optNotDomains !== undefined) {
            estimate += StaticDataView.sizeOfUint32Array(this.optNotDomains);
        }
        if (this.rawLine !== undefined) {
            if (this.isUnicode()) {
                estimate += StaticDataView.sizeOfUTF8(this.rawLine);
            }
            else {
                estimate += StaticDataView.sizeOfASCII(this.rawLine);
            }
        }
        if (this.redirect !== undefined) {
            estimate += StaticDataView.sizeOfASCII(this.redirect);
        }
        return estimate;
    };
    /**
     * Tries to recreate the original representation of the filter (adblock
     * syntax) from the internal representation. If `rawLine` is set (when filters
     * are parsed in `debug` mode for example), then it is returned directly.
     * Otherwise, we try to stick as closely as possible to the original form;
     * there are things which cannot be recovered though, like domains options
     * of which only hashes are stored.
     */
    NetworkFilter.prototype.toString = function () {
        if (this.rawLine !== undefined) {
            return this.rawLine;
        }
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
            // Visualize the compiled regex
            filter += this.getRegex().source;
        }
        // Options
        var options = [];
        if (!this.fromAny()) {
            var numberOfCptOptions = bitCount(this.getCptMask());
            var numberOfNegatedOptions = bitCount(FROM_ANY) - numberOfCptOptions;
            if (numberOfNegatedOptions < numberOfCptOptions) {
                if (!this.fromImage()) {
                    options.push('~image');
                }
                if (!this.fromMedia()) {
                    options.push('~media');
                }
                if (!this.fromObject()) {
                    options.push('~object');
                }
                if (!this.fromOther()) {
                    options.push('~other');
                }
                if (!this.fromPing()) {
                    options.push('~ping');
                }
                if (!this.fromScript()) {
                    options.push('~script');
                }
                if (!this.fromStylesheet()) {
                    options.push('~stylesheet');
                }
                if (!this.fromSubdocument()) {
                    options.push('~subdocument');
                }
                if (!this.fromWebsocket()) {
                    options.push('~websocket');
                }
                if (!this.fromXmlHttpRequest()) {
                    options.push('~xmlhttprequest');
                }
                if (!this.fromFont()) {
                    options.push('~font');
                }
            }
            else {
                if (this.fromImage()) {
                    options.push('image');
                }
                if (this.fromMedia()) {
                    options.push('media');
                }
                if (this.fromObject()) {
                    options.push('object');
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
        }
        if (this.isFuzzy()) {
            options.push('fuzzy');
        }
        if (this.isImportant()) {
            options.push('important');
        }
        if (this.isRedirect()) {
            options.push("redirect=" + this.getRedirect());
        }
        if (this.isCSP()) {
            options.push("csp=" + this.csp);
        }
        if (this.isGenericHide()) {
            options.push('generichide');
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
            options.push('domain=<hashed>');
        }
        if (this.isBadFilter()) {
            options.push('badfilter');
        }
        if (options.length > 0) {
            filter += "$" + options.join(',');
        }
        if (this.isRightAnchor()) {
            filter += '|';
        }
        return filter;
    };
    // Public API (Read-Only)
    NetworkFilter.prototype.getIdWithoutBadFilter = function () {
        // This method computes the id ignoring the $badfilter option (which will
        // correspond to the ID of filters being discarded). This allows us to
        // eliminate bad filters by comparing IDs, which is more robust and faster
        // than string comparison.
        return computeFilterId(this.csp, this.mask & ~65536 /* isBadFilter */, this.filter, this.hostname, this.optDomains, this.optNotDomains, this.redirect);
    };
    NetworkFilter.prototype.getId = function () {
        if (this.id === undefined) {
            this.id = computeFilterId(this.csp, this.mask, this.filter, this.hostname, this.optDomains, this.optNotDomains, this.redirect);
        }
        return this.id;
    };
    NetworkFilter.prototype.hasFilter = function () {
        return this.filter !== undefined;
    };
    NetworkFilter.prototype.hasOptNotDomains = function () {
        return this.optNotDomains !== undefined;
    };
    NetworkFilter.prototype.getOptNotDomains = function () {
        return this.optNotDomains || EMPTY_ARRAY;
    };
    NetworkFilter.prototype.hasOptDomains = function () {
        return this.optDomains !== undefined;
    };
    NetworkFilter.prototype.getOptDomains = function () {
        return this.optDomains || EMPTY_ARRAY;
    };
    NetworkFilter.prototype.getMask = function () {
        return this.mask;
    };
    NetworkFilter.prototype.getCptMask = function () {
        return this.getMask() & FROM_ANY;
    };
    NetworkFilter.prototype.isRedirect = function () {
        return this.redirect !== undefined;
    };
    NetworkFilter.prototype.getRedirect = function () {
        return this.redirect || '';
    };
    NetworkFilter.prototype.hasHostname = function () {
        return this.hostname !== undefined;
    };
    NetworkFilter.prototype.getHostname = function () {
        return this.hostname || '';
    };
    NetworkFilter.prototype.getFilter = function () {
        return this.filter || '';
    };
    NetworkFilter.prototype.getRegex = function () {
        if (this.regex === undefined) {
            this.regex =
                this.filter !== undefined && this.isRegex()
                    ? compileRegex(this.filter, this.isLeftAnchor(), this.isRightAnchor(), this.isFullRegex())
                    : MATCH_ALL;
        }
        return this.regex;
    };
    NetworkFilter.prototype.getFuzzySignature = function () {
        if (this.fuzzySignature === undefined) {
            this.fuzzySignature =
                this.filter !== undefined && this.isFuzzy()
                    ? createFuzzySignature(this.filter)
                    : EMPTY_ARRAY;
        }
        return this.fuzzySignature;
    };
    NetworkFilter.prototype.getTokens = function () {
        TOKENS_BUFFER.seekZero();
        // If there is only one domain and no domain negation, we also use this
        // domain as a token.
        if (this.optDomains !== undefined &&
            this.optNotDomains === undefined &&
            this.optDomains.length === 1) {
            TOKENS_BUFFER.push(this.optDomains[0]);
        }
        // Get tokens from filter
        if (this.isFullRegex() === false) {
            if (this.filter !== undefined) {
                var skipLastToken = this.isPlain() && !this.isRightAnchor() && !this.isFuzzy();
                var skipFirstToken = !this.isLeftAnchor() && !this.isFuzzy();
                tokenizeFilterInPlace(this.filter, skipFirstToken, skipLastToken, TOKENS_BUFFER);
            }
            // Append tokens from hostname, if any
            if (this.hostname !== undefined) {
                tokenizeFilterInPlace(this.hostname, false, this.filter !== undefined && this.filter.charCodeAt(0) === 42 /* '*' */, TOKENS_BUFFER);
            }
        }
        else if (this.filter !== undefined) {
            tokenizeRegexInPlace(this.filter, TOKENS_BUFFER);
        }
        // If we got no tokens for the filter/hostname part, then we will dispatch
        // this filter in multiple buckets based on the domains option.
        if (TOKENS_BUFFER.pos === 0 &&
            this.optDomains !== undefined &&
            this.optNotDomains === undefined) {
            var result = [];
            for (var i = 0; i < this.optDomains.length; i += 1) {
                result.push(new Uint32Array([this.optDomains[i]]));
            }
            return result;
        }
        // Add optional token for protocol
        if (this.fromHttp() === true && this.fromHttps() === false) {
            TOKENS_BUFFER.push(HTTP_HASH);
        }
        else if (this.fromHttps() === true && this.fromHttp() === false) {
            TOKENS_BUFFER.push(HTTPS_HASH);
        }
        return [TOKENS_BUFFER.slice()];
    };
    /**
     * Check if this filter should apply to a request with this content type.
     */
    NetworkFilter.prototype.isCptAllowed = function (cpt) {
        var mask = REQUEST_TYPE_TO_MASK[cpt];
        if (mask !== undefined) {
            return getBit(this.mask, mask);
        }
        // If content type is not supported (or not specified), we return `true`
        // only if the filter does not specify any resource type.
        return this.fromAny();
    };
    NetworkFilter.prototype.isFuzzy = function () {
        return getBit(this.mask, 32768 /* fuzzyMatch */);
    };
    NetworkFilter.prototype.isException = function () {
        return getBit(this.mask, 262144 /* isException */);
    };
    NetworkFilter.prototype.isHostnameAnchor = function () {
        return getBit(this.mask, 1048576 /* isHostnameAnchor */);
    };
    NetworkFilter.prototype.isRightAnchor = function () {
        return getBit(this.mask, 8388608 /* isRightAnchor */);
    };
    NetworkFilter.prototype.isLeftAnchor = function () {
        return getBit(this.mask, 4194304 /* isLeftAnchor */);
    };
    NetworkFilter.prototype.isImportant = function () {
        return getBit(this.mask, 2097152 /* isImportant */);
    };
    NetworkFilter.prototype.isFullRegex = function () {
        return getBit(this.mask, 33554432 /* isFullRegex */);
    };
    NetworkFilter.prototype.isRegex = function () {
        return (getBit(this.mask, 67108864 /* isRegex */) ||
            getBit(this.mask, 33554432 /* isFullRegex */));
    };
    NetworkFilter.prototype.isPlain = function () {
        return !this.isRegex();
    };
    NetworkFilter.prototype.isCSP = function () {
        return getBit(this.mask, 131072 /* isCSP */);
    };
    NetworkFilter.prototype.isGenericHide = function () {
        return getBit(this.mask, 524288 /* isGenericHide */);
    };
    NetworkFilter.prototype.isBadFilter = function () {
        return getBit(this.mask, 65536 /* isBadFilter */);
    };
    NetworkFilter.prototype.isUnicode = function () {
        return getBit(this.mask, 134217728 /* isUnicode */);
    };
    NetworkFilter.prototype.fromAny = function () {
        return this.getCptMask() === FROM_ANY;
    };
    NetworkFilter.prototype.thirdParty = function () {
        return getBit(this.mask, 16777216 /* thirdParty */);
    };
    NetworkFilter.prototype.firstParty = function () {
        return getBit(this.mask, 16384 /* firstParty */);
    };
    NetworkFilter.prototype.fromImage = function () {
        return getBit(this.mask, 16 /* fromImage */);
    };
    NetworkFilter.prototype.fromMedia = function () {
        return getBit(this.mask, 32 /* fromMedia */);
    };
    NetworkFilter.prototype.fromObject = function () {
        return getBit(this.mask, 64 /* fromObject */);
    };
    NetworkFilter.prototype.fromOther = function () {
        return getBit(this.mask, 128 /* fromOther */);
    };
    NetworkFilter.prototype.fromPing = function () {
        return getBit(this.mask, 256 /* fromPing */);
    };
    NetworkFilter.prototype.fromScript = function () {
        return getBit(this.mask, 512 /* fromScript */);
    };
    NetworkFilter.prototype.fromStylesheet = function () {
        return getBit(this.mask, 1024 /* fromStylesheet */);
    };
    NetworkFilter.prototype.fromDocument = function () {
        return getBit(this.mask, 1 /* fromDocument */);
    };
    NetworkFilter.prototype.fromSubdocument = function () {
        return getBit(this.mask, 2048 /* fromSubdocument */);
    };
    NetworkFilter.prototype.fromWebsocket = function () {
        return getBit(this.mask, 4096 /* fromWebsocket */);
    };
    NetworkFilter.prototype.fromHttp = function () {
        return getBit(this.mask, 4 /* fromHttp */);
    };
    NetworkFilter.prototype.fromHttps = function () {
        return getBit(this.mask, 8 /* fromHttps */);
    };
    NetworkFilter.prototype.fromXmlHttpRequest = function () {
        return getBit(this.mask, 8192 /* fromXmlHttpRequest */);
    };
    NetworkFilter.prototype.fromFont = function () {
        return getBit(this.mask, 2 /* fromFont */);
    };
    return NetworkFilter;
}());
export default NetworkFilter;
// ---------------------------------------------------------------------------
// Filter parsing
// ---------------------------------------------------------------------------
function setNetworkMask(mask, m, value) {
    if (value === true) {
        return setBit(mask, m);
    }
    return clearBit(mask, m);
}
/**
 * Check if the sub-string contained between the indices start and end is a
 * regex filter (it contains a '*' or '^' char).
 */
function checkIsRegex(filter, start, end) {
    var indexOfSeparator = filter.indexOf('^', start);
    if (indexOfSeparator !== -1 && indexOfSeparator < end) {
        return true;
    }
    var indexOfWildcard = filter.indexOf('*', start);
    return indexOfWildcard !== -1 && indexOfWildcard < end;
}
/**
 * Handle hostname anchored filters, given 'hostname' from ||hostname and
 * request's hostname, check if there is a match. This is tricky because
 * filters authors rely and different assumptions. We can have prefix of suffix
 * matches of anchor.
 */
export function isAnchoredByHostname(filterHostname, hostname, isFollowedByWildcard) {
    // Corner-case, if `filterHostname` is empty, then it's a match
    if (filterHostname.length === 0) {
        return true;
    }
    // `filterHostname` cannot be longer than actual hostname
    if (filterHostname.length > hostname.length) {
        return false;
    }
    // If they have the same length, they should be equal
    if (filterHostname.length === hostname.length) {
        return filterHostname === hostname;
    }
    // Check if `filterHostname` appears anywhere in `hostname`
    var matchIndex = hostname.indexOf(filterHostname);
    // No match
    if (matchIndex === -1) {
        return false;
    }
    // `filterHostname` is a prefix of `hostname` and needs to match full a label.
    //
    // Examples (filterHostname, hostname):
    //   * (foo, foo.com)
    //   * (sub.foo, sub.foo.com)
    if (matchIndex === 0) {
        return (isFollowedByWildcard ||
            hostname.charCodeAt(filterHostname.length) === 46 ||
            filterHostname.charCodeAt(filterHostname.length - 1) === 46);
    }
    // `filterHostname` is a suffix of `hostname`.
    //
    // Examples (filterHostname, hostname):
    //    * (foo.com, sub.foo.com)
    //    * (com, foo.com)
    if (hostname.length === matchIndex + filterHostname.length) {
        return hostname.charCodeAt(matchIndex - 1) === 46 || filterHostname.charCodeAt(0) === 46;
    }
    // `filterHostname` is infix of `hostname` and needs match full labels
    return ((isFollowedByWildcard ||
        hostname.charCodeAt(filterHostname.length) === 46 ||
        filterHostname.charCodeAt(filterHostname.length - 1) === 46) &&
        (hostname.charCodeAt(matchIndex - 1) === 46 || filterHostname.charCodeAt(0) === 46));
}
// pattern$fuzzy
function checkPatternFuzzyFilter(filter, request) {
    var signature = filter.getFuzzySignature();
    var requestSignature = request.getFuzzySignature();
    if (signature.length > requestSignature.length) {
        return false;
    }
    var lastIndex = 0;
    for (var i = 0; i < signature.length; i += 1) {
        var c = signature[i];
        // Find the occurrence of `c` in `requestSignature`
        var j = requestSignature.indexOf(c, lastIndex);
        if (j === -1) {
            return false;
        }
        lastIndex = j + 1;
    }
    return true;
}
/**
 * Specialize a network filter depending on its type. It allows for more
 * efficient matching function.
 */
function checkPattern(filter, request) {
    var pattern = filter.getFilter();
    if (filter.isHostnameAnchor()) {
        // Make sure request is anchored by hostname before proceeding to matching
        var filterHostname = filter.getHostname();
        if (isAnchoredByHostname(filterHostname, request.hostname, filter.filter !== undefined && filter.filter.charCodeAt(0) === 42 /* '*' */) === false) {
            return false;
        }
        // At this point we know request is hostname anchored so we match the rest of the filter.
        if (filter.isRegex()) {
            // ||pattern*^
            return filter
                .getRegex()
                .test(request.url.slice(request.url.indexOf(filterHostname) + filterHostname.length));
        }
        else if (filter.isRightAnchor() && filter.isLeftAnchor()) {
            // |||pattern|
            // Since this is not a regex, the filter pattern must follow the hostname
            // with nothing in between. So we extract the part of the URL following
            // after hostname and will perform the matching on it.
            var urlAfterHostname = request.url.slice(request.url.indexOf(filterHostname) + filterHostname.length);
            // Since it must follow immediatly after the hostname and be a suffix of
            // the URL, we conclude that filter must be equal to the part of the
            // url following the hostname.
            return pattern === urlAfterHostname;
        }
        else if (filter.isRightAnchor()) {
            // ||pattern|
            var requestHostname = request.hostname;
            if (filter.hasFilter() === false) {
                // In this specific case it means that the specified hostname should match
                // at the end of the hostname of the request. This allows to prevent false
                // positive like ||foo.bar which would match https://foo.bar.baz where
                // ||foo.bar^ would not.
                return (filterHostname.length === requestHostname.length ||
                    requestHostname.endsWith(filterHostname));
            }
            else {
                // pattern|
                return request.url.endsWith(pattern);
            }
        }
        else if (filter.isFuzzy()) {
            // ||pattern$fuzzy
            return checkPatternFuzzyFilter(filter, request);
        }
        else if (filter.isLeftAnchor()) {
            // ||pattern + left-anchor => This means that a plain pattern needs to appear
            // exactly after the hostname, with nothing in between.
            // Since this is not a regex, the filter pattern must follow the hostname
            // with nothing in between. So we extract the part of the URL following
            // after hostname and will perform the matching on it.
            return fastStartsWithFrom(request.url, pattern, request.url.indexOf(filterHostname) + filterHostname.length);
        }
        if (filter.hasFilter() === false) {
            return true;
        }
        // We consider this a match if the plain patter (i.e.: filter) appears anywhere.
        return (request.url.indexOf(pattern, request.url.indexOf(filterHostname) + filterHostname.length) !==
            -1);
    }
    else if (filter.isRegex()) {
        // pattern*^
        return filter.getRegex().test(request.url);
    }
    else if (filter.isLeftAnchor() && filter.isRightAnchor()) {
        // |pattern|
        return request.url === pattern;
    }
    else if (filter.isLeftAnchor()) {
        // |pattern
        return fastStartsWith(request.url, pattern);
    }
    else if (filter.isRightAnchor()) {
        // pattern|
        return request.url.endsWith(pattern);
    }
    else if (filter.isFuzzy()) {
        return checkPatternFuzzyFilter(filter, request);
    }
    // pattern
    if (filter.hasFilter() === false) {
        return true;
    }
    return request.url.indexOf(pattern) !== -1;
}
function checkOptions(filter, request) {
    // We first discard requests based on type, protocol and party. This is really
    // cheap and should be done first.
    if (filter.isCptAllowed(request.type) === false ||
        (request.isHttps === true && filter.fromHttps() === false) ||
        (request.isHttp === true && filter.fromHttp() === false) ||
        (filter.firstParty() === false && request.isFirstParty === true) ||
        (filter.thirdParty() === false && request.isThirdParty === true)) {
        return false;
    }
    // Source URL must be among these domains to match
    if (filter.hasOptDomains()) {
        var optDomains = filter.getOptDomains();
        if (binLookup(optDomains, request.sourceHostnameHash) === false &&
            binLookup(optDomains, request.sourceDomainHash) === false) {
            return false;
        }
    }
    // Source URL must not be among these domains to match
    if (filter.hasOptNotDomains()) {
        var optNotDomains = filter.getOptNotDomains();
        if (binLookup(optNotDomains, request.sourceHostnameHash) === true ||
            binLookup(optNotDomains, request.sourceDomainHash) === true) {
            return false;
        }
    }
    return true;
}
