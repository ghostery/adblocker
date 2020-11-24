/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { optimizeNetwork } from '../src/engine/optimizer';
import NetworkFilter from '../src/filters/network';

function f(lines: string[]): NetworkFilter[] {
  const filters: NetworkFilter[] = [];
  for (const line of lines) {
    const filter = NetworkFilter.parse(line, true);
    expect(filter).not.to.be.null;
    if (filter !== null) {
      filters.push(filter);
    }
  }
  return filters;
}

describe('#optimizeNetwork', () => {
  it('combine into regexps', () => {
    expect(
      optimizeNetwork(
        f([
          '/stats/tracking.',
          '/php-stats.php?',
          '.php?stats=',
          '/banner.stats?',
          '/php/stats/*',
          '_stats.js?',
          '/stats-tracking.js',
          '/b/stats?',
          '/stats/impression',
          '/php/stats.php?',
          '/stats/visitors',
          '/stats.gif?',
          '/stats/?js',
          '/stats.php?*http',
          '/stats?object',
          '.php?p=stats&',
          '/php-stats.js',
          '/php-stats.js/',
        ]),
      ).map((filter) => filter.toString()),
    ).to.have.lengthOf(1);
  });
});
