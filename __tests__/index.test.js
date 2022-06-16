import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import { genDiff } from '../src/index.js';
import { getFixturePath } from '../src/getPath.js';

// stylish format
test('test of genDiff JSON, stylish format', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file2.json';

  const expected = readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'stylish')).toEqual(expected);
});

test('test of genDiff YAML, stylish format', () => {
  const fileName1 = 'file1.yaml';
  const fileName2 = 'file2.yaml';

  const expected = readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'stylish')).toEqual(expected);
});

// plain format
test('test of genDiff JSON, plain format', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file2.json';

  const expected = readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'plain')).toEqual(expected);
});

test('test of genDiff YAML, plain format', () => {
  const fileName1 = 'file1.yaml';
  const fileName2 = 'file2.yaml';

  const expected = readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'plain')).toEqual(expected);
});

// json format
test('test of genDiff JSON, json format', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file2.json';

  const expected = readFileSync(getFixturePath('expected_json.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'json')).toEqual(expected);
});

test('test of genDiff YAML, json format', () => {
  const fileName1 = 'file1.yaml';
  const fileName2 = 'file2.yaml';

  const expected = readFileSync(getFixturePath('expected_json.txt'), 'utf-8');
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'json')).toEqual(expected);
});

// equal
test('test of equal files, stylish format', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file1.json';

  const expected = 'Values are the same';
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'stylish')).toEqual(expected);
});

test('test of equal files, plain format', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file1.json';

  const expected = 'Values are the same';
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'plain')).toEqual(expected);
});

test('test of equal files, json format', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file1.json';

  const expected = 'Values are the same';
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'json')).toEqual(expected);
});
