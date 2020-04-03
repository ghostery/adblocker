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
