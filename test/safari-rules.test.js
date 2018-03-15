import {} from 'jest';

import { f } from '../src/parsing/list';
import { convertCosmetics, convertFilter } from '../src/convertion/safari-rules';

expect.extend({
  toBeConvertedTo(filter, expectedSafariRule) {
    let safariRule;
    if (filter.isNetworkFilter()) {
      safariRule = convertFilter(filter);
    } else {
      safariRule = convertCosmetics(filter);
    }

    try {
      expect(safariRule).toEqual(expectedSafariRule);
    } catch (ex) {
      return {
        message: () =>
          `expected ${filter.toString()} to be converted to ${JSON.stringify(expectedSafariRule)}, got: ${JSON.stringify(safariRule)}`,
        pass: false,
      };
    }

    return {
      message: () =>
        `expected ${filter.toString()} to not be converted to ${JSON.stringify(expectedSafariRule)}`,
      pass: true,
    };
  },
});

describe('#convertFilter', () => {
  it('converts', () => {
    expect(f`||foo.com`).toBeConvertedTo({
      action: { type: 'block' },
      trigger: {
        'url-filter': '(.*)?foo.com/',
        'url-filter-is-case-sensitive': false,
        'unless-domain': [],
        'load-type': []
      }
    });
  });
});

describe('#convertCosmetics', () => {
});
