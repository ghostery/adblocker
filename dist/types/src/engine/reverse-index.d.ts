/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Config from '../config';
import StaticDataView from '../data-view';
import IFilter from '../filters/interface';
/**
 * The ReverseIndex is an accelerating data structure which allows finding a
 * subset of the filters given a list of token seen in a URL. It is the core of
 * the adblocker's matching capabilities.
 *
 * It has mainly two caracteristics:
 * 1. It should be very compact and be able to load fast.
 * 2. It should be *very fast* in finding potential candidates.
 *
 * Conceptually, the reverse index dispatches filters in "buckets" (an array of
 * one or more filters). Filters living in the same bucket are guaranteed to
 * share at least one of their tokens (appearing in the pattern). For example:
 *
 *   - Bucket 1 (ads):
 *       - /ads.js
 *       - /script/ads/tracking.js
 *       - /ads/
 *   - Bucket 2 (tracking)
 *       - /tracking.js
 *       - ||tracking.com/cdn
 *
 * We see that filters in "Bucket 1" are indexed using the token "ads" and
 * "Bucket 2" using token "tracking".
 *
 * This property allows to quickly discard most of the filters when we match a
 * URL. To achieve this, the URL is tokenized in the same way filters are
 * tokenized and for each token, we check if there are some filters available.
 *
 * For example:
 *
 *  URL "https://tracking.com/" has the following tokens: "https", "tracking"
 *  and "com". We immediatly see that we only check the two filters in the
 *  "tracking" bucket since they are the only ones having a common token with
 *  the URL.
 *
 * How do we pick the token for each filter?
 * =========================================
 *
 * Each filter is only indexed *once*, which means that we need to pick one of
 * the tokens appearing in the pattern. We choose the token such has each filter
 * is indexed using the token which was the *least seen* globally. In other
 * words, we pick the most discriminative token for each filter. This is done
 * using the following algorithm:
 *   1. Tokenize all the filters which will be stored in the index
 *   2. Compute a histogram of frequency of each token (globally)
 *   3. Select the best token for each filter (lowest frequency)
 */
export default class ReverseIndex<T extends IFilter> {
    static deserialize<T extends IFilter>(buffer: StaticDataView, deserialize: (view: StaticDataView) => T, optimize: (filters: T[]) => T[], config: Config): ReverseIndex<T>;
    private bucketsIndex;
    private tokensLookupIndex;
    private view;
    private deserializeFilter;
    private readonly optimize;
    private readonly config;
    private cache;
    constructor({ deserialize, filters, optimize, config, bucketsIndex, tokensLookupIndex, view, }: {
        deserialize: (view: StaticDataView) => T;
        filters: T[];
        optimize: (filters: T[]) => T[];
        config: Config;
        bucketsIndex?: Uint32Array;
        tokensLookupIndex?: Uint32Array;
        bucketsIndexSize?: number;
        tokensLookupIndexSize?: number;
        view?: StaticDataView;
    });
    /**
     * Load all filters from this index in memory (i.e.: deserialize them from the
     * byte array into NetworkFilter or CosmeticFilter instances).
     */
    getFilters(): T[];
    /**
     * Return an array of all the tokens currently used as keys of the index.
     */
    getTokens(): Uint32Array;
    /**
     * Dump this index to `buffer`.
     */
    serialize(buffer: StaticDataView): void;
    /**
     * Iterate on all filters found in buckets associated with the given list of
     * tokens. The callback is called on each of them. Early termination can be
     * achieved if the callback returns `false`.
     *
     * This will not check if each filter returned would match a given request but
     * is instead used as a list of potential candidates (much smaller than the
     * total set of filters; typically between 5 and 10 filters will be checked).
     */
    iterMatchingFilters(tokens: Uint32Array, cb: (f: T) => boolean): void;
    /**
     * Re-create the internal data-structure of the reverse index *in-place*. It
     * needs to be called with a list of new filters and optionally a list of ids
     * (as returned by either NetworkFilter.getId() or CosmeticFilter.getId())
     * which need to be removed from the index.
     */
    update(newFilters: T[], removedFilters: Set<number> | undefined): void;
    /**
     * If a bucket exists for the given token, call the callback on each filter
     * found inside. An early termination mechanism is built-in, to stop iterating
     * as soon as `false` is returned from the callback.
     */
    private iterBucket;
}
