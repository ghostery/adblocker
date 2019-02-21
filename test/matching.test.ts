import { getDomain, parse } from 'tldts';

import CosmeticFilter, {
  getHashesFromLabelsBackward,
  getHostnameWithoutPublicSuffix,
  hashHostnameBackward,
} from '../src/filters/cosmetic';
import NetworkFilter, { isAnchoredByHostname } from '../src/filters/network';

import { f } from '../src/lists';
import { makeRequest } from '../src/request';

import requests from './data/requests';

// Extend jest Matchers with our custom `toMatchRequest` and `toMatchHostname`
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchRequest: (arg: any) => object;
      toMatchHostname: (arg: any) => object;
    }
  }
}

expect.extend({
  toMatchRequest(filter, request) {
    const processedRequest = makeRequest(request, parse);
    const match = filter.match(processedRequest);
    if (match) {
      return {
        message: () =>
          `expected ${filter.toString()} to not match ${JSON.stringify(processedRequest)}`,
        pass: true,
      };
    }

    return {
      message: () => `expected ${filter.toString()} to match ${JSON.stringify(processedRequest)}`,
      pass: false,
    };
  },
  toMatchHostname(filter, hostname) {
    const match = filter.match(hostname, getDomain(hostname) || '');
    if (match) {
      return {
        message: () => `expected ${filter.toString()} to not match ${hostname}`,
        pass: true,
      };
    }

    return {
      message: () => `expected ${filter.toString()} to match ${hostname}`,
      pass: false,
    };
  },
});

describe('#isAnchoredByHostname', () => {
  it('matches empty hostname', () => {
    expect(isAnchoredByHostname('', 'foo.com')).toBeTruthy();
  });

  it('does not match when filter hostname is longer than hostname', () => {
    expect(isAnchoredByHostname('bar.foo.com', 'foo.com')).toBeFalsy();
    expect(isAnchoredByHostname('b', '')).toBeFalsy();
    expect(isAnchoredByHostname('foo.com', 'foo.co')).toBeFalsy();
  });

  it('does not match if there is not match', () => {
    expect(isAnchoredByHostname('bar', 'foo.com')).toBeFalsy();
  });

  describe('prefix match', () => {
    it('matches exact match', () => {
      expect(isAnchoredByHostname('', '')).toBeTruthy();
      expect(isAnchoredByHostname('f', 'f')).toBeTruthy();
      expect(isAnchoredByHostname('foo', 'foo')).toBeTruthy();
      expect(isAnchoredByHostname('foo.com', 'foo.com')).toBeTruthy();
      expect(isAnchoredByHostname('.com', '.com')).toBeTruthy();
      expect(isAnchoredByHostname('com.', 'com.')).toBeTruthy();
    });

    it('matches partial', () => {
      // Single label
      expect(isAnchoredByHostname('foo', 'foo.com')).toBeTruthy();
      expect(isAnchoredByHostname('foo.', 'foo.com')).toBeTruthy();
      expect(isAnchoredByHostname('.foo', '.foo.com')).toBeTruthy();
      expect(isAnchoredByHostname('.foo.', '.foo.com')).toBeTruthy();

      // Multiple labels
      expect(isAnchoredByHostname('foo.com', 'foo.com.')).toBeTruthy();
      expect(isAnchoredByHostname('foo.com.', 'foo.com.')).toBeTruthy();
      expect(isAnchoredByHostname('.foo.com.', '.foo.com.')).toBeTruthy();
      expect(isAnchoredByHostname('.foo.com', '.foo.com')).toBeTruthy();

      expect(isAnchoredByHostname('foo.bar', 'foo.bar.com')).toBeTruthy();
      expect(isAnchoredByHostname('foo.bar.', 'foo.bar.com')).toBeTruthy();
    });

    it('does not match partial prefix', () => {
      // Single label
      expect(isAnchoredByHostname('foo', 'foobar.com')).toBeFalsy();
      expect(isAnchoredByHostname('fo', 'foo.com')).toBeFalsy();
      expect(isAnchoredByHostname('.foo', 'foobar.com')).toBeFalsy();

      // Multiple labels
      expect(isAnchoredByHostname('foo.bar', 'foo.barbaz.com')).toBeFalsy();
      expect(isAnchoredByHostname('.foo.bar', '.foo.barbaz.com')).toBeFalsy();
    });
  });

  describe('suffix match', () => {
    it('matches partial', () => {
      // Single label
      expect(isAnchoredByHostname('com', 'foo.com')).toBeTruthy();
      expect(isAnchoredByHostname('.com', 'foo.com')).toBeTruthy();
      expect(isAnchoredByHostname('.com.', 'foo.com.')).toBeTruthy();
      expect(isAnchoredByHostname('com.', 'foo.com.')).toBeTruthy();

      // Multiple labels
      expect(isAnchoredByHostname('foo.com.', '.foo.com.')).toBeTruthy();
      expect(isAnchoredByHostname('foo.com', '.foo.com')).toBeTruthy();
    });

    it('does not match partial', () => {
      // Single label
      expect(isAnchoredByHostname('om', 'foo.com')).toBeFalsy();
      expect(isAnchoredByHostname('com', 'foocom')).toBeFalsy();

      // Multiple labels
      expect(isAnchoredByHostname('foo.bar.com', 'baz.bar.com')).toBeFalsy();
      expect(isAnchoredByHostname('fo.bar.com', 'foo.bar.com')).toBeFalsy();
      expect(isAnchoredByHostname('.fo.bar.com', 'foo.bar.com')).toBeFalsy();
      expect(isAnchoredByHostname('bar.com', 'foobar.com')).toBeFalsy();
      expect(isAnchoredByHostname('.bar.com', 'foobar.com')).toBeFalsy();
    });
  });

  describe('infix match', () => {
    it('matches partial', () => {
      expect(isAnchoredByHostname('bar', 'foo.bar.com')).toBeTruthy();
      expect(isAnchoredByHostname('bar.', 'foo.bar.com')).toBeTruthy();
      expect(isAnchoredByHostname('.bar.', 'foo.bar.com')).toBeTruthy();
    });
  });
});

