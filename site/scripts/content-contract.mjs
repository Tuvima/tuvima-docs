import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// One setting decides where the hub lives. Production serves from the root of docs.tuvima.com.
export const origin = process.env.DOCS_ORIGIN ?? 'https://docs.tuvima.com';
export const base = (process.env.DOCS_BASE ?? '').replace(/\/$/, '');
export const repoUrl = 'https://github.com/Tuvima/tuvima-docs';
export const siteRoot = fileURLToPath(new URL('../', import.meta.url));
export const repoRoot = path.resolve(siteRoot, '..');
export const contentRoot = path.join(repoRoot, 'content');
export const requiredEnums = {
  audience: ['user', 'administrator', 'developer', 'designer'],
  category: ['landing', 'tutorial', 'installation', 'guide', 'explanation', 'reference', 'architecture', 'policy'],
  status: ['current', 'early-access', 'target-state'],
};
export const groupNames = ['Guides', 'Develop', 'Reference', 'Policies'];
export function normalizeSource(source) {
  const normalized = path.posix.normalize(source.replaceAll('\\', '/'));
  if (normalized.startsWith('../') || normalized.startsWith('/') || !/\.(md|mdx)$/.test(normalized)) {
    throw new Error(`Invalid publication source: ${source}`);
  }
  return normalized;
}
/** Public route of a full slug ('' is the hub home, '404' the error page). */
export function pageRoute(slug) {
  if (slug === '404') return `${base}/404.html`;
  return `${base}/${slug ? `${slug}/` : ''}`;
}
export function loadCatalog(file = path.join(repoRoot, 'catalog.json')) {
  const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
  validateCatalog(catalog);
  return catalog;
}
export function validateCatalog(catalog) {
  const areas = new Set();
  for (const area of catalog.areas ?? []) {
    if (!area.id || !area.name || !area.path || !area.description) throw new Error(`Incomplete area: ${JSON.stringify(area)}`);
    if (areas.has(area.id)) throw new Error(`Duplicate area: ${area.id}`);
    areas.add(area.id);
  }
  if (!areas.size) throw new Error('catalog.json must list areas');
  const ids = new Set();
  const paths = new Set();
  for (const item of catalog.items ?? []) {
    for (const key of ['area', 'id', 'name', 'description', 'path', 'status', 'groups']) if (!item[key]) throw new Error(`Item ${item.id ?? '?'} is missing ${key}`);
    if (!areas.has(item.area)) throw new Error(`Item ${item.id} uses unknown area ${item.area}`);
    if (!item.path.startsWith(`${catalog.areas.find(a => a.id === item.area).path}/`) && item.path !== item.area) throw new Error(`Item ${item.id} path must sit under its area`);
    if (ids.has(item.id) || paths.has(item.path)) throw new Error(`Duplicate item: ${item.id}`);
    ids.add(item.id); paths.add(item.path);
  }
  for (const link of catalog.popular ?? []) if (!link.label || !link.path) throw new Error(`Incomplete popular link: ${JSON.stringify(link)}`);
}
/** Validate one item's manifest. Slugs are relative to the item's folder; '' is the item's landing page. */
export function validateManifest(manifest, item = { id: 'item', groups: ['Guides', 'Develop', 'Reference'] }) {
  if (!Array.isArray(manifest.pages) || !manifest.pages.length) throw new Error(`${item.id}: manifest must list pages`);
  const sources = new Set();
  const slugs = new Set();
  for (const page of manifest.pages) {
    const source = normalizeSource(page.source);
    if (sources.has(source)) throw new Error(`Duplicate source: ${source}`);
    if (typeof page.slug !== 'string' || /(^\/|\/$|\.\.|[?#])/.test(page.slug)) throw new Error(`Invalid slug: ${page.slug}`);
    if (slugs.has(page.slug)) throw new Error(`Duplicate route: ${item.id}/${page.slug}`);
    if (page.slug !== '' && (!item.groups.includes(page.group) || typeof page.section !== 'string' || !page.section.trim())) throw new Error(`Missing navigation placement: ${source}`);
    if (page.fetch && (typeof page.fetch.repo !== 'string' || typeof page.fetch.path !== 'string')) throw new Error(`Invalid fetch rule: ${source}`);
    sources.add(source); slugs.add(page.slug);
  }
}
export function validateMetadata(data, source) {
  for (const key of ['title', 'description', 'product_area']) {
    if (typeof data[key] !== 'string' || data[key].trim().length < (key === 'description' ? 20 : 1)) throw new Error(`${source}: required ${key} is missing or too short`);
  }
  for (const [key, values] of Object.entries(requiredEnums)) {
    if (!values.includes(data[key])) throw new Error(`${source}: ${key} must be one of ${values.join(', ')}`);
  }
}
