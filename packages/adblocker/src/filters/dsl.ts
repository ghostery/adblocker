/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

class HidingBuilder {}

type RequestType = 'image' | 'script' | 'font' | 'frame' | 'media' | 'font' | 'css';

class NetworkBuilder {
  private options: Set<RequestType> = new Set();

  private prefix: string | undefined = undefined;
  private infix: string | undefined = undefined;
  private suffix: string | undefined = undefined;

  private redirect: string | undefined = undefined;

  private blockRequestsWithType(t: RequestType): NetworkBuilder {
    if (this.options.has(t)) {
      throw new Error(`Already blocking type ${t}`);
    }

    this.options.add(t);
    return this;
  }

  public images(): NetworkBuilder {
    return this.blockRequestsWithType('image');
  }

  public scripts(): NetworkBuilder {
    return this.blockRequestsWithType('script');
  }

  public frames(): NetworkBuilder {
    return this.blockRequestsWithType('frame');
  }

  public fonts(): NetworkBuilder {
    return this.blockRequestsWithType('font');
  }

  public medias(): NetworkBuilder {
    return this.blockRequestsWithType('media');
  }

  public styles(): NetworkBuilder {
    return this.blockRequestsWithType('css');
  }

  public redirectTo(redirect: string): NetworkBuilder {
    if (this.redirect !== undefined) {
      throw new Error(`Already redirecting: ${this.redirect}`);
    }
    this.redirect = `redirect=${redirect}`;
    return this;
  }

  public urlContains(infix: string): NetworkBuilder {
    if (this.infix !== undefined) {
      throw new Error(`Already matching pattern: ${this.infix}`);
    }
    this.infix = infix;
    return this;
  }

  public urlStartsWith(prefix: string): NetworkBuilder {
    if (this.prefix !== undefined) {
      throw new Error(`Already matching prefix: ${this.prefix}`);
    }
    this.prefix = `|${prefix}`;
    return this;
  }

  public urlEndsWith(suffix: string): NetworkBuilder {
    if (this.suffix !== undefined) {
      throw new Error(`Already matching suffix: ${this.suffix}`);
    }
    this.suffix = `${suffix}|`;
    return this;
  }

  public withHostname(hostname: string): NetworkBuilder {
    if (this.prefix !== undefined) {
      throw new Error(`Cannot match hostname if filter already has prefix: ${this.prefix}`);
    }
    this.prefix = `||${hostname}^`;
    return this;
  }

  public toString(): string {
    const parts: string[] = [];

    if (this.prefix !== undefined) {
      parts.push(this.prefix);
    }

    if (this.infix !== undefined) {
      parts.push(this.infix);
    }

    if (this.suffix !== undefined) {
      parts.push(this.suffix);
    }

    const options: string[] = ['important'];

    if (this.options.size !== 0) {
      for (const option of this.options) {
        options.push(option);
      }
    }

    if (this.redirect !== undefined) {
      options.push(this.redirect);
    }

    return `${parts.length === 0 ? '*' : parts.join('*')}$${options.join(',')}`;
  }
}

export function block(): NetworkBuilder {
  return new NetworkBuilder();
}

export function hide(): HidingBuilder {
  return new HidingBuilder();
}
