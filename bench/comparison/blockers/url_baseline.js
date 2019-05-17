/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { URL } = require('url');

module.exports = class Url {
  static parse() {
    return new Url();
  }

  match({ url, frameUrl }) {
    return new URL(url) && new URL(frameUrl);
  }
};
