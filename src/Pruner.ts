import * as fs from 'fs-extra';
import * as path from 'path';
import { createConfig, Defaults, IConfig } from './Defaults';
import { PruneStats, pretty } from './PruneStats';
import { walk } from './Walker';

export class Pruner {

  private dir: string;
  private prunes: IConfig;
  private configs: {
    config: string;
    dryrun: boolean;
    verbose: boolean;
  };

  constructor(dir: string, configs: any) {
    this.dir = dir;
    this.configs = configs;
    let content = null;
    try {
      content = createConfig(fs.readJSONSync(this.configs.config));
    } catch (e) {
      content = Defaults;
    }
    this.prunes = content;
    for (const setKey in content) {
      const set = content[setKey];
      const newSet = [...set].map(e => e.toLowerCase());
      this.prunes[setKey] = new Set(newSet);
    }
  }

  async prune(): Promise<PruneStats> {
    const dry = this.configs.dryrun;
    const verbose = this.configs.verbose;
    const pruneStats = new PruneStats();
    await walk(this.dir, async (p, s) => {
      pruneStats.filesTotal++;
      pruneStats.sizeTotal += s.size;
      if (!this.prunable(p, s)) return false;

      let ds;
      if (s.isDirectory()) {
        ds = await this.dirStat(p);
        pruneStats.filesRemoved += ds.filesRemoved;
        pruneStats.filesTotal += ds.filesTotal;
        pruneStats.sizeRemoved += ds.sizeRemoved;
        pruneStats.sizeTotal += ds.sizeTotal;
        if (verbose) {
          console.info(`prune dir: ${p}, ${ds.filesRemoved}files, ${pretty(ds.sizeRemoved)}`);
        }
      }

      if (verbose && s.isFile()) {
        console.info(`prune file: ${p}, ${pretty(s.size)}`);
      }

      if (!dry) await fs.remove(p);
      pruneStats.filesRemoved++;
      pruneStats.sizeRemoved += s.size;
      return true;
    })
    return pruneStats;
  }

  prunable(p: string, stat: fs.Stats): boolean {
    p = p.toLowerCase();
    if (stat.isDirectory()) {
      return this.prunes.dirs.has(path.basename(p));
    }
    return this.prunes.exts.has(path.extname(p))
        || this.prunes.files.has(path.basename(p));
  }

  async dirStat(p: string): Promise<PruneStats> {
    const dirStat = new PruneStats();
    await walk(p, async (p, s) => {
      dirStat.filesTotal++;
      dirStat.filesRemoved++;
      dirStat.sizeRemoved += s.size;
      dirStat.sizeTotal += s.size;
    })
    return dirStat;
  }

}