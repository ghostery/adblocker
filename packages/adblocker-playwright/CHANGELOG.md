# v1.23.9 (Fri Aug 19 2022)

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump mocha from 9.2.2 to 10.0.0 [#2582](https://github.com/ghostery/adblocker/pull/2582) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

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

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.22.2 (Sun Jun 20 2021)

#### :bug: Bug Fix

- Fix to executing promises in adblocker-playwright [#2006](https://github.com/cliqz-oss/adblocker/pull/2006) ([@tommulkins](https://github.com/tommulkins))

#### :nut_and_bolt: Dependencies

- Bump mocha from 8.4.0 to 9.0.0 [#1989](https://github.com/cliqz-oss/adblocker/pull/1989) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Tom Mulkins ([@tommulkins](https://github.com/tommulkins))

---

# v1.21.0 (Sun May 30 2021)

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

# v1.18.0 (Mon Aug 24 2020)

#### :bug: Bug Fix

- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 [#1202](https://github.com/cliqz-oss/adblocker/pull/1202) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

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

- build(deps-dev): bump mocha from 7.2.0 to 8.0.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump mocha from 7.2.0 to 8.0.1 [#986](https://github.com/cliqz-oss/adblocker/pull/986) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 1

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])

---

# v1.16.0 (Wed Jun 10 2020)

#### :rocket: New Feature

- feature: add support for Playwright blocking [#417](https://github.com/cliqz-oss/adblocker/pull/417) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))
