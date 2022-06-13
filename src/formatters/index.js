import { formatterStylish } from './stylish.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish': return formatterStylish(tree);
    default: return 'Error';
  }
};
