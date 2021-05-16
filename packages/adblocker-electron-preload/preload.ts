/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { ipcRenderer } from 'electron';

import { DOMMonitor, IBackgroundCallback, IMessageFromBackground } from '@cliqz/adblocker-content';

function getCosmeticsFilters(data: IBackgroundCallback) {
  setTimeout(() => {
    ipcRenderer.send('get-cosmetic-filters', window.location.href, data);
  }, 1);
}

if (window === window.top && window.location.href.startsWith('devtools://') === false) {
  (() => {
    const enableMutationObserver = ipcRenderer.sendSync('is-mutation-observer-enabled');

    let ACTIVE: boolean = true;
    let DOM_MONITOR: DOMMonitor | null = null;

    const unload = () => {
      if (DOM_MONITOR !== null) {
        DOM_MONITOR.stop();
        DOM_MONITOR = null;
      }
    };

    ipcRenderer.on(
      'get-cosmetic-filters-response',
      // TODO - implement extended filtering for Electron
      (
        _: Electron.IpcRendererEvent,
        { active /* , scripts, extended */ }: IMessageFromBackground,
      ) => {
        if (active === false) {
          ACTIVE = false;
          unload();
          return;
        }

        ACTIVE = true;
      },
    );

    getCosmeticsFilters({ lifecycle: 'start', ids: [], classes: [], hrefs: [] });

    // On DOMContentLoaded, start monitoring the DOM. This means that we will
    // first check which ids and classes exist in the DOM as a one-off operation;
    // this will allow the injection of selectors which have a chance to match.
    // We also register a MutationObserver which will monitor the addition of new
    // classes and ids, and might trigger extra filters on a per-need basis.
    window.addEventListener(
      'DOMContentLoaded',
      () => {
        DOM_MONITOR = new DOMMonitor((update) => {
          if (update.type === 'features') {
            getCosmeticsFilters({
              ...update,
              lifecycle: 'dom-update',
            });
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

// Re-export symbols for convenience
export type { IBackgroundCallback, IMessageFromBackground } from '@cliqz/adblocker-content';
