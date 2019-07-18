/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
export declare function autoRemoveScript(script: string): string;
export declare function injectCSSRule(rule: string, doc: Document): void;
export declare function injectScript(s: string, doc: Document): void;
/**
 * Given a scriptlet (as well as optional dependencies: symbols which must be
 * available in the scope for this scriptlet to do its job), returns a callback
 * which needs to be called with the desired window as well as optional
 * arguments for the scriptlet. The script will be injected in the head of
 * window's document as a self-executing, self-erasing script element.
 */
export declare function bundle(fn: (...args: any[]) => void, deps?: Array<(...args: any[]) => any>): (window: Window, args: any[]) => void;
