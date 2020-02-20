/**
 * The MIT License (MIT)
 *
 * Copyright (c) Feross Aboukhadijeh
 *
 * Originally from: https://github.com/feross/queue-microtask
 */

let promise: Promise<void> | undefined;

type Callback = () => void;

export const queueMicrotask: (cb: Callback) => void =
  typeof window !== 'undefined' && typeof window.queueMicrotask === 'function'
    ? (cb: Callback) => window.queueMicrotask(cb)
    : // reuse resolved promise, and allocate it lazily
      (cb: Callback) =>
        (promise || (promise = Promise.resolve())).then(cb).catch((err) =>
          setTimeout(() => {
            throw err;
          }, 0),
        );
