import {} from 'jest';

import matchCosmeticFilter from '../src/matching/cosmetics';
import matchNetworkFilter from '../src/matching/network';

import { f } from '../src/parsing/list';
import { processRawRequest } from '../src/request/raw';

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

describe('#matchNetworkFilter', () => {
  it('pattern', () => {
    expect(f`foo`).toMatchRequest({ url: 'https://bar.com/foo' });
    expect(f`foo`).toMatchRequest({ url: 'https://bar.com/baz/foo' });
    expect(f`foo`).toMatchRequest({ url: 'https://bar.com/q=foo/baz' });
    // TODO: should this work?
    // expect(f`foo`).toMatchRequest({ url: 'https://foo.com' });
  });

  it('||pattern', () => {
    expect(f`||foo.com`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo.com/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo`).toMatchRequest({ url: 'https://baz.foo.com/bar' });

    expect(f`||foo`).not.toMatchRequest({ url: 'https://baz.com' });
    // TODO - fix
    // expect(f`||foo`).not.toMatchRequest({ url: 'https://foo.baz.com/bar' });
    expect(f`||foo.com`).not.toMatchRequest({ url: 'https://foo.de' });
    expect(f`||foo.com`).not.toMatchRequest({ url: 'https://bar.foo.de' });
  });

  it('||pattern|', () => {
    expect(f`||foo.com|`).toMatchRequest({ url: 'https://foo.com' });
    expect(f`||foo.com/bar|`).toMatchRequest({ url: 'https://foo.com/bar' });

    expect(f`||foo.com/bar|`).not.toMatchRequest({ url: 'https://foo.com/bar/baz' });
    expect(f`||foo.com/bar|`).not.toMatchRequest({ url: 'https://foo.com/' });
  });

  it('pattern|', () => {
    expect(f`foo.com`).toMatchRequest({ url: 'https://foo.com' });
    expect(f`foo|`).toMatchRequest({ url: 'https://bar.com/foo' });
    expect(f`foo|`).not.toMatchRequest({ url: 'https://bar.com/foo/' });
    expect(f`foo|`).not.toMatchRequest({ url: 'https://bar.com/foo/baz' });
  });

  it('|pattern', () => {
    expect(f`|http`).toMatchRequest({ url: 'http://foo.com' });
    expect(f`|http`).toMatchRequest({ url: 'https://foo.com' });
    expect(f`|https://`).toMatchRequest({ url: 'https://foo.com' });

    expect(f`https`).not.toMatchRequest({ url: 'http://foo.com' });
  });

  it('|pattern|', () => {
    expect(f`|https://foo.com|`).toMatchRequest({ url: 'https://foo.com' });
  });

  it('||hostname^*/pattern', () => {
    expect(f`||foo.com^*/bar`).not.toMatchRequest({ url: 'https://foo.com/bar' });
  });
});

describe('#matchCosmeticFilter', () => {
  it('single domain', () => {
    expect(f`foo.com##.selector`).toMatchHostname('foo.com');
  });

  it('multiple domains', () => {
    expect(f`foo.com,test.com##.selector`).toMatchHostname('foo.com');
    expect(f`foo.com,test.com##.selector`).toMatchHostname('test.com');
  });

  it('subdomain', () => {
    expect(f`foo.com,test.com##.selector`).toMatchHostname('sub.test.com');
    expect(f`foo.com,sub.test.com##.selector`).toMatchHostname('sub.test.com');
  });

  it('entity', () => {
    expect(f`foo.com,sub.test.*##.selector`).toMatchHostname('sub.test.com');
    expect(f`foo.com,sub.test.*##.selector`).toMatchHostname('sub.test.fr');
    expect(f`foo.*##.selector`).toMatchHostname('foo.co.uk');
  });

  it('does not match', () => {
    expect(f`foo.*##.selector`).not.toMatchHostname('foo.bar.com');
    expect(f`foo.*##.selector`).not.toMatchHostname('bar-foo.com');
  });
});
