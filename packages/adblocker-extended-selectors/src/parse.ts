/*!
 * Based on parsel. Extended by Rémi Berson for Ghostery (2021).
 * https://github.com/LeaVerou/parsel
 *
 * MIT License
 *
 * Copyright (c) 2020 Lea Verou
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { isAST, isAtoms } from './types';
import type {
  AST,
  Atoms,
  AtomsOrStrings,
  Attribute,
  Class,
  Combinator,
  Comma,
  Id,
  ParserOptions,
  PseudoClass,
  PseudoElement,
  Strings,
  TokenType,
  Type,
} from './types';

export const RECURSIVE_PSEUDO_CLASSES = new Set([
  'any',
  'dir',
  'has',
  'host-context',
  'if',
  'if-not',
  'is',
  'matches',
  'not',
  'where',
]);

const TOKENS: { [T in TokenType]: RegExp } = {
  attribute: /\[\s*(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(?<caseSensitive>[iIsS])?\s*)?\]/gu,
  id: /#(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
  class: /\.(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
  comma: /\s*,\s*/g, // must be before combinator
  combinator: /\s*[\s>+~]\s*/g, // this must be after attribute
  'pseudo-element': /::(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?:¶*)\))?/gu, // this must be before pseudo-class
  'pseudo-class': /:(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?<argument>¶*)\))?/gu,
  type: /(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)|\*/gu, // this must be last
};

const TOKENS_WITH_PARENS: Set<TokenType> = new Set(['pseudo-class', 'pseudo-element']);
const TOKENS_WITH_STRINGS: Set<TokenType> = new Set([...TOKENS_WITH_PARENS, 'attribute']);
const TRIM_TOKENS: Set<TokenType> = new Set(['combinator', 'comma']);

const TOKENS_FOR_RESTORE: { [T in TokenType]: RegExp } = Object.assign({}, TOKENS);
TOKENS_FOR_RESTORE['pseudo-element'] = RegExp(
  TOKENS['pseudo-element'].source.replace('(?<argument>¶*)', '(?<argument>.*?)'),
  'gu',
);
TOKENS_FOR_RESTORE['pseudo-class'] = RegExp(
  TOKENS['pseudo-class'].source.replace('(?<argument>¶*)', '(?<argument>.*)'),
  'gu',
);

// TODO - it feels like with some more typing shenanigans we could replace groups validation by generic logic in this function.
function splitOnMatch(
  pattern: RegExp,
  str: string,
): [string, [string, { [name: string]: string }], string] | undefined {
  pattern.lastIndex = 0;
  const match = pattern.exec(str);

  if (match === null) {
    return undefined;
  }

  const from = match.index - 1;
  const content = match[0];
  const before = str.slice(0, from + 1);
  const after = str.slice(from + content.length + 1);

  return [before, [content, match.groups || {}], after];
}

const GRAMMAR = [
  // attribute
  (str: string): [string, Attribute, string] | undefined => {
    const match = splitOnMatch(TOKENS.attribute, str);
    if (match === undefined) {
      return undefined;
    }

    const [before, [content, { name, operator, value, namespace, caseSensitive }], after] = match;
    if (name === undefined) {
      return undefined;
    }

    return [
      before,
      {
        type: 'attribute',
        content,
        length: content.length,
        namespace,
        caseSensitive,
        pos: [],
        name,
        operator,
        value,
      },
      after,
    ];
  },

  // #id
  (str: string): [string, Id, string] | undefined => {
    const match = splitOnMatch(TOKENS.id, str);
    if (match === undefined) {
      return undefined;
    }

    const [before, [content, { name }], after] = match;
    if (name === undefined) {
      return undefined;
    }

    return [
      before,
      {
        type: 'id',
        content,
        length: content.length,
        pos: [],
        name,
      },
      after,
    ];
  },

  // .class
  (str: string): [string, Class, string] | undefined => {
    const match = splitOnMatch(TOKENS.class, str);
    if (match === undefined) {
      return undefined;
    }

    const [before, [content, { name }], after] = match;
    if (name === undefined) {
      return undefined;
    }

    return [
      before,
      {
        type: 'class',
        content,
        length: content.length,
        pos: [],
        name,
      },
      after,
    ];
  },

  // comma ,
  (str: string): [string, Comma, string] | undefined => {
    const match = splitOnMatch(TOKENS.comma, str);
    if (match === undefined) {
      return undefined;
    }

    const [before, [content], after] = match;

    return [
      before,
      {
        type: 'comma',
        content,
        length: content.length,
        pos: [],
      },
      after,
    ];
  },

  // combinator
  (str: string): [string, Combinator, string] | undefined => {
    const match = splitOnMatch(TOKENS.combinator, str);
    if (match === undefined) {
      return undefined;
    }

    const [before, [content], after] = match;

    return [
      before,
      {
        type: 'combinator',
        content,
        length: content.length,
        pos: [],
      },
      after,
    ];
  },

  // pseudo-element
  (str: string): [string, PseudoElement, string] | undefined => {
    const match = splitOnMatch(TOKENS['pseudo-element'], str);
    if (match === undefined) {
      return undefined;
    }

    const [before, [content, { name }], after] = match;

    if (name === undefined) {
      return undefined;
    }

    return [
      before,
      {
        type: 'pseudo-element',
        content,
        length: content.length,
        pos: [],
        name,
      },
      after,
    ];
  },

  // pseudo-class
  (str: string): [string, PseudoClass, string] | undefined => {
    const match = splitOnMatch(TOKENS['pseudo-class'], str);
    if (match === undefined) {
      return undefined;
    }

    // TODO - here `argument` can be undefined and should be rejected?
    const [before, [content, { name, argument }], after] = match;

    if (name === undefined) {
      return undefined;
    }

    return [
      before,
      {
        type: 'pseudo-class',
        content,
        length: content.length,
        pos: [],
        name,
        argument,
        subtree: undefined,
      },
      after,
    ];
  },

  // type
  (str: string): [string, Type, string] | undefined => {
    const match = splitOnMatch(TOKENS.type, str);
    if (match === undefined) {
      return undefined;
    }

    const [before, [content, { name, namespace }], after] = match;

    return [
      before,
      {
        type: 'type',
        content,
        length: content.length,
        namespace,
        pos: [],
        name,
      },
      after,
    ];
  },
];

