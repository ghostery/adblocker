<h1 align="center">Adblocker</h2>

<p align="center">
  <em>
    Efficient
    · Minimal
    · JavaScript
    · TypeScript
    · uBlock Origin- and Easylist-compatible
  </em>
  <br />
  <em>
    <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker">Node.js</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer">Puppeteer</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron">Electron</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension">WebExtension</a>
  </em>
</p>

<p align="center">
  <a href="https://github.com/cliqz-oss/adblocker/actions?query=workflow%3ATests">
    <img alt="Github Actions Build Status" src="https://img.shields.io/github/workflow/status/cliqz-oss/adblocker/Tests?label=tests&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker/actions?query=workflow%3Assets">
    <img alt="Github Actions Assets Status" src="https://img.shields.io/github/workflow/status/cliqz-oss/adblocker/Assets?label=assets&style=flat-square"></a>
  <a href="https://twitter.com/acdlite/status/974390255393505280">
    <img alt="Blazing Fast" src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@cliqz/adblocker">
    <img alt="npm version" src="https://img.shields.io/npm/v/@cliqz/adblocker.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@cliqz/adblocker">
    <img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/@cliqz/adblocker.svg?style=flat-square"></a>
  <br/>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
  <a href="https://twitter.com/cliqz">
    <img alt="Follow Cliqz on Twitter" src="https://img.shields.io/twitter/follow/cliqz.svg?label=follow+cliqz&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker">
    <img alt="Dependabot" src="https://img.shields.io/badge/dependabot-enabled-brightgreen?logo=dependabot&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker/blob/master/LICENSE">
    <img alt="License Badge" src="https://img.shields.io/github/license/cliqz-oss/adblocker?style=flat-square"></a>
  <a href="https://lgtm.com/projects/g/cliqz-oss/adblocker?mode=list">
    <img alt="LGTM Badge" src="https://img.shields.io/lgtm/alerts/github/cliqz-oss/adblocker?style=flat-square"></a>
</p>

---

## Getting Started

Install: `npm install --save @cliqz/adblocker`.

## Usage

There are multiple ways you can *create an instance of the blocking engine* to
start blocking ads:

If you already have filters locally:
```javascript
import { FiltersEngine } from '@cliqz/adblocker';
const engine = FiltersEngine.parse(fs.readFileSync('easylist.txt', 'utf-8'));
```

Fetching lists from URLs:
```javascript
import { FiltersEngine } from '@cliqz/adblocker';
engine = await FiltersEngine.fromLists(fetch, [
 'https://easylist.to/easylist/easylist.txt'
]);
```

Use ready-made configs to block ads and optionally trackers:
```javascript
import { FiltersEngine } from '@cliqz/adblocker';
engine = await FiltersEngine.fromPrebuiltAdsOnly(fetch); // ads only
engine = await FiltersEngine.fromPrebuiltAdsAndTracking(fetch); // ads and tracking
```

Once you have your `engine`, start matching requests and block ads:

```javascript
import { Request } from '@cliqz/adblocker';

const { match } = engine.match(Request.fromRawDetails({
  type: 'script',
  url: 'https://domain.com/ads.js',
}));
```

### Request Abstraction

To abstract over network requests independently from platforms (Node.js,
WebExtension, etc.), the `Request` provides a unified APIs and helpers functions
for initialization on different platforms:

```javascript
import { Request } from '@cliqz/adblocker';

const request = Request.fromRawDetails({
  url: 'https://sub.example.com',
  type: 'main_frame',
});

console.log(request.isMainFrame()); // true
console.log(request.url); // https://sub.example.com
console.log(request.hostname); // sub.example.com
console.log(request.domain); // example.com
```

### Manipulating Individual Filters

Content blockers usually manipulate two kinds of filters: *network*
and *cosmetics*. The former allows to specify which network requests
should be blocked (or redirected), usually from the `WebRequest` API of
extensions. The later allows to alter the DOM of pages directly, hiding
elements or injecting scripts.

#### Network Filters

Here is how one can parse and match individual *network filters* using
the [NetworkFilter](https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker/src/filters/network.ts) class. It offers multiple
accessors and helpers to parse, match and manipulate network filters.

```javascript
import { NetworkFilter } from '@cliqz/adblocker';

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

Matching network filter against requests:
```javascript
import { Request } from '@cliqz/adblocker';

const request = Request.fromRawDetails({
  type: 'script',
  url: 'https://sub.domain.com/ads.js?param=42',
  sourceUrl: 'https://frame-domain.com',
});

console.log(filter.match(request)); // true
```

#### Cosmetic Filters

Similarly, one can parse cosmetic filters using the [CosmeticFilter](https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker/src/filters/cosmetic.ts) class.

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

### Filters Engine

Manipulating filters at a low level is useful to build tooling or
debugging, but they are not appropriate for efficient blocking of
requests (it would require iterating on all the filters to know if
a request needs to be blocked). Instead, we can make use of the
[FiltersEngine](https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker/src/engine/engine.ts) class which can be seen as a "container" for both
network and cosmetic filters. The filters are organized in a very
compact way which also enables fast matching.

```javascript
import { FiltersEngine, NetworkFilter, CosmeticFilter, Request } from '@cliqz/adblocker';

// Parse multiple filters at once
let engine = FiltersEngine.parse(`
! This is a custom list
||domain.com/ads.js$script

###selector
domain.com,entity.*##+js(script,args1)
`);
```

Updating an existing engine with new filters:
```javascript
// Update with individual filters
engine.update({
  newNetworkFilters: [NetworkFilter.parse('/ads.js')]
  newCosmeticFilters: [CosmeticFilter.parse('###selector')],
});
```

Serializing an engine to `Uint8Array` and reloading it to its original form:
```javascript
// Serialize the full engine to a Uint8Array for caching
const serialized = engine.serialize();
engine = FiltersEngine.deserialize(serialized);
```

Matching requests:
```javascript
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
```

Checking for CSP injection rules for a given frame:
```javascript
// Matching CSP (content security policy) filters.
const directives = engine.getCSPDirectives(Request.fromRawDetails({
  type: 'main_frame',
  url: 'https://sub.domain.com/',
}));
```

Checking for cosmetics injection:
```javascript
// Matching cosmetic filters
const {
  styles, // stylesheet to inject in the page
  scripts, // Array of scriptlets to inject in the page
} = engine.getCosmeticsFilters({
  url: 'https://sub.domain.com/path',
  hostname: 'sub.domain.com',
  domain: 'domain.com',
});
```
