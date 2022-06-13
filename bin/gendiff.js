#!/usr/bin/env node
import { Command } from 'commander';
import { genDiff } from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('1.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((file1, file2) => {
    console.log(genDiff(file1, file2, program.opts().format));
  });

program.parse();
