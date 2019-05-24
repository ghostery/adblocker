/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import * as compression from './compression';
import { decode, encode } from './punycode';

interface IDataViewOptions {
  enableCompression: boolean;
}

export const EMPTY_UINT8_ARRAY = new Uint8Array(0);
export const EMPTY_UINT32_ARRAY = new Uint32Array(0);

// Check if current architecture is little endian
const LITTLE_ENDIAN: boolean = new Int8Array(new Int16Array([1]).buffer)[0] === 1;

/**
 * This abstraction allows to serialize efficiently low-level values of types:
 * String, uint8, uint16, uint32 while hiding the complexity of managing the
 * current offset and growing. It should always be instantiated with a
 * big-enough length because this will not allow for resizing.
 *
 * This class is also more efficient than the built-in `DataView`.
 *
 * The way this is used in practice is that you write pairs of function to
 * serialize (respectively) deserialize a given structure/class (with code being
 * pretty symetrical). In the serializer you `pushX` values, and in the
 * deserializer you use `getX` functions to get back the values.
 */
export default class StaticDataView {
  /**
   * Return number of bytes needed to serialize `str` ASCII string.
   */
  public static sizeOfASCII(str: string): number {
    return StaticDataView.sizeOfLength(str.length) + str.length;
  }

  /**
   * Return number of bytes needed to serialize `str` UTF8 string.
   */
  public static sizeOfUTF8(str: string): number {
    const encoded = encode(str);
    return StaticDataView.sizeOfLength(encoded.length) + encoded.length;
  }

  /**
   * Return number of bytes needed to serialize `array`.
   */
  public static sizeOfUint32Array(array: Uint32Array): number {
    return array.byteLength + StaticDataView.sizeOfLength(array.length);
  }

  /**
   * Create an empty (i.e.: size = 0) StaticDataView.
   */
  public static empty(options?: IDataViewOptions): StaticDataView {
    return StaticDataView.fromUint8Array(EMPTY_UINT8_ARRAY, options);
  }

  /**
   * Instantiate a StaticDataView instance from `array` of type Uint8Array.
   */
  public static fromUint8Array(array: Uint8Array, options?: IDataViewOptions): StaticDataView {
    return new StaticDataView(0, array, options);
  }

  /**
   * Return number of bytes needed to serialize `length`.
   */
  private static sizeOfLength(length: number): number {
    return length <= 127 ? 1 : 5;
  }

  public pos: number;
  public buffer: Uint8Array;
  public readonly enableCompression: boolean;

  constructor(
    length: number,
    buffer?: Uint8Array,
    { enableCompression }: IDataViewOptions = { enableCompression: false },
  ) {
    if (LITTLE_ENDIAN === false) {
      // This check makes sure that we will not load the adblocker on a
      // big-endian system. This would not work since byte ordering is important
      // at the moment (mainly for performance reasons).
      throw new Error('Adblocker currently does not support Big-endian systems');
    }

    this.enableCompression = enableCompression;
    this.buffer = buffer !== undefined ? buffer : new Uint8Array(length);
    this.pos = 0;
  }

  public dataAvailable(): boolean {
    return this.pos < this.buffer.byteLength;
  }

  public setPos(pos: number): void {
    this.pos = pos;
  }

  public getPos(): number {
    return this.pos;
  }

  public seekZero(): void {
    this.pos = 0;
  }

  public slice(): Uint8Array {
    this.checkSize();
    return this.buffer.slice(0, this.pos);
  }

  /**
   * Make sure that `this.pos` is aligned on a multiple of 4.
   */
  public align4(): void {
    // From: https://stackoverflow.com/a/2022194
    this.pos = (this.pos + 3) & ~0x03;
  }

  public set(buffer: Uint8Array): void {
    this.buffer = new Uint8Array(buffer);
    this.seekZero();
  }

  public pushBool(bool: boolean): void {
    this.pushByte(Number(bool));
  }

  public getBool(): boolean {
    return Boolean(this.getByte());
  }

  public setByte(pos: number, byte: number): void {
    this.buffer[pos] = byte;
  }

  public pushByte(octet: number): void {
    this.pushUint8(octet);
  }

  public getByte(): number {
    return this.getUint8();
  }

  public pushBytes(bytes: Uint8Array, align: boolean = false): void {
    this.pushLength(bytes.length);

    if (align === true) {
      this.align4();
    }

    this.buffer.set(bytes, this.pos);
    this.pos += bytes.byteLength;
  }

  public getBytes(align: boolean = false): Uint8Array {
    const numberOfBytes = this.getLength();

    if (align === true) {
      this.align4();
    }

    const bytes = this.buffer.subarray(this.pos, this.pos + numberOfBytes);
    this.pos += numberOfBytes;
    return bytes;
  }

  /**
   * Allows row access to the internal buffer through a Uint32Array acting like
   * a view. This is used for super fast writing/reading of large chunks of
   * Uint32 numbers in the byte array.
   */
  public getUint32ArrayView(desiredSize: number): Uint32Array {
    // Round this.pos to next multiple of 4 for alignement
    this.align4();

    // TODO - fix alignement issue with `this.buffer.byteOffset`
    // Short-cut when empty array
    if (desiredSize === 0) {
      return EMPTY_UINT32_ARRAY;
    }

    // Create non-empty view
    const view = new Uint32Array(
      this.buffer.buffer,
      this.pos + this.buffer.byteOffset,
      desiredSize,
    );
    this.pos += desiredSize * 4;
    return view;
  }

