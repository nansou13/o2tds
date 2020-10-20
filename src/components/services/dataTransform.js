export const unescape = (string) =>
  new DOMParser().parseFromString(string, 'text/html').querySelector('html').textContent;
