/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const CliqzBase = require('./cliqz-base');

module.exports = class Cliqz extends CliqzBase {
  static parse(rawLists, { debug = false } = {}) {
    return super.parse(rawLists, { debug });
  }
};
