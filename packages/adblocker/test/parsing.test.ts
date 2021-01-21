/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import CosmeticFilter, { DEFAULT_HIDDING_STYLE } from '../src/filters/cosmetic';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';
import { hashStrings, tokenize } from '../src/utils';
import { HTMLSelector } from '../src/html-filtering';
import { NORMALIZED_TYPE_TOKEN, hashHostnameBackward } from '../src/request';

function h(hostnames: string[]): Uint32Array {
  return new Uint32Array(hostnames.map(hashHostnameBackward)).sort();
}

// TODO: collaps, popup, popunder, genericblock
function network(filter: string, expected: any) {
  const parsed = NetworkFilter.parse(filter);
  if (parsed !== null) {
    expect(parsed.isNetworkFilter()).to.be.true;
    expect(parsed.isCosmeticFilter()).to.be.false;
    const verbose = {
      // Attributes
      csp: parsed.csp,
      filter: parsed.getFilter(),
      hostname: parsed.getHostname(),
      denyallow: parsed.denyallow,
      domains: parsed.domains,
      redirect: parsed.getRedirect(),

      // Filter type
      isBadFilter: parsed.isBadFilter(),
      isCSP: parsed.isCSP(),
      isException: parsed.isException(),
      isFullRegex: parsed.isFullRegex(),
      isGenericHide: parsed.isGenericHide(),
      isSpecificHide: parsed.isSpecificHide(),
      isElemHide: parsed.isElemHide(),
      isHostnameAnchor: parsed.isHostnameAnchor(),
      isLeftAnchor: parsed.isLeftAnchor(),
      isPlain: parsed.isPlain(),
      isRedirect: parsed.isRedirect(),
      isRedirectRule: parsed.isRedirectRule(),
      isRegex: parsed.isRegex(),
      isRightAnchor: parsed.isRightAnchor(),

      // Options
      firstParty: parsed.firstParty(),
      fromAny: parsed.fromAny(),
      fromDocument: parsed.fromDocument(),
      fromFont: parsed.fromFont(),
      fromImage: parsed.fromImage(),
      fromMedia: parsed.fromMedia(),
      fromObject: parsed.fromObject(),
      fromOther: parsed.fromOther(),
      fromPing: parsed.fromPing(),
      fromScript: parsed.fromScript(),
      fromStylesheet: parsed.fromStylesheet(),
      fromSubdocument: parsed.fromSubdocument(),
      fromWebsocket: parsed.fromWebsocket(),
      fromXmlHttpRequest: parsed.fromXmlHttpRequest(),
      isImportant: parsed.isImportant(),
      thirdParty: parsed.thirdParty(),
    };
    expect(verbose).to.deep.include(expected);
  } else {
    expect(parsed).to.equal(expected);
  }
}

const DEFAULT_NETWORK_FILTER = {
  // Attributes
  csp: undefined,
  filter: '',
  hostname: '',
  redirect: '',

  // Filter type
  isBadFilter: false,
  isCSP: false,
  isException: false,
  isFullRegex: false,
  isGenericHide: false,
  isSpecificHide: false,
  isElemHide: false,
  isHostnameAnchor: false,
  isLeftAnchor: false,
  isPlain: false,
  isRedirect: false,
  isRedirectRule: false,
  isRegex: false,
  isRightAnchor: false,

  // Options
  firstParty: true,
  fromAny: true,
  fromImage: true,
  fromMedia: true,
  fromObject: true,
  fromOther: true,
  fromPing: true,
  fromScript: true,
  fromStylesheet: true,
  fromSubdocument: true,
  fromWebsocket: true,
  fromXmlHttpRequest: true,
  isImportant: false,
  thirdParty: true,
};

