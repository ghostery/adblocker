# v1.18.0 (Mon Aug 24 2020)

#### :bug: Bug Fix

- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.4.0 to 9.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 [#1202](https://github.com/cliqz-oss/adblocker/pull/1202) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.4.0 to 9.0.0 [#1181](https://github.com/cliqz-oss/adblocker/pull/1181) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- Update deps [#1107](https://github.com/cliqz-oss/adblocker/pull/1107) ([@remusao](https://github.com/remusao))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.17.0 (Sun Jul 12 2020)

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @types/jsdom from 12.2.4 to 16.2.3 [#885](https://github.com/cliqz-oss/adblocker/pull/885) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.16.0 (Wed Jun 10 2020)

#### :bug: Bug Fix

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.25.2 to 0.26.0 [#956](https://github.com/cliqz-oss/adblocker/pull/956) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

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

- build(deps-dev): bump rollup-plugin-sourcemaps from 0.5.0 to 0.6.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

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

#### :memo: Documentation

- Fix line break in CHANGELOG.md [#691](https://github.com/cliqz-oss/adblocker/pull/691) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.0 (Mon Mar 30 2020)

### Release Notes

_From #690_

PuppeteerBlocker is now more powerful and will be able to better block ads on most websites. Firstly, a bug was fixed which prevented injection of cosmetics in the main frame of pages. Secondly, PuppeteerBlocker will now monitor the DOM for changes to make sure that ads which load later are still "handled" (if you know what I mean). Lastly, PuppeteerBlocker is now able to look for advertisement iframes and remove them from the DOM completely, no more blank spaces left unattended...

---

#### :rocket: New Feature

- Fix PuppeteerBlocker and enable blocking of frames and DOM monitoring. [#690](https://github.com/cliqz-oss/adblocker/pull/690) ([@remusao](https://github.com/remusao))

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

# v1.10.0 (Wed Mar 25 2020)

#### :nut_and_bolt: Dependencies

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

# v1.8.4 (Thu Feb 13 2020)

#### :bug: Bug Fix

- Fix implicit tslib dependency [#494](https://github.com/cliqz-oss/adblocker/pull/494) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))
