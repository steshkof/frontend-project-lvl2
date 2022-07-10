import _ from 'lodash';

const formatValue = (value) => {
  if (_.isString(value)) return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const pathSeparator = '.';

const statusOptions = {
  added: ({ key, value }, pathAcc) => `Property '${pathAcc}${key}' was added with value: ${formatValue(value)}`,
  removed: ({ key }, pathAcc) => `Property '${pathAcc}${key}' was removed`,
  nested: ({ key, children }, pathAcc, _makelines) => _makelines(children, `${pathAcc}${key}${pathSeparator}`),
  changed: ({ key, value1, value2 }, pathAcc) => `Property '${pathAcc}${key}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`,
  unchanged: () => null,
};

const formatterPlain = (tree) => {
  const makeLines = (nodes, pathAcc = '') => nodes
    .map((node) => {
      const { status } = node;
      return statusOptions[status](node, pathAcc, makeLines);
    })
    .filter((node) => node !== null)
    .join('\n')
    .trim();

  return makeLines(tree);
};

export default (tree) => formatterPlain(tree);
