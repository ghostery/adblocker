import { StaticDataView } from '../../data-view.js';
import IFilter from '../../filters/interface.js';
import Preprocessor, { Env } from '../../preprocessor.js';

type FilterId = number;

export default class PreprocessorBucket {
  public static deserialize(view: StaticDataView): PreprocessorBucket {
    const excluded = new Set<FilterId>();
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
  private readonly excluded: Set<FilterId>;

  constructor({
    excluded = new Set(),
    preprocessors = [],
  }: {
    excluded?: Set<FilterId>;
    preprocessors?: Preprocessor[];
  }) {
    this.excluded = excluded;
    this.preprocessors = preprocessors;
  }

  public isFilterExcluded(filter: IFilter) {
    return this.excluded.has(filter.getId());
  }

  public updateEnv(env: Env) {
    // Update excluded filter ids based on bindings
    this.excluded.clear();

    for (const preprocessor of this.preprocessors) {
      if (!preprocessor.evaluate(env)) {
        for (const filterID of preprocessor.filterIDs) {
          this.excluded.add(filterID);
        }
      }
    }
  }

  public update(
    {
      added,
      removed,
    }: {
      added?: Preprocessor[];
      removed?: Preprocessor[];
    },
    env: Env,
  ) {
    if (removed) {
      for (const preprocessor of removed) {
        const local = this.preprocessors.find(
          (local) => local.condition === preprocessor.condition,
        );

        // Skip if we don't have any preprocessor on local
        // In the context of filters updates from CDN this should never happen.
        if (!local) {
          continue;
        }

        for (const filterID of preprocessor.filterIDs) {
          local.filterIDs.delete(filterID);
        }
      }
    }

    if (added) {
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
        }
      }
    }

    if ((removed && removed.length !== 0) || (added && added.length !== 0)) {
      this.updateEnv(env);
    }
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
