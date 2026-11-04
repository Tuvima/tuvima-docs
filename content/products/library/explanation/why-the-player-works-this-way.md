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

## Subtitles you can actually read

Good subtitles depend on the screen, the room and the person watching. White text on a dark box works for most people, but not for everyone: someone with a bright room may want a solid backing, someone watching a dark film may want the box almost gone, and some people read yellow or blue text more easily than white. So the subtitle style menu (the **Aa** button beside Settings) has eight colors for the text and eight for the box behind it, plus a slider for how solid each one is. The text can be anywhere from faint to fully solid, and the box can go from none at all up to solid. The preview line at the top changes as you choose, so you see the result before you close the menu.

Your choices are saved with your profile, so every title looks the way you set it, and another person in the house keeps their own look. **Reset** puts everything back to white text on a soft black box. If you slide the background to none, subtitles get a gentle shadow instead so they stay readable over a bright scene. On a tablet or phone the swatches are larger and nothing depends on hover.

## Each kind of media shows only what fits

A film has no episodes or chapters to jump between. An audiobook lives by its chapters. Music is about the queue. Showing only the controls that fit keeps the bar calm, and you never wonder what a button would do on a film.

## No keyboard shortcut for bookmarks

A stray key press should never add something to your library. Bookmarks are added from the pane, where you can see exactly what is being saved and when.

## Chapter ticks and bookmark bubbles start switched off

A clean progress bar comes first. If you like the extra marks, switch them on in **Settings > Playback** or from the bookmark pane. Audiobooks show chapter ticks by default because a long audiobook is hard to navigate without them.

## Mine and Global

You bookmark for yourself. An administrator can promote the best bookmarks to Global so everyone benefits. Promotion is immediate and asks nothing, because nobody loses a bookmark and everybody gains one. If a promoted bookmark is within three seconds of someone's own, theirs is folded into it so the same moment is never listed twice. Only administrators edit or delete Global bookmarks, so a shared bookmark cannot be changed by accident; everyone else sees them read-only. Everyone's, the administrator's view of other people's bookmarks, is only on desktop and tablet and never in the Vault, because it shows what other people saved.

## Books follow the same rules, measured in chapters

A book bookmark is a saved place in the text, not a time, so "close" means something different: the same paragraph is the same spot, the same chapter is close, and up to two chapters away is far. Library can only compare two places inside the same file, because another edition of the book has different markup behind the same words. That is why a bookmark file from a different edition is placed by chapter name instead of by position. When an administrator promotes a book bookmark, personal bookmarks in the same paragraph are folded into it, just as bookmarks within a few seconds are for a film.

## Why Find bookmarks shows two bookmarks side by side

A bookmark file from outside can be a few seconds off from yours: a different release, an extra logo at the start. Applying it blind would either pile up near-duplicates or overwrite what you already have. So Library shows each incoming bookmark beside the nearest one you own, says how far apart they are, and lets you tap the one you prefer. The tap also jumps the player there, so you decide by looking at the scene rather than reading numbers. Nothing changes until Apply, and the defaults are the ones most people would pick (take the incoming bookmark when it is the same spot, keep yours when it is merely close), so most files apply with a single click.

Because the Engine alone decides how close two bookmarks are, every screen, and every kind of media, agrees on what "Same spot" means. The limits live in a plain config file rather than a Settings page: they are rarely changed, they are different for a second, a page and a place in a book, and a page full of sliders would make an easy feature look hard.

## Why books compare places by chapter and paragraph

A book has no clock. Where a film says "12 minutes 40 seconds", a book says "this paragraph of this chapter", and that address only means something inside the file it came from: another edition (a new translation, a different publisher's file) breaks the text into different pieces, so the same sentence has a completely different address. Library therefore compares two places only when they come from the same file: the same paragraph is the same spot, the same chapter is close, and up to two chapters away is far. It never guesses across editions.

When a bookmark file was made on another edition, Library says so and offers **Align by chapter** instead: each bookmark moves to the start of the chapter with the same name. That is less exact than a paragraph, but it is honest, because chapter names are the one thing editions of a book tend to share, and landing at the top of the right chapter is better than landing somewhere wrong.

## Why packs are gone

Bookmark packs kept a separate read-only copy of someone else's bookmarks for each person, under the pack's name. That meant the same moment could be listed twice and an administrator's import helped nobody else. Now a file simply becomes bookmarks: Global if an administrator applied it, yours otherwise. One list, one set of rules, nothing extra to remove later.

## Why imported bookmarks start off the bar

Bookmarks from a file follow the same rule as any other: no bubbles on the progress bar until you switch **Show bookmarks on the bar** on, like subtitles that you choose to turn on. A long set from a file would otherwise cover the bar the first time you open a film. Their rows are always in the list under Global (or Mine).

## Volume is vertical and square

A vertical slider that opens from the speaker button matches the rest of the design and stays out of the way until you need it. On a phone or tablet the device's own volume buttons do the job, so the slider is not shown on touch screens.
