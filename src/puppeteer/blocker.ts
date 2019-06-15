/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// Type definition
import * as puppeteer from 'puppeteer';
import { parse } from 'tldts';

import { autoRemoveScript } from '../content/injection';
import Engine from '../engine/engine';
import Request from '../request';

function extractFeaturesFromDOM(elements: Element[]) {
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
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class.
 */
export default class PuppeteerBlocker extends Engine {
  public enableBlockingInPage(page: puppeteer.Page): Promise<void> {
    // Make sure request interception is enabled for `page` before proceeding
    return page.setRequestInterception(true).then(() => {
      // NOTE - page.setBypassCSP(enabled) might be needed to perform injections on some pages
      // NOTE - we currently do not perform CSP headers injection as there is
      // currently no way to modify responses in puppeteer. This feature could
      // easily be added if puppeteer implements the required capability.

      // Register callback for network requets filtering
      page.on('request', (request) => {
        this.onRequest(request);
      });

      // Register callback to cosmetics injection (CSS + scriptlets)
      page.on('framenavigated', async (frame) => {
        try {
          await this.onFrame(frame);
        } catch (ex) {
          // Ignore
        }
      });
    });
  }

  private async onFrame(frame: puppeteer.Frame): Promise<void> {
    // DOM features
    const { ids, hrefs, classes } = await frame.$$eval(
      '[id],[class],[href]',
      extractFeaturesFromDOM,
    );

    // Source features
    const url = frame.url();
    const parsed = parse(url);
    const hostname = parsed.hostname || '';
    const domain = parsed.domain || '';

    // Get cosmetics to inject into the Frame
    const { active, scripts, styles } = this.getCosmeticsFilters({
      domain,
      hostname,
      url,

      // DOM information
      classes,
      hrefs,
      ids,
    });

    // Abort if cosmetics are disabled
    if (active === true) {
      // Inject scripts
      if (scripts) {
        for (const script of scripts) {
          frame
            .addScriptTag({
              content: autoRemoveScript(script),
            })
            .catch(() => {
              // Ignore
            });
        }
      }

      // Inject CSS
      if (styles) {
        frame
          .addStyleTag({
            content: styles,
          })
          .catch(() => {
            // Ignore
          });
      }
    }
  }

  private onRequest(request: puppeteer.Request): void {
    const { redirect, match } = this.match(Request.fromPuppeteerDetails(request));

    if (redirect) {
      const { body, contentType } = redirect;
      request.respond({
        body,
        contentType,
      });
    } else if (match) {
      request.abort('blockedbyclient');
    } else {
      request.continue();
    }
  }
}
