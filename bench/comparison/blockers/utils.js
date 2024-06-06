/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

'use strict';

const HOSTNAME_RE = /^[^:]+:(?:\/\/(?:[^\/]*@)?(\[[^\]]*\]|[^:\/]+))?/;

exports.extractHostname = function extractHostname(url) {
  const [ , hostname = '' ] = HOSTNAME_RE.exec(url) || [ , '' ];
  return hostname;
};
