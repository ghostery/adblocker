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
} from '@cliqz/adblocker-webextension-cosmetics';

/**
 * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
 */
export function fromElectronDetails({
  url,
  resourceType,
  referrer,
}: Electron.OnBeforeRequestDetails): Request {
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
    ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, this.onRequest);
    ses.setPreloads([join(__dirname, './content.js')]);

    ipcMain.on('get-cosmetic-filters', this.onGetCosmeticFilters);
  }

  private onGetCosmeticFilters = (
    e: Electron.IpcMessageEvent,
    id: string,
    msg: IBackgroundCallback & { action?: string },
  ): void => {
    // Extract hostname from sender's URL
    const url = e.sender.getURL();
    const frameId = 0;
    const parsed = parse(url);
    const hostname = parsed.hostname || '';
    const domain = parsed.domain || '';

    // Once per tab/page load we inject base stylesheets. These are always
    // the same for all frames of a given page because they do not depend on
    // a particular domain and cannot be cancelled using unhide rules.
    // Because of this, we specify `allFrames: true` when injecting them so
    // that we do not need to perform this operation for sub-frames.
    if (frameId === 0 && msg.lifecycle === 'start') {
      const { active, styles } = this.getCosmeticsFilters({
        domain,
        hostname,
        url,

        classes: msg.classes,
        hrefs: msg.hrefs,
        ids: msg.ids,

        // This needs to be done only once per tab
        getBaseRules: true,
        getInjectionRules: false,
        getRulesFromDOM: false,
        getRulesFromHostname: false,
      });

      if (active === false) {
        return;
      }

      this.injectStyles(e.sender, styles);
    }

    // Separately, requests cosmetics which depend on the page it self
    // (either because of the hostname or content of the DOM). Content script
    // logic is responsible for returning information about lists of classes,
    // ids and hrefs observed in the DOM. MutationObserver is also used to
    // make sure we can react to changes.
    {
      const { active, styles, scripts } = this.getCosmeticsFilters({
        domain,
        hostname,
        url,

        classes: msg.classes,
        hrefs: msg.hrefs,
        ids: msg.ids,

        // This needs to be done only once per frame
        getBaseRules: false,
        getInjectionRules: msg.lifecycle === 'start',
        getRulesFromHostname: msg.lifecycle === 'start',

        // This will be done every time we get information about DOM mutation
        getRulesFromDOM: msg.lifecycle === 'dom-update',
      });

      if (active === false) {
        return;
      }

      this.injectStyles(e.sender, styles);

      // Inject scripts from content script
      const responseFromBackground: IMessageFromBackground = {
        active,
        extended: [],
        scripts,
        styles: '',
      };

      e.sender.send(`get-cosmetic-filters-${id}`, responseFromBackground);
    }
  }

  private onRequest = (
    details: Electron.OnBeforeRequestDetails,
    callback: (a: Electron.Response) => void,
  ): void => {
    const { redirect, match } = this.match(fromElectronDetails(details));

    if (redirect) {
      const { dataUrl } = redirect;
      callback({ redirectURL: dataUrl });
    } else {
      callback({ cancel: match });
    }
  }

  private injectStyles(sender: Electron.WebContents, styles: string): void {
    if (sender && styles.length > 0) {
      sender.insertCSS(styles);
    }
  }
}

// re-export @cliqz/adblocker symbols for convenience
export * from '@cliqz/adblocker';
