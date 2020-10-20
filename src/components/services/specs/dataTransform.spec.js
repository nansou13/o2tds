import { unescape } from '../dataTransform';

describe('dataTransform', () => {
  describe('unescape', () => {
    test('should replace &#39 by apostrophe', () => {
      const stringValue = 'l&#39actualité du jour';

      const result = unescape(stringValue);

      expect(result).toEqual("l'actualité du jour");
    });
  });
});
