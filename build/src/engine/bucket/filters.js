/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import StaticDataView from '../../data-view';
// Empty filters is 4 bytes because we need at least one 32 bits number to keep
// track of the number of filters in the container. If there is no filter then
// the number will be 0.
var EMPTY_FILTERS = new Uint8Array(4);
/**
 * Generic filters container (for both CosmeticFilter and NetworkFilter
 * instances). This abstracts away some of the logic to serialize/lazy-load
 * lists of filters (which is useful for things like generic cosmetic filters
 * or $badfilter).
 */
var FiltersContainer = /** @class */ (function () {
    function FiltersContainer(_a) {
        var config = _a.config, deserialize = _a.deserialize, filters = _a.filters;
        this.deserialize = deserialize;
        this.filters = EMPTY_FILTERS;
        this.config = config;
        if (filters.length !== 0) {
            this.update(filters, undefined);
        }
    }
    FiltersContainer.deserialize = function (buffer, deserialize, config) {
        var container = new FiltersContainer({ deserialize: deserialize, config: config, filters: [] });
        container.filters = buffer.getBytes();
        return container;
    };
    /**
     * Update filters based on `newFilters` and `removedFilters`.
     */
    FiltersContainer.prototype.update = function (newFilters, removedFilters) {
        // Estimate size of the buffer we will need to store filters. This avoids
        // having to allocate a big chunk of memory up-front if it's not needed.
        // We start with the current size of `this.filters` then update it with
        // removed/added filters.
        var bufferSizeEstimation = this.filters.byteLength;
        var selected = [];
        // Add existing rules (removing the ones with ids in `removedFilters`)
        var currentFilters = this.getFilters();
        if (currentFilters.length !== 0) {
            // If no filter was removed (we only add new ones), we don't need to
            // filter out removed existing filters. So we just assign the array to
            // `selected` directly to save a bit of effort.
            if (removedFilters === undefined || removedFilters.size === 0) {
                selected = currentFilters;
            }
            else {
                // There might be some removed selected filters, so we iterate through
                // them and make sure we keep only the ones not having been deleted.
                for (var i = 0; i < currentFilters.length; i += 1) {
                    var filter = currentFilters[i];
                    if (removedFilters.has(filter.getId()) === false) {
                        selected.push(filter);
                    }
                    else {
                        bufferSizeEstimation -= filter.getSerializedSize();
                    }
                }
            }
        }
        // If `selected` and `currentFilters` have the same length then no filter was removed.
        var storedFiltersRemoved = selected.length !== currentFilters.length;
        // Add new rules.
        var numberOfExistingFilters = selected.length;
        for (var i = 0; i < newFilters.length; i += 1) {
            var filter = newFilters[i];
            bufferSizeEstimation += filter.getSerializedSize();
            selected.push(filter);
        }
        // Check if any new filter was added in `selected` (from `newFilters`).
        var storedFiltersAdded = selected.length > numberOfExistingFilters;
        // If selected changed, then update the compact representation of filters.
        if (selected.length === 0) {
            this.filters = EMPTY_FILTERS;
        }
        else if (storedFiltersAdded === true || storedFiltersRemoved === true) {
            // Store filters in their compact form
            var buffer = StaticDataView.allocate(bufferSizeEstimation, this.config);
            buffer.pushUint32(selected.length);
            // When we run in `debug` mode, we enable fully deterministic updates of
            // internal data-structure. To this effect, we sort all filters before
            // insertion.
            if (this.config.debug === true) {
                selected.sort(function (f1, f2) { return f1.getId() - f2.getId(); });
            }
            for (var i = 0; i < selected.length; i += 1) {
                selected[i].serialize(buffer);
            }
            // Update internals
            this.filters = buffer.buffer;
        }
    };
    FiltersContainer.prototype.serialize = function (buffer) {
        buffer.pushBytes(this.filters);
    };
    FiltersContainer.prototype.getFilters = function () {
        // No filter stored in the container
        if (this.filters.byteLength <= 4) {
            return [];
        }
        // Load all filters in memory and store them in `cache`
        var filters = [];
        var buffer = StaticDataView.fromUint8Array(this.filters, this.config);
        var numberOfFilters = buffer.getUint32();
        for (var i = 0; i < numberOfFilters; i += 1) {
            filters.push(this.deserialize(buffer));
        }
        return filters;
    };
    return FiltersContainer;
}());
export default FiltersContainer;
