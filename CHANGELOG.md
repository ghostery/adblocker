# Adblocker

## Next

*not released yet*

## 0.5.1

* 2019-01-09*

  * Fix maximum number of selectors in stylesheet limitation on Chrome [#83](https://github.com/cliqz-oss/adblocker/pull/83)

## 0.5.0

*2019-01-08*

  * Remove tldts dependency and allow to plug any implementation instead [#81](https://github.com/cliqz-oss/adblocker/pull/81)
    * Adblocker does not include tldts by default anymore
    * APIs now expect either already constructed Request as arguments of both
      hostname and domain when needed (e.g.: getCosmeticsFilters)
    * A makeRequest helper is provided to construct Request objects
    * [BREAKING] engine.match expects a `Request` as argument
    * [BREAKING] engine.matchAll expects a `Request` as argument
    * [BREAKING] engine.getCSPDirectives expects a `Request` as argument
    * [BREAKING] engine.getCosmeticsFilter expects a new `domain` argument
    * [BREAKING] `Request`'s constructor does not apply default value
      anymore and expects all arguments to be provided and initialized. You
      can now use `makeRequest` to reproduce the previous behavior of `new
      Request`.
  * Fix cosmetics injection [#79](https://github.com/cliqz-oss/adblocker/pull/79)
    * Ignore cosmetic filters with extended syntax
    * Ignore invalid cosmetic filters (using strict validation)
    * Make use of tabs.insertCSS to inject style from background
  * Update dependencies [#78](https://github.com/cliqz-oss/adblocker/pull/78)
  * Harden typescript + simplify cosmetic injection [#71](https://github.com/cliqz-oss/adblocker/pull/71)
  * Add support for Ghostery rules [#73](https://github.com/cliqz-oss/adblocker/pull/73)
    * Add support for `bug` filter attribute
    * Exceptions can now match filters with `bug` option
    * Simplify and speed-up serialization for network filters
    * Fix hostname anchor matching by preventing infix match in some corner case

## 0.4.1

*2018-12-12*

  * Update `tldts` to version `3.1.1`

## 0.4.0

*2018-12-04*

  * Fix serialization to include CSP bucket [#69](https://github.com/cliqz-oss/adblocker/pull/69)
    * [BREAKING] `NetworkFilterBucket` and `ReverseIndex` now expect different arguments

## 0.3.2

*2018-12-04*

  * Fix style injection and cosmetic filtering logic [#67](https://github.com/cliqz-oss/adblocker/pull/67)
    * All cosmetics are now using only one background action (instead of two)
    * No unloading is needed in content-script anymore
    * Simplified and optimized the implementation of CosmeticBucket
    * Internalized the version of serialized engine for auto-invalidation on update
  * Fix cosmetic matching (tokenization bug) [#65](https://github.com/cliqz-oss/adblocker/pull/65)
  * Optimize serialization and properly handle unicode in filters [#61](https://github.com/cliqz-oss/adblocker/pull/61)

## 0.3.1

*2018-11-29*

  * Fix fuzzy matching by allowing tokens of any size [#62](https://github.com/cliqz-oss/adblocker/pull/62)
  * Add support for CSP (Content Security Policy) filters [#60](https://github.com/cliqz-oss/adblocker/pull/60)
  * Add hard-coded circumvention logic (+ IL defuser) [#59](https://github.com/cliqz-oss/adblocker/pull/59)
    - Simplify 'example' extension
    - Add circumvention module and entry-point in cosmetics injection
    - Clean-up cjs and esm bundles
    - Remove obsolete logic to override user-agent in content-script
    - Simplify travis config (using new pre* hooks)
    - Consolidate 'fetch' module (with metadata about lists)


## 0.3.0

*2018-11-20*

  * Distribute both un-bundled cjs and es6 source [#54](https://github.com/cliqz-oss/adblocker/pull/54)
  * Produce a commonjs build artifact [#53](https://github.com/cliqz-oss/adblocker/pull/53)
  * Update build instructions in README.md [#52](https://github.com/cliqz-oss/adblocker/pull/52)
  * Remove dist folder from source tree [#50](https://github.com/cliqz-oss/adblocker/pull/50)
  * Cosmetics: fix rule matching when hostname is empty [#49](https://github.com/cliqz-oss/adblocker/pull/49)
  * Optimizations [#46](https://github.com/cliqz-oss/adblocker/pull/46)

    - Requests can now use `type` as a string or number (e.g.: `script` or `2`).
    ```js
    // Both are equivalent
    new Request({ type: 2, url, sourceUrl })
    new Request({ type: 'script', url, sourceUrl })
    ```
    - [BREAKING] format of serialized engine has been changed to store less data
    - [BREAKING] `id` attribute from filters has been remove, use `getId()` instead (please note that the `id` is not stored internally anymore, but generated every time `getId()` is called).
    ```js
    // Bad
    filter.id
    // Good
    filter.getId()
    ```
    - [BREAKING] values returned by `getId()` will differ from values stored in
      the `id` attribute for identical filters (the algorithm is now different
      and will do less work).
    - [BREAKING] domains specified in `$domains=` option are now stored hashed
      instead of as string, and can only be retried in their original form if
      `debug` flag is used in `FiltersEngine`
    - [BREAKING] `fastTokenizer` will now only consider tokens longer than 1
    - [BREAKING] `fastTokenizer` will now only tokenize up to 2048 characters from URLs
    - [BREAKING] hashes produced by `fastHash` and `fastHashBetween` will not
      match what was produced by the same function before this change (the seed
      and hashing algorithm was slightly changed for speed).
    - [BREAKING] un-initialized attributes of filters instances
      (`CosmeticFilter` and `NetworkFilter`) will have value `undefined`
      instead of `null` or empty string like before. It is recommended
      to use accessors (e.g.: `filter.getHostname()` instead of
      `filter.hostname`) to access internal attributes, as they will
      always return consistent types and fall-back to meaningful defaults.
    ```js
    // Bad
    filter.redirect
    filter.filter
    filter.hostname

    // Good
    filter.getRedirect()
    filter.getFilter()
    filter.getHostname()
    ```
    - [BREAKING] a new `Request` abstraction supersedes `IRequest` and
      `IRawRequest`. This new class offers a more consistent experience to work
      will requests.
    ```js
    new Request({ url })
    new Request({ url, sourceUrl })
    new Request({ url, sourceUrl, type: 'string' })
    new Request({ url, hostname, domain, type: 'string' })
    ```
    - [BREAKING] remove support for `hosts` format (e.g.: `127.0.0.1 domain`),
      since servers blocklists can also be exported in hostname anchored format
      (e.g.: `||domain^$third-party`). This simplifies the parsing logic.
    - [BREAKING] remove the following unused legacy request types:
        * `fromFetch`
        * `fromDTD`
        * `fromXLST`
        * `fromBeacon`
        * `fromCSP`
    - [BREAKING] `cpt` (Content Policy Type of requests) is now called `type`,
      to match the terminology of the WebRequestAPI.
    ```js
    // Bad
    request.cpt
    new Request({ cpt })

    // Good
    request.type
    new Request({ type })
    ```
    - Optimized and simplified implementation of `parseJSResource` (~4 times faster)
    - Optimized matching of some kinds of filters to prevent any string copy (reduced the number of calls to `slice`, `substr` and `substring`)
    - Optimized buckets ordering by moving matching filters towards the
      beginning of the array. This results in generic filter being tried first.
    - Optimized some classes of filters sharing the same pattern and options,
      with different domains. They are now fused into a single filter. For
      example, the following filters:
        * `|https://$script,domain=downloadpirate.com`
        * `|https://$script,domain=dwindly.io`
        * `|https://$script,domain=intoupload.net`
        * `|https://$script,domain=linkshrink.net`
        * `|https://$script,domain=movpod.in`
        * `|https://$script,domain=povw1deo.com|povwideo.net|powvideo.net`
        * `|https://$script,domain=sendit.cloud`
        * `|https://$script,domain=sfiles.org|suprafiles.me|suprafiles.net|suprafiles.org`
        * `|https://$script,domain=streamplay.to`
        * `|https://$script,domain=userscloud.com`
        * `|https://$script,domain=yourporn.sexy`
    will be optimized into: `|https://$script,domain=dwindly.io|movpod.in|...|yourporn.sexy`
    - `tokenize` will now allow `%` as part of tokens for filters
    - `CosmeticFilter` now support the new `+js()` syntax to inject scripts
    - `NetworkFilter`'s `getTokens()` method will now return more tokens in some
      cases. For example, if only one domain is specified in the `$domain=`
      option, then it can be used as a token (before we would only use the pattern part of each filter to extract tokens).
    - In case a `NetworkFilter` has no token available (e.g.:
      `$image,domain=ads.com`), then it can be indexed using the domains
      specified in the `$domain=` option, if any.
    - Filters of the form `*pattern` (regex) are now optimized into `pattern` (plain)
    - Filters of the form `|http://` or `|https://` or `|http*://` are now
      optimized using the newly introduced `http` and `https` options. The
      `Request` instances will now say if they are `http` or `https`, and this
      saves string comparisons while matching.
    - Fixed a bug where javascript resources were serialized twice
    - Serialization can now be performed even after `engine` has been optimized
    - Addition of a `serialize` method on `FiltersEngine` class
    - Reverse Index is now created using only one `Map` instead of two
    - optDomains and optNotDomains are now stored in a compact typed array
      instead of `Set` and a binary search is used for lookups.
    - Prevent filters from being checked twice for requests by remembering which
      request last checked a given bucket in reverse index (i.e.: `magic` field)

## 0.2.1

*2018-10-11*

  * Allow disable mutation observer [#43](https://github.com/cliqz-oss/adblocker/pull/43)
  * Fix reverse engine bucket selection [#40](https://github.com/cliqz-oss/adblocker/pull/40)
    1. The selection of bucket for each filter in ReverseIndex would
    needlessly fallback to the default bucket in some cases (even if a
    better bucket could be available).
    2. Some plain patterns would not be indexed properly if we expect
    their last token to be a potential partial match. For example
    ||foo.com/bar would not always match foo.com/barbaz, if bar (the
    last token of the filter) was selected as "best token". The
    work-around is to ignore the last token of plain patterns (to be
    safe).
  *  Allow filters without specific resource type to match any cpt [#42](https://github.com/cliqz-oss/adblocker/pull/42)

## 0.2.0

*2018-09-25*

  * Add benchmark module + various improvements [#31](https://github.com/cliqz-oss/adblocker/pull/31)
    * [breaking] If a request contains an unknown cpt (content type), it will
      not match any filter. This differs from previous behavior where an unknown
      cpt would be accepted.
    * [test] Add tests for matching and Engine based on Alex top 1000 domains
    * [perf] Add `bench` module to measure performance + memory consumption in Node.js
    * [perf] Avoid string copy in tokenizer
    * [perf] Avoid copy of filters during Engine initialization
    * [perf] Add minified version of bundle using Closure Compiler
    * [fix] Fix network filter option parsing
    * [fix] Fix `isAnchoredByHostname` in network filter matching
    * [fix] Re-work optimization framework to be easier to understand and extend
      (also fix bugs in incorrect optimizations)
    * [breaking] `Engine.match` will now return the original filter matching
      the request instead of a pretty-printed version (caveat: when
      optimizations kick-in, the original filter might not be available anymore.)
    * [breaking] Build artifacts are now located in `dist` folder.
    * Remove dependency to babel and let TypeScript compile to ES3 instead
    * Simplify TypeScript config + make more strict
    * Simplify rollup config
    * Update dependencies
    * Make use of new `tldts` package for URL parsing
    * Add type definitions in build artifacts to allow the adblocker to be used
      in a TypeScript project, as a library.
    * Update filters list assets + add script to ease future updates.
    * [fix] Cosmetic filter tokenization (ignoring styles) + add tests


## 0.1.13

*2018-07-24*

  * Export overrideUserAgent from main bundle [#27](https://github.com/cliqz-oss/adblocker/pull/27)
  * Update npm ignore [#26](https://github.com/cliqz-oss/adblocker/pull/26)

## 0.1.12

*2018-07-23*

  * Add README. [#22](https://github.com/cliqz-oss/adblocker/pull/22)
  * Export createFuzzySignature from pattern-matching bundle [#24](https://github.com/cliqz-oss/adblocker/pull/24)
  * Implement user agent overriding + clean-up example extension. [#25](https://github.com/cliqz-oss/adblocker/pull/25)
  * Split engine code + update building dependencies [#20](https://github.com/cliqz-oss/adblocker/pull/20)

## 0.1.11

*2018-06-14*

  * Ignore babelrc [#21](https://github.com/cliqz-oss/adblocker/pull/21)

## 0.1.10

*2018-06-12*

  * Handle falsy publicSuffix in cosmetic filters matching [#19](https://github.com/cliqz-oss/adblocker/pull/19)
  * Network filter matching handle empty hostname [#18](https://github.com/cliqz-oss/adblocker/pull/18)
  * Update dependencies to fix node.js 10 build [#17](https://github.com/cliqz-oss/adblocker/pull/17)

## 0.1.9

*2018-05-07*

  * Allow an extended set of unicode characters in tokenizer [#16](https://github.com/cliqz-oss/adblocker/pull/16)

## 0.1.8

*2018-05-07*

  * Export compact set as part of main bundle [#15](https://github.com/cliqz-oss/adblocker/pull/15)
  * Produce ES5 artifacts + make type checking more strict (no implicit any) [#14](https://github.com/cliqz-oss/adblocker/pull/14)

## 0.1.7

*2018-02-20*

  * avoid force layout [#12](https://github.com/cliqz-oss/adblocker/pull/12)

## 0.1.6

*2018-02-14*

  * Allow hostname anchors to end with a dot [#11](https://github.com/cliqz-oss/adblocker/pull/11)

## 0.1.5

*2018-02-14*

  * Implement `fuzzy` pattern matching [#7](https://github.com/cliqz-oss/adblocker/pull/7)
  * Fix `toString` on network filters [794e830](https://github.com/cliqz-oss/adblocker/commit/794e830ee70dd994c8eac7bc71005c18e0a7e769)

## 0.1.4

*2018-01-17*

  * Generate specialized bundles [17e30cb](https://github.com/cliqz-oss/adblocker/commit/17e30cb8b9698746bc30b9ff1b3700000dffc52e)
  * Add travis configuration [fa1d830](https://github.com/cliqz-oss/adblocker/commit/fa1d8304e98ecf43a99c0082338672417c14e61b)
  * Add demonstration webextension [92c1b88](https://github.com/cliqz-oss/adblocker/commit/92c1b88c205f5e34b9205b3a8a6da1717c8a3c16)

## 0.1.3

*skipped*

## 0.1.1

*2017-12-18*

  * Initial release [8ea701a](https://github.com/cliqz-oss/adblocker/commit/8ea701a867c2cb886fbef5172c298a38c248ece8).
  * Migrate adblocker in its own package.
    * [38aae12](https://github.com/cliqz-oss/adblocker/commit/38aae125cce815a9eddf598244d0b6bc13c33356)
    * [7686793](https://github.com/cliqz-oss/adblocker/commit/76867936bbd319b797d3820c77e903086ac4265d)
    * [68e494f](https://github.com/cliqz-oss/adblocker/commit/68e494f75709ffdff3402a7a25f38feaa6460c02)
    * [1aaa40a](https://github.com/cliqz-oss/adblocker/commit/1aaa40a7d1b6070dfbc17699cdf8a59caf88c662)
    * [092a977](https://github.com/cliqz-oss/adblocker/commit/092a9773f31308df55ce387191e32cd040dd7441)
    * [26fc215](https://github.com/cliqz-oss/adblocker/commit/26fc215ce18960c4d456eb0fd541e14368f16038)
    * [3c58491](https://github.com/cliqz-oss/adblocker/commit/3c58491372a5cba7cda47b689cb539adf5fcce1d)
    * [b6ae3fa](https://github.com/cliqz-oss/adblocker/commit/b6ae3fa35e7f95720d23eb726c1cec7d90c41f76)
