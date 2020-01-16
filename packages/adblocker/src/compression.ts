/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Smaz } from 'tsmaz';

import cosmeticSelectorCodebook from './codebooks/cosmetic-selector';
import networkCSPCodebook from './codebooks/network-csp';
import networkFilterCodebook from './codebooks/network-filter';
import networkHostnameCodebook from './codebooks/network-hostname';
import networkRedirectCodebook from './codebooks/network-redirect';

export default class Compression {
  public readonly cosmeticSelector: Smaz = new Smaz(cosmeticSelectorCodebook);
  public readonly networkCSP: Smaz = new Smaz(networkCSPCodebook);
  public readonly networkRedirect: Smaz = new Smaz(networkRedirectCodebook);
  public readonly networkHostname: Smaz = new Smaz(networkHostnameCodebook);
  public readonly networkFilter: Smaz = new Smaz(networkFilterCodebook);
}
