/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// Type definition
import * as puppeteer from 'puppeteer';

import { parse } from 'tldts-experimental';

import { FiltersEngine, Request, RequestType } from '@cliqz/adblocker';

import { autoRemoveScript, extractFeaturesFromDOM, DOMMonitor } from '@cliqz/adblocker-content';

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function getTopLevelUrl(frame: puppeteer.Frame | null): string {
  let sourceUrl = '';
  while (frame !== null) {
    sourceUrl = frame.url();
    if (sourceUrl.length !== 0) {
      break;
    }
    frame = frame.parentFrame();
  }
  return sourceUrl;
}

/**
 * Create an instance of `Request` from `puppeteer.Request`.
 */
export function fromPuppeteerDetails(details: puppeteer.HTTPRequest): Request {
  const sourceUrl = getTopLevelUrl(details.frame());
  const url = details.url();
  const type: RequestType = details.resourceType();

  return Request.fromRawDetails({
    _originalRequestDetails: details,
    requestId: `${type}-${url}-${sourceUrl}`,
    sourceUrl,
    type,
    url,
  });
}

/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class.
 */
export class BlockingContext {
  private readonly onFrameNavigated: (frame: puppeteer.Frame) => Promise<void>;
  private readonly onDomContentLoaded: () => Promise<void>;
  private readonly onRequest: (details: puppeteer.HTTPRequest) => void;

  constructor(private readonly page: puppeteer.Page, private readonly blocker: PuppeteerBlocker) {
    this.onFrameNavigated = (frame) => blocker.onFrameNavigated(frame);
    this.onDomContentLoaded = () => blocker.onFrameNavigated(this.page.mainFrame());
    this.onRequest = (request) => blocker.onRequest(request);
  }

  public async enable(): Promise<void> {
    if (this.blocker.config.loadCosmeticFilters) {
      // Register callbacks to cosmetics injection (CSS + scriptlets)
      this.page.on('frameattached', this.onFrameNavigated);
      this.page.on('domcontentloaded', this.onDomContentLoaded);
    }

    if (this.blocker.config.loadNetworkFilters) {
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
    if (this.blocker.config.loadNetworkFilters) {
      this.page.off('request', this.onRequest);
      await this.page.setRequestInterception(false);
    }

    if (this.blocker.config.loadCosmeticFilters) {
      this.page.off('frameattached', this.onFrameNavigated);
      this.page.off('domcontentloaded', this.onDomContentLoaded);
    }
  }
}

/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class. It exposes
 * methods to interface with Puppeteer APIs needed to block ads.
 */
export class PuppeteerBlocker extends FiltersEngine {
  private readonly contexts: WeakMap<puppeteer.Page, BlockingContext> = new WeakMap();
  // Defaults to undefined which preserves Legacy Mode behavior
  private priority: number | undefined = undefined;

  // ----------------------------------------------------------------------- //
  // Helpers to enable and disable blocking for 'browser'
  // ----------------------------------------------------------------------- //

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

  public isBlockingEnabled(page: puppeteer.Page): boolean {
    return this.contexts.has(page);
  }

  // ----------------------------------------------------------------------- //
  // PuppeteerBlocker-specific additions to FiltersEngine
  // ----------------------------------------------------------------------- //

  public onFrameNavigated = async (frame: puppeteer.Frame) => {
    try {
      await this.onFrame(frame);
    } catch (ex) {
      // Ignore
    }
  };

