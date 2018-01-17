function fromString(str: string): Uint8Array {
  const res = new Uint8Array(str.length);
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    res[i] = str.charCodeAt(i);
  }
  return res;
}

declare function escape(s: string): string;
declare function unescape(s: string): string;

// http://ecmanaut.blogspot.de/2006/07/encoding-decoding-utf8-in-javascript.html
export function encode(s: string): Uint8Array {
  return fromString(unescape(encodeURIComponent(s)));
}

export function decode(bytes: Uint8Array): string {
  return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
}
