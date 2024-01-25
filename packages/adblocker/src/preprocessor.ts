import { StaticDataView } from './data-view';
import { clearBit, fastStartsWith, getBit, setBit } from './utils';

export const enum ENVIRONMENTAL_MASK {
  isGhostery = 1 << 0,
  isUnsupportedPlatform = 1 << 1,
  isManifestV3 = 1 << 2,
  isMobile = 1 << 3,

  // Browser specs
  isBrowserChromium = 1 << 4,
  isBrowserFirefox = 1 << 5,
  isBrowserSafari = 1 << 6,
  isBrowserOpera = 1 << 7,

  // Capabilities
  hasHtmlFilteringCapability = 1 << 8,
  hasUserStylesheetCapability = 1 << 9,
  // RESERVE = 1 << {10...14}

  // Misc
  false = 1 << 15,
}

export const enum PREPROCESSOR_UTIL_MASK {
  isNegated = 1 << 30,
  isContinuedWithLogicalAndOperator = 1 << 31,
}

export const PRECONFIGURED_ENV =
  (PREPROCESSOR_UTIL_MASK.isNegated - 1) &
  ~ENVIRONMENTAL_MASK.isUnsupportedPlatform &
  ~ENVIRONMENTAL_MASK.false;

export function getTokenMask(token: string) {
  let mask = 0;
  let isNegate = false;

  if (token.charCodeAt(0) === 33 /* '!' */) {
    token = token.slice(1);

    isNegate = true;
  }

  switch (token) {
    // Extensions
    case 'ext_ghostery': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.isGhostery);

      break;
    }

    case 'ext_ublock':
    case 'ext_abp':
    case 'adguard':
    case 'adguard_app_android':
    case 'adguard_app_ios':
    case 'adguard_app_mac':
    case 'adguard_app_windows':
    case 'adguard_ext_android_cb': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.isUnsupportedPlatform);

      break;
    }

    // Environments & Browsers
    case 'ext_mv3': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.isManifestV3);

      break;
    }
    case 'env_edge':
    case 'env_chromium':
    case 'adguard_ext_chromium':
    case 'adguard_ext_edge':
    case 'adguard_ext_opera': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.isBrowserChromium);

      break;
    }
    case 'env_firefox':
    case 'adguard_ext_firefox': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.isBrowserFirefox);

      break;
    }
    case 'env_safari':
    case 'adguard_ext_safari': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.isBrowserSafari);

      break;
    }
    case 'env_mobile': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.isMobile);

      break;
    }

    // Capabilities & Misc
    case 'false': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.false);

      break;
    }
    case 'cap_html_filtering': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.hasHtmlFilteringCapability);

      break;
    }
    case 'cap_user_stylesheet': {
      mask = setBit(mask, ENVIRONMENTAL_MASK.hasUserStylesheetCapability);

      break;
    }
    default: {
      return null;
    }
  }

  return {
    mask,
    isNegate,
  };
}

export class PreprocessorToken {
  public static deserialize(view: StaticDataView) {
    let mask = view.getUint32();

    const isNegate = getBit(mask, PREPROCESSOR_UTIL_MASK.isNegated);
    const isContinuedWithLogicalAndOperator = getBit(
      mask,
      PREPROCESSOR_UTIL_MASK.isContinuedWithLogicalAndOperator,
    );

    mask = clearBit(mask, PREPROCESSOR_UTIL_MASK.isNegated);
    mask = clearBit(mask, PREPROCESSOR_UTIL_MASK.isContinuedWithLogicalAndOperator);

    return new this({
      mask,
      isNegate,
      isContinuedWithLogicalAndOperator,
    });
  }

  public readonly mask: number;
  public readonly isNegate: boolean;
  public readonly isContinuedWithLogicalAndOperator: boolean;

  constructor({
    mask,
    isNegate,
    isContinuedWithLogicalAndOperator,
  }: {
    mask: number;
    isNegate: boolean;
    isContinuedWithLogicalAndOperator: boolean;
  }) {
    this.mask = mask;
    this.isNegate = isNegate;
    this.isContinuedWithLogicalAndOperator = isContinuedWithLogicalAndOperator;
  }

  public serialize() {
    let mask = this.mask;

    if (this.isNegate) {
      mask = setBit(mask, PREPROCESSOR_UTIL_MASK.isNegated);
    }

    if (this.isContinuedWithLogicalAndOperator) {
      mask = setBit(mask, PREPROCESSOR_UTIL_MASK.isContinuedWithLogicalAndOperator);
    }

    return mask;
  }
}

export function evaluateConditions(env: number, conditions: PreprocessorToken[][]) {
  let result: boolean;

  for (const condition of conditions) {
    result = false;

    for (const token of condition) {
      let evaluated = getBit(env, token.mask);

      if (token.isNegate) {
        evaluated = !evaluated;
      }

      if (token.isContinuedWithLogicalAndOperator) {
        result &&= evaluated;
      } else {
        result ||= evaluated;
      }
    }

    if (result) {
      return true;
    }
  }

  return false;
}

export function compareCondition(a: PreprocessorToken[], b: PreprocessorToken[]) {
  const l = a.length;

  if (l !== b.length) {
    return false;
  }

  for (let i = 0; i < l; i++) {
    if (a[i].serialize() !== b[i].serialize()) {
      return false;
    }
  }

  return true;
}

