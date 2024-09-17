/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { ipcRenderer } from 'electron';
import { DOMMonitor, IBackgroundCallback } from '@cliqz/adblocker-content';

type CosmeticFiltersResponse = {
  active: boolean;
  error?: string;
};

function injectCosmeticFilters(
  data?: Omit<IBackgroundCallback, 'lifecycle'>,
): Promise<CosmeticFiltersResponse> {
  return ipcRenderer.invoke(
    '@ghostery/adblocker/inject-cosmetic-filters',
    window.location.href,
    data,
  );
}

if (window === window.top && window.location.href.startsWith('devtools://') === false) {
  (async () => {
    const enableMutationObserver = await ipcRenderer.invoke(
      '@ghostery/adblocker/is-mutation-observer-enabled',
    );

    let ACTIVE: boolean = true;
    let DOM_MONITOR: DOMMonitor | null = null;

    const unload = () => {
      if (DOM_MONITOR !== null) {
        DOM_MONITOR.stop();
        DOM_MONITOR = null;
      }
    };

    const response = await injectCosmeticFilters();
    if (response.error)
      throw new Error(`error injecting initial cosmetic filters: ${response.error}`);
    if (!(ACTIVE = response.active)) return;

    // On DOMContentLoaded, start monitoring the DOM. This means that we will
    // first check which ids and classes exist in the DOM as a one-off operation;
    // this will allow the injection of selectors which have a chance to match.
    // We also register a MutationObserver which will monitor the addition of new
    // classes and ids, and might trigger extra filters on a per-need basis.
    window.addEventListener(
      'DOMContentLoaded',
      () => {
        DOM_MONITOR = new DOMMonitor(async (update) => {
          if (update.type === 'features') {
            const response = await injectCosmeticFilters();
            if (response.error)
              throw new Error(`error injecting updated cosmetic filters: ${response.error}`);
          }
        });

        DOM_MONITOR.queryAll(window);

        // Start observing mutations to detect new ids and classes which would
        // need to be hidden.
        if (ACTIVE && enableMutationObserver) {
          DOM_MONITOR.start(window);
        }
      },
      { once: true, passive: true },
    );

    window.addEventListener('unload', unload, { once: true, passive: true });
  })();
}

export type { CosmeticFiltersResponse, IBackgroundCallback };
