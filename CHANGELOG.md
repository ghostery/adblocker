# Adblocker

## *not released*

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
