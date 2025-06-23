import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

// Add type for the injected UMD global
declare global {
  interface Window {
    adblocker: {
      querySelectorAll: (parent: Element, selector: string) => Element[];
      parse: (...args: any[]) => any;
    };
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UMD_BUNDLE_PATH = path.resolve(__dirname, '../../dist/adblocker.umd.min.js');

test.describe('Browser-based CSS matching tests', () => {
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
    await page.addScriptTag({ path: UMD_BUNDLE_PATH });
  });

  test(':matches-css matches element with exact CSS property value', async ({ page }) => {
    await page.setContent(
      '<div id="parent"><div class="block-element" style="display: block">Block</div></div>',
    );
    const result = await page.evaluate(() => {
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-element')!;
      const selector = ':matches-css(display: block)';
      const matches = querySelectorAll(parent, selector);
      return matches.includes(element);
    });
    expect(result).toBe(true);
  });

  test(':matches-css handles colons in CSS property value', async ({ page }) => {
    await page.setContent(
      `<div id="parent"><div class="block-element" style='background-image: url("data:image/png;base64,test")'>Block</div></div>`,
    );
    const result1 = await page.evaluate(() => {
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-element')!;
      const selector = ':matches-css(background-image: url("data:image/png;base64,test"))';
      const matches = querySelectorAll(parent, selector);
      return matches.includes(element);
    });
    expect(result1).toBe(true);

    const result2 = await page.evaluate(() => {
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-element')!;
      const selector = ':matches-css(background-image: /data/)';
      const matches = querySelectorAll(parent, selector);
      return matches.includes(element);
    });
    expect(result2).toBe(true);
  });

  test(':matches-css matches element with regex CSS property value', async ({ page }) => {
    await page.setContent(
      '<div id="parent"><div class="block-element" style="display: block">Block</div></div>',
    );
    const result = await page.evaluate(() => {
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-element')!;
      const selector = ':matches-css(display: /loc/)';
      const matches = querySelectorAll(parent, selector);
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
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.inline-element')!;
      const selector = ':matches-css(display: block)';
      const matches = querySelectorAll(parent, selector);
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
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-after')!;
      const selector = ':matches-css-after(display: block)';
      const matches = querySelectorAll(parent, selector);
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
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.inline-after')!;
      const selector = ':matches-css-after(display: block)';
      const matches = querySelectorAll(parent, selector);
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
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.block-before')!;
      const selector = ':matches-css-before(display: block)';
      const matches = querySelectorAll(parent, selector);
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
      const { querySelectorAll } = window.adblocker;
      const parent = document.getElementById('parent')!;
      const element = document.querySelector('.inline-before')!;
      const selector = ':matches-css-before(display: block)';
      const matches = querySelectorAll(parent, selector);
      return matches.includes(element);
    });

    expect(result).toBe(false);
  });
});
