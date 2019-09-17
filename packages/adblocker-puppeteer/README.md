# `@cliqz/adblocker-puppeteer`

> [@cliqz/adblocker](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker) enhanced with convenient Puppeteer wrapper

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

For more details, check-out the following specialized guides:

* Node.js, [@cliqz/adblocker](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker)
* `WebExtension`, [@cliqz/adblocker-webextension](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension) ([demo](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension-example))
* `Electron`, [@cliqz/adblocker-electron](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron) ([demo](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron-example))

## Getting Started

Install: `npm install --save @cliqz/adblocker-puppeteer`

## Usage

For a *complete example* check-out: [@cliqz/adblocker-puppeteer-example](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer-example)

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
import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer';
import fetch from 'cross-fetch'; // required 'fetch'

PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
  const buffer = blocker.serialize();
  const restoredBlocker = PuppeteerBlocker.deserialize(buffer);
  // `restoredBlocker` is deep-equal to `blocker`!
});
```
