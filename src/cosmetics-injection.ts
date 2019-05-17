/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import injectCircumvention from './content/circumvention';
import { IMessageFromBackground } from './content/communication';
import { injectCSSRule, injectScript } from './content/injection';

/**
 * Takes care of injecting cosmetic filters in a given window. Responsabilities:
 * - Inject scripts.
 * - Block scripts.
 * - Inject CSS rules.
 *
 * All this happens by communicating with the background through the
 * `backgroundAction` function (to trigger request the sending of new rules
 * based on a domain or node selectors) and the `handleResponseFromBackground`
 * callback to apply new rules.
 */
export default function injectCosmetics(
  window: Window,
  getCosmeticsFilters: () => Promise<IMessageFromBackground>,
  enableCircumvention: boolean = true,
) {
  if (enableCircumvention) {
    injectCircumvention(window);
  }

  return getCosmeticsFilters().then(({ active, scripts, styles }: IMessageFromBackground) => {
    if (active === false) {
      return;
    }

    // Inject scripts
    if (scripts) {
      for (let i = 0; i < scripts.length; i += 1) {
        injectScript(scripts[i], window.document);
      }
    }

    // Inject CSS
    if (styles && styles.length > 0) {
      injectCSSRule(styles, window.document);
    }
  });
}
