import fs from 'fs';
import { getAbsolutePath } from './getPath.js';

const parseFile = (file) => {
  const absolutePath = getAbsolutePath(file);
  return JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
};

export { parseFile };
