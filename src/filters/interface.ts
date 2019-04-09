import StaticDataView from '../data-view';

export default interface IFilter {
  mask: number;
  getId: () => number;
  getTokens: () => Uint32Array[];
  serialize: (buffer: StaticDataView) => void;
  getEstimatedSerializedSize(): number;
}
