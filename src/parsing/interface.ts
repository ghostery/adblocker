export default interface IFilter {
  mask: number;
  getId: () => number;
  getTokens: () => number[][];
}
