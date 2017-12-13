import {} from 'jest';

import { matchCosmeticFilter } from '../src/filters-matching';
import { f } from '../src/parsing/list';

expect.extend({
  toMatchCosmetic(hostname, filter) {
    const match = matchCosmeticFilter(filter, hostname);
    if (match) {
      return {
        message: () =>
          `expected ${filter.toString()} to not match ${hostname}`,
        pass: true,
      };
    }

    return {
      message: () =>
        `expected ${filter.toString()} to match ${hostname}`,
      pass: false,
    };
  },
});

describe('#matchNetworkFilter', () => {
  it('matches', () => {
  });
});

describe('#matchCosmeticFilter', () => {
  it('single domain', () => {
    expect('foo.com').toMatchCosmetic(f`foo.com##.selector`);
  });

  it('multiple domains', () => {
    expect('foo.com').toMatchCosmetic(f`foo.com,test.com##.selector`);
    expect('test.com').toMatchCosmetic(f`foo.com,test.com##.selector`);
  });

  it('subdomain', () => {
    expect('sub.test.com').toMatchCosmetic(f`foo.com,test.com##.selector`);
    expect('sub.test.com').toMatchCosmetic(f`foo.com,sub.test.com##.selector`);
  });

  it('entity', () => {
    expect('sub.test.com').toMatchCosmetic(f`foo.com,sub.test.*##.selector`);
    expect('sub.test.fr').toMatchCosmetic(f`foo.com,sub.test.*##.selector`);
    expect('foo.co.uk').toMatchCosmetic(f`foo.*##.selector`);
  });

  it('does not match', () => {
    expect('foo.bar.com').not.toMatchCosmetic(f`foo.*##.selector`);
    expect('bar-foo.com').not.toMatchCosmetic(f`foo.*##.selector`);
  });
});