export function compare(pa: IPreprocessor, pb: IPreprocessor) {
  if (pa instanceof Preprocessor) {
    if (pb instanceof NegatedPreprocessor) {
      return false;
    }
  } else if (pb instanceof Preprocessor) {
    return false;
  }

  const a = pa.getConditions();
  const b = pb.getConditions();

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) {
      return false;
    }

    for (let k = 0; k < a[i].length; k++) {
      if (a[i][k].serialize() !== b[i][k].serialize()) {
        return false;
      }
    }
  }

  return true;
}

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

export interface IPreprocessor {
  rawLine: string | undefined;
  hasCondition(condition: PreprocessorToken[]): boolean;
  getConditions(): PreprocessorToken[][];
  addCondition(condition: PreprocessorToken[]): void;
  removeCondition(condition: PreprocessorToken[]): void;
  evaluate(env: number): boolean;
  serialize(view: StaticDataView): void;
  getSerializedSize(): number;
}

export default class Preprocessor implements IPreprocessor {
  public static parse(line: string, debug = false): Preprocessor | null {
    const tokens: PreprocessorToken[] = [];

    let buffer = '';
    let isLastLogicalAndOperator = false;

    // #!if $token [$op $token [$op $token [...]]]
    //      ^
    //      |
    //      i = 5
    for (let i = 5 /* '#!if '.length */; i < line.length; i++) {
      if (line.charCodeAt(i) === 38 /* & */ && line.charCodeAt(i + 1) === 38) {
        const parsed = getTokenMask(buffer.trim());

        if (parsed === null) {
          return null;
        }

        tokens.push(
          new PreprocessorToken({
            mask: parsed.mask,
            isNegate: parsed.isNegate,
            isContinuedWithLogicalAndOperator: isLastLogicalAndOperator,
          }),
        );

        isLastLogicalAndOperator = true;

        buffer = '';
        i++;
      } else if (line.charCodeAt(i) === 124 /* | */ && line.charCodeAt(i + 1) === 124) {
        const parsed = getTokenMask(buffer.trim());

        if (parsed === null) {
          return null;
        }

        tokens.push(
          new PreprocessorToken({
            mask: parsed.mask,
            isNegate: parsed.isNegate,
            isContinuedWithLogicalAndOperator: isLastLogicalAndOperator,
          }),
        );

        isLastLogicalAndOperator = false;

        buffer = '';
        i++;
      } else {
        buffer += line[i];
      }
    }

    // Clean up the remaining buffer.
    // We assume the right side of string is already trimmed.
    const parsed = getTokenMask(buffer.trimStart());

    if (parsed === null) {
      return null;
    }

    tokens.push(
      new PreprocessorToken({
        mask: parsed.mask,
        isNegate: parsed.isNegate,
        isContinuedWithLogicalAndOperator: isLastLogicalAndOperator,
      }),
    );

    return new this({
      conditions: [tokens],
      rawLine: debug === true ? line : undefined,
    });
  }

  public static deserialize(view: StaticDataView) {
    const tokens: PreprocessorToken[] = [];

    for (let i = 0, l = view.getUint32(); i < l; i++) {
      tokens.push(PreprocessorToken.deserialize(view));
    }

    return new this({
      conditions: [tokens],
      rawLine: undefined,
    });
  }

  public readonly rawLine: string | undefined;

  private readonly conditions: PreprocessorToken[][];

  constructor({
    conditions,
    rawLine,
  }: {
    conditions: PreprocessorToken[][];
    rawLine: string | undefined;
  }) {
    this.conditions = conditions;
    this.rawLine = rawLine;
  }

  public hasCondition(target: PreprocessorToken[]) {
    for (const condition of this.conditions) {
      if (compareCondition(condition, target)) {
        return true;
      }
    }

    return false;
  }

  public getConditions() {
    return this.conditions;
  }

  public addCondition(condition: PreprocessorToken[]) {
    if (this.hasCondition(condition)) {
      return;
    }

    this.conditions.push(condition);
  }

  public removeCondition(target: PreprocessorToken[]) {
    for (let i = 0; i < this.conditions.length; i++) {
      if (compareCondition(this.conditions[i], target)) {
        this.conditions.splice(i, 1);
      }
    }
  }

  public evaluate(env: number): boolean {
    return evaluateConditions(env, this.conditions);
  }

  public serialize(view: StaticDataView) {
    view.pushUint32(this.conditions.length);

    for (const condition of this.conditions) {
      view.pushUint32(condition.length);

      for (const token of condition) {
        view.pushUint32(token.serialize());
      }
    }
  }

  public getSerializedSize() {
    let estimatedSize = 4;

    estimatedSize += this.conditions.length * 4;

    for (const condition of this.conditions) {
      estimatedSize += condition.length * 4;
    }

    return estimatedSize;
  }
}

export class NegatedPreprocessor implements IPreprocessor {
  public readonly ref: Preprocessor;
  public readonly rawLine: string | undefined;

  constructor({ ref, rawLine }: { ref: Preprocessor; rawLine?: string | undefined }) {
    this.ref = ref;
    this.rawLine = rawLine;
  }

  public hasCondition(condition: PreprocessorToken[]): boolean {
    return this.ref.hasCondition(condition);
  }

  public getConditions(): PreprocessorToken[][] {
    return this.ref.getConditions();
  }

  public addCondition(condition: PreprocessorToken[]): void {
    return this.ref.addCondition(condition);
  }

  public removeCondition(condition: PreprocessorToken[]): void {
    return this.ref.removeCondition(condition);
  }

  public evaluate(env: number): boolean {
    return !this.ref.evaluate(env);
  }

  public serialize(): void {}

  public getSerializedSize(): number {
    return 0;
  }
}

export type PreprocessorEnvConditionMap = Map<number, IPreprocessor>;
