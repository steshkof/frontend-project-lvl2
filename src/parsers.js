import yaml from 'js-yaml';

const parseFile = (filePath, extension) => {
  if (extension === '.json') return JSON.parse(filePath);
  if (extension === '.yaml' || extension === '.yml') return yaml.load(filePath);

  return 'Unrecognized file extension';
};

export default parseFile;
