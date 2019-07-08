import * as path from 'path';
import * as fs from 'fs-extra';
import { Defaults } from './../src/defaults';

const ROOT = 'test/fake_node_modules';

export async function createFakeNM(): Promise<string> {
  await fs.ensureDir(ROOT);
  const dirs = ['dirA', 'dirB', 'dirC']
    .map(d => path.join(ROOT, d));
  await Promise.all(dirs.map(d => fs.ensureDir(d)));
  // for dirA, put all files should be pruned
  const filesA = [];
  for (let f of Defaults.files) {
    filesA.push(path.join(dirs[0], f));
  }
  for (let e of Defaults.exts) {
    filesA.push(path.join(dirs[0], `dummy${e}`));
  }
  // for dirB, put all dirs should be pruned plus a dummy file
  const filesB = [];
  for (let d of Defaults.dirs) {
    filesB.push(path.join(dirs[1], d, 'dummy'))
  }
  // for dirC, put some files that would not be pruned
  const filesC = [path.join(dirs[2], 'keep.js')];
  await Promise.all([...filesA, ...filesB, ...filesC].map(f => fs.outputFile(f, 'hi')));
  return ROOT;
}

export async function clearFakeNM(root: string): Promise<void> {
  await fs.remove(root);
}
