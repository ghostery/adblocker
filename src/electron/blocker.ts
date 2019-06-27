/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// Type definition
import * as Electron from 'electron';

import Engine from '../engine/engine';
import Request from '../request';

/**
 * Wrap `FiltersEngine` into a Electron-friendly helper class.
 */
export default class ElectronBlocker extends Engine {
  public enableBlockingInSession(ses: Electron.Session) {
    ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, this.onRequest);
    ses.setPreloads(['./content.js']);
  }

  private onRequest = (
    details: Electron.OnBeforeRequestDetails,
    callback: (a: Electron.Response) => void,
  ): void => {
    const { redirect, match } = this.match(Request.fromElectronDetails(details));

    if (redirect) {
      const { dataUrl } = redirect;
      callback({ redirectURL: dataUrl });
    } else {
      callback({ cancel: match });
    }
  };
}
