/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { f, generateDiff, getLinesWithFilters, mergeDiffs } from '../src/lists';

describe('#getLinesWithFilters', () => {
  it('get not lines if empty', () => {
    expect(getLinesWithFilters('')).to.eql(new Set());
  });

  it('handle single filter', () => {
    expect(getLinesWithFilters('||foo.com$badfilter')).to.eql(new Set(['||foo.com$badfilter']));
  });

  it('handle multiple filters', () => {
    expect(getLinesWithFilters('||foo.com$badfilter\n||bar.co.uk')).to.eql(
      new Set(['||foo.com$badfilter', '||bar.co.uk']),
    );
  });

  it('ignore empty lines', () => {
    expect(
      getLinesWithFilters(`

||foo.com


bar.co.uk^*baz

      `),
    ).to.eql(new Set(['||foo.com', 'bar.co.uk^*baz']));
  });

  it('ignore comments', () => {
    expect(
      getLinesWithFilters(`
[Adblock Plus 2.0]
! this is a comment
||foo.com


!bar.co.uk^*baz

      `),
    ).to.eql(new Set(['||foo.com']));
  });
});

describe('#generateDiff', () => {
  it('diff between empty strings', () => {
    expect(generateDiff('', '')).to.eql({
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
    ).to.eql({
      added: [],
      removed: [],
    });
  });

  it('add filters from empty', () => {
    expect(generateDiff('', '||foo.com')).to.eql({
      added: ['||foo.com'],
      removed: [],
    });
  });

  it('remove filters', () => {
    expect(generateDiff('||foo.com', '')).to.eql({
      added: [],
      removed: ['||foo.com'],
    });
  });

  it('handle filter renaming', () => {
    expect(
      generateDiff('||foo.com$domain=foo.com|bar.com', '||foo.com$domain=bar.com|foo.com'),
    ).to.eql({
      added: [],
      removed: [],
    });
  });
});

describe('#f', () => {
  it('handles CosmeticFilter', () => {
    const filter = f`##.selector`;
    expect(filter).not.to.be.null;
    if (filter !== null) {
      expect(filter.isCosmeticFilter()).to.be.true;
    }
  });

  it('handles NetworkFitler', () => {
    const filter = f`||foo.com`;
    expect(filter).not.to.be.null;
    if (filter !== null) {
      expect(filter.isNetworkFilter()).to.be.true;
    }
  });

  it('returns null for invalid filter', () => {
    expect(f`#$#~~~`).to.be.null;
  });
});

describe('#mergeDiffs', () => {
  it('merges one diff', () => {
    const diff = {
      added: ['||foo.com'],
      removed: ['||bar.com'],
    };

    expect(mergeDiffs([diff])).to.eql(diff);
  });

  it('merges several diffs', () => {
    expect(
      mergeDiffs([
        { added: ['foo.com', 'baz.com'] },
        { removed: ['foo.com'] },
        { added: ['bar.com'], removed: ['foo.com'] },
        { removed: ['bar.com'] },
      ]),
    ).to.eql({
      added: ['baz.com'],
      removed: ['foo.com', 'bar.com'],
    });
  });
});
