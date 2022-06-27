import formatterStylish from './stylish.js';
import formatterPlain from './plain.js';
import formatterJson from './json.js';

export default (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish': return formatterStylish(tree);
    case 'plain': return formatterPlain(tree);
    case 'json': return formatterJson(tree);
    default: return `Unknown format ${format}`;
  }
};