describe('Network filters', () => {
  describe('toString', () => {
    const checkToString = (line: string, expected: string, debug: boolean = false) => {
      const parsed = NetworkFilter.parse(line, debug);
      expect(parsed).not.to.be.null;
      if (parsed !== null) {
        expect(parsed.toString()).to.equal(expected);
      }
    };

    [
      // Negations
      'ads$~image',
      'ads$~media',
      'ads$~object',
      'ads$~other',
      'ads$~ping',
      'ads$~script',
      'ads$~font',
      'ads$~stylesheet',
      'ads$~xhr',

      // Options
      'ads$image',
      'ads$media',
      'ads$object',
      'ads$other',
      'ads$ping',
      'ads$script',
      'ads$font',
      'ads$3p',
      'ads$1p',
      'ads$stylesheet',
      'ads$xhr',

      'ads$important',
      'ads$redirect=noop',
      'ads$redirect-rule=noop',
    ].forEach((line) => {
      it(`pprint ${line}`, () => {
        checkToString(line, line);
      });
    });

    it('pprint anchored hostnames', () => {
      checkToString('@@||foo.com', '@@||foo.com^');
      checkToString('@@||foo.com|', '@@||foo.com^|');
      checkToString('|foo.com|', '|foo.com|');
      checkToString('foo.com|', 'foo.com|');
    });

    it('pprint domain', () => {
      checkToString('ads$domain=foo.com|bar.co.uk|~baz.io', 'ads$domain=<hashed>');
    });

    it('pprint with debug=true', () => {
      checkToString(
        'ads$domain=foo.com|bar.co.uk|~baz.io',
        'ads$domain=foo.com|bar.co.uk|~baz.io',
        true,
      );
    });
  });

  it('parses pattern', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isPlain: true,
    };

    network('ads', {
      ...base,
      filter: 'ads',
    });
    network('/ads/foo-', {
      ...base,
      filter: '/ads/foo-',
    });
    network('/ads/foo-$important', {
      ...base,
      filter: '/ads/foo-',
      isImportant: true,
    });
    network('foo.com/ads$important', {
      ...base,
      filter: 'foo.com/ads',
      isImportant: true,
    });
  });

  it('parses ||pattern', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isHostnameAnchor: true,
      isPlain: true,
    };

    network('||foo.com', {
      ...base,
      filter: '',
      hostname: 'foo.com',
    });
    network('||foo.com$important', {
      ...base,
      filter: '',
      hostname: 'foo.com',
      isImportant: true,
    });
    network('||foo.com/bar/baz$important', {
      ...base,
      filter: '/bar/baz',
      hostname: 'foo.com',
      isImportant: true,
      isLeftAnchor: true,
    });
  });

  it('parses ||pattern|', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isHostnameAnchor: true,
      isRightAnchor: true,
    };

    network('||foo.com|', {
      ...base,
      filter: '',
      hostname: 'foo.com',
      isPlain: true,
    });
    network('||foo.com|$important', {
      ...base,
      filter: '',
      hostname: 'foo.com',
      isImportant: true,
      isPlain: true,
    });
    network('||foo.com/bar/baz|$important', {
      ...base,
      filter: '/bar/baz',
      hostname: 'foo.com',
      isImportant: true,
      isLeftAnchor: true,
      isPlain: true,
    });
    network('||foo.com^bar/*baz|$important', {
      ...base,
      filter: '^bar/*baz',
      hostname: 'foo.com',
      isImportant: true,
      isLeftAnchor: true,
      isRegex: true,
    });
  });

  it('parses |pattern', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isLeftAnchor: true,
    };

    network('|foo.com', {
      ...base,
      filter: 'foo.com',
      hostname: '',
      isPlain: true,
    });
    network('|foo.com/bar/baz', {
      ...base,
      filter: 'foo.com/bar/baz',
      hostname: '',
      isPlain: true,
    });
    network('|foo.com^bar/*baz*', {
      ...base,
      filter: 'foo.com^bar/*baz', // Trailing * is stripped
      hostname: '',
      isRegex: true,
    });
  });

  it('parses |pattern|', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isLeftAnchor: true,
      isRightAnchor: true,
    };

    network('|foo.com|', {
      ...base,
      filter: 'foo.com',
      hostname: '',
      isPlain: true,
    });
    network('|foo.com/bar|', {
      ...base,
      filter: 'foo.com/bar',
      hostname: '',
      isPlain: true,
    });
    network('|foo.com/*bar^|', {
      ...base,
      filter: 'foo.com/*bar^',
      hostname: '',
      isRegex: true,
    });
  });

  it('parses regexp', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isRegex: true,
    };

    network('*bar^', {
      ...base,
      filter: 'bar^',
      hostname: '',
    });
    network('foo.com/*bar^', {
      ...base,
      filter: 'foo.com/*bar^',
      hostname: '',
    });
  });

  it('parses ||regexp', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isHostnameAnchor: true,
      isRegex: true,
    };

    network('||foo.com*bar^', {
      ...base,
      filter: '*bar^',
      hostname: 'foo.com',
    });
    network('||foo.com^bar*/baz^', {
      ...base,
      filter: '^bar*/baz^',
      hostname: 'foo.com',
      isLeftAnchor: true,
    });
  });

  it('parses ||regexp|', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isHostnameAnchor: true,
      isRegex: true,
      isRightAnchor: true,
    };

    network('||foo.com*bar^|', {
      ...base,
      filter: '*bar^',
      hostname: 'foo.com',
    });
    network('||foo.com^bar*/baz^|', {
      ...base,
      filter: '^bar*/baz^',
      hostname: 'foo.com',
      isLeftAnchor: true,
    });
  });

  it('parses |regexp', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isLeftAnchor: true,
      isRegex: true,
    };

    network('|foo.com*bar^', {
      ...base,
      filter: 'foo.com*bar^',
      hostname: '',
    });
    network('|foo.com^bar*/baz^', {
      ...base,
      filter: 'foo.com^bar*/baz^',
      hostname: '',
    });
  });

  it('parses |regexp|', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isLeftAnchor: true,
      isRegex: true,
      isRightAnchor: true,
    };

    network('|foo.com*bar^|', {
      ...base,
      filter: 'foo.com*bar^',
      hostname: '',
    });
    network('|foo.com^bar*/baz^|', {
      ...base,
      filter: 'foo.com^bar*/baz^',
      hostname: '',
    });
  });

  it('parses exceptions', () => {
    const base = {
      ...DEFAULT_NETWORK_FILTER,
      isException: true,
    };

    network('@@ads', {
      ...base,
      filter: 'ads',
      isPlain: true,
    });
    network('@@||foo.com/ads', {
      ...base,
      filter: '/ads',
      hostname: 'foo.com',
      isHostnameAnchor: true,
      isLeftAnchor: true,
      isPlain: true,
    });
    network('@@|foo.com/ads', {
      ...base,
      filter: 'foo.com/ads',
      isLeftAnchor: true,
      isPlain: true,
    });
    network('@@|foo.com/ads|', {
      ...base,
      filter: 'foo.com/ads',
      isLeftAnchor: true,
      isPlain: true,
      isRightAnchor: true,
    });
    network('@@foo.com/ads|', {
      ...base,
      filter: 'foo.com/ads',
      isPlain: true,
      isRightAnchor: true,
    });
    network('@@||foo.com/ads|', {
      ...base,
      filter: '/ads',
      hostname: 'foo.com',
      isHostnameAnchor: true,
      isLeftAnchor: true,
      isPlain: true,
      isRightAnchor: true,
    });
  });

  describe('regexp patterns', () => {
    for (const filter of [
      '/pattern/',
      '@@/pattern/',
      '//',
      '//$script',
      '//$image',
      '//[0-9].*-.*-[a-z0-9]{4}/$script',
      '/.space/[0-9]{2,9}/$/$script',
    ]) {
      it(filter, () => {
        network(filter, {
          isFullRegex: true,
        });
      });
    }

    for (const filter of [
      '||foo.com/pattern/',
      '||foo.com/pattern/$script',
      '@@||foo.com/pattern/$script',
      '@@|foo.com/pattern/$script',
      '|foo.com/pattern/$script',
    ]) {
      it(filter, () => {
        network(filter, {
          isFullRegex: false,
        });
      });
    }
  });

  describe('options', () => {
    it('accepts any content type', () => {
      network('||foo.com', { fromAny: true });
      network('||foo.com$first-party', { fromAny: true });
      network('||foo.com$third-party', { fromAny: true });
      network('||foo.com$domain=test.com', { fromAny: true });
      network('||foo.com$domain=test.com,match-case', { fromAny: true });
    });

    [
      'image',
      'media',
      'object',
      'object-subrequest',
      'other',
      'ping',
      'script',
      'font',
      'stylesheet',
      'xmlhttprequest',
    ].forEach((option) => {
      it(`does not accept any content type: ~${option}`, () => {
        network(`||foo.com$~${option}`, { fromAny: false });
        network(`||foo.com$${option}`, { fromAny: false });
      });
    });

    describe('important', () => {
      it('parses important', () => {
        network('||foo.com$important', { isImportant: true });
      });

      it('parses ~important', () => {
        // Not supported
        network('||foo.com$~important', null);
      });

      it('defaults to false', () => {
        network('||foo.com', { isImportant: false });
      });
    });

    it('inline-font', () => {
      network('||foo.com$inline-font', {
        csp: "font-src 'self' 'unsafe-eval' http: https: data: blob: mediastream: filesystem:",
        isCSP: true,
      });
    });

    it('inline-script', () => {
      network('||foo.com$inline-script', {
        csp: "script-src 'self' 'unsafe-eval' http: https: data: blob: mediastream: filesystem:",
        isCSP: true,
      });
    });

    describe('csp', () => {
      it('defaults to no csp', () => {
        network('||foo.com', {
          csp: undefined,
          isCSP: false,
        });
      });

      it('parses simple csp', () => {
        network('||foo.com$csp=self bar ""', {
          csp: 'self bar ""',
          isCSP: true,
        });
      });

      it('parses empty csp', () => {
        network('||foo.com$csp', {
          csp: undefined,
          isCSP: true,
        });
      });

      it('parses csp mixed with other options', () => {
        network('||foo.com$domain=foo|bar,csp=self bar "",image', {
          csp: 'self bar ""',
          fromImage: true,
          isCSP: true,
        });
      });
    });

    describe('domain', () => {
      it('parses domain', () => {
        network('||foo.com$domain=bar.com', {
          domains: {
            hostnames: h(['bar.com']),
            entities: undefined,
            notHostnames: undefined,
            notEntities: undefined,
          },
        });

        network('||foo.com$domain=bar.com|baz.com', {
          domains: {
            hostnames: h(['bar.com', 'baz.com']),
            entities: undefined,
            notHostnames: undefined,
            notEntities: undefined,
          },
        });
      });

      it('parses ~domain', () => {
        network('||foo.com$domain=~bar.com', {
          domains: {
            notHostnames: h(['bar.com']),
            entities: undefined,
            hostnames: undefined,
            notEntities: undefined,
          },
        });

        network('||foo.com$domain=~bar.com|~baz.com', {
          domains: {
            notHostnames: h(['bar.com', 'baz.com']),
            entities: undefined,
            hostnames: undefined,
            notEntities: undefined,
          },
        });
      });

      it('parses domain and ~domain', () => {
        network('||foo.com$domain=~bar.com|baz.com', {
          domains: {
            hostnames: h(['baz.com']),
            notHostnames: h(['bar.com']),
            entities: undefined,
            notEntities: undefined,
          },
        });

        network('||foo.com$domain=bar.com|~baz.com', {
          domains: {
            hostnames: h(['bar.com']),
            notHostnames: h(['baz.com']),
            entities: undefined,
            notEntities: undefined,
          },
        });

        network('||foo.com$domain=foo|~bar|baz', {
          domains: {
            hostnames: h(['foo', 'baz']),
            notHostnames: h(['bar']),
            entities: undefined,
            notEntities: undefined,
          },
        });
      });

      it('accepts entities', () => {
        network('||foo.com$domain=foo.*|~bar.*|baz', {
          domains: {
            hostnames: h(['baz']),
            notHostnames: undefined,
            entities: h(['foo']),
            notEntities: h(['bar']),
          },
        });
      });

      it('defaults to no constraint', () => {
        network('||foo.com', {
          domains: undefined,
        });
      });
    });

    describe('denyallow', () => {
      it('parses denyallow', () => {
        network('||foo.com$denyallow=bar.com', {
          denyallow: {
            hostnames: h(['bar.com']),
            entities: undefined,
            notHostnames: undefined,
            notEntities: undefined,
          },
        });

        network('||foo.com$denyallow=bar.com|baz.com', {
          denyallow: {
            hostnames: h(['bar.com', 'baz.com']),
            entities: undefined,
            notHostnames: undefined,
            notEntities: undefined,
          },
        });
      });

      it('parses ~denyallow', () => {
        network('||foo.com$denyallow=~bar.com', {
          denyallow: {
            notHostnames: h(['bar.com']),
            entities: undefined,
            hostnames: undefined,
            notEntities: undefined,
          },
        });

        network('||foo.com$denyallow=~bar.com|~baz.com', {
          denyallow: {
            notHostnames: h(['bar.com', 'baz.com']),
            entities: undefined,
            hostnames: undefined,
            notEntities: undefined,
          },
        });
      });

      it('parses denyallow and ~denyallow', () => {
        network('||foo.com$denyallow=~bar.com|baz.com', {
          denyallow: {
            hostnames: h(['baz.com']),
            notHostnames: h(['bar.com']),
            entities: undefined,
            notEntities: undefined,
          },
        });

        network('||foo.com$denyallow=bar.com|~baz.com', {
          denyallow: {
            hostnames: h(['bar.com']),
            notHostnames: h(['baz.com']),
            entities: undefined,
            notEntities: undefined,
          },
        });

        network('||foo.com$denyallow=foo|~bar|baz', {
          denyallow: {
            hostnames: h(['foo', 'baz']),
            notHostnames: h(['bar']),
            entities: undefined,
            notEntities: undefined,
          },
        });
      });

      it('accepts entities', () => {
        network('||foo.com$denyallow=foo.*|~bar.*|baz', {
          denyallow: {
            hostnames: h(['baz']),
            notHostnames: undefined,
            entities: h(['foo']),
            notEntities: h(['bar']),
          },
        });
      });

      it('defaults to no constraint', () => {
        network('||foo.com', {
          denyallow: undefined,
        });
      });
    });

    describe('redirect', () => {
      it('parses redirect', () => {
        network('||foo.com$redirect=bar.js', {
          isRedirect: true,
          redirect: 'bar.js',
        });
        network('$redirect=bar.js', {
          isRedirect: true,
          redirect: 'bar.js',
        });
      });

      it('parses ~redirect', () => {
        // ~redirect is not a valid option
        network('||foo.com$~redirect', null);
        network('||foo.com$~redirect=foo.js', null);
      });

      it('parses redirect without a value', () => {
        // Not valid
        network('||foo.com$redirect', null);
        network('||foo.com$redirect=', null);
      });

      it('defaults to false', () => {
        network('||foo.com', {
          isRedirect: false,
          redirect: '',
        });
      });
    });

    describe('redirect-rule', () => {
      it('parses redirect-rule', () => {
        network('||foo.com$redirect-rule=bar.js', {
          isRedirect: true,
          isRedirectRule: true,
          redirect: 'bar.js',
        });
        network('$redirect-rule=bar.js', {
          isRedirect: true,
          isRedirectRule: true,
          redirect: 'bar.js',
        });
      });

      it('parses ~redirect-rule', () => {
        // ~redirect-rule is not a valid option
        network('||foo.com$~redirect-rule=foo.js', null);
        network('||foo.com$~redirect-rule', null);
      });

      it('parses redirect-rule without a value', () => {
        // Not valid
        network('||foo.com$redirect-rule', null);
        network('||foo.com$redirect-rule=', null);
      });

      it('defaults to false', () => {
        network('||foo.com', {
          isRedirectRule: false,
          redirect: '',
        });
      });
    });

    describe('match-case', () => {
      it('parses match-case', () => {
        network('||foo.com$match-case', {});
        network('||foo.com$image,match-case', {});
        network('||foo.com$media,match-case,image', {});
      });

      it('parses ~match-case', () => {
        // ~match-case is not supported
        network('||foo.com$~match-case', null);
      });
    });

    describe('first-party', () => {
      for (const option of ['first-party', '1p', '~third-party', '~3p']) {
        for (const base of ['||foo.com', '@@||foo.com', '@@||foo.com/bar']) {
          const filter = `${base}$${option}`;
          it(filter, () => {
            network(filter, { thirdParty: false, firstParty: true });
          });
        }
      }

      it('defaults to true', () => {
        network('||foo.com', { thirdParty: true });
      });
    });

    describe('third-party', () => {
      for (const option of ['third-party', '3p', '~first-party', '~1p']) {
        for (const base of ['||foo.com', '@@||foo.com', '@@||foo.com/bar']) {
          const filter = `${base}$${option}`;
          it(filter, () => {
            network(filter, { thirdParty: true, firstParty: false });
          });
        }
      }

      it('defaults to true', () => {
        network('||foo.com', { thirdParty: true });
      });
    });

    it('all', () => {
      network('||foo.com^$all', {
        isHostnameAnchor: true,
        isPlain: true,

        firstParty: true,
        fromAny: true,
        fromImage: true,
        fromMedia: true,
        fromObject: true,
        fromOther: true,
        fromPing: true,
        fromScript: true,
        fromStylesheet: true,
        fromSubdocument: true,
        fromWebsocket: true,
        fromXmlHttpRequest: true,
        thirdParty: true,
      });
    });

    it('badfilter', () => {
      network('||foo.com^$badfilter', { isBadFilter: true });
      network('@@||foo.com^$badfilter', { isBadFilter: true, isException: true });
    });

    describe('generichide', () => {
      network('||foo.com^$ghide', { isGenericHide: true });
      network('@@||foo.com^$ghide', { isGenericHide: true, isException: true });
      network('||foo.com^$generichide', { isGenericHide: true });
      network('@@||foo.com^$generichide', { isGenericHide: true, isException: true });
    });

    describe('specifichide', () => {
      network('||foo.com^$shide', { isSpecificHide: true });
      network('@@||foo.com^$shide', { isSpecificHide: true, isException: true });
      network('||foo.com^$specifichide', { isSpecificHide: true });
      network('@@||foo.com^$specifichide', { isSpecificHide: true, isException: true });
    });

    describe('elemhide', () => {
      network('||foo.com^$ehide', { isElemHide: true });
      network('@@||foo.com^$ehide', { isElemHide: true, isException: true });

      network('||foo.com^$shide,ghide', { isElemHide: true });
      network('@@||foo.com^$shide,ghide', { isElemHide: true, isException: true });

      network('||foo.com^$elemhide', { isElemHide: true });
      network('@@||foo.com^$elemhide', { isElemHide: true, isException: true });

      network('||foo.com^$generichide,specifichide', { isElemHide: true });
      network('@@||foo.com^$generichide,specifichide', { isElemHide: true, isException: true });
    });

    describe('un-supported options', () => {
      ['genericblock', 'popunder', 'popup', 'woot'].forEach((unsupportedOption) => {
        it(unsupportedOption, () => {
          network(`||foo.com$${unsupportedOption}`, null);
        });
      });
    });

    const allOptions = (value: boolean) => ({
      fromFont: value,
      fromImage: value,
      fromMedia: value,
      fromObject: value,
      fromOther: value,
      fromPing: value,
      fromScript: value,
      fromStylesheet: value,
      fromSubdocument: value,
      fromWebsocket: value,
      fromXmlHttpRequest: value,
    });

    [
      ['font', 'fromFont'],
      ['image', 'fromImage'],
      ['media', 'fromMedia'],
      ['object', 'fromObject'],
      ['object-subrequest', 'fromObject'],
      ['other', 'fromOther'],
      ['ping', 'fromPing'],
      ['beacon', 'fromPing'],
      ['script', 'fromScript'],
      ['stylesheet', 'fromStylesheet'],
      ['css', 'fromStylesheet'],
      ['subdocument', 'fromSubdocument'],
      ['frame', 'fromSubdocument'],
      ['websocket', 'fromWebsocket'],
      ['xmlhttprequest', 'fromXmlHttpRequest'],
      ['xhr', 'fromXmlHttpRequest'],
      ['doc', 'fromDocument'],
      ['document', 'fromDocument'],
    ].forEach(([option, attribute]) => {
      // all other attributes should be false if `$attribute` or true if `$~attribute`
      describe(option, () => {
        it(`parses ${option}`, () => {
          network(`||foo.com$${option}`, {
            ...allOptions(false),
            [attribute]: true,
          });
          network(`||foo.com$object,${option}`, {
            ...allOptions(false),
            fromObject: true,
            [attribute]: true,
          });
          network(`||foo.com$domain=bar.com,${option}`, {
            ...allOptions(false),
            [attribute]: true,
          });
        });

        it(`parses ~${option}`, () => {
          network(`||foo.com$~${option}`, {
            ...allOptions(true),
            [attribute]: false,
          });
          network(`||foo.com$${option},~${option}`, {
            [attribute]: false,
          });
        });

        it('defaults to true', () => {
          network('||foo.com', {
            ...allOptions(true),
            [attribute]: true,
          });
        });
      });
    });
  });

  describe('#getTokens', () => {
    for (const [filter, regexTokens] of [
      // Wildcard
      ['||geo*.hltv.org^', [hashStrings(['hltv', 'org'])]],

      // RegExp with character class
      ['/^foo$/', [hashStrings(['foo'])]],
      ['/^fo\\so$/', [new Uint32Array(0)]],
      ['/^fo\\wo$/', [new Uint32Array(0)]],
      ['/^fo\\Bo$/', [new Uint32Array(0)]],
      ['/^foo-bar\\Bo$/', [hashStrings(['foo'])]],

      // All tokens are considered because none is special and surrounded by ^ and $
      ['/^foo-bar-baz$/', [hashStrings(['foo', 'bar', 'baz'])]],
      // All tokens except last one
      ['/^foo-bar-baz+/', [hashStrings(['foo', 'bar'])]],
      ['/^foo-bar-baz/', [hashStrings(['foo', 'bar'])]],
      // All tokens except first one
      ['/foo-bar-baz$/', [hashStrings(['bar', 'baz'])]],
      ['/.foo-bar-baz$/', [hashStrings(['bar', 'baz'])]],

      // Real filters
      ['/:\\/\\/[A-Za-z0-9]+.ru\\/[A-Za-z0-9]{20,25}\\.js$/$doc', [hashStrings(['js'])]],
      [
        '/:\\/\\/[A-Za-z0-9]+.ru\\/[A-Za-z0-9]{20,25}\\.js/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/:\\/\\/[A-Za-z0-9]+.ru\\/[A-Za-z0-9]{20,25}.js/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/^https?:\\/\\/m\\.anysex\\.com\\/[a-zA-Z]{1,4}\\/[a-zA-Z]+\\.php$/$image,script',
        [hashStrings(['php'])],
      ],
      [
        '/^https:\\/\\/m\\.anysex\\.com\\/[a-zA-Z]{1,4}\\/[a-zA-Z]+\\.php$/$image,script',
        [hashStrings(['https', 'anysex', 'com', 'php'])],
      ],

      [
        '/wasabisyrup.com\\/storage\\/[-_a-zA-Z0-9]{8,}.gif/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/wasabisyrup\\.com\\/storage\\/[-_a-zA-Z0-9]{8,}.gif/$doc',
        [hashStrings(['com', 'storage'])],
      ],
      [
        '/^wasabisyrup\\.com\\/storage\\/[-_a-zA-Z0-9]{8,}.gif/$doc',
        [hashStrings(['wasabisyrup', 'com', 'storage'])],
      ],
      [
        '/.*(\\/proxy|\\.wasm|\\.wsm|\\.wa)$/$websocket,xmlhttprequest,badfilter',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.websocket]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr]),
        ],
      ],
      [
        '/^https?:\\/\\/([0-9a-z-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$first-party,script',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.script])],
      ],
      [
        '/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$first-party,xmlhttprequest,badfilter',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr])],
      ],
      ['/https?:\\/\\/.*[=|&|%|#|+].*/$badfilter', [new Uint32Array(0)]],
      [
        '/^http*.:\\/\\/.*[a-zA-Z0-9]{10,}.*/$xmlhttprequest,badfilter',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr])],
      ],
      [
        '@@/https?:\\/\\/.*[=|&|%|#|+].*/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$first-party,image,badfilter',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.image])],
      ],
      [
        '/^https?:\\/\\/.*\\/.*[(php|?|=)].*/$first-party,image,badfilter',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.image])],
      ],
      [
        '/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$first-party,image,badfilter',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.image])],
      ],
      [
        '/^(https?|wss?):\\/\\/([0-9a-z\\-]+\\.)?([0-9a-z-]+\\.)(accountant|bid|cf|club|cricket|date|download|faith|fun|ga|gdn|gq|loan|men|ml|network|ovh|party|pro|pw|racing|review|rocks|ru|science|site|space|stream|tk|top|trade|webcam|win|xyz|zone)\\.\\/(.*)/$image,script,subdocument,websocket,xmlhttprequest',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.image]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.script]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.sub_frame]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.websocket]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr]),
        ],
      ],
      [
        '/^(https?|wss?):\\/\\/([0-9a-z-]+\\.)?([0-9a-z-]+\\.)(accountant|bid|cf|club|cricket|date|download|faith|fun|ga|gdn|gq|loan|men|ml|network|ovh|party|pro|pw|racing|review|rocks|science|site|space|stream|tk|top|trade|webcam|win|xyz|zone)\\/(.*)/$third-party,websocket',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.websocket])],
      ],
      [
        '/([0-9]{1,3}\\.){3}[0-9]{1,3}.*(\\/proxy|\\.wasm|\\.wsm|\\.wa)$/$third-party,websocket',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.websocket])],
      ],
      [
        '/.*(\\/proxy|\\.wasm|\\.wsm|\\.wa)$/$websocket,xmlhttprequest',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.websocket]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr]),
        ],
      ],
      [
        '/^https://www\\.narcity\\.com/assets/[0-9a-f]{24,}\\.js/$script',
        [hashStrings(['https', 'www', 'narcity', 'com', 'assets'])],
      ],
      [
        '/^https://www\\.mtlblog\\.com/assets/[0-9a-f]{24,}\\.js/$script',
        [hashStrings(['https', 'www', 'mtlblog', 'com', 'assets'])],
      ],
      [
        '/\\:\\/\\/data.*\\.com\\/[a-zA-Z0-9]{30,}/$third-party,xmlhttprequest',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr])],
      ],
      [
        '/\\.(accountant|bid|click|club|com|cricket|date|download|faith|link|loan|lol|men|online|party|racing|review|science|site|space|stream|top|trade|webcam|website|win|xyz|com)\\/(([0-9]{2,9})(\\.|\\/)(css|\\?)?)$/$script,stylesheet,third-party,xmlhttprequest',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.script]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.stylesheet]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr]),
        ],
      ],
      [
        '/\\.accountant\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['accountant'])],
      ],
      [
        '/\\.bid\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['bid'])],
      ],
      [
        '/\\.click\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['click'])],
      ],
      [
        '/\\.club\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['club'])],
      ],
      [
        '/\\.com\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['com'])],
      ],
      [
        '/\\.cricket\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['cricket'])],
      ],
      [
        '/\\.date\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['date'])],
      ],
      [
        '/\\.download\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['download'])],
      ],
      [
        '/\\.faith\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['faith'])],
      ],
      [
        '/\\.link\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['link'])],
      ],
      [
        '/\\.loan\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['loan'])],
      ],
      [
        '/\\.lol\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['lol'])],
      ],
      [
        '/\\.men\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['men'])],
      ],
      [
        '/\\.online\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['online'])],
      ],
      [
        '/\\.party\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['party'])],
      ],
      [
        '/\\.racing\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['racing'])],
      ],
      [
        '/\\.review\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['review'])],
      ],
      [
        '/\\.science\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['science'])],
      ],
      [
        '/\\.site\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['site'])],
      ],
      [
        '/\\.space\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['space'])],
      ],
      [
        '/\\.stream\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['stream'])],
      ],
      [
        '/\\.top\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['top'])],
      ],
      [
        '/\\.trade\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['trade'])],
      ],
      [
        '/\\.webcam\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['webcam'])],
      ],
      [
        '/\\.website\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['website'])],
      ],
      [
        '/\\.win\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['win'])],
      ],
      [
        '/\\.xyz\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [hashStrings(['xyz'])],
      ],
      [
        '/\\:\\/\\/[a-z0-9]{5,40}\\.com\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.script]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.stylesheet]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr]),
        ],
      ],
      [
        '/\\:\\/\\/[a-z0-9]{5,}\\.com\\/[A-Za-z0-9]{3,}\\/$/$script,third-party,xmlhttprequest',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.script]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr]),
        ],
      ],
      [
        '/^https?:\\/\\/.*(bitly|bit)\\.(com|ly)\\/.*/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/^https?:\\/\\/.*\\/.*sw[0-9a-z(.|_)].*/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/^((?!(^https?):\\/\\/(ajax\\.googleapis\\.com|cdnjs\\.cloudflare\\.com|fonts\\.googleapis\\.com)\\/).*)$/$script,third-party',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.script])],
      ],
      [
        '/^https?:\\/\\/([0-9a-z-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,~third-party,xmlhttprequest',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.image]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.other]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.script]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr]),
        ],
      ],
      [
        '/^https?:\\/\\/[\\w.-]*gelbooru\\.com.*[a-zA-Z0-9?!=@%#]{40,}/$image,other',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.image]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.other]),
        ],
      ],
      ['/\\.filenuke\\.com/.*[a-zA-Z0-9]{4}/$script', [hashStrings(['filenuke', 'com'])]],
      ['/\\.sharesix\\.com/.*[a-zA-Z0-9]{4}/$script', [hashStrings(['sharesix', 'com'])]],
      [
        '/^https?:\\/\\/([0-9]{1,3}\\.){3}[0-9]{1,3}/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/http*.:\\/\\/.*[a-zA-Z0-9]{110,}.*/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      ['/https?:\\/\\/.*[&|%|#|+|=].*/$doc', [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])]],
      [
        '/^https?:\\/\\/([0-9]{1,3}\\.){3}[0-9]{1,3}/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/\\/[0-9].*\\-.*\\-[a-z0-9]{4}/$script,xmlhttprequest',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.script]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.xhr]),
        ],
      ],
      [
        '/^https?:\\/\\/.*\\/.*[0-9a-z]{7,16}\\.js/$script',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.script])],
      ],
      [
        '/^http://[a-zA-Z0-9]+\\.[a-z]+\\/.*(?:[!"#$%&()*+,:;<=>?@/\\^_`{|}~-]).*[a-zA-Z0-9]+/$script,third-party',
        [hashStrings(['http'])],
      ],
      [
        '/http://[a-zA-Z0-9]+\\.[a-z]+\\/.*(?:[!"#$%&()*+,:;<=>?@/\\^_`{|}~-]).*[a-zA-Z0-9]+/$script,third-party',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.script])],
      ],
      [
        '/^https?:\\/\\/motherless\\.com\\/[a-z0-9A-Z]{3,}\\.[a-z0-9A-Z]{2,}\\_/$image,subdocument',
        [
          new Uint32Array([NORMALIZED_TYPE_TOKEN.image]),
          new Uint32Array([NORMALIZED_TYPE_TOKEN.sub_frame]),
        ],
      ],
      [
        '/^https?:\\/\\/.*\\/.*sw[0-9(.|_)].*/$script',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.script])],
      ],
      [
        '/http*.:\\/\\/.*[?|=|&|%|#|+].*/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      [
        '/\\:\\/\\/([0-9]{1,3}\\.){3}[0-9]{1,3}/$doc',
        [new Uint32Array([NORMALIZED_TYPE_TOKEN.document])],
      ],
      ['@@/wp-content/themes/$script', [hashStrings(['content'])]],
    ]) {
      it(`get tokens for ${filter}`, () => {
        const parsed = NetworkFilter.parse(filter as string, true);
        expect(parsed).not.to.be.null;
        if (parsed !== null) {
          expect(parsed.getTokens()).to.eql(regexTokens);
        }
      });
    }
  });
});

