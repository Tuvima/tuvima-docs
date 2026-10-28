---
title: Writing documentation
description: Write accurate task-focused documentation, update the folder manifest and verify links before publishing.
audience: developer
category: guide
product_area: documentation
status: current
---

# Writing documentation

Use this guide to add or improve a documentation page. A small edit takes a few minutes to write and verify; factual research may take longer.

## Choose the right source

Author published pages in the [`tuvima-docs`](https://github.com/Tuvima/tuvima-docs) repository, under `content/products/library/`. The folder's `manifest.json` lists the pages, their stable slugs and their sidebar sections. Astro Starlight builds from an ignored generated copy; never edit that copy. A change to Library that needs documentation gets a companion proposed change in `tuvima-docs`.

Put engineering plans, dated verification reports and design working files in `engineering/` in the Library repository. That folder is not published on the site, but it remains public in the repository. Review captures belong under ignored `.tmp/`. Existing product screenshots are removed until better replacements are available; do not add empty image placeholders.

Use one page for one reader's task or question. Choose Guides for everyday use and administration, Develop for contributors and extension authors, or Reference for lookup material.

## Establish what is true

Check current code, configuration and accepted verification evidence. Use [Product Status](../product/status.md) and the [feature inventory](../product/feature-truth-inventory.md) as starting points, and correct discrepancies rather than repeating them.

Separate current behavior from partial or planned behavior. A source file or successful compile alone does not prove a deployment or user journey works. Do not turn historical acceptance caveats into present-tense promises.

## Write for the reader

- Address the reader as “you,” use active voice and lead with the outcome.
- Say what a procedure achieves and give a useful time estimate only when one can be supported.
- Prefer short sentences and paragraphs. Aim for grade-eight language in everyday tasks, while retaining precise technical terms where needed.
- Use task headings such as “Add a folder.” Explain product terms on first use and link the [glossary](../reference/glossary.md).
- Call the product “Tuvima Library” first, then “Tuvima.” Use Engine and Dashboard when distinguishing the two apps.
- Keep required commands, paths, permissions and warnings beside the step that needs them. Put optional internals in a Technical details disclosure or a reference link.
- Describe current behavior directly. Avoid dated change-log narration on maintained guides.
- End task and explanation pages with useful next steps. Policy pages may instead use their relevant reporting or license links.

## Add required metadata

Every published source needs these fields:

```yaml
---
title: Add a library folder
description: Add an existing media folder and understand how source permissions affect scanning and organization.
audience: user
category: guide
product_area: libraries
status: current
tags:
  - folders
---
```

| Field | Allowed values |
| --- | --- |
| `audience` | `user`, `administrator`, `developer`, `designer` |
| `category` | `landing`, `tutorial`, `installation`, `guide`, `explanation`, `reference`, `architecture`, `policy` |
| `status` | `current`, `early-access`, `target-state` |
| `product_area` | A meaningful nonempty area name |
| `description` | A meaningful description of at least 20 characters |
| `tags` | Optional list of strings |

`status` classifies the page; it does not make every feature mentioned on it current. Label partial and planned features visibly in the body.

Starlight renders the page title. Begin the body with an introduction and use second-level headings for sections. The preparation step removes an existing first-level Markdown title when migrating older pages.

## Choose a page template

These outlines are starting points. Omit sections that do not help the reader rather than filling them with boilerplate.

### Tutorial

```markdown
Opening: what you will accomplish and the expected time.
## Before you start
## Complete the first task
## Check the result
## If something goes wrong
## Next steps
```

### Installation

```markdown
Opening: who this installation method suits and its availability.
## Requirements
## Prepare storage and permissions
## Install and start
## Open the Dashboard
## Update and remove
## Troubleshoot
## Next steps
```

### Guide

```markdown
Opening: the task and result.
## Before you start
## Do the task
## Verify the result
## Technical details
## Next steps
```

### Explanation

```markdown
Opening: the concept and why it matters.
## Understand the model
## Follow an example
## Know the limits
## Next steps
```

### Reference

```markdown
Opening: who this reference serves and what it covers.
## Values or interfaces
## Defaults and constraints
## Examples
## Related guidance
```

### Architecture

```markdown
Opening: in this page, the subsystem and questions answered.
## Where this lives in the code
## Responsibilities and data flow
## Contracts and failure behavior
## Verification
## Related architecture
```

## Use Markdown and components deliberately

Keep simple pages as `.md` with numbered procedures and standard links. Use `.mdx` when a Starlight component materially improves the explanation. Import components explicitly:

```mdx
import { Steps, Tabs, TabItem, Aside, Badge, LinkCard } from '@astrojs/starlight/components';
```

Use `Steps` for a substantial procedure, `Tabs`/`TabItem` for genuine platform alternatives, `Aside` for notes or cautions, `Badge` for a visible state, and `LinkCard` for a useful next step. Markdown `:::note` asides are available without MDX. A plain numbered list or link is also valid and remains easier to read on GitHub.

Use native `<details><summary>Technical details</summary>…</details>` only for optional detail. Do not hide prerequisites or security warnings there. Test Markdown inside disclosures; MDX and Markdown handle embedded content differently.

## Keep links and assets working

Prefer source-relative links such as `../guides/adding-media.md#add-a-source`. The build resolves them through the folder's manifest and turns them into site addresses. Component links and front matter actions need the same checks.

For a move, update source references. The site keeps only the latest version and does not carry redirects, so check that no page still links to the old address. Preserve important heading IDs or document an intentional retirement.

Links to files in the Library code repository (such as `AGENTS.md`) become GitHub links. Keep essential user instructions on the site instead of sending readers into an engineering report. New assets must be local, appropriately sized, licensed and accessible. Fonts and search resources stay on the same origin as the site.

## Keep shared policies synchronized

`CONTRIBUTING.md` and `SECURITY.md` stay at the root of the Library repository because GitHub requires them there. Their site versions are fetched from the repository when the site is built, and the site rebuilds every week. Edit the root file, not the site copy. Keep new policy commitments within the product owner's approved scope.

## Verify and preview

In the `tuvima-docs` repository, from `site/`, run `npm ci`, `npm test`, `npm run check` and `npm run build` (Node 24). Preview the production output with `npm run preview`; search indexing is part of the production build.

Check the rendered page on a phone and desktop in both themes. Follow its links and use the keyboard. Internal links, fragments, assets and required metadata are blocking checks. External-link failures need investigation and may be rate limits rather than broken destinations.

## Next steps

- [Contribute a change](contributing.md).
- [Understand the architecture](../architecture/technical-overview.md).
- Read the [documentation hub guide](https://github.com/Tuvima/tuvima-docs/blob/main/CONTRIBUTING.md).
