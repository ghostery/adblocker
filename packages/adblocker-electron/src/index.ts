/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import * as electron from 'electron';
import { parse } from 'tldts-experimental';

import { ElectronRequestType, FiltersEngine, Request } from '@ghostery/adblocker';
import type { IBackgroundCallback } from '@ghostery/adblocker-electron-preload';

import { PRELOAD_PATH } from './preload_path.js';

const { ipcMain } = electron;

// https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

/**
 * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
 */
export function fromElectronDetails(
  details: Electron.OnHeadersReceivedListenerDetails | Electron.OnBeforeRequestListenerDetails,
): Request {
  const { id, url, resourceType, referrer, webContentsId } = details;
  return Request.fromRawDetails(
    webContentsId
      ? {
          _originalRequestDetails: details,
          requestId: `${id}`,
          sourceUrl: referrer,
          tabId: webContentsId,
          type: (resourceType || 'other') as ElectronRequestType,
          url,
        }
      : {
          _originalRequestDetails: details,
          requestId: `${id}`,
          sourceUrl: referrer,
          type: (resourceType || 'other') as ElectronRequestType,
          url,
        },
  );
}

/**
 * This abstraction takes care of blocking in one instance of `Electron.Session`.
 */
export class BlockingContext {
  private readonly onBeforeRequest: (
    details: Electron.OnBeforeRequestListenerDetails,
    callback: (a: Electron.CallbackResponse) => void,
  ) => void;

  private readonly onInjectCosmeticFilters: (
    event: Electron.IpcMainInvokeEvent,
    url: string,
    msg?: IBackgroundCallback,
  ) => void | Promise<void>;

  private readonly onHeadersReceived: (
    details: Electron.OnHeadersReceivedListenerDetails,
    callback: (a: Electron.HeadersReceivedResponse) => void,
  ) => void;

  private readonly onIsMutationObserverEnabled: (
    event: Electron.IpcMainInvokeEvent,
  ) => boolean | Promise<boolean>;

  constructor(
    private readonly session: Electron.Session,
    private readonly blocker: ElectronBlocker,
  ) {
    this.onBeforeRequest = (details, callback) => blocker.onBeforeRequest(details, callback);

    this.onInjectCosmeticFilters = (event, url, msg) =>
      blocker.onInjectCosmeticFilters(event, url, msg);
    this.onHeadersReceived = (details, callback) => blocker.onHeadersReceived(details, callback);
    this.onIsMutationObserverEnabled = (event) => blocker.onIsMutationObserverEnabled(event);
  }

  public enable(): void {
    if (this.blocker.config.loadCosmeticFilters === true) {
      this.session.setPreloads(this.session.getPreloads().concat([PRELOAD_PATH]));
      ipcMain.handle('@ghostery/adblocker/inject-cosmetic-filters', this.onInjectCosmeticFilters);
      ipcMain.handle(
        '@ghostery/adblocker/is-mutation-observer-enabled',
        this.onIsMutationObserverEnabled,
      );
    }

    if (this.blocker.config.loadNetworkFilters === true) {
      this.session.webRequest.onHeadersReceived({ urls: ['<all_urls>'] }, this.onHeadersReceived);
      this.session.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, this.onBeforeRequest);
    }
  }

  public disable(): void {
    if (this.blocker.config.loadNetworkFilters === true) {
      // NOTE - there is currently no support in Electron for multiple
      // webRequest listeners registered for the same event. This means that
      // adblocker's listeners can be overriden by other ones in the same
      // application (or that the adblocker can override another listener
      // registered previously). Because of this, the only way to disable the
      // adblocker is to remove all listeners for the events we are interested
      // in. In the future, we should consider implementing a webRequest
      // pipeline allowing to register multiple listeners for the same event.
      this.session.webRequest.onHeadersReceived(null);
      this.session.webRequest.onBeforeRequest(null);
    }

    if (this.blocker.config.loadCosmeticFilters === true) {
      this.session.setPreloads(this.session.getPreloads().filter((p) => p !== PRELOAD_PATH));
      ipcMain.removeHandler('@ghostery/adblocker/inject-cosmetic-filters');
      ipcMain.removeHandler('@ghostery/adblocker/is-mutation-observer-enabled');
    }
  }
}

/**
 * Wrap `FiltersEngine` into a Electron-friendly helper class. It exposes
 * methods to interface with Electron APIs needed to block ads.
 */
