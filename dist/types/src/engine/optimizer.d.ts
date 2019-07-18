/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import CosmeticFilter from '../filters/cosmetic';
import NetworkFilter from '../filters/network';
/**
 * Optimizer which returns the list of original filters.
 */
export declare function noopOptimizeNetwork(filters: NetworkFilter[]): NetworkFilter[];
export declare function noopOptimizeCosmetic(filters: CosmeticFilter[]): CosmeticFilter[];
/**
 * Fusion a set of `filters` by applying optimizations sequentially.
 */
export declare function optimizeNetwork(filters: NetworkFilter[]): NetworkFilter[];