function cosmetic(filter: string, expected: any) {
  const parsed = CosmeticFilter.parse(filter);
  if (parsed !== null) {
    expect(parsed.isNetworkFilter()).to.be.false;
    expect(parsed.isCosmeticFilter()).to.be.true;
    const verbose = {
      // Attributes
      domains: parsed.domains,
      selector: parsed.getSelector(),
      style: parsed.getStyle(),

      // Options
      isClassSelector: parsed.isClassSelector(),
      isExtended: parsed.isExtended(),
      isHrefSelector: parsed.isHrefSelector(),
      isHtmlFiltering: parsed.isHtmlFiltering(),
      isIdSelector: parsed.isIdSelector(),
      isRemove: parsed.isRemove(),
      isScriptInject: parsed.isScriptInject(),
      isUnhide: parsed.isUnhide(),
    };
    expect(verbose).to.deep.include(expected);
  } else {
    expect(parsed).to.equal(expected);
  }
}

const DEFAULT_COSMETIC_FILTER = {
  // Attributes
  selector: '',
  style: DEFAULT_HIDDING_STYLE,

  // Options
  isClassSelector: false,
  isExtended: false,
  isHrefSelector: false,
  isHtmlFiltering: false,
  isIdSelector: false,
  isRemove: false,
  isScriptInject: false,
  isUnhide: false,
};

