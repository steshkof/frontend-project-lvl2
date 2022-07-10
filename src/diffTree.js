import _ from 'lodash';

const diffTree = (data1, data2) => {
  const keysOfData1 = Object.keys(data1);
  const keysOfData2 = Object.keys(data2);
  const allKeys = _.sortBy(_.uniq([...keysOfData1, ...keysOfData2]));

  const buildTree = (_data1, _data2, key) => {
    const keyInData1 = _.has(data1, key);
    const keyInData2 = _.has(data2, key);

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

/*
[
  {
    "key": "common",
    "status": "nested",
    "children": [
      { "key": "follow", "status": "added", "value": false },
      { "key": "setting1", "status": "unchanged", "value": "Value 1" },
      { "key": "setting2", "status": "removed", "value": 200 },
      { "key": "setting3", "status": "changed", "value1": true, "value2": null },
      { "key": "setting4", "status": "added", "value": "blah blah" },
      { "key": "setting5", "status": "added", "value": { "key5": "value5" } },
      {
        "key": "setting6",
        "status": "nested",
        "children": [
          {
            "key": "doge",
            "status": "nested",
            "children": [
              {
                "key": "wow",
                "status": "changed",
                "value1": "",
                "value2": "so much"
              }
            ]
          },
          { "key": "key", "status": "unchanged", "value": "value" },
          { "key": "ops", "status": "added", "value": "vops" }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "status": "nested",
    "children": [
      { "key": "baz", "status": "changed", "value1": "bas", "value2": "bars" },
      { "key": "foo", "status": "unchanged", "value": "bar" },
      {
        "key": "nest",
        "status": "changed",
        "value1": { "key": "value" },
        "value2": "str"
      }
    ]
  },
  {
    "key": "group2",
    "status": "removed",
    "value": { "abc": 12345, "deep": { "id": 45 } }
  },
  {
    "key": "group3",
    "status": "added",
    "value": { "deep": { "id": { "number": 45 } }, "fee": 100500 }
  }
]
*/
