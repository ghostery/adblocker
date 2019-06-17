/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * This module exports a list of helpers which can be used in content script.
 * *DO NOT* use these as part of scriptlets as these might not be available in
 * the context of pages.
 */

export function getWindowHostname(window: Window) {
  const strip = (hostname: string): string => {
    if (hostname.startsWith('www.')) {
      return hostname.slice(4);
    }
    return hostname;
  };

  let win = window;

  while (win) {
    const hostname = win.location.hostname;
    if (hostname !== '') {
      return strip(hostname);
    }

    if (win === window.parent) {
      break;
    }

    win = win.parent;
  }

  return '';
}

export const magic = Math.abs((Date.now() * 524287) ^ ((Math.random() * 524287) >>> 0)).toString(
  16,
);

/**
 * WARNING: this function should be self-contained and not contain any global
 * symbole. This constraint needs to be fulfilled because this function can
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
