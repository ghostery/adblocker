/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';
import { NetworkFilter } from '../../src/index.js';

describe('NetworkFilter', function () {
  context('#getId', function () {
    it('handles $match-case', function () {
      const a = NetworkFilter.parse('/foo/$match-case')!;
      const b = NetworkFilter.parse('/foo/')!;

      expect(a.getId()).not.to.be.eq(b.getId());
      expect(a.getIdWithoutBadFilter()).not.to.be.eq(b.getIdWithoutBadFilter());
    });
  });
});
