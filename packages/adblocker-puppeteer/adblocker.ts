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
export class BlockingContext {
  constructor(private readonly page: puppeteer.Page, private readonly blocker: PuppeteerBlocker) {}

  public async enable(): Promise<void> {
    if (this.blocker.config.loadCosmeticFilters === true) {
      // Register callback to cosmetics injection (CSS + scriptlets)
      this.page.on('framenavigated', this.onFrameNavigated);
    }

    if (this.blocker.config.loadNetworkFilters === true) {
      // Make sure request interception is enabled for `page` before proceeding
      await this.page.setRequestInterception(true);
      // NOTES:
      //  - page.setBypassCSP(enabled) might be needed to perform
      //  injections on some pages.
      //  - we currently do not perform CSP headers injection as there is
      //  currently no way to modify responses in puppeteer. This feature could
      //  easily be added if puppeteer implements the required capability.
      //
      // Register callback for network requests filtering.
      this.page.on('request', this.onRequest);
    }
  }

  public async disable(): Promise<void> {
    if (this.blocker.config.loadNetworkFilters === true) {
      this.page.removeListener('request', this.onRequest);
      await this.page.setRequestInterception(false);
    }

    if (this.blocker.config.loadCosmeticFilters === true) {
      this.page.removeListener('framenavigated', this.onFrameNavigated);
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
    const { active, scripts, styles } = this.blocker.getCosmeticsFilters({
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

    const { redirect, match } = this.blocker.match(request);

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

/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class. It exposes
 * methods to interface with Puppeteer APIs needed to block ads.
 */
export class PuppeteerBlocker extends FiltersEngine {
  private readonly contexts: WeakMap<puppeteer.Page, BlockingContext> = new Map();

  public async enableBlockingInPage(page: puppeteer.Page): Promise<BlockingContext> {
    let context: undefined | BlockingContext = this.contexts.get(page);
    if (context !== undefined) {
      return context;
    }

    context = new BlockingContext(page, this);
    this.contexts.set(page, context);
    await context.enable();
    return context;
  }

  public async disableBlockingInPage(page: puppeteer.Page): Promise<void> {
    const context: undefined | BlockingContext = this.contexts.get(page);
    if (context === undefined) {
      throw new Error('Trying to disable blocking which was not enabled');
    }

    this.contexts.delete(page);
    await context.disable();
  }
}

// Re-export symboles from @cliqz/adblocker for convenience
export * from '@cliqz/adblocker';
