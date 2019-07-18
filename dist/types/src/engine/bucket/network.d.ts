/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Config from '../../config';
import StaticDataView from '../../data-view';
import NetworkFilter from '../../filters/network';
import Request from '../../request';
import ReverseIndex from '../reverse-index';
import FiltersContainer from './filters';
/**
 * Accelerating data structure for network filters matching.
 */
export default class NetworkFilterBucket {
    static deserialize(buffer: StaticDataView, config: Config): NetworkFilterBucket;
    index: ReverseIndex<NetworkFilter>;
    badFilters: FiltersContainer<NetworkFilter>;
    private badFiltersIds;
    constructor({ filters, config }: {
        filters?: NetworkFilter[];
        config: Config;
    });
    getFilters(): NetworkFilter[];
    update(newFilters: NetworkFilter[], removedFilters: Set<number> | undefined): void;
    serialize(buffer: StaticDataView): void;
    matchAll(request: Request): NetworkFilter[];
    match(request: Request): NetworkFilter | undefined;
    /**
     * Given a matching filter, check if it is disabled by a $badfilter
     */
    private isFilterDisabled;
}
