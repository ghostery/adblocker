/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import * as sinon from 'sinon';
import 'mocha';
import { JSDOM, ResourceLoader } from 'jsdom';
import { injectCosmetics } from '../adblocker';

async function tick(timeout = 0) {
  await new Promise((resolve) => setTimeout(resolve, timeout));
}

describe('#injectCosmetics', () => {
  it('asks background for cosmetics when called', () => {
    const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
    const getCosmeticsFilters = sinon.spy(async (_) => {
      return {
        active: true,
        extended: [],
        scripts: [],
        styles: '',
      };
    });

    injectCosmetics(dom.window, true, getCosmeticsFilters);
    dom.window.close();

    sinon.assert.calledOnce(getCosmeticsFilters);
    sinon.assert.calledWith(getCosmeticsFilters.firstCall, {
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
    const getCosmeticsFilters = sinon.spy(async (_) => {
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

    sinon.assert.calledTwice(getCosmeticsFilters);
    sinon.assert.calledWith(getCosmeticsFilters.secondCall, {
      type: 'features',
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
    const getCosmeticsFilters = sinon.spy(async (_) => {
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

    sinon.assert.calledThrice(getCosmeticsFilters);
    sinon.assert.calledWith(getCosmeticsFilters.thirdCall, {
      type: 'features',
      classes: ['class2'],
      hrefs: ['https://bar.com/'],
      ids: ['id2'],
      lifecycle: 'dom-update',
    });

    // Mutate the DOM = change existing nodes
    div.classList.add('class3');
    span.classList.add('class4');
    a.href = 'https://baz.com/';
    a.classList.add('class1');

    await tick();
    dom.window.close();

    expect(getCosmeticsFilters.callCount).to.eql(4);
    sinon.assert.calledWith(getCosmeticsFilters.getCall(3), {
      type: 'features',
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
    expect(dom.window.document.getElementsByTagName('span')).to.have.lengthOf(1);
  });

  it('injects scriptlet in Firefox', async () => {
    const loader = new ResourceLoader({
      userAgent: "Firefox"
    });
    const dom = new JSDOM(
      `
<!DOCTYPE html>
<head></head>
<body>
</body>
`,
      {
        resources: loader,
        runScripts: 'dangerously',
      },
    );

    // JSDOM does not support createObjectURL so we replace blobs with data urls
    // @ts-ignore
    dom.window.URL.createObjectURL = async (blob: Blob) => {
      const text = await blob.text();
      const base64 = Buffer.from(text).toString('base64');
      return `data:text/javascript;base64,${base64}`;
    };
    dom.window.URL.revokeObjectURL = () => {};
    dom.window.Blob = Blob;

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
    expect(dom.window.document.getElementsByTagName('span')).to.have.lengthOf(1);
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
    expect(dom.window.document.getElementsByTagName('span')).to.have.lengthOf(0);
  });
});
