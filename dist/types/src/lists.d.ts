/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Config from './config';
import CosmeticFilter from './filters/cosmetic';
import NetworkFilter from './filters/network';
export declare function parseFilter(filter: string): NetworkFilter | CosmeticFilter | null;
export declare function f(strings: TemplateStringsArray): NetworkFilter | CosmeticFilter | null;
export declare function parseFilters(list: string, config?: Partial<Config>): {
    networkFilters: NetworkFilter[];
    cosmeticFilters: CosmeticFilter[];
};
export interface IListDiff {
    newNetworkFilters: NetworkFilter[];
    newCosmeticFilters: CosmeticFilter[];
    removedCosmeticFilters: number[];
    removedNetworkFilters: number[];
}
export interface IRawDiff {
    added: string[];
    removed: string[];
}
/**
 * Helper used to return a set of lines as strings where each line is
 * guaranteed to be a valid filter (i.e.: comments, empty lines and
 * un-supported filters are dropped).
 */
export declare function getLinesWithFilters(list: string, config?: Partial<Config>): Set<string>;
/**
 * Given two versions of the same subscription (e.g.: EasyList) as a string,
 * generate a raw diff (i.e.: a list of filters added and filters removed, in
 * their raw string form).
 */
export declare function generateDiff(prevRevision: string, newRevision: string, config?: Partial<Config>): IRawDiff;
/**
 * Merge several raw diffs into one, taking care of accumulating added and
 * removed filters, even if several diffs add/remove the same ones.
 */
export declare function mergeDiffs(diffs: Array<Partial<IRawDiff>>): IRawDiff;
