---
title: "Collections and lists"
description: "Build collections with rules, import lists from files or web addresses, start from ready-made packs, and show collections as rows on Home, Watch, Read and Listen."
audience: user
category: guide
product_area: collections
status: current
---

# Collections and lists

A collection is a named shelf of titles from your own library. Library already makes some for you (Universes such as Dune, Series such as the Dune novels, Automatic groups such as Books by Author). This guide covers the ones you make: **collections** you fill by hand, with rules, from a list, or from a ready-made pack, and **playlists** in Listen.

Formats of one title (the ebook and the audiobook of Dune) are variants of that one title, never a collection.

## Who can make and share collections

- Every adult profile can make its own collections and playlists. They are private: **Only you can see this collection.**
- Administrators can also make a collection for everyone, or share one with selected profiles. The last step of the builder asks who the collection belongs to (**Owner** and **Audience**).
- Kids profiles do not see New collection.
- Building and editing are desktop only. Phones and TVs show collections and rows but have no builder.
- Putting a title from the Vault into a private collection works. Putting it into a shared one is refused.

## Start a new collection

Choose **New collection** on the Collections page, or the **+** beside Collections or Playlists on the Watch, Read and Listen rails (the media type is ticked for you). From an item's **...** menu, **Add to collection** lists only the collections you may edit. With several rows ticked in a list, use **Add N to collection**.

Step 1 offers four ways in:

| Way in | Use it when |
|---|---|
| **Pick titles** | You want to search and add titles yourself. |
| **Set rules** | You want Library to keep the collection up to date from rules. |
| **From a list** | You have a file or a web address for a list and want to keep it in step. |
| **Start from a pack** | You want ready-made sets built from your own library. |

Every way shows a preview of what is in your library before you save. In Listen the same flow makes playlists, and packs are limited to music.

## Set rules

Pick the media types (Movies, TV, Books, Audiobooks, Music, Comics, Videos), then add one rule per line. Rules read like sentences and are joined by "and": "Movies, directed by Denis Villeneuve, released after 2010".

- Each rule is a field, a condition in words (is, is not, is any of, contains, is before, is after, is between, at least, at most, is known, is unknown) and a value.
- **Exceptions** are rules under "but never when": for example, never titles rated R.
- **Match any of these instead** switches "and" to "or".
- **Advanced** shows rule groups with their own any/all logic. A collection that already uses several groups opens in Advanced.
- **Your activity** fields (watched, unwatched, in progress, play count, last played, your rating, My List, Favourites) are worked out for the profile looking. One "Unwatched classics" collection shows each person their own unwatched films. The preview says which profile it is showing ("for {name}").
- You can also filter on release date relative to today ("in the last 2 years"), age rating, length (runtime or pages), tags, and whether a title is in or not in another collection.

The preview sits beside the rules on a wide screen and below them on a narrower one. It shows the count, a count per media type and sample covers. Rules that match nothing yet are allowed: the preview says so and names the strictest rule. A hand-picked collection cannot be saved empty.

## Start from a list

Choose **From a list**, then paste a web address or drop a file. After Library reads the list you see its source line, "You own 83 of 250", the covers you own, and **Couldn't match N** with the titles that did not match. Matching uses identifiers first (IMDb, TMDb, TVDB, ISBN, ASIN, MusicBrainz, ComicVine) and then title and year. Entries Library is not sure about are listed in the collection editor, not in Needs Review, which is for your files.

You choose the order (List order, Release date, Title), how often a web list refreshes (Never, Daily, Weekly), and what happens when a title leaves the list:

- **Follow the list** (default): titles that leave the list leave the collection.
- **Keep everything ever added**.

A refresh never touches titles you added by hand.

### Files

A file never leaves your machine. Library reads:

| File | Notes |
|---|---|
| IMDb list or ratings export (CSV) | Uses the IMDb id when present. |
| Letterboxd export (CSV or ZIP) | Matched by title and year. |
| Trakt export or any CSV | Columns are found by their headers: title, year, imdb, tmdb, tvdb, isbn, asin, musicbrainz. |
| Goodreads or StoryGraph export (CSV) | Each shelf can become its own collection. |
| Plain text | One title per line, with an optional "(Year)". |

IMDb and Letterboxd are supported through their own export files. Library does not read their web pages.

### Web addresses

Web lists work through sources you can switch on and off in **Settings → Plugins**. Each source says what it sends and to whom, and sends only the address and the list's own identifiers.

