import { StaticDataView, sizeOfUTF8 } from './data-view.js';

export type EnvKeys =
  | 'ext_ghostery'
  | 'ext_abp'
  | 'ext_ublock'
  | 'ext_ubol'
  | 'ext_devbuild'
  | 'env_chromium'
  | 'env_edge'
  | 'env_firefox'
  | 'env_mobile'
  | 'env_safari'
  | 'env_mv3'
  | 'false'
  | 'cap_html_filtering'
  | 'cap_user_stylesheet'
  | 'adguard'
  | 'adguard_app_android'
  | 'adguard_app_ios'
  | 'adguard_app_mac'
  | 'adguard_app_windows'
  | 'adguard_ext_android_cb'
  | 'adguard_ext_chromium'
  | 'adguard_ext_edge'
  | 'adguard_ext_firefox'
  | 'adguard_ext_opera'
  | 'adguard_ext_safari'
  | (string & {});

export class Env extends Map<EnvKeys, boolean> {}

export const enum PreprocessorTokens {
  INVALID = 0,
  BEGIF = 1,
  ELSE = 2,
  ENDIF = 3,
}

type FilterId = number;

export function detectPreprocessor(line: string) {
  // Minimum size of a valid condition should be 6 for something like: "!#if x" or "!#else"
  if (
    line.length < 6 ||
    line.charCodeAt(0) !== 33 /* '!' */ ||
    line.charCodeAt(1) !== 35 /* '#' */
  ) {
    return PreprocessorTokens.INVALID;
  }

  if (line.startsWith('!#if ')) {
    return PreprocessorTokens.BEGIF;
  }

  if (line.startsWith('!#else')) {
    return PreprocessorTokens.ELSE;
  }

  if (line.startsWith('!#endif')) {
    return PreprocessorTokens.ENDIF;
  }

  return PreprocessorTokens.INVALID;
}

const tokenizerPattern = /(!|&&|\|\||\(|\)|[a-zA-Z0-9_]+)/g;
const identifierPattern = /^[a-zA-Z0-9_]+$/;

const tokenize = (expression: string) => expression.match(tokenizerPattern);
const isIdentifier = (expression: string) => identifierPattern.test(expression);

const precedence: Record<string, number> = {
  '!': 2,
  '&&': 1,
  '||': 0,
};

const isOperator = (token: string) => Object.prototype.hasOwnProperty.call(precedence, token);

const testIdentifier = (identifier: string, env: Env): boolean => {
  if (identifier === 'true' && !env.has('true')) {
    return true;
  }

  if (identifier === 'false' && !env.has('false')) {
    return false;
  }

  return !!env.get(identifier);
};

/// The parsing is done using the [Shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm).
/// This function takes as input a string expression and an environment Map.
/// The expression is made of constants (identifiers), logical operators
/// (&&, ||), negations (!constant) and parentheses.
///
/// The environment is a simple Map that associates identifiers to boolean values.
///
/// The function should return the result of evaluating the expression using
/// the values from `environment`. The return value of this function is
/// either `true` or `false`.
export const evaluate = (expression: string, env: Env): boolean => {
  if (expression.length === 0) {
    return false;
  }

  if (isIdentifier(expression)) {
    if (expression[0] === '!') {
      return !testIdentifier(expression.slice(1), env);
    }

    return testIdentifier(expression, env);
  }

  const tokens = tokenize(expression);

  if (!tokens || tokens.length === 0) {
    return false;
  }

  // Exit if an unallowed character found.
  // Since we're tokenizing via String.prototype.match function,
  // the total length of matched tokens will be different in case
  // unallowed characters were injected.
  // However, we expect all spaces were already removed in prior step.
  if (expression.length !== tokens.reduce((partialSum, token) => partialSum + token.length, 0)) {
    return false;
  }

  const output: (boolean | string)[] = [];
  const stack: (boolean | string)[] = [];

  for (const token of tokens) {
    if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length !== 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!);
      }

      // If the opening parenthesis doesn't exist
      if (stack.length === 0) {
        return false;
      }

      stack.pop();
    } else if (isOperator(token)) {
      while (
        stack.length &&
        isOperator(stack[stack.length - 1] as string) &&
        precedence[token] <= precedence[stack[stack.length - 1] as string]
      ) {
        output.push(stack.pop()!);
      }

      stack.push(token);
    } else {
      output.push(testIdentifier(token, env));
    }
  }

  // If there is incomplete parenthesis
  if (stack[0] === '(' || stack[0] === ')') {
    return false;
  }

  while (stack.length !== 0) {
    output.push(stack.pop()!);
  }

  for (const token of output) {
    if (token === true || token === false) {
      stack.push(token);
    } else if (token === '!') {
      stack.push(!stack.pop());
    } else if (isOperator(token)) {
      const right = stack.pop()!;
      const left = stack.pop()!;

      if (token === '&&') {
        stack.push(left && right);
      } else {
        stack.push(left || right);
      }
    }
  }

  return stack[0] === true;
};

export default class Preprocessor {
  public static getCondition(line: string) {
    return line.slice(5 /* '!#if '.length */).replace(/\s/g, '');
  }

  public static parse(line: string, filterIDs?: Set<FilterId>): Preprocessor {
    return new this({
      condition: Preprocessor.getCondition(line),
      filterIDs,
    });
  }

  public static deserialize(view: StaticDataView): Preprocessor {
    const condition = view.getUTF8();

    const filterIDs = new Set<FilterId>();
    for (let i = 0, l = view.getUint32(); i < l; i++) {
      filterIDs.add(view.getUint32());
    }

    return new this({
      condition,
      filterIDs,
    });
  }

  public readonly condition: string;
  public readonly filterIDs: Set<FilterId>;

  constructor({
    condition,
    filterIDs = new Set(),
  }: {
    condition: string;
    filterIDs?: Set<FilterId> | undefined;
  }) {
    this.condition = condition;
    this.filterIDs = filterIDs;
  }

  public evaluate(env: Env): boolean {
    return evaluate(this.condition, env);
  }

  public serialize(view: StaticDataView): void {
    view.pushUTF8(this.condition);

    view.pushUint32(this.filterIDs.size);
    for (const filterID of this.filterIDs) {
      view.pushUint32(filterID);
    }
  }

  public getSerializedSize(): number {
    let estimatedSize = sizeOfUTF8(this.condition);

    estimatedSize += (1 + this.filterIDs.size) * 4;

    return estimatedSize;
  }
}
