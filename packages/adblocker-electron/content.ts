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
} from '@cliqz/adblocker-webextension-cosmetics';
import { ipcRenderer, webFrame } from 'electron';

import { extractFeaturesFromDOM } from '@cliqz/adblocker';

const enableMutationObserver = true; // Not sure what to do with it.

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

function handleResponseFromBackground({ active, scripts }: IMessageFromBackground): void {
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
      setTimeout(() => webFrame.executeJavaScript(scripts[i]), 0);
    }
  }
}

function getCosmeticsFilters(data: IBackgroundCallback) {
  const id =
    '_' +
    Math.random()
  .toString(36)
  .substr(2, 9);

  ipcRenderer.once(
    `get-cosmetic-filters-response-${id}`,
    (_: Electron.IpcMessageEvent, response: IMessageFromBackground) => {
      handleResponseFromBackground(response);
    },
  );

  ipcRenderer.send('get-cosmetic-filters', window.location.href, id, data);
}

if (window === window.top && window.location.href.startsWith('chrome-devtools://') === false) {
  getCosmeticsFilters({ lifecycle: 'start', ids: [], classes: [], hrefs: [] });

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
          });
        }
      };

      // Since we did not start observing before, start by getting the list of
      // all ids and classes in the DOM at this point of time (DOMContentLoaded
      // event). Afterwards, we will rely on the mutation observer to detect
      // changes.
      // handleNodes(Array.from(window.document.querySelectorAll('[id],[class],[href]')));

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

  window.addEventListener('unload', unload, { once: true, passive: true });
}
