import { formatterStylish } from './stylish.js';
import { formatterPlain } from './plain.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish': return formatterStylish(tree);
    case 'plain': return formatterPlain(tree);
    default: return 'Unknown format';
  }
};
