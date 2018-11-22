import { bundle } from '../injection';

/**
 * This module exports scriptlets building blocks which can be injected in
 * pages. Each scriptlet is a function which can accept some arguments as well
 * as a list of dependencies (functions which need to be available in the scope
 * whenever the script runs in the page).
 */

/**
 * Intercept and ignore errors originating from one of our scripts (if it
 * contains the `magic` string which is unique to each content-script)
 */
export const swallowOwnErrors = bundle((magic) => {
  // Keep track of original `onerror` callback, if any
  const windowOnError = window.onerror;

  // Wrap `onerror` into our custom handler to intercept our own exceptions
  const customOnError = function(this: Window, msg: any) {
    if (typeof msg === 'string' && msg.indexOf(magic) !== -1) {
      return true; // do not fire default event handler
    }

    if (windowOnError instanceof Function) {
      return windowOnError.apply(this, arguments);
    }

    return false;
  }.bind(window);

  Object.defineProperty(window, 'onerror', {
    get: () => customOnError,
    set: () => {
      /* Cannot override */
    },
  });
});

export const protectConsole = bundle(() => {
  const originalConsole = window.console;
  const originalLog = console.log;

  Object.defineProperty(console, 'log', {
    value: function fakeLog() {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof HTMLElement) {
          return;
        }
      }
      return originalLog.apply(originalConsole, arguments);
    }.bind(console),
  });

  Object.defineProperty(console.log, 'name', { value: 'log' });
});
