/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * This module exports a list of helpers which can be used in content script.
 * *DO NOT* use these as part of scriptlets as these might not be available in
 * the context of pages.
 */
export declare function getWindowHostname(window: Window): string;
export declare const magic: string;
/**
 * WARNING: this function should be self-contained and not rely on any global
 * symbol. That constraint needs to be fulfilled because this function can
 * potentially be injected in content-script (e.g.: see PuppeteerBlocker for
 * more details).
 */
export declare function extractFeaturesFromDOM(elements: Element[]): {
    classes: string[];
    hrefs: string[];
    ids: string[];
};
