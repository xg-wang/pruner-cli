#!/usr/bin/env node
import * as yargs from "yargs";
import { Pruner } from "./pruner";
import { PruneStats, pretty } from "./prune-stats";

const argv = yargs
  .usage("Prune node_modules files and save disk space\n\nUsage: prune <path>")
  .option("config", {
    alias: "c",
    description: "<filename> config file name",
    default: ".prune.json",
    type: "string",
  })
  .option("dryrun", {
    alias: "d",
    description: "dry run",
    default: "false",
    type: "boolean",
  })
  .option("verbose", {
    description: "log pruned file info",
    default: "false",
    type: "boolean",
  })
  .help("help")
  .alias("help", "h")
  .alias("version", "v").argv;

const path = String(argv._[0]) || "node_modules";
const configs = {
  config: argv.config,
  dryrun: argv.dryrun,
  verbose: argv.verbose,
};

const startT = Date.now();

function output(key: string, value: string) {
  console.log("\x1b[1m%s\x1b[0m ", key, value);
}

function print(stat: PruneStats) {
  output("files total", stat.filesTotal.toString());
  output("files removed", stat.filesRemoved.toString());
  output("size total", pretty(stat.sizeTotal));
  output("size removed", pretty(stat.sizeRemoved));
  output("duration", `${Date.now() - startT}ms`);
}

(async () => {
  let pruner = new Pruner(path, configs);
  let stat = await pruner.prune();
  print(stat);
})();
