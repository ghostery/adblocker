/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-new */
/* eslint-disable no-control-regex */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-escape */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-shadow */

/** *************************************************************************** */

/** *************************************************************************** */

// eslint-disable-next-line import/no-extraneous-dependencies
const { getDomain } = require('tldts');
const punycode = require('punycode');

const logger = {
  writeOne() {},
};

/** *************************************************************************** */

const MRUCache = function (size) {
  this.size = size;
  this.array = [];
  this.map = new Map();
  this.resetTime = Date.now();
};

MRUCache.prototype = {
  add(key, value) {
    const found = this.map.has(key);
    this.map.set(key, value);
    if (!found) {
      if (this.array.length === this.size) {
        this.map.delete(this.array.pop());
      }
      this.array.unshift(key);
    }
  },
  remove(key) {
    if (this.map.has(key)) {
      this.array.splice(this.array.indexOf(key), 1);
    }
  },
  lookup(key) {
    const value = this.map.get(key);
    if (value !== undefined && this.array[0] !== key) {
      let i = this.array.indexOf(key);
      do {
        this.array[i] = this.array[i - 1];
      } while (--i);
      this.array[0] = key;
    }
    return value;
  },
  reset() {
    this.array = [];
    this.map.clear();
    this.resetTime = Date.now();
  },
};

/** *************************************************************************** */

