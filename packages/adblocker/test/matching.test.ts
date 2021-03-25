/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect, use } from 'chai';
import 'mocha';

import { getDomain } from 'tldts-experimental';

import CosmeticFilter from '../src/filters/cosmetic';
import NetworkFilter, { isAnchoredByHostname } from '../src/filters/network';

import { f } from '../src/lists';
import Request, {
  RequestInitialization,
  RequestType,
  getHashesFromLabelsBackward,
  getHostnameWithoutPublicSuffix,
  hashHostnameBackward,
} from '../src/request';

import requests from './data/requests';

use((chai, utils) => {
  utils.addMethod(
    chai.Assertion.prototype,
    'matchRequest',
    function (this: any, req: Partial<Request>) {
      const filter = this._obj;
      const request = Request.fromRawDetails(req);

      new chai.Assertion(filter).not.to.be.null;

      this.assert(
        filter.match(request),
        'expected #{this} to match #{exp}',
        'expected #{this} to not match #{exp}',
      );
    },
  );

  utils.addMethod(
    chai.Assertion.prototype,
    'matchHostname',
    function (this: any, hostname: string) {
      const filter = this._obj;
      new chai.Assertion(filter).not.to.be.null;

      this.assert(
        filter.match(hostname, getDomain(hostname) || ''),
        'expected #{this} to match #{exp}',
        'expected #{this} to not match #{exp}',
      );
    },
  );
});

declare global {
  namespace Chai {
    interface Assertion {
      matchRequest(req: Partial<RequestInitialization>): Assertion;
      matchHostname(hostname: string): Assertion;
    }
  }
}

describe('#isAnchoredByHostname', () => {
  it('matches empty hostname', () => {
    expect(isAnchoredByHostname('', 'foo.com', false)).to.be.true;
  });

  it('does not match when filter hostname is longer than hostname', () => {
    expect(isAnchoredByHostname('bar.foo.com', 'foo.com', false)).to.be.false;
    expect(isAnchoredByHostname('b', '', false)).to.be.false;
    expect(isAnchoredByHostname('foo.com', 'foo.co', false)).to.be.false;
  });

  it('does not match if there is not match', () => {
    expect(isAnchoredByHostname('bar', 'foo.com', false)).to.be.false;
  });

  describe('prefix match', () => {
    it('matches exact match', () => {
      expect(isAnchoredByHostname('', '', false)).to.be.true;
      expect(isAnchoredByHostname('f', 'f', false)).to.be.true;
      expect(isAnchoredByHostname('foo', 'foo', false)).to.be.true;
      expect(isAnchoredByHostname('foo.com', 'foo.com', false)).to.be.true;
      expect(isAnchoredByHostname('.com', '.com', false)).to.be.true;
      expect(isAnchoredByHostname('com.', 'com.', false)).to.be.true;
    });

    it('matches partial', () => {
      // Single label
      expect(isAnchoredByHostname('foo', 'foo.com', false)).to.be.true;
      expect(isAnchoredByHostname('foo.', 'foo.com', false)).to.be.true;
      expect(isAnchoredByHostname('.foo', '.foo.com', false)).to.be.true;
      expect(isAnchoredByHostname('.foo.', '.foo.com', false)).to.be.true;

      // Multiple labels
      expect(isAnchoredByHostname('foo.com', 'foo.com.', false)).to.be.true;
      expect(isAnchoredByHostname('foo.com.', 'foo.com.', false)).to.be.true;
      expect(isAnchoredByHostname('.foo.com.', '.foo.com.', false)).to.be.true;
      expect(isAnchoredByHostname('.foo.com', '.foo.com', false)).to.be.true;

      expect(isAnchoredByHostname('foo.bar', 'foo.bar.com', false)).to.be.true;
      expect(isAnchoredByHostname('foo.bar.', 'foo.bar.com', false)).to.be.true;
    });

    it('does not match partial prefix', () => {
      // Single label
      expect(isAnchoredByHostname('foo', 'foobar.com', false)).to.be.false;
      expect(isAnchoredByHostname('fo', 'foo.com', false)).to.be.false;
      expect(isAnchoredByHostname('.foo', 'foobar.com', false)).to.be.false;

      // Multiple labels
      expect(isAnchoredByHostname('foo.bar', 'foo.barbaz.com', false)).to.be.false;
      expect(isAnchoredByHostname('.foo.bar', '.foo.barbaz.com', false)).to.be.false;
    });
  });

  describe('suffix match', () => {
    it('matches partial', () => {
      // Single label
      expect(isAnchoredByHostname('com', 'foo.com', false)).to.be.true;
      expect(isAnchoredByHostname('.com', 'foo.com', false)).to.be.true;
      expect(isAnchoredByHostname('.com.', 'foo.com.', false)).to.be.true;
      expect(isAnchoredByHostname('com.', 'foo.com.', false)).to.be.true;

      // Multiple labels
      expect(isAnchoredByHostname('foo.com.', '.foo.com.', false)).to.be.true;
      expect(isAnchoredByHostname('foo.com', '.foo.com', false)).to.be.true;
    });

    it('does not match partial', () => {
      // Single label
      expect(isAnchoredByHostname('om', 'foo.com', false)).to.be.false;
      expect(isAnchoredByHostname('com', 'foocom', false)).to.be.false;

      // Multiple labels
      expect(isAnchoredByHostname('foo.bar.com', 'baz.bar.com', false)).to.be.false;
      expect(isAnchoredByHostname('fo.bar.com', 'foo.bar.com', false)).to.be.false;
      expect(isAnchoredByHostname('.fo.bar.com', 'foo.bar.com', false)).to.be.false;
      expect(isAnchoredByHostname('bar.com', 'foobar.com', false)).to.be.false;
      expect(isAnchoredByHostname('.bar.com', 'foobar.com', false)).to.be.false;
    });
  });

  describe('infix match', () => {
    it('matches partial', () => {
      expect(isAnchoredByHostname('bar', 'foo.bar.com', false)).to.be.true;
      expect(isAnchoredByHostname('bar.', 'foo.bar.com', false)).to.be.true;
      expect(isAnchoredByHostname('.bar.', 'foo.bar.com', false)).to.be.true;
    });
  });
});

