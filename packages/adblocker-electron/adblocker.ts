/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { ElectronRequestType, FiltersEngine, Request } from '@cliqz/adblocker';

import { ipcMain } from 'electron';
import { join } from 'path';
import { parse } from 'tldts-experimental';

import {
  IBackgroundCallback,
  IMessageFromBackground,
} from '@cliqz/adblocker-content';

const PRELOAD_PATH = join(__dirname, './preload.js');

// https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

/**
 * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
 */
export function fromElectronDetails({
  id,
  url,
  resourceType,
  referrer,
  webContentsId,
}: Electron.OnHeadersReceivedListenerDetails | Electron.OnBeforeRequestListenerDetails): Request {
  return Request.fromRawDetails({
    requestId: `${id}`,
    sourceUrl: referrer,
    tabId: webContentsId,
    type: (resourceType || 'other') as ElectronRequestType,
    url,
  });
}

/**
 * Wrap `FiltersEngine` into a Electron-friendly helper class.
 */
export class ElectronBlocker extends FiltersEngine {
  public enableBlockingInSession(ses: Electron.Session): void {
    if (this.config.loadNetworkFilters === true) {
      ses.webRequest.onHeadersReceived({ urls: ['<all_urls>'] }, this.onHeadersReceived);

      ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, this.onBeforeRequest);
    }

    if (this.config.loadCosmeticFilters === true) {
      ipcMain.on('get-cosmetic-filters', this.onGetCosmeticFilters);
      ipcMain.on('is-mutation-observer-enabled', this.onIsMutationObserverEnabled);
      ses.setPreloads(ses.getPreloads().concat([PRELOAD_PATH]));
    }
  }

  public disableBlockingInSession(ses: Electron.Session): void {
    if (this.config.loadNetworkFilters === true) {
      // NOTE - there is currently no support in Electron for multiple
      // webRequest listeners registered for the same event. This means that
      // adblocker's listeners can be overriden by other ones in the same
      // application (or that the adblocker can override another listener
      // registered previously). Because of this, the only way to disable the
      // adblocker is to remove all listeners for the events we are interested
      // in. In the future, we should consider implementing a webRequest
      // pipeline allowing to register multiple listeners for the same event.
      ses.webRequest.onHeadersReceived(null);
      ses.webRequest.onBeforeRequest(null);
    }

    if (this.config.loadCosmeticFilters === true) {
      ses.setPreloads(ses.getPreloads().filter(p => p !== PRELOAD_PATH));
      // @ts-ignore
      ipcMain.removeListener('get-cosmetic-filters', this.onGetCosmeticFilters);
      // @ts-ignore
      ipcMain.removeListener('is-mutation-observer-enabled', this.onIsMutationObserverEnabled);
    }
  }

  private onIsMutationObserverEnabled = (event: Electron.IpcMainEvent) => {
    event.returnValue = this.config.enableMutationObserver;
  };

  private onGetCosmeticFilters = (
    event: Electron.IpcMainEvent,
    url: string,
    msg: IBackgroundCallback,
  ): void => {
    // Extract hostname from sender's URL
    const parsed = parse(url);
    const hostname = parsed.hostname || '';
    const domain = parsed.domain || '';

    const { active, styles, scripts } = this.getCosmeticsFilters({
      domain,
      hostname,
      url,

      classes: msg.classes,
      hrefs: msg.hrefs,
      ids: msg.ids,

      // This needs to be done only once per frame
      getBaseRules: msg.lifecycle === 'start',
      getInjectionRules: msg.lifecycle === 'start',
      getRulesFromHostname: msg.lifecycle === 'start',

      // This will be done every time we get information about DOM mutation
      getRulesFromDOM: msg.lifecycle === 'dom-update',
    });

    if (active === false) {
      return;
    }

    // Inject custom stylesheets
    this.injectStyles(event.sender, styles);

    // Inject scripts from content script
    event.sender.send('get-cosmetic-filters-response', {
      active,
      extended: [],
      scripts,
      styles: '',
    } as IMessageFromBackground);
  }

  private onHeadersReceived = (
    details: Electron.OnHeadersReceivedListenerDetails,
    callback: (a: Electron.Response) => void,
  ): void => {
    const CSP_HEADER_NAME = 'content-security-policy';
    const policies: string[] = [];
    const responseHeaders: Record<string, string> = (details.responseHeaders || {});

    if (details.resourceType === 'mainFrame' || details.resourceType === 'subFrame') {
      const rawCSP: string | undefined = this.getCSPDirectives(fromElectronDetails(details));
      if (rawCSP !== undefined) {
        policies.push(...rawCSP.split(';').map(csp => csp.trim()));

        // Collect existing CSP headers from response
        for (const [name, value] of Object.entries(responseHeaders)) {
          if (name.toLowerCase() === CSP_HEADER_NAME) {
            if (Array.isArray(value)) {
              policies.push(...value);
            } else {
              policies.push(value);
            }

            delete responseHeaders[name];
          }
        }

        responseHeaders[CSP_HEADER_NAME] = policies.join(';');

        // @ts-ignore
        callback({ responseHeaders });
        return;
      }
    }

    callback({});
  }

  private onBeforeRequest = (
    details: Electron.OnBeforeRequestListenerDetails,
    callback: (a: Electron.Response) => void,
  ): void => {
    const request = fromElectronDetails(details);
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
