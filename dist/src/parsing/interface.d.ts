export default interface IFilter {
    id: number;
    mask: number;
    getTokens: () => number[][];
}