describe('#NetworkFilter.match', () => {
  requests.forEach(({ filters, type, sourceUrl, url }) => {
    filters.forEach((filter) => {
      it(`${filter} matches ${type}, url=${url}, source=${sourceUrl}`, () => {
        const networkFilter = NetworkFilter.parse(filter, true);
        expect(networkFilter).not.to.be.null;
        expect(networkFilter).to.matchRequest({
          sourceUrl,
          type: type as RequestType,
          url,
        });
      });
    });
  });

  it('pattern', () => {
    expect(f`foo`).to.matchRequest({ url: 'https://bar.com/foo' });
    expect(f`foo`).to.matchRequest({ url: 'https://bar.com/baz/foo' });
    expect(f`foo`).to.matchRequest({ url: 'https://bar.com/q=foo/baz' });
    expect(f`foo`).to.matchRequest({ url: 'https://foo.com' });
    expect(f`-foo-`).to.matchRequest({ url: 'https://bar.com/baz/42-foo-q' });
    expect(f`&fo.o=+_-`).to.matchRequest({ url: 'https://bar.com?baz=42&fo.o=+_-' });
    expect(f`foo/bar/baz`).to.matchRequest({ url: 'https://bar.com/foo/bar/baz' });
    expect(f`com/bar/baz`).to.matchRequest({ url: 'https://bar.com/bar/baz' });
    expect(f`https://bar.com/bar/baz`).to.matchRequest({ url: 'https://bar.com/bar/baz' });
  });

  it('||pattern', () => {
    expect(f`||foo.com`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo.com/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo`).to.matchRequest({ url: 'https://baz.foo.com/bar' });
    expect(f`||foo`).to.matchRequest({ url: 'https://foo.baz.com/bar' });
    expect(f`||foo.baz`).to.matchRequest({ url: 'https://foo.baz.com/bar' });
    expect(f`||foo.baz.`).to.matchRequest({ url: 'https://foo.baz.com/bar' });

    expect(f`||foo.baz.com^`).to.matchRequest({ url: 'https://foo.baz.com/bar' });
    expect(f`||foo.baz^`).not.to.matchRequest({ url: 'https://foo.baz.com/bar' });

    expect(f`||foo`).not.to.matchRequest({ url: 'https://baz.com' });
    expect(f`||foo`).not.to.matchRequest({ url: 'https://foo-bar.baz.com/bar' });
    expect(f`||foo.com`).not.to.matchRequest({ url: 'https://foo.de' });
    expect(f`||foo.com`).not.to.matchRequest({ url: 'https://bar.foo.de' });
  });

  it('||pattern|', () => {
    expect(f`||foo.com|`).to.matchRequest({ url: 'https://foo.com' });
    expect(f`||foo.com/bar|`).to.matchRequest({ url: 'https://foo.com/bar' });

    expect(f`||foo.com/bar|`).not.to.matchRequest({ url: 'https://foo.com/bar/baz' });
    expect(f`||foo.com/bar|`).not.to.matchRequest({ url: 'https://foo.com/' });
    expect(f`||bar.com/bar|`).not.to.matchRequest({ url: 'https://foo.com/' });
  });

  it('pattern|', () => {
    expect(f`foo.com`).to.matchRequest({ url: 'https://foo.com' });
    expect(f`foo|`).to.matchRequest({ url: 'https://bar.com/foo' });
    expect(f`foo|`).not.to.matchRequest({ url: 'https://bar.com/foo/' });
    expect(f`foo|`).not.to.matchRequest({ url: 'https://bar.com/foo/baz' });
  });

  it('|pattern', () => {
    expect(f`|http`).to.matchRequest({ url: 'http://foo.com' });
    expect(f`|http`).to.matchRequest({ url: 'https://foo.com' });
    expect(f`|https://`).to.matchRequest({ url: 'https://foo.com' });

    expect(f`https`).not.to.matchRequest({ url: 'http://foo.com' });
  });

  it('|pattern|', () => {
    expect(f`|https://foo.com|`).to.matchRequest({ url: 'https://foo.com' });
  });

  it('||pattern + left-anchor', () => {
    expect(f`||foo.com^test`).to.matchRequest({ url: 'https://foo.com/test' });
    expect(f`||foo.com/test`).to.matchRequest({ url: 'https://foo.com/test' });
    expect(f`||foo.com^test`).not.to.matchRequest({ url: 'https://foo.com/tes' });
    expect(f`||foo.com/test`).not.to.matchRequest({ url: 'https://foo.com/tes' });

    expect(f`||foo.com^`).to.matchRequest({ url: 'https://foo.com/test' });

    expect(f`||foo.com/test*bar`).to.matchRequest({ url: 'https://foo.com/testbar' });
    expect(f`||foo.com^test*bar`).to.matchRequest({ url: 'https://foo.com/testbar' });
  });

  it('||hostname^*/pattern', () => {
    expect(f`||foo.com^*/bar`).not.to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||com^*/bar`).not.to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo^*/bar`).not.to.matchRequest({ url: 'https://foo.com/bar' });

    // @see https://github.com/cliqz-oss/adblocker/issues/29
    expect(f`||foo.co^aaa/`).not.to.matchRequest({ url: 'https://bar.foo.com/bbb/aaa/' });
    expect(f`||foo.com^aaa/`).not.to.matchRequest({ url: 'https://bar.foo.com/bbb/aaa/' });

    expect(f`||com*^bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo.com^bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||com^bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*^bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*com/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*com*/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||foo*com*^bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*foo*com*^bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*^bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*com/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*.com/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*foo.com/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*com/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*com*/bar`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`||*com*^bar`).to.matchRequest({ url: 'https://foo.com/bar' });
  });

  it('/regex/', () => {
    expect(f`/com/`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`/.*/`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`/foo\\.\\w+[/]/`).to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`/foo.[0-9]\\w+[^/]/`).to.matchRequest({ url: 'https://foo.3om/bar' });
    expect(f`/foo.[0-9]\\w+[^/]/`).not.to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`/foo.[0-9]\\w+[^/]/`).to.matchRequest({ url: 'https://foo43om/bar' });
    expect(f`/foo\\.[0-9]\\w+[^/]/`).not.to.matchRequest({ url: 'https://foo43om/bar' });
    expect(f`/com/$image`).not.to.matchRequest({ url: 'https://foo.com/bar' });
    expect(f`/\\w{10,20}\\.com/$script`).to.matchRequest({
      type: 'script',
      url: 'https://qwertyuiopas1234567890.com/bar',
    });
  });

  it('options', () => {
    // cpt test
    expect(f`||foo$image`).to.matchRequest({ url: 'https://foo.com/bar', type: 'image' });
    expect(f`||foo$image`).not.to.matchRequest({
      type: 'script',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$~image`).to.matchRequest({
      type: 'script',
      url: 'https://foo.com/bar',
    });

    // ~third-party
    expect(f`||foo$~third-party`).to.matchRequest({
      sourceUrl: 'http://baz.foo.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$~third-party`).not.to.matchRequest({
      sourceUrl: 'http://baz.bar.com',
      url: 'https://foo.com/bar',
      type: 'script',
    });

    // ~first-party
    expect(f`||foo$~first-party`).to.matchRequest({
      sourceUrl: 'http://baz.bar.com',
      url: 'https://foo.com/bar',
      type: 'script',
    });
    expect(f`||foo$~first-party`).not.to.matchRequest({
      sourceUrl: 'http://baz.foo.com',
      url: 'https://foo.com/bar',
    });

    // opt-domain
    expect(f`||foo$domain=foo.com`).to.matchRequest({
      sourceUrl: 'http://foo.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=sub1.foo.com`).not.to.matchRequest({
      sourceUrl: 'http://sub2.sub1.bar.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=foo.com`).not.to.matchRequest({
      sourceUrl: 'http://bar.com',
      url: 'https://foo.com/bar',
    });

    // opt-not-domain
    expect(f`||foo$domain=~bar.com`).to.matchRequest({
      sourceUrl: 'http://foo.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=~bar.*`).to.matchRequest({
      sourceUrl: 'http://foo.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=~bar.com`).not.to.matchRequest({
      sourceUrl: 'http://bar.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=~bar.*`).not.to.matchRequest({
      sourceUrl: 'http://bar.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=~bar.*`).not.to.matchRequest({
      sourceUrl: 'http://bar.co.uk',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=~bar.com`).not.to.matchRequest({
      sourceUrl: 'http://sub.bar.com',
      url: 'https://foo.com/bar',
    });
    expect(f`||foo$domain=~sub1.bar.com`).not.to.matchRequest({
      sourceUrl: 'http://sub2.sub1.bar.com',
      url: 'https://foo.com/bar',
    });

    // denyallow
    expect(f`*$3p,denyallow=x.com|y.com,domain=a.com|b.com`).to.matchRequest({
      sourceUrl: 'https://a.com',
      url: 'https://z.com/bar',
      type: 'script',
    });
    expect(f`*$3p,denyallow=x.com|y.com,domain=a.com|b.com`).to.matchRequest({
      sourceUrl: 'https://b.com',
      url: 'https://z.com/bar',
      type: 'script',
    });
    expect(f`*$3p,denyallow=x.com|y.com,domain=a.com|b.com`).to.matchRequest({
      sourceUrl: 'https://sub.b.com',
      url: 'https://z.com/bar',
      type: 'script',
    });
    expect(f`*$3p,denyallow=x.com|y.com,domain=a.com|b.com`).to.not.matchRequest({
      sourceUrl: 'https://a.com',
      url: 'https://x.com/bar',
      type: 'script',
    });
    expect(f`*$3p,denyallow=x.com|y.com,domain=a.com|b.com`).to.not.matchRequest({
      sourceUrl: 'https://a.com',
      url: 'https://sub.y.com/bar',
      type: 'script',
    });
    expect(f`*$3p,denyallow=x.com|y.com,domain=a.com|b.com`).to.not.matchRequest({
      sourceUrl: 'https://sub.b.com',
      url: 'https://sub.y.com/bar',
      type: 'script',
    });
    expect(f`*$3p,denyallow=x.com|y.com,domain=a.com|b.com`).to.not.matchRequest({
      sourceUrl: 'https://c.com',
      url: 'https://sub.y.com/bar',
      type: 'script',
    });
  });
});

describe('#CosmeticFilter.match', () => {
  it('does not match with hostname constraint but none provided', () => {
    expect(f`domain.com##.selector`).not.to.matchHostname('');
    expect(f`domain.*##.selector`).not.to.matchHostname('');
    expect(f`~domain.*##.selector`).not.to.matchHostname('');
    expect(f`~domain.com##.selector`).not.to.matchHostname('');
  });

  it('genercic filter', () => {
    expect(f`##.selector`).to.matchHostname('foo.com');
  });

  it('single domain', () => {
    expect(f`foo.com##.selector`).to.matchHostname('foo.com');
    expect(f`foo.com##.selector`).not.to.matchHostname('bar.com');
  });

  it('multiple domains', () => {
    expect(f`foo.com,test.com##.selector`).to.matchHostname('foo.com');
    expect(f`foo.com,test.com##.selector`).to.matchHostname('test.com');
    expect(f`foo.com,test.com##.selector`).not.to.matchHostname('baz.com');
  });

  it('subdomain', () => {
    expect(f`foo.com,test.com##.selector`).to.matchHostname('sub.test.com');
    expect(f`foo.com,test.com##.selector`).to.matchHostname('sub.foo.com');

    expect(f`foo.com,sub.test.com##.selector`).to.matchHostname('sub.test.com');
    expect(f`foo.com,sub.test.com##.selector`).not.to.matchHostname('test.com');
    expect(f`foo.com,sub.test.com##.selector`).not.to.matchHostname('com');
  });

  it('entity', () => {
    expect(f`foo.com,sub.test.*##.selector`).to.matchHostname('foo.com');
    expect(f`foo.com,sub.test.*##.selector`).to.matchHostname('bar.foo.com');
    expect(f`foo.com,sub.test.*##.selector`).to.matchHostname('sub.test.com');
    expect(f`foo.com,sub.test.*##.selector`).to.matchHostname('sub.test.fr');
    expect(f`foo.com,sub.test.*##.selector`).not.to.matchHostname('sub.test.evil.biz');

    expect(f`foo.*##.selector`).to.matchHostname('foo.co.uk');
    expect(f`foo.*##.selector`).to.matchHostname('bar.foo.co.uk');
    expect(f`foo.*##.selector`).to.matchHostname('baz.bar.foo.co.uk');
    expect(f`foo.*##.selector`).not.to.matchHostname('foo.evil.biz');
  });

  it('does not match', () => {
    expect(f`foo.*##.selector`).not.to.matchHostname('foo.bar.com');
    expect(f`foo.*##.selector`).not.to.matchHostname('bar-foo.com');
  });

  describe('negations', () => {
    it('entity', () => {
      expect(f`~foo.*##.selector`).not.to.matchHostname('foo.com');
      expect(f`~foo.*##.selector`).to.matchHostname('foo.evil.biz');

      expect(f`~foo.*,~bar.*##.selector`).to.matchHostname('baz.com');
      expect(f`~foo.*,~bar.*##.selector`).not.to.matchHostname('foo.com');
      expect(f`~foo.*,~bar.*##.selector`).not.to.matchHostname('sub.foo.com');
      expect(f`~foo.*,~bar.*##.selector`).not.to.matchHostname('bar.com');
      expect(f`~foo.*,~bar.*##.selector`).not.to.matchHostname('sub.bar.com');
    });

    it('hostnames', () => {
      expect(f`~foo.com##.selector`).not.to.matchHostname('foo.com');
      expect(f`~foo.com##.selector`).not.to.matchHostname('bar.foo.com');
      expect(f`~foo.com##.selector`).to.matchHostname('foo.com.bar');
      expect(f`~foo.com##.selector`).to.matchHostname('foo.co.uk');
      expect(f`~foo.com##.selector`).to.matchHostname('foo.co.uk');

      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.to.matchHostname('foo.com');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.to.matchHostname('sub.foo.com');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.to.matchHostname('foo.de');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.to.matchHostname('sub.foo.de');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.to.matchHostname('bar.com');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).not.to.matchHostname('sub.bar.com');

      expect(f`~foo.com,~foo.de,~bar.com##.selector`).to.matchHostname('bar.de');
      expect(f`~foo.com,~foo.de,~bar.com##.selector`).to.matchHostname('sub.bar.de');
    });
  });

  describe('complex', () => {
    it('handles entity with suffix exception', () => {
      expect(f`foo.*,~foo.com##.selector`).not.to.matchHostname('foo.com');
      expect(f`foo.*,~foo.com##.selector`).not.to.matchHostname('sub.foo.com');
      expect(f`foo.*,~foo.com##.selector`).to.matchHostname('foo.de');
      expect(f`foo.*,~foo.com##.selector`).to.matchHostname('sub.foo.de');
    });

    it('handles entity with subdomain exception', () => {
      expect(f`foo.*,~sub.foo.*##.selector`).to.matchHostname('foo.com');
      expect(f`foo.*,~sub.foo.*##.selector`).to.matchHostname('foo.de');
      expect(f`foo.*,~sub.foo.*##.selector`).not.to.matchHostname('sub.foo.de');
      expect(f`foo.*,~sub.foo.*##.selector`).not.to.matchHostname('sub.foo.com');
      expect(f`foo.*,~sub.foo.*##.selector`).to.matchHostname('sub2.foo.com');
    });
  });

  it('no domain provided', () => {
    const parsed = CosmeticFilter.parse('foo.*##.selector');
    expect(parsed).not.to.be.null;
    if (parsed !== null) {
      expect(parsed.match('foo.com', '')).to.be.false;
    }
  });
});

