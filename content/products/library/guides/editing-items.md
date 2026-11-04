---
title: "Correct an item"
description: "Change an item's details, artwork, match, files and Extras in the editor, edit several items at once, or delete."
audience: user
category: guide
product_area: editing
status: current
---

# Correct an item

Fix a title, cover, or wrong match in Tuvima Library from the item's own page. Most small changes take a few minutes. Some lookup work may finish later.

## Open the editor

1. Find the item anywhere: its detail page, a row in a library list, Recently Added, or Needs Review.
2. Choose **Edit** in its "..." menu (or **Fix** on a Needs Review row). The editor opens at once as a pop-over over the page; nothing on the page behind it changes.
3. It always opens on the item you chose. An item that is not matched yet opens on **Match & Identity**, with the search already filled in from its folder and file names.
4. Make your changes, then choose **Save changes**, check **Review changes**, and save. **Discard** asks first if you have changes waiting.

**Why it works this way.** You asked for one step and nothing to learn, so Edit opens the editor directly instead of first putting the page into an "editing" state. Nothing is saved until you have seen the before-and-after list, so a slip never changes your library. Editing is for computers only, because matching needs a precise pointer and space to compare options, and your role decides who may edit at all.

## The layout

From top to bottom the pop-over has four parts, and the top and bottom never scroll away:

- **A rail of dropdowns** (only when the item has a family). For an episode it reads *The Expanse ▾ › Season 2 ▾ › Static ▾*. Each dropdown lists that level's siblings with a small picture and a matched mark, and is searchable when it is long. Choose another episode, a season or the show to switch to it. Changes you already made on the first item are kept, and the footer counts all of them. A film, a standalone book or a person has no family, so no rail.
- **The header.** The item's picture, what kind of item it is ("The Expanse · TV episode"), its title, one line of facts, and links to its provider records (for example TheTVDB and Wikidata) when the Library has them.
- **Tabs.** **Details**, **Artwork**, **Match & Identity**, **Files** and **History** for every item, plus **Contents** for a show, season, album or series.
- **A footer** that says where your changes will go ("Changes save to Library · File write-back off"), how many are waiting, and has **Discard** and **Save changes**.

**Why a rail of dropdowns.** The first editor put a tree down the left side. It always took a quarter of the window, even for a film that has no family, and it squeezed the form. A row of dropdowns uses no room until you need it, still keeps you inside the show or album you are fixing, and pages in as you scroll, so a 500-episode show opens as fast as a short one. The full list, with tick boxes, lives in Contents, where you need it.

## Details and Quick Facts

**Details** is a plain form. Every field has a **lock** (keep my value when the provider refreshes) and, once you change it, a **revert** arrow that puts back what was there. Beside the form, **Quick Facts** show three to five facts that suit the item: a season shows episodes owned (13 of 13), total runtime and total size; an episode shows air date, runtime, size and quality; an album shows tracks owned, length and size. When the library is read-only, or writing into files is off, Quick Facts says so. Facts are for reading and cannot be edited.

**Why the lock.** A provider refresh is useful until it overwrites something you wrote on purpose. The lock keeps your value, and the revert arrow shows you changed it and gets you back without remembering the old text.

## Contents: a show, season, album or series

**Contents** lists the children (seasons, episodes, songs, books or issues) with a picture, number, title, a matched mark and size. This is the one place to see them all, tick several, put them in order where the order is yours to set (a series of videos), or delete them.

