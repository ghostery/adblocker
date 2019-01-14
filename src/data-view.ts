import * as punycode from 'punycode';
import { hasUnicode } from './utils';

/**
 * @class StaticDataView
 *
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
  protected buffer: Uint8Array;
  protected pos: number;

  constructor(length: number, buffer?: Uint8Array) {
    this.buffer = buffer !== undefined ? buffer : new Uint8Array(length);
    this.pos = 0;
  }

  public getPos(): number {
    return this.pos;
  }

  public seekZero(): void {
    this.pos = 0;
  }

  public crop(): Uint8Array {
    if (this.pos >= this.buffer.byteLength) {
      throw new Error(
        `StaticDataView too small: ${this.buffer.byteLength}, but required ${this.pos - 1} bytes`,
      );
    }
    return this.buffer.subarray(0, this.pos);
  }

  public set(buffer: Uint8Array): void {
    this.buffer = new Uint8Array(buffer);
    this.seekZero();
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

  public pushUint8(uint8: number): void {
    this.buffer[this.pos] = uint8;
    this.pos += 1;
  }

  public getUint8(): number {
    const uint8 = this.buffer[this.pos];
    this.pos += 1;
    return uint8;
  }

  public pushUint16(uint16: number): void {
    this.buffer[this.pos] = uint16 >>> 8;
    this.buffer[this.pos + 1] = uint16;
    this.pos += 2;
  }

  public getUint16(): number {
    const uint16 = ((this.buffer[this.pos] << 8) | this.buffer[this.pos + 1]) >>> 0;
    this.pos += 2;
    return uint16;
  }

  public pushUint32(uint32: number): void {
    this.buffer[this.pos] = uint32 >>> 24;
    this.buffer[this.pos + 1] = uint32 >>> 16;
    this.buffer[this.pos + 2] = uint32 >>> 8;
    this.buffer[this.pos + 3] = uint32;
    this.pos += 4;
  }

  public pushUint32Array(arr: Uint32Array | undefined): void {
    if (arr === undefined) {
      this.pushUint16(0);
    } else {
      this.pushUint16(arr.length);
      for (let i = 0; i < arr.length; i += 1) {
        this.pushUint32(arr[i]);
      }
    }
  }

  public getUint32Array(): Uint32Array | undefined {
    const length = this.getUint16();
    if (length === 0) {
      return undefined;
    }
    const arr = new Uint32Array(length);
    for (let i = 0; i < length; i += 1) {
      arr[i] = this.getUint32();
    }
    return arr;
  }

  public getUint32(): number {
    const uint32 =
      (((this.buffer[this.pos] << 24) >>> 0) +
        ((this.buffer[this.pos + 1] << 16) |
          (this.buffer[this.pos + 2] << 8) |
          this.buffer[this.pos + 3])) >>>
      0;
    this.pos += 4;
    return uint32;
  }

  public pushUTF8(str: string): void {
    this.pushUint16(str.length);
    if (hasUnicode(str)) {
      this.pushASCII(punycode.encode(str));
    } else {
      this.pushASCII(str);
    }
  }

  public getUTF8(): string {
    const length = this.getUint16();
    if (length === 0) {
      return '';
    }

    const str = this.getASCIIStrict();
    if (str.length === length) {
      return str;
    }
    return punycode.decode(str);
  }

  public pushASCIIStrict(str: string): void {
    this.pushUint16(str.length);
    for (let i = 0; i < str.length; i += 1) {
      this.buffer[this.pos + i] = str.charCodeAt(i);
    }
    this.pos += str.length;
  }

  public getASCIIStrict(): string {
    const byteLength = this.getUint16();
    this.pos += byteLength;

    // @ts-ignore
    return String.fromCharCode.apply(null, this.buffer.subarray(this.pos - byteLength, this.pos));
  }

  public pushASCII(str: string | undefined): void {
    if (str === undefined) {
      this.pushUint16(0);
    } else {
      this.pushASCIIStrict(str);
    }
  }

  public getASCII(): string | undefined {
    const byteLength = this.getUint16();

    if (byteLength === 0) {
      return undefined;
    }

    this.pos += byteLength;

    // @ts-ignore
    return String.fromCharCode.apply(null, this.buffer.subarray(this.pos - byteLength, this.pos));
  }
}
