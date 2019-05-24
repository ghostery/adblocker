/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { URL } = require('url');
const punycode = require('punycode');
const fs = require('fs');
const path = require('path');

const SandboxedModule = require('sandboxed-module');
const { JSDOM } = require('jsdom');

const DOM = new JSDOM('<!DOCTYPE html>background');

// MOCK: assets
const assetsStore = new Map();
const assets = {
  get: (key, cb) => {
    const result = { content: assetsStore.get(key) };
    if (cb) {
      cb(result);
    }
    return Promise.resolve(result);
  },
  put: (key, value, cb) => {
    assetsStore.set(key, value);
    if (cb) {
      cb();
    }
    return Promise.resolve();
  },
};

// MOCK: localStorage
const localStorageStore = new Map();
const localStorage = {
  getItem: key => localStorageStore.get(key),
  setItem: (key, value) => { localStorageStore.set(key, value); },
};

// MOCK: tabContextManager
const tabContextManager = {
  mustLookup: () => ({
    origin: '',
    rootHostname: '',
    rootDomain: '',
    tabId: -1,
  }),
};

// MOCK: µBlock
const µBlock = {
  pageStores: new Map(),
  getNetFilteringSwitch: () => true,
  hiddenSettings: {
    disableWebAssembly: false,
  },
  tabContextManager,
  assets,
  logger: {
    enabled: false,
    writeOne: () => {},
  },
  sessionSwitches: {
    evaluateZ: () => true,
  },
};

// MOCK: vAPI
const vAPI = {
  webextFlavor: {
    soup: new Set(['firefox']),
  },
  localStorage,
  setTimeout: () => {},
  tabs: {
    registerListeners: () => {},
    onPopupCreated: () => {},
  },
  i18n: () => '',
};


const globals = {
  URL,
  self: {
    punycode,
  },
  punycode,
  µBlock,
  vAPI,
  window: DOM.window,
  document: DOM.window.document,
};

// NOTE: some changes were required to load `publicsuffixlist.js in this context.
// Check `publicsuffixlist.patch` file for more information about what changed.
globals.publicSuffixList = SandboxedModule.require('./ublock/publicsuffixlist.js', { globals });
globals.publicSuffixList.parse(fs.readFileSync(path.resolve(__dirname, './ublock/public_suffix_list.dat'), { encoding: 'utf-8' }), punycode.toASCII);
const publicSuffixListEnabledPromise = globals.publicSuffixList.enableWASM();

// NOTE: some changes were required to load `hntrie.js` in this context. The
SandboxedModule.require('./ublock/utils.js', { globals });
SandboxedModule.require('./ublock/uritools.js', { globals });
SandboxedModule.require('./ublock/strie.js', { globals });
globals.STrieContainer = µBlock.STrieContainer;

// HNTrieContainer needs to be attached to the global µBlock object to be
// accessible by other modules.
SandboxedModule.require('./ublock/hntrie.js', { globals });
globals.HNTrieContainer = µBlock.HNTrieContainer;
const { HNTrieContainerReadyPromise } = µBlock;

SandboxedModule.require('./ublock/static-ext-filtering.js', { globals });
SandboxedModule.require('./ublock/static-net-filtering.js', { globals });
SandboxedModule.require('./ublock/storage.js', { globals });

// NOTE: only `normalizePageURL` was kept in `tab.js`.
SandboxedModule.require('./ublock/pagestore.js', { globals });
SandboxedModule.require('./ublock/tab.js', { globals });
SandboxedModule.require('./ublock/filtering-context.js', { globals });

module.exports = class UBlockOrigin {
  static async parse(rawLists) {
    await publicSuffixListEnabledPromise;
    await HNTrieContainerReadyPromise;

    µBlock.staticNetFilteringEngine.fromCompiledContent(
      new µBlock.CompiledLineIO.Reader(µBlock.compileFilters(rawLists)),
    );
    µBlock.staticNetFilteringEngine.freeze();
    return new UBlockOrigin(µBlock.staticNetFilteringEngine);
  }

  constructor(engine) {
    this.engine = engine;
  }

  async serialize() {
    await this.engine.toSelfie('path');
    return JSON.stringify([
      (await assets.get('path/main')).content,
      (await assets.get('path/trieContainer')).content,
    ]);
  }

  async deserialize() {
    await this.engine.fromSelfie('path');
  }

  match({ url, frameUrl, type }) {
    return (
      this.engine.matchString(
        µBlock.filteringContext.fromWebrequestDetails({
          url,
          type,
          documentUrl: frameUrl,
        }),
      ) === 1
    );
  }
};
