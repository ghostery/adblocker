/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { SmazCompress } from '@remusao/smaz-compress';
import { SmazDecompressRaw } from '@remusao/smaz-decompress';

import cosmeticSelectorCodebook from './codebooks/cosmetic-selector.js';
import networkCSPCodebook from './codebooks/network-csp.js';
import networkFilterCodebook from './codebooks/network-filter.js';
import networkHostnameCodebook from './codebooks/network-hostname.js';
import networkRedirectCodebook from './codebooks/network-redirect.js';
import networkRawCodebook from './codebooks/raw-network.js';
import cosmeticRawCodebook from './codebooks/raw-cosmetic.js';

const TEXT_ENCODER = new TextEncoder();

export class Smaz {
  private compressor: SmazCompress;
  private decompressor: SmazDecompressRaw;

  constructor(codebook: readonly string[], maxSize?: number) {
    this.compressor = new SmazCompress(codebook, maxSize);
    this.decompressor = SmazDecompressRaw.fromStringCodebook(codebook);
  }

  public compress(buffer: string) {
    return this.compressor.compress(TEXT_ENCODER.encode(buffer));
  }

  public getCompressedSize(buffer: string) {
    return this.compressor.getCompressedSize(TEXT_ENCODER.encode(buffer));
  }

  public decompress(buffer: Uint8Array): string {
    return new TextDecoder('utf8', { ignoreBOM: true }).decode(
      this.decompressor.decompress(buffer),
    );
  }
}

export default class Compression {
  public readonly cosmeticSelector: Smaz = new Smaz(cosmeticSelectorCodebook);
  public readonly networkCSP: Smaz = new Smaz(networkCSPCodebook);
  public readonly networkRedirect: Smaz = new Smaz(networkRedirectCodebook);
  public readonly networkHostname: Smaz = new Smaz(networkHostnameCodebook);
  public readonly networkFilter: Smaz = new Smaz(networkFilterCodebook);
  public readonly networkRaw: Smaz = new Smaz(networkRawCodebook);
  public readonly cosmeticRaw: Smaz = new Smaz(cosmeticRawCodebook, 800_000);
}
