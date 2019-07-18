/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/// <reference types="chrome" />
import { IBackgroundCallback } from '../content/communication';
import Engine from '../engine/engine';
import { WebRequestBeforeRequestDetails, WebRequestHeadersReceivedDetails } from '../request';
export declare function checkAvailableAPIs(): void;
/**
 * Wrap `FiltersEngine` into a WebExtension-friendly helper class. It exposes
 * methods to interface with WebExtension APIs needed to block ads.
 */
export default class WebExtensionBlocker extends Engine {
    /**
     * Deal with request cancellation (`{ cancel: true }`) and redirection (`{ redirectUrl: '...' }`).
     */
    onBeforeRequest(details: WebRequestBeforeRequestDetails): chrome.webRequest.BlockingResponse;
    /**
     *
     */
    onHeadersReceived(details: WebRequestHeadersReceivedDetails): chrome.webRequest.BlockingResponse;
    onRuntimeMessage(msg: IBackgroundCallback & {
        action?: string;
    }, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void;
    private injectStylesWebExtension;
}
