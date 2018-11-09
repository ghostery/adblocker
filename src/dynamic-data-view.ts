import { decode, encode } from './encoding';

/**
 * @class DynamicDataView
 *
 * This abstraction allows to serialize efficiently low-level values of types:
 * String, uint8, uint16, uint32 while hiding the complexity of managing the
 * current offset and growing. If initialized with a big enough `length`, it
 * might also not require any resize (thus enabling serializationg with a single
 * memory allocation).
 *
 * This class is also more efficient than the built-in `DataView`.
 *
 * The way this is used in practice is that you write pairs of function to
 * serialize (respectively) deserialize a given structure/class (with code being
 * pretty symetrical). In the serializer you `pushX` values, and in the
 * deserializer you use `getX` functions to get back the values.
 */
export default class DynamicDataView {
  private buffer: Uint8Array;
  private pos: number;

  constructor(length: number) {
    this.buffer = new Uint8Array(length);
    this.pos = 0;
  }

  public seek(pos: number = 0): void {
    this.pos = pos;
  }

  public crop(): Uint8Array {
    return this.buffer.subarray(0, this.pos);
  }

  public set(buffer: Uint8Array): void {
    this.buffer = new Uint8Array(buffer);
    this.seek(0);
  }

  public pushBytes(bytes: Uint8Array): void {
    this.checkShouldResize(bytes.byteLength);
    this.buffer.set(bytes, this.pos);
    this.pos += bytes.byteLength;
  }

  public pushByte(octet: number): void {
    this.pushUint8(octet);
  }

  public pushUint8(uint8: number): void {
    this.checkShouldResize(1);
    this.buffer[this.pos] = uint8;
    this.pos += 1;
  }

  public pushUint16(uint16: number): void {
    this.checkShouldResize(2);
    this.buffer[this.pos] = uint16 >>> 8;
    this.buffer[this.pos + 1] = uint16;
    this.pos += 2;
  }

  public pushUint32(uint32: number): void {
    this.checkShouldResize(4);
    this.buffer[this.pos] = uint32 >>> 24;
    this.buffer[this.pos + 1] = uint32 >>> 16;
    this.buffer[this.pos + 2] = uint32 >>> 8;
    this.buffer[this.pos + 3] = uint32;
    this.pos += 4;
  }

  public pushUTF8(str: string): void {
    const buffer = encode(str);
    this.pushUint16(buffer.byteLength);
    this.pushBytes(buffer);
  }

  /**
   * This method is very optimistic and will assume that by default every string
   * is ascii only, but fallback to a slower utf-8 method if a non-ascii char is
   * encountered in the process of pushing the string.
   *
   * WARNING: Currently only strings of size <= 65k can be stored.
   */
  public pushStr(str: string | undefined): void {
    if (str === undefined) {
      // Special handling for empty strings
      this.checkShouldResize(2);
      this.pushUint16(0);
    } else {
      // Keep track of original position to be able to fallback
      // to pushUTF8 if we encounter non-ascii characters.
      const originalPos = this.pos;
      let foundUnicode = false;

      this.checkShouldResize(2 + str.length);
      this.pushUint16(str.length);

      const offset = this.pos;
      const buffer = this.buffer;
      for (let i = 0; i < str.length && !foundUnicode; i += 1) {
        const ch = str.charCodeAt(i);
        buffer[offset + i] = ch;
        foundUnicode = foundUnicode || ch > 127;
      }

      if (foundUnicode) {
        // Fallback to a slower utf-8 text encoder
        this.pos = originalPos;
        this.pushUTF8(str);
      } else {
        this.pos += str.length;
      }
    }
  }

  // Read next value

  public getBytes(n: number): Uint8Array {
    const bytes = this.buffer.subarray(this.pos, this.pos + n);
    this.pos += n;
    return bytes;
  }

  public getByte(): number {
    return this.getUint8();
  }

  public getUint8(): number {
    const uint8 = this.buffer[this.pos];
    this.pos += 1;
    return uint8;
  }

  public getUint16(): number {
    const uint16 = ((this.buffer[this.pos] << 8) | this.buffer[this.pos + 1]) >>> 0;
    this.pos += 2;
    return uint16;
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

  public getUTF8(): string {
    return decode(this.getBytes(this.getUint16()));
  }

  public getStr(): string {
    // Keep track of original position to be able to fallback
    // to getUTF8 if we encounter non-ascii characters.
    const originalPos = this.pos;
    const size = this.getUint16();

    // Special handling for empty strings
    if (size === 0) {
      return '';
    }

    // Check if there is a non-ascii character in the string.
    let i = 0;
    for (; i < size && this.buffer[this.pos + i] <= 127; i += 1) {
      /* empty */
    }

    if (i < size) {
      this.pos = originalPos;
      return this.getUTF8();
    }

    return String.fromCharCode.apply(null, this.getBytes(size));
  }

  private checkShouldResize(n: number): void {
    if (this.pos + n >= this.buffer.byteLength) {
      this.resize(n);
    }
  }

  private resize(n: number = 0): void {
    const newBuffer = new Uint8Array(Math.floor((this.pos + n) * 1.5));
    newBuffer.set(this.buffer);
    this.buffer = newBuffer;
  }
}
