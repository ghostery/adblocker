/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const _N = (strings, number) => strings[0] + number.toLocaleString() + strings[1];

module.exports = {
  _N,

  _T: (strings, time) => {
    if (time === Infinity || time === -Infinity) {
      time = NaN;
    }

    const formatted = isNaN(time) ? 'n/a' : _N`${Math.round(time * 1e6) / 1e3} μs`;
    return strings[0] + formatted + strings[1];
  },

  _S: (strings, size) => {
    const formatted = size === null ? 'n/a' : _N`${Math.ceil(size / 1024)} KiB`;
    return strings[0] + formatted + strings[1];
  },
};
