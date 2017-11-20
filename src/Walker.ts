import { Pruner } from './Pruner';
import * as fs from 'fs-extra';
import * as path from 'path';

export async function walk(dir: string, prunerF: (p: string, s: fs.Stats) => void): Promise<void> {
  let s = await fs.lstat(dir);
  if (!s.isDirectory()) return;

  const items = await fs.readdir(dir);
  for (let item of items) {
    const s = await fs.lstat(item);
    prunerF(item, s);
    if (s.isDirectory()) walk(item, prunerF);
  }
}
