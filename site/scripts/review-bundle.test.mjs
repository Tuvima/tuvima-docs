import test from 'node:test';
import assert from 'node:assert/strict';
import * as cheerio from 'cheerio';
import { pageId, rewriteContent } from './review-bundle.mjs';

test('page ids are plain #names the review page can route on', () => {
  assert.equal(pageId('/products/social/guides/posting/'), 'p-products-social-guides-posting');
  assert.equal(pageId('/'), 'p-home');
});

test('links to bundled pages stay inside the review; other links open the published site', () => {
  const $ = cheerio.load('<div class="c"><a class="sl-anchor-link" href="#x">#</a><a href="/products/id/guides/email/#pause">in</a><a href="/products/library/">out</a><a href="https://example.org/">web</a></div>');
  const html = rewriteContent($, $('.c'), new Set(['/products/id/guides/email/']));
  assert.match(html, /href="#p-products-id-guides-email"/);
  assert.match(html, /href="https:\/\/docs\.tuvima\.com\/products\/library\/" target="_blank"/);
  assert.match(html, /href="https:\/\/example\.org\/" target="_blank" rel="noopener"/);
  assert.doesNotMatch(html, /sl-anchor-link/);
});
