import _ from 'lodash';

const diffTree = (data1, data2) => {
  if (_.isEqual(data1, data2)) return data1;

  const keysOfObj1 = Object.keys(data1);
  const keysOfobj2 = Object.keys(data2);
  const allKeys = _.sortBy(_.uniq([...keysOfObj1, ...keysOfobj2]));

  const makeTree = allKeys.flatMap((key) => {
    const makeBranch = (uniqKey) => {
      const keyInFile1 = _.has(data1, uniqKey);
      const keyInFile2 = _.has(data2, uniqKey);

      const value1 = data1[key];
      const value2 = data2[key];

      if (keyInFile1 && !keyInFile2) {
        return {
          node: { [uniqKey]: value1 },
          status: 'removed',
        };
      }

      if (keyInFile2 && !keyInFile1) {
        return {
          node: { [uniqKey]: value2 },
          status: 'added',
        };
      }

      if (
        (!_.isObject(value1) || !_.isObject(value2)) && !_.isEqual(value1, value2)
      ) {
        return [
          { node: { [uniqKey]: value1 }, status: 'removed' },
          { node: { [uniqKey]: value2 }, status: 'added' },
        ];
      }

      return {
        node: {
          [uniqKey]: diffTree(value1, value2),
        },
        status: 'unchanged',
      };
    };
    return makeBranch(key);
  });
  return makeTree;
};

export default diffTree;
