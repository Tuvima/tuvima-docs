---
title: "Tuvima Sans font"
description: "Tuvima Sans is the open-source typeface behind the TUVIMA wordmark: a specimen, its licence and credits, and a free download."
audience: user
category: reference
product_area: legal
status: current
---

<link rel="preload" href="/font/TuvimaSans-Variable.woff2" as="font" type="font/woff2" crossorigin />

**Tuvima Sans** is the typeface we use for the <span class="tuvima-word">Tuvima</span> wordmark and the top navigation of this site. It is free to use, share and modify under the SIL Open Font License.

## Specimen

<div style="font-family: 'Tuvima Sans', sans-serif; line-height: 1.25;">
<p class="tuvima-word" style="font-size: 3.5rem; margin: 0.5rem 0;">Tuvima</p>
<p style="font-size: 2rem; font-weight: 300; margin: 0.25rem 0;">Light 300: Your stories, presented beautifully</p>
<p style="font-size: 2rem; font-weight: 400; margin: 0.25rem 0;">Regular 400: Your stories, presented beautifully</p>
<p style="font-size: 2rem; font-weight: 600; margin: 0.25rem 0;">Semibold 600: Your stories, presented beautifully</p>
<p style="font-size: 2rem; font-weight: 800; margin: 0.25rem 0;">ExtraBold 800: Your stories, presented beautifully</p>
<p style="font-size: 1.5rem; margin: 1rem 0 0.25rem;">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 &amp; ! ? @ # %</p>
</div>

## What is different from Montserrat

Only the capital **A** changes: its horizontal crossbar is removed. The lowercase "a" and every other letter are the same as Montserrat. The font is a variable font, so one file covers every weight from 100 (Thin) to 900 (Black).

## Download

- [TuvimaSans-Variable.woff2](/font/TuvimaSans-Variable.woff2): the small web version, for websites.
- [TuvimaSans-Variable.ttf](/font/TuvimaSans-Variable.ttf): the installable version, for desktop apps.
- [OFL.txt](/font/OFL.txt): the licence, which must travel with any copy of the font.

This site serves the font itself. Nothing is loaded from Google Fonts or any other outside service.

## Credits and licence

Tuvima Sans is a customised version of [Montserrat](https://github.com/JulietaUla/Montserrat), an open-source typeface originally designed by Julieta Ulanovsky and developed by the Montserrat Project Authors.

Tuvima Sans keeps Montserrat's typography and adds a distinctive uppercase **A** without its horizontal crossbar.

Montserrat and Tuvima Sans are licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/). We gratefully acknowledge the original Montserrat designers and contributors for making their work freely available.

Copyright 2024 The Montserrat.Git Project Authors (https://github.com/JulietaUla/Montserrat.git).

The licence declares no Reserved Font Name, so the derived name "Tuvima Sans" is allowed. If someone else modifies Tuvima Sans, they must rename their version (the licence's rules on naming apply to modified copies).

## Use it on a website

```css
@font-face {
  font-family: "Tuvima Sans";
  src: url("TuvimaSans-Variable.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
```
