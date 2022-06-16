import _ from 'lodash';

const formatterStylish = (input) => {
  // отступы
  const depth = 1;
  const indent = ' ';
  const indentRepeat = 2;

  const buildTree = (tree, _depth) => {
    // отступы
    const currentindent = (level) => indent.repeat(indentRepeat * level);
    const bracketIndent = (level) => indent.repeat((indentRepeat * level) - indentRepeat);

    // если значение - примитивный тип (не объект, не массив)
    // нужно, когда передаем финальное значение
    if (!_.isObject(tree)) return `${tree}`;

    // если значение - объект/массив
    let lines = [tree].flat(); // может прийти массив объектов или 1 объект, делаем из него массив

    lines = lines.reduce((acc, current) => {
      // возвращаем массив с элементами и присваиваем значения node и sign
      const [node, sign = ' '] = _.isArray(tree) ? Object.keys(current).map((key) => current[key]) : [current];

      // перебираем и выводим в строку вложенные объекты
      const lineToAdd = Object.entries(node).map(([key, value]) => {
        const currentValue = buildTree(value, _depth + 2);
        return `${currentindent(_depth)}${sign} ${key}: ${currentValue}`;
      });

      // возвращаем массив всех вложенных значений
      return [...acc, ...lineToAdd];
    }, []);

    // добавляем фигурные скобки в начале и конце
    return ['{', ...lines, `${bracketIndent(_depth)}}`].join('\n');
  };

  return buildTree(input, depth);
};

export { formatterStylish };
