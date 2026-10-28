import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { validateManifest, validateMetadata, validateCatalog, loadCatalog } from './content-contract.mjs';
import { validateSite } from './validate-site.mjs';

const metadata = { title: 'Fixture', description: 'A meaningful fixture description.', audience: 'user', category: 'guide', product_area: 'library', status: 'current' };
const area = { id: 'products', name: 'Products', path: 'products', description: 'Apps.' };
const item = { area: 'products', id: 'library', name: 'Library', description: 'The app.', path: 'products/library', status: 'current', groups: ['Guides'] };
test('every metadata field is mandatory; statuses are explicit', () => {
  validateMetadata(metadata, 'fixture.md');
  for (const key of Object.keys(metadata)) {
    const data = { ...metadata }; delete data[key];
    assert.throws(() => validateMetadata(data, 'fixture.md'), new RegExp(key));
  }
});
test('duplicate routes inside one item fail', () => {
  assert.throws(() => validateManifest({ pages: [{ source: 'one.md', slug: '', group: 'Guides', section: 'Start' }, { source: 'two.md', slug: '', group: 'Guides', section: 'Start' }] }), /Duplicate route/);
});
test('pages need a group the item declares and a section', () => {
  assert.throws(() => validateManifest({ pages: [{ source: 'a.md', slug: 'a', group: 'Develop', section: 'S' }] }, item), /navigation placement/);
  assert.throws(() => validateManifest({ pages: [{ source: 'a.md', slug: 'a', group: 'Guides', section: ' ' }] }, item), /navigation placement/);
  validateManifest({ pages: [{ source: 'a.md', slug: 'a', group: 'Guides', section: 'S' }] }, item);
});
test('a fetch rule needs a repository and a path', () => {
  assert.throws(() => validateManifest({ pages: [{ source: 'a.md', slug: 'a', group: 'Guides', section: 'S', fetch: { repo: 'x/y' } }] }, item), /fetch rule/);
});
test('the catalog rejects unknown areas, duplicate items and items outside their area', () => {
  validateCatalog({ areas: [area], items: [item] });
  assert.throws(() => validateCatalog({ areas: [area], items: [{ ...item, area: 'nope' }] }), /unknown area/);
  assert.throws(() => validateCatalog({ areas: [area], items: [item, item] }), /Duplicate item/);
  assert.throws(() => validateCatalog({ areas: [area], items: [{ ...item, path: 'libraries/library' }] }), /under its area/);
  assert.throws(() => validateCatalog({ areas: [area], items: [{ ...item, name: '' }] }), /missing name/);
});
test('the real catalog is valid and every item has a manifest', async () => {
  const catalog = loadCatalog();
  for (const entry of catalog.items) {
    const manifest = JSON.parse(await fs.readFile(new URL(`../../content/${entry.path}/manifest.json`, import.meta.url), 'utf8'));
    validateManifest(manifest, entry);
  }
});
test('finished HTML rejects missing pages, anchors, assets and wrong base paths', async () => {
  const dist = await fs.mkdtemp(path.join(os.tmpdir(), 'tuvima-docs-validation-'));
  try {
    for (const [markup, expected] of [
      ['<a href="/missing/">Bad page</a>', /missing local target/],
      ['<a href="#missing">Bad anchor</a>', /missing anchor/],
      ['<img src="/missing.svg">', /missing local target/],
      ['<script src="https://cdn.example.net/x.js"></script>', /third-party resource/],
    ]) {
      await fs.writeFile(path.join(dist, 'index.html'), markup);
      await assert.rejects(validateSite(dist, { pages: [] }), expected);
    }
    await fs.writeFile(path.join(dist, 'index.html'), '<h2 id="valid">Valid</h2><a href="#valid">Go</a>');
    await validateSite(dist, { pages: [] });
  } finally {
    if (path.dirname(dist) !== os.tmpdir() || !path.basename(dist).startsWith('tuvima-docs-validation-')) throw new Error('Unsafe fixture cleanup path');
    await fs.rm(dist, { recursive: true, force: true });
  }
});
