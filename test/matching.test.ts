import {} from 'jest';

import matchCosmeticFilter from '../src/matching/cosmetics';
import matchNetworkFilter from '../src/matching/network';

import { f } from '../src/parsing/list';
import { processRawRequest } from '../src/request/raw';

interface ExtendedMatchers extends jest.Matchers<void> {
  toMatchRequest: (request: any) => object;
  toMatchHostname: (hostname: string) => object;
}

expect.extend({
  toMatchRequest(filter, request) {
    const processedRequest = processRawRequest({
      cpt: 6,
      sourceUrl: '',
      url: '',
      ...request,
    });
    const match = matchNetworkFilter(filter, processedRequest);
    if (match) {
      return {
        message: () =>
          `expected ${filter.toString()} to not match ${JSON.stringify(processedRequest)}`,
        pass: true,
      };
    }

    return {
      message: () =>
        `expected ${filter.toString()} to match ${JSON.stringify(processedRequest)}`,
      pass: false,
    };

  },
  toMatchHostname(filter, hostname) {
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

function expectFilterToMatchHostname(filter: any, hostname: string) {
  (expect(filter) as ExtendedMatchers).toMatchHostname(hostname);
}

function expectFilterNotToMatchHostname(filter: any, hostname: string) {
  (expect(filter).not as ExtendedMatchers).toMatchHostname(hostname);
}

function expectFilterToMatchRequest(filter: any, request: any) {
  (expect(filter) as ExtendedMatchers).toMatchRequest(request);
}

function expectFilterNotToMatchRequest(filter: any, request: any) {
  (expect(filter).not as ExtendedMatchers).toMatchRequest(request);
}

describe('#matchNetworkFilter', () => {
  it('pattern', () => {
    expectFilterToMatchRequest(f`foo`, { url: 'https://bar.com/foo' });
    expectFilterToMatchRequest(f`foo`, { url: 'https://bar.com/baz/foo' });
    expectFilterToMatchRequest(f`foo`, { url: 'https://bar.com/q=foo/baz' });
    expectFilterToMatchRequest(f`foo`, { url: 'https://foo.com' });
    expectFilterToMatchRequest(f`&fo.o=+_-`, { url: 'https://bar.com?baz=42&fo.o=+_-' });
    expectFilterToMatchRequest(f`foo/bar/baz`, { url: 'https://bar.com/foo/bar/baz' });
    expectFilterToMatchRequest(f`com/bar/baz`, { url: 'https://bar.com/bar/baz' });
    expectFilterToMatchRequest(f`https://bar.com/bar/baz`, { url: 'https://bar.com/bar/baz' });
  });

  it('pattern$fuzzy', () => {
    expectFilterToMatchRequest(f`foo$fuzzy`, { url: 'https://bar.com/foo' });
    expectFilterToMatchRequest(f`foo$fuzzy`, { url: 'https://bar.com/foo/baz' });
    expectFilterToMatchRequest(f`foo/bar$fuzzy`, { url: 'https://bar.com/foo/baz' });
    expectFilterToMatchRequest(f`foo bar$fuzzy`, { url: 'https://bar.com/foo/baz' });
    expectFilterToMatchRequest(f`foo bar baz$fuzzy`, { url: 'http://bar.foo.baz' });
  });

  it('||pattern', () => {
    expectFilterToMatchRequest(f`||foo.com`, { url: 'https://foo.com/bar' });
    expectFilterToMatchRequest(f`||foo.com/bar`, { url: 'https://foo.com/bar' });
    expectFilterToMatchRequest(f`||foo`, { url: 'https://foo.com/bar' });
    expectFilterToMatchRequest(f`||foo`, { url: 'https://baz.foo.com/bar' });
    expectFilterToMatchRequest(f`||foo`, { url: 'https://foo.baz.com/bar' });
    expectFilterToMatchRequest(f`||foo.baz`, { url: 'https://foo.baz.com/bar' });
    expectFilterToMatchRequest(f`||foo.baz.`, { url: 'https://foo.baz.com/bar' });

    expectFilterNotToMatchRequest(f`||foo`, { url: 'https://baz.com' });
    expectFilterNotToMatchRequest(f`||foo`, { url: 'https://foo-bar.baz.com/bar' });
    expectFilterNotToMatchRequest(f`||foo.com`, { url: 'https://foo.de' });
    expectFilterNotToMatchRequest(f`||foo.com`, { url: 'https://bar.foo.de' });
  });

  it('||pattern$fuzzy', () => {
    expectFilterToMatchRequest(f`||bar.foo/baz$fuzzy`, { url: 'http://bar.foo/baz' });
    expectFilterToMatchRequest(f`||bar.foo/baz$fuzzy`, { url: 'http://bar.foo/id/baz' });
    expectFilterToMatchRequest(f`||bar.foo/baz$fuzzy`, { url: 'http://bar.foo?id=42&baz=1' });
    expectFilterToMatchRequest(f`||foo.com/id bar$fuzzy`, { url: 'http://foo.com?bar&id=42' });
  });

  it('||pattern|', () => {
    expectFilterToMatchRequest(f`||foo.com|`, { url: 'https://foo.com' });
    expectFilterToMatchRequest(f`||foo.com/bar|`, { url: 'https://foo.com/bar' });

    expectFilterNotToMatchRequest(f`||foo.com/bar|`, { url: 'https://foo.com/bar/baz' });
    expectFilterNotToMatchRequest(f`||foo.com/bar|`, { url: 'https://foo.com/' });
  });

  it('pattern|', () => {
    expectFilterToMatchRequest(f`foo.com`, { url: 'https://foo.com' });
    expectFilterToMatchRequest(f`foo|`, { url: 'https://bar.com/foo' });
    expectFilterNotToMatchRequest(f`foo|`, { url: 'https://bar.com/foo/' });
    expectFilterNotToMatchRequest(f`foo|`, { url: 'https://bar.com/foo/baz' });
  });

  it('|pattern', () => {
    expectFilterToMatchRequest(f`|http`, { url: 'http://foo.com' });
    expectFilterToMatchRequest(f`|http`, { url: 'https://foo.com' });
    expectFilterToMatchRequest(f`|https://`, { url: 'https://foo.com' });

    expectFilterNotToMatchRequest(f`https`, { url: 'http://foo.com' });
  });

  it('|pattern|', () => {
    expectFilterToMatchRequest(f`|https://foo.com|`, { url: 'https://foo.com' });
  });

  it('||hostname^*/pattern', () => {
    expectFilterNotToMatchRequest(f`||foo.com^*/bar`, { url: 'https://foo.com/bar' });
  });
});

describe('#matchCosmeticFilter', () => {
  it('single domain', () => {
    expectFilterToMatchHostname(f`foo.com##.selector`, 'foo.com');
  });

  it('multiple domains', () => {
    expectFilterToMatchHostname(f`foo.com,test.com##.selector`, 'foo.com');
    expectFilterToMatchHostname(f`foo.com,test.com##.selector`, 'test.com');
  });

  it('subdomain', () => {
    expectFilterToMatchHostname(f`foo.com,test.com##.selector`, 'sub.test.com');
    expectFilterToMatchHostname(f`foo.com,sub.test.com##.selector`, 'sub.test.com');
  });

  it('entity', () => {
    expectFilterToMatchHostname(f`foo.com,sub.test.*##.selector`, 'sub.test.com');
    expectFilterToMatchHostname(f`foo.com,sub.test.*##.selector`, 'sub.test.fr');
    expectFilterToMatchHostname(f`foo.*##.selector`, 'foo.co.uk');
  });

  it('does not match', () => {
    expectFilterNotToMatchHostname(f`foo.*##.selector`, 'foo.bar.com');
    expectFilterNotToMatchHostname(f`foo.*##.selector`, 'bar-foo.com');
  });
});
