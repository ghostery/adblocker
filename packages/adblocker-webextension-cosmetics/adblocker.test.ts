/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { JSDOM } from 'jsdom';
import { injectCosmetics } from './adblocker';

async function tick(timeout = 0) {
  await new Promise((resolve) => setTimeout(resolve, timeout));
}

describe('#injectCosmetics', () => {
  it('asks background for cosmetics when called', () => {
    const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
    const getCosmeticsFilters = jest.fn(async () => {
      return {
        active: true,
        extended: [],
        scripts: [],
        styles: '',
      };
    });

    injectCosmetics(dom.window, true, getCosmeticsFilters);
    dom.window.close();

    expect(getCosmeticsFilters).toHaveBeenCalledTimes(1);
    expect(getCosmeticsFilters).toHaveBeenLastCalledWith({
      classes: [],
      hrefs: [],
      ids: [],
      lifecycle: 'start',
    });
  });

  it('gets DOM info on DOMContentLoaded', async () => {
    const dom = new JSDOM(`
<!DOCTYPE html>
<head></head>
<body>
  <div id="id1">
    <span class="class1"></span>
    <a href="https://foo.com/">
  </div>
</body>
`);
    const getCosmeticsFilters = jest.fn(async () => {
      return {
        active: true,
        extended: [],
        scripts: [],
        styles: '',
      };
    });

    injectCosmetics(dom.window, true, getCosmeticsFilters);
    await tick();
    dom.window.close();

    expect(getCosmeticsFilters).toHaveBeenCalledTimes(2);
    expect(getCosmeticsFilters).toHaveBeenLastCalledWith({
      classes: ['class1'],
      hrefs: ['https://foo.com/'],
      ids: ['id1'],
      lifecycle: 'dom-update',
    });
  });

  it('gets DOM info on DOM mutation', async () => {
    const dom = new JSDOM(`
<!DOCTYPE html>
<head></head>
<body>
  <div id="id1">
    <span class="class1"></span>
    <a href="https://foo.com/">
  </div>
</body>
`);
    const getCosmeticsFilters = jest.fn(async () => {
      return {
        active: true,
        extended: [],
        scripts: [],
        styles: '',
      };
    });

    // Wait for DOMContentLoaded
    injectCosmetics(dom.window, true, getCosmeticsFilters);
    await tick();

    // Mutate the DOM = add nodes
    const { document } = dom.window;
    const div = document.createElement('div');
    div.id = 'id2';

    const span = document.createElement('span');
    span.classList.add('class2');
    div.appendChild(span);

    const a = document.createElement('a');
    a.href = 'https://bar.com/';
    div.appendChild(a);

    document.body.appendChild(div);
    await tick();

    expect(getCosmeticsFilters).toHaveBeenCalledTimes(3);
    expect(getCosmeticsFilters).toHaveBeenLastCalledWith({
      classes: ['class2'],
      hrefs: ['https://bar.com/'],
      ids: ['id2'],
      lifecycle: 'dom-update',
    });

    // Mutate the DOM = change existing nodes
    div.classList.add('class3');
    span.classList.add('class4');
    a.href = 'https://baz.com';
    a.classList.add('class1');

    await tick();
    dom.window.close();

    expect(getCosmeticsFilters).toHaveBeenCalledTimes(4);
    expect(getCosmeticsFilters).toHaveBeenLastCalledWith({
      classes: ['class3', 'class4'],
      hrefs: ['https://baz.com/'],
      ids: [],
      lifecycle: 'dom-update',
    });
  });

  it('injects scriptlet', async () => {
    const dom = new JSDOM(
      `
<!DOCTYPE html>
<head></head>
<body>
</body>
`,
      {
        runScripts: 'dangerously',
      },
    );

    injectCosmetics(dom.window, true, async () => {
      return {
        active: true,
        extended: [],
        scripts: [
          `
          (function () {
            const span = window.document.createElement('span');
            window.document.body.appendChild(span);
          })();
        `,
        ],
        styles: '',
      };
    });

    await tick(1000);
    expect(dom.window.document.getElementsByTagName('span')).toHaveLength(1);
  });

  it('injects cosmetic', async () => {
    const dom = new JSDOM(
      `
<!DOCTYPE html>
<head></head>
<body>
  <div id="id1"></div>
</body>
`,
      { pretendToBeVisual: true },
    );

    injectCosmetics(dom.window, true, async () => {
      return {
        active: true,
        extended: [],
        scripts: [],
        styles: `
        #id1 { display: none !important; }
        `,
      };
    });

    await tick(1000);

    const div = dom.window.document.getElementById('cliqz-adblokcer-css-rules');
    expect(div).not.toBeNull();
  });

  it('does nothing if not active', async () => {
    const dom = new JSDOM(
      `
<!DOCTYPE html>
<head></head>
<body>
</body>
`,
      {
        runScripts: 'dangerously',
      },
    );

    injectCosmetics(dom.window, true, async () => {
      return {
        active: false,
        extended: [],
        scripts: [
          `
          (function () {
            const span = window.document.createElement('span');
            window.document.body.appendChild(span);
          })();
        `,
        ],
        styles: '',
      };
    });

    await tick(1000);
    expect(dom.window.document.getElementsByTagName('span')).toHaveLength(0);
  });
});
