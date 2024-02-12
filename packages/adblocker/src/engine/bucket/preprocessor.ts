import Preprocessor, { Env } from '../../preprocessor';

export type PreprocessorDiff = Map<number, Preprocessor[]>;

export default class PreprocessorBucket {
  public readonly conditions: Map<string, Preprocessor>;

  public readonly disabled: Set<number>;
  public readonly bindings: Map<number, Preprocessor[]>;

  public env: Env;

  constructor({
    env,
    disabled = new Set(),
    bindings = new Map(),
  }: {
    env: Env;
    disabled?: Set<number>;
    bindings?: Map<number, Preprocessor[]>;
  }) {
    this.env = env;
    this.disabled = disabled;
    this.bindings = bindings;

    // Build conditions bindings
    this.conditions = new Map();

    for (const preprocessors of this.bindings.values()) {
      for (const preprocessor of preprocessors) {
        if (!this.conditions.has(preprocessor.condition)) {
          this.conditions.set(preprocessor.condition, preprocessor);
        }
      }
    }
  }

  public update({ added, removed }: { added?: PreprocessorDiff; removed?: PreprocessorDiff }) {
    if (added) {
      for (const [filter, preprocessors] of added.entries()) {
        const bindings: Preprocessor[] = this.bindings.get(filter) ?? [];
        let enabled = true;

        // Find missing preprocessors and update `this.conditions`
        for (const preprocessor of preprocessors) {
          let local = this.conditions.get(preprocessor.condition);

          if (!local) {
            local = preprocessor;
            this.conditions.set(local.condition, local);
          }

          bindings.push(local);

          // Preprocesor.isEnvQualifiedFilter checks if the filter is in `else` block
          if (enabled && !local.isEnvQualifiedFilter(this.env, filter)) {
            enabled = false;
          }
        }

        if (enabled && this.disabled.has(filter)) {
          this.disabled.delete(filter);
        } else {
          this.disabled.add(filter);
        }

        this.bindings.set(filter, bindings);
      }
    }
  }
}
