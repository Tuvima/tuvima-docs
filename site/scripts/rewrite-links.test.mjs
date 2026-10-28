import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import rewriteLinks from './rewrite-links.mjs';

test('pages, other products, assets, repository files, HTML and MDX resolve to the right addresses', async () => {
  const sandbox = await fs.mkdtemp(path.join(os.tmpdir(), 'tuvima-docs-links-'));
  const root = path.join(sandbox, 'site');
  const content = path.join(sandbox, 'content');
  try {
    await fs.mkdir(path.join(root, '.generated/content/products/library/guides'), { recursive: true });
    await fs.mkdir(path.join(content, 'products/library/assets/nested'), { recursive: true });
    await fs.writeFile(path.join(content, 'products/library/assets/nested/diagram.svg'), '<svg/>');
    const item = { path: 'products/library', repo: 'https://github.com/Tuvima/tuvima-library', docsDir: 'docs' };
    await fs.writeFile(path.join(root, '.generated/routes.json'), JSON.stringify({ catalog: { items: [item] }, sourceRoutes: { 'products/library/reference/test.md': '/products/library/reference/test/', 'legal/license.md': '/legal/license/' } }));
    const tree = { type: 'root', children: [
      { type: 'link', url: '../reference/test.md?mode=all#heading' },
      { type: 'definition', url: '/legal/license.md#terms' },
      { type: 'link', url: '../../../legal/license.md' },
      { type: 'image', url: '../assets/nested/diagram.svg' },
      { type: 'link', url: '../../AGENTS.md#x' },
      { type: 'mdxJsxFlowElement', attributes: [{ name: 'href', value: '../reference/test.md#heading' }] },
      { type: 'html', value: '<a href="../reference/test.md#heading">Reference</a>' },
      { type: 'link', url: 'https://example.com/a.md' },
      { type: 'code', value: '[example](missing.md)' },
    ] };
    const transform = rewriteLinks({ root, contentRoot: content });
    const file = { path: path.join(root, '.generated/content/products/library/guides/test.mdx') };
    transform(tree, file);
    assert.equal(tree.children[0].url, '/products/library/reference/test/?mode=all#heading');
    assert.equal(tree.children[1].url, '/legal/license/#terms');
    assert.equal(tree.children[2].url, '/legal/license/');
    assert.equal(tree.children[3].url, '/assets/products/library/assets/nested/diagram.svg');
    assert.equal(tree.children[4].url, 'https://github.com/Tuvima/tuvima-library/blob/main/AGENTS.md#x');
    assert.equal(tree.children[5].attributes[0].value, '/products/library/reference/test/#heading');
    assert.match(tree.children[6].value, /href="\/products\/library\/reference\/test\/#heading"/);
    assert.equal(tree.children[7].url, 'https://example.com/a.md');
    assert.equal(tree.children[8].value, '[example](missing.md)');
    assert.equal(await fs.readFile(path.join(root, '.generated/public/assets/products/library/assets/nested/diagram.svg'), 'utf8'), '<svg/>');
    assert.throws(() => transform({ type: 'link', url: 'missing.md' }, file), /local target does not exist/);
  } finally {
    if (path.dirname(sandbox) !== os.tmpdir() || !path.basename(sandbox).startsWith('tuvima-docs-links-')) throw new Error('Unsafe fixture cleanup path');
    await fs.rm(sandbox, { recursive: true, force: true });
  }
});
