import { StaticDataView } from '../../data-view';
import IFilter from '../../filters/interface';
import Preprocessor, {
  Env,
  IPreprocessor,
  NegatedPreprocessor,
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

  private env: Env;

  constructor({
    env = new Env(),
    envConditionMap = new Map(),
  }: {
    env?: Env;
    envConditionMap?: Map<number, IPreprocessor> | undefined;
  }) {
    this.envConditionMap = envConditionMap;
    this.env = env;
  }

  public getEnv() {
    return this.env;
  }

  public setEnv(env: Env) {
    this.env = env;

    // Flush cache map
    this.cache = new Map();
  }

  public update(
    newPreprocessors: PreprocessorEnvConditionMap,
    removedPreprocessors: PreprocessorEnvConditionMap,
  ) {
    const preserveFilterIds = new Set<number>();

    for (const [filterId, preprocessor] of removedPreprocessors.entries()) {
      const existingPreprocessor = this.envConditionMap.get(filterId);

      if (!existingPreprocessor) {
        continue;
      }

      if (compare(existingPreprocessor, preprocessor)) {
        this.envConditionMap.delete(filterId);

        continue;
      }

      let exclusivePreprocessor: IPreprocessor;

      if (existingPreprocessor instanceof NegatedPreprocessor) {
        exclusivePreprocessor = new NegatedPreprocessor({
          ref: new Preprocessor({
            conditions: existingPreprocessor.getConditions(),
            rawLine: existingPreprocessor.ref.rawLine,
          }),
          rawLine: existingPreprocessor.rawLine,
        });
      } else {
        exclusivePreprocessor = new Preprocessor({
          conditions: existingPreprocessor.getConditions(),
          rawLine: preprocessor.rawLine,
        });
      }

      for (const condition of preprocessor.getConditions()) {
        exclusivePreprocessor.removeCondition(condition);
      }

      const compared = new Set<IPreprocessor>();

      if (exclusivePreprocessor.getConditions().length) {
        // If we find a duplicate preprocessor, we will use the existing one instead.
        for (const existingPreprocessor of this.envConditionMap.values()) {
          if (!compared.has(existingPreprocessor) && compare(preprocessor, existingPreprocessor)) {
            exclusivePreprocessor = existingPreprocessor;

            break;
          }

          compared.add(existingPreprocessor);
        }

        preserveFilterIds.add(filterId);
        this.envConditionMap.set(filterId, exclusivePreprocessor);
      }
    }

    for (const [filterId, preprocessor] of newPreprocessors.entries()) {
      // If we encounter the duplicate filter id, we will assign new preprocessor
      // handling two conditions.
      if (this.envConditionMap.has(filterId)) {
        const existingPreprocessor = this.envConditionMap.get(filterId)!;

        if (compare(preprocessor, existingPreprocessor)) {
          this.envConditionMap.set(filterId, existingPreprocessor);

          continue;
        }

        let mergedPreprocessor: IPreprocessor;

        if (existingPreprocessor instanceof NegatedPreprocessor) {
          mergedPreprocessor = new NegatedPreprocessor({
            ref: new Preprocessor({
              conditions: existingPreprocessor.getConditions(),
              rawLine: existingPreprocessor.ref.rawLine,
            }),
            rawLine: existingPreprocessor.rawLine,
          });
        } else {
          mergedPreprocessor = new Preprocessor({
            conditions: existingPreprocessor.getConditions(),
            rawLine: preprocessor.rawLine,
          });
        }

        for (const condition of preprocessor.getConditions()) {
          mergedPreprocessor.addCondition(condition);
        }

        this.envConditionMap.set(filterId, mergedPreprocessor);

        continue;
      }

      // If we find a duplicate filter id, we will use the existing one instead.
      const compared = new Set<IPreprocessor>();

      let ref: IPreprocessor = preprocessor;

      for (const existingPreprocessor of this.envConditionMap.values()) {
        if (!compared.has(existingPreprocessor) && compare(preprocessor, existingPreprocessor)) {
          ref = existingPreprocessor;

          break;
        }

        compared.add(existingPreprocessor);
      }

      this.envConditionMap.set(filterId, ref);
    }

    return {
      preserveFilterIds,
    };
  }

  public isEnvQualifiedFilter(filter: IFilter) {
    const preprocessor = this.envConditionMap.get(filter.getId());

    if (!preprocessor) {
      return true;
    }

    let result = this.cache.get(preprocessor);

    if (!result) {
      result = preprocessor.evaluate(this.env.mask);

      this.cache.set(preprocessor, result);
    }

    return result;
  }

  public invertMap() {
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
