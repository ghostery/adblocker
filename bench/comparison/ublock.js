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

const vAPI = undefined;
const µBlock = undefined;

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

const cosmeticFilteringEngine = (function () {
  /** *************************************************************************** */

  const cosmeticSurveyingMissCountMax = 15;

  const supportsUserStylesheets = false;

  /** *****************************************************************************

    Each filter class will register itself in the map.

    IMPORTANT: any change which modifies the mapping will have to be
    reflected with µBlock.systemSettings.compiledMagic.

* */

  const filterClasses = [];

  const registerFilterClass = function (ctor) {
    filterClasses[ctor.prototype.fid] = ctor;
  };

  const filterFromCompiledData = function (args) {
    return filterClasses[args[0]].load(args);
  };

  /** *************************************************************************** */

  // One hostname => one selector

  const FilterOneOne = function (hostname, selector) {
    this.hostname = hostname;
    this.selector = selector;
  };

  FilterOneOne.prototype = {
    fid: 8,

    // Since this class can hold only one single selector, adding a new
    // hostname-selector requires to morph the filter instance into a
    // better-suited class.
    add(hostname, selector) {
      if (hostname === this.hostname) {
        return new FilterOneMany(this.hostname, [this.selector, selector]);
      }
      return new FilterManyAny([[this.hostname, this.selector], [hostname, selector]]);
    },

    retrieve(target, out) {
      if (target.endsWith(this.hostname) === false) {
        return;
      }
      const i = target.length - this.hostname.length;
      if (i !== 0 && target.charCodeAt(i - 1) !== 0x2e /* '.' */) {
        return;
      }
      out.add(this.selector);
    },

    compile() {
      return [this.fid, this.hostname, this.selector];
    },
  };

  FilterOneOne.load = function (data) {
    return new FilterOneOne(data[1], data[2]);
  };

  registerFilterClass(FilterOneOne);

  /** *************************************************************************** */

  // One hostname => many selectors

  const FilterOneMany = function (hostname, selectors) {
    this.hostname = hostname;
    this.selectors = selectors;
  };

  FilterOneMany.prototype = {
    fid: 9,

    // Since this class can hold selectors for only one specific hostname,
    // adding a new hostname will require to morph the filter instance into a
    // better-suited class.
    add(hostname, selector) {
      if (hostname === this.hostname) {
        this.selectors.push(selector);
        return this;
      }
      return new FilterManyAny([[this.hostname, this.selectors], [hostname, selector]]);
    },

    retrieve(target, out) {
      if (target.endsWith(this.hostname) === false) {
        return;
      }
      const i = target.length - this.hostname.length;
      if (i !== 0 && target.charCodeAt(i - 1) !== 0x2e /* '.' */) {
        return;
      }
      for (const selector of this.selectors) {
        out.add(selector);
      }
    },

    compile() {
      return [this.fid, this.hostname, this.selectors];
    },
  };

  FilterOneMany.load = function (data) {
    return new FilterOneMany(data[1], data[2]);
  };

  registerFilterClass(FilterOneMany);

  /** *************************************************************************** */

  // Many hostnames => one or many selectors

  let FilterManyAny = function (entries) {
    this.entries = new Map(entries);
  };

  FilterManyAny.prototype = {
    fid: 10,

    add(hostname, selector) {
      const selectors = this.entries.get(hostname);
      if (selectors === undefined) {
        this.entries.set(hostname, selector);
      } else if (typeof selectors === 'string') {
        this.entries.set(hostname, [selectors, selector]);
      } else {
        selectors.push(selector);
      }
    },

    retrieve(target, out) {
      for (const entry of this.entries) {
        const hostname = entry[0];
        if (target.endsWith(hostname) === false) {
          continue;
        }
        const i = target.length - hostname.length;
        if (i !== 0 && target.charCodeAt(i - 1) !== 0x2e /* '.' */) {
          continue;
        }
        const selectors = entry[1];
        if (typeof selectors === 'string') {
          out.add(selectors);
          continue;
        }
        for (const selector of selectors) {
          out.add(selector);
        }
      }
    },

    compile() {
      return [this.fid, Array.from(this.entries)];
    },
  };

  FilterManyAny.load = function (data) {
    return new FilterManyAny(data[1]);
  };

  registerFilterClass(FilterManyAny);

  /** *************************************************************************** */
  /** *************************************************************************** */

  const SelectorCacheEntry = function () {
    this.reset();
  };

  /** *************************************************************************** */

  SelectorCacheEntry.junkyard = [];

  SelectorCacheEntry.factory = function () {
    const entry = SelectorCacheEntry.junkyard.pop();
    if (entry) {
      return entry.reset();
    }
    return new SelectorCacheEntry();
  };

  /** *************************************************************************** */

  const netSelectorCacheLowWaterMark = 20;
  const netSelectorCacheHighWaterMark = 30;

  /** *************************************************************************** */

  SelectorCacheEntry.prototype = {
    reset() {
      this.cosmetic = new Set();
      this.cosmeticSurveyingMissCount = 0;
      this.net = new Map();
      this.lastAccessTime = Date.now();
      return this;
    },

    dispose() {
      this.cosmetic = this.net = null;
      if (SelectorCacheEntry.junkyard.length < 25) {
        SelectorCacheEntry.junkyard.push(this);
      }
    },

    addCosmetic(details) {
      const selectors = details.selectors;

      let i = selectors.length || 0;
      // https://github.com/gorhill/uBlock/issues/2011
      //   Avoiding seemingly pointless surveys only if they appear costly.
      if (details.first && i === 0) {
        if ((details.cost || 0) >= 80) {
          this.cosmeticSurveyingMissCount += 1;
        }
        return;
      }
      this.cosmeticSurveyingMissCount = 0;
      while (i--) {
        this.cosmetic.add(selectors[i]);
      }
    },

    addNet(selectors) {
      if (typeof selectors === 'string') {
        this.addNetOne(selectors, Date.now());
      } else {
        this.addNetMany(selectors, Date.now());
      }
      // Net request-derived selectors: I limit the number of cached selectors,
      // as I expect cases where the blocked net-requests are never the
      // exact same URL.
      if (this.net.size < netSelectorCacheHighWaterMark) {
        return;
      }
      const dict = this.net;
      const keys = Array.from(dict.keys())
        .sort((a, b) => dict.get(b) - dict.get(a))
        .slice(netSelectorCacheLowWaterMark);
      let i = keys.length;
      while (i--) {
        dict.delete(keys[i]);
      }
    },

    addNetOne(selector, now) {
      this.net.set(selector, now);
    },

    addNetMany(selectors, now) {
      let i = selectors.length || 0;
      while (i--) {
        this.net.set(selectors[i], now);
      }
    },

    add(details) {
      this.lastAccessTime = Date.now();
      if (details.type === 'cosmetic') {
        this.addCosmetic(details);
      } else {
        this.addNet(details.selectors);
      }
    },

    // https://github.com/chrisaljoudi/uBlock/issues/420
    remove(type) {
      this.lastAccessTime = Date.now();
      if (type === undefined || type === 'cosmetic') {
        this.cosmetic.clear();
        this.cosmeticSurveyingMissCount = 0;
      }
      if (type === undefined || type === 'net') {
        this.net.clear();
      }
    },

    retrieveToArray(iterator, out) {
      for (const selector of iterator) {
        out.push(selector);
      }
    },

    retrieveToSet(iterator, out) {
      for (const selector of iterator) {
        out.add(selector);
      }
    },

    retrieve(type, out) {
      this.lastAccessTime = Date.now();
      const iterator = type === 'cosmetic' ? this.cosmetic : this.net.keys();
      if (Array.isArray(out)) {
        this.retrieveToArray(iterator, out);
      } else {
        this.retrieveToSet(iterator, out);
      }
    },
  };

  /** *************************************************************************** */
  /** *************************************************************************** */

  // Cosmetic filter family tree:
  //
  // Generic
  //    Low generic simple: class or id only
  //    Low generic complex: class or id + extra stuff after
  //    High generic:
  //       High-low generic: [alt="..."],[title="..."]
  //       High-medium generic: [href^="..."]
  //       High-high generic: everything else
  // Specific
  //    Specfic hostname
  //    Specific entity
  // Generic filters can only be enforced once the main document is loaded.
  // Specific filers can be enforced before the main document is loaded.

  const FilterContainer = function () {
    this.reHasUnicode = /[^\x00-\x7F]/;
    this.rePlainSelector = /^[#.][\w\\-]+/;
    this.rePlainSelectorEscaped = /^[#.](?:\\[0-9A-Fa-f]+ |\\.|\w|-)+/;
    this.rePlainSelectorEx = /^[^#.\[(]+([#.][\w-]+)|([#.][\w-]+)$/;
    this.reEscapeSequence = /\\([0-9A-Fa-f]+ |.)/g;
    this.reSimpleHighGeneric1 = /^[a-z]*\[[^[]+]$/;
    this.reHighMedium = /^\[href\^="https?:\/\/([^"]{8})[^"]*"\]$/;

    this.selectorCache = new Map();
    this.selectorCachePruneDelay = 10 * 60 * 1000; // 10 minutes
    this.selectorCacheAgeMax = 120 * 60 * 1000; // 120 minutes
    this.selectorCacheCountMin = 25;
    this.netSelectorCacheCountMax = netSelectorCacheHighWaterMark;
    this.selectorCacheTimer = null;

    // generic exception filters
    this.genericDonthideSet = new Set();

    // TODO: Think about reusing µb.staticExtFilteringEngine.HostnameBasedDB
    //       for both specific and procedural filters. This would require some
    //       refactoring.
    // hostname, entity-based filters
    this.specificFilters = new Map();

    // low generic cosmetic filters, organized by id/class then simple/complex.
    this.lowlyGeneric = Object.create(null);
    this.lowlyGeneric.id = {
      canonical: 'ids',
      prefix: '#',
      simple: new Set(),
      complex: new Map(),
    };
    this.lowlyGeneric.cl = {
      canonical: 'classes',
      prefix: '.',
      simple: new Set(),
      complex: new Map(),
    };

    // highly generic selectors sets
    this.highlyGeneric = Object.create(null);
    this.highlyGeneric.simple = {
      canonical: 'highGenericHideSimple',
      dict: new Set(),
      str: '',
      mru: new MRUCache(16),
    };
    this.highlyGeneric.complex = {
      canonical: 'highGenericHideComplex',
      dict: new Set(),
      str: '',
      mru: new MRUCache(16),
    };

    // Short-lived: content is valid only during one function call. These
    // is to prevent repeated allocation/deallocation overheads -- the
    // constructors/destructors of javascript Set/Map is assumed to be costlier
    // than just calling clear() on these.
    this.setRegister0 = new Set();
    this.setRegister1 = new Set();
    this.setRegister2 = new Set();
    this.mapRegister0 = new Map();

    this.reset();
  };

  /** *************************************************************************** */

  // Reset all, thus reducing to a minimum memory footprint of the context.

  FilterContainer.prototype.reset = function () {
    this.µburi = URI;
    this.frozen = false;
    this.acceptedCount = 0;
    this.discardedCount = 0;
    this.duplicateBuster = new Set();

    this.selectorCache.clear();
    if (this.selectorCacheTimer !== null) {
      clearTimeout(this.selectorCacheTimer);
      this.selectorCacheTimer = null;
    }

    // generic filters
    this.hasGenericHide = false;

    // generic exception filters
    this.genericDonthideSet.clear();

    // hostname, entity-based filters
    this.specificFilters.clear();

    // low generic cosmetic filters, organized by id/class then simple/complex.
    this.lowlyGeneric.id.simple.clear();
    this.lowlyGeneric.id.complex.clear();
    this.lowlyGeneric.cl.simple.clear();
    this.lowlyGeneric.cl.complex.clear();

    // highly generic selectors sets
    this.highlyGeneric.simple.dict.clear();
    this.highlyGeneric.simple.str = '';
    this.highlyGeneric.simple.mru.reset();
    this.highlyGeneric.complex.dict.clear();
    this.highlyGeneric.complex.str = '';
    this.highlyGeneric.complex.mru.reset();
  };

  /** *************************************************************************** */

  FilterContainer.prototype.freeze = function () {
    this.duplicateBuster = new Set();

    this.hasGenericHide = this.lowlyGeneric.id.simple.size !== 0
      || this.lowlyGeneric.id.complex.size !== 0
      || this.lowlyGeneric.cl.simple.size !== 0
      || this.lowlyGeneric.cl.complex.size !== 0
      || this.highlyGeneric.simple.dict.size !== 0
      || this.highlyGeneric.complex.dict.size !== 0;

    this.highlyGeneric.simple.str = Array.from(this.highlyGeneric.simple.dict).join(',\n');
    this.highlyGeneric.simple.mru.reset();
    this.highlyGeneric.complex.str = Array.from(this.highlyGeneric.complex.dict).join(',\n');
    this.highlyGeneric.complex.mru.reset();

    this.frozen = true;
  };

  /** *************************************************************************** */

  // https://github.com/gorhill/uBlock/issues/1668
  //   The key must be literal: unescape escaped CSS before extracting key.
  //   It's an uncommon case, so it's best to unescape only when needed.

  FilterContainer.prototype.keyFromSelector = function (selector) {
    let matches = this.rePlainSelector.exec(selector);
    if (matches === null) {
      return;
    }
    let key = matches[0];
    if (key.indexOf('\\') === -1) {
      return key;
    }
    matches = this.rePlainSelectorEscaped.exec(selector);
    if (matches === null) {
      return;
    }
    key = '';
    const escaped = matches[0];

    let beg = 0;
    this.reEscapeSequence.lastIndex = 0;
    for (;;) {
      matches = this.reEscapeSequence.exec(escaped);
      if (matches === null) {
        return key + escaped.slice(beg);
      }
      key += escaped.slice(beg, matches.index);
      beg = this.reEscapeSequence.lastIndex;
      if (matches[1].length === 1) {
        key += matches[1];
      } else {
        key += String.fromCharCode(parseInt(matches[1], 16));
      }
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.compile = function (parsed, writer) {
    // 1000 = cosmetic filtering
    writer.select(1000);

    const hostnames = parsed.hostnames;
    let i = hostnames.length;
    if (i === 0) {
      this.compileGenericSelector(parsed, writer);
      return true;
    }

    // https://github.com/chrisaljoudi/uBlock/issues/151
    // Negated hostname means the filter applies to all non-negated hostnames
    // of same filter OR globally if there is no non-negated hostnames.
    let applyGlobally = true;
    while (i--) {
      const hostname = hostnames[i];
      if (hostname.startsWith('~') === false) {
        applyGlobally = false;
      }
      this.compileSpecificSelector(hostname, parsed, writer);
    }
    if (applyGlobally) {
      this.compileGenericSelector(parsed, writer);
    }

    return true;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.compileGenericSelector = function (parsed, writer) {
    if (parsed.exception === false) {
      this.compileGenericHideSelector(parsed, writer);
    } else {
      this.compileGenericUnhideSelector(parsed, writer);
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.compileGenericHideSelector = function (parsed, writer) {
    const selector = parsed.suffix;
    const type = selector.charCodeAt(0);
    let key;

    if (type === 0x23 /* '#' */) {
      key = this.keyFromSelector(selector);
      // Simple selector-based CSS rule: no need to test for whether the
      // selector is valid, the regex took care of this. Most generic
      // selector falls into that category.
      // - ###ad-bigbox
      if (key === selector) {
        writer.push([0, key.slice(1)]);
        return;
      }
    } else if (type === 0x2e /* '.' */) {
      key = this.keyFromSelector(selector);
      // Simple selector-based CSS rule: no need to test for whether the
      // selector is valid, the regex took care of this. Most generic
      // selector falls into that category.
      // - ##.ads-bigbox
      if (key === selector) {
        writer.push([2, key.slice(1)]);
        return;
      }
    }

    const compiled = staticExtFilteringEngine.compileSelector(selector);

    // Invalid cosmetic filter, possible reasons:
    // - Bad syntax
    // - Procedural filters (can't be generic): the compiled version of
    //   a procedural selector is NEVER equal to its raw version.
    if (compiled === undefined || compiled !== selector) {
      const who = writer.properties.get('assetKey') || '?';
      logger.writeOne({
        realm: 'message',
        type: 'error',
        text: `Invalid generic cosmetic filter in ${who}: ##${selector}`,
      });
      return;
    }

    // Complex selector-based CSS rule:
    // - ###tads + div + .c
    // - ##.rscontainer > .ellip
    if (key !== undefined) {
      writer.push([type === 0x23 /* '#' */ ? 1 : 3, key.slice(1), selector]);
      return;
    }

    // https://github.com/gorhill/uBlock/issues/909
    //   Anything which contains a plain id/class selector can be classified
    //   as a low generic cosmetic filter.
    const matches = this.rePlainSelectorEx.exec(selector);
    if (matches !== null) {
      const key = matches[1] || matches[2];
      writer.push([key.charCodeAt(0) === 0x23 /* '#' */ ? 1 : 3, key.slice(1), selector]);
      return;
    }

    // Pass this point, we are dealing with highly-generic cosmetic filters.
    //
    // For efficiency purpose, we will distinguish between simple and complex
    // selectors.

    if (this.reSimpleHighGeneric1.test(selector)) {
      writer.push([4 /* simple */, selector]);
      return;
    }

    if (selector.indexOf(' ') === -1) {
      writer.push([4 /* simple */, selector]);
    } else {
      writer.push([5 /* complex */, selector]);
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.compileGenericUnhideSelector = function (parsed, writer) {
    // Procedural cosmetic filters are acceptable as generic exception filters.
    const compiled = staticExtFilteringEngine.compileSelector(parsed.suffix);
    if (compiled === undefined) {
      const who = writer.properties.get('assetKey') || '?';
      logger.writeOne({
        realm: 'message',
        type: 'error',
        text: `Invalid cosmetic filter in ${who}: #@#${parsed.suffix}`,
      });
      return;
    }

    // https://github.com/chrisaljoudi/uBlock/issues/497
    //   All generic exception filters are put in the same bucket: they are
    //   expected to be very rare.
    writer.push([7 /* g1 */, compiled]);
  };

  /** *************************************************************************** */

  FilterContainer.prototype.compileSpecificSelector = function (hostname, parsed, writer) {
    // https://github.com/chrisaljoudi/uBlock/issues/145
    let unhide = parsed.exception ? 1 : 0;
    if (hostname.startsWith('~')) {
      hostname = hostname.slice(1);
      unhide ^= 1;
    }

    const compiled = staticExtFilteringEngine.compileSelector(parsed.suffix);
    if (compiled === undefined) {
      const who = writer.properties.get('assetKey') || '?';
      logger.writeOne({
        realm: 'message',
        type: 'error',
        text: `Invalid cosmetic filter in ${who}: ##${parsed.suffix}`,
      });
      return;
    }

    let hash = staticExtFilteringEngine.compileHostnameToHash(hostname);

    // Exception?
    if (unhide === 1) {
      hash |= 0b0001;
    }

    // Procedural?
    if (compiled.charCodeAt(0) === 0x7b) {
      hash |= 0b0010;
    }

    writer.push([8, hash, hostname, compiled]);
  };

  /** *************************************************************************** */

  FilterContainer.prototype.fromCompiledContent = function (reader, options) {
    if (options.skipCosmetic) {
      this.skipCompiledContent(reader);
      return;
    }
    if (options.skipGenericCosmetic) {
      this.skipGenericCompiledContent(reader);
      return;
    }

    // 1000 = cosmetic filtering
    reader.select(1000);

    let db;
    let bucket;

    while (reader.next()) {
      this.acceptedCount += 1;
      const fingerprint = reader.fingerprint();
      if (this.duplicateBuster.has(fingerprint)) {
        this.discardedCount += 1;
        continue;
      }
      this.duplicateBuster.add(fingerprint);

      const args = reader.args();

      switch (args[0]) {
        // low generic, simple
        case 0: // #AdBanner
        case 2: // .largeAd
          db = args[0] === 0 ? this.lowlyGeneric.id : this.lowlyGeneric.cl;
          bucket = db.complex.get(args[1]);
          if (bucket === undefined) {
            db.simple.add(args[1]);
          } else if (Array.isArray(bucket)) {
            bucket.push(db.prefix + args[1]);
          } else {
            db.complex.set(args[1], [bucket, db.prefix + args[1]]);
          }
          break;

        // low generic, complex
        case 1: // #tads + div + .c
        case 3: // .Mpopup + #Mad > #MadZone
          db = args[0] === 1 ? this.lowlyGeneric.id : this.lowlyGeneric.cl;
          bucket = db.complex.get(args[1]);
          if (bucket === undefined) {
            if (db.simple.has(args[1])) {
              db.complex.set(args[1], [db.prefix + args[1], args[2]]);
            } else {
              db.complex.set(args[1], args[2]);
              db.simple.add(args[1]);
            }
          } else if (Array.isArray(bucket)) {
            bucket.push(args[2]);
          } else {
            db.complex.set(args[1], [bucket, args[2]]);
          }
          break;

        // High-high generic hide/simple selectors
        // div[id^="allo"]
        case 4:
          this.highlyGeneric.simple.dict.add(args[1]);
          break;

        // High-high generic hide/complex selectors
        // div[id^="allo"] > span
        case 5:
          this.highlyGeneric.complex.dict.add(args[1]);
          break;

        // https://github.com/chrisaljoudi/uBlock/issues/497
        // Generic exception filters: expected to be a rare occurrence.
        // #@#.tweet
        case 7:
          this.genericDonthideSet.add(args[1]);
          break;

        // hash,  example.com, .promoted-tweet
        // hash,  example.*, .promoted-tweet
        case 8:
          bucket = this.specificFilters.get(args[1]);
          if (bucket === undefined) {
            this.specificFilters.set(args[1], new FilterOneOne(args[2], args[3]));
          } else if (bucket instanceof FilterManyAny) {
            bucket.add(args[2], args[3]);
          } /* can morph, so we need to replace entry in map */ else {
            this.specificFilters.set(args[1], bucket.add(args[2], args[3]));
          }
          break;

        default:
          this.discardedCount += 1;
          break;
      }
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.skipGenericCompiledContent = function (reader) {
    // 1000 = cosmetic filtering
    reader.select(1000);

    while (reader.next()) {
      this.acceptedCount += 1;
      const fingerprint = reader.fingerprint();
      if (this.duplicateBuster.has(fingerprint)) {
        this.discardedCount += 1;
        continue;
      }

      const args = reader.args();

      switch (args[0]) {
        // https://github.com/chrisaljoudi/uBlock/issues/497
        // Generic exception filters: expected to be a rare occurrence.
        case 7:
          this.duplicateBuster.add(fingerprint);
          this.genericDonthideSet.add(args[1]);
          break;

        // hash,  example.com, .promoted-tweet
        // hash,  example.*, .promoted-tweet
        case 8:
          this.duplicateBuster.add(fingerprint);
          const bucket = this.specificFilters.get(args[1]);
          if (bucket === undefined) {
            this.specificFilters.set(args[1], new FilterOneOne(args[2], args[3]));
          } else if (bucket instanceof FilterManyAny) {
            bucket.add(args[2], args[3]);
          } /* can morph, so we need to replace entry in map */ else {
            this.specificFilters.set(args[1], bucket.add(args[2], args[3]));
          }
          break;

        default:
          this.discardedCount += 1;
          break;
      }
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.skipCompiledContent = function (reader) {
    // 1000 = cosmetic filtering
    reader.select(1000);

    while (reader.next()) {
      this.acceptedCount += 1;
      this.discardedCount += 1;
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.toSelfie = function () {
    const selfieFromMap = function (map) {
      const entries = [];
      for (const entry of map) {
        entries.push([entry[0], entry[1].compile()]);
      }
      return entries;
    };

    return {
      acceptedCount: this.acceptedCount,
      discardedCount: this.discardedCount,
      specificFilters: selfieFromMap(this.specificFilters),
      hasGenericHide: this.hasGenericHide,
      lowlyGenericSID: Array.from(this.lowlyGeneric.id.simple),
      lowlyGenericCID: Array.from(this.lowlyGeneric.id.complex),
      lowlyGenericSCL: Array.from(this.lowlyGeneric.cl.simple),
      lowlyGenericCCL: Array.from(this.lowlyGeneric.cl.complex),
      highSimpleGenericHideArray: Array.from(this.highlyGeneric.simple.dict),
      highComplexGenericHideArray: Array.from(this.highlyGeneric.complex.dict),
      genericDonthideArray: Array.from(this.genericDonthideSet),
    };
  };

  /** *************************************************************************** */

  FilterContainer.prototype.fromSelfie = function (selfie) {
    const mapFromSelfie = function (entries) {
      const out = new Map();
      for (const entry of entries) {
        out.set(entry[0], filterFromCompiledData(entry[1]));
      }
      return out;
    };

    this.acceptedCount = selfie.acceptedCount;
    this.discardedCount = selfie.discardedCount;
    this.specificFilters = mapFromSelfie(selfie.specificFilters);
    this.hasGenericHide = selfie.hasGenericHide;
    this.lowlyGeneric.id.simple = new Set(selfie.lowlyGenericSID);
    this.lowlyGeneric.id.complex = new Map(selfie.lowlyGenericCID);
    this.lowlyGeneric.cl.simple = new Set(selfie.lowlyGenericSCL);
    this.lowlyGeneric.cl.complex = new Map(selfie.lowlyGenericCCL);
    this.highlyGeneric.simple.dict = new Set(selfie.highSimpleGenericHideArray);
    this.highlyGeneric.simple.str = selfie.highSimpleGenericHideArray.join(',\n');
    this.highlyGeneric.complex.dict = new Set(selfie.highComplexGenericHideArray);
    this.highlyGeneric.complex.str = selfie.highComplexGenericHideArray.join(',\n');
    this.genericDonthideSet = new Set(selfie.genericDonthideArray);
    this.frozen = true;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.triggerSelectorCachePruner = function () {
    // Of interest: http://fitzgeraldnick.com/weblog/40/
    // http://googlecode.blogspot.ca/2009/07/gmail-for-mobile-html5-series-using.html
  };

  /** *************************************************************************** */

  FilterContainer.prototype.addToSelectorCache = function (details) {
    const hostname = details.hostname;
    if (typeof hostname !== 'string' || hostname === '') {
      return;
    }
    const selectors = details.selectors;
    if (Array.isArray(selectors) === false) {
      return;
    }
    let entry = this.selectorCache.get(hostname);
    if (entry === undefined) {
      entry = SelectorCacheEntry.factory();
      this.selectorCache.set(hostname, entry);
      if (this.selectorCache.size > this.selectorCacheCountMin) {
        this.triggerSelectorCachePruner();
      }
    }
    entry.add(details);
  };

  /** *************************************************************************** */

  FilterContainer.prototype.removeFromSelectorCache = function (targetHostname, type) {
    const targetHostnameLength = targetHostname.length;
    for (const entry of this.selectorCache) {
      const hostname = entry[0];
      const item = entry[1];
      if (targetHostname !== '*') {
        if (hostname.endsWith(targetHostname) === false) {
          continue;
        }
        if (
          hostname.length !== targetHostnameLength
          && hostname.charAt(hostname.length - targetHostnameLength - 1) !== '.'
        ) {
          continue;
        }
      }
      item.remove(type);
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.retrieveFromSelectorCache = function (hostname, type, out) {
    const entry = this.selectorCache.get(hostname);
    if (entry !== undefined) {
      entry.retrieve(type, out);
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.pruneSelectorCacheAsync = function () {
    this.selectorCacheTimer = null;
    if (this.selectorCache.size <= this.selectorCacheCountMin) {
      return;
    }
    const cache = this.selectorCache;
    // Sorted from most-recently-used to least-recently-used, because
    //   we loop beginning at the end below.
    // We can't avoid sorting because we have to keep a minimum number of
    //   entries, and these entries should always be the most-recently-used.
    const hostnames = Array.from(cache.keys())
      .sort((a, b) => cache.get(b).lastAccessTime - cache.get(a).lastAccessTime)
      .slice(this.selectorCacheCountMin);
    const obsolete = Date.now() - this.selectorCacheAgeMax;

    let i = hostnames.length;
    while (i--) {
      const hostname = hostnames[i];
      const entry = cache.get(hostname);
      if (entry.lastAccessTime > obsolete) {
        break;
      }
      // console.debug('pruneSelectorCacheAsync: flushing "%s"', hostname);
      entry.dispose();
      cache.delete(hostname);
    }
    if (cache.size > this.selectorCacheCountMin) {
      this.triggerSelectorCachePruner();
    }
  };

  /** *************************************************************************** */

  FilterContainer.prototype.randomAlphaToken = function () {
    return (
      String.fromCharCode((Date.now() % 26) + 97)
      + Math.floor(Math.random() * 982451653 + 982451653).toString(36)
    );
  };

  /** *************************************************************************** */

  FilterContainer.prototype.retrieveGenericSelectors = function (request) {
    if (this.acceptedCount === 0) {
      return;
    }
    if (!request.ids && !request.classes) {
      return;
    }

    // console.time('cosmeticFilteringEngine.retrieveGenericSelectors');

    const simpleSelectors = this.setRegister0;

    const complexSelectors = this.setRegister1;

    const cacheEntry = this.selectorCache.get(request.hostname);

    const previousHits = (cacheEntry && cacheEntry.cosmetic) || this.setRegister2;

    for (const type in this.lowlyGeneric) {
      const entry = this.lowlyGeneric[type];
      const selectors = request[entry.canonical];
      if (Array.isArray(selectors) === false) {
        continue;
      }
      for (let selector of selectors) {
        if (entry.simple.has(selector) === false) {
          continue;
        }
        const bucket = entry.complex.get(selector);
        if (bucket !== undefined) {
          if (Array.isArray(bucket)) {
            for (selector of bucket) {
              if (previousHits.has(selector) === false) {
                complexSelectors.add(selector);
              }
            }
          } else if (previousHits.has(bucket) === false) {
            complexSelectors.add(bucket);
          }
        } else {
          selector = entry.prefix + selector;
          if (previousHits.has(selector) === false) {
            simpleSelectors.add(selector);
          }
        }
      }
    }

    // Apply exceptions: it is the responsibility of the caller to provide
    // the exceptions to be applied.
    if (Array.isArray(request.exceptions)) {
      for (const exception of request.exceptions) {
        simpleSelectors.delete(exception);
        complexSelectors.delete(exception);
      }
    }

    if (simpleSelectors.size === 0 && complexSelectors.size === 0) {
      return;
    }

    const out = {
      simple: Array.from(simpleSelectors),
      complex: Array.from(complexSelectors),
      injected: '',
    };

    // Cache and inject (if user stylesheets supported) looked-up low generic
    // cosmetic filters.
    if (typeof request.hostname === 'string' && request.hostname !== '') {
      this.addToSelectorCache({
        cost: request.surveyCost || 0,
        hostname: request.hostname,
        injectedHideFilters: '',
        selectors: out.simple.concat(out.complex),
        type: 'cosmetic',
      });
    }

    // If user stylesheets are supported in the current process, inject the
    // cosmetic filters now.
    if (supportsUserStylesheets && request.tabId !== undefined && request.frameId !== undefined) {
      const injected = [];
      if (out.simple.length !== 0) {
        injected.push(out.simple.join(',\n'));
        out.simple = [];
      }
      if (out.complex.length !== 0) {
        injected.push(out.complex.join(',\n'));
        out.complex = [];
      }
      out.injected = injected.join(',\n');
      vAPI.insertCSS(request.tabId, {
        code: `${out.injected}\n{display:none!important;}`,
        cssOrigin: 'user',
        frameId: request.frameId,
        runAt: 'document_start',
      });
    }

    // Important: always clear used registers before leaving.
    this.setRegister0.clear();
    this.setRegister1.clear();

    // console.timeEnd('cosmeticFilteringEngine.retrieveGenericSelectors');

    return out;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.retrieveSpecificSelectors = function (request, options) {
    // console.time('cosmeticFilteringEngine.retrieveSpecificSelectors');

    const hostname = request.hostname;

    const cacheEntry = this.selectorCache.get(hostname);

    // https://github.com/chrisaljoudi/uBlock/issues/587
    // out.ready will tell the content script the cosmetic filtering engine is
    // up and ready.

    // https://github.com/chrisaljoudi/uBlock/issues/497
    // Generic exception filters are to be applied on all pages.

    const out = {
      ready: this.frozen,
      hostname,
      domain: request.domain,
      declarativeFilters: [],
      exceptionFilters: [],
      hideNodeAttr: this.randomAlphaToken(),
      hideNodeStyleSheetInjected: false,
      highGenericHideSimple: '',
      highGenericHideComplex: '',
      injectedHideFilters: '',
      networkFilters: '',
      noDOMSurveying: this.hasGenericHide === false,
      proceduralFilters: [],
    };

    if (options.noCosmeticFiltering !== true) {
      const entity = request.entity;

      const domainHash = staticExtFilteringEngine.makeHash(request.domain);

      const entityHash = staticExtFilteringEngine.makeHash(entity);

      let bucket;

      // Exception cosmetic filters: prime with generic exception filters.
      const exceptionSet = this.setRegister0;
      // Genetic exceptions (should be extremely rare).
      for (const exception of this.genericDonthideSet) {
        exceptionSet.add(exception);
      }
      // Specific exception cosmetic filters.
      if (domainHash !== 0) {
        bucket = this.specificFilters.get(domainHash | 0b0001);
        if (bucket !== undefined) {
          bucket.retrieve(hostname, exceptionSet);
        }
        bucket = this.specificFilters.get(domainHash | 0b0011);
        if (bucket !== undefined) {
          bucket.retrieve(hostname, exceptionSet);
        }
      }
      // Specific entity-based exception cosmetic filters.
      if (entityHash !== 0) {
        bucket = this.specificFilters.get(entityHash | 0b0001);
        if (bucket !== undefined) {
          bucket.retrieve(entity, exceptionSet);
        }
        bucket = this.specificFilters.get(entityHash | 0b0011);
        if (bucket !== undefined) {
          bucket.retrieve(entity, exceptionSet);
        }
      }
      // Special bucket for those filters without a valid
      // domain name as per PSL.
      bucket = this.specificFilters.get(0 | 0b0001);
      if (bucket !== undefined) {
        bucket.retrieve(hostname, exceptionSet);
      }
      bucket = this.specificFilters.get(0 | 0b0011);
      if (bucket !== undefined) {
        bucket.retrieve(hostname, exceptionSet);
      }
      if (exceptionSet.size !== 0) {
        out.exceptionFilters = Array.from(exceptionSet);
      }

      // Declarative cosmetic filters.
      // TODO: Should I go one step further and store specific simple and
      //       specific complex in different collections? This could simplify
      //       slightly content script code.
      const specificSet = this.setRegister1;
      // Specific cosmetic filters.
      if (domainHash !== 0) {
        bucket = this.specificFilters.get(domainHash | 0b0000);
        if (bucket !== undefined) {
          bucket.retrieve(hostname, specificSet);
        }
      }
      // Specific entity-based cosmetic filters.
      if (entityHash !== 0) {
        bucket = this.specificFilters.get(entityHash | 0b0000);
        if (bucket !== undefined) {
          bucket.retrieve(entity, specificSet);
        }
      }
      // https://github.com/chrisaljoudi/uBlock/issues/188
      //   Special bucket for those filters without a valid domain name
      //   as per PSL
      bucket = this.specificFilters.get(0 | 0b0000);
      if (bucket !== undefined) {
        bucket.retrieve(hostname, specificSet);
      }
      // Cached cosmetic filters: these are always declarative.
      if (cacheEntry !== undefined) {
        cacheEntry.retrieve('cosmetic', specificSet);
        if (out.noDOMSurveying === false) {
          out.noDOMSurveying = cacheEntry.cosmeticSurveyingMissCount > cosmeticSurveyingMissCountMax;
        }
      }

      // Procedural cosmetic filters.
      const proceduralSet = this.setRegister2;
      // Specific cosmetic filters.
      if (domainHash !== 0) {
        bucket = this.specificFilters.get(domainHash | 0b0010);
        if (bucket !== undefined) {
          bucket.retrieve(hostname, proceduralSet);
        }
      }
      // Specific entity-based cosmetic filters.
      if (entityHash !== 0) {
        bucket = this.specificFilters.get(entityHash | 0b0010);
        if (bucket !== undefined) {
          bucket.retrieve(entity, proceduralSet);
        }
      }
      // https://github.com/chrisaljoudi/uBlock/issues/188
      //   Special bucket for those filters without a valid domain name
      //   as per PSL
      bucket = this.specificFilters.get(0 | 0b0010);
      if (bucket !== undefined) {
        bucket.retrieve(hostname, proceduralSet);
      }

      // Apply exceptions.
      for (const exception of exceptionSet) {
        specificSet.delete(exception);
        proceduralSet.delete(exception);
      }
      if (specificSet.size !== 0) {
        out.declarativeFilters = Array.from(specificSet);
      }
      if (proceduralSet.size !== 0) {
        out.proceduralFilters = Array.from(proceduralSet);
      }

      // Highly generic cosmetic filters: sent once along with specific ones.
      // A most-recent-used cache is used to skip computing the resulting set
      //   of high generics for a given set of exceptions.
      // The resulting set of high generics is stored as a string, ready to
      //   be used as-is by the content script. The string is stored
      //   indirectly in the mru cache: this is to prevent duplication of the
      //   string in memory, which I have observed occurs when the string is
      //   stored directly as a value in a Map.
      if (options.noGenericCosmeticFiltering !== true) {
        const exceptionHash = out.exceptionFilters.join();
        for (const type in this.highlyGeneric) {
          const entry = this.highlyGeneric[type];
          let str = entry.mru.lookup(exceptionHash);
          if (str === undefined) {
            str = { s: entry.str };
            let genericSet = entry.dict;
            let hit = false;
            for (const exception of exceptionSet) {
              if ((hit = genericSet.has(exception))) {
                break;
              }
            }
            if (hit) {
              genericSet = new Set(entry.dict);
              for (const exception of exceptionSet) {
                genericSet.delete(exception);
              }
              str.s = Array.from(genericSet).join(',\n');
            }
            entry.mru.add(exceptionHash, str);
          }
          out[entry.canonical] = str.s;
        }
      }

      // Important: always clear used registers before leaving.
      this.setRegister0.clear();
      this.setRegister1.clear();
      this.setRegister2.clear();
    }

    // CSS selectors for collapsible blocked elements
    if (cacheEntry) {
      const networkFilters = [];
      cacheEntry.retrieve('net', networkFilters);
      out.networkFilters = networkFilters.join(',\n');
    }

    // https://github.com/gorhill/uBlock/issues/3160
    //   If user stylesheets are supported in the current process, inject the
    //   cosmetic filters now.
    if (supportsUserStylesheets && request.tabId !== undefined && request.frameId !== undefined) {
      const injectedHideFilters = [];
      if (out.declarativeFilters.length !== 0) {
        injectedHideFilters.push(out.declarativeFilters.join(',\n'));
        out.declarativeFilters = [];
      }
      if (out.proceduralFilters.length !== 0) {
        injectedHideFilters.push(`[${out.hideNodeAttr}]`);
        out.hideNodeStyleSheetInjected = true;
      }
      if (out.highGenericHideSimple.length !== 0) {
        injectedHideFilters.push(out.highGenericHideSimple);
        out.highGenericHideSimple = '';
      }
      if (out.highGenericHideComplex.length !== 0) {
        injectedHideFilters.push(out.highGenericHideComplex);
        out.highGenericHideComplex = '';
      }
      out.injectedHideFilters = injectedHideFilters.join(',\n');
      const details = {
        code: '',
        cssOrigin: 'user',
        frameId: request.frameId,
        runAt: 'document_start',
      };
      if (out.injectedHideFilters.length !== 0) {
        details.code = `${out.injectedHideFilters}\n{display:none!important;}`;
        vAPI.insertCSS(request.tabId, details);
      }
      if (out.networkFilters.length !== 0) {
        details.code = `${out.networkFilters}\n{display:none!important;}`;
        vAPI.insertCSS(request.tabId, details);
        out.networkFilters = '';
      }
    }

    // console.timeEnd('cosmeticFilteringEngine.retrieveSpecificSelectors');

    return out;
  };

  /** *************************************************************************** */

  FilterContainer.prototype.getFilterCount = function () {
    return this.acceptedCount - this.discardedCount;
  };

  /** *************************************************************************** */

  return new FilterContainer();

  /** *************************************************************************** */
}());

/** *****************************************************************************

  All static extended filters are of the form:

  field 1: one hostname, or a list of comma-separated hostnames
  field 2: `##` or `#@#`
  field 3: selector

  The purpose of the static extended filtering engine is to coarse-parse and
  dispatch to appropriate specialized filtering engines. There are currently
  three specialized filtering engines:

  - cosmetic filtering (aka "element hiding" in Adblock Plus)
  - scriptlet injection: selector starts with `script:inject`
    - New shorter syntax (1.15.12): `example.com##+js(bab-defuser.js)`
  - html filtering: selector starts with `^`

  Depending on the specialized filtering engine, field 1 may or may not be
  optional.

  The static extended filtering engine also offers parsing capabilities which
  are available to all other specialized fitlering engines. For example,
  cosmetic and html filtering can ask the extended filtering engine to
  compile/validate selectors.

* */

const staticExtFilteringEngine = (function () {
  const reHasUnicode = /[^\x00-\x7F]/;
  const reParseRegexLiteral = /^\/(.+)\/([imu]+)?$/;
  const emptyArray = [];
  const parsed = {
    hostnames: [],
    exception: false,
    suffix: '',
  };

  // To be called to ensure no big parent string of a string slice is
  // left into memory after parsing filter lists is over.
  const resetParsed = function () {
    parsed.hostnames = [];
    parsed.suffix = '';
  };

  // CLIQZ: assume all selectors are valid
  const isValidCSSSelector = () => true;

  const isBadRegex = function (s) {
    try {
      void new RegExp(s);
    } catch (ex) {
      isBadRegex.message = ex.toString();
      return true;
    }
    return false;
  };

  const translateAdguardCSSInjectionFilter = function (suffix) {
    const matches = /^([^{]+)\{([^}]+)\}$/.exec(suffix);
    if (matches === null) {
      return '';
    }
    const selector = matches[1].trim();
    const style = matches[2].trim();
    // For some reasons, many of Adguard's plain cosmetic filters are
    // "disguised" as style-based cosmetic filters: convert such filters
    // to plain cosmetic filters.
    return /display\s*:\s*none\s*!important;?$/.test(style)
      ? selector
      : `${selector}:style(${style})`;
  };

  const hostnamesFromPrefix = function (s) {
    const hostnames = [];
    const hasUnicode = reHasUnicode.test(s);
    let beg = 0;
    while (beg < s.length) {
      let end = s.indexOf(',', beg);
      if (end === -1) {
        end = s.length;
      }
      let hostname = s.slice(beg, end).trim();
      if (hostname.length !== 0) {
        if (hasUnicode) {
          hostname = hostname.charCodeAt(0) === 0x7e /* '~' */
            ? `~${punycode.toASCII(hostname.slice(1))}`
            : punycode.toASCII(hostname);
        }
        hostnames.push(hostname);
      }
      beg = end + 1;
    }
    return hostnames;
  };

  const compileProceduralSelector = (function () {
    const reProceduralOperator = new RegExp(
      [
        '^(?:',
        [
          '-abp-contains',
          '-abp-has',
          'contains',
          'has',
          'has-text',
          'if',
          'if-not',
          'matches-css',
          'matches-css-after',
          'matches-css-before',
          'not',
          'watch-attrs',
          'xpath',
        ].join('|'),
        ')\\(',
      ].join(''),
    );

    const reEscapeRegex = /[.*+?^${}()|[\]\\]/g;

    const reNeedScope = /^\s*[+>~]/;

    const reIsDanglingSelector = /(?:[+>~]\s*|\s+)$/;

    const regexToRawValue = new Map();
    let lastProceduralSelector = '';

    let lastProceduralSelectorCompiled;

    const compileText = function (s) {
      const match = reParseRegexLiteral.exec(s);
      let regexDetails;
      if (match !== null) {
        regexDetails = match[1];
        if (isBadRegex(regexDetails)) {
          return;
        }
        if (match[2]) {
          regexDetails = [regexDetails, match[2]];
        }
      } else {
        regexDetails = s.replace(reEscapeRegex, '\\$&');
        regexToRawValue.set(regexDetails, s);
      }
      return regexDetails;
    };

    const compileCSSDeclaration = function (s) {
      const pos = s.indexOf(':');
      if (pos === -1) {
        return;
      }
      const name = s.slice(0, pos).trim();
      const value = s.slice(pos + 1).trim();
      const match = reParseRegexLiteral.exec(value);
      let regexDetails;
      if (match !== null) {
        regexDetails = match[1];
        if (isBadRegex(regexDetails)) {
          return;
        }
        if (match[2]) {
          regexDetails = [regexDetails, match[2]];
        }
      } else {
        regexDetails = `^${value.replace(reEscapeRegex, '\\$&')}$`;
        regexToRawValue.set(regexDetails, value);
      }
      return { name, value: regexDetails };
    };

    const compileConditionalSelector = function (s) {
      // https://github.com/AdguardTeam/ExtendedCss/issues/31#issuecomment-302391277
      // Prepend `:scope ` if needed.
      if (reNeedScope.test(s)) {
        s = `:scope ${s}`;
      }
      return compile(s);
    };

    const compileNotSelector = function (s) {
      // https://github.com/uBlockOrigin/uBlock-issues/issues/341#issuecomment-447603588
      //   Reject instances of :not() filters for which the argument is
      //   a valid CSS selector, otherwise we would be adversely
      //   changing the behavior of CSS4's :not().
      if (isValidCSSSelector(s) === false) {
        return compileConditionalSelector(s);
      }
    };

    const compileSpathExpression = function (s) {
      if (isValidCSSSelector(`*${s}`)) {
        return s;
      }
    };

    const compileAttrList = function (s) {
      const attrs = s.split('s*,s*');
      const out = [];
      for (const attr of attrs) {
        if (attr !== '') {
          out.push(attr);
        }
      }
      return out;
    };

    const compileXpathExpression = function (s) {
      try {
        document.createExpression(s, null);
      } catch (e) {
        return;
      }
      return s;
    };

    // https://github.com/gorhill/uBlock/issues/2793
    const normalizedOperators = new Map([
      [':-abp-contains', ':has-text'],
      [':-abp-has', ':has'],
      [':contains', ':has-text'],
    ]);

    const compileArgument = new Map([
      [':has', compileConditionalSelector],
      [':has-text', compileText],
      [':if', compileConditionalSelector],
      [':if-not', compileConditionalSelector],
      [':matches-css', compileCSSDeclaration],
      [':matches-css-after', compileCSSDeclaration],
      [':matches-css-before', compileCSSDeclaration],
      [':not', compileNotSelector],
      [':spath', compileSpathExpression],
      [':watch-attrs', compileAttrList],
      [':xpath', compileXpathExpression],
    ]);

    // https://github.com/gorhill/uBlock/issues/2793#issuecomment-333269387
    //   Normalize (somewhat) the stringified version of procedural
    //   cosmetic filters -- this increase the likelihood of detecting
    //   duplicates given that uBO is able to understand syntax specific
    //   to other blockers.
    //   The normalized string version is what is reported in the logger,
    //   by design.
    const decompile = function (compiled) {
      const tasks = compiled.tasks;
      if (Array.isArray(tasks) === false) {
        return compiled.selector;
      }
      const raw = [compiled.selector];
      let value;
      for (const task of tasks) {
        switch (task[0]) {
          case ':has':
          case ':if':
            raw.push(':has', '(', decompile(task[1]), ')');
            break;
          case ':has-text':
            if (Array.isArray(task[1])) {
              value = `/${task[1][0]}/${task[1][1]}`;
            } else {
              value = regexToRawValue.get(task[1]);
              if (value === undefined) {
                value = `/${task[1]}/`;
              }
            }
            raw.push(task[0], '(', value, ')');
            break;
          case ':matches-css':
          case ':matches-css-after':
          case ':matches-css-before':
            if (Array.isArray(task[1].value)) {
              value = `/${task[1].value[0]}/${task[1].value[1]}`;
            } else {
              value = regexToRawValue.get(task[1].value);
              if (value === undefined) {
                value = `/${task[1].value}/`;
              }
            }
            raw.push(task[0], '(', task[1].name, ': ', value, ')');
            break;
          case ':not':
          case ':if-not':
            raw.push(':not', '(', decompile(task[1]), ')');
            break;
          case ':spath':
          case ':watch-attrs':
          case ':xpath':
            raw.push(task[0], '(', task[1], ')');
            break;
        }
      }
      return raw.join('');
    };

    const compile = function (raw) {
      if (raw === '') {
        return;
      }
      let prefix = '';

      let tasks = [];
      let i = 0;

      const n = raw.length;

      let opPrefixBeg = 0;
      for (;;) {
        let c;
        let match;
        // Advance to next operator.
        while (i < n) {
          c = raw.charCodeAt(i++);
          if (c === 0x3a /* ':' */) {
            match = reProceduralOperator.exec(raw.slice(i));
            if (match !== null) {
              break;
            }
          }
        }
        if (i === n) {
          break;
        }
        const opNameBeg = i - 1;
        const opNameEnd = i + match[0].length - 1;
        i += match[0].length;
        // Find end of argument: first balanced closing parenthesis.
        // Note: unbalanced parenthesis can be used in a regex literal
        // when they are escaped using `\`.
        // TODO: need to handle quoted parentheses.
        let pcnt = 1;
        while (i < n) {
          c = raw.charCodeAt(i++);
          if (c === 0x5c /* '\\' */) {
            if (i < n) {
              i += 1;
            }
          } else if (c === 0x28 /* '(' */) {
            pcnt += 1;
          } else if (c === 0x29 /* ')' */) {
            pcnt -= 1;
            if (pcnt === 0) {
              break;
            }
          }
        }
        // Unbalanced parenthesis? An unbalanced parenthesis is fine
        // as long as the last character is a closing parenthesis.
        if (pcnt !== 0 && c !== 0x29) {
          return;
        }
        // https://github.com/uBlockOrigin/uBlock-issues/issues/341#issuecomment-447603588
        //   Maybe that one operator is a valid CSS selector and if so,
        //   then consider it to be part of the prefix. If there is
        //   at least one task present, then we fail, as we do not
        //   support suffix CSS selectors.
        if (isValidCSSSelector(raw.slice(opNameBeg, i))) {
          continue;
        }
        // Extract and remember operator details.
        let operator = raw.slice(opNameBeg, opNameEnd);
        operator = normalizedOperators.get(operator) || operator;
        let args = raw.slice(opNameEnd + 1, i - 1);
        args = compileArgument.get(operator)(args);
        if (args === undefined) {
          return;
        }
        if (opPrefixBeg === 0) {
          prefix = raw.slice(0, opNameBeg);
        } else if (opNameBeg !== opPrefixBeg) {
          const spath = compileSpathExpression(raw.slice(opPrefixBeg, opNameBeg));
          if (spath === undefined) {
            return;
          }
          tasks.push([':spath', spath]);
        }
        tasks.push([operator, args]);
        opPrefixBeg = i;
        if (i === n) {
          break;
        }
      }
      // No task found: then we have a CSS selector.
      // At least one task found: nothing should be left to parse.
      if (tasks.length === 0) {
        prefix = raw;
        tasks = undefined;
      } else if (opPrefixBeg < n) {
        const spath = compileSpathExpression(raw.slice(opPrefixBeg));
        if (spath === undefined) {
          return;
        }
        tasks.push([':spath', spath]);
      }
      // https://github.com/NanoAdblocker/NanoCore/issues/1#issuecomment-354394894
      if (prefix !== '') {
        if (reIsDanglingSelector.test(prefix)) {
          prefix += '*';
        }
        if (isValidCSSSelector(prefix) === false) {
          return;
        }
      }
      return { selector: prefix, tasks };
    };

    const entryPoint = function (raw) {
      if (raw === lastProceduralSelector) {
        return lastProceduralSelectorCompiled;
      }
      lastProceduralSelector = raw;
      let compiled = compile(raw);
      if (compiled !== undefined) {
        compiled.raw = decompile(compiled);
        compiled = JSON.stringify(compiled);
      }
      lastProceduralSelectorCompiled = compiled;
      return compiled;
    };

    entryPoint.reset = function () {
      regexToRawValue.clear();
      lastProceduralSelector = '';
      lastProceduralSelectorCompiled = undefined;
    };

    return entryPoint;
  }());

  //--------------------------------------------------------------------------
  // Public API
  //--------------------------------------------------------------------------

  const api = {
    get acceptedCount() {
      return (
        cosmeticFilteringEngine.acceptedCount
        + scriptletFilteringEngine.acceptedCount
        + htmlFilteringEngine.acceptedCount
      );
    },
    get discardedCount() {
      return (
        cosmeticFilteringEngine.discardedCount
        + scriptletFilteringEngine.discardedCount
        + htmlFilteringEngine.discardedCount
      );
    },
  };

  //--------------------------------------------------------------------------
  // Public classes
  //--------------------------------------------------------------------------

  api.HostnameBasedDB = function (selfie) {
    if (selfie !== undefined) {
      this.db = new Map(selfie.map);
      this.size = selfie.size;
    } else {
      this.db = new Map();
      this.size = 0;
    }
  };

  api.HostnameBasedDB.prototype = {
    add(hash, entry) {
      const bucket = this.db.get(hash);
      if (bucket === undefined) {
        this.db.set(hash, entry);
      } else if (Array.isArray(bucket)) {
        bucket.push(entry);
      } else {
        this.db.set(hash, [bucket, entry]);
      }
      this.size += 1;
    },
    clear() {
      this.db.clear();
      this.size = 0;
    },
    retrieve(hash, hostname, out) {
      let bucket = this.db.get(hash);
      if (bucket === undefined) {
        return;
      }
      if (Array.isArray(bucket) === false) {
        bucket = [bucket];
      }
      for (const entry of bucket) {
        if (hostname.endsWith(entry.hostname) === false) {
          continue;
        }
        const i = hostname.length - entry.hostname.length;
        if (i === 0 || i === hostname.length || hostname.charCodeAt(i - 1) === 0x2e /* '.' */) {
          out.push(entry);
        }
      }
    },
    toSelfie() {
      return {
        map: Array.from(this.db),
        size: this.size,
      };
    },
  };

  api.HostnameBasedDB.prototype[Symbol.iterator] = (function () {
    const Iter = function (db) {
      this.mapIter = db.values();
      this.arrayIter = undefined;
    };
    Iter.prototype.next = function () {
      let result;
      if (this.arrayIter !== undefined) {
        result = this.arrayIter.next();
        if (result.done === false) {
          return result;
        }
        this.arrayIter = undefined;
      }
      result = this.mapIter.next();
      if (result.done || Array.isArray(result.value) === false) {
        return result;
      }
      this.arrayIter = result.value[Symbol.iterator]();
      return this.arrayIter.next(); // array should never be empty
    };
    return function () {
      return new Iter(this.db);
    };
  }());

  //--------------------------------------------------------------------------
  // Public methods
  //--------------------------------------------------------------------------

  api.reset = function () {
    compileProceduralSelector.reset();
    cosmeticFilteringEngine.reset();
    scriptletFilteringEngine.reset();
    htmlFilteringEngine.reset();
    resetParsed(parsed);
  };

  api.freeze = function () {
    compileProceduralSelector.reset();
    cosmeticFilteringEngine.freeze();
    scriptletFilteringEngine.freeze();
    htmlFilteringEngine.freeze();
    resetParsed(parsed);
  };

  // HHHHHHHHHHHH0000
  //            |   |
  //            |   |
  //            |   +-- bit  3-0: reserved
  //            +------ bit 15-4: FNV
  api.makeHash = function (token) {
    // Based on: FNV32a
    // http://www.isthe.com/chongo/tech/comp/fnv/index.html#FNV-reference-source
    // The rest is custom, suited for uBlock.
    const i1 = token.length;
    if (i1 === 0) {
      return 0;
    }
    const i2 = i1 >> 1;
    const i4 = i1 >> 2;
    const i8 = i1 >> 3;
    let hval = (0x811c9dc5 ^ token.charCodeAt(0)) >>> 0;
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    hval >>>= 0;
    hval ^= token.charCodeAt(i8);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    hval >>>= 0;
    hval ^= token.charCodeAt(i4);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    hval >>>= 0;
    hval ^= token.charCodeAt(i4 + i8);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    hval >>>= 0;
    hval ^= token.charCodeAt(i2);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    hval >>>= 0;
    hval ^= token.charCodeAt(i2 + i8);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    hval >>>= 0;
    hval ^= token.charCodeAt(i2 + i4);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    hval >>>= 0;
    hval ^= token.charCodeAt(i1 - 1);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    hval >>>= 0;
    hval &= 0xfff0;
    // Can't return 0, it's reserved for empty string.
    return hval !== 0 ? hval : 0xfff0;
  };

  api.compileHostnameToHash = function (hostname) {
    let domain;
    if (hostname.endsWith('.*')) {
      const pos = hostname.lastIndexOf('.', hostname.length - 3);
      domain = pos !== -1 ? hostname.slice(pos + 1) : hostname;
    } else {
      domain = URI.domainFromHostnameNoCache(hostname);
    }
    return api.makeHash(domain);
  };

  // https://github.com/chrisaljoudi/uBlock/issues/1004
  //   Detect and report invalid CSS selectors.

  // Discard new ABP's `-abp-properties` directive until it is
  // implemented (if ever). Unlikely, see:
  // https://github.com/gorhill/uBlock/issues/1752

  // https://github.com/gorhill/uBlock/issues/2624
  //   Convert Adguard's `-ext-has='...'` into uBO's `:has(...)`.

  // https://github.com/uBlockOrigin/uBlock-issues/issues/89
  //   Do not discard unknown pseudo-elements.

  api.compileSelector = (function () {
    const reAfterBeforeSelector = /^(.+?)(::?after|::?before|::[a-z-]+)$/;
    const reStyleSelector = /^(.+?):style\((.+?)\)$/;
    const reStyleBad = /url\(/;
    const reExtendedSyntax = /\[-(?:abp|ext)-[a-z-]+=(['"])(?:.+?)(?:\1)\]/;
    const reExtendedSyntaxParser = /\[-(?:abp|ext)-([a-z-]+)=(['"])(.+?)\2\]/;

    const normalizedExtendedSyntaxOperators = new Map([
      ['contains', ':has-text'],
      ['has', ':has'],
      ['matches-css', ':matches-css'],
      ['matches-css-after', ':matches-css-after'],
      ['matches-css-before', ':matches-css-before'],
    ]);

    // CLIQZ: assume properties are valid
    const isValidStyleProperty = () => true;

    const entryPoint = function (raw) {
      const extendedSyntax = reExtendedSyntax.test(raw);
      if (isValidCSSSelector(raw) && extendedSyntax === false) {
        return raw;
      }

      // We  rarely reach this point -- majority of selectors are plain
      // CSS selectors.

      let matches;
      let operator;

      // Supported Adguard/ABP advanced selector syntax: will translate into
      // uBO's syntax before further processing.
      // Mind unsupported advanced selector syntax, such as ABP's
      // `-abp-properties`.
      // Note: extended selector syntax has been deprecated in ABP, in favor
      // of the procedural one (i.e. `:operator(...)`). See
      // https://issues.adblockplus.org/ticket/5287
      if (extendedSyntax) {
        while ((matches = reExtendedSyntaxParser.exec(raw)) !== null) {
          operator = normalizedExtendedSyntaxOperators.get(matches[1]);
          if (operator === undefined) {
            return;
          }
          raw = `${raw.slice(0, matches.index) + operator}(${matches[3]})${raw.slice(
            matches.index + matches[0].length,
          )}`;
        }
        return entryPoint(raw);
      }

      let selector = raw;

      let pseudoclass;
      let style;

      // `:style` selector?
      if ((matches = reStyleSelector.exec(selector)) !== null) {
        selector = matches[1];
        style = matches[2];
      }

      // https://github.com/gorhill/uBlock/issues/2448
      // :after- or :before-based selector?
      if ((matches = reAfterBeforeSelector.exec(selector))) {
        selector = matches[1];
        pseudoclass = matches[2];
      }

      if (style !== undefined || pseudoclass !== undefined) {
        if (isValidCSSSelector(selector) === false) {
          return;
        }
        if (pseudoclass !== undefined) {
          selector += pseudoclass;
        }
        if (style !== undefined) {
          if (isValidStyleProperty(style) === false) {
            return;
          }
          return JSON.stringify({
            raw,
            style: [selector, style],
          });
        }
        return JSON.stringify({
          raw,
          pseudoclass: true,
        });
      }

      // Procedural selector?
      let compiled;
      if ((compiled = compileProceduralSelector(raw))) {
        return compiled;
      }
    };

    return entryPoint;
  }());

  api.compile = function (raw, writer) {
    const lpos = raw.indexOf('#');
    if (lpos === -1) {
      return false;
    }
    let rpos = lpos + 1;
    if (raw.charCodeAt(rpos) !== 0x23 /* '#' */) {
      rpos = raw.indexOf('#', rpos + 1);
      if (rpos === -1) {
        return false;
      }
    }

    // Coarse-check that the anchor is valid.
    // `##`: l = 1
    // `#@#`, `#$#`, `#%#`, `#?#`: l = 2
    // `#@$#`, `#@%#`, `#@?#`: l = 3
    if (rpos - lpos > 3) {
      return false;
    }

    // Extract the selector.
    let suffix = raw.slice(rpos + 1).trim();
    if (suffix.length === 0) {
      return false;
    }
    parsed.suffix = suffix;

    // https://github.com/gorhill/uBlock/issues/952
    //   Find out whether we are dealing with an Adguard-specific cosmetic
    //   filter, and if so, translate it if supported, or discard it if not
    //   supported.
    //   We have an Adguard/ABP cosmetic filter if and only if the
    //   character is `$`, `%` or `?`, otherwise it's not a cosmetic
    //   filter.
    const cCode = raw.charCodeAt(rpos - 1);
    if (cCode !== 0x23 /* '#' */ && cCode !== 0x40 /* '@' */) {
      // Adguard's scriptlet injection: not supported.
      if (cCode === 0x25 /* '%' */) {
        return true;
      }
      // Not a known extended filter.
      if (cCode !== 0x24 /* '$' */ && cCode !== 0x3f /* '?' */) {
        return false;
      }
      // Adguard's style injection: translate to uBO's format.
      if (cCode === 0x24 /* '$' */) {
        suffix = translateAdguardCSSInjectionFilter(suffix);
        if (suffix === '') {
          return true;
        }
        parsed.suffix = suffix;
      }
    }

    // Exception filter?
    parsed.exception = raw.charCodeAt(lpos + 1) === 0x40;

    // Extract the hostname(s), punycode if required.
    if (lpos === 0) {
      parsed.hostnames = emptyArray;
    } else {
      parsed.hostnames = hostnamesFromPrefix(raw.slice(0, lpos));
    }

    // Backward compatibility with deprecated syntax.
    if (suffix.startsWith('script:')) {
      if (suffix.startsWith('script:inject')) {
        suffix = parsed.suffix = `+js${suffix.slice(13)}`;
      } else if (suffix.startsWith('script:contains')) {
        suffix = parsed.suffix = `^script:has-text${suffix.slice(15)}`;
      }
    }

    const c0 = suffix.charCodeAt(0);

    // New shorter syntax for scriptlet injection engine.
    if (c0 === 0x2b /* '+' */ && suffix.startsWith('+js')) {
      scriptletFilteringEngine.compile(parsed, writer);
      return true;
    }

    // HTML filtering engine.
    // TODO: evaluate converting Adguard's `$$` syntax into uBO's HTML
    //       filtering syntax.
    if (c0 === 0x5e /* '^' */) {
      htmlFilteringEngine.compile(parsed, writer);
      return true;
    }

    // Cosmetic filtering engine.
    cosmeticFilteringEngine.compile(parsed, writer);
    return true;
  };

  api.fromCompiledContent = function (reader, options) {
    cosmeticFilteringEngine.fromCompiledContent(reader, options);
    scriptletFilteringEngine.fromCompiledContent(reader, options);
    htmlFilteringEngine.fromCompiledContent(reader, options);
  };

  api.toSelfie = function () {
    return {
      cosmetic: cosmeticFilteringEngine.toSelfie(),
      scriptlets: scriptletFilteringEngine.toSelfie(),
      html: htmlFilteringEngine.toSelfie(),
    };
  };

  api.fromSelfie = function (selfie) {
    cosmeticFilteringEngine.fromSelfie(selfie.cosmetic);
    scriptletFilteringEngine.fromSelfie(selfie.scriptlets);
    htmlFilteringEngine.fromSelfie(selfie.html);
  };

  return api;
}());

const getBytesInUse = function (callback) {
  if (typeof callback !== 'function') {
    callback = this.noopFunc;
  }
  let bytesInUse;
  let countdown = 0;

  const process = (count) => {
    if (typeof count === 'number') {
      if (bytesInUse === undefined) {
        bytesInUse = 0;
      }
      bytesInUse += count;
    }
    countdown -= 1;
    if (countdown > 0) {
      return;
    }
    // µBlock.storageUsed = bytesInUse;
    callback(bytesInUse);
  };

  // Not all platforms implement this method.
  if (vAPI.storage.getBytesInUse instanceof Function) {
    countdown += 1;
    vAPI.storage.getBytesInUse(null, process);
  }
  if (this.cacheStorage !== vAPI.storage && this.cacheStorage.getBytesInUse instanceof Function) {
    countdown += 1;
    this.cacheStorage.getBytesInUse(null, process);
  }
  if (countdown === 0) {
    callback();
  }
};

/** *************************************************************************** */

const saveLocalSettings = (function () {
  const saveAfter = 4 * 60 * 1000;

  const onTimeout = () => {
    if (localSettingsLastModified > localSettingsLastSaved) {
      saveLocalSettings();
    }
    // CLIQZ: disable
    // vAPI.setTimeout(onTimeout, saveAfter);
  };

  // CLIQZ: disable
  // vAPI.setTimeout(onTimeout, saveAfter);

  return function (callback) {
    this.localSettingsLastSaved = Date.now();
    vAPI.storage.set(this.localSettings, callback);
  };
}());

/** *************************************************************************** */

const saveUserSettings = function () {
  vAPI.storage.set(this.userSettings);
};

/** *************************************************************************** */

const loadHiddenSettings = function () {
  vAPI.storage.get('hiddenSettings', (bin) => {
    if (bin instanceof Object === false) {
      return;
    }
    const hs = bin.hiddenSettings;
    if (hs instanceof Object) {
      const hsDefault = this.hiddenSettingsDefault;
      for (const key in hsDefault) {
        if (
          hsDefault.hasOwnProperty(key)
          && hs.hasOwnProperty(key)
          && typeof hs[key] === typeof hsDefault[key]
        ) {
          this.hiddenSettings[key] = hs[key];
        }
      }
    }
    if (vAPI.localStorage.getItem('immediateHiddenSettings') === null) {
      this.saveImmediateHiddenSettings();
    }
  });
};

// Note: Save only the settings which values differ from the default ones.
// This way the new default values in the future will properly apply for those
// which were not modified by the user.

const saveHiddenSettings = function (callback) {
  const bin = { hiddenSettings: {} };
  for (const prop in this.hiddenSettings) {
    if (
      this.hiddenSettings.hasOwnProperty(prop)
      && this.hiddenSettings[prop] !== this.hiddenSettingsDefault[prop]
    ) {
      bin.hiddenSettings[prop] = this.hiddenSettings[prop];
    }
  }
  vAPI.storage.set(bin, callback);
  this.saveImmediateHiddenSettings();
};

/** *************************************************************************** */

const hiddenSettingsFromString = function (raw) {
  const out = Object.assign({}, this.hiddenSettingsDefault);

  const lineIter = new LineIterator(raw);

  let line;
  let matches;
  let name;
  let value;
  while (lineIter.eot() === false) {
    line = lineIter.next();
    matches = /^\s*(\S+)\s+(.+)$/.exec(line);
    if (matches === null || matches.length !== 3) {
      continue;
    }
    name = matches[1];
    if (out.hasOwnProperty(name) === false) {
      continue;
    }
    value = matches[2];
    switch (typeof out[name]) {
      case 'boolean':
        if (value === 'true') {
          out[name] = true;
        } else if (value === 'false') {
          out[name] = false;
        }
        break;
      case 'string':
        out[name] = value;
        break;
      case 'number':
        out[name] = parseInt(value, 10);
        if (isNaN(out[name])) {
          out[name] = this.hiddenSettingsDefault[name];
        }
        break;
      default:
        break;
    }
  }
  return out;
};

const stringFromHiddenSettings = function () {
  const out = [];

  const keys = Object.keys(this.hiddenSettings).sort();
  for (const key of keys) {
    out.push(`${key} ${this.hiddenSettings[key]}`);
  }
  return out.join('\n');
};

/** *************************************************************************** */

// These settings must be available immediately on startup, without delay
// through the vAPI.localStorage. Add/remove settings as needed.

const saveImmediateHiddenSettings = function () {
  vAPI.localStorage.setItem(
    'immediateHiddenSettings',
    JSON.stringify({
      cacheStorageAPI: this.hiddenSettings.cacheStorageAPI,
      disableWebAssembly: this.hiddenSettings.disableWebAssembly,
      suspendTabsUntilReady: this.hiddenSettings.suspendTabsUntilReady,
      userResourcesLocation: this.hiddenSettings.userResourcesLocation,
    }),
  );
};

// Do this here to have these hidden settings loaded ASAP.
// CLIQZ: disable
// µBlock.loadHiddenSettings();

/** *************************************************************************** */

const savePermanentFirewallRules = function () {
  vAPI.storage.set({
    dynamicFilteringString: this.permanentFirewall.toString(),
  });
};

/** *************************************************************************** */

const savePermanentURLFilteringRules = function () {
  vAPI.storage.set({
    urlFilteringString: this.permanentURLFiltering.toString(),
  });
};

/** *************************************************************************** */

const saveHostnameSwitches = function () {
  vAPI.storage.set({
    hostnameSwitchesString: this.permanentSwitches.toString(),
  });
};

/** *************************************************************************** */

const saveWhitelist = function () {
  vAPI.storage.set({
    netWhitelist: this.stringFromWhitelist(this.netWhitelist),
  });
  this.netWhitelistModifyTime = Date.now();
};

/** *****************************************************************************

    TODO(seamless migration):
    The code related to 'remoteBlacklist' can be removed when I am confident
    all users have moved to a version of uBO which no longer depends on
    the property 'remoteBlacklists, i.e. v1.11 and beyond.

* */

const loadSelectedFilterLists = function (callback) {
  vAPI.storage.get('selectedFilterLists', (bin) => {
    // Select default filter lists if first-time launch.
    if (!bin || Array.isArray(bin.selectedFilterLists) === false) {
      assets.metadata((availableLists) => {
        saveSelectedFilterLists(autoSelectRegionalFilterLists(availableLists));
        callback();
      });
      return;
    }
    // TODO: Removes once 1.1.15 is in widespread use.
    // https://github.com/gorhill/uBlock/issues/3383
    vAPI.storage.remove('remoteBlacklists');
    selectedFilterLists = bin.selectedFilterLists;
    callback();
  });
};

const saveSelectedFilterLists = function (newKeys, append, callback) {
  if (typeof append === 'function') {
    callback = append;
    append = false;
  }
  const oldKeys = this.selectedFilterLists.slice();
  if (append) {
    newKeys = newKeys.concat(oldKeys);
  }
  const newSet = new Set(newKeys);
  // Purge unused filter lists from cache.
  for (let i = 0, n = oldKeys.length; i < n; i++) {
    if (newSet.has(oldKeys[i]) === false) {
      this.removeFilterList(oldKeys[i]);
    }
  }
  newKeys = Array.from(newSet);
  const bin = {
    selectedFilterLists: newKeys,
  };
  this.selectedFilterLists = newKeys;
  vAPI.storage.set(bin, callback);
};

/** *************************************************************************** */

const applyFilterListSelection = function (details, callback) {
  let selectedListKeySet = new Set(this.selectedFilterLists);

  let externalLists = this.userSettings.externalLists;

  let i;
  let n;
  let assetKey;

  // Filter lists to select
  if (Array.isArray(details.toSelect)) {
    if (details.merge) {
      for (i = 0, n = details.toSelect.length; i < n; i++) {
        selectedListKeySet.add(details.toSelect[i]);
      }
    } else {
      selectedListKeySet = new Set(details.toSelect);
    }
  }

  // Imported filter lists to remove
  if (Array.isArray(details.toRemove)) {
    const removeURLFromHaystack = function (haystack, needle) {
      return haystack
        .replace(new RegExp(`(^|\\n)${escapeRegex(needle)}(\\n|$)`, 'g'), '\n')
        .trim();
    };
    for (i = 0, n = details.toRemove.length; i < n; i++) {
      assetKey = details.toRemove[i];
      selectedListKeySet.delete(assetKey);
      externalLists = removeURLFromHaystack(externalLists, assetKey);
      this.removeFilterList(assetKey);
    }
  }

  // Filter lists to import
  if (typeof details.toImport === 'string') {
    // https://github.com/gorhill/uBlock/issues/1181
    //   Try mapping the URL of an imported filter list to the assetKey of an
    //   existing stock list.
    const assetKeyFromURL = function (url) {
      const needle = url.replace(/^https?:/, '');
      const assets = availableFilterLists;
      let asset;
      for (const assetKey in assets) {
        asset = assets[assetKey];
        if (asset.content !== 'filters') {
          continue;
        }
        if (typeof asset.contentURL === 'string') {
          if (asset.contentURL.endsWith(needle)) {
            return assetKey;
          }
          continue;
        }
        if (Array.isArray(asset.contentURL) === false) {
          continue;
        }
        for (i = 0, n = asset.contentURL.length; i < n; i++) {
          if (asset.contentURL[i].endsWith(needle)) {
            return assetKey;
          }
        }
      }
      return url;
    };
    const importedSet = new Set(this.listKeysFromCustomFilterLists(externalLists));

    const toImportSet = new Set(this.listKeysFromCustomFilterLists(details.toImport));
    for (const urlKey of toImportSet) {
      if (importedSet.has(urlKey)) {
        continue;
      }
      assetKey = assetKeyFromURL(urlKey);
      if (assetKey === urlKey) {
        importedSet.add(urlKey);
      }
      selectedListKeySet.add(assetKey);
    }
    externalLists = Array.from(importedSet)
      .sort()
      .join('\n');
  }

  const result = Array.from(selectedListKeySet);
  if (externalLists !== this.userSettings.externalLists) {
    this.userSettings.externalLists = externalLists;
    vAPI.storage.set({ externalLists });
  }
  this.saveSelectedFilterLists(result);
  if (typeof callback === 'function') {
    callback(result);
  }
};

/** *************************************************************************** */

const listKeysFromCustomFilterLists = function (raw) {
  const out = new Set();

  const reIgnore = /^[!#]/;

  const reValid = /^[a-z-]+:\/\/\S+/;

  const lineIter = new LineIterator(raw);

  let location;
  while (lineIter.eot() === false) {
    location = lineIter.next().trim();
    if (reIgnore.test(location) || !reValid.test(location)) {
      continue;
    }
    out.add(location);
  }
  return Array.from(out);
};

/** *************************************************************************** */

const saveUserFilters = function (content, callback) {
  // https://github.com/gorhill/uBlock/issues/1022
  // Be sure to end with an empty line.
  content = content.trim();
  if (content !== '') {
    content += '\n';
  }
  this.assets.put(this.userFiltersPath, content, callback);
  this.removeCompiledFilterList(this.userFiltersPath);
};

const loadUserFilters = function (callback) {
  return this.assets.get(this.userFiltersPath, callback);
};

/** *************************************************************************** */

const appendUserFilters = function (filters, options) {
  filters = filters.trim();
  if (filters.length === 0) {
    return;
  }

  // https://github.com/uBlockOrigin/uBlock-issues/issues/372
  //   Auto comment using user-defined template.
  let comment = '';
  if (
    options instanceof Object
    && options.autoComment === true
    && this.hiddenSettings.autoCommentFilterTemplate.indexOf('{{') !== -1
  ) {
    const d = new Date();
    comment = `! ${this.hiddenSettings.autoCommentFilterTemplate
      .replace('{{date}}', d.toLocaleDateString())
      .replace('{{time}}', d.toLocaleTimeString())
      .replace('{{origin}}', options.origin)}`;
  }

  const onSaved = () => {
    const compiledFilters = this.compileFilters(filters, { assetKey: this.userFiltersPath });
    const snfe = staticNetFilteringEngine;
    const cfe = cosmeticFilteringEngine;
    const acceptedCount = snfe.acceptedCount + cfe.acceptedCount;
    const discardedCount = snfe.discardedCount + cfe.discardedCount;
    this.applyCompiledFilters(compiledFilters, true);
    const entry = this.availableFilterLists[this.userFiltersPath];
    const deltaEntryCount = snfe.acceptedCount + cfe.acceptedCount - acceptedCount;
    const deltaEntryUsedCount = deltaEntryCount - (snfe.discardedCount + cfe.discardedCount - discardedCount);
    entry.entryCount += deltaEntryCount;
    entry.entryUsedCount += deltaEntryUsedCount;
    vAPI.storage.set({ availableFilterLists: this.availableFilterLists });
    staticNetFilteringEngine.freeze();
    redirectEngine.freeze();
    staticExtFilteringEngine.freeze();
    selfieManager.destroy();
  };

  const onLoaded = (details) => {
    if (details.error) {
      return;
    }
    // The comment, if any, will be applied if and only if it is different
    // from the last comment found in the user filter list.
    if (comment !== '') {
      const pos = details.content.lastIndexOf(comment);
      if (pos === -1 || details.content.indexOf('\n!', pos + 1) !== -1) {
        filters = `\n${comment}\n${filters}`;
      }
    }
    // https://github.com/chrisaljoudi/uBlock/issues/976
    //   If we reached this point, the filter quite probably needs to be
    //   added for sure: do not try to be too smart, trying to avoid
    //   duplicates at this point may lead to more issues.
    this.saveUserFilters(`${details.content.trim()}\n${filters}`, onSaved);
  };

  this.loadUserFilters(onLoaded);
};

/** *************************************************************************** */

const autoSelectRegionalFilterLists = function (lists) {
  const selectedListKeys = [this.userFiltersPath];

  let list;
  for (const key in lists) {
    if (lists.hasOwnProperty(key) === false) {
      continue;
    }
    list = lists[key];
    if (list.off !== true) {
      selectedListKeys.push(key);
      continue;
    }
    if (this.listMatchesEnvironment(list)) {
      selectedListKeys.push(key);
      list.off = false;
    }
  }
  return selectedListKeys;
};

/** *************************************************************************** */

const getAvailableLists = function (callback) {
  let oldAvailableLists = {};

  const newAvailableLists = {};

  // User filter list.
  newAvailableLists[this.userFiltersPath] = {
    group: 'user',
    title: vAPI.i18n('1pPageName'),
  };

  // Custom filter lists.
  const importedListKeys = this.listKeysFromCustomFilterLists(userSettings.externalLists);

  let i = importedListKeys.length;
  let listKey;
  let entry;
  while (i--) {
    listKey = importedListKeys[i];
    entry = {
      content: 'filters',
      contentURL: listKey,
      external: true,
      group: 'custom',
      submitter: 'user',
      title: '',
    };
    newAvailableLists[listKey] = entry;
    this.assets.registerAssetSource(listKey, entry);
  }

  // Convert a no longer existing stock list into an imported list.
  const customListFromStockList = function (assetKey) {
    const oldEntry = oldAvailableLists[assetKey];
    if (oldEntry === undefined || oldEntry.off === true) {
      return;
    }
    let listURL = oldEntry.contentURL;
    if (Array.isArray(listURL)) {
      listURL = listURL[0];
    }
    const newEntry = {
      content: 'filters',
      contentURL: listURL,
      external: true,
      group: 'custom',
      submitter: 'user',
      title: oldEntry.title || '',
    };
    newAvailableLists[listURL] = newEntry;
    assets.registerAssetSource(listURL, newEntry);
    importedListKeys.push(listURL);
    userSettings.externalLists += `\n${listURL}`;
    userSettings.externalLists = userSettings.externalLists.trim();
    vAPI.storage.set({ externalLists: userSettings.externalLists });
    saveSelectedFilterLists([listURL], true);
  };

  // Final steps:
  // - reuse existing list metadata if any;
  // - unregister unreferenced imported filter lists if any.
  const finalize = function () {
    let assetKey;
    let newEntry;
    let oldEntry;

    // Reuse existing metadata.
    for (assetKey in oldAvailableLists) {
      oldEntry = oldAvailableLists[assetKey];
      newEntry = newAvailableLists[assetKey];
      // List no longer exists. If a stock list, try to convert to
      // imported list if it was selected.
      if (newEntry === undefined) {
        removeFilterList(assetKey);
        if (assetKey.indexOf('://') === -1) {
          customListFromStockList(assetKey);
        }
        continue;
      }
      if (oldEntry.entryCount !== undefined) {
        newEntry.entryCount = oldEntry.entryCount;
      }
      if (oldEntry.entryUsedCount !== undefined) {
        newEntry.entryUsedCount = oldEntry.entryUsedCount;
      }
      // This may happen if the list name was pulled from the list
      // content.
      // https://github.com/chrisaljoudi/uBlock/issues/982
      // There is no guarantee the title was successfully extracted from
      // the list content.
      if (newEntry.title === '' && typeof oldEntry.title === 'string' && oldEntry.title !== '') {
        newEntry.title = oldEntry.title;
      }
    }

    // Remove unreferenced imported filter lists.
    const dict = new Set(importedListKeys);
    for (assetKey in newAvailableLists) {
      newEntry = newAvailableLists[assetKey];
      if (newEntry.submitter !== 'user') {
        continue;
      }
      if (dict.has(assetKey)) {
        continue;
      }
      delete newAvailableLists[assetKey];
      assets.unregisterAssetSource(assetKey);
      removeFilterList(assetKey);
    }
  };

  // Built-in filter lists loaded.
  const onBuiltinListsLoaded = function (entries) {
    for (const assetKey in entries) {
      if (entries.hasOwnProperty(assetKey) === false) {
        continue;
      }
      entry = entries[assetKey];
      if (entry.content !== 'filters') {
        continue;
      }
      newAvailableLists[assetKey] = Object.assign({}, entry);
    }

    // Load set of currently selected filter lists.
    const listKeySet = new Set(selectedFilterLists);
    for (listKey in newAvailableLists) {
      if (newAvailableLists.hasOwnProperty(listKey)) {
        newAvailableLists[listKey].off = !listKeySet.has(listKey);
      }
    }

    finalize();
    callback(newAvailableLists);
  };

  // Available lists previously computed.
  const onOldAvailableListsLoaded = function (bin) {
    oldAvailableLists = (bin && bin.availableFilterLists) || {};
    assets.metadata(onBuiltinListsLoaded);
  };

  // Load previously saved available lists -- these contains data
  // computed at run-time, we will reuse this data if possible.
  vAPI.storage.get('availableFilterLists', onOldAvailableListsLoaded);
};

/** *************************************************************************** */

// This is used to be re-entrancy resistant.
const loadingFilterLists = false;

const loadFilterLists = function (callback) {
  // Callers are expected to check this first.
  if (this.loadingFilterLists) {
    return;
  }
  this.loadingFilterLists = true;

  const loadedListKeys = [];
  let filterlistsCount = 0;

  if (typeof callback !== 'function') {
    callback = this.noopFunc;
  }

  const onDone = function () {
    staticNetFilteringEngine.freeze();
    staticExtFilteringEngine.freeze();
    // CLIQZ: disable
    // µb.redirectEngine.freeze();
    vAPI.storage.set({ availableFilterLists });

    vAPI.messaging.broadcast({
      what: 'staticFilteringDataChanged',
      parseCosmeticFilters: userSettings.parseAllABPHideFilters,
      ignoreGenericCosmeticFilters: userSettings.ignoreGenericCosmeticFilters,
      listKeys: loadedListKeys,
    });

    callback();

    selfieManager.destroy();
    lz4Codec.relinquish();

    loadingFilterLists = false;
  };

  const applyCompiledFilters = function (assetKey, compiled) {
    const snfe = staticNetFilteringEngine;
    const sxfe = staticExtFilteringEngine;
    const acceptedCount = snfe.acceptedCount + sxfe.acceptedCount;

    const discardedCount = snfe.discardedCount + sxfe.discardedCount;
    applyCompiledFilters(compiled, assetKey === userFiltersPath);
    if (availableFilterLists.hasOwnProperty(assetKey)) {
      const entry = availableFilterLists[assetKey];
      entry.entryCount = snfe.acceptedCount + sxfe.acceptedCount - acceptedCount;
      entry.entryUsedCount = entry.entryCount - (snfe.discardedCount + sxfe.discardedCount - discardedCount);
    }
    loadedListKeys.push(assetKey);
  };

  const onCompiledListLoaded = function (details) {
    applyCompiledFilters(details.assetKey, details.content);
    filterlistsCount -= 1;
    if (filterlistsCount === 0) {
      onDone();
    }
  };

  const onFilterListsReady = function (lists) {
    availableFilterLists = lists;

    redirectEngine.reset();
    staticExtFilteringEngine.reset();
    staticNetFilteringEngine.reset();
    selfieManager.destroy();
    staticFilteringReverseLookup.resetLists();

    // We need to build a complete list of assets to pull first: this is
    // because it *may* happens that some load operations are synchronous:
    // This happens for assets which do not exist, ot assets with no
    // content.
    const toLoad = [];
    for (const assetKey in lists) {
      if (lists.hasOwnProperty(assetKey) === false) {
        continue;
      }
      if (lists[assetKey].off) {
        continue;
      }
      toLoad.push(assetKey);
    }
    filterlistsCount = toLoad.length;
    if (filterlistsCount === 0) {
      return onDone();
    }

    let i = toLoad.length;
    while (i--) {
      getCompiledFilterList(toLoad[i], onCompiledListLoaded);
    }
  };

  this.getAvailableLists(onFilterListsReady);
  this.loadRedirectResources();
};

/** *************************************************************************** */

const getCompiledFilterList = function (assetKey, callback) {
  const compiledPath = `compiled/${assetKey}`;

  let rawContent;

  const onCompiledListLoaded2 = function (details) {
    if (details.content === '') {
      details.content = compileFilters(rawContent, { assetKey });
      assets.put(compiledPath, details.content);
    }
    rawContent = undefined;
    details.assetKey = assetKey;
    callback(details);
  };

  const onRawListLoaded = function (details) {
    if (details.content === '') {
      details.assetKey = assetKey;
      callback(details);
      return;
    }
    extractFilterListMetadata(assetKey, details.content);
    // Fectching the raw content may cause the compiled content to be
    // generated somewhere else in uBO, hence we try one last time to
    // fetch the compiled content in case it has become available.
    rawContent = details.content;
    assets.get(compiledPath, onCompiledListLoaded2);
  };

  const onCompiledListLoaded1 = function (details) {
    if (details.content === '') {
      assets.get(assetKey, onRawListLoaded);
      return;
    }
    details.assetKey = assetKey;
    callback(details);
  };

  this.assets.get(compiledPath, onCompiledListLoaded1);
};

/** *************************************************************************** */

// https://github.com/gorhill/uBlock/issues/3406
//   Lower minimum update period to 1 day.

const extractFilterListMetadata = function (assetKey, raw) {
  const listEntry = this.availableFilterLists[assetKey];
  if (listEntry === undefined) {
    return;
  }
  // Metadata expected to be found at the top of content.
  const head = raw.slice(0, 1024);
  // https://github.com/gorhill/uBlock/issues/313
  // Always try to fetch the name if this is an external filter list.
  if (listEntry.title === '' || listEntry.group === 'custom') {
    const matches = head.match(/(?:^|\n)(?:!|# )[\t ]*Title[\t ]*:([^\n]+)/i);
    if (matches !== null) {
      // https://bugs.chromium.org/p/v8/issues/detail?id=2869
      //   orphanizeString is to work around String.slice()
      //   potentially causing the whole raw filter list to be held in
      //   memory just because we cut out the title as a substring.
      listEntry.title = this.orphanizeString(matches[1].trim());
    }
  }
  // Extract update frequency information
  const matches = head.match(/(?:^|\n)(?:!|# )[\t ]*Expires[\t ]*:[\t ]*(\d+)[\t ]*(h)?/i);
  if (matches !== null) {
    let v = Math.max(parseInt(matches[1], 10), 1);
    if (matches[2] !== undefined) {
      v = Math.ceil(v / 24);
    }
    if (v !== listEntry.updateAfter) {
      this.assets.registerAssetSource(assetKey, { updateAfter: v });
    }
  }
};

/** *************************************************************************** */

const removeCompiledFilterList = function (assetKey) {
  this.assets.remove(`compiled/${assetKey}`);
};

const removeFilterList = function (assetKey) {
  this.removeCompiledFilterList(assetKey);
  this.assets.remove(assetKey);
};

/** *************************************************************************** */

const compileFilters = function (rawText, details) {
  const writer = new Writer();

  // Populate the writer with information potentially useful to the
  // client compilers.
  if (details) {
    if (details.assetKey) {
      writer.properties.set('assetKey', details.assetKey);
    }
  }

  // Useful references:
  //    https://adblockplus.org/en/filter-cheatsheet
  //    https://adblockplus.org/en/filters
  const reIsWhitespaceChar = /\s/;
  const reMaybeLocalIp = /^[\d:f]/;
  const reIsLocalhostRedirect = /\s+(?:0\.0\.0\.0|broadcasthost|localhost|local|ip6-\w+)\b/;
  const reLocalIp = /^(?:0\.0\.0\.0|127\.0\.0\.1|::1|fe80::1%lo0)/;
  const lineIter = new LineIterator(processDirectives(rawText));

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

    // Parse or skip cosmetic filters
    // All cosmetic filters are caught here
    if (staticExtFilteringEngine.compile(line, writer)) {
      continue;
    }

    // Whatever else is next can be assumed to not be a cosmetic filter

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

/** *************************************************************************** */

// https://github.com/gorhill/uBlock/issues/1395
//   Added `firstparty` argument: to avoid discarding cosmetic filters when
//   applying 1st-party filters.

const applyCompiledFilters = function (rawText, firstparty) {
  if (rawText === '') {
    return;
  }
  const reader = new Reader(rawText);
  staticNetFilteringEngine.fromCompiledContent(reader);
  staticExtFilteringEngine.fromCompiledContent(reader, {
    skipGenericCosmetic: this.userSettings.ignoreGenericCosmeticFilters,
    skipCosmetic: !firstparty && !this.userSettings.parseAllABPHideFilters,
  });
};

/** *************************************************************************** */

// https://github.com/AdguardTeam/AdguardBrowserExtension/issues/917

const processDirectives = function (content) {
  const reIf = /^!#(if|endif)\b([^\n]*)/gm;

  const parts = [];

  let beg = 0;
  let depth = 0;
  let discard = false;
  while (beg < content.length) {
    const match = reIf.exec(content);
    if (match === null) {
      break;
    }
    if (match[1] === 'if') {
      let expr = match[2].trim();
      const target = expr.startsWith('!');
      if (target) {
        expr = expr.slice(1);
      }
      const token = this.processDirectives.tokens.get(expr);
      if (
        depth === 0
        && discard === false
        && token !== undefined
        && vAPI.webextFlavor.soup.has(token) === target
      ) {
        parts.push(content.slice(beg, match.index));
        discard = true;
      }
      depth += 1;
      continue;
    }
    depth -= 1;
    if (depth < 0) {
      break;
    }
    if (depth === 0 && discard) {
      beg = match.index + match[0].length + 1;
      discard = false;
    }
  }
  if (depth === 0 && parts.length !== 0) {
    parts.push(content.slice(beg));
    content = parts.join('\n');
  }
  return content.trim();
};

processDirectives.tokens = new Map([
  ['ext_ublock', 'ublock'],
  ['env_chromium', 'chromium'],
  ['env_edge', 'edge'],
  ['env_firefox', 'firefox'],
  ['env_mobile', 'mobile'],
  ['env_safari', 'safari'],
  ['cap_html_filtering', 'html_filtering'],
  ['cap_user_stylesheet', 'user_stylesheet'],
]);

/** *************************************************************************** */

const loadRedirectResources = function (updatedContent) {
  let content = '';

  const onDone = function () {
    µb.redirectEngine.resourcesFromString(content);
  };

  const onUserResourcesLoaded = function (details) {
    if (details.content !== '') {
      content += `\n\n${details.content}`;
    }
    onDone();
  };

  const onResourcesLoaded = function (details) {
    if (details.content !== '') {
      content = details.content;
    }
    if (µb.hiddenSettings.userResourcesLocation === 'unset') {
      return onDone();
    }
    µb.assets.fetchText(µb.hiddenSettings.userResourcesLocation, onUserResourcesLoaded);
  };

  if (typeof updatedContent === 'string' && updatedContent.length !== 0) {
    return onResourcesLoaded({ content: updatedContent });
  }

  const onSelfieReady = function (success) {
    if (success !== true) {
      µb.assets.get('ublock-resources', onResourcesLoaded);
    }
  };

  µb.redirectEngine.resourcesFromSelfie(onSelfieReady);
};

/** *************************************************************************** */

const loadPublicSuffixList = function () {
  return new Promise((resolve) => {
    // start of executor
    this.assets.get(`compiled/${this.pslAssetKey}`, (details) => {
      let selfie;
      try {
        selfie = JSON.parse(details.content);
      } catch (ex) {}
      if (selfie instanceof Object && publicSuffixList.fromSelfie(selfie)) {
        resolve();
        return;
      }
      this.assets.get(this.pslAssetKey, (details) => {
        if (details.content !== '') {
          this.compilePublicSuffixList(details.content);
        }
        resolve();
      });
    });
    // end of executor
  });
};

/** *************************************************************************** */

const compilePublicSuffixList = function (content) {
  publicSuffixList.parse(content, punycode.toASCII);
  this.assets.put(`compiled/${this.pslAssetKey}`, JSON.stringify(publicSuffixList.toSelfie()));
};

/** *************************************************************************** */

// This is to be sure the selfie is generated in a sane manner: the selfie will
// be generated if the user doesn't change his filter lists selection for
// some set time.

const selfieManager = (function () {
  const µb = µBlock;
  let timer = null;

  // As of 2018-05-31:
  // JSON.stringify-ing ourselves results in a better baseline
  // memory usage at selfie-load time. For some reasons.

  const create = function () {
    timer = null;
    const selfie = JSON.stringify({
      magic: µb.systemSettings.selfieMagic,
      availableFilterLists: µb.availableFilterLists,
      staticNetFilteringEngine: µb.staticNetFilteringEngine.toSelfie(),
      redirectEngine: µb.redirectEngine.toSelfie(),
      staticExtFilteringEngine: staticExtFilteringEngine.toSelfie(),
    });
    µb.cacheStorage.set({ selfie });
    µb.lz4Codec.relinquish();
  };

  const load = function (callback) {
    µb.cacheStorage.get('selfie', (bin) => {
      if (bin instanceof Object === false || typeof bin.selfie !== 'string') {
        return callback(false);
      }
      let selfie;
      try {
        selfie = JSON.parse(bin.selfie);
      } catch (ex) {}
      if (selfie instanceof Object === false || selfie.magic !== µb.systemSettings.selfieMagic) {
        return callback(false);
      }
      availableFilterLists = selfie.availableFilterLists;
      staticNetFilteringEngine.fromSelfie(selfie.staticNetFilteringEngine);
      redirectEngine.fromSelfie(selfie.redirectEngine);
      staticExtFilteringEngine.fromSelfie(selfie.staticExtFilteringEngine);
      callback(true);
    });
  };

  const destroy = function () {
    if (timer !== null) {
      // clearTimeout(timer);
      timer = null;
    }
    µb.cacheStorage.remove('selfie');
    // CLIQZ: disable
    // timer = vAPI.setTimeout(create, µb.selfieAfter);
  };

  return {
    load,
    destroy,
  };
}());

/** *************************************************************************** */

// https://github.com/gorhill/uBlock/issues/531
// Overwrite user settings with admin settings if present.
//
// Admin settings match layout of a uBlock backup. Not all data is
// necessarily present, i.e. administrators may removed entries which
// values are left to the user's choice.

const restoreAdminSettings = function (callback) {
  // Support for vAPI.adminStorage is optional (webext).
  if (vAPI.adminStorage instanceof Object === false) {
    callback();
    return;
  }

  const onRead = function (json) {
    const µb = µBlock;
    let data;
    if (typeof json === 'string' && json !== '') {
      try {
        data = JSON.parse(json);
      } catch (ex) {
        console.error(ex);
      }
    }

    if (typeof data !== 'object' || data === null) {
      callback();
      return;
    }

    const bin = {};
    let binNotEmpty = false;

    // Allows an admin to set their own 'assets.json' file, with their own
    // set of stock assets.
    if (typeof data.assetsBootstrapLocation === 'string') {
      bin.assetsBootstrapLocation = data.assetsBootstrapLocation;
      binNotEmpty = true;
    }

    if (typeof data.userSettings === 'object') {
      for (const name in µb.userSettings) {
        if (µb.userSettings.hasOwnProperty(name) === false) {
          continue;
        }
        if (data.userSettings.hasOwnProperty(name) === false) {
          continue;
        }
        bin[name] = data.userSettings[name];
        binNotEmpty = true;
      }
    }

    // 'selectedFilterLists' is an array of filter list tokens. Each token
    // is a reference to an asset in 'assets.json'.
    if (Array.isArray(data.selectedFilterLists)) {
      bin.selectedFilterLists = data.selectedFilterLists;
      binNotEmpty = true;
    }

    if (typeof data.netWhitelist === 'string') {
      bin.netWhitelist = data.netWhitelist;
      binNotEmpty = true;
    }

    if (typeof data.dynamicFilteringString === 'string') {
      bin.dynamicFilteringString = data.dynamicFilteringString;
      binNotEmpty = true;
    }

    if (typeof data.urlFilteringString === 'string') {
      bin.urlFilteringString = data.urlFilteringString;
      binNotEmpty = true;
    }

    if (typeof data.hostnameSwitchesString === 'string') {
      bin.hostnameSwitchesString = data.hostnameSwitchesString;
      binNotEmpty = true;
    }

    if (binNotEmpty) {
      vAPI.storage.set(bin);
    }

    if (typeof data.userFilters === 'string') {
      µb.assets.put(µb.userFiltersPath, data.userFilters);
    }

    callback();
  };

  vAPI.adminStorage.getItem('adminSettings', onRead);
};

/** *************************************************************************** */

// https://github.com/gorhill/uBlock/issues/2344
//   Support mutliple locales per filter list.

// https://github.com/gorhill/uBlock/issues/3210
//   Support ability to auto-enable a filter list based on user agent.

const listMatchesEnvironment = function (details) {
  let re;
  // Matches language?
  if (typeof details.lang === 'string') {
    re = this.listMatchesEnvironment.reLang;
    if (re === undefined) {
      re = new RegExp(`\\b${self.navigator.language.slice(0, 2)}\\b`);
      this.listMatchesEnvironment.reLang = re;
    }
    if (re.test(details.lang)) {
      return true;
    }
  }
  // Matches user agent?
  if (typeof details.ua === 'string') {
    re = new RegExp(`\\b${this.escapeRegex(details.ua)}\\b`, 'i');
    if (re.test(self.navigator.userAgent)) {
      return true;
    }
  }
  return false;
};

/** *************************************************************************** */

const scheduleAssetUpdater = (function () {
  // CLIQZ: disable
  /*
    var timer, next = 0;
    return function(updateDelay) {
        if ( timer ) {
            clearTimeout(timer);
            timer = undefined;
        }
        if ( updateDelay === 0 ) {
            next = 0;
            return;
        }
        var now = Date.now();
        // Use the new schedule if and only if it is earlier than the previous
        // one.
        if ( next !== 0 ) {
            updateDelay = Math.min(updateDelay, Math.max(next - now, 0));
        }
        next = now + updateDelay;
        timer = vAPI.setTimeout(function() {
            timer = undefined;
            next = 0;
            var µb = µBlock;
            µb.assets.updateStart({
                delay: µb.hiddenSettings.autoUpdateAssetFetchPeriod * 1000 || 120000
            });
        }, updateDelay);
    };
    */
}());

/** *************************************************************************** */

const assetObserver = function (topic, details) {
  // Do not update filter list if not in use.
  if (topic === 'before-asset-updated') {
    if (details.type === 'filters') {
      if (
        this.availableFilterLists.hasOwnProperty(details.assetKey) === false
        || this.selectedFilterLists.indexOf(details.assetKey) === -1
      ) {
        return;
      }
    }
    // https://github.com/gorhill/uBlock/issues/2594
    if (details.assetKey === 'ublock-resources') {
      if (
        this.hiddenSettings.ignoreRedirectFilters === true
        && this.hiddenSettings.ignoreScriptInjectFilters === true
      ) {
        return;
      }
    }
    return true;
  }

  // Compile the list while we have the raw version in memory
  if (topic === 'after-asset-updated') {
    const cached = typeof details.content === 'string' && details.content !== '';
    if (this.availableFilterLists.hasOwnProperty(details.assetKey)) {
      if (cached) {
        if (this.selectedFilterLists.indexOf(details.assetKey) !== -1) {
          this.extractFilterListMetadata(details.assetKey, details.content);
          this.assets.put(
            `compiled/${details.assetKey}`,
            this.compileFilters(details.content, { assetKey: details.assetKey }),
          );
        }
      } else {
        this.removeCompiledFilterList(details.assetKey);
      }
    } else if (details.assetKey === this.pslAssetKey) {
      if (cached) {
        this.compilePublicSuffixList(details.content);
      }
    } else if (details.assetKey === 'ublock-resources') {
      this.redirectEngine.invalidateResourcesSelfie();
      if (cached) {
        this.loadRedirectResources(details.content);
      }
    }
    vAPI.messaging.broadcast({
      what: 'assetUpdated',
      key: details.assetKey,
      cached,
    });
    // https://github.com/gorhill/uBlock/issues/2585
    // Whenever an asset is overwritten, the current selfie is quite
    // likely no longer valid.
    this.selfieManager.destroy();
    return;
  }

  // Update failed.
  if (topic === 'asset-update-failed') {
    vAPI.messaging.broadcast({
      what: 'assetUpdated',
      key: details.assetKey,
      failed: true,
    });
    return;
  }

  // Reload all filter lists if needed.
  if (topic === 'after-assets-updated') {
    if (details.assetKeys.length !== 0) {
      this.loadFilterLists();
    }
    if (this.userSettings.autoUpdate) {
      this.scheduleAssetUpdater(this.hiddenSettings.autoUpdatePeriod * 3600000 || 25200000);
    } else {
      this.scheduleAssetUpdater(0);
    }
    vAPI.messaging.broadcast({
      what: 'assetsUpdated',
      assetKeys: details.assetKeys,
    });
    return;
  }

  // New asset source became available, if it's a filter list, should we
  // auto-select it?
  if (topic === 'builtin-asset-source-added') {
    if (details.entry.content === 'filters') {
      if (details.entry.off !== true || this.listMatchesEnvironment(details.entry)) {
        this.saveSelectedFilterLists([details.assetKey], true);
      }
    }
  }
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
    if (HNTrieContainer.wasmModulePromise instanceof Promise === false) {
      return Promise.resolve();
    }
    return HNTrieContainer.wasmModulePromise.then(module => this.initWASM(module));
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

  matchesJS(iroot) {
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
  matchesWASM: null,
  matches: null,

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

  addJS(iroot) {
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
  addWASM: null,
  add: null,

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

  initWASM(module) {
    if (module instanceof WebAssembly.Module === false) {
      return Promise.resolve(null);
    }
    if (this.wasmInstancePromise === null) {
      const memory = new WebAssembly.Memory({ initial: 2 });
      this.wasmInstancePromise = WebAssembly.instantiate(module, {
        imports: {
          memory,
          growBuf: this.growBuf.bind(this, 24, 256),
        },
      });
      this.wasmInstancePromise.then((instance) => {
        this.wasmMemory = memory;
        const pageCount = (this.buf.byteLength + HNTRIE_PAGE_SIZE - 1) >>> 16;
        if (pageCount > 1) {
          memory.grow(pageCount - 1);
        }
        const buf = new Uint8Array(memory.buffer);
        buf.set(this.buf);
        this.buf = buf;
        this.buf32 = new Uint32Array(this.buf.buffer);
        this.matches = this.matchesWASM = instance.exports.matches;
        this.add = this.addWASM = instance.exports.add;
      });
    }
    return this.wasmInstancePromise;
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
  addJS(hn) {
    if (this.container.setNeedle(hn).addJS(this.iroot) === 1) {
      this.size += 1;
      return true;
    }
    return false;
  },
  addWASM(hn) {
    if (this.container.setNeedle(hn).addWASM(this.iroot) === 1) {
      this.size += 1;
      return true;
    }
    return false;
  },
  matches(needle) {
    return this.container.setNeedle(needle).matches(this.iroot);
  },
  matchesJS(needle) {
    return this.container.setNeedle(needle).matchesJS(this.iroot);
  },
  matchesWASM(needle) {
    return this.container.setNeedle(needle).matchesWASM(this.iroot);
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

// Code below is to attempt to load a WASM module which implements:
//
// - HNTrieContainer.add()
// - HNTrieContainer.matches()
//
// The WASM module is entirely optional, the JS implementations will be
// used should the WASM module be unavailable for whatever reason.

(function () {
  HNTrieContainer.wasmModulePromise = null;

  // Default to javascript version.
  HNTrieContainer.prototype.matches = HNTrieContainer.prototype.matchesJS;
  HNTrieContainer.prototype.add = HNTrieContainer.prototype.addJS;

  if (typeof WebAssembly !== 'object' || typeof WebAssembly.compileStreaming !== 'function') {
    return;
  }

  // Soft-dependency on vAPI so that the code here can be used outside of
  // uBO (i.e. tests, benchmarks)
  if (typeof vAPI === 'object' && vAPI.webextFlavor.soup.has('firefox') === false) {
    return;
  }

  // Soft-dependency on µBlock's advanced settings so that the code here can
  // be used outside of uBO (i.e. tests, benchmarks)
  if (typeof µBlock === 'object' && µBlock.hiddenSettings.disableWebAssembly === true) {
    return;
  }

  // The wasm module will work only if CPU is natively little-endian,
  // as we use native uint32 array in our js code.
  const uint32s = new Uint32Array(1);
  const uint8s = new Uint8Array(uint32s.buffer);
  uint32s[0] = 1;
  if (uint8s[0] !== 1) {
    return;
  }

  // The directory from which the current script was fetched should also
  // contain the related WASM file. The script is fetched from a trusted
  // location, and consequently so will be the related WASM file.
  let workingDir;
  {
    const url = new URL(document.currentScript.src);
    const match = /[^\/]+$/.exec(url.pathname);
    if (match !== null) {
      url.pathname = url.pathname.slice(0, match.index);
    }
    workingDir = url.href;
  }

  HNTrieContainer.wasmModulePromise = fetch(`${workingDir}wasm/hntrie.wasm`, {
    mode: 'same-origin',
  })
    .then(WebAssembly.compileStreaming)
    .catch((reason) => {
      HNTrieContainer.wasmModulePromise = null;
      console.info(reason);
    });
}());

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

const formatCount = function (count) {
  if (typeof count !== 'number') {
    return '';
  }
  let s = count.toFixed(0);
  if (count >= 1000) {
    if (count < 10000) {
      s = `>${s.slice(0, 1)}k`;
    } else if (count < 100000) {
      s = `${s.slice(0, 2)}k`;
    } else if (count < 1000000) {
      s = `${s.slice(0, 3)}k`;
    } else if (count < 10000000) {
      s = `${s.slice(0, 1)}M`;
    } else {
      s = `${s.slice(0, -6)}M`;
    }
  }
  return s;
};

// https://www.youtube.com/watch?v=DyvzfyqYm_s

/** *************************************************************************** */

const dateNowToSensibleString = function () {
  const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
  return now
    .toISOString()
    .replace(/\.\d+Z$/, '')
    .replace(/:/g, '.')
    .replace('T', '_');
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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

const escapeRegex = function (s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/** *************************************************************************** */

const decomposeHostname = (function () {
  // For performance purpose, as simple tests as possible
  const reHostnameVeryCoarse = /[g-z_-]/;
  const reIPv4VeryCoarse = /\.\d+$/;

  const toBroaderHostname = function (hostname) {
    const pos = hostname.indexOf('.');
    if (pos !== -1) {
      return hostname.slice(pos + 1);
    }
    return hostname !== '*' && hostname !== '' ? '*' : '';
  };

  const toBroaderIPv4Address = function (ipaddress) {
    if (ipaddress === '*' || ipaddress === '') {
      return '';
    }
    const pos = ipaddress.lastIndexOf('.');
    if (pos === -1) {
      return '*';
    }
    return ipaddress.slice(0, pos);
  };

  const toBroaderIPv6Address = function (ipaddress) {
    return ipaddress !== '*' && ipaddress !== '' ? '*' : '';
  };

  return function decomposeHostname(hostname, decomposed) {
    if (decomposed.length === 0 || decomposed[0] !== hostname) {
      let broaden;
      if (reHostnameVeryCoarse.test(hostname) === false) {
        if (reIPv4VeryCoarse.test(hostname)) {
          broaden = toBroaderIPv4Address;
        } else if (hostname.startsWith('[')) {
          broaden = toBroaderIPv6Address;
        }
      }
      if (broaden === undefined) {
        broaden = toBroaderHostname;
      }
      decomposed[0] = hostname;
      let i = 1;
      for (;;) {
        hostname = broaden(hostname);
        if (hostname === '') {
          break;
        }
        decomposed[i++] = hostname;
      }
      decomposed.length = i;
    }
    return decomposed;
  };
}());

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
    const trieDetails = FilterOrigin.trieContainer.optimize();
    // CLIQZ: disable
    // vAPI.localStorage.setItem('FilterOrigin.trieDetails', JSON.stringify(trieDetails));
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
    const trieDetails = FilterHostnameDict.trieContainer.optimize();
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
    type, url, hostname, domain, sourceHostname, sourceDomain,
  }) {
    return this.engine.matchString({
      url,
      type,
      getDocHostname: () => sourceHostname,
      getHostname: () => hostname,
      is3rdPartyToDoc: () => sourceDomain !== domain,
    });
  }
};
