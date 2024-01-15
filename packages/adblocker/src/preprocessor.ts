import { StaticDataView } from './data-view';
import { clearBit, fastStartsWith, getBit, setBit } from './utils';

export const enum ENVIRONMENTAL_MASK {
  isUnsupportedPlatform = 1 << 0,
  isManifestV3 = 1 << 1,
  isMobile = 1 << 2,
  // RESERVE = 1 << 3,

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
  isNegated = 1 << 29,
  isContinuedWithLogicalAndOperator = 1 << 30,
  // RESERVE = 1 << 31
}

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

export function evaluateTokens(env: number, tokens: PreprocessorToken[]) {
  let result = false;

  for (const token of tokens) {
    let evaluated = (env & token.mask) === token.mask;

    if (token.isNegate) {
      evaluated = !evaluated;
    }

    if (token.isContinuedWithLogicalAndOperator) {
      result &&= evaluated;
    } else {
      result ||= evaluated;
    }

    if (!result) {
      return false;
    }
  }

  return true;
}

export const enum PreprocessorTypes {
  BEGIF = 0,
  ELSE = 1,
  ENDIF = 2,
  INVALID = 3,
}

export function detectPreprocessor(line: string) {
  if (line.length > 5 /* '#!if '.length */ && fastStartsWith(line, '#!if ')) {
    return PreprocessorTypes.BEGIF;
  }

  if (line === '#!else') {
    return PreprocessorTypes.ELSE;
  }

  if (line === '#!endif') {
    return PreprocessorTypes.ENDIF;
  }

  return PreprocessorTypes.INVALID;
}

export function computePreprocessorId() {
  return 0;
}

export interface IPreprocessor {
  rawLine: string | undefined;
  getId: () => number;
  getTokens: () => PreprocessorToken[];
  isNegated: () => boolean;
  evaluate: (env: number) => boolean;
  relate: () => number;
  unrelate: () => number;
  serialize: (view: StaticDataView) => void;
  getSerializedSize: () => number;
}

export class Preprocessor implements IPreprocessor {
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
      tokens,
      rawLine: debug === true ? line : undefined,
    });
  }

  public static deserialize(view: StaticDataView) {
    const tokens: PreprocessorToken[] = [];

    for (let i = 0, l = view.getUint32(); i < l; i++) {
      tokens.push(PreprocessorToken.deserialize(view));
    }

    return new this({
      tokens,
      rawLine: undefined,
    });
  }

  public readonly rawLine: string | undefined;

  private readonly tokens: PreprocessorToken[];

  private id: number | undefined;
  private result: boolean | undefined;

  // This variable helps if we need to gc this preprocessor
  // by expressing the current active relationships to
  // filters implemented over `IFilter`.
  private relations: number = 0;

  constructor({ tokens, rawLine }: { tokens: PreprocessorToken[]; rawLine: string | undefined }) {
    this.tokens = tokens;
    this.rawLine = rawLine;
  }

  public getId() {
    if (!this.id) {
      this.id = computePreprocessorId();
    }
    return this.id;
  }

  public getTokens() {
    return this.tokens;
  }

  public isNegated() {
    return false;
  }

  public evaluate(env: number) {
    if (!this.result) {
      this.result = evaluateTokens(env, this.tokens);
    }

    return this.result;
  }

  public relate() {
    return ++this.relations;
  }

  public unrelate() {
    return --this.relations;
  }

  public serialize(view: StaticDataView) {
    view.pushUint32(this.tokens.length);

    for (const token of this.tokens) {
      view.pushUint32(token.serialize());
    }
  }

  public getSerializedSize() {
    return 4 + this.tokens.length * 4;
  }
}

export class NegatedPreprocessor implements IPreprocessor {
  public static fromRef(ref: IPreprocessor) {
    return new this({
      ref,
    });
  }

  public static deserialize(view: StaticDataView, preprocessors: Map<number, IPreprocessor>) {
    const referenceId = view.getUint32();
    // TODO: We need to decide the behavior if the referenced preprocessor was not found!
    const preprocessor = preprocessors.get(referenceId)!;

    return new this({
      ref: preprocessor,
    });
  }

  public readonly rawLine = undefined;

  // The reference to preprocessor object helps us
  // to use less memory space.
  public readonly ref: IPreprocessor;

  private relations: number = 0;

  constructor({ ref }: { ref: IPreprocessor }) {
    this.ref = ref;
  }

  public getId() {
    return -this.ref.getId();
  }

  public getTokens() {
    return this.ref.getTokens();
  }

  public isNegated() {
    return true;
  }

  public evaluate(env: number): boolean {
    return !this.ref.evaluate(env);
  }

  public relate(): number {
    return ++this.relations;
  }

  public unrelate(): number {
    return --this.relations;
  }

  public serialize(view: StaticDataView) {
    view.pushUint32(this.ref.getId());
  }

  public getSerializedSize() {
    return 8;
  }
}
