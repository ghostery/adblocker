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
      blockedScripts: [],
      scripts: [],
      styles: [],
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
