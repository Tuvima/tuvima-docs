import zlib from 'node:zlib';
import fs from 'node:fs/promises';
import path from 'node:path';

const packages = [
  'astro', '@astrojs/internal-helpers', '@astrojs/starlight',
  'pagefind', '@pagefind/default-ui',
  'bcp-47', 'is-alphabetical', 'is-alphanumerical', 'is-decimal',
  'expressive-code', 'astro-expressive-code', 'rehype-expressive-code',
  '@expressive-code/core', '@expressive-code/plugin-frames',
  '@expressive-code/plugin-shiki', '@expressive-code/plugin-text-markers',
  'shiki', '@shikijs/core', '@shikijs/types', '@shikijs/langs',
  '@shikijs/themes', '@shikijs/engine-javascript', '@shikijs/engine-oniguruma',
  '@shikijs/primitive', '@shikijs/vscode-textmate',
];

async function licenseFiles(directory, relative = '') {
  const found = [];
  for (const entry of await fs.readdir(path.join(directory, relative), { withFileTypes: true })) {
    const name = path.join(relative, entry.name);
    if (entry.isDirectory() && /^(licenses?|notices?)$/i.test(entry.name)) found.push(...await licenseFiles(directory, name));
    else if (entry.isFile() && (/^(licen[sc]e|copying|notice|copyright)(?:[.-].*)?$/i.test(entry.name) || /^(licenses?|notices?)[\\/]/i.test(name))) found.push(name);
  }
  return found.sort();
}

// A WOFF2 file keeps its "name" table untransformed inside one Brotli stream, so it is
// unpacked back to a plain table set first (only what the name reader below needs).
function woff2Tables(buffer) {
  const numTables = buffer.readUInt16BE(12);
  let pos = 48;
  const base128 = () => { let value = 0; for (let i = 0; i < 5; i++) { const b = buffer[pos++]; value = (value << 7) | (b & 0x7f); if (!(b & 0x80)) return value; } throw new Error('Bad WOFF2 number'); };
  // The WOFF2 specification's table of known tags, in order.
  const known = ['cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm', 'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp', 'hdmx', 'kern', 'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC', 'JSTF', 'MATH', 'CBDT', 'CBLC', 'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar', 'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar', 'gvar', 'hsty', 'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat', 'Gloc', 'Feat', 'Sill'];
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const flags = buffer[pos++];
    const tag = (flags & 0x3f) === 0x3f ? buffer.toString('ascii', pos, (pos += 4)) : known[flags & 0x3f];
    const length = base128();
    const transform = (flags >> 6) & 3;
    const transformed = (tag === 'glyf' || tag === 'loca') ? transform !== 3 : transform !== 0;
    tables.push({ tag, length: transformed ? base128() : length });
  }
  const data = zlib.brotliDecompressSync(buffer.subarray(pos, pos + buffer.readUInt32BE(20)));
  let at = 0;
  const out = new Map();
  for (const t of tables) { out.set(t.tag, data.subarray(at, at + t.length)); at += t.length; }
  return out;
}

function fontCopyright(input) {
  let buffer = input;
  if (input.toString('ascii', 0, 4) === 'wOF2') {
    const name = woff2Tables(input).get('name');
    if (!name) throw new Error('Bundled font has no name table');
    // A one-table font file around the name table, read by the code below.
    buffer = Buffer.concat([Buffer.alloc(28), name]);
    buffer.writeUInt16BE(1, 4);
    buffer.write('name', 12, 'ascii');
    buffer.writeUInt32BE(28, 20);
  }
  let offset;
  for (let i = 0; i < buffer.readUInt16BE(4); i++) {
    const record = 12 + i * 16;
    if (buffer.toString('ascii', record, record + 4) === 'name') offset = buffer.readUInt32BE(record + 8);
  }
  if (offset === undefined) throw new Error('Bundled font has no name table');
  const start = offset + buffer.readUInt16BE(offset + 4);
  const notices = new Set();
  for (let i = 0; i < buffer.readUInt16BE(offset + 2); i++) {
    const record = offset + 6 + i * 12;
    if (buffer.readUInt16BE(record + 6) !== 0) continue;
    const platform = buffer.readUInt16BE(record);
    const length = buffer.readUInt16BE(record + 8);
    const begin = start + buffer.readUInt16BE(record + 10);
    const value = Buffer.from(buffer.subarray(begin, begin + length));
    notices.add(platform === 0 || platform === 3 ? value.swap16().toString('utf16le') : value.toString('latin1'));
  }
  if (!notices.size) throw new Error('Bundled font has no copyright record');
  return [...notices].join('\n');
}

/** Emit complete upstream notices with no network access or invented copyright. */
export async function generateNotices(websiteRoot, outputDirectory) {
  const notices = ['Tuvima documentation: third-party notices',
    'These upstream notices cover the documentation framework, browser search/UI and syntax-rendering dependencies. Some listed tools run only during the build. Original license/copyright text follows verbatim.'];
  for (const name of packages) {
    const directory = path.join(websiteRoot, 'node_modules', name);
    const metadata = JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8'));
    const files = await licenseFiles(directory);
    notices.push(`\n===== ${name} ${metadata.version} (${metadata.license}) =====`);
    if (!files.length && name === '@pagefind/default-ui') {
      // The UI package omits a license file; it is part of the same Pagefind
      // repository, author and MIT grant. Preserve Pagefind's full notice.
      notices.push('Source: Pagefind repository MIT license; default-ui package metadata declares MIT and author Pagefind.');
      notices.push(await fs.readFile(path.join(websiteRoot, 'node_modules/pagefind/LICENSE/LICENSE'), 'utf8'));
    } else if (!files.length) throw new Error(`${name}: no upstream license notice found`);
    for (const file of files) notices.push(`\n--- ${name}/${file.replaceAll('\\', '/')} ---\n${await fs.readFile(path.join(directory, file), 'utf8')}`);
  }
  notices.push('\n===== Svelte runtime bundled in Pagefind Default UI (MIT) =====',
    'Source: original npm svelte@4.2.1 package LICENSE.md, retained because default-ui bundles Svelte 4 runtime code.',
    await fs.readFile(path.join(websiteRoot, 'scripts/licenses/Svelte-MIT.txt'), 'utf8'));
  for (const [font, license, dir = 'src/fonts'] of [['InterVariable-Latin.woff2', 'Inter-OFL.txt'], ['JetBrainsMono-Regular.ttf', 'JetBrainsMono-OFL.txt'], ['TuvimaSans-Variable.ttf', 'OFL.txt', '../font']]) {
    notices.push(`\n===== ${font} (SIL OFL 1.1) =====`,
      `Copyright embedded in the actual bundled font:\n${fontCopyright(await fs.readFile(path.join(websiteRoot, dir, font)))}`,
      await fs.readFile(path.join(websiteRoot, dir, license), 'utf8'));
  }
  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(path.join(outputDirectory, 'THIRD-PARTY.txt'), `${notices.join('\n\n')}\n`);
  return { packages: packages.length, fonts: 3 };
}
