import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import { genDiff } from '../src/index.js';
import { getFixturePath } from '../src/getPath.js';

// eslint-disable-next-line
test('test of genDiff JSON', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file2.json';

  const expected = readFileSync(getFixturePath('expected_json.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2))).toEqual(expected);
});

// test('test of genDiff YAML', () => {
//   const fileName1 = 'file1.yaml';
//   const fileName2 = 'file2.yaml';

//   const expected = readFileSync(getFixturePath('expected_json.txt'), 'utf-8');
//   expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2))).toEqual(expected);
// });
