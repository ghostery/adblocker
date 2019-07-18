/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/// <reference types="chrome" />
import { WebRequestHeadersReceivedDetails } from './request';
import TokensBuffer from './tokens-buffer';
/***************************************************************************
 *  Bitwise helpers
 * ************************************************************************* */
export declare function bitCount(n: number): number;
export declare function getBit(n: number, mask: number): boolean;
export declare function setBit(n: number, mask: number): number;
export declare function clearBit(n: number, mask: number): number;
export declare function fastHash(str: string): number;
export declare function hashStrings(strings: string[]): Uint32Array;
export declare function fastStartsWith(haystack: string, needle: string): boolean;
export declare function fastStartsWithFrom(haystack: string, needle: string, start: number): boolean;
export declare function isDigit(ch: number): boolean;
export declare function isAlpha(ch: number): boolean;
export declare function tokenizeInPlace(pattern: string, buffer: TokensBuffer): void;
export declare function tokenize(pattern: string): Uint32Array;
export declare function tokenizeFilterInPlace(pattern: string, skipFirstToken: boolean, skipLastToken: boolean, buffer: TokensBuffer): void;
export declare function tokenizeFilter(pattern: string, skipFirstToken: boolean, skipLastToken: boolean): Uint32Array;
export declare function tokenizeRegexInPlace(selector: string, tokens: TokensBuffer): void;
export declare function createFuzzySignature(pattern: string): Uint32Array;
export declare function binSearch(arr: Uint32Array, elt: number): number;
export declare function binLookup(arr: Uint32Array, elt: number): boolean;
export declare function updateResponseHeadersWithCSP(details: WebRequestHeadersReceivedDetails, policies: string | undefined): chrome.webRequest.BlockingResponse;
export declare function hasUnicode(str: string): boolean;
