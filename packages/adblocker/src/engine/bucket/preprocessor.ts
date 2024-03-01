import { StaticDataView } from '../../data-view';
import IFilter from '../../filters/interface';
import Preprocessor, { Env } from '../../preprocessor';

export default class PreprocessorBucket {
  public static deserialize(view: StaticDataView): PreprocessorBucket {
    const excluded = new Set<number>();
    for (let i = 0, l = view.getUint32(); i < l; i++) {
      excluded.add(view.getUint32());
    }

    const preprocessors: Preprocessor[] = [];
    for (let i = 0, l = view.getUint32(); i < l; i++) {
      preprocessors.push(Preprocessor.deserialize(view));
    }

    return new this({
      excluded,
      preprocessors,
    });
  }

  private readonly preprocessors: Preprocessor[];
  private readonly excluded: Set<number>;

  constructor({
    excluded = new Set(),
    preprocessors = [],
  }: {
    excluded?: Set<number>;
    preprocessors?: Preprocessor[];
  }) {
    this.excluded = excluded;
    this.preprocessors = preprocessors;
  }

  private build(env: Env) {
    // Update excluded filter ids based on bindings
    this.excluded.clear();

    const included = new Set<number>();

    for (let i = 0; i < this.preprocessors.length; ) {
      if (this.preprocessors[i].filterIDs.size === 0) {
        this.preprocessors.splice(i, 1);

        continue;
      }

      if (this.preprocessors[i].evaluate(env)) {
        for (const filterID of this.preprocessors[i].filterIDs) {
          included.add(filterID);
        }
      } else {
        for (const filterID of this.preprocessors[i].filterIDs) {
          if (!included.has(filterID)) {
            this.excluded.add(filterID);
          }
        }
      }

      i++;
    }
  }

  public isFilterExcluded(filter: IFilter) {
    return this.excluded.has(filter.getId());
  }

  public updateEnv(env: Env) {
    this.build(env);
  }

  public update({
    added,
    removed,
    env,
  }: {
    added?: Preprocessor[];
    removed?: Preprocessor[];
    env: Env;
  }) {
    const preservedFilters = new Set<number>();
    let updated = false;

    if (removed) {
      updated = true;

      for (const preprocessor of removed) {
        const local = this.preprocessors.find(
          (local) => local.condition === preprocessor.condition,
        );

        // Skip if we don't have any preprocessor on local
        if (!local) {
          continue;
        }

        for (const filterID of preprocessor.filterIDs) {
          local.filterIDs.delete(filterID);
        }
      }
    }

    if (added) {
      updated = true;

      for (const preprocessor of added) {
        const local = this.preprocessors.find(
          (local) => local.condition === preprocessor.condition,
        );

        if (!local) {
          this.preprocessors.push(preprocessor);

          continue;
        }

        for (const filterID of preprocessor.filterIDs) {
          local.filterIDs.add(filterID);
          preservedFilters.add(filterID);
        }
      }
    }

    if (updated) {
      this.build(env);
    }

    return {
      preservedFilters,
    };
  }

  public serialize(view: StaticDataView) {
    view.pushUint32(this.excluded.size);
    for (const filterID of this.excluded) {
      view.pushUint32(filterID);
    }

    view.pushUint32(this.preprocessors.length);
    for (const preprocessor of this.preprocessors) {
      preprocessor.serialize(view);
    }
  }

  public getSerializedSize() {
    let estimatedSize = (1 + this.excluded.size) * 4;

    estimatedSize += 4;
    for (const preprocessor of this.preprocessors) {
      estimatedSize += preprocessor.getSerializedSize();
    }

    return estimatedSize;
  }
}
