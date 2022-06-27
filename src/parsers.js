import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (file) => {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const fileExt = path.extname(file);

  if (fileExt === '.json') return JSON.parse(fileContent);
  if (fileExt === '.yaml' || fileExt === '.yml') return yaml.load(fileContent);

  return 'Unrecognized file extension';
};

export default parseFile;
