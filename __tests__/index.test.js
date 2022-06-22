import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFixturePath } from '../src/getPath.js';

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');

const expectedStylish = readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
const expectedJson = readFileSync(getFixturePath('expected_json.txt'), 'utf-8');
const expectedSame = 'Values are the same';

describe('genDiff function', () => {
  describe('stylish format', () => {
    test('json files', () => {
      const result = genDiff(jsonFile1, jsonFile2, 'stylish');
      expect(result).toEqual(expectedStylish);
    });

    test('yaml files', () => {
      const result = genDiff(yamlFile1, yamlFile2, 'stylish');
      expect(result).toEqual(expectedStylish);
    });
  });

  describe('plain format', () => {
    test('json files', () => {
      const result = genDiff(jsonFile1, jsonFile2, 'plain');
      expect(result).toEqual(expectedPlain);
    });

    test('yaml files', () => {
      const result = genDiff(yamlFile1, yamlFile2, 'plain');
      expect(result).toEqual(expectedPlain);
    });
  });

  describe('json format', () => {
    test('json files', () => {
      const result = genDiff(jsonFile1, jsonFile2, 'json');
      expect(result).toEqual(expectedJson);
    });

    test('yaml files', () => {
      const result = genDiff(yamlFile1, yamlFile2, 'json');
      expect(result).toEqual(expectedJson);
    });
  });

  describe('equal files', () => {
    test('stylish format', () => {
      const result = genDiff(jsonFile1, jsonFile1, 'stylish');
      expect(result).toEqual(expectedSame);
    });

    test('plain format', () => {
      const result = genDiff(jsonFile1, jsonFile1, 'plain');
      expect(result).toEqual(expectedSame);
    });

    test('json format', () => {
      const result = genDiff(jsonFile1, jsonFile1, 'json');
      expect(result).toEqual(expectedSame);
    });
  });
});
