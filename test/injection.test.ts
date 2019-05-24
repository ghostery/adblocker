/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { JSDOM } from 'jsdom';
import injectCosmetics from '../src/cosmetics-injection';

function testInjectCSS() {
  const url = 'https://foo.com';
  const dom = new JSDOM('<div id="foo">bar</div>', {
    /* pretendToBeVisual: true, */
    runScripts: 'dangerously',
    url,
  });

  injectCosmetics(dom.window, () =>
    Promise.resolve({
      active: true,
      scripts: [],
      styles: '',
    }),
  );

  // Terminate our JSDOM instance
  dom.window.close();
}

describe('Inject CSS filters', () => {
  it('TODO', () => {
    testInjectCSS();
    // TODO
  });
});

describe('Inject script', () => {
  it('TODO', () => {
    // TODO
  });
});
