/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import StaticDataView from '../data-view';
import IFilter from './interface';
export declare const DEFAULT_HIDDING_STYLE: string;
export declare function hashHostnameBackward(hostname: string): number;
export declare function getHashesFromLabelsBackward(hostname: string, end: number, startOfDomain: number): number[];
export declare function getEntityHashesFromLabelsBackward(hostname: string, domain: string): number[];
export declare function getHostnameHashesFromLabelsBackward(hostname: string, domain: string): number[];
/**
 * Given a hostname and its domain, return the hostname without the public
 * suffix. We know that the domain, with one less label on the left, will be a
 * the public suffix; and from there we know which trailing portion of
 * `hostname` we should remove.
 */
export declare function getHostnameWithoutPublicSuffix(hostname: string, domain: string): string | null;
/***************************************************************************
 *  Cosmetic filters parsing
 * ************************************************************************ */
export default class CosmeticFilter implements IFilter {
    /**
     * Given a line that we know contains a cosmetic filter, create a CosmeticFiler
     * instance out of it. This function should be *very* efficient, as it will be
     * used to parse tens of thousands of lines.
     */
    static parse(line: string, debug?: boolean): CosmeticFilter | null;
    /**
     * Deserialize cosmetic filters. The code accessing the buffer should be
     * symetrical to the one in `serializeCosmeticFilter`.
     */
    static deserialize(buffer: StaticDataView): CosmeticFilter;
    readonly mask: number;
    readonly selector: string;
    readonly entities: Uint32Array | undefined;
    readonly hostnames: Uint32Array | undefined;
    readonly notEntities: Uint32Array | undefined;
    readonly notHostnames: Uint32Array | undefined;
    readonly style: string | undefined;
    readonly rawLine: string | undefined;
    private id;
    constructor({ mask, selector, entities, hostnames, notEntities, notHostnames, rawLine, style, }: {
        entities: Uint32Array | undefined;
        hostnames: Uint32Array | undefined;
        mask: number;
        notEntities: Uint32Array | undefined;
        notHostnames: Uint32Array | undefined;
        rawLine: string | undefined;
        selector: string;
        style: string | undefined;
    });
    isCosmeticFilter(): boolean;
    isNetworkFilter(): boolean;
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
    serialize(buffer: StaticDataView): void;
    /**
     * Return an estimation of the size (in bytes) needed to persist this filter
     * in a DataView. This does not need to be 100% accurate but should be an
     * upper-bound. It should also be as fast as possible.
     */
    getSerializedSize(): number;
    /**
     * Create a more human-readable version of this filter. It is mainly used for
     * debugging purpose, as it will expand the values stored in the bit mask.
     */
    toString(): string;
    match(hostname: string, domain: string): boolean;
    /**
     * Get tokens for this filter. It can be indexed multiple times if multiple
     * hostnames are specified (e.g.: host1,host2##.selector).
     */
    getTokens(): Uint32Array[];
    getScript(js: Map<string, string>): string | undefined;
    hasHostnameConstraint(): boolean;
    getId(): number;
    hasCustomStyle(): boolean;
    getStyle(): string;
    getSelector(): string;
    isUnhide(): boolean;
    isScriptInject(): boolean;
    isCSS(): boolean;
    isIdSelector(): boolean;
    isClassSelector(): boolean;
    isHrefSelector(): boolean;
    isUnicode(): boolean;
    isGenericHide(): boolean;
}