function tokenizeBy(text: string): Atoms {
  if (!text) {
    return [];
  }

  const strarr: AtomsOrStrings = [text];
  for (const tokenizer of GRAMMAR) {
    for (let i = 0; i < strarr.length; i++) {
      const str = strarr[i];
      if (typeof str === 'string') {
        const match = tokenizer(str);
        if (match !== undefined) {
          strarr.splice(i, 1, ...(match as AtomsOrStrings).filter((a) => a.length !== 0));
        }
      }
    }
  }

  let offset = 0;
  for (const token of strarr) {
    if (typeof token !== 'string') {
      token.pos = [offset, offset + token.length];
      if (TRIM_TOKENS.has(token.type)) {
        token.content = token.content.trim() || ' ';
      }
    }

    offset += token.length;
  }

  if (isAtoms(strarr)) {
    return strarr;
  }

  // NOTE: here this means that parsing failed.
  return [];
}

function restoreNested(tokens: Atoms, strings: Strings, regex: RegExp, types: Set<TokenType>) {
  // TODO - here from offsets in strings and tokens we should be able to find the exact spot without RegExp?
  for (const str of strings) {
    for (const token of tokens) {
      if (types.has(token.type) && token.pos[0] < str.start && str.start < token.pos[1]) {
        const content = token.content;
        token.content = token.content.replace(regex, str.str);

        if (token.content !== content) {
          // actually changed?
          // Re-evaluate groups
          TOKENS_FOR_RESTORE[token.type].lastIndex = 0;
          const match = TOKENS_FOR_RESTORE[token.type].exec(token.content);
          if (match !== null) {
            Object.assign(token, match.groups);
          }
        }
      }
    }
  }
}

export function isEscaped(str: string, index: number): boolean {
  let backslashes = 0;

  index -= 1;
  while (index >= 0 && str[index] === '\\') {
    backslashes += 1;
    index -= 1;
  }

  return backslashes % 2 !== 0;
}

export function gobbleQuotes(text: string, quote: '"' | "'", start: number): string | undefined {
  // Find end of quote, taking care of ignoring escaped quotes
  let end = start + 1;

  /* tslint:disable no-conditional-assignment */
  while ((end = text.indexOf(quote, end)) !== -1 && isEscaped(text, end) === true) {
    end += 1;
  }

  if (end === -1) {
    // Opening quote without closing quote
    return undefined;
  }

  return text.slice(start, end + 1);
}

export function gobbleParens(text: string, start: number): string | undefined {
  let stack = 0;

  for (let i = start; i < text.length; i++) {
    const char = text[i];

    if (char === '(') {
      stack += 1;
    } else if (char === ')') {
      if (stack > 0) {
        stack -= 1;
      } else {
        // Closing paren without opening paren
        return undefined;
      }
    }

    if (stack === 0) {
      return text.slice(start, i + 1);
    }
  }

  // Opening paren without closing paren
  return undefined;
}

export function replace(
  selector: string,
  replacement: '¶' | '§',
  opening: '(' | '"' | "'",
  gobble: (text: string, start: number) => string | undefined,
): [Strings, string] {
  const strings: Strings = [];

  let offset = 0;
  /* tslint:disable no-conditional-assignment */
  while ((offset = selector.indexOf(opening, offset)) !== -1) {
    const str = gobble(selector, offset);
    if (str === undefined) {
      break;
    }

    strings.push({ str, start: offset });
    selector = `${selector.slice(0, offset + 1)}${replacement.repeat(
      str.length - 2,
    )}${selector.slice(offset + str.length - 1)}`;
    offset += str.length;
  }

  return [strings, selector];
}

