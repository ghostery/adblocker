# `@cliqz/adblocker-webextension`

> [@cliqz/adblocker](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker) enhanced with convenient WebExtension wrapper

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
* `Puppeteer`, [@cliqz/adblocker-puppeteer](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer) ([demo](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer-example))
* `Electron`, [@cliqz/adblocker-electron](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron) ([demo](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron-example))

## Getting Started

Install: `npm install --save @cliqz/adblocker-webextension`

## Usage

For a *complete example* check-out: [@cliqz/adblocker-webextension-example](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension-example)

Creating an instance of `WebExtensionBlocker` and start blocking ads!

From the *background page* of your extension:

```javascript
import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';

WebExtensionBlocker.fromPrebuiltAdsAndTracking().then((blocker) => {
  blocker.enableBlockingInBrowser(browser);
});
```

On Chromium-based browsers you will need a polyfill such as
`webextension-polyfill` to get this working:

```javascript
import { browser } from 'webextension-polyfill-ts';
import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';

WebExtensionBlocker.fromPrebuiltAdsAndTracking().then((blocker) => {
  blocker.enableBlockingInBrowser(browser);
});
```

You are ready to block ads!

There are other ways you can *create an instance of the blocking engine* to
start blocking ads.

If you already have filters locally:
```javascript
import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';

const blocker = WebExtensionBlocker.parse(fs.readFileSync('easylist.txt', 'utf-8'));
```

Fetching lists from URLs:
```javascript
import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';

const blocker = await WebExtensionBlocker.fromLists(fetch, [
  'https://easylist.to/easylist/easylist.txt'
]);
```

Use ready-made configs to block ads and optionally trackers:
```javascript
import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';

let blocker = await WebExtensionBlocker.fromPrebuiltAdsOnly(); // ads only
blocker = await WebExtensionBlocker.fromPrebuiltAdsAndTracking(); // ads and tracking
```

### Disabling Blocker in extension

To stop blocking ads:

```javascript
blocker.disableBlockingInBrowser();
```

### Caching Blocker using Serialization

To avoid having to create the same instance of `WebExtensionBlocker` all over again,
you can serialize it to a byte-array which you can store on disk for faster
loading.

```javascript
import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';

WebExtensionBlocker.fromPrebuiltAdsAndTracking().then((blocker) => {
  const buffer = blocker.serialize();
  const restoredBlocker = WebExtensionBlocker.deserialize(buffer);
  // `restoredBlocker` is deep-equal to `blocker`!
});
```
