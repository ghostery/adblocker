/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * This module exports scriptlets building blocks which can be injected in
 * pages. Each scriptlet is a function which can accept some arguments as well
 * as a list of dependencies (functions which need to be available in the scope
 * whenever the script runs in the page).
 */
/**
 * Intercept and ignore errors originating from one of our scripts (if it
 * contains the `magic` string which is unique to each content-script)
 */
export declare const swallowOwnErrors: (window: Window, args: any[]) => void;
export declare const protectConsole: (window: Window, args: any[]) => void;
