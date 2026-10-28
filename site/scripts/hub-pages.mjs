import { readFileSync } from 'node:fs';
// Pages generated from catalog.json: the hub home, one landing page per area, and the not-found page.
// Every card list is built from the catalog, so adding a product is one new row there.
const statusLabels = { 'early-access': 'Early Access', current: 'Current', 'target-state': 'Planned' };
const esc = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const itemStart = item => `/${item.path}/${item.startPage ? `${item.startPage}/` : ''}`;
const searchButton = '<button type="button" class="hub-search" data-hub-search><span>Search all of Tuvima documentation</span><kbd>Ctrl K</kbd></button>\n';

const wordmark = file => readFileSync(new URL(`../src/assets/${file}`, import.meta.url), 'utf8').replace(/\s*\n\s*/g, '');

function card(item) {
  const title = item.wordmark
    ? `<a href="/${esc(item.path)}/" class="hub-card-wordmark" aria-label="${esc(item.name)}">${wordmark(item.wordmark)}</a>`
    : `<a href="/${esc(item.path)}/"><img class="hub-card-logo" src="${esc(item.logo ?? '/favicon.svg')}" alt="" width="28" height="28" />${esc(item.name)}</a>`;
  return `<div class="hub-card"><h3>${title}</h3><p>${esc(item.description)}</p><p class="hub-card-meta"><span class="hub-status">${esc(statusLabels[item.status] ?? item.status)}</span><a href="${esc(itemStart(item))}">Get started</a></p></div>`;
}
const cardGrid = items => `<div class="hub-cards">\n${items.map(card).join('\n')}\n</div>\n`;
/** Policy links for the legal area: shared pages if any, otherwise a pointer to the policies that live with a product. */
function policyLinks(catalog, manifests, titleOf, area) {
  const link = (item, p) => `<li><a href="/${esc(item.path)}/${esc(p.slug)}/">${esc(titleOf(item, p))}</a></li>`;
  const shared = catalog.items.filter(i => i.area === area.id).flatMap(item => manifests[item.id].pages.map(p => link(item, p)));
  if (shared.length) return `<ul class="hub-links">\n${shared.join('\n')}\n</ul>\n`;
  const own = catalog.items.filter(i => i.area !== area.id).flatMap(item => manifests[item.id].pages.filter(p => p.slug.startsWith('policies/')).map(p => link(item, p)));
  const note = 'Nothing is shared across every product yet. For now the policies are specific to Tuvima Library and live with it:';
  return own.length ? `${note}\n\n<ul class="hub-links">\n${own.join('\n')}\n</ul>\n` : '';
}
const areaItems = (catalog, area) => catalog.items.filter(i => i.area === area.id && i.bar !== false);
export function homePage(catalog, manifests, titleOf) {
  const sections = catalog.areas.map(area => {
    if (area.id === 'legal') {
      return `## [${area.name}](/${area.path}/)\n\n${policyLinks(catalog, manifests, titleOf, area)}`;
    }
    return `## [${area.name}](/${area.path}/)\n\n${cardGrid(areaItems(catalog, area))}`;
  });
  const popular = (catalog.popular ?? []).map(l => `<li><a href="/${esc(l.path)}/">${esc(l.label)}</a>${l.description ? ` <span>${esc(l.description)}</span>` : ''}</li>`);
  return {
    source: 'index.mdx', slug: '', title: 'Tuvima documentation', description: 'Help for every Tuvima product: guides, developer libraries, reference and policies in one place.',
    frontMatter: { hero: { title: 'Help for everything Tuvima', tagline: 'Guides, references and policies for every Tuvima product, with one search box.' } },
    body: `${searchButton}\n${sections.join('\n')}\n## Popular starting points\n\n<ul class="hub-links">\n${popular.join('\n')}\n</ul>\n\n<p class="hub-footer">Tuvima documentation is open source. <a href="https://github.com/Tuvima/tuvima-docs">View it on GitHub</a>.</p>\n`,
  };
}
export function areaPage(catalog, manifests, area, titleOf) {
  const items = catalog.items.filter(i => i.area === area.id);
  let list;
  if (area.id === 'legal' || items.every(i => i.bar === false)) {
    list = policyLinks(catalog, manifests, titleOf, area);
  } else list = cardGrid(items);
  return {
    source: `${area.path}/index.mdx`, slug: area.path, area: area.id, title: area.name, description: area.description,
    body: `${area.description}\n\n${list}`,
  };
}
export function notFoundPage() {
  return {
    source: '404.md', slug: '404', title: 'Page not found', description: 'This page does not exist. Search the documentation or pick a product.',
    body: `That page is not here, or it has moved. Search all of the documentation, or start from the [home page](/).\n\n${searchButton}`,
  };
}
