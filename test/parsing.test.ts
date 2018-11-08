import { parseCosmeticFilter } from '../src/parsing/cosmetic-filter';
import { parseList } from '../src/parsing/list';
import { parseNetworkFilter } from '../src/parsing/network-filter';
import { fastHash } from '../src/utils';

// TODO: collaps, popup, popunder, generichide, genericblock
function network(filter: string, expected: any) {
  const parsed = parseNetworkFilter(filter);
  if (parsed !== null) {
    const verbose = {
      // Attributes
      filter: parsed.getFilter(),
      hostname: parsed.getHostname(),
      optDomains: parsed.getOptDomains(),
      optNotDomains: parsed.getOptNotDomains(),
      redirect: parsed.getRedirect(),

      // Filter type
      isException: parsed.isException(),
      isHostnameAnchor: parsed.isHostnameAnchor(),
      isLeftAnchor: parsed.isLeftAnchor(),
      isPlain: parsed.isPlain(),
      isRedirect: parsed.isRedirect(),
      isRegex: parsed.isRegex(),
      isRightAnchor: parsed.isRightAnchor(),

      // Options
      firstParty: parsed.firstParty(),
      fromAny: parsed.fromAny(),
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
      hasOptDomains: parsed.hasOptDomains(),
      hasOptNotDomains: parsed.hasOptNotDomains(),
      isImportant: parsed.isImportant(),
      matchCase: parsed.matchCase(),
      thirdParty: parsed.thirdParty(),
    };
    expect(verbose).toMatchObject(expected);
  } else {
    expect(parsed).toEqual(expected);
  }
}

const DEFAULT_NETWORK_FILTER = {
  // Attributes
  filter: '',
  hostname: '',
  optDomains: new Set(),
  optNotDomains: new Set(),
  redirect: '',

  // Filter type
  isException: false,
  isHostnameAnchor: false,
  isLeftAnchor: false,
  isPlain: false,
  isRedirect: false,
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
  matchCase: false,
  thirdParty: true,
};

