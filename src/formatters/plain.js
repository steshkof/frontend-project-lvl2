import _ from 'lodash';

const formatterPlain = (input) => {
  const renderString = (_pathToValue, _change, _value1, _value2) => {
    // НАЧАЛО СТРОКИ
    const stringFirstPart = `Property '${_pathToValue}' was `;

    // КОНЕЦ СТРОКИ
    // форматируем значения
    const [value1, value2] = [_value1, _value2]
      .map((value) => {
        if (_.isString(value)) { return `'${value}'`; }
        if (_.isObject(value)) { return '[complex value]'; }
        return value;
      });

    // генерируем вторую часть
    const renderSecondPart = (change) => {
      switch (change) {
        case 'removed': return 'removed';
        case 'added': return `added with value: ${value1}`;
        case 'updated': return `updated. From ${value1} to ${value2}`;
        default: return 'Oops... Something wrong...';
      }
    };
    const stringSecondPart = renderSecondPart(_change);

    // СТРОКА ЦЕЛИКОМ
    return `${stringFirstPart}${stringSecondPart}`;
  };

  // основная функция сравнения
  // root путь для рекурсии, по умолчанию - []
  const plainComparison = (tree, root = []) => {
    // получаем массив объектов-веток
    const branchesData = tree.map((branch) => branch.node);

    // получаем ключи на текущем уровне
    const keys = branchesData.map((branch) => Object.keys(branch)).flat();
    // [ 'common', 'group1', 'group2', 'group3' ]

    // проходим по веткам, чтобы сформировать строчки для вывода различий
    const branches = tree
      .map((branch) => {
        const branchData = branch.node;
        const branchSign = branch.sign;

        const leafs = Object.entries(branchData)
          .map(([key, value]) => {
            // генерируем путь до текущего элемента
            const newRoot = [...root, key];
            const rootToPrint = newRoot.join('.');

            // проверка, повторяется ли ключ true => значение добавлено/удалено, false => изменено
            const currentKeyIsUniq = keys.filter((el) => el === key).length === 1;

            const stringToRender = (_branchSign, _currentKeyIsUniq) => {
              // значение добавлено
              if (_branchSign === '+' && _currentKeyIsUniq) return renderString(rootToPrint, 'added', value);

              // значение удалено
              if (_branchSign === '-' && _currentKeyIsUniq) return renderString(rootToPrint, 'removed');

              // значение изменено
              if (_branchSign === '+' && !_currentKeyIsUniq) {
                const [value1, value2] = branchesData
                  .filter((current) => Object.hasOwn(current, key))
                  .map((current) => current[key]);

                return renderString(rootToPrint, 'updated', value1, value2);
              }

              // значение не изменилось
              // если массив, рекурсивно проверяем внутри
              // если не массив, возвращаем пустой массив
              if (_branchSign === ' ') return _.isArray(value) ? plainComparison(value, newRoot) : [];
              return [];
            };

            return stringToRender(branchSign, currentKeyIsUniq);
          })
          .flat(); // убираем пустые массивы
        return leafs;
      })
      .flat(); // убираем пустые массивы

    return branches.join('\n');
  };

  return plainComparison(input);
};

export { formatterPlain };
