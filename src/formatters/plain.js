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
    const branchesData = tree.map((branch) => branch.node);

    const keys = branchesData.map((branch) => Object.keys(branch)).flat();
    const branches = tree
      .map((branch) => {
        const branchData = branch.node;
        const branchSign = branch.sign;

        const leafs = Object.entries(branchData)
          .map(([key, value]) => {
            const newRoot = [...root, key];
            const rootToPrint = newRoot.join('.');

            const currentKeyIsUniq = keys.filter((el) => el === key).length === 1;

            const stringToRender = (_branchSign, _currentKeyIsUniq) => {
              if (_branchSign === '+' && _currentKeyIsUniq) return renderString(rootToPrint, 'added', value);

              if (_branchSign === '-' && _currentKeyIsUniq) return renderString(rootToPrint, 'removed');

              if (_branchSign === '+' && !_currentKeyIsUniq) {
                const [value1, value2] = branchesData
                  .filter((current) => _.has(current, key))
                  .map((current) => current[key]);

                return renderString(rootToPrint, 'updated', value1, value2);
              }

              if (_branchSign === ' ') return _.isArray(value) ? plainComparison(value, newRoot) : [];
              return [];
            };

            return stringToRender(branchSign, currentKeyIsUniq);
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