describe('Cosmetic filters', () => {
  describe('#toString', () => {
    const checkToString = (line: string, expected: string, debug: boolean = false) => {
      const parsed = CosmeticFilter.parse(line, debug);
      expect(parsed).not.to.be.null;
      if (parsed !== null) {
        expect(parsed.toString()).to.equal(expected);
      }
    };

    ['##.selector'].forEach((line) => {
      it(`pprint ${line}`, () => {
        checkToString(line, line);
      });
    });

    it('pprint with hostnames', () => {
      checkToString('foo.com##+js(foo.js)', '<hostnames>##+js(foo.js)');
      checkToString('foo.com##.selector', '<hostnames>##.selector');
      checkToString('~foo.com##.selector', '<hostnames>##.selector');
      checkToString('~foo.*##.selector', '<hostnames>##.selector');
      checkToString('foo.*##.selector', '<hostnames>##.selector');
    });

    it('pprint with debug=true', () => {
      checkToString('foo.com##.selector', 'foo.com##.selector', true);
    });
  });

  describe('#parse', () => {
    cosmetic('##iframe[src]', {
      ...DEFAULT_COSMETIC_FILTER,
      selector: 'iframe[src]',
    });

    for (const { attr, name, symbol } of [
      { attr: 'isClassSelector', name: 'class', symbol: '.' },
      { attr: 'isIdSelector', name: 'id', symbol: '#' },
    ]) {
      describe(`${name} selectors`, () => {
        for (const domains of ['', 'foo.com', 'foo.*', '~foo.com,foo.*']) {
          for (const unhide of [true, false]) {
            it('simple', () => {
              const selector = `${symbol}selector`;
              const filter = `${domains}${unhide ? '#@#' : '##'}${selector}`;
              cosmetic(filter, {
                ...DEFAULT_COSMETIC_FILTER,
                [attr]: true,
                isUnhide: unhide,
                selector,
              });
            });

            for (const invalidSeparator of ['~', ', ', '  ~ ', '+', '#', ']']) {
              const selector = `${symbol}sele${invalidSeparator}ctor`;
              const filter = `${domains}${unhide ? '#@#' : '##'}${selector}`;
              it(`rejects ${filter}`, () => {
                cosmetic(filter, {
                  ...DEFAULT_COSMETIC_FILTER,
                  [attr]: false,
                  isUnhide: unhide,
                  selector,
                });
              });
            }

            // Accepted compound selectors
            for (const compound of [
              '[]',
              ' > selector',
              ' ~ selector',
              ' + selector',
              ' .selector',
              ' #selector',
              '.selector',
            ]) {
              const selector = `${symbol}selector${compound}`;
              const filter = `${domains}${unhide ? '#@#' : '##'}${selector}`;
              it(`detects compound ${filter}`, () => {
                cosmetic(filter, {
                  ...DEFAULT_COSMETIC_FILTER,
                  [attr]: true,
                  isUnhide: unhide,
                  selector,
                });
              });
            }
          }
        }
      });
    }

    describe('simple href selectors', () => {
      for (const domains of ['', 'foo.com', 'foo.*', '~foo.com,foo.*']) {
        for (const unhide of [true, false]) {
          describe('rejects', () => {
            for (const prefix of ['.class', '#id', 'selector']) {
              for (const operator of ['~=', '|=', '$=']) {
                const selector = `${prefix}[href${operator}"https://foo.com"]`;
                const filter = `${domains}${unhide ? '#@#' : '##'}${selector}`;
                it(filter, () => {
                  cosmetic(filter, {
                    isHrefSelector: false,
                    isUnhide: unhide,
                    selector,
                  });
                });
              }
            }
          });

          for (const prefix of ['a', '']) {
            for (const operator of ['=', '*=', '^=']) {
              // Accepts only double quotes
              {
                const selector = `${prefix}[href${operator}"https://foo.com"]`;
                const filter = `${domains}${unhide ? '#@#' : '##'}${selector}`;
                it(`detects ${filter}`, () => {
                  cosmetic(filter, {
                    ...DEFAULT_COSMETIC_FILTER,
                    isHrefSelector: true,
                    isUnhide: unhide,
                    selector,
                  });
                });
              }

              // Rejects because of single quotes
              {
                const selector = `${prefix}[href${operator}'https://foo.com']`;
                const filter = `${domains}${unhide ? '#@#' : '##'}${selector}`;
                it(`rejects ${filter}`, () => {
                  cosmetic(filter, {
                    ...DEFAULT_COSMETIC_FILTER,
                    isHrefSelector: false,
                    isUnhide: unhide,
                    selector,
                  });
                });
              }
            }
          }
        }
      }
    });
  });

  it('parses hostnames', () => {
    cosmetic('foo.com##selector', {
      ...DEFAULT_COSMETIC_FILTER,
      domains: {
        hostnames: h(['foo.com']),
        entities: undefined,
        notHostnames: undefined,
        notEntities: undefined,
      },
      selector: 'selector',
    });
    cosmetic('foo.com,bar.io##selector', {
      ...DEFAULT_COSMETIC_FILTER,
      domains: {
        hostnames: h(['foo.com', 'bar.io']),
        entities: undefined,
        notHostnames: undefined,
        notEntities: undefined,
      },
      selector: 'selector',
    });
    cosmetic('foo.com,bar.io,baz.*##selector', {
      ...DEFAULT_COSMETIC_FILTER,
      domains: {
        entities: h(['baz']),
        hostnames: h(['foo.com', 'bar.io']),
        notHostnames: undefined,
        notEntities: undefined,
      },
      selector: 'selector',
    });

    cosmetic('~entity.*,foo.com,~bar.io,baz.*,~entity2.*##selector', {
      ...DEFAULT_COSMETIC_FILTER,
      domains: {
        entities: h(['baz']),
        hostnames: h(['foo.com']),
        notEntities: h(['entity', 'entity2']),
        notHostnames: h(['bar.io']),
      },
      selector: 'selector',
    });
  });

  it('parses unhide', () => {
    cosmetic('foo.com#@#selector', {
      ...DEFAULT_COSMETIC_FILTER,
      domains: {
        hostnames: h(['foo.com']),
        entities: undefined,
        notHostnames: undefined,
        notEntities: undefined,
      },
      isUnhide: true,
      selector: 'selector',
    });
  });

  describe('+js()', () => {
    it('parses script inject', () => {
      cosmetic('foo.com##+js(script.js, argument)', {
        ...DEFAULT_COSMETIC_FILTER,
        domains: {
          hostnames: h(['foo.com']),
          entities: undefined,
          notHostnames: undefined,
          notEntities: undefined,
        },
        isScriptInject: true,
        selector: 'script.js, argument',
      });
      cosmetic('foo.com##+js(script.js, arg1, arg2, arg3)', {
        ...DEFAULT_COSMETIC_FILTER,
        domains: {
          hostnames: h(['foo.com']),
          entities: undefined,
          notHostnames: undefined,
          notEntities: undefined,
        },
        isScriptInject: true,
        selector: 'script.js, arg1, arg2, arg3',
      });
    });

    it('rejects generic script inject', () => {
      cosmetic('##+js(script.js, argument)', null);
      cosmetic('~foo.com##+js(script.js, argument)', null);
      cosmetic('~foo.*##+js(script.js, argument)', null);
    });

    it('rejects empty non-exception', () => {
      cosmetic('##+js()', null);
      cosmetic('foo.com##+js()', null);
      cosmetic('~foo.com##+js()', null);
    });

    it('accept empty exception', () => {
      cosmetic('#@#+js()', {
        ...DEFAULT_COSMETIC_FILTER,
        isScriptInject: true,
        selector: '',
        isUnhide: true,
      });
    });
  });

  describe('parses remove filters', () => {
    it('simple', () => {
      cosmetic('example.com##.cls:remove()', {
        ...DEFAULT_COSMETIC_FILTER,
        selector: '.cls',
        isRemove: true,
        isExtended: true,
      });
    });

    it('extended', () => {
      cosmetic('example.com##.cls:has-text(/Foo/i):remove()', {
        ...DEFAULT_COSMETIC_FILTER,
        selector: '.cls:has-text(/Foo/i)',
        isRemove: true,
        isExtended: true,
      });
    });
  });

  describe('parses extended filters', () => {
    for (const pseudo of [
      '-abp-contains',
      '-abp-has',
      '-abp-properties',
      'if-not',
      'matches-css',
      'matches-css-after',
      'matches-css-before',
      'min-text-length',
      'nth-ancestor',
      'upward',
      'watch-attr',
      'watch-attrs',
      'xpath',
    ]) {
      it(`rejects unsupported: ${pseudo}`, () => {
        cosmetic(`example.com##.cls:${pseudo}()`, null);
      });
    }

    for (const pseudo of ['has', 'has-text', 'if']) {
      it(`parse supported: ${pseudo}`, () => {
        cosmetic(`example.com##.cls:${pseudo}()`, {
          ...DEFAULT_COSMETIC_FILTER,
          isExtended: true,
          selector: `.cls:${pseudo}()`,
          domains: {
            hostnames: h(['example.com']),
            entities: undefined,
            notHostnames: undefined,
            notEntities: undefined,
          },
        });
      });
    }
  });

  describe('parses html filtering', () => {
    it('^script:has-text()', () => {
      cosmetic('##^script:has-text(foo bar)', {
        ...DEFAULT_COSMETIC_FILTER,
        isHtmlFiltering: true,
        selector: '^script:has-text(foo bar)',
      });
    });

    it('with domains', () => {
      cosmetic('foo.com##^script:has-text(foo bar)', {
        ...DEFAULT_COSMETIC_FILTER,
        domains: {
          hostnames: h(['foo.com']),
          entities: undefined,
          notHostnames: undefined,
          notEntities: undefined,
        },
        isHtmlFiltering: true,
        selector: '^script:has-text(foo bar)',
      });
    });

    describe('get selector', () => {
      const test = (rule: string, expected: HTMLSelector | null): void => {
        it(`${rule}`, () => {
          const raw = `##^${rule}`;
          const parsed = CosmeticFilter.parse(raw);
          if (expected === null) {
            expect(parsed).to.be.null;
          } else {
            expect(parsed).not.to.be.null;
            if (parsed !== null) {
              expect(parsed.getExtendedSelector()).to.eql(expected);
            }
          }
        });
      };

      // Fake filters for tests
      test('script:has-text()', ['script', ['']]);
      test('script:has-text(a)', ['script', ['a']]);
      test('script:has-text(/a/)', ['script', ['/a/']]);
      test('script:has-text(/a/i)', ['script', ['/a/i']]);
      test('script:has-text(/a//i)', ['script', ['/a//i']]);
      test('script:has-text(/a/i/)', ['script', ['/a/i/']]);
      test('script:has-text(())', ['script', ['()']]);
      test('script:has-text(((a))', ['script', ['((a)']]);
      test('script:has-text((((()', ['script', ['((((']]);

      // Invalid filters
      test('script:has-text(foo):)', null);
      test('script:has-text(foo):has-text)', null);

      // Real filters
      test("script:has-text('+'\\x)", ['script', ["'+'\\x"]]);
      test('script:has-text(("0x)', ['script', ['("0x']]);
      test('script:has-text((window);)', ['script', ['(window);']]);
      test('script:has-text(,window\\);)', ['script', [',window\\);']]);
      test('script:has-text(/addLinkToCopy/i)', ['script', ['/addLinkToCopy/i']]);
      test('script:has-text(/i10C/i)', ['script', ['/i10C/i']]);
      test('script:has-text(/i10C/)', ['script', ['/i10C/']]);
      test('script:has-text(3f87b0eaddd)', ['script', ['3f87b0eaddd']]);
      test('script:has-text(ADBLOCK)', ['script', ['ADBLOCK']]);
      test('script:has-text(Inject=!)', ['script', ['Inject=!']]);
      test('script:has-text(String.fromCodePoint)', ['script', ['String.fromCodePoint']]);
      test('script:has-text(a.HTMLImageElement.prototype)', [
        'script',
        ['a.HTMLImageElement.prototype'],
      ]);
      test('script:has-text(this[atob)', ['script', ['this[atob']]);
      test('script:has-text(}(window);)', ['script', ['}(window);']]);
      test('script:has-text(/^[wW]{1700,3000}$/):has-text(/(\\xdw){250}/)', [
        'script',
        ['/^[wW]{1700,3000}$/', '/(\\xdw){250}/'],
      ]);

      // Compound
      test('script:has-text(===):has-text(/[wW]{14000}/)', ['script', ['===', '/[wW]{14000}/']]);
    });
  });

  it('parses :style', () => {
    cosmetic('##foo :style(display: none)', {
      ...DEFAULT_COSMETIC_FILTER,
      selector: 'foo ',
      style: 'display: none',
    });

    cosmetic('##foo > bar >baz:style(display: none)', {
      ...DEFAULT_COSMETIC_FILTER,
      selector: 'foo > bar >baz',
      style: 'display: none',
    });

    cosmetic('foo.com,bar.de##foo > bar >baz:style(display: none)', {
      ...DEFAULT_COSMETIC_FILTER,
      domains: {
        hostnames: h(['foo.com', 'bar.de']),
        entities: undefined,
        notHostnames: undefined,
        notEntities: undefined,
      },
      selector: 'foo > bar >baz',
      style: 'display: none',
    });

    cosmetic('foo.com,bar.de###foo > bar >baz:styleTYPO(display: none)', null);
  });

  // TODO
  // it('rejects invalid selectors', () => {
  //   const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
  //   Object.defineProperty(global, 'document', { value: dom.window.document, writable: true });
  //   expect(CosmeticFilter.parse('###.selector /invalid/')).to.be.null;
  // });

  it('#getScript', () => {
    const parsed = CosmeticFilter.parse('foo.com##+js(script.js, arg1, arg2, arg3)');
    expect(parsed).not.to.be.null;
    if (parsed !== null) {
      expect(parsed.getScript(new Map([['script.js', '{{1}},{{2}},{{3}}']]))).to.equal(
        'arg1,arg2,arg3',
      );

      expect(parsed.getScript(new Map())).to.be.undefined;
    }
  });

  describe('#getTokens', () => {
    function checkTokens(filter: string, tokens: Uint32Array[]): void {
      const parsed = CosmeticFilter.parse(filter);
      expect(parsed).not.to.be.null;
      if (parsed !== null) {
        expect(parsed.getTokens()).to.eql(tokens);
      }
    }

    // TODO - entities, ~entities, hostnames, ~hostnames

    it('empty tokens if none available', () => {
      checkTokens('#@#[foo]', [new Uint32Array(0)]);
    });

    it('no tokens from selector if unhide', () => {
      checkTokens('#@#.selector', [new Uint32Array(0)]);
      checkTokens('#@##class', [new Uint32Array(0)]);
      checkTokens('#@#.selector', [new Uint32Array(0)]);
    });

    describe('tokenize simple selector', () => {
      for (const kind of ['.', '#']) {
        for (const compound of [
          '',
          '[]',
          ' > selector',
          ' ~ selector',
          ' + selector',
          ' .selector',
          ' #selector',
          '.selector',
          ':not(foo)',
        ]) {
          const filter = `##${kind}selector1${compound}`;
          it(filter, () => {
            checkTokens(filter, [hashStrings(['selector1'])]);
          });
        }
      }
    });

    describe('tokenize href selector', () => {
      for (const prefix of ['a', '']) {
        it('tokenize href=', () => {
          checkTokens(`##${prefix}[href="https://foo.com"]`, [
            tokenize('https://foo.com', false, false),
          ]);
        });

        it('tokenize href*=', () => {
          checkTokens(`##${prefix}[href*="https://foo.com"]`, [
            tokenize('https://foo.com', true, true),
          ]);
        });

        it('tokenize href^=', () => {
          checkTokens(`##${prefix}[href^="https://foo.com"]`, [
            tokenize('https://foo.com', false, true),
          ]);
        });
      }
    });
  });
});

