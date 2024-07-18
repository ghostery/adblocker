<h1 align="center">Adblocker</h2>

<p align="center">
  <em>
    Efficient
    · Minimal
    · JavaScript
    · TypeScript
    · uBlock Origin- and Easylist-compatible
  </em>
  <br />
  <em>
    <a href="https://github.com/ghostery/adblocker/tree/master/packages/adblocker">Node.js</a>
    · <a href="https://github.com/ghostery/adblocker/tree/master/packages/adblocker-puppeteer">Puppeteer</a>
    · <a href="https://github.com/ghostery/adblocker/tree/master/packages/adblocker-electron">Electron</a>
    · <a href="https://github.com/ghostery/adblocker/tree/master/packages/adblocker-webextension">WebExtension</a>
  </em>
</p>

<p align="center">
  <a href="https://github.com/ghostery/adblocker/actions?query=workflow%3ATests">
    <img alt="Github Actions Build Status" src="https://img.shields.io/github/actions/workflow/status/ghostery/adblocker/tests.yml?label=tests&style=flat-square"></a>
  <a href="https://github.com/ghostery/adblocker/actions?query=workflow%3Assets">
    <img alt="Github Actions Assets Status" src="https://img.shields.io/github/actions/workflow/status/ghostery/adblocker/assets.yml?label=assets&style=flat-square"></a>
  <a href="https://twitter.com/acdlite/status/974390255393505280">
    <img alt="Blazing Fast" src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@cliqz/adblocker">
    <img alt="npm version" src="https://img.shields.io/npm/v/@cliqz/adblocker.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@cliqz/adblocker">
    <img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/@cliqz/adblocker.svg?style=flat-square"></a>
  <br/>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
  <a href="https://twitter.com/ghostery">
    <img alt="Follow Ghostery on Twitter" src="https://img.shields.io/twitter/follow/ghostery.svg?label=follow+ghostery&style=flat-square"></a>
  <a href="https://github.com/ghostery/adblocker">
    <img alt="Dependabot" src="https://img.shields.io/badge/dependabot-enabled-brightgreen?logo=dependabot&style=flat-square"></a>
  <a href="https://github.com/ghostery/adblocker/blob/master/LICENSE">
    <img alt="License Badge" src="https://img.shields.io/github/license/ghostery/adblocker?style=flat-square"></a>
</p>

---

The Ghostery adblocker is a JavaScript library for *blocking ads, trackers, and annoyances* with a strong focus on [efficiency](https://whotracks.me/blog/adblockers_performance_study.html). It was designed with compatibility in mind and integrates seamlessly with the following environments:

* [Block ads in **Puppeteer**](https://github.com/ghostery/adblocker/tree/master/packages/adblocker-puppeteer/README.md),
* [Block ads in **Electron**](https://github.com/ghostery/adblocker/tree/master/packages/adblocker-electron/README.md),
* [Block ads in **Chrome** and **Firefox**](https://github.com/ghostery/adblocker/tree/master/packages/adblocker-webextension/README.md),
* Or as a [standalone JavaScript library](https://github.com/ghostery/adblocker/tree/master/packages/adblocker/README.md).

## Getting Started

The Ghostery adblocker is the easiest and most efficient way to block ads and trackers in your project. Only a few lines of code are required to integrate smoothly with [Puppeteer](https://github.com/ghostery/adblocker/tree/master/packages/adblocker-puppeteer-example), [Electron](https://github.com/ghostery/adblocker/tree/master/packages/adblocker-electron-example), a  Chrome- and Firefox-compatible [browser extension](https://github.com/ghostery/adblocker/tree/master/packages/adblocker-webextension-example), or any environment supporting [JavaScript](https://github.com/ghostery/adblocker/tree/master/packages/adblocker) (e.g. Node.js or React Native).

Here is how to do it in two steps for a Chrome- and Firefox-compatible WebExtension:
1. Install: `npm install --save @cliqz/adblocker-webextension`
2. Add the following in your background script:
```js
import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';

WebExtensionBlocker.fromPrebuiltAdsAndTracking().then((blocker) => {
  blocker.enableBlockingInBrowser(browser);
});
```

Congratulations, you are now blocking all ads and trackers! :tada:

## Compatibility

The library supports 99% of all filters from the Easylist and uBlock Origin projects. Check [the compatibility matrix](https://github.com/ghostery/adblocker/wiki/Compatibility-Matrix) on the wiki for more details.

## Contributing

This project makes use of [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) under the hood. Quickly get started with:

1. Fork and clone the repository,
2. Enable corepack: `corepack enable`,
3. Install dependencies: `yarn install --immutable`,
4. Build: `yarn build`,
5. Test: `yarn test`,

For any question, feel free to [open an issue](https://github.com/ghostery/adblocker/issues/new) or a pull request to get some help!

## Who is using it?

This library is the building block technology used to power the adblockers from [Ghostery](https://www.ghostery.com/) and [Cliqz](https://cliqz.com/) on both *desktop* and *mobile* platforms. It is already running in production for millions of users and has been battle-tested to satisfy the following use-cases:

  * Mobile-friendly adblocker in react-native, WebExtension, or custom JavaScript context: [Ghostery for iOS](https://github.com/ghostery/user-agent-ios).
  * Ads and trackers blocker in [Electron](https://github.com/wexond/desktop) applications, [Puppeteer](https://github.com/Kikobeats/browserless) headless browsers, Cliqz browser, [ghostery](https://github.com/ghostery/ghostery-extension/) and [standalone](https://github.com/remusao/blockrz)).
  * Batch requests processing in Node.js, HTML fuzzy keywork matcher, and more.

The innovative algorithms and architecture designed and implemented in this project have been shown to be among the [most efficient](https://whotracks.me/blog/adblockers_performance_study.html) ways to implement ad-blockers and have been used in other projects to implement highly performant adblockers such as [Brave](https://github.com/brave/adblock-rust).

## Swag

Show the world you're using `ghostery/adblocker` → [![powered by Ghostery](https://img.shields.io/badge/ghostery-powered-blue?logo=ghostery&style=flat-square)](https://github.com/ghostery/adblocker)

```md
[![powered by Ghostery](https://img.shields.io/badge/ghostery-powered-blue?logo=ghostery)](https://github.com/ghostery/adblocker)
```

Or HTML:
```html
<a href="https://github.com/ghostery/adblocker/" target="_blank" rel="noopener noreferrer">
    <img alt="powered by Ghostery" src="https://img.shields.io/badge/ghostery-powered-blue?logo=ghostery">
</a>
```

## License

[Mozilla Public License 2.0](./LICENSE)
