/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { queueMicrotask } from './queue-microtask';

/**
 * Type of an event listener (i.e.: callback). It accepts arbitrary arguments
 * and is not expected to return any result.
 */
type EventListener = (...args: any[]) => void;

/**
 * Type of event listeners for all events. It maps event names (from a set of
 * type-level string literals) to list of event listeners.
 */
type EventListeners<EventNames> = Map<EventNames, EventListener[]>;

/**
 * Add `callback` listener for `event` in `listeners` Map.
 */
function registerCallback<EventNames>(
  event: EventNames,
  callback: EventListener,
  listeners: EventListeners<EventNames>,
): void {
  let listenersForEvent = listeners.get(event);

  if (listenersForEvent === undefined) {
    listenersForEvent = [];
    listeners.set(event, listenersForEvent);
  }

  listenersForEvent.push(callback);
}

/**
 * Remove `callback` listener for `event` from `listeners` Map.
 */
function unregisterCallback<EventNames>(
  event: EventNames,
  callback: EventListener,
  listeners: EventListeners<EventNames>,
): void {
  const listenersForEvent = listeners.get(event);
  if (listenersForEvent !== undefined) {
    const indexOfCallback = listenersForEvent.indexOf(callback);
    if (indexOfCallback !== -1) {
      listenersForEvent.splice(indexOfCallback, 1);
    }
  }
}

/**
 * Call all registered listeners for `event` with `args` as arguments. Return
 * `true` if at least one callback was registered and `false` otherwise.
 */
function triggerCallback<EventNames>(
  event: EventNames,
  args: any[],
  listeners: EventListeners<EventNames>,
): boolean {
  // Fast-path for cases where no listener is registered
  if (listeners.size === 0) {
    return false;
  }

  const listenersForEvent = listeners.get(event);
  if (listenersForEvent !== undefined) {
    queueMicrotask(() => {
      for (let i = 0; i < listenersForEvent.length; i += 1) {
        listenersForEvent[i](...args);
      }
    });
    return true;
  }

  return false;
}

/**
 * Simple and efficient `EventEmitter` abstraction (following conventions from
 * Node.js) allowing partially typed event emitting. The set of event names is
 * specified as a type parameter while instantiating the event emitter.
 */
export class EventEmitter<EventNames> {
  private onceListeners: EventListeners<EventNames> = new Map();
  private onListeners: EventListeners<EventNames> = new Map();

  /**
   * Register an event listener for `event`.
   */
  public on(event: EventNames, callback: EventListener): void {
    registerCallback(event, callback, this.onListeners);
  }

  /**
   * Register an event listener for `event`; but only listen to first instance
   * of this event. The listener is automatically deleted afterwards.
   */
  public once(event: EventNames, callback: EventListener): void {
    registerCallback(event, callback, this.onceListeners);
  }

  /**
   * Remove `callback` from list of listeners for `event`.
   */
  public unsubscribe(event: EventNames, callback: EventListener): void {
    unregisterCallback(event, callback, this.onListeners);
    unregisterCallback(event, callback, this.onceListeners);
  }

  /**
   * Emit an event. Call all registered listeners to this event.
   */
  public emit(event: EventNames, ...args: any[]): void {
    triggerCallback(event, args, this.onListeners);
    if (triggerCallback(event, args, this.onceListeners) === true) {
      this.onceListeners.delete(event);
    }
  }
}
