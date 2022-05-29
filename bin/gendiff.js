#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .version('1.0')
    .option('-f, --format <type>', 'output format')

program.parse();