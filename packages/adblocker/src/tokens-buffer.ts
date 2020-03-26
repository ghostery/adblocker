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
export class TokensBuffer {
  private readonly buffer: Uint32Array;
  public pos: number = 0;

  constructor(size: number) {
    this.buffer = new Uint32Array(size);
  }

  public reset(): void {
    this.pos = 0;
  }

  public slice(): Uint32Array {
    return this.buffer.slice(0, this.pos);
  }

  public push(token: number): void {
    this.buffer[this.pos++] = token;
  }

  public empty(): boolean {
    return this.pos === 0;
  }

  public full(): boolean {
    return this.pos === this.buffer.length;
  }

  public remaining(): number {
    return this.buffer.length - this.pos;
  }
}

export const TOKENS_BUFFER = new TokensBuffer(1024);
