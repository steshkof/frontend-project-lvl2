import _ from 'lodash';

const formatterStylish = (tree) => {
  const currentIndent = (depth) => ' '.repeat(depth * 4 - 2);
  const bracketIndent = (depth) => ' '.repeat(depth * 4 - 4);

  const valueFormatter = (data, depth) => {
    if (!_.isObject(data)) return `${data}`;

    const valueLinesArray = _.entries(data)
      .map(([key, value]) => {
        const formattedValue = valueFormatter(value, depth + 1);
        return `${currentIndent(depth)}  ${key}: ${formattedValue}`;
      });

    const valueLines = valueLinesArray.join('\n');

    return `{\n${valueLines}\n${bracketIndent(depth)}}`;
  };

  const treeFormatter = (nodes, depth = 1) => {
    const linesArray = nodes.map(({
      key, status, children, value, value1, value2,
    }) => {
      switch (status) {
        case 'added':
          return `${currentIndent(depth)}+ ${key}: ${valueFormatter(value, depth + 1)}`;
        case 'removed':
          return `${currentIndent(depth)}- ${key}: ${valueFormatter(value, depth + 1)}`;
        case 'nested':
          return `${currentIndent(depth)}  ${key}: ${treeFormatter(children, depth + 1)}`;
        case 'changed':
          return `${currentIndent(depth)}- ${key}: ${valueFormatter(value1, depth + 1)}\n${currentIndent(depth)}+ ${key}: ${valueFormatter(value2, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent(depth)}  ${key}: ${valueFormatter(value, depth + 1)}`;
        default:
          throw new Error(`Unknown status '${status}'.`);
      }
    });

    const lines = linesArray.join('\n');

    return `{\n${lines}\n${bracketIndent(depth)}}`;
  };

  return treeFormatter(tree);
};

export default formatterStylish;
