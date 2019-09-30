# Adblocker

## Next

*not released*

  * removeListener regardless of engine config [#359](https://github.com/cliqz-oss/adblocker/pull/359)
  * feat: support subset of HTML filtering rules (^script:has-text(...)) [#339](https://github.com/cliqz-oss/adblocker/pull/339)
  * feat: add support for 'all' option [#338](https://github.com/cliqz-oss/adblocker/pull/338)
  * feat: add support for 'redirect-rule' option [#337](https://github.com/cliqz-oss/adblocker/pull/337)
  * chore: update local assets + generate compression codebooks [#335](https://github.com/cliqz-oss/adblocker/pull/335)
  * chore: clean-ups and small optimizations [#334](https://github.com/cliqz-oss/adblocker/pull/334)
    * rename `engine` to `blocker` in example projects (consistent naming)
    * enable on-the-fly compression in example projects
    * remove unused compact set exports (keep internal only)
    * remove explicit `resourcesUrl` in `fromLists(...)` (we always use the one served from CDN)
    * use bare for loops in compact sets and optimization framework
  * simplify reverse index by removing ad-hoc tokens handling [#333](https://github.com/cliqz-oss/adblocker/pull/333)

## 1.1.0

*2019-09-17*

  * feat: allow disabling adblocking in WebExtension context [#328](https://github.com/cliqz-oss/adblocker/pull/328)
  * feat: allow disabling adblocking in Puppeteer page [#328](https://github.com/cliqz-oss/adblocker/pull/328)
  * feat: allow disabling adblocking in Electron session [#328](https://github.com/cliqz-oss/adblocker/pull/328)
  * feat: support 'inline-script' and 'inline-font' options [#327](https://github.com/cliqz-oss/adblocker/pull/327)

## 1.0.2

*2019-09-02*

  * fix: do not block main document requests [#312](https://github.com/cliqz-oss/adblocker/pull/312)

## 1.0.1

*2019-08-28*

  * fix (electron): prevent preload script from overwriting existing ones [#302](https://github.com/cliqz-oss/adblocker/pull/302)

## 1.0.0

*2019-08-27*

  * small improvements [#300](https://github.com/cliqz-oss/adblocker/pull/300)
    * minify script injection wrapper to save a few bytes
    * rename 'engine' into 'blocker' in examples for consistency
    * use up-to-date resources.txt from CDN
    * drop 'collapse' type (not supported upstream anymore)
    * expose some extra symbols: `detectFilterType` and `Resources`
  * chore: clean-ups [#294](https://github.com/cliqz-oss/adblocker/pull/294)
    * Remove use of `eslint` completely (all source code is TypeScript so `tslint` is enough)
    * Remove `Dockerfile`, `run_tests.sh`
    * Move `bench` to TypeScript
    * Remove un-used `bench/dataset/` folder
    * Make sure that all sub-packages can be installed and built independently (fix missing deps)
  * enable @cliqz/metalint for repository linting [#255](https://github.com/cliqz-oss/adblocker/pull/255)

## 0.14.0

*2019-08-20*

  * update compression codebooks [#289](https://github.com/cliqz-oss/adblocker/pull/289)
  * clean-up and update local assets + add fanboy-cookiemonster.txt [#289](https://github.com/cliqz-oss/adblocker/pull/289)
  * only register listeners when network/cosmetics filtering is enabled [#288](https://github.com/cliqz-oss/adblocker/pull/288)
  * Improve cosmetics selector tokenization by supporting new cases [#287](https://github.com/cliqz-oss/adblocker/pull/287)
    * correctly tokenize #selector:not(...) and .selector:not(...)
    * correctly tokenize .selector1.selector2

## 0.13.2

*2019-08-17*

  * fix certificate issue with Pete Lowe adserver

## 0.13.1

*2019-08-16*

  * set `Request.tabId` to `webContentsId` in Electron platform

## 0.13.0

*2019-08-16*

  * allow correct size allocation for data views [#257](https://github.com/cliqz-oss/adblocker/pull/257)

    > Implement a mechanism which allows to predict the number of
    > bytes needed to serialize any of the data-structures used by the
    > adblocker, ahead of time (before serialization). This allows to lift
    > the limitation of size completely (beforehand, we had to allocate
    > a safe amount of memory to be sure there would be enough space).
    > As a benefit, only the required amount of memory is used during
    > initialization and updates, and there is no longer an arbitrary and
    > hard-coded upper limit.

  * create new @cliqz/adblocker-content package with common utils [#264](https://github.com/cliqz-oss/adblocker/pull/264)

    > We currently rely on rollup to create a small bundle for content
    > related code imported from @cliqz/adblocker. Multiple times in
    > the past the bundler was not aggressive enough and code from
    > background was pulled in content bundles. To make sure we do not
    > have this issue again, all these content-scripts helpers are moved
    > into their own package.

  * provide helpers to download and build engines from lists [#280](https://github.com/cliqz-oss/adblocker/pull/280)

    > This change allows to start blocking ads with very little logic in
    > _Webextension_, _Electron_ and _Puppeteer_ platforms! To achieve this,
    > blockers abstraction now provide static methods to fetch pre-built
    > engines from Cliqz's CDN or build them from scratch using lists of URLs
    > to subscriptions. Here is how it looks like:
    >
    > *Webextension*:
    > ```js
    > import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';
    >
    > WebExtensionBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    >   blocker.enableBlockingInBrowser();
    > });
    > ```
    >
    > *Electron*:
    > ```js
    > import { session } from 'electron';
    > import fetch from 'cross-fetch'; // or 'node-fetch'
    >
    > import { ElectronBlocker } from '@cliqz/adblocker-electron';
    >
    > ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    >   blocker.enableBlockingInSession(session.defaultSession);
    > });
    > ```
    >
    > *Puppeteer*:
    > ```js
    > import puppeteer from 'puppeteer';
    > import fetch from 'cross-fetch'; // or 'node-fetch'
    >
    > import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
    >
    > const browser = await puppeteer.launch();
    > const page = await browser.newPage();
    >
    > PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    >   blocker.enableBlockingInPage(page);
    > });
    > ```

## 0.12.1

*2019-08-13*

  * Update assets + re-generate compression codebooks [#256](https://github.com/cliqz-oss/adblocker/pull/256)
  * implement simple event emitter for `FiltersEngine` and sub-classes [#251](https://github.com/cliqz-oss/adblocker/pull/251)
  * electron: fix bundles [#249](https://github.com/cliqz-oss/adblocker/pull/249)
  * electron: promote mutationObserver option to main config + fix constructor and parse methods [#248](https://github.com/cliqz-oss/adblocker/pull/248)
  * fix source maps support for all packages [#219](https://github.com/cliqz-oss/adblocker/pull/219)

## 0.12.0

*2019-07-24*

  * speed-up building and unify configurations [#212](https://github.com/cliqz-oss/adblocker/pull/212)
    * switch typescript config into `composite` mode to allow faster re-builds and references between projects
    * store all build artifacts in `dist` instead of splitting them into `dist` + `build`
    * only emit `es6` modules with TypeScript and produce everything else with rollup (`cjs` + minimized UMD)
    * only provide one minimized bundle: `UMD`
    * remove `browser` key from package.json (not needed as code is cross-platform)
    * add command to watch for changes
  * add `ElectronBlocker` abstraction to perform adblocking in Electron [#180](https://github.com/cliqz-oss/adblocker/pull/180)
  * allow the 'not' pseudoclass in cosmetic filters [#184](https://github.com/cliqz-oss/adblocker/pull/184)
  * switch from `tldts` to `tldts-experimental` package [#183](https://github.com/cliqz-oss/adblocker/pull/183)
    * add `bootstrap` to root package.json
    * switch from `tldts` to `tldts-experimental` (faster, smaller bundles)
    * switch internal commands from `npm` to `yarn`
    * remove redundant `lint` during CI
  * change structure of the cliqz/adblocker project into a monorepo [#181](https://github.com/cliqz-oss/adblocker/pull/181)
    * embrace `lerna` and `yarn` workspaces as a way to manage multiple packages
    * adopt conventional commits as a way to structure contributions
    * create few single-purpose packages:
      - `@cliqz/adblocker` (contains most building blocks)
      - `@cliqz/adblocker-circumvention` (standalone counter measures for IL)
      - `@cliqz/adblocker-webextension` (WebExtension wrapper)
      - `@cliqz/adblocker-webextension-cosmetics` (WebExtension cosmetics support)
      - `@cliqz/adblocker-puppeteer` (Puppeteer wrapper)
      - `@cliqz/adblocker-electron` (Electron wrapper)
    * create a few demonstration projects for documentation purposes:
      - `@cliqz/adblocker-webextension-example`
      - `@cliqz/adblocker-puppeteer-example`
      - `@cliqz/adblocker-electron-example`
    * migrate content blockers benchmark into `@cliqz/adblocker-benchmarks`
    * add `licenser.js` linter to enforce consistency in licenses and copyright notices
    * add `lerna-lint.js` linter to enforce consistency between all sub-packages


## 0.11.0

*2019-06-17*

  * In `debug` mode, make FiltersEngine creation and updates deterministic [#176](https://github.com/cliqz-oss/adblocker/pull/176)
  * Fix bug in ID computation for `:style(...)` cosmetic filters [#176](https://github.com/cliqz-oss/adblocker/pull/176)
  * Detect invalid cases of `domain=` options in NetworkFilter [#176](https://github.com/cliqz-oss/adblocker/pull/176)
  * Make `generateDiff` more robust and cover corner case with ID collision [#176](https://github.com/cliqz-oss/adblocker/pull/176)
  * Add stress-test for FiltersEngine updates. This allows us to validate all past updates of all supported lists [#176](https://github.com/cliqz-oss/adblocker/pull/176)
  * Provide high level puppeteer blocker abstraction [#177](https://github.com/cliqz-oss/adblocker/pull/177)
    * [BREAKING] rename `WebExtensionEngine` into `WebExtensionBlocker`
    * [BREAKING] change format of `redirect` field in blocking response, it now
      exposes more information about the redirected resource: `contentType`,
      `body` and `dataUrl` (which was the only information originally returned
      by `FiltersEngine.match(...)`).
    * Rename `example` into `examples` and move test webextension into `examples/webextension`
  * Add missing dependencies on @types/puppeteer needed by users of the library [#174](https://github.com/cliqz-oss/adblocker/pull/174/)

## 0.10.0

*2019-06-05*

  * Add helpers to create and manipulate diffs [#172](https://github.com/cliqz-oss/adblocker/pull/172/)
    * `getLinesWithFilters(...)`
    * `generateDiff(...)`
    * `mergeDiffs(...)`
  * Add `updateFromDiff` method on `FiltersEngine` [#172](https://github.com/cliqz-oss/adblocker/pull/172/)
  * Add `getFilters` method on `FiltersEngine` [#172](https://github.com/cliqz-oss/adblocker/pull/172/)
  * Fix update issue by performing copy in `StaticDataView.getBytes` [#172](https://github.com/cliqz-oss/adblocker/pull/172/)
  * Serialize `config.debug` as well [#172](https://github.com/cliqz-oss/adblocker/pull/172/)
  * Implement support for RegExp network filters [#169](https://github.com/cliqz-oss/adblocker/pull/169)
  * [EXPERIMENTAL] add on-the-fly string compression using short-string
    optimized method. Off by default, it can be enabled by using the
    `enableCompression` flag in `Config`. This allows a reduction in size of
    about 20% for `FiltersEngine`, at the cost of slightly slower updates. [#122](https://github.com/cliqz-oss/adblocker/pull/122)
  * Remove dependency on tslib [#167](https://github.com/cliqz-oss/adblocker/pull/167)
  * Add built-in error detection code in serialized engine [#165](https://github.com/cliqz-oss/adblocker/pull/165)
    - To prevent un-noticed data corruptions of the serialized adblocker,
      FiltersEngine.serialize now automatically includes a crc32 checksum and
      FiltersEngine.deserialize will automatically check integrity of the given
      serialized engine. Any mismatch will raise an exception like when the
      version of the adblocker does not match between the serialized engine and
      the code using to load it.
  * [BREAKING] `getCosmeticsFilter` API changed to allow finer-grain subsetting
    of cosmetic filters returned: hostname-specific, DOM-specific, generic, etc.
    This allows to inject x70 less custom styles in frames for the same
    blocking, which results in a massive memory decrease as well as less time
    spent in repaint. [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * [BREAKING] cosmetic unhide filters without hostname constraints are allowed. [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * [BREAKING] `NetworkFilter.isCptAllowed` now accept request type as a string. [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * [BREAKING] drop support for legacy Firefox Bootstrap request types. [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * Fix matching of hostnames anchors with wildcard. [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * Add support for `$frame` option in network filters. [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * Add support for `$document` and `$doc` options in network filters. [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * Add soft dependency to tldts to simplify API [#163](https://github.com/cliqz-oss/adblocker/pull/163)
    - left as require/import in normal bundles
    - bundled in minified bundles
  * Add tests for Request abstraction [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * Add static method helpers to create Request instances [#163](https://github.com/cliqz-oss/adblocker/pull/163)
    - `Request.fromRawDetails(...)`
    - `Request.fromWebRequestDetails(...)`
    - `Request.fromPuppeteerDetails(...)`
    - `Request.fromElectronDetails(...)`
  * Add tests for injection using `jsdom` [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * Cosmetic filtering performance improvements [#163](https://github.com/cliqz-oss/adblocker/pull/163)
    - Make use of DOM information to return subset of filters: ids, classes, hrefs
    - Make use of MutationObserver from content-script to return new DOM info
  * Create integration benchmark to measure full extension [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * Add Request parsing micro-benchmark [#163](https://github.com/cliqz-oss/adblocker/pull/163)
  * Update bench/comparison to use adblock-rs instead of ad-block [#163](https://github.com/cliqz-oss/adblocker/pull/163)

## 0.9.1

*03-05-2019*

  * Optimize getCosmeticsFilters [#158](https://github.com/cliqz-oss/adblocker/pull/158)
    * [BREAKING] `CosmeticFilterBucket.getCosmeticsFilters(...)` now
      returns `{ injections: CosmeticFilter[]; stylesheet: string }`
    * Internally `CosmeticFilterBucket` will do much less work to get
      cosmetic filters. In particular, we pre-compute a base stylesheet with
      all generic hide filters not having any corresponding unhide (`#@#`)
      rule in the bucket (that's most of the filters). This means we only need
      to apply exceptions and compute dynamic stylesheets for a minority of
      filters (~4%).
    * Add benchmark for `getCosmeticsFilters`.
  * Drop RegExp in network filters [#156](https://github.com/cliqz-oss/adblocker/pull/156)

## 0.9.0

*26-04-2019*

  * prevent potential out-of-bound access [#150](https://github.com/cliqz-oss/adblocker/pull/150)
  * bench: update comparison [#148](https://github.com/cliqz-oss/adblocker/pull/148)
    * Rename Ghostery to Cliqz
    * Update uBlock Origin to 1f8f616fafc0a3267cfe0796f0bbe29410fd6a71
    * Update adblockpluscore to 69118b828db0f6a53bc2306deacffc5361aeef0c
    * Update Brave to 4.1.7
  * Punycode clean-up + tests [#145](https://github.com/cliqz-oss/adblocker/pull/145)
    * add extensive tests for data-view pushUTF8 and punycode toASCII/toUnicode
    * punycode: remove support for email addresses
    * punycode: remove mapDomain
    * punycode: replace for..of by bare for loops
    * punycode: inline helpers
  * Add support for `$elemhide` + fix `$generichide` handling [#143](https://github.com/cliqz-oss/adblocker/pull/143)
  * Speed-up `parseFilters` [#142](https://github.com/cliqz-oss/adblocker/pull/142)
    * clean-up filters parsing benchmark
    * speed-up parseFilters and detectFilterType (10-15% gain)
    * speed-up CosmeticFilter.parse (15% gain)
    * speed-up NetworkFilter.parse (10% gain)
  * Introduce TokensBuffer to speed-up tokenization of filters and requests [#141](https://github.com/cliqz-oss/adblocker/pull/141)
    * results in a 25% speed-ups on NetworkFilters.getTokens which is one of the bottle-necks of ReverseIndex.update
  * Implement variable-length encoding in StaticDataView to save space [#138](https://github.com/cliqz-oss/adblocker/pull/138)
    * saving of ~4% of the total size
    * fix issue with alignment of Uint32Array when serializing/deserializing (alignment should be done after persisting the size of the array, not before)
    * clean-up Node.js versions tested in Travis.
  * Add AdblockFast (originally from Bluhell Firewall) to bench/comparison [#133](https://github.com/cliqz-oss/adblocker/pull/133)
  * [BREAKING] Remove support for `$bug` option [#131](https://github.com/cliqz-oss/adblocker/pull/131)
  * Add support for `$badfilter` option [#127](https://github.com/cliqz-oss/adblocker/pull/127)
    * add FiltersContainer class to store a list of filters
    * improve allocations by estimating required size of buffer from filters ahead of time
    * optimize hasUnicode using RegExp
    * include punycode package in source-tree to allow transpilation by tsc + minification + type checking
    * filters will now keep track of isUnicode which indicates if filter contains any unicode character. This allows to optimize storage + remove the need from checking later on.
    * StaticDataView's pushUTF8 now assumes the input is unicode and will not check
  * Better formatting for injected stylesheets [#126](https://github.com/cliqz-oss/adblocker/pull/126)
  * Fix python dependencies security alert [#124](https://github.com/cliqz-oss/adblocker/pull/124)
  * Update locale assets [#121](https://github.com/cliqz-oss/adblocker/pull/121)
  * [BREAKING] Remove support for `script:contains(...)` cosmetic filters [#120](https://github.com/cliqz-oss/adblocker/pull/120)
  * Add support for `$3p`, `$1p` and `$css` options [#119](https://github.com/cliqz-oss/adblocker/pull/119)
  * Fix example extension and README.md [#118](https://github.com/cliqz-oss/adblocker/pull/118)
  * Update dev dependencies [#117](https://github.com/cliqz-oss/adblocker/pull/117)

## 0.8.0

*2019-03-26*

  * Support for cyrillic characters [#115](https://github.com/cliqz-oss/adblocker/pull/115)
  * Implement generichide option + fix generic cosmetic matching [#114](https://github.com/cliqz-oss/adblocker/pull/114)
    * [BREAKING] Change arguments of FiltersEngine.getCosmeticsFilters
      getCosmeticsFilters({ url, hostname, domain }) is now expected
      instead of getCosmeticsFilters(hostname, domain). This allows to
      apply $generichide options which can match on arbitrary parts of the
      main_frame URL (not only hostname).
    * Add support for $generichide option in network filters
    * Fix matching of generic cosmetics when only negation was specified

## 0.7.0

*2019-03-08*

  * Introduce Config object + remove lists abstractions [#111](https://github.com/cliqz-oss/adblocker/pull/111)
  * Remove bench deps + fix matching by using initiator as sourceUrl [#109](https://github.com/cliqz-oss/adblocker/pull/108)
  * Update benchmarks [#108](https://github.com/cliqz-oss/adblocker/pull/108)
    * comparison: include request processing for each benchmark
    * Use latest uBlock Origin with WebAssembly enabled
    * Update results from benchmarks and clean-up
    * Add benchmark for regex-based hostname extraction

## 0.6.9

*2019-02-15*

  * Fix stack overflow error on Edge [#105](https://github.com/cliqz-oss/adblocker/pull/105)
  * Update and clean-up travis config [#104](https://github.com/cliqz-oss/adblocker/pull/104)
  * Add rawType attribute to `Request` class [#102](https://github.com/cliqz-oss/adblocker/pull/104)

## 0.6.8

*2019-02-08*

  * Add comparison folder to benchmark different blockers [#100](https://github.com/cliqz-oss/adblocker/pull/100)
      * Clean-up `isAnchoredByHostname` to be more readable
      * Fix memory leak in reverse index (where we would keep a reference to buffer needlessly)
      * Make sure Engine does not use more memory than necessary using `slice` instead of `subarray`

## 0.6.7

*2019-02-06*

  * [bug] Invalidate serialized engines with ENGINE_VERSION bump [#99](https://github.com/cliqz-oss/adblocker/pull/99)

## 0.6.6

*2019-02-04*

  * [bug] Restore original buffer size for reverse index creation [#98](https://github.com/cliqz-oss/adblocker/pull/98)

## 0.6.5

*2019-02-04*

  * [bug] Bump engine version to invalidate existing cache [#97](https://github.com/cliqz-oss/adblocker/pull/97)

## 0.6.4

*2019-02-04*

  * [perf] Speed-up matching by using raw Uint32Array instead of view [#96](https://github.com/cliqz-oss/adblocker/pull/96)
    * Average time to process request is now 0.007 ms (instead of 0.028
      after implementing lazy loading). This is now even faster than ever (our
      previous speed was ~0.008 ms per request).

## 0.6.2

*2019-01-30*

  * [bug] Make sure getId() always returns the same value for a given filter [#94](https://github.com/cliqz-oss/adblocker/pull/94)
    * Previously the value of ID could change after some internal attribute
      were changed during matching (in particular 'optDomains' and
      'optNotDomains' would be sorted to allow more efficient matching which
      would change the ID).

## 0.6.1

*2019-01-28*

  * [regression] allow unicode characters in filters [#93](https://github.com/cliqz-oss/adblocker/pull/93)

## 0.6.0

*2019-01-28*

  * Implement lazy loading and compact internal representation [#87](https://github.com/cliqz-oss/adblocker/pull/87)
    * [BREAKING] serialization module has been removed, instead, each class now
      provides a `serialize` method as well as a static method `deserialize`.
    * [BREAKING] FiltersEngine now exposes different methods for update:
      `update` which expects a diff of filters, `updateList` and
      `updateResources`. This API should be a cleared and allows using the
      adblocker without managing filters lists.
    * [BREAKING] ReverseIndex' API dropped the use of a callback to specify
      filters and instead expects a list of filters.
    * [BREAKING] parsing and matching filters can now be done using methods of
      the filters classes directly instead of free functions. For example
      NetworkFilter has a `parse` and `match` method (with the same expected
      arguments).
    * ReverseIndex is now implemented using a very compact
      representation (stored in a typed array).
    * `toString` method of filters should now be more accurate.
    * Addition of numerous unit tests (coverage is now >90%)
  * Implement support for :style cosmetic filters [#86](https://github.com/cliqz-oss/adblocker/pull/86)
    * [BREAKING] `getCosmeticsFilters` will now return CSS as a single string
      (stylesheet) instead of a list of selectors. This simplifies the usage and
      allows to directly inject this into the page using the method of your
      choice: through content scripts or tabs.injectCSS API.

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