const URI = (function () {
  /** *************************************************************************** */

  // Favorite regex tool: http://regex101.com/

  // Ref: <http://tools.ietf.org/html/rfc3986#page-50>
  // I removed redundant capture groups: capture less = peform faster. See
  // <http://jsperf.com/old-uritools-vs-new-uritools>
  // Performance improvements welcomed.
  // jsperf: <http://jsperf.com/old-uritools-vs-new-uritools>
  const reRFC3986 = /^([^:\/?#]+:)?(\/\/[^\/?#]*)?([^?#]*)(\?[^#]*)?(#.*)?/;

  // Derived
  const reSchemeFromURI = /^[^:\/?#]+:/;
  const reAuthorityFromURI = /^(?:[^:\/?#]+:)?(\/\/[^\/?#]+)/;
  const reOriginFromURI = /^(?:[^:\/?#]+:)\/\/[^\/?#]+/;
  const reCommonHostnameFromURL = /^https?:\/\/([0-9a-z_][0-9a-z._-]*[0-9a-z])\//;
  const rePathFromURI = /^(?:[^:\/?#]+:)?(?:\/\/[^\/?#]*)?([^?#]*)/;
  const reMustNormalizeHostname = /[^0-9a-z._-]/;

  // These are to parse authority field, not parsed by above official regex
  // IPv6 is seen as an exception: a non-compatible IPv6 is first tried, and
  // if it fails, the IPv6 compatible regex istr used. This helps
  // peformance by avoiding the use of a too complicated regex first.

  // https://github.com/gorhill/httpswitchboard/issues/211
  // "While a hostname may not contain other characters, such as the
  // "underscore character (_), other DNS names may contain the underscore"
  const reHostPortFromAuthority = /^(?:[^@]*@)?([^:]*)(:\d*)?$/;
  const reIPv6PortFromAuthority = /^(?:[^@]*@)?(\[[0-9a-f:]*\])(:\d*)?$/i;

  const reHostFromNakedAuthority = /^[0-9a-z._-]+[0-9a-z]$/i;
  const reHostFromAuthority = /^(?:[^@]*@)?([^:]+)(?::\d*)?$/;
  const reIPv6FromAuthority = /^(?:[^@]*@)?(\[[0-9a-f:]+\])(?::\d*)?$/i;

  // Coarse (but fast) tests
  const reValidHostname = /^([a-z\d]+(-*[a-z\d]+)*)(\.[a-z\d]+(-*[a-z\d])*)*$/;
  const reIPAddressNaive = /^\d+\.\d+\.\d+\.\d+$|^\[[\da-zA-Z:]+\]$/;

  /** *************************************************************************** */

  const reset = function (o) {
    o.scheme = '';
    o.hostname = '';
    o._ipv4 = undefined;
    o._ipv6 = undefined;
    o.port = '';
    o.path = '';
    o.query = '';
    o.fragment = '';
    return o;
  };

  const resetAuthority = function (o) {
    o.hostname = '';
    o._ipv4 = undefined;
    o._ipv6 = undefined;
    o.port = '';
    return o;
  };

  /** *************************************************************************** */

  // This will be exported

  const URI = {
    scheme: '',
    authority: '',
    hostname: '',
    _ipv4: undefined,
    _ipv6: undefined,
    port: '',
    domain: undefined,
    path: '',
    query: '',
    fragment: '',
    schemeBit: 1 << 0,
    userBit: 1 << 1,
    passwordBit: 1 << 2,
    hostnameBit: 1 << 3,
    portBit: 1 << 4,
    pathBit: 1 << 5,
    queryBit: 1 << 6,
    fragmentBit: 1 << 7,
    allBits: 0xffff,
  };

  URI.authorityBit = URI.userBit | URI.passwordBit | URI.hostnameBit | URI.portBit;
  URI.normalizeBits = URI.schemeBit | URI.hostnameBit | URI.pathBit | URI.queryBit;

  /** *************************************************************************** */

  // See: https://en.wikipedia.org/wiki/URI_scheme#Examples
  //     URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
  //
  //       foo://example.com:8042/over/there?name=ferret#nose
  //       \_/   \______________/\_________/ \_________/ \__/
  //        |           |            |            |        |
  //     scheme     authority       path        query   fragment
  //        |   _____________________|__
  //       / \ /                        \
  //       urn:example:animal:ferret:nose

  URI.set = function (uri) {
    if (uri === undefined) {
      return reset(URI);
    }
    let matches = reRFC3986.exec(uri);
    if (!matches) {
      return reset(URI);
    }
    this.scheme = matches[1] !== undefined ? matches[1].slice(0, -1) : '';
    this.authority = matches[2] !== undefined ? matches[2].slice(2).toLowerCase() : '';
    this.path = matches[3] !== undefined ? matches[3] : '';

    // <http://tools.ietf.org/html/rfc3986#section-6.2.3>
    // "In general, a URI that uses the generic syntax for authority
    // "with an empty path should be normalized to a path of '/'."
    if (this.authority !== '' && this.path === '') {
      this.path = '/';
    }
    this.query = matches[4] !== undefined ? matches[4].slice(1) : '';
    this.fragment = matches[5] !== undefined ? matches[5].slice(1) : '';

    // Assume very simple authority, i.e. just a hostname (highest likelihood
    // case for µBlock)
    if (reHostFromNakedAuthority.test(this.authority)) {
      this.hostname = this.authority;
      this.port = '';
      return this;
    }
    // Authority contains more than just a hostname
    matches = reHostPortFromAuthority.exec(this.authority);
    if (!matches) {
      matches = reIPv6PortFromAuthority.exec(this.authority);
      if (!matches) {
        return resetAuthority(URI);
      }
    }
    this.hostname = matches[1] !== undefined ? matches[1] : '';
    // http://en.wikipedia.org/wiki/FQDN
    if (this.hostname.endsWith('.')) {
      this.hostname = this.hostname.slice(0, -1);
    }
    this.port = matches[2] !== undefined ? matches[2].slice(1) : '';
    return this;
  };

  /** *************************************************************************** */

  //     URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
  //
  //       foo://example.com:8042/over/there?name=ferret#nose
  //       \_/   \______________/\_________/ \_________/ \__/
  //        |           |            |            |        |
  //     scheme     authority       path        query   fragment
  //        |   _____________________|__
  //       / \ /                        \
  //       urn:example:animal:ferret:nose

  URI.assemble = function (bits) {
    if (bits === undefined) {
      bits = this.allBits;
    }
    const s = [];
    if (this.scheme && bits & this.schemeBit) {
      s.push(this.scheme, ':');
    }
    if (this.hostname && bits & this.hostnameBit) {
      s.push('//', this.hostname);
    }
    if (this.port && bits & this.portBit) {
      s.push(':', this.port);
    }
    if (this.path && bits & this.pathBit) {
      s.push(this.path);
    }
    if (this.query && bits & this.queryBit) {
      s.push('?', this.query);
    }
    if (this.fragment && bits & this.fragmentBit) {
      s.push('#', this.fragment);
    }
    return s.join('');
  };

  /** *************************************************************************** */

  URI.originFromURI = function (uri) {
    const matches = reOriginFromURI.exec(uri);
    return matches !== null ? matches[0].toLowerCase() : '';
  };

  /** *************************************************************************** */

  URI.schemeFromURI = function (uri) {
    const matches = reSchemeFromURI.exec(uri);
    if (!matches) {
      return '';
    }
    return matches[0].slice(0, -1).toLowerCase();
  };

  /** *************************************************************************** */

  URI.authorityFromURI = function (uri) {
    const matches = reAuthorityFromURI.exec(uri);
    if (!matches) {
      return '';
    }
    return matches[1].slice(2).toLowerCase();
  };

  /** *************************************************************************** */

  // The most used function, so it better be fast.

  // https://github.com/gorhill/uBlock/issues/1559
  //   See http://en.wikipedia.org/wiki/FQDN
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1360285
  //   Revisit punycode dependency when above issue is fixed in Firefox.

  URI.hostnameFromURI = function (uri) {
    let matches = reCommonHostnameFromURL.exec(uri);
    if (matches !== null) {
      return matches[1];
    }
    matches = reAuthorityFromURI.exec(uri);
    if (matches === null) {
      return '';
    }
    const authority = matches[1].slice(2);
    // Assume very simple authority (most common case for µBlock)
    if (reHostFromNakedAuthority.test(authority)) {
      return authority.toLowerCase();
    }
    matches = reHostFromAuthority.exec(authority);
    if (matches === null) {
      matches = reIPv6FromAuthority.exec(authority);
      if (matches === null) {
        return '';
      }
    }
    let hostname = matches[1];
    while (hostname.endsWith('.')) {
      hostname = hostname.slice(0, -1);
    }
    if (reMustNormalizeHostname.test(hostname)) {
      hostname = punycode.toASCII(hostname.toLowerCase());
    }
    return hostname;
  };

  /** *************************************************************************** */

  URI.domainFromHostname = function (hostname) {
    const entry = domainCache.get(hostname);
    if (entry !== undefined) {
      entry.tstamp = Date.now();
      return entry.domain;
    }
    if (reIPAddressNaive.test(hostname) === false) {
      return domainCacheAdd(hostname, getDomain(hostname));
    }
    return domainCacheAdd(hostname, hostname);
  };

  URI.domainFromHostnameNoCache = function (hostname) {
    return reIPAddressNaive.test(hostname) ? hostname : getDomain(hostname) || hostname;
  };

  URI.domain = function () {
    return this.domainFromHostname(this.hostname);
  };

  // CLIQZ: using tldts instead
  // It is expected that there is higher-scoped `publicSuffixList` lingering
  // somewhere. Cache it. See <https://github.com/gorhill/publicsuffixlist.js>.
  // var psl = publicSuffixList;

  /** *************************************************************************** */

  URI.entityFromDomain = function (domain) {
    const pos = domain.indexOf('.');
    return pos !== -1 ? `${domain.slice(0, pos)}.*` : '';
  };

  /** *************************************************************************** */

  URI.pathFromURI = function (uri) {
    const matches = rePathFromURI.exec(uri);
    return matches !== null ? matches[1] : '';
  };

  /** *************************************************************************** */

  // Trying to alleviate the worries of looking up too often the domain name from
  // a hostname. With a cache, uBlock benefits given that it deals with a
  // specific set of hostnames within a narrow time span -- in other words, I
  // believe probability of cache hit are high in uBlock.

  const domainCache = new Map();
  const domainCacheCountLowWaterMark = 40;
  const domainCacheCountHighWaterMark = 60;
  const domainCacheEntryJunkyardMax = domainCacheCountHighWaterMark - domainCacheCountLowWaterMark;

  const DomainCacheEntry = function (domain) {
    this.init(domain);
  };

  DomainCacheEntry.prototype = {
    init(domain) {
      this.domain = domain;
      this.tstamp = Date.now();
      return this;
    },
    dispose() {
      this.domain = '';
      if (domainCacheEntryJunkyard.length < domainCacheEntryJunkyardMax) {
        domainCacheEntryJunkyard.push(this);
      }
    },
  };

  const domainCacheEntryFactory = function (domain) {
    return domainCacheEntryJunkyard.length !== 0
      ? domainCacheEntryJunkyard.pop().init(domain)
      : new DomainCacheEntry(domain);
  };

  const domainCacheEntryJunkyard = [];

  const domainCacheAdd = function (hostname, domain) {
    const entry = domainCache.get(hostname);
    if (entry !== undefined) {
      entry.tstamp = Date.now();
    } else {
      domainCache.set(hostname, domainCacheEntryFactory(domain));
      if (domainCache.size === domainCacheCountHighWaterMark) {
        domainCachePrune();
      }
    }
    return domain;
  };

  const domainCacheEntrySort = function (a, b) {
    return domainCache.get(b).tstamp - domainCache.get(a).tstamp;
  };

  const domainCachePrune = function () {
    const hostnames = Array.from(domainCache.keys())
      .sort(domainCacheEntrySort)
      .slice(domainCacheCountLowWaterMark);
    let i = hostnames.length;
    while (i--) {
      const hostname = hostnames[i];
      domainCache.get(hostname).dispose();
      domainCache.delete(hostname);
    }
  };

  /** *************************************************************************** */

  URI.domainFromURI = function (uri) {
    if (!uri) {
      return '';
    }
    return this.domainFromHostname(this.hostnameFromURI(uri));
  };

  /** *************************************************************************** */

  URI.isNetworkURI = function (uri) {
    return reNetworkURI.test(uri);
  };

  const reNetworkURI = /^(?:ftps?|https?|wss?):\/\//;

  /** *************************************************************************** */

  URI.isNetworkScheme = function (scheme) {
    return reNetworkScheme.test(scheme);
  };

  const reNetworkScheme = /^(?:ftps?|https?|wss?)$/;

  /** *************************************************************************** */

  // Normalize the way µBlock expects it

  URI.normalizedURI = function () {
    // Will be removed:
    // - port
    // - user id/password
    // - fragment
    return this.assemble(this.normalizeBits);
  };

  /** *************************************************************************** */

  URI.rootURL = function () {
    if (!this.hostname) {
      return '';
    }
    return this.assemble(this.schemeBit | this.hostnameBit);
  };

  /** *************************************************************************** */

  URI.isValidHostname = function (hostname) {
    let r;
    try {
      r = reValidHostname.test(hostname);
    } catch (e) {
      return false;
    }
    return r;
  };

  /** *************************************************************************** */

  // Return the parent domain. For IP address, there is no parent domain.

  URI.parentHostnameFromHostname = function (hostname) {
    // `locahost` => ``
    // `example.org` => `example.org`
    // `www.example.org` => `example.org`
    // `tomato.www.example.org` => `example.org`
    const domain = this.domainFromHostname(hostname);

    // `locahost` === `` => bye
    // `example.org` === `example.org` => bye
    // `www.example.org` !== `example.org` => stay
    // `tomato.www.example.org` !== `example.org` => stay
    if (domain === '' || domain === hostname) {
      return undefined;
    }

    // Parent is hostname minus first label
    return hostname.slice(hostname.indexOf('.') + 1);
  };

  /** *************************************************************************** */

  // Return all possible parent hostnames which can be derived from `hostname`,
  // ordered from direct parent up to domain inclusively.

  URI.parentHostnamesFromHostname = function (hostname) {
    // TODO: I should create an object which is optimized to receive
    // the list of hostnames by making it reusable (junkyard etc.) and which
    // has its own element counter property in order to avoid memory
    // alloc/dealloc.
    const domain = this.domainFromHostname(hostname);
    if (domain === '' || domain === hostname) {
      return [];
    }
    const nodes = [];
    let pos;
    for (;;) {
      pos = hostname.indexOf('.');
      if (pos < 0) {
        break;
      }
      hostname = hostname.slice(pos + 1);
      nodes.push(hostname);
      if (hostname === domain) {
        break;
      }
    }
    return nodes;
  };

  /** *************************************************************************** */

  // Return all possible hostnames which can be derived from `hostname`,
  // ordered from self up to domain inclusively.

  URI.allHostnamesFromHostname = function (hostname) {
    const nodes = this.parentHostnamesFromHostname(hostname);
    nodes.unshift(hostname);
    return nodes;
  };

  /** *************************************************************************** */

  URI.toString = function () {
    return this.assemble();
  };

  /** *************************************************************************** */

  // Export

  return URI;

  /** *************************************************************************** */
}());

/** *************************************************************************** */

const compileFilters = function (rawText) {
  const writer = new Writer();

  // Useful references:
  //    https://adblockplus.org/en/filter-cheatsheet
  //    https://adblockplus.org/en/filters
  const reIsWhitespaceChar = /\s/;
  const reMaybeLocalIp = /^[\d:f]/;
  const reIsLocalhostRedirect = /\s+(?:0\.0\.0\.0|broadcasthost|localhost|local|ip6-\w+)\b/;
  const reLocalIp = /^(?:0\.0\.0\.0|127\.0\.0\.1|::1|fe80::1%lo0)/;
  const lineIter = new LineIterator(rawText);

  while (lineIter.eot() === false) {
    // rhill 2014-04-18: The trim is important here, as without it there
    // could be a lingering `\r` which would cause problems in the
    // following parsing code.
    let line = lineIter.next().trim();
    if (line.length === 0) {
      continue;
    }

    // Strip comments
    const c = line.charAt(0);
    if (c === '!' || c === '[') {
      continue;
    }

    // Most comments start in first column
    if (c === '#') {
      continue;
    }

    // Catch comments somewhere on the line
    // Remove:
    //   ... #blah blah blah
    //   ... # blah blah blah
    // Don't remove:
    //   ...#blah blah blah
    // because some ABP filters uses the `#` character (URL fragment)
    const pos = line.indexOf('#');
    if (pos !== -1 && reIsWhitespaceChar.test(line.charAt(pos - 1))) {
      line = line.slice(0, pos).trim();
    }

    // https://github.com/gorhill/httpswitchboard/issues/15
    // Ensure localhost et al. don't end up in the ubiquitous blacklist.
    // With hosts files, we need to remove local IP redirection
    if (reMaybeLocalIp.test(c)) {
      // Ignore hosts file redirect configuration
      // 127.0.0.1 localhost
      // 255.255.255.255 broadcasthost
      if (reIsLocalhostRedirect.test(line)) {
        continue;
      }
      line = line.replace(reLocalIp, '').trim();
    }

    if (line.length === 0) {
      continue;
    }

    staticNetFilteringEngine.compile(line, writer);
  }

  return writer.toString();
};

/** *****************************************************************************

  The original prototype was to develop an idea I had about using jump indices
  in a TypedArray for quickly matching hostnames (or more generally strings)[1].
  Once I had a working, un-optimized prototype, I realized I had ended up
  with something formally named a "trie": <https://en.wikipedia.org/wiki/Trie>,
  hence the name. I have no idea whether the implementation here or one
  resembling it has been done elsewhere.

  "HN" in HNTrieContainer stands for "HostName", because the trie is
  specialized to deal with matching hostnames -- which is a bit more
  complicated than matching plain strings.

  For example, `www.abc.com` is deemed matching `abc.com`, because the former
  is a subdomain of the latter. The opposite is of course not true.

  The resulting read-only tries created as a result of using hnTrieManager are
  simply just typed arrays filled with integers. The matching algorithm is
  just a matter of reading/comparing these integers, and further using them as
  indices in the array as a way to move around in the trie.

  [1] To solve <https://github.com/gorhill/uBlock/issues/3193>

  Since this trie is specialized for matching hostnames, the stored
  strings are reversed internally, because of hostname comparison logic:

  Correct matching:
    index      0123456
               abc.com
                     |
           www.abc.com
    index  01234567890

  Incorrect matching (typically used for plain strings):
    index  0123456
           abc.com
           |
           www.abc.com
    index  01234567890

  ------------------------------------------------------------------------------

  1st iteration:
    - https://github.com/gorhill/uBlock/blob/ff58107dac3a32607f8113e39ed5015584506813/src/js/hntrie.js
    - Suitable for small to medium set of hostnames
    - One buffer per trie

  2nd iteration: goal was to make matches() method wasm-able
    - https://github.com/gorhill/uBlock/blob/c3b0fd31f64bd7ffecdd282fb1208fe07aac3eb0/src/js/hntrie.js
    - Suitable for small to medium set of hostnames
    - Distinct tries all share same buffer:
      - Reduced memory footprint
        - https://stackoverflow.com/questions/45803829/memory-overhead-of-typed-arrays-vs-strings/45808835#45808835
      - Reusing needle character lookups for all tries
        - This significantly reduce the number of String.charCodeAt() calls
    - Slightly improved creation time

  This is the 3rd iteration: goal was to make add() method wasm-able and
  further improve memory/CPU efficiency.

  This 3rd iteration has the following new traits:
    - Suitable for small to large set of hostnames
    - Support multiple trie containers (instanciable)
    - Designed to hold large number of hostnames
    - Hostnames can be added at any time (instead of all at once)
      - This means pre-sorting is no longer a requirement
    - The trie is always compact
      - There is no longer a need for a `vacuum` method
      - This makes the add() method wasm-able
    - It can return the exact hostname which caused the match
    - serializable/unserializable available for fast loading
    - Distinct trie reference support the iteration protocol, thus allowing
      to extract all the hostnames in the trie

  Its primary purpose is to replace the use of Set() as a mean to hold
  large number of hostnames (ex. FilterHostnameDict in static filtering
  engine).

  A HNTrieContainer is mostly a large buffer in which distinct but related
  tries are stored. The memory layout of the buffer is as follow:

    0-254: needle being processed
      255: length of needle
  256-259: offset to start of trie data section (=> trie0)
  260-263: offset to end of trie data section (=> trie1)
  264-267: offset to start of character data section  (=> char0)
  268-271: offset to end of character data section (=> char1)
      272: start of trie data section

*/

const HNTRIE_PAGE_SIZE = 65536;
// i32 /  i8
const HNTRIE_TRIE0_SLOT = 256 >>> 2; //  64 / 256
const HNTRIE_TRIE1_SLOT = HNTRIE_TRIE0_SLOT + 1; //  65 / 260
const HNTRIE_CHAR0_SLOT = HNTRIE_TRIE0_SLOT + 2; //  66 / 264
const HNTRIE_CHAR1_SLOT = HNTRIE_TRIE0_SLOT + 3; //  67 / 268
const HNTRIE_TRIE0_START = (HNTRIE_TRIE0_SLOT + 4) << 2; //       272

const HNTrieContainer = function (details) {
  if (details instanceof Object === false) {
    details = {};
  }
  const len = ((details.byteLength || 0) + HNTRIE_PAGE_SIZE - 1) & ~(HNTRIE_PAGE_SIZE - 1);
  this.buf = new Uint8Array(Math.max(len, 131072));
  this.buf32 = new Uint32Array(this.buf.buffer);
  this.needle = '';
  this.buf32[HNTRIE_TRIE0_SLOT] = HNTRIE_TRIE0_START;
  this.buf32[HNTRIE_TRIE1_SLOT] = this.buf32[HNTRIE_TRIE0_SLOT];
  this.buf32[HNTRIE_CHAR0_SLOT] = details.char0 || 65536;
  this.buf32[HNTRIE_CHAR1_SLOT] = this.buf32[HNTRIE_CHAR0_SLOT];
  this.wasmInstancePromise = null;
  this.wasmMemory = null;
  this.readyToUse();
};

HNTrieContainer.prototype = {
  //--------------------------------------------------------------------------
  // Public methods
  //--------------------------------------------------------------------------

  reset() {
    this.buf32[HNTRIE_TRIE1_SLOT] = this.buf32[HNTRIE_TRIE0_SLOT];
    this.buf32[HNTRIE_CHAR1_SLOT] = this.buf32[HNTRIE_CHAR0_SLOT];
  },

  readyToUse() {
    return Promise.resolve();
  },

  setNeedle(needle) {
    if (needle !== this.needle) {
      const buf = this.buf;
      let i = needle.length;
      if (i > 254) {
        i = 254;
      }
      buf[255] = i;
      while (i--) {
        buf[i] = needle.charCodeAt(i);
      }
      this.needle = needle;
    }
    return this;
  },

  matches(iroot) {
    const char0 = this.buf32[HNTRIE_CHAR0_SLOT];
    let ineedle = this.buf[255];
    let icell = iroot;
    for (;;) {
      if (ineedle === 0) {
        return -1;
      }
      ineedle -= 1;
      const c = this.buf[ineedle];
      let v;
      let i0;
      // find first segment with a first-character match
      for (;;) {
        v = this.buf32[icell + 2];
        i0 = char0 + (v & 0x00ffffff);
        if (this.buf[i0] === c) {
          break;
        }
        icell = this.buf32[icell + 0];
        if (icell === 0) {
          return -1;
        }
      }
      // all characters in segment must match
      let n = v >>> 24;
      if (n > 1) {
        n -= 1;
        if (n > ineedle) {
          return -1;
        }
        i0 += 1;
        const i1 = i0 + n;
        do {
          ineedle -= 1;
          if (this.buf[i0] !== this.buf[ineedle]) {
            return -1;
          }
          i0 += 1;
        } while (i0 < i1);
      }
      // next segment
      icell = this.buf32[icell + 1];
      if (icell === 0) {
        break;
      }
      if (this.buf32[icell + 2] === 0) {
        if (ineedle === 0 || this.buf[ineedle - 1] === 0x2e) {
          return ineedle;
        }
        icell = this.buf32[icell + 1];
      }
    }
    return ineedle === 0 || this.buf[ineedle - 1] === 0x2e ? ineedle : -1;
  },

  createOne(args) {
    if (Array.isArray(args)) {
      return new HNTrieRef(this, args[0], args[1]);
    }
    // grow buffer if needed
    if (this.buf32[HNTRIE_CHAR0_SLOT] - this.buf32[HNTRIE_TRIE1_SLOT] < 12) {
      this.growBuf(12, 0);
    }
    const iroot = this.buf32[HNTRIE_TRIE1_SLOT] >>> 2;
    this.buf32[HNTRIE_TRIE1_SLOT] += 12;
    this.buf32[iroot + 0] = 0;
    this.buf32[iroot + 1] = 0;
    this.buf32[iroot + 2] = 0;
    return new HNTrieRef(this, iroot, 0);
  },

  compileOne(trieRef) {
    return [trieRef.iroot, trieRef.size];
  },

  add(iroot) {
    let lhnchar = this.buf[255];
    if (lhnchar === 0) {
      return 0;
    }
    let icell = iroot;
    // special case: first node in trie
    if (this.buf32[icell + 2] === 0) {
      this.buf32[icell + 2] = this.addSegment(lhnchar);
      return 1;
    }
    // grow buffer if needed
    if (
      this.buf32[HNTRIE_CHAR0_SLOT] - this.buf32[HNTRIE_TRIE1_SLOT] < 24
      || this.buf.length - this.buf32[HNTRIE_CHAR1_SLOT] < 256
    ) {
      this.growBuf(24, 256);
    }
    //
    const char0 = this.buf32[HNTRIE_CHAR0_SLOT];
    let inext;
    // find a matching cell: move down
    for (;;) {
      const vseg = this.buf32[icell + 2];
      // skip boundary cells
      if (vseg === 0) {
        icell = this.buf32[icell + 1];
        continue;
      }
      let isegchar0 = char0 + (vseg & 0x00ffffff);
      // if first character is no match, move to next descendant
      if (this.buf[isegchar0] !== this.buf[lhnchar - 1]) {
        inext = this.buf32[icell + 0];
        if (inext === 0) {
          this.buf32[icell + 0] = this.addCell(0, 0, this.addSegment(lhnchar));
          return 1;
        }
        icell = inext;
        continue;
      }
      // 1st character was tested
      let isegchar = 1;
      lhnchar -= 1;
      // find 1st mismatch in rest of segment
      const lsegchar = vseg >>> 24;
      if (lsegchar !== 1) {
        for (;;) {
          if (isegchar === lsegchar) {
            break;
          }
          if (lhnchar === 0) {
            break;
          }
          if (this.buf[isegchar0 + isegchar] !== this.buf[lhnchar - 1]) {
            break;
          }
          isegchar += 1;
          lhnchar -= 1;
        }
      }
      // all segment characters matched
      if (isegchar === lsegchar) {
        inext = this.buf32[icell + 1];
        // needle remainder: no
        if (lhnchar === 0) {
          // boundary cell already present
          if (inext === 0 || this.buf32[inext + 2] === 0) {
            return 0;
          }
          // need boundary cell
          this.buf32[icell + 1] = this.addCell(0, inext, 0);
        }
        // needle remainder: yes
        else {
          if (inext !== 0) {
            icell = inext;
            continue;
          }
          // boundary cell + needle remainder
          inext = this.addCell(0, 0, 0);
          this.buf32[icell + 1] = inext;
          this.buf32[inext + 1] = this.addCell(0, 0, this.addSegment(lhnchar));
        }
      }
      // some segment characters matched
      else {
        // split current cell
        isegchar0 -= char0;
        this.buf32[icell + 2] = (isegchar << 24) | isegchar0;
        inext = this.addCell(
          0,
          this.buf32[icell + 1],
          ((lsegchar - isegchar) << 24) | (isegchar0 + isegchar),
        );
        this.buf32[icell + 1] = inext;
        // needle remainder: no = need boundary cell
        if (lhnchar === 0) {
          this.buf32[icell + 1] = this.addCell(0, inext, 0);
        }
        // needle remainder: yes = need new cell for remaining characters
        else {
          this.buf32[inext + 0] = this.addCell(0, 0, this.addSegment(lhnchar));
        }
      }
      return 1;
    }
  },

  optimize() {
    this.shrinkBuf();
    return {
      byteLength: this.buf.byteLength,
      char0: this.buf32[HNTRIE_CHAR0_SLOT],
    };
  },

  fromIterable(hostnames, add) {
    if (add === undefined) {
      add = 'add';
    }
    const trieRef = this.createOne();
    for (const hn of hostnames) {
      trieRef[add](hn);
    }
    return trieRef;
  },

  serialize() {
    return Array.from(
      new Uint32Array(this.buf32.buffer, 0, (this.buf32[HNTRIE_CHAR1_SLOT] + 3) >>> 2),
    );
  },

  unserialize(selfie) {
    const len = ((selfie.length << 2) + HNTRIE_PAGE_SIZE - 1) & ~(HNTRIE_PAGE_SIZE - 1);
    if (this.wasmMemory !== null) {
      const pageCountBefore = this.buf.length >>> 16;
      const pageCountAfter = len >>> 16;
      if (pageCountAfter > pageCountBefore) {
        this.wasmMemory.grow(pageCountAfter - pageCountBefore);
        this.buf = new Uint8Array(this.wasmMemory.buffer);
        this.buf32 = new Uint32Array(this.buf.buffer);
      }
    } else if (len > this.buf.length) {
      this.buf = new Uint8Array(len);
      this.buf32 = new Uint32Array(this.buf.buffer);
    }
    this.buf32.set(selfie);
    this.needle = '';
  },

  //--------------------------------------------------------------------------
  // Private methods
  //--------------------------------------------------------------------------

  addCell(idown, iright, v) {
    let icell = this.buf32[HNTRIE_TRIE1_SLOT];
    this.buf32[HNTRIE_TRIE1_SLOT] = icell + 12;
    icell >>>= 2;
    this.buf32[icell + 0] = idown;
    this.buf32[icell + 1] = iright;
    this.buf32[icell + 2] = v;
    return icell;
  },

  addSegment(lsegchar) {
    if (lsegchar === 0) {
      return 0;
    }
    let char1 = this.buf32[HNTRIE_CHAR1_SLOT];
    const isegchar = char1 - this.buf32[HNTRIE_CHAR0_SLOT];
    let i = lsegchar;
    do {
      this.buf[char1++] = this.buf[--i];
    } while (i !== 0);
    this.buf32[HNTRIE_CHAR1_SLOT] = char1;
    return (lsegchar << 24) | isegchar;
  },

  growBuf(trieGrow, charGrow) {
    const char0 = Math.max(
      (this.buf32[HNTRIE_TRIE1_SLOT] + trieGrow + HNTRIE_PAGE_SIZE - 1) & ~(HNTRIE_PAGE_SIZE - 1),
      this.buf32[HNTRIE_CHAR0_SLOT],
    );
    const char1 = char0 + this.buf32[HNTRIE_CHAR1_SLOT] - this.buf32[HNTRIE_CHAR0_SLOT];
    const bufLen = Math.max(
      (char1 + charGrow + HNTRIE_PAGE_SIZE - 1) & ~(HNTRIE_PAGE_SIZE - 1),
      this.buf.length,
    );
    this.resizeBuf(bufLen, char0);
  },

  shrinkBuf() {
    // Can't shrink WebAssembly.Memory
    if (this.wasmMemory !== null) {
      return;
    }
    const char0 = this.buf32[HNTRIE_TRIE1_SLOT] + 24;
    const char1 = char0 + this.buf32[HNTRIE_CHAR1_SLOT] - this.buf32[HNTRIE_CHAR0_SLOT];
    const bufLen = char1 + 256;
    this.resizeBuf(bufLen, char0);
  },

  resizeBuf(bufLen, char0) {
    bufLen = (bufLen + HNTRIE_PAGE_SIZE - 1) & ~(HNTRIE_PAGE_SIZE - 1);
    if (bufLen === this.buf.length && char0 === this.buf32[HNTRIE_CHAR0_SLOT]) {
      return;
    }
    const charDataLen = this.buf32[HNTRIE_CHAR1_SLOT] - this.buf32[HNTRIE_CHAR0_SLOT];
    if (this.wasmMemory !== null) {
      const pageCount = (bufLen >>> 16) - (this.buf.byteLength >>> 16);
      if (pageCount > 0) {
        this.wasmMemory.grow(pageCount);
        this.buf = new Uint8Array(this.wasmMemory.buffer);
        this.buf32 = new Uint32Array(this.wasmMemory.buffer);
      }
    } else if (bufLen !== this.buf.length) {
      const newBuf = new Uint8Array(bufLen);
      newBuf.set(new Uint8Array(this.buf.buffer, 0, this.buf32[HNTRIE_TRIE1_SLOT]), 0);
      newBuf.set(
        new Uint8Array(this.buf.buffer, this.buf32[HNTRIE_CHAR0_SLOT], charDataLen),
        char0,
      );
      this.buf = newBuf;
      this.buf32 = new Uint32Array(this.buf.buffer);
      this.buf32[HNTRIE_CHAR0_SLOT] = char0;
      this.buf32[HNTRIE_CHAR1_SLOT] = char0 + charDataLen;
    }
    if (char0 !== this.buf32[HNTRIE_CHAR0_SLOT]) {
      this.buf.set(
        new Uint8Array(this.buf.buffer, this.buf32[HNTRIE_CHAR0_SLOT], charDataLen),
        char0,
      );
      this.buf32[HNTRIE_CHAR0_SLOT] = char0;
      this.buf32[HNTRIE_CHAR1_SLOT] = char0 + charDataLen;
    }
  },
};

/** *************************************************************************** */
//--------------------------------------------------------------------------
// Class to hold reference to a specific trie
//--------------------------------------------------------------------------

const HNTrieRef = function (container, iroot, size) {
  this.container = container;
  this.iroot = iroot;
  this.size = size;
};

HNTrieRef.prototype = {
  add(hn) {
    if (this.container.setNeedle(hn).add(this.iroot) === 1) {
      this.size += 1;
      return true;
    }
    return false;
  },
  matches(needle) {
    return this.container.setNeedle(needle).matches(this.iroot);
  },
  [Symbol.iterator]() {
    return {
      value: undefined,
      done: false,
      next() {
        if (this.icell === 0) {
          if (this.forks.length === 0) {
            this.value = undefined;
            this.done = true;
            return this;
          }
          this.charPtr = this.forks.pop();
          this.icell = this.forks.pop();
        }
        for (;;) {
          const idown = this.container.buf32[this.icell + 0];
          if (idown !== 0) {
            this.forks.push(idown, this.charPtr);
          }
          const v = this.container.buf32[this.icell + 2];
          let i0 = this.container.buf32[HNTRIE_CHAR0_SLOT] + (v & 0x00ffffff);
          const i1 = i0 + (v >>> 24);
          while (i0 < i1) {
            this.charPtr -= 1;
            this.charBuf[this.charPtr] = this.container.buf[i0];
            i0 += 1;
          }
          this.icell = this.container.buf32[this.icell + 1];
          if (this.icell === 0) {
            return this.toHostname();
          }
          if (this.container.buf32[this.icell + 2] === 0) {
            this.icell = this.container.buf32[this.icell + 1];
            return this.toHostname();
          }
        }
      },
      toHostname() {
        this.value = this.textDecoder.decode(new Uint8Array(this.charBuf.buffer, this.charPtr));
        return this;
      },
      container: this.container,
      icell: this.iroot,
      charBuf: new Uint8Array(256),
      charPtr: 256,
      forks: [],
      textDecoder: new TextDecoder(),
    };
  },
};

/** *************************************************************************** */

// A standalone URL tokenizer will allow us to use URL tokens in more than
// just static filtering engine. This opens the door to optimize other
// filtering engine parts aside static filtering. This also allows:
// - Tokenize only on demand.
// - To potentially avoid tokenizing when same URL is fed to tokenizer.
//   - Benchmarking shows this to be a common occurrence.
//
// https://github.com/gorhill/uBlock/issues/2630
// Slice input URL into a list of safe-integer token values, instead of a list
// of substrings. The assumption is that with dealing only with numeric
// values, less underlying memory allocations, and also as a consequence
// less work for the garbage collector down the road.
// Another assumption is that using a numeric-based key value for Map() is
// more efficient than string-based key value (but that is something I would
// have to benchmark).
// Benchmark for string-based tokens vs. safe-integer token values:
//   https://gorhill.github.io/obj-vs-set-vs-map/tokenize-to-str-vs-to-int.html

const urlTokenizer = {
  setURL(url) {
    if (url !== this._urlIn) {
      this._urlIn = url;
      this._urlOut = url.toLowerCase();
      this._tokenized = false;
    }
    return this._urlOut;
  },

  // Tokenize on demand.
  getTokens() {
    if (this._tokenized === false) {
      this._tokenize();
      this._tokenized = true;
    }
    return this._tokens;
  },

  tokenHashFromString(s) {
    const l = s.length;
    if (l === 0) {
      return 0;
    }
    if (l === 1) {
      if (s === '*') {
        return 63;
      }
      if (s === '.') {
        return 62;
      }
    }
    const vtc = this._validTokenChars;

    let th = vtc[s.charCodeAt(0)];
    for (let i = 1; i !== 8 && i !== l; i++) {
      th = th * 64 + vtc[s.charCodeAt(i)];
    }
    return th;
  },

  // https://github.com/chrisaljoudi/uBlock/issues/1118
  // We limit to a maximum number of tokens.

  _tokenize() {
    const tokens = this._tokens;

    let url = this._urlOut;

    let l = url.length;
    if (l === 0) {
      tokens[0] = 0;
      return;
    }
    if (l > 2048) {
      url = url.slice(0, 2048);
      l = 2048;
    }
    let i = 0;

    let j = 0;

    let v;

    let n;

    let ti;

    let th;

    const vtc = this._validTokenChars;
    for (;;) {
      for (;;) {
        if (i === l) {
          tokens[j] = 0;
          return;
        }
        v = vtc[url.charCodeAt(i++)];
        if (v !== 0) {
          break;
        }
      }
      th = v;
      ti = i - 1;
      n = 1;
      for (;;) {
        if (i === l) {
          break;
        }
        v = vtc[url.charCodeAt(i++)];
        if (v === 0) {
          break;
        }
        if (n === 8) {
          continue;
        }
        th = th * 64 + v;
        n += 1;
      }
      tokens[j++] = th;
      tokens[j++] = ti;
    }
  },

  _urlIn: '',
  _urlOut: '',
  _tokenized: false,
  _tokens: [0],
  _validTokenChars: (function () {
    const vtc = new Uint8Array(128);

    const chars = '0123456789%abcdefghijklmnopqrstuvwxyz';

    let i = chars.length;
    while (i--) {
      vtc[chars.charCodeAt(i)] = i + 1;
    }
    return vtc;
  }()),
};

/** *************************************************************************** */

const LineIterator = function (text, offset) {
  this.text = text;
  this.textLen = this.text.length;
  this.offset = offset || 0;
};

LineIterator.prototype.next = function (offset) {
  if (offset !== undefined) {
    this.offset += offset;
  }
  let lineEnd = this.text.indexOf('\n', this.offset);
  if (lineEnd === -1) {
    lineEnd = this.text.indexOf('\r', this.offset);
    if (lineEnd === -1) {
      lineEnd = this.textLen;
    }
  }
  const line = this.text.slice(this.offset, lineEnd);
  this.offset = lineEnd + 1;
  return line;
};

LineIterator.prototype.charCodeAt = function (offset) {
  return this.text.charCodeAt(this.offset + offset);
};

LineIterator.prototype.eot = function () {
  return this.offset >= this.textLen;
};

/** *************************************************************************** */

// The field iterator is less CPU-intensive than when using native
// String.split().

const FieldIterator = function (sep) {
  this.text = '';
  this.sep = sep;
  this.sepLen = sep.length;
  this.offset = 0;
};

FieldIterator.prototype.first = function (text) {
  this.text = text;
  this.offset = 0;
  return this.next();
};

FieldIterator.prototype.next = function () {
  let end = this.text.indexOf(this.sep, this.offset);
  if (end === -1) {
    end = this.text.length;
  }
  const field = this.text.slice(this.offset, end);
  this.offset = end + this.sepLen;
  return field;
};

FieldIterator.prototype.remainder = function () {
  return this.text.slice(this.offset);
};

/** *************************************************************************** */

const Writer = function () {
  this.io = CompiledLineIO;
  this.blockId = undefined;
  this.block = undefined;
  this.stringifier = this.io.serialize;
  this.blocks = new Map();
  this.properties = new Map();
};

const Reader = function (raw, blockId) {
  this.io = CompiledLineIO;
  this.block = '';
  this.len = 0;
  this.offset = 0;
  this.line = '';
  this.parser = this.io.unserialize;
  this.blocks = new Map();
  this.properties = new Map();
  const reBlockStart = new RegExp(`^${this.io.blockStartPrefix}(\\d+)\\n`, 'gm');
  let match = reBlockStart.exec(raw);
  while (match !== null) {
    const beg = match.index + match[0].length;
    const end = raw.indexOf(this.io.blockEndPrefix + match[1], beg);
    this.blocks.set(parseInt(match[1], 10), raw.slice(beg, end));
    reBlockStart.lastIndex = end;
    match = reBlockStart.exec(raw);
  }
  if (blockId !== undefined) {
    this.select(blockId);
  }
};

const CompiledLineIO = {
  serialize: JSON.stringify,
  unserialize: JSON.parse,
  blockStartPrefix: '#block-start-', // ensure no special regex characters
  blockEndPrefix: '#block-end-', // ensure no special regex characters
};

Writer.prototype = {
  push(args) {
    this.block[this.block.length] = this.stringifier(args);
  },
  select(blockId) {
    if (blockId === this.blockId) {
      return;
    }
    this.blockId = blockId;
    this.block = this.blocks.get(blockId);
    if (this.block === undefined) {
      this.blocks.set(blockId, (this.block = []));
    }
  },
  toString() {
    const result = [];
    for (const [id, lines] of this.blocks) {
      if (lines.length === 0) {
        continue;
      }
      result.push(this.io.blockStartPrefix + id, lines.join('\n'), this.io.blockEndPrefix + id);
    }
    return result.join('\n');
  },
};

Reader.prototype = {
  next() {
    if (this.offset === this.len) {
      this.line = '';
      return false;
    }
    const pos = this.block.indexOf('\n', this.offset);
    if (pos !== -1) {
      this.line = this.block.slice(this.offset, pos);
      this.offset = pos + 1;
    } else {
      this.line = this.block.slice(this.offset);
      this.offset = this.len;
    }
    return true;
  },
  select(blockId) {
    this.block = this.blocks.get(blockId) || '';
    this.len = this.block.length;
    this.offset = 0;
    return this;
  },
  fingerprint() {
    return this.line;
  },
  args() {
    return this.parser(this.line);
  },
};

/** *************************************************************************** */

// I want this helper to be self-maintained, callers must not worry about
// this helper cleaning after itself by asking them to reset it when it is no
// longer needed. A timer will be used for self-garbage-collect.
// Cleaning up 10s after last hit sounds reasonable.

const stringDeduplicater = {
  strings: new Map(),
  timer: undefined,
  last: 0,

  lookup(s) {
    let t = this.strings.get(s);
    if (t === undefined) {
      t = this.strings.set(s, s).get(s);
      if (this.timer === undefined) {
        // CLIQZ: disable
        // this.timer = vAPI.setTimeout(() => {
        //   this.cleanup();
        // }, 10000);
      }
    }
    this.last = Date.now();
    return t;
  },

  cleanup() {
    if (Date.now() - this.last < 10000) {
      // this.timer = vAPI.setTimeout(() => {
      //   this.cleanup();
      // }, 10000);
    } else {
      this.timer = undefined;
      // this.strings.clear();
    }
  },
};

/** *************************************************************************** */

// TODO: evaluate using TextEncoder/TextDecoder

const orphanizeString = function (s) {
  return JSON.parse(JSON.stringify(s));
};

/** *****************************************************************************

RFC 3986 as reference: http://tools.ietf.org/html/rfc3986#appendix-A

Naming convention from https://en.wikipedia.org/wiki/URI_scheme#Examples

*/

const staticNetFilteringEngine = (function () {
  /** *************************************************************************** */

  // fedcba9876543210
  //       |    | |||
  //       |    | |||
  //       |    | |||
  //       |    | |||
  //       |    | ||+---- bit    0: [BlockAction | AllowAction]
  //       |    | |+----- bit    1: `important`
  //       |    | +------ bit 2- 3: party [0 - 3]
  //       |    +-------- bit 4- 8: type [0 - 31]
  //       +------------- bit 9-15: unused

  const BlockAction = 0 << 0;
  const AllowAction = 1 << 0;
  const Important = 1 << 1;
  const AnyParty = 0 << 2;
  const FirstParty = 1 << 2;
  const ThirdParty = 2 << 2;

  const AnyType = 0 << 4;
  const typeNameToTypeValue = {
    no_type: 0 << 4,
    stylesheet: 1 << 4,
    image: 2 << 4,
    object: 3 << 4,
    object_subrequest: 3 << 4,
    script: 4 << 4,
    xmlhttprequest: 5 << 4,
    sub_frame: 6 << 4,
    font: 7 << 4,
    media: 8 << 4,
    websocket: 9 << 4,
    other: 10 << 4,
    popup: 11 << 4, // start of behavorial filtering
    popunder: 12 << 4,
    main_frame: 13 << 4, // start of 1st-party-only behavorial filtering
    generichide: 14 << 4,
    'inline-font': 15 << 4,
    'inline-script': 16 << 4,
    data: 17 << 4, // special: a generic data holder
    redirect: 18 << 4,
    webrtc: 19 << 4,
    unsupported: 20 << 4,
  };
  const otherTypeBitValue = typeNameToTypeValue.other;

  const typeValueToTypeName = {
    1: 'stylesheet',
    2: 'image',
    3: 'object',
    4: 'script',
    5: 'xmlhttprequest',
    6: 'subdocument',
    7: 'font',
    8: 'media',
    9: 'websocket',
    10: 'other',
    11: 'popup',
    12: 'popunder',
    13: 'document',
    14: 'generichide',
    15: 'inline-font',
    16: 'inline-script',
    17: 'data',
    18: 'redirect',
    19: 'webrtc',
    20: 'unsupported',
  };

  const BlockAnyTypeAnyParty = BlockAction | AnyType | AnyParty;
  const BlockAnyType = BlockAction | AnyType;
  const BlockAnyParty = BlockAction | AnyParty;

  const AllowAnyTypeAnyParty = AllowAction | AnyType | AnyParty;
  const AllowAnyType = AllowAction | AnyType;
  const AllowAnyParty = AllowAction | AnyParty;

  const genericHideException = AllowAction | AnyParty | typeNameToTypeValue.generichide;

  const genericHideImportant = BlockAction | AnyParty | typeNameToTypeValue.generichide | Important;

  // ABP filters: https://adblockplus.org/en/filters
  // regex tester: http://regex101.com/

  /** *************************************************************************** */

  // See the following as short-lived registers, used during evaluation. They are
  // valid until the next evaluation.

  let pageHostnameRegister = '';

  let requestHostnameRegister = '';
  // var filterRegister = null;
  // var categoryRegister = '';

  // Local helpers

  const normalizeRegexSource = function (s) {
    try {
      const re = new RegExp(s);
      return re.source;
    } catch (ex) {
      normalizeRegexSource.message = ex.toString();
    }
    return '';
  };

  const rawToRegexStr = function (s, anchor) {
    // https://www.loggly.com/blog/five-invaluable-techniques-to-improve-regex-performance/
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
    // Also: remove leading/trailing wildcards -- there is no point.
    let reStr = s
      .replace(rawToRegexStr.escape1, '\\$&')
      .replace(rawToRegexStr.escape2, '(?:[^%.0-9a-z_-]|$)')
      .replace(rawToRegexStr.escape3, '')
      .replace(rawToRegexStr.escape4, '[^ ]*?');
    if (anchor & 0b100) {
      reStr = (reStr.startsWith('\\.')
        ? rawToRegexStr.reTextHostnameAnchor2
        : rawToRegexStr.reTextHostnameAnchor1) + reStr;
    } else if (anchor & 0b010) {
      reStr = `^${reStr}`;
    }
    if (anchor & 0b001) {
      reStr += '$';
    }
    return reStr;
  };
  rawToRegexStr.escape1 = /[.+?${}()|[\]\\]/g;
  rawToRegexStr.escape2 = /\^/g;
  rawToRegexStr.escape3 = /^\*|\*$/g;
  rawToRegexStr.escape4 = /\*/g;
  rawToRegexStr.reTextHostnameAnchor1 = '^[a-z-]+://(?:[^/?#]+\\.)?';
  rawToRegexStr.reTextHostnameAnchor2 = '^[a-z-]+://(?:[^/?#]+)?';

  // https://github.com/uBlockOrigin/uAssets/issues/4083#issuecomment-436914727
  const rawToPlainStr = function (s, anchor) {
    if (
      anchor === 0
      && s.charCodeAt(0) === 0x2f
      /* '/' */ && s.length > 2
      && s.charCodeAt(s.length - 1) === 0x2f /* '/' */
    ) {
      s += '*';
    }
    return s;
  };

  const filterDataSerialize = CompiledLineIO.serialize;

  const toLogDataInternal = function (categoryBits, tokenHash, filter) {
    if (filter === null) {
      return undefined;
    }
    const logData = filter.logData();
    logData.compiled = filterDataSerialize([categoryBits, tokenHash, logData.compiled]);
    if (categoryBits & 0x001) {
      logData.raw = `@@${logData.raw}`;
    }
    const opts = [];
    if (categoryBits & 0x002) {
      opts.push('important');
    }
    if (categoryBits & 0x008) {
      opts.push('third-party');
    } else if (categoryBits & 0x004) {
      opts.push('first-party');
    }
    const type = categoryBits & 0x1f0;
    if (type !== 0 && type !== typeNameToTypeValue.data) {
      opts.push(typeValueToTypeName[type >>> 4]);
    }
    if (logData.opts !== undefined) {
      opts.push(logData.opts);
    }
    if (opts.length !== 0) {
      logData.raw += `$${opts.join(',')}`;
    }
    return logData;
  };

  // First character of match must be within the hostname part of the url.
  const isHnAnchored = function (url, matchStart) {
    let hnStart = url.indexOf('://');
    if (hnStart === -1) {
      return false;
    }
    hnStart += 3;
    if (matchStart <= hnStart) {
      return true;
    }
    if (reURLPostHostnameAnchors.test(url.slice(hnStart, matchStart))) {
      return false;
    }
    // https://github.com/gorhill/uBlock/issues/1929
    // Match only hostname label boundaries.
    return url.charCodeAt(matchStart - 1) === 0x2e;
  };

  const reURLPostHostnameAnchors = /[\/?#]/;

  const arrayStrictEquals = function (a, b) {
    const n = a.length;
    if (n !== b.length) {
      return false;
    }
    let isArray;
    let x;
    let y;
    for (let i = 0; i < n; i++) {
      x = a[i];
      y = b[i];
      isArray = Array.isArray(x);
      if (isArray !== Array.isArray(y)) {
        return false;
      }
      if (isArray === true) {
        if (arrayStrictEquals(x, y) === false) {
          return false;
        }
      } else if (x !== y) {
        return false;
      }
    }
    return true;
  };

  /** *****************************************************************************

    Each filter class will register itself in the map. A filter class
    id MUST always stringify to ONE single character.

    IMPORTANT: any change which modifies the mapping will have to be
    reflected with µBlock.systemSettings.compiledMagic.

* */

  const filterClasses = [];
  let filterClassIdGenerator = 0;

  const registerFilterClass = function (ctor) {
    const fid = filterClassIdGenerator++;
    ctor.fid = ctor.prototype.fid = fid;
    filterClasses[fid] = ctor;
  };

  const filterFromCompiledData = function (args) {
    return filterClasses[args[0]].load(args);
  };

  /** *************************************************************************** */

  const FilterTrue = function () {};

  FilterTrue.prototype.match = function () {
    return true;
  };

  FilterTrue.prototype.logData = function () {
    return {
      raw: '*',
      regex: '^',
      compiled: this.compile(),
    };
  };

  FilterTrue.prototype.compile = function () {
    return [this.fid];
  };

  FilterTrue.compile = function () {
    return [FilterTrue.fid];
  };

  FilterTrue.load = function () {
    return new FilterTrue();
  };

  registerFilterClass(FilterTrue);

  /** *************************************************************************** */

  const FilterPlain = function (s, tokenBeg) {
    this.s = s;
    this.tokenBeg = tokenBeg;
  };

  FilterPlain.prototype.match = function (url, tokenBeg) {
    return url.startsWith(this.s, tokenBeg - this.tokenBeg);
  };

  FilterPlain.prototype.logData = function () {
    return {
      raw: rawToPlainStr(this.s, 0),
      regex: rawToRegexStr(this.s, 0),
      compiled: this.compile(),
    };
  };

  FilterPlain.prototype.compile = function () {
    return [this.fid, this.s, this.tokenBeg];
  };

  FilterPlain.compile = function (details) {
    return [FilterPlain.fid, details.f, details.tokenBeg];
  };

  FilterPlain.load = function (args) {
    return new FilterPlain(args[1], args[2]);
  };

  registerFilterClass(FilterPlain);

  /** *************************************************************************** */

  const FilterPlainPrefix0 = function (s) {
    this.s = s;
  };

  FilterPlainPrefix0.prototype.match = function (url, tokenBeg) {
    return url.startsWith(this.s, tokenBeg);
  };

  FilterPlainPrefix0.prototype.logData = function () {
    return {
      raw: this.s,
      regex: rawToRegexStr(this.s, 0),
      compiled: this.compile(),
    };
  };

  FilterPlainPrefix0.prototype.compile = function () {
    return [this.fid, this.s];
  };

  FilterPlainPrefix0.compile = function (details) {
    return [FilterPlainPrefix0.fid, details.f];
  };

  FilterPlainPrefix0.load = function (args) {
    return new FilterPlainPrefix0(args[1]);
  };

  registerFilterClass(FilterPlainPrefix0);

  /** *************************************************************************** */

  const FilterPlainPrefix1 = function (s) {
    this.s = s;
  };

  FilterPlainPrefix1.prototype.match = function (url, tokenBeg) {
    return url.startsWith(this.s, tokenBeg - 1);
  };

  FilterPlainPrefix1.prototype.logData = function () {
    return {
      raw: rawToPlainStr(this.s, 0),
      regex: rawToRegexStr(this.s, 0),
      compiled: this.compile(),
    };
  };

  FilterPlainPrefix1.prototype.compile = function () {
    return [this.fid, this.s];
  };

  FilterPlainPrefix1.compile = function (details) {
    return [FilterPlainPrefix1.fid, details.f];
  };

  FilterPlainPrefix1.load = function (args) {
    return new FilterPlainPrefix1(args[1]);
  };

  registerFilterClass(FilterPlainPrefix1);

  /** *************************************************************************** */

  const FilterPlainHostname = function (s) {
    this.s = s;
  };

  FilterPlainHostname.prototype.match = function () {
    const haystack = requestHostnameRegister;

    const needle = this.s;
    if (haystack.endsWith(needle) === false) {
      return false;
    }
    const offset = haystack.length - needle.length;
    return offset === 0 || haystack.charCodeAt(offset - 1) === 0x2e;
  };

  FilterPlainHostname.prototype.logData = function () {
    return {
      raw: `||${this.s}^`,
      regex: rawToRegexStr(`${this.s}^`, 0),
      compiled: this.compile(),
    };
  };

  FilterPlainHostname.prototype.compile = function () {
    return [this.fid, this.s];
  };

  FilterPlainHostname.compile = function (details) {
    return [FilterPlainHostname.fid, details.f];
  };

  FilterPlainHostname.load = function (args) {
    return new FilterPlainHostname(args[1]);
  };

  registerFilterClass(FilterPlainHostname);

  /** *************************************************************************** */

  const FilterPlainLeftAnchored = function (s) {
    this.s = s;
  };

  FilterPlainLeftAnchored.prototype.match = function (url) {
    return url.startsWith(this.s);
  };

  FilterPlainLeftAnchored.prototype.logData = function () {
    return {
      raw: `|${this.s}`,
      regex: rawToRegexStr(this.s, 0b010),
      compiled: this.compile(),
    };
  };

  FilterPlainLeftAnchored.prototype.compile = function () {
    return [this.fid, this.s];
  };

  FilterPlainLeftAnchored.compile = function (details) {
    return [FilterPlainLeftAnchored.fid, details.f];
  };

  FilterPlainLeftAnchored.load = function (args) {
    return new FilterPlainLeftAnchored(args[1]);
  };

  registerFilterClass(FilterPlainLeftAnchored);

  /** *************************************************************************** */

  const FilterPlainRightAnchored = function (s) {
    this.s = s;
  };

  FilterPlainRightAnchored.prototype.match = function (url) {
    return url.endsWith(this.s);
  };

  FilterPlainRightAnchored.prototype.logData = function () {
    return {
      raw: `${this.s}|`,
      regex: rawToRegexStr(this.s, 0b001),
      compiled: this.compile(),
    };
  };

  FilterPlainRightAnchored.prototype.compile = function () {
    return [this.fid, this.s];
  };

  FilterPlainRightAnchored.compile = function (details) {
    return [FilterPlainRightAnchored.fid, details.f];
  };

  FilterPlainRightAnchored.load = function (args) {
    return new FilterPlainRightAnchored(args[1]);
  };

  registerFilterClass(FilterPlainRightAnchored);

  /** *************************************************************************** */

  const FilterExactMatch = function (s) {
    this.s = s;
  };

  FilterExactMatch.prototype.match = function (url) {
    return url === this.s;
  };

  FilterExactMatch.prototype.logData = function () {
    return {
      raw: `|${this.s}|`,
      regex: rawToRegexStr(this.s, 0b011),
      compiled: this.compile(),
    };
  };

  FilterExactMatch.prototype.compile = function () {
    return [this.fid, this.s];
  };

  FilterExactMatch.compile = function (details) {
    return [FilterExactMatch.fid, details.f];
  };

  FilterExactMatch.load = function (args) {
    return new FilterExactMatch(args[1]);
  };

  registerFilterClass(FilterExactMatch);

  /** *************************************************************************** */

  const FilterPlainHnAnchored = function (s) {
    this.s = s;
  };

  FilterPlainHnAnchored.prototype.match = function (url, tokenBeg) {
    return url.startsWith(this.s, tokenBeg) && isHnAnchored(url, tokenBeg);
  };

  FilterPlainHnAnchored.prototype.logData = function () {
    return {
      raw: `||${this.s}`,
      regex: rawToRegexStr(this.s, 0),
      compiled: this.compile(),
    };
  };

  FilterPlainHnAnchored.prototype.compile = function () {
    return [this.fid, this.s];
  };

  FilterPlainHnAnchored.compile = function (details) {
    return [FilterPlainHnAnchored.fid, details.f];
  };

  FilterPlainHnAnchored.load = function (args) {
    return new FilterPlainHnAnchored(args[1]);
  };

  registerFilterClass(FilterPlainHnAnchored);

  /** *************************************************************************** */

  const FilterGeneric = function (s, anchor) {
    this.s = s;
    this.anchor = anchor;
  };

  FilterGeneric.prototype.re = null;

  FilterGeneric.prototype.match = function (url) {
    if (this.re === null) {
      this.re = new RegExp(rawToRegexStr(this.s, this.anchor));
    }
    return this.re.test(url);
  };

  FilterGeneric.prototype.logData = function () {
    const out = {
      raw: rawToPlainStr(this.s, this.anchor),
      regex: this.re.source,
      compiled: this.compile(),
    };
    if (this.anchor & 0x2) {
      out.raw = `|${out.raw}`;
    }
    if (this.anchor & 0x1) {
      out.raw += '|';
    }
    return out;
  };

  FilterGeneric.prototype.compile = function () {
    return [this.fid, this.s, this.anchor];
  };

  FilterGeneric.compile = function (details) {
    return [FilterGeneric.fid, details.f, details.anchor];
  };

  FilterGeneric.load = function (args) {
    return new FilterGeneric(args[1], args[2]);
  };

  registerFilterClass(FilterGeneric);

  /** *************************************************************************** */

  const FilterGenericHnAnchored = function (s) {
    this.s = s;
  };

  FilterGenericHnAnchored.prototype.re = null;
  FilterGenericHnAnchored.prototype.anchor = 0x4;

  FilterGenericHnAnchored.prototype.match = function (url) {
    if (this.re === null) {
      this.re = new RegExp(rawToRegexStr(this.s, this.anchor));
    }
    return this.re.test(url);
  };

  FilterGenericHnAnchored.prototype.logData = function () {
    const out = {
      raw: `||${this.s}`,
      regex: rawToRegexStr(this.s, this.anchor & 0b001),
      compiled: this.compile(),
    };
    return out;
  };

  FilterGenericHnAnchored.prototype.compile = function () {
    return [this.fid, this.s];
  };

  FilterGenericHnAnchored.compile = function (details) {
    return [FilterGenericHnAnchored.fid, details.f];
  };

  FilterGenericHnAnchored.load = function (args) {
    return new FilterGenericHnAnchored(args[1]);
  };

  registerFilterClass(FilterGenericHnAnchored);

  /** *************************************************************************** */

  const FilterGenericHnAndRightAnchored = function (s) {
    FilterGenericHnAnchored.call(this, s);
  };

  FilterGenericHnAndRightAnchored.prototype = Object.create(FilterGenericHnAnchored.prototype, {
    constructor: {
      value: FilterGenericHnAndRightAnchored,
    },
    anchor: {
      value: 0x5,
    },
    logData: {
      value() {
        const out = FilterGenericHnAnchored.prototype.logData.call(this);
        out.raw += '|';
        return out;
      },
    },
    compile: {
      value() {
        return [this.fid, this.s];
      },
    },
  });

  FilterGenericHnAndRightAnchored.compile = function (details) {
    return [FilterGenericHnAndRightAnchored.fid, details.f];
  };

  FilterGenericHnAndRightAnchored.load = function (args) {
    return new FilterGenericHnAndRightAnchored(args[1]);
  };

  registerFilterClass(FilterGenericHnAndRightAnchored);

  /** *************************************************************************** */

  const FilterRegex = function (s) {
    this.re = s;
  };

  FilterRegex.prototype.match = function (url) {
    if (typeof this.re === 'string') {
      this.re = new RegExp(this.re, 'i');
    }
    return this.re.test(url);
  };

  FilterRegex.prototype.logData = function () {
    const s = typeof this.re === 'string' ? this.re : this.re.source;
    return {
      raw: `/${s}/`,
      regex: s,
      compiled: this.compile(),
    };
  };

  FilterRegex.prototype.compile = function () {
    return [this.fid, typeof this.re === 'string' ? this.re : this.re.source];
  };

  FilterRegex.compile = function (details) {
    return [FilterRegex.fid, details.f];
  };

  FilterRegex.load = function (args) {
    return new FilterRegex(args[1]);
  };

  registerFilterClass(FilterRegex);

  /** *************************************************************************** */

  // Filtering according to the origin.

  const FilterOrigin = function () {};

  FilterOrigin.prototype = {
    wrapped: {
      compile() {
        return '';
      },
      logData() {
        return {
          compiled: '',
        };
      },
      match() {
        return true;
      },
    },
    matchOrigin() {
      return true;
    },
    match(url, tokenBeg) {
      return this.matchOrigin() && this.wrapped.match(url, tokenBeg);
    },
    logData() {
      const out = this.wrapped.logData();
      const domainOpt = this.toDomainOpt();
      out.compiled = [this.fid, domainOpt, out.compiled];
      if (out.opts === undefined) {
        out.opts = `domain=${domainOpt}`;
      } else {
        out.opts += `,domain=${domainOpt}`;
      }
      return out;
    },
    compile() {
      return [this.fid, this.toDomainOpt(), this.wrapped.compile()];
    },
  };

  // *** start of specialized origin matchers

  const FilterOriginHit = function (domainOpt) {
    FilterOrigin.call(this);
    this.hostname = domainOpt;
  };

  FilterOriginHit.prototype = Object.create(FilterOrigin.prototype, {
    constructor: {
      value: FilterOriginHit,
    },
    toDomainOpt: {
      value() {
        return this.hostname;
      },
    },
    matchOrigin: {
      value() {
        const needle = this.hostname;

        const haystack = pageHostnameRegister;
        if (haystack.endsWith(needle) === false) {
          return false;
        }
        const offset = haystack.length - needle.length;
        return offset === 0 || haystack.charCodeAt(offset - 1) === 0x2e;
      },
    },
  });

  //

  const FilterOriginMiss = function (domainOpt) {
    FilterOrigin.call(this);
    this.hostname = domainOpt.slice(1);
  };

  FilterOriginMiss.prototype = Object.create(FilterOrigin.prototype, {
    constructor: {
      value: FilterOriginMiss,
    },
    toDomainOpt: {
      value() {
        return `~${this.hostname}`;
      },
    },
    matchOrigin: {
      value() {
        const needle = this.hostname;

        const haystack = pageHostnameRegister;
        if (haystack.endsWith(needle) === false) {
          return true;
        }
        const offset = haystack.length - needle.length;
        return offset !== 0 && haystack.charCodeAt(offset - 1) !== 0x2e;
      },
    },
  });

  //

  const FilterOriginHitSet = function (domainOpt) {
    FilterOrigin.call(this);
    this.domainOpt = domainOpt.length < 128 ? domainOpt : stringDeduplicater.lookup(domainOpt);
  };

  FilterOriginHitSet.prototype = Object.create(FilterOrigin.prototype, {
    constructor: {
      value: FilterOriginHitSet,
    },
    oneOf: {
      value: null,
      writable: true,
    },
    toDomainOpt: {
      value() {
        return this.domainOpt;
      },
    },
    matchOrigin: {
      value() {
        if (this.oneOf === null) {
          this.oneOf = FilterOrigin.trieContainer.fromIterable(this.domainOpt.split('|'));
        }
        return this.oneOf.matches(pageHostnameRegister) !== -1;
      },
    },
  });

  //

  const FilterOriginMissSet = function (domainOpt) {
    FilterOrigin.call(this);
    this.domainOpt = domainOpt.length < 128 ? domainOpt : stringDeduplicater.lookup(domainOpt);
  };

  FilterOriginMissSet.prototype = Object.create(FilterOrigin.prototype, {
    constructor: {
      value: FilterOriginMissSet,
    },
    noneOf: {
      value: null,
      writable: true,
    },
    toDomainOpt: {
      value() {
        return this.domainOpt;
      },
    },
    matchOrigin: {
      value() {
        if (this.noneOf === null) {
          this.noneOf = FilterOrigin.trieContainer.fromIterable(
            this.domainOpt.replace(/~/g, '').split('|'),
          );
        }
        return this.noneOf.matches(pageHostnameRegister) === -1;
      },
    },
  });

  //

  const FilterOriginMixedSet = function (domainOpt) {
    FilterOrigin.call(this);
    this.domainOpt = domainOpt.length < 128 ? domainOpt : stringDeduplicater.lookup(domainOpt);
  };

  FilterOriginMixedSet.prototype = Object.create(FilterOrigin.prototype, {
    constructor: {
      value: FilterOriginMixedSet,
    },
    oneOf: {
      value: null,
      writable: true,
    },
    noneOf: {
      value: null,
      writable: true,
    },
    init: {
      value() {
        const oneOf = [];

        const noneOf = [];
        for (const hostname of this.domainOpt.split('|')) {
          if (hostname.charCodeAt(0) === 0x7e /* '~' */) {
            noneOf.push(hostname.slice(1));
          } else {
            oneOf.push(hostname);
          }
        }
        this.oneOf = FilterOrigin.trieContainer.fromIterable(oneOf);
        this.noneOf = FilterOrigin.trieContainer.fromIterable(noneOf);
      },
    },
    toDomainOpt: {
      value() {
        return this.domainOpt;
      },
    },
    matchOrigin: {
      value() {
        if (this.oneOf === null) {
          this.init();
        }
        const needle = pageHostnameRegister;
        return this.oneOf.matches(needle) !== -1 && this.noneOf.matches(needle) === -1;
      },
    },
  });

  // *** end of specialized origin matchers

  // The optimal test function is picked according to the content of the
  // `domain=` filter option.
  // Re-factored in light of:
  // - https://gorhill.github.io/obj-vs-set-vs-map/set-vs-regexp.html
  // The re-factoring made possible to reuse instances of a matcher. As of
  // writing, I observed that just with EasyList, there were ~1,200 reused
  // instances out of ~2,800.

  FilterOrigin.matcherFactory = function (domainOpt) {
    // One hostname
    if (domainOpt.indexOf('|') === -1) {
      if (domainOpt.charCodeAt(0) === 0x7e /* '~' */) {
        return new FilterOriginMiss(domainOpt);
      }
      return new FilterOriginHit(domainOpt);
    }
    // Many hostnames.
    // Must be in set (none negated).
    if (domainOpt.indexOf('~') === -1) {
      return new FilterOriginHitSet(domainOpt);
    }
    // Must not be in set (all negated).
    if (FilterOrigin.reAllNegated.test(domainOpt)) {
      return new FilterOriginMissSet(domainOpt);
    }
    // Must be in one set, but not in the other.
    return new FilterOriginMixedSet(domainOpt);
  };

  FilterOrigin.reAllNegated = /^~(?:[^|~]+\|~)+[^|~]+$/;

  FilterOrigin.compile = function (details) {
    return [FilterOrigin.fid, details.domainOpt];
  };

  FilterOrigin.load = function (args) {
    const f = FilterOrigin.matcherFactory(args[1]);
    f.wrapped = filterFromCompiledData(args[2]);
    return f;
  };

  FilterOrigin.trieContainer = (function () {
    let trieDetails;
    // CLIQZ: disable
    // try {
    //   trieDetails = JSON.parse(vAPI.localStorage.getItem('FilterOrigin.trieDetails'));
    // } catch (ex) {}
    return new HNTrieContainer(trieDetails);
  }());

  FilterOrigin.readyToUse = function () {
    return FilterOrigin.trieContainer.readyToUse();
  };

  FilterOrigin.reset = function () {
    return FilterOrigin.trieContainer.reset();
  };

  FilterOrigin.optimize = function () {
    FilterOrigin.trieContainer.optimize();
  };

  registerFilterClass(FilterOrigin);

  /** *************************************************************************** */

  const FilterDataHolder = function (dataType, dataStr) {
    this.dataType = dataType;
    this.dataStr = dataStr;
    this.wrapped = undefined;
  };

  FilterDataHolder.prototype.match = function (url, tokenBeg) {
    return this.wrapped.match(url, tokenBeg);
  };

  FilterDataHolder.prototype.logData = function () {
    const out = this.wrapped.logData();
    out.compiled = [this.fid, this.dataType, this.dataStr, out.compiled];
    let opt = this.dataType;
    if (this.dataStr !== '') {
      opt += `=${this.dataStr}`;
    }
    if (out.opts === undefined) {
      out.opts = opt;
    } else {
      out.opts = `${opt},${out.opts}`;
    }
    return out;
  };

  FilterDataHolder.prototype.compile = function () {
    return [this.fid, this.dataType, this.dataStr, this.wrapped.compile()];
  };

  FilterDataHolder.compile = function (details) {
    return [FilterDataHolder.fid, details.dataType, details.dataStr];
  };

  FilterDataHolder.load = function (args) {
    const f = new FilterDataHolder(args[1], args[2]);
    f.wrapped = filterFromCompiledData(args[3]);
    return f;
  };

  registerFilterClass(FilterDataHolder);

  // Helper class for storing instances of FilterDataHolder.

  const FilterDataHolderEntry = function (categoryBits, tokenHash, fdata) {
    this.categoryBits = categoryBits;
    this.tokenHash = tokenHash;
    this.filter = filterFromCompiledData(fdata);
    this.next = undefined;
  };

  FilterDataHolderEntry.prototype.logData = function () {
    return toLogDataInternal(this.categoryBits, this.tokenHash, this.filter);
  };

  FilterDataHolderEntry.prototype.compile = function () {
    return [this.categoryBits, this.tokenHash, this.filter.compile()];
  };

  FilterDataHolderEntry.load = function (data) {
    return new FilterDataHolderEntry(data[0], data[1], data[2]);
  };

  /** *************************************************************************** */

  // Dictionary of hostnames

  const FilterHostnameDict = function (args) {
    this.h = ''; // short-lived register
    this.dict = FilterHostnameDict.trieContainer.createOne(args);
  };

  FilterHostnameDict.prototype = {
    get size() {
      return this.dict.size;
    },
    add(hn) {
      return this.dict.add(hn);
    },
    match() {
      const pos = this.dict.matches(requestHostnameRegister);
      if (pos === -1) {
        return false;
      }
      this.h = requestHostnameRegister.slice(pos);
      return true;
    },
    logData() {
      return {
        raw: `||${this.h}^`,
        regex: `${rawToRegexStr(this.h, 0)}(?:[^%.0-9a-z_-]|$)`,
        compiled: this.h,
      };
    },
    compile() {
      return [this.fid, FilterHostnameDict.trieContainer.compileOne(this.dict)];
    },
  };

  FilterHostnameDict.trieContainer = (function () {
    let trieDetails;
    // CLIQZ: disable
    // try {
    //   trieDetails = JSON.parse(vAPI.localStorage.getItem('FilterHostnameDict.trieDetails'));
    // } catch (ex) {}
    return new HNTrieContainer(trieDetails);
  }());

  FilterHostnameDict.readyToUse = function () {
    return FilterHostnameDict.trieContainer.readyToUse();
  };

  FilterHostnameDict.reset = function () {
    return FilterHostnameDict.trieContainer.reset();
  };

  FilterHostnameDict.optimize = function () {
    FilterHostnameDict.trieContainer.optimize();
    // CLIQZ: disable
    // vAPI.localStorage.setItem('FilterHostnameDict.trieDetails', JSON.stringify(trieDetails));
  };

  FilterHostnameDict.load = function (args) {
    return new FilterHostnameDict(args[1]);
  };

  registerFilterClass(FilterHostnameDict);

  /** *************************************************************************** */

  // Some buckets can grow quite large, and finding a hit in these buckets
  // may end up being expensive. After considering various solutions, the one
  // retained is to promote hit filters to a smaller index, so that next time
  // they can be looked-up faster.

  // key=  10000 ad           count=660
  // key=  10000 ads          count=433
  // key=  10001 google       count=277
  // key=1000000 2mdn         count=267
  // key=  10000 social       count=240
  // key=  10001 pagead2      count=166
  // key=  10000 twitter      count=122
  // key=  10000 doubleclick  count=118
  // key=  10000 facebook     count=114
  // key=  10000 share        count=113
  // key=  10000 google       count=106
  // key=  10001 code         count=103
  // key=  11000 doubleclick  count=100
  // key=1010001 g            count=100
  // key=  10001 js           count= 89
  // key=  10000 adv          count= 88
  // key=  10000 youtube      count= 61
  // key=  10000 plugins      count= 60
  // key=  10001 partner      count= 59
  // key=  10000 ico          count= 57
  // key= 110001 ssl          count= 57
  // key=  10000 banner       count= 53
  // key=  10000 footer       count= 51
  // key=  10000 rss          count= 51

  /** *************************************************************************** */

  const FilterPair = function (a, b) {
    this.f1 = a;
    this.f2 = b;
    this.f = null;
  };

  Object.defineProperty(FilterPair.prototype, 'size', {
    get() {
      if (this.f1 === undefined && this.f2 === undefined) {
        return 0;
      }
      if (this.f1 === undefined || this.f2 === undefined) {
        return 1;
      }
      return 2;
    },
  });

  FilterPair.prototype.remove = function (fdata) {
    if (arrayStrictEquals(this.f2.compile(), fdata) === true) {
      this.f2 = undefined;
    }
    if (arrayStrictEquals(this.f1.compile(), fdata) === true) {
      this.f1 = this.f2;
    }
    // https://github.com/uBlockOrigin/uBlock-issues/issues/84
    if (this.f1 === undefined) {
      console.log(JSON.stringify(fdata));
    }
  };

  FilterPair.prototype.match = function (url, tokenBeg) {
    if (this.f1.match(url, tokenBeg) === true) {
      this.f = this.f1;
      return true;
    }
    if (this.f2.match(url, tokenBeg) === true) {
      this.f = this.f2;
      return true;
    }
    return false;
  };

  FilterPair.prototype.logData = function () {
    return this.f.logData();
  };

  FilterPair.prototype.compile = function () {
    return [this.fid, this.f1.compile(), this.f2.compile()];
  };

  FilterPair.prototype.upgrade = function (a) {
    const bucket = new FilterBucket(this.f1, this.f2, a);
    this.f1 = this.f2 = undefined;
    this.f = null;
    FilterPair.available = this;
    return bucket;
  };

  FilterPair.prototype.downgrade = function () {
    if (this.f2 !== undefined) {
      return this;
    }
    if (this.f1 !== undefined) {
      return this.f1;
    }
  };

  FilterPair.load = function (args) {
    const f1 = filterFromCompiledData(args[1]);

    const f2 = filterFromCompiledData(args[2]);

    const pair = FilterPair.available;
    if (pair === null) {
      return new FilterPair(f1, f2);
    }
    FilterPair.available = null;
    pair.f1 = f1;
    pair.f2 = f2;
    return pair;
  };

  FilterPair.available = null;

  registerFilterClass(FilterPair);

  /** *************************************************************************** */

  const FilterBucket = function (a, b, c) {
    this.filters = [];
    this.f = null;
    if (a !== undefined) {
      this.filters[0] = a;
      this.filters[1] = b;
      this.filters[2] = c;
    }
  };

  Object.defineProperty(FilterBucket.prototype, 'size', {
    get() {
      return this.filters.length;
    },
  });

  FilterBucket.prototype.promoted = 0;

  FilterBucket.prototype.add = function (fdata) {
    this.filters[this.filters.length] = filterFromCompiledData(fdata);
  };

  FilterBucket.prototype.remove = function (fdata) {
    let i = this.filters.length;

    let filter;
    while (i--) {
      filter = this.filters[i];
      if (arrayStrictEquals(filter.compile(), fdata) === true) {
        this.filters.splice(i, 1);
      }
    }
  };

  // Promote hit filters so they can be found faster next time.
  FilterBucket.prototype.promote = function (i) {
    const filters = this.filters;

    let pivot = filters.length >>> 1;
    while (i < pivot) {
      pivot >>>= 1;
      if (pivot < 16) {
        break;
      }
    }
    if (i <= pivot) {
      return;
    }
    const j = this.promoted % pivot;
    // console.debug('FilterBucket.promote(): promoted %d to %d', i, j);
    const f = filters[j];
    filters[j] = filters[i];
    filters[i] = f;
    this.promoted += 1;
  };

  FilterBucket.prototype.match = function (url, tokenBeg) {
    const filters = this.filters;
    for (let i = 0, n = filters.length; i < n; i++) {
      if (filters[i].match(url, tokenBeg) === true) {
        this.f = filters[i];
        if (i >= 16) {
          this.promote(i);
        }
        return true;
      }
    }
    return false;
  };

  FilterBucket.prototype.logData = function () {
    return this.f.logData();
  };

  FilterBucket.prototype.compile = function () {
    const compiled = [];

    const filters = this.filters;
    for (let i = 0, n = filters.length; i < n; i++) {
      compiled[i] = filters[i].compile();
    }
    return [this.fid, compiled];
  };

  FilterBucket.prototype.downgrade = function () {
    if (this.filters.length > 2) {
      return this;
    }
    if (this.filters.length === 2) {
      return new FilterPair(this.filters[0], this.filters[1]);
    }
    if (this.filters.length === 1) {
      return this.filters[0];
    }
  };

  FilterBucket.load = function (args) {
    const bucket = new FilterBucket();

    const compiledFilters = args[1];

    const filters = bucket.filters;
    for (let i = 0, n = compiledFilters.length; i < n; i++) {
      filters[i] = filterFromCompiledData(compiledFilters[i]);
    }
    return bucket;
  };

  registerFilterClass(FilterBucket);

  /** *************************************************************************** */
  /** *************************************************************************** */

  const FilterParser = function () {
    this.cantWebsocket = false; // CLIQZ: vAPI.cantWebsocket;
    this.reBadDomainOptChars = /[*+?^${}()[\]\\]/;
    this.reHostnameRule1 = /^[0-9a-z][0-9a-z.-]*[0-9a-z]$/i;
    this.reHostnameRule2 = /^[0-9a-z][0-9a-z.-]*[0-9a-z]\^?$/i;
    this.reCleanupHostnameRule2 = /\^$/g;
    this.reCanTrimCarets1 = /^[^*]*$/;
    this.reCanTrimCarets2 = /^\^?[^^]+[^^][^^]+\^?$/;
    this.reHasUppercase = /[A-Z]/;
    this.reIsolateHostname = /^(\*?\.)?([^\x00-\x24\x26-\x2C\x2F\x3A-\x5E\x60\x7B-\x7F]+)(.*)/;
    this.reHasUnicode = /[^\x00-\x7F]/;
    this.reWebsocketAny = /^ws[s*]?(?::\/?\/?)?\*?$/;
    this.reBadCSP = /(?:^|;)\s*report-(?:to|uri)\b/;
    this.domainOpt = '';
    this.noTokenHash = urlTokenizer.tokenHashFromString('*');
    this.unsupportedTypeBit = this.bitFromType('unsupported');
    // All network request types to bitmap
    //   bring origin to 0 (from 4 -- see typeNameToTypeValue)
    //   left-shift 1 by the above-calculated value
    //   subtract 1 to set all type bits
    this.allNetRequestTypeBits = (1 << (otherTypeBitValue >>> 4)) - 1;
    this.reset();
  };

  /** *************************************************************************** */

  // https://github.com/gorhill/uBlock/issues/1493
  //   Transpose `ping` into `other` for now.

  FilterParser.prototype.toNormalizedType = {
    beacon: 'other',
    css: 'stylesheet',
    data: 'data',
    doc: 'main_frame',
    document: 'main_frame',
    elemhide: 'generichide',
    font: 'font',
    frame: 'sub_frame',
    genericblock: 'unsupported',
    generichide: 'generichide',
    image: 'image',
    'inline-font': 'inline-font',
    'inline-script': 'inline-script',
    media: 'media',
    object: 'object',
    'object-subrequest': 'object',
    other: 'other',
    ping: 'other',
    popunder: 'popunder',
    popup: 'popup',
    script: 'script',
    stylesheet: 'stylesheet',
    subdocument: 'sub_frame',
    xhr: 'xmlhttprequest',
    xmlhttprequest: 'xmlhttprequest',
    webrtc: 'unsupported',
    websocket: 'websocket',
  };

  /** *************************************************************************** */

  FilterParser.prototype.reset = function () {
    this.action = BlockAction;
    this.anchor = 0;
    this.badFilter = false;
    this.dataType = undefined;
    this.dataStr = undefined;
    this.elemHiding = false;
    this.f = '';
    this.firstParty = false;
    this.thirdParty = false;
    this.party = AnyParty;
    this.fopts = '';
    this.hostnamePure = false;
    this.domainOpt = '';
    this.isRegex = false;
    this.raw = '';
    this.redirect = false;
    this.token = '*';
    this.tokenHash = this.noTokenHash;
    this.tokenBeg = 0;
    this.types = 0;
    this.important = 0;
    this.unsupported = false;
    return this;
  };

  /** *************************************************************************** */

  FilterParser.prototype.bitFromType = function (type) {
    return 1 << ((typeNameToTypeValue[type] >>> 4) - 1);
  };

  /** *************************************************************************** */

  // https://github.com/chrisaljoudi/uBlock/issues/589
  // Be ready to handle multiple negated types

  FilterParser.prototype.parseTypeOption = function (raw, not) {
    const typeBit = this.bitFromType(this.toNormalizedType[raw]);

    if (!not) {
      this.types |= typeBit;
      return;
    }

    // Non-discrete network types can't be negated.
    if ((typeBit & this.allNetRequestTypeBits) === 0) {
      return;
    }

    // Negated type: set all valid network request type bits to 1
    if (
      (typeBit & this.allNetRequestTypeBits) !== 0
      && (this.types & this.allNetRequestTypeBits) === 0
    ) {
      this.types |= this.allNetRequestTypeBits;
    }
    this.types &= ~typeBit;
  };

  /** *************************************************************************** */

  FilterParser.prototype.parsePartyOption = function (firstParty, not) {
    if (firstParty) {
      not = !not;
    }
    if (not) {
      this.firstParty = true;
      this.party = this.thirdParty ? AnyParty : FirstParty;
    } else {
      this.thirdParty = true;
      this.party = this.firstParty ? AnyParty : ThirdParty;
    }
  };

  /** *************************************************************************** */

  FilterParser.prototype.parseDomainOption = function (s) {
    if (this.reHasUnicode.test(s)) {
      const hostnames = s.split('|');

      let i = hostnames.length;
      while (i--) {
        if (this.reHasUnicode.test(hostnames[i])) {
          hostnames[i] = punycode.toASCII(hostnames[i]);
        }
      }
      s = hostnames.join('|');
    }
    if (this.reBadDomainOptChars.test(s)) {
      return '';
    }
    return s;
  };

  /** *************************************************************************** */

  FilterParser.prototype.parseOptions = function (s) {
    this.fopts = s;
    const opts = s.split(',');
    let opt;
    let not;
    for (let i = 0; i < opts.length; i++) {
      opt = opts[i];
      not = opt.startsWith('~');
      if (not) {
        opt = opt.slice(1);
      }
      if (opt === 'third-party' || opt === '3p') {
        this.parsePartyOption(false, not);
        continue;
      }
      // https://issues.adblockplus.org/ticket/616
      // `generichide` concept already supported, just a matter of
      // adding support for the new keyword.
      if (opt === 'elemhide' || opt === 'generichide') {
        if (not === false) {
          this.parseTypeOption('generichide', false);
          continue;
        }
        this.unsupported = true;
        break;
      }
      // Test before handling all other types.
      if (opt.startsWith('redirect=')) {
        if (this.action === BlockAction) {
          this.redirect = true;
          continue;
        }
        this.unsupported = true;
        break;
      }
      if (this.toNormalizedType.hasOwnProperty(opt)) {
        this.parseTypeOption(opt, not);
        continue;
      }
      // https://github.com/gorhill/uBlock/issues/2294
      // Detect and discard filter if domain option contains nonsensical
      // characters.
      if (opt.startsWith('domain=')) {
        this.domainOpt = this.parseDomainOption(opt.slice(7));
        if (this.domainOpt === '') {
          this.unsupported = true;
          break;
        }
        continue;
      }
      if (opt === 'important') {
        this.important = Important;
        continue;
      }
      if (opt === 'first-party' || opt === '1p') {
        this.parsePartyOption(true, not);
        continue;
      }
      if (opt.startsWith('csp=')) {
        if (opt.length > 4 && this.reBadCSP.test(opt) === false) {
          this.parseTypeOption('data', not);
          this.dataType = 'csp';
          this.dataStr = opt.slice(4).trim();
        }
        continue;
      }
      if (opt === 'csp' && this.action === AllowAction) {
        this.parseTypeOption('data', not);
        this.dataType = 'csp';
        this.dataStr = '';
        continue;
      }
      // Used by Adguard, purpose is unclear -- just ignore for now.
      if (opt === 'empty') {
        continue;
      }
      // https://github.com/uBlockOrigin/uAssets/issues/192
      if (opt === 'badfilter') {
        this.badFilter = true;
        continue;
      }
      // Unrecognized filter option: ignore whole filter.
      this.unsupported = true;
      break;
    }
  };

  /** *************************************************************************** */

  // https://github.com/gorhill/uBlock/issues/1943#issuecomment-243188946
  //   Convert websocket-related filter where possible to a format which
  //   can be handled using CSP injection.

  FilterParser.prototype.translate = function () {
    const dataTypeBit = this.bitFromType('data');

    if (this.cantWebsocket && this.reWebsocketAny.test(this.f)) {
      this.f = '*';
      this.types = dataTypeBit;
      this.dataType = 'csp';
      this.dataStr = 'connect-src https: http:';
      // https://bugs.chromium.org/p/chromium/issues/detail?id=669086
      // TODO: remove when most users are beyond Chromium v56
      // if (vAPI.webextFlavor.soup.has('chromium') && vAPI.webextFlavor.major < 57) {
      // CLIQZ: disable
      this.dataStr += '; frame-src *';
      return;
    }

    // Broad |data:-based filters.
    if (this.f === 'data:') {
      switch (this.types) {
        case 0:
          this.f = '*';
          this.types = dataTypeBit;
          this.dataType = 'csp';
          this.dataStr = "default-src 'self' * blob: 'unsafe-inline' 'unsafe-eval'";
          break;
        case this.bitFromType('script'):
          this.f = '*';
          this.types = dataTypeBit;
          this.dataType = 'csp';
          this.dataStr = "script-src 'self' * blob: 'unsafe-inline' 'unsafe-eval'";
          break;
        case this.bitFromType('sub_frame'):
          this.f = '*';
          this.types = dataTypeBit;
          this.dataType = 'csp';
          this.dataStr = "frame-src 'self' * blob:";
          break;
        case this.bitFromType('script') | this.bitFromType('sub_frame'):
          this.f = '*';
          this.types = dataTypeBit;
          this.dataType = 'csp';
          this.dataStr = "frame-src 'self' * blob:; script-src 'self' * blob: 'unsafe-inline' 'unsafe-eval';";
          break;
        default:
          break;
      }
    }

    // Broad |blob:-based filters.
    if (this.f === 'blob:') {
      switch (this.types) {
        case 0:
          this.f = '*';
          this.types = dataTypeBit;
          this.dataType = 'csp';
          this.dataStr = "default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'";
          break;
        case this.bitFromType('script'):
          this.f = '*';
          this.types = dataTypeBit;
          this.dataType = 'csp';
          this.dataStr = "script-src 'self' * data: 'unsafe-inline' 'unsafe-eval'";
          break;
        case this.bitFromType('sub_frame'):
          this.f = '*';
          this.types = dataTypeBit;
          this.dataType = 'csp';
          this.dataStr = "frame-src 'self' * data:";
          break;
        case this.bitFromType('script') | this.bitFromType('sub_frame'):
          this.f = '*';
          this.types = dataTypeBit;
          this.dataType = 'csp';
          this.dataStr = "frame-src 'self' * data:; script-src 'self' * data: 'unsafe-inline' 'unsafe-eval';";
          break;
        default:
          break;
      }
    }
  };

  /** *****************************************************************************

    anchor: bit vector
        0000 (0x0): no anchoring
        0001 (0x1): anchored to the end of the URL.
        0010 (0x2): anchored to the start of the URL.
        0011 (0x3): anchored to the start and end of the URL.
        0100 (0x4): anchored to the hostname of the URL.
        0101 (0x5): anchored to the hostname and end of the URL.

* */

  FilterParser.prototype.parse = function (raw) {
    // important!
    this.reset();

    let s = (this.raw = raw);

    // plain hostname? (from HOSTS file)
    if (this.reHostnameRule1.test(s)) {
      this.f = s;
      this.hostnamePure = true;
      this.anchor |= 0x4;
      return this;
    }

    // element hiding filter?
    let pos = s.indexOf('#');
    if (pos !== -1) {
      const c = s.charAt(pos + 1);
      if (c === '#' || c === '@') {
        console.error('static-net-filtering.js > unexpected cosmetic filters');
        this.elemHiding = true;
        return this;
      }
    }

    // block or allow filter?
    // Important: this must be executed before parsing options
    if (s.startsWith('@@')) {
      this.action = AllowAction;
      s = s.slice(2);
    }

    // options
    // https://github.com/gorhill/uBlock/issues/842
    // - ensure sure we are not dealing with a regex-based filter.
    // - lookup the last occurrence of `$`.
    if (s.startsWith('/') === false || s.endsWith('/') === false) {
      pos = s.lastIndexOf('$');
      if (pos !== -1) {
        // https://github.com/gorhill/uBlock/issues/952
        //   Discard Adguard-specific `$$` filters.
        if (s.indexOf('$$') !== -1) {
          this.unsupported = true;
          return this;
        }
        this.parseOptions(s.slice(pos + 1));
        // https://github.com/gorhill/uBlock/issues/2283
        //   Abort if type is only for unsupported types, otherwise
        //   toggle off `unsupported` bit.
        if (this.types & this.unsupportedTypeBit) {
          this.types &= ~this.unsupportedTypeBit;
          if (this.types === 0) {
            this.unsupported = true;
            return this;
          }
        }
        s = s.slice(0, pos);
      }
    }

    // regex?
    if (s.startsWith('/') && s.endsWith('/') && s.length > 2) {
      this.isRegex = true;
      this.f = s.slice(1, -1);
      // https://github.com/gorhill/uBlock/issues/1246
      // If the filter is valid, use the corrected version of the source
      // string -- this ensure reverse-lookup will work fine.
      this.f = normalizeRegexSource(this.f);
      if (this.f === '') {
        console.error(
          "uBlock Origin> discarding bad regular expression-based network filter '%s': '%s'",
          raw,
          normalizeRegexSource.message,
        );
        this.unsupported = true;
      }
      return this;
    }

    // hostname-anchored
    if (s.startsWith('||')) {
      this.anchor |= 0x4;
      s = s.slice(2);

      // convert hostname to punycode if needed
      // https://github.com/gorhill/uBlock/issues/2599
      if (this.reHasUnicode.test(s)) {
        const matches = this.reIsolateHostname.exec(s);
        if (matches) {
          s = (matches[1] !== undefined ? matches[1] : '')
            + punycode.toASCII(matches[2])
            + matches[3];
          // console.debug('µBlock.staticNetFilteringEngine/FilterParser.parse():', raw, '=', s);
        }
      }

      // https://github.com/chrisaljoudi/uBlock/issues/1096
      if (s.startsWith('^')) {
        this.unsupported = true;
        return this;
      }

      // plain hostname? (from ABP filter list)
      // https://github.com/gorhill/uBlock/issues/1757
      // A filter can't be a pure-hostname one if there is a domain or csp
      // option present.
      if (this.reHostnameRule2.test(s)) {
        this.f = s.replace(this.reCleanupHostnameRule2, '');
        this.hostnamePure = true;
        return this;
      }
    }
    // left-anchored
    else if (s.startsWith('|')) {
      this.anchor |= 0x2;
      s = s.slice(1);
    }

    // right-anchored
    if (s.endsWith('|')) {
      this.anchor |= 0x1;
      s = s.slice(0, -1);
    }

    // https://github.com/gorhill/uBlock/issues/1669#issuecomment-224822448
    // remove pointless leading *.
    // https://github.com/gorhill/uBlock/issues/3034
    // - We can remove anchoring if we need to match all at the start.
    if (s.startsWith('*')) {
      s = s.replace(/^\*+([^%0-9a-z])/i, '$1');
      this.anchor &= ~0x6;
    }
    // remove pointless trailing *
    // https://github.com/gorhill/uBlock/issues/3034
    // - We can remove anchoring if we need to match all at the end.
    if (s.endsWith('*')) {
      s = s.replace(/([^%0-9a-z])\*+$/i, '$1');
      this.anchor &= ~0x1;
    }

    // nothing left?
    if (s === '') {
      s = '*';
    }

    // https://github.com/gorhill/uBlock/issues/1047
    // Hostname-anchored makes no sense if matching all requests.
    if (s === '*') {
      this.anchor = 0;
    }

    // This might look weird but we gain memory footprint by not going through
    // toLowerCase(), at least on Chromium. Because copy-on-write?

    this.f = this.reHasUppercase.test(s) ? s.toLowerCase() : s;

    // Convenience:
    //   Convert special broad filters for non-webRequest aware types into
    //   `csp` filters wherever possible.
    if (this.anchor & 0x2 && this.party === 0) {
      this.translate();
    }

    return this;
  };

  /** *************************************************************************** */

  // Given a string, find a good token. Tokens which are too generic, i.e. very
  // common with a high probability of ending up as a miss, are not
  // good. Avoid if possible. This has a *significant* positive impact on
  // performance.
  // These "bad tokens" are collated manually.

  // Hostname-anchored with no wildcard always have a token index of 0.
  const reHostnameToken = /^[0-9a-z]+/;
  const reGoodToken = /[%0-9a-z]{2,}/g;
  const reRegexToken = /[%0-9A-Za-z]{2,}/g;
  const reRegexTokenAbort = /[([]/;
  const reRegexBadPrefix = /(^|[^\\]\.|[*?{}\\])$/;
  const reRegexBadSuffix = /^([^\\]\.|\\[dw]|[([{}?*]|$)/;

  const badTokens = new Set([
    'com',
    'http',
    'https',
    'icon',
    'images',
    'img',
    'js',
    'net',
    'news',
    'www',
  ]);

  FilterParser.prototype.findFirstGoodToken = function () {
    reGoodToken.lastIndex = 0;
    const s = this.f;

    let matches;

    let lpos;

    let badTokenMatch = null;
    while ((matches = reGoodToken.exec(s)) !== null) {
      // https://github.com/gorhill/uBlock/issues/997
      // Ignore token if preceded by wildcard.
      lpos = matches.index;
      if (lpos !== 0 && s.charCodeAt(lpos - 1) === 0x2a /* '*' */) {
        continue;
      }
      if (s.charCodeAt(reGoodToken.lastIndex) === 0x2a /* '*' */) {
        continue;
      }
      if (badTokens.has(matches[0])) {
        if (badTokenMatch === null) {
          badTokenMatch = matches;
        }
        continue;
      }
      return matches;
    }
    return badTokenMatch;
  };

  FilterParser.prototype.extractTokenFromRegex = function () {
    reRegexToken.lastIndex = 0;
    const s = this.f;

    let matches;

    let prefix;
    while ((matches = reRegexToken.exec(s)) !== null) {
      prefix = s.slice(0, matches.index);
      if (reRegexTokenAbort.test(prefix)) {
        return;
      }
      if (
        reRegexBadPrefix.test(prefix)
        || reRegexBadSuffix.test(s.slice(reRegexToken.lastIndex))
      ) {
        continue;
      }
      this.token = matches[0].toLowerCase();
      this.tokenHash = urlTokenizer.tokenHashFromString(this.token);
      this.tokenBeg = matches.index;
      if (badTokens.has(this.token) === false) {
        break;
      }
    }
  };

  /** *************************************************************************** */

  // https://github.com/chrisaljoudi/uBlock/issues/1038
  // Single asterisk will match any URL.

  // https://github.com/gorhill/uBlock/issues/2781
  //   For efficiency purpose, try to extract a token from a regex-based filter.

  FilterParser.prototype.makeToken = function () {
    if (this.isRegex) {
      this.extractTokenFromRegex();
      return;
    }

    if (this.f === '*') {
      return;
    }

    let matches = null;
    if ((this.anchor & 0x4) !== 0 && this.f.indexOf('*') === -1) {
      matches = reHostnameToken.exec(this.f);
    }
    if (matches === null) {
      matches = this.findFirstGoodToken();
    }
    if (matches !== null) {
      this.token = matches[0];
      this.tokenHash = urlTokenizer.tokenHashFromString(this.token);
      this.tokenBeg = matches.index;
    }
  };

  /** *************************************************************************** */
  /** *************************************************************************** */

  const FilterContainer = function () {
    this.reIsGeneric = /[\^\*]/;
    this.filterParser = new FilterParser();
    this.urlTokenizer = urlTokenizer;
    this.noTokenHash = this.urlTokenizer.tokenHashFromString('*');
    this.dotTokenHash = this.urlTokenizer.tokenHashFromString('.');
    this.reset();
  };

  /** *************************************************************************** */

  // Reset all, thus reducing to a minimum memory footprint of the context.

  FilterContainer.prototype.reset = function () {
    this.frozen = false;
    this.processedFilterCount = 0;
    this.acceptedCount = 0;
    this.rejectedCount = 0;
    this.allowFilterCount = 0;
    this.blockFilterCount = 0;
    this.discardedCount = 0;
    this.goodFilters = new Set();
    this.badFilters = new Set();
    this.categories = new Map();
    this.dataFilters = new Map();
    this.filterParser.reset();

    // This will invalidate all hn tries throughout uBO:
    FilterOrigin.reset();
    FilterHostnameDict.reset();

    // Runtime registers
    this.cbRegister = undefined;
    this.thRegister = undefined;
    this.fRegister = null;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.freeze = function () {
    const filterPairId = FilterPair.fid;

    const filterBucketId = FilterBucket.fid;

    const filterDataHolderId = FilterDataHolder.fid;

    const redirectTypeValue = typeNameToTypeValue.redirect;

    const unserialize = CompiledLineIO.unserialize;

    for (const line of this.goodFilters) {
      if (this.badFilters.has(line)) {
        this.discardedCount += 1;
        continue;
      }

      const args = unserialize(line);
      const bits = args[0];

      // Special cases: delegate to more specialized engines.
      // Redirect engine.
      if ((bits & 0x1f0) === redirectTypeValue) {
        // CLIQZ: disable redirections
        // µb.redirectEngine.fromCompiledRule(args[1]);
        continue;
      }

      // Plain static filters.
      const tokenHash = args[1];
      const fdata = args[2];

      // Special treatment: data-holding filters are stored separately
      // because they require special matching algorithm (unlike other
      // filters, ALL hits must be reported).
      if (fdata[0] === filterDataHolderId) {
        const entry = new FilterDataHolderEntry(bits, tokenHash, fdata);
        const bucket = this.dataFilters.get(tokenHash);
        if (bucket !== undefined) {
          entry.next = bucket;
        }
        this.dataFilters.set(tokenHash, entry);
        continue;
      }

      let bucket = this.categories.get(bits);
      if (bucket === undefined) {
        bucket = new Map();
        this.categories.set(bits, bucket);
      }
      let entry = bucket.get(tokenHash);

      if (tokenHash === this.dotTokenHash) {
        if (entry === undefined) {
          entry = new FilterHostnameDict();
          bucket.set(this.dotTokenHash, entry);
        }
        entry.add(fdata);
        continue;
      }

      if (entry === undefined) {
        bucket.set(tokenHash, filterFromCompiledData(fdata));
        continue;
      }
      if (entry.fid === filterBucketId) {
        entry.add(fdata);
        continue;
      }
      if (entry.fid === filterPairId) {
        bucket.set(tokenHash, entry.upgrade(filterFromCompiledData(fdata)));
        continue;
      }
      bucket.set(tokenHash, new FilterPair(entry, filterFromCompiledData(fdata)));
    }

    this.filterParser.reset();
    this.goodFilters = new Set();
    FilterOrigin.optimize();
    FilterHostnameDict.optimize();
    this.frozen = true;
  };

  /** *************************************************************************** */

  // This is necessary for when the filtering engine readiness will depend
  // on asynchronous operations (ex.: when loading a wasm module).

  FilterContainer.prototype.readyToUse = function () {
    return Promise.resolve();
  };

  /** *************************************************************************** */

  FilterContainer.prototype.toSelfie = function () {
    const categoriesToSelfie = function (categoryMap) {
      const selfie = [];
      for (const categoryEntry of categoryMap) {
        const tokenEntries = [];
        for (const tokenEntry of categoryEntry[1]) {
          tokenEntries.push([tokenEntry[0], tokenEntry[1].compile()]);
        }
        selfie.push([categoryEntry[0], tokenEntries]);
      }
      return selfie;
    };

    const dataFiltersToSelfie = function (dataFilters) {
      const selfie = [];
      for (let entry of dataFilters.values()) {
        do {
          selfie.push(entry.compile());
          entry = entry.next;
        } while (entry !== undefined);
      }
      return selfie;
    };

    return {
      processedFilterCount: this.processedFilterCount,
      acceptedCount: this.acceptedCount,
      rejectedCount: this.rejectedCount,
      allowFilterCount: this.allowFilterCount,
      blockFilterCount: this.blockFilterCount,
      discardedCount: this.discardedCount,
      trieContainer: FilterHostnameDict.trieContainer.serialize(),
      categories: categoriesToSelfie(this.categories),
      dataFilters: dataFiltersToSelfie(this.dataFilters),
    };
  };

  /** *************************************************************************** */

  FilterContainer.prototype.fromSelfie = function (selfie) {
    this.frozen = true;
    this.processedFilterCount = selfie.processedFilterCount;
    this.acceptedCount = selfie.acceptedCount;
    this.rejectedCount = selfie.rejectedCount;
    this.allowFilterCount = selfie.allowFilterCount;
    this.blockFilterCount = selfie.blockFilterCount;
    this.discardedCount = selfie.discardedCount;
    FilterHostnameDict.trieContainer.unserialize(selfie.trieContainer);

    for (const categoryEntry of selfie.categories) {
      const tokenMap = new Map();
      for (const tokenEntry of categoryEntry[1]) {
        tokenMap.set(tokenEntry[0], filterFromCompiledData(tokenEntry[1]));
      }
      this.categories.set(categoryEntry[0], tokenMap);
    }

    for (const dataEntry of selfie.dataFilters) {
      const entry = FilterDataHolderEntry.load(dataEntry);
      const bucket = this.dataFilters.get(entry.tokenHash);
      if (bucket !== undefined) {
        entry.next = bucket;
      }
      this.dataFilters.set(entry.tokenHash, entry);
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.compile = function (raw, writer) {
    // ORDER OF TESTS IS IMPORTANT!

    // Ignore empty lines
    const s = raw.trim();
    if (s.length === 0) {
      return false;
    }

    const parsed = this.filterParser.parse(s);

    // Ignore element-hiding filters
    if (parsed.elemHiding) {
      return false;
    }

    // Ignore filters with unsupported options
    if (parsed.unsupported) {
      const who = writer.properties.get('assetKey') || '?';
      logger.writeOne({
        realm: 'message',
        type: 'error',
        text: `Invalid network filter in ${who}: ${raw}`,
      });
      return false;
    }

    // Pure hostnames, use more efficient dictionary lookup
    // https://github.com/chrisaljoudi/uBlock/issues/665
    // Create a dict keyed on request type etc.
    if (parsed.hostnamePure && parsed.domainOpt === '' && parsed.dataType === undefined) {
      parsed.tokenHash = this.dotTokenHash;
      this.compileToAtomicFilter(parsed, parsed.f, writer);
      return true;
    }

    parsed.makeToken();

    let fdata;
    if (parsed.isRegex) {
      fdata = FilterRegex.compile(parsed);
    } else if (parsed.hostnamePure) {
      fdata = FilterPlainHostname.compile(parsed);
    } else if (parsed.f === '*') {
      fdata = FilterTrue.compile();
    } else if (parsed.anchor === 0x5) {
      // https://github.com/gorhill/uBlock/issues/1669
      fdata = FilterGenericHnAndRightAnchored.compile(parsed);
    } else if (parsed.anchor === 0x4) {
      if (
        this.reIsGeneric.test(parsed.f) === false
        && parsed.tokenHash !== parsed.noTokenHash
        && parsed.tokenBeg === 0
      ) {
        fdata = FilterPlainHnAnchored.compile(parsed);
      } else {
        fdata = FilterGenericHnAnchored.compile(parsed);
      }
    } else if (this.reIsGeneric.test(parsed.f) || parsed.tokenHash === parsed.noTokenHash) {
      fdata = FilterGeneric.compile(parsed);
    } else if (parsed.anchor === 0x2) {
      fdata = FilterPlainLeftAnchored.compile(parsed);
    } else if (parsed.anchor === 0x1) {
      fdata = FilterPlainRightAnchored.compile(parsed);
    } else if (parsed.anchor === 0x3) {
      fdata = FilterExactMatch.compile(parsed);
    } else if (parsed.tokenBeg === 0) {
      fdata = FilterPlainPrefix0.compile(parsed);
    } else if (parsed.tokenBeg === 1) {
      fdata = FilterPlainPrefix1.compile(parsed);
    } else {
      fdata = FilterPlain.compile(parsed);
    }

    let fwrapped;
    if (parsed.domainOpt !== '') {
      fwrapped = fdata;
      fdata = FilterOrigin.compile(parsed);
      fdata.push(fwrapped);
    }

    if (parsed.dataType !== undefined) {
      fwrapped = fdata;
      fdata = FilterDataHolder.compile(parsed);
      fdata.push(fwrapped);
    }

    this.compileToAtomicFilter(parsed, fdata, writer);

    return true;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.compileToAtomicFilter = function (parsed, fdata, writer) {
    // 0 = network filters
    // 1 = network filters: bad filters
    if (parsed.badFilter) {
      writer.select(1);
    } else {
      writer.select(0);
    }

    const descBits = parsed.action | parsed.important | parsed.party;
    let type = parsed.types;

    // Typeless
    if (type === 0) {
      writer.push([descBits, parsed.tokenHash, fdata]);
      return;
    }

    // Specific type(s)
    let bitOffset = 1;
    do {
      if (type & 1) {
        writer.push([descBits | (bitOffset << 4), parsed.tokenHash, fdata]);
      }
      bitOffset += 1;
      type >>>= 1;
    } while (type !== 0);

    // Only static filter with an explicit type can be redirected. If we reach
    // this point, it's because there is one or more explicit type.
    if (parsed.redirect) {
      // CLIQZ: disable redirections
      // let redirects = µb.redirectEngine.compileRuleFromStaticFilter(parsed.raw);
      // if ( Array.isArray(redirects) ) {
      //     for ( let redirect of redirects ) {
      //         writer.push([ typeNameToTypeValue.redirect, redirect ]);
      //    }
      // }
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.fromCompiledContent = function (reader) {
    // 0 = network filters
    reader.select(0);
    while (reader.next()) {
      this.acceptedCount += 1;
      if (this.goodFilters.has(reader.line)) {
        this.discardedCount += 1;
      } else {
        this.goodFilters.add(reader.line);
      }
    }

    // 1 = network filters: bad filter directives
    // Since we are going to keep bad filter fingerprints around, we ensure
    // they are "detached" from the parent string from which they are sliced.
    // We keep bad filter fingerprints around to use them when user
    // incrementally add filters (through "Block element" for example).
    reader.select(1);
    while (reader.next()) {
      if (this.badFilters.has(reader.line) === false) {
        this.badFilters.add(orphanizeString(reader.line));
      }
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.matchAndFetchData = function (dataType, requestURL, out, outlog) {
    if (this.dataFilters.length === 0) {
      return;
    }

    const url = this.urlTokenizer.setURL(requestURL);

    pageHostnameRegister = requestHostnameRegister = URI.hostnameFromURI(url);

    // We need to visit ALL the matching filters.
    const toAddImportant = new Map();

    const toAdd = new Map();

    const toRemove = new Map();

    const tokenHashes = this.urlTokenizer.getTokens();

    let i = 0;
    while (i < 32) {
      const tokenHash = tokenHashes[i++];
      if (tokenHash === 0) {
        break;
      }
      const tokenOffset = tokenHashes[i++];
      let entry = this.dataFilters.get(tokenHash);
      while (entry !== undefined) {
        const f = entry.filter;
        if (f.match(url, tokenOffset) === true) {
          if (entry.categoryBits & 0x001) {
            toRemove.set(f.dataStr, entry);
          } else if (entry.categoryBits & 0x002) {
            toAddImportant.set(f.dataStr, entry);
          } else {
            toAdd.set(f.dataStr, entry);
          }
        }
        entry = entry.next;
      }
    }
    let entry = this.dataFilters.get(this.noTokenHash);
    while (entry !== undefined) {
      const f = entry.filter;
      if (f.match(url) === true) {
        if (entry.categoryBits & 0x001) {
          toRemove.set(f.dataStr, entry);
        } else if (entry.categoryBits & 0x002) {
          toAddImportant.set(f.dataStr, entry);
        } else {
          toAdd.set(f.dataStr, entry);
        }
      }
      entry = entry.next;
    }

    if (toAddImportant.size === 0 && toAdd.size === 0) {
      return;
    }

    // Remove entries overriden by other filters.
    for (const key of toAddImportant.keys()) {
      toAdd.delete(key);
      toRemove.delete(key);
    }
    for (const key of toRemove.keys()) {
      if (key === '') {
        toAdd.clear();
        break;
      }
      toAdd.delete(key);
    }

    for (const entry of toAddImportant) {
      out.push(entry[0]);
      if (outlog === undefined) {
        continue;
      }
      const logData = entry[1].logData();
      logData.source = 'static';
      logData.result = 1;
      outlog.push(logData);
    }
    for (const entry of toAdd) {
      out.push(entry[0]);
      if (outlog === undefined) {
        continue;
      }
      const logData = entry[1].logData();
      logData.source = 'static';
      logData.result = 1;
      outlog.push(logData);
    }
    if (outlog !== undefined) {
      for (const entry of toRemove.values()) {
        const logData = entry.logData();
        logData.source = 'static';
        logData.result = 2;
        outlog.push(logData);
      }
    }
  };

  /** *************************************************************************** */

  // bucket: Map
  // url: string

  FilterContainer.prototype.matchTokens = function (bucket, url) {
    // Hostname-only filters
    let f = bucket.get(this.dotTokenHash);
    if (f !== undefined && f.match() === true) {
      this.thRegister = this.dotTokenHash;
      this.fRegister = f;
      return true;
    }

    const tokenHashes = this.urlTokenizer.getTokens();

    let i = 0;
    for (;;) {
      const tokenHash = tokenHashes[i++];
      if (tokenHash === 0) {
        break;
      }
      const tokenOffset = tokenHashes[i++];
      f = bucket.get(tokenHash);
      if (f !== undefined && f.match(url, tokenOffset) === true) {
        this.thRegister = tokenHash;
        this.fRegister = f;
        return true;
      }
    }

    // Untokenizable filters
    f = bucket.get(this.noTokenHash);
    if (f !== undefined && f.match(url) === true) {
      this.thRegister = this.noTokenHash;
      this.fRegister = f;
      return true;
    }

    return false;
  };

  /** *************************************************************************** */

  // Specialized handlers

  // https://github.com/gorhill/uBlock/issues/1477
  //   Special case: blocking-generichide filter ALWAYS exists, it is implicit --
  //   thus we always first check for exception filters, then for important block
  //   filter if and only if there was a hit on an exception filter.
  // https://github.com/gorhill/uBlock/issues/2103
  //   User may want to override `generichide` exception filters.

  FilterContainer.prototype.matchStringGenericHide = function (requestURL) {
    const url = this.urlTokenizer.setURL(requestURL);

    // https://github.com/gorhill/uBlock/issues/2225
    //   Important:
    //   - `pageHostnameRegister` is used by FilterOrigin.matchOrigin().
    //   - `requestHostnameRegister` is used by FilterHostnameDict.match().
    pageHostnameRegister = requestHostnameRegister = URI.hostnameFromURI(url);

    let bucket = this.categories.get(genericHideException);
    if (!bucket || this.matchTokens(bucket, url) === false) {
      this.fRegister = null;
      return 0;
    }

    bucket = this.categories.get(genericHideImportant);
    if (bucket && this.matchTokens(bucket, url)) {
      this.cbRegister = genericHideImportant;
      return 1;
    }

    this.cbRegister = genericHideException;
    return 2;
  };

  /** *************************************************************************** */

  // https://github.com/chrisaljoudi/uBlock/issues/116
  //   Some type of requests are exceptional, they need custom handling,
  //   not the generic handling.

  FilterContainer.prototype.matchStringExactType = function (fctxt, requestType) {
    // Special cases.
    if (requestType === 'generichide') {
      return this.matchStringGenericHide(fctxt.url);
    }
    const type = typeNameToTypeValue[requestType];
    if (type === undefined) {
      return 0;
    }

    // Prime tokenizer: we get a normalized URL in return.
    const url = this.urlTokenizer.setURL(fctxt.url);

    // These registers will be used by various filters
    pageHostnameRegister = fctxt.getDocHostname();
    requestHostnameRegister = fctxt.getHostname();

    const party = fctxt.is3rdPartyToDoc() ? ThirdParty : FirstParty;
    const categories = this.categories;

    let catBits;

    let bucket;

    this.fRegister = null;

    // https://github.com/chrisaljoudi/uBlock/issues/139
    //   Test against important block filters
    catBits = BlockAnyParty | Important | type;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 1;
      }
    }
    catBits = BlockAction | Important | type | party;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 1;
      }
    }

    // Test against block filters
    catBits = BlockAnyParty | type;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
      }
    }
    if (this.fRegister === null) {
      catBits = BlockAction | type | party;
      if ((bucket = categories.get(catBits))) {
        if (this.matchTokens(bucket, url)) {
          this.cbRegister = catBits;
        }
      }
    }

    // If there is no block filter, no need to test against allow filters
    if (this.fRegister === null) {
      return 0;
    }

    // Test against allow filters
    catBits = AllowAnyParty | type;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 2;
      }
    }
    catBits = AllowAction | type | party;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 2;
      }
    }

    return 1;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.matchString = function (fctxt) {
    // https://github.com/chrisaljoudi/uBlock/issues/519
    // Use exact type match for anything beyond `other`
    // Also, be prepared to support unknown types
    let type = typeNameToTypeValue[fctxt.type];
    if (type === undefined) {
      type = otherTypeBitValue;
    } else if (type === 0 || type > otherTypeBitValue) {
      return this.matchStringExactType(fctxt, fctxt.type);
    }

    // The logic here is simple:
    //
    // block = !whitelisted &&  blacklisted
    //   or equivalent
    // allow =  whitelisted || !blacklisted

    // Statistically, hits on a URL in order of likelihood:
    // 1. No hit
    // 2. Hit on a block filter
    // 3. Hit on an allow filter
    //
    // High likelihood of "no hit" means to optimize we need to reduce as much
    // as possible the number of filters to test.
    //
    // Then, because of the order of probabilities, we should test only
    // block filters first, and test allow filters if and only if there is a
    // hit on a block filter. Since there is a high likelihood of no hit,
    // testing allow filter by default is likely wasted work, hence allow
    // filters are tested *only* if there is a (unlikely) hit on a block
    // filter.

    // Prime tokenizer: we get a normalized URL in return.
    const url = this.urlTokenizer.setURL(fctxt.url);

    // These registers will be used by various filters
    pageHostnameRegister = fctxt.getDocHostname();
    requestHostnameRegister = fctxt.getHostname();

    this.fRegister = null;

    const party = fctxt.is3rdPartyToDoc() ? ThirdParty : FirstParty;
    const categories = this.categories;

    let catBits;

    let bucket;

    // https://github.com/chrisaljoudi/uBlock/issues/139
    // Test against important block filters.
    // The purpose of the `important` option is to reverse the order of
    // evaluation. Normally, it is "evaluate block then evaluate allow", with
    // the `important` property it is "evaluate allow then evaluate block".
    catBits = BlockAnyTypeAnyParty | Important;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 1;
      }
    }
    catBits = BlockAnyType | Important | party;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 1;
      }
    }
    catBits = BlockAnyParty | Important | type;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 1;
      }
    }
    catBits = BlockAction | Important | type | party;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 1;
      }
    }

    // Test against block filters
    catBits = BlockAnyTypeAnyParty;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
      }
    }
    if (this.fRegister === null) {
      catBits = BlockAnyType | party;
      if ((bucket = categories.get(catBits))) {
        if (this.matchTokens(bucket, url)) {
          this.cbRegister = catBits;
        }
      }
      if (this.fRegister === null) {
        catBits = BlockAnyParty | type;
        if ((bucket = categories.get(catBits))) {
          if (this.matchTokens(bucket, url)) {
            this.cbRegister = catBits;
          }
        }
        if (this.fRegister === null) {
          catBits = BlockAction | type | party;
          if ((bucket = categories.get(catBits))) {
            if (this.matchTokens(bucket, url)) {
              this.cbRegister = catBits;
            }
          }
        }
      }
    }

    // If there is no block filter, no need to test against allow filters
    if (this.fRegister === null) {
      return 0;
    }

    // Test against allow filters
    catBits = AllowAnyTypeAnyParty;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 2;
      }
    }
    catBits = AllowAnyType | party;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 2;
      }
    }
    catBits = AllowAnyParty | type;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 2;
      }
    }
    catBits = AllowAction | type | party;
    if ((bucket = categories.get(catBits))) {
      if (this.matchTokens(bucket, url)) {
        this.cbRegister = catBits;
        return 2;
      }
    }

    return 1;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.toLogData = function () {
    if (this.fRegister === null) {
      return;
    }
    const logData = toLogDataInternal(this.cbRegister, this.thRegister, this.fRegister);
    logData.source = 'static';
    logData.tokenHash = this.thRegister;
    logData.result = this.fRegister === null ? 0 : this.cbRegister & 1 ? 2 : 1;
    return logData;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.getFilterCount = function () {
    return this.acceptedCount - this.discardedCount;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.benchmark = function (contexts) {
    const t0 = performance.now();
    const results = [];
    for (const context of contexts) {
      results.push(this.matchString(context));
    }
    const t1 = performance.now();
    return {
      t0,
      t1,
      duration: t1 - t0,
      results,
    };
  };

  /** *************************************************************************** */

  return new FilterContainer();

  /** *************************************************************************** */
}());

module.exports = class UBlockOrigin {
  static parse(rawLists) {
    staticNetFilteringEngine.fromCompiledContent(new Reader(compileFilters(rawLists)));
    staticNetFilteringEngine.freeze();
    return new UBlockOrigin(staticNetFilteringEngine);
  }

  constructor(engine) {
    this.engine = engine;
  }

  serialize() {
    return JSON.stringify(this.engine.toSelfie());
  }

  deserialize(serialized) {
    this.engine.fromSelfie(JSON.parse(serialized));
  }

  match({
    rawType, url, hostname, domain, sourceHostname, sourceDomain,
  }) {
    return this.engine.matchString({
      url,
      type: rawType,
      getDocHostname: () => sourceHostname,
      getHostname: () => hostname,
      is3rdPartyToDoc: () => sourceDomain !== domain,
    }) === 1;
  }
};
