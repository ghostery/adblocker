import { StaticDataView } from '../../data-view';
import IFilter from '../../filters/interface';
import Preprocessor, { Env } from '../../preprocessor';

export default class PreprocessorBucket {
  public static deserialize(view: StaticDataView): PreprocessorBucket {
    const preprocessors: Preprocessor[] = [];

    for (let i = 0, l = view.getUint32(); i < l; i++) {
      preprocessors.push(Preprocessor.deserialize(view));
    }

    return new this({
      preprocessors,
    });
  }

  private readonly preprocessors: Preprocessor[];
  private readonly excluded: Set<number>;

  private env: Env;

  constructor({
    env = new Env(),
    preprocessors = [],
  }: {
    env?: Env;
    preprocessors?: Preprocessor[];
  }) {
    this.env = env;
    this.excluded = new Set();
    this.preprocessors = preprocessors;

    if (preprocessors.length) {
      this.update({ added: preprocessors });
    }
  }

  private build() {
    // Update excluded filter ids based on bindings
    this.excluded.clear();

    for (let i = 0; i < this.preprocessors.length; ) {
      if (!this.preprocessors[i].filterIDs.size) {
        this.preprocessors.splice(i, 1);

        continue;
      }

      if (!this.preprocessors[i].evaluate(this.env)) {
        for (const filter of this.preprocessors[i].filterIDs) {
          this.excluded.add(filter);
        }
      }

      i++;
    }
  }

  public isFilterExcluded(filter: IFilter) {
    return this.excluded.has(filter.getId());
  }

  public updateEnv(env: Env) {
    this.env = env;

    this.build();
  }

  public update({ added, removed }: { added?: Preprocessor[]; removed?: Preprocessor[] }) {
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
      this.build();
    }

    return {
      preservedFilters,
    };
  }

  public serialize(view: StaticDataView) {
    view.pushUint32(this.preprocessors.length);
    for (const preprocessor of this.preprocessors) {
      preprocessor.serialize(view);
    }
  }

  public getSerializedSize() {
    let estimatedSize = 4;
    for (const preprocessor of this.preprocessors) {
      estimatedSize += preprocessor.getSerializedSize();
    }

    return estimatedSize;
  }
}
