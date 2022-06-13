import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import { genDiff } from '../src/index.js';
import { getFixturePath } from '../src/getPath.js';

test('test of genDiff JSON, stylish format', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file2.json';

  const expected = readFileSync(getFixturePath('expected_json.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'stylish')).toEqual(expected);
});

test('test of genDiff YAML, stylish format', () => {
  const fileName1 = 'file1.yaml';
  const fileName2 = 'file2.yaml';

  const expected = readFileSync(getFixturePath('expected_json.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'stylish')).toEqual(expected);
});

test('test of equal files, stylish format', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file1.json';

  const expected = 'Values are the same';
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'stylish')).toEqual(expected);
});
