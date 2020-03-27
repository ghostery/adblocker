<h1 align="center">Pupeteer Adblocker</h2>

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
    <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker">Node.js</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer">Puppeteer</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron">Electron</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension">WebExtension</a>
  </em>
</p>

<p align="center">
  <a href="https://github.com/cliqz-oss/adblocker/actions?query=workflow%3ATests">
    <img alt="Github Actions Build Status" src="https://img.shields.io/github/workflow/status/cliqz-oss/adblocker/Tests?label=tests&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker/actions?query=workflow%3Assets">
    <img alt="Github Actions Assets Status" src="https://img.shields.io/github/workflow/status/cliqz-oss/adblocker/Assets?label=assets&style=flat-square"></a>
  <a href="https://twitter.com/acdlite/status/974390255393505280">
    <img alt="Blazing Fast" src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@cliqz/adblocker">
    <img alt="npm version" src="https://img.shields.io/npm/v/@cliqz/adblocker.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@cliqz/adblocker">
    <img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/@cliqz/adblocker.svg?style=flat-square"></a>
  <br/>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
  <a href="https://twitter.com/cliqz">
    <img alt="Follow Cliqz on Twitter" src="https://img.shields.io/twitter/follow/cliqz.svg?label=follow+cliqz&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker">
    <img alt="Dependabot" src="https://img.shields.io/badge/dependabot-enabled-brightgreen?logo=dependabot&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker/blob/master/LICENSE">
    <img alt="License Badge" src="https://img.shields.io/github/license/cliqz-oss/adblocker?style=flat-square"></a>
  <a href="https://lgtm.com/projects/g/cliqz-oss/adblocker?mode=list">
    <img alt="LGTM Badge" src="https://img.shields.io/lgtm/alerts/github/cliqz-oss/adblocker?style=flat-square"></a>
</p>

---

## Getting Started

Install: `npm install --save @cliqz/adblocker-puppeteer`.

## Usage

For a *complete example* check-out: [@cliqz/adblocker-puppeteer-example](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer-example).

Creating an instance of `PuppeteerBlocker` and start blocking ads!

```javascript
import puppeteer from 'puppeteer';
import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
import fetch from 'cross-fetch'; // required 'fetch'

const browser = await puppeteer.launch();
const page = await browser.newPage();

PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
  blocker.enableBlockingInPage(page);
});
```

You are ready to block ads!

There are other ways you can *create an instance of the blocking engine* to
start blocking ads.

If you already have filters locally:
```javascript
import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';

const blocker = PuppeteerBlocker.parse(fs.readFileSync('easylist.txt', 'utf-8'));
```

Fetching lists from URLs:
```javascript
import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
import fetch from 'cross-fetch'; // required 'fetch'

const blocker = await PuppeteerBlocker.fromLists(fetch, [
  'https://easylist.to/easylist/easylist.txt'
]);
```

Use ready-made configs to block ads and optionally trackers:
```javascript
import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
import fetch from 'cross-fetch'; // required 'fetch'

let blocker = await PuppeteerBlocker.fromPrebuiltAdsOnly(fetch); // ads only
blocker = await PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch); // ads and tracking
```

### Disabling Blocker in page

To stop blocking ads in a page:

```javascript
await blocker.disableBlockingInPage(page);
```

### Caching Blocker using Serialization

To avoid having to create the same instance of `PuppeteerBlocker` all over again,
you can serialize it to a byte-array which you can store on disk for faster
loading.

```javascript
import puppeteer from 'puppeteer';
import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
import fetch from 'cross-fetch'; // required 'fetch'
import { promises as fs } from 'fs'; // used for caching

const browser = await puppeteer.launch();
const page = await browser.newPage();

PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch, {
  path: 'engine.bin',
  read: fs.readFile,
  write: fs.writeFile,
}).then((blocker) => {
  blocker.enableBlockingInPage(page);
});
```

Or you can do this manually to control the way caching is done:

```javascript
import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
import fetch from 'cross-fetch'; // required 'fetch'

PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
  const buffer = blocker.serialize();
  const restoredBlocker = PuppeteerBlocker.deserialize(buffer);
  // `restoredBlocker` is deep-equal to `blocker`!
});
```
