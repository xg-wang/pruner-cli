#!/usr/bin/env node
import * as yargs from 'yargs';
import { Pruner } from './Pruner';
import { PruneStats, pretty } from './PruneStats';

const argv = yargs
  .usage('Prune node_modules files and dependencies\n\nUsage: node-prune <path>')
  .help('help').alias('help', 'h')
  .version('version', '0.0.1').alias('version', 'v')
  .argv;

const path = argv._[0] || 'node_modules';

const startT = Date.now();

new Pruner(path).prune().then(print);

function output(key: string, value: string) {
  console.log("\x1b[1m%s\x1b[0m ", key, value);
}

function print(stat: PruneStats) {
  output('files total', stat.filesTotal.toString())
  output('files removed', stat.filesRemoved.toString())
  output('size total', pretty(stat.sizeTotal))
  output('size removed', pretty(stat.sizeRemoved))
  output('duration', `${Date.now() - startT}ms`)
}
