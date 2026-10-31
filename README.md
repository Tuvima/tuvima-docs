# Tuvima documentation

The source of [docs.tuvima.com](https://docs.tuvima.com): one place, one look and one search box for help with every Tuvima product.

- **Products** (`/products/…`): the apps people use: Tuvima (the community platform), Tuvima ID and Library.
- **Libraries** (`/libraries/…`): developer libraries, starting with Tuvima.Wikidata.
- **Legal and policies** (`/legal/`): a placeholder for policies that apply to every product. Library's licence, privacy, security, code of conduct and notices live under Library (`/products/library/policies/`).

Only the latest version of each product is documented.

## Where things are

| Folder or file | What it holds |
| --- | --- |
| `content/<area>/<item>/` | The pages of one product or library, with a `manifest.json` that lists them and places them in the menu |
| `catalog.json` | The areas and items that appear on the home page, the area pages and the item switcher |
| `templates/product/` | Starter files for a new product |
| `site/` | The site platform (Astro Starlight): build scripts, theme, navigation and search |
| `CONTRIBUTING.md` | How to write pages and how to add a product, library or policy page |

Pages that mirror a file which must stay at the root of a product repository (`CONTRIBUTING.md`, `SECURITY.md`, the code of conduct and third-party notices of Library) are fetched from that repository whenever the site is built. The site rebuilds every week; the committed copy is only a fallback when GitHub cannot be reached.

## Build and preview

Node 24 is needed. From `site/`:

```sh
npm ci
npm test            # platform tests
npm run check       # page metadata, links to retired addresses, Astro diagnostics
npm run build       # the site, search index and a check of every link in the output
npm run preview     # serve the finished site
```

The same steps run for every proposed change. Merging to `main` publishes the site to GitHub Pages; the weekly run also audits outside links.

## Privacy

The site has no analytics and no third-party scripts. Fonts and search are served from the site itself.

## Licence

Tuvima documentation is published under the repository's [AGPLv3](LICENSE) licence. Tool and font notices are in [site/LICENSES.md](site/LICENSES.md).