| Source | Address | Needs |
|---|---|---|
| TMDb | `themoviedb.org/list/…` or `themoviedb.org/collection/…` | Your TMDb key |
| MDBList | `mdblist.com/lists/<user>/<list>` | A free MDBList key |
| Open Library | `openlibrary.org/people/<user>/lists/<list>` | Nothing |
| MusicBrainz | `musicbrainz.org/collection/<id>` | Nothing |
| Trakt | `trakt.tv/lists/<id>`, `trakt.tv/lists/official/<name>`, `trakt.tv/users/<user>/lists/<list>` or a user's public watchlist | A free Trakt app Client ID of your own |

Trakt works for **public** lists and public watchlists only. A private list, or your own list that needs you signed in, is refused with a sentence saying so. Signing in to Trakt for your own private lists is not available yet: export the list as a Trakt file and use that instead. Short `trakt.me` links are not followed; use the full address.

If a source is switched off, the address field says so and links to Plugins. Switch it back on, or use a file: file import works with every web source off. If a source is down, the import is saved with "Will try again" and shows what matched so far.

## Start from a pack

The starter packs are built from your own library:

| Pack | Makes |
|---|---|
| Decades | One collection per decade. |
| Genres | One per genre. |
| Award winners | Only the awards you own titles for. |
| Directors, Authors and Artists you collect | One per person with at least 3 titles. |
| Based on a book you own | One collection. |
| Seasonal | Halloween (1 October to 1 November) and Festive (1 December to 2 January). |
| Pick up again | Unwatched classics, Unread on the shelf, Short and sweet. |

Each pack card says how many collections it would make from your library, and you can preview them. A pack makes a **Set**: one tile on the Collections page that opens a page listing its collections. Collections in a set are hidden from the Curated section. From the Set page's **...** menu you can **Export** the set as a pack file to share with another household, or **Remove set** (it asks first).

A pack is a small file of names and rules with no personal data. To add one, drop it on **Settings → Profile → Import** or on the player's Import. The preview says **Add this pack**, and it makes private collections for your profile.

## Show a collection on Home, Watch, Read or Listen

The last step of the builder has **Show on**: Home, Watch, Read and Listen. A collection is always on the Collections page. A collection shown somewhere becomes a **lane**: a row with up to 20 titles and a View all tile, with a source line under the name where there is one ("From a Letterboxd list, refreshed weekly").

- A lane with fewer items than its minimum is skipped quietly.
- Kids profiles see only what their levels allow.
- Private collections appear only on their owner's pages.
- An administrator orders the shared lanes under **Settings → Profile → Home → Lanes**: choose the page, then drag lanes into order. A switch hides a lane for everyone.
- Each profile can hide a lane for itself with **Hide this lane** in the row's **...** menu, which also works on a phone or TV. A profile's own lanes follow the shared ones.

## Display options

Open **Details → Display options** in the editor:

| Option | What it does |
|---|---|
| **Minimum items** | Hides the collection from lanes, and from the Collections page when set above the page's own minimum, until it holds at least this many titles. |
| **At most** | Caps how many titles show. With random order, the sample is picked at random and stays steady until the next day. |
| **Order** | List order for imported lists; title, release, added, rating, your rating, last played or random for others. |
| **Seasonal** | Shows the collection only between two dates ("1 October to 1 November"). Outside the window it is hidden from lanes and the Collections page; the editor shows **Hidden until 1 October**. |

## What the tiles mean

The shape says what opens:

- **Portrait**: one title.
- **Round**: a person, such as an artist or an author.
- **Square**: an album or a playlist. A playlist shows a 2 × 2 mosaic of album covers until you choose artwork.
- **Landscape with a fanned stack of covers**: any group of titles, such as a curated collection, Series, Universe, imported list or pack Set, with a small corner word naming the kind. Custom artwork replaces the stack.

Names and counts sit under the tile, never on top of the artwork. On the Collections page a curated tile also shows a one-line source: Rules, Hand-picked, From a list or Pack. An imported list shows its last refresh and an amber **Couldn't match N** badge that opens the editor.

## An imported list's own page

The hero says "You own 83 of 250". At the end, **Not in your library** lists the titles you do not own, greyed out. Library does not request, download or buy anything for them. Kids profiles do not see these counts or titles.

## Related guides

- [Correct an item](editing-items.md)
- [Use plugins](using-plugins.md)
- [Configure providers](configuring-providers.md)
- [Where Tuvima makes external requests](../explanation/privacy-local-first.md)
