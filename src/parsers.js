import yaml from 'js-yaml';

const parseData = (input, format) => {
  switch (format) {
    case 'json': return JSON.parse(input);
    case 'yaml': return yaml.load(input);
    case 'yml': return yaml.load(input);
    default: throw new Error(`Unknown extension '${format}'.`);
  }
};

export default parseData;
