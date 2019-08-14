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

// https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

interface ElectronResponseHeaders {
  [name: string]: string[];
}

/**
 * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
 */
export function fromElectronDetails({
  url,
  resourceType,
  referrer,
}: Electron.OnBeforeRequestDetails | Electron.OnHeadersReceivedDetails): Request {
  return Request.fromRawDetails({
    sourceUrl: referrer,
    type: (resourceType || 'other') as ElectronRequestType,
    url,
  });
}

/**
 * Wrap `FiltersEngine` into a Electron-friendly helper class.
 */
export class ElectronBlocker extends FiltersEngine {
  public enableBlockingInSession(ses: Electron.Session) {
    ses.webRequest.onHeadersReceived({ urls: ['<all_urls>'] }, this.onHeadersReceived);
    ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, this.onBeforeRequest);

    ipcMain.on('get-cosmetic-filters', this.onGetCosmeticFilters);
    ses.setPreloads([join(__dirname, './preload.js')]);

    ipcMain.on('is-mutation-observer-enabled', (event: Electron.IpcMainEvent) => {
      event.returnValue = this.config.enableMutationObserver;
    });
  }

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
    details: Electron.OnHeadersReceivedDetails,
    callback: (a: Electron.Response) => void,
  ): void => {
    const CSP_HEADER_NAME = 'content-security-policy';
    const policies: string[] = [];
    const responseHeaders: ElectronResponseHeaders = (details.responseHeaders as ElectronResponseHeaders) || {};

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

        responseHeaders[CSP_HEADER_NAME] = policies;

        // @ts-ignore
        callback({ responseHeaders });
        return;
      }
    }

    callback({});
  }

  private onBeforeRequest = (
    details: Electron.OnBeforeRequestDetails,
    callback: (a: Electron.Response) => void,
  ): void => {
    const { redirect, match } = this.match(fromElectronDetails(details));

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
      sender.insertCSS(styles);
    }
  }
}

// re-export @cliqz/adblocker symbols for convenience
export * from '@cliqz/adblocker';
