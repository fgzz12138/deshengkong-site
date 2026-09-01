import { readdir, lstat, readFile, readlink, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const phase = process.argv[2];
if (!['before', 'after'].includes(phase)) throw new Error('Use before or after');
const qa = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(qa, '../../..');
const output = path.join(repo, '.vercel/linux-build/.vercel/output');
const rows = [];
const sha256 = value => createHash('sha256').update(value).digest('hex');

async function walk(relative = '') {
  for (const name of (await readdir(path.join(output, relative))).sort()) {
    const item = path.join(relative, name);
    const absolute = path.join(output, item);
    const stat = await lstat(absolute);
    const key = item.split(path.sep).join('/');
    if (stat.isSymbolicLink()) {
      rows.push({ path: key, type: 'symlink', target: await readlink(absolute) });
    } else if (stat.isDirectory()) {
      await walk(item);
    } else if (stat.isFile()) {
      const bytes = await readFile(absolute);
      rows.push({ path: key, type: 'file', bytes: bytes.length, sha256: sha256(bytes) });
    } else {
      throw new Error(`Unexpected artifact entry: ${key}`);
    }
  }
}

await walk();
const report = {
  phase,
  artifactRoot: '.vercel/linux-build/.vercel/output',
  createdAt: new Date().toISOString(),
  files: rows.filter(row => row.type === 'file').length,
  symlinks: rows.filter(row => row.type === 'symlink').length,
  sha256: sha256(JSON.stringify(rows)),
  entries: rows,
};
await writeFile(path.join(qa, `output-${phase}-deploy.json`), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ phase, files: report.files, symlinks: report.symlinks, sha256: report.sha256 }));