describe('Filters list', () => {
  it('ignores comments', () => {
    [
      '# ||foo.com',
      '# ',
      '#',
      '!',
      '!!',
      '! ',
      '! ||foo.com',
      '[Adblock] ||foo.com',
      '[Adblock Plus 2.0] ||foo.com',
    ].forEach((data) => {
      expect(parseFilters(data)).to.eql(parseFilters(''));
    });
  });

  describe('multi-line filters', () => {
    const lines = (content: string) =>
      parseFilters(content, { debug: true }).networkFilters.map((f) => f.toString());

    it('single filter on two lines', () => {
      expect(lines(['*$3p,script, \\', '    domain=x.com|y.com'].join('\n'))).to.eql([
        '*$3p,script,domain=x.com|y.com',
      ]);
    });

    it('single filter on many lines', () => {
      expect(
        lines(['*$ \\', '    3p, \\', '    script, \\', '    domain=x.com|y.com'].join('\n')),
      ).to.eql(['*$3p,script,domain=x.com|y.com']);
    });

    it('handle leading and trailing spaces', () => {
      expect(
        lines(
          [' \t*$ \\', '    3p, \\', '    script, \\', '    domain=x.com|y.com \t '].join('\n'),
        ),
      ).to.eql(['*$3p,script,domain=x.com|y.com']);
    });

    it('mixed with normal filters and comments', () => {
      expect(
        lines(
          [
            '||foo.com^',
            ' \t*$ \\',
            '    3p, \\',
            '    script, \\',
            '    domain=x.com|y.com \t ',
            '! comment',
            '||bar.com^',
            '|| \\',
            '    baz. \\',
            '    com^',
          ].join('\n'),
        ),
      ).to.eql(['||foo.com^', '*$3p,script,domain=x.com|y.com', '||bar.com^', '||baz.com^']);
    });
  });
});
