# `@cliqz/adblocker-webextension-cosmetics`

> companion package for `@cliqz/adblocker-webextension` exposing content-script
> logic to communicate with background and inject cosmetics in frames.

From your *content script*:

```js
import { injectCosmetics } from '@cliqz/adblocker-webextension-cosmetics';

injectCosmetics();
```

If you also have `@cliqz/adblocker-webextension` setup in the background then
you will benefit from both network filtering and cosmetics.
