## v1.4.20 (2020-01-15)

#### :house: Internal
* [#412](https://github.com/cliqz-oss/adblocker/pull/412) Migrate local GitHub actions to TypeScript ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.19 (2020-01-15)

#### :house: Internal
* [#410](https://github.com/cliqz-oss/adblocker/pull/410) Add dependabot config into repository ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.12 (2020-01-15)

#### :house: Internal
* [#409](https://github.com/cliqz-oss/adblocker/pull/409) Add action to release on NPM ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.2 (2020-01-15)

#### :memo: Documentation
* [#404](https://github.com/cliqz-oss/adblocker/pull/404) docs: add support for PR labels ([@remusao](https://github.com/remusao))

#### :house: Internal
* [#407](https://github.com/cliqz-oss/adblocker/pull/407) Add GitHub actions for releasing on GitHub ([@remusao](https://github.com/remusao))
* [#405](https://github.com/cliqz-oss/adblocker/pull/405) Make use of GitHub actions for CI ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.1 (2019-12-16)

#### :bug: Bug Fix
* `adblocker-puppeteer`
  * [#401](https://github.com/cliqz-oss/adblocker/pull/401) puppeteer: do not block main frames ([@remusao](https://github.com/remusao))

#### :memo: Documentation
* `adblocker`
  * [#400](https://github.com/cliqz-oss/adblocker/pull/400) Fix cosmetics readme ([@fcjr](https://github.com/fcjr))

#### :house: Internal
* [#399](https://github.com/cliqz-oss/adblocker/pull/399) Remove travis config ([@remusao](https://github.com/remusao))
* [#397](https://github.com/cliqz-oss/adblocker/pull/397) Set up CI with Azure Pipelines ([@chrmod](https://github.com/chrmod))

#### Committers: 3
- Frank Chiarulli Jr. ([@fcjr](https://github.com/fcjr))
- Krzysztof Jan Modras ([@chrmod](https://github.com/chrmod))
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.0 (2019-11-12)

#### :bug: Bug Fix
* `adblocker`
  * [#388](https://github.com/cliqz-oss/adblocker/pull/388) Fix websocket filters handling ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker-puppeteer-example`, `adblocker-puppeteer`
  * [#386](https://github.com/cliqz-oss/adblocker/pull/386) Bump puppeteer to v2 ([@remusao](https://github.com/remusao))
* `adblocker-electron-example`, `adblocker-electron`
  * [#385](https://github.com/cliqz-oss/adblocker/pull/385) Bump electron version to 7 + inject CSS with 'user' origin ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.3.1 (2019-10-09)

#### :bug: Bug Fix
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#373](https://github.com/cliqz-oss/adblocker/pull/373) fix: fetching resources.txt from CDN ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.3.0 (2019-10-07)

#### :nail_care: Polish
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#368](https://github.com/cliqz-oss/adblocker/pull/368) make it easier to use HTML filtering outside of `WebExtensionBlocker` ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.2.0 (2019-10-01)

#### :rocket: New Feature
* `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#339](https://github.com/cliqz-oss/adblocker/pull/339) Support html filtering ([@remusao](https://github.com/remusao))
* `adblocker`
  * [#338](https://github.com/cliqz-oss/adblocker/pull/338) feat: add support for 'all' option ([@remusao](https://github.com/remusao))
  * [#337](https://github.com/cliqz-oss/adblocker/pull/337) feat: add support for redirect-rule option ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix
* `adblocker-electron`
  * [#358](https://github.com/cliqz-oss/adblocker/pull/358) fix: cosmetics injection in Electron ([@remusao](https://github.com/remusao))

#### :nail_care: Polish
* `adblocker-webextension`
  * [#359](https://github.com/cliqz-oss/adblocker/pull/359) removeListener regardless of engine config ([@remusao](https://github.com/remusao))
* `adblocker-benchmarks`, `adblocker`
  * [#333](https://github.com/cliqz-oss/adblocker/pull/333) simplify reverse index by removing special tokens handling ([@remusao](https://github.com/remusao))

#### :memo: Documentation
* [#355](https://github.com/cliqz-oss/adblocker/pull/355) Add slides of talk at adblockerdevsummit 2019 ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker`
  * [#335](https://github.com/cliqz-oss/adblocker/pull/335) chore: update local assets + generate compression codebooks ([@remusao](https://github.com/remusao))

#### :running_woman: Performance
* `adblocker-electron-example`, `adblocker-puppeteer-example`, `adblocker-webextension-example`, `adblocker`
  * [#334](https://github.com/cliqz-oss/adblocker/pull/334) chore: clean-ups and small optimizations ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.1.0 (2019-09-17)

#### :rocket: New Feature
* `adblocker-electron`, `adblocker-puppeteer`, `adblocker-webextension`
  * [#328](https://github.com/cliqz-oss/adblocker/pull/328) Allow blocker unload ([@remusao](https://github.com/remusao))
* `adblocker`
  * [#327](https://github.com/cliqz-oss/adblocker/pull/327) feature: support inline-script and inline-font options ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker`
  * [#329](https://github.com/cliqz-oss/adblocker/pull/329) add test case to make sure +js() can be whitelisted ([@remusao](https://github.com/remusao))
* `adblocker-benchmarks`
  * [#314](https://github.com/cliqz-oss/adblocker/pull/314) bench: add runner for minbrowser blocker ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.0.2 (2019-09-02)

#### :bug: Bug Fix
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#312](https://github.com/cliqz-oss/adblocker/pull/312) Fix block main document ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.0.0 (2019-08-27)

#### :nail_care: Polish
* `adblocker-content`, `adblocker-puppeteer-example`, `adblocker`
  * [#300](https://github.com/cliqz-oss/adblocker/pull/300) small improvements ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker-benchmarks`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#294](https://github.com/cliqz-oss/adblocker/pull/294) chore: clean-ups ([@remusao](https://github.com/remusao))
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#255](https://github.com/cliqz-oss/adblocker/pull/255) switch to using @cliqz/metalint for project linting ([@remusao](https://github.com/remusao))
* Other
  * [#293](https://github.com/cliqz-oss/adblocker/pull/293) ci: enable latest Node.js + LTS ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v0.14.0 (2019-08-20)

#### :nail_care: Polish
* `adblocker-electron`, `adblocker-puppeteer`, `adblocker-webextension`
  * [#288](https://github.com/cliqz-oss/adblocker/pull/288) only register listeners when network/cosmetics filtering is enabled ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker`
  * [#290](https://github.com/cliqz-oss/adblocker/pull/290) clean-up and update local assets + regenerate codebooks ([@remusao](https://github.com/remusao))
* Other
  * [#289](https://github.com/cliqz-oss/adblocker/pull/289) chore: remove un-used dependencies ([@remusao](https://github.com/remusao))

#### :running_woman: Performance
* `adblocker-webextension-example`, `adblocker`
  * [#287](https://github.com/cliqz-oss/adblocker/pull/287) Optimize cosmetics injection ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v0.13.0 (2019-08-16)

#### :memo: Documentation
* `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#281](https://github.com/cliqz-oss/adblocker/pull/281) Update readmes ([@remusao](https://github.com/remusao))

#### :house: Internal
* Other
  * [#265](https://github.com/cliqz-oss/adblocker/pull/265) fix memory issue by pinning Node.js version ([@remusao](https://github.com/remusao))
* `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#264](https://github.com/cliqz-oss/adblocker/pull/264) create new @cliqz/adblocker-content package with common utils ([@remusao](https://github.com/remusao))

#### :running_woman: Performance
* `adblocker`
  * [#257](https://github.com/cliqz-oss/adblocker/pull/257) allow correct size allocation for data views ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v0.12.1 (2019-08-13)

#### :boom: Breaking Change
* `adblocker-electron`, `adblocker`
  * [#248](https://github.com/cliqz-oss/adblocker/pull/248) electron: promote mutationObserver option to main config + fix constructor and parse methods ([@remusao](https://github.com/remusao))

#### :rocket: New Feature
* `adblocker-electron-example`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#251](https://github.com/cliqz-oss/adblocker/pull/251) implement simple event emitter for FiltersEngine and sub-classes ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix
* `adblocker-circumvention`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#219](https://github.com/cliqz-oss/adblocker/pull/219) fix source maps in all packages ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker`
  * [#256](https://github.com/cliqz-oss/adblocker/pull/256) Update assets + re-generate compression codebooks ([@remusao](https://github.com/remusao))
* `adblocker-electron-example`, `adblocker-electron`, `adblocker`
  * [#250](https://github.com/cliqz-oss/adblocker/pull/250) electron: update to 6.0.1 ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)