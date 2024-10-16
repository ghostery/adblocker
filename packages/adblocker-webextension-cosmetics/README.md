# `@ghostery/adblocker-webextension-cosmetics`

> companion package for `@ghostery/adblocker-webextension` exposing content-script
> logic to communicate with background and inject cosmetics in frames.

From your *content script*:

```js
import { injectCosmetics } from '@ghostery/adblocker-webextension-cosmetics';

injectCosmetics();
```

If you also have `@ghostery/adblocker-webextension` setup in the background then
you will benefit from both network filtering and cosmetics.
