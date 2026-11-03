---
title: "Why the player works this way"
description: "The reasoning behind the Watch and Listen players: control sizes, the Settings menu, bookmarks, volume and what is switched off by default."
audience: user
category: explanation
product_area: playback
status: current
tags:
  - "player"
  - "bookmarks"
  - "accessibility"
---

# Why the player works this way

The Watch and Listen players make a few choices you cannot change. This page explains the reasons, so they feel like decisions rather than limits. For how to use the player, see [Play, listen, and read](../guides/playback-and-reading.md).

## Bigger controls and a bigger title

Small icons were hard to find and hard to hit, especially from across a room. Every control now comes from one size set, so no button is smaller or easier to miss than another. The title in the middle is large for the same reason.

## Pointing at a control shows its name, and it grows

An icon on its own is hard to read for some people, and for anyone using the keyboard. A control grows a little and shows its name when you point at it or tab to it. The growth is switched off if your device asks for reduced motion.

## One gear for Settings

The old "CC" button only covered subtitles. Audio and the look of your subtitles belong in the same place, so there is now one gear menu with Audio, Subtitles and Styling. When no subtitle source is switched on, it tells you so rather than offering a search that cannot work.

## Each kind of media shows only what fits

A film has no episodes or chapters to jump between. An audiobook lives by its chapters. Music is about the queue. Showing only the controls that fit keeps the bar calm, and you never wonder what a button would do on a film.

## No keyboard shortcut for bookmarks

A stray key press should never add something to your library. Bookmarks are added from the pane, where you can see exactly what is being saved and when.

## Chapter ticks and bookmark bubbles start switched off

A clean progress bar comes first. If you like the extra marks, switch them on in **Settings > Playback** or from the bookmark pane. Audiobooks show chapter ticks by default because a long audiobook is hard to navigate without them.

## Mine and Global

You bookmark for yourself. An administrator can promote the best bookmarks to Global so everyone benefits. Promotion is immediate and asks nothing, because nobody loses a bookmark and everybody gains one. If a promoted bookmark is within three seconds of someone's own, theirs is folded into it so the same moment is never listed twice. Only administrators edit or delete Global bookmarks, so a shared bookmark cannot be changed by accident; everyone else sees them read-only. Everyone's, the administrator's view of other people's bookmarks, is only on desktop and tablet and never in the Vault, because it shows what other people saved.

## Why Find bookmarks shows two bookmarks side by side

A bookmark file from outside can be a few seconds off from yours: a different release, an extra logo at the start. Applying it blind would either pile up near-duplicates or overwrite what you already have. So Library shows each incoming bookmark beside the nearest one you own, says how far apart they are, and lets you tap the one you prefer. The tap also jumps the player there, so you decide by looking at the scene rather than reading numbers. Nothing changes until Apply, and the defaults are the ones most people would pick (take the incoming bookmark when it is the same spot, keep yours when it is merely close), so most files apply with a single click.

Because the Engine alone decides how close two bookmarks are, every screen, and every kind of media, agrees on what "Same spot" means. The limits live in a plain config file rather than a Settings page: they are rarely changed, they are different for a second, a page and a place in a book, and a page full of sliders would make an easy feature look hard.

## Why packs are gone

Bookmark packs kept a separate read-only copy of someone else's bookmarks for each person, under the pack's name. That meant the same moment could be listed twice and an administrator's import helped nobody else. Now a file simply becomes bookmarks: Global if an administrator applied it, yours otherwise. One list, one set of rules, nothing extra to remove later.

## Why imported bookmarks start off the bar

Bookmarks from a file follow the same rule as any other: no bubbles on the progress bar until you switch **Show bookmarks on the bar** on, like subtitles that you choose to turn on. A long set from a file would otherwise cover the bar the first time you open a film. Their rows are always in the list under Global (or Mine).

## Volume is vertical and square

A vertical slider that opens from the speaker button matches the rest of the design and stays out of the way until you need it. On a phone or tablet the device's own volume buttons do the job, so the slider is not shown on touch screens.
