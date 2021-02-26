/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { injectCosmetics } from '@cliqz/adblocker-webextension-cosmetics';

/**
 * `injectCosmetics` is in charge of all ad-blocking logic on the content-script
 * side. It handles the following:
 * - Inject scripts into the page, which might be used to defuse anti-adblockers.
 * - Block the execution of some scripts in the page (only if the
 * 'beforescriptexecute' event is available, currently only on Firefox).
 */
injectCosmetics(window, true /* MutationObserver */);
