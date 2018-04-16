import {} from 'jest';
import { loadAllLists } from '../assets/load';
import { parseList } from '../src/parsing/list';
import { convertAndValidateFilters } from '../scripts/convert-to-safari-rules';

test('rule must be a valid safari rule', () => {
  const lists = parseList(loadAllLists());
  convertAndValidateFilters(lists);
});
