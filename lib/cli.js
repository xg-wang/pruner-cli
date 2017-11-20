#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const argv = yargs
    .usage('Prune node_modules files and dependencies\n\nUsage: node-prune <path>')
    .help('help').alias('help', 'h')
    .version('version', '0.0.1').alias('version', 'v')
    .argv;
console.log(argv._[0]);