export function tokenize(selector: string): Atoms {
  if (typeof selector !== 'string') {
    return [];
  }

  // Prevent leading/trailing whitespace be interpreted as combinators
  selector = selector.trim();

  if (selector.length === 0) {
    return [];
  }

  // Replace strings with whitespace strings (to preserve offsets)
  const [doubleQuotes, selectorWithoutDoubleQuotes] = replace(
    selector,
    '§',
    '"',
    (text: string, start: number) => gobbleQuotes(text, '"', start),
  );

  const [singleQuotes, selectorWithoutQuotes] = replace(
    selectorWithoutDoubleQuotes,
    '§',
    "'",
    (text: string, start: number) => gobbleQuotes(text, "'", start),
  );

  // Now that strings are out of the way, extract parens and replace them with parens with whitespace (to preserve offsets)
  const [parens, selectorWithoutParens] = replace(selectorWithoutQuotes, '¶', '(', gobbleParens);

  // Now we have no nested structures and we can parse with regexes
  const tokens = tokenizeBy(selectorWithoutParens);

  // Now restore parens and strings in reverse order
  restoreNested(tokens, parens, /\(¶*\)/, TOKENS_WITH_PARENS);
  restoreNested(tokens, doubleQuotes, /"§*"/, TOKENS_WITH_STRINGS);
  restoreNested(tokens, singleQuotes, /'§*'/, TOKENS_WITH_STRINGS);

  return tokens;
}

// Convert a flat list of tokens into a tree of complex & compound selectors
function nestTokens(
  tokens: Atoms,
  { list = true }: Pick<ParserOptions, 'list'> = {},
): AST | undefined {
  if (list === true && tokens.some((t) => t.type === 'comma')) {
    const selectors: AST[] = [];
    const temp: Atoms = [];

    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (token.type === 'comma') {
        if (temp.length === 0) {
          throw new Error('Incorrect comma at ' + i);
        }

        const sub = nestTokens(temp, { list: false });
        if (sub !== undefined) {
          selectors.push(sub);
        }
        temp.length = 0;
      } else {
        temp.push(token);
      }
    }

    if (temp.length === 0) {
      throw new Error('Trailing comma');
    } else {
      const sub = nestTokens(temp, { list: false });
      if (sub !== undefined) {
        selectors.push(sub);
      }
    }

    return { type: 'list', list: selectors };
  }

  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];

    if (token.type === 'combinator') {
      const left = nestTokens(tokens.slice(0, i));
      const right = nestTokens(tokens.slice(i + 1));
      if (right === undefined) {
        return undefined;
      }

      if (
        token.content !== ' ' &&
        token.content !== '~' &&
        token.content !== '+' &&
        token.content !== '>'
      ) {
        return undefined;
      }

      return {
        type: 'complex',
        combinator: token.content,
        left,
        right,
      };
    }
  }

  if (tokens.length === 0) {
    return undefined;
  }

  if (isAST(tokens)) {
    if (tokens.length === 1) {
      return tokens[0];
    }

    // If we're here, there are no combinators, so it's just a list
    return {
      type: 'compound',
      compound: [...tokens], // clone to avoid pointers messing up the AST
    };
  }

  return undefined;
}

// Traverse an AST (or part thereof), in depth-first order
function walk(
  node: AST | undefined,
  callback: (node: AST, parentNode?: AST) => void,
  o?: AST,
  parent?: AST,
): void {
  if (node === undefined) {
    return;
  }

  if (node.type === 'complex') {
    walk(node.left, callback, o, node);
    walk(node.right, callback, o, node);
  } else if (node.type === 'compound') {
    for (const n of node.compound) {
      walk(n, callback, o, node);
    }
  } else if (
    node.type === 'pseudo-class' &&
    node.subtree !== undefined &&
    o !== undefined &&
    o.type === 'pseudo-class' &&
    o.subtree !== undefined
  ) {
    walk(node.subtree, callback, o, node);
  }

  callback(node, parent);
}

/**
 * Parse a CSS selector
 * @param selector {String} The selector to parse
 * @param options.recursive {Boolean} Whether to parse the arguments of pseudo-classes like :is(), :has() etc. Defaults to true.
 * @param options.list {Boolean} Whether this can be a selector list (A, B, C etc). Defaults to true.
 */
export function parse(
  selector: string,
  { recursive = true, list = true }: ParserOptions = {},
): AST | undefined {
  const tokens = tokenize(selector);

  if (tokens.length === 0) {
    return undefined;
  }

  const ast = nestTokens(tokens, { list });

  if (recursive === true) {
    walk(ast, (node) => {
      if (
        node.type === 'pseudo-class' &&
        node.argument &&
        node.name !== undefined &&
        RECURSIVE_PSEUDO_CLASSES.has(node.name)
      ) {
        node.subtree = parse(node.argument, { recursive: true, list: true });
      }
    });
  }

  return ast;
}
