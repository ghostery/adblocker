# v1.25.0 (Tue Aug 30 2022)

#### :rocket: New Feature

- New option "enablePushInjectionsOnNavigationEvents" [#2750](https://github.com/ghostery/adblocker/pull/2750) ([@philipp-classen](https://github.com/philipp-classen))

#### Authors: 1

- Philipp Claßen ([@philipp-classen](https://github.com/philipp-classen))

---

# v1.23.9 (Fri Aug 19 2022)

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump mocha from 9.2.2 to 10.0.0 [#2582](https://github.com/ghostery/adblocker/pull/2582) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.23.7 (Wed Mar 23 2022)

#### :bug: Bug Fix

- Don't throw an error when receiving a message from popup [#2506](https://github.com/ghostery/adblocker/pull/2506) ([@private-face](https://github.com/private-face))

#### Authors: 1

- Vladimir Zhuravlev ([@private-face](https://github.com/private-face))

---

# v1.22.7 (Wed Sep 22 2021)

#### :house: Internal

- Bump typescript [#2243](https://github.com/cliqz-oss/adblocker/pull/2243) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.22.3 (Thu Jul 29 2021)

#### :nut_and_bolt: Dependencies

- Bump @types/mocha from 8.2.3 to 9.0.0 [#2062](https://github.com/cliqz-oss/adblocker/pull/2062) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump webextension-polyfill-ts from 0.25.0 to 0.26.0 [#2027](https://github.com/cliqz-oss/adblocker/pull/2027) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.22.2 (Sun Jun 20 2021)

#### :nut_and_bolt: Dependencies

- Bump mocha from 8.4.0 to 9.0.0 [#1989](https://github.com/cliqz-oss/adblocker/pull/1989) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.21.0 (Sun May 30 2021)

#### :rocket: New Feature

- Bump Electron to v13.x and Puppeteer to v9.x [#1967](https://github.com/cliqz-oss/adblocker/pull/1967) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Bump lock file to fix some security issue [#1922](https://github.com/cliqz-oss/adblocker/pull/1922) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- Bump @rollup/plugin-node-resolve from 11.2.1 to 13.0.0 [#1912](https://github.com/cliqz-oss/adblocker/pull/1912) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.3 (Sat Feb 27 2021)

#### :house: Internal

- Update copyright notices [#1715](https://github.com/cliqz-oss/adblocker/pull/1715) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.1 (Tue Feb 16 2021)

#### :bug: Bug Fix

- build(deps): bump webextension-polyfill-ts from 0.24.0 to 0.25.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump webextension-polyfill-ts from 0.22.0 to 0.24.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump webextension-polyfill-ts from 0.24.0 to 0.25.0 [#1681](https://github.com/cliqz-oss/adblocker/pull/1681) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump webextension-polyfill-ts from 0.22.0 to 0.24.0 [#1629](https://github.com/cliqz-oss/adblocker/pull/1629) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.20.0 (Thu Jan 21 2021)

### Release Notes

#### Initial support for extended CSS selectors (a.k.a. procedural filters) ([#1574](https://github.com/cliqz-oss/adblocker/pull/1574))

Add initial support for extended CSS selectors (a.k.a. procedural filters) as well as the `:remove()` modifier for element hiding rules (note: the already supported `:style` modified now also works with extended CSS selectors). The following new pseudo-classes are implemented: `:has` (and its alias `:if`), `:has-text` (both string and RegExp literals), and `:not` (whenever its argument is also an extended selector, otherwise fallback to native implementation).

Caveats:
* Loading of extended css filters is disabled by default and needs to be toggled using the `loadExtendedSelectors` option while [initializing the blocker instance](https://github.com/cliqz-oss/adblocker/blob/3361723138f40c3cb96b4c6e611f2b030f75d891/packages/adblocker-webextension-example/background.ts#L61).
* These news selectors are currently only supported by `WebExtensionBlocker` (support for Puppeteer, Electron and Playwright is not planned at this time but help from the community would be greatly appreciated).

Miscellaneous changes:
* Removal of unused `injectCSSRule` helper.
* Replace Closure compiler by Terser.

---

#### :rocket: New Feature

- Initial support for extended CSS selectors (a.k.a. procedural filters) [#1574](https://github.com/cliqz-oss/adblocker/pull/1574) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.19.0 (Wed Dec 16 2020)

#### :bug: Bug Fix

- build(deps-dev): bump @rollup/plugin-node-resolve from 10.0.0 to 11.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @rollup/plugin-node-resolve from 10.0.0 to 11.0.0 [#1478](https://github.com/cliqz-oss/adblocker/pull/1478) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.18.7 (Tue Nov 24 2020)

#### :nail_care: Polish

- Fix with newer Typescript + cleanups [#1466](https://github.com/cliqz-oss/adblocker/pull/1466) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.6 (Wed Nov 18 2020)

#### :bug: Bug Fix

- Fix memory leak by using a WeakMap to hold context information in blocker [#1451](https://github.com/cliqz-oss/adblocker/pull/1451) ([@remusao](https://github.com/remusao))
- build(deps): bump webextension-polyfill-ts from 0.21.0 to 0.22.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump webextension-polyfill-ts from 0.21.0 to 0.22.0 [#1438](https://github.com/cliqz-oss/adblocker/pull/1438) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.4 (Sun Nov 01 2020)

#### :bug: Bug Fix

- build(deps-dev): bump @rollup/plugin-node-resolve from 9.0.0 to 10.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump webextension-polyfill-ts from 0.20.0 to 0.21.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @rollup/plugin-node-resolve from 9.0.0 to 10.0.0 [#1373](https://github.com/cliqz-oss/adblocker/pull/1373) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump webextension-polyfill-ts from 0.20.0 to 0.21.0 [#1366](https://github.com/cliqz-oss/adblocker/pull/1366) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.18.3 (Tue Sep 15 2020)

#### :bug: Bug Fix

- build(deps): bump webextension-polyfill-ts from 0.19.0 to 0.20.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump webextension-polyfill-ts from 0.19.0 to 0.20.0 [#1270](https://github.com/cliqz-oss/adblocker/pull/1270) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.18.0 (Mon Aug 24 2020)

#### :bug: Bug Fix

- build(deps): bump ts-node from 8.10.2 to 9.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.4.0 to 9.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump ts-node from 8.10.2 to 9.0.0 [#1208](https://github.com/cliqz-oss/adblocker/pull/1208) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 [#1202](https://github.com/cliqz-oss/adblocker/pull/1202) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.4.0 to 9.0.0 [#1181](https://github.com/cliqz-oss/adblocker/pull/1181) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.17.0 (Sun Jul 12 2020)

#### :bug: Bug Fix

- build(deps-dev): bump @types/mocha from 7.0.2 to 8.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @types/mocha from 7.0.2 to 8.0.0 [#1079](https://github.com/cliqz-oss/adblocker/pull/1079) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.16.1 (Wed Jul 08 2020)

#### :bug: Bug Fix

- build(deps): bump webextension-polyfill-ts from 0.18.0 to 0.19.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump webextension-polyfill-ts from 0.17.0 to 0.18.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 7.2.0 to 8.0.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump webextension-polyfill-ts from 0.18.0 to 0.19.0 [#1037](https://github.com/cliqz-oss/adblocker/pull/1037) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump webextension-polyfill-ts from 0.17.0 to 0.18.0 [#1029](https://github.com/cliqz-oss/adblocker/pull/1029) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 7.2.0 to 8.0.1 [#986](https://github.com/cliqz-oss/adblocker/pull/986) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.16.0 (Wed Jun 10 2020)

#### :bug: Bug Fix

- build(deps): bump webextension-polyfill-ts from 0.16.0 to 0.17.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @rollup/plugin-commonjs from 12.0.0 to 13.0.0 [#977](https://github.com/cliqz-oss/adblocker/pull/977) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.0.0 to 8.0.1 [#976](https://github.com/cliqz-oss/adblocker/pull/976) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.13.1 to 2.14.0 [#975](https://github.com/cliqz-oss/adblocker/pull/975) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump webextension-polyfill-ts from 0.16.0 to 0.17.0 [#973](https://github.com/cliqz-oss/adblocker/pull/973) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.25.2 to 0.26.0 [#956](https://github.com/cliqz-oss/adblocker/pull/956) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.15.1 (Mon May 25 2020)

#### :bug: Bug Fix

- build(deps): bump webextension-polyfill-ts from 0.15.0 to 0.16.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump webextension-polyfill-ts from 0.15.0 to 0.16.0 [#925](https://github.com/cliqz-oss/adblocker/pull/925) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.15.0 (Sat May 23 2020)

#### :bug: Bug Fix

- build(deps-dev): bump @rollup/plugin-node-resolve from 7.1.3 to 8.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @rollup/plugin-node-resolve from 7.1.3 to 8.0.0 [#907](https://github.com/cliqz-oss/adblocker/pull/907) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.14.3 (Mon May 04 2020)

#### :bug: Bug Fix

- build(deps): bump webextension-polyfill-ts from 0.14.0 to 0.15.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup-plugin-sourcemaps from 0.5.0 to 0.6.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump webextension-polyfill-ts from 0.14.0 to 0.15.0 [#833](https://github.com/cliqz-oss/adblocker/pull/833) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup-plugin-sourcemaps from 0.5.0 to 0.6.1 [#830](https://github.com/cliqz-oss/adblocker/pull/830) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.14.2 (Tue Apr 21 2020)

#### :bug: Bug Fix

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.24.0 to 0.25.0 [#766](https://github.com/cliqz-oss/adblocker/pull/766) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.14.1 (Thu Apr 09 2020)

### Release Notes

_From #746_

* Make sure that all unsupported procedural selectors from cosmetic filters are dropped to ensure that we only inject valid CSS selectors.
* Fix matching of `domain=` option for domain filters in cases where specified domain is a subdomain instead of full hostname or full domain.
* Fix partyness detection for requests without a valid domain (but having a valid hostname). This fixes matching against localhost request (for instance).
* Fix engine updates stress test which allows to replay all day-to-day diffs since the beginning of times... (currently about a year) and make sure that all updates work and resulting engine is byte-identical with diff-update or full initialization.
* Fix script to analyze size of serialized engines for all presets as well as all kinds of compression (i.e. none, gzip and brotli). This allows to keep track of final size after small-strings compression was applied.

---

#### :nail_care: Polish

- Fix domain options with subdomains and more... [#746](https://github.com/cliqz-oss/adblocker/pull/746) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.0 (Wed Apr 08 2020)

### Release Notes

_From #738_

* Add `guessRequestTypeFromUrl` config option to all blocker classes which allows to automatically guess the type of network requests based on their URLs. This can be useful for cases where the type is either not available or not accurately inferred (e.g. when requests have time 'other').
* Fix a case where `PuppeteerBlocker` could show an async unhandled exception in console when trying to remove blocked iframes in pages.
* Fix redirection to binary resources (i.e. base64 encoded). An issue caused these resources to be corrupted which means that redirected resources were not valid (e.g. invalid PNG image).
* Redirection to local resources has been improved and will now always succeed thanks to a system of fallback. More types are also available for redirection.
* Improve API of blocker classes (i.e. PuppeteerBlocker, ElectronBlocker and WebExtensionBlocker) to allow creating custom blocking logic of resources using: `blockScripts`, `blockImages`, `blockMedias`, `blockFrames`, `blockFonts`, and `blockStyles`. These helpers can be called on any existing blocker instance, or on a new one created with the `empty()` static method.
* Add initial DSL (Domain Specific Language) to create blocking rules with a high-level API. This is used behind the scene to implement the new blocking methods now exposed by blocker instances. This new DSL should be considered alpha-quality and the API will likely change (and break) in the future. It might also be extended to handle hiding rules (a.k.a cosmetic filters).
* Fix behavior of `NetworkFilter#toString` which should now return a better pretty-printed version of the original filters whenever the `debug` option was false (in which case some information about the original raw string is lost and the string version needs to be inferred back).
* Implement handling of data: URLs. This means that the Request abstraction will now treat them as valid requests and that their type should always be inferred correctly. Moreover, the matching of data: URLs will now only take into account the prefix and ignore anything following the ',' separator.
* Requests with empty domain will not be treated as third-party anymore (this should not happen in the wild and was mostly impacting our unit tests).

---

#### :rocket: New Feature

- Various improvements [#738](https://github.com/cliqz-oss/adblocker/pull/738) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.1 (Fri Apr 03 2020)

#### :house: Internal

- Move from jest to mocha + chai [#682](https://github.com/cliqz-oss/adblocker/pull/682) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.3 (Sat Mar 28 2020)

#### :house: Internal

- Update README.md [#670](https://github.com/cliqz-oss/adblocker/pull/670) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.11.0 (Thu Mar 26 2020)

#### :nut_and_bolt: Dependencies

-  [#661](https://github.com/cliqz-oss/adblocker/pull/661) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.10.0 (Wed Mar 25 2020)

#### :nut_and_bolt: Dependencies

-  [#596](https://github.com/cliqz-oss/adblocker/pull/596) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#587](https://github.com/cliqz-oss/adblocker/pull/587) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#586](https://github.com/cliqz-oss/adblocker/pull/586) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#560](https://github.com/cliqz-oss/adblocker/pull/560) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.9.0 (Thu Feb 20 2020)

#### :bug: Bug Fix

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler

Bumps [@ampproject/rollup-plugin-closure-compiler](https://github.com/ampproject/rollup-plugin-closure-compiler) from 0.21.0 to 0.22.2.
- [Release notes](https://github.com/ampproject/rollup-plugin-closure-compiler/releases)
- [Commits](https://github.com/ampproject/rollup-plugin-closure-compiler/compare/v0.21.0...v0.22.2)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.8.6 (Thu Feb 13 2020)

#### :nail_care: Polish

- Move BlockingContext methods back into Blocker class. [#496](https://github.com/cliqz-oss/adblocker/pull/496) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.4 (Thu Feb 13 2020)

#### :bug: Bug Fix

- Fix implicit tslib dependency [#494](https://github.com/cliqz-oss/adblocker/pull/494) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.1 (Wed Feb 12 2020)

#### :nail_care: Polish

- Expose original request details through Request class [#490](https://github.com/cliqz-oss/adblocker/pull/490) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.0 (Wed Feb 12 2020)

#### :running_woman: Performance

- Target ES6 instead of ES3 [#489](https://github.com/cliqz-oss/adblocker/pull/489) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))