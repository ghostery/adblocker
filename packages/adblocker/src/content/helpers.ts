/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * WARNING: this function should be self-contained and not rely on any global
 * symbol. That constraint needs to be fulfilled because this function can
 * potentially be injected in content-script (e.g.: see PuppeteerBlocker for
 * more details).
 */
export function extractFeaturesFromDOM(
  elements: Element[],
): {
  classes: string[];
  hrefs: string[];
  ids: string[];
} {
  const ignoredTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
  const classes: Set<string> = new Set();
  const hrefs: Set<string> = new Set();
  const ids: Set<string> = new Set();

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    if (element.nodeType !== 1 /* Node.ELEMENT_NODE */) {
      continue;
    }

    if (ignoredTags.has(element.localName)) {
      continue;
    }

    // Update ids
    const id = element.id;
    if (id) {
      ids.add(id);
    }

    // Update classes
    const classList = element.classList;
    for (let j = 0; j < classList.length; j += 1) {
      classes.add(classList[j]);
    }

    // Update href
    // @ts-ignore
    const href = element.href;
    if (href) {
      hrefs.add(href);
    }
  }

  return {
    classes: Array.from(classes),
    hrefs: Array.from(hrefs),
    ids: Array.from(ids),
  };
}

/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
export function autoRemoveScript(script: string): string {
  return `
try {
  ${script}
} catch (ex) { }

(function() {
  var currentScript = document.currentScript;
  var parent = currentScript && currentScript.parentNode;

  if (parent) {
    parent.removeChild(currentScript);
  }
})();
  `;
}

export function injectCSSRule(rule: string, doc: Document): void {
  const parent = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
  if (parent !== null) {
    const css = doc.createElement('style');
    css.type = 'text/css';
    css.id = 'cliqz-adblokcer-css-rules';
    css.appendChild(doc.createTextNode(rule));
    parent.appendChild(css);
  }
}

export function injectScript(s: string, doc: Document): void {
  const script = doc.createElement('script');
  script.type = 'text/javascript';
  script.id = 'cliqz-adblocker-script';
  script.async = false;
  script.appendChild(doc.createTextNode(autoRemoveScript(s)));

  // Insert node
  const parent = doc.head || doc.documentElement;
  if (parent !== null) {
    parent.appendChild(script);
  }
}