Tick several rows and the editor becomes **"Editing 5 episodes"** for exactly those rows. See [Edit several items at once](#edit-several-items-at-once).

**Why Contents is its own tab.** The rail can only switch to one item. Spotting the one unmatched episode in a season, ticking a few, and deleting a few are jobs about the whole list, so they get the whole list.

## Match & Identity

**Match & Identity** shows what the item is matched to now, then lets you change it. It shows only the facts that decide a match, such as the episode number, title, air date and runtime of an episode, or the title, author, year and cover of a book, never twenty fields side by side.

**One item.** A short list of candidates, each with a **confidence** bar. The highlighted row shows a before and after: *Your file: S02E03.mkv, 42 min → S02E03 Static, 42 min, aired 8 Feb 2017*. A small (i) explains the score in words ("Episode number and runtime match; title differs"). One click picks it, so an unmatched episode takes at most three clicks.

**Searching.** The search starts from the file and folder names. You can also search by a provider ID or a pasted provider link (TheTVDB, IMDb, TMDB, ISBN or MusicBrainz, whichever the kind uses), a different title or show (**Search another title**), the year, words from an episode's title, an episode number (including absolute numbers for anime), or an air date (for daily shows). When a provider has nothing, you can type the season and episode numbers by hand. Each kind shows only the search options that make sense for it.

**Several files at once.** For a season, a whole show or an album, matching has two steps. First choose the show or album. Then a table lines up **your files against the provider's episodes or tracks**, with a confidence figure and a status, **Ready** or **Needs choice**. A doubtful row shows a dropdown of candidates; Save counts the rows still needing a choice and Review lists them. **Apply to** lets you use **Selected files only** or **All files in this season**.

**Universe and place.** The tab also names the item's Universe, with an **Open Universe** link (it asks about unsaved changes first), and its place (Season 2, Episode 3) with **Change placement**.

**Why a confidence bar and a before and after.** Library already scores every candidate. Showing the score, and the reason in plain words, lets you accept a good match fast and slow down on a doubtful one. Lining your file up against the candidate means you check the thing that matters, whether it is the same file, instead of reading a list of names. A doubtful row is never saved quietly: it is marked Needs choice and counted before you can save.

### What is this file?

A file that sits in a folder but is not the main thing (a trailer, a workbook PDF, a stray text file) can be told what it is, from **Match & Identity**. For any file Library could not place, or any file you open, choose one of:

- **An episode (or a track, or a book).** The normal match, above.
- **An Extra.** Pick its kind (Trailer, Featurette, Behind the scenes, Deleted scene, Interview, Document, Pictures or Other clip) and where it belongs: the whole show, a season or one episode; for a film, the film; for an album, the album or one track.
- **Belongs to another title.** Search any title in the Library and attach the file there.
- **Ignore.** The file is hidden from the Library and from future scans, but left on disk. Settings lists it, and **Add back** undoes it.

Library guesses the kind from the file name ("Season 1 trailer.mkv" becomes a Trailer for Season 1) and the guess only fills in the choice; nothing is saved until you save. A folder's other unsorted files are listed together so you can sort them in one pass. A workbook PDF in a course is a Document for the whole course or one lesson; "sample.mkv" is **Ignore**; a film or another show's episode dropped in the wrong folder is **Belongs to another title**; a real episode with an odd name is **An episode**. Extras never count as episodes, so sorting a clip as an Extra never changes an episode count or anyone's watched marks.

**Why four choices.** A person looking at a stray file is not thinking "match" or "Extra"; they are thinking "what is this, and where does it go?". Four plain answers cover every case, and Ignore leaves the file on disk, so the choice can always be undone. The kind and place are kept so the Extras row on the title's page can say "Trailer, Season 1" instead of listing every clip alike.

## Artwork

**Artwork** has a card for each picture role: Poster, Background and Logo for a film or show, Season poster or Episode still where they apply, and Cover for books, comics, albums and audiobooks. [Artwork types](../reference/artwork-types.md) explains each role. Each card says how many versions you have and which is **Preferred**.

Choose a card to see its picture large, at its real shape (a tall poster, a wide background, a logo), with zoom, and its file facts: size in pixels, file size, type and source. A line under the picture says exactly what changes ("Only this episode's still changes"). Below it a strip shows every version; **click a version to make it Preferred**, and it moves to the front. **Add artwork** offers three ways: the provider's choices (filtered by language, with your app's language first, and by size, with a quiet **Small** mark on pictures too small to look good), an upload, or a pasted link. For a season, **Fetch all** gets every episode still.

For shelves that support edits, you can also keep the stack of member art that Tuvima builds. A shelf cover belongs to the shelf. It does not replace the covers of its members.

**Why large and real-shaped.** The first Artwork tool drew every picture as a small square, so you could not tell a good poster from a poor one, and a wide logo looked cropped. Showing each at its true shape and size, with the file facts, lets you judge before you choose. One click for Preferred replaces a separate "set preferred" button because it is what people tried first. Like every change except Delete, it waits for Save.

## Files

**Files** lists the item's files: name, folder, size, quality, and whether the folder is read-only. An audiobook's files appear in order. Each file has **Delete** (see below).

