/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Config from '../../config';
import StaticDataView from '../../data-view';
import CosmeticFilter from '../../filters/cosmetic';
import ReverseIndex from '../reverse-index';
import FiltersContainer from './filters';
/**
 * Given a list of CSS selectors, create a valid stylesheet ready to be
 * injected in the page. This also takes care to no create rules with too many
 * selectors for Chrome, see: https://crbug.com/804179
 */
export declare function createStylesheet(rules: string[], style: string): string;
/**
 * Efficient container for CosmeticFilter instances. Allows to quickly
 * retrieved scripts and stylesheets to inject in pages for a specific
 * hostname/domain.
 */
export default class CosmeticFilterBucket {
    static deserialize(buffer: StaticDataView, config: Config): CosmeticFilterBucket;
    hostnameIndex: ReverseIndex<CosmeticFilter>;
    unhideIndex: ReverseIndex<CosmeticFilter>;
    classesIndex: ReverseIndex<CosmeticFilter>;
    idsIndex: ReverseIndex<CosmeticFilter>;
    hrefsIndex: ReverseIndex<CosmeticFilter>;
    genericRules: FiltersContainer<CosmeticFilter>;
    baseStylesheet: string | null;
    extraGenericRules: CosmeticFilter[] | null;
    constructor({ filters, config }: {
        filters?: CosmeticFilter[];
        config: Config;
    });
    getFilters(): CosmeticFilter[];
    update(newFilters: CosmeticFilter[], removedFilters: Set<number> | undefined): void;
    serialize(buffer: StaticDataView): void;
    /**
     * Request cosmetics and scripts to inject in a page.
     */
    getCosmeticsFilters({ domain, hostname, classes, hrefs, ids, allowGenericHides, getBaseRules, getInjectionRules, getRulesFromDOM, getRulesFromHostname, }: {
        domain: string;
        hostname: string;
        classes?: string[];
        hrefs?: string[];
        ids?: string[];
        allowGenericHides: boolean;
        getBaseRules?: boolean;
        getInjectionRules?: boolean;
        getRulesFromDOM?: boolean;
        getRulesFromHostname?: boolean;
    }): {
        injections: CosmeticFilter[];
        stylesheet: string;
    };
    /**
     * Return the list of filters which can potentially be un-hidden by another
     * rule currently contained in the cosmetic bucket.
     */
    private getGenericRules;
    /**
     * The base stylesheet is made of generic filters (not specific to any
     * hostname) which cannot be hidden (i.e.: there is currently no rule which
     * might hide their selector). This means that it will never change and is
     * the same for all sites. We generate it once and re-use it any-time we want
     * to inject it.
     */
    private getBaseStylesheet;
    /**
     * This is used to lazily generate both the list of generic rules which can
     * *potentially be un-hidden* (i.e.: there exists at least once unhide rule
     * for the selector) and a stylesheet containing all selectors which cannot
     * be un-hidden. Since this list will not change between updates we can
     * generate once and use many times.
     */
    private lazyPopulateGenericRulesCache;
}
