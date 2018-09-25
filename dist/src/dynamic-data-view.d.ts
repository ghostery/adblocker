export default class DynamicDataView {
    private buffer;
    private pos;
    constructor(length: number);
    seek(pos?: number): void;
    crop(): Uint8Array;
    set(buffer: Uint8Array): void;
    pushBytes(bytes: Uint8Array): void;
    pushByte(octet: number): void;
    pushUint8(uint8: number): void;
    pushUint16(uint16: number): void;
    pushUint32(uint32: number): void;
    pushUTF8(str: string): void;
    pushStr(str: string): void;
    getBytes(n: number): Uint8Array;
    getByte(): number;
    getUint8(): number;
    getUint16(): number;
    getUint32(): number;
    getUTF8(): string;
    getStr(): string;
    private checkShouldResize;
    private resize;
}
