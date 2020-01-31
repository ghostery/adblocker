/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { promises as fs } from 'fs';
import { join } from 'path';

import { FiltersEngine } from '../adblocker';

async function loadAllLists() {
  const assets = await Promise.all(
    [
      '../assets/easylist/easylist.txt',
      '../assets/easylist/easylistgermany.txt',
      '../assets/easylist/easyprivacy.txt',
      '../assets/fanboy/annoyance.txt',
      '../assets/easylist/easylist-cookie.txt',
      '../assets/peter-lowe/serverlist.txt',
      '../assets/ublock-origin/annoyances.txt',
      '../assets/ublock-origin/badware.txt',
      '../assets/ublock-origin/filters.txt',
      '../assets/ublock-origin/privacy.txt',
      '../assets/ublock-origin/resource-abuse.txt',
      '../assets/ublock-origin/unbreak.txt',
    ].map((p) => fs.readFile(join(__dirname, p), 'utf-8')),
  );

  return assets.join('\n');
}

(async () => {
  const engine = FiltersEngine.parse(await loadAllLists(), { debug: true, loadNetworkFilters: false, enableCompression: true });
  console.log(engine.serialize().byteLength);
})();
