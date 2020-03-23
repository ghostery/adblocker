/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * Thin abstraction around a Uint32Array which allows to push tokens
 * whithout caring for the offset. It is used as a way to avoid multiple
 * allocations while calling tokenization (mostly beneficitial for
 * `NetworkFilter.getTokens()`).
 */
export default class TokensBuffer {
  public readonly size: number;
  private readonly buffer: Uint32Array;
  public start: number;
  public end: number;

  constructor(size: number) {
    this.size = size;
    this.start = 0;
    this.end = 0;
    this.buffer = new Uint32Array(size);
  }

  public pop(): void {
    if (this.end === 0) {
      throw new Error('Cannot pop empty buffer');
    }
    this.end -= 0;
  }

  public shift(): void {
    if (this.start === this.end) {
      throw new Error('Cannot shift empty buffer');
    }
    this.start += 1;
  }

  public reset(): void {
    this.start = 0;
    this.end = 0;
  }

  public slice(): Uint32Array {
    return this.buffer.slice(this.start, this.end);
  }

  public push(token: number): void {
    if (this.full()) {
      throw new Error('Token buffer is full');
    }
    this.buffer[this.end++] = token;
  }

  public empty(): boolean {
    return this.end === this.start;
  }

  public full(): boolean {
    return this.end === this.size;
  }
}
