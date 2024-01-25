import { StaticDataView } from '../../data-view';
import IFilter from '../../filters/interface';
import Preprocessor, {
  IPreprocessor,
  NegatedPreprocessor,
  PRECONFIGURED_ENV,
  PreprocessorEnvConditionMap,
  compare,
} from '../../preprocessor';

export default class PreprocessorBucket {
  public static deserialize(view: StaticDataView) {
    const map: PreprocessorBucket['envConditionMap'] = new Map();

    for (let i = 0, l = view.getUint32(); i < l; i++) {
      const preprocessor = Preprocessor.deserialize(view);

      const positives = view.getUint32Array();
      const negatives = view.getUint32Array();

      for (let k = 0; k < positives.length; k++) {
        map.set(positives[k], preprocessor);
      }

      if (negatives.length) {
        const negated = new NegatedPreprocessor({ ref: preprocessor });

        for (let k = 0; k < positives.length; k++) {
          map.set(positives[k], negated);
        }
      }
    }

    return new this({
      envConditionMap: map,
    });
  }

  public readonly envConditionMap: PreprocessorEnvConditionMap;

  private cache: Map<IPreprocessor, boolean> = new Map();

  private env: number;

  constructor({
    env = PRECONFIGURED_ENV,
    envConditionMap = new Map(),
  }: {
    env?: number;
    envConditionMap?: Map<number, IPreprocessor> | undefined;
  }) {
    this.envConditionMap = envConditionMap;
    this.env = env;
  }

  public getEnv() {
    return this.env;
  }

  public setEnv(env: number) {
    this.env = env;

    // Flush cache map
    this.cache = new Map();
  }

  public update(
    newPreprocessors: PreprocessorEnvConditionMap,
    removedPreprocessors: PreprocessorEnvConditionMap,
  ) {
    for (const filterId of removedPreprocessors.keys()) {
      this.envConditionMap.delete(filterId);
    }

    for (const [filterId, preprocessor] of newPreprocessors.entries()) {
      // If we encounter the duplicate filter id, we will assign new preprocessor
      // handling two conditions.
      if (this.envConditionMap.has(filterId)) {
        const existingPreprocessor = this.envConditionMap.get(filterId)!;
        const mergedPreprocessor = new Preprocessor({
          conditions: existingPreprocessor.getConditions(),
          rawLine: preprocessor.rawLine,
        });

        for (const condition of preprocessor.getConditions()) {
          mergedPreprocessor.addCondition(condition);
        }

        this.envConditionMap.set(filterId, mergedPreprocessor);

        continue;
      }

      // If we find a duplicate filter id, we will use the existing one instead.
      let ref: IPreprocessor = preprocessor;

      for (const existingPreprocessor of this.envConditionMap.values()) {
        if (compare(preprocessor, existingPreprocessor)) {
          ref = existingPreprocessor;

          break;
        }
      }

      this.envConditionMap.set(filterId, ref);
    }
  }

  public isEnvQualifiedFilter(filter: IFilter) {
    const preprocessor = this.envConditionMap.get(filter.getId());

    if (!preprocessor) {
      return true;
    }

    let result = this.cache.get(preprocessor);

    if (!result) {
      result = preprocessor.evaluate(this.env);

      this.cache.set(preprocessor, result);
    }

    return result;
  }

  private invertMap() {
    const map = new Map<Preprocessor, [number[], number[]]>();

    for (const [filterId, preprocessor] of this.envConditionMap.entries()) {
      let origin = preprocessor as Preprocessor;
      let index: 0 | 1 = 0;

      if (preprocessor instanceof NegatedPreprocessor) {
        origin = preprocessor.ref;
        index++;
      }

      if (map.has(origin)) {
        map.get(origin)![index].push(filterId);
      } else {
        const arr: [number[], number[]] = [[], []];

        arr[index].push(filterId);

        map.set(origin, arr);
      }
    }

    return map;
  }

  public serialize(view: StaticDataView) {
    const map = this.invertMap();

    view.pushUint32(map.size);

    for (const [preprocessor, [positives, negatives]] of map.entries()) {
      preprocessor.serialize(view);

      view.pushUint32(positives.length);

      for (const positive of positives) {
        view.pushUint32(positive);
      }

      view.pushUint32(negatives.length);

      for (const negative of negatives) {
        view.pushUint32(negative);
      }
    }
  }

  public getSerializedSize() {
    const map = this.invertMap();

    let estimatedSize = 4;

    for (const [preprocessor, [positives, negatives]] of map.entries()) {
      estimatedSize +=
        preprocessor.getSerializedSize() + 8 + positives.length * 4 + negatives.length * 4;
    }

    return estimatedSize;
  }
}
