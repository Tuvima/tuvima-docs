// Pages that mirror files which must stay at the root of a product repository
// (CONTRIBUTING.md, SECURITY.md, ...). The site rebuilds weekly, so these are fetched
// when the site is built; the committed copy is the fallback when GitHub cannot be reached.
const blob = 'https://github.com/Tuvima/tuvima-library/blob/main';
const legacyMoves = { 'reference/attributions/': 'products/library/policies/attributions/', 'product/license/': 'products/library/policies/license/', 'product/security/': 'products/library/policies/security/' };

/** Point links in a root file at their pages on the hub. Safe to run on already-converted text. */
export function transformRootFile(text) {
  return text.replace(/\r\n/g, '\n')
    .replace(/\]\((?:\.\.\/)*CODE_OF_CONDUCT\.md\)/g, '](/products/library/policies/code-of-conduct.md)')
    .replace(/\]\((?:\.\.\/)*SECURITY\.md\)/g, '](/products/library/policies/security.md)')
    .replace(/\]\((?:\.\.\/)*(LICENSE|AGENTS\.md|CLAUDE\.md)\)/g, `](${blob}/$1)`)
    .replace(/https:\/\/tuvima\.github\.io\/tuvima-library\/([^\s)"']*)/g, (_, rest) => `/${legacyMoves[rest.split('#')[0]] ? legacyMoves[rest.split('#')[0]] + (rest.includes('#') ? '#' + rest.split('#')[1] : '') : `products/library/${rest}`}`);
}
/** Body of the file as published by its repository, or null when offline or not found. */
export async function fetchRootFile(spec, fetchImpl = globalThis.fetch) {
  if (process.env.DOCS_OFFLINE) return null;
  try {
    const response = await fetchImpl(`https://raw.githubusercontent.com/${spec.repo}/main/${spec.path}`, { signal: AbortSignal.timeout(15000) });
    return response.ok ? await response.text() : null;
  } catch { return null; }
}
/** Split a staged page into its front matter text and body. */
export function splitFrontMatter(text) {
  const match = text.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return match ? { front: match[1], body: text.slice(match[0].length) } : null;
}
