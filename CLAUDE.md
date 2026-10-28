# CLAUDE.md — Tuvima documentation hub

Source of `docs.tuvima.com`. Loaded into every Claude session in this repository. Product code lives in other repositories; this one holds only the public documentation and the site that presents it.

## Shape

- One site, organised by kind of thing: `/products/<id>/`, `/libraries/<id>/`, `/legal/` (only for policies shared by every product; Library's own policies live under it). `catalog.json` lists the areas and items; each item folder under `content/` has a `manifest.json` (pages, slugs relative to the item, group and section). Slug `""` is the item's landing page.
- Three-layer navigation on every page: hub bar (Tuvima logo always links home, area links, search, theme), item bar (name, switcher, Guides/Develop/Reference), then the page with a breadcrumb. Legal pages have no item bar.
- Search is one Pagefind index, scoped to the current item with a "search all of Tuvima" tick.
- Latest version only. No redirects and no date-keeping while products are in Early Access.
- No analytics, no third-party scripts; fonts and search stay on the site.

## Commands (from `site/`, Node 24)

`npm ci`, `npm test`, `npm run check`, `npm run build` (build includes a validation of every emitted link, anchor, asset and canonical), `npm run preview`.

## Rules

1. Every published page needs front matter: `title`, `description` (20+ characters), `audience`, `category`, `product_area`, `status` (`current`, `early-access` or `target-state`). Quote a description that contains a colon.
2. A page is published only if its folder's `manifest.json` lists it. Never edit `site/.generated/`.
3. Author links as source-relative `.md` paths. Links that leave an item's folder (for example `../../AGENTS.md`) become GitHub links into that product's repository, using `repo` and `docsDir` from `catalog.json`.
4. The site address and repository URL live in `site/scripts/content-contract.mjs` only.
5. Pages with a `fetch` rule in a manifest mirror a root file of a product repository. Edit the file in that repository; the committed copy is only the offline fallback. Refresh it with `node scripts/update-root-snapshots.mjs`.
6. Never add a tool or library without a licence check (AGPLv3-compatible only) and an entry in `site/LICENSES.md`.
7. Plain-English style and the product vocabulary in `CONTRIBUTING.md`: Library, Universe, Series, Work, Edition, Media Asset, Needs Review, Engine, Dashboard, Vault, Bookmarks. Never "Registry".
8. The product owner (Shy) is not a developer: explain trade-offs in product terms (Maintenance, Extensibility, Privacy, Reliability, Performance) and end plans and finished work with a Plain English Summary.

## Pages the Library app checks

Library's own tests (`PublicDocsDriftTests` in `tuvima-library`) read four pages from this repository on every Library CI run and nightly, so they cannot drift from the app: `architecture/backup-and-restore.md` (lists every backup-classified table in backticks), `guides/configuring-providers.md`, `architecture/ingestion-identity-enrichment-pipeline.md` and `reference/media-types.md` (music identity wording), `product/presentation-rules.md` (Devices under Settings > Security), and `policies/attributions.md` (ExifTool credit). Renaming or rewording those lines means updating that test in the same pair of changes.

## Adding a product

Follow `CONTRIBUTING.md` (copy `templates/product/`, add a row to `catalog.json`, list the pages in `manifest.json`, add the "docs needed" box to the product repository's PR template). `scripts/template.test.mjs` keeps the template valid.

## Related repositories

`Tuvima/tuvima-library` (Library; its `engineering/` folder stays there, unpublished), `Tuvima/tuvima-wikidata` (Tuvima.Wikidata; keeps its README and architecture notes for developers).
