/* eslint object-curly-newline: ["error", "never"] */
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');

const expectedStylish = readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
const expectedJson = readFileSync(getFixturePath('expected_json.txt'), 'utf-8');

const expectedSameStylish = readFileSync(getFixturePath('expectedSameStylish.txt'), 'utf-8');
const expectedSamePlain = readFileSync(getFixturePath('expectedSamePlain.txt'), 'utf-8');
const expectedSameJson = readFileSync(getFixturePath('expectedSameJson.txt'), 'utf-8');

test.each([
  { file1: jsonFile1, file2: jsonFile2, expected: expectedStylish, format: 'stylish', description: 'stylish format - json files' },
  { file1: yamlFile1, file2: yamlFile2, expected: expectedStylish, format: 'stylish', description: 'stylish format - yaml files' },

  { file1: jsonFile1, file2: jsonFile2, expected: expectedPlain, format: 'plain', description: 'plain format - json files' },
  { file1: yamlFile1, file2: yamlFile2, expected: expectedPlain, format: 'plain', description: 'plain format - yaml files' },

  { file1: jsonFile1, file2: jsonFile2, expected: expectedJson, format: 'json', description: 'json format - json files' },
  { file1: yamlFile1, file2: yamlFile2, expected: expectedJson, format: 'json', description: 'json format - yaml files' },

  { file1: jsonFile1, file2: jsonFile1, expected: expectedSameStylish, format: 'stylish', description: 'stylish format - same files json' },
  { file1: jsonFile1, file2: jsonFile1, expected: expectedSamePlain, format: 'plain', description: 'plain format - same files json' },
  { file1: jsonFile1, file2: jsonFile1, expected: expectedSameJson, format: 'json', description: 'json format - same files json' },
])('$description', ({ file1, file2, expected, format }) => {
  expect(genDiff(file1, file2, format)).toEqual(expected);
});