  private onFrame = async (frame: puppeteer.Frame): Promise<void> => {
    const url = frame.url();

    if (url === 'chrome-error://chromewebdata/') {
      return;
    }

    // Look for all iframes in this context and check if they should be removed
    // from the DOM completely. For this we check if their `src` or `href`
    // attribute would be blocked by any network filter.
    this.removeBlockedFrames(frame).catch(() => {
      /* ignore */
    });

    const parsed = parse(url);
    const hostname = parsed.hostname || '';
    const domain = parsed.domain || '';

    // We first query for stylesheets and scriptlets which are either generic or
    // based on the hostname of this frame. We need to get these as fast as
    // possible to reduce blinking when page loads.
    {
      // TODO - implement extended filters for Puppeteer
      const { active, styles, scripts /* , extended */ } = this.getCosmeticsFilters({
        domain,
        hostname,
        url,

        // Done once per frame.
        getBaseRules: true,
        getInjectionRules: true,
        getExtendedRules: true,
        getRulesFromHostname: true,

        // Will handle DOM features (see below).
        getRulesFromDOM: false,
      });

      if (active === false) {
        return;
      }

      Promise.all([
        this.injectScriptletsIntoFrame(frame, scripts),
        this.injectStylesIntoFrame(frame, styles),
      ]).catch(() => {
        /* ignore */
      });
    }

    // Seconde step is to start monitoring the DOM of the page in order to
    // inject more specific selectors based on `id`, `class`, or `href` found on
    // nodes. We first query all of them, then monitor the DOM for a few
    // seconds (or until one of the stopping conditions is met, see below).

    const observer = new DOMMonitor((update) => {
      if (update.type === 'features') {
        const { active, styles } = this.getCosmeticsFilters({
          domain,
          hostname,
          url,

          // DOM information
          ...update,

          // Only done once per frame (see above).
          getBaseRules: false,
          getInjectionRules: false,
          getExtendedRules: false,
          getRulesFromHostname: false,

          // Allows to get styles for updated DOM.
          getRulesFromDOM: true,
        });

        // Abort if cosmetics are disabled
        if (active === false) {
          return;
        }

        this.injectStylesIntoFrame(frame, styles).catch(() => {
          /* ignore */
        });
      }
    });

    // This loop will periodically check if any new custom styles should be
    // injected in the page (using values of attributes `id`, `class`, or `href`).
    //
    // We stop looking in the following cases:
    // * Frame was detached.
    // * No new attribute was found.
    // * Number of iterations exceeded 10 (i.e. 5 seconds).
    // * Exception was raised.
    //
    // Additionally, we might stop after the first lookup if
    // `enableMutationObserver` is disabled in config, which means that we
    // should not actively monitor the DOM for changes.
    let numberOfIterations = 0;
    do {
      if (frame.isDetached()) {
        break;
      }

      try {
        const foundNewFeatures = observer.handleNewFeatures(
          await frame.$$eval(':root', extractFeaturesFromDOM),
        );
        numberOfIterations += 1;

        if (numberOfIterations === 10) {
          break;
        }

        if (foundNewFeatures === false) {
          break;
        }
      } catch (ex) {
        break;
      }

      if (this.config.enableMutationObserver === false) {
        break;
      }

      await sleep(500);
    } while (true);
  };

  public setRequestInterceptionPriority = (defaultPriority = 0) =>
    (this.priority = defaultPriority);

  public onRequest = (details: puppeteer.HTTPRequest): void => {
    const request = fromPuppeteerDetails(details);
    if (this.config.guessRequestTypeFromUrl === true && request.type === 'other') {
      request.guessTypeOfRequest();
    }

    const frame = details.frame();

    if (
      request.isMainFrame() ||
      (request.type === 'document' && frame !== null && frame.parentFrame() === null)
    ) {
      details.continue(details.continueRequestOverrides(), this.priority);
      return;
    }

    const { redirect, match } = this.match(request);

    if (redirect !== undefined) {
      if (redirect.contentType.endsWith(';base64')) {
        details.respond(
          {
            status: 200,
            headers: {},
            body: Buffer.from(redirect.body, 'base64'),
            contentType: redirect.contentType.slice(0, -7),
          },
          this.priority,
        );
      } else {
        details.respond(
          {
            status: 200,
            headers: {},
            body: redirect.body,
            contentType: redirect.contentType,
          },
          this.priority,
        );
      }
    } else if (match === true) {
      details.abort('blockedbyclient', this.priority);
    } else {
      details.continue(details.continueRequestOverrides(), this.priority);
    }
  };

  private async injectStylesIntoFrame(frame: puppeteer.Frame, styles: string): Promise<void> {
    if (styles.length !== 0) {
      await frame.addStyleTag({
        content: styles,
      });
    }
  }

  private async injectScriptletsIntoFrame(
    frame: puppeteer.Frame,
    scripts: string[],
  ): Promise<void> {
    const promises: Promise<void>[] = [];

    if (scripts.length !== 0) {
      for (let i = 0; i < scripts.length; i += 1) {
        promises.push(
          frame
            .addScriptTag({
              content: autoRemoveScript(scripts[i]),
            })
            .then(() => {
              /* Ignore result */
            }),
        );
      }
    }

    await Promise.all(promises);
  }

  /**
   * Look for sub-frames in `frame`, check if their `src` or `href` would be
   * blocked, and then proceed to removing them from the DOM completely.
   */
  private async removeBlockedFrames(frame: puppeteer.Frame): Promise<void> {
    const promises: Promise<void>[] = [];
    const sourceUrl = getTopLevelUrl(frame);

    for (const url of await frame.$$eval('iframe[src],iframe[href]', (elements) =>
      elements.map(({ src, href }: any) => src || href),
    )) {
      const { match } = this.match(
        Request.fromRawDetails({
          url,
          sourceUrl,
          type: 'sub_frame',
        }),
      );

      if (match) {
        promises.push(
          frame
            .$$eval(`iframe[src="${url}"],iframe[href="${url}"]`, (iframes) => {
              for (const iframe of iframes) {
                iframe?.parentNode?.removeChild(iframe);
              }
            })
            .catch(() => {
              /* ignore */
            }),
        );
      }
    }

    await Promise.all(promises);
  }
}

// Re-export symboles from @cliqz/adblocker for convenience
export * from '@cliqz/adblocker';
