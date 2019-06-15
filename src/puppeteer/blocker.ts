/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// Type definition
import * as puppeteer from 'puppeteer';

import Engine from '../engine/engine';
import Request from '../request';

/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class.
 */
export default class PuppeteerBlocker extends Engine {
  public enableBlockingInPage(page: puppeteer.Page): Promise<void> {
    return page.setRequestInterception(true).then(() => {
      page.on('request', (request) => {
        const { redirect, match } = this.match(Request.fromPuppeteerDetails(request));

        if (redirect) {
          const { body, contentType } = redirect;
          request.respond({
            body,
            contentType,
          });
        } else if (match) {
          console.log('ABORT MATCH');
          request.abort('blockedbyclient');
        } else {
          // TODO - We could also perform the CSP headers injection using the
          // `request.continue` method, which allows to inject custom headers.
          request.continue();
        }
      });

      // NOTE: we could also perform cosmetic injection using `page.addScriptTag`
      // and `page.addStyleTag`.
    });
  }
}