export class ElectronBlocker extends FiltersEngine {
  private readonly contexts: WeakMap<Electron.Session, BlockingContext> = new WeakMap();

  // ----------------------------------------------------------------------- //
  // Helpers to enable and disable blocking for 'browser'
  // ----------------------------------------------------------------------- //

  public enableBlockingInSession(session: Electron.Session): BlockingContext {
    let context: undefined | BlockingContext = this.contexts.get(session);
    if (context !== undefined) {
      return context;
    }

    // Create new blocking context for `session`
    context = new BlockingContext(session, this);
    this.contexts.set(session, context);
    context.enable();

    return context;
  }

  public disableBlockingInSession(session: Electron.Session): void {
    const context: undefined | BlockingContext = this.contexts.get(session);
    if (context === undefined) {
      throw new Error('Trying to disable blocking which was not enabled');
    }

    this.contexts.delete(session);
    context.disable();
  }

  public isBlockingEnabled(session: Electron.Session): boolean {
    return this.contexts.has(session);
  }

  // ----------------------------------------------------------------------- //
  // ElectronBlocker-specific additions to FiltersEngine
  // ----------------------------------------------------------------------- //

  public onIsMutationObserverEnabled = (_: Electron.IpcMainInvokeEvent): boolean => {
    return this.config.enableMutationObserver;
  };

  public onInjectCosmeticFilters = (
    event: Electron.IpcMainInvokeEvent,
    url: string,
    msg?: IBackgroundCallback,
  ): void => {
    const parsed = parse(url);
    const hostname = parsed.hostname || '';
    const domain = parsed.domain || '';

    // `msg` is undefined for the initial call and present for subsequent updates
    const isFirstRun = msg === undefined;

    const { active, styles, scripts } = this.getCosmeticsFilters({
      domain,
      hostname,
      url,

      // DOM information, only available for updates
      classes: msg?.classes,
      hrefs: msg?.hrefs,
      ids: msg?.ids,

      // Rules to fetch: true for initial call, false for updates
      getBaseRules: isFirstRun,
      getInjectionRules: isFirstRun,
      getExtendedRules: false,
      getRulesFromHostname: isFirstRun,

      // Only true for update calls when we have DOM information
      getRulesFromDOM: !isFirstRun,

      callerContext: {
        frameId: event.frameId,
        processId: event.processId,
        lifecycle: msg?.lifecycle,
      },
    });

    if (active === false) {
      return;
    }

    if (styles.length > 0) {
      void event.sender.insertCSS(styles, { cssOrigin: 'user' });
    }

    for (const script of scripts) {
      try {
        void event.sender.executeJavaScript(script, true);
      } catch (e) {
        console.error('@ghostery/adblocker scriptlet crashed', e);
      }
    }
  };

  public onHeadersReceived = (
    details: Electron.OnHeadersReceivedListenerDetails,
    callback: (a: Electron.HeadersReceivedResponse) => void,
  ): void => {
    const CSP_HEADER_NAME = 'content-security-policy';
    const policies: string[] = [];
    const responseHeaders: Record<string, string[]> = details.responseHeaders || {};

    if (details.resourceType === 'mainFrame' || details.resourceType === 'subFrame') {
      const rawCSP: string | undefined = this.getCSPDirectives(fromElectronDetails(details));
      if (rawCSP !== undefined) {
        policies.push(...rawCSP.split(';').map((csp) => csp.trim()));

        // Collect existing CSP headers from response
        for (const [name, values] of Object.entries(responseHeaders)) {
          if (name.toLowerCase() === CSP_HEADER_NAME) {
            policies.push(...values);
            delete responseHeaders[name];
          }
        }

        responseHeaders[CSP_HEADER_NAME] = [policies.join(';')];

        callback({ responseHeaders });
        return;
      }
    }

    callback({});
  };

  public onBeforeRequest = (
    details: Electron.OnBeforeRequestListenerDetails,
    callback: (a: Electron.CallbackResponse) => void,
  ): void => {
    const request = fromElectronDetails(details);
    if (this.config.guessRequestTypeFromUrl === true && request.type === 'other') {
      request.guessTypeOfRequest();
    }

    if (request.isMainFrame()) {
      callback({});
      return;
    }

    const { redirect, match } = this.match(request);

    if (redirect) {
      callback({ redirectURL: redirect.dataUrl });
    } else if (match) {
      callback({ cancel: true });
    } else {
      callback({});
    }
  };
}

// re-export @ghostery/adblocker symbols for convenience
export * from '@ghostery/adblocker';
