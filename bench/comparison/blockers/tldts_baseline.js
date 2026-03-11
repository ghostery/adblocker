/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { parse } from 'tldts-experimental';

export default class Tldts {
  static parse() {
    return new Tldts();
  }

  match({ url, frameUrl }) {
    return parse(url) && parse(frameUrl);
  }
}
