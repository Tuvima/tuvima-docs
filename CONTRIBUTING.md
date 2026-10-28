# Contributing to the Tuvima documentation

This guide covers writing and moving pages, and adding a new product, developer library or policy page. The site's address, layout and navigation are described in [README.md](README.md).

## Write a page

1. Find the item's folder, for example `content/products/library/`.
2. Add the Markdown file. Start with front matter:

   ```yaml
   ---
   title: Add a library folder
   description: Add an existing media folder and understand how source permissions affect scanning.
   audience: user
   category: guide
   product_area: libraries
   status: current
   ---
   ```

   `audience` is `user`, `administrator`, `developer` or `designer`. `category` is `landing`, `tutorial`, `installation`, `guide`, `explanation`, `reference`, `architecture` or `policy`. `status` is `current`, `early-access` or `target-state`; it classifies the page, so also label partial or planned features in the body. Quote a description that contains a colon.
3. List the page in the folder's `manifest.json` with a `slug`, a `group` (Guides, Develop or Reference; Policies for legal pages) and a `section` for the menu. A file that is not listed is not published.
4. Run the checks from `site/` (Node 24): `npm ci`, `npm test`, `npm run check`, `npm run build`. Preview with `npm run preview`.

Link to other pages with source-relative paths such as `../guides/adding-media.md#add-a-source`; they also work on GitHub. Link to another product's page with a path from the content root, such as `/legal/security.md`. A link that leaves the item's folder points into that product's own repository.

To move a page, change its `slug` and fix links to it. The site keeps only the latest version and has no redirects, so search the content for the old address.

## Style

- Address the reader as "you", use active voice and lead with the outcome.
- Use task headings such as "Add a folder". Explain a product term on first use.
- Keep warnings and required commands beside the step that needs them.
- Describe current behaviour directly; label what is partial or planned.
- Use the product vocabulary: Library, Universe, Series, Work, Edition, Media Asset, Needs Review, Engine, Dashboard, Vault, Bookmarks. Never "Registry".
- No screenshots until replacements are commissioned. Logos, icons and diagrams are fine if local, licensed and accessible.

## Add a product, library or policy page

A product is an app people use (`/products/`), a library is a developer package (`/libraries/`), and a policy page belongs to no single product (`/legal/`). Adding one is a checklist:

1. **Copy the template.** Copy `templates/product/` to `content/<area>/<id>/`, for example `content/products/id/`. Rename and rewrite the three sample pages, and replace `product-name` in each page's `product_area`.
2. **Add the item to the catalog.** Copy `templates/product/catalog-entry.json` into the `items` list of `catalog.json` and fill in the area, id, name, one-line description, path, status, start page, the product's repository and its docs folder. The home page card, the area page, the item switcher and the menu all come from this row.
3. **List the pages.** Edit the new folder's `manifest.json`. The page with slug `""` is the item's landing page.
4. **Catch documentation gaps at the source.** Add a "docs needed" tick box to the product repository's pull request template, for example: `- [ ] Documentation updated in tuvima-docs (link the proposed change)`.
5. **Check.** Run `npm test`, `npm run check` and `npm run build` in `site/`.

A new policy page goes in `content/legal/` and is listed in `content/legal/manifest.json`. A new area (for example `/company/`) is a new entry in `catalog.json`'s `areas`; existing pages do not move.

If a page mirrors a file that must stay at the root of a product repository (a licence, security policy or contributing guide), add `"fetch": { "repo": "Tuvima/<repository>", "path": "<file>" }` to its manifest entry. The site fetches the file whenever it builds and rebuilds every week; run `node scripts/update-root-snapshots.mjs` to refresh the committed fallback copy.

## Tools and licences

Adding a tool or library needs a licence check (AGPLv3-compatible only) and an entry in `site/LICENSES.md`.
