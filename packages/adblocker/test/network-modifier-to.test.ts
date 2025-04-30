/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect, use } from 'chai';
import 'mocha';
import FilterEngine from '../src/engine/engine.js';

it('engine should not apply $to modifier to example.com', (t) => {
  const engine = FilterEngine.parse(`###test
@@*$ghide,to=~b.com`);
  const result = engine.getCosmeticsFilters({
    url: 'https://example.com/',
    hostname: 'example.com',
    domain: 'example.com',
    ids: ['test'],
    getRulesFromDOM: true,
  });
  console.log(result);
});
