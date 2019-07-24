/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

module.exports = {
  preset: 'ts-jest',
  // NOTE: default value for `testEnvironment` is 'jsdom', which enabled a
  // browser-like environment using jsdom abstractions. If we enable this,
  // cosmetic CSS validation is enabled and some tests will need to be fixed.
  testEnvironment: 'node',
};
