/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { f, generateDiff, getLinesWithFilters, mergeDiffs } from '../src/lists';

describe('#getLinesWithFilters', () => {
  it('get not lines if empty', () => {
    expect(getLinesWithFilters('')).toEqual(new Set());
  });

  it('handle single filter', () => {
    expect(getLinesWithFilters('||foo.com$badfilter')).toEqual(new Set(['||foo.com$badfilter']));
  });

  it('handle multiple filters', () => {
    expect(getLinesWithFilters('||foo.com$badfilter\n||bar.co.uk')).toEqual(
      new Set(['||foo.com$badfilter', '||bar.co.uk']),
    );
  });

  it('ignore empty lines', () => {
    expect(
      getLinesWithFilters(`

||foo.com


bar.co.uk^*baz

      `),
    ).toEqual(new Set(['||foo.com', 'bar.co.uk^*baz']));
  });

  it('ignore comments', () => {
    expect(
      getLinesWithFilters(`
[Adblock Plus 2.0]
! this is a comment
||foo.com


!bar.co.uk^*baz

      `),
    ).toEqual(new Set(['||foo.com']));
  });
});

describe('#generateDiff', () => {
  it('diff between empty strings', () => {
    expect(generateDiff('', '')).toEqual({
      added: [],
      removed: [],
    });
  });

  it('same filters', () => {
    expect(
      generateDiff(
        `
||foo.com

bar.baz
*ads*

    `,
        `
! comment

bar.baz
*ads*
||foo.com
    `,
      ),
    ).toEqual({
      added: [],
      removed: [],
    });
  });

  it('add filters from empty', () => {
    expect(generateDiff('', '||foo.com')).toEqual({
      added: ['||foo.com'],
      removed: [],
    });
  });

  it('remove filters', () => {
    expect(generateDiff('||foo.com', '')).toEqual({
      added: [],
      removed: ['||foo.com'],
    });
  });

  it('handle filter renaming', () => {
    expect(
      generateDiff('||foo.com$domain=foo.com|bar.com', '||foo.com$domain=bar.com|foo.com'),
    ).toEqual({
      added: [],
      removed: [],
    });
  });
});

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

describe('#mergeDiffs', () => {
  it('merges one diff', () => {
    const diff = {
      added: ['||foo.com'],
      removed: ['||bar.com'],
    };

    expect(mergeDiffs([diff])).toEqual(diff);
  });

  it('merges several diffs', () => {
    expect(
      mergeDiffs([
        { added: ['foo.com', 'baz.com'] },
        { removed: ['foo.com'] },
        { added: ['bar.com'], removed: ['foo.com'] },
        { removed: ['bar.com'] },
      ]),
    ).toEqual({
      added: ['baz.com'],
      removed: ['foo.com', 'bar.com'],
    });
  });
});
