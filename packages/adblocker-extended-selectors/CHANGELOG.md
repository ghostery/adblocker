# v1.20.5 (Tue May 04 2021)

#### :bug: Bug Fix

- build(deps-dev): bump @types/node from 14.14.41 to 15.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump auto from 10.25.1 to 10.25.2 [#1892](https://github.com/cliqz-oss/adblocker/pull/1892) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.29 to 5.7.30 [#1889](https://github.com/cliqz-oss/adblocker/pull/1889) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.41 to 15.0.0 [#1888](https://github.com/cliqz-oss/adblocker/pull/1888) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

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
