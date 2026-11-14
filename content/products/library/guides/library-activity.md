---
title: "Library activity"
description: "See what Tuvima Library is doing right now and what each past import added, from Library activity and Playing now, two tabs under Server > General."
audience: "user"
category: "guide"
product_area: "library"
status: early-access
---

# Library activity

Activity is the one place an administrator can answer two questions: "what is Library doing right now?" and "what did that import add?" It replaces the old Recently Added page and the single line of text on the Libraries page.

Library activity is a tab under **Settings > Server > General** (General, Notifications, Library activity, Playing now). It used to be a tab on the Libraries page; Libraries is now only for managing your libraries. Open it by pressing the spinner in the top bar while library work runs. The spinner is blue while Library is scanning, identifying or fetching details, and green when everything is up to date. It appears only for administrators.

## Working now

While work is running, the top of the page shows one slim progress card for the whole Library, not one bar per library. It has the same animated sync icon as the top bar, the title "Updating your library", an "In progress" label, one line such as "427 of 538 files processed · 16 min elapsed", and a thin bar with the percent at its right end. When the total is not known yet, the card says how many files it has found and the bar moves without a percent. The percent is the same number as the top bar's, never shows 100 while work continues, and counts files only.

If something needs a person, one amber pill, for example "2 need review", opens Needs Review. It shows the same number as the Needs Review tab and the banner, because all three read one count from the Engine. The pill shows the whole number even when you have picked a filter chip, so it always matches the tab. It is hidden at zero.

Under the card, Working now shows small covers of the titles being added, identified or having their details fetched, as many as fit in one row with no scroll bar, with the total in its heading ("Working now · 34 titles"). When more titles are in progress than fit, the row rotates through them. A title that only waits for you in Needs Review is not "working", and neither is follow-up work after a title is usable. Follow-up work, such as making preview pictures for scrubbing, appears on a quiet Background line instead. When the card says "Everything is up to date", Working now is gone.

When nothing is running, the card says "Everything is up to date" and when the last scan completed. The Libraries page keeps a one-line status whose first word opens this page.

## Filters

The chips at the top (All libraries, Watch, Listen, Read) narrow the whole page together: the card, Working now and the History timeline. With Watch picked, a batch with nothing for Watch is hidden, and a batch that holds several kinds shows only its Watch counts, covers and items. A library's own Activity tab narrows the same way to that library. The History row (search, type, date range and sort) is separate and stays as it is.

## History

Below it, History is a vertical timeline of past imports, newest first, grouped by month ("November 2026 · 2 batches"). A running batch has a purple edge, a title such as "Adding audiobooks", a line such as "2 added so far", up to two small covers and an Active label. A finished batch has a title such as "250 items added" (or "updated", "fixed", "removed"), one line of counts by kind, three small covers with a "+N", and a green Completed check.

One import is one batch. A batch stays open for as long as Library is busy with that import, and the five quiet minutes that close it only start counting once Library goes idle. If Library is stopped part way and starts again, the titles join the batch that was cut off. Files added after Library has been idle for five minutes make a new batch.

Open an entry to see its items in place. Episodes are stacked into one tile per show, tracks into one tile per album, and videos from one folder into one tile per folder, so a hundred new episodes do not become a hundred tiles.

Months and years collapse. The current month is open; older years are folded away until you open them. Use the search box to find a title: it appears once, with its own list of the dates it was added. You can also narrow History by type, date range and sort order.

Everything on this page works the same on a phone; only the layout changes to fit.

Photos and documents never appear in Activity. They have their own place in View.

## What counts as New

A tile is marked New for 14 days after a later import added it. Nothing is marked New after a library's first import, because everything would be New at once. Anything you have already started is not New.

## Each library's own Activity tab

Every library on the Libraries page has an Activity tab. It is the same timeline filtered to that library.

## Playing now

The **Playing now** tab beside Library activity lists everything being watched or prepared for playback, for every account and profile on the server. It is for administrators only. Each row has the cover, the title ("Show · S2E4" for an episode), who is watching and on which device, a plain label (Playing directly, Repackaging, Converting sound, Encoding picture, Waiting for a free slot), how far along it is, and how heavy it is on the computer. A title from a Vault library shows as "Vault title" with no cover or name.

The **People** and **Device** filters narrow the list and are remembered on this device only. **Stop** ends one encode; if someone is watching it, a small dialog asks once and offers **Keep going**. **Stop all unwatched** ends every encode nobody is watching.

The Engine also stops an encode by itself two minutes after the last viewer leaves (a paused player counts as watching for ten minutes), and the Streaming limit now covers playback and offline copies together. Change both times under Settings > Playback > Advanced. The top-bar spinner also turns while an encode runs and opens Playing now when no library work is running.

The **General** tab starts with a **Right now** snapshot: two cards, "Adding to your library" and "Playing now", each linking to its tab.
