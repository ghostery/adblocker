/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import StaticDataView from '../data-view';
import Request, { RequestType } from '../request';
import IFilter from './interface';
/**
 * Masks used to store options of network filters in a bitmask.
 */
export declare const enum NETWORK_FILTER_MASK {
    fromDocument = 1,
    fromFont = 2,
    fromHttp = 4,
    fromHttps = 8,
    fromImage = 16,
    fromMedia = 32,
    fromObject = 64,
    fromOther = 128,
    fromPing = 256,
    fromScript = 512,
    fromStylesheet = 1024,
    fromSubdocument = 2048,
    fromWebsocket = 4096,
    fromXmlHttpRequest = 8192,
    firstParty = 16384,
    fuzzyMatch = 32768,
    isBadFilter = 65536,
    isCSP = 131072,
    isException = 262144,
    isGenericHide = 524288,
    isHostnameAnchor = 1048576,
    isImportant = 2097152,
    isLeftAnchor = 4194304,
    isRightAnchor = 8388608,
    thirdParty = 16777216,
    isFullRegex = 33554432,
    isRegex = 67108864,
    isUnicode = 134217728
}
export default class NetworkFilter implements IFilter {
    static parse(line: string, debug?: boolean): NetworkFilter | null;
    /**
     * Deserialize network filters. The code accessing the buffer should be
     * symetrical to the one in `serializeNetworkFilter`.
     */
    static deserialize(buffer: StaticDataView): NetworkFilter;
    readonly csp: string | undefined;
    readonly filter: string | undefined;
    readonly hostname: string | undefined;
    readonly mask: number;
    readonly optDomains: Uint32Array | undefined;
    readonly optNotDomains: Uint32Array | undefined;
    readonly redirect: string | undefined;
    readonly rawLine: string | undefined;
    id: number | undefined;
    regex: RegExp | undefined;
    private fuzzySignature;
    constructor({ csp, filter, hostname, mask, optDomains, optNotDomains, rawLine, redirect, regex, }: {
        csp: string | undefined;
        filter: string | undefined;
        hostname: string | undefined;
        mask: number;
        optDomains: Uint32Array | undefined;
        optNotDomains: Uint32Array | undefined;
        rawLine: string | undefined;
        redirect: string | undefined;
        regex: RegExp | undefined;
    });
    isCosmeticFilter(): boolean;
    isNetworkFilter(): boolean;
    match(request: Request): boolean;
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
    serialize(buffer: StaticDataView): void;
    getSerializedSize(): number;
    /**
     * Tries to recreate the original representation of the filter (adblock
     * syntax) from the internal representation. If `rawLine` is set (when filters
     * are parsed in `debug` mode for example), then it is returned directly.
     * Otherwise, we try to stick as closely as possible to the original form;
     * there are things which cannot be recovered though, like domains options
     * of which only hashes are stored.
     */
    toString(): string;
    getIdWithoutBadFilter(): number;
    getId(): number;
    hasFilter(): boolean;
    hasOptNotDomains(): boolean;
    getOptNotDomains(): Uint32Array;
    hasOptDomains(): boolean;
    getOptDomains(): Uint32Array;
    getMask(): number;
    getCptMask(): number;
    isRedirect(): boolean;
    getRedirect(): string;
    hasHostname(): boolean;
    getHostname(): string;
    getFilter(): string;
    getRegex(): RegExp;
    getFuzzySignature(): Uint32Array;
    getTokens(): Uint32Array[];
    /**
     * Check if this filter should apply to a request with this content type.
     */
    isCptAllowed(cpt: RequestType): boolean;
    isFuzzy(): boolean;
    isException(): boolean;
    isHostnameAnchor(): boolean;
    isRightAnchor(): boolean;
    isLeftAnchor(): boolean;
    isImportant(): boolean;
    isFullRegex(): boolean;
    isRegex(): boolean;
    isPlain(): boolean;
    isCSP(): boolean;
    isGenericHide(): boolean;
    isBadFilter(): boolean;
    isUnicode(): boolean;
    fromAny(): boolean;
    thirdParty(): boolean;
    firstParty(): boolean;
    fromImage(): boolean;
    fromMedia(): boolean;
    fromObject(): boolean;
    fromOther(): boolean;
    fromPing(): boolean;
    fromScript(): boolean;
    fromStylesheet(): boolean;
    fromDocument(): boolean;
    fromSubdocument(): boolean;
    fromWebsocket(): boolean;
    fromHttp(): boolean;
    fromHttps(): boolean;
    fromXmlHttpRequest(): boolean;
    fromFont(): boolean;
}
/**
 * Handle hostname anchored filters, given 'hostname' from ||hostname and
 * request's hostname, check if there is a match. This is tricky because
 * filters authors rely and different assumptions. We can have prefix of suffix
 * matches of anchor.
 */
export declare function isAnchoredByHostname(filterHostname: string, hostname: string, isFollowedByWildcard: boolean): boolean;
