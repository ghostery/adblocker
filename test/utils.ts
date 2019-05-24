/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import * as fs from 'fs';
import * as path from 'path';

function readAsset(filepath: string) {
  return fs.readFileSync(path.resolve(__dirname, '../', filepath), 'utf-8');
}

export function loadAllLists() {
  return [
    'assets/adguard/mobile.txt',
    'assets/easylist-downloads.adblockplus.org/antiadblockfilters.txt',
    'assets/easylist.to/easylist/easylist.txt',
    'assets/easylist.to/easylist/easyprivacy.txt',
    'assets/easylist.to/easylistgermany/easylistgermany.txt',
    'assets/pgl.yoyo.org/adservers/serverlist.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
  ]
    .map(readAsset)
    .join('\n');
}

export function loadResources() {
  return readAsset(
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt',
  );
}

export function getNaughtyStrings(): string[] {
  return fs.readFileSync(path.resolve(__dirname, 'data', 'blns.txt'), 'utf-8').split('\n');
}
