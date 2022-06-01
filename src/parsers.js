import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { getAbsolutePath } from './getPath.js';

const parseFile = (file) => {
  const absolutePath = getAbsolutePath(file);

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const fileExt = path.extname(file);

  if (fileExt === '.json') return JSON.parse(fileContent);
  if (fileExt === '.yaml' || fileExt === '.yml') return yaml.load(fileContent);

  return 'Unrecognized file extension';
};

export { parseFile };
