/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export declare type Lifecycle = 'start' | 'dom-update';
export interface IBackgroundCallback {
    classes: string[];
    hrefs: string[];
    ids: string[];
    lifecycle: Lifecycle;
}
export interface IMessageFromBackground {
    active: boolean;
    scripts: string[];
    styles: string;
    extended: string[];
}
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
/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
export declare function autoRemoveScript(script: string): string;
export declare function injectCSSRule(rule: string, doc: Document): void;
export declare function injectScript(s: string, doc: Document): void;
//# sourceMappingURL=adblocker.d.ts.map