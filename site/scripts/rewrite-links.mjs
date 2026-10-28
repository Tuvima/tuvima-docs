import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { base } from './content-contract.mjs';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
/**
 * Links are authored as source-relative Markdown paths so they also work on GitHub.
 * Published pages become site routes, files inside the content folder become same-origin assets,
 * and links that leave a product's folder (the product's own repository files) become GitHub addresses.
 */
export default function rewriteLinks(options = {}) {
  const root = options.root ?? defaultRoot;
  const contentRoot = options.contentRoot ?? path.join(root, '..', 'content');
  return (tree, file) => {
    const routes = JSON.parse(fs.readFileSync(path.join(root, '.generated/routes.json'), 'utf8'));
    const items = routes.catalog?.items ?? [];
    const source = path.relative(path.join(root, '.generated/content'), file.path).replaceAll('\\', '/');
    const item = items.find(i => source.startsWith(`${i.path}/`));
    function rewrite(url, isImage = false) {
      if (!url || /^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(url)) return url;
      if (base && url.startsWith(`${base}/`)) return url;
      const suffixStart = url.search(/[?#]/);
      const localPath = suffixStart < 0 ? url : url.slice(0, suffixStart);
      const suffix = suffixStart < 0 ? '' : url.slice(suffixStart);
      const rooted = localPath.startsWith('/');
      const target = path.posix.normalize(rooted ? decodeURI(localPath.slice(1)) : path.posix.join(path.posix.dirname(source), decodeURI(localPath)));
      const document = routes.sourceRoutes[target];
      if (document) return `${document}${suffix}`;
      if (rooted) return `${base}${url}`;
      // Leaving the product's folder means a file in the product's own repository.
      if (item && !target.startsWith(`${item.path}/`)) {
        const inItem = path.posix.normalize(path.posix.join(path.posix.dirname(source.slice(item.path.length + 1)), decodeURI(localPath)));
        if (inItem.startsWith('../')) {
          const repoPath = path.posix.normalize(path.posix.join(item.docsDir ?? '', inItem));
          if (repoPath.startsWith('../')) throw new Error(`${source}: link escapes repository ${url}`);
          return `${item.repo}/blob/main/${repoPath}${suffix}`;
        }
      }
      const disk = path.join(contentRoot, target);
      if (!fs.existsSync(disk)) throw new Error(`${source}: local target does not exist: ${url}`);
      if (isImage || /\.(?:svg|png|jpe?g|gif|webp|avif|json|pdf)$/i.test(target)) {
        if (/screenshots?\//i.test(target)) throw new Error(`${source}: screenshot references are retired: ${url}`);
        const publicPath = path.join(root, '.generated/public/assets', target);
        fs.mkdirSync(path.dirname(publicPath), { recursive: true }); fs.copyFileSync(disk, publicPath);
        return `${base}/assets/${target}${suffix}`;
      }
      throw new Error(`${source}: link target is not a published page: ${url}`);
    }
    function visit(node) {
      if ((node.type === 'link' || node.type === 'definition' || node.type === 'image') && node.url) node.url = rewrite(node.url, node.type === 'image');
      if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        for (const attr of node.attributes ?? []) if (['href', 'src'].includes(attr.name) && typeof attr.value === 'string') attr.value = rewrite(attr.value, attr.name === 'src');
      }
      if (node.type === 'html') node.value = node.value.replace(/\b(href|src)=(['"])([^'"]+)\2/g, (_, name, quote, url) => `${name}=${quote}${rewrite(url, name === 'src')}${quote}`);
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
