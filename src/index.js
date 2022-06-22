import _ from 'lodash';
import { parseFile } from './parsers.js';
import runWithFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const fileData1 = parseFile(filepath1);
  const fileData2 = parseFile(filepath2);

  if (_.isEqual(fileData1, fileData2)) return 'Values are the same';

  const iter = (file1, file2) => {
    if (_.isEqual(file1, file2)) return file1;

    const keysOfObj1 = Object.keys(file1);
    const keysOfobj2 = Object.keys(file2);
    const allKeys = _.sortBy(_.uniq([...keysOfObj1, ...keysOfobj2]));

    const makeTree = allKeys.flatMap((key) => {
      const makeBranch = (uniqKey) => {
        const keyInFile1 = Object.hasOwn(file1, uniqKey);
        const keyInFile2 = Object.hasOwn(file2, uniqKey);

        const value1 = file1[key];
        const value2 = file2[key];

        if (keyInFile1 && !keyInFile2) {
          return {
            node: { [uniqKey]: value1 }, sign: '-',
          };
        }

        if (keyInFile2 && !keyInFile1) {
          return {
            node: { [uniqKey]: value2 }, sign: '+',
          };
        }

        if ((!_.isObject(value1) || !_.isObject(value2)) && !_.isEqual(value1, value2)) {
          return [
            { node: { [uniqKey]: value1 }, sign: '-' },
            { node: { [uniqKey]: value2 }, sign: '+' },
          ];
        }

        return {
          node: {
            [uniqKey]: iter(value1, value2),
          },
          sign: ' ',
        };
      };
      return makeBranch(key);
    });
    return makeTree;
  };
  const diffTree = iter(fileData1, fileData2);
  return runWithFormatter(diffTree, format);
};

export default genDiff;