describe('#NetworkFilter.match', () => {
  requests.forEach(({ filters, type, sourceUrl, url }) => {
    filters.forEach((filter) => {
      it(`${filter} matches ${type}, url=${url}, source=${sourceUrl}`, () => {
        const networkFilter = NetworkFilter.parse(filter);
        if (networkFilter !== null) {
          networkFilter.rawLine = filter;
        }

        expect(networkFilter).not.toBeUndefined();
        expect(networkFilter).not.toBeNull();
        expect(networkFilter).toMatchRequest({
          sourceUrl,
          type,
          url,
        });
      });
    });
  });

  it('pattern', () => {
    expect(f`foo`).toMatchRequest({ url: 'https://bar.com/foo' });
    expect(f`foo`).toMatchRequest({ url: 'https://bar.com/baz/foo' });
    expect(f`foo`).toMatchRequest({ url: 'https://bar.com/q=foo/baz' });
    expect(f`foo`).toMatchRequest({ url: 'https://foo.com' });
    expect(f`-foo-`).toMatchRequest({ url: 'https://bar.com/baz/42-foo-q' });
    expect(f`&fo.o=+_-`).toMatchRequest({ url: 'https://bar.com?baz=42&fo.o=+_-' });
    expect(f`foo/bar/baz`).toMatchRequest({ url: 'https://bar.com/foo/bar/baz' });
    expect(f`com/bar/baz`).toMatchRequest({ url: 'https://bar.com/bar/baz' });
    expect(f`https://bar.com/bar/baz`).toMatchRequest({ url: 'https://bar.com/bar/baz' });
  });

  it('pattern$fuzzy', () => {
    expect(f`f$fuzzy`).toMatchRequest({ url: 'https://bar.com/f' });
    expect(f`foo$fuzzy`).toMatchRequest({ url: 'https://bar.com/foo' });
    expect(f`foo$fuzzy`).toMatchRequest({ url: 'https://bar.com/foo/baz' });
    expect(f`foo/bar$fuzzy`).toMatchRequest({ url: 'https://bar.com/foo/baz' });
    expect(f`foo bar$fuzzy`).toMatchRequest({ url: 'https://bar.com/foo/baz' });
    expect(f`foo bar baz$fuzzy`).toMatchRequest({ url: 'http://bar.foo.baz' });

    expect(f`foo bar baz 42$fuzzy`).not.toMatchRequest({ url: 'http://bar.foo.baz' });

    // Fast-path for when pattern is longer than the URL
    expect(f`foo bar baz 42 43$fuzzy`).not.toMatchRequest({ url: 'http://bar.foo.baz' });

    // No fuzzy signature, matches every URL?
    expect(f`+$fuzzy`).toMatchRequest({ url: 'http://bar.foo.baz' });
    expect(f`$fuzzy`).toMatchRequest({ url: 'http://bar.foo.baz' });
  });

  it('||pattern', () => {
    expect(f`||foo.com`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo.com/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo`).toMatchRequest({ url: 'https://baz.foo.com/bar' });
    expect(f`||foo`).toMatchRequest({ url: 'https://foo.baz.com/bar' });
    expect(f`||foo.baz`).toMatchRequest({ url: 'https://foo.baz.com/bar' });
    expect(f`||foo.baz.`).toMatchRequest({ url: 'https://foo.baz.com/bar' });

    expect(f`||foo.baz.com^`).toMatchRequest({ url: 'https://foo.baz.com/bar' });
    expect(f`||foo.baz^`).not.toMatchRequest({ url: 'https://foo.baz.com/bar' });

    expect(f`||foo`).not.toMatchRequest({ url: 'https://baz.com' });
    expect(f`||foo`).not.toMatchRequest({ url: 'https://foo-bar.baz.com/bar' });
    expect(f`||foo.com`).not.toMatchRequest({ url: 'https://foo.de' });
    expect(f`||foo.com`).not.toMatchRequest({ url: 'https://bar.foo.de' });
  });

  it('||pattern$fuzzy', () => {
    const filter = f`||bar.foo/baz$fuzzy`;
    expect(filter).toMatchRequest({ url: 'http://bar.foo/baz' });
    // Same result when fuzzy signature is cached
    expect(filter).toMatchRequest({ url: 'http://bar.foo/baz' });

    expect(f`||bar.foo/baz$fuzzy`).toMatchRequest({ url: 'http://bar.foo/id/baz' });
    expect(f`||bar.foo/baz$fuzzy`).toMatchRequest({ url: 'http://bar.foo?id=42&baz=1' });
    expect(f`||foo.com/id bar$fuzzy`).toMatchRequest({ url: 'http://foo.com?bar&id=42' });

    expect(f`||bar.com/id bar$fuzzy`).not.toMatchRequest({ url: 'http://foo.com?bar&id=42' });
    expect(f`||bar.com/id bar baz foo 42 id$fuzzy`).not.toMatchRequest({
      url: 'http://foo.com?bar&id=42',
    });
  });

  it('||pattern|', () => {
    expect(f`||foo.com|`).toMatchRequest({ url: 'https://foo.com' });
    expect(f`||foo.com/bar|`).toMatchRequest({ url: 'https://foo.com/bar' });

    expect(f`||foo.com/bar|`).not.toMatchRequest({ url: 'https://foo.com/bar/baz' });
    expect(f`||foo.com/bar|`).not.toMatchRequest({ url: 'https://foo.com/' });
    expect(f`||bar.com/bar|`).not.toMatchRequest({ url: 'https://foo.com/' });
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

  it('||pattern + left-anchor', () => {
    expect(f`||foo.com^test`).toMatchRequest({ url: 'https://foo.com/test' });
    expect(f`||foo.com/test`).toMatchRequest({ url: 'https://foo.com/test' });
    expect(f`||foo.com^test`).not.toMatchRequest({ url: 'https://foo.com/tes' });
    expect(f`||foo.com/test`).not.toMatchRequest({ url: 'https://foo.com/tes' });

    expect(f`||foo.com^`).toMatchRequest({ url: 'https://foo.com/test' });

    expect(f`||foo.com/test*bar`).toMatchRequest({ url: 'https://foo.com/testbar' });
    expect(f`||foo.com^test*bar`).toMatchRequest({ url: 'https://foo.com/testbar' });
  });

  it('||hostname^*/pattern', () => {
    expect(f`||foo.com^*/bar`).not.toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||com^*/bar`).not.toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo^*/bar`).not.toMatchRequest({ url: 'https://foo.com/bar' });

    // @see https://github.com/cliqz-oss/adblocker/issues/29
    expect(f`||foo.co^aaa/`).not.toMatchRequest({ url: 'https://bar.foo.com/bbb/aaa/' });
    expect(f`||foo.com^aaa/`).not.toMatchRequest({ url: 'https://bar.foo.com/bbb/aaa/' });

    expect(f`||com*^bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo.com^bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||com^bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*^bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*com/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*com*/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*com*^bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*foo*com*^bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*^bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*com/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*.com/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*foo.com/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*com/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*com*/bar`).toMatchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*com*^bar`).toMatchRequest({ url: 'https://foo.com/bar' });
  });

  it('options', () => {
    // cpt test
    expect(f`||foo$image`).toMatchRequest({ url: 'https://foo.com/bar', type: 'image' });
    expect(f`||foo$image`).not.toMatchRequest({
      type: 'script',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$~image`).toMatchRequest({
      type: 'script',
      url: 'https://foo.com/bar',
    });

    // ~third-party
    expect(f`||foo$~third-party`).toMatchRequest({
      sourceUrl: 'http://baz.foo.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$~third-party`).not.toMatchRequest({
      sourceUrl: 'http://baz.bar.com',
      url: 'https://foo.com/bar',
    });

    // ~first-party
    expect(f`||foo$~first-party`).toMatchRequest({
      sourceUrl: 'http://baz.bar.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$~first-party`).not.toMatchRequest({
      sourceUrl: 'http://baz.foo.com',
      url: 'https://foo.com/bar',
    });

    // opt-domain
    expect(f`||foo$domain=foo.com`).toMatchRequest({
      sourceUrl: 'http://foo.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=foo.com`).not.toMatchRequest({
      sourceUrl: 'http://bar.com',
      url: 'https://foo.com/bar',
    });

    // opt-not-domain
    expect(f`||foo$domain=~bar.com`).toMatchRequest({
      sourceUrl: 'http://foo.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=~bar.com`).not.toMatchRequest({
      sourceUrl: 'http://bar.com',
      url: 'https://foo.com/bar',
    });
  });
});