describe('#getHostnameWithoutPublicSuffix', () => {
  it('returns null for empty hostname', () => {
    expect(getHostnameWithoutPublicSuffix('', '')).to.be.null;
  });

  it('returns null for empty domain', () => {
    expect(getHostnameWithoutPublicSuffix('com', '')).to.be.null;
  });

  it('returns null for a single label', () => {
    expect(getHostnameWithoutPublicSuffix('com', 'com')).to.be.null;
  });

  it('simple domain', () => {
    expect(getHostnameWithoutPublicSuffix('foo.com', 'foo.com')).to.equal('foo');
  });

  it('with subdomain', () => {
    expect(getHostnameWithoutPublicSuffix('foo.bar.com', 'bar.com')).to.equal('foo.bar');
  });
});

describe('#getHashesFromLabelsBackward', () => {
  it('hash all labels', () => {
    expect(getHashesFromLabelsBackward('foo.bar.baz', 11, 11)).to.eql(
      new Uint32Array(['baz', 'bar.baz', 'foo.bar.baz'].map(hashHostnameBackward)),
    );
  });

  it('hash subdomains only', () => {
    expect(getHashesFromLabelsBackward('foo.bar.baz.com', 15, 8 /* start of domain */)).to.eql(
      new Uint32Array(['baz.com', 'bar.baz.com', 'foo.bar.baz.com'].map(hashHostnameBackward)),
    );
  });

  it('hash ignoring suffix', () => {
    expect(getHashesFromLabelsBackward('foo.bar.baz.com', 11, 11)).to.eql(
      new Uint32Array(['baz', 'bar.baz', 'foo.bar.baz'].map(hashHostnameBackward)),
    );
  });

  it('hash subdomains only, ignoring suffix', () => {
    expect(getHashesFromLabelsBackward('foo.bar.baz.com', 11, 8)).to.eql(
      new Uint32Array(['baz', 'bar.baz', 'foo.bar.baz'].map(hashHostnameBackward)),
    );
  });
});
