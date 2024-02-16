import { StaticDataView, sizeOfUTF8 } from './data-view';
import { fastStartsWith } from './utils';

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

export const enum PreprocessorTypes {
  INVALID = 0,
  BEGIF = 1,
  ELSE = 2,
  ENDIF = 3,
}

export function detectPreprocessor(line: string) {
  if (line.charCodeAt(1) !== 35 /* '#' */) {
    return PreprocessorTypes.INVALID;
  }

  const command = line.slice(2);

  if (fastStartsWith(command, 'if ')) {
    return PreprocessorTypes.BEGIF;
  }

  if (command === 'else') {
    return PreprocessorTypes.ELSE;
  }

  if (command === 'endif') {
    return PreprocessorTypes.ENDIF;
  }

  return PreprocessorTypes.INVALID;
}

const tokenizerPattern = /(!|&&|\|\||\(|\)|[a-zA-Z0-9_]+)/g;

const tokenize = (expression: string) => expression.match(tokenizerPattern);

const precedence: Record<string, number> = {
  '!': 2,
  '&&': 1,
  '||': 0,
};

const isOperator = (token: string) => Object.prototype.hasOwnProperty.call(precedence, token);

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
export const evaluate = (expression: string, env: Env) => {
  const length = expression.length;

  // Fast path for very simple conditions (which are at the moment 100% of all
  // preprocessor conditions: either a single constant or a negated constant)
  if (!length) {
    return false;
  }

  const tokens = tokenize(expression);

  if (!tokens) {
    return false;
  }

  const output: (boolean | string)[] = [];
  const stack: (boolean | string)[] = [];

  let size = 0;

  for (const token of tokens) {
    size += token.length;

    if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      const parenthesesOpenIndex = stack.lastIndexOf('(');

      // If the opening parenthesis doesn't exist
      if (parenthesesOpenIndex < 0) {
        return false;
      }

      output.push(...stack.splice(parenthesesOpenIndex + 1, stack.length - parenthesesOpenIndex));
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
    } else if (token === 'true') {
      output.push(true);
    } else if (token === 'false') {
      output.push(false);
    } else {
      output.push(!!env.get(token));
    }
  }

  // Exit if an unallowed character found.
  // Since we're tokenizing via String.prototype.match function,
  // the total length of matched tokens will be different in case
  // unallowed characters were injected.
  // However, we expect all spaces were already removed in prior step.
  if (length !== size) {
    return false;
  }

  while (stack.length) {
    output.push(stack.pop()!);
  }

  for (const token of output) {
    if (token === true || token === false) {
      stack.push(token);
    } else if (token === '!') {
      stack.push(!stack.pop());
    } else if (isOperator(token)) {
      const right = stack.pop();
      const left = stack.pop();

      if (token === '&&') {
        stack.push(left && right);
      } else {
        stack.push(left || right);
      }
    }
  }

  // Return false if we didn't see any identifiers.
  if (!stack[0]) {
    return false;
  }

  return stack[0] as boolean;
};

export default class Preprocessor {
  public static getCondition(line: string) {
    return line.slice(5 /* '!#if '.length */).replace(/ /g, '');
  }

  public static parse(condition: string, filters?: Set<number>): Preprocessor {
    return new this({
      condition,
      filters,
    });
  }

  public static deserialize(view: StaticDataView): Preprocessor {
    const condition = view.getUTF8();

    const filters = new Set<number>();
    for (let i = 0, l = view.getUint32(); i < l; i++) {
      filters.add(view.getUint32());
    }

    return new this({
      condition,
      filters,
    });
  }

  public readonly condition: string;
  public readonly filters: Set<number>;

  constructor({
    condition,
    filters = new Set(),
  }: {
    condition: string;
    filters?: Set<number> | undefined;
  }) {
    this.condition = condition;
    this.filters = filters;
  }

  public evaluate(env: Env) {
    return evaluate(this.condition, env);
  }

  public serialize(view: StaticDataView) {
    view.pushUTF8(this.condition);

    view.pushUint32(this.filters.size);
    for (const filterID of this.filterIDs) {
      view.pushUint32(filterID);
    }
  }

  public getSerializedSize() {
    let estimatedSize = sizeOfUTF8(this.condition);

    estimatedSize += (1 + this.filters.size) * 4;

    return estimatedSize;
  }
}
