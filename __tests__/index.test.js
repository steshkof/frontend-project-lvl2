import { genDiff } from '../src/index.js';
import { getFixturePath } from '../src/getPath.js';

// eslint-disable-next-line
test('test of genDiff', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file2.json';
  const diffResult = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

  // eslint-disable-next-line
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2))).toEqual(diffResult);
});
