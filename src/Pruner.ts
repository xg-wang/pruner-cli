import { PruneStats } from './PruneStats';
import * as fs from 'fs-extra';
import * as path from 'path';
import { walk } from './Walker';

export class Pruner {

  private dir: string;

  constructor(dir: string) {
    this.dir = dir || 'node_modules';
  }

  async prune(): Promise<PruneStats> {
    const pruneStats = new PruneStats();
    await walk(this.dir, async (p, s) => {
      pruneStats.filesTotal++;
      if (!this.prunable(p, s)) return;
      console.log('prune: ' + p);

      if (s.isDirectory()) {
        const ds = await this.dirStat(p);
        pruneStats.filesRemoved += ds.filesRemoved;
        pruneStats.filesTotal += ds.filesTotal;
        // pruneStats.sizeRemoved += ds.sizeRemoved;
      }

      await fs.remove(p);
      pruneStats.filesRemoved++;
      pruneStats.sizeRemoved += s.size;
    })
    return pruneStats;
  }

  prunable(p: string, stat: fs.Stats): boolean {
    return stat.isFile() && path.extname(p) === '.md';
  }

  async dirStat(p: string): Promise<PruneStats> {
    const dirStat = new PruneStats();
    await walk(p, async (p, s) => {
      dirStat.filesTotal++;
      dirStat.filesRemoved++;
      // dirStat.sizeRemoved += s.size;
    })
    return dirStat;
  }

}