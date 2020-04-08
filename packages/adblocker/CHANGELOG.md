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

#### :house: Internal

- Update local assets [#740](https://github.com/cliqz-oss/adblocker/pull/740) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#734](https://github.com/cliqz-oss/adblocker/pull/734) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#727](https://github.com/cliqz-oss/adblocker/pull/727) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#721](https://github.com/cliqz-oss/adblocker/pull/721) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#719](https://github.com/cliqz-oss/adblocker/pull/719) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.1 (Fri Apr 03 2020)

#### :house: Internal

- Update local assets [#711](https://github.com/cliqz-oss/adblocker/pull/711) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#704](https://github.com/cliqz-oss/adblocker/pull/704) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#699](https://github.com/cliqz-oss/adblocker/pull/699) ([@adblocker-bot](https://github.com/adblocker-bot))
- Move from jest to mocha + chai [#682](https://github.com/cliqz-oss/adblocker/pull/682) ([@remusao](https://github.com/remusao))
- Update local assets [#693](https://github.com/cliqz-oss/adblocker/pull/693) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.0 (Mon Mar 30 2020)

#### :house: Internal

- Update local assets [#685](https://github.com/cliqz-oss/adblocker/pull/685) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#681](https://github.com/cliqz-oss/adblocker/pull/681) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 1

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))

---

# v1.12.3 (Sat Mar 28 2020)

#### :nail_care: Polish

- Do not try to get resources from CDN [#680](https://github.com/cliqz-oss/adblocker/pull/680) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Make sure updater always gets latest version of resources [#679](https://github.com/cliqz-oss/adblocker/pull/679) ([@remusao](https://github.com/remusao))
- Update local assets [#676](https://github.com/cliqz-oss/adblocker/pull/676) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update README.md [#670](https://github.com/cliqz-oss/adblocker/pull/670) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- build(deps): bump @types/chrome from 0.0.102 to 0.0.103 [#671](https://github.com/cliqz-oss/adblocker/pull/671) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.2 (Fri Mar 27 2020)

#### :house: Internal

- Update local assets and compression codebooks [#667](https://github.com/cliqz-oss/adblocker/pull/667) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 1

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))

---

# v1.12.1 (Thu Mar 26 2020)

#### :nail_care: Polish

- Make id of fuzzy filter invariant under permutations [#666](https://github.com/cliqz-oss/adblocker/pull/666) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.0 (Thu Mar 26 2020)

#### :running_woman: Performance

- Fine-tune tokenization by preventing buffer overflows in main loop. [#665](https://github.com/cliqz-oss/adblocker/pull/665) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.11.0 (Thu Mar 26 2020)

#### :rocket: New Feature

- Add support for multi-lines filters (i.e. line continuation) [#663](https://github.com/cliqz-oss/adblocker/pull/663) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Fix compression codebooks generation [#660](https://github.com/cliqz-oss/adblocker/pull/660) ([@remusao](https://github.com/remusao))
- Update local assets and compression codebooks [#659](https://github.com/cliqz-oss/adblocker/pull/659) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.10.0 (Wed Mar 25 2020)

#### :running_woman: Performance

- Various optimizations. [#655](https://github.com/cliqz-oss/adblocker/pull/655) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets and compression codebooks [#652](https://github.com/cliqz-oss/adblocker/pull/652) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#648](https://github.com/cliqz-oss/adblocker/pull/648) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#645](https://github.com/cliqz-oss/adblocker/pull/645) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#637](https://github.com/cliqz-oss/adblocker/pull/637) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#636](https://github.com/cliqz-oss/adblocker/pull/636) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#633](https://github.com/cliqz-oss/adblocker/pull/633) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#628](https://github.com/cliqz-oss/adblocker/pull/628) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#626](https://github.com/cliqz-oss/adblocker/pull/626) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#625](https://github.com/cliqz-oss/adblocker/pull/625) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#623](https://github.com/cliqz-oss/adblocker/pull/623) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#622](https://github.com/cliqz-oss/adblocker/pull/622) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#620](https://github.com/cliqz-oss/adblocker/pull/620) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#616](https://github.com/cliqz-oss/adblocker/pull/616) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#613](https://github.com/cliqz-oss/adblocker/pull/613) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#608](https://github.com/cliqz-oss/adblocker/pull/608) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#604](https://github.com/cliqz-oss/adblocker/pull/604) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#601](https://github.com/cliqz-oss/adblocker/pull/601) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#597](https://github.com/cliqz-oss/adblocker/pull/597) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#590](https://github.com/cliqz-oss/adblocker/pull/590) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#572](https://github.com/cliqz-oss/adblocker/pull/572) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#568](https://github.com/cliqz-oss/adblocker/pull/568) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#562](https://github.com/cliqz-oss/adblocker/pull/562) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#557](https://github.com/cliqz-oss/adblocker/pull/557) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#556](https://github.com/cliqz-oss/adblocker/pull/556) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#554](https://github.com/cliqz-oss/adblocker/pull/554) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#549](https://github.com/cliqz-oss/adblocker/pull/549) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#548](https://github.com/cliqz-oss/adblocker/pull/548) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

-  [#653](https://github.com/cliqz-oss/adblocker/pull/653) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#629](https://github.com/cliqz-oss/adblocker/pull/629) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#617](https://github.com/cliqz-oss/adblocker/pull/617) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#587](https://github.com/cliqz-oss/adblocker/pull/587) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#586](https://github.com/cliqz-oss/adblocker/pull/586) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#560](https://github.com/cliqz-oss/adblocker/pull/560) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#577](https://github.com/cliqz-oss/adblocker/pull/577) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#552](https://github.com/cliqz-oss/adblocker/pull/552) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.2 (Wed Feb 26 2020)

#### :bug: Bug Fix

- build(deps): bump @types/chrome from 0.0.96 to 0.0.97

Bumps [@types/chrome](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/chrome) from 0.0.96 to 0.0.97.
- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)
- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/chrome)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets and compression codebooks [#544](https://github.com/cliqz-oss/adblocker/pull/544) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#537](https://github.com/cliqz-oss/adblocker/pull/537) ([@adblocker-bot](https://github.com/adblocker-bot))
- Automatically bump internal engine version on codebooks update [#536](https://github.com/cliqz-oss/adblocker/pull/536) ([@remusao](https://github.com/remusao))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.1 (Sun Feb 23 2020)

#### :bug: Bug Fix

- Bump internal engine representation [#534](https://github.com/cliqz-oss/adblocker/pull/534) ([@remusao](https://github.com/remusao))
- Bump internal engine representation  ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets and compression codebooks [#532](https://github.com/cliqz-oss/adblocker/pull/532) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#529](https://github.com/cliqz-oss/adblocker/pull/529) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#525](https://github.com/cliqz-oss/adblocker/pull/525) ([@adblocker-bot](https://github.com/adblocker-bot))
- Improve tool to list unsupported filter syntax [#524](https://github.com/cliqz-oss/adblocker/pull/524) ([@remusao](https://github.com/remusao))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.0 (Thu Feb 20 2020)

#### :running_woman: Performance

- Replace use of setTimeout to delay event by more efficient queueMicrotask. [#523](https://github.com/cliqz-oss/adblocker/pull/523) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- build(deps): bump @types/chrome from 0.0.95 to 0.0.96

Bumps [@types/chrome](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/chrome) from 0.0.95 to 0.0.96.
- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)
- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/chrome)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler

Bumps [@ampproject/rollup-plugin-closure-compiler](https://github.com/ampproject/rollup-plugin-closure-compiler) from 0.21.0 to 0.22.2.
- [Release notes](https://github.com/ampproject/rollup-plugin-closure-compiler/releases)
- [Commits](https://github.com/ampproject/rollup-plugin-closure-compiler/compare/v0.21.0...v0.22.2)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets and compression codebooks [#520](https://github.com/cliqz-oss/adblocker/pull/520) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#515](https://github.com/cliqz-oss/adblocker/pull/515) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#510](https://github.com/cliqz-oss/adblocker/pull/510) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#508](https://github.com/cliqz-oss/adblocker/pull/508) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#503](https://github.com/cliqz-oss/adblocker/pull/503) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#502](https://github.com/cliqz-oss/adblocker/pull/502) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#497](https://github.com/cliqz-oss/adblocker/pull/497) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.5 (Thu Feb 13 2020)

#### :nail_care: Polish

- Fetch resources from GitHub repository [#495](https://github.com/cliqz-oss/adblocker/pull/495) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.4 (Thu Feb 13 2020)

#### :bug: Bug Fix

- Fix implicit tslib dependency [#494](https://github.com/cliqz-oss/adblocker/pull/494) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.3 (Thu Feb 13 2020)

#### :bug: Bug Fix

- Bump internal engine representation  ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.2 (Wed Feb 12 2020)

#### :bug: Bug Fix

- chore: update local assets [#491](https://github.com/cliqz-oss/adblocker/pull/491) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 1

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))

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

#### :bug: Bug Fix

- chore: update local assets [#485](https://github.com/cliqz-oss/adblocker/pull/485) ([@adblocker-bot](https://github.com/adblocker-bot))
- build(deps): bump @types/chrome from 0.0.94 to 0.0.95

Bumps [@types/chrome](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/chrome) from 0.0.94 to 0.0.95.
- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)
- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/chrome)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))