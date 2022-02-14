/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { ipcMain } from 'electron';
import { parse } from 'tldts-experimental';

import { ElectronRequestType, FiltersEngine, Request } from '@cliqz/adblocker';
import type {
  IBackgroundCallback,
  IMessageFromBackground,
} from '@cliqz/adblocker-electron-preload';

const PRELOAD_PATH = require.resolve('@cliqz/adblocker-electron-preload');

// https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t
// tslint:disable no-string-literal
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
    callback: (a: Electron.Response) => void,
  ) => void;

  private readonly onGetCosmeticFilters: (
    event: Electron.IpcMainEvent,
    url: string,
    msg: IBackgroundCallback,
  ) => void;

  private readonly onHeadersReceived: (
    details: Electron.OnHeadersReceivedListenerDetails,
    callback: (a: Electron.HeadersReceivedResponse) => void,
  ) => void;

  private readonly onIsMutationObserverEnabled: (event: Electron.IpcMainEvent) => void;

  constructor(
    private readonly session: Electron.Session,
    private readonly blocker: ElectronBlocker,
  ) {
    this.onBeforeRequest = (details, callback) => blocker.onBeforeRequest(details, callback);
    this.onGetCosmeticFilters = (event, url, msg) => blocker.onGetCosmeticFilters(event, url, msg);
    this.onHeadersReceived = (details, callback) => blocker.onHeadersReceived(details, callback);
    this.onIsMutationObserverEnabled = (event) => blocker.onIsMutationObserverEnabled(event);
  }

  public enable(): void {
    if (this.blocker.config.loadCosmeticFilters === true) {
      this.session.setPreloads(this.session.getPreloads().concat([PRELOAD_PATH]));
      ipcMain.on('get-cosmetic-filters', this.onGetCosmeticFilters);
      ipcMain.on('is-mutation-observer-enabled', this.onIsMutationObserverEnabled);
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
      ipcMain.removeListener('get-cosmetic-filters', this.onGetCosmeticFilters);
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

  public onIsMutationObserverEnabled = (event: Electron.IpcMainEvent): void => {
    event.returnValue = this.config.enableMutationObserver;
  };

  public onGetCosmeticFilters = (
    event: Electron.IpcMainEvent,
    url: string,
    msg: IBackgroundCallback,
  ): void => {
    // Extract hostname from sender's URL
    const parsed = parse(url);
    const hostname = parsed.hostname || '';
    const domain = parsed.domain || '';

    const { active, styles, scripts, extended } = this.getCosmeticsFilters({
      domain,
      hostname,
      url,

      classes: msg.classes,
      hrefs: msg.hrefs,
      ids: msg.ids,

      // This needs to be done only once per frame
      getBaseRules: msg.lifecycle === 'start',
      getInjectionRules: msg.lifecycle === 'start',
      getExtendedRules: msg.lifecycle === 'start',
      getRulesFromHostname: msg.lifecycle === 'start',

      // This will be done every time we get information about DOM mutation
      getRulesFromDOM: msg.lifecycle === 'dom-update',
    });

    if (active === false) {
      return;
    }

    // Inject custom stylesheets
    this.injectStyles(event.sender, styles);

    // Inject scriptlets
    for (const script of scripts) {
      this.injectScripts(event.sender, script);
    }

    // Inject scripts from content script
    event.sender.send('get-cosmetic-filters-response', {
      active,
      extended,
      scripts: [],
      styles: '',
    } as IMessageFromBackground);
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
    callback: (a: Electron.Response) => void,
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

  private injectScripts(sender: Electron.WebContents, script: string): void {
    sender.executeJavaScript(script);
  }

  private injectStyles(sender: Electron.WebContents, styles: string): void {
    if (styles.length > 0) {
      sender.insertCSS(styles, {
        cssOrigin: 'user',
      });
    }
  }
}

// re-export @cliqz/adblocker symbols for convenience
export * from '@cliqz/adblocker';
