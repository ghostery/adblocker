import { app, BrowserWindow, session } from 'electron';
import fetch from 'node-fetch';

import { ElectronBlocker, fullLists, Request } from '@cliqz/adblocker-electron';

function getUrlToLoad(): string {
  let url = 'https://www.mangareader.net/';
  if (process.argv[process.argv.length - 1].endsWith('.js') === false) {
    url = process.argv[process.argv.length - 1];
  }

  return url;
}

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  if (session.defaultSession === undefined) {
    throw new Error('defaultSession is undefined');
  }

  const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
  });
  blocker.enableBlockingInSession(session.defaultSession);

  blocker.on('request-blocked', (request: Request) => {
    console.log('blocked', request.tabId, request.url);
  });

  blocker.on('request-redirected', (request: Request) => {
    console.log('redirected', request.tabId, request.url);
  });

  blocker.on('request-whitelisted', (request: Request) => {
    console.log('whitelisted', request.tabId, request.url);
  });

  blocker.on('csp-injected', (request: Request) => {
    console.log('csp', request.url);
  });

  blocker.on('script-injected', (script: string, url: string) => {
    console.log('script', script.length, url);
  });

  blocker.on('style-injected', (style: string, url: string) => {
    console.log('style', style.length, url);
  });

  mainWindow.loadURL(getUrlToLoad());
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.allowRendererProcessReuse = false

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
})

app.on('activate', () => {
  if (mainWindow === null) { createWindow(); }
});