## History

**History** shows changes to matches, details, artwork and file intake, so you can see what changed and why. If newer changes conflict with yours, the editor keeps your input and offers reload; it does not write over the newer changes.

## Delete

Delete is in the editor's own "..." menu for the item you are on (including a whole show, season, album or series), for ticked rows in Contents, and for a single file in Files. It asks **"Are you sure?"** once, and the box says what will go, how many files, how much space is freed, whether a hand-picked collection is affected, and, plainly, that removed files cannot be recovered (or that they go to the Recycle bin, when that media type has it switched on). Then it happens **at once**; it does not wait for Save.

Files in a read-only folder are never deleted. The item just leaves the Library and is left out of future scans. Unsaved changes on a deleted item are dropped, and changes on other items stay waiting. If you delete the item you are on, the editor moves to its parent, or closes when there is none.

**Why delete happens at once.** Every other change waits for Save because it can be reviewed and cancelled. The delete box already says everything Review would, and a second confirmation after the first would only be noise. The box says plainly that it happens now, so it cannot surprise you.

## Edit several items at once

Tick rows in a list (a song list, Needs Review, a library table) or in **Contents** and choose Edit. The editor becomes **"Editing 12 songs"**, with small pictures and no rail. It offers only the changes that make sense for all of them:

- Facts that identify one item, such as title, track or episode number, ISBN and file name, are never offered.
- Facts that describe a group are offered when every item is the same kind: album, album artist, genre, year and disc (songs); series and author (books); tags (everything); Explicit (songs and videos). Season and show are changed through Match.
- Where a change would make items collide ("These 3 songs would all be track 4") it is blocked, with the reason.
- Where the items differ, the field says "Mixed, leave unchanged".
- A read-only item stays in the selection, greyed with the reason; the change reaches the others.
- For artwork, only roles they share ("Set one cover for these 12 songs" sets the album's cover, said in words).

Review lists each item.

**Why rules and not a free-for-all.** Typing one title over twelve songs is a mistake nobody wants to find later. Offering only what is meaningful for the whole group makes the fast thing the safe thing.

## Edit a Universe, its characters, places and factions

A Universe opens the same editor, on a computer, from **Edit** on the Universe page or the Chronicle explorer. Across the top, instead of Show › Season › Episode, the rail is the Universe and its kinds as searchable dropdowns with counts: Characters, Places, Factions, Events, Objects and Species (plus Concepts when Fandom Lore is on). Each dropdown has **Add** at the top, so you can add a character or faction Library does not know about. Pick one and the editor shows its **Details** (name, kind, description, aliases, what it belongs to), **Pictures** (a main picture, a logo and a background), **Match** (the Wikidata record, or "Not on Wikidata, added by you", with the usual before and after) and **History**.

Your own edits always win over provider facts, and the provider's value comes back if you clear yours. The Timeline is a read-only view and is not edited here. Things you added by hand can be deleted; things that come from the provider cannot.

**Why the same editor.** Characters, places and factions could not get a picture before. Using the editor everything else uses means one layout to learn, the same Review changes, and the same safety, and new kinds of Universe thing slot in without a new screen.

## Change text and personal notes

In **Details**, use Appearance to change the display title, description, tagline, sort title, or genres. My Library holds your own notes and local tags.

Genre and tag fields suggest values already used in your library. Type a full value, then press Enter or choose a suggestion. You can type spaces without saving the tag too soon.

People, dates, language, runtime, and source ratings come from the file or provider. To fix a wrong source match, use **Match & Identity**. These facts are not all fields you can type over.

## Mark a video Explicit

On a video or a series of videos, the editor's Details tool has an **Explicit** switch. It saves straight away and hides the item from every Kid's profile, whatever the household's Show unrated items setting says; every other profile still sees it. Nothing is shown for other kinds of item.

## Videos: series, order, names and identifying

These tools are in the editor's **Match & Identity** tab (and **Contents** for a series of videos) for a video, on a computer only. Everything here is staged like any other change: nothing is saved until you choose **Save changes** and confirm in **Review changes**.

- **Series.** A video that stands on its own shows a **Not matched** tag beside **Series**, because a video's only "match" is the series it belongs to. Pick an existing series (the list shows how many videos each has), choose **Start a new series…** and give it a name, or leave it on **Not in a series**. A line under the choice says what will happen in words, for example "joins Cooking with Sam, at the end of the list. Your file is not moved or renamed." A video that is already in a series can be taken out the same way.
- **Order.** Open the series and **Contents** shows **Order of the videos**. Drag a video by its grip handle and a purple line shows where it will land, or use the up and down arrows; the arrows are there for keyboard and screen-reader users, and they do exactly what dragging does. The list follows as you arrange. **Sort by file name** (so "Ep 2" comes before "Ep 10") and **Sort by date added** put the list in order once; you can then adjust by hand. **Put back as saved** undoes your arranging before you save.
- **Sections.** A series that has sections shows one list per section. Drag a video from one section to another, or onto a section's row.
- **Several videos at once.** Tick the videos in a list and choose **Put in a series**. Review lists each video and flags any that cannot join.
- **Rename the files to match this order.** Off by default, and shown only when every video in that list is in a Managed folder. It numbers each file in the folder it is already in ("02 - Kitchen tour.mkv"). A read-only folder never shows the switch and is never touched.
- **Identify.** In the "..." menu of a video that has not been matched, **Identify** opens the editor on Match & Identity. Paste a YouTube link or the 11-character video ID and Library looks it up. Only the ID is sent to YouTube, never your file, and only for a library of the YouTube kind. Once a video is matched the entry no longer appears.
- **Change thumbnail.** In the same "..." menu, opens the editor on Artwork, on the cover.

**Why series and order never touch your files.** A series is how Library shows videos together; it is not a folder on disk. Keeping it in Library's own data means you can rearrange as often as you like, a re-scan keeps your choice, and Cancel really does cancel. The one exception is the rename switch: a file name is changed on disk and cannot be changed back by Library, so it is off by default, listed last in Review marked "Cannot be undone", and run one file at a time. Series and order rows in Review are marked "Library only" so you can see at a glance that no file is involved.

**Why there is no "order by file name" rule.** The sort buttons are a one-time tidy-up, not a standing rule. A guess from names like "Part 2" can look like your own choice when it is wrong, so Library never reorders on its own; you decide, and what you save is what you get.

## Fix a wrong match

Open **Match & Identity** and pick the right candidate (see above). If its parent or place in a series changes, check **Previous Path → Target Path** before you apply it. The provider match and main artwork change first. Wikidata links and richer details may arrive later. Art you uploaded stays available.

Beside the current match, the tab also lists the item's **Identity status** and **Artwork source** (user, provider or generated). They are read-only facts for checking a match, and they appear only where the editor opens for you.

Episodes and tracks have **Parent & position**. Moving one has its own preview and confirm step. A normal text edit does not move it to a different show, season, or album. A match never moves your files unless its own switch is on.

## Change chapter titles and check past changes

Use **Chapters** to change an audiobook chapter's display title. Its times and boundaries still come from the file and cannot be edited here. Tuvima does not rename source chapters on its own.

To edit one thing, open its own page from the Universe (choose its tile) and choose **Edit**. Besides name, description and other names, its Details tab has **Belongs to** (a faction, place or species of the same Universe) and **On the Universe page** (Shown or Hidden). Hiding keeps the thing but removes it from the rails, the Timeline and other things' connection lists, so you can tidy a Universe without losing anything. Belongs to never offers a choice that would make two things belong to each other. [How a Universe page works](../explanation/how-universes-work.md) explains why.

## Resolve blocked items

Use [Review Queue](resolving-reviews.md) when Tuvima asks for a human decision. For a normal title, cover, or note change, open Edit on the item.

<details>
<summary>Technical details</summary>

The saved display fields are `title`, `description`, `tagline`, `sort_title`, and `genre`. They save with your profile's notes and tags. Each save checks the record's revision. If it has changed, the editor reports a conflict and keeps your draft.

A catalog edit does not grant file-write access. Existing/read-only sources stay protected. Moving files or writing tags still needs the source's permission and policy checks. See [inline media editing](../architecture/inline-media-editing.md) for the storage and matching rules.

</details>

## Next steps

- [Resolve an item that needs review](resolving-reviews.md)
- [Understand how metadata sources are chosen](../explanation/how-scoring-works.md)
- [Understand library source safety](library-settings.md)
- [How the editor is built](../architecture/inline-media-editing.md)
