import _ from 'lodash';

const diffTree = (data1, data2) => {
  const keysOfData1 = _.keys(data1);
  const keysOfData2 = _.keys(data2);
  const allKeys = _.sortBy(_.union(keysOfData1, keysOfData2));

  const buildTree = (_data1, _data2, key) => {
    const keyInData1 = _.has(_data1, key);
    const keyInData2 = _.has(_data2, key);

    const value1 = _data1[key];
    const value2 = _data2[key];

    if (!keyInData1) {
      return { key, status: 'added', value: value2 };
    }
    if (!keyInData2) {
      return { key, status: 'removed', value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'nested', children: diffTree(value1, value2) };
    }
    if (value1 !== value2) {
      return {
        key, status: 'changed', value1, value2,
      };
    }
    return { key, status: 'unchanged', value: value1 };
  };

  const resultTree = allKeys.map((key) => buildTree(data1, data2, key));
  return resultTree;
};

export default diffTree;
