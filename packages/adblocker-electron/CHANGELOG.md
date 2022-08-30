# v1.25.0 (Tue Aug 30 2022)

#### :nut_and_bolt: Dependencies

- Build(deps): Bump electron from 19.0.10 to 20.1.0 [#2781](https://github.com/ghostery/adblocker/pull/2781) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@remusao](https://github.com/remusao))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.23.9 (Fri Aug 19 2022)

#### :nut_and_bolt: Dependencies

- Build(deps): Bump electron from 18.2.4 to 19.0.1 [#2624](https://github.com/ghostery/adblocker/pull/2624) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump mocha from 9.2.2 to 10.0.0 [#2582](https://github.com/ghostery/adblocker/pull/2582) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.23.8 (Mon May 16 2022)

#### :nut_and_bolt: Dependencies

- Build(deps): Bump electron from 17.2.0 to 18.1.0 [#2559](https://github.com/ghostery/adblocker/pull/2559) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.23.6 (Mon Feb 14 2022)

#### :bug: Bug Fix

- Stop removing is-mutation-observer-enabled [#2449](https://github.com/ghostery/adblocker/pull/2449) ([@kylegundersen](https://github.com/kylegundersen))

#### Authors: 1

- Kyle Gundersen ([@kylegundersen](https://github.com/kylegundersen))

---

# v1.23.5 (Mon Feb 07 2022)

#### :nut_and_bolt: Dependencies

- Build(deps): Bump electron from 16.0.8 to 17.0.0 [#2417](https://github.com/ghostery/adblocker/pull/2417) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.23.1 (Sat Dec 04 2021)

#### :nut_and_bolt: Dependencies

- Bump electron from 15.3.1 to 16.0.2 [#2337](https://github.com/ghostery/adblocker/pull/2337) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.22.7 (Wed Sep 22 2021)

#### :house: Internal

- Bump typescript [#2243](https://github.com/cliqz-oss/adblocker/pull/2243) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- Bump electron from 14.0.1 to 15.0.0 [#2236](https://github.com/cliqz-oss/adblocker/pull/2236) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.22.6 (Sun Sep 19 2021)

#### :nail_care: Polish

- Update peer dependency on Electron [#2228](https://github.com/cliqz-oss/adblocker/pull/2228) ([@Jelmerro](https://github.com/Jelmerro))

#### :nut_and_bolt: Dependencies

- Bump electron from 13.2.2 to 14.0.0 [#2200](https://github.com/cliqz-oss/adblocker/pull/2200) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jelmer van Arnhem ([@Jelmerro](https://github.com/Jelmerro))

---

# v1.22.3 (Thu Jul 29 2021)

#### :nut_and_bolt: Dependencies

- Bump @types/mocha from 8.2.3 to 9.0.0 [#2062](https://github.com/cliqz-oss/adblocker/pull/2062) ([@dependabot[bot]](https://github.com/dependabot[bot]))

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

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.3 (Sat Feb 27 2021)

#### :house: Internal

- Update copyright notices [#1715](https://github.com/cliqz-oss/adblocker/pull/1715) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

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

# v1.18.7 (Tue Nov 24 2020)

#### :nail_care: Polish

- Fix with newer Typescript + cleanups [#1466](https://github.com/cliqz-oss/adblocker/pull/1466) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.6 (Wed Nov 18 2020)

#### :bug: Bug Fix

- Fix memory leak by using a WeakMap to hold context information in blocker [#1451](https://github.com/cliqz-oss/adblocker/pull/1451) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.4 (Sun Nov 01 2020)

#### :bug: Bug Fix

- build(deps): bump electron from 10.1.4 to 10.1.5 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.1.3 to 10.1.4 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.1.2 to 10.1.3 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump electron from 10.1.4 to 10.1.5 [#1363](https://github.com/cliqz-oss/adblocker/pull/1363) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.1.3 to 10.1.4 [#1354](https://github.com/cliqz-oss/adblocker/pull/1354) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.1.2 to 10.1.3 [#1307](https://github.com/cliqz-oss/adblocker/pull/1307) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.18.3 (Tue Sep 15 2020)

#### :bug: Bug Fix

- build(deps): bump electron from 10.1.1 to 10.1.2 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.1.0 to 10.1.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump electron from 10.1.1 to 10.1.2 [#1273](https://github.com/cliqz-oss/adblocker/pull/1273) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.1.0 to 10.1.1 [#1240](https://github.com/cliqz-oss/adblocker/pull/1240) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# vnull (Sat Aug 29 2020)

#### :bug: Bug Fix

- build(deps): bump electron from 10.0.1 to 10.1.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0 to 10.0.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump electron from 10.0.1 to 10.1.0 [#1226](https://github.com/cliqz-oss/adblocker/pull/1226) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0 to 10.0.1 [#1225](https://github.com/cliqz-oss/adblocker/pull/1225) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# vnull (Wed Aug 26 2020)

#### :bug: Bug Fix

- build(deps): bump electron from 10.0.0-beta.25 to 10.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump electron from 10.0.0-beta.25 to 10.0.0 [#1217](https://github.com/cliqz-oss/adblocker/pull/1217) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.18.0 (Mon Aug 24 2020)

#### :bug: Bug Fix

- build(deps): bump electron from 10.0.0-beta.23 to 10.0.0-beta.25 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump ts-node from 8.10.2 to 9.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.21 to 10.0.0-beta.23 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.19 to 10.0.0-beta.21 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.17 to 10.0.0-beta.19 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.15 to 10.0.0-beta.17 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.14 to 10.0.0-beta.15 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.12 to 10.0.0-beta.14 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps): bump electron from 10.0.0-beta.23 to 10.0.0-beta.25 [#1212](https://github.com/cliqz-oss/adblocker/pull/1212) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump ts-node from 8.10.2 to 9.0.0 [#1208](https://github.com/cliqz-oss/adblocker/pull/1208) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 [#1202](https://github.com/cliqz-oss/adblocker/pull/1202) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.21 to 10.0.0-beta.23 [#1197](https://github.com/cliqz-oss/adblocker/pull/1197) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.19 to 10.0.0-beta.21 [#1171](https://github.com/cliqz-oss/adblocker/pull/1171) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.17 to 10.0.0-beta.19 [#1158](https://github.com/cliqz-oss/adblocker/pull/1158) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.15 to 10.0.0-beta.17 [#1151](https://github.com/cliqz-oss/adblocker/pull/1151) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.14 to 10.0.0-beta.15 [#1138](https://github.com/cliqz-oss/adblocker/pull/1138) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 10.0.0-beta.12 to 10.0.0-beta.14 [#1130](https://github.com/cliqz-oss/adblocker/pull/1130) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- Update deps [#1107](https://github.com/cliqz-oss/adblocker/pull/1107) ([@remusao](https://github.com/remusao))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Rémi ([@remusao](https://github.com/remusao))

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

- build(deps-dev): bump mocha from 7.2.0 to 8.0.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump mocha from 7.2.0 to 8.0.1 [#986](https://github.com/cliqz-oss/adblocker/pull/986) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

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

# v1.10.1 (Wed Mar 25 2020)

#### :bug: Bug Fix

- Abstract DOM monitoring away and fix #573 [#657](https://github.com/cliqz-oss/adblocker/pull/657) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

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