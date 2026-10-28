// Refreshes the committed fallback copies of fetched pages from the repositories' current files.
// Usage: node scripts/update-root-snapshots.mjs [--from <folder>]  (folder holds checkouts named after each repo)
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadCatalog, contentRoot, normalizeSource } from './content-contract.mjs';
import { fetchRootFile, splitFrontMatter } from './root-files.mjs';

const fromIndex = process.argv.indexOf('--from');
const from = fromIndex > 0 ? process.argv[fromIndex + 1] : null;
for (const item of loadCatalog().items) {
  const itemDir = path.join(contentRoot, item.path);
  const manifest = JSON.parse(await fs.readFile(path.join(itemDir, 'manifest.json'), 'utf8'));
  for (const page of manifest.pages.filter(p => p.fetch)) {
    const file = path.join(itemDir, normalizeSource(page.source));
    const staged = splitFrontMatter(await fs.readFile(file, 'utf8'));
    if (!staged) throw new Error(`${page.source}: front matter is required`);
    const text = from ? await fs.readFile(path.join(from, page.fetch.repo.split('/')[1], page.fetch.path), 'utf8') : await fetchRootFile(page.fetch);
    if (text === null) throw new Error(`Could not read ${page.fetch.repo}/${page.fetch.path}`);
    await fs.writeFile(file, `---\n${staged.front}\n---\n\n${text.replace(/\r\n/g, '\n').trimStart()}`);
    console.log(`Updated ${page.source}`);
  }
}
