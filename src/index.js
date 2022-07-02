import { readFileSync } from 'fs';
import { extname } from 'path';
import parseFile from './parsers.js';
import runWithFormatter from './formatters/index.js';
import { getAbsolutePath } from './getPath.js';
import diffTree from './diffTree.js';

const genDiff = (filepath1, filepath2, format) => {
  const absoluteFilePath1 = getAbsolutePath(filepath1);
  const absoluteFilePath2 = getAbsolutePath(filepath2);

  const file1Extension = extname(absoluteFilePath1);
  const file2Extension = extname(absoluteFilePath2);

  const file1Content = readFileSync(absoluteFilePath1, 'utf-8');
  const file2Content = readFileSync(absoluteFilePath2, 'utf-8');

  const file1ParsedContent = parseFile(file1Content, file1Extension);
  const file2ParsedContent = parseFile(file2Content, file2Extension);

  const generatedDiff = diffTree(file1ParsedContent, file2ParsedContent);
  return runWithFormatter(generatedDiff, format);
};

export default genDiff;
