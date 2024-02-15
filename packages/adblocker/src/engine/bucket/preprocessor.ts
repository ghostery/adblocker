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
  public readonly excluded: Set<number>;

  public env: Env;

  constructor({ env, preprocessors = [] }: { env: Env; preprocessors?: Preprocessor[] }) {
    this.env = env;

    this.excluded = new Set();
    this.conditions = new Map();

    this.update({ added: preprocessors });
  }

  private build() {
    // Update excluded filter ids based on bindings
    this.excluded.clear();

    for (const preprocessor of this.conditions.values()) {
      // Remove unused preprocessor
      if (!preprocessor.filters.size) {
        this.conditions.delete(preprocessor.condition);

        continue;
      }

      if (!preprocessor.evaluate(this.env)) {
        for (const filter of preprocessor.filters) {
          this.excluded.add(filter);
        }
      }
    }
  }

  public isFilterExcluded(filter: IFilter) {
    return this.excluded.has(filter.getId());
  }

  public flush(env: Env) {
    this.env = env;

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

        for (const filter of one.filters) {
          another.filters.delete(filter);
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

        for (const filter of one.filters) {
          another.filters.add(filter);
          preservedFilters.add(filter);
        }
      }
    }

    if (updated) {
      this.build();
    }

    return {
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
