/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { IBackgroundCallback, IMessageFromBackground, injectCosmetics } from '../cosmetics';

/**
 * Because all the filters and matching logic lives in the background of the
 * extension, the content script needs a way to request relevant cosmetic
 * filters for each frame. This channel of communication can be handled in
 * several ways (`connect`, `sendMessage`). Here we will make use of
 * `sendMessage` for one-off communications.
 *
 * `getCosmeticsFilters` wraps the logic of communicating with the background
 * and will be used to request cosmetics filters for the current frame.
 *
 * The background should listen to these messages and answer back with lists of
 * filters to be injected in the page.
 */
const getCosmeticsFilters = ({
  classes,
  hrefs,
  ids,
  lifecycle,
}: IBackgroundCallback): Promise<IMessageFromBackground> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        action: 'getCosmeticsFilters',
        classes,
        hrefs,
        ids,
        lifecycle,
      },
      (response: IMessageFromBackground | undefined) => {
        if (response !== undefined) {
          resolve(response);
        }
      },
    );
  });
};

/**
 * `injectCosmetics` is in charge of all ad-blocking logic on the content-script
 * side. It handles the following:
 * - Inject scripts into the page, which might be used to defuse anti-adblockers.
 * - Block the execution of some scripts in the page (only if the
 * 'beforescriptexecute' event is available, currently only on Firefox).
 */
injectCosmetics(window, getCosmeticsFilters, true /* MutationObserver */);
