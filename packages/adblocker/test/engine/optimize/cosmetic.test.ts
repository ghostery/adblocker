/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { optimizeCosmetic } from '../../../src/engine/optimize/cosmetic';
import CosmeticFilter from '../../../src/filters/cosmetic';

function c(raw: string): CosmeticFilter {
  const parsed = CosmeticFilter.parse(raw, true);

  if (parsed === null) {
    throw new Error(`expected ${raw} not to be null`);
  }

  return parsed;
}

function sort(filters: CosmeticFilter[]): CosmeticFilter[] {
  return filters.sort((f1: CosmeticFilter, f2: CosmeticFilter): number => (f1.rawLine || '').length - (f2.rawLine || '').length);
}

describe('#optimizeCosmetic', () => {
  it('handles empty list', () => {
    expect(optimizeCosmetic([])).toEqual([]);
  });

  it('handles single filter', () => {
    const filter = c('foo.com##bar');
    expect(optimizeCosmetic([filter])).toEqual([filter]);
  });

  it('merges multiple similar filters', () => {
    expect(sort(optimizeCosmetic([
      c('foo.com##bar'),
      c('~sub.foo.com##bar'),
      c('##bar'),

      c('#@#bar'),
      c('bar.com#@#bar'),

      c('foo.com##baz'),
      c('bar.com##baz'),
    ]))).toEqual(sort([
      c('~sub.foo.com##bar'),
      c('#@#bar'),
      c('foo.com,bar.com##baz'),
    ]));
  });
});
