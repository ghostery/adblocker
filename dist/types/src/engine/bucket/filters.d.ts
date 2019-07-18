/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Config from '../../config';
import StaticDataView from '../../data-view';
import IFilter from '../../filters/interface';
/**
 * Generic filters container (for both CosmeticFilter and NetworkFilter
 * instances). This abstracts away some of the logic to serialize/lazy-load
 * lists of filters (which is useful for things like generic cosmetic filters
 * or $badfilter).
 */
export default class FiltersContainer<T extends IFilter> {
    static deserialize<T extends IFilter>(buffer: StaticDataView, deserialize: (view: StaticDataView) => T, config: Config): FiltersContainer<T>;
    filters: Uint8Array;
    private readonly deserialize;
    private readonly config;
    constructor({ config, deserialize, filters, }: {
        config: Config;
        deserialize: (view: StaticDataView) => T;
        filters: T[];
    });
    /**
     * Update filters based on `newFilters` and `removedFilters`.
     */
    update(newFilters: T[], removedFilters: Set<number> | undefined): void;
    serialize(buffer: StaticDataView): void;
    getFilters(): T[];
}
