import { Defaults } from './../src/Defaults';
import { expect } from 'chai';
import 'mocha';
import { walk } from '../src/Walker';
import { createFakeNM } from './helper';

describe('Walker', function() {

  let root = '';
  let filesCount = 0;
  let dirCount = 0;

  beforeEach(async function() {
    root = await createFakeNM();
    filesCount = 0;
    dirCount = 0;
  });

  describe('walk', function() {
    it('should recursively walks files', async function() {
      await walk(root, function(p, s) {
        if (s.isFile()) filesCount++;
        if (s.isDirectory()) dirCount++;
      });
      expect(filesCount).to.equal(Defaults.files.size + Defaults.dirs.size + Defaults.exts.size + 1);
      expect(dirCount).to.equal(Defaults.dirs.size + 3);
    })
  })

})