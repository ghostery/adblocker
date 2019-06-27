import axios from 'axios';
import { app, BrowserWindow, session } from 'electron';

import { ENGINE_VERSION, ElectronBlocker } from '../../';

async function loadAdblocker(): Promise<ElectronBlocker> {
  // Fetch `allowed-lists.json` from CDN. It contains information about where
  // to find pre-built engines as well as lists of filters (e.g.: Easylist,
  // etc.).
  console.time('fetch allowed lists');
  const { engines } = (await axios.get(
    'https://cdn.cliqz.com/adblocker/configs/desktop-ads-trackers/allowed-lists.json',
  )).data;
  console.timeEnd('fetch allowed lists');

  // Once we have the config, we can get the URL of the pre-built engine
  // corresponding to our installed @cliqz/adblocker version (i.e.:
  // ENGINE_VERSION). This guarantees that we can download a compabitle one.
  console.time('fetch serialized engine');
  const serialized = (await axios.get(engines[ENGINE_VERSION].url, {
    responseType: 'arraybuffer',
  })).data;
  console.timeEnd('fetch serialized engine');

  // Deserialize the FiltersEngine instance from binary form.
  console.time('deserialize engine');
  const engine = ElectronBlocker.deserialize(new Uint8Array(serialized)) as ElectronBlocker;
  console.timeEnd('deserialize engine');

  return engine;
}

let mainWindow: BrowserWindow | null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  const engine = await loadAdblocker();
  engine.enableBlockingInSession(session.defaultSession as Electron.Session);

  mainWindow.loadURL('https://www.mangareader.net/');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
