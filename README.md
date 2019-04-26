# Adblocker

Very *fast* and *memory efficient*, pure-JavaScript content-blocking library made by Cliqz.

This library is the building block technology used to power the adblockers from Ghostery and Cliqz on both desktop and mobile platforms. Being a pure JavaScript library it does not make any assumption regarding the environment it will run in (apart from the availability of a JavaScript engine) and is trivial to include in any new project. It can also be used as a building block for tooling. It is already running in production for millions of users and has been used successfully to satisfy the following use-cases:

* Mobile-friendly adblocker for Android in multiple setups: react-native, WebExtension, etc. ([ghostery](https://github.com/ghostery/browser-android) and [cliqz](https://github.com/cliqz-oss/browser-android))
* Ads and trackers blocker in Electron applications, Puppeteer headless browsers, Cliqz browser, WebExtensions ([cliqz](https://github.com/cliqz-oss/browser-core), [ghostery](https://github.com/ghostery/ghostery-extension/) and [standalone](https://github.com/remusao/blockrz))
* Backend requests processing job

The library provides all necessary building blocks to create a powerful and efficient content-blocker and gives full flexibility as to which lists should be used and how they should be fetched or updated.

* [Installation](#installation)
* [Usage](#usage)
  * [Filters](#filters)
    * [Network](#network)
    * [Cosmetic](#cosmetic)
  * [Engine](#engine)
* [Performance](#performance)
* [Supported Filters](#rules)
* [Releasing](#release)

<a id="installation"></a>
## Installation

The package can be installed directly from `npm`:

```sh
$ npm install @cliqz/adblocker
```

Or you can install it from sources directly:
```sh
$ git clone https://github.com/cliqz-oss/adblocker.git
$ npm ci
$ npm pack
$ npm run test
```

Multiple bundles are provided in the `dist` folder (umd, esm, cjs) and TypeScript type definitions are bundled as well.

<a id="installation"></a>
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

Because creating `Request` instances using the constructor is a bit cumbersome, the library provides a helper function to make this smoother: `makeRequest`. It allows to provide only a subset of the information and will assign default values for whatever is missing. Since we also need to extract the hostnames and domains of URLs and do not want to impose a specific library for this, we need to provide an implementation of `parse` which gets an URL as argument and returns its hostname and domain. In this example we use the [tldts](https://www.npmjs.com/package/tldts) library.

```javascript
const { parse } = require('tldts');
const { makeRequest } = require('@cliqz/adblocker');

const request = makeRequest({
  type: 'script',
  url: 'https://domain.com/ads.js',
}, parse);

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
const { FiltersEngine, NetworkFilter, CosmeticFilter, makeRequest } = require('@cliqz/adblocker');
const { parse } = require('tldts');

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
} = engine.match(makeRequest({
  type: 'script',
  url: 'https://sub.domain.com/ads.js',
}, parse));

// Matching CSP (content security policy) filters.
const directives = engine.getCSPDirectives(makeRequest({
  type: 'main_frame',
  url: 'https://sub.domain.com/',
}, parse));

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

<a id="performance"></a>
## Performance

To make sure content blocking can run at full-speed on a variety of devices (including low-end mobile phones), we built the library with performance in mind from the ground-up. From our [recent performance study](https://whotracks.me/blog/adblockers_performance_study.html), we perform consistently better than popular alternatives in terms of: *memory consumption*, *start from cache time*, *matching speed* and *size of cache*.

Matching speed corresponds to the time it takes to decide if a network request should be blocked or allowed. It needs to be as fast as possible to not induce any significant over-head in the browser:
![](https://github.com/cliqz-oss/adblocker/blob/d63d545095a1d47626c9fd29e14a813a2ff4f012/bench/comparison/plots/ghostery-ublock-origin-brave-duckduckgo-adblock-plus-all.svg)

Memory usage is another very important dimension. Here is the memory used after initialization:
![](https://github.com/cliqz-oss/adblocker/blob/d63d545095a1d47626c9fd29e14a813a2ff4f012/bench/comparison/plots/memory-usage-at-startup.svg)

Cache size corresponds to the size in bytes of the Uint8Array returned by `engine.serialize()`:
![](https://github.com/cliqz-oss/adblocker/blob/d63d545095a1d47626c9fd29e14a813a2ff4f012/bench/comparison/plots/cache-size.svg)

Another interesting metric is the time it takes to initialize the `FiltersEngine` instance from its serialized form. It is especially beneficial for mobile phones, because this serialized engine can be created backend-side and distributed through a CDN; which means clients do not have any cost to pay except downloading the file.
![](https://github.com/cliqz-oss/adblocker/blob/d63d545095a1d47626c9fd29e14a813a2ff4f012/bench/comparison/plots/deserializationtimings.svg)

<a id="rules"></a>
## Supported Filters

The majority of the common filters are supported out of the box but some rare ones are not. To know more, check [the compatibility matrix](https://github.com/cliqz-oss/adblocker/wiki/Compatibility-Matrix) on the wiki.

<a id="release"></a>
## Release Checklist

To publish a new version:

0. Bump `ENGINE_VERSION` in `engine.ts` (to invalidate serialized versions)
1. Create a new branch (e.g.: `release-x.y.z`)
2. Update `version` in [package.json](./package.json)
3. Update [CHANGELOG.md](./CHANGELOG.md)
4. Create a release commit (e.g.: "Release vx.y.z")
5. Create a PR for the release
6. Merge and create a new Release on GitHub
7. Travis takes care of the rest!

## License

[Mozilla Public License 2.0](./LICENSE)
