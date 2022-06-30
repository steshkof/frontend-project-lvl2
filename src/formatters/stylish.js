import _ from 'lodash';

const formatterStylish = (input) => {
  const depth = 1;
  const indent = ' ';
  const indentRepeat = 2;

  const buildTree = (tree, _depth) => {
    const currentindent = (level) => indent.repeat(indentRepeat * level);
    const bracketIndent = (level) => indent.repeat((indentRepeat * level) - indentRepeat);

    if (!_.isObject(tree)) return `${tree}`;

    const lines = [tree].flat();
    const linesFromattedStylish = lines.reduce((acc, current) => {
      const [node, sign = ' '] = _.isArray(tree) ? Object.keys(current).map((key) => current[key]) : [current];

      const lineToAdd = Object.entries(node).map(([key, value]) => {
        const currentValue = buildTree(value, _depth + 2);
        return `${currentindent(_depth)}${sign} ${key}: ${currentValue}`;
      });

      return [...acc, ...lineToAdd];
    }, []);

    return ['{', ...linesFromattedStylish, `${bracketIndent(_depth)}}`].join('\n');
  };

  return buildTree(input, depth);
};

export default formatterStylish;
