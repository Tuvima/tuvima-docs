import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';
import { validateManifest, validateMetadata, loadCatalog, repoUrl, base, normalizeSource, pageRoute, siteRoot, repoRoot, contentRoot } from './content-contract.mjs';
import { generateNotices } from './generate-notices.mjs';
import { fetchRootFile, transformRootFile, splitFrontMatter } from './root-files.mjs';
import { homePage, areaPage, notFoundPage } from './hub-pages.mjs';

export { siteRoot, repoRoot };
const generatedRoot = path.join(siteRoot, '.generated');
const catalog = loadCatalog();
if (path.dirname(generatedRoot) !== path.resolve(siteRoot) || path.basename(generatedRoot) !== '.generated') throw new Error('Unsafe generated output path');
await fs.rm(generatedRoot, { recursive: true, force: true });
await fs.mkdir(path.join(generatedRoot, 'content'), { recursive: true });
await fs.cp(path.join(siteRoot, 'public'), path.join(generatedRoot, 'public'), { recursive: true });
await fs.mkdir(path.join(generatedRoot, 'public/licenses'), { recursive: true });
await generateNotices(siteRoot, path.join(generatedRoot, 'public/licenses'));
for (const fontLicense of ['Montserrat-OFL.txt', 'JetBrainsMono-OFL.txt']) await fs.copyFile(path.join(siteRoot, 'src/fonts', fontLicense), path.join(generatedRoot, 'public/licenses', fontLicense));

function gitDate(file) {
  try { return execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { cwd: repoRoot, encoding: 'utf8' }).trim() || false; } catch { return false; }
}
function rewriteMetadata(value) {
  if (Array.isArray(value)) return value.map(rewriteMetadata);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, ['link', 'href', 'src'].includes(key) && typeof entry === 'string' && entry.startsWith('/') && !entry.startsWith('//') && !(base && entry.startsWith(`${base}/`)) ? `${base}${entry}` : rewriteMetadata(entry)]));
  return value;
}
async function stage(record, metadata, body) {
  const destination = path.join(generatedRoot, 'content', record.source);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  // Starlight owns the visible H1; keep leading comments but remove the authored title.
  const cleaned = body.replace(/^(\s*(?:<!--[\s\S]*?-->\s*)*)# [^\n]+\r?\n/, '$1');
  await fs.writeFile(destination, `---\n${YAML.stringify(rewriteMetadata(metadata))}---\n${cleaned}`);
}

const records = [];
const manifests = {};
for (const item of catalog.items) {
  const itemDir = path.join(contentRoot, item.path);
  const manifest = JSON.parse(await fs.readFile(path.join(itemDir, 'manifest.json'), 'utf8'));
  validateManifest(manifest, item);
  manifests[item.id] = manifest;
  for (const page of manifest.pages) {
    const source = normalizeSource(page.source);
    const contentSource = `${item.path}/${source}`;
    let text = await fs.readFile(path.join(itemDir, source), 'utf8');
    let staged = splitFrontMatter(text);
    if (!staged) throw new Error(`${contentSource}: YAML front matter is required`);
    if (page.fetch) {
      const fresh = await fetchRootFile(page.fetch);
      if (fresh !== null) staged = { ...staged, body: `\n${fresh.replace(/\r\n/g, '\n')}` };
      staged = { ...staged, body: transformRootFile(staged.body) };
      if (fresh === null) console.warn(`Using the committed copy of ${page.fetch.repo}/${page.fetch.path}.`);
    }
    const metadata = YAML.parse(staged.front);
    validateMetadata(metadata, contentSource);
    const slug = [item.path, page.slug].filter(Boolean).join('/');
    metadata.slug = slug;
    metadata.editUrl = `${repoUrl}/edit/main/content/${contentSource}`;
    metadata.lastUpdated = gitDate(`content/${contentSource}`);
    if (page.slug === '') metadata.template = 'splash';
    const record = { ...page, source: contentSource, item: item.id, area: item.area, slug, route: pageRoute(slug), title: metadata.title, description: metadata.description, status: metadata.status, audience: metadata.audience, category: metadata.category, product_area: metadata.product_area, tags: metadata.tags ?? [], lastUpdated: metadata.lastUpdated };
    await stage(record, metadata, staged.body);
    records.push(record);
  }
}
// Hub pages come from the catalog: home, one landing page per area, and the not-found page.
const titleOf = (item, page) => records.find(r => r.source === `${item.path}/${page.source}`).title;
const generated = [homePage(catalog, manifests, titleOf), ...catalog.areas.map(area => areaPage(catalog, manifests, area, titleOf)), notFoundPage(catalog)];
for (const page of generated) {
  const metadata = { title: page.title, description: page.description, template: 'splash', audience: 'user', category: 'landing', product_area: 'hub', status: 'current', slug: page.slug, editUrl: false, lastUpdated: false, ...(page.frontMatter ?? {}) };
  const record = { source: page.source, slug: page.slug, route: pageRoute(page.slug), title: page.title, description: page.description, status: 'current', audience: 'user', category: 'landing', product_area: 'hub', tags: [], lastUpdated: false, generated: true, area: page.area };
  await stage(record, metadata, page.body);
  records.push(record);
}
const sourceRoutes = Object.fromEntries(records.filter(p => !p.generated).map(p => [p.source, p.route]));
await fs.writeFile(path.join(generatedRoot, 'routes.json'), JSON.stringify({ base, catalog, pages: records, sourceRoutes }, null, 2));
// Astro may reuse cached Markdown rendering; prepare referenced assets independently
// so repeated builds never depend on a remark transform running again.
const { default: rewriteLinks } = await import('./rewrite-links.mjs');
const { createMarkdownProcessor } = await import('@astrojs/markdown-remark');
const processor = await createMarkdownProcessor({ remarkPlugins: [rewriteLinks], syntaxHighlight: false });
for (const page of records) {
  const stagedPath = path.join(generatedRoot, 'content', page.source);
  const text = await fs.readFile(stagedPath, 'utf8');
  await processor.render(text.replace(/^---\n[\s\S]*?\n---\n/, ''), { fileURL: pathToFileURL(stagedPath) });
}
console.log(`Prepared ${records.length} pages (${records.filter(p => p.generated).length} generated from the catalog).`);
