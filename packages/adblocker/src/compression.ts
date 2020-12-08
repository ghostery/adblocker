/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Smaz } from '@remusao/smaz';

import cosmeticSelectorCodebook from './codebooks/cosmetic-selector';
import networkCSPCodebook from './codebooks/network-csp';
import networkFilterCodebook from './codebooks/network-filter';
import networkHostnameCodebook from './codebooks/network-hostname';
import networkRedirectCodebook from './codebooks/network-redirect';
import networkRawCodebook from './codebooks/raw-network';
import cosmeticRawCodebook from './codebooks/raw-cosmetic';

export default class Compression {
  public readonly cosmeticSelector: Smaz = new Smaz(cosmeticSelectorCodebook);
  public readonly networkCSP: Smaz = new Smaz(networkCSPCodebook);
  public readonly networkRedirect: Smaz = new Smaz(networkRedirectCodebook);
  public readonly networkHostname: Smaz = new Smaz(networkHostnameCodebook);
  public readonly networkFilter: Smaz = new Smaz(networkFilterCodebook);
  public readonly networkRaw: Smaz = new Smaz(networkRawCodebook);
  public readonly cosmeticRaw: Smaz = new Smaz(cosmeticRawCodebook);
}
