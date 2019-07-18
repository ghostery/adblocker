/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { factory } from 'tsmaz';
import cosmeticSelectorCodebook from './codebooks/cosmetic-selector';
import networkCSPCodebook from './codebooks/network-csp';
import networkFilterCodebook from './codebooks/network-filter';
import networkHostnameCodebook from './codebooks/network-hostname';
import networkRedirectCodebook from './codebooks/network-redirect';
// Cosmetic selectors
var cosmeticSmaz = factory(cosmeticSelectorCodebook);
export var deflateCosmeticString = cosmeticSmaz[0];
export var inflateCosmeticString = cosmeticSmaz[1];
// Network CSPs
var networkCSPSmaz = factory(networkCSPCodebook);
export var deflateNetworkCSPString = networkCSPSmaz[0];
export var inflateNetworkCSPString = networkCSPSmaz[1];
// Network redirects
var networkRedirectSmaz = factory(networkRedirectCodebook);
export var deflateNetworkRedirectString = networkRedirectSmaz[0];
export var inflateNetworkRedirectString = networkRedirectSmaz[1];
// Network hostnames
var networkHostnameSmaz = factory(networkHostnameCodebook);
export var deflateNetworkHostnameString = networkHostnameSmaz[0];
export var inflateNetworkHostnameString = networkHostnameSmaz[1];
// Network filters
var networkFilterSmaz = factory(networkFilterCodebook);
export var deflateNetworkFilterString = networkFilterSmaz[0];
export var inflateNetworkFilterString = networkFilterSmaz[1];
