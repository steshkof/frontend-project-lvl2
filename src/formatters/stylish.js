import _ from 'lodash';

const formatterStylish = (input) => {
  const buildTree = (tree, _depth = 1) => {
    const currentindent = (level) => ' '.repeat((level - 1) * 4 + 2);
    const bracketIndent = (level) => ' '.repeat((level - 1) * 4);

    if (!_.isObject(tree)) return `${tree}`;

    const lines = [tree].flat();
    const linesFormattedStylish = lines.reduce((acc, current) => {
      const [node, changes] = _.isArray(tree)
        ? Object.keys(current).map((key) => current[key])
        : [current];

      const getSign = () => {
        if (changes === 'added') return '+';
        if (changes === 'removed') return '-';
        return ' ';
      };

      const lineToAdd = Object.entries(node).map(([key, value]) => {
        const currentValue = buildTree(value, _depth + 1);
        return `${currentindent(_depth)}${getSign()} ${key}: ${currentValue}`;
      });

      return [...acc, ...lineToAdd];
    }, []);

    return ['{', ...linesFormattedStylish, `${bracketIndent(_depth)}}`].join('\n');
  };

  return buildTree(input);
};

export default formatterStylish;
