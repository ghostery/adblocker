/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const HOSTNAME_RE = /^(?:[^:]+:)(?:\/\/(?:[^\/]*@)?(\[[^\]]*\]|[^:\/]+))?/;
function extractHostname(url) {
  const [, hostname] = HOSTNAME_RE.exec(url) || [];
  return hostname;
}


module.exports = class Re {
  static parse() {
    return new Re();
  }

  match({ url, frameUrl }) {
    return extractHostname(url) && extractHostname(frameUrl);
  }
};
