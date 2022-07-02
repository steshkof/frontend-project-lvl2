import _ from 'lodash';

const formatterPlain = (input) => {
  const renderString = (_pathToValue, _change, _value1, _value2) => {
    const stringFirstPart = `Property '${_pathToValue}' was `;

    const [value1, value2] = [_value1, _value2]
      .map((value) => {
        if (_.isString(value)) { return `'${value}'`; }
        if (_.isObject(value)) { return '[complex value]'; }
        return value;
      });

    const renderSecondPart = (change) => {
      switch (change) {
        case 'removed': return 'removed';
        case 'added': return `added with value: ${value1}`;
        case 'updated': return `updated. From ${value1} to ${value2}`;
        default: return 'Oops... Something wrong...';
      }
    };
    const stringSecondPart = renderSecondPart(_change);

    return `${stringFirstPart}${stringSecondPart}`;
  };

  const plainComparison = (tree, root = []) => {
    if (!_.isArray(tree)) return '';
    const branchesData = tree.map((branch) => branch.node);

    const keys = branchesData.map((branch) => Object.keys(branch)).flat();
    const branches = tree
      .map((branch) => {
        const branchData = branch.node;
        const branchChanged = branch.changes ?? 'unchanged';

        const leafs = Object.entries(branchData)
          .map(([key, value]) => {
            const newRoot = [...root, key];
            const rootToPrint = newRoot.join('.');

            const currentKeyIsUniq = keys.filter((el) => el === key).length === 1;

            const stringToRender = (_branchChanged, _currentKeyIsUniq) => {
              if (_branchChanged === 'added' && _currentKeyIsUniq) return renderString(rootToPrint, 'added', value);

              if (_branchChanged === 'removed' && _currentKeyIsUniq) return renderString(rootToPrint, 'removed');

              if (_branchChanged === 'added' && !_currentKeyIsUniq) {
                const [value1, value2] = branchesData
                  .filter((current) => _.has(current, key))
                  .map((current) => current[key]);

                return renderString(rootToPrint, 'updated', value1, value2);
              }

              if (_branchChanged === 'unchanged') return _.isArray(value) ? plainComparison(value, newRoot) : [];
              return [];
            };

            return stringToRender(branchChanged, currentKeyIsUniq);
          })
          .flat();
        return leafs;
      })
      .flat();

    return branches.join('\n');
  };

  return plainComparison(input);
};

export default formatterPlain;
