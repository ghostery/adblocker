/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Request from '../src/request';

describe('#Request', () => {
  describe('#fromRawDetails', () => {
    it('sets default type', () => {
      expect(Request.fromRawDetails({})).toMatchObject({ type: 'main_frame' });
    });

    it('gets type from arguments', () => {
      expect(Request.fromRawDetails({ type: 'script' })).toMatchObject({ type: 'script' });
    });

    it('sets default url to empty', () => {
      expect(Request.fromRawDetails({})).toMatchObject({
        domain: '',
        hostname: '',
        url: '',
      });
    });

    it('converts url to lower case', () => {
      expect(Request.fromRawDetails({ url: 'https://sub.FOO.cOm/bar' })).toMatchObject({
        domain: 'foo.com',
        hostname: 'sub.foo.com',
        url: 'https://sub.foo.com/bar',
      });
    });

    it('parses url', () => {
      expect(Request.fromRawDetails({ url: 'https://sub.foo.com/bar' })).toMatchObject({
        domain: 'foo.com',
        hostname: 'sub.foo.com',
        url: 'https://sub.foo.com/bar',
      });
    });

    it('does not parse url if hostname and domain provided', () => {
      expect(
        Request.fromRawDetails({
          domain: 'PROVIDED DOMAIN',
          hostname: 'PROVIDED HOSTNAME',
          url: 'https://sub.foo.com/bar',
        }),
      ).toMatchObject({
        domain: 'PROVIDED DOMAIN',
        hostname: 'PROVIDED HOSTNAME',
        url: 'https://sub.foo.com/bar',
      });
    });

    it('parses url if only hostname is provided', () => {
      expect(
        Request.fromRawDetails({
          hostname: 'PROVIDED HOSTNAME',
          url: 'https://sub.foo.com/bar',
        }),
      ).toMatchObject({
        domain: 'foo.com',
        hostname: 'PROVIDED HOSTNAME',
        url: 'https://sub.foo.com/bar',
      });
    });

    it('parses url if only domain is provided', () => {
      expect(
        Request.fromRawDetails({
          domain: 'PROVIDED DOMAIN',
          url: 'https://sub.foo.com/bar',
        }),
      ).toMatchObject({
        domain: 'PROVIDED DOMAIN',
        hostname: 'sub.foo.com',
        url: 'https://sub.foo.com/bar',
      });
    });

    it('sets default sourceUrl to empty', () => {
      expect(Request.fromRawDetails({})).toMatchObject({
        sourceDomain: '',
        sourceHostname: '',
      });
    });

    it('converts sourceUrl to lower case', () => {
      expect(Request.fromRawDetails({ sourceUrl: 'https://sub.FOO.cOm/bar' })).toMatchObject({
        sourceDomain: 'foo.com',
        sourceHostname: 'sub.foo.com',
      });
    });

    it('parses sourceUrl', () => {
      expect(Request.fromRawDetails({ sourceUrl: 'https://sub.foo.com/bar' })).toMatchObject({
        sourceDomain: 'foo.com',
        sourceHostname: 'sub.foo.com',
      });
    });

    it('does not parse sourceUrl if hostname and domain provided', () => {
      expect(
        Request.fromRawDetails({
          sourceDomain: 'PROVIDED DOMAIN',
          sourceHostname: 'PROVIDED HOSTNAME',
          sourceUrl: 'https://sub.foo.com/bar',
        }),
      ).toMatchObject({
        sourceDomain: 'PROVIDED DOMAIN',
        sourceHostname: 'PROVIDED HOSTNAME',
      });
    });

    it('parses sourceUrl if only hostname is provided', () => {
      expect(
        Request.fromRawDetails({
          sourceHostname: 'PROVIDED HOSTNAME',
          sourceUrl: 'https://sub.foo.com/bar',
        }),
      ).toMatchObject({
        sourceDomain: 'foo.com',
        sourceHostname: 'PROVIDED HOSTNAME',
      });
    });

    it('parses sourceUrl if only domain is provided', () => {
      expect(
        Request.fromRawDetails({
          sourceDomain: 'PROVIDED DOMAIN',
          sourceUrl: 'https://sub.foo.com/bar',
        }),
      ).toMatchObject({
        sourceDomain: 'PROVIDED DOMAIN',
        sourceHostname: 'sub.foo.com',
      });
    });

    it('overrides type for websocket requests', () => {
      expect(Request.fromRawDetails({ url: 'ws://foo.com' }).type).toEqual('websocket');
      expect(Request.fromRawDetails({ url: 'wss://foo.com' }).type).toEqual('websocket');
    });

    it('supports http protocol', () => {
      const expected = {
        isHttp: true,
        isHttps: false,
        isSupported: true,
      };

      expect(Request.fromRawDetails({ url: 'http:///foo.com' })).toMatchObject(expected);
      expect(Request.fromRawDetails({ url: 'http://foo.com' })).toMatchObject(expected);
      expect(Request.fromRawDetails({ url: 'http:/foo.com' })).toMatchObject(expected);
    });

    it('supports https protocol', () => {
      const expected = {
        isHttp: false,
        isHttps: true,
        isSupported: true,
      };

      expect(Request.fromRawDetails({ url: 'https:///foo.com' })).toMatchObject(expected);
      expect(Request.fromRawDetails({ url: 'https://foo.com' })).toMatchObject(expected);
      expect(Request.fromRawDetails({ url: 'https:/foo.com' })).toMatchObject(expected);
    });

    it('supports ws protocol', () => {
      const expected = {
        isHttp: false,
        isHttps: false,
        isSupported: true,
      };

      expect(Request.fromRawDetails({ url: 'ws:///foo.com' })).toMatchObject(expected);
      expect(Request.fromRawDetails({ url: 'ws://foo.com' })).toMatchObject(expected);
      expect(Request.fromRawDetails({ url: 'ws:/foo.com' })).toMatchObject(expected);
    });

    it('supports wss protocol', () => {
      const expected = {
        isHttp: false,
        isHttps: false,
        isSupported: true,
      };

      expect(Request.fromRawDetails({ url: 'wss:///foo.com' })).toMatchObject(expected);
      expect(Request.fromRawDetails({ url: 'wss://foo.com' })).toMatchObject(expected);
      expect(Request.fromRawDetails({ url: 'wss:/foo.com' })).toMatchObject(expected);
    });

    it('drops data urls', () => {
      for (const url of [
        'data:,Hello%2C%20World!',
        'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
        'data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
        'data:text/html,<script>alert("hi");</script>',
      ]) {
        expect(Request.fromRawDetails({ url })).toMatchObject({
          isHttp: false,
          isHttps: false,
          isSupported: false,
        });
      }
    });

    it('detects unsupported protocols', () => {
      const expected = {
        isHttp: false,
        isHttps: false,
        isSupported: false,
      };

      for (const protocol of [
        'foobar',
        'ip',
        'ftp',
        'git',
        'data',
        'ssh',
        'smtp',
        'pop3',
        'imap',
      ]) {
        expect(Request.fromRawDetails({ url: `${protocol}:///foo.com` })).toMatchObject(expected);
        expect(Request.fromRawDetails({ url: `${protocol}://foo.com` })).toMatchObject(expected);
        expect(Request.fromRawDetails({ url: `${protocol}:/foo.com` })).toMatchObject(expected);
      }
    });

    describe('finds partyness', () => {
      it('correctly uses domains when available', () => {
        expect(
          Request.fromRawDetails({ url: 'https://foo.com', sourceUrl: 'https://foo.com' }),
        ).toMatchObject({
          isFirstParty: true,
          isThirdParty: false,
        });

        expect(
          Request.fromRawDetails({
            sourceUrl: 'https://sub1.sub2.foo.com',
            url: 'https://foo.com',
          }),
        ).toMatchObject({
          isFirstParty: true,
          isThirdParty: false,
        });

        expect(
          Request.fromRawDetails({
            sourceUrl: 'https://sub1.sub2.bar.com',
            url: 'https://foo.com',
          }),
        ).toMatchObject({
          isFirstParty: false,
          isThirdParty: true,
        });
      });

      it('falls-back to first-party if no sourceUrl', () => {
        expect(
          Request.fromRawDetails({
            url: 'https://foo.com',
          }),
        ).toMatchObject({
          isFirstParty: true,
          isThirdParty: false,
        });
      });

      it('falls-back to first-party if sourceUrl is invalid', () => {
        expect(
          Request.fromRawDetails({
            sourceUrl: 'null',
            url: 'https://foo.com',
          }),
        ).toMatchObject({
          isFirstParty: true,
          isThirdParty: false,
        });
      });

      it('falls-back to first-party if no url', () => {
        expect(
          Request.fromRawDetails({
            sourceUrl: 'null',
          }),
        ).toMatchObject({
          isFirstParty: true,
          isThirdParty: false,
        });
      });

      it('falls-back to first-party if url is invalid', () => {
        expect(
          Request.fromRawDetails({
            sourceUrl: 'null',
            url: 'null',
          }),
        ).toMatchObject({
          isFirstParty: true,
          isThirdParty: false,
        });
      });
    });
  });
});
