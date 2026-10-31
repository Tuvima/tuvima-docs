// Builds one self-contained review page for proposed documentation, so the product owner can
// read new and changed pages before they are published. Run after `npm run build`:
//
//   npm run review -- products/social products/id            (every page of these items)
//   npm run review -- --since origin/main products/social      (marks pages new or changed since a branch)
//
// Writes site/review/review.html. Pages show one at a time with a menu; nothing is fetched from
// the internet. The file is a page body without <!doctype>, ready to share as a private preview.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import * as cheerio from 'cheerio';
import { loadCatalog, contentRoot, repoRoot, siteRoot, origin, normalizeSource } from './content-contract.mjs';

const distRoot = path.join(siteRoot, 'dist');

/** "products/social/guides/posting" -> "p-products-social-guides-posting" (a plain #name the viewer allows). */
export function pageId(route) {
  return `p-${route.replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9]+/g, '-') || 'home'}`;
}

/** Which manifest sources are new or changed since a git ref: Map(source -> 'New' | 'Changed'). */
export function changedSources(itemPath, since) {
  if (!since) return new Map();
  const out = execFileSync('git', ['diff', '--name-status', since, '--', `content/${itemPath}`], { cwd: repoRoot, encoding: 'utf8' });
  const result = new Map();
  for (const line of out.split('\n').filter(Boolean)) {
    const [status, file] = line.split('\t');
    result.set(file.slice(`content/${itemPath}/`.length), status.startsWith('A') ? 'New' : 'Changed');
  }
  // Untracked files have no history yet, so they are new.
  const untracked = execFileSync('git', ['ls-files', '--others', '--exclude-standard', '--', `content/${itemPath}`], { cwd: repoRoot, encoding: 'utf8' });
  for (const file of untracked.split('\n').filter(Boolean)) result.set(file.slice(`content/${itemPath}/`.length), 'New');
  return result;
}

/** Rewrites one built page's content: links to pages in the bundle become #ids, images become data: URIs. */
export function rewriteContent($, root, routes) {
  root.find('.sl-anchor-link, .sr-only').remove();
  root.find('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (/^(https?:|mailto:)/.test(href)) {
      $(el).attr({ target: '_blank', rel: 'noopener' });
      return;
    }
    if (href.startsWith('#')) return;
    const [route] = href.split('#');
    if (routes.has(route)) $(el).attr('href', `#${pageId(route)}`);
    else $(el).attr({ href: new URL(href, origin).toString(), target: '_blank', rel: 'noopener' });
  });
  root.find('img[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (!src.startsWith('/')) return;
    const file = path.join(distRoot, decodeURIComponent(src));
    if (!fs.existsSync(file)) return;
    const type = file.endsWith('.svg') ? 'image/svg+xml' : `image/${path.extname(file).slice(1).replace('jpg', 'jpeg')}`;
    $(el).attr('src', `data:${type};base64,${fs.readFileSync(file).toString('base64')}`);
  });
  return root.html();
}

function collect(itemPaths, since) {
  const catalog = loadCatalog();
  const items = itemPaths.map(p => {
    const item = catalog.items.find(i => i.path === p || i.id === p);
    if (!item) throw new Error(`No catalog item ${p}`);
    return item;
  });
  const pages = [];
  for (const item of items) {
    const manifest = JSON.parse(fs.readFileSync(path.join(contentRoot, item.path, 'manifest.json'), 'utf8'));
    const changed = changedSources(item.path, since);
    for (const page of manifest.pages) {
      const source = normalizeSource(page.source);
      const route = `/${item.path}/${page.slug ? `${page.slug}/` : ''}`;
      pages.push({ item, page, route, section: page.slug ? page.section : 'Overview', mark: changed.get(source) });
    }
  }
  return pages;
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function render(itemPaths, { since } = {}) {
  const pages = collect(itemPaths, since);
  const routes = new Set(pages.map(p => p.route));
  const articles = [];
  for (const p of pages) {
    const file = path.join(distRoot, p.route, 'index.html');
    if (!fs.existsSync(file)) throw new Error(`${p.route} is not built. Run npm run build first.`);
    const $ = cheerio.load(fs.readFileSync(file, 'utf8'));
    const title = $('main h1').first().text().trim() || $('title').text();
    const tagline = $('.hero .tagline').first().text().trim();
    const description = $('meta[name="description"]').attr('content') ?? '';
    p.title = title;
    const body = rewriteContent($, $('.sl-markdown-content').first(), routes);
    articles.push(`<article id="${pageId(p.route)}" class="page" hidden>
  <p class="crumb">${esc(p.item.name)} · ${esc(p.section)}${p.mark ? ` <span class="mark mark-${p.mark.toLowerCase()}">${p.mark}</span>` : ''}</p>
  <h1>${esc(title)}</h1>
  ${tagline ? `<p class="tagline">${esc(tagline)}</p>` : ''}
  <p class="summary">${esc(description)}</p>
  <div class="content">${body}</div>
  <p class="live">Will publish at <span>${esc(new URL(p.route, origin).toString())}</span></p>
</article>`);
  }
  const nav = [...new Set(pages.map(p => p.item.name))].map(name => {
    const own = pages.filter(p => p.item.name === name);
    const sections = [...new Set(own.map(p => p.section))];
    return `<div class="nav-item"><p class="nav-product">${esc(name)}</p>${sections.map(section => `<p class="nav-section">${esc(section)}</p><ul>${own.filter(p => p.section === section).map(p => `<li><a href="#${pageId(p.route)}">${esc(p.title)}${p.mark ? ` <span class="mark mark-${p.mark.toLowerCase()}">${p.mark}</span>` : ''}</a></li>`).join('')}</ul>`).join('')}</div>`;
  }).join('');
  const counts = { New: pages.filter(p => p.mark === 'New').length, Changed: pages.filter(p => p.mark === 'Changed').length };
  const names = [...new Set(pages.map(p => p.item.name))].join(' and ');
  const template = fs.readFileSync(path.join(siteRoot, 'scripts/review-template.html'), 'utf8');
  const values = {
    title: esc(`${names} docs review`),
    names: esc(names),
    summary: esc(`${pages.length} pages${since ? `, ${counts.New} new and ${counts.Changed} changed` : ''}. Not public yet.`),
    nav,
    pages: articles.join('\n'),
    first: pageId(pages[0].route),
  };
  // A function replacement, so "$" in page text is never read as a pattern.
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key]);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const sinceAt = args.indexOf('--since');
  const since = sinceAt >= 0 ? args.splice(sinceAt, 2)[1] : undefined;
  if (!args.length) throw new Error('Name at least one item, for example products/social');
  const out = path.join(siteRoot, 'review', 'review.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, render(args, { since }));
  console.log(`Wrote ${path.relative(repoRoot, out)}`);
}
