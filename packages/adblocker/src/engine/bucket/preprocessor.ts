import IFilter from '../../filters/interface';
import { NETWORK_FILTER_MASK } from '../../filters/network';
import { IPreprocessor, PreprocessorEnvConditionMap } from '../../preprocessor';
import { getBit } from '../../utils';

export default class PreprocessorBucket {
  public env: number;

  public envConditionMap: PreprocessorEnvConditionMap;

  constructor({
    env,
    loadPreprocessors,
    envConditionMap = new Map(),
  }: {
    env: number;
    loadPreprocessors: boolean;
    envConditionMap?: Map<number, IPreprocessor> | undefined;
  }) {
    this.env = env;
    this.envConditionMap = envConditionMap;

    // Manually change the assessment flow.
    if (loadPreprocessors) {
      this.isEnvQualifiedFilter = this.alwaysTrue;
    }
  }

  private alwaysTrue() {
    return true;
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
        this.envConditionMap.set(filterId, preprocessor);
      }
    }
  }

  public isEnvQualifiedFilter(filter: IFilter) {
    if (!getBit(filter.mask, NETWORK_FILTER_MASK.hasPreprocessor)) {
      return false;
    }

    return this.envConditionMap.get(filter.getId())!.evaluate(this.env);
  }
}
