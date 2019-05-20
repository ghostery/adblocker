/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { f } from '../src/lists';

describe('#f', () => {
  it('handles CosmeticFilter', () => {
    const filter = f`##.selector`;
    expect(filter).not.toBeNull();
    if (filter !== null) {
      expect(filter.isCosmeticFilter()).toBeTruthy();
    }
  });

  it('handles NetworkFitler', () => {
    const filter = f`||foo.com`;
    expect(filter).not.toBeNull();
    if (filter !== null) {
      expect(filter.isNetworkFilter()).toBeTruthy();
    }
  });

  it('returns null for invalid filter', () => {
    expect(f`#$#~~~`).toBeNull();
  });
});
