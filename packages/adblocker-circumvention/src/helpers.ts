/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * This module exports a list of helpers which can be used in content script.
 * *DO NOT* use these as part of scriptlets as these might not be available in
 * the context of pages.
 */

import { injectScript } from '@cliqz/adblocker-content';

export function getWindowHostname(window: Window) {
  const strip = (hostname: string): string => {
    if (hostname.startsWith('www.')) {
      return hostname.slice(4);
    }
    return hostname;
  };

  let win = window;

  while (win) {
    const hostname = win.location.hostname;
    if (hostname !== '') {
      return strip(hostname);
    }

    if (win === window.parent) {
      break;
    }

    win = win.parent;
  }

  return '';
}

export const magic = Math.abs((Date.now() * 524287) ^ ((Math.random() * 524287) >>> 0)).toString(
  16,
);

/**
 * Given a self-executing script as well as a list of dependencies (function
 * which are required by the injected script), create a script which contains
 * both the dependencies (as scoped functions) and the script.
 */
function wrapCallableInContext(script: string, deps: Array<(...args: any[]) => any> = []): string {
  return `
${deps.map((dep) => `const ${dep.name} = ${dep.toString()};`).join('\n')}
${script}
  `;
}

/**
 * Given a function which can accept arguments, serialize it into a string (as
 * well as its argument) so that it will automatically execute upon injection.
 */
function autoCallFunction(fn: (...args: any[]) => void, args: any[]): string {
  return `
try {
  (${fn.toString()})(${args.map((arg) => JSON.stringify(arg)).join(', ')});
} catch (ex) {  };`;
}

/**
 * Given a scriptlet (as well as optional dependencies: symbols which must be
 * available in the scope for this scriptlet to do its job), returns a callback
 * which needs to be called with the desired window as well as optional
 * arguments for the scriptlet. The script will be injected in the head of
 * window's document as a self-executing, self-erasing script element.
 */
export function bundle(fn: (...args: any[]) => void, deps: Array<(...args: any[]) => any> = []) {
  return (window: Window, args: any[]) =>
    injectScript(wrapCallableInContext(autoCallFunction(fn, args), deps), window.document);
}
