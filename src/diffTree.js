import _ from 'lodash';

const diffTree = (fileData1, fileData2) => {
  if (_.isEqual(fileData1, fileData2)) return fileData1;

  const keysOfObj1 = Object.keys(fileData1);
  const keysOfobj2 = Object.keys(fileData2);
  const allKeys = _.sortBy(_.uniq([...keysOfObj1, ...keysOfobj2]));

  const makeTree = allKeys.flatMap((key) => {
    const makeBranch = (uniqKey) => {
      const keyInFile1 = _.has(fileData1, uniqKey);
      const keyInFile2 = _.has(fileData2, uniqKey);

      const value1 = fileData1[key];
      const value2 = fileData2[key];

      if (keyInFile1 && !keyInFile2) {
        return {
          node: { [uniqKey]: value1 },
          changes: 'removed',
        };
      }

      if (keyInFile2 && !keyInFile1) {
        return {
          node: { [uniqKey]: value2 },
          changes: 'added',
        };
      }

      if (
        (!_.isObject(value1) || !_.isObject(value2)) && !_.isEqual(value1, value2)
      ) {
        return [
          { node: { [uniqKey]: value1 }, changes: 'removed' },
          { node: { [uniqKey]: value2 }, changes: 'added' },
        ];
      }

      return {
        node: {
          [uniqKey]: diffTree(value1, value2),
        },
        changes: 'unchanged',
      };
    };
    return makeBranch(key);
  });
  return makeTree;
};

export default diffTree;
