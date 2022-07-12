import { readFileSync } from 'fs';
import { extname } from 'path';
import parseData from './parsers.js';
import runWithFormatter from './formatters/index.js';
import getAbsolutePath from './getPath.js';
import diffTree from './diffTree.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const getContent = (_filePath) => {
    const absoluteFilePath = getAbsolutePath(_filePath);
    const fileExtension = extname(absoluteFilePath).slice(1);
    const fileContent = readFileSync(absoluteFilePath, 'utf-8');
    return parseData(fileContent, fileExtension);
  };

  const generatedDiff = diffTree(getContent(filepath1), getContent(filepath2));
  return runWithFormatter(generatedDiff, format);
};

export default genDiff;
