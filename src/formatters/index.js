import formatterStylish from './stylish.js';
import formatterPlain from './plain.js';
import formatterJson from './json.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish': return formatterStylish(tree);
    case 'plain': return formatterPlain(tree);
    case 'json': return formatterJson(tree);
    case undefined: return formatterStylish(tree);
    default: return `Unknown format ${format}`;
  }
};