  public pushUint8(uint8: number): void {
    this.buffer[this.pos++] = uint8;
  }

  public getUint8(): number {
    return this.buffer[this.pos++];
  }

  public pushUint16(uint16: number): void {
    this.buffer[this.pos++] = uint16 >>> 8;
    this.buffer[this.pos++] = uint16;
  }

  public getUint16(): number {
    return ((this.buffer[this.pos++] << 8) | this.buffer[this.pos++]) >>> 0;
  }

  public pushUint32(uint32: number): void {
    this.buffer[this.pos++] = uint32 >>> 24;
    this.buffer[this.pos++] = uint32 >>> 16;
    this.buffer[this.pos++] = uint32 >>> 8;
    this.buffer[this.pos++] = uint32;
  }

  public getUint32(): number {
    return (
      (((this.buffer[this.pos++] << 24) >>> 0) +
        ((this.buffer[this.pos++] << 16) |
          (this.buffer[this.pos++] << 8) |
          this.buffer[this.pos++])) >>>
      0
    );
  }

  public pushUint32Array(arr: Uint32Array): void {
    this.pushLength(arr.length);
    // TODO - use `set` to push the full buffer at once?
    for (let i = 0; i < arr.length; i += 1) {
      this.pushUint32(arr[i]);
    }
  }

  public getUint32Array(): Uint32Array {
    const length = this.getLength();
    const arr = new Uint32Array(length);
    // TODO - use `subarray`?
    for (let i = 0; i < length; i += 1) {
      arr[i] = this.getUint32();
    }
    return arr;
  }

  public pushUTF8(raw: string): void {
    const str = encode(raw);
    this.pushLength(str.length);

    for (let i = 0; i < str.length; i += 1) {
      this.buffer[this.pos++] = str.charCodeAt(i);
    }
  }

  public getUTF8(): string {
    const byteLength = this.getLength();
    this.pos += byteLength;
    return decode(
      String.fromCharCode.apply(
        null,
        // @ts-ignore
        this.buffer.subarray(this.pos - byteLength, this.pos),
      ),
    );
  }

  public pushASCII(str: string): void {
    this.pushLength(str.length);

    for (let i = 0; i < str.length; i += 1) {
      this.buffer[this.pos++] = str.charCodeAt(i);
    }
  }

  public getASCII(): string {
    const byteLength = this.getLength();
    this.pos += byteLength;

    // @ts-ignore
    return String.fromCharCode.apply(null, this.buffer.subarray(this.pos - byteLength, this.pos));
  }

  public pushNetworkRedirect(str: string): void {
    if (this.enableCompression === true) {
      this.pushBytes(compression.deflateNetworkRedirectString(str));
    } else {
      this.pushASCII(str);
    }
  }

  public getNetworkRedirect(): string {
    if (this.enableCompression === true) {
      return compression.inflateNetworkRedirectString(this.getBytes());
    }
    return this.getASCII();
  }

  public pushNetworkHostname(str: string): void {
    if (this.enableCompression === true) {
      this.pushBytes(compression.deflateNetworkHostnameString(str));
    } else {
      this.pushASCII(str);
    }
  }

  public getNetworkHostname(): string {
    if (this.enableCompression === true) {
      return compression.inflateNetworkHostnameString(this.getBytes());
    }
    return this.getASCII();
  }

  public pushNetworkCSP(str: string): void {
    if (this.enableCompression === true) {
      this.pushBytes(compression.deflateNetworkCSPString(str));
    } else {
      this.pushASCII(str);
    }
  }

  public getNetworkCSP(): string {
    if (this.enableCompression === true) {
      return compression.inflateNetworkCSPString(this.getBytes());
    }
    return this.getASCII();
  }

  public pushNetworkFilter(str: string): void {
    if (this.enableCompression === true) {
      this.pushBytes(compression.deflateNetworkFilterString(str));
    } else {
      this.pushASCII(str);
    }
  }

  public getNetworkFilter(): string {
    if (this.enableCompression === true) {
      return compression.inflateNetworkFilterString(this.getBytes());
    }
    return this.getASCII();
  }

  public pushCosmeticSelector(str: string): void {
    if (this.enableCompression === true) {
      this.pushBytes(compression.deflateCosmeticString(str));
    } else {
      this.pushASCII(str);
    }
  }

  public getCosmeticSelector(): string {
    if (this.enableCompression === true) {
      return compression.inflateCosmeticString(this.getBytes());
    }
    return this.getASCII();
  }

  private checkSize() {
    if (this.pos !== 0 && this.pos > this.buffer.byteLength) {
      throw new Error(
        `StaticDataView too small: ${this.buffer.byteLength}, but required ${this.pos} bytes`,
      );
    }
  }

  // Serialiez `length` with variable encoding to save space
  private pushLength(length: number): void {
    if (length <= 127) {
      this.pushUint8(length);
    } else {
      this.pushUint8(128);
      this.pushUint32(length);
    }
  }

  private getLength(): number {
    const lengthShort = this.getUint8();
    return lengthShort === 128 ? this.getUint32() : lengthShort;
  }
}
