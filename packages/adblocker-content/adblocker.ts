/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { AST } from '@cliqz/adblocker-extended-selectors';

const SCRIPT_ID = 'cliqz-adblocker-script';
const IGNORED_TAGS = new Set(['br', 'head', 'link', 'meta', 'script', 'style', 's']);

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
  extended: {
    ast: AST;
    remove: boolean;
    attribute?: string | undefined;
  }[];
}

function isElement(node: Node): node is Element {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
  return node.nodeType === 1; // Node.ELEMENT_NODE;
}

function getElementsFromMutations(mutations: MutationRecord[]): Element[] {
  // Accumulate all nodes which were updated in `nodes`
  const elements: Element[] = [];

  for (const mutation of mutations) {
    if (mutation.type === 'attributes') {
      if (isElement(mutation.target)) {
        elements.push(mutation.target);
      }
    } else if (mutation.type === 'childList') {
      for (const addedNode of mutation.addedNodes) {
        if (isElement(addedNode) && addedNode.id !== SCRIPT_ID) {
          elements.push(addedNode);
        }
      }
    }
  }

  return elements;
}

/**
 * WARNING: this function should be self-contained and not rely on any global
 * symbol. That constraint needs to be fulfilled because this function can
 * potentially be injected in content-script (e.g.: see PuppeteerBlocker for
 * more details).
 */
export function extractFeaturesFromDOM(roots: Element[]): {
  classes: string[];
  hrefs: string[];
  ids: string[];
} {
  // NOTE: This cannot be global as puppeteer needs to be able to serialize this function.
  const ignoredTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style', 's']);
  const classes: Set<string> = new Set();
  const hrefs: Set<string> = new Set();
  const ids: Set<string> = new Set();

  for (const root of roots) {
    for (const element of [
      root,
      ...root.querySelectorAll(
        '[id]:not(html):not(body),[class]:not(html):not(body),[href]:not(html):not(body)',
      ),
    ]) {
      if (ignoredTags.has(element.nodeName.toLowerCase())) {
        continue;
      }

      // Update ids
      const id = element.id;
      if (id) {
        ids.add(id);
      }

      // Update classes
      const classList = element.classList;
      if (classList) {
        for (const cls of classList) {
          classes.add(cls);
        }
      }

      // Update href
      const href = element.getAttribute('href');
      if (typeof href === 'string') {
        hrefs.add(href);
      }
    }
  }

  return {
    classes: Array.from(classes),
    hrefs: Array.from(hrefs),
    ids: Array.from(ids),
  };
}

export interface FeaturesUpdate {
  type: 'features';
  ids: string[];
  classes: string[];
  hrefs: string[];
}

export interface ElementsUpdate {
  type: 'elements';
  elements: Element[];
}

export type DOMUpdate = FeaturesUpdate | ElementsUpdate;

export class DOMMonitor {
  private knownIds: Set<string> = new Set();
  private knownHrefs: Set<string> = new Set();
  private knownClasses: Set<string> = new Set();

  private observer: MutationObserver | null = null;

  constructor(private readonly cb: (update: DOMUpdate) => void) {}

  public queryAll(window: Pick<Window, 'document'>): void {
    this.cb({ type: 'elements', elements: [window.document.documentElement] });
    this.handleUpdatedNodes([window.document.documentElement]);
  }

  public start(
    window: Pick<Window, 'document'> & { MutationObserver?: typeof MutationObserver },
  ): void {
    if (this.observer === null && window.MutationObserver !== undefined) {
      this.observer = new window.MutationObserver((mutations: MutationRecord[]) => {
        this.handleUpdatedNodes(getElementsFromMutations(mutations));
      });

      this.observer.observe(window.document.documentElement, {
        // Monitor some attributes
        attributes: true,
        attributeFilter: ['class', 'id', 'href'],
        childList: true,
        subtree: true,
      });
    }
  }

  public stop(): void {
    if (this.observer !== null) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  public handleNewFeatures({
    hrefs,
    ids,
    classes,
  }: {
    hrefs: string[];
    ids: string[];
    classes: string[];
  }): boolean {
    const newIds: string[] = [];
    const newClasses: string[] = [];
    const newHrefs: string[] = [];

    // Update ids
    for (const id of ids) {
      if (this.knownIds.has(id) === false) {
        newIds.push(id);
        this.knownIds.add(id);
      }
    }

    for (const cls of classes) {
      if (this.knownClasses.has(cls) === false) {
        newClasses.push(cls);
        this.knownClasses.add(cls);
      }
    }

    for (const href of hrefs) {
      if (this.knownHrefs.has(href) === false) {
        newHrefs.push(href);
        this.knownHrefs.add(href);
      }
    }

    if (newIds.length !== 0 || newClasses.length !== 0 || newHrefs.length !== 0) {
      this.cb({
        type: 'features',
        classes: newClasses,
        hrefs: newHrefs,
        ids: newIds,
      });
      return true;
    }

    return false;
  }

  private handleUpdatedNodes(elements: Element[]): boolean {
    if (elements.length !== 0) {
      this.cb({
        type: 'elements',
        elements: elements.filter((e) => IGNORED_TAGS.has(e.nodeName.toLowerCase()) === false),
      });
      return this.handleNewFeatures(extractFeaturesFromDOM(elements));
    }

    return false;
  }
}

/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
export function autoRemoveScript(script: string): string {
  // Minified using 'terser'
  return `try{${script}}catch(c){}!function(){var c=document.currentScript,e=c&&c.parentNode;e&&e.removeChild(c)}();`;
  // Original:
  //
  //    try {
  //      ${script}
  //    } catch (ex) { }
  //
  //    (function() {
  //      var currentScript = document.currentScript;
  //      var parent = currentScript && currentScript.parentNode;
  //
  //      if (parent) {
  //        parent.removeChild(currentScript);
  //      }
  //    })();
}

export function injectScript(s: string, doc: Document): void {
  const script = doc.createElement('script');
  script.type = 'text/javascript';
  script.id = SCRIPT_ID;
  script.async = false;
  script.appendChild(doc.createTextNode(autoRemoveScript(s)));

  // Insert node
  const parent = doc.head || doc.documentElement;
  if (parent !== null) {
    parent.appendChild(script);
  }
}