describe('#CosmeticFilter.match', () => {
  it('does not match with hostname constraint but none provided', () => {
    expect(f`domain.com##.selector`).not.toMatchHostname('');
    expect(f`domain.*##.selector`).not.toMatchHostname('');
    expect(f`~domain.*##.selector`).not.toMatchHostname('');
    expect(f`~domain.com##.selector`).not.toMatchHostname('');
  });

  it('genercic filter', () => {
    expect(f`##.selector`).toMatchHostname('foo.com');
  });

  it('single domain', () => {
    expect(f`foo.com##.selector`).toMatchHostname('foo.com');
    expect(f`foo.com##.selector`).not.toMatchHostname('bar.com');
  });

  it('multiple domains', () => {
    expect(f`foo.com,test.com##.selector`).toMatchHostname('foo.com');
    expect(f`foo.com,test.com##.selector`).toMatchHostname('test.com');
    expect(f`foo.com,test.com##.selector`).not.toMatchHostname('baz.com');
  });

  it('subdomain', () => {
    expect(f`foo.com,test.com##.selector`).toMatchHostname('sub.test.com');
    expect(f`foo.com,test.com##.selector`).toMatchHostname('sub.foo.com');

    expect(f`foo.com,sub.test.com##.selector`).toMatchHostname('sub.test.com');
    expect(f`foo.com,sub.test.com##.selector`).not.toMatchHostname('test.com');
    expect(f`foo.com,sub.test.com##.selector`).not.toMatchHostname('com');
  });

  it('entity', () => {
    expect(f`foo.com,sub.test.*##.selector`).toMatchHostname('foo.com');
    expect(f`foo.com,sub.test.*##.selector`).toMatchHostname('bar.foo.com');
    expect(f`foo.com,sub.test.*##.selector`).toMatchHostname('sub.test.com');
    expect(f`foo.com,sub.test.*##.selector`).toMatchHostname('sub.test.fr');
    expect(f`foo.com,sub.test.*##.selector`).not.toMatchHostname('sub.test.evil.biz');

    expect(f`foo.*##.selector`).toMatchHostname('foo.co.uk');
    expect(f`foo.*##.selector`).toMatchHostname('bar.foo.co.uk');
    expect(f`foo.*##.selector`).toMatchHostname('baz.bar.foo.co.uk');
    expect(f`foo.*##.selector`).not.toMatchHostname('foo.evil.biz');
  });

  it('does not match', () => {
    expect(f`foo.*##.selector`).not.toMatchHostname('foo.bar.com');
    expect(f`foo.*##.selector`).not.toMatchHostname('bar-foo.com');
  });

  describe('negations', () => {
    it('entity', () => {
      expect(f`~foo.*##.selector`).not.toMatchHostname('foo.com');
      expect(f`~foo.*##.selector`).toMatchHostname('foo.evil.biz');

      expect(f`~foo.*,~bar.*##.selector`).toMatchHostname('baz.com');
      expect(f`~foo.*,~bar.*##.selector`).not.toMatchHostname('foo.com');
      expect(f`~foo.*,~bar.*##.selector`).not.toMatchHostname('sub.foo.com');
      expect(f`~foo.*,~bar.*##.selector`).not.toMatchHostname('bar.com');
      expect(f`~foo.*,~bar.*##.selector`).not.toMatchHostname('sub.bar.com');
    });

    it('hostnames', () => {
      expect(f`~foo.com##.selector`).not.toMatchHostname('foo.com');
      expect(f`~foo.com##.selector`).not.toMatchHostname('bar.foo.com');
      expect(f`~foo.com##.selector`).toMatchHostname('foo.com.bar');
      expect(f`~foo.com##.selector`).toMatchHostname('foo.co.uk');
      expect(f`~foo.com##.selector`).toMatchHostname('foo.co.uk');

      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.toMatchHostname('foo.com');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.toMatchHostname('sub.foo.com');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.toMatchHostname('foo.de');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.toMatchHostname('sub.foo.de');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.toMatchHostname('bar.com');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.toMatchHostname('sub.bar.com');

      expect(f`~foo.com,~foo.de,~bar.com##.selector`).toMatchHostname('bar.de');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).toMatchHostname('sub.bar.de');
    });
  });

  describe('complex', () => {
    it('handles entity with suffix exception', () => {
      expect(f`foo.*,~foo.com##.selector`).not.toMatchHostname('foo.com');
      expect(f`foo.*,~foo.com##.selector`).not.toMatchHostname('sub.foo.com');
      expect(f`foo.*,~foo.com##.selector`).toMatchHostname('foo.de');
      expect(f`foo.*,~foo.com##.selector`).toMatchHostname('sub.foo.de');
    });

    it('handles entity with subdomain exception', () => {
      expect(f`foo.*,~sub.foo.*##.selector`).toMatchHostname('foo.com');
      expect(f`foo.*,~sub.foo.*##.selector`).toMatchHostname('foo.de');
      expect(f`foo.*,~sub.foo.*##.selector`).not.toMatchHostname('sub.foo.de');
      expect(f`foo.*,~sub.foo.*##.selector`).not.toMatchHostname('sub.foo.com');
      expect(f`foo.*,~sub.foo.*##.selector`).toMatchHostname('sub2.foo.com');
    });
  });

  it('no domain provided', () => {
    const parsed = CosmeticFilter.parse('foo.*##.selector');
    expect(parsed).not.toBeNull();
    if (parsed !== null) {
      expect(parsed.match('foo.com', '')).toBeFalsy();
    }
  });
});

