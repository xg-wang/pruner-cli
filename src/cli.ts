#!/usr/bin/env node
import * as yargs from 'yargs';
import { Pruner } from './Pruner';

const argv = yargs
  .usage('Prune node_modules files and dependencies\n\nUsage: node-prune <path>')
  .help('help').alias('help', 'h')
  .version('version', '0.0.1').alias('version', 'v')
  .argv;

const path = argv._[0] || 'node_modules';

new Pruner(path).prune();
