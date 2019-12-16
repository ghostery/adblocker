/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// Type definition
import * as puppeteer from 'puppeteer';
import { parse } from 'tldts-experimental';

import { FiltersEngine, Request } from '@cliqz/adblocker';

import { autoRemoveScript, extractFeaturesFromDOM } from '@cliqz/adblocker-content';

/**
 * Create an instance of `Request` from `puppeteer.Request`.
 */
export function fromPuppeteerDetails(details: puppeteer.Request): Request {
  const frame = details.frame();
  const sourceUrl = frame !== null ? frame.url() : undefined;
  return Request.fromRawDetails({
    requestId: `${details.resourceType()} ${details.url()} ${sourceUrl}`,
    sourceUrl,
    type: details.resourceType(),
    url: details.url(),
  });
}

/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class.
 */
export class PuppeteerBlocker extends FiltersEngine {
  public async enableBlockingInPage(page: puppeteer.Page): Promise<void> {
    if (this.config.loadCosmeticFilters === true) {
      // Register callback to cosmetics injection (CSS + scriptlets)
      page.on('framenavigated', this.onFrameNavigated);
    }

    if (this.config.loadNetworkFilters === true) {
      // Make sure request interception is enabled for `page` before proceeding
      await page.setRequestInterception(true);
      // NOTES:
      //  - page.setBypassCSP(enabled) might be needed to perform
      //  injections on some pages.
      //  - we currently do not perform CSP headers injection as there is
      //  currently no way to modify responses in puppeteer. This feature could
      //  easily be added if puppeteer implements the required capability.
      //  Register callback for network requets filtering
      page.on('request', this.onRequest);
    }
  }

  public async disableBlockingInPage(page: puppeteer.Page): Promise<void> {
    if (this.config.loadNetworkFilters === true) {
      await page.setRequestInterception(false);
      page.removeListener('request', this.onRequest);
    }

    if (this.config.loadCosmeticFilters === true) {
      page.removeListener('framenavigated', this.onFrameNavigated);
    }
  }

  private onFrameNavigated = async (frame: puppeteer.Frame) => {
    try {
      await this.onFrame(frame);
    } catch (ex) {
      // Ignore
    }
  };

  private onFrame = async (frame: puppeteer.Frame): Promise<void> => {
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
      for (let i = 0; i < scripts.length; i += 1) {
        frame
          .addScriptTag({
            content: autoRemoveScript(scripts[i]),
          })
          .catch(() => {
            // Ignore
          });
      }

      // Inject CSS
      if (styles.length !== 0) {
        frame
          .addStyleTag({
            content: styles,
          })
          .catch(() => {
            // Ignore
          });
      }
    }
  };

  private onRequest = (details: puppeteer.Request): void => {
    const request = fromPuppeteerDetails(details);
    const frame = details.frame();
    if (
      request.isMainFrame() ||
      (request.type === 'document' && frame !== null && frame.parentFrame() === null)
    ) {
      details.continue();
      return;
    }

    const { redirect, match } = this.match(request);

    if (redirect !== undefined) {
      const { body, contentType } = redirect;
      details.respond({
        body,
        contentType,
      });
    } else if (match === true) {
      details.abort('blockedbyclient');
    } else {
      details.continue();
    }
  };
}

// Re-export symboles from @cliqz/adblocker for convenience
export * from '@cliqz/adblocker';
