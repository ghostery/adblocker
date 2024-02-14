import { StaticDataView } from '../../data-view';
import IFilter from '../../filters/interface';
import Preprocessor, { Env } from '../../preprocessor';

export default class PreprocessorBucket {
  public static deserialize(view: StaticDataView, env: Env): PreprocessorBucket {
    const preprocessors: Preprocessor[] = [];

    for (let i = 0, l = view.getUint32(); i < l; i++) {
      preprocessors.push(Preprocessor.deserialize(view));
    }

    return new this({
      env,
      preprocessors,
    });
  }

  public readonly conditions: Map<string, Preprocessor>;
  public readonly ineligible: Set<number>;

  public env: Env;

  constructor({ env, preprocessors = [] }: { env: Env; preprocessors?: Preprocessor[] }) {
    this.env = env;

    this.ineligible = new Set();
    this.conditions = new Map();

    this.update({ added: preprocessors });
  }

  private build() {
    // Build filters to preprocessor set
    // We'll use `Set` instead of `Array` to effectively remove duplicates
    const bindings = new Map<number, Set<Preprocessor>>();

    for (const preprocessor of this.conditions.values()) {
      // Remove unused preprocessor
      if (!(preprocessor.positives.size + preprocessor.negatives.size)) {
        this.conditions.delete(preprocessor.condition);
        continue;
      }

      for (const positive of preprocessor.positives) {
        const binding = bindings.get(positive) ?? new Set();

        binding.add(preprocessor);
        bindings.set(positive, binding);
      }

      for (const negative of preprocessor.negatives) {
        const binding = bindings.get(negative) ?? new Set();

        binding.add(preprocessor);
        bindings.set(negative, binding);
      }
    }

    // Update ineligible based on bindings
    this.ineligible.clear();

    for (const [filter, preprocessors] of bindings.entries()) {
      for (const one of preprocessors) {
        if (!one.isEnvQualifiedFilter(this.env, filter)) {
          this.ineligible.add(filter);
          break;
        }
      }
    }
  }

  public isFilterEligible(filter: IFilter) {
    return !this.ineligible.has(filter.getId());
  }

  public flush(env: Env) {
    this.env = env;

    for (const preprocessor of this.conditions.values()) {
      // Tell preprocessor to delete cached evaluation result regarding env
      preprocessor.flush();
    }

    this.build();
  }

  public update({ added, removed }: { added?: Preprocessor[]; removed?: Preprocessor[] }) {
    const preservedFilters = new Set<number>();
    let updated = false;

    if (removed) {
      updated = true;

      for (const one of removed) {
        const another = this.conditions.get(one.condition);

        // Skip if we don't have any preprocessor on local
        if (!another) {
          continue;
        }

        for (const positive of one.positives) {
          another.positives.delete(positive);
        }

        for (const negative of one.negatives) {
          another.negatives.delete(negative);
        }
      }
    }

    if (added) {
      updated = true;

      for (const one of added) {
        const another = this.conditions.get(one.condition);

        if (!another) {
          this.conditions.set(one.condition, one);

          continue;
        }

        for (const positive of one.positives) {
          another.positives.add(positive);
          preservedFilters.add(positive);
        }

        for (const negative of one.negatives) {
          another.positives.add(negative);
          preservedFilters.add(negative);
        }
      }
    }

    if (updated) {
      this.build();
    }

    return {
      updated,
      preservedFilters,
    };
  }

  public serialize(view: StaticDataView) {
    view.pushUint32(this.conditions.size);
    for (const one of this.conditions.values()) {
      one.serialize(view);
    }
  }

  public getSerializedSize() {
    let estimatedSize = 4;
    for (const one of this.conditions.values()) {
      estimatedSize += one.getSerializedSize();
    }

    return estimatedSize;
  }
}
