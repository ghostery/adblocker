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

export type Env = Map<EnvKeys, boolean>;

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

const operatorPattern = /(\|\||&&)/g;
const identifierPattern = /^(!?[a-z0-9_]+)$/;

const tokenize = (expression: string) => expression.split(operatorPattern);
const matchIdentifier = (identifier: string) => identifier.match(identifierPattern);

const evaluate = (expression: string, env: Env) => {
  const tokens = tokenize(expression);

  let result = false;
  let isContinuedByAndOperator = false;

  for (let i = 0; i < tokens.length; i++) {
    if (i % 2) {
      if (tokens[i][0] === '|') {
        isContinuedByAndOperator = false;
      } else if (tokens[i][0] === '&') {
        isContinuedByAndOperator = true;
      } else {
        // Invalid expression
        return false;
      }
    } else {
      const match = matchIdentifier(tokens[i]);

      if (!match) {
        // Invalid expression
        return false;
      }

      let identifier = match[1];

      const isNegated = identifier.charCodeAt(0) === 33; /* '!' */
      let isPositive = false;

      if (isNegated) {
        identifier = identifier.slice(1);
        isPositive = !env.get(identifier);
      } else {
        isPositive = !!env.get(identifier);
      }

      if (isContinuedByAndOperator) {
        result &&= isPositive;
      } else {
        result ||= isPositive;
      }
    }
  }

  return result;
};

export default class Preprocessor {
  public static parse(line: string): Preprocessor | null {
    return new this({
      condition: line.slice(5 /* '!#if '.length */).replace(/ /g, ''),
    });
  }

  public static deserialize(view: StaticDataView): Preprocessor {
    const condition = view.getUTF8();

    const negatives = new Set<number>();
    for (let i = 0, l = view.getUint32(); i < l; i++) {
      negatives.add(view.getUint32());
    }

    return new this({
      condition,
      negatives,
    });
  }

  public readonly condition: string;
  public readonly negatives: Set<number>;

  public result: boolean | undefined;

  constructor({
    condition,
    negatives = new Set(),
  }: {
    condition: string;
    negatives?: Set<number>;
  }) {
    this.condition = condition;
    this.negatives = negatives;
  }

  evaluate(env: Env) {
    if (!this.result) {
      this.result = evaluate(this.condition, env);
    }

    return this.result;
  }

  flush() {
    this.result = undefined;
  }

  isEnvQualifiedFilter(env: Env, filter: number) {
    if (this.negatives.has(filter)) {
      return !this.evaluate(env);
    }

    return this.evaluate(env);
  }

  serialize(view: StaticDataView) {
    view.pushUTF8(this.condition);

    view.pushUint32(this.negatives.size);
    for (const filter of this.negatives) {
      view.pushUint32(filter);
    }
  }

  getSerializedSize() {
    let estimatedSize = sizeOfUTF8(this.condition);

    estimatedSize += (1 + this.negatives.size) * 4;

    return estimatedSize;
  }
}
