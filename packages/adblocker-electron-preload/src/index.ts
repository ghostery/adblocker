/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { ipcRenderer } from 'electron';

import { DOMMonitor, IBackgroundCallback } from '@ghostery/adblocker-content';

async function injectCosmeticFilters(
  data?: Omit<IBackgroundCallback, 'lifecycle'>,
): Promise<void> {
  await ipcRenderer.invoke(
    '@ghostery/adblocker/inject-cosmetic-filters',
    window.location.href,
    data,
  );
}

if (window === window.top && window.location.href.startsWith('devtools://') === false) {
  let DOM_MONITOR: DOMMonitor | null = null;

  const unload = () => {
    if (DOM_MONITOR !== null) {
      DOM_MONITOR.stop();
      DOM_MONITOR = null;
    }
  };

  // On DOMContentLoaded, start monitoring the DOM. This means that we will
  // first check which ids and classes exist in the DOM as a one-off operation;
  // this will allow the injection of selectors which have a chance to match.
  // We also register a MutationObserver which will monitor the addition of new
  // classes and ids, and might trigger extra filters on a per-need basis.
  window.addEventListener(
    'DOMContentLoaded',
    async () => {
      DOM_MONITOR = new DOMMonitor(async (update) => {
        if (update.type === 'features') {
          await injectCosmeticFilters({
            ...update,
          });
        }
      });

      DOM_MONITOR.queryAll(window);

      // Start observing mutations to detect new ids and classes which would
      // need to be hidden.
      const enableMutationObserver = await ipcRenderer.invoke(
        '@ghostery/adblocker/is-mutation-observer-enabled',
      );
      if (enableMutationObserver) {
        DOM_MONITOR?.start(window);
      }
    },
    { once: true, passive: true },
  );

  window.addEventListener('unload', unload, { once: true, passive: true });

  void injectCosmeticFilters();
}

export type { IBackgroundCallback };
