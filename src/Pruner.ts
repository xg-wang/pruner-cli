import * as fs from 'fs-extra';
import * as path from 'path';
import { Defaults } from './Defaults';
import { PruneStats } from './PruneStats';
import { walk } from './Walker';

export class Pruner {

  private dir: string;
  private prunes: {
    dirs: Set<string>;
    files: Set<string>;
    exts: Set<string>;
  }

  constructor(dir='node_modules', prunes=Defaults) {
    this.dir = dir;
    this.prunes = prunes;
  }

  async prune(): Promise<PruneStats> {
    const pruneStats = new PruneStats();
    await walk(this.dir, async (p, s) => {
      pruneStats.filesTotal++;
      pruneStats.sizeTotal += s.size;
      if (!this.prunable(p, s)) return false;

      if (s.isDirectory()) {
        const ds = await this.dirStat(p);
        pruneStats.filesRemoved += ds.filesRemoved;
        pruneStats.filesTotal += ds.filesTotal;
        pruneStats.sizeRemoved += ds.sizeRemoved;
        pruneStats.sizeTotal += ds.sizeTotal;
      }

      await fs.remove(p);
      pruneStats.filesRemoved++;
      pruneStats.sizeRemoved += s.size;
      return true;
    })
    return pruneStats;
  }

  prunable(p: string, stat: fs.Stats): boolean {
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