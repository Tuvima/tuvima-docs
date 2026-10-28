import test from 'node:test';
import assert from 'node:assert/strict';
import { homePage, areaPage, notFoundPage } from './hub-pages.mjs';
import { transformRootFile, splitFrontMatter } from './root-files.mjs';
import { findOldUrls } from './check-old-urls.mjs';

const catalog = {
  areas: [{ id: 'products', name: 'Products', path: 'products', description: 'Apps.' }, { id: 'legal', name: 'Legal and policies', path: 'legal', description: 'Policies.' }],
  items: [
    { area: 'products', id: 'library', name: 'Library', description: 'The app.', path: 'products/library', status: 'early-access', startPage: 'tutorials/getting-started' },
    { area: 'products', id: 'id', name: 'ID', description: 'Sign in.', path: 'products/id', status: 'current' },
    { area: 'legal', id: 'legal', name: 'Legal', description: 'Policies.', path: 'legal', status: 'current', bar: false },
  ],
  popular: [{ label: 'Install Library', path: 'products/library/tutorials/getting-started', description: 'Get going.' }],
};
const manifests = { library: { pages: [] }, id: { pages: [] }, legal: { pages: [{ source: 'license.md', slug: 'license', section: 'Licence' }] } };
const titleOf = (item, page) => `Title of ${page.slug}`;

test('adding a product to the catalog adds its card to the home page and the products page', () => {
  const home = homePage(catalog, manifests, titleOf).body;
  assert.match(home, /<a href="\/products\/library\/">Library<\/a>/);
  assert.match(home, /<a href="\/products\/id\/">ID<\/a>/);
  assert.match(home, /Early Access/);
  assert.match(home, /Install Library/);
  assert.match(home, /Title of license/);
  assert.match(areaPage(catalog, manifests, catalog.areas[0], titleOf).body, /<a href="\/products\/id\/">ID<\/a>/);
});
test('the legal area lists its pages instead of cards, and the 404 page offers search', () => {
  assert.match(areaPage(catalog, manifests, catalog.areas[1], titleOf).body, /<a href="\/legal\/license\/">Title of license<\/a>/);
  assert.match(notFoundPage().body, /data-hub-search/);
});
test('root files point at the hub and survive being converted twice', () => {
  const once = transformRootFile('See [conduct](CODE_OF_CONDUCT.md), [licence](../../LICENSE) and https://tuvima.github.io/tuvima-library/guides/remote-access/ or https://tuvima.github.io/tuvima-library/reference/attributions/#x.');
  assert.match(once, /\]\(\/legal\/code-of-conduct\.md\)/);
  assert.match(once, /blob\/main\/LICENSE/);
  assert.match(once, /\(?\/products\/library\/guides\/remote-access\//);
  assert.match(once, /\/legal\/attributions\/#x/);
  assert.equal(transformRootFile(once), once);
});
test('front matter splits from the body, and retired addresses are found', () => {
  assert.deepEqual(splitFrontMatter('---\na: 1\n---\nbody'), { front: 'a: 1', body: 'body' });
  assert.equal(splitFrontMatter('no front matter'), null);
  assert.deepEqual(findOldUrls('see https://tuvima.github.io/tuvima-library/guides/x/ and https://docs.tuvima.com/'), ['https://tuvima.github.io/tuvima-library/guides/x/']);
});
