/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// TODO - move to @cliqz/adblocker-content
import { querySelectorAll } from '@cliqz/adblocker-extended-selectors';

import {
  IBackgroundCallback,
  IMessageFromBackground,
  DOMMonitor,
  injectScript,
} from '@cliqz/adblocker-content';

type ExtendedSelector = IMessageFromBackground['extended'][number];

let ACTIVE: boolean = true;
let DOM_MONITOR: DOMMonitor | null = null;

let UPDATE_EXTENDED_TIMEOUT: ReturnType<typeof setTimeout> | null = null;
const PENDING: Set<Element> = new Set();
const EXTENDED: ExtendedSelector[] = [];
const HIDDEN: Map<
  Element,
  {
    selector: ExtendedSelector;
    root: Element;
  }
> = new Map();

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
function getCosmeticsFiltersWithSendMessage(
  arg: IBackgroundCallback,
): Promise<IMessageFromBackground> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        action: 'getCosmeticsFilters',
        ...arg,
      },
      (response: IMessageFromBackground | undefined) => {
        if (response !== undefined) {
          resolve(response);
        }
      },
    );
  });
}

function cachedQuerySelector(
  root: Element,
  selector: ExtendedSelector,
  cache: Map<Element, Map<ExtendedSelector, Set<Element>>>,
): Set<Element> {
  // First check if we have a result in cache for this node and selector
  const cachedElements = cache.get(root)?.get(selector);
  if (cachedElements !== undefined) {
    return cachedElements;
  }

  const selected = new Set(querySelectorAll(root, selector.ast));

  // Cache result for next time!
  if (selector.attribute !== undefined) {
    let cachedSelectors = cache.get(root);
    if (cachedSelectors === undefined) {
      cachedSelectors = new Map();
      cache.set(root, cachedSelectors);
    }

    let cachedSelected = cachedSelectors.get(selector);
    if (cachedSelected === undefined) {
      cachedSelected = new Set();
      cachedSelectors.set(selector, cachedSelected);
    }

    for (const element of selected) {
      cachedSelected.add(element);
    }
  }

  return selected;
}

function updateExtended() {
  if (PENDING.size === 0 || EXTENDED.length === 0) {
    return;
  }

  const cache: Map<Element, Map<ExtendedSelector, Set<Element>>> = new Map();

  const elementsToHide: Map<
    Element,
    {
      selector: IMessageFromBackground['extended'][number];
      root: Element;
    }
  > = new Map();

  // Since we are processing elements in a delayed fashion, it is possible
  // that some short-lived DOM nodes are already detached. Here we simply
  // ignore them.
  const roots = [...PENDING].filter((e) => e.isConnected === true);
  PENDING.clear();

  for (const root of roots) {
    for (const selector of EXTENDED) {
      for (const element of cachedQuerySelector(root, selector, cache)) {
        if (selector.remove === true) {
          element.textContent = '';
          element.remove();
        } else if (selector.attribute !== undefined && HIDDEN.has(element) === false) {
          elementsToHide.set(element, { selector, root });
        }
      }
    }
  }

  // Hide new nodes if any
  for (const [element, { selector, root }] of elementsToHide.entries()) {
    if (selector.attribute !== undefined) {
      element.setAttribute(selector.attribute, '');
      HIDDEN.set(element, { selector, root });
    }
  }

  // Check if some elements should be un-hidden.
  for (const [element, { selector, root }] of [...HIDDEN.entries()]) {
    if (selector.attribute !== undefined) {
      if (
        root.isConnected === false ||
        element.isConnected === false ||
        cachedQuerySelector(root, selector, cache).has(element) === false
      ) {
        HIDDEN.delete(element);
        element.removeAttribute(selector.attribute);
      }
    }
  }
}

/**
 * Queue `elements` to be processed asynchronously in a batch way (for
 * efficiency). This is important to not do more work than necessary, for
 * example if the same set of nodes is updated multiple times in a raw on
 * user-interaction (e.g. a dropdown); this allows to only check these nodes
 * once, and to not block the UI.
 */
function delayedUpdateExtended(elements: Element[]) {
  // If we do not have any extended filters applied to this frame, then we do
  // not need to do anything. We just ignore.
  if (EXTENDED.length === 0) {
    return;
  }

  // If root DOM element is already part of PENDING, no need to queue other elements.
  if (PENDING.has(window.document.documentElement)) {
    return;
  }

  // Queue up new elements into the global PENDING set, which will be processed
  // in a batch maner from a setTimeout.
  for (const element of elements) {
    // If we get the DOM root then we can clear everything else from the queue
    // since we will be looking at all nodes anyway.
    if (element === window.document.documentElement) {
      PENDING.clear();
      PENDING.add(element);
      break;
    }

    PENDING.add(element);
  }

  // Check if we need to trigger a setTimeout to process pending elements.
  if (UPDATE_EXTENDED_TIMEOUT === null) {
    UPDATE_EXTENDED_TIMEOUT = setTimeout(() => {
      UPDATE_EXTENDED_TIMEOUT = null;
      updateExtended();
    }, 1000);
  }
}

function handleResponseFromBackground(
  window: Pick<Window, 'document'>,
  { active, scripts, extended }: IMessageFromBackground,
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
    setTimeout(() => {
      for (const script of scripts) {
        injectScript(script, window.document);
      }
    }, 0);
  }

  // Extended CSS
  if (extended && extended.length > 0) {
    EXTENDED.push(...extended);
    delayedUpdateExtended([window.document.documentElement]);
  }
}

/**
 * Takes care of injecting cosmetic filters in a given window. Responsabilities:
 * - Inject scripts.
 * - Block scripts.
 *
 * NOTE: Custom stylesheets are now injected from background.
 *
 * All this happens by communicating with the background through the
 * `backgroundAction` function (to trigger request the sending of new rules
 * based on a domain or node selectors) and the `handleResponseFromBackground`
 * callback to apply new rules.
 */
export function injectCosmetics(
  window: Pick<Window, 'document' | 'addEventListener'>,
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
      DOM_MONITOR = new DOMMonitor((update) => {
        if (update.type === 'elements') {
          if (update.elements.length !== 0) {
            delayedUpdateExtended(update.elements);
          }
        } else {
          getCosmeticsFilters({ ...update, lifecycle: 'dom-update' }).then((response) =>
            handleResponseFromBackground(window, response),
          );
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

  window.addEventListener('pagehide', unload, { once: true, passive: true });
}
