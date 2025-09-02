import type { Server } from 'node:http';
import { filters, type Report } from '@seia-soto/checkadb';
import { createTestingServer } from '@seia-soto/checkadb/server';
import { test as playwrightTest, firefox, expect, type BrowserContext } from '@playwright/test';
import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

declare global {
  interface Window {
    suite: {
      collection: {
        expected: number;
        reports: Report[];
      };
    };
  }
}

const test = playwrightTest.extend<{
  context: BrowserContext;
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    let tmpd: string;
    try {
      tmpd = await mkdtemp(join(tmpdir(), 'ghostery-adblocker-webextension-test-'));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create temporary directory!');
    }
    const extensionPath = join(fileURLToPath(import.meta.url));
    const context = await firefox.launchPersistentContext(tmpd, {
      args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
    });
    const [backgroundPage] = context.backgroundPages();
    const isUpdated = await backgroundPage.evaluate(
      async (added) => {
        return window.adblocker.updateFromDiff({
          added,
        });
      },
      filters.map(([, filter]) => filter),
    );
    if (isUpdated === false) {
      throw new Error('Failed to install the test filters!');
    }
    await use(context);
    await context.close();
  },
});

let server: Server;
let url: string;

test.beforeAll(async () => {
  server = createTestingServer();
  url = await new Promise<string>((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const info = server.address();
      if (typeof info === 'string') {
        resolve(info);
      } else if (info !== null) {
        resolve(`http://${info.address}:${info.port}/`);
      } else {
        throw new Error('Failed to allocate an address for the testing server');
      }
    });
  });
});

test.afterAll(async () => {
  await new Promise<void>((resolve) => {
    server.close(() => {
      resolve();
    });
  });
});

test.beforeEach(async ({ page }) => {
  page.route('*', async (route) => {
    await route.continue({
      url,
    });
  });
});

test('checkadb', async ({ page }) => {
  await page.goto('http://self/');
  const reportsJson = await page.evaluate(async () => {
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 1000);
      });
      if (window.suite.collection.expected === window.suite.collection.reports.length) {
        break;
      }
    }
    return JSON.stringify(window.suite.collection.reports);
  });
  const reports: Report[] = JSON.parse(reportsJson);
  console.log(reports);
  expect(reports).not.toBe({});
});
