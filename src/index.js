import _ from 'lodash';
import { parseFile } from './parsers.js';
import runWithFormatter from './formatters/index.js';

/*eslint-disable*/
const genDiff = (filepath1, filepath2, format) => {
  // получаем контент файлов
  const fileData1 = parseFile(filepath1);
  const fileData2 = parseFile(filepath2);

  // проверка, одинаковые ли файлы
  if (_.isEqual(fileData1, fileData2)) return 'Values are the same';

  const iter = (file1, file2) => {
    // если одинаковые, можно не сравнивать, вернуть первый
    if (_.isEqual(file1, file2)) return file1;

    // Берем ключи, осталяем уникальные, сортируем по алфавиту
    const keysOfObj1 = Object.keys(file1);
    const keysOfobj2 = Object.keys(file2);
    const allKeys = _.sortBy(_.uniq([...keysOfObj1, ...keysOfobj2]));

    // проходим по ключам и создаем дерево
    const makeTree = allKeys.flatMap((key) => {
      const makeBranch = (uniqKey) => {
        // проверяем, если ключи в файлах
        const keyInFile1 = Object.hasOwn(file1, uniqKey);
        const keyInFile2 = Object.hasOwn(file2, uniqKey);

        // получаем значения ключей
        const value1 = file1[key];
        const value2 = file2[key];

        // есть ключ только в первом
        if (keyInFile1 && !keyInFile2) {
          return {
            node: {[uniqKey]: value1,},sign: '-',
          };
        }

        // есть ключ только во втором
        if (keyInFile2 && !keyInFile1) {
          return {
            node: {[uniqKey]: value2,},sign: '+',
          };
        }

        // если есть в обоих, значения разные и один - не объект
        if ((!_.isObject(value1) || !_.isObject(value2)) && !_.isEqual(value1, value2)) {
          return [
            { node: { [uniqKey]: value1 }, sign: '-' },
            { node: { [uniqKey]: value2 }, sign: '+' },
          ];
        }

        // есть в обоих, оба значения - объекты => без знака и запускаем iter для сравнения значений
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

export { genDiff };

// [
//   {
//     node: {
//       common: [
//         { node: { follow: false }, sign: '+' },
//         { node: { setting1: 'Value 1' }, sign: ' ' },
//         { node: { setting2: 200 }, sign: '-' },
//         { node: { setting3: true }, sign: '-' },
//         { node: { setting3: null }, sign: '+' },
//         { node: { setting4: 'blah blah' }, sign: '+' },
//         { node: { setting5: { key5: 'value5' } }, sign: '+' },
//         {
//           node: {
//             setting6: [
//               {
//                 node: {
//                   doge: [
//                     { node: { wow: '' }, sign: '-' },
//                     { 
//                       node: { wow: 'so much' }, 
//                       sign: '+' 
//                     },
//                   ],
//                 },
//                 sign: ' ',
//               },
//               { node: { key: 'value' }, sign: ' ' },
//               { node: { ops: 'vops' }, sign: '+' },
//             ],
//           },
//           sign: ' ',
//         },
//       ],
//     },
//     sign: ' ',
//   },
//   {
//     node: {
//       group1: [
//         { node: { baz: 'bas' }, sign: '-' },
//         { node: { baz: 'bars' }, sign: '+' },
//         { node: { foo: 'bar' }, sign: ' ' },
//         { node: { nest: { key: 'value' } }, sign: '-' },
//         { node: { nest: 'str' }, sign: '+' },
//       ],
//     },
//     sign: ' ',
//   },
//   { node: { group2: { abc: 12345, deep: { id: 45 } } }, sign: '-' },
//   {
//     node: { group3: { deep: { id: { number: 45 } }, fee: 100500 } },
//     sign: '+',
//   },
// ];
