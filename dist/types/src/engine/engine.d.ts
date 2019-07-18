/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Config from '../config';
import { IMessageFromBackground } from '../content/communication';
import CosmeticFilter from '../filters/cosmetic';
import NetworkFilter from '../filters/network';
import { IListDiff, IRawDiff } from '../lists';
import Request from '../request';
import Resources from '../resources';
import CosmeticFilterBucket from './bucket/cosmetic';
import NetworkFilterBucket from './bucket/network';
export declare const ENGINE_VERSION = 29;
export default class FilterEngine {
    static parse(filters: string, options?: Partial<Config>): FilterEngine;
    static deserialize(serialized: Uint8Array): FilterEngine;
    lists: Map<string, string>;
    csp: NetworkFilterBucket;
    genericHides: NetworkFilterBucket;
    exceptions: NetworkFilterBucket;
    importants: NetworkFilterBucket;
    redirects: NetworkFilterBucket;
    filters: NetworkFilterBucket;
    cosmetics: CosmeticFilterBucket;
    resources: Resources;
    readonly config: Config;
    constructor({ cosmeticFilters, networkFilters, config, lists, }?: {
        cosmeticFilters?: CosmeticFilter[];
        networkFilters?: NetworkFilter[];
        lists?: Map<string, string>;
        config?: Config;
    });
    /**
     * Creates a binary representation of the full engine. It can be stored
     * on-disk for faster loading of the adblocker. The `deserialize` static
     * method of Engine can be used to restore the engine.
     */
    serialize(array?: Uint8Array): Uint8Array;
    /**
     * Update engine with new filters or resources.
     */
    loadedLists(): string[];
    hasList(name: string, checksum: string): boolean;
    /**
     * Update engine with `resources.txt` content.
     */
    updateResources(data: string, checksum: string): boolean;
    getFilters(): {
        networkFilters: NetworkFilter[];
        cosmeticFilters: CosmeticFilter[];
    };
    /**
     * Update engine with new filters as well as optionally removed filters.
     */
    update({ newNetworkFilters, newCosmeticFilters, removedCosmeticFilters, removedNetworkFilters, }: Partial<IListDiff>): boolean;
    updateFromDiff({ added, removed }: Partial<IRawDiff>): boolean;
    /**
     * Matching APIs. The following methods are used to retrieve matching filters
     * either to apply cosmetics on a page or alter network requests.
     */
    getGenericCosmetics(): IMessageFromBackground;
    /**
     * Given `hostname` and `domain` of a page (or frame), return the list of
     * styles and scripts to inject in the page.
     */
    getCosmeticsFilters({ url, hostname, domain, classes, hrefs, ids, getBaseRules, getInjectionRules, getRulesFromDOM, getRulesFromHostname, }: {
        url: string;
        hostname: string;
        domain: string | null | undefined;
        classes?: string[];
        hrefs?: string[];
        ids?: string[];
        getBaseRules?: boolean;
        getInjectionRules?: boolean;
        getRulesFromDOM?: boolean;
        getRulesFromHostname?: boolean;
    }): IMessageFromBackground;
    /**
     * Given a `request`, return all matching network filters found in the engine.
     */
    matchAll(request: Request): Set<NetworkFilter>;
    /**
     * Given a "main_frame" request, check if some content security policies
     * should be injected in the page.
     */
    getCSPDirectives(request: Request): string | undefined;
    /**
     * Decide if a network request (usually from WebRequest API) should be
     * blocked, redirected or allowed.
     */
    match(request: Request): {
        match: boolean;
        redirect: undefined | {
            body: string;
            contentType: string;
            dataUrl: string;
        };
        exception: NetworkFilter | undefined;
        filter: NetworkFilter | undefined;
    };
}
