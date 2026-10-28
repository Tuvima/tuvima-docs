import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { base, origin } from './content-contract.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
// GitHub Pages serves this file for arbitrary missing nested paths. Its canonical
// must identify the emitted file rather than Astro's internal /404/ route.
const notFound = path.join(root, 'dist', '404.html');
const notFoundHtml = await fs.readFile(notFound, 'utf8');
await fs.writeFile(notFound, notFoundHtml.replace(/(<link\s+rel="canonical"\s+href=")[^"]+("[^>]*>)/, `$1${origin}${base}/404.html$2`));
