/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import NetworkFilter from '../../filters/network';
import { noopOptimizeNetwork, optimizeNetwork } from '../optimizer';
import ReverseIndex from '../reverse-index';
import FiltersContainer from './filters';
/**
 * Accelerating data structure for network filters matching.
 */
var NetworkFilterBucket = /** @class */ (function () {
    function NetworkFilterBucket(_a) {
        var _b = _a.filters, filters = _b === void 0 ? [] : _b, config = _a.config;
        this.index = new ReverseIndex({
            config: config,
            deserialize: NetworkFilter.deserialize,
            filters: [],
            optimize: config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork
        });
        this.badFiltersIds = null;
        this.badFilters = new FiltersContainer({
            config: config,
            deserialize: NetworkFilter.deserialize,
            filters: []
        });
        if (filters.length !== 0) {
            this.update(filters, undefined);
        }
    }
    NetworkFilterBucket.deserialize = function (buffer, config) {
        var bucket = new NetworkFilterBucket({ config: config });
        bucket.index = ReverseIndex.deserialize(buffer, NetworkFilter.deserialize, config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork, config);
        bucket.badFilters = FiltersContainer.deserialize(buffer, NetworkFilter.deserialize, config);
        return bucket;
    };
    NetworkFilterBucket.prototype.getFilters = function () {
        var filters = [];
        return filters.concat(this.badFilters.getFilters(), this.index.getFilters());
    };
    NetworkFilterBucket.prototype.update = function (newFilters, removedFilters) {
        var badFilters = [];
        var remaining = [];
        for (var i = 0; i < newFilters.length; i += 1) {
            var filter = newFilters[i];
            if (filter.isBadFilter()) {
                badFilters.push(filter);
            }
            else {
                remaining.push(filter);
            }
        }
        this.badFilters.update(badFilters, removedFilters);
        this.index.update(remaining, removedFilters);
        this.badFiltersIds = null;
    };
    NetworkFilterBucket.prototype.serialize = function (buffer) {
        this.index.serialize(buffer);
        this.badFilters.serialize(buffer);
    };
    NetworkFilterBucket.prototype.matchAll = function (request) {
        var _this = this;
        var filters = [];
        this.index.iterMatchingFilters(request.getTokens(), function (filter) {
            if (filter.match(request) && _this.isFilterDisabled(filter) === false) {
                filters.push(filter);
            }
            return true;
        });
        return filters;
    };
    NetworkFilterBucket.prototype.match = function (request) {
        var _this = this;
        var match;
        this.index.iterMatchingFilters(request.getTokens(), function (filter) {
            if (filter.match(request) && _this.isFilterDisabled(filter) === false) {
                match = filter;
                return false;
            }
            return true;
        });
        return match;
    };
    /**
     * Given a matching filter, check if it is disabled by a $badfilter
     */
    NetworkFilterBucket.prototype.isFilterDisabled = function (filter) {
        // Lazily load information about bad filters in memory. The only thing we
        // keep in memory is the list of IDs from $badfilter (ignoring the
        // $badfilter option from mask). This allows to check if a matching filter
        // should be ignored just by doing a lookup in a set of IDs.
        if (this.badFiltersIds === null) {
            var badFilters = this.badFilters.getFilters();
            // Shortcut if there is no badfilter in this bucket
            if (badFilters.length === 0) {
                return false;
            }
            // Create in-memory list of disabled filter IDs
            var badFiltersIds = new Set();
            for (var i = 0; i < badFilters.length; i += 1) {
                badFiltersIds.add(badFilters[i].getIdWithoutBadFilter());
            }
            this.badFiltersIds = badFiltersIds;
        }
        return this.badFiltersIds.has(filter.getId());
    };
    return NetworkFilterBucket;
}());
export default NetworkFilterBucket;
