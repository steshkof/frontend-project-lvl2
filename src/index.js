import _ from 'lodash';
import { parseFile } from './parseFile.js';

const genDiff = (file1, file2) => {
  const parsedFile1 = parseFile(file1);
  const parsedFile2 = parseFile(file2);

  const keysOfFile1 = Object.keys(parsedFile1);
  const keysOfFile2 = Object.keys(parsedFile2);

  const allKeys = _.sortBy(_.uniq([...keysOfFile1, ...keysOfFile2]));

  let diffResult = '';

  for (const key of allKeys) {
    const keyInFile1 = Object.hasOwn(parsedFile1, key);
    const keyInFile2 = Object.hasOwn(parsedFile2, key);

    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];

    // есть в обоих, значения равны
    if (keyInFile1 && keyInFile2 && value1 === value2) {
      diffResult += `    ${key}: ${value1}\n`;
    }
    // есть в обоих, значения разные
    if (keyInFile1 && keyInFile2 && value1 !== value2) {
      diffResult += `  - ${key}: ${value1}\n`;
      diffResult += `  + ${key}: ${value2}\n`;
    }
    // есть только в первом
    if (keyInFile1 && !keyInFile2) {
      diffResult += `  - ${key}: ${value1}\n`;
    }
    // есть только во втором
    if (!keyInFile1 && keyInFile2) {
      diffResult += `  + ${key}: ${value2}\n`;
    }
  }

  diffResult = `{\n${diffResult}}`;
  return diffResult;
};

export { genDiff };
