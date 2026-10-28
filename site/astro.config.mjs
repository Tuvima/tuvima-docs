import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import fs from 'node:fs';
import path from 'node:path';
import rewriteLinks from './scripts/rewrite-links.mjs';
import { base, origin, repoUrl, loadCatalog, contentRoot } from './scripts/content-contract.mjs';

// One sidebar group per item and group (for example "products/library::Guides"). The route
// middleware (src/routeData.ts) shows only the group the reader is in.
const catalog = loadCatalog();
const sidebar = catalog.items.flatMap(item => {
  const manifest = JSON.parse(fs.readFileSync(path.join(contentRoot, item.path, 'manifest.json'), 'utf8'));
  return item.groups.map(group => {
    const pages = manifest.pages.filter(p => p.group === group && p.slug);
    return {
      label: `${item.path}::${group}`,
      items: [...new Set(pages.map(p => p.section))].map(section => ({
        label: section,
        collapsed: true,
        items: pages.filter(p => p.section === section).map(p => ({ slug: `${item.path}/${p.slug}`, ...(p.label ? { label: p.label } : {}) })),
      })),
    };
  }).filter(group => group.items.length);
});
export default defineConfig({
  site: origin,
  base: base || '/',
  trailingSlash: 'always',
  publicDir: './.generated/public',
  markdown: { processor: unified({ remarkPlugins: [rewriteLinks] }) },
  integrations: [starlight({
    title: 'Tuvima',
    description: 'Help for every Tuvima product: guides, developer libraries, reference and policies.',
    favicon: '/favicon.svg',
    social: [{ icon: 'github', label: 'GitHub', href: repoUrl }],
    editLink: { baseUrl: `${repoUrl}/edit/main/content/` },
    lastUpdated: true,
    locales: { root: { label: 'English', lang: 'en' } },
    customCss: ['./src/styles/tuvima.css'],
    head: [{ tag: 'meta', attrs: { name: 'theme-color', content: '#0B1220' } }],
    components: {
      ThemeProvider: './src/components/ThemeProvider.astro',
      ThemeSelect: './src/components/ThemeSelect.astro',
      Header: './src/components/Header.astro',
      Hero: './src/components/Hero.astro',
      SiteTitle: './src/components/SiteTitle.astro',
      Search: './src/components/HubSearch.astro',
      PageTitle: './src/components/PageTitle.astro',
      Sidebar: './src/components/Sidebar.astro',
    },
    routeMiddleware: './src/routeData.ts',
    sidebar,
  })],
});