describe('#getHostnameWithoutPublicSuffix', () => {
  it('returns null for empty hostname', () => {
    expect(getHostnameWithoutPublicSuffix('', '')).toEqual(null);
  });

  it('returns null for empty domain', () => {
    expect(getHostnameWithoutPublicSuffix('com', '')).toEqual(null);
  });

  it('returns null for a single label', () => {
    expect(getHostnameWithoutPublicSuffix('com', 'com')).toEqual(null);
  });

  it('simple domain', () => {
    expect(getHostnameWithoutPublicSuffix('foo.com', 'foo.com')).toEqual('foo');
  });

  it('with subdomain', () => {
    expect(getHostnameWithoutPublicSuffix('foo.bar.com', 'bar.com')).toEqual('foo.bar');
  });
});

describe('#getHashesFromLabelsBackward', () => {
  it('hash all labels', () => {
    expect(getHashesFromLabelsBackward('foo.bar.baz', 11, 11)).toEqual(
      ['baz', 'bar.baz', 'foo.bar.baz'].map(hashHostnameBackward),
    );
  });

  it('hash subdomains only', () => {
    expect(getHashesFromLabelsBackward('foo.bar.baz.com', 15, 8 /* start of domain */)).toEqual(
      ['baz.com', 'bar.baz.com', 'foo.bar.baz.com'].map(hashHostnameBackward),
    );
  });

  it('hash ignoring suffix', () => {
    expect(getHashesFromLabelsBackward('foo.bar.baz.com', 11, 11)).toEqual(
      ['baz', 'bar.baz', 'foo.bar.baz'].map(hashHostnameBackward),
    );
  });

  it('hash subdomains only, ignoring suffix', () => {
    expect(getHashesFromLabelsBackward('foo.bar.baz.com', 11, 8)).toEqual(
      ['baz', 'bar.baz', 'foo.bar.baz'].map(hashHostnameBackward),
    );
  });
});
