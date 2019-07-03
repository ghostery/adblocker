/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { parse } = require('tldts');

module.exports = class Tldts {
  static parse() {
    return new Tldts();
  }

  match({ url, frameUrl }) {
    return parse(url) && parse(frameUrl);
  }
};
