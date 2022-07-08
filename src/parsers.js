import yaml from 'js-yaml';

const parseFile = (path, extension) => {
  if (extension === '.json') return JSON.parse(path);
  if (extension === '.yaml' || extension === '.yml') return yaml.load(path);

  return 'Unrecognized file extension';
};

export default parseFile;
