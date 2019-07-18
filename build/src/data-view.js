/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import * as compression from './compression';
import crc32 from './crc32';
import { decode, encode } from './punycode';
export var EMPTY_UINT8_ARRAY = new Uint8Array(0);
export var EMPTY_UINT32_ARRAY = new Uint32Array(0);
// Check if current architecture is little endian
var LITTLE_ENDIAN = new Int8Array(new Int16Array([1]).buffer)[0] === 1;
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
var StaticDataView = /** @class */ (function () {
    function StaticDataView(buffer, _a) {
        var enableCompression = _a.enableCompression;
        if (LITTLE_ENDIAN === false) {
            // This check makes sure that we will not load the adblocker on a
            // big-endian system. This would not work since byte ordering is important
            // at the moment (mainly for performance reasons).
            throw new Error('Adblocker currently does not support Big-endian systems');
        }
        this.enableCompression = enableCompression;
        this.buffer = buffer;
        this.pos = 0;
    }
    /**
     * Return number of bytes needed to serialize `str` ASCII string.
     */
    StaticDataView.sizeOfASCII = function (str) {
        return StaticDataView.sizeOfLength(str.length) + str.length;
    };
    /**
     * Return number of bytes needed to serialize `str` UTF8 string.
     */
    StaticDataView.sizeOfUTF8 = function (str) {
        var encoded = encode(str);
        return StaticDataView.sizeOfLength(encoded.length) + encoded.length;
    };
    /**
     * Return number of bytes needed to serialize `array`.
     */
    StaticDataView.sizeOfUint32Array = function (array) {
        return array.byteLength + StaticDataView.sizeOfLength(array.length);
    };
    /**
     * Create an empty (i.e.: size = 0) StaticDataView.
     */
    StaticDataView.empty = function (options) {
        return StaticDataView.fromUint8Array(EMPTY_UINT8_ARRAY, options);
    };
    /**
     * Instantiate a StaticDataView instance from `array` of type Uint8Array.
     */
    StaticDataView.fromUint8Array = function (array, options) {
        return new StaticDataView(array, options);
    };
    /**
     * Instantiate a StaticDataView with given `capacity` number of bytes.
     */
    StaticDataView.allocate = function (capacity, options) {
        return new StaticDataView(new Uint8Array(capacity), options);
    };
    /**
     * Return number of bytes needed to serialize `length`.
     */
    StaticDataView.sizeOfLength = function (length) {
        return length <= 127 ? 1 : 5;
    };
    StaticDataView.prototype.checksum = function () {
        return crc32(this.buffer, 0, this.pos);
    };
    StaticDataView.prototype.dataAvailable = function () {
        return this.pos < this.buffer.byteLength;
    };
    StaticDataView.prototype.setPos = function (pos) {
        this.pos = pos;
    };
    StaticDataView.prototype.getPos = function () {
        return this.pos;
    };
    StaticDataView.prototype.seekZero = function () {
        this.pos = 0;
    };
    StaticDataView.prototype.slice = function () {
        this.checkSize();
        return this.buffer.slice(0, this.pos);
    };
    /**
     * Make sure that `this.pos` is aligned on a multiple of 4.
     */
    StaticDataView.prototype.align4 = function () {
        // From: https://stackoverflow.com/a/2022194
        this.pos = (this.pos + 3) & ~0x03;
    };
    StaticDataView.prototype.set = function (buffer) {
        this.buffer = new Uint8Array(buffer);
        this.seekZero();
    };
    StaticDataView.prototype.pushBool = function (bool) {
        this.pushByte(Number(bool));
    };
    StaticDataView.prototype.getBool = function () {
        return Boolean(this.getByte());
    };
    StaticDataView.prototype.setByte = function (pos, byte) {
        this.buffer[pos] = byte;
    };
    StaticDataView.prototype.pushByte = function (octet) {
        this.pushUint8(octet);
    };
    StaticDataView.prototype.getByte = function () {
        return this.getUint8();
    };
    StaticDataView.prototype.pushBytes = function (bytes, align) {
        if (align === void 0) { align = false; }
        this.pushLength(bytes.length);
        if (align === true) {
            this.align4();
        }
        this.buffer.set(bytes, this.pos);
        this.pos += bytes.byteLength;
    };
    StaticDataView.prototype.getBytes = function (align) {
        if (align === void 0) { align = false; }
        var numberOfBytes = this.getLength();
        if (align === true) {
            this.align4();
        }
        // TODO - using `subarray` here causes issue during updates. It is not
        // clear why that happens but it would be nice to investigate so that we
        // can continue to not copy any data while deserializing.
        //
        // const bytes = this.buffer.subarray(this.pos, this.pos + numberOfBytes);
        var bytes = this.buffer.slice(this.pos, this.pos + numberOfBytes);
        this.pos += numberOfBytes;
        return bytes;
    };
    /**
     * Allows row access to the internal buffer through a Uint32Array acting like
     * a view. This is used for super fast writing/reading of large chunks of
     * Uint32 numbers in the byte array.
     */
    StaticDataView.prototype.getUint32ArrayView = function (desiredSize) {
        // Round this.pos to next multiple of 4 for alignement
        this.align4();
        // Short-cut when empty array
        if (desiredSize === 0) {
            return EMPTY_UINT32_ARRAY;
        }
        // Create non-empty view
        var view = new Uint32Array(this.buffer.buffer, this.pos + this.buffer.byteOffset, desiredSize);
        this.pos += desiredSize * 4;
        return view;
    };
    StaticDataView.prototype.pushUint8 = function (uint8) {
        this.buffer[this.pos++] = uint8;
    };
    StaticDataView.prototype.getUint8 = function () {
        return this.buffer[this.pos++];
    };
    StaticDataView.prototype.pushUint16 = function (uint16) {
        this.buffer[this.pos++] = uint16 >>> 8;
        this.buffer[this.pos++] = uint16;
    };
    StaticDataView.prototype.getUint16 = function () {
        return ((this.buffer[this.pos++] << 8) | this.buffer[this.pos++]) >>> 0;
    };
    StaticDataView.prototype.pushUint32 = function (uint32) {
        this.buffer[this.pos++] = uint32 >>> 24;
        this.buffer[this.pos++] = uint32 >>> 16;
        this.buffer[this.pos++] = uint32 >>> 8;
        this.buffer[this.pos++] = uint32;
    };
    StaticDataView.prototype.getUint32 = function () {
        return ((((this.buffer[this.pos++] << 24) >>> 0) +
            ((this.buffer[this.pos++] << 16) |
                (this.buffer[this.pos++] << 8) |
                this.buffer[this.pos++])) >>>
            0);
    };
    StaticDataView.prototype.pushUint32Array = function (arr) {
        this.pushLength(arr.length);
        // TODO - use `set` to push the full buffer at once?
        for (var i = 0; i < arr.length; i += 1) {
            this.pushUint32(arr[i]);
        }
    };
    StaticDataView.prototype.getUint32Array = function () {
        var length = this.getLength();
        var arr = new Uint32Array(length);
        // TODO - use `subarray`?
        for (var i = 0; i < length; i += 1) {
            arr[i] = this.getUint32();
        }
        return arr;
    };
    StaticDataView.prototype.pushUTF8 = function (raw) {
        var str = encode(raw);
        this.pushLength(str.length);
        for (var i = 0; i < str.length; i += 1) {
            this.buffer[this.pos++] = str.charCodeAt(i);
        }
    };
    StaticDataView.prototype.getUTF8 = function () {
        var byteLength = this.getLength();
        this.pos += byteLength;
        return decode(String.fromCharCode.apply(null, 
        // @ts-ignore
        this.buffer.subarray(this.pos - byteLength, this.pos)));
    };
    StaticDataView.prototype.pushASCII = function (str) {
        this.pushLength(str.length);
        for (var i = 0; i < str.length; i += 1) {
            this.buffer[this.pos++] = str.charCodeAt(i);
        }
    };
    StaticDataView.prototype.getASCII = function () {
        var byteLength = this.getLength();
        this.pos += byteLength;
        // @ts-ignore
        return String.fromCharCode.apply(null, this.buffer.subarray(this.pos - byteLength, this.pos));
    };
    StaticDataView.prototype.pushNetworkRedirect = function (str) {
        if (this.enableCompression === true) {
            this.pushBytes(compression.deflateNetworkRedirectString(str));
        }
        else {
            this.pushASCII(str);
        }
    };
    StaticDataView.prototype.getNetworkRedirect = function () {
        if (this.enableCompression === true) {
            return compression.inflateNetworkRedirectString(this.getBytes());
        }
        return this.getASCII();
    };
    StaticDataView.prototype.pushNetworkHostname = function (str) {
        if (this.enableCompression === true) {
            this.pushBytes(compression.deflateNetworkHostnameString(str));
        }
        else {
            this.pushASCII(str);
        }
    };
    StaticDataView.prototype.getNetworkHostname = function () {
        if (this.enableCompression === true) {
            return compression.inflateNetworkHostnameString(this.getBytes());
        }
        return this.getASCII();
    };
    StaticDataView.prototype.pushNetworkCSP = function (str) {
        if (this.enableCompression === true) {
            this.pushBytes(compression.deflateNetworkCSPString(str));
        }
        else {
            this.pushASCII(str);
        }
    };
    StaticDataView.prototype.getNetworkCSP = function () {
        if (this.enableCompression === true) {
            return compression.inflateNetworkCSPString(this.getBytes());
        }
        return this.getASCII();
    };
    StaticDataView.prototype.pushNetworkFilter = function (str) {
        if (this.enableCompression === true) {
            this.pushBytes(compression.deflateNetworkFilterString(str));
        }
        else {
            this.pushASCII(str);
        }
    };
    StaticDataView.prototype.getNetworkFilter = function () {
        if (this.enableCompression === true) {
            return compression.inflateNetworkFilterString(this.getBytes());
        }
        return this.getASCII();
    };
    StaticDataView.prototype.pushCosmeticSelector = function (str) {
        if (this.enableCompression === true) {
            this.pushBytes(compression.deflateCosmeticString(str));
        }
        else {
            this.pushASCII(str);
        }
    };
    StaticDataView.prototype.getCosmeticSelector = function () {
        if (this.enableCompression === true) {
            return compression.inflateCosmeticString(this.getBytes());
        }
        return this.getASCII();
    };
    StaticDataView.prototype.checkSize = function () {
        if (this.pos !== 0 && this.pos > this.buffer.byteLength) {
            throw new Error("StaticDataView too small: " + this.buffer.byteLength + ", but required " + this.pos + " bytes");
        }
    };
    // Serialiez `length` with variable encoding to save space
    StaticDataView.prototype.pushLength = function (length) {
        if (length <= 127) {
            this.pushUint8(length);
        }
        else {
            this.pushUint8(128);
            this.pushUint32(length);
        }
    };
    StaticDataView.prototype.getLength = function () {
        var lengthShort = this.getUint8();
        return lengthShort === 128 ? this.getUint32() : lengthShort;
    };
    return StaticDataView;
}());
export default StaticDataView;
