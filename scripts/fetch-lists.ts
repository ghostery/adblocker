// @ts-ignore
import fetch from 'node-fetch';

export function fetchLists(lists: string[]) {
  return Promise.all(lists.map(async (url) => {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  }));
}
