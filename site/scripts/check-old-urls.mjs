import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The old Library docs address is retired. Fails when a staged page still links to it,
// so a pasted link cannot send a reader to a site that no longer exists.
const generated = path.join(fileURLToPath(new URL('../', import.meta.url)), '.generated/content');
export function findOldUrls(text) {
  return [...new Set(text.match(/https?:\/\/tuvima\.github\.io\/tuvima-library[^\s)"'<]*/g) ?? [])];
}
async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(file); else yield file;
  }
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const problems = [];
  for await (const file of walk(generated)) for (const url of findOldUrls(await fs.readFile(file, 'utf8'))) problems.push(`${path.relative(generated, file)}: ${url}`);
  if (problems.length) { console.error(`Links to the retired Library docs address:\n  ${problems.join('\n  ')}`); process.exit(1); }
  console.log('No links to the retired docs address.');
}
