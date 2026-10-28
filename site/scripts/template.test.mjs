import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { validateManifest, validateMetadata, validateCatalog, loadCatalog } from './content-contract.mjs';

// The "add a product" template must always be a valid starting point, so following
// the checklist in CONTRIBUTING.md produces a site that builds.
const template = new URL('../../templates/product/', import.meta.url);
test('the product template validates as a new catalog item with a complete manifest', async () => {
  const entry = JSON.parse(await fs.readFile(new URL('catalog-entry.json', template), 'utf8'));
  const catalog = loadCatalog();
  validateCatalog({ ...catalog, items: [...catalog.items, entry] });
  const manifest = JSON.parse(await fs.readFile(new URL('manifest.json', template), 'utf8'));
  validateManifest(manifest, entry);
  for (const page of manifest.pages) {
    const text = await fs.readFile(new URL(page.source, template), 'utf8');
    validateMetadata(YAML.parse(text.match(/^---\n([\s\S]*?)\n---/)[1]), path.basename(page.source));
  }
});
