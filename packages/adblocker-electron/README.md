<h1 align="center">Electron Adblocker</h2>

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
    <img alt="Github Actions Build Status" src="https://img.shields.io/github/workflow/status/ghostery/adblocker/Tests?label=tests&style=flat-square"></a>
  <a href="https://github.com/ghostery/adblocker/actions?query=workflow%3Assets">
    <img alt="Github Actions Assets Status" src="https://img.shields.io/github/workflow/status/ghostery/adblocker/Assets?label=assets&style=flat-square"></a>
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
  <a href="https://lgtm.com/projects/g/ghostery/adblocker?mode=list">
    <img alt="LGTM Badge" src="https://img.shields.io/lgtm/alerts/github/ghostery/adblocker?style=flat-square"></a>
</p>

---

## Getting Started

Install: `npm install --save @cliqz/adblocker-electron`.

## Usage

For a *complete example* check-out: [@cliqz/adblocker-electron-example](https://github.com/ghostery/adblocker/tree/master/packages/adblocker-electron-example).

Creating an instance of `ElectronBlocker` and start blocking ads!

```javascript
import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch'; // required 'fetch'

ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
  blocker.enableBlockingInSession(session.defaultSession);
});
```

You are ready to block ads!

There are other ways you can *create an instance of the blocking engine* to
start blocking ads.

If you already have filters locally:
```javascript
import { ElectronBlocker } from '@cliqz/adblocker-electron';

const blocker = ElectronBlocker.parse(fs.readFileSync('easylist.txt', 'utf-8'));
```

Fetching lists from URLs:
```javascript
import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch'; // required 'fetch'

const blocker = await ElectronBlocker.fromLists(fetch, [
  'https://easylist.to/easylist/easylist.txt'
]);
```

Use ready-made configs to block ads and optionally trackers:
```javascript
import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch'; // required 'fetch'

let blocker = await ElectronBlocker.fromPrebuiltAdsOnly(fetch); // ads only
blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch); // ads and tracking
```

### Disabling Blocker in session

To stop blocking ads in a session:

```javascript
blocker.disableBlockingInSession(session.defaultSession);
```

### Caching Blocker using Serialization

To avoid having to create the same instance of `ElectronBlocker` all over again,
you can serialize it to a byte-array which you can store on disk for faster
loading.

```javascript
import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch'; // required 'fetch'
import { promises as fs } from 'fs'; // used for caching

ElectronBlocker.fromPrebuiltAdsAndTracking(fetch, {
  path: 'engine.bin',
  read: fs.readFile,
  write: fs.writeFile,
}).then((blocker) => {
  blocker.enableBlockingInSession(session.defaultSession);
});
```

Or you can do this manually to control the way caching is done:

```javascript
import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch'; // required 'fetch'

ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
  const buffer = blocker.serialize();
  const restoredBlocker = ElectronBlocker.deserialize(buffer);
  // `restoredBlocker` is deep-equal to `blocker`!
});
```
