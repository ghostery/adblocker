import {} from 'jest';

import { JSDOM } from 'jsdom';
import CosmeticsInjection from '../src/cosmetics-injection';

function testInjectCSS() {
  const url = 'https://foo.com';
  const dom = new JSDOM('<div id="foo">bar</div>', {
    /* pretendToBeVisual: true, */
    runScripts: 'dangerously',
    url,
  });

  const injection = new CosmeticsInjection(
    url,
    dom.window,
    (action, ...args) => {
      console.log('>>>>', action, args);
    },
  );

  // Signal that the DOM is ready
  injection.onDOMContentLoaded();

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