describe('Network filters', () => {
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
      filter: 'bar^',
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
      filter: 'bar^',
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

      it('defaults to false', () => {
        network('||foo.com', { isImportant: false });
      });
    });

    describe('domain', () => {
      it('parses domain', () => {
        network('||foo.com$domain=bar.com', {
          hasOptDomains: true,
          optDomains: new Set([fastHash('bar.com')]),

          hasOptNotDomains: false,
          optNotDomains: new Set(),
        });

        network('||foo.com$domain=bar.com|baz.com', {
          hasOptDomains: true,
          optDomains: new Set([fastHash('bar.com'), fastHash('baz.com')]),

          hasOptNotDomains: false,
          optNotDomains: new Set(),
        });
      });

      it('parses ~domain', () => {
        network('||foo.com$domain=~bar.com', {
          hasOptDomains: false,
          optDomains: new Set(),

          hasOptNotDomains: true,
          optNotDomains: new Set([fastHash('bar.com')]),
        });

        network('||foo.com$domain=~bar.com|~baz.com', {
          hasOptDomains: false,
          optDomains: new Set(),

          hasOptNotDomains: true,
          optNotDomains: new Set([fastHash('bar.com'), fastHash('baz.com')]),
        });
      });

      it('parses domain and ~domain', () => {
        network('||foo.com$domain=~bar.com|baz.com', {
          hasOptDomains: true,
          optDomains: new Set([fastHash('baz.com')]),

          hasOptNotDomains: true,
          optNotDomains: new Set([fastHash('bar.com')]),
        });

        network('||foo.com$domain=bar.com|~baz.com', {
          hasOptDomains: true,
          optDomains: new Set([fastHash('bar.com')]),

          hasOptNotDomains: true,
          optNotDomains: new Set([fastHash('baz.com')]),
        });

        network('||foo.com$domain=foo|~bar|baz', {
          hasOptDomains: true,
          optDomains: new Set([fastHash('foo'), fastHash('baz')]),

          hasOptNotDomains: true,
          optNotDomains: new Set([fastHash('bar')]),
        });
      });

      it('defaults to no constraint', () => {
        network('||foo.com', {
          hasOptDomains: false,
          optDomains: new Set(),

          hasOptNotDomains: false,
          optNotDomains: new Set(),
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
      });

      it('defaults to false', () => {
        network('||foo.com', {
          isRedirect: false,
          redirect: '',
        });
      });
    });

    describe('match-case', () => {
      it('parses match-case', () => {
        network('||foo.com$match-case', {
          matchCase: true,
        });
        network('||foo.com$image,match-case', {
          matchCase: true,
        });
        network('||foo.com$media,match-case,image', {
          matchCase: true,
        });
      });

      it('parses ~match-case', () => {
        // ~match-case is not supported
        network('||foo.com$~match-case', null);
      });

      it('defaults to false', () => {
        network('||foo.com', {
          matchCase: false,
        });
      });
    });

    describe('first-party', () => {
      it('parses first-party', () => {
        network('||foo.com$first-party', { firstParty: true });
        network('@@||foo.com$first-party', { firstParty: true });
        network('@@||foo.com|$first-party', { firstParty: true });
      });

      it('parses ~first-party', () => {
        network('||foo.com$~first-party', { firstParty: false });
        network('||foo.com$first-party,~first-party', { firstParty: false });
      });

      it('defaults to true', () => {
        network('||foo.com', { firstParty: true });
      });
    });

    describe('third-party', () => {
      it('parses third-party', () => {
        network('||foo.com$third-party', { thirdParty: true });
        network('@@||foo.com$third-party', { thirdParty: true });
        network('@@||foo.com|$third-party', { thirdParty: true });
        network('||foo.com$~first-party', { thirdParty: true });
      });

      it('parses ~third-party', () => {
        network('||foo.com$~third-party', { thirdParty: false });
        network('||foo.com$first-party,~third-party', { thirdParty: false });
      });

      it('defaults to true', () => {
        network('||foo.com', { thirdParty: true });
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
      ['script', 'fromScript'],
      ['stylesheet', 'fromStylesheet'],
      ['subdocument', 'fromSubdocument'],
      ['websocket', 'fromWebsocket'],
      ['xmlhttprequest', 'fromXmlHttpRequest'],
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
});

function cosmetic(filter: string, expected: any) {
  const parsed = parseCosmeticFilter(filter);
  if (parsed !== null) {
    const verbose = {
      // Attributes
      hostnames: parsed.getHostnames(),
      selector: parsed.getSelector(),

      // Options
      isScriptBlock: parsed.isScriptBlock(),
      isScriptInject: parsed.isScriptInject(),
      isUnhide: parsed.isUnhide(),
    };
    expect(verbose).toMatchObject(expected);
  } else {
    expect(parsed).toEqual(expected);
  }
}

const DEFAULT_COSMETIC_FILTER = {
  // Attributes
  hostnames: [],
  selector: '',

  // Options
  isScriptBlock: false,
  isScriptInject: false,
  isUnhide: false,
};

describe('Cosmetic filters', () => {
  describe('parses selector', () => {
    cosmetic('##iframe[src]', {
      ...DEFAULT_COSMETIC_FILTER,
      selector: 'iframe[src]',
    });
  });

  it('parses hostnames', () => {
    cosmetic('foo.com##.selector', {
      ...DEFAULT_COSMETIC_FILTER,
      hostnames: ['foo.com'],
      selector: '.selector',
    });
    cosmetic('foo.com,bar.io##.selector', {
      ...DEFAULT_COSMETIC_FILTER,
      hostnames: ['foo.com', 'bar.io'],
      selector: '.selector',
    });
    cosmetic('foo.com,bar.io,baz.*##.selector', {
      ...DEFAULT_COSMETIC_FILTER,
      hostnames: ['foo.com', 'bar.io', 'baz.*'],
      selector: '.selector',
    });
  });

  it('parses unhide', () => {
    cosmetic('#@#script:contains(foo)', null); // We need hostnames
    cosmetic('foo.com#@#script:contains(foo)', {
      ...DEFAULT_COSMETIC_FILTER,
      hostnames: ['foo.com'],
      isScriptBlock: true,
      isUnhide: true,
      selector: 'foo',
    });
    cosmetic('foo.com#@#.selector', {
      ...DEFAULT_COSMETIC_FILTER,
      hostnames: ['foo.com'],
      isUnhide: true,
      selector: '.selector',
    });
  });

  it('parses script block', () => {
    cosmetic('##script:contains(foo)', {
      ...DEFAULT_COSMETIC_FILTER,
      isScriptBlock: true,
      selector: 'foo',
    });
    cosmetic('##script:contains(/foo/)', {
      ...DEFAULT_COSMETIC_FILTER,
      isScriptBlock: true,
      selector: 'foo',
    });
  });

  describe('parses script inject', () => {
    cosmetic('##script:inject(script.js, argument)', {
      ...DEFAULT_COSMETIC_FILTER,
      isScriptInject: true,
      selector: 'script.js, argument',
    });
    cosmetic('##script:inject(script.js, arg1, arg2, arg3)', {
      ...DEFAULT_COSMETIC_FILTER,
      isScriptInject: true,
      selector: 'script.js, arg1, arg2, arg3',
    });
  });

  describe('tokenizes filter', () => {
    [
      // Plain selectors
      { selector: '.c', tokens: ['.c'] },
      { selector: '.c.d', tokens: ['.c.d'] },
      { selector: '.c .d', tokens: ['.c', '.d'] },

      // With styles included (brackets)
      { selector: '.c[foo]', tokens: ['.c'] },
      { selector: '[foo].c', tokens: ['.c'] },
      { selector: '[foo].c[foo]', tokens: ['.c'] },
      { selector: '[foo[bar]].c[foo]', tokens: ['.c'] },
      { selector: '[foo[bar]].c[foo].d', tokens: ['.c', '.d'] },
      { selector: '[foo[bar]].c[foo[baz]].d', tokens: ['.c', '.d'] },
      { selector: '.c[foo[bar]].d[foo[baz]].e', tokens: ['.c', '.d', '.e'] },

      // With combinators
      { selector: '.b > .c', tokens: ['.c'] },
      { selector: '.a ~ .b > .c', tokens: ['.c'] },
      { selector: '.a ~ .b ~ .c', tokens: ['.c'] },
      { selector: '.a + .b ~ .c', tokens: ['.c'] },
      { selector: '.a + .b + .c', tokens: ['.c'] },

      // With combinators + styles
      { selector: '.c[foo[bar]].d[foo[baz]].e > .c', tokens: ['.c'] },
      { selector: '.a > .c[foo[bar]].d[foo[baz]].e ~ .c', tokens: ['.c'] },
      { selector: '.a > .c[foo[bar]].d[foo[baz]].e ~ .c[foo]', tokens: ['.c'] },
      { selector: '.a > .c[foo[bar]].d[foo[baz]].e ~ .c[foo[bar]].d', tokens: ['.c', '.d'] },
    ].forEach((testCase) => {
      it(testCase.selector, () => {
        const parsed = parseCosmeticFilter(`##${testCase.selector}`);
        expect(parsed).not.toBeNull();
        if (parsed !== null) {
          expect(parsed.getTokensSelector()).toEqual(
            new Uint32Array(testCase.tokens.map(fastHash)),
          );
        }
      });
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
    ].forEach((content) => {
      const { cosmeticFilters, networkFilters } = parseList(content);

      expect(cosmeticFilters).toHaveLength(0);
      expect(networkFilters).toHaveLength(0);
    });
  });
});
