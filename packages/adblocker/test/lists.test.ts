/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { f, generateDiff, getLinesWithFilters, mergeDiffs, parseFilters } from '../src/lists.js';
import Config from '../src/config.js';

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

describe('#parseFilters', () => {
  it('handle network filters', () => {
    expect(parseFilters('')).to.have.property('networkFilters').that.have.lengthOf(0);
    expect(parseFilters('||foo.com')).to.have.property('networkFilters').that.have.lengthOf(1);
  });

  it('handle cosmetic filters', () => {
    expect(parseFilters('')).to.have.property('cosmeticFilters').that.have.lengthOf(0);
    expect(parseFilters('###foo')).to.have.property('cosmeticFilters').that.have.lengthOf(1);
  });

  it('ignores preprocessors', () => {
    const result = parseFilters(
      `!#if true
    ||foo.com
!#endif`,
    );
    expect(result).to.have.property('preprocessors').that.have.lengthOf(0);
    expect(result).and.to.have.property('networkFilters').that.have.lengthOf(1);
  });

  context('with loadPreprocessors config', () => {
    const config = new Config({
      loadPreprocessors: true,
    });

    it('ignores empty preprocessors', () => {
      expect(
        parseFilters(
          `!#if true
  !#endif`,
          config,
        ),
      )
        .to.have.property('preprocessors')
        .that.have.lengthOf(0);
    });

    it('handle preprocessors', () => {
      const result = parseFilters(
        `!#if true
        ||foo.com
!#endif`,
        config,
      );
      expect(result).to.have.property('preprocessors').that.have.lengthOf(1);
      expect(result).to.have.property('networkFilters').that.have.lengthOf(1);
    });
  });
});

describe('#generateDiff', () => {
  it('diff between empty strings', () => {
    expect(generateDiff('', '')).to.eql({
      added: [],
      removed: [],
      preprocessors: {},
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
      preprocessors: {},
    });
  });

  it('add filters from empty', () => {
    expect(generateDiff('', '||foo.com')).to.eql({
      added: ['||foo.com'],
      removed: [],
      preprocessors: {},
    });
  });

  it('remove filters', () => {
    expect(generateDiff('||foo.com', '')).to.eql({
      added: [],
      removed: ['||foo.com'],
      preprocessors: {},
    });
  });

  it('handle filter renaming', () => {
    expect(
      generateDiff('||foo.com$domain=foo.com|bar.com', '||foo.com$domain=bar.com|foo.com'),
    ).to.eql({
      added: [],
      removed: [],
      preprocessors: {},
    });
  });

  it('handle preprocessors', () => {
    const config = new Config({
      loadPreprocessors: true,
    });

    expect(
      generateDiff(
        '',
        `!#if true
!#endif`,
        config,
      ),
    ).to.eql({
      added: [],
      removed: [],
      preprocessors: {},
    });

    expect(
      generateDiff(
        '',
        `!#if true
||foo.com
!#endif`,
        config,
      ),
    ).to.eql({
      added: ['||foo.com'],
      removed: [],
      preprocessors: {
        true: {
          added: ['||foo.com'],
          removed: [],
        },
      },
    });

    expect(
      generateDiff(
        `!#if true
||foo.com
!#endif`,
        '',
        config,
      ),
    ).to.eql({
      added: [],
      removed: ['||foo.com'],
      preprocessors: {
        true: {
          added: [],
          removed: ['||foo.com'],
        },
      },
    });

    expect(
      generateDiff(
        `||bar.com
!#if true
||foo.com
!#endif`,
        `||foo.com
!#if true
||bar.com
!#endif`,
        config,
      ),
    ).to.eql({
      added: [],
      removed: [],
      preprocessors: {
        true: {
          added: ['||bar.com'],
          removed: ['||foo.com'],
        },
      },
    });

    expect(
      generateDiff(
        `||foo.com^`,
        `!#if true
||foo.com^
!#endif`,
        config,
      ),
    ).to.eql({
      added: [],
      removed: [],
      preprocessors: {
        true: {
          added: ['||foo.com^'],
          removed: [],
        },
      },
    });

    expect(
      generateDiff(
        `!#if true
||foo.com^
!#endif`,
        `||foo.com^`,
        config,
      ),
    ).to.eql({
      added: [],
      removed: [],
      preprocessors: {
        true: {
          added: [],
          removed: ['||foo.com^'],
        },
      },
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
      preprocessors: {},
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
      preprocessors: {},
    });

    expect(
      mergeDiffs([
        {
          preprocessors: {
            true: {
              added: ['||foo.com'],
            },
          },
        },
        {
          preprocessors: {
            true: {
              added: ['||foo.com', '||bar.com'],
            },
          },
        },
      ]),
    ).to.eql({
      added: [],
      removed: [],
      preprocessors: {
        true: {
          added: ['||foo.com', '||bar.com'],
          removed: [],
        },
      },
    });
  });
});
