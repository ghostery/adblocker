/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { IBackgroundCallback, IMessageFromBackground } from '../content/communication';
declare global {
    interface Window {
        MutationObserver?: typeof MutationObserver;
    }
}
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
export default function injectCosmetics(window: Window, getCosmeticsFilters: (_: IBackgroundCallback) => Promise<IMessageFromBackground>, enableMutationObserver: boolean): void;
