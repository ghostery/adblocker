Blocking ads in WebExtension (Chrome and Firefox support) using [@cliqz/adblocker-webextension](https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension).

1. `yarn bundle` will build the extension
2. Open your browser and load "unpacked extension" from this folder
3. On re-build, reload the extension in browser

Alternatively, using the following two commands:

* `yarn start:firefox`
* `yarn start:chromium`

Checkout [background.ts](https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker-webextension-example/background.ts) and [content-script.ts](https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker-webextension-example/content-script.ts) for more details!
