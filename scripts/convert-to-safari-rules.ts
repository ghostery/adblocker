import { loadAllLists } from '../assets/load';
import { convertCosmetics, convertFilter } from '../src/convertion/safari-rules';
import { parseList } from '../src/parsing/list';

function main() {
  const { networkFilters, cosmeticFilters } = parseList(loadAllLists());

  console.log(JSON.stringify([
    ...networkFilters.map(convertFilter),
    ...cosmeticFilters.map(convertCosmetics),
  ].filter(f => f !== null)));
}

main();
