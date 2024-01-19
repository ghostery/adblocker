import { StaticDataView } from '../../data-view';
import IFilter from '../../filters/interface';
import { IPreprocessor, PRECONFIGURED_ENV, PreprocessorEnvConditionMap } from '../../preprocessor';

export default class PreprocessorBucket {
  public static deserialize() {
    // We don't want to take into serialization yet
    return new this({
      loadPreprocessors: true,
    });
  }

  public readonly envConditionMap: PreprocessorEnvConditionMap;

  public env: number;

  constructor({
    loadPreprocessors,
    env = PRECONFIGURED_ENV,
    envConditionMap = new Map(),
  }: {
    loadPreprocessors: boolean;
    env?: number;
    envConditionMap?: Map<number, IPreprocessor> | undefined;
  }) {
    this.envConditionMap = envConditionMap;
    this.env = env;

    // Manually change the assessment flow.
    if (!loadPreprocessors) {
      this.isEnvQualifiedFilter = this.alwaysTrue;
    }
  }

  private alwaysTrue() {
    return true;
  }

  public getEnv() {
    return this.env;
  }

  public setEnv(env: number) {
    this.env = env;
  }

  public update(envConditionMap: PreprocessorEnvConditionMap) {
    for (const [filterId, preprocessor] of envConditionMap.entries()) {
      // If we encounter the duplicate filter id, we will merge two preprocessors.
      // The duplicate check is done internally by Preprocessor object.
      if (this.envConditionMap.has(filterId)) {
        const existingPreprocessor = this.envConditionMap.get(filterId)!;
        for (const condition of preprocessor.getConditions()) {
          existingPreprocessor.addCondition(condition);
        }
      } else {
        // TODO: We need to remove duplicate preprocessors at this stage.
        this.envConditionMap.set(filterId, preprocessor);
      }
    }
  }

  public isEnvQualifiedFilter(filter: IFilter) {
    const preprocessor = this.envConditionMap.get(filter.getId());

    if (!preprocessor) {
      return true;
    }

    return preprocessor.evaluate(this.env);
  }

  public serialize(view: StaticDataView) {
    view.pushUint32(this.envConditionMap.size);

    for (const [filterId, preprocessor] of this.envConditionMap.entries()) {
      view.pushUint32(filterId);
      preprocessor.serialize(view);
    }
  }

  public getSerializedSize() {
    let estimatedSize = 4;

    // TODO: We need to filter out duplicates first.
    for (const preprocessor of this.envConditionMap.values()) {
      estimatedSize += 4 + preprocessor.getSerializedSize();
    }

    return estimatedSize;
  }
}
