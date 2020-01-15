# Adblocker

![npm](https://img.shields.io/npm/v/@cliqz/adblocker?color=brightgreen)
![node](https://img.shields.io/node/v/@cliqz/adblocker)
![tests](https://github.com/cliqz-oss/adblocker/workflows/Tests/badge.svg)
![dependabot](https://api.dependabot.com/badges/status?host=github&repo=cliqz-oss/adblocker)
![license](https://img.shields.io/github/license/cliqz-oss/adblocker)

> Efficient, pure-Javascript, multi-platform adblocker library, by Cliqz.

## Features

* **extremely efficient** adblocker (both in memory usage and raw speed)
* pure JavaScript implementation
* first-class support for [Node.js](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker), [WebExtension](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension), [Electron](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron) and [Puppeteer](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer).
* effectively blocks all types of ads and tracking
* supports cosmetics and scriptlet injection
* small and minimal (only 64KB minified and gzipped)
* support most filters: Easylist and uBlock Origin formats

The library provides all necessary building blocks to create a powerful
and efficient content-blocker and gives full flexibility as to which
lists should be used and how they should be fetched or updated. Being a
pure JavaScript library it does not make any assumption regarding the
environment it will run in (apart from the availability of a JavaScript
engine) and is trivial to include in any new project. It can also be
used as a building block for tooling.

## Getting Started

Using `@cliqz/adblocker` you can start blocking ads in only a few steps. Here is
an example to block ads in a *WebExtension* (compatible with Chrome and Firefox):

Install package: `npm install --save @cliqz/adblocker-webextension`

Put this in your `background` code:
```js
import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';

WebExtensionBlocker.fromPrebuiltAdsAndTracking().then((blocker) => {
  blocker.enableBlockingInBrowser();
});
```
Congratulations, you are now blocking all ads!

For more details, check-out the following specialized guides:

* `Node.js`, [@cliqz/adblocker](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker)
* `WebExtension`, [@cliqz/adblocker-webextension](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension) ([demo](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension-example))
* `Electron`, [@cliqz/adblocker-electron](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron) ([demo](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron-example))
* `Puppeteer`, [@cliqz/adblocker-puppeteer](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer) ([demo](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer-example))

## Performance

To make sure content blocking can run at full-speed on a variety of
devices (including low-end mobile phones), we built the library with
performance in mind from the ground-up. From our [recent performance study](https://whotracks.me/blog/adblockers_performance_study.html),
we perform consistently better than popular alternatives in terms of:
*memory consumption*, *start from cache time*, *matching speed* and
*size of cache*.

Matching speed corresponds to the time it takes to decide if a network
request should be blocked or allowed. It needs to be as fast as possible
to not induce any significant over-head in the browser:

![](https://github.com/cliqz-oss/adblocker/blob/d63d545095a1d47626c9fd29e14a813a2ff4f012/bench/comparison/plots/ghostery-ublock-origin-brave-duckduckgo-adblock-plus-all.svg)

Memory usage is another very important dimension. Here is the memory used after initialization:

![](https://github.com/cliqz-oss/adblocker/blob/d63d545095a1d47626c9fd29e14a813a2ff4f012/bench/comparison/plots/memory-usage-at-startup.svg)

Cache size corresponds to the size in bytes of the Uint8Array returned by `engine.serialize()`:

![](https://github.com/cliqz-oss/adblocker/blob/d63d545095a1d47626c9fd29e14a813a2ff4f012/bench/comparison/plots/cache-size.svg)

Another interesting metric is the time it takes to initialize the
`FiltersEngine` instance from its serialized form. It is especially
beneficial for mobile phones, because this serialized engine can be
created backend-side and distributed through a CDN; which means clients
do not have any cost to pay except downloading the file.

![](https://github.com/cliqz-oss/adblocker/blob/d63d545095a1d47626c9fd29e14a813a2ff4f012/bench/comparison/plots/deserializationtimings.svg)

## Supported Filters

The majority of the common filters are supported out of the box but some rare ones are not. To know more, check [the compatibility matrix](https://github.com/cliqz-oss/adblocker/wiki/Compatibility-Matrix) on the wiki.

## Development

This project makes use of [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) (which is actually transparently used by `lerna` behind the scene most of the time). To get started:

1. fork and clone the repository: `git clone git@github.com:<your remote>/adblocker.git`
2. bootstrap: `yarn bootrap`
3. build packages: `yarn bundle`
3. start working on one of the sub-packages!

In case you have any question, feel free to open an issue or a pull request to get some help!

## Who is using it?

This library is the building block technology used to power the adblockers from [Ghostery](https://www.ghostery.com/) and [Cliqz](https://cliqz.com/) on both *desktop* and *mobile* platforms. It is already running in production for millions of users and has been used successfully to satisfy the following use-cases:

  * Mobile-friendly adblocker for Android in multiple setups: react-native, WebExtension, etc. ([ghostery](https://github.com/ghostery/browser-android) and [cliqz](https://github.com/cliqz-oss/browser-android))
  * Ads and trackers blocker in [Electron](https://github.com/wexond/desktop) applications, [Puppeteer](https://github.com/Kikobeats/browserless) headless browsers, Cliqz browser, WebExtensions ([cliqz](https://github.com/cliqz-oss/browser-core), [ghostery](https://github.com/ghostery/ghostery-extension/) and [standalone](https://github.com/remusao/blockrz))
  * Backend requests processing job in Node.js

The innovative algorithms and architecture designed and implemented
in this project have been shown to be among the [most efficient](https://whotracks.me/blog/adblockers_performance_study.html)
ways to implement ad-blockers and have been used in other
projects to implement highly performant adblockers such as
[Brave](https://github.com/brave/adblock-rust).

## Release Checklist

To publish a new version:

0. Bump `ENGINE_VERSION` in `engine.ts` (to invalidate serialized versions)
1. Create a new branch (e.g.: `release-x.y.z`)
2. Update `version` using lerna: `npx lerna version --no-push --no-changelog --no-git-tag-version x.y.z`
3. Update [CHANGELOG.md](./CHANGELOG.md)
4. Create a release commit (e.g.: "Release vx.y.z")
5. Create a PR for the release
6. Merge and create a new Release on GitHub
7. Publish changes: `npx lerna publish from-package`

## License

[Mozilla Public License 2.0](./LICENSE)
