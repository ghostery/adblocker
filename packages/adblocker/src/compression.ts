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

type inflate = (_: Uint8Array) => string;
type deflate = (_: string) => Uint8Array;

export default class Compression {
  public deflateCosmeticString: deflate;
  public deflateNetworkFilterString: deflate;
  public deflateNetworkCSPString: deflate;
  public deflateNetworkRedirectString: deflate;
  public deflateNetworkHostnameString: deflate;
  public inflateCosmeticString: inflate;
  public inflateNetworkFilterString: inflate;
  public inflateNetworkCSPString: inflate;
  public inflateNetworkRedirectString: inflate;
  public inflateNetworkHostnameString: inflate;

  constructor() {
    // Cosmetic selectors
    const cosmeticSmaz = factory(cosmeticSelectorCodebook);
    this.deflateCosmeticString = cosmeticSmaz[0];
    this.inflateCosmeticString = cosmeticSmaz[1];

    // Network CSPs
    const networkCSPSmaz = factory(networkCSPCodebook);
    this.deflateNetworkCSPString = networkCSPSmaz[0];
    this.inflateNetworkCSPString = networkCSPSmaz[1];

    // Network redirects
    const networkRedirectSmaz = factory(networkRedirectCodebook);
    this.deflateNetworkRedirectString = networkRedirectSmaz[0];
    this.inflateNetworkRedirectString = networkRedirectSmaz[1];

    // Network hostnames
    const networkHostnameSmaz = factory(networkHostnameCodebook);
    this.deflateNetworkHostnameString = networkHostnameSmaz[0];
    this.inflateNetworkHostnameString = networkHostnameSmaz[1];

    // Network filters
    const networkFilterSmaz = factory(networkFilterCodebook);
    this.deflateNetworkFilterString = networkFilterSmaz[0];
    this.inflateNetworkFilterString = networkFilterSmaz[1];
  }
}
