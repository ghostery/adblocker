import { decode, encode } from './punycode';

export const EMPTY_UINT8_ARRAY = new Uint8Array(0);
export const EMPTY_UINT32_ARRAY = new Uint32Array(0);

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
  public static empty(): StaticDataView {
    return StaticDataView.fromUint8Array(EMPTY_UINT8_ARRAY);
  }

  public static fromUint32Array(array: Uint32Array): StaticDataView {
    return new StaticDataView(0, new Uint8Array(array.buffer));
  }

  public static fromUint8Array(array: Uint8Array): StaticDataView {
    return new StaticDataView(0, array);
  }

  public pos: number;
  public buffer: Uint8Array;

  constructor(length: number, buffer?: Uint8Array) {
    if (LITTLE_ENDIAN === false) {
      // This check makes sure that we will not load the adblocker on a
      // big-endian system. This would not work since byte ordering is important
      // at the moment (mainly for performance reasons).
      throw new Error('Adblocker currently does not support Big-endian systems');
    }

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
   * Make sure that `this.pos` is aligned on a multiple of `alignement`.
   */
  public align(alignement: number): void {
    this.pos =
      this.pos % alignement === 0
        ? this.pos
        : Math.floor(this.pos / alignement) * alignement + alignement;
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

  public pushBytes(bytes: Uint8Array): void {
    this.pushUint32(bytes.byteLength);
    this.buffer.set(bytes, this.pos);
    this.pos += bytes.byteLength;
  }

  public getBytes(): Uint8Array {
    const numberOfBytes = this.getUint32();
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
    this.align(4);

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
    const len: number = arr.length;
    const length = len <= 127 ? len : 1 << 7;
    this.pushUint8(length);
    if (len > 127) {
      this.pushUint16(len);
    }

    // TODO - use `set` to push the full buffer at once?
    for (let i = 0; i < arr.length; i += 1) {
      this.pushUint32(arr[i]);
    }
  }

  public getUint32Array(): Uint32Array {
    const len = this.getUint8();
    const length = len === 1 << 7 ? this.getUint16() : len;
    const arr = new Uint32Array(length);
    // TODO - use `subarray`?
    for (let i = 0; i < length; i += 1) {
      arr[i] = this.getUint32();
    }
    return arr;
  }

  public pushUTF8(raw: string): void {
    const str = encode(raw);
    this.pushUint16(str.length);

    for (let i = 0; i < str.length; i += 1) {
      this.buffer[this.pos++] = str.charCodeAt(i);
    }
  }

  public getUTF8(): string {
    const byteLength = this.getUint16();
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
    this.pushUint16(str.length);

    for (let i = 0; i < str.length; i += 1) {
      this.buffer[this.pos++] = str.charCodeAt(i);
    }
  }

  public getASCII(): string {
    const byteLength = this.getUint16();
    this.pos += byteLength;

    // @ts-ignore
    return String.fromCharCode.apply(null, this.buffer.subarray(this.pos - byteLength, this.pos));
  }

  private checkSize() {
    if (this.pos !== 0 && this.pos > this.buffer.byteLength) {
      throw new Error(
        `StaticDataView too small: ${this.buffer.byteLength}, but required ${this.pos - 1} bytes`,
      );
    }
  }
}
