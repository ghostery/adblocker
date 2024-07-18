# v1.30.0 (Wed Jul 17 2024)

#### :rocket: New Feature

- `@cliqz/adblocker`
  - Feedback from not supported filters [#4108](https://github.com/ghostery/adblocker/pull/4108) ([@chrmod](https://github.com/chrmod))

#### Authors: 1

- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.29.0 (Wed Jul 17 2024)

#### :rocket: New Feature

- `@cliqz/adblocker-electron`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Improve engine events to expose internal workflow [#3881](https://github.com/ghostery/adblocker/pull/3881) ([@seia-soto](https://github.com/seia-soto) [@chrmod](https://github.com/chrmod))

#### :house: Internal

- Run examples in both commonjs and esm [#4103](https://github.com/ghostery/adblocker/pull/4103) ([@chrmod](https://github.com/chrmod))
- Enforce PR labels [#4101](https://github.com/ghostery/adblocker/pull/4101) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker`
  - Update local assets [#4105](https://github.com/ghostery/adblocker/pull/4105) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Drop unused tsconfig.json by #4098 [#4104](https://github.com/ghostery/adblocker/pull/4104) ([@seia-soto](https://github.com/seia-soto))
  - Update local assets [#4099](https://github.com/ghostery/adblocker/pull/4099) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#4097](https://github.com/ghostery/adblocker/pull/4097) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Fix codebook generation [#4096](https://github.com/ghostery/adblocker/pull/4096) ([@chrmod](https://github.com/chrmod))
  - Fix asset update [#4094](https://github.com/ghostery/adblocker/pull/4094) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Replace Cliqz references with Ghostery [#4095](https://github.com/ghostery/adblocker/pull/4095) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker`
  - Update ESLint configuration for test files [#4102](https://github.com/ghostery/adblocker/pull/4102) ([@seia-soto](https://github.com/seia-soto))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - tsx to run typescript [#4098](https://github.com/ghostery/adblocker/pull/4098) ([@chrmod](https://github.com/chrmod))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @types/node from 20.14.10 to 20.14.11 [#4107](https://github.com/ghostery/adblocker/pull/4107) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.45.1 to 1.45.2 [#4106](https://github.com/ghostery/adblocker/pull/4106) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 31.2.0 to 31.2.1 [#4100](https://github.com/ghostery/adblocker/pull/4100) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump rimraf from 5.0.8 to 6.0.1 [#4078](https://github.com/ghostery/adblocker/pull/4078) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- HoJeong Go ([@seia-soto](https://github.com/seia-soto))
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.28.2 (Mon Jul 15 2024)

#### :bug: Bug Fix

- Drop unintended output files (#4087) [#4092](https://github.com/ghostery/adblocker/pull/4092) ([@seia-soto](https://github.com/seia-soto))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump electron from 31.1.0 to 31.2.0 [#4076](https://github.com/ghostery/adblocker/pull/4076) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @remusao/smaz from 1.9.1 to 1.10.0 [#4085](https://github.com/ghostery/adblocker/pull/4085) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 9.6.0 to 9.7.0 [#4088](https://github.com/ghostery/adblocker/pull/4088) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @remusao/smaz-generate from 1.9.1 to 1.10.0 [#4080](https://github.com/ghostery/adblocker/pull/4080) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @remusao/small from 1.2.1 to 1.3.0 [#4082](https://github.com/ghostery/adblocker/pull/4082) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.12.1 to 22.13.0 [#4081](https://github.com/ghostery/adblocker/pull/4081) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- HoJeong Go ([@seia-soto](https://github.com/seia-soto))

---

# v1.28.1 (Mon Jul 15 2024)

#### :bug: Bug Fix

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Simplify build with tshy [#4079](https://github.com/ghostery/adblocker/pull/4079) ([@chrmod](https://github.com/chrmod) [@seia-soto](https://github.com/seia-soto))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @remusao/auto-config from 1.1.2 to 1.2.0 [#4083](https://github.com/ghostery/adblocker/pull/4083) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @eslint/js from 9.6.0 to 9.7.0 [#4089](https://github.com/ghostery/adblocker/pull/4089) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.3.2 to 3.3.3 [#4090](https://github.com/ghostery/adblocker/pull/4090) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.41 to 8.0.0-alpha.44 [#4091](https://github.com/ghostery/adblocker/pull/4091) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- HoJeong Go ([@seia-soto](https://github.com/seia-soto))
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.28.0 (Tue Jul 09 2024)

#### :rocket: New Feature

- `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`
  - Optimise DOM mutation handling in `DOMMonitor` [#4071](https://github.com/ghostery/adblocker/pull/4071) ([@seia-soto](https://github.com/seia-soto) [@chrmod](https://github.com/chrmod) [@philipp-classen](https://github.com/philipp-classen))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.39 to 8.0.0-alpha.41 [#4073](https://github.com/ghostery/adblocker/pull/4073) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.18.0 to 4.18.1 [#4074](https://github.com/ghostery/adblocker/pull/4074) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 5.0.7 to 5.0.8 [#4066](https://github.com/ghostery/adblocker/pull/4066) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 8.1.5 to 8.1.6 [#4067](https://github.com/ghostery/adblocker/pull/4067) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.30 to 6.1.31 [#4068](https://github.com/ghostery/adblocker/pull/4068) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.14.9 to 20.14.10 [#4069](https://github.com/ghostery/adblocker/pull/4069) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump mocha from 10.5.2 to 10.6.0 [#4063](https://github.com/ghostery/adblocker/pull/4063) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.45.0 to 1.45.1 [#4062](https://github.com/ghostery/adblocker/pull/4062) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.34 to 8.0.0-alpha.39 [#4059](https://github.com/ghostery/adblocker/pull/4059) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 9.5.0 to 9.6.0 [#4056](https://github.com/ghostery/adblocker/pull/4056) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @eslint/js from 9.5.0 to 9.6.0 [#4057](https://github.com/ghostery/adblocker/pull/4057) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @types/firefox-webext-browser from 120.0.3 to 120.0.4 [#4028](https://github.com/ghostery/adblocker/pull/4028) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.29 to 6.1.30 [#4051](https://github.com/ghostery/adblocker/pull/4051) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump mocha from 10.4.0 to 10.5.2 [#4052](https://github.com/ghostery/adblocker/pull/4052) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.27 to 6.1.29 [#4040](https://github.com/ghostery/adblocker/pull/4040) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 8.1.3 to 8.1.5 [#4042](https://github.com/ghostery/adblocker/pull/4042) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ws from 8.17.0 to 8.17.1 [#4049](https://github.com/ghostery/adblocker/pull/4049) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/mocha from 10.0.6 to 10.0.7 [#4041](https://github.com/ghostery/adblocker/pull/4041) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.44.1 to 1.45.0 [#4043](https://github.com/ghostery/adblocker/pull/4043) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.14.2 to 20.14.9 [#4045](https://github.com/ghostery/adblocker/pull/4045) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 31.0.1 to 31.1.0 [#4046](https://github.com/ghostery/adblocker/pull/4046) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.30 to 8.0.0-alpha.34 [#4048](https://github.com/ghostery/adblocker/pull/4048) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @eslint/js from 9.4.0 to 9.5.0 [#4025](https://github.com/ghostery/adblocker/pull/4025) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 9.4.0 to 9.5.0 [#4026](https://github.com/ghostery/adblocker/pull/4026) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.25 to 6.1.27 [#4027](https://github.com/ghostery/adblocker/pull/4027) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.3.1 to 3.3.2 [#4021](https://github.com/ghostery/adblocker/pull/4021) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 31.0.0 to 31.0.1 [#4023](https://github.com/ghostery/adblocker/pull/4023) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.29 to 8.0.0-alpha.30 [#4020](https://github.com/ghostery/adblocker/pull/4020) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Update typescript [#4053](https://github.com/ghostery/adblocker/pull/4053) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.11.0 to 22.12.1 [#4047](https://github.com/ghostery/adblocker/pull/4047) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 22.10.0 to 22.11.0 [#4024](https://github.com/ghostery/adblocker/pull/4024) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 30.1.0 to 31.0.0 [#4019](https://github.com/ghostery/adblocker/pull/4019) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- HoJeong Go ([@seia-soto](https://github.com/seia-soto))
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))
- Philipp Claßen ([@philipp-classen](https://github.com/philipp-classen))

---

# v1.27.11 (Mon Jun 10 2024)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - fix: filters being duplicated by preprocessors [#4016](https://github.com/ghostery/adblocker/pull/4016) ([@seia-soto](https://github.com/seia-soto))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.28 to 8.0.0-alpha.29 [#4014](https://github.com/ghostery/adblocker/pull/4014) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump nyc from 15.1.0 to 17.0.0 [#4015](https://github.com/ghostery/adblocker/pull/4015) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`
  - Build(deps-dev): Bump @rollup/plugin-commonjs from 25.0.8 to 26.0.1 [#4009](https://github.com/ghostery/adblocker/pull/4009) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- HoJeong Go ([@seia-soto](https://github.com/seia-soto))

---

# v1.27.4 (Thu Jun 06 2024)

#### :nail_care: Polish

- CI: change bot identity [#4011](https://github.com/ghostery/adblocker/pull/4011) ([@chrmod](https://github.com/chrmod))
- CI: use app to bypass branch protection [#4008](https://github.com/ghostery/adblocker/pull/4008) ([@chrmod](https://github.com/chrmod))
- CI: let auto publish with branch protection enabled [#3987](https://github.com/ghostery/adblocker/pull/3987) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker`
  - Fix benchmark setup [#3991](https://github.com/ghostery/adblocker/pull/3991) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Rename cliqz-oss to ghostery [#3986](https://github.com/ghostery/adblocker/pull/3986) ([@chrmod](https://github.com/chrmod))

#### ⚠️ Pushed to `master`

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build system: update rollup plugins ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- Yarn update [#3981](https://github.com/ghostery/adblocker/pull/3981) ([@chrmod](https://github.com/chrmod))
- Fix lockfile [#3976](https://github.com/ghostery/adblocker/pull/3976) ([@chrmod](https://github.com/chrmod))
- CI: Node 22 in test matrix [#3946](https://github.com/ghostery/adblocker/pull/3946) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`
  - Build system: fix yarn warnings for @types/node [#3984](https://github.com/ghostery/adblocker/pull/3984) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - CI: fix releases [#3985](https://github.com/ghostery/adblocker/pull/3985) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - ESLint update [#3977](https://github.com/ghostery/adblocker/pull/3977) ([@chrmod](https://github.com/chrmod))
  - ESM modules [#3924](https://github.com/ghostery/adblocker/pull/3924) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker`
  - Update local assets [#3940](https://github.com/ghostery/adblocker/pull/3940) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.24 to 8.0.0-alpha.28 [#4010](https://github.com/ghostery/adblocker/pull/4010) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.2.5 to 3.3.1 [#4004](https://github.com/ghostery/adblocker/pull/4004) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/jsdom from 21.1.6 to 21.1.7 [#3993](https://github.com/ghostery/adblocker/pull/3993) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.21 to 8.0.0-alpha.24 [#3992](https://github.com/ghostery/adblocker/pull/3992) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.12.12 to 20.12.13 [#3989](https://github.com/ghostery/adblocker/pull/3989) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 30.0.8 to 30.0.9 [#3988](https://github.com/ghostery/adblocker/pull/3988) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.20 to 8.0.0-alpha.21 [#3990](https://github.com/ghostery/adblocker/pull/3990) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.22 to 6.1.23 [#3983](https://github.com/ghostery/adblocker/pull/3983) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.16 to 8.0.0-alpha.20 [#3982](https://github.com/ghostery/adblocker/pull/3982) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump jsdom from 24.0.0 to 24.1.0 [#3979](https://github.com/ghostery/adblocker/pull/3979) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.21 to 6.1.22 [#3978](https://github.com/ghostery/adblocker/pull/3978) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.17.2 to 4.18.0 [#3970](https://github.com/ghostery/adblocker/pull/3970) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.12.8 to 20.12.12 [#3961](https://github.com/ghostery/adblocker/pull/3961) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 8.1.2 to 8.1.3 [#3960](https://github.com/ghostery/adblocker/pull/3960) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.8.0 to 7.10.0 [#3968](https://github.com/ghostery/adblocker/pull/3968) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.8.0 to 7.10.0 [#3967](https://github.com/ghostery/adblocker/pull/3967) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.18 to 6.1.21 [#3969](https://github.com/ghostery/adblocker/pull/3969) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 5.0.5 to 5.0.7 [#3953](https://github.com/ghostery/adblocker/pull/3953) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 25.0.7 to 25.0.8 [#3971](https://github.com/ghostery/adblocker/pull/3971) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 30.0.2 to 30.0.8 [#3973](https://github.com/ghostery/adblocker/pull/3973) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.43.1 to 1.44.1 [#3974](https://github.com/ghostery/adblocker/pull/3974) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.7.1 to 22.10.0 [#3975](https://github.com/ghostery/adblocker/pull/3975) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump sinon from 17.0.1 to 18.0.0 [#3964](https://github.com/ghostery/adblocker/pull/3964) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.267 to 0.0.268 [#3952](https://github.com/ghostery/adblocker/pull/3952) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.27.4 (Wed Jun 05 2024)

#### :nail_care: Polish

- CI: let auto publish with branch protection enabled [#3987](https://github.com/ghostery/adblocker/pull/3987) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Rename cliqz-oss to ghostery [#3986](https://github.com/ghostery/adblocker/pull/3986) ([@chrmod](https://github.com/chrmod))

#### ⚠️ Pushed to `master`

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build system: update rollup plugins ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- Yarn update [#3981](https://github.com/ghostery/adblocker/pull/3981) ([@chrmod](https://github.com/chrmod))
- Fix lockfile [#3976](https://github.com/ghostery/adblocker/pull/3976) ([@chrmod](https://github.com/chrmod))
- CI: Node 22 in test matrix [#3946](https://github.com/ghostery/adblocker/pull/3946) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`
  - Build system: fix yarn warnings for @types/node [#3984](https://github.com/ghostery/adblocker/pull/3984) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - CI: fix releases [#3985](https://github.com/ghostery/adblocker/pull/3985) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - ESLint update [#3977](https://github.com/ghostery/adblocker/pull/3977) ([@chrmod](https://github.com/chrmod))
  - ESM modules [#3924](https://github.com/ghostery/adblocker/pull/3924) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker`
  - Update local assets [#3940](https://github.com/ghostery/adblocker/pull/3940) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.21 to 8.0.0-alpha.24 [#3992](https://github.com/ghostery/adblocker/pull/3992) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.12.12 to 20.12.13 [#3989](https://github.com/ghostery/adblocker/pull/3989) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 30.0.8 to 30.0.9 [#3988](https://github.com/ghostery/adblocker/pull/3988) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.20 to 8.0.0-alpha.21 [#3990](https://github.com/ghostery/adblocker/pull/3990) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.22 to 6.1.23 [#3983](https://github.com/ghostery/adblocker/pull/3983) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript-eslint from 8.0.0-alpha.16 to 8.0.0-alpha.20 [#3982](https://github.com/ghostery/adblocker/pull/3982) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump jsdom from 24.0.0 to 24.1.0 [#3979](https://github.com/ghostery/adblocker/pull/3979) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.21 to 6.1.22 [#3978](https://github.com/ghostery/adblocker/pull/3978) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.17.2 to 4.18.0 [#3970](https://github.com/ghostery/adblocker/pull/3970) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.12.8 to 20.12.12 [#3961](https://github.com/ghostery/adblocker/pull/3961) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 8.1.2 to 8.1.3 [#3960](https://github.com/ghostery/adblocker/pull/3960) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.8.0 to 7.10.0 [#3968](https://github.com/ghostery/adblocker/pull/3968) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.8.0 to 7.10.0 [#3967](https://github.com/ghostery/adblocker/pull/3967) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.18 to 6.1.21 [#3969](https://github.com/ghostery/adblocker/pull/3969) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 5.0.5 to 5.0.7 [#3953](https://github.com/ghostery/adblocker/pull/3953) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 25.0.7 to 25.0.8 [#3971](https://github.com/ghostery/adblocker/pull/3971) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 30.0.2 to 30.0.8 [#3973](https://github.com/ghostery/adblocker/pull/3973) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.43.1 to 1.44.1 [#3974](https://github.com/ghostery/adblocker/pull/3974) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.7.1 to 22.10.0 [#3975](https://github.com/ghostery/adblocker/pull/3975) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump sinon from 17.0.1 to 18.0.0 [#3964](https://github.com/ghostery/adblocker/pull/3964) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.267 to 0.0.268 [#3952](https://github.com/ghostery/adblocker/pull/3952) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.27.3 (Tue May 07 2024)

#### :nail_care: Polish

- Drop node 16 from test matrix [#3942](https://github.com/ghostery/adblocker/pull/3942) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`
  - Scriptlets: on Firefox bypass CSP by injecting blobs [#3942](https://github.com/ghostery/adblocker/pull/3942) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3930](https://github.com/ghostery/adblocker/pull/3930) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3928](https://github.com/ghostery/adblocker/pull/3928) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3925](https://github.com/ghostery/adblocker/pull/3925) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.7.1 to 7.8.0 [#3934](https://github.com/ghostery/adblocker/pull/3934) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.7.1 to 7.8.0 [#3935](https://github.com/ghostery/adblocker/pull/3935) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.16.4 to 4.17.2 [#3936](https://github.com/ghostery/adblocker/pull/3936) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.12.7 to 20.12.8 [#3937](https://github.com/ghostery/adblocker/pull/3937) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 30.0.1 to 30.0.2 [#3938](https://github.com/ghostery/adblocker/pull/3938) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ejs from 3.1.9 to 3.1.10 [#3939](https://github.com/ghostery/adblocker/pull/3939) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.16.2 to 4.16.4 [#3926](https://github.com/ghostery/adblocker/pull/3926) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.7.0 to 7.7.1 [#3922](https://github.com/ghostery/adblocker/pull/3922) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.266 to 0.0.267 [#3931](https://github.com/ghostery/adblocker/pull/3931) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.7.0 to 22.7.1 [#3929](https://github.com/ghostery/adblocker/pull/3929) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 22.6.5 to 22.7.0 [#3927](https://github.com/ghostery/adblocker/pull/3927) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.27.2 (Tue Apr 23 2024)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - fix: properly find the filter options index [#3887](https://github.com/ghostery/adblocker/pull/3887) ([@seia-soto](https://github.com/seia-soto))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3920](https://github.com/ghostery/adblocker/pull/3920) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3917](https://github.com/ghostery/adblocker/pull/3917) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3915](https://github.com/ghostery/adblocker/pull/3915) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3914](https://github.com/ghostery/adblocker/pull/3914) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3907](https://github.com/ghostery/adblocker/pull/3907) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Tests: hidden/invisible mode after test [#3905](https://github.com/ghostery/adblocker/pull/3905) ([@chrmod](https://github.com/chrmod))
  - Tests: fix metadata test [#3906](https://github.com/ghostery/adblocker/pull/3906) ([@chrmod](https://github.com/chrmod))
  - Update local assets [#3889](https://github.com/ghostery/adblocker/pull/3889) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Adblocker: split metadata tests [#3763](https://github.com/ghostery/adblocker/pull/3763) ([@chrmod](https://github.com/chrmod))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @typescript-eslint/parser from 7.7.0 to 7.7.1 [#3923](https://github.com/ghostery/adblocker/pull/3923) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.16.1 to 4.16.2 [#3921](https://github.com/ghostery/adblocker/pull/3921) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.16 to 6.1.18 [#3918](https://github.com/ghostery/adblocker/pull/3918) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.14.3 to 4.16.1 [#3919](https://github.com/ghostery/adblocker/pull/3919) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 30.0.0 to 30.0.1 [#3916](https://github.com/ghostery/adblocker/pull/3916) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.6.0 to 7.7.0 [#3909](https://github.com/ghostery/adblocker/pull/3909) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.14.2 to 4.14.3 [#3912](https://github.com/ghostery/adblocker/pull/3912) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.6.0 to 7.7.0 [#3911](https://github.com/ghostery/adblocker/pull/3911) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.5.0 to 7.6.0 [#3895](https://github.com/ghostery/adblocker/pull/3895) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@chrmod](https://github.com/chrmod))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.5.0 to 7.6.0 [#3896](https://github.com/ghostery/adblocker/pull/3896) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.12.4 to 20.12.7 [#3898](https://github.com/ghostery/adblocker/pull/3898) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 29.2.0 to 29.3.0 [#3899](https://github.com/ghostery/adblocker/pull/3899) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 5.4.4 to 5.4.5 [#3900](https://github.com/ghostery/adblocker/pull/3900) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.43.0 to 1.43.1 [#3903](https://github.com/ghostery/adblocker/pull/3903) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.14.0 to 4.14.2 [#3904](https://github.com/ghostery/adblocker/pull/3904) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 29.3.0 to 30.0.0 [#3908](https://github.com/ghostery/adblocker/pull/3908) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.6.4 to 22.6.5 [#3910](https://github.com/ghostery/adblocker/pull/3910) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 22.6.2 to 22.6.4 [#3901](https://github.com/ghostery/adblocker/pull/3901) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.263 to 0.0.266 [#3892](https://github.com/ghostery/adblocker/pull/3892) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- HoJeong Go ([@seia-soto](https://github.com/seia-soto))
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.27.1 (Tue Apr 09 2024)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Scriptlets: unescape commas [#3893](https://github.com/ghostery/adblocker/pull/3893) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3868](https://github.com/ghostery/adblocker/pull/3868) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.3.1 to 7.5.0 [#3872](https://github.com/ghostery/adblocker/pull/3872) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump mocha from 10.3.0 to 10.4.0 [#3863](https://github.com/ghostery/adblocker/pull/3863) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.15 to 6.1.16 [#3870](https://github.com/ghostery/adblocker/pull/3870) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.3.1 to 7.5.0 [#3873](https://github.com/ghostery/adblocker/pull/3873) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 29.1.4 to 29.2.0 [#3877](https://github.com/ghostery/adblocker/pull/3877) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.30 to 20.12.4 [#3878](https://github.com/ghostery/adblocker/pull/3878) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.13.2 to 4.14.0 [#3880](https://github.com/ghostery/adblocker/pull/3880) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.42.1 to 1.43.0 [#3882](https://github.com/ghostery/adblocker/pull/3882) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 11.1.1 to 11.1.6 [#3883](https://github.com/ghostery/adblocker/pull/3883) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 5.4.3 to 5.4.4 [#3884](https://github.com/ghostery/adblocker/pull/3884) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.5.0 to 22.6.2 [#3875](https://github.com/ghostery/adblocker/pull/3875) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.27.0 (Fri Mar 29 2024)

#### :rocket: New Feature

- `@cliqz/adblocker`
  - Filter list preprocessor directives [#3782](https://github.com/ghostery/adblocker/pull/3782) ([@seia-soto](https://github.com/seia-soto) [@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3859](https://github.com/ghostery/adblocker/pull/3859) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3857](https://github.com/ghostery/adblocker/pull/3857) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3848](https://github.com/ghostery/adblocker/pull/3848) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3840](https://github.com/ghostery/adblocker/pull/3840) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3836](https://github.com/ghostery/adblocker/pull/3836) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3832](https://github.com/ghostery/adblocker/pull/3832) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3831](https://github.com/ghostery/adblocker/pull/3831) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3830](https://github.com/ghostery/adblocker/pull/3830) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Fix assets updating [#3827](https://github.com/ghostery/adblocker/pull/3827) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump typescript from 5.4.2 to 5.4.3 [#3854](https://github.com/ghostery/adblocker/pull/3854) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.13 to 6.1.15 [#3864](https://github.com/ghostery/adblocker/pull/3864) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.13.0 to 4.13.2 [#3867](https://github.com/ghostery/adblocker/pull/3867) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.2.0 to 7.3.1 [#3849](https://github.com/ghostery/adblocker/pull/3849) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.2.0 to 7.3.1 [#3850](https://github.com/ghostery/adblocker/pull/3850) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.27 to 20.11.30 [#3852](https://github.com/ghostery/adblocker/pull/3852) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.1.1 to 7.2.0 [#3838](https://github.com/ghostery/adblocker/pull/3838) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.1.1 to 7.2.0 [#3839](https://github.com/ghostery/adblocker/pull/3839) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.12.1 to 4.13.0 [#3841](https://github.com/ghostery/adblocker/pull/3841) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.25 to 20.11.27 [#3843](https://github.com/ghostery/adblocker/pull/3843) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 29.1.1 to 29.1.4 [#3844](https://github.com/ghostery/adblocker/pull/3844) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump follow-redirects from 1.15.5 to 1.15.6 [#3845](https://github.com/ghostery/adblocker/pull/3845) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @types/firefox-webext-browser from 120.0.2 to 120.0.3 [#3834](https://github.com/ghostery/adblocker/pull/3834) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.11 to 6.1.13 [#3828](https://github.com/ghostery/adblocker/pull/3828) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 29.1.0 to 29.1.1 [#3829](https://github.com/ghostery/adblocker/pull/3829) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 7.0.1 to 7.1.1 [#3820](https://github.com/ghostery/adblocker/pull/3820) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.42.0 to 1.42.1 [#3818](https://github.com/ghostery/adblocker/pull/3818) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.1.0 to 7.1.1 [#3821](https://github.com/ghostery/adblocker/pull/3821) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @types/firefox-webext-browser from 120.0.1 to 120.0.2 [#3822](https://github.com/ghostery/adblocker/pull/3822) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.19 to 20.11.25 [#3824](https://github.com/ghostery/adblocker/pull/3824) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 5.3.3 to 5.4.2 [#3825](https://github.com/ghostery/adblocker/pull/3825) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.12.0 to 4.12.1 [#3826](https://github.com/ghostery/adblocker/pull/3826) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.11.0 to 4.12.0 [#3790](https://github.com/ghostery/adblocker/pull/3790) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ip from 1.1.8 to 1.1.9 [#3796](https://github.com/ghostery/adblocker/pull/3796) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 11.0.5 to 11.1.1 [#3806](https://github.com/ghostery/adblocker/pull/3806) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @types/firefox-webext-browser from 120.0.0 to 120.0.1 [#3807](https://github.com/ghostery/adblocker/pull/3807) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 8.56.0 to 8.57.0 [#3808](https://github.com/ghostery/adblocker/pull/3808) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 7.0.1 to 7.1.0 [#3812](https://github.com/ghostery/adblocker/pull/3812) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.41.2 to 1.42.0 [#3814](https://github.com/ghostery/adblocker/pull/3814) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.4.1 to 22.5.0 [#3847](https://github.com/ghostery/adblocker/pull/3847) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 22.4.0 to 22.4.1 [#3835](https://github.com/ghostery/adblocker/pull/3835) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 22.3.0 to 22.4.0 [#3823](https://github.com/ghostery/adblocker/pull/3823) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 22.1.0 to 22.3.0 [#3811](https://github.com/ghostery/adblocker/pull/3811) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.262 to 0.0.263 [#3833](https://github.com/ghostery/adblocker/pull/3833) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.260 to 0.0.262 [#3809](https://github.com/ghostery/adblocker/pull/3809) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 28.2.3 to 29.1.0 [#3815](https://github.com/ghostery/adblocker/pull/3815) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 6

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- HoJeong Go ([@seia-soto](https://github.com/seia-soto))
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.26.16 (Thu Feb 22 2024)

#### :bug: Bug Fix

- Update auto - fix release pipeline [#3801](https://github.com/ghostery/adblocker/pull/3801) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 22.0.0 to 22.1.0 [#3789](https://github.com/ghostery/adblocker/pull/3789) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### :nail_care: Polish

- `@cliqz/adblocker-electron`
  - fix: use absolute paths for preload, closes #2756 [#3798](https://github.com/ghostery/adblocker/pull/3798) ([@yocontra](https://github.com/yocontra))

#### :house: Internal

- `@cliqz/adblocker`
  - Fix breakage with deleted assets [#3792](https://github.com/ghostery/adblocker/pull/3792) ([@remusao](https://github.com/remusao))
  - Fix assets [#3788](https://github.com/ghostery/adblocker/pull/3788) ([@remusao](https://github.com/remusao))
  - Ghostery assets [#3777](https://github.com/ghostery/adblocker/pull/3777) ([@chrmod](https://github.com/chrmod))
  - chore: fix filters links + add missing [#3773](https://github.com/ghostery/adblocker/pull/3773) ([@remusao](https://github.com/remusao))
  - Update local assets [#3771](https://github.com/ghostery/adblocker/pull/3771) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3769](https://github.com/ghostery/adblocker/pull/3769) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3765](https://github.com/ghostery/adblocker/pull/3765) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update assets + fix codebooks generation [#3764](https://github.com/ghostery/adblocker/pull/3764) ([@remusao](https://github.com/remusao))
  - Update local assets [#3727](https://github.com/ghostery/adblocker/pull/3727) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3715](https://github.com/ghostery/adblocker/pull/3715) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3707](https://github.com/ghostery/adblocker/pull/3707) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3702](https://github.com/ghostery/adblocker/pull/3702) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @typescript-eslint/parser from 6.21.0 to 7.0.1 [#3780](https://github.com/ghostery/adblocker/pull/3780) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.17 to 20.11.19 [#3787](https://github.com/ghostery/adblocker/pull/3787) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.10.0 to 4.11.0 [#3786](https://github.com/ghostery/adblocker/pull/3786) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 28.2.2 to 28.2.3 [#3785](https://github.com/ghostery/adblocker/pull/3785) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.10 to 6.1.11 [#3784](https://github.com/ghostery/adblocker/pull/3784) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.21.0 to 7.0.1 [#3779](https://github.com/ghostery/adblocker/pull/3779) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.9.6 to 4.10.0 [#3776](https://github.com/ghostery/adblocker/pull/3776) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.9 to 6.1.10 [#3766](https://github.com/ghostery/adblocker/pull/3766) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.16 to 20.11.17 [#3767](https://github.com/ghostery/adblocker/pull/3767) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump mocha from 10.2.0 to 10.3.0 [#3768](https://github.com/ghostery/adblocker/pull/3768) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.20.0 to 6.21.0 [#3755](https://github.com/ghostery/adblocker/pull/3755) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.2.4 to 3.2.5 [#3754](https://github.com/ghostery/adblocker/pull/3754) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.20.0 to 6.21.0 [#3756](https://github.com/ghostery/adblocker/pull/3756) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 8.0.2 to 8.1.2 [#3758](https://github.com/ghostery/adblocker/pull/3758) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.6 to 6.1.9 [#3759](https://github.com/ghostery/adblocker/pull/3759) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 28.2.1 to 28.2.2 [#3760](https://github.com/ghostery/adblocker/pull/3760) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.3 to 6.1.6 [#3751](https://github.com/ghostery/adblocker/pull/3751) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.19.1 to 6.20.0 [#3743](https://github.com/ghostery/adblocker/pull/3743) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.19.1 to 6.20.0 [#3744](https://github.com/ghostery/adblocker/pull/3744) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 28.2.0 to 28.2.1 [#3746](https://github.com/ghostery/adblocker/pull/3746) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.41.1 to 1.41.2 [#3748](https://github.com/ghostery/adblocker/pull/3748) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.6 to 20.11.16 [#3750](https://github.com/ghostery/adblocker/pull/3750) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.18.1 to 6.19.1 [#3732](https://github.com/ghostery/adblocker/pull/3732) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.9.5 to 4.9.6 [#3729](https://github.com/ghostery/adblocker/pull/3729) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.41.0 to 1.41.1 [#3730](https://github.com/ghostery/adblocker/pull/3730) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.19.0 to 6.19.1 [#3733](https://github.com/ghostery/adblocker/pull/3733) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.5 to 20.11.6 [#3735](https://github.com/ghostery/adblocker/pull/3735) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 28.1.4 to 28.2.0 [#3736](https://github.com/ghostery/adblocker/pull/3736) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.2 to 6.1.3 [#3737](https://github.com/ghostery/adblocker/pull/3737) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.18.1 to 6.19.0 [#3717](https://github.com/ghostery/adblocker/pull/3717) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.40.1 to 1.41.0 [#3721](https://github.com/ghostery/adblocker/pull/3721) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.1 to 20.11.5 [#3723](https://github.com/ghostery/adblocker/pull/3723) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 28.1.3 to 28.1.4 [#3725](https://github.com/ghostery/adblocker/pull/3725) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.2.2 to 3.2.4 [#3726](https://github.com/ghostery/adblocker/pull/3726) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.11.0 to 20.11.1 [#3714](https://github.com/ghostery/adblocker/pull/3714) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.18.0 to 6.18.1 [#3698](https://github.com/ghostery/adblocker/pull/3698) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.1.1 to 3.2.2 [#3712](https://github.com/ghostery/adblocker/pull/3712) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.10.7 to 20.11.0 [#3710](https://github.com/ghostery/adblocker/pull/3710) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 28.1.1 to 28.1.3 [#3709](https://github.com/ghostery/adblocker/pull/3709) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon from 17.0.2 to 17.0.3 [#3708](https://github.com/ghostery/adblocker/pull/3708) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-typescript from 11.1.5 to 11.1.6 [#3706](https://github.com/ghostery/adblocker/pull/3706) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint-plugin-prettier from 5.1.2 to 5.1.3 [#3704](https://github.com/ghostery/adblocker/pull/3704) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.18.0 to 6.18.1 [#3697](https://github.com/ghostery/adblocker/pull/3697) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.9.4 to 4.9.5 [#3713](https://github.com/ghostery/adblocker/pull/3713) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 21.10.0 to 22.0.0 [#3757](https://github.com/ghostery/adblocker/pull/3757) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 21.9.0 to 21.10.0 [#3742](https://github.com/ghostery/adblocker/pull/3742) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 21.7.0 to 21.9.0 [#3734](https://github.com/ghostery/adblocker/pull/3734) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.258 to 0.0.260 [#3749](https://github.com/ghostery/adblocker/pull/3749) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.256 to 0.0.258 [#3724](https://github.com/ghostery/adblocker/pull/3724) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump jsdom from 23.2.0 to 24.0.0 [#3728](https://github.com/ghostery/adblocker/pull/3728) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 6

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- contra ([@yocontra](https://github.com/yocontra))
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.26.15 (Wed Jan 10 2024)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - feat: modifier replacer for NetworkFilter.toString [#3699](https://github.com/ghostery/adblocker/pull/3699) ([@seia-soto](https://github.com/seia-soto))

#### Authors: 1

- HoJeong Go ([@seia-soto](https://github.com/seia-soto))

---

# v1.26.14 (Tue Jan 09 2024)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - feat: support $from [#3700](https://github.com/ghostery/adblocker/pull/3700) ([@seia-soto](https://github.com/seia-soto))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump follow-redirects from 1.15.3 to 1.15.4 [#3701](https://github.com/ghostery/adblocker/pull/3701) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- HoJeong Go ([@seia-soto](https://github.com/seia-soto))

---

# v1.26.13 (Tue Jan 09 2024)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Network filter toString fix [#3681](https://github.com/ghostery/adblocker/pull/3681) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3695](https://github.com/ghostery/adblocker/pull/3695) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3685](https://github.com/ghostery/adblocker/pull/3685) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - chore: fix updating of assets [#3684](https://github.com/ghostery/adblocker/pull/3684) ([@remusao](https://github.com/remusao))
  - Update local assets [#3664](https://github.com/ghostery/adblocker/pull/3664) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3659](https://github.com/ghostery/adblocker/pull/3659) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - chore: update assets [#3648](https://github.com/ghostery/adblocker/pull/3648) ([@remusao](https://github.com/remusao))
  - Fix assets building [#3639](https://github.com/ghostery/adblocker/pull/3639) ([@remusao](https://github.com/remusao))
  - assets: fix building of codebooks and update assets [#3602](https://github.com/ghostery/adblocker/pull/3602) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @types/node from 20.10.6 to 20.10.7 [#3687](https://github.com/ghostery/adblocker/pull/3687) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 8.0.1 to 8.0.2 [#3688](https://github.com/ghostery/adblocker/pull/3688) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.1.1 to 6.1.2 [#3689](https://github.com/ghostery/adblocker/pull/3689) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.17.0 to 6.18.0 [#3690](https://github.com/ghostery/adblocker/pull/3690) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.9.2 to 4.9.4 [#3691](https://github.com/ghostery/adblocker/pull/3691) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump jsdom from 23.0.1 to 23.2.0 [#3692](https://github.com/ghostery/adblocker/pull/3692) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.14.0 to 6.18.0 [#3682](https://github.com/ghostery/adblocker/pull/3682) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint-plugin-prettier from 5.0.1 to 5.1.2 [#3670](https://github.com/ghostery/adblocker/pull/3670) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.9.1 to 4.9.2 [#3674](https://github.com/ghostery/adblocker/pull/3674) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.10.5 to 20.10.6 [#3675](https://github.com/ghostery/adblocker/pull/3675) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.14.0 to 6.17.0 [#3677](https://github.com/ghostery/adblocker/pull/3677) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 28.0.0 to 28.1.1 [#3678](https://github.com/ghostery/adblocker/pull/3678) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 8.0.0 to 8.0.1 [#3660](https://github.com/ghostery/adblocker/pull/3660) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 8.55.0 to 8.56.0 [#3661](https://github.com/ghostery/adblocker/pull/3661) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.9.0 to 4.9.1 [#3662](https://github.com/ghostery/adblocker/pull/3662) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.10.4 to 20.10.5 [#3663](https://github.com/ghostery/adblocker/pull/3663) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.1.0 to 3.1.1 [#3650](https://github.com/ghostery/adblocker/pull/3650) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-json from 6.0.1 to 6.1.0 [#3655](https://github.com/ghostery/adblocker/pull/3655) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.13.1 to 6.14.0 [#3652](https://github.com/ghostery/adblocker/pull/3652) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 5.3.2 to 5.3.3 [#3644](https://github.com/ghostery/adblocker/pull/3644) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.10.3 to 20.10.4 [#3647](https://github.com/ghostery/adblocker/pull/3647) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ts-node from 10.9.1 to 10.9.2 [#3651](https://github.com/ghostery/adblocker/pull/3651) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.13.2 to 6.14.0 [#3653](https://github.com/ghostery/adblocker/pull/3653) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.6.1 to 4.9.0 [#3657](https://github.com/ghostery/adblocker/pull/3657) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.22 to 6.1.1 [#3658](https://github.com/ghostery/adblocker/pull/3658) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.11.0 to 6.13.2 [#3640](https://github.com/ghostery/adblocker/pull/3640) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 7.4.2 to 8.0.0 [#3622](https://github.com/ghostery/adblocker/pull/3622) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai-as-promised from 7.1.7 to 7.1.8 [#3577](https://github.com/ghostery/adblocker/pull/3577) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 5.2.2 to 5.3.2 [#3610](https://github.com/ghostery/adblocker/pull/3610) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.10 to 4.3.11 [#3611](https://github.com/ghostery/adblocker/pull/3611) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/jsdom from 21.1.5 to 21.1.6 [#3612](https://github.com/ghostery/adblocker/pull/3612) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/mocha from 10.0.4 to 10.0.6 [#3613](https://github.com/ghostery/adblocker/pull/3613) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.20 to 6.0.22 [#3627](https://github.com/ghostery/adblocker/pull/3627) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.40.0 to 1.40.1 [#3630](https://github.com/ghostery/adblocker/pull/3630) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.11.0 to 6.13.1 [#3631](https://github.com/ghostery/adblocker/pull/3631) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 27.1.0 to 27.1.3 [#3634](https://github.com/ghostery/adblocker/pull/3634) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.5.0 to 4.6.1 [#3635](https://github.com/ghostery/adblocker/pull/3635) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.9.2 to 20.10.3 [#3636](https://github.com/ghostery/adblocker/pull/3636) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 8.54.0 to 8.55.0 [#3637](https://github.com/ghostery/adblocker/pull/3637) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint-config-prettier from 9.0.0 to 9.1.0 [#3638](https://github.com/ghostery/adblocker/pull/3638) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 8.51.0 to 8.54.0 [#3603](https://github.com/ghostery/adblocker/pull/3603) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon from 10.0.19 to 10.0.20 [#3550](https://github.com/ghostery/adblocker/pull/3550) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 7.4.1 to 7.4.2 [#3565](https://github.com/ghostery/adblocker/pull/3565) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump sinon from 17.0.0 to 17.0.1 [#3568](https://github.com/ghostery/adblocker/pull/3568) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 8.51.0 to 8.53.0 [#3573](https://github.com/ghostery/adblocker/pull/3573) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.9 to 4.3.10 [#3583](https://github.com/ghostery/adblocker/pull/3583) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon-chai from 3.2.11 to 3.2.12 [#3584](https://github.com/ghostery/adblocker/pull/3584) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/jsdom from 21.1.4 to 21.1.5 [#3585](https://github.com/ghostery/adblocker/pull/3585) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/mocha from 10.0.3 to 10.0.4 [#3586](https://github.com/ghostery/adblocker/pull/3586) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump axios from 1.5.0 to 1.6.1 [#3591](https://github.com/ghostery/adblocker/pull/3591) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.0.3 to 3.1.0 [#3593](https://github.com/ghostery/adblocker/pull/3593) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.8.0 to 6.11.0 [#3594](https://github.com/ghostery/adblocker/pull/3594) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.8.0 to 6.11.0 [#3595](https://github.com/ghostery/adblocker/pull/3595) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.1.4 to 4.4.1 [#3596](https://github.com/ghostery/adblocker/pull/3596) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 27.0.1 to 27.1.0 [#3598](https://github.com/ghostery/adblocker/pull/3598) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.8.7 to 20.9.1 [#3599](https://github.com/ghostery/adblocker/pull/3599) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.16 to 6.0.20 [#3600](https://github.com/ghostery/adblocker/pull/3600) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.39.0 to 1.40.0 [#3601](https://github.com/ghostery/adblocker/pull/3601) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.254 to 0.0.256 [#3683](https://github.com/ghostery/adblocker/pull/3683) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.253 to 0.0.254 [#3645](https://github.com/ghostery/adblocker/pull/3645) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.251 to 0.0.253 [#3616](https://github.com/ghostery/adblocker/pull/3616) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.248 to 0.0.251 [#3589](https://github.com/ghostery/adblocker/pull/3589) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 21.6.1 to 21.7.0 [#3680](https://github.com/ghostery/adblocker/pull/3680) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 21.5.2 to 21.6.1 [#3656](https://github.com/ghostery/adblocker/pull/3656) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 21.3.8 to 21.5.2 [#3597](https://github.com/ghostery/adblocker/pull/3597) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 27.1.3 to 28.0.0 [#3642](https://github.com/ghostery/adblocker/pull/3642) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump @types/sinon from 10.0.20 to 17.0.2 [#3609](https://github.com/ghostery/adblocker/pull/3609) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker`
  - Build(deps): Bump @types/firefox-webext-browser from 111.0.4 to 120.0.0 [#3619](https://github.com/ghostery/adblocker/pull/3619) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump jsdom from 22.1.0 to 23.0.1 [#3633](https://github.com/ghostery/adblocker/pull/3633) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.26.12 (Fri Nov 10 2023)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Scriptlet argument escaping [#3588](https://github.com/ghostery/adblocker/pull/3588) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3546](https://github.com/ghostery/adblocker/pull/3546) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### Authors: 3

- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.26.11 (Fri Nov 03 2023)

#### :bug: Bug Fix

- `@cliqz/adblocker-webextension`
  - WebExtension: fix scriptlet push injections [#3571](https://github.com/ghostery/adblocker/pull/3571) ([@chrmod](https://github.com/chrmod))

#### Authors: 1

- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.26.10 (Mon Oct 30 2023)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Scriptlets: inject quoted arguments without quotes [#3559](https://github.com/ghostery/adblocker/pull/3559) ([@chrmod](https://github.com/chrmod))

#### Authors: 1

- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.26.9 (Sat Oct 28 2023)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Scriptlet params edge case fix [#3558](https://github.com/ghostery/adblocker/pull/3558) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3543](https://github.com/ghostery/adblocker/pull/3543) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3525](https://github.com/ghostery/adblocker/pull/3525) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3521](https://github.com/ghostery/adblocker/pull/3521) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3520](https://github.com/ghostery/adblocker/pull/3520) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3514](https://github.com/ghostery/adblocker/pull/3514) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3508](https://github.com/ghostery/adblocker/pull/3508) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @types/jsdom from 21.1.3 to 21.1.4 [#3542](https://github.com/ghostery/adblocker/pull/3542) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 7.4.0 to 7.4.1 [#3541](https://github.com/ghostery/adblocker/pull/3541) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/mocha from 10.0.2 to 10.0.3 [#3540](https://github.com/ghostery/adblocker/pull/3540) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 8.2.1 to 8.2.2 [#3538](https://github.com/ghostery/adblocker/pull/3538) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 27.0.0 to 27.0.1 [#3537](https://github.com/ghostery/adblocker/pull/3537) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon-chai from 3.2.10 to 3.2.11 [#3536](https://github.com/ghostery/adblocker/pull/3536) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.8.5 to 20.8.7 [#3534](https://github.com/ghostery/adblocker/pull/3534) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @babel/traverse from 7.22.20 to 7.23.2 [#3535](https://github.com/ghostery/adblocker/pull/3535) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.7.5 to 6.8.0 [#3526](https://github.com/ghostery/adblocker/pull/3526) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 25.0.5 to 25.0.7 [#3522](https://github.com/ghostery/adblocker/pull/3522) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.8.5 to 20.8.6 [#3523](https://github.com/ghostery/adblocker/pull/3523) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 4.0.2 to 4.1.4 [#3524](https://github.com/ghostery/adblocker/pull/3524) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.7.5 to 6.8.0 [#3527](https://github.com/ghostery/adblocker/pull/3527) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.8 to 4.3.9 [#3528](https://github.com/ghostery/adblocker/pull/3528) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai-as-promised from 7.1.6 to 7.1.7 [#3529](https://github.com/ghostery/adblocker/pull/3529) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/benchmark from 2.1.3 to 2.1.4 [#3530](https://github.com/ghostery/adblocker/pull/3530) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @types/firefox-webext-browser from 111.0.2 to 111.0.3 [#3531](https://github.com/ghostery/adblocker/pull/3531) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 7.3.1 to 7.4.0 [#3533](https://github.com/ghostery/adblocker/pull/3533) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 7.3.0 to 7.3.1 [#3515](https://github.com/ghostery/adblocker/pull/3515) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint-plugin-prettier from 5.0.0 to 5.0.1 [#3516](https://github.com/ghostery/adblocker/pull/3516) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.38.1 to 1.39.0 [#3517](https://github.com/ghostery/adblocker/pull/3517) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.7 to 4.3.8 [#3518](https://github.com/ghostery/adblocker/pull/3518) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.8.4 to 20.8.5 [#3519](https://github.com/ghostery/adblocker/pull/3519) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.7.4 to 6.7.5 [#3509](https://github.com/ghostery/adblocker/pull/3509) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.7.4 to 6.7.5 [#3511](https://github.com/ghostery/adblocker/pull/3511) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.8.3 to 20.8.4 [#3512](https://github.com/ghostery/adblocker/pull/3512) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.6 to 4.3.7 [#3513](https://github.com/ghostery/adblocker/pull/3513) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump sinon from 16.1.0 to 17.0.0 [#3545](https://github.com/ghostery/adblocker/pull/3545) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.246 to 0.0.248 [#3532](https://github.com/ghostery/adblocker/pull/3532) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 26.3.0 to 27.0.0 [#3510](https://github.com/ghostery/adblocker/pull/3510) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.26.8 (Mon Oct 09 2023)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Fix parsing of scriptlet arguments [#3501](https://github.com/ghostery/adblocker/pull/3501) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3502](https://github.com/ghostery/adblocker/pull/3502) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3500](https://github.com/ghostery/adblocker/pull/3500) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3499](https://github.com/ghostery/adblocker/pull/3499) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Assets from Ghostery CDN [#3484](https://github.com/ghostery/adblocker/pull/3484) ([@chrmod](https://github.com/chrmod))
  - Fix codebooks [#3471](https://github.com/ghostery/adblocker/pull/3471) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker`
  - Update local assets [#3472](https://github.com/ghostery/adblocker/pull/3472) (ghostery-adblocker-bot@users.noreply.github.com [@remusao](https://github.com/remusao) [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Replace tslint with eslint [#3450](https://github.com/ghostery/adblocker/pull/3450) ([@chrmod](https://github.com/chrmod))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @types/sinon from 10.0.16 to 10.0.19 [#3503](https://github.com/ghostery/adblocker/pull/3503) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.8.2 to 20.8.3 [#3504](https://github.com/ghostery/adblocker/pull/3504) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.15 to 6.0.16 [#3505](https://github.com/ghostery/adblocker/pull/3505) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-node-resolve from 15.2.2 to 15.2.3 [#3506](https://github.com/ghostery/adblocker/pull/3506) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 8.50.0 to 8.51.0 [#3507](https://github.com/ghostery/adblocker/pull/3507) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 25.0.4 to 25.0.5 [#3496](https://github.com/ghostery/adblocker/pull/3496) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/parser from 6.7.0 to 6.7.4 [#3487](https://github.com/ghostery/adblocker/pull/3487) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump sinon from 16.0.0 to 16.1.0 [#3493](https://github.com/ghostery/adblocker/pull/3493) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump chai from 4.3.8 to 4.3.10 [#3482](https://github.com/ghostery/adblocker/pull/3482) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-node-resolve from 15.2.1 to 15.2.2 [#3495](https://github.com/ghostery/adblocker/pull/3495) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-typescript from 11.1.3 to 11.1.5 [#3494](https://github.com/ghostery/adblocker/pull/3494) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-json from 6.0.0 to 6.0.1 [#3490](https://github.com/ghostery/adblocker/pull/3490) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 26.2.2 to 26.3.0 [#3489](https://github.com/ghostery/adblocker/pull/3489) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.6.2 to 20.8.2 [#3488](https://github.com/ghostery/adblocker/pull/3488) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @typescript-eslint/eslint-plugin from 6.7.0 to 6.7.4 [#3485](https://github.com/ghostery/adblocker/pull/3485) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/mocha from 10.0.1 to 10.0.2 [#3479](https://github.com/ghostery/adblocker/pull/3479) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 5.0.1 to 5.0.5 [#3478](https://github.com/ghostery/adblocker/pull/3478) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump get-func-name from 2.0.0 to 2.0.2 [#3473](https://github.com/ghostery/adblocker/pull/3473) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon-chai from 3.2.9 to 3.2.10 [#3466](https://github.com/ghostery/adblocker/pull/3466) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump eslint from 8.49.0 to 8.50.0 [#3461](https://github.com/ghostery/adblocker/pull/3461) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.14 to 6.0.15 [#3460](https://github.com/ghostery/adblocker/pull/3460) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.38.0 to 1.38.1 [#3456](https://github.com/ghostery/adblocker/pull/3456) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 26.2.1 to 26.2.2 [#3455](https://github.com/ghostery/adblocker/pull/3455) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 21.2.1 to 21.3.8 [#3498](https://github.com/ghostery/adblocker/pull/3498) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump rollup from 3.29.2 to 4.0.2 [#3497](https://github.com/ghostery/adblocker/pull/3497) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.26.7 (Mon Sep 18 2023)

#### :bug: Bug Fix

- CI: fixing lerna publish [#3449](https://github.com/ghostery/adblocker/pull/3449) ([@chrmod](https://github.com/chrmod))
- CI: try auto in verbose mode [#3448](https://github.com/ghostery/adblocker/pull/3448) ([@chrmod](https://github.com/chrmod))
- Fix auto shipit [#3447](https://github.com/ghostery/adblocker/pull/3447) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Attempt to fix publishing workflow [#3443](https://github.com/ghostery/adblocker/pull/3443) ([@remusao](https://github.com/remusao) [@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker`
  - Make ghostery_id optional [#3372](https://github.com/ghostery/adblocker/pull/3372) ([@philipp-classen](https://github.com/philipp-classen))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Fix electron blocker performance regression [#3441](https://github.com/ghostery/adblocker/pull/3441) ([@remusao](https://github.com/remusao))

#### ⚠️ Pushed to `master`

- CI: fixing lerna publish ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Add missing ubo-2023 assets [#3442](https://github.com/ghostery/adblocker/pull/3442) ([@remusao](https://github.com/remusao))
  - Update local assets [#3440](https://github.com/ghostery/adblocker/pull/3440) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3418](https://github.com/ghostery/adblocker/pull/3418) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3417](https://github.com/ghostery/adblocker/pull/3417) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3416](https://github.com/ghostery/adblocker/pull/3416) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3414](https://github.com/ghostery/adblocker/pull/3414) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3403](https://github.com/ghostery/adblocker/pull/3403) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3388](https://github.com/ghostery/adblocker/pull/3388) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3366](https://github.com/ghostery/adblocker/pull/3366) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3357](https://github.com/ghostery/adblocker/pull/3357) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3356](https://github.com/ghostery/adblocker/pull/3356) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3309](https://github.com/ghostery/adblocker/pull/3309) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3304](https://github.com/ghostery/adblocker/pull/3304) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3276](https://github.com/ghostery/adblocker/pull/3276) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Update local assets [#3355](https://github.com/ghostery/adblocker/pull/3355) (ghostery-adblocker-bot@users.noreply.github.com [@remusao](https://github.com/remusao) [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Updates of dependencies and CI [#3353](https://github.com/ghostery/adblocker/pull/3353) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @types/node from 20.6.0 to 20.6.2 [#3439](https://github.com/ghostery/adblocker/pull/3439) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.28.1 to 3.29.2 [#3438](https://github.com/ghostery/adblocker/pull/3438) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai-as-promised from 7.1.5 to 7.1.6 [#3421](https://github.com/ghostery/adblocker/pull/3421) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.5 to 4.3.6 [#3422](https://github.com/ghostery/adblocker/pull/3422) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.5.7 to 20.6.0 [#3428](https://github.com/ghostery/adblocker/pull/3428) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.28.1 to 3.29.1 [#3429](https://github.com/ghostery/adblocker/pull/3429) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 26.1.0 to 26.2.1 [#3431](https://github.com/ghostery/adblocker/pull/3431) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.37.1 to 1.38.0 [#3434](https://github.com/ghostery/adblocker/pull/3434) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump @types/firefox-webext-browser from 111.0.1 to 111.0.2 [#3437](https://github.com/ghostery/adblocker/pull/3437) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.0.2 to 3.0.3 [#3415](https://github.com/ghostery/adblocker/pull/3415) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump chai from 4.3.7 to 4.3.8 [#3407](https://github.com/ghostery/adblocker/pull/3407) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-typescript from 11.1.2 to 11.1.3 [#3411](https://github.com/ghostery/adblocker/pull/3411) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.4.5 to 20.5.7 [#3410](https://github.com/ghostery/adblocker/pull/3410) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 5.1.6 to 5.2.2 [#3406](https://github.com/ghostery/adblocker/pull/3406) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/jsdom from 21.1.1 to 21.1.2 [#3402](https://github.com/ghostery/adblocker/pull/3402) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.27.0 to 3.28.1 [#3401](https://github.com/ghostery/adblocker/pull/3401) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 8.2.0 to 8.2.1 [#3400](https://github.com/ghostery/adblocker/pull/3400) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-node-resolve from 15.1.0 to 15.2.1 [#3398](https://github.com/ghostery/adblocker/pull/3398) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.36.2 to 1.37.1 [#3395](https://github.com/ghostery/adblocker/pull/3395) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 3.0.0 to 3.0.2 [#3393](https://github.com/ghostery/adblocker/pull/3393) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 25.0.3 to 25.0.4 [#3391](https://github.com/ghostery/adblocker/pull/3391) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.13 to 6.0.14 [#3386](https://github.com/ghostery/adblocker/pull/3386) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon from 10.0.15 to 10.0.16 [#3367](https://github.com/ghostery/adblocker/pull/3367) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.12 to 6.0.13 [#3365](https://github.com/ghostery/adblocker/pull/3365) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.26.3 to 3.27.0 [#3364](https://github.com/ghostery/adblocker/pull/3364) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.36.1 to 1.36.2 [#3361](https://github.com/ghostery/adblocker/pull/3361) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.3.1 to 3.3.2 [#3359](https://github.com/ghostery/adblocker/pull/3359) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 20.4.4 to 20.4.5 [#3358](https://github.com/ghostery/adblocker/pull/3358) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.244 to 0.0.246 [#3432](https://github.com/ghostery/adblocker/pull/3432) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.242 to 0.0.244 [#3409](https://github.com/ghostery/adblocker/pull/3409) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.241 to 0.0.242 [#3360](https://github.com/ghostery/adblocker/pull/3360) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 21.1.1 to 21.2.1 [#3433](https://github.com/ghostery/adblocker/pull/3433) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 20.9.0 to 21.1.1 [#3412](https://github.com/ghostery/adblocker/pull/3412) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump sinon from 15.2.0 to 16.0.0 [#3436](https://github.com/ghostery/adblocker/pull/3436) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 25.3.1 to 26.1.0 [#3405](https://github.com/ghostery/adblocker/pull/3405) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 6

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))
- Philipp Claßen ([@philipp-classen](https://github.com/philipp-classen))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.26.6 (Fri Jun 02 2023)

#### :nail_care: Polish

- `@cliqz/adblocker-webextension-cosmetics`
  - Improve timing of scriptlet injection [#3286](https://github.com/ghostery/adblocker/pull/3286) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3270](https://github.com/ghostery/adblocker/pull/3270) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3253](https://github.com/ghostery/adblocker/pull/3253) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3241](https://github.com/ghostery/adblocker/pull/3241) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3231](https://github.com/ghostery/adblocker/pull/3231) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3186](https://github.com/ghostery/adblocker/pull/3186) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3182](https://github.com/ghostery/adblocker/pull/3182) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3181](https://github.com/ghostery/adblocker/pull/3181) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3176](https://github.com/ghostery/adblocker/pull/3176) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3169](https://github.com/ghostery/adblocker/pull/3169) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3167](https://github.com/ghostery/adblocker/pull/3167) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump jsdom from 21.1.1 to 21.1.2 [#3225](https://github.com/ghostery/adblocker/pull/3225) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.4 to 4.3.5 [#3222](https://github.com/ghostery/adblocker/pull/3222) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.15.11 to 18.16.3 [#3221](https://github.com/ghostery/adblocker/pull/3221) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 24.0.0 to 24.1.3 [#3219](https://github.com/ghostery/adblocker/pull/3219) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.32.2 to 1.33.0 [#3218](https://github.com/ghostery/adblocker/pull/3218) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.44.0 to 10.46.0 [#3217](https://github.com/ghostery/adblocker/pull/3217) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.8.7 to 2.8.8 [#3213](https://github.com/ghostery/adblocker/pull/3213) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon from 10.0.13 to 10.0.14 [#3199](https://github.com/ghostery/adblocker/pull/3199) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 24.0.1 to 24.1.0 [#3190](https://github.com/ghostery/adblocker/pull/3190) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.2 to 6.0.3 [#3183](https://github.com/ghostery/adblocker/pull/3183) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-node-resolve from 15.0.1 to 15.0.2 [#3178](https://github.com/ghostery/adblocker/pull/3178) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.32.1 to 1.32.2 [#3172](https://github.com/ghostery/adblocker/pull/3172) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.43.0 to 10.44.0 [#3174](https://github.com/ghostery/adblocker/pull/3174) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 6.0.1 to 6.0.2 [#3175](https://github.com/ghostery/adblocker/pull/3175) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-typescript from 11.0.0 to 11.1.0 [#3177](https://github.com/ghostery/adblocker/pull/3177) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/jsdom from 21.1.0 to 21.1.1 [#3140](https://github.com/ghostery/adblocker/pull/3140) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.8.5 to 2.8.7 [#3148](https://github.com/ghostery/adblocker/pull/3148) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 6.6.0 to 6.6.1 [#3151](https://github.com/ghostery/adblocker/pull/3151) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump sinon from 15.0.2 to 15.0.3 [#3153](https://github.com/ghostery/adblocker/pull/3153) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.32.0 to 1.32.1 [#3154](https://github.com/ghostery/adblocker/pull/3154) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.15.5 to 18.15.11 [#3159](https://github.com/ghostery/adblocker/pull/3159) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 23.1.4 to 23.2.1 [#3164](https://github.com/ghostery/adblocker/pull/3164) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump typescript from 4.9.5 to 5.0.4 [#3180](https://github.com/ghostery/adblocker/pull/3180) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 23.2.1 to 24.0.0 [#3171](https://github.com/ghostery/adblocker/pull/3171) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.225 to 0.0.228 [#3173](https://github.com/ghostery/adblocker/pull/3173) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 19.8.2 to 19.8.5 [#3179](https://github.com/ghostery/adblocker/pull/3179) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 19.7.2 to 19.8.2 [#3161](https://github.com/ghostery/adblocker/pull/3161) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps): Bump tldts-experimental from 5.7.112 to 6.0.1 [#3168](https://github.com/ghostery/adblocker/pull/3168) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker`
  - Build(deps-dev): Bump concurrently from 7.6.0 to 8.0.1 [#3158](https://github.com/ghostery/adblocker/pull/3158) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.26.5 (Sun Apr 02 2023)

#### :nail_care: Polish

- `@cliqz/adblocker-electron-preload`
  - :bug: remove unnecessary setImmediate method [#3166](https://github.com/ghostery/adblocker/pull/3166) ([@DrRoot-github](https://github.com/DrRoot-github))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3156](https://github.com/ghostery/adblocker/pull/3156) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### Authors: 3

- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- DrRoot ([@DrRoot-github](https://github.com/DrRoot-github))
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)

---

# v1.26.4 (Sun Apr 02 2023)

### Release Notes

#### Adjust scriptlet injection timing ([#3162](https://github.com/ghostery/adblocker/pull/3162))

Resolves https://github.com/ghostery/adblocker/issues/2757

Changed the timing of scriptlet injection to before the DOMContentLoaded event fires. Also changed the injection method from using Electron.WebContents.executeJavaScript (which is effectively executed when the tab finishes loading) to dynamically adding a script element, similar to how μBlock Origin does it.

---

#### :bug: Bug Fix

- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Adjust scriptlet injection timing [#3162](https://github.com/ghostery/adblocker/pull/3162) ([@DrRoot-github](https://github.com/DrRoot-github))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3150](https://github.com/ghostery/adblocker/pull/3150) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3149](https://github.com/ghostery/adblocker/pull/3149) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3104](https://github.com/ghostery/adblocker/pull/3104) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump lerna from 6.5.1 to 6.6.0 [#3142](https://github.com/ghostery/adblocker/pull/3142) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.31.2 to 1.32.0 [#3138](https://github.com/ghostery/adblocker/pull/3138) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 4.4.0 to 4.4.1 [#3137](https://github.com/ghostery/adblocker/pull/3137) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.3.0 to 3.3.1 [#3120](https://github.com/ghostery/adblocker/pull/3120) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump sinon from 15.0.1 to 15.0.2 [#3118](https://github.com/ghostery/adblocker/pull/3118) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.20.0 to 3.20.2 [#3147](https://github.com/ghostery/adblocker/pull/3147) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.224 to 0.0.225 [#3141](https://github.com/ghostery/adblocker/pull/3141) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@DrRoot-github](https://github.com/DrRoot-github)
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)

---

# v1.26.3 (Fri Mar 24 2023)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - TrackerDB: by default should not match domains [#3145](https://github.com/ghostery/adblocker/pull/3145) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3103](https://github.com/ghostery/adblocker/pull/3103) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3102](https://github.com/ghostery/adblocker/pull/3102) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3097](https://github.com/ghostery/adblocker/pull/3097) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump rollup from 3.18.0 to 3.20.0 [#3135](https://github.com/ghostery/adblocker/pull/3135) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.8.4 to 2.8.5 [#3134](https://github.com/ghostery/adblocker/pull/3134) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.14.5 to 18.15.5 [#3133](https://github.com/ghostery/adblocker/pull/3133) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.110 to 5.7.112 [#3132](https://github.com/ghostery/adblocker/pull/3132) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 23.1.1 to 23.1.4 [#3130](https://github.com/ghostery/adblocker/pull/3130) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump jsdom from 21.1.0 to 21.1.1 [#3121](https://github.com/ghostery/adblocker/pull/3121) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 4.2.0 to 4.4.0 [#3113](https://github.com/ghostery/adblocker/pull/3113) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.31.1 to 1.31.2 [#3099](https://github.com/ghostery/adblocker/pull/3099) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.14.3 to 18.14.5 [#3101](https://github.com/ghostery/adblocker/pull/3101) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 4.1.3 to 4.2.0 [#3100](https://github.com/ghostery/adblocker/pull/3100) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.219 to 0.0.224 [#3128](https://github.com/ghostery/adblocker/pull/3128) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.218 to 0.0.219 [#3098](https://github.com/ghostery/adblocker/pull/3098) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker`
  - Build(deps): Bump @types/firefox-webext-browser from 109.0.0 to 111.0.0 [#3109](https://github.com/ghostery/adblocker/pull/3109) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.26.2 (Thu Mar 02 2023)

#### :bug: Bug Fix

- `@cliqz/adblocker-playwright`
  - [adblocker-playwright] Await route [#3096](https://github.com/ghostery/adblocker/pull/3096) ([@regseb](https://github.com/regseb))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3088](https://github.com/ghostery/adblocker/pull/3088) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3085](https://github.com/ghostery/adblocker/pull/3085) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3084](https://github.com/ghostery/adblocker/pull/3084) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump auto from 10.42.2 to 10.43.0 [#3093](https://github.com/ghostery/adblocker/pull/3093) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 4.1.2 to 4.1.3 [#3094](https://github.com/ghostery/adblocker/pull/3094) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.17.3 to 3.18.0 [#3091](https://github.com/ghostery/adblocker/pull/3091) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.109 to 5.7.110 [#3092](https://github.com/ghostery/adblocker/pull/3092) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.14.1 to 18.14.3 [#3095](https://github.com/ghostery/adblocker/pull/3095) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.217 to 0.0.218 [#3089](https://github.com/ghostery/adblocker/pull/3089) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump @types/jsdom from 20.0.1 to 21.1.0 [#3086](https://github.com/ghostery/adblocker/pull/3086) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Sébastien Règne ([@regseb](https://github.com/regseb))

---

# v1.26.1 (Sun Feb 26 2023)

#### :bug: Bug Fix

- Update README.md [#3083](https://github.com/ghostery/adblocker/pull/3083) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Fix codebooks generation [#3081](https://github.com/ghostery/adblocker/pull/3081) ([@remusao](https://github.com/remusao))
  - Update local assets [#3033](https://github.com/ghostery/adblocker/pull/3033) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :memo: Documentation

- Fix README badges [#3082](https://github.com/ghostery/adblocker/pull/3082) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump playwright from 1.29.2 to 1.31.1 [#3078](https://github.com/ghostery/adblocker/pull/3078) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 6.4.1 to 6.5.1 [#3063](https://github.com/ghostery/adblocker/pull/3063) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.104 to 5.7.109 [#3065](https://github.com/ghostery/adblocker/pull/3065) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.17.2 to 3.17.3 [#3080](https://github.com/ghostery/adblocker/pull/3080) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.37.6 to 10.42.2 [#3075](https://github.com/ghostery/adblocker/pull/3075) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.11.18 to 18.14.1 [#3079](https://github.com/ghostery/adblocker/pull/3079) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.10.0 to 3.17.2 [#3072](https://github.com/ghostery/adblocker/pull/3072) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.8.3 to 2.8.4 [#3052](https://github.com/ghostery/adblocker/pull/3052) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump http-cache-semantics from 4.1.0 to 4.1.1 [#3045](https://github.com/ghostery/adblocker/pull/3045) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.9.4 to 4.9.5 [#3038](https://github.com/ghostery/adblocker/pull/3038) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 4.1.1 to 4.1.2 [#3030](https://github.com/ghostery/adblocker/pull/3030) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 24.0.0 to 24.0.1 [#3026](https://github.com/ghostery/adblocker/pull/3026) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump jsdom from 21.0.0 to 21.1.0 [#3025](https://github.com/ghostery/adblocker/pull/3025) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 22.0.3 to 23.1.1 [#3076](https://github.com/ghostery/adblocker/pull/3076) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 19.5.2 to 19.7.2 [#3071](https://github.com/ghostery/adblocker/pull/3071) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.209 to 0.0.217 [#3070](https://github.com/ghostery/adblocker/pull/3070) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.26.0 (Wed Feb 22 2023)

#### :rocket: New Feature

- `@cliqz/adblocker`
  - Implement metadata abstraction [#3064](https://github.com/ghostery/adblocker/pull/3064) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#3024](https://github.com/ghostery/adblocker/pull/3024) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#3002](https://github.com/ghostery/adblocker/pull/3002) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump rimraf from 4.1.0 to 4.1.1 [#3020](https://github.com/ghostery/adblocker/pull/3020) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 22.0.2 to 22.0.3 [#3021](https://github.com/ghostery/adblocker/pull/3021) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rimraf from 4.0.7 to 4.1.0 [#3019](https://github.com/ghostery/adblocker/pull/3019) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.29.1 to 1.29.2 [#3006](https://github.com/ghostery/adblocker/pull/3006) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.9.1 to 3.10.0 [#3012](https://github.com/ghostery/adblocker/pull/3012) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 6.4.0 to 6.4.1 [#3014](https://github.com/ghostery/adblocker/pull/3014) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.8.1 to 2.8.3 [#3015](https://github.com/ghostery/adblocker/pull/3015) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 22.0.0 to 22.0.2 [#3016](https://github.com/ghostery/adblocker/pull/3016) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.208 to 0.0.209 [#3022](https://github.com/ghostery/adblocker/pull/3022) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.206 to 0.0.208 [#3008](https://github.com/ghostery/adblocker/pull/3008) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 19.4.1 to 19.5.2 [#3011](https://github.com/ghostery/adblocker/pull/3011) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump @rollup/plugin-typescript from 10.0.1 to 11.0.0 [#3003](https://github.com/ghostery/adblocker/pull/3003) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump jsdom from 20.0.3 to 21.0.0 [#3005](https://github.com/ghostery/adblocker/pull/3005) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker`
  - Build(deps): Bump @types/firefox-webext-browser from 94.0.1 to 109.0.0 [#3017](https://github.com/ghostery/adblocker/pull/3017) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump rimraf from 3.0.2 to 4.0.7 [#3018](https://github.com/ghostery/adblocker/pull/3018) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.25.2 (Mon Jan 16 2023)

#### :bug: Bug Fix

- `@cliqz/adblocker-webextension`
  - Always respond to getCosmeticFilters [#2980](https://github.com/ghostery/adblocker/pull/2980) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#2997](https://github.com/ghostery/adblocker/pull/2997) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2988](https://github.com/ghostery/adblocker/pull/2988) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2962](https://github.com/ghostery/adblocker/pull/2962) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2960](https://github.com/ghostery/adblocker/pull/2960) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2956](https://github.com/ghostery/adblocker/pull/2956) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2945](https://github.com/ghostery/adblocker/pull/2945) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2944](https://github.com/ghostery/adblocker/pull/2944) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2943](https://github.com/ghostery/adblocker/pull/2943) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2936](https://github.com/ghostery/adblocker/pull/2936) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2934](https://github.com/ghostery/adblocker/pull/2934) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2933](https://github.com/ghostery/adblocker/pull/2933) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2921](https://github.com/ghostery/adblocker/pull/2921) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2919](https://github.com/ghostery/adblocker/pull/2919) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2908](https://github.com/ghostery/adblocker/pull/2908) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2901](https://github.com/ghostery/adblocker/pull/2901) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2900](https://github.com/ghostery/adblocker/pull/2900) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2893](https://github.com/ghostery/adblocker/pull/2893) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2891](https://github.com/ghostery/adblocker/pull/2891) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2890](https://github.com/ghostery/adblocker/pull/2890) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2882](https://github.com/ghostery/adblocker/pull/2882) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2874](https://github.com/ghostery/adblocker/pull/2874) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2847](https://github.com/ghostery/adblocker/pull/2847) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2825](https://github.com/ghostery/adblocker/pull/2825) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2824](https://github.com/ghostery/adblocker/pull/2824) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Update deps and CI [#2889](https://github.com/ghostery/adblocker/pull/2889) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump json5 from 2.2.1 to 2.2.3 [#3001](https://github.com/ghostery/adblocker/pull/3001) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.9.0 to 3.9.1 [#2998](https://github.com/ghostery/adblocker/pull/2998) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.103 to 5.7.104 [#2999](https://github.com/ghostery/adblocker/pull/2999) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 6.3.0 to 6.4.0 [#3000](https://github.com/ghostery/adblocker/pull/3000) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.9.3 to 4.9.4 [#2967](https://github.com/ghostery/adblocker/pull/2967) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.8.0 to 2.8.1 [#2968](https://github.com/ghostery/adblocker/pull/2968) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump chalk from 5.1.2 to 5.2.0 [#2969](https://github.com/ghostery/adblocker/pull/2969) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump mocha from 10.1.0 to 10.2.0 [#2973](https://github.com/ghostery/adblocker/pull/2973) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump sinon from 15.0.0 to 15.0.1 [#2978](https://github.com/ghostery/adblocker/pull/2978) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-json from 5.0.2 to 6.0.0 [#2986](https://github.com/ghostery/adblocker/pull/2986) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.102 to 5.7.103 [#2987](https://github.com/ghostery/adblocker/pull/2987) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.28.1 to 1.29.1 [#2991](https://github.com/ghostery/adblocker/pull/2991) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.11.10 to 18.11.18 [#2994](https://github.com/ghostery/adblocker/pull/2994) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 6.1.0 to 6.3.0 [#2995](https://github.com/ghostery/adblocker/pull/2995) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.5.1 to 3.9.0 [#2996](https://github.com/ghostery/adblocker/pull/2996) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/mocha from 10.0.0 to 10.0.1 [#2950](https://github.com/ghostery/adblocker/pull/2950) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 23.0.2 to 23.0.3 [#2947](https://github.com/ghostery/adblocker/pull/2947) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-json from 5.0.1 to 5.0.2 [#2949](https://github.com/ghostery/adblocker/pull/2949) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 6.0.3 to 6.1.0 [#2954](https://github.com/ghostery/adblocker/pull/2954) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.11.9 to 18.11.10 [#2955](https://github.com/ghostery/adblocker/pull/2955) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.101 to 5.7.102 [#2957](https://github.com/ghostery/adblocker/pull/2957) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.4.0 to 3.5.1 [#2958](https://github.com/ghostery/adblocker/pull/2958) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump decode-uri-component from 0.2.0 to 0.2.2 [#2959](https://github.com/ghostery/adblocker/pull/2959) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 21.3.0 to 21.3.1 [#2939](https://github.com/ghostery/adblocker/pull/2939) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.7.1 to 2.8.0 [#2940](https://github.com/ghostery/adblocker/pull/2940) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.28.0 to 1.28.1 [#2941](https://github.com/ghostery/adblocker/pull/2941) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.100 to 5.7.101 [#2942](https://github.com/ghostery/adblocker/pull/2942) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.3.0 to 3.4.0 [#2935](https://github.com/ghostery/adblocker/pull/2935) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.2.5 to 3.3.0 [#2922](https://github.com/ghostery/adblocker/pull/2922) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.8.4 to 4.9.3 [#2924](https://github.com/ghostery/adblocker/pull/2924) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.99 to 5.7.100 [#2926](https://github.com/ghostery/adblocker/pull/2926) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 21.2.3 to 21.3.0 [#2927](https://github.com/ghostery/adblocker/pull/2927) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.27.1 to 1.28.0 [#2928](https://github.com/ghostery/adblocker/pull/2928) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 7.5.0 to 7.6.0 [#2930](https://github.com/ghostery/adblocker/pull/2930) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump jsdom from 20.0.2 to 20.0.3 [#2931](https://github.com/ghostery/adblocker/pull/2931) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.97 to 5.7.99 [#2912](https://github.com/ghostery/adblocker/pull/2912) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump sinon from 14.0.1 to 14.0.2 [#2913](https://github.com/ghostery/adblocker/pull/2913) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 6.0.1 to 6.0.3 [#2914](https://github.com/ghostery/adblocker/pull/2914) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon-chai from 3.2.8 to 3.2.9 [#2915](https://github.com/ghostery/adblocker/pull/2915) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/jsdom from 20.0.0 to 20.0.1 [#2916](https://github.com/ghostery/adblocker/pull/2916) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump chai from 4.3.6 to 4.3.7 [#2917](https://github.com/ghostery/adblocker/pull/2917) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 21.2.1 to 21.2.3 [#2918](https://github.com/ghostery/adblocker/pull/2918) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.2.10 to 3.3.0 [#2920](https://github.com/ghostery/adblocker/pull/2920) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump jsdom from 20.0.1 to 20.0.2 [#2902](https://github.com/ghostery/adblocker/pull/2902) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 21.2.0 to 21.2.1 [#2904](https://github.com/ghostery/adblocker/pull/2904) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.11.5 to 18.11.9 [#2906](https://github.com/ghostery/adblocker/pull/2906) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 3.2.3 to 3.2.5 [#2907](https://github.com/ghostery/adblocker/pull/2907) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.11.3 to 18.11.5 [#2895](https://github.com/ghostery/adblocker/pull/2895) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 5.5.1 to 6.0.1 [#2878](https://github.com/ghostery/adblocker/pull/2878) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.91 to 5.7.97 [#2876](https://github.com/ghostery/adblocker/pull/2876) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump chalk from 5.0.1 to 5.1.2 [#2871](https://github.com/ghostery/adblocker/pull/2871) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.25.2 to 1.27.1 [#2869](https://github.com/ghostery/adblocker/pull/2869) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-json from 4.1.0 to 5.0.0 [#2865](https://github.com/ghostery/adblocker/pull/2865) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump sinon from 14.0.0 to 14.0.1 [#2848](https://github.com/ghostery/adblocker/pull/2848) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump jsdom from 20.0.0 to 20.0.1 [#2846](https://github.com/ghostery/adblocker/pull/2846) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.8.3 to 4.8.4 [#2840](https://github.com/ghostery/adblocker/pull/2840) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.79.0 to 2.79.1 [#2834](https://github.com/ghostery/adblocker/pull/2834) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`
  - Build(deps-dev): Bump @rollup/plugin-commonjs from 23.0.3 to 24.0.0 [#2983](https://github.com/ghostery/adblocker/pull/2983) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps-dev): Bump @rollup/plugin-commonjs from 22.0.2 to 23.0.2 [#2888](https://github.com/ghostery/adblocker/pull/2888) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 19.3.0 to 19.4.1 [#2985](https://github.com/ghostery/adblocker/pull/2985) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 19.2.2 to 19.3.0 [#2937](https://github.com/ghostery/adblocker/pull/2937) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 19.2.0 to 19.2.2 [#2911](https://github.com/ghostery/adblocker/pull/2911) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 19.1.2 to 19.2.0 [#2898](https://github.com/ghostery/adblocker/pull/2898) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 19.1.0 to 19.1.2 [#2896](https://github.com/ghostery/adblocker/pull/2896) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 17.1.3 to 19.1.0 [#2886](https://github.com/ghostery/adblocker/pull/2886) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.203 to 0.0.206 [#2990](https://github.com/ghostery/adblocker/pull/2990) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.202 to 0.0.203 [#2938](https://github.com/ghostery/adblocker/pull/2938) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.200 to 0.0.202 [#2925](https://github.com/ghostery/adblocker/pull/2925) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.199 to 0.0.200 [#2897](https://github.com/ghostery/adblocker/pull/2897) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.197 to 0.0.199 [#2883](https://github.com/ghostery/adblocker/pull/2883) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump sinon from 14.0.2 to 15.0.0 [#2951](https://github.com/ghostery/adblocker/pull/2951) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump @rollup/plugin-typescript from 9.0.2 to 10.0.1 [#2952](https://github.com/ghostery/adblocker/pull/2952) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps-dev): Bump @rollup/plugin-node-resolve from 14.1.0 to 15.0.0 [#2864](https://github.com/ghostery/adblocker/pull/2864) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 21.3.1 to 22.0.0 [#2953](https://github.com/ghostery/adblocker/pull/2953) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump @types/mocha from 9.1.1 to 10.0.0 [#2843](https://github.com/ghostery/adblocker/pull/2843) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.25.1 (Sat Sep 17 2022)

#### :nail_care: Polish

- `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker`
  - Build(deps): Bump puppeteer from 17.0.0 to 17.1.3 [#2811](https://github.com/ghostery/adblocker/pull/2811) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#2822](https://github.com/ghostery/adblocker/pull/2822) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2818](https://github.com/ghostery/adblocker/pull/2818) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2810](https://github.com/ghostery/adblocker/pull/2810) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2804](https://github.com/ghostery/adblocker/pull/2804) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2797](https://github.com/ghostery/adblocker/pull/2797) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2793](https://github.com/ghostery/adblocker/pull/2793) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2792](https://github.com/ghostery/adblocker/pull/2792) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump tldts-experimental from 5.7.90 to 5.7.91 [#2802](https://github.com/ghostery/adblocker/pull/2802) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 7.3.0 to 7.4.0 [#2806](https://github.com/ghostery/adblocker/pull/2806) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.25.1 to 1.25.2 [#2808](https://github.com/ghostery/adblocker/pull/2808) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.8.2 to 4.8.3 [#2812](https://github.com/ghostery/adblocker/pull/2812) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 5.5.0 to 5.5.1 [#2815](https://github.com/ghostery/adblocker/pull/2815) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.37.4 to 10.37.6 [#2819](https://github.com/ghostery/adblocker/pull/2819) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.7.14 to 18.7.18 [#2820](https://github.com/ghostery/adblocker/pull/2820) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 20.1.1 to 20.1.4 [#2821](https://github.com/ghostery/adblocker/pull/2821) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.78.1 to 2.79.0 [#2795](https://github.com/ghostery/adblocker/pull/2795) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 5.4.3 to 5.5.0 [#2794](https://github.com/ghostery/adblocker/pull/2794) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 20.1.0 to 20.1.1 [#2796](https://github.com/ghostery/adblocker/pull/2796) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/benchmark from 2.1.1 to 2.1.2 [#2788](https://github.com/ghostery/adblocker/pull/2788) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.89 to 5.7.90 [#2789](https://github.com/ghostery/adblocker/pull/2789) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.7.13 to 18.7.14 [#2791](https://github.com/ghostery/adblocker/pull/2791) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.195 to 0.0.197 [#2823](https://github.com/ghostery/adblocker/pull/2823) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump @rollup/plugin-node-resolve from 13.3.0 to 14.1.0 [#2817](https://github.com/ghostery/adblocker/pull/2817) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 16.2.0 to 17.0.0 [#2790](https://github.com/ghostery/adblocker/pull/2790) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.25.0 (Tue Aug 30 2022)

#### :rocket: New Feature

- `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - New option "enablePushInjectionsOnNavigationEvents" [#2750](https://github.com/ghostery/adblocker/pull/2750) ([@philipp-classen](https://github.com/philipp-classen))

#### :house: Internal

- ci: do not run benchmarks on dependabot PRs [#2786](https://github.com/ghostery/adblocker/pull/2786) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#2787](https://github.com/ghostery/adblocker/pull/2787) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2785](https://github.com/ghostery/adblocker/pull/2785) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump @types/node from 18.7.6 to 18.7.13 [#2780](https://github.com/ghostery/adblocker/pull/2780) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.25.0 to 1.25.1 [#2779](https://github.com/ghostery/adblocker/pull/2779) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.78.0 to 2.78.1 [#2774](https://github.com/ghostery/adblocker/pull/2774) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.7.4 to 4.8.2 [#2784](https://github.com/ghostery/adblocker/pull/2784) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@remusao](https://github.com/remusao))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 16.1.1 to 16.2.0 [#2775](https://github.com/ghostery/adblocker/pull/2775) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.193 to 0.0.195 [#2773](https://github.com/ghostery/adblocker/pull/2773) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 19.0.10 to 20.1.0 [#2781](https://github.com/ghostery/adblocker/pull/2781) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@remusao](https://github.com/remusao))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Philipp Claßen ([@philipp-classen](https://github.com/philipp-classen))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.24.0 (Fri Aug 26 2022)

#### :running_woman: Performance

- `@cliqz/adblocker-webextension-cosmetics`
  - Use "pagehide" instead of "unload" [#2782](https://github.com/ghostery/adblocker/pull/2782) ([@philipp-classen](https://github.com/philipp-classen))

#### :house: Internal

- Fixing CI ("benchmark" action is failing) [#2771](https://github.com/ghostery/adblocker/pull/2771) ([@philipp-classen](https://github.com/philipp-classen) [@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#2783](https://github.com/ghostery/adblocker/pull/2783) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump jsdom and @types/jsdom [#2766](https://github.com/ghostery/adblocker/pull/2766) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Philipp Claßen ([@philipp-classen](https://github.com/philipp-classen))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.23.9 (Fri Aug 19 2022)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Preserve all information in rawLine (fix for the blank screen in YouTube full screen mode) [#2768](https://github.com/ghostery/adblocker/pull/2768) ([@philipp-classen](https://github.com/philipp-classen))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#2770](https://github.com/ghostery/adblocker/pull/2770) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Fix generation of compression codebooks [#2767](https://github.com/ghostery/adblocker/pull/2767) ([@remusao](https://github.com/remusao))
  - Update local assets [#2676](https://github.com/ghostery/adblocker/pull/2676) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2671](https://github.com/ghostery/adblocker/pull/2671) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2667](https://github.com/ghostery/adblocker/pull/2667) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2656](https://github.com/ghostery/adblocker/pull/2656) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2655](https://github.com/ghostery/adblocker/pull/2655) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2642](https://github.com/ghostery/adblocker/pull/2642) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2632](https://github.com/ghostery/adblocker/pull/2632) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2628](https://github.com/ghostery/adblocker/pull/2628) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Revert "Build(deps-dev): Bump got from 11.8.3 to 12.0.4" [#2627](https://github.com/ghostery/adblocker/pull/2627) ([@remusao](https://github.com/remusao))
  - Update local assets [#2604](https://github.com/ghostery/adblocker/pull/2604) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump node-fetch from 3.2.9 to 3.2.10 [#2734](https://github.com/ghostery/adblocker/pull/2734) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 22.0.1 to 22.0.2 [#2743](https://github.com/ghostery/adblocker/pull/2743) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.1 to 4.3.3 [#2747](https://github.com/ghostery/adblocker/pull/2747) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.24.1 to 1.25.0 [#2751](https://github.com/ghostery/adblocker/pull/2751) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.84 to 5.7.89 [#2754](https://github.com/ghostery/adblocker/pull/2754) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.77.2 to 2.78.0 [#2759](https://github.com/ghostery/adblocker/pull/2759) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.6.2 to 18.7.6 [#2763](https://github.com/ghostery/adblocker/pull/2763) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 5.3.0 to 5.4.3 [#2764](https://github.com/ghostery/adblocker/pull/2764) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.77.0 to 2.77.2 [#2730](https://github.com/ghostery/adblocker/pull/2730) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 5.2.0 to 5.3.0 [#2729](https://github.com/ghostery/adblocker/pull/2729) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.24.0 to 1.24.1 [#2727](https://github.com/ghostery/adblocker/pull/2727) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 19.0.9 to 19.0.10 [#2731](https://github.com/ghostery/adblocker/pull/2731) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.6.1 to 18.6.2 [#2732](https://github.com/ghostery/adblocker/pull/2732) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 19.0.8 to 19.0.9 [#2717](https://github.com/ghostery/adblocker/pull/2717) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.23.4 to 1.24.0 [#2719](https://github.com/ghostery/adblocker/pull/2719) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.0.6 to 18.6.1 [#2720](https://github.com/ghostery/adblocker/pull/2720) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 5.1.8 to 5.2.0 [#2721](https://github.com/ghostery/adblocker/pull/2721) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.37.2 to 10.37.4 [#2726](https://github.com/ghostery/adblocker/pull/2726) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ts-node from 10.8.2 to 10.9.1 [#2706](https://github.com/ghostery/adblocker/pull/2706) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.23.2 to 1.23.4 [#2709](https://github.com/ghostery/adblocker/pull/2709) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.76.0 to 2.77.0 [#2710](https://github.com/ghostery/adblocker/pull/2710) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.37.1 to 10.37.2 [#2711](https://github.com/ghostery/adblocker/pull/2711) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.0.3 to 18.0.6 [#2712](https://github.com/ghostery/adblocker/pull/2712) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.2.8 to 3.2.9 [#2713](https://github.com/ghostery/adblocker/pull/2713) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 7.2.2 to 7.3.0 [#2714](https://github.com/ghostery/adblocker/pull/2714) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon from 10.0.12 to 10.0.13 [#2716](https://github.com/ghostery/adblocker/pull/2716) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump terser from 5.9.0 to 5.14.2 [#2715](https://github.com/ghostery/adblocker/pull/2715) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 22.0.0 to 22.0.1 [#2678](https://github.com/ghostery/adblocker/pull/2678) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon from 10.0.11 to 10.0.12 [#2682](https://github.com/ghostery/adblocker/pull/2682) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ts-node from 10.8.1 to 10.8.2 [#2688](https://github.com/ghostery/adblocker/pull/2688) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.82 to 5.7.84 [#2692](https://github.com/ghostery/adblocker/pull/2692) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 18.0.0 to 18.0.3 [#2694](https://github.com/ghostery/adblocker/pull/2694) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 19.0.4 to 19.0.8 [#2696](https://github.com/ghostery/adblocker/pull/2696) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.22.2 to 1.23.2 [#2699](https://github.com/ghostery/adblocker/pull/2699) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump lerna from 4.0.0 to 5.1.8 [#2700](https://github.com/ghostery/adblocker/pull/2700) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.75.6 to 2.76.0 [#2702](https://github.com/ghostery/adblocker/pull/2702) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.2.6 to 3.2.8 [#2704](https://github.com/ghostery/adblocker/pull/2704) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.7.3 to 4.7.4 [#2669](https://github.com/ghostery/adblocker/pull/2669) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 7.2.1 to 7.2.2 [#2661](https://github.com/ghostery/adblocker/pull/2661) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.81 to 5.7.82 [#2662](https://github.com/ghostery/adblocker/pull/2662) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.6.2 to 2.7.1 [#2666](https://github.com/ghostery/adblocker/pull/2666) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.2.4 to 3.2.6 [#2653](https://github.com/ghostery/adblocker/pull/2653) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 19.0.3 to 19.0.4 [#2652](https://github.com/ghostery/adblocker/pull/2652) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.36 to 17.0.41 [#2651](https://github.com/ghostery/adblocker/pull/2651) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.75.3 to 2.75.6 [#2648](https://github.com/ghostery/adblocker/pull/2648) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.7.2 to 4.7.3 [#2646](https://github.com/ghostery/adblocker/pull/2646) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ts-node from 10.8.0 to 10.8.1 [#2645](https://github.com/ghostery/adblocker/pull/2645) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.80 to 5.7.81 [#2644](https://github.com/ghostery/adblocker/pull/2644) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 19.0.1 to 19.0.3 [#2639](https://github.com/ghostery/adblocker/pull/2639) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 7.2.0 to 7.2.1 [#2616](https://github.com/ghostery/adblocker/pull/2616) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ts-node from 10.7.0 to 10.8.0 [#2617](https://github.com/ghostery/adblocker/pull/2617) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.79 to 5.7.80 [#2618](https://github.com/ghostery/adblocker/pull/2618) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.22.1 to 1.22.2 [#2619](https://github.com/ghostery/adblocker/pull/2619) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.6.4 to 4.7.2 [#2621](https://github.com/ghostery/adblocker/pull/2621) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.36.5 to 10.37.1 [#2625](https://github.com/ghostery/adblocker/pull/2625) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.35 to 17.0.36 [#2629](https://github.com/ghostery/adblocker/pull/2629) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.74.1 to 2.75.3 [#2630](https://github.com/ghostery/adblocker/pull/2630) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 7.1.0 to 7.2.0 [#2599](https://github.com/ghostery/adblocker/pull/2599) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-node-resolve from 13.2.1 to 13.3.0 [#2585](https://github.com/ghostery/adblocker/pull/2585) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.77 to 5.7.79 [#2603](https://github.com/ghostery/adblocker/pull/2603) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.21.1 to 1.22.1 [#2608](https://github.com/ghostery/adblocker/pull/2608) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 18.2.0 to 18.2.4 [#2609](https://github.com/ghostery/adblocker/pull/2609) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.30 to 17.0.35 [#2610](https://github.com/ghostery/adblocker/pull/2610) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.70.2 to 2.74.1 [#2613](https://github.com/ghostery/adblocker/pull/2613) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 15.5.0 to 16.1.1 [#2765](https://github.com/ghostery/adblocker/pull/2765) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 15.4.0 to 15.5.0 [#2718](https://github.com/ghostery/adblocker/pull/2718) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 15.3.2 to 15.4.0 [#2705](https://github.com/ghostery/adblocker/pull/2705) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 14.4.1 to 15.3.2 [#2701](https://github.com/ghostery/adblocker/pull/2701) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 14.4.0 to 14.4.1 [#2670](https://github.com/ghostery/adblocker/pull/2670) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 14.3.0 to 14.4.0 [#2659](https://github.com/ghostery/adblocker/pull/2659) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 14.2.1 to 14.3.0 [#2649](https://github.com/ghostery/adblocker/pull/2649) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 14.1.2 to 14.2.1 [#2640](https://github.com/ghostery/adblocker/pull/2640) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 14.1.1 to 14.1.2 [#2631](https://github.com/ghostery/adblocker/pull/2631) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 14.1.0 to 14.1.1 [#2612](https://github.com/ghostery/adblocker/pull/2612) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.190 to 0.0.193 [#2691](https://github.com/ghostery/adblocker/pull/2691) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.188 to 0.0.190 [#2650](https://github.com/ghostery/adblocker/pull/2650) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.183 to 0.0.188 [#2611](https://github.com/ghostery/adblocker/pull/2611) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker`
  - Build(deps-dev): Bump @types/node from 17.0.41 to 18.0.0 [#2664](https://github.com/ghostery/adblocker/pull/2664) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 18.2.4 to 19.0.1 [#2624](https://github.com/ghostery/adblocker/pull/2624) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker`
  - Build(deps-dev): Bump got from 11.8.3 to 12.0.4 [#2566](https://github.com/ghostery/adblocker/pull/2566) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Build(deps-dev): Bump mocha from 9.2.2 to 10.0.0 [#2582](https://github.com/ghostery/adblocker/pull/2582) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump sinon from 13.0.2 to 14.0.0 [#2590](https://github.com/ghostery/adblocker/pull/2590) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Philipp Claßen ([@philipp-classen](https://github.com/philipp-classen))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.23.8 (Mon May 16 2022)

#### :nail_care: Polish

- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 13.7.0 to 14.1.0 [#2601](https://github.com/ghostery/adblocker/pull/2601) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@remusao](https://github.com/remusao))

#### :house: Internal

- Fix electron example [#2572](https://github.com/ghostery/adblocker/pull/2572) ([@remusao](https://github.com/remusao))
- Don't run assets updates on forks. [#2531](https://github.com/ghostery/adblocker/pull/2531) ([@fcjr](https://github.com/fcjr))
- `@cliqz/adblocker`
  - Update local assets [#2588](https://github.com/ghostery/adblocker/pull/2588) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2580](https://github.com/ghostery/adblocker/pull/2580) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2573](https://github.com/ghostery/adblocker/pull/2573) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2561](https://github.com/ghostery/adblocker/pull/2561) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2546](https://github.com/ghostery/adblocker/pull/2546) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2542](https://github.com/ghostery/adblocker/pull/2542) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2538](https://github.com/ghostery/adblocker/pull/2538) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2524](https://github.com/ghostery/adblocker/pull/2524) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2517](https://github.com/ghostery/adblocker/pull/2517) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2513](https://github.com/ghostery/adblocker/pull/2513) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump tldts-experimental from 5.7.76 to 5.7.77 [#2581](https://github.com/ghostery/adblocker/pull/2581) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 18.1.0 to 18.2.0 [#2579](https://github.com/ghostery/adblocker/pull/2579) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.27 to 17.0.30 [#2578](https://github.com/ghostery/adblocker/pull/2578) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.6.3 to 4.6.4 [#2577](https://github.com/ghostery/adblocker/pull/2577) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.2.3 to 3.2.4 [#2576](https://github.com/ghostery/adblocker/pull/2576) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.25 to 17.0.27 [#2567](https://github.com/ghostery/adblocker/pull/2567) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/mocha from 9.1.0 to 9.1.1 [#2562](https://github.com/ghostery/adblocker/pull/2562) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai from 4.3.0 to 4.3.1 [#2549](https://github.com/ghostery/adblocker/pull/2549) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump sinon from 13.0.1 to 13.0.2 [#2550](https://github.com/ghostery/adblocker/pull/2550) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.75 to 5.7.76 [#2553](https://github.com/ghostery/adblocker/pull/2553) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 21.0.3 to 21.1.0 [#2554](https://github.com/ghostery/adblocker/pull/2554) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-node-resolve from 13.2.0 to 13.2.1 [#2555](https://github.com/ghostery/adblocker/pull/2555) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.70.1 to 2.70.2 [#2556](https://github.com/ghostery/adblocker/pull/2556) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.20.2 to 1.21.1 [#2557](https://github.com/ghostery/adblocker/pull/2557) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.23 to 17.0.25 [#2558](https://github.com/ghostery/adblocker/pull/2558) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 21.0.2 to 21.0.3 [#2528](https://github.com/ghostery/adblocker/pull/2528) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump concurrently from 7.0.0 to 7.1.0 [#2535](https://github.com/ghostery/adblocker/pull/2535) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.6.0 to 2.6.2 [#2536](https://github.com/ghostery/adblocker/pull/2536) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.20.1 to 1.20.2 [#2537](https://github.com/ghostery/adblocker/pull/2537) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.72 to 5.7.75 [#2544](https://github.com/ghostery/adblocker/pull/2544) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-node-resolve from 13.1.3 to 13.2.0 [#2545](https://github.com/ghostery/adblocker/pull/2545) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump minimist from 1.2.5 to 1.2.6 [#2523](https://github.com/ghostery/adblocker/pull/2523) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 17.1.2 to 17.2.0 [#2518](https://github.com/ghostery/adblocker/pull/2518) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.20.0 to 1.20.1 [#2519](https://github.com/ghostery/adblocker/pull/2519) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.22 to 17.0.23 [#2520](https://github.com/ghostery/adblocker/pull/2520) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.6.2 to 4.6.3 [#2521](https://github.com/ghostery/adblocker/pull/2521) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.70 to 5.7.72 [#2514](https://github.com/ghostery/adblocker/pull/2514) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.21 to 17.0.22 [#2511](https://github.com/ghostery/adblocker/pull/2511) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 13.6.0 to 13.7.0 [#2575](https://github.com/ghostery/adblocker/pull/2575) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 13.5.1 to 13.6.0 [#2560](https://github.com/ghostery/adblocker/pull/2560) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.181 to 0.0.183 [#2569](https://github.com/ghostery/adblocker/pull/2569) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.180 to 0.0.181 [#2543](https://github.com/ghostery/adblocker/pull/2543) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`
  - Build(deps-dev): Bump @rollup/plugin-commonjs from 21.1.0 to 22.0.0 [#2564](https://github.com/ghostery/adblocker/pull/2564) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 17.2.0 to 18.1.0 [#2559](https://github.com/ghostery/adblocker/pull/2559) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Frank Chiarulli Jr. ([@fcjr](https://github.com/fcjr))
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.23.7 (Wed Mar 23 2022)

#### :bug: Bug Fix

- Revert release fix since the issue was a token permission missing [#2516](https://github.com/ghostery/adblocker/pull/2516) ([@remusao](https://github.com/remusao))
- Fix publishing [#2515](https://github.com/ghostery/adblocker/pull/2515) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker-webextension`
  - Don't throw an error when receiving a message from popup [#2506](https://github.com/ghostery/adblocker/pull/2506) ([@private-face](https://github.com/private-face))

#### :nail_care: Polish

- `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`
  - cosmetics: make sure we do not hide body or html elements [#2496](https://github.com/ghostery/adblocker/pull/2496) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#2509](https://github.com/ghostery/adblocker/pull/2509) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2504](https://github.com/ghostery/adblocker/pull/2504) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2498](https://github.com/ghostery/adblocker/pull/2498) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2482](https://github.com/ghostery/adblocker/pull/2482) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2478](https://github.com/ghostery/adblocker/pull/2478) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2475](https://github.com/ghostery/adblocker/pull/2475) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2462](https://github.com/ghostery/adblocker/pull/2462) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2461](https://github.com/ghostery/adblocker/pull/2461) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2457](https://github.com/ghostery/adblocker/pull/2457) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2450](https://github.com/ghostery/adblocker/pull/2450) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps-dev): Bump auto from 10.34.2 to 10.36.5 [#2510](https://github.com/ghostery/adblocker/pull/2510) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.2.2 to 3.2.3 [#2497](https://github.com/ghostery/adblocker/pull/2497) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump mocha from 9.2.1 to 9.2.2 [#2499](https://github.com/ghostery/adblocker/pull/2499) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.70.0 to 2.70.1 [#2500](https://github.com/ghostery/adblocker/pull/2500) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.19.2 to 1.20.0 [#2501](https://github.com/ghostery/adblocker/pull/2501) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump prettier from 2.5.1 to 2.6.0 [#2502](https://github.com/ghostery/adblocker/pull/2502) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.69 to 5.7.70 [#2507](https://github.com/ghostery/adblocker/pull/2507) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.34.1 to 10.34.2 [#2508](https://github.com/ghostery/adblocker/pull/2508) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.67 to 5.7.69 [#2484](https://github.com/ghostery/adblocker/pull/2484) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ts-node from 10.6.0 to 10.7.0 [#2485](https://github.com/ghostery/adblocker/pull/2485) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump auto from 10.32.6 to 10.34.1 [#2487](https://github.com/ghostery/adblocker/pull/2487) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.68.0 to 2.70.0 [#2488](https://github.com/ghostery/adblocker/pull/2488) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.2.1 to 3.2.2 [#2491](https://github.com/ghostery/adblocker/pull/2491) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump chalk from 5.0.0 to 5.0.1 [#2492](https://github.com/ghostery/adblocker/pull/2492) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 17.1.0 to 17.1.2 [#2495](https://github.com/ghostery/adblocker/pull/2495) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ts-node from 10.5.0 to 10.6.0 [#2481](https://github.com/ghostery/adblocker/pull/2481) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump node-fetch from 3.2.0 to 3.2.1 [#2480](https://github.com/ghostery/adblocker/pull/2480) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump typescript from 4.5.5 to 4.6.2 [#2476](https://github.com/ghostery/adblocker/pull/2476) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.66 to 5.7.67 [#2477](https://github.com/ghostery/adblocker/pull/2477) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump mocha from 9.2.0 to 9.2.1 [#2465](https://github.com/ghostery/adblocker/pull/2465) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.67.2 to 2.68.0 [#2468](https://github.com/ghostery/adblocker/pull/2468) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 17.0.1 to 17.1.0 [#2469](https://github.com/ghostery/adblocker/pull/2469) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @rollup/plugin-commonjs from 21.0.1 to 21.0.2 [#2470](https://github.com/ghostery/adblocker/pull/2470) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.18 to 17.0.21 [#2471](https://github.com/ghostery/adblocker/pull/2471) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.63 to 5.7.66 [#2472](https://github.com/ghostery/adblocker/pull/2472) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.19.1 to 1.19.2 [#2474](https://github.com/ghostery/adblocker/pull/2474) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump electron from 17.0.0 to 17.0.1 [#2452](https://github.com/ghostery/adblocker/pull/2452) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.17 to 17.0.18 [#2453](https://github.com/ghostery/adblocker/pull/2453) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump playwright from 1.19.0 to 1.19.1 [#2454](https://github.com/ghostery/adblocker/pull/2454) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.62 to 5.7.63 [#2455](https://github.com/ghostery/adblocker/pull/2455) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.179 to 0.0.180 [#2503](https://github.com/ghostery/adblocker/pull/2503) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump @types/chrome from 0.0.178 to 0.0.179 [#2473](https://github.com/ghostery/adblocker/pull/2473) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 13.4.1 to 13.5.1 [#2494](https://github.com/ghostery/adblocker/pull/2494) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 13.4.0 to 13.4.1 [#2479](https://github.com/ghostery/adblocker/pull/2479) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 13.3.2 to 13.4.0 [#2467](https://github.com/ghostery/adblocker/pull/2467) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 13.3.1 to 13.3.2 [#2451](https://github.com/ghostery/adblocker/pull/2451) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Rémi ([@remusao](https://github.com/remusao))
- Vladimir Zhuravlev ([@private-face](https://github.com/private-face))

---

# v1.23.6 (Mon Feb 14 2022)

#### :bug: Bug Fix

- `@cliqz/adblocker-electron`
  - Stop removing is-mutation-observer-enabled [#2449](https://github.com/ghostery/adblocker/pull/2449) ([@kylegundersen](https://github.com/kylegundersen))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#2445](https://github.com/ghostery/adblocker/pull/2445) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2440](https://github.com/ghostery/adblocker/pull/2440) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2438](https://github.com/ghostery/adblocker/pull/2438) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2435](https://github.com/ghostery/adblocker/pull/2435) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2429](https://github.com/ghostery/adblocker/pull/2429) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump playwright from 1.18.1 to 1.19.0 [#2447](https://github.com/ghostery/adblocker/pull/2447) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.61 to 5.7.62 [#2448](https://github.com/ghostery/adblocker/pull/2448) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.16 to 17.0.17 [#2441](https://github.com/ghostery/adblocker/pull/2441) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/chai-as-promised from 7.1.4 to 7.1.5 [#2443](https://github.com/ghostery/adblocker/pull/2443) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.67.1 to 2.67.2 [#2444](https://github.com/ghostery/adblocker/pull/2444) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon from 10.0.10 to 10.0.11 [#2436](https://github.com/ghostery/adblocker/pull/2436) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump ts-node from 10.4.0 to 10.5.0 [#2430](https://github.com/ghostery/adblocker/pull/2430) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.67.0 to 2.67.1 [#2431](https://github.com/ghostery/adblocker/pull/2431) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.15 to 17.0.16 [#2433](https://github.com/ghostery/adblocker/pull/2433) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 13.3.0 to 13.3.1 [#2442](https://github.com/ghostery/adblocker/pull/2442) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 13.2.0 to 13.3.0 [#2439](https://github.com/ghostery/adblocker/pull/2439) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Build(deps): Bump puppeteer from 13.1.3 to 13.2.0 [#2432](https://github.com/ghostery/adblocker/pull/2432) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Kyle Gundersen ([@kylegundersen](https://github.com/kylegundersen))

---

# v1.23.5 (Mon Feb 07 2022)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Add 2022 ubo list [#2428](https://github.com/ghostery/adblocker/pull/2428) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#2413](https://github.com/ghostery/adblocker/pull/2413) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2407](https://github.com/ghostery/adblocker/pull/2407) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2397](https://github.com/ghostery/adblocker/pull/2397) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2392](https://github.com/ghostery/adblocker/pull/2392) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))
  - Update local assets [#2381](https://github.com/ghostery/adblocker/pull/2381) (ghostery-adblocker-bot@users.noreply.github.com [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Build(deps): Bump tldts-experimental from 5.7.59 to 5.7.61 [#2423](https://github.com/ghostery/adblocker/pull/2423) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.14 to 17.0.15 [#2425](https://github.com/ghostery/adblocker/pull/2425) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps): Bump tldts-experimental from 5.7.59 to 5.7.60 [#2414](https://github.com/ghostery/adblocker/pull/2414) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/node from 17.0.13 to 17.0.14 [#2419](https://github.com/ghostery/adblocker/pull/2419) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump rollup from 2.66.1 to 2.67.0 [#2420](https://github.com/ghostery/adblocker/pull/2420) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Build(deps-dev): Bump @types/sinon from 10.0.9 to 10.0.10 [#2422](https://github.com/ghostery/adblocker/pull/2422) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 16.0.7 to 16.0.8 [#2411](https://github.com/ghostery/adblocker/pull/2411) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 17.0.10 to 17.0.13 [#2412](https://github.com/ghostery/adblocker/pull/2412) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.18.0 to 1.18.1 [#2410](https://github.com/ghostery/adblocker/pull/2410) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/sinon from 10.0.8 to 10.0.9 [#2409](https://github.com/ghostery/adblocker/pull/2409) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump chai from 4.3.4 to 4.3.6 [#2408](https://github.com/ghostery/adblocker/pull/2408) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.64.0 to 2.66.1 [#2404](https://github.com/ghostery/adblocker/pull/2404) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.1.4 to 9.2.0 [#2400](https://github.com/ghostery/adblocker/pull/2400) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.58 to 5.7.59 [#2399](https://github.com/ghostery/adblocker/pull/2399) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump node-fetch from 3.1.1 to 3.2.0 [#2396](https://github.com/ghostery/adblocker/pull/2396) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.32.5 to 10.32.6 [#2395](https://github.com/ghostery/adblocker/pull/2395) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.5.4 to 4.5.5 [#2394](https://github.com/ghostery/adblocker/pull/2394) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.17.2 to 1.18.0 [#2393](https://github.com/ghostery/adblocker/pull/2393) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/mocha from 9.0.0 to 9.1.0 [#2391](https://github.com/ghostery/adblocker/pull/2391) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/sinon from 10.0.6 to 10.0.8 [#2390](https://github.com/ghostery/adblocker/pull/2390) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.1.3 to 9.1.4 [#2382](https://github.com/ghostery/adblocker/pull/2382) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump node-fetch from 3.1.0 to 3.1.1 [#2383](https://github.com/ghostery/adblocker/pull/2383) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.63.0 to 2.64.0 [#2384](https://github.com/ghostery/adblocker/pull/2384) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 17.0.8 to 17.0.10 [#2388](https://github.com/ghostery/adblocker/pull/2388) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Build(deps): Bump electron from 16.0.8 to 17.0.0 [#2417](https://github.com/ghostery/adblocker/pull/2417) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Build(deps): Bump puppeteer from 13.1.2 to 13.1.3 [#2416](https://github.com/ghostery/adblocker/pull/2416) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump puppeteer from 13.1.1 to 13.1.2 [#2406](https://github.com/ghostery/adblocker/pull/2406) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump puppeteer from 13.0.1 to 13.1.1 [#2389](https://github.com/ghostery/adblocker/pull/2389) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Build(deps-dev): Bump sinon from 12.0.1 to 13.0.1 [#2418](https://github.com/ghostery/adblocker/pull/2418) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Build(deps): Bump @types/chrome from 0.0.177 to 0.0.178 [#2421](https://github.com/ghostery/adblocker/pull/2421) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.176 to 0.0.177 [#2402](https://github.com/ghostery/adblocker/pull/2402) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghostery-adblocker-bot[bot]](https://github.com/ghostery-adblocker-bot[bot])
- Ghostery Adblocker Bot (ghostery-adblocker-bot@users.noreply.github.com)
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.23.4 (Mon Jan 17 2022)

#### :bug: Bug Fix

- CI: commit asset updates with Bot identity [#2385](https://github.com/ghostery/adblocker/pull/2385) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- CI: automated commits created by a Bot [#2377](https://github.com/ghostery/adblocker/pull/2377) ([@chrmod](https://github.com/chrmod))
- bugfix: create pull requests by Adblocker App [#2375](https://github.com/ghostery/adblocker/pull/2375) ([@y3ti](https://github.com/y3ti))
- Update assets.yml [#2374](https://github.com/ghostery/adblocker/pull/2374) ([@chrmod](https://github.com/chrmod))
- CI: Use Githup app to create automated PRs [#2374](https://github.com/ghostery/adblocker/pull/2374) ([@chrmod](https://github.com/chrmod))
- CI: allow write access for PRs [#2368](https://github.com/ghostery/adblocker/pull/2368) ([@chrmod](https://github.com/chrmod))
- `@cliqz/adblocker`
  - Update local assets [#2380](https://github.com/ghostery/adblocker/pull/2380) ([@remusao](https://github.com/remusao) [@ghosterey-adblocker-bot[bot]](https://github.com/ghosterey-adblocker-bot[bot]))
  - Update local assets [#2379](https://github.com/ghostery/adblocker/pull/2379) ([@remusao](https://github.com/remusao) [@ghosterey-adblocker-bot[bot]](https://github.com/ghosterey-adblocker-bot[bot]))
  - Update local assets [#2378](https://github.com/ghostery/adblocker/pull/2378) ([@remusao](https://github.com/remusao) [@ghosterey-adblocker-bot[bot]](https://github.com/ghosterey-adblocker-bot[bot]))
  - Update local assets [#2376](https://github.com/ghostery/adblocker/pull/2376) ([@chrmod](https://github.com/chrmod) [@ghosterey-adblocker-bot[bot]](https://github.com/ghosterey-adblocker-bot[bot]))

#### :nut_and_bolt: Dependencies

- Bump electron from 16.0.6 to 16.0.7 [#2373](https://github.com/ghostery/adblocker/pull/2373) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/jsdom from 16.2.13 to 16.2.14 [#2351](https://github.com/ghostery/adblocker/pull/2351) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump chalk from 4.1.2 to 5.0.0 [#2362](https://github.com/ghostery/adblocker/pull/2362) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.6 to 13.1.3 [#2353](https://github.com/ghostery/adblocker/pull/2353) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 16.0.2 to 16.0.6 [#2354](https://github.com/ghostery/adblocker/pull/2354) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.5.2 to 4.5.4 [#2355](https://github.com/ghostery/adblocker/pull/2355) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.16.3 to 1.17.2 [#2358](https://github.com/ghostery/adblocker/pull/2358) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/chai from 4.2.22 to 4.3.0 [#2359](https://github.com/ghostery/adblocker/pull/2359) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.5.0 to 2.5.1 [#2360](https://github.com/ghostery/adblocker/pull/2360) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/sinon-chai from 3.2.6 to 3.2.8 [#2361](https://github.com/ghostery/adblocker/pull/2361) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.60.1 to 2.63.0 [#2364](https://github.com/ghostery/adblocker/pull/2364) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.32.3 to 10.32.5 [#2365](https://github.com/ghostery/adblocker/pull/2365) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.53 to 5.7.58 [#2366](https://github.com/ghostery/adblocker/pull/2366) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.175 to 0.0.176 [#2371](https://github.com/ghostery/adblocker/pull/2371) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker`
  - Bump @types/node from 16.11.10 to 17.0.8 [#2350](https://github.com/ghostery/adblocker/pull/2350) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-webextension-cosmetics`
  - Bump jsdom from 18.1.1 to 19.0.0 [#2356](https://github.com/ghostery/adblocker/pull/2356) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Bump puppeteer from 13.0.0 to 13.0.1 [#2357](https://github.com/ghostery/adblocker/pull/2357) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker`
  - Bump concurrently from 6.4.0 to 7.0.0 [#2363](https://github.com/ghostery/adblocker/pull/2363) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@ghosterey-adblocker-bot[bot]](https://github.com/ghosterey-adblocker-bot[bot])
- Kamil Grabowski ([@y3ti](https://github.com/y3ti))
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.23.3 (Mon Jan 10 2022)

#### :bug: Bug Fix

- CI: use default user for Assets job [#2367](https://github.com/ghostery/adblocker/pull/2367) ([@chrmod](https://github.com/chrmod))

#### :house: Internal

- CI: use default GH access token [#2346](https://github.com/ghostery/adblocker/pull/2346) ([@chrmod](https://github.com/chrmod))
- CI: fix dependabot [#2347](https://github.com/ghostery/adblocker/pull/2347) ([@chrmod](https://github.com/chrmod))

#### :nut_and_bolt: Dependencies

- Bump @types/firefox-webext-browser from 94.0.0 to 94.0.1 [#2349](https://github.com/ghostery/adblocker/pull/2349) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.164 to 0.0.175 [#2348](https://github.com/ghostery/adblocker/pull/2348) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Krzysztof Modras ([@chrmod](https://github.com/chrmod))

---

# v1.23.2 (Sat Dec 11 2021)

#### :bug: Bug Fix

- `@cliqz/adblocker-puppeteer`
  - Update Puppeteer Cooperative Intercept Mode [#2343](https://github.com/ghostery/adblocker/pull/2343) ([@FdezRomero](https://github.com/FdezRomero))

#### :house: Internal

- Updated ubo-core to latest version [#2342](https://github.com/ghostery/adblocker/pull/2342) ([@gorhill](https://github.com/gorhill))

#### Authors: 2

- Raymond Hill ([@gorhill](https://github.com/gorhill))
- Rodrigo Fernández ([@FdezRomero](https://github.com/FdezRomero))

---

# v1.23.1 (Sat Dec 04 2021)

#### :bug: Bug Fix

- Updated tsurlfilter to the latest version [#2287](https://github.com/ghostery/adblocker/pull/2287) ([@ameshkov](https://github.com/ameshkov))

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Add missing list [#2341](https://github.com/ghostery/adblocker/pull/2341) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#2338](https://github.com/ghostery/adblocker/pull/2338) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2319](https://github.com/ghostery/adblocker/pull/2319) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2312](https://github.com/ghostery/adblocker/pull/2312) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2306](https://github.com/ghostery/adblocker/pull/2306) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2303](https://github.com/ghostery/adblocker/pull/2303) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2300](https://github.com/ghostery/adblocker/pull/2300) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2288](https://github.com/ghostery/adblocker/pull/2288) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2283](https://github.com/ghostery/adblocker/pull/2283) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump @types/sinon-chai from 3.2.5 to 3.2.6 [#2340](https://github.com/ghostery/adblocker/pull/2340) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.4.1 to 2.5.0 [#2339](https://github.com/ghostery/adblocker/pull/2339) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.11.7 to 16.11.10 [#2336](https://github.com/ghostery/adblocker/pull/2336) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.59.0 to 2.60.1 [#2335](https://github.com/ghostery/adblocker/pull/2335) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.32.2 to 10.32.3 [#2334](https://github.com/ghostery/adblocker/pull/2334) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jsdom from 18.0.1 to 18.1.1 [#2332](https://github.com/ghostery/adblocker/pull/2332) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump got from 11.8.2 to 11.8.3 [#2329](https://github.com/ghostery/adblocker/pull/2329) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.51 to 5.7.53 [#2328](https://github.com/ghostery/adblocker/pull/2328) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.4.4 to 4.5.2 [#2326](https://github.com/ghostery/adblocker/pull/2326) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump concurrently from 6.3.0 to 6.4.0 [#2323](https://github.com/ghostery/adblocker/pull/2323) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump node-fetch from 3.0.0 to 3.1.0 [#2315](https://github.com/ghostery/adblocker/pull/2315) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.50 to 5.7.51 [#2316](https://github.com/ghostery/adblocker/pull/2316) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 15.3.0 to 15.3.1 [#2317](https://github.com/ghostery/adblocker/pull/2317) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.11.6 to 16.11.7 [#2318](https://github.com/ghostery/adblocker/pull/2318) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.58.3 to 2.59.0 [#2307](https://github.com/ghostery/adblocker/pull/2307) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jsdom from 18.0.0 to 18.0.1 [#2308](https://github.com/ghostery/adblocker/pull/2308) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.16.2 to 1.16.3 [#2309](https://github.com/ghostery/adblocker/pull/2309) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.49 to 5.7.50 [#2304](https://github.com/ghostery/adblocker/pull/2304) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.32.1 to 10.32.2 [#2301](https://github.com/ghostery/adblocker/pull/2301) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.16.1 to 1.16.2 [#2302](https://github.com/ghostery/adblocker/pull/2302) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.11.1 to 16.11.6 [#2299](https://github.com/ghostery/adblocker/pull/2299) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.58.0 to 2.58.3 [#2298](https://github.com/ghostery/adblocker/pull/2298) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/sinon from 10.0.4 to 10.0.6 [#2297](https://github.com/ghostery/adblocker/pull/2297) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 10.3.0 to 10.4.0 [#2296](https://github.com/ghostery/adblocker/pull/2296) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.15.2 to 1.16.1 [#2292](https://github.com/ghostery/adblocker/pull/2292) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 15.2.0 to 15.3.0 [#2286](https://github.com/ghostery/adblocker/pull/2286) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-commonjs from 21.0.0 to 21.0.1 [#2285](https://github.com/ghostery/adblocker/pull/2285) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.5 to 13.0.6 [#2284](https://github.com/ghostery/adblocker/pull/2284) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.48 to 5.7.49 [#2282](https://github.com/ghostery/adblocker/pull/2282) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Bump electron from 15.3.1 to 16.0.2 [#2337](https://github.com/ghostery/adblocker/pull/2337) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.163 to 0.0.164 [#2324](https://github.com/ghostery/adblocker/pull/2324) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.162 to 0.0.163 [#2314](https://github.com/ghostery/adblocker/pull/2314) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.161 to 0.0.162 [#2305](https://github.com/ghostery/adblocker/pull/2305) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.159 to 0.0.161 [#2294](https://github.com/ghostery/adblocker/pull/2294) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - Bump sinon from 11.1.2 to 12.0.1 [#2313](https://github.com/ghostery/adblocker/pull/2313) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Bump puppeteer from 10.4.0 to 11.0.0 [#2311](https://github.com/ghostery/adblocker/pull/2311) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@remusao](https://github.com/remusao))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Andrey Meshkov ([@ameshkov](https://github.com/ameshkov))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.23.0 (Mon Oct 18 2021)

#### :rocket: New Feature

- `@cliqz/adblocker-puppeteer`
  - puppeteer: added support for cooperative mode. [#2281](https://github.com/ghostery/adblocker/pull/2281) ([@akornatskyy](https://github.com/akornatskyy))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#2278](https://github.com/ghostery/adblocker/pull/2278) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2276](https://github.com/ghostery/adblocker/pull/2276) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2265](https://github.com/ghostery/adblocker/pull/2265) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2253](https://github.com/ghostery/adblocker/pull/2253) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2246](https://github.com/ghostery/adblocker/pull/2246) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2244](https://github.com/ghostery/adblocker/pull/2244) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump @types/node from 16.11.0 to 16.11.1 [#2280](https://github.com/ghostery/adblocker/pull/2280) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.1.2 to 9.1.3 [#2279](https://github.com/ghostery/adblocker/pull/2279) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.10.3 to 16.11.0 [#2275](https://github.com/ghostery/adblocker/pull/2275) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.47 to 5.7.48 [#2274](https://github.com/ghostery/adblocker/pull/2274) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 15.1.1 to 15.2.0 [#2273](https://github.com/ghostery/adblocker/pull/2273) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.4.3 to 4.4.4 [#2269](https://github.com/ghostery/adblocker/pull/2269) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 10.2.1 to 10.3.0 [#2268](https://github.com/ghostery/adblocker/pull/2268) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.10.1 to 16.10.3 [#2263](https://github.com/ghostery/adblocker/pull/2263) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.15.0 to 1.15.2 [#2262](https://github.com/ghostery/adblocker/pull/2262) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 15.0.0 to 15.1.1 [#2261](https://github.com/ghostery/adblocker/pull/2261) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.57.0 to 2.58.0 [#2258](https://github.com/ghostery/adblocker/pull/2258) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump concurrently from 6.2.2 to 6.3.0 [#2257](https://github.com/ghostery/adblocker/pull/2257) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.32.0 to 10.32.1 [#2255](https://github.com/ghostery/adblocker/pull/2255) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.45 to 5.7.47 [#2252](https://github.com/ghostery/adblocker/pull/2252) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump concurrently from 6.2.1 to 6.2.2 [#2251](https://github.com/ghostery/adblocker/pull/2251) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/sinon from 10.0.3 to 10.0.4 [#2250](https://github.com/ghostery/adblocker/pull/2250) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.1.1 to 9.1.2 [#2248](https://github.com/ghostery/adblocker/pull/2248) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 16.9.6 to 16.10.1 [#2247](https://github.com/ghostery/adblocker/pull/2247) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker`
  - Bump @types/firefox-webext-browser from 82.0.1 to 94.0.0 [#2271](https://github.com/ghostery/adblocker/pull/2271) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-webextension-cosmetics`
  - Bump jsdom from 17.0.0 to 18.0.0 [#2267](https://github.com/ghostery/adblocker/pull/2267) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.158 to 0.0.159 [#2266](https://github.com/ghostery/adblocker/pull/2266) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.157 to 0.0.158 [#2245](https://github.com/ghostery/adblocker/pull/2245) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`
  - Bump @rollup/plugin-commonjs from 20.0.0 to 21.0.0 [#2260](https://github.com/ghostery/adblocker/pull/2260) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Andriy Kornatskyy ([@akornatskyy](https://github.com/akornatskyy))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.22.7 (Wed Sep 22 2021)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - electron: add missing types from https://github.com/electron/electron/pull/29902 [#2241](https://github.com/ghostery/adblocker/pull/2241) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Bump typescript [#2243](https://github.com/ghostery/adblocker/pull/2243) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-puppeteer`
  - Remove express dependency [#2242](https://github.com/ghostery/adblocker/pull/2242) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#2232](https://github.com/ghostery/adblocker/pull/2232) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2229](https://github.com/ghostery/adblocker/pull/2229) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump tldts-experimental from 5.7.44 to 5.7.45 [#2238](https://github.com/ghostery/adblocker/pull/2238) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.4 to 13.0.5 [#2239](https://github.com/ghostery/adblocker/pull/2239) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.14.1 to 1.15.0 [#2240](https://github.com/ghostery/adblocker/pull/2240) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.43 to 5.7.44 [#2231](https://github.com/ghostery/adblocker/pull/2231) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/chai from 4.2.21 to 4.2.22 [#2233](https://github.com/ghostery/adblocker/pull/2233) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/sinon from 10.0.2 to 10.0.3 [#2234](https://github.com/ghostery/adblocker/pull/2234) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker`
  - Bump @types/node from 15.6.1 to 16.9.6 [#2235](https://github.com/ghostery/adblocker/pull/2235) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Bump electron from 14.0.1 to 15.0.0 [#2236](https://github.com/ghostery/adblocker/pull/2236) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Bump puppeteer from 10.2.0 to 10.4.0 [#2237](https://github.com/ghostery/adblocker/pull/2237) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.22.6 (Sun Sep 19 2021)

#### :nail_care: Polish

- `@cliqz/adblocker-electron`
  - Update peer dependency on Electron [#2228](https://github.com/ghostery/adblocker/pull/2228) ([@Jelmerro](https://github.com/Jelmerro))

#### :house: Internal

- Do not run benchmarks for dependabot [#2207](https://github.com/ghostery/adblocker/pull/2207) ([@remusao](https://github.com/remusao))
- Allow benchmarks to run on all PRs [#2206](https://github.com/ghostery/adblocker/pull/2206) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#2227](https://github.com/ghostery/adblocker/pull/2227) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2212](https://github.com/ghostery/adblocker/pull/2212) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2209](https://github.com/ghostery/adblocker/pull/2209) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2203](https://github.com/ghostery/adblocker/pull/2203) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2195](https://github.com/ghostery/adblocker/pull/2195) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2194](https://github.com/ghostery/adblocker/pull/2194) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2191](https://github.com/ghostery/adblocker/pull/2191) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Run benchmark on each PR [#2193](https://github.com/ghostery/adblocker/pull/2193) ([@remusao](https://github.com/remusao))
  - Update local assets [#2181](https://github.com/ghostery/adblocker/pull/2181) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump electron from 14.0.0 to 14.0.1 [#2221](https://github.com/ghostery/adblocker/pull/2221) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.31.0 to 10.32.0 [#2222](https://github.com/ghostery/adblocker/pull/2222) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.3.2 to 2.4.1 [#2225](https://github.com/ghostery/adblocker/pull/2225) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node-fetch from 2.5.12 to 3.0.3 [#2210](https://github.com/ghostery/adblocker/pull/2210) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump node-fetch from 2.6.1 to 3.0.0 [#2205](https://github.com/ghostery/adblocker/pull/2205) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.40 to 5.7.43 [#2208](https://github.com/ghostery/adblocker/pull/2208) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tar from 4.4.15 to 4.4.19 [#2202](https://github.com/ghostery/adblocker/pull/2202) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.1.0 to 9.1.1 [#2196](https://github.com/ghostery/adblocker/pull/2196) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.14.0 to 1.14.1 [#2188](https://github.com/ghostery/adblocker/pull/2188) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.56.2 to 2.56.3 [#2186](https://github.com/ghostery/adblocker/pull/2186) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.2.1 to 13.2.2 [#2185](https://github.com/ghostery/adblocker/pull/2185) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.0.3 to 9.1.0 [#2183](https://github.com/ghostery/adblocker/pull/2183) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.155 to 0.0.157 [#2214](https://github.com/ghostery/adblocker/pull/2214) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.154 to 0.0.155 [#2211](https://github.com/ghostery/adblocker/pull/2211) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - Bump electron from 13.2.2 to 14.0.0 [#2200](https://github.com/ghostery/adblocker/pull/2200) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Jelmer van Arnhem ([@Jelmerro](https://github.com/Jelmerro))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.22.5 (Wed Aug 25 2021)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Always skip last token unless anchored [#2187](https://github.com/ghostery/adblocker/pull/2187) ([@mjethani](https://github.com/mjethani))

#### :house: Internal

- Add Adblock Plus whitelisting logic [#2172](https://github.com/ghostery/adblocker/pull/2172) ([@mjethani](https://github.com/mjethani))
- Add 'ping' mapping in blockers/tsurlfilter.js [#2171](https://github.com/ghostery/adblocker/pull/2171) ([@mjethani](https://github.com/mjethani))
- Clean up file locations [#2164](https://github.com/ghostery/adblocker/pull/2164) ([@mjethani](https://github.com/mjethani))
- Move benchmarking to separate benchmark() function [#2163](https://github.com/ghostery/adblocker/pull/2163) ([@mjethani](https://github.com/mjethani))
- Add matchDebug() for Cliqz [#2162](https://github.com/ghostery/adblocker/pull/2162) ([@mjethani](https://github.com/mjethani))
- Add matchDebug() to uBO's proxy API [#2160](https://github.com/ghostery/adblocker/pull/2160) ([@gorhill](https://github.com/gorhill))
- Add local .gitignore [#2161](https://github.com/ghostery/adblocker/pull/2161) ([@mjethani](https://github.com/mjethani))
- Add COMPARE=<filename> option [#2159](https://github.com/ghostery/adblocker/pull/2159) ([@mjethani](https://github.com/mjethani))
- Add DEBUG=1 flag [#2156](https://github.com/ghostery/adblocker/pull/2156) ([@mjethani](https://github.com/mjethani))
- Update easylist.txt [#2154](https://github.com/ghostery/adblocker/pull/2154) ([@mjethani](https://github.com/mjethani))
- Pass --compressed to curl [#2153](https://github.com/ghostery/adblocker/pull/2153) ([@mjethani](https://github.com/mjethani))
- Update requests.json [#2152](https://github.com/ghostery/adblocker/pull/2152) ([@mjethani](https://github.com/mjethani))
- Handle 'ping' type from puppeteer [#2149](https://github.com/ghostery/adblocker/pull/2149) ([@mjethani](https://github.com/mjethani))
- Add SKIP_SERIALIZATION=1 flag [#2150](https://github.com/ghostery/adblocker/pull/2150) ([@mjethani](https://github.com/mjethani))
- Remove dependence on yarn [#2148](https://github.com/ghostery/adblocker/pull/2148) ([@mjethani](https://github.com/mjethani))
- Use specific versions of the engines [#2145](https://github.com/ghostery/adblocker/pull/2145) ([@mjethani](https://github.com/mjethani))
- Install fast-hosts-lookup like other engines [#2144](https://github.com/ghostery/adblocker/pull/2144) ([@mjethani](https://github.com/mjethani))
- Add support for exceptions to hosts-lookup [#2143](https://github.com/ghostery/adblocker/pull/2143) ([@mjethani](https://github.com/mjethani))
- Update Adblock Plus to use npm package [#2142](https://github.com/ghostery/adblocker/pull/2142) ([@mjethani](https://github.com/mjethani))
- Fix Node.js package names in make clean [#2141](https://github.com/ghostery/adblocker/pull/2141) ([@mjethani](https://github.com/mjethani))
- Make UBlockOrigin#deserialize() consistent [#2140](https://github.com/ghostery/adblocker/pull/2140) ([@mjethani](https://github.com/mjethani))
- Update uBlock Origin to use npm package [#2138](https://github.com/ghostery/adblocker/pull/2138) ([@mjethani](https://github.com/mjethani))
- Use tsurlfilter's DNS engine [#2136](https://github.com/ghostery/adblocker/pull/2136) ([@mjethani](https://github.com/mjethani))
- Drop filters with regular expression assertions [#2128](https://github.com/ghostery/adblocker/pull/2128) ([@mjethani](https://github.com/mjethani))
- Move extractHostname() to utils.js [#2127](https://github.com/ghostery/adblocker/pull/2127) ([@mjethani](https://github.com/mjethani))
- Fix easylist.txt at runtime [#2126](https://github.com/ghostery/adblocker/pull/2126) ([@mjethani](https://github.com/mjethani))
- Add hosts-lookup [#2124](https://github.com/ghostery/adblocker/pull/2124) ([@mjethani](https://github.com/mjethani))
- Do not initialize PSL in hosts-only mode [#2119](https://github.com/ghostery/adblocker/pull/2119) ([@mjethani](https://github.com/mjethani))
- Implement hosts-only mode [#2115](https://github.com/ghostery/adblocker/pull/2115) ([@mjethani](https://github.com/mjethani))
- `@cliqz/adblocker`
  - Update local assets [#2173](https://github.com/ghostery/adblocker/pull/2173) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2166](https://github.com/ghostery/adblocker/pull/2166) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2155](https://github.com/ghostery/adblocker/pull/2155) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2131](https://github.com/ghostery/adblocker/pull/2131) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2130](https://github.com/ghostery/adblocker/pull/2130) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2129](https://github.com/ghostery/adblocker/pull/2129) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2120](https://github.com/ghostery/adblocker/pull/2120) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2111](https://github.com/ghostery/adblocker/pull/2111) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :memo: Documentation

- Fix "bootstrap" in README.md [#2180](https://github.com/ghostery/adblocker/pull/2180) ([@mjethani](https://github.com/mjethani))

#### :nut_and_bolt: Dependencies

- Bump ts-node from 10.2.0 to 10.2.1 [#2178](https://github.com/ghostery/adblocker/pull/2178) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.9 to 13.2.1 [#2177](https://github.com/ghostery/adblocker/pull/2177) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.13.1 to 1.14.0 [#2174](https://github.com/ghostery/adblocker/pull/2174) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.30.0 to 10.31.0 [#2168](https://github.com/ghostery/adblocker/pull/2168) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.56.1 to 2.56.2 [#2151](https://github.com/ghostery/adblocker/pull/2151) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.8 to 13.1.9 [#2139](https://github.com/ghostery/adblocker/pull/2139) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.39 to 5.7.40 [#2135](https://github.com/ghostery/adblocker/pull/2135) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump concurrently from 6.2.0 to 6.2.1 [#2134](https://github.com/ghostery/adblocker/pull/2134) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 10.1.0 to 10.2.0 [#2133](https://github.com/ghostery/adblocker/pull/2133) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.56.0 to 2.56.1 [#2132](https://github.com/ghostery/adblocker/pull/2132) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.55.1 to 2.56.0 [#2123](https://github.com/ghostery/adblocker/pull/2123) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.38 to 5.7.39 [#2121](https://github.com/ghostery/adblocker/pull/2121) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-webextension-cosmetics`
  - Bump jsdom from 16.7.0 to 17.0.0 [#2175](https://github.com/ghostery/adblocker/pull/2175) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Bump puppeteer from 10.1.0 to 10.2.0 [#2116](https://github.com/ghostery/adblocker/pull/2116) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.153 to 0.0.154 [#2118](https://github.com/ghostery/adblocker/pull/2118) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Manish Jethani ([@mjethani](https://github.com/mjethani))
- Raymond Hill ([@gorhill](https://github.com/gorhill))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.22.4 (Wed Aug 04 2021)

#### :bug: Bug Fix

- Integrate @adguard/tsurlfilter [#2109](https://github.com/ghostery/adblocker/pull/2109) ([@mjethani](https://github.com/mjethani))

#### :house: Internal

- Update README.md with requirements [#2110](https://github.com/ghostery/adblocker/pull/2110) ([@mjethani](https://github.com/mjethani))
- Show memory usage [#2103](https://github.com/ghostery/adblocker/pull/2103) ([@mjethani](https://github.com/mjethani))
- Use bundle.min.cjs for adblockplus [#2101](https://github.com/ghostery/adblocker/pull/2101) ([@mjethani](https://github.com/mjethani))
- Switch to new @gorhill/ubo-core package [#2100](https://github.com/ghostery/adblocker/pull/2100) ([@mjethani](https://github.com/mjethani))
- Use ubo-snfe/bundle.min.cjs [#2095](https://github.com/ghostery/adblocker/pull/2095) ([@mjethani](https://github.com/mjethani))
- Use minified version of Cliqz [#2093](https://github.com/ghostery/adblocker/pull/2093) ([@mjethani](https://github.com/mjethani))
- Use lowercase name ubo-snfe [#2092](https://github.com/ghostery/adblocker/pull/2092) ([@mjethani](https://github.com/mjethani))
- Show initialization time [#2091](https://github.com/ghostery/adblocker/pull/2091) ([@mjethani](https://github.com/mjethani))
- Show human-friendly output [#2087](https://github.com/ghostery/adblocker/pull/2087) ([@mjethani](https://github.com/mjethani))
- Use ublock make targets [#2089](https://github.com/ghostery/adblocker/pull/2089) ([@mjethani](https://github.com/mjethani))
- Update adblockplus.js for more accuracy [#2086](https://github.com/ghostery/adblocker/pull/2086) ([@mjethani](https://github.com/mjethani))
- `@cliqz/adblocker`
  - Update local assets [#2102](https://github.com/ghostery/adblocker/pull/2102) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2094](https://github.com/ghostery/adblocker/pull/2094) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2088](https://github.com/ghostery/adblocker/pull/2088) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2082](https://github.com/ghostery/adblocker/pull/2082) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump tar from 4.4.13 to 4.4.15 [#2105](https://github.com/ghostery/adblocker/pull/2105) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.7 to 13.1.8 [#2106](https://github.com/ghostery/adblocker/pull/2106) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump jsdom from 16.6.0 to 16.7.0 [#2097](https://github.com/ghostery/adblocker/pull/2097) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump chalk from 4.1.1 to 4.1.2 [#2098](https://github.com/ghostery/adblocker/pull/2098) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.13.0 to 1.13.1 [#2084](https://github.com/ghostery/adblocker/pull/2084) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.55.0 to 2.55.1 [#2085](https://github.com/ghostery/adblocker/pull/2085) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.149 to 0.0.153 [#2107](https://github.com/ghostery/adblocker/pull/2107) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`
  - Bump @rollup/plugin-commonjs from 19.0.2 to 20.0.0 [#2099](https://github.com/ghostery/adblocker/pull/2099) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Manish Jethani ([@mjethani](https://github.com/mjethani))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.22.3 (Thu Jul 29 2021)

#### :bug: Bug Fix

- Add clean target to Makefile [#2081](https://github.com/ghostery/adblocker/pull/2081) ([@mjethani](https://github.com/mjethani))
- Use git submodules [#2080](https://github.com/ghostery/adblocker/pull/2080) ([@mjethani](https://github.com/mjethani))
- Use Node.js version of uBlock Origin [#2075](https://github.com/ghostery/adblocker/pull/2075) ([@mjethani](https://github.com/mjethani))

#### :house: Internal

- Fix brave.js to use FilterSet [#2047](https://github.com/ghostery/adblocker/pull/2047) ([@mjethani](https://github.com/mjethani))
- Update adblockpluscore to ebfc7b0 [#2046](https://github.com/ghostery/adblocker/pull/2046) ([@mjethani](https://github.com/mjethani))
- `@cliqz/adblocker`
  - Update local assets [#2077](https://github.com/ghostery/adblocker/pull/2077) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2067](https://github.com/ghostery/adblocker/pull/2067) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2056](https://github.com/ghostery/adblocker/pull/2056) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2050](https://github.com/ghostery/adblocker/pull/2050) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2048](https://github.com/ghostery/adblocker/pull/2048) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2026](https://github.com/ghostery/adblocker/pull/2026) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2013](https://github.com/ghostery/adblocker/pull/2013) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#2007](https://github.com/ghostery/adblocker/pull/2007) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1998](https://github.com/ghostery/adblocker/pull/1998) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump rollup from 2.53.3 to 2.55.0 [#2076](https://github.com/ghostery/adblocker/pull/2076) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.53.3 to 2.54.0 [#2068](https://github.com/ghostery/adblocker/pull/2068) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.2 to 13.0.4 [#2070](https://github.com/ghostery/adblocker/pull/2070) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.0.2 to 9.0.3 [#2071](https://github.com/ghostery/adblocker/pull/2071) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-commonjs from 19.0.1 to 19.0.2 [#2072](https://github.com/ghostery/adblocker/pull/2072) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump sinon from 11.1.1 to 11.1.2 [#2074](https://github.com/ghostery/adblocker/pull/2074) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.29.3 to 10.30.0 [#2063](https://github.com/ghostery/adblocker/pull/2063) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node-fetch from 2.5.11 to 2.5.12 [#2065](https://github.com/ghostery/adblocker/pull/2065) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.12.3 to 1.13.0 [#2061](https://github.com/ghostery/adblocker/pull/2061) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.53.2 to 2.53.3 [#2060](https://github.com/ghostery/adblocker/pull/2060) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-node-resolve from 13.0.0 to 13.0.2 [#2054](https://github.com/ghostery/adblocker/pull/2054) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.6 to 13.1.7 [#2053](https://github.com/ghostery/adblocker/pull/2053) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.53.1 to 2.53.2 [#2052](https://github.com/ghostery/adblocker/pull/2052) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-commonjs from 19.0.0 to 19.0.1 [#2051](https://github.com/ghostery/adblocker/pull/2051) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.52.7 to 2.53.1 [#2043](https://github.com/ghostery/adblocker/pull/2043) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ts-node from 10.0.0 to 10.1.0 [#2044](https://github.com/ghostery/adblocker/pull/2044) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/chai from 4.2.19 to 4.2.21 [#2041](https://github.com/ghostery/adblocker/pull/2041) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/firefox-webext-browser from 82.0.0 to 82.0.1 [#2040](https://github.com/ghostery/adblocker/pull/2040) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/mocha from 8.2.2 to 8.2.3 [#2036](https://github.com/ghostery/adblocker/pull/2036) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/benchmark from 2.1.0 to 2.1.1 [#2035](https://github.com/ghostery/adblocker/pull/2035) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/express from 4.17.12 to 4.17.13 [#2033](https://github.com/ghostery/adblocker/pull/2033) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node-fetch from 2.5.10 to 2.5.11 [#2032](https://github.com/ghostery/adblocker/pull/2032) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/jsdom from 16.2.12 to 16.2.13 [#2031](https://github.com/ghostery/adblocker/pull/2031) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.5 to 13.1.6 [#2030](https://github.com/ghostery/adblocker/pull/2030) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.0.1 to 9.0.2 [#2029](https://github.com/ghostery/adblocker/pull/2029) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.52.2 to 2.52.7 [#2024](https://github.com/ghostery/adblocker/pull/2024) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.3 to 13.1.5 [#2023](https://github.com/ghostery/adblocker/pull/2023) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.3.4 to 4.3.5 [#2022](https://github.com/ghostery/adblocker/pull/2022) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.12.2 to 1.12.3 [#2019](https://github.com/ghostery/adblocker/pull/2019) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.3.1 to 2.3.2 [#2017](https://github.com/ghostery/adblocker/pull/2017) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/jsdom from 16.2.11 to 16.2.12 [#2016](https://github.com/ghostery/adblocker/pull/2016) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.52.1 to 2.52.2 [#2011](https://github.com/ghostery/adblocker/pull/2011) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.2 to 13.1.3 [#2012](https://github.com/ghostery/adblocker/pull/2012) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/chai from 4.2.18 to 4.2.19 [#2010](https://github.com/ghostery/adblocker/pull/2010) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump mocha from 9.0.0 to 9.0.1 [#2008](https://github.com/ghostery/adblocker/pull/2008) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.51.1 to 2.52.1 [#2004](https://github.com/ghostery/adblocker/pull/2004) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump typescript from 4.3.2 to 4.3.4 [#2003](https://github.com/ghostery/adblocker/pull/2003) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.12.1 to 1.12.2 [#2000](https://github.com/ghostery/adblocker/pull/2000) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.148 to 0.0.149 [#2078](https://github.com/ghostery/adblocker/pull/2078) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.146 to 0.0.148 [#2058](https://github.com/ghostery/adblocker/pull/2058) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.145 to 0.0.146 [#2037](https://github.com/ghostery/adblocker/pull/2037) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Bump @types/mocha from 8.2.3 to 9.0.0 [#2062](https://github.com/ghostery/adblocker/pull/2062) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-webextension`
  - Bump webextension-polyfill-ts from 0.25.0 to 0.26.0 [#2027](https://github.com/ghostery/adblocker/pull/2027) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Bump puppeteer from 10.0.0 to 10.1.0 [#2020](https://github.com/ghostery/adblocker/pull/2020) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Manish Jethani ([@mjethani](https://github.com/mjethani))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.22.2 (Sun Jun 20 2021)

#### :bug: Bug Fix

- `@cliqz/adblocker-playwright`
  - Fix to executing promises in adblocker-playwright [#2006](https://github.com/ghostery/adblocker/pull/2006) ([@tommulkins](https://github.com/tommulkins))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1990](https://github.com/ghostery/adblocker/pull/1990) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1987](https://github.com/ghostery/adblocker/pull/1987) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1982](https://github.com/ghostery/adblocker/pull/1982) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1981](https://github.com/ghostery/adblocker/pull/1981) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1980](https://github.com/ghostery/adblocker/pull/1980) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump playwright from 1.11.1 to 1.12.1 [#1997](https://github.com/ghostery/adblocker/pull/1997) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.1 to 13.1.2 [#1996](https://github.com/ghostery/adblocker/pull/1996) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/jsdom from 16.2.10 to 16.2.11 [#1994](https://github.com/ghostery/adblocker/pull/1994) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.29.2 to 10.29.3 [#1993](https://github.com/ghostery/adblocker/pull/1993) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.51.0 to 2.51.1 [#1992](https://github.com/ghostery/adblocker/pull/1992) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.3.0 to 2.3.1 [#1986](https://github.com/ghostery/adblocker/pull/1986) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 13.1.0 to 13.1.1 [#1985](https://github.com/ghostery/adblocker/pull/1985) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.50.6 to 2.51.0 [#1984](https://github.com/ghostery/adblocker/pull/1984) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.50.5 to 2.50.6 [#1979](https://github.com/ghostery/adblocker/pull/1979) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.144 to 0.0.145 [#1995](https://github.com/ghostery/adblocker/pull/1995) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Bump mocha from 8.4.0 to 9.0.0 [#1989](https://github.com/ghostery/adblocker/pull/1989) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 4

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))
- Tom Mulkins ([@tommulkins](https://github.com/tommulkins))

---

# v1.22.1 (Thu Jun 03 2021)

#### :nail_care: Polish

- `@cliqz/adblocker-puppeteer`
  - Add puppeteer 10.x to list of supported versions [#1977](https://github.com/ghostery/adblocker/pull/1977) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1971](https://github.com/ghostery/adblocker/pull/1971) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1970](https://github.com/ghostery/adblocker/pull/1970) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1968](https://github.com/ghostery/adblocker/pull/1968) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump electron from 13.0.1 to 13.1.0 [#1975](https://github.com/ghostery/adblocker/pull/1975) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/sinon from 10.0.1 to 10.0.2 [#1973](https://github.com/ghostery/adblocker/pull/1973) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Bump puppeteer from 9.1.1 to 10.0.0 [#1969](https://github.com/ghostery/adblocker/pull/1969) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.143 to 0.0.144 [#1972](https://github.com/ghostery/adblocker/pull/1972) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.21.0 (Sun May 30 2021)

#### :rocket: New Feature

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Bump Electron to v13.x and Puppeteer to v9.x [#1967](https://github.com/ghostery/adblocker/pull/1967) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- Add CODEOWNERS [#1919](https://github.com/ghostery/adblocker/pull/1919) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Add auto-merge for dependabot [#1914](https://github.com/ghostery/adblocker/pull/1914) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#1945](https://github.com/ghostery/adblocker/pull/1945) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1943](https://github.com/ghostery/adblocker/pull/1943) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1933](https://github.com/ghostery/adblocker/pull/1933) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1929](https://github.com/ghostery/adblocker/pull/1929) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1926](https://github.com/ghostery/adblocker/pull/1926) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1923](https://github.com/ghostery/adblocker/pull/1923) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1907](https://github.com/ghostery/adblocker/pull/1907) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Bump lock file to fix some security issue [#1922](https://github.com/ghostery/adblocker/pull/1922) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- Bump tldts-experimental from 5.7.35 to 5.7.36 [#1938](https://github.com/ghostery/adblocker/pull/1938) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 11.4.6 to 11.4.7 [#1937](https://github.com/ghostery/adblocker/pull/1937) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.0.3 to 15.3.0 [#1936](https://github.com/ghostery/adblocker/pull/1936) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.47.0 to 2.48.0 [#1934](https://github.com/ghostery/adblocker/pull/1934) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.34 to 5.7.35 [#1931](https://github.com/ghostery/adblocker/pull/1931) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.0.2 to 15.0.3 [#1932](https://github.com/ghostery/adblocker/pull/1932) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump auto from 10.27.0 to 10.27.1 [#1930](https://github.com/ghostery/adblocker/pull/1930) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump playwright from 1.10.0 to 1.11.0 [#1928](https://github.com/ghostery/adblocker/pull/1928) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump prettier from 2.2.1 to 2.3.0 [#1924](https://github.com/ghostery/adblocker/pull/1924) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 11.4.4 to 11.4.6 [#1921](https://github.com/ghostery/adblocker/pull/1921) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump hosted-git-info from 2.8.8 to 2.8.9 [#1920](https://github.com/ghostery/adblocker/pull/1920) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump handlebars from 4.7.6 to 4.7.7 [#1917](https://github.com/ghostery/adblocker/pull/1917) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tldts-experimental from 5.7.33 to 5.7.34 [#1916](https://github.com/ghostery/adblocker/pull/1916) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump electron from 11.4.4 to 11.4.5 [#1913](https://github.com/ghostery/adblocker/pull/1913) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 2.46.0 to 2.47.0 [#1910](https://github.com/ghostery/adblocker/pull/1910) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @rollup/plugin-commonjs from 18.0.0 to 18.1.0 [#1909](https://github.com/ghostery/adblocker/pull/1909) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @types/node from 15.0.1 to 15.0.2 [#1908](https://github.com/ghostery/adblocker/pull/1908) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - Bump @types/chrome from 0.0.139 to 0.0.141 [#1939](https://github.com/ghostery/adblocker/pull/1939) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.138 to 0.0.139 [#1927](https://github.com/ghostery/adblocker/pull/1927) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.137 to 0.0.138 [#1925](https://github.com/ghostery/adblocker/pull/1925) ([@dependabot[bot]](https://github.com/dependabot[bot]))
  - Bump @types/chrome from 0.0.136 to 0.0.137 [#1911](https://github.com/ghostery/adblocker/pull/1911) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Bump @rollup/plugin-node-resolve from 11.2.1 to 13.0.0 [#1912](https://github.com/ghostery/adblocker/pull/1912) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@cliqz/adblocker-puppeteer`
  - Bump puppeteer from 9.1.0 to 9.1.1 [#1915](https://github.com/ghostery/adblocker/pull/1915) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.5 (Tue May 04 2021)

#### :bug: Bug Fix

- `@cliqz/adblocker-puppeteer`
  - Fix missing 'domcontentloaded' event listener removal from `disableBlockingInPage` [#1903](https://github.com/ghostery/adblocker/pull/1903) (mosunov.konstantin@huawei.com [@kmosunoff](https://github.com/kmosunoff))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1886](https://github.com/ghostery/adblocker/pull/1886) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1884](https://github.com/ghostery/adblocker/pull/1884) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1882](https://github.com/ghostery/adblocker/pull/1882) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1880](https://github.com/ghostery/adblocker/pull/1880) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1872](https://github.com/ghostery/adblocker/pull/1872) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1868](https://github.com/ghostery/adblocker/pull/1868) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1866](https://github.com/ghostery/adblocker/pull/1866) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1862](https://github.com/ghostery/adblocker/pull/1862) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1861](https://github.com/ghostery/adblocker/pull/1861) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1859](https://github.com/ghostery/adblocker/pull/1859) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1857](https://github.com/ghostery/adblocker/pull/1857) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1853](https://github.com/ghostery/adblocker/pull/1853) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1850](https://github.com/ghostery/adblocker/pull/1850) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1847](https://github.com/ghostery/adblocker/pull/1847) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1845](https://github.com/ghostery/adblocker/pull/1845) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1843](https://github.com/ghostery/adblocker/pull/1843) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1836](https://github.com/ghostery/adblocker/pull/1836) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1830](https://github.com/ghostery/adblocker/pull/1830) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1829](https://github.com/ghostery/adblocker/pull/1829) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1827](https://github.com/ghostery/adblocker/pull/1827) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1824](https://github.com/ghostery/adblocker/pull/1824) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1822](https://github.com/ghostery/adblocker/pull/1822) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1818](https://github.com/ghostery/adblocker/pull/1818) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1813](https://github.com/ghostery/adblocker/pull/1813) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1807](https://github.com/ghostery/adblocker/pull/1807) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- Bump @types/node from 15.0.0 to 15.0.1 [#1905](https://github.com/ghostery/adblocker/pull/1905) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Upgrade to GitHub-native Dependabot [#1898](https://github.com/ghostery/adblocker/pull/1898) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.26.0 to 10.26.1 [#1904](https://github.com/ghostery/adblocker/pull/1904) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.32 to 5.7.33 [#1900](https://github.com/ghostery/adblocker/pull/1900) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.45.2 to 2.46.0 [#1897](https://github.com/ghostery/adblocker/pull/1897) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.25.2 to 10.26.0 [#1896](https://github.com/ghostery/adblocker/pull/1896) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.31 to 5.7.32 [#1895](https://github.com/ghostery/adblocker/pull/1895) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.4.3 to 11.4.4 [#1894](https://github.com/ghostery/adblocker/pull/1894) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.29 to 5.7.31 [#1891](https://github.com/ghostery/adblocker/pull/1891) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.25.1 to 10.25.2 [#1892](https://github.com/ghostery/adblocker/pull/1892) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.29 to 5.7.30 [#1889](https://github.com/ghostery/adblocker/pull/1889) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/chai from 4.2.16 to 4.2.17 [#1887](https://github.com/ghostery/adblocker/pull/1887) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.28 to 5.7.29 [#1883](https://github.com/ghostery/adblocker/pull/1883) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.25.0 to 10.25.1 [#1877](https://github.com/ghostery/adblocker/pull/1877) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.27 to 5.7.28 [#1881](https://github.com/ghostery/adblocker/pull/1881) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.39 to 14.14.41 [#1879](https://github.com/ghostery/adblocker/pull/1879) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.4.2 to 11.4.3 [#1867](https://github.com/ghostery/adblocker/pull/1867) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump chalk from 4.1.0 to 4.1.1 [#1878](https://github.com/ghostery/adblocker/pull/1878) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.25 to 5.7.27 [#1874](https://github.com/ghostery/adblocker/pull/1874) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.37 to 14.14.39 [#1869](https://github.com/ghostery/adblocker/pull/1869) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.24.3 to 10.25.0 [#1865](https://github.com/ghostery/adblocker/pull/1865) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.45.1 to 2.45.2 [#1864](https://github.com/ghostery/adblocker/pull/1864) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump concurrently from 6.0.1 to 6.0.2 [#1863](https://github.com/ghostery/adblocker/pull/1863) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump jsdom from 16.5.2 to 16.5.3 [#1860](https://github.com/ghostery/adblocker/pull/1860) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.45.0 to 2.45.1 [#1858](https://github.com/ghostery/adblocker/pull/1858) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.44.0 to 2.45.0 [#1856](https://github.com/ghostery/adblocker/pull/1856) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.24.2 to 10.24.3 [#1855](https://github.com/ghostery/adblocker/pull/1855) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.24.1 to 10.24.2 [#1854](https://github.com/ghostery/adblocker/pull/1854) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node-fetch from 2.5.9 to 2.5.10 [#1851](https://github.com/ghostery/adblocker/pull/1851) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 4.2.3 to 4.2.4 [#1849](https://github.com/ghostery/adblocker/pull/1849) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.24 to 5.7.25 [#1848](https://github.com/ghostery/adblocker/pull/1848) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump concurrently from 6.0.0 to 6.0.1 [#1846](https://github.com/ghostery/adblocker/pull/1846) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.23 to 5.7.24 [#1844](https://github.com/ghostery/adblocker/pull/1844) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.22 to 5.7.23 [#1841](https://github.com/ghostery/adblocker/pull/1841) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.4.1 to 11.4.2 [#1837](https://github.com/ghostery/adblocker/pull/1837) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/jsdom from 16.2.9 to 16.2.10 [#1835](https://github.com/ghostery/adblocker/pull/1835) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/chai from 4.2.15 to 4.2.16 [#1834](https://github.com/ghostery/adblocker/pull/1834) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node-fetch from 2.5.8 to 2.5.9 [#1833](https://github.com/ghostery/adblocker/pull/1833) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.21 to 5.7.22 [#1832](https://github.com/ghostery/adblocker/pull/1832) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.20 to 5.7.21 [#1831](https://github.com/ghostery/adblocker/pull/1831) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.19 to 5.7.20 [#1828](https://github.com/ghostery/adblocker/pull/1828) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.24.0 to 10.24.1 [#1826](https://github.com/ghostery/adblocker/pull/1826) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.23.0 to 10.24.0 [#1825](https://github.com/ghostery/adblocker/pull/1825) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.43.1 to 2.44.0 [#1823](https://github.com/ghostery/adblocker/pull/1823) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.18 to 5.7.19 [#1821](https://github.com/ghostery/adblocker/pull/1821) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump jsdom from 16.5.1 to 16.5.2 [#1820](https://github.com/ghostery/adblocker/pull/1820) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/jsdom from 16.2.8 to 16.2.9 [#1817](https://github.com/ghostery/adblocker/pull/1817) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.43.0 to 2.43.1 [#1819](https://github.com/ghostery/adblocker/pull/1819) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.42.4 to 2.43.0 [#1816](https://github.com/ghostery/adblocker/pull/1816) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.36 to 14.14.37 [#1815](https://github.com/ghostery/adblocker/pull/1815) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.22.1 to 10.23.0 [#1814](https://github.com/ghostery/adblocker/pull/1814) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 11.2.0 to 11.2.1 [#1811](https://github.com/ghostery/adblocker/pull/1811) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/jsdom from 16.2.7 to 16.2.8 [#1810](https://github.com/ghostery/adblocker/pull/1810) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.17 to 5.7.18 [#1808](https://github.com/ghostery/adblocker/pull/1808) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.35 to 14.14.36 [#1806](https://github.com/ghostery/adblocker/pull/1806) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-puppeteer`
  - build(deps): bump puppeteer from 9.0.0 to 9.1.0 [#1902](https://github.com/ghostery/adblocker/pull/1902) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump puppeteer from 8.0.0 to 9.0.0 [#1875](https://github.com/ghostery/adblocker/pull/1875) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.135 to 0.0.136 [#1899](https://github.com/ghostery/adblocker/pull/1899) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump @types/chrome from 0.0.134 to 0.0.135 [#1876](https://github.com/ghostery/adblocker/pull/1876) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump @types/chrome from 0.0.133 to 0.0.134 [#1838](https://github.com/ghostery/adblocker/pull/1838) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker`
  - build(deps-dev): bump @types/node from 14.14.41 to 15.0.0 [#1888](https://github.com/ghostery/adblocker/pull/1888) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - build(deps-dev): bump @types/sinon from 9.0.11 to 10.0.0 [#1870](https://github.com/ghostery/adblocker/pull/1870) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`
  - build(deps-dev): bump @rollup/plugin-commonjs from 17.1.0 to 18.0.0 [#1812](https://github.com/ghostery/adblocker/pull/1812) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 6

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@kmosunoff](https://github.com/kmosunoff)
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Konstantin Mosunov (mosunov.konstantin@huawei.com)
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.4 (Thu Mar 25 2021)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Fix request partiness identification when type is main_frame [#1805](https://github.com/ghostery/adblocker/pull/1805) ([@eugenioemmolo](https://github.com/eugenioemmolo))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1803](https://github.com/ghostery/adblocker/pull/1803) ([@cliqz-oss](https://github.com/cliqz-oss) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1800](https://github.com/ghostery/adblocker/pull/1800) ([@cliqz-oss](https://github.com/cliqz-oss) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1787](https://github.com/ghostery/adblocker/pull/1787) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1775](https://github.com/ghostery/adblocker/pull/1775) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1753](https://github.com/ghostery/adblocker/pull/1753) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1750](https://github.com/ghostery/adblocker/pull/1750) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1748](https://github.com/ghostery/adblocker/pull/1748) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1743](https://github.com/ghostery/adblocker/pull/1743) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1727](https://github.com/ghostery/adblocker/pull/1727) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1722](https://github.com/ghostery/adblocker/pull/1722) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1720](https://github.com/ghostery/adblocker/pull/1720) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1719](https://github.com/ghostery/adblocker/pull/1719) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump playwright from 1.9.2 to 1.10.0 [#1804](https://github.com/ghostery/adblocker/pull/1804) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.42.3 to 2.42.4 [#1802](https://github.com/ghostery/adblocker/pull/1802) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.22.0 to 10.22.1 [#1801](https://github.com/ghostery/adblocker/pull/1801) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.4.0 to 11.4.1 [#1799](https://github.com/ghostery/adblocker/pull/1799) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump sinon-chai from 3.5.0 to 3.6.0 [#1798](https://github.com/ghostery/adblocker/pull/1798) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.3.0 to 11.4.0 [#1796](https://github.com/ghostery/adblocker/pull/1796) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.21.3 to 10.22.0 [#1795](https://github.com/ghostery/adblocker/pull/1795) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.16 to 5.7.17 [#1794](https://github.com/ghostery/adblocker/pull/1794) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.21.2 to 10.21.3 [#1793](https://github.com/ghostery/adblocker/pull/1793) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.21.1 to 10.21.2 [#1792](https://github.com/ghostery/adblocker/pull/1792) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.21.0 to 10.21.1 [#1791](https://github.com/ghostery/adblocker/pull/1791) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.42.2 to 2.42.3 [#1789](https://github.com/ghostery/adblocker/pull/1789) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.42.1 to 2.42.2 [#1788](https://github.com/ghostery/adblocker/pull/1788) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.42.0 to 2.42.1 [#1785](https://github.com/ghostery/adblocker/pull/1785) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/mocha from 8.2.1 to 8.2.2 [#1784](https://github.com/ghostery/adblocker/pull/1784) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.20.6 to 10.21.0 [#1783](https://github.com/ghostery/adblocker/pull/1783) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.41.5 to 2.42.0 [#1782](https://github.com/ghostery/adblocker/pull/1782) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.20.5 to 10.20.6 [#1781](https://github.com/ghostery/adblocker/pull/1781) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.20.4 to 10.20.5 [#1780](https://github.com/ghostery/adblocker/pull/1780) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.41.4 to 2.41.5 [#1779](https://github.com/ghostery/adblocker/pull/1779) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.15 to 5.7.16 [#1778](https://github.com/ghostery/adblocker/pull/1778) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.41.3 to 2.41.4 [#1777](https://github.com/ghostery/adblocker/pull/1777) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.41.2 to 2.41.3 [#1776](https://github.com/ghostery/adblocker/pull/1776) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.20.3 to 10.20.4 [#1774](https://github.com/ghostery/adblocker/pull/1774) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.34 to 14.14.35 [#1773](https://github.com/ghostery/adblocker/pull/1773) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.20.2 to 10.20.3 [#1772](https://github.com/ghostery/adblocker/pull/1772) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.20.1 to 10.20.2 [#1771](https://github.com/ghostery/adblocker/pull/1771) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.14 to 5.7.15 [#1770](https://github.com/ghostery/adblocker/pull/1770) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.20.0 to 10.20.1 [#1769](https://github.com/ghostery/adblocker/pull/1769) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.19.0 to 10.20.0 [#1768](https://github.com/ghostery/adblocker/pull/1768) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.9 to 10.19.0 [#1767](https://github.com/ghostery/adblocker/pull/1767) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.13 to 5.7.14 [#1766](https://github.com/ghostery/adblocker/pull/1766) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.8 to 10.18.9 [#1765](https://github.com/ghostery/adblocker/pull/1765) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump jsdom from 16.5.0 to 16.5.1 [#1764](https://github.com/ghostery/adblocker/pull/1764) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.7 to 10.18.8 [#1763](https://github.com/ghostery/adblocker/pull/1763) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump chai from 4.3.3 to 4.3.4 [#1761](https://github.com/ghostery/adblocker/pull/1761) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.41.1 to 2.41.2 [#1760](https://github.com/ghostery/adblocker/pull/1760) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.33 to 14.14.34 [#1759](https://github.com/ghostery/adblocker/pull/1759) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.3.1 to 8.3.2 [#1757](https://github.com/ghostery/adblocker/pull/1757) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.6 to 10.18.7 [#1756](https://github.com/ghostery/adblocker/pull/1756) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.5 to 10.18.6 [#1755](https://github.com/ghostery/adblocker/pull/1755) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.4 to 10.18.5 [#1754](https://github.com/ghostery/adblocker/pull/1754) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.41.0 to 2.41.1 [#1752](https://github.com/ghostery/adblocker/pull/1752) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.12 to 5.7.13 [#1751](https://github.com/ghostery/adblocker/pull/1751) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.9.1 to 1.9.2 [#1749](https://github.com/ghostery/adblocker/pull/1749) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.3 to 10.18.4 [#1747](https://github.com/ghostery/adblocker/pull/1747) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/jsdom from 16.2.6 to 16.2.7 [#1746](https://github.com/ghostery/adblocker/pull/1746) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.32 to 14.14.33 [#1745](https://github.com/ghostery/adblocker/pull/1745) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.40.0 to 2.41.0 [#1744](https://github.com/ghostery/adblocker/pull/1744) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump jsdom from 16.4.0 to 16.5.0 [#1742](https://github.com/ghostery/adblocker/pull/1742) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.10 to 9.0.11 [#1741](https://github.com/ghostery/adblocker/pull/1741) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.31 to 14.14.32 [#1740](https://github.com/ghostery/adblocker/pull/1740) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.11 to 5.7.12 [#1738](https://github.com/ghostery/adblocker/pull/1738) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.3.0 to 8.3.1 [#1737](https://github.com/ghostery/adblocker/pull/1737) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 4.2.2 to 4.2.3 [#1736](https://github.com/ghostery/adblocker/pull/1736) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.2 to 10.18.3 [#1735](https://github.com/ghostery/adblocker/pull/1735) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.10 to 5.7.11 [#1734](https://github.com/ghostery/adblocker/pull/1734) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.1 to 10.18.2 [#1733](https://github.com/ghostery/adblocker/pull/1733) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump chai from 4.3.1 to 4.3.3 [#1732](https://github.com/ghostery/adblocker/pull/1732) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.18.0 to 10.18.1 [#1729](https://github.com/ghostery/adblocker/pull/1729) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.17.1 to 10.18.0 [#1728](https://github.com/ghostery/adblocker/pull/1728) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.17.0 to 10.17.1 [#1726](https://github.com/ghostery/adblocker/pull/1726) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump lerna from 3.22.1 to 4.0.0 [#1725](https://github.com/ghostery/adblocker/pull/1725) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.8 to 10.17.0 [#1724](https://github.com/ghostery/adblocker/pull/1724) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump chai from 4.3.0 to 4.3.1 [#1723](https://github.com/ghostery/adblocker/pull/1723) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - build(deps-dev): bump sinon from 9.2.4 to 10.0.0 [#1790](https://github.com/ghostery/adblocker/pull/1790) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 5

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@eugenioemmolo](https://github.com/eugenioemmolo)
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Cliqz Open Source ([@cliqz-oss](https://github.com/cliqz-oss))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.3 (Sat Feb 27 2021)

#### :nail_care: Polish

- `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker`
  - Add support for Puppeteer v8.x [#1716](https://github.com/ghostery/adblocker/pull/1716) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1718](https://github.com/ghostery/adblocker/pull/1718) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1712](https://github.com/ghostery/adblocker/pull/1712) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1708](https://github.com/ghostery/adblocker/pull/1708) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1702](https://github.com/ghostery/adblocker/pull/1702) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1700](https://github.com/ghostery/adblocker/pull/1700) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Fix updater [#1699](https://github.com/ghostery/adblocker/pull/1699) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker-benchmarks`, `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Update copyright notices [#1715](https://github.com/ghostery/adblocker/pull/1715) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump rollup from 2.39.1 to 2.40.0 [#1717](https://github.com/ghostery/adblocker/pull/1717) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump got from 11.8.1 to 11.8.2 [#1714](https://github.com/ghostery/adblocker/pull/1714) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.9.0 to 1.9.1 [#1711](https://github.com/ghostery/adblocker/pull/1711) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.7 to 10.16.8 [#1710](https://github.com/ghostery/adblocker/pull/1710) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.9 to 5.7.10 [#1709](https://github.com/ghostery/adblocker/pull/1709) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.8.1 to 1.9.0 [#1707](https://github.com/ghostery/adblocker/pull/1707) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 4.1.5 to 4.2.2 [#1706](https://github.com/ghostery/adblocker/pull/1706) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.39.0 to 2.39.1 [#1704](https://github.com/ghostery/adblocker/pull/1704) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.8 to 5.7.9 [#1701](https://github.com/ghostery/adblocker/pull/1701) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.6 to 10.16.7 [#1698](https://github.com/ghostery/adblocker/pull/1698) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.2.3 to 11.3.0 [#1696](https://github.com/ghostery/adblocker/pull/1696) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.30 to 14.14.31 [#1695](https://github.com/ghostery/adblocker/pull/1695) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.29 to 14.14.30 [#1693](https://github.com/ghostery/adblocker/pull/1693) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.28 to 14.14.29 [#1692](https://github.com/ghostery/adblocker/pull/1692) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.7 to 5.7.8 [#1691](https://github.com/ghostery/adblocker/pull/1691) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.5 to 10.16.6 [#1690](https://github.com/ghostery/adblocker/pull/1690) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-puppeteer-example`, `@cliqz/adblocker-puppeteer`
  - build(deps): bump puppeteer from 7.1.0 to 8.0.0 [#1713](https://github.com/ghostery/adblocker/pull/1713) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.132 to 0.0.133 [#1703](https://github.com/ghostery/adblocker/pull/1703) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump @types/chrome from 0.0.131 to 0.0.132 [#1694](https://github.com/ghostery/adblocker/pull/1694) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump @types/chrome from 0.0.130 to 0.0.131 [#1689](https://github.com/ghostery/adblocker/pull/1689) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker`
  - build(deps-dev): bump concurrently from 5.3.0 to 6.0.0 [#1697](https://github.com/ghostery/adblocker/pull/1697) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.2 (Thu Feb 18 2021)

#### :bug: Bug Fix

- `@cliqz/adblocker-content`
  - Fix puppeteer regression when handling DOM mutations [#1688](https://github.com/ghostery/adblocker/pull/1688) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1687](https://github.com/ghostery/adblocker/pull/1687) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1684](https://github.com/ghostery/adblocker/pull/1684) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @types/mocha from 8.2.0 to 8.2.1 [#1686](https://github.com/ghostery/adblocker/pull/1686) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.6 to 5.7.7 [#1685](https://github.com/ghostery/adblocker/pull/1685) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.1 (Tue Feb 16 2021)

#### :nail_care: Polish

- `@cliqz/adblocker-puppeteer-example`, `@cliqz/adblocker-puppeteer`
  - Update puppeteer to v7.x [#1677](https://github.com/ghostery/adblocker/pull/1677) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1679](https://github.com/ghostery/adblocker/pull/1679) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1676](https://github.com/ghostery/adblocker/pull/1676) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1666](https://github.com/ghostery/adblocker/pull/1666) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1659](https://github.com/ghostery/adblocker/pull/1659) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1656](https://github.com/ghostery/adblocker/pull/1656) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1654](https://github.com/ghostery/adblocker/pull/1654) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1653](https://github.com/ghostery/adblocker/pull/1653) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1652](https://github.com/ghostery/adblocker/pull/1652) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1650](https://github.com/ghostery/adblocker/pull/1650) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1647](https://github.com/ghostery/adblocker/pull/1647) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1637](https://github.com/ghostery/adblocker/pull/1637) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1635](https://github.com/ghostery/adblocker/pull/1635) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1632](https://github.com/ghostery/adblocker/pull/1632) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1630](https://github.com/ghostery/adblocker/pull/1630) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1627](https://github.com/ghostery/adblocker/pull/1627) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1626](https://github.com/ghostery/adblocker/pull/1626) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1622](https://github.com/ghostery/adblocker/pull/1622) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1618](https://github.com/ghostery/adblocker/pull/1618) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1616](https://github.com/ghostery/adblocker/pull/1616) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1614](https://github.com/ghostery/adblocker/pull/1614) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1609](https://github.com/ghostery/adblocker/pull/1609) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1606](https://github.com/ghostery/adblocker/pull/1606) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1599](https://github.com/ghostery/adblocker/pull/1599) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @types/node from 14.14.27 to 14.14.28 [#1682](https://github.com/ghostery/adblocker/pull/1682) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 11.1.1 to 11.2.0 [#1680](https://github.com/ghostery/adblocker/pull/1680) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.5 to 5.7.6 [#1678](https://github.com/ghostery/adblocker/pull/1678) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.38.5 to 2.39.0 [#1675](https://github.com/ghostery/adblocker/pull/1675) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.26 to 14.14.27 [#1673](https://github.com/ghostery/adblocker/pull/1673) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.4 to 10.16.5 [#1672](https://github.com/ghostery/adblocker/pull/1672) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.3 to 10.16.4 [#1670](https://github.com/ghostery/adblocker/pull/1670) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.4 to 5.7.5 [#1669](https://github.com/ghostery/adblocker/pull/1669) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.2 to 10.16.3 [#1668](https://github.com/ghostery/adblocker/pull/1668) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.25 to 14.14.26 [#1667](https://github.com/ghostery/adblocker/pull/1667) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.1 to 10.16.2 [#1665](https://github.com/ghostery/adblocker/pull/1665) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.2.1 to 8.3.0 [#1664](https://github.com/ghostery/adblocker/pull/1664) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.16.0 to 10.16.1 [#1663](https://github.com/ghostery/adblocker/pull/1663) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.3 to 5.7.4 [#1662](https://github.com/ghostery/adblocker/pull/1662) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.8.0 to 1.8.1 [#1661](https://github.com/ghostery/adblocker/pull/1661) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 4.1.4 to 4.1.5 [#1660](https://github.com/ghostery/adblocker/pull/1660) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/chai from 4.2.14 to 4.2.15 [#1658](https://github.com/ghostery/adblocker/pull/1658) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.2 to 5.7.3 [#1657](https://github.com/ghostery/adblocker/pull/1657) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 4.1.3 to 4.1.4 [#1655](https://github.com/ghostery/adblocker/pull/1655) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.2.2 to 11.2.3 [#1651](https://github.com/ghostery/adblocker/pull/1651) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.38.4 to 2.38.5 [#1649](https://github.com/ghostery/adblocker/pull/1649) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.15.0 to 10.16.0 [#1648](https://github.com/ghostery/adblocker/pull/1648) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump chai from 4.2.0 to 4.3.0 [#1646](https://github.com/ghostery/adblocker/pull/1646) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.24 to 14.14.25 [#1645](https://github.com/ghostery/adblocker/pull/1645) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.14.2 to 10.15.0 [#1644](https://github.com/ghostery/adblocker/pull/1644) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.14.1 to 10.14.2 [#1643](https://github.com/ghostery/adblocker/pull/1643) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.14.0 to 10.14.1 [#1642](https://github.com/ghostery/adblocker/pull/1642) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/puppeteer from 5.4.2 to 5.4.3 [#1641](https://github.com/ghostery/adblocker/pull/1641) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.23 to 14.14.24 [#1640](https://github.com/ghostery/adblocker/pull/1640) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.22 to 14.14.23 [#1639](https://github.com/ghostery/adblocker/pull/1639) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.13.4 to 10.14.0 [#1638](https://github.com/ghostery/adblocker/pull/1638) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.2.1 to 11.2.2 [#1636](https://github.com/ghostery/adblocker/pull/1636) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.38.3 to 2.38.4 [#1634](https://github.com/ghostery/adblocker/pull/1634) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.13.3 to 10.13.4 [#1633](https://github.com/ghostery/adblocker/pull/1633) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.38.2 to 2.38.3 [#1631](https://github.com/ghostery/adblocker/pull/1631) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.38.1 to 2.38.2 [#1628](https://github.com/ghostery/adblocker/pull/1628) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-commonjs from 17.0.0 to 17.1.0 [#1625](https://github.com/ghostery/adblocker/pull/1625) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 11.1.0 to 11.1.1 [#1624](https://github.com/ghostery/adblocker/pull/1624) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.1 to 5.7.2 [#1623](https://github.com/ghostery/adblocker/pull/1623) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.13.2 to 10.13.3 [#1620](https://github.com/ghostery/adblocker/pull/1620) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.38.0 to 2.38.1 [#1619](https://github.com/ghostery/adblocker/pull/1619) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.13.1 to 10.13.2 [#1615](https://github.com/ghostery/adblocker/pull/1615) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.7.0 to 5.7.1 [#1613](https://github.com/ghostery/adblocker/pull/1613) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.13.0 to 10.13.1 [#1612](https://github.com/ghostery/adblocker/pull/1612) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.12.2 to 10.13.0 [#1611](https://github.com/ghostery/adblocker/pull/1611) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump sinon from 9.2.3 to 9.2.4 [#1608](https://github.com/ghostery/adblocker/pull/1608) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.2.0 to 11.2.1 [#1607](https://github.com/ghostery/adblocker/pull/1607) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.37.1 to 2.38.0 [#1605](https://github.com/ghostery/adblocker/pull/1605) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.85 to 5.7.0 [#1604](https://github.com/ghostery/adblocker/pull/1604) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.84 to 5.6.85 [#1603](https://github.com/ghostery/adblocker/pull/1603) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.12.1 to 10.12.2 [#1602](https://github.com/ghostery/adblocker/pull/1602) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.12.0 to 10.12.1 [#1601](https://github.com/ghostery/adblocker/pull/1601) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.11.0 to 10.12.0 [#1600](https://github.com/ghostery/adblocker/pull/1600) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.24.0 to 0.25.0 [#1681](https://github.com/ghostery/adblocker/pull/1681) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump webextension-polyfill-ts from 0.22.0 to 0.24.0 [#1629](https://github.com/ghostery/adblocker/pull/1629) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.129 to 0.0.130 [#1671](https://github.com/ghostery/adblocker/pull/1671) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump @types/chrome from 0.0.128 to 0.0.129 [#1621](https://github.com/ghostery/adblocker/pull/1621) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.20.0 (Thu Jan 21 2021)

### Release Notes

#### Initial support for extended CSS selectors (a.k.a. procedural filters) ([#1574](https://github.com/ghostery/adblocker/pull/1574))

Add initial support for extended CSS selectors (a.k.a. procedural filters) as well as the `:remove()` modifier for element hiding rules (note: the already supported `:style` modified now also works with extended CSS selectors). The following new pseudo-classes are implemented: `:has` (and its alias `:if`), `:has-text` (both string and RegExp literals), and `:not` (whenever its argument is also an extended selector, otherwise fallback to native implementation).

Caveats:
* Loading of extended css filters is disabled by default and needs to be toggled using the `loadExtendedSelectors` option while [initializing the blocker instance](https://github.com/ghostery/adblocker/blob/3361723138f40c3cb96b4c6e611f2b030f75d891/packages/adblocker-webextension-example/background.ts#L61).
* These news selectors are currently only supported by `WebExtensionBlocker` (support for Puppeteer, Electron and Playwright is not planned at this time but help from the community would be greatly appreciated).

Miscellaneous changes:
* Removal of unused `injectCSSRule` helper.
* Replace Closure compiler by Terser.

---

#### :rocket: New Feature

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-extended-selectors`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Initial support for extended CSS selectors (a.k.a. procedural filters) [#1574](https://github.com/ghostery/adblocker/pull/1574) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1597](https://github.com/ghostery/adblocker/pull/1597) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1593](https://github.com/ghostery/adblocker/pull/1593) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1589](https://github.com/ghostery/adblocker/pull/1589) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1588](https://github.com/ghostery/adblocker/pull/1588) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1587](https://github.com/ghostery/adblocker/pull/1587) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1584](https://github.com/ghostery/adblocker/pull/1584) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1578](https://github.com/ghostery/adblocker/pull/1578) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1575](https://github.com/ghostery/adblocker/pull/1575) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1571](https://github.com/ghostery/adblocker/pull/1571) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1568](https://github.com/ghostery/adblocker/pull/1568) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1566](https://github.com/ghostery/adblocker/pull/1566) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1565](https://github.com/ghostery/adblocker/pull/1565) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1562](https://github.com/ghostery/adblocker/pull/1562) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1560](https://github.com/ghostery/adblocker/pull/1560) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1559](https://github.com/ghostery/adblocker/pull/1559) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1556](https://github.com/ghostery/adblocker/pull/1556) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1553](https://github.com/ghostery/adblocker/pull/1553) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1552](https://github.com/ghostery/adblocker/pull/1552) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1551](https://github.com/ghostery/adblocker/pull/1551) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1548](https://github.com/ghostery/adblocker/pull/1548) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1546](https://github.com/ghostery/adblocker/pull/1546) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1545](https://github.com/ghostery/adblocker/pull/1545) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1544](https://github.com/ghostery/adblocker/pull/1544) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1543](https://github.com/ghostery/adblocker/pull/1543) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1542](https://github.com/ghostery/adblocker/pull/1542) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1541](https://github.com/ghostery/adblocker/pull/1541) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1539](https://github.com/ghostery/adblocker/pull/1539) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1536](https://github.com/ghostery/adblocker/pull/1536) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1531](https://github.com/ghostery/adblocker/pull/1531) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1530](https://github.com/ghostery/adblocker/pull/1530) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1528](https://github.com/ghostery/adblocker/pull/1528) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1526](https://github.com/ghostery/adblocker/pull/1526) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1524](https://github.com/ghostery/adblocker/pull/1524) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump playwright from 1.7.1 to 1.8.0 [#1598](https://github.com/ghostery/adblocker/pull/1598) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.37.0 to 2.37.1 [#1596](https://github.com/ghostery/adblocker/pull/1596) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.10.1 to 10.11.0 [#1595](https://github.com/ghostery/adblocker/pull/1595) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.21 to 14.14.22 [#1594](https://github.com/ghostery/adblocker/pull/1594) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.10.0 to 10.10.1 [#1592](https://github.com/ghostery/adblocker/pull/1592) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.83 to 5.6.84 [#1591](https://github.com/ghostery/adblocker/pull/1591) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.36.2 to 2.37.0 [#1590](https://github.com/ghostery/adblocker/pull/1590) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.9.1 to 10.10.0 [#1586](https://github.com/ghostery/adblocker/pull/1586) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.36.1 to 2.36.2 [#1585](https://github.com/ghostery/adblocker/pull/1585) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 11.0.1 to 11.1.0 [#1583](https://github.com/ghostery/adblocker/pull/1583) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.82 to 5.6.83 [#1582](https://github.com/ghostery/adblocker/pull/1582) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.7.0 to 10.9.1 [#1581](https://github.com/ghostery/adblocker/pull/1581) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node-fetch from 2.5.7 to 2.5.8 [#1580](https://github.com/ghostery/adblocker/pull/1580) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.20 to 14.14.21 [#1579](https://github.com/ghostery/adblocker/pull/1579) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.6.2 to 10.7.0 [#1577](https://github.com/ghostery/adblocker/pull/1577) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.6.1 to 10.6.2 [#1576](https://github.com/ghostery/adblocker/pull/1576) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.1.1 to 11.2.0 [#1573](https://github.com/ghostery/adblocker/pull/1573) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.81 to 5.6.82 [#1572](https://github.com/ghostery/adblocker/pull/1572) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.6.0 to 10.6.1 [#1570](https://github.com/ghostery/adblocker/pull/1570) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/jsdom from 16.2.5 to 16.2.6 [#1569](https://github.com/ghostery/adblocker/pull/1569) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.5.1 to 10.6.0 [#1567](https://github.com/ghostery/adblocker/pull/1567) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.80 to 5.6.81 [#1564](https://github.com/ghostery/adblocker/pull/1564) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.5.0 to 10.5.1 [#1563](https://github.com/ghostery/adblocker/pull/1563) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump sinon from 9.2.2 to 9.2.3 [#1558](https://github.com/ghostery/adblocker/pull/1558) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.36.0 to 2.36.1 [#1557](https://github.com/ghostery/adblocker/pull/1557) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.35.1 to 2.36.0 [#1555](https://github.com/ghostery/adblocker/pull/1555) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.19 to 14.14.20 [#1554](https://github.com/ghostery/adblocker/pull/1554) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.18 to 14.14.19 [#1550](https://github.com/ghostery/adblocker/pull/1550) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.17 to 14.14.18 [#1549](https://github.com/ghostery/adblocker/pull/1549) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.16 to 14.14.17 [#1547](https://github.com/ghostery/adblocker/pull/1547) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.79 to 5.6.80 [#1540](https://github.com/ghostery/adblocker/pull/1540) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.14 to 14.14.16 [#1538](https://github.com/ghostery/adblocker/pull/1538) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.9 to 9.0.10 [#1537](https://github.com/ghostery/adblocker/pull/1537) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.7.0 to 1.7.1 [#1535](https://github.com/ghostery/adblocker/pull/1535) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.4.2 to 10.5.0 [#1534](https://github.com/ghostery/adblocker/pull/1534) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.1.0 to 11.1.1 [#1532](https://github.com/ghostery/adblocker/pull/1532) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.78 to 5.6.79 [#1529](https://github.com/ghostery/adblocker/pull/1529) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.77 to 5.6.78 [#1527](https://github.com/ghostery/adblocker/pull/1527) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.127 to 0.0.128 [#1561](https://github.com/ghostery/adblocker/pull/1561) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.19.0 (Wed Dec 16 2020)

#### :rocket: New Feature

- `@cliqz/adblocker`
  - More config options + compression of raw filters (debug mode) [#1523](https://github.com/ghostery/adblocker/pull/1523) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1519](https://github.com/ghostery/adblocker/pull/1519) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1515](https://github.com/ghostery/adblocker/pull/1515) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1513](https://github.com/ghostery/adblocker/pull/1513) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1508](https://github.com/ghostery/adblocker/pull/1508) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1504](https://github.com/ghostery/adblocker/pull/1504) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1500](https://github.com/ghostery/adblocker/pull/1500) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1492](https://github.com/ghostery/adblocker/pull/1492) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1490](https://github.com/ghostery/adblocker/pull/1490) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1488](https://github.com/ghostery/adblocker/pull/1488) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1487](https://github.com/ghostery/adblocker/pull/1487) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1485](https://github.com/ghostery/adblocker/pull/1485) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1481](https://github.com/ghostery/adblocker/pull/1481) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1480](https://github.com/ghostery/adblocker/pull/1480) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1477](https://github.com/ghostery/adblocker/pull/1477) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1475](https://github.com/ghostery/adblocker/pull/1475) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1473](https://github.com/ghostery/adblocker/pull/1473) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1472](https://github.com/ghostery/adblocker/pull/1472) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump tldts-experimental from 5.6.76 to 5.6.77 [#1521](https://github.com/ghostery/adblocker/pull/1521) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.6.2 to 1.7.0 [#1522](https://github.com/ghostery/adblocker/pull/1522) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.13 to 14.14.14 [#1520](https://github.com/ghostery/adblocker/pull/1520) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 11.0.0 to 11.0.1 [#1518](https://github.com/ghostery/adblocker/pull/1518) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.35.0 to 2.35.1 [#1517](https://github.com/ghostery/adblocker/pull/1517) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.34.2 to 2.35.0 [#1516](https://github.com/ghostery/adblocker/pull/1516) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.75 to 5.6.76 [#1514](https://github.com/ghostery/adblocker/pull/1514) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.12 to 14.14.13 [#1512](https://github.com/ghostery/adblocker/pull/1512) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.0.5 to 11.1.0 [#1511](https://github.com/ghostery/adblocker/pull/1511) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.74 to 5.6.75 [#1510](https://github.com/ghostery/adblocker/pull/1510) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 4.1.2 to 4.1.3 [#1509](https://github.com/ghostery/adblocker/pull/1509) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.0.4 to 11.0.5 [#1507](https://github.com/ghostery/adblocker/pull/1507) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump sinon from 9.2.1 to 9.2.2 [#1505](https://github.com/ghostery/adblocker/pull/1505) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): [security] bump ini from 1.3.5 to 1.3.7 [#1503](https://github.com/ghostery/adblocker/pull/1503) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump got from 11.8.0 to 11.8.1 [#1502](https://github.com/ghostery/adblocker/pull/1502) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.11 to 14.14.12 [#1501](https://github.com/ghostery/adblocker/pull/1501) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/puppeteer from 5.4.1 to 5.4.2 [#1497](https://github.com/ghostery/adblocker/pull/1497) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.10 to 14.14.11 [#1496](https://github.com/ghostery/adblocker/pull/1496) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/mocha from 8.0.4 to 8.2.0 [#1494](https://github.com/ghostery/adblocker/pull/1494) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 11.0.3 to 11.0.4 [#1493](https://github.com/ghostery/adblocker/pull/1493) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump ts-node from 9.1.0 to 9.1.1 [#1491](https://github.com/ghostery/adblocker/pull/1491) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.34.1 to 2.34.2 [#1489](https://github.com/ghostery/adblocker/pull/1489) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/puppeteer from 5.4.0 to 5.4.1 [#1486](https://github.com/ghostery/adblocker/pull/1486) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump ts-node from 9.0.0 to 9.1.0 [#1484](https://github.com/ghostery/adblocker/pull/1484) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.34.0 to 2.34.1 [#1483](https://github.com/ghostery/adblocker/pull/1483) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.73 to 5.6.74 [#1482](https://github.com/ghostery/adblocker/pull/1482) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.33.3 to 2.34.0 [#1476](https://github.com/ghostery/adblocker/pull/1476) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump prettier from 2.2.0 to 2.2.1 [#1474](https://github.com/ghostery/adblocker/pull/1474) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.126 to 0.0.127 [#1506](https://github.com/ghostery/adblocker/pull/1506) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-example`
  - build(deps-dev): bump @rollup/plugin-commonjs from 16.0.0 to 17.0.0 [#1479](https://github.com/ghostery/adblocker/pull/1479) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump @rollup/plugin-node-resolve from 10.0.0 to 11.0.0 [#1478](https://github.com/ghostery/adblocker/pull/1478) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.8 (Wed Nov 25 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Fix mathing of hostname filters with www. [#1471](https://github.com/ghostery/adblocker/pull/1471) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update create-pull-request action [#1469](https://github.com/ghostery/adblocker/pull/1469) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#1470](https://github.com/ghostery/adblocker/pull/1470) ([@remusao](https://github.com/remusao) [@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @types/node from 14.14.9 to 14.14.10 [#1468](https://github.com/ghostery/adblocker/pull/1468) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.7 (Tue Nov 24 2020)

#### :nail_care: Polish

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright-example`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer-example`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Fix with newer Typescript + cleanups [#1466](https://github.com/ghostery/adblocker/pull/1466) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1467](https://github.com/ghostery/adblocker/pull/1467) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1463](https://github.com/ghostery/adblocker/pull/1463) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1460](https://github.com/ghostery/adblocker/pull/1460) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1459](https://github.com/ghostery/adblocker/pull/1459) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1457](https://github.com/ghostery/adblocker/pull/1457) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1453](https://github.com/ghostery/adblocker/pull/1453) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @types/sinon from 9.0.8 to 9.0.9 [#1465](https://github.com/ghostery/adblocker/pull/1465) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.4.1 to 10.4.2 [#1464](https://github.com/ghostery/adblocker/pull/1464) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.4.0 to 10.4.1 [#1462](https://github.com/ghostery/adblocker/pull/1462) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.72 to 5.6.73 [#1461](https://github.com/ghostery/adblocker/pull/1461) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump prettier from 2.1.2 to 2.2.0 [#1456](https://github.com/ghostery/adblocker/pull/1456) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.8 to 14.14.9 [#1454](https://github.com/ghostery/adblocker/pull/1454) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.3.0 to 10.4.0 [#1452](https://github.com/ghostery/adblocker/pull/1452) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.6 (Wed Nov 18 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension`
  - Fix memory leak by using a WeakMap to hold context information in blocker [#1451](https://github.com/ghostery/adblocker/pull/1451) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1448](https://github.com/ghostery/adblocker/pull/1448) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1444](https://github.com/ghostery/adblocker/pull/1444) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1443](https://github.com/ghostery/adblocker/pull/1443) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1441](https://github.com/ghostery/adblocker/pull/1441) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1440](https://github.com/ghostery/adblocker/pull/1440) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1437](https://github.com/ghostery/adblocker/pull/1437) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1433](https://github.com/ghostery/adblocker/pull/1433) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1431](https://github.com/ghostery/adblocker/pull/1431) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1428](https://github.com/ghostery/adblocker/pull/1428) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump tldts-experimental from 5.6.71 to 5.6.72 [#1450](https://github.com/ghostery/adblocker/pull/1450) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.33.2 to 2.33.3 [#1447](https://github.com/ghostery/adblocker/pull/1447) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.7 to 14.14.8 [#1446](https://github.com/ghostery/adblocker/pull/1446) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.6.1 to 1.6.2 [#1445](https://github.com/ghostery/adblocker/pull/1445) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 5.4.1 to 5.5.0 [#1442](https://github.com/ghostery/adblocker/pull/1442) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.33.1 to 2.33.2 [#1439](https://github.com/ghostery/adblocker/pull/1439) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.6.0 to 1.6.1 [#1436](https://github.com/ghostery/adblocker/pull/1436) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.5.2 to 1.6.0 [#1435](https://github.com/ghostery/adblocker/pull/1435) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.70 to 5.6.71 [#1434](https://github.com/ghostery/adblocker/pull/1434) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.69 to 5.6.70 [#1432](https://github.com/ghostery/adblocker/pull/1432) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/mocha from 8.0.3 to 8.0.4 [#1430](https://github.com/ghostery/adblocker/pull/1430) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.68 to 5.6.69 [#1429](https://github.com/ghostery/adblocker/pull/1429) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.21.0 to 0.22.0 [#1438](https://github.com/ghostery/adblocker/pull/1438) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.5 (Tue Nov 10 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker-puppeteer`
  - Update puppeteer types to 5.x [#1427](https://github.com/ghostery/adblocker/pull/1427) ([@Niek](https://github.com/Niek) [@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1426](https://github.com/ghostery/adblocker/pull/1426) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1422](https://github.com/ghostery/adblocker/pull/1422) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1420](https://github.com/ghostery/adblocker/pull/1420) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1417](https://github.com/ghostery/adblocker/pull/1417) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1414](https://github.com/ghostery/adblocker/pull/1414) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1411](https://github.com/ghostery/adblocker/pull/1411) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1407](https://github.com/ghostery/adblocker/pull/1407) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1398](https://github.com/ghostery/adblocker/pull/1398) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1395](https://github.com/ghostery/adblocker/pull/1395) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @types/node from 14.14.6 to 14.14.7 [#1425](https://github.com/ghostery/adblocker/pull/1425) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.67 to 5.6.68 [#1421](https://github.com/ghostery/adblocker/pull/1421) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.66 to 5.6.67 [#1419](https://github.com/ghostery/adblocker/pull/1419) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.2.5 to 10.3.0 [#1418](https://github.com/ghostery/adblocker/pull/1418) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.2.4 to 10.2.5 [#1416](https://github.com/ghostery/adblocker/pull/1416) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.2.3 to 10.2.4 [#1415](https://github.com/ghostery/adblocker/pull/1415) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.65 to 5.6.66 [#1413](https://github.com/ghostery/adblocker/pull/1413) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.2.2 to 10.2.3 [#1412](https://github.com/ghostery/adblocker/pull/1412) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.2.1 to 10.2.2 [#1410](https://github.com/ghostery/adblocker/pull/1410) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.2.0 to 10.2.1 [#1409](https://github.com/ghostery/adblocker/pull/1409) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.64 to 5.6.65 [#1408](https://github.com/ghostery/adblocker/pull/1408) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @remusao/smaz from 1.9.0 to 1.9.1 [#1406](https://github.com/ghostery/adblocker/pull/1406) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @remusao/small from 1.2.0 to 1.2.1 [#1405](https://github.com/ghostery/adblocker/pull/1405) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @remusao/smaz-generate from 1.9.0 to 1.9.1 [#1404](https://github.com/ghostery/adblocker/pull/1404) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @remusao/auto-config from 1.1.1 to 1.1.2 [#1402](https://github.com/ghostery/adblocker/pull/1402) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @remusao/guess-url-type from 1.2.0 to 1.2.1 [#1403](https://github.com/ghostery/adblocker/pull/1403) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.1.0 to 10.2.0 [#1401](https://github.com/ghostery/adblocker/pull/1401) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/puppeteer from 3.0.4 to 3.0.5 [#1400](https://github.com/ghostery/adblocker/pull/1400) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.2.0 to 8.2.1 [#1399](https://github.com/ghostery/adblocker/pull/1399) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 10.0.2 to 10.1.0 [#1397](https://github.com/ghostery/adblocker/pull/1397) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.33.0 to 2.33.1 [#1396](https://github.com/ghostery/adblocker/pull/1396) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker`
  - build(deps): bump @types/firefox-webext-browser from 78.0.1 to 82.0.0 [#1424](https://github.com/ghostery/adblocker/pull/1424) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 4

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Niek van der Maas ([@Niek](https://github.com/Niek))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.4 (Sun Nov 01 2020)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Add new request-allowed event [#1394](https://github.com/ghostery/adblocker/pull/1394) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1391](https://github.com/ghostery/adblocker/pull/1391) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1388](https://github.com/ghostery/adblocker/pull/1388) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1384](https://github.com/ghostery/adblocker/pull/1384) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1378](https://github.com/ghostery/adblocker/pull/1378) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1369](https://github.com/ghostery/adblocker/pull/1369) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1368](https://github.com/ghostery/adblocker/pull/1368) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1365](https://github.com/ghostery/adblocker/pull/1365) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1361](https://github.com/ghostery/adblocker/pull/1361) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1357](https://github.com/ghostery/adblocker/pull/1357) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1353](https://github.com/ghostery/adblocker/pull/1353) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1347](https://github.com/ghostery/adblocker/pull/1347) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1344](https://github.com/ghostery/adblocker/pull/1344) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1341](https://github.com/ghostery/adblocker/pull/1341) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1335](https://github.com/ghostery/adblocker/pull/1335) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1334](https://github.com/ghostery/adblocker/pull/1334) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1333](https://github.com/ghostery/adblocker/pull/1333) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1331](https://github.com/ghostery/adblocker/pull/1331) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1328](https://github.com/ghostery/adblocker/pull/1328) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1324](https://github.com/ghostery/adblocker/pull/1324) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1321](https://github.com/ghostery/adblocker/pull/1321) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1317](https://github.com/ghostery/adblocker/pull/1317) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1315](https://github.com/ghostery/adblocker/pull/1315) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1314](https://github.com/ghostery/adblocker/pull/1314) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1313](https://github.com/ghostery/adblocker/pull/1313) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1311](https://github.com/ghostery/adblocker/pull/1311) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1309](https://github.com/ghostery/adblocker/pull/1309) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1306](https://github.com/ghostery/adblocker/pull/1306) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1305](https://github.com/ghostery/adblocker/pull/1305) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1304](https://github.com/ghostery/adblocker/pull/1304) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1300](https://github.com/ghostery/adblocker/pull/1300) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1297](https://github.com/ghostery/adblocker/pull/1297) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1293](https://github.com/ghostery/adblocker/pull/1293) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1290](https://github.com/ghostery/adblocker/pull/1290) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1289](https://github.com/ghostery/adblocker/pull/1289) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1285](https://github.com/ghostery/adblocker/pull/1285) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1281](https://github.com/ghostery/adblocker/pull/1281) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1278](https://github.com/ghostery/adblocker/pull/1278) ([@adblocker-bot](https://github.com/adblocker-bot))
  - Update local assets [#1276](https://github.com/ghostery/adblocker/pull/1276) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump rollup from 2.32.1 to 2.33.0 [#1393](https://github.com/ghostery/adblocker/pull/1393) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/benchmark from 1.0.33 to 2.1.0 [#1392](https://github.com/ghostery/adblocker/pull/1392) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/puppeteer from 3.0.3 to 3.0.4 [#1390](https://github.com/ghostery/adblocker/pull/1390) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.63 to 5.6.64 [#1389](https://github.com/ghostery/adblocker/pull/1389) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.61.0 to 10.0.2 [#1387](https://github.com/ghostery/adblocker/pull/1387) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/puppeteer from 3.0.2 to 3.0.3 [#1386](https://github.com/ghostery/adblocker/pull/1386) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.62 to 5.6.63 [#1385](https://github.com/ghostery/adblocker/pull/1385) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.5 to 14.14.6 [#1381](https://github.com/ghostery/adblocker/pull/1381) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump sinon from 9.2.0 to 9.2.1 [#1382](https://github.com/ghostery/adblocker/pull/1382) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.61 to 5.6.62 [#1383](https://github.com/ghostery/adblocker/pull/1383) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/jsdom from 16.2.4 to 16.2.5 [#1379](https://github.com/ghostery/adblocker/pull/1379) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 5.4.0 to 5.4.1 [#1377](https://github.com/ghostery/adblocker/pull/1377) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.60 to 5.6.61 [#1376](https://github.com/ghostery/adblocker/pull/1376) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.60.1 to 9.61.0 [#1375](https://github.com/ghostery/adblocker/pull/1375) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.5.1 to 1.5.2 [#1374](https://github.com/ghostery/adblocker/pull/1374) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 4.0.3 to 4.0.5 [#1371](https://github.com/ghostery/adblocker/pull/1371) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.3 to 14.14.5 [#1370](https://github.com/ghostery/adblocker/pull/1370) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.2 to 14.14.3 [#1367](https://github.com/ghostery/adblocker/pull/1367) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.60.0 to 9.60.1 [#1364](https://github.com/ghostery/adblocker/pull/1364) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 5.3.1 to 5.4.0 [#1362](https://github.com/ghostery/adblocker/pull/1362) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.14.0 to 14.14.2 [#1360](https://github.com/ghostery/adblocker/pull/1360) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.59.1 to 9.60.0 [#1359](https://github.com/ghostery/adblocker/pull/1359) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.32.0 to 2.32.1 [#1358](https://github.com/ghostery/adblocker/pull/1358) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump got from 11.7.0 to 11.8.0 [#1356](https://github.com/ghostery/adblocker/pull/1356) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.11.10 to 14.14.0 [#1355](https://github.com/ghostery/adblocker/pull/1355) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.1.3 to 8.2.0 [#1350](https://github.com/ghostery/adblocker/pull/1350) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/chai from 4.2.13 to 4.2.14 [#1352](https://github.com/ghostery/adblocker/pull/1352) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.11.8 to 14.11.10 [#1351](https://github.com/ghostery/adblocker/pull/1351) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.31.0 to 2.32.0 [#1348](https://github.com/ghostery/adblocker/pull/1348) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.58.0 to 9.59.1 [#1346](https://github.com/ghostery/adblocker/pull/1346) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.30.0 to 2.31.0 [#1345](https://github.com/ghostery/adblocker/pull/1345) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.5.0 to 1.5.1 [#1343](https://github.com/ghostery/adblocker/pull/1343) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.59 to 5.6.60 [#1342](https://github.com/ghostery/adblocker/pull/1342) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.57.0 to 9.58.0 [#1340](https://github.com/ghostery/adblocker/pull/1340) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.4.2 to 1.5.0 [#1339](https://github.com/ghostery/adblocker/pull/1339) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.29.0 to 2.30.0 [#1338](https://github.com/ghostery/adblocker/pull/1338) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.58 to 5.6.59 [#1336](https://github.com/ghostery/adblocker/pull/1336) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.55 to 5.6.58 [#1332](https://github.com/ghostery/adblocker/pull/1332) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.11.5 to 14.11.8 [#1329](https://github.com/ghostery/adblocker/pull/1329) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.55.0 to 9.57.0 [#1330](https://github.com/ghostery/adblocker/pull/1330) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup-plugin-sourcemaps from 0.6.2 to 0.6.3 [#1327](https://github.com/ghostery/adblocker/pull/1327) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.28.2 to 2.29.0 [#1326](https://github.com/ghostery/adblocker/pull/1326) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.54.5 to 9.55.0 [#1325](https://github.com/ghostery/adblocker/pull/1325) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump sinon from 9.1.0 to 9.2.0 [#1323](https://github.com/ghostery/adblocker/pull/1323) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.54.2 to 9.54.5 [#1322](https://github.com/ghostery/adblocker/pull/1322) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.11.2 to 14.11.5 [#1320](https://github.com/ghostery/adblocker/pull/1320) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.54.0 to 9.54.2 [#1319](https://github.com/ghostery/adblocker/pull/1319) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/chai from 4.2.12 to 4.2.13 [#1318](https://github.com/ghostery/adblocker/pull/1318) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.7 to 9.0.8 [#1316](https://github.com/ghostery/adblocker/pull/1316) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.53.1 to 9.54.0 [#1312](https://github.com/ghostery/adblocker/pull/1312) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump sinon from 9.0.3 to 9.1.0 [#1310](https://github.com/ghostery/adblocker/pull/1310) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.6 to 9.0.7 [#1308](https://github.com/ghostery/adblocker/pull/1308) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon-chai from 3.2.4 to 3.2.5 [#1303](https://github.com/ghostery/adblocker/pull/1303) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.5 to 9.0.6 [#1301](https://github.com/ghostery/adblocker/pull/1301) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.28.1 to 2.28.2 [#1299](https://github.com/ghostery/adblocker/pull/1299) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.4.1 to 1.4.2 [#1298](https://github.com/ghostery/adblocker/pull/1298) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.11.1 to 14.11.2 [#1296](https://github.com/ghostery/adblocker/pull/1296) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.28.0 to 2.28.1 [#1295](https://github.com/ghostery/adblocker/pull/1295) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 5.3.0 to 5.3.1 [#1294](https://github.com/ghostery/adblocker/pull/1294) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-commonjs from 15.0.0 to 15.1.0 [#1292](https://github.com/ghostery/adblocker/pull/1292) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.27.1 to 2.28.0 [#1291](https://github.com/ghostery/adblocker/pull/1291) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.4.0 to 1.4.1 [#1288](https://github.com/ghostery/adblocker/pull/1288) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 4.0.2 to 4.0.3 [#1287](https://github.com/ghostery/adblocker/pull/1287) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump got from 11.6.2 to 11.7.0 [#1286](https://github.com/ghostery/adblocker/pull/1286) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.54 to 5.6.55 [#1284](https://github.com/ghostery/adblocker/pull/1284) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.10.3 to 14.11.1 [#1283](https://github.com/ghostery/adblocker/pull/1283) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.27.0 to 2.27.1 [#1282](https://github.com/ghostery/adblocker/pull/1282) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.10.2 to 14.10.3 [#1280](https://github.com/ghostery/adblocker/pull/1280) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.11 to 2.27.0 [#1279](https://github.com/ghostery/adblocker/pull/1279) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump prettier from 2.1.1 to 2.1.2 [#1277](https://github.com/ghostery/adblocker/pull/1277) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.10.1 to 14.10.2 [#1275](https://github.com/ghostery/adblocker/pull/1275) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.125 to 0.0.126 [#1380](https://github.com/ghostery/adblocker/pull/1380) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump @types/chrome from 0.0.124 to 0.0.125 [#1349](https://github.com/ghostery/adblocker/pull/1349) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump @types/chrome from 0.0.123 to 0.0.124 [#1302](https://github.com/ghostery/adblocker/pull/1302) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump @rollup/plugin-node-resolve from 9.0.0 to 10.0.0 [#1373](https://github.com/ghostery/adblocker/pull/1373) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-example`
  - build(deps-dev): bump @rollup/plugin-commonjs from 15.1.0 to 16.0.0 [#1372](https://github.com/ghostery/adblocker/pull/1372) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.20.0 to 0.21.0 [#1366](https://github.com/ghostery/adblocker/pull/1366) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.1.4 to 10.1.5 [#1363](https://github.com/ghostery/adblocker/pull/1363) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump electron from 10.1.3 to 10.1.4 [#1354](https://github.com/ghostery/adblocker/pull/1354) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
  - build(deps): bump electron from 10.1.2 to 10.1.3 [#1307](https://github.com/ghostery/adblocker/pull/1307) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.3 (Tue Sep 15 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Disable fanboy annoyances for now [#1274](https://github.com/ghostery/adblocker/pull/1274) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1272](https://github.com/ghostery/adblocker/pull/1272) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1271](https://github.com/ghostery/adblocker/pull/1271) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1266](https://github.com/ghostery/adblocker/pull/1266) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1262](https://github.com/ghostery/adblocker/pull/1262) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1260](https://github.com/ghostery/adblocker/pull/1260) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1257](https://github.com/ghostery/adblocker/pull/1257) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1254](https://github.com/ghostery/adblocker/pull/1254) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1252](https://github.com/ghostery/adblocker/pull/1252) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1250](https://github.com/ghostery/adblocker/pull/1250) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1248](https://github.com/ghostery/adblocker/pull/1248) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1246](https://github.com/ghostery/adblocker/pull/1246) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1243](https://github.com/ghostery/adblocker/pull/1243) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1238](https://github.com/ghostery/adblocker/pull/1238) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1237](https://github.com/ghostery/adblocker/pull/1237) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1236](https://github.com/ghostery/adblocker/pull/1236) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump puppeteer from 5.2.1 to 5.3.0 [#1269](https://github.com/ghostery/adblocker/pull/1269) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.10.0 to 14.10.1 [#1268](https://github.com/ghostery/adblocker/pull/1268) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.6.4 to 14.10.0 [#1265](https://github.com/ghostery/adblocker/pull/1265) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.3.0 to 1.4.0 [#1264](https://github.com/ghostery/adblocker/pull/1264) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump got from 11.6.1 to 11.6.2 [#1263](https://github.com/ghostery/adblocker/pull/1263) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.53 to 5.6.54 [#1261](https://github.com/ghostery/adblocker/pull/1261) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/puppeteer from 3.0.1 to 3.0.2 [#1259](https://github.com/ghostery/adblocker/pull/1259) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.52.0 to 9.53.1 [#1258](https://github.com/ghostery/adblocker/pull/1258) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump got from 11.6.0 to 11.6.1 [#1256](https://github.com/ghostery/adblocker/pull/1256) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.10 to 2.26.11 [#1255](https://github.com/ghostery/adblocker/pull/1255) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.52 to 5.6.53 [#1253](https://github.com/ghostery/adblocker/pull/1253) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump node-fetch from 2.6.0 to 2.6.1 [#1251](https://github.com/ghostery/adblocker/pull/1251) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.9 to 2.26.10 [#1249](https://github.com/ghostery/adblocker/pull/1249) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.6.3 to 14.6.4 [#1247](https://github.com/ghostery/adblocker/pull/1247) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump bl from 4.0.2 to 4.0.3 [#1241](https://github.com/ghostery/adblocker/pull/1241) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- build(deps-dev): bump got from 11.5.2 to 11.6.0 [#1245](https://github.com/ghostery/adblocker/pull/1245) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.6.2 to 14.6.3 [#1244](https://github.com/ghostery/adblocker/pull/1244) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/jsdom from 16.2.3 to 16.2.4 [#1242](https://github.com/ghostery/adblocker/pull/1242) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.8 to 2.26.9 [#1239](https://github.com/ghostery/adblocker/pull/1239) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.1.1 to 10.1.2 [#1273](https://github.com/ghostery/adblocker/pull/1273) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.19.0 to 0.20.0 [#1270](https://github.com/ghostery/adblocker/pull/1270) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.122 to 0.0.123 [#1267](https://github.com/ghostery/adblocker/pull/1267) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.1.0 to 10.1.1 [#1240](https://github.com/ghostery/adblocker/pull/1240) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 4

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# (Sat Aug 29 2020)

#### ⚠️ Pushed to `master`

- `@cliqz/adblocker`
  - Annoyances and Easylist Germany are now enabled in full and ads-only presets ([@remusao](https://github.com/remusao))

#### :house: Internal

- Fix asset task by building packages [#1221](https://github.com/ghostery/adblocker/pull/1221) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#1235](https://github.com/ghostery/adblocker/pull/1235) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Add back easylist Germany by default [#1230](https://github.com/ghostery/adblocker/pull/1230) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Remove line numbers from commented out filters [#1228](https://github.com/ghostery/adblocker/pull/1228) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#1227](https://github.com/ghostery/adblocker/pull/1227) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1222](https://github.com/ghostery/adblocker/pull/1222) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump rollup from 2.26.7 to 2.26.8 [#1234](https://github.com/ghostery/adblocker/pull/1234) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.51 to 5.6.52 [#1233](https://github.com/ghostery/adblocker/pull/1233) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.6 to 2.26.7 [#1231](https://github.com/ghostery/adblocker/pull/1231) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.1.2 to 8.1.3 [#1232](https://github.com/ghostery/adblocker/pull/1232) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.6.1 to 14.6.2 [#1229](https://github.com/ghostery/adblocker/pull/1229) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.5 to 2.26.6 [#1224](https://github.com/ghostery/adblocker/pull/1224) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.6.0 to 14.6.1 [#1223](https://github.com/ghostery/adblocker/pull/1223) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump prettier from 2.1.0 to 2.1.1 [#1220](https://github.com/ghostery/adblocker/pull/1220) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.1 to 10.1.0 [#1226](https://github.com/ghostery/adblocker/pull/1226) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0 to 10.0.1 [#1225](https://github.com/ghostery/adblocker/pull/1225) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# (Wed Aug 26 2020)

#### ⚠️ Pushed to `master`

- Run asset updates with latest Node ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump mocha from 8.1.1 to 8.1.2 [#1219](https://github.com/ghostery/adblocker/pull/1219) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.50 to 5.6.51 [#1218](https://github.com/ghostery/adblocker/pull/1218) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump prettier from 2.0.5 to 2.1.0 [#1216](https://github.com/ghostery/adblocker/pull/1216) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0-beta.25 to 10.0.0 [#1217](https://github.com/ghostery/adblocker/pull/1217) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.0 (Mon Aug 24 2020)

### Release Notes

_From #1215_

Local assets uploading is now smarter and can automatically detect duplicate filters as well as disabled filters, resulting in slimmer lists (resulting in 15218 duplicates filters removed and 113 badfilters disabled). This results in a lower memory usage as well as faster matching performance. Moreover, the Fanboy annoyances list has been added in the "full" preset.

---

#### :rocket: New Feature

- `@cliqz/adblocker`
  - Smarter updates [#1215](https://github.com/ghostery/adblocker/pull/1215) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1214](https://github.com/ghostery/adblocker/pull/1214) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1213](https://github.com/ghostery/adblocker/pull/1213) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1207](https://github.com/ghostery/adblocker/pull/1207) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1205](https://github.com/ghostery/adblocker/pull/1205) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1201](https://github.com/ghostery/adblocker/pull/1201) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1199](https://github.com/ghostery/adblocker/pull/1199) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1194](https://github.com/ghostery/adblocker/pull/1194) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1189](https://github.com/ghostery/adblocker/pull/1189) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1184](https://github.com/ghostery/adblocker/pull/1184) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1178](https://github.com/ghostery/adblocker/pull/1178) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1177](https://github.com/ghostery/adblocker/pull/1177) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1174](https://github.com/ghostery/adblocker/pull/1174) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1169](https://github.com/ghostery/adblocker/pull/1169) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1168](https://github.com/ghostery/adblocker/pull/1168) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1166](https://github.com/ghostery/adblocker/pull/1166) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1163](https://github.com/ghostery/adblocker/pull/1163) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1157](https://github.com/ghostery/adblocker/pull/1157) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1156](https://github.com/ghostery/adblocker/pull/1156) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1152](https://github.com/ghostery/adblocker/pull/1152) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1150](https://github.com/ghostery/adblocker/pull/1150) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1149](https://github.com/ghostery/adblocker/pull/1149) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1148](https://github.com/ghostery/adblocker/pull/1148) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1144](https://github.com/ghostery/adblocker/pull/1144) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1142](https://github.com/ghostery/adblocker/pull/1142) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1137](https://github.com/ghostery/adblocker/pull/1137) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1131](https://github.com/ghostery/adblocker/pull/1131) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1129](https://github.com/ghostery/adblocker/pull/1129) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1128](https://github.com/ghostery/adblocker/pull/1128) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1127](https://github.com/ghostery/adblocker/pull/1127) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1126](https://github.com/ghostery/adblocker/pull/1126) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1120](https://github.com/ghostery/adblocker/pull/1120) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1117](https://github.com/ghostery/adblocker/pull/1117) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1114](https://github.com/ghostery/adblocker/pull/1114) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1109](https://github.com/ghostery/adblocker/pull/1109) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1108](https://github.com/ghostery/adblocker/pull/1108) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1105](https://github.com/ghostery/adblocker/pull/1105) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1100](https://github.com/ghostery/adblocker/pull/1100) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1096](https://github.com/ghostery/adblocker/pull/1096) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1093](https://github.com/ghostery/adblocker/pull/1093) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1091](https://github.com/ghostery/adblocker/pull/1091) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1085](https://github.com/ghostery/adblocker/pull/1085) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1081](https://github.com/ghostery/adblocker/pull/1081) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump rollup from 2.26.4 to 2.26.5 [#1211](https://github.com/ghostery/adblocker/pull/1211) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.51.0 to 9.52.0 [#1210](https://github.com/ghostery/adblocker/pull/1210) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.4 to 9.0.5 [#1209](https://github.com/ghostery/adblocker/pull/1209) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.50.11 to 9.51.0 [#1204](https://github.com/ghostery/adblocker/pull/1204) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.3 to 2.26.4 [#1200](https://github.com/ghostery/adblocker/pull/1200) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.49 to 5.6.50 [#1198](https://github.com/ghostery/adblocker/pull/1198) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/mocha from 8.0.2 to 8.0.3 [#1196](https://github.com/ghostery/adblocker/pull/1196) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.0.27 to 14.6.0 [#1195](https://github.com/ghostery/adblocker/pull/1195) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.2 to 2.26.3 [#1192](https://github.com/ghostery/adblocker/pull/1192) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.1 to 2.26.2 [#1191](https://github.com/ghostery/adblocker/pull/1191) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.0 to 2.26.1 [#1190](https://github.com/ghostery/adblocker/pull/1190) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.25.0 to 2.26.0 [#1188](https://github.com/ghostery/adblocker/pull/1188) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.50.9 to 9.50.11 [#1187](https://github.com/ghostery/adblocker/pull/1187) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.48 to 5.6.49 [#1186](https://github.com/ghostery/adblocker/pull/1186) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.50.6 to 9.50.9 [#1185](https://github.com/ghostery/adblocker/pull/1185) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.24.0 to 2.25.0 [#1183](https://github.com/ghostery/adblocker/pull/1183) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.23.1 to 2.24.0 [#1182](https://github.com/ghostery/adblocker/pull/1182) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.50.2 to 9.50.6 [#1180](https://github.com/ghostery/adblocker/pull/1180) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.50.1 to 9.50.2 [#1176](https://github.com/ghostery/adblocker/pull/1176) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/mocha from 8.0.1 to 8.0.2 [#1175](https://github.com/ghostery/adblocker/pull/1175) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump sinon from 9.0.2 to 9.0.3 [#1173](https://github.com/ghostery/adblocker/pull/1173) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.47 to 5.6.48 [#1172](https://github.com/ghostery/adblocker/pull/1172) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.50.0 to 9.50.1 [#1170](https://github.com/ghostery/adblocker/pull/1170) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.46 to 5.6.47 [#1167](https://github.com/ghostery/adblocker/pull/1167) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump jsdom from 16.3.0 to 16.4.0 [#1165](https://github.com/ghostery/adblocker/pull/1165) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.23.0 to 2.23.1 [#1164](https://github.com/ghostery/adblocker/pull/1164) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.49.5 to 9.50.0 [#1162](https://github.com/ghostery/adblocker/pull/1162) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump concurrently from 5.2.0 to 5.3.0 [#1161](https://github.com/ghostery/adblocker/pull/1161) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.49.4 to 9.49.5 [#1160](https://github.com/ghostery/adblocker/pull/1160) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.2.1 to 1.3.0 [#1159](https://github.com/ghostery/adblocker/pull/1159) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.1.0 to 8.1.1 [#1155](https://github.com/ghostery/adblocker/pull/1155) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.45 to 5.6.46 [#1154](https://github.com/ghostery/adblocker/pull/1154) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.49.3 to 9.49.4 [#1153](https://github.com/ghostery/adblocker/pull/1153) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/mocha from 8.0.0 to 8.0.1 [#1147](https://github.com/ghostery/adblocker/pull/1147) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump tslint from 6.1.2 to 6.1.3 [#1146](https://github.com/ghostery/adblocker/pull/1146) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.49.1 to 9.49.3 [#1145](https://github.com/ghostery/adblocker/pull/1145) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.0.1 to 8.1.0 [#1143](https://github.com/ghostery/adblocker/pull/1143) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.49.0 to 9.49.1 [#1141](https://github.com/ghostery/adblocker/pull/1141) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.44 to 5.6.45 [#1140](https://github.com/ghostery/adblocker/pull/1140) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.48.3 to 9.49.0 [#1139](https://github.com/ghostery/adblocker/pull/1139) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.48.2 to 9.48.3 [#1136](https://github.com/ghostery/adblocker/pull/1136) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.43 to 5.6.44 [#1135](https://github.com/ghostery/adblocker/pull/1135) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.48.1 to 9.48.2 [#1134](https://github.com/ghostery/adblocker/pull/1134) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/firefox-webext-browser from 78.0.0 to 78.0.1 [#1133](https://github.com/ghostery/adblocker/pull/1133) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.0.26 to 14.0.27 [#1132](https://github.com/ghostery/adblocker/pull/1132) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.0.25 to 14.0.26 [#1125](https://github.com/ghostery/adblocker/pull/1125) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.0.24 to 14.0.25 [#1124](https://github.com/ghostery/adblocker/pull/1124) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.48.0 to 9.48.1 [#1123](https://github.com/ghostery/adblocker/pull/1123) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/chai from 4.2.11 to 4.2.12 [#1122](https://github.com/ghostery/adblocker/pull/1122) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.22.2 to 2.23.0 [#1121](https://github.com/ghostery/adblocker/pull/1121) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.47.2 to 9.48.0 [#1119](https://github.com/ghostery/adblocker/pull/1119) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.47.1 to 9.47.2 [#1116](https://github.com/ghostery/adblocker/pull/1116) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.22.1 to 2.22.2 [#1115](https://github.com/ghostery/adblocker/pull/1115) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 5.2.0 to 5.2.1 [#1113](https://github.com/ghostery/adblocker/pull/1113) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.42 to 5.6.43 [#1112](https://github.com/ghostery/adblocker/pull/1112) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.47.0 to 9.47.1 [#1111](https://github.com/ghostery/adblocker/pull/1111) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.0.23 to 14.0.24 [#1110](https://github.com/ghostery/adblocker/pull/1110) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.41 to 5.6.42 [#1106](https://github.com/ghostery/adblocker/pull/1106) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.22.0 to 2.22.1 [#1104](https://github.com/ghostery/adblocker/pull/1104) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.21.0 to 2.22.0 [#1102](https://github.com/ghostery/adblocker/pull/1102) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.40 to 5.6.41 [#1101](https://github.com/ghostery/adblocker/pull/1101) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 5.1.0 to 5.2.0 [#1099](https://github.com/ghostery/adblocker/pull/1099) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.46.0 to 9.47.0 [#1098](https://github.com/ghostery/adblocker/pull/1098) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.6 to 3.9.7 [#1097](https://github.com/ghostery/adblocker/pull/1097) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.39 to 5.6.40 [#1095](https://github.com/ghostery/adblocker/pull/1095) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): [security] bump lodash from 4.17.15 to 4.17.19 [#1094](https://github.com/ghostery/adblocker/pull/1094) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.38 to 5.6.39 [#1092](https://github.com/ghostery/adblocker/pull/1092) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.45.0 to 9.46.0 [#1090](https://github.com/ghostery/adblocker/pull/1090) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.2.0 to 1.2.1 [#1089](https://github.com/ghostery/adblocker/pull/1089) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.44.0 to 9.45.0 [#1087](https://github.com/ghostery/adblocker/pull/1087) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 5.0.0 to 5.1.0 [#1084](https://github.com/ghostery/adblocker/pull/1084) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-commonjs from 13.0.0 to 13.0.1 [#1083](https://github.com/ghostery/adblocker/pull/1083) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.1.0 to 8.4.0 [#1082](https://github.com/ghostery/adblocker/pull/1082) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0-beta.23 to 10.0.0-beta.25 [#1212](https://github.com/ghostery/adblocker/pull/1212) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright-example`, `@cliqz/adblocker-puppeteer-example`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps): bump ts-node from 8.10.2 to 9.0.0 [#1208](https://github.com/ghostery/adblocker/pull/1208) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker`
  - build(deps-dev): bump axios from 0.19.2 to 0.20.0 [#1206](https://github.com/ghostery/adblocker/pull/1206) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright-example`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer-example`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump typescript from 3.9.7 to 4.0.2 [#1202](https://github.com/ghostery/adblocker/pull/1202) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0-beta.21 to 10.0.0-beta.23 [#1197](https://github.com/ghostery/adblocker/pull/1197) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump @rollup/plugin-node-resolve from 8.4.0 to 9.0.0 [#1181](https://github.com/ghostery/adblocker/pull/1181) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-example`
  - build(deps-dev): bump @rollup/plugin-commonjs from 14.0.0 to 15.0.0 [#1179](https://github.com/ghostery/adblocker/pull/1179) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0-beta.19 to 10.0.0-beta.21 [#1171](https://github.com/ghostery/adblocker/pull/1171) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0-beta.17 to 10.0.0-beta.19 [#1158](https://github.com/ghostery/adblocker/pull/1158) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0-beta.15 to 10.0.0-beta.17 [#1151](https://github.com/ghostery/adblocker/pull/1151) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0-beta.14 to 10.0.0-beta.15 [#1138](https://github.com/ghostery/adblocker/pull/1138) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`
  - build(deps): bump electron from 10.0.0-beta.12 to 10.0.0-beta.14 [#1130](https://github.com/ghostery/adblocker/pull/1130) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.121 to 0.0.122 [#1118](https://github.com/ghostery/adblocker/pull/1118) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-example`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright-example`, `@cliqz/adblocker`
  - Update deps [#1107](https://github.com/ghostery/adblocker/pull/1107) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension-example`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.120 to 0.0.121 [#1103](https://github.com/ghostery/adblocker/pull/1103) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-example`
  - build(deps-dev): bump @rollup/plugin-commonjs from 13.0.1 to 14.0.0 [#1088](https://github.com/ghostery/adblocker/pull/1088) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.17.0 (Sun Jul 12 2020)

### Release Notes

_From #1080_

Add support for two new features to make network filtering more flexible and powerful. The new [`denyallow` option](https://github.com/uBlockOrigin/uBlock-issues/wiki/Static-filter-syntax#denyallow) is now fully supported. Moreover, both the new `denyallow` and existing `domain` options can contain [entities](https://github.com/uBlockOrigin/uBlock-issues/wiki/Static-filter-syntax#entity), allowing the use of trailing wildcards to match against all public suffixes (e.g. `evil.*` will match `evil` followed by any valid public suffix like `evil.com` or `evil.co.uk`).

---

#### :rocket: New Feature

- `@cliqz/adblocker`
  - feat: support denyallow option and entities for network filters [#1080](https://github.com/ghostery/adblocker/pull/1080) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1076](https://github.com/ghostery/adblocker/pull/1076) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1075](https://github.com/ghostery/adblocker/pull/1075) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1071](https://github.com/ghostery/adblocker/pull/1071) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1070](https://github.com/ghostery/adblocker/pull/1070) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump auto from 9.43.2 to 9.44.0 [#1078](https://github.com/ghostery/adblocker/pull/1078) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.43.1 to 9.43.2 [#1077](https://github.com/ghostery/adblocker/pull/1077) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump jsdom from 16.2.2 to 16.3.0 [#1072](https://github.com/ghostery/adblocker/pull/1072) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump @types/mocha from 7.0.2 to 8.0.0 [#1079](https://github.com/ghostery/adblocker/pull/1079) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`
  - build(deps-dev): bump @types/jsdom from 12.2.4 to 16.2.3 [#885](https://github.com/ghostery/adblocker/pull/885) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker`
  - build(deps): bump @types/firefox-webext-browser from 70.0.1 to 78.0.0 [#1026](https://github.com/ghostery/adblocker/pull/1026) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.119 to 0.0.120 [#1074](https://github.com/ghostery/adblocker/pull/1074) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.16.1 (Wed Jul 08 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker-puppeteer`
  - Fix puppeteer package with correct promises handling. [#1067](https://github.com/ghostery/adblocker/pull/1067) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#1061](https://github.com/ghostery/adblocker/pull/1061) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1053](https://github.com/ghostery/adblocker/pull/1053) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1051](https://github.com/ghostery/adblocker/pull/1051) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1049](https://github.com/ghostery/adblocker/pull/1049) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1048](https://github.com/ghostery/adblocker/pull/1048) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1046](https://github.com/ghostery/adblocker/pull/1046) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1042](https://github.com/ghostery/adblocker/pull/1042) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1040](https://github.com/ghostery/adblocker/pull/1040) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1039](https://github.com/ghostery/adblocker/pull/1039) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1038](https://github.com/ghostery/adblocker/pull/1038) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1034](https://github.com/ghostery/adblocker/pull/1034) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1030](https://github.com/ghostery/adblocker/pull/1030) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1023](https://github.com/ghostery/adblocker/pull/1023) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1020](https://github.com/ghostery/adblocker/pull/1020) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1018](https://github.com/ghostery/adblocker/pull/1018) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1015](https://github.com/ghostery/adblocker/pull/1015) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1014](https://github.com/ghostery/adblocker/pull/1014) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1013](https://github.com/ghostery/adblocker/pull/1013) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1010](https://github.com/ghostery/adblocker/pull/1010) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1007](https://github.com/ghostery/adblocker/pull/1007) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1005](https://github.com/ghostery/adblocker/pull/1005) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#1002](https://github.com/ghostery/adblocker/pull/1002) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#993](https://github.com/ghostery/adblocker/pull/993) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#992](https://github.com/ghostery/adblocker/pull/992) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#990](https://github.com/ghostery/adblocker/pull/990) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#988](https://github.com/ghostery/adblocker/pull/988) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#985](https://github.com/ghostery/adblocker/pull/985) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump auto from 9.43.0 to 9.43.1 [#1068](https://github.com/ghostery/adblocker/pull/1068) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.41.1 to 9.43.0 [#1066](https://github.com/ghostery/adblocker/pull/1066) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.3.4 to 8.4.0 [#1065](https://github.com/ghostery/adblocker/pull/1065) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.20.0 to 2.21.0 [#1064](https://github.com/ghostery/adblocker/pull/1064) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.1.1 to 1.2.0 [#1059](https://github.com/ghostery/adblocker/pull/1059) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/chai-as-promised from 7.1.2 to 7.1.3 [#1058](https://github.com/ghostery/adblocker/pull/1058) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.40.6 to 9.41.1 [#1056](https://github.com/ghostery/adblocker/pull/1056) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.19.0 to 2.20.0 [#1054](https://github.com/ghostery/adblocker/pull/1054) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.18.2 to 2.19.0 [#1050](https://github.com/ghostery/adblocker/pull/1050) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.40.5 to 9.40.6 [#1047](https://github.com/ghostery/adblocker/pull/1047) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 4.0.1 to 5.0.0 [#1045](https://github.com/ghostery/adblocker/pull/1045) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.18.1 to 2.18.2 [#1044](https://github.com/ghostery/adblocker/pull/1044) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.5 to 3.9.6 [#1043](https://github.com/ghostery/adblocker/pull/1043) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.37 to 5.6.38 [#1036](https://github.com/ghostery/adblocker/pull/1036) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/puppeteer from 3.0.0 to 3.0.1 [#1035](https://github.com/ghostery/adblocker/pull/1035) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.36 to 5.6.37 [#1033](https://github.com/ghostery/adblocker/pull/1033) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.18.0 to 2.18.1 [#1032](https://github.com/ghostery/adblocker/pull/1032) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.40.4 to 9.40.5 [#1031](https://github.com/ghostery/adblocker/pull/1031) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.3.3 to 8.3.4 [#1028](https://github.com/ghostery/adblocker/pull/1028) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.35 to 5.6.36 [#1027](https://github.com/ghostery/adblocker/pull/1027) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.39.0 to 9.40.4 [#1025](https://github.com/ghostery/adblocker/pull/1025) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 4.0.0 to 4.0.1 [#1024](https://github.com/ghostery/adblocker/pull/1024) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.0.1 to 8.1.0 [#1019](https://github.com/ghostery/adblocker/pull/1019) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.17.1 to 2.18.0 [#1017](https://github.com/ghostery/adblocker/pull/1017) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.34 to 5.6.35 [#1016](https://github.com/ghostery/adblocker/pull/1016) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.17.0 to 2.17.1 [#1012](https://github.com/ghostery/adblocker/pull/1012) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.3.2 to 8.3.3 [#1011](https://github.com/ghostery/adblocker/pull/1011) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.16.1 to 2.17.0 [#1008](https://github.com/ghostery/adblocker/pull/1008) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.33 to 5.6.34 [#1006](https://github.com/ghostery/adblocker/pull/1006) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 3.3.0 to 4.0.0 [#1004](https://github.com/ghostery/adblocker/pull/1004) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.3.1 to 8.3.2 [#1003](https://github.com/ghostery/adblocker/pull/1003) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @remusao/small from 1.1.2 to 1.2.0 [#1000](https://github.com/ghostery/adblocker/pull/1000) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.31 to 5.6.33 [#1001](https://github.com/ghostery/adblocker/pull/1001) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.15.0 to 2.16.1 [#996](https://github.com/ghostery/adblocker/pull/996) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @remusao/guess-url-type from 1.1.2 to 1.2.0 [#998](https://github.com/ghostery/adblocker/pull/998) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @remusao/smaz from 1.8.0 to 1.9.0 [#999](https://github.com/ghostery/adblocker/pull/999) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @remusao/smaz-generate from 1.8.0 to 1.9.0 [#997](https://github.com/ghostery/adblocker/pull/997) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.30 to 5.6.31 [#989](https://github.com/ghostery/adblocker/pull/989) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump playwright from 1.1.0 to 1.1.1 [#987](https://github.com/ghostery/adblocker/pull/987) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.118 to 0.0.119 [#1063](https://github.com/ghostery/adblocker/pull/1063) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.117 to 0.0.118 [#1057](https://github.com/ghostery/adblocker/pull/1057) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.18.0 to 0.19.0 [#1037](https://github.com/ghostery/adblocker/pull/1037) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.17.0 to 0.18.0 [#1029](https://github.com/ghostery/adblocker/pull/1029) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.116 to 0.0.117 [#1021](https://github.com/ghostery/adblocker/pull/1021) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.115 to 0.0.116 [#1009](https://github.com/ghostery/adblocker/pull/1009) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.114 to 0.0.115 [#995](https://github.com/ghostery/adblocker/pull/995) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-playwright`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump mocha from 7.2.0 to 8.0.1 [#986](https://github.com/ghostery/adblocker/pull/986) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.16.0 (Wed Jun 10 2020)

#### :rocket: New Feature

- `@cliqz/adblocker-playwright`, `@cliqz/adblocker`
  - feature: add support for Playwright blocking [#417](https://github.com/ghostery/adblocker/pull/417) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#982](https://github.com/ghostery/adblocker/pull/982) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#978](https://github.com/ghostery/adblocker/pull/978) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#972](https://github.com/ghostery/adblocker/pull/972) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#971](https://github.com/ghostery/adblocker/pull/971) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#970](https://github.com/ghostery/adblocker/pull/970) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#966](https://github.com/ghostery/adblocker/pull/966) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#960](https://github.com/ghostery/adblocker/pull/960) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#958](https://github.com/ghostery/adblocker/pull/958) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#953](https://github.com/ghostery/adblocker/pull/953) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#950](https://github.com/ghostery/adblocker/pull/950) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#948](https://github.com/ghostery/adblocker/pull/948) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#946](https://github.com/ghostery/adblocker/pull/946) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#940](https://github.com/ghostery/adblocker/pull/940) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#935](https://github.com/ghostery/adblocker/pull/935) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#933](https://github.com/ghostery/adblocker/pull/933) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#932](https://github.com/ghostery/adblocker/pull/932) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump chalk from 4.0.0 to 4.1.0 [#984](https://github.com/ghostery/adblocker/pull/984) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.14.0 to 2.15.0 [#981](https://github.com/ghostery/adblocker/pull/981) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump lerna from 3.22.0 to 3.22.1 [#979](https://github.com/ghostery/adblocker/pull/979) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.0.0 to 8.0.1 [#976](https://github.com/ghostery/adblocker/pull/976) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.29 to 5.6.30 [#974](https://github.com/ghostery/adblocker/pull/974) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.13.1 to 2.14.0 [#975](https://github.com/ghostery/adblocker/pull/975) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.38.2 to 9.39.0 [#969](https://github.com/ghostery/adblocker/pull/969) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.3 to 3.9.5 [#967](https://github.com/ghostery/adblocker/pull/967) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.13.0 to 2.13.1 [#965](https://github.com/ghostery/adblocker/pull/965) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.38.1 to 9.38.2 [#963](https://github.com/ghostery/adblocker/pull/963) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.38.0 to 9.38.1 [#962](https://github.com/ghostery/adblocker/pull/962) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.12.1 to 2.13.0 [#961](https://github.com/ghostery/adblocker/pull/961) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.12.0 to 2.12.1 [#959](https://github.com/ghostery/adblocker/pull/959) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 3.2.0 to 3.3.0 [#957](https://github.com/ghostery/adblocker/pull/957) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.3.0 to 8.3.1 [#954](https://github.com/ghostery/adblocker/pull/954) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump nyc from 15.0.1 to 15.1.0 [#952](https://github.com/ghostery/adblocker/pull/952) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.37.0 to 9.38.0 [#951](https://github.com/ghostery/adblocker/pull/951) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.11.2 to 2.12.0 [#949](https://github.com/ghostery/adblocker/pull/949) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.36.4 to 9.37.0 [#945](https://github.com/ghostery/adblocker/pull/945) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 3.1.0 to 3.2.0 [#944](https://github.com/ghostery/adblocker/pull/944) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.36.3 to 9.36.4 [#943](https://github.com/ghostery/adblocker/pull/943) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.36.2 to 9.36.3 [#942](https://github.com/ghostery/adblocker/pull/942) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.28 to 5.6.29 [#941](https://github.com/ghostery/adblocker/pull/941) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump ts-node from 8.10.1 to 8.10.2 [#939](https://github.com/ghostery/adblocker/pull/939) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.27 to 5.6.28 [#938](https://github.com/ghostery/adblocker/pull/938) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.11.0 to 2.11.2 [#937](https://github.com/ghostery/adblocker/pull/937) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.9 to 2.11.0 [#936](https://github.com/ghostery/adblocker/pull/936) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.26 to 5.6.27 [#934](https://github.com/ghostery/adblocker/pull/934) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`
  - build(deps-dev): bump @rollup/plugin-commonjs from 12.0.0 to 13.0.0 [#977](https://github.com/ghostery/adblocker/pull/977) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.16.0 to 0.17.0 [#973](https://github.com/ghostery/adblocker/pull/973) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.25.2 to 0.26.0 [#956](https://github.com/ghostery/adblocker/pull/956) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.15.1 (Mon May 25 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Make fast hash outputs consistent and fix use of globals [#931](https://github.com/ghostery/adblocker/pull/931) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#929](https://github.com/ghostery/adblocker/pull/929) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#926](https://github.com/ghostery/adblocker/pull/926) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump lerna from 3.21.0 to 3.22.0 [#930](https://github.com/ghostery/adblocker/pull/930) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.8 to 2.10.9 [#928](https://github.com/ghostery/adblocker/pull/928) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.36.1 to 9.36.2 [#927](https://github.com/ghostery/adblocker/pull/927) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.15.0 to 0.16.0 [#925](https://github.com/ghostery/adblocker/pull/925) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.15.0 (Sat May 23 2020)

#### :running_woman: Performance

- `@cliqz/adblocker`
  - Speed-up index creation by using a typed array as histogram. [#924](https://github.com/ghostery/adblocker/pull/924) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Extension engine size script [#921](https://github.com/ghostery/adblocker/pull/921) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#917](https://github.com/ghostery/adblocker/pull/917) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#908](https://github.com/ghostery/adblocker/pull/908) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#900](https://github.com/ghostery/adblocker/pull/900) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#892](https://github.com/ghostery/adblocker/pull/892) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#890](https://github.com/ghostery/adblocker/pull/890) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#886](https://github.com/ghostery/adblocker/pull/886) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#876](https://github.com/ghostery/adblocker/pull/876) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#874](https://github.com/ghostery/adblocker/pull/874) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#867](https://github.com/ghostery/adblocker/pull/867) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#861](https://github.com/ghostery/adblocker/pull/861) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#859](https://github.com/ghostery/adblocker/pull/859) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#857](https://github.com/ghostery/adblocker/pull/857) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#856](https://github.com/ghostery/adblocker/pull/856) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#854](https://github.com/ghostery/adblocker/pull/854) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#849](https://github.com/ghostery/adblocker/pull/849) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump mocha from 7.1.2 to 7.2.0 [#923](https://github.com/ghostery/adblocker/pull/923) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.25 to 5.6.26 [#922](https://github.com/ghostery/adblocker/pull/922) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.36.0 to 9.36.1 [#920](https://github.com/ghostery/adblocker/pull/920) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.7 to 2.10.8 [#919](https://github.com/ghostery/adblocker/pull/919) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.35.2 to 9.36.0 [#918](https://github.com/ghostery/adblocker/pull/918) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.35.1 to 9.35.2 [#915](https://github.com/ghostery/adblocker/pull/915) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.5 to 2.10.7 [#914](https://github.com/ghostery/adblocker/pull/914) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.35.0 to 9.35.1 [#913](https://github.com/ghostery/adblocker/pull/913) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.34.1 to 9.35.0 [#912](https://github.com/ghostery/adblocker/pull/912) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.3 to 9.0.4 [#911](https://github.com/ghostery/adblocker/pull/911) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.2 to 3.9.3 [#903](https://github.com/ghostery/adblocker/pull/903) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.4 to 2.10.5 [#902](https://github.com/ghostery/adblocker/pull/902) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.1 to 9.0.3 [#901](https://github.com/ghostery/adblocker/pull/901) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.33.2 to 9.34.1 [#897](https://github.com/ghostery/adblocker/pull/897) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.3 to 2.10.4 [#895](https://github.com/ghostery/adblocker/pull/895) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.2 to 2.10.3 [#894](https://github.com/ghostery/adblocker/pull/894) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.32.3 to 9.33.2 [#893](https://github.com/ghostery/adblocker/pull/893) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 3.0.4 to 3.1.0 [#891](https://github.com/ghostery/adblocker/pull/891) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.32.2 to 9.32.3 [#889](https://github.com/ghostery/adblocker/pull/889) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.32.1 to 9.32.2 [#888](https://github.com/ghostery/adblocker/pull/888) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.32.0 to 9.32.1 [#887](https://github.com/ghostery/adblocker/pull/887) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon from 9.0.0 to 9.0.1 [#884](https://github.com/ghostery/adblocker/pull/884) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.1 to 2.10.2 [#882](https://github.com/ghostery/adblocker/pull/882) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/benchmark from 1.0.32 to 1.0.33 [#880](https://github.com/ghostery/adblocker/pull/880) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.10.0 to 2.10.1 [#879](https://github.com/ghostery/adblocker/pull/879) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.2.5 to 8.3.0 [#878](https://github.com/ghostery/adblocker/pull/878) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.9.1 to 2.10.0 [#872](https://github.com/ghostery/adblocker/pull/872) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump lerna from 3.20.2 to 3.21.0 [#871](https://github.com/ghostery/adblocker/pull/871) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.8.3 to 3.9.2 [#868](https://github.com/ghostery/adblocker/pull/868) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/benchmark from 1.0.31 to 1.0.32 [#866](https://github.com/ghostery/adblocker/pull/866) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/puppeteer from 2.0.1 to 2.1.0 [#864](https://github.com/ghostery/adblocker/pull/864) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.31.2 to 9.32.0 [#863](https://github.com/ghostery/adblocker/pull/863) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.31.1 to 9.31.2 [#862](https://github.com/ghostery/adblocker/pull/862) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.9.0 to 2.9.1 [#860](https://github.com/ghostery/adblocker/pull/860) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.8.2 to 2.9.0 [#858](https://github.com/ghostery/adblocker/pull/858) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup-plugin-sourcemaps from 0.6.1 to 0.6.2 [#855](https://github.com/ghostery/adblocker/pull/855) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 3.0.3 to 3.0.4 [#853](https://github.com/ghostery/adblocker/pull/853) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.8.1 to 2.8.2 [#852](https://github.com/ghostery/adblocker/pull/852) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.8.0 to 2.8.1 [#851](https://github.com/ghostery/adblocker/pull/851) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.24 to 5.6.25 [#850](https://github.com/ghostery/adblocker/pull/850) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 3.0.2 to 3.0.3 [#848](https://github.com/ghostery/adblocker/pull/848) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.113 to 0.0.114 [#909](https://github.com/ghostery/adblocker/pull/909) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump @rollup/plugin-node-resolve from 7.1.3 to 8.0.0 [#907](https://github.com/ghostery/adblocker/pull/907) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`
  - build(deps-dev): bump @rollup/plugin-commonjs from 11.1.0 to 12.0.0 [#906](https://github.com/ghostery/adblocker/pull/906) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-puppeteer`
  - build(deps): bump @types/puppeteer from 2.1.0 to 3.0.0 [#899](https://github.com/ghostery/adblocker/pull/899) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.112 to 0.0.113 [#898](https://github.com/ghostery/adblocker/pull/898) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.111 to 0.0.112 [#881](https://github.com/ghostery/adblocker/pull/881) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.110 to 0.0.111 [#877](https://github.com/ghostery/adblocker/pull/877) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.109 to 0.0.110 [#875](https://github.com/ghostery/adblocker/pull/875) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.108 to 0.0.109 [#873](https://github.com/ghostery/adblocker/pull/873) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.107 to 0.0.108 [#865](https://github.com/ghostery/adblocker/pull/865) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.4 (Wed May 06 2020)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Update local assets with new list [#847](https://github.com/ghostery/adblocker/pull/847) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#845](https://github.com/ghostery/adblocker/pull/845) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :memo: Documentation

- Update README.md [#841](https://github.com/ghostery/adblocker/pull/841) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump rollup from 2.7.6 to 2.8.0 [#846](https://github.com/ghostery/adblocker/pull/846) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.30.5 to 9.31.1 [#842](https://github.com/ghostery/adblocker/pull/842) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.106 to 0.0.107 [#843](https://github.com/ghostery/adblocker/pull/843) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.3 (Mon May 04 2020)

#### ⚠️  Pushed to `master`

- Update README.md with Cliqz badge ([@remusao](https://github.com/remusao))

#### :house: Internal

- Optimize static assets [#829](https://github.com/ghostery/adblocker/pull/829) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#840](https://github.com/ghostery/adblocker/pull/840) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#839](https://github.com/ghostery/adblocker/pull/839) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#834](https://github.com/ghostery/adblocker/pull/834) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#831](https://github.com/ghostery/adblocker/pull/831) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#822](https://github.com/ghostery/adblocker/pull/822) ([@adblocker-bot](https://github.com/adblocker-bot) [@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#817](https://github.com/ghostery/adblocker/pull/817) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#815](https://github.com/ghostery/adblocker/pull/815) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#807](https://github.com/ghostery/adblocker/pull/807) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#804](https://github.com/ghostery/adblocker/pull/804) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#803](https://github.com/ghostery/adblocker/pull/803) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#801](https://github.com/ghostery/adblocker/pull/801) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#794](https://github.com/ghostery/adblocker/pull/794) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump ts-node from 8.9.1 to 8.10.1 [#838](https://github.com/ghostery/adblocker/pull/838) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.30.4 to 9.30.5 [#836](https://github.com/ghostery/adblocker/pull/836) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.30.3 to 9.30.4 [#835](https://github.com/ghostery/adblocker/pull/835) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.2.4 to 8.2.5 [#828](https://github.com/ghostery/adblocker/pull/828) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.7.5 to 2.7.6 [#827](https://github.com/ghostery/adblocker/pull/827) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.7.4 to 2.7.5 [#824](https://github.com/ghostery/adblocker/pull/824) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.7.3 to 2.7.4 [#823](https://github.com/ghostery/adblocker/pull/823) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 3.0.1 to 3.0.2 [#821](https://github.com/ghostery/adblocker/pull/821) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.2.3 to 8.2.4 [#820](https://github.com/ghostery/adblocker/pull/820) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.30.2 to 9.30.3 [#819](https://github.com/ghostery/adblocker/pull/819) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.7.2 to 2.7.3 [#818](https://github.com/ghostery/adblocker/pull/818) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump tslint from 6.1.1 to 6.1.2 [#816](https://github.com/ghostery/adblocker/pull/816) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 7.1.1 to 7.1.2 [#810](https://github.com/ghostery/adblocker/pull/810) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.30.1 to 9.30.2 [#809](https://github.com/ghostery/adblocker/pull/809) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump ts-node from 8.9.0 to 8.9.1 [#808](https://github.com/ghostery/adblocker/pull/808) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump concurrently from 5.1.0 to 5.2.0 [#806](https://github.com/ghostery/adblocker/pull/806) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.23 to 5.6.24 [#805](https://github.com/ghostery/adblocker/pull/805) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.7.1 to 2.7.2 [#800](https://github.com/ghostery/adblocker/pull/800) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.30.0 to 9.30.1 [#799](https://github.com/ghostery/adblocker/pull/799) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.29.0 to 9.30.0 [#798](https://github.com/ghostery/adblocker/pull/798) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 3.0.0 to 3.0.1 [#797](https://github.com/ghostery/adblocker/pull/797) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.7.0 to 2.7.1 [#795](https://github.com/ghostery/adblocker/pull/795) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.28.3 to 9.29.0 [#793](https://github.com/ghostery/adblocker/pull/793) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.6.1 to 2.7.0 [#792](https://github.com/ghostery/adblocker/pull/792) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump prettier from 2.0.4 to 2.0.5 [#791](https://github.com/ghostery/adblocker/pull/791) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension`
  - build(deps): bump webextension-polyfill-ts from 0.14.0 to 0.15.0 [#833](https://github.com/ghostery/adblocker/pull/833) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump rollup-plugin-sourcemaps from 0.5.0 to 0.6.1 [#830](https://github.com/ghostery/adblocker/pull/830) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.104 to 0.0.106 [#813](https://github.com/ghostery/adblocker/pull/813) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.2 (Tue Apr 21 2020)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Make third-party detection more robust [#790](https://github.com/ghostery/adblocker/pull/790) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#788](https://github.com/ghostery/adblocker/pull/788) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#785](https://github.com/ghostery/adblocker/pull/785) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#784](https://github.com/ghostery/adblocker/pull/784) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#782](https://github.com/ghostery/adblocker/pull/782) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#778](https://github.com/ghostery/adblocker/pull/778) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#775](https://github.com/ghostery/adblocker/pull/775) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#773](https://github.com/ghostery/adblocker/pull/773) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#769](https://github.com/ghostery/adblocker/pull/769) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#764](https://github.com/ghostery/adblocker/pull/764) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#760](https://github.com/ghostery/adblocker/pull/760) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#755](https://github.com/ghostery/adblocker/pull/755) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#750](https://github.com/ghostery/adblocker/pull/750) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump ts-node from 8.8.2 to 8.9.0 [#789](https://github.com/ghostery/adblocker/pull/789) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.28.0 to 9.28.3 [#787](https://github.com/ghostery/adblocker/pull/787) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.27.3 to 9.28.0 [#781](https://github.com/ghostery/adblocker/pull/781) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.2.2 to 8.2.3 [#780](https://github.com/ghostery/adblocker/pull/780) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.27.2 to 9.27.3 [#779](https://github.com/ghostery/adblocker/pull/779) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump puppeteer from 2.1.1 to 3.0.0 [#777](https://github.com/ghostery/adblocker/pull/777) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.27.1 to 9.27.2 [#776](https://github.com/ghostery/adblocker/pull/776) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.27.0 to 9.27.1 [#774](https://github.com/ghostery/adblocker/pull/774) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.26.8 to 9.27.0 [#772](https://github.com/ghostery/adblocker/pull/772) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.2.1 to 8.2.2 [#770](https://github.com/ghostery/adblocker/pull/770) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.25.1 to 0.25.2 [#768](https://github.com/ghostery/adblocker/pull/768) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.25.0 to 0.25.1 [#767](https://github.com/ghostery/adblocker/pull/767) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.6.0 to 2.6.1 [#765](https://github.com/ghostery/adblocker/pull/765) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-commonjs from 11.0.2 to 11.1.0 [#762](https://github.com/ghostery/adblocker/pull/762) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 7.1.2 to 7.1.3 [#763](https://github.com/ghostery/adblocker/pull/763) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 7.1.1 to 7.1.2 [#761](https://github.com/ghostery/adblocker/pull/761) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node-fetch from 2.5.5 to 2.5.6 [#759](https://github.com/ghostery/adblocker/pull/759) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.5.0 to 2.6.0 [#757](https://github.com/ghostery/adblocker/pull/757) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.4.0 to 2.5.0 [#756](https://github.com/ghostery/adblocker/pull/756) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.22 to 5.6.23 [#754](https://github.com/ghostery/adblocker/pull/754) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.3.5 to 2.4.0 [#753](https://github.com/ghostery/adblocker/pull/753) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.3.4 to 2.3.5 [#752](https://github.com/ghostery/adblocker/pull/752) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.24.0 to 0.25.0 [#766](https://github.com/ghostery/adblocker/pull/766) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  - build(deps): bump @types/chrome from 0.0.103 to 0.0.104 [#751](https://github.com/ghostery/adblocker/pull/751) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

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

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Fix domain options with subdomains and more... [#746](https://github.com/ghostery/adblocker/pull/746) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#749](https://github.com/ghostery/adblocker/pull/749) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump auto from 9.26.7 to 9.26.8 [#748](https://github.com/ghostery/adblocker/pull/748) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
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

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Various improvements [#738](https://github.com/ghostery/adblocker/pull/738) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#740](https://github.com/ghostery/adblocker/pull/740) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#734](https://github.com/ghostery/adblocker/pull/734) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#727](https://github.com/ghostery/adblocker/pull/727) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#721](https://github.com/ghostery/adblocker/pull/721) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#719](https://github.com/ghostery/adblocker/pull/719) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump sinon from 9.0.1 to 9.0.2 [#745](https://github.com/ghostery/adblocker/pull/745) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.26.6 to 9.26.7 [#744](https://github.com/ghostery/adblocker/pull/744) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.26.5 to 9.26.6 [#743](https://github.com/ghostery/adblocker/pull/743) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.3.3 to 2.3.4 [#742](https://github.com/ghostery/adblocker/pull/742) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.21 to 5.6.22 [#741](https://github.com/ghostery/adblocker/pull/741) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.26.4 to 9.26.5 [#739](https://github.com/ghostery/adblocker/pull/739) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.26.3 to 9.26.4 [#737](https://github.com/ghostery/adblocker/pull/737) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump electron from 8.2.0 to 8.2.1 [#736](https://github.com/ghostery/adblocker/pull/736) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.26.2 to 9.26.3 [#735](https://github.com/ghostery/adblocker/pull/735) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump prettier from 2.0.3 to 2.0.4 [#731](https://github.com/ghostery/adblocker/pull/731) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.20 to 5.6.21 [#733](https://github.com/ghostery/adblocker/pull/733) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.26.1 to 9.26.2 [#732](https://github.com/ghostery/adblocker/pull/732) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @remusao/auto-config from 1.1.0 to 1.1.1 [#730](https://github.com/ghostery/adblocker/pull/730) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.26.0 to 9.26.1 [#729](https://github.com/ghostery/adblocker/pull/729) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump prettier from 2.0.2 to 2.0.3 [#728](https://github.com/ghostery/adblocker/pull/728) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.25.4 to 9.26.0 [#726](https://github.com/ghostery/adblocker/pull/726) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.25.2 to 9.25.4 [#725](https://github.com/ghostery/adblocker/pull/725) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump ts-node from 8.8.1 to 8.8.2 [#724](https://github.com/ghostery/adblocker/pull/724) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.3.2 to 2.3.3 [#723](https://github.com/ghostery/adblocker/pull/723) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.19 to 5.6.20 [#722](https://github.com/ghostery/adblocker/pull/722) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.25.1 to 9.25.2 [#720](https://github.com/ghostery/adblocker/pull/720) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.25.0 to 9.25.1 [#718](https://github.com/ghostery/adblocker/pull/718) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump nyc from 15.0.0 to 15.0.1 [#717](https://github.com/ghostery/adblocker/pull/717) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump sandboxed-module from 2.0.3 to 2.0.4 [#716](https://github.com/ghostery/adblocker/pull/716) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.1 (Fri Apr 03 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker-puppeteer`
  - Correctly redirect to binary resources in puppeteer blocker [#715](https://github.com/ghostery/adblocker/pull/715) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#711](https://github.com/ghostery/adblocker/pull/711) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#704](https://github.com/ghostery/adblocker/pull/704) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#699](https://github.com/ghostery/adblocker/pull/699) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Move from jest to mocha + chai [#682](https://github.com/ghostery/adblocker/pull/682) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#693](https://github.com/ghostery/adblocker/pull/693) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :memo: Documentation

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`
  - Fix line break in CHANGELOG.md [#691](https://github.com/ghostery/adblocker/pull/691) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump auto from 9.24.0 to 9.25.0 [#714](https://github.com/ghostery/adblocker/pull/714) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.23.1 to 9.24.0 [#713](https://github.com/ghostery/adblocker/pull/713) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.23.0 to 9.23.1 [#712](https://github.com/ghostery/adblocker/pull/712) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.18 to 5.6.19 [#710](https://github.com/ghostery/adblocker/pull/710) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump chalk from 3.0.0 to 4.0.0 [#708](https://github.com/ghostery/adblocker/pull/708) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump tslint from 6.1.0 to 6.1.1 [#707](https://github.com/ghostery/adblocker/pull/707) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.22.4 to 9.23.0 [#706](https://github.com/ghostery/adblocker/pull/706) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.17 to 5.6.18 [#705](https://github.com/ghostery/adblocker/pull/705) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.22.2 to 9.22.4 [#703](https://github.com/ghostery/adblocker/pull/703) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/sinon-chai from 3.2.3 to 3.2.4 [#701](https://github.com/ghostery/adblocker/pull/701) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.3.1 to 2.3.2 [#700](https://github.com/ghostery/adblocker/pull/700) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.16 to 5.6.17 [#695](https://github.com/ghostery/adblocker/pull/695) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.3.0 to 2.3.1 [#694](https://github.com/ghostery/adblocker/pull/694) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.22.1 to 9.22.2 [#692](https://github.com/ghostery/adblocker/pull/692) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension-cosmetics`
  - build(deps-dev): bump @types/sinon from 7.5.2 to 9.0.0 [#702](https://github.com/ghostery/adblocker/pull/702) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.0 (Mon Mar 30 2020)

### Release Notes

_From #690_

PuppeteerBlocker is now more powerful and will be able to better block ads on most websites. Firstly, a bug was fixed which prevented injection of cosmetics in the main frame of pages. Secondly, PuppeteerBlocker will now monitor the DOM for changes to make sure that ads which load later are still "handled" (if you know what I mean). Lastly, PuppeteerBlocker is now able to look for advertisement iframes and remove them from the DOM completely, no more blank spaces left unattended...

---

#### :rocket: New Feature

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension-cosmetics`
  - Fix PuppeteerBlocker and enable blocking of frames and DOM monitoring. [#690](https://github.com/ghostery/adblocker/pull/690) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets [#685](https://github.com/ghostery/adblocker/pull/685) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets [#681](https://github.com/ghostery/adblocker/pull/681) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump jsdom from 16.2.1 to 16.2.2 [#688](https://github.com/ghostery/adblocker/pull/688) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.15 to 5.6.16 [#686](https://github.com/ghostery/adblocker/pull/686) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.2.0 to 2.3.0 [#687](https://github.com/ghostery/adblocker/pull/687) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.3 (Sat Mar 28 2020)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Do not try to get resources from CDN [#680](https://github.com/ghostery/adblocker/pull/680) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Make sure updater always gets latest version of resources [#679](https://github.com/ghostery/adblocker/pull/679) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets [#676](https://github.com/ghostery/adblocker/pull/676) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Update README.md [#670](https://github.com/ghostery/adblocker/pull/670) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump auto from 9.22.0 to 9.22.1 [#678](https://github.com/ghostery/adblocker/pull/678) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.21.2 to 9.22.0 [#677](https://github.com/ghostery/adblocker/pull/677) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.21.1 to 9.21.2 [#675](https://github.com/ghostery/adblocker/pull/675) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.21.0 to 9.21.1 [#674](https://github.com/ghostery/adblocker/pull/674) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.102 to 0.0.103 [#671](https://github.com/ghostery/adblocker/pull/671) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.2 (Fri Mar 27 2020)

#### ⚠️  Pushed to `master`

- Update README.md ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#667](https://github.com/ghostery/adblocker/pull/667) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

-  [#669](https://github.com/ghostery/adblocker/pull/669) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#668](https://github.com/ghostery/adblocker/pull/668) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.1 (Thu Mar 26 2020)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Make id of fuzzy filter invariant under permutations [#666](https://github.com/ghostery/adblocker/pull/666) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.0 (Thu Mar 26 2020)

#### :running_woman: Performance

- `@cliqz/adblocker`
  - Fine-tune tokenization by preventing buffer overflows in main loop. [#665](https://github.com/ghostery/adblocker/pull/665) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.11.0 (Thu Mar 26 2020)

#### :rocket: New Feature

- `@cliqz/adblocker`
  - Add support for multi-lines filters (i.e. line continuation) [#663](https://github.com/ghostery/adblocker/pull/663) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Fix compression codebooks generation [#660](https://github.com/ghostery/adblocker/pull/660) ([@remusao](https://github.com/remusao))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#659](https://github.com/ghostery/adblocker/pull/659) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

-  [#664](https://github.com/ghostery/adblocker/pull/664) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#662](https://github.com/ghostery/adblocker/pull/662) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#658](https://github.com/ghostery/adblocker/pull/658) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension`
  -  [#661](https://github.com/ghostery/adblocker/pull/661) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.10.1 (Wed Mar 25 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-webextension-cosmetics`
  - Abstract DOM monitoring away and fix #573 [#657](https://github.com/ghostery/adblocker/pull/657) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Attempt to fix security issue [#656](https://github.com/ghostery/adblocker/pull/656) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

-  [#651](https://github.com/ghostery/adblocker/pull/651) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#545](https://github.com/ghostery/adblocker/pull/545) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#539](https://github.com/ghostery/adblocker/pull/539) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.10.0 (Wed Mar 25 2020)

#### :running_woman: Performance

- `@cliqz/adblocker`
  - Various optimizations. [#655](https://github.com/ghostery/adblocker/pull/655) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#652](https://github.com/ghostery/adblocker/pull/652) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#648](https://github.com/ghostery/adblocker/pull/648) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#645](https://github.com/ghostery/adblocker/pull/645) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#637](https://github.com/ghostery/adblocker/pull/637) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#636](https://github.com/ghostery/adblocker/pull/636) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#633](https://github.com/ghostery/adblocker/pull/633) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#628](https://github.com/ghostery/adblocker/pull/628) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#626](https://github.com/ghostery/adblocker/pull/626) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#625](https://github.com/ghostery/adblocker/pull/625) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#623](https://github.com/ghostery/adblocker/pull/623) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#622](https://github.com/ghostery/adblocker/pull/622) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#620](https://github.com/ghostery/adblocker/pull/620) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#616](https://github.com/ghostery/adblocker/pull/616) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#613](https://github.com/ghostery/adblocker/pull/613) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#608](https://github.com/ghostery/adblocker/pull/608) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#604](https://github.com/ghostery/adblocker/pull/604) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#601](https://github.com/ghostery/adblocker/pull/601) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#597](https://github.com/ghostery/adblocker/pull/597) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#590](https://github.com/ghostery/adblocker/pull/590) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#572](https://github.com/ghostery/adblocker/pull/572) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#568](https://github.com/ghostery/adblocker/pull/568) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#562](https://github.com/ghostery/adblocker/pull/562) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#557](https://github.com/ghostery/adblocker/pull/557) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#556](https://github.com/ghostery/adblocker/pull/556) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#554](https://github.com/ghostery/adblocker/pull/554) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#549](https://github.com/ghostery/adblocker/pull/549) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#548](https://github.com/ghostery/adblocker/pull/548) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

-  [#650](https://github.com/ghostery/adblocker/pull/650) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#649](https://github.com/ghostery/adblocker/pull/649) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#644](https://github.com/ghostery/adblocker/pull/644) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#642](https://github.com/ghostery/adblocker/pull/642) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#641](https://github.com/ghostery/adblocker/pull/641) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#640](https://github.com/ghostery/adblocker/pull/640) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#639](https://github.com/ghostery/adblocker/pull/639) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#638](https://github.com/ghostery/adblocker/pull/638) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#635](https://github.com/ghostery/adblocker/pull/635) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#634](https://github.com/ghostery/adblocker/pull/634) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#632](https://github.com/ghostery/adblocker/pull/632) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#630](https://github.com/ghostery/adblocker/pull/630) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#627](https://github.com/ghostery/adblocker/pull/627) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#624](https://github.com/ghostery/adblocker/pull/624) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#621](https://github.com/ghostery/adblocker/pull/621) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#619](https://github.com/ghostery/adblocker/pull/619) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#615](https://github.com/ghostery/adblocker/pull/615) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#614](https://github.com/ghostery/adblocker/pull/614) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#612](https://github.com/ghostery/adblocker/pull/612) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#611](https://github.com/ghostery/adblocker/pull/611) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#610](https://github.com/ghostery/adblocker/pull/610) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#609](https://github.com/ghostery/adblocker/pull/609) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#607](https://github.com/ghostery/adblocker/pull/607) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#605](https://github.com/ghostery/adblocker/pull/605) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#603](https://github.com/ghostery/adblocker/pull/603) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#602](https://github.com/ghostery/adblocker/pull/602) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#600](https://github.com/ghostery/adblocker/pull/600) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#599](https://github.com/ghostery/adblocker/pull/599) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#598](https://github.com/ghostery/adblocker/pull/598) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#595](https://github.com/ghostery/adblocker/pull/595) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#594](https://github.com/ghostery/adblocker/pull/594) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#593](https://github.com/ghostery/adblocker/pull/593) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#592](https://github.com/ghostery/adblocker/pull/592) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#591](https://github.com/ghostery/adblocker/pull/591) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#589](https://github.com/ghostery/adblocker/pull/589) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#583](https://github.com/ghostery/adblocker/pull/583) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#582](https://github.com/ghostery/adblocker/pull/582) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#580](https://github.com/ghostery/adblocker/pull/580) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#579](https://github.com/ghostery/adblocker/pull/579) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#578](https://github.com/ghostery/adblocker/pull/578) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#576](https://github.com/ghostery/adblocker/pull/576) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#575](https://github.com/ghostery/adblocker/pull/575) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#574](https://github.com/ghostery/adblocker/pull/574) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#571](https://github.com/ghostery/adblocker/pull/571) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#570](https://github.com/ghostery/adblocker/pull/570) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#569](https://github.com/ghostery/adblocker/pull/569) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#566](https://github.com/ghostery/adblocker/pull/566) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#564](https://github.com/ghostery/adblocker/pull/564) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#563](https://github.com/ghostery/adblocker/pull/563) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#559](https://github.com/ghostery/adblocker/pull/559) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#558](https://github.com/ghostery/adblocker/pull/558) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#555](https://github.com/ghostery/adblocker/pull/555) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#551](https://github.com/ghostery/adblocker/pull/551) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  -  [#653](https://github.com/ghostery/adblocker/pull/653) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  -  [#629](https://github.com/ghostery/adblocker/pull/629) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  -  [#617](https://github.com/ghostery/adblocker/pull/617) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-webextension`
  -  [#596](https://github.com/ghostery/adblocker/pull/596) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-circumvention`, `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  -  [#587](https://github.com/ghostery/adblocker/pull/587) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-circumvention`, `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  -  [#586](https://github.com/ghostery/adblocker/pull/586) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-circumvention`, `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  -  [#560](https://github.com/ghostery/adblocker/pull/560) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  -  [#577](https://github.com/ghostery/adblocker/pull/577) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  -  [#552](https://github.com/ghostery/adblocker/pull/552) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.2 (Wed Feb 26 2020)

#### :nail_care: Polish

- Target ES2017 to avoid use of __awaiter tslib helper [#541](https://github.com/ghostery/adblocker/pull/541) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#544](https://github.com/ghostery/adblocker/pull/544) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#537](https://github.com/ghostery/adblocker/pull/537) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Automatically bump internal engine version on codebooks update [#536](https://github.com/ghostery/adblocker/pull/536) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

-  [#542](https://github.com/ghostery/adblocker/pull/542) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#540](https://github.com/ghostery/adblocker/pull/540) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#538](https://github.com/ghostery/adblocker/pull/538) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.1 (Sun Feb 23 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - Bump internal engine representation [#534](https://github.com/ghostery/adblocker/pull/534) ([@remusao](https://github.com/remusao))

#### ⚠️  Pushed to master

- `@cliqz/adblocker`
  - Bump internal engine representation  ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#532](https://github.com/ghostery/adblocker/pull/532) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#529](https://github.com/ghostery/adblocker/pull/529) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#525](https://github.com/ghostery/adblocker/pull/525) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Improve tool to list unsupported filter syntax [#524](https://github.com/ghostery/adblocker/pull/524) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

-  [#533](https://github.com/ghostery/adblocker/pull/533) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#531](https://github.com/ghostery/adblocker/pull/531) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#530](https://github.com/ghostery/adblocker/pull/530) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#528](https://github.com/ghostery/adblocker/pull/528) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#527](https://github.com/ghostery/adblocker/pull/527) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#526](https://github.com/ghostery/adblocker/pull/526) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.0 (Thu Feb 20 2020)

#### :running_woman: Performance

- `@cliqz/adblocker`
  - Replace use of setTimeout to delay event by more efficient queueMicrotask. [#523](https://github.com/ghostery/adblocker/pull/523) ([@remusao](https://github.com/remusao))

#### :house: Internal

- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#520](https://github.com/ghostery/adblocker/pull/520) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#515](https://github.com/ghostery/adblocker/pull/515) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#510](https://github.com/ghostery/adblocker/pull/510) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#508](https://github.com/ghostery/adblocker/pull/508) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#503](https://github.com/ghostery/adblocker/pull/503) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#502](https://github.com/ghostery/adblocker/pull/502) ([@adblocker-bot](https://github.com/adblocker-bot))
- `@cliqz/adblocker`
  - Update local assets and compression codebooks [#497](https://github.com/ghostery/adblocker/pull/497) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

-  [#521](https://github.com/ghostery/adblocker/pull/521) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#519](https://github.com/ghostery/adblocker/pull/519) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#517](https://github.com/ghostery/adblocker/pull/517) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#514](https://github.com/ghostery/adblocker/pull/514) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#513](https://github.com/ghostery/adblocker/pull/513) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#509](https://github.com/ghostery/adblocker/pull/509) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#507](https://github.com/ghostery/adblocker/pull/507) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#505](https://github.com/ghostery/adblocker/pull/505) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#498](https://github.com/ghostery/adblocker/pull/498) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker`
  -  [#522](https://github.com/ghostery/adblocker/pull/522) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- `@cliqz/adblocker-circumvention`, `@cliqz/adblocker-content`, `@cliqz/adblocker-webextension-cosmetics`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  -  [#512](https://github.com/ghostery/adblocker/pull/512) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.6 (Thu Feb 13 2020)

#### :nail_care: Polish

- `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension`
  - Move BlockingContext methods back into Blocker class. [#496](https://github.com/ghostery/adblocker/pull/496) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.5 (Thu Feb 13 2020)

#### :nail_care: Polish

- `@cliqz/adblocker`
  - Fetch resources from GitHub repository [#495](https://github.com/ghostery/adblocker/pull/495) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.4 (Thu Feb 13 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker-circumvention`, `@cliqz/adblocker-content`, `@cliqz/adblocker-electron-preload`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Fix implicit tslib dependency [#494](https://github.com/ghostery/adblocker/pull/494) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Add internal label when updating local assets [#492](https://github.com/ghostery/adblocker/pull/492) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.3 (Thu Feb 13 2020)

#### ⚠️  Pushed to master

- `@cliqz/adblocker`
  - Bump internal engine representation  ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.2 (Wed Feb 12 2020)

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - chore: update local assets [#491](https://github.com/ghostery/adblocker/pull/491) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 1

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))

---

# v1.8.1 (Wed Feb 12 2020)

#### :nail_care: Polish

- `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Expose original request details through Request class [#490](https://github.com/ghostery/adblocker/pull/490) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.0 (Wed Feb 12 2020)

#### :running_woman: Performance

- `@cliqz/adblocker-circumvention`, `@cliqz/adblocker-electron`, `@cliqz/adblocker-puppeteer`, `@cliqz/adblocker-webextension`, `@cliqz/adblocker`
  - Target ES6 instead of ES3 [#489](https://github.com/ghostery/adblocker/pull/489) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- `@cliqz/adblocker`
  - chore: update local assets [#485](https://github.com/ghostery/adblocker/pull/485) ([@adblocker-bot](https://github.com/adblocker-bot))

#### ⚠️  Pushed to master

- ci: populate npmrc before publishing  ([@remusao](https://github.com/remusao))

#### :house: Internal

- Adopt auto-publishing workflow [#488](https://github.com/ghostery/adblocker/pull/488) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

-  [#487](https://github.com/ghostery/adblocker/pull/487) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#486](https://github.com/ghostery/adblocker/pull/486) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#482](https://github.com/ghostery/adblocker/pull/482) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

## v1.7.3 (2020-02-11)

#### :nail_care: Polish
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron`, `adblocker-puppeteer`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#481](https://github.com/ghostery/adblocker/pull/481) Fix chrome and browser types ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.7.0 (2020-02-10)

#### :rocket: New Feature
* `adblocker`
  * [#478](https://github.com/ghostery/adblocker/pull/478) Implement redirect-rule filters handling ([@remusao](https://github.com/remusao))
* `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker`
  * [#477](https://github.com/ghostery/adblocker/pull/477) Add helper to cache adblocker engine ([@remusao](https://github.com/remusao))
* `adblocker-electron`, `adblocker-puppeteer`, `adblocker-webextension`
  * [#475](https://github.com/ghostery/adblocker/pull/475) Add helper to know if blocking is enabled in context ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix
* `adblocker`
  * [#476](https://github.com/ghostery/adblocker/pull/476) Put types for chrome and firefox as direct dependencies instead of dev ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.6.0 (2020-02-09)

#### :rocket: New Feature
* `adblocker`
  * [#469](https://github.com/ghostery/adblocker/pull/469) Implement redirect=none semantics ([@remusao](https://github.com/remusao))
  * [#468](https://github.com/ghostery/adblocker/pull/468) Implement specifichide, elemhide and aliases ([@remusao](https://github.com/remusao))
  * [#453](https://github.com/ghostery/adblocker/pull/453) Add support for compound HTML filtering rules ([@remusao](https://github.com/remusao))
* `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#416](https://github.com/ghostery/adblocker/pull/416) Make initializing instances of blockers idempotent ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix
* `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#464](https://github.com/ghostery/adblocker/pull/464) fix: HTML filtering and scriptlets injection ([@remusao](https://github.com/remusao))

#### :nail_care: Polish
* `adblocker`
  * [#471](https://github.com/ghostery/adblocker/pull/471) Handle disabling scriptlets ([@remusao](https://github.com/remusao))
  * [#470](https://github.com/ghostery/adblocker/pull/470) Generic scriptlets are now correctly rejected ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron-preload`, `adblocker-electron`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#452](https://github.com/ghostery/adblocker/pull/452) chore: update Electron to v8.0.0 ([@remusao](https://github.com/remusao))
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#423](https://github.com/ghostery/adblocker/pull/423) chore: update dependencies ([@remusao](https://github.com/remusao))
* Other
  * [#419](https://github.com/ghostery/adblocker/pull/419) chore: automate update of locale assets ([@remusao](https://github.com/remusao))
  * [#418](https://github.com/ghostery/adblocker/pull/418) Only run CI tests on Linux ([@remusao](https://github.com/remusao))

#### Committers: 3
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.5.0 (2020-01-16)

#### :nail_care: Polish
* `adblocker`
  * [#414](https://github.com/ghostery/adblocker/pull/414) Implement retry mechanism while fetching resources ([@remusao](https://github.com/remusao))
* `adblocker-webextension`
  * [#413](https://github.com/ghostery/adblocker/pull/413) webextension: handler for runtime messages now returns a promise ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#415](https://github.com/ghostery/adblocker/pull/415) Clean-up tooling ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.20 (2020-01-15)

#### :house: Internal
* [#412](https://github.com/ghostery/adblocker/pull/412) Migrate local GitHub actions to TypeScript ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.19 (2020-01-15)

#### :house: Internal
* [#410](https://github.com/ghostery/adblocker/pull/410) Add dependabot config into repository ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.12 (2020-01-15)

#### :house: Internal
* [#409](https://github.com/ghostery/adblocker/pull/409) Add action to release on NPM ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.2 (2020-01-15)

#### :memo: Documentation
* [#404](https://github.com/ghostery/adblocker/pull/404) docs: add support for PR labels ([@remusao](https://github.com/remusao))

#### :house: Internal
* [#407](https://github.com/ghostery/adblocker/pull/407) Add GitHub actions for releasing on GitHub ([@remusao](https://github.com/remusao))
* [#405](https://github.com/ghostery/adblocker/pull/405) Make use of GitHub actions for CI ([@remusao](https://github.com/remusao))

#### Committers: 1
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.1 (2019-12-16)

#### :bug: Bug Fix
* `adblocker-puppeteer`
  * [#401](https://github.com/ghostery/adblocker/pull/401) puppeteer: do not block main frames ([@remusao](https://github.com/remusao))

#### :memo: Documentation
* `adblocker`
  * [#400](https://github.com/ghostery/adblocker/pull/400) Fix cosmetics readme ([@fcjr](https://github.com/fcjr))

#### :house: Internal
* [#399](https://github.com/ghostery/adblocker/pull/399) Remove travis config ([@remusao](https://github.com/remusao))
* [#397](https://github.com/ghostery/adblocker/pull/397) Set up CI with Azure Pipelines ([@chrmod](https://github.com/chrmod))

#### Committers: 3
- Frank Chiarulli Jr. ([@fcjr](https://github.com/fcjr))
- Krzysztof Jan Modras ([@chrmod](https://github.com/chrmod))
- Rémi ([@remusao](https://github.com/remusao))


## v1.4.0 (2019-11-12)

#### :bug: Bug Fix
* `adblocker`
  * [#388](https://github.com/ghostery/adblocker/pull/388) Fix websocket filters handling ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker-puppeteer-example`, `adblocker-puppeteer`
  * [#386](https://github.com/ghostery/adblocker/pull/386) Bump puppeteer to v2 ([@remusao](https://github.com/remusao))
* `adblocker-electron-example`, `adblocker-electron`
  * [#385](https://github.com/ghostery/adblocker/pull/385) Bump electron version to 7 + inject CSS with 'user' origin ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.3.1 (2019-10-09)

#### :bug: Bug Fix
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#373](https://github.com/ghostery/adblocker/pull/373) fix: fetching resources.txt from CDN ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.3.0 (2019-10-07)

#### :nail_care: Polish
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#368](https://github.com/ghostery/adblocker/pull/368) make it easier to use HTML filtering outside of `WebExtensionBlocker` ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.2.0 (2019-10-01)

#### :rocket: New Feature
* `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#339](https://github.com/ghostery/adblocker/pull/339) Support html filtering ([@remusao](https://github.com/remusao))
* `adblocker`
  * [#338](https://github.com/ghostery/adblocker/pull/338) feat: add support for 'all' option ([@remusao](https://github.com/remusao))
  * [#337](https://github.com/ghostery/adblocker/pull/337) feat: add support for redirect-rule option ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix
* `adblocker-electron`
  * [#358](https://github.com/ghostery/adblocker/pull/358) fix: cosmetics injection in Electron ([@remusao](https://github.com/remusao))

#### :nail_care: Polish
* `adblocker-webextension`
  * [#359](https://github.com/ghostery/adblocker/pull/359) removeListener regardless of engine config ([@remusao](https://github.com/remusao))
* `adblocker-benchmarks`, `adblocker`
  * [#333](https://github.com/ghostery/adblocker/pull/333) simplify reverse index by removing special tokens handling ([@remusao](https://github.com/remusao))

#### :memo: Documentation
* [#355](https://github.com/ghostery/adblocker/pull/355) Add slides of talk at adblockerdevsummit 2019 ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker`
  * [#335](https://github.com/ghostery/adblocker/pull/335) chore: update local assets + generate compression codebooks ([@remusao](https://github.com/remusao))

#### :running_woman: Performance
* `adblocker-electron-example`, `adblocker-puppeteer-example`, `adblocker-webextension-example`, `adblocker`
  * [#334](https://github.com/ghostery/adblocker/pull/334) chore: clean-ups and small optimizations ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.1.0 (2019-09-17)

#### :rocket: New Feature
* `adblocker-electron`, `adblocker-puppeteer`, `adblocker-webextension`
  * [#328](https://github.com/ghostery/adblocker/pull/328) Allow blocker unload ([@remusao](https://github.com/remusao))
* `adblocker`
  * [#327](https://github.com/ghostery/adblocker/pull/327) feature: support inline-script and inline-font options ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker`
  * [#329](https://github.com/ghostery/adblocker/pull/329) add test case to make sure +js() can be whitelisted ([@remusao](https://github.com/remusao))
* `adblocker-benchmarks`
  * [#314](https://github.com/ghostery/adblocker/pull/314) bench: add runner for minbrowser blocker ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.0.2 (2019-09-02)

#### :bug: Bug Fix
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#312](https://github.com/ghostery/adblocker/pull/312) Fix block main document ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.0.0 (2019-08-27)

#### :nail_care: Polish
* `adblocker-content`, `adblocker-puppeteer-example`, `adblocker`
  * [#300](https://github.com/ghostery/adblocker/pull/300) small improvements ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker-benchmarks`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#294](https://github.com/ghostery/adblocker/pull/294) chore: clean-ups ([@remusao](https://github.com/remusao))
* `adblocker-benchmarks`, `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#255](https://github.com/ghostery/adblocker/pull/255) switch to using @cliqz/metalint for project linting ([@remusao](https://github.com/remusao))
* Other
  * [#293](https://github.com/ghostery/adblocker/pull/293) ci: enable latest Node.js + LTS ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v0.14.0 (2019-08-20)

#### :nail_care: Polish
* `adblocker-electron`, `adblocker-puppeteer`, `adblocker-webextension`
  * [#288](https://github.com/ghostery/adblocker/pull/288) only register listeners when network/cosmetics filtering is enabled ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker`
  * [#290](https://github.com/ghostery/adblocker/pull/290) clean-up and update local assets + regenerate codebooks ([@remusao](https://github.com/remusao))
* Other
  * [#289](https://github.com/ghostery/adblocker/pull/289) chore: remove un-used dependencies ([@remusao](https://github.com/remusao))

#### :running_woman: Performance
* `adblocker-webextension-example`, `adblocker`
  * [#287](https://github.com/ghostery/adblocker/pull/287) Optimize cosmetics injection ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v0.13.0 (2019-08-16)

#### :memo: Documentation
* `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#281](https://github.com/ghostery/adblocker/pull/281) Update readmes ([@remusao](https://github.com/remusao))

#### :house: Internal
* Other
  * [#265](https://github.com/ghostery/adblocker/pull/265) fix memory issue by pinning Node.js version ([@remusao](https://github.com/remusao))
* `adblocker-circumvention`, `adblocker-content`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#264](https://github.com/ghostery/adblocker/pull/264) create new @cliqz/adblocker-content package with common utils ([@remusao](https://github.com/remusao))

#### :running_woman: Performance
* `adblocker`
  * [#257](https://github.com/ghostery/adblocker/pull/257) allow correct size allocation for data views ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v0.12.1 (2019-08-13)

#### :boom: Breaking Change
* `adblocker-electron`, `adblocker`
  * [#248](https://github.com/ghostery/adblocker/pull/248) electron: promote mutationObserver option to main config + fix constructor and parse methods ([@remusao](https://github.com/remusao))

#### :rocket: New Feature
* `adblocker-electron-example`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#251](https://github.com/ghostery/adblocker/pull/251) implement simple event emitter for FiltersEngine and sub-classes ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix
* `adblocker-circumvention`, `adblocker-electron-example`, `adblocker-electron`, `adblocker-puppeteer-example`, `adblocker-puppeteer`, `adblocker-webextension-cosmetics`, `adblocker-webextension-example`, `adblocker-webextension`, `adblocker`
  * [#219](https://github.com/ghostery/adblocker/pull/219) fix source maps in all packages ([@remusao](https://github.com/remusao))

#### :house: Internal
* `adblocker`
  * [#256](https://github.com/ghostery/adblocker/pull/256) Update assets + re-generate compression codebooks ([@remusao](https://github.com/remusao))
* `adblocker-electron-example`, `adblocker-electron`, `adblocker`
  * [#250](https://github.com/ghostery/adblocker/pull/250) electron: update to 6.0.1 ([@remusao](https://github.com/remusao))

#### Committers: 2
- Rémi ([@remusao](https://github.com/remusao))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)
