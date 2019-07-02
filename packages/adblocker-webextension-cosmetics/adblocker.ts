/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { extractFeaturesFromDOM, injectCSSRule, injectScript } from '@cliqz/adblocker';

export type Lifecycle = 'start' | 'dom-update';

export interface IBackgroundCallback {
  classes: string[];
  hrefs: string[];
  ids: string[];
  lifecycle: Lifecycle;
}

export interface IMessageFromBackground {
  active: boolean;
  scripts: string[];
  styles: string;
  extended: string[];
}

declare global {
  interface Window {
    MutationObserver?: typeof MutationObserver;
  }
}

let ACTIVE: boolean = true;
let MUTATION_OBSERVER: MutationObserver | null = null;

function unload(): void {
  if (MUTATION_OBSERVER !== null) {
    MUTATION_OBSERVER.disconnect();
    MUTATION_OBSERVER = null;
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
      // Keep track of values already seen and processed in this frame
      const knownIds: Set<string> = new Set();
      const knownClasses: Set<string> = new Set();
      const knownHrefs: Set<string> = new Set();

      // Given a list of `nodes` (i.e.: instances of `Element` class), extract
      // a list of class names and ids which we never saw before. These will be
      // used to request extra cosmetics to inject if needed.
      const handleNodes = (nodes: Element[]) => {
        const { classes, ids, hrefs } = extractFeaturesFromDOM(nodes);
        const newIds: string[] = [];
        const newClasses: string[] = [];
        const newHrefs: string[] = [];

        // Update ids
        for (let i = 0; i < ids.length; i += 1) {
          const id = ids[i];
          if (knownIds.has(id) === false) {
            newIds.push(id);
            knownIds.add(id);
          }
        }

        for (let i = 0; i < classes.length; i += 1) {
          const cls = classes[i];
          if (knownClasses.has(cls) === false) {
            newClasses.push(cls);
            knownClasses.add(cls);
          }
        }

        for (let i = 0; i < hrefs.length; i += 1) {
          const href = hrefs[i];
          if (knownHrefs.has(href) === false) {
            newHrefs.push(href);
            knownHrefs.add(href);
          }
        }

        if (newIds.length !== 0 || newClasses.length !== 0 || newHrefs.length !== 0) {
          // TODO - we might want to throttle that?
          getCosmeticsFilters({
            classes: newClasses,
            hrefs: newHrefs,
            ids: newIds,
            lifecycle: 'dom-update',
          }).then((response) => handleResponseFromBackground(window, response));
        }
      };

      // Since we did not start observing before, start by getting the list of
      // all ids and classes in the DOM at this point of time (DOMContentLoaded
      // event). Afterwards, we will rely on the mutation observer to detect
      // changes.
      handleNodes(Array.from(window.document.querySelectorAll('[id],[class],[href]')));

      // Start observing mutations to detect new ids and classes which would
      // need to be hidden.
      if (ACTIVE && enableMutationObserver && window.MutationObserver) {
        MUTATION_OBSERVER = new window.MutationObserver((mutations) => {
          // Accumulate all nodes which were updated in `nodes`
          const nodes: HTMLElement[] = [];
          for (let i = 0; i < mutations.length; i += 1) {
            const mutation = mutations[i];
            if (mutation.type === 'attributes') {
              nodes.push(mutation.target as HTMLElement);
            } else if (mutation.type === 'childList') {
              const addedNodes = mutation.addedNodes;
              for (let j = 0; j < addedNodes.length; j += 1) {
                const addedNode: HTMLElement = addedNodes[j] as HTMLElement;
                nodes.push(addedNode);

                if (addedNode.querySelectorAll !== undefined) {
                  const children = addedNode.querySelectorAll('[id],[class],[href]');
                  for (let k = 0; k < children.length; k += 1) {
                    nodes.push(children[k] as HTMLElement);
                  }
                }
              }
            }
          }

          handleNodes(nodes);
        });

        MUTATION_OBSERVER.observe(window.document.documentElement, {
          attributeFilter: ['class', 'id', 'href'],
          attributes: true,
          childList: true,
          subtree: true,
        });
      }
    },
    { once: true, passive: true },
  );

  // Clean-up afterwards
  window.addEventListener('unload', unload, { once: true, passive: true });
}
