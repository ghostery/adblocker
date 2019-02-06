# Adblocker

A fast and memory efficient, pure-JavaScript content-blocking library made by Cliqz.

This library is the building block technology used to power Ghostery and
Cliqz' Adblocking. Being a pure JavaScript library it is trivial to include in
any new project and can also be used as a building block for tooling. For
example this library can be used for:

* Building a content-blocking extension (see [this example](./example) for a minimal content-blocking webextension)
* Building tooling around popular block-lists such as [EasyList](https://github.com/easylist/easylist)
    - validating filters
    - normalizing filters
    - detecting redundant filters
* Detecting dead domains
* etc.

The library provides abstractions to manipulate filters at a low-level.

## Getting Started

This package can be installed directly from `npm`:

```sh
$ npm install @cliqz/adblocker
```

Or you can install it from sources directly:
```sh
$ npm ci
$ npm pack
$ npm run test
```

Multiple bundles are provided in the `dist` folder.

## Usage


### Network Filters

Here is how one can parse and match individual *network* filters:

```javascript
const { NetworkFilter, Request } = require('@cliqz/adblocker');

// 1. Parsing
const filter = NetworkFilter.parse('||domain.com/ads.js$script');

// 2. Matching
filter.match(new Request({
  type: 'script',

  domain: 'domain.com',
  hostname: 'domain.com',
  url: 'https://domain.com/ads.js?param=42',

  sourceUrl: 'https://domain.com/',
  sourceHostname: 'domain.com',
  sourceDomain: 'domain.com',
}));
```

Matching requires you to provide an instance of `Request` which knows
about the type of the request (e.g.: `main_frame`, `script,` etc.) as
well as the URL, hostname and domain of the request and *source URL*.
To make things a bit easier, the library exposes a `makeRequest` helper
which can be used alongside a library like `tldts` (or another library
providing parsing of hostnames and domains) to provide the parsing:

```javascript
const tldts = require('tldts');
const { NetworkFilter, makeRequest } = require('@cliqz/adblocker');

// 1. Parsing
const filter = NetworkFilter.parse('||domain.com/ads.js$script');

// 2. Matching
filter.match(makeRequest({
  type: 'script',
  url: 'https://domain.com/ads.js',
}, tldts)); // true
```

### Cosmetic Filters

Here is how one can parse and match individual *cosmetic* filters:

```javascript
const { CosmeticFilter } = require('@cliqz/adblocker');

// 1. Parsing
const filter = CosmeticFilter.parse('domain.*,domain2.com###selector');

// 2. The `match` method expects a hostname and domain as arguments
filter.match('sub.domain.com', 'domain.com'); // true
```

### Filters Engine

Manipulating filters at a low level is useful to build tooling or debugging, but
to perform efficient matching we need to use `FiltersEngine` which can be seen
as a "container" for both network and cosmetic filters. The filters are
organized in a very compact way and allow fast matching against requests.

```javascript
const { FiltersEngine } = require('@cliqz/adblocker');

const engine = FiltersEngine.parse(`
! This is a custom list
||domain.com/ads.js$script

###selector
domain.com,entity.*##+js(script,args1)
`);

// It is possible to serialize the full engine to a typed array for caching
const serialized = engine.serialize();
const deserialized = FiltersEngine.deserialize(serialized);

// Matching network filters
const {
  match, // `true` if there is a match
  redirect, // data url to redirect to if any
  exception, // instance of NetworkFilter exception if any
  filter, // instance of NetworkFilter which matched
} = engine.match(new Request(...));

// Matching CSP (content security policy) filters
const directives = engine.getCSPDirectives(new Request(...));

// Matching cosmetic filters
const {
  styles, // stylesheet to inject in the page
  scripts, // Array of scriptlets to inject in the page
} = engine.getCosmeticFilters('sub.domain.com', 'domain.com');
```

# Release Checklist

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
