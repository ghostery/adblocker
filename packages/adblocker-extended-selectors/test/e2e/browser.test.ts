import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

// Add type for the injected UMD global
declare global {
  interface Window {
    adblocker: {
      querySelectorAll: (parent: Element, selector: any) => Element[];
      parse: (selector: string) => any;
    };
  }
}

test.beforeEach(async ({ page }) => {
  // Print browser console messages to Node.js console
  page.on('console', (msg) => {
    const type = msg.type();
    const text = `[browser] ${msg.text()}`;
    if (type === 'log') console.log(text);
    else if (type === 'info') console.info(text);
    else if (type === 'warn') console.warn(text);
    else if (type === 'error') console.error(text);
  });
  // Inject the UMD bundle into the page context
  await page.addScriptTag({
    path: path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../../dist/adblocker.umd.min.js',
    ),
  });
});

test.describe('Browser-based CSS matching tests', () => {
  test(':matches-css matches element with exact CSS property value', async ({ page }) => {
    await page.setContent(
      '<div id="parent"><div class="block-element" style="display: block">Block</div></div>',
    );
    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-element')!;
      const selector = ':matches-css(display: block)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });
    expect(result).toBe(true);
  });

  test(':matches-css handles colons in CSS property value', async ({ page }) => {
    await page.setContent(
      `<div id="parent"><div class="block-element" style='background-image: url("data:image/png;base64,test")'>Block</div></div>`,
    );
    const result1 = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-element')!;
      const selector = ':matches-css(background-image: url("data:image/png;base64,test"))';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });
    expect(result1).toBe(true);

    const result2 = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-element')!;
      const selector = ':matches-css(background-image: /data/)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });
    expect(result2).toBe(true);
  });

  test(':matches-css matches element with regex CSS property value', async ({ page }) => {
    await page.setContent(
      '<div id="parent"><div class="block-element" style="display: block">Block</div></div>',
    );
    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-element')!;
      const selector = ':matches-css(display: /loc/)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });
    expect(result).toBe(true);
  });

  test(':matches-css does not match element with different CSS property value', async ({
    page,
  }) => {
    await page.setContent(
      '<div id="parent"><div class="inline-element" style="display: inline">Inline</div></div>',
    );
    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.inline-element')!;
      const selector = ':matches-css(display: block)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });
    expect(result).toBe(false);
  });

  test(':matches-css-after matches element with exact ::after pseudo-element CSS property value', async ({
    page,
  }) => {
    await page.setContent(`
      <style>
        .block-after::after { content: ''; display: block; }
        .inline-after::after { content: ''; display: inline; }
      </style>
      <div id="parent">
        <div class="block-after">Test</div>
        <div class="inline-after">Test</div>
      </div>
    `);

    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-after')!;
      const selector = ':matches-css-after(display: block)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });

    expect(result).toBe(true);
  });

  test(':matches-css-after does not match element with different ::after pseudo-element CSS property value', async ({
    page,
  }) => {
    await page.setContent(`
      <style>
        .inline-after::after { content: ''; display: inline; }
      </style>
      <div id="parent">
        <div class="inline-after">Test</div>
      </div>
    `);

    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.inline-after')!;
      const selector = ':matches-css-after(display: block)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });

    expect(result).toBe(false);
  });

  test(':matches-css-before matches element with exact ::before pseudo-element CSS property value', async ({
    page,
  }) => {
    await page.setContent(`
      <style>
        .block-before::before { content: ''; display: block; }
        .inline-before::before { content: ''; display: inline; }
      </style>
      <div id="parent">
        <div class="block-before">Test</div>
        <div class="inline-before">Test</div>
      </div>
    `);

    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-before')!;
      const selector = ':matches-css-before(display: block)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });

    expect(result).toBe(true);
  });

  test(':matches-css-before does not match element with different ::before pseudo-element CSS property value', async ({
    page,
  }) => {
    await page.setContent(`
      <style>
        .inline-before::before { content: ''; display: inline; }
      </style>
      <div id="parent">
        <div class="inline-before">Test</div>
      </div>
    `);

    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.inline-before')!;
      const selector = ':matches-css-before(display: block)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });

    expect(result).toBe(false);
  });
});

test.describe(':xpath', () => {
  test('matches element with valid expression', async ({ page }) => {
    await page.setContent('<div id="parent"><p>Test</p></div>');
    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('p')!;
      const selector = ':xpath(//p)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });
    expect(result).toBe(true);
  });

  test('does not match element with invalid expression', async ({ page }) => {
    await page.setContent('<div id="parent"><p>Test</p></div>');
    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('p')!;
      const selector = ':xpath(//span)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });
    expect(result).toBe(false);
  });

  test('handles malformed expression', async ({ page }) => {
    await page.setContent('<div id="parent"><p>Test</p></div>');
    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('p')!;
      const selector = ':xpath(//[invalid])';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(element);
    });
    expect(result).toBe(false);
  });

  test('transposes the DOM structure', async ({ page }) => {
    await page.setContent('<div id="parent"><p>Test</p></div>');
    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const selector = ':xpath(//p/..)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(parent);
    });
    expect(result).toBe(true);
  });

  test('compound selector with xpath', async ({ page }) => {
    await page.setContent(
      '<div id="parent"><p class="branding" style="display: block">Sponsored</p></div>',
    );
    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const selector = '.branding:has-text(/sponsored/i):xpath(..):matches-attr(id=parent)';
      const ast = parse(selector);
      const matches = querySelectorAll(parent, ast);
      return matches.includes(parent);
    });
    expect(result).toBe(true);
  });

  test('xpath transpose returns all matching elements', async ({ page }) => {
    await page.setContent(`
      <div id="root">
        <div id="container1" class="container">
          <p class="target">First target</p>
        </div>
        <div id="container2" class="container">
          <p class="target">Second target</p>
        </div>
        <div id="container3" class="container">
          <p class="target">Third target</p>
        </div>
      </div>
    `);

    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const root = document.getElementById('root')!;
      const selector = ':xpath(//p[@class="target"]/..)';
      const ast = parse(selector);
      const matches = querySelectorAll(root, ast);
      return matches.map((el) => el.id);
    });

    expect(result).toEqual(['container1', 'container2', 'container3']);
  });

  test('xpath transpose chains with compound selectors', async ({ page }) => {
    await page.setContent(`
      <div id="root">
        <div id="container1" class="container">
          <p class="target">First target</p>
        </div>
        <div id="container2" class="container">
          <p class="target">Second target</p>
        </div>
        <div id="container3" class="container">
          <p class="target">Third target</p>
        </div>
      </div>
    `);

    const result = await page.evaluate(() => {
      const { querySelectorAll, parse } = window.adblocker;
      const root = document.getElementById('root')!;
      const selector = ':xpath(//p[@class="target"]/..):has-text("Second target")';
      const ast = parse(selector);
      const matches = querySelectorAll(root, ast);
      return matches.map((el) => el.id);
    });

    expect(result).toEqual(['container2']);
  });
});
