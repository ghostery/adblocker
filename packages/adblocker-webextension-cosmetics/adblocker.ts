/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  IBackgroundCallback,
  IMessageFromBackground,
  DOMMonitor,
  injectCSSRule,
  injectScript,
} from '@cliqz/adblocker-content';

let ACTIVE: boolean = true;
let DOM_MONITOR: DOMMonitor | null = null;

function unload(): void {
  if (DOM_MONITOR !== null) {
    DOM_MONITOR.stop();
    DOM_MONITOR = null;
  }
}

/**
 * Because all the filters and matching logic lives in the background of the
 * extension, the content script needs a way to request relevant cosmetic
 * filters for each frame. This channel of communication can be handled in
 * several ways (`connect`, `sendMessage`). Here we will make use of
 * `sendMessage` for one-off communications.
 *
 * `getCosmeticsFiltersWithSendMessage` wraps the logic of communicating with
 * the background and will be used to request cosmetics filters for the current
 * frame.
 *
 * The background should listen to these messages and answer back with lists of
 * filters to be injected in the page.
 */
function getCosmeticsFiltersWithSendMessage({
  classes,
  hrefs,
  ids,
  lifecycle,
}: IBackgroundCallback): Promise<IMessageFromBackground> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        action: 'getCosmeticsFilters',
        classes,
        hrefs,
        ids,
        lifecycle,
      },
      (response: IMessageFromBackground | undefined) => {
        if (response !== undefined) {
          resolve(response);
        }
      },
    );
  });
}

function handleResponseFromBackground(
  window: Window,
  { active, scripts, styles }: IMessageFromBackground,
): void {
  if (active === false) {
    ACTIVE = false;
    unload();
    return;
  } else {
    ACTIVE = true;
  }

  // Inject scripts
  if (scripts) {
    for (let i = 0; i < scripts.length; i += 1) {
      setTimeout(() => injectScript(scripts[i], window.document), 0);
    }
  }

  // Normal CSS
  if (styles && styles.length > 0) {
    setTimeout(() => injectCSSRule(styles, window.document), 0);
  }

  // Extended CSS
  // if (extended && extended.length > 0) {
  // }
}

/**
 * Takes care of injecting cosmetic filters in a given window. Responsabilities:
 * - Inject scripts.
 * - Block scripts.
 * - Inject CSS rules.
 *
 * All this happens by communicating with the background through the
 * `backgroundAction` function (to trigger request the sending of new rules
 * based on a domain or node selectors) and the `handleResponseFromBackground`
 * callback to apply new rules.
 */
export function injectCosmetics(
  window: Window,
  enableMutationObserver: boolean = true,
  getCosmeticsFilters: (
    _: IBackgroundCallback,
  ) => Promise<IMessageFromBackground> = getCosmeticsFiltersWithSendMessage,
): void {
  // Invoked as soon as content-script is injected to ask for background to
  // inject cosmetics and scripts as soon as possible. Some extra elements
  // might be inserted later whenever we know more about the content of the
  // page.
  getCosmeticsFilters({ lifecycle: 'start', ids: [], classes: [], hrefs: [] }).then((response) =>
    handleResponseFromBackground(window, response),
  );

  // On DOMContentLoaded, start monitoring the DOM. This means that we will
  // first check which ids and classes exist in the DOM as a one-off operation;
  // this will allow the injection of selectors which have a chance to match.
  // We also register a MutationObserver which will monitor the addition of new
  // classes and ids, and might trigger extra filters on a per-need basis.
  window.addEventListener(
    'DOMContentLoaded',
    () => {
      DOM_MONITOR = new DOMMonitor(({ classes, ids, hrefs }) => {
        getCosmeticsFilters({
          classes,
          hrefs,
          ids,
          lifecycle: 'dom-update',
        }).then((response) => handleResponseFromBackground(window, response));
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
}
