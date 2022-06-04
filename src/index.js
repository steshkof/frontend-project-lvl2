import _ from 'lodash';
import { parseFile } from './parsers.js';

/* eslint-disable */
const genDiff = (file1, file2) => {
  const parsedFile1 = parseFile(file1);
  const parsedFile2 = parseFile(file2);


  const iter = (obj1, obj2, depth) => {
    // Берем ключи, осталяем уникальные, сортируем по алфавиту
    const keysOfObj1 = Object.keys(obj1);
    const keysOfobj2 = Object.keys(obj2);
    const allKeys = _.sortBy(_.uniq([...keysOfObj1, ...keysOfobj2]));
    
    const indent = '    '.repeat(depth); // отступ в 4 пробела
    const bracketIndent = '    '.repeat(depth - 1);
    
    // проходим по ключам
    const lines = allKeys.map((key) => {
      const keyInFile1 = Object.hasOwn(obj1, key);
      const keyInFile2 = Object.hasOwn(obj2, key);

      const value1 = obj1[key];
      const value2 = obj2[key];

      // Если есть ключ только во втором, возвращаем с плюсом
      if (!keyInFile1 && keyInFile2) {
        if (_.isObject(value2)) {
          return `${indent.slice(0,-2)}+ ${key}: ${iter(value2, value2, depth + 1)}`;
        }
        return `${indent.slice(0,-2)}+ ${key}: ${value2}`;
      }

      // Если есть ключ только во первом, возвращаем с минусом
      if (keyInFile1 && !keyInFile2) {
        if (_.isObject(value1)) {
          return `${indent.slice(0,-2)}- ${key}: ${iter(value1, value1, depth + 1)}`;
        }
        return `${indent.slice(0,-2)}- ${key}: ${value1}`;
      }

      // если есть в обоих и значения равны
      if (keyInFile1 && keyInFile2 && _.isEqual(value1, value2)) {
        if (_.isObject(value1)) {
          return `${indent}${key}: ${iter(value1, value1, depth + 1)}`
        }
        return `${indent}${key}: ${value1}`
      }

      // если есть в обоих и значения разные
      if (keyInFile1 && keyInFile2 && !_.isEqual(value1, value2)) {
        if (_.isObject(value1) && _.isObject(value2)) {
          return `${indent}${key}: ${iter(value1, value2, depth + 1)}`
        }

        if (_.isObject(value1) && !_.isObject(value2)) {
          return `${indent.slice(0,-2)}- ${key}: ${iter(value1, value1, depth + 1)}\n${indent.slice(0,-2)}+ ${key}: ${value2}`
        }
        
        if (!_.isObject(value1) && _.isObject(value2)) {
          return `${indent.slice(0,-2)}- ${key}: ${value1}\n${indent.slice(0,-2)}+ ${key}: ${iter(value1, value1, depth + 1)}`
        }

        return `${indent.slice(0,-2)}- ${key}: ${value1}\n${indent.slice(0,-2)}+ ${key}: ${value2}`
      }
    })

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');    
  }
  return iter(parsedFile1, parsedFile2, 1);
};

export { genDiff };




