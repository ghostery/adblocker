# `@cliqz/adblocker`

> Core logic for content blocking. The package exposes all primitives needed to
> create an efficient adblocker and can be used in any environment. Use a more
> specialized package such as `@cliqz/adblocker-webextension` for convenient
> wrappers abstracting platform-specific logic.

* [Usage](#usage)
  * [Filters](#filters)
    * [Network](#network)
    * [Cosmetic](#cosmetic)
  * [Engine](#engine)

<a id="usage"></a>
## Usage

For a small and documented WebExtension example, you can [check this project out](https://github.com/remusao/blockrz). The following section will showcase some of the most important APIs of the library.

<a id="filters"></a>
### Manipulating Filters

Content blockers usually manipulate two kinds of filters: *network* and *cosmetics*. The former allows to specify which network requests should be blocked (or redirected), usually from the `WebRequest` API of extensions. The later allows to alter the DOM of pages directly, hiding elements or injecting scripts.

<a id="network"></a>
#### Network Filters

Here is how one can parse and match individual *network filters* using the [NetworkFilter](./src/filters/network.ts) class. It offers multiple accessors and helpers to parse, match and manipulate network filters.

```javascript
const { NetworkFilter } = require('@cliqz/adblocker');

// Parse filter from string
const filter = NetworkFilter.parse('||domain.com/ads.js$script');

// Filter attributes
console.log(filter.isHostnameAnchor()); // true
console.log(filter.getHostname()); // 'domain.com'
console.log(filter.getFilter()); // '/ads.js'

// Request options
console.log(filter.fromScript()); // true = can match 'script' requests
console.log(filter.fromImage()); // false = cannot match 'image' requests
```

To match a network request, we must first create an instance of the [Request](./src/request.ts) class. It abstracts away the implementation details of a request. It can be initialized from `webRequest` details, puppeteer's request or raw information. The constructor expects to receive the `type` of request (e.g.: *main_frame*, *script*, etc.), the URL of the request, `url` (+ hostname and domain) as well as the `URL` of the frame, `sourceUrl` (this would be either the URL of the page or the iframe where this request originates from).

```javascript
const { Request } = require('@cliqz/adblocker');

const request = new Request({
  type: 'script',

  url: 'https://sub.domain.com/ads.js?param=42',
  hostname: 'sub.domain.com',
  domain: 'domain.com',

  sourceUrl: 'https://frame-domain.com',
  hostname: 'frame-domain.com',
  domain: 'frame-domain.com',
});

console.log(filter.match(request)); // true
```

Because creating `Request` instances using the constructor is a bit cumbersome, the library provides a few helper functions to make this smoother:

* `Request.fromRawDetails(...)`
* `Request.fromWebRequestDetails(...)`
* `Request.fromPuppeteerDetails(...)`
* `Request.fromElectronDetails(...)`

If you are creating a `Request` outside of an extension/electron/puppeteer context, you should use `Request.fromRawDetails`. It allows to provide only a subset of the information and will assign default values for whatever is missing.

```javascript
const { Request } = require('@cliqz/adblocker');

const request = Request.fromRawDetails({
  type: 'script',
  url: 'https://domain.com/ads.js',
});

filter.match(request); // true
```

<a id="cosmetic"></a>
#### Cosmetic Filters

Similarly, one can parse cosmetic filters using the [CosmeticFilter](./src/filters/cosmetic.ts) class.

```javascript
const { CosmeticFilter } = require('@cliqz/adblocker');

// Parsing filter from string
const filter = CosmeticFilter.parse('domain.*,domain2.com###selector');

// Properties
console.log(filter.hasHostnameConstraint()); // true
console.log(filter.getSelector()); // '#selector'
console.log(filter.isUnhide()); // false

// Matching a cosmetic filter requires both a hostname and domain
filter.match('sub.domain.com', 'domain.com'); // true
```

<a id="engine"></a>
### Filters Engine

Manipulating filters at a low level is useful to build tooling or debugging, but they are not appropriate for efficient blocking of requests (it would require iterating on all the filters to know if a request needs to be blocked). Instead, we can make use of the `FiltersEngine` class which can be seen as a "container" for both network and cosmetic filters. The filters are organized in a very compact way which also enables fast matching.

```javascript
const { FiltersEngine, NetworkFilter, CosmeticFilter, Request } = require('@cliqz/adblocker');

// Parse multiple filters at once
let engine = FiltersEngine.parse(`
! This is a custom list
||domain.com/ads.js$script

###selector
domain.com,entity.*##+js(script,args1)
`);

// Update with individual filters
engine.update({
  newNetworkFilters: [NetworkFilter.parse('/ads.js')]
  newCosmeticFilters: [CosmeticFilter.parse('###selector')],
});

// Serialize the full engine to a Uint8Array for caching
const serialized = engine.serialize();
engine = FiltersEngine.deserialize(serialized);

// Matching network filters
const {
  match, // `true` if there is a match
  redirect, // data url to redirect to if any
  exception, // instance of NetworkFilter exception if any
  filter, // instance of NetworkFilter which matched
} = engine.match(Request.fromRawDetails({
  type: 'script',
  url: 'https://sub.domain.com/ads.js',
}));

// Matching CSP (content security policy) filters.
const directives = engine.getCSPDirectives(Request.fromRawDetails({
  type: 'main_frame',
  url: 'https://sub.domain.com/',
}));

// Matching cosmetic filters
const {
  styles, // stylesheet to inject in the page
  scripts, // Array of scriptlets to inject in the page
} = engine.getCosmeticFilters({
  url: 'https://sub.domain.com/path',
  hostname: 'sub.domain.com',
  domain: 'domain.com',
});
```
