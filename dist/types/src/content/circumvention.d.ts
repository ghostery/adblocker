/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
declare const _default: (window: Window) => void;
/**
 * This module exports a single function which will be called from content
 * script to inject some circumvention logic without having to perform a
 * round-trip to the background. This is required for some websites where
 * circumvention is done from the main document and counter-measures need to
 * take effect immediately.
 */
export default _default;
