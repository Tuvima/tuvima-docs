---
title: "Correct an item"
description: "Change an item's details, artwork and match, work with its supporting files, edit several items at once, or delete, all from one editor window."
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
3. It always opens on the item you chose. An item that is not matched yet opens on **Match**, with the search already filled in from its folder and file names.
4. Make your changes, then choose **Save changes**, check **Review changes**, and save. **Discard** asks first if you have changes waiting.

**Why it works this way.** You asked for one step and nothing to learn, so Edit opens the editor directly instead of first putting the page into an "editing" state. Nothing is saved until you have seen the before-and-after list, so a slip never changes your library. Editing is for computers only, because matching needs a precise pointer and space to compare options, and your role decides who may edit at all.

## The layout

From top to bottom the window has three parts, and the top and bottom never scroll away:

- **The header.** It looks like the thing you are editing. On the left is the item's cover, a picture only (it is not a link). Beside it, the show's or album's name as a plain label, then the item's own title and one line of facts with its match state. Top right are links to its provider records (for example TheTVDB and Wikidata) and the close button. The header's background is a soft gradient taken from the cover's two main colors; a cover with no colors yet gets a plain dark window.
- **Tabs.** **Details**, **Artwork**, **Match** and **History**. A supporting file has **Details**, **Preview** and **History**. A Series has **Details** and **History** and is read-only. Administrators also see **Bookmarks** on a film, episode, video, audiobook or book ([see below](#bookmarks-administrators-only)). There is no Contents tab and no Files tab: getting around is the header's job, and a file's facts sit in Quick facts.
- **A footer.** A red **Delete** at the left; then plain words about your files, "File write-back off: Edits save in Library. Original files stay unchanged." (or "File write-back on: Edits save in Library and are written into the file's own tags."); how many changes are waiting; **Discard**; and **Save changes**. When a match will move a file in a Managed folder, the file line is replaced by an amber warning showing where it goes, until you save or discard.

**Why the footer says it.** Editing in Library never rewrites your original files unless you have turned write-back on for that library, and people want to know that before they press Save, not after.

### Getting around from the header

Under the title is one row that is the map of the item's family:

1. **Home button** (in the accent color). It goes back up to the root: the show, the album, the Series. It is the only way up.
2. **Season** dropdown (**Section** on a course). Pick another season or section.
3. **Item dropdown.** For a show it lists the episodes with each one's still, code (S02E03) and title, a tick when matched, a warning when not, and a purple dot when changes are waiting on it. It is searchable and pages in as you scroll, so a 500-episode show opens as fast as a short one. Below the episodes it lists the **supporting files that belong to this season**, then **All supporting files** (which opens the browser when there are more than eight), and last a folder button, **Browse files and folders**, which opens the real folder tree so any file Library found can be reached, sorted or not.

What you see depends on the item:

- **A course** (a Videos series) uses its own words: **Section**, videos show a number and a length instead of S01E02, and the tick means watched.
- **A film, a standalone video, a standalone book or a person** has no home button and no second dropdown. The item dropdown appears only when the item has supporting files (the film itself, then its trailer and featurette); with none, the header just ends at the facts line.
- **An album** has home (the album) and a track dropdown. **A book in a Series** has home (the Series) and a book dropdown.
- **A Universe** keeps its own dropdowns, one for each kind of thing (Characters, Places, and so on).

Changes you already made on one item are kept while you move to another, and the footer counts all of them.

**Why the header is the map.** The first editor put a tree down the left side, then a row of dropdowns above the title, and a Contents tab and a Files tab for the rest. People kept losing which item they were on. One row under the title that looks like the item's family (home, season, item) answers "where am I" and "where can I go" in one glance, uses no room for a film that has no family, and lets the folder button reach anything the family does not list.

## Details and Quick facts

**Details** is a plain form. Every field the provider filled in is **locked by default**: dimmed, with a dashed border and a lock beside its label. Click the lock to unlock the field and change it. Once you change a value it is kept on every later provider refresh (it becomes yours) and shows **Revert**, which puts back what was there. Your own fields (tags, sort title, and the fields of a supporting file) are never locked.

Beside the form, **Quick facts** show the facts that suit the item: a season shows episodes owned, total runtime and total size; an episode shows its match state, quality, container, size and folder, and when it was last refreshed; an album shows tracks owned, length and size. On a show, season, album or film they also count the supporting files. Facts are for reading and cannot be edited.

**Why locked by default.** A provider refresh is useful until it overwrites something you wrote on purpose. A locked field cannot be changed by accident, and unlocking says "this one is mine", so your value is kept and Revert shows that you changed it.

## Supporting files

**What they are.** Any file inside a title's folders that is not the main media and not a sidecar: documents (PDF, text, EPUB), pictures, and video or audio clips, only kinds Library can open. Archives, `.nfo` files, subtitles and other sidecars are never supporting files. A guidebook beside a show, a workbook in a course lesson and a trailer next to a film are all supporting files; on the title's page they appear in the **Extras** row.

**What you can edit.** Open one from the item dropdown (or the browser) and its editor has **Details**, **Preview** (the file itself, read-only) and **History**. Details holds:

- **Title** and **Description**. **Suggest details from the document** fills both from the file's own metadata and first page, on your computer, with no provider involved.
- **Group**, a type-in box like Tags: click in and the title's existing groups drop down, typing filters them, and a name that matches nothing offers **Create "Week 1"**. A group is created when you save.
- **Role.** A short list that suits the file: documents are Guide, Worksheet, Transcript, Notes, Booklet or Other; videos are Trailer, Featurette, Behind the scenes, Deleted scene, Interview or Clip; pictures are Pictures. Library guesses it from the file and folder names.
- **Belongs to**, a dropdown of the show, each season and each episode. Under it a line says where the value came from, "From its folder location" or "Set by you", with **Use folder location** to go back. See [Naming supporting files](naming-supporting-files.md) for how Library reads it.
- **Shown alongside**, an optional episode or lesson, for a file that belongs to a season or a whole course (a season guide that goes with episode 3).
- **Tags.**

**What moves a file and what never does.** Changing **Belongs to** moves the file in a **Managed** folder, into the season's or episode's folder, with the amber warning in the footer first, exactly as a changed match does. In a **Read-only** folder the file stays where it is and only its place in the Library changes ("Set by you, file stays where it is"). Group, role, title, description, tags and Shown alongside never move or rewrite a file.

**Where Shown alongside appears.** As a small chip under that episode's or lesson's row on the show or course page ("Worksheet · PDF") that opens the file; in that episode's or lesson's own Extras row; and, on a course only, as **Homework for this lesson** on the player's end card.

**When there are many.** Up to **eight** supporting files for a season or section are listed in the item dropdown. Above that, the dropdown shows **All supporting files (N)** and opens the **browser**: a search over file names, titles and descriptions; a **Where** filter (the whole show, show level, each season, each episode); a type filter; your groups with counts on the left, and **Ungrouped**; a table with tick boxes, 25 rows a page; and, on ticked rows, **Set group**, **Set role**, **Belongs to**, **Add tags** and **Delete**. **Edit selected** opens the editor as **Editing N files**, with only the fields they share. On the details page the Extras row shows at most 12 cards per group, with **See all N**, which opens the same list read-only. Those numbers are settings in `config/editor.json`. Ungrouped files are always shown; groups only tidy.

**Why edits stay out of the files.** Editing a title, a role or a group changes how Library presents the file, not the file. Your PDFs and clips stay exactly as you made them, a rescan keeps what you set, and Discard really does discard. Moving a file happens only when you change where it belongs, in a Managed folder, and only after the footer has shown you the new path.

**Why a browser.** A show with a handful of bonus files should just show them. A course with two hundred worksheets needs search, filters and bulk actions or it is unusable, so the dropdown stays a dropdown and the browser takes over when there are more than eight.

## Match

**Match** opens on what the item is **already matched to**, found by its provider ID, with its picture, title, year, creator, the provider's name, **Open source**, **Change match**, **Remove match**, and a **Why this match** table (your file against the matched record, one row per fact, each labelled **Strong**, **Possible** or **Check**, with the reason). It never says "Nothing called ..." about an item's own title. You always match **the item selected in the header**, nothing else.

At the top are two sides:

- **Media providers** is the retail match (TheTVDB, TMDB, MusicBrainz, OpenLibrary, ComicVine, Apple or YouTube, whichever suits the kind).
- **Wikidata** is the canonical identity: a clean search and a box for a pasted link or QID, text-only results (label, description, kind, QID and one distinguishing fact), the evidence that links the record to what Library knows, and a clear line between a direct item and its parent (a show is never assigned as an episode's identity).

They are independent: changing one never touches the other, and the tab flags it when the two disagree.

**Change match** opens a compact search in place. One provider dropdown (the default first, each with its status), fields that suit the kind, the original file name as muted text, and clean values pre-filled from the file name, embedded metadata and folder hints. A search runs when you press **Search** or change a field, never when the tab opens. Results come with a preview of the chosen record, the local evidence beside it, a verdict with reasons, and **Apply match**, which is always allowed, even when the evidence disagrees. Applying stages the change; **Save changes** commits it, and Review shows what moves.

- **TV.** Find the show first (the show card has **Change show**, which works even when the file sits in the wrong folder), then a text list of that season's episodes (number, title, air date, runtime) with the episode suggested from the file name and the measured duration.
- **Music.** Search by artist, album or song; pick the album or release, then the disc and track. Choosing a track from another album moves the song there and renumbers it; the change is previewed first, and recordings say whether they are the original, a remaster, a live take or an edit.
- **Local videos, courses and supporting files** offer a match only where a provider supports it (a YouTube ID); otherwise the tab says plainly that the details stand on their own.

There is **no "Change placement"** and no table lining up every file. Matching an episode to another place moves it, and in a Managed folder its file; files are matched one at a time from the header. A match updates unlocked fields, keeps locked ones, writes History, follows the library's file-management mode, and pins the match so a later scan never re-identifies the file from its folder.

**Why a current match first.** The old tab opened on an empty search, so a matched item looked unmatched and gave a confusing "nothing found". Showing what it is matched to, with the reasons, answers the question people actually have, and it only searches when you ask. Strong, Possible and Check with a reason replaced percentages because a number like 87 does not tell you what to look at; "year differs by one" does.

## What is this file?

A file Library could not place, or one you want to move, is sorted from the browser's **Folders and files** view (the folder button in the item dropdown opens it). Choose one of:

- **An episode (or a track, or a book).** The file becomes that item.
- **A supporting file.** Pick its role and where it belongs: the whole show, a season or one episode; for a film, the film; for an album, the album or one track.
- **Belongs to another title.** Search any title in the Library and attach the file there.
- **Ignore.** The file is hidden from the Library and from future scans, but left on disk. Settings lists it, and **Add back** undoes it.

Library guesses from the file name ("Season 1 trailer.mkv" becomes a Trailer for Season 1) and the guess only fills in the choice; nothing is saved until you save. A workbook PDF in a course belongs to the course or to one lesson; "sample.mkv" is **Ignore**; a film or another show's episode dropped in the wrong folder is **Belongs to another title**; a real episode with an odd name is **An episode**. Supporting files never count as episodes, so sorting a clip that way never changes an episode count or anyone's watched marks.

**Why four choices.** A person looking at a stray file is not thinking "match" or "Extra"; they are thinking "what is this, and where does it go?". Four plain answers cover every case, and Ignore leaves the file on disk, so the choice can always be undone.

## Artwork

**Artwork** has a card for each picture role: Poster, Background and Logo for a film or show, Season poster or Episode still where they apply, and Cover for books, comics, albums and audiobooks. [Artwork types](../reference/artwork-types.md) explains each role. Each card says how many versions you have and which is **Preferred**.

Choose a card to see its picture large, at its real shape (a tall poster, a wide background, a logo), with zoom, and its file facts: size in pixels, file size, type and source. A line under the picture says exactly what changes ("Only this episode's still changes"). Below it a strip shows every version; **click a version to make it Preferred**, and it moves to the front. **Add artwork** offers three ways: the provider's choices (filtered by language, with your app's language first, and by size, with a quiet **Small** mark on pictures too small to look good), an upload, or a pasted link. For a season, **Fetch all** gets every episode still.

For shelves that support edits, you can also keep the stack of member art that Tuvima builds. A shelf cover belongs to the shelf. It does not replace the covers of its members.

**Why large and real-shaped.** The first Artwork tool drew every picture as a small square, so you could not tell a good poster from a poor one, and a wide logo looked cropped. Showing each at its true shape and size, with the file facts, lets you judge before you choose. One click for Preferred replaces a separate "set preferred" button because it is what people tried first. Like every change except Delete, it waits for Save.

## Series and Universes

**A Series is read-only.** Edit on a Series shows its name and its ordered members, locked, with a notice that a Series is a grouping made from its members' own matches. The item dropdown reaches any member, and **Close** is the only button. A Series has no Artwork tab; its tile is the automatic stack of its members' covers. To change a Series, edit one of its members.

**A Universe takes overrides only.** Its Details unlock only for what you add: a description override, aliases and extra pictures. Provider facts stay locked, with no unlock.

**Why.** A Series is a statement of fact that follows from the members' matches; editing it by hand would let it disagree with them. A Universe comes from the provider, so the editor keeps what you add apart from what they say.

## Bookmarks (administrators only)

On a film, an episode, a video, an audiobook or a book, an administrator also sees a **Bookmarks** tab. The upper list is **Everyone's**, exactly as the player shows it; the lower list, **From profiles**, is each profile's own bookmarks on the title. **Add to Everyone's** promotes one; **Remove from Everyone's**, **Rename** and **Change time** edit the set. The first change turns the pooled list into a set you curated, and **Start over from profiles** goes back. Rows on a film, episode or video start with the frame at that moment. **Export** saves the title's set as a file and **Import** compares an incoming file with Everyone's, per title or per show. Changes are staged and shown in Review changes like any other.

**Why here.** The player's job is playing; deciding what everyone sees is an administrator's job, and it benefits from the same Review and Save as every other edit. People who are not administrators never see the tab.

## History

**History** shows changes to matches, details, artwork and file intake, so you can see what changed and why. If newer changes conflict with yours, the editor keeps your input and offers reload; it does not write over the newer changes.

## Delete

Delete is the red button at the left of the footer, for the item you are on (including a whole show, season, album or Series). In the browser, ticked rows have **Delete** too, and a supporting file is deleted the same way. It asks **"Are you sure?"** once, and the box says what will go, how many files, how much space is freed, whether a hand-picked collection is affected, and, plainly, that removed files cannot be recovered (or that they go to the Recycle bin, when that media type has it switched on). Then it happens **at once**; it does not wait for Save.

Files in a read-only folder are never deleted. The item just leaves the Library and is left out of future scans. Unsaved changes on a deleted item are dropped, and changes on other items stay waiting. If you delete the item you are on, the editor moves to its parent, or closes when there is none.

**Why delete happens at once.** Every other change waits for Save because it can be reviewed and cancelled. The delete box already says everything Review would, and a second confirmation after the first would only be noise. The box says plainly that it happens now, so it cannot surprise you.

## Edit several items at once

Tick rows in a list (a song list, Needs Review, a library table, a season page) or in the supporting-files browser and choose Edit. The editor becomes **"Editing 12 songs"**, with small pictures, and its home button goes back to the family. It offers only the changes that make sense for all of them:

- Facts that identify one item, such as title, track or episode number, ISBN and file name, are never offered.
- Facts that describe a group are offered when every item is the same kind: album, album artist, genre, year and disc (songs); series and author (books); tags (everything); Explicit (songs and videos). Season and show are changed through Match, one item at a time.
- Where a change would make items collide ("These 3 songs would all be track 4") it is blocked, with the reason.
- Where the items differ, the field says "Mixed, leave unchanged".
- A read-only item stays in the selection, greyed with the reason; the change reaches the others.
- For artwork, only roles they share ("Set one cover for these 12 songs" sets the album's cover, said in words).

Review lists each item.

**Why rules and not a free-for-all.** Typing one title over twelve songs is a mistake nobody wants to find later. Offering only what is meaningful for the whole group makes the fast thing the safe thing.

## Edit a Universe, its characters, places and factions

A Universe opens the same editor, on a computer, from **Edit** on the Universe page or the Chronicle explorer. Under the title, instead of Season and Episode, the dropdowns are the Universe's kinds, searchable and with counts: Characters, Places, Factions, Events, Objects and Species (plus Concepts when Fandom Lore is on). Each dropdown has **Add** at the top, so you can add a character or faction Library does not know about. Pick one and the editor shows its **Details** (name, kind, description, aliases, what it belongs to), **Pictures** (a main picture, a logo and a background), **Match** (the Wikidata record, or "Not on Wikidata, added by you", with the usual before and after) and **History**.

Your own edits always win over provider facts, and the provider's value comes back if you clear yours. The Timeline is a read-only view and is not edited here. Things you added by hand can be deleted; things that come from the provider cannot.

A Universe is mostly read-only: its Details unlock only for overrides and additions, as described above.

**Why the same editor.** Characters, places and factions could not get a picture before. Using the editor everything else uses means one layout to learn, the same Review changes, and the same safety, and new kinds of Universe thing slot in without a new screen.

## Change text and personal notes

In **Details**, use Appearance to change the display title, description, tagline, sort title, or genres. My Library holds your own notes and local tags.

Genre and tag fields suggest values already used in your library. Type a full value, then press Enter or choose a suggestion. You can type spaces without saving the tag too soon.

People, dates, language, runtime, and source ratings come from the file or provider. To fix a wrong source match, use **Match**. These facts are not all fields you can type over.

## Mark a video Explicit

On a video or a series of videos, the editor's Details tool has an **Explicit** switch. It saves straight away and hides the item from every Kid's profile, whatever the household's Show unrated items setting says; every other profile still sees it. Nothing is shown for other kinds of item.

## Videos: series, order, names and identifying

These tools are in the editor's **Match** tab and the header's item dropdown, for a video, on a computer only. Everything here is staged like any other change: nothing is saved until you choose **Save changes** and confirm in **Review changes**.

- **Series.** A video that stands on its own shows a **Not matched** tag beside **Series**, because a video's only "match" is the series it belongs to. Pick an existing series (the list shows how many videos each has), choose **Start a new series…** and give it a name, or leave it on **Not in a series**. A line under the choice says what will happen in words, for example "joins Cooking with Sam, at the end of the list. Your file is not moved or renamed." A video that is already in a series can be taken out the same way.
- **Order.** Open the series and choose **Reorder videos** at the end of the item dropdown (the browser has the same order view). Drag a video by its grip handle and a purple line shows where it will land, or use the up and down arrows; the arrows are there for keyboard and screen-reader users, and they do exactly what dragging does. The list follows as you arrange. **Sort by file name** (so "Ep 2" comes before "Ep 10") and **Sort by date added** put the list in order once; you can then adjust by hand. **Put back as saved** undoes your arranging before you save.
- **Sections.** A series that has sections shows one list per section. Drag a video from one section to another, or onto a section's row.
- **Several videos at once.** Tick the videos in a list and choose **Put in a series**. Review lists each video and flags any that cannot join.
- **Rename the files to match this order.** Off by default, and shown only when every video in that list is in a Managed folder. It numbers each file in the folder it is already in ("02 - Kitchen tour.mkv"). A read-only folder never shows the switch and is never touched.
- **Identify.** In the "..." menu of a video that has not been matched, **Identify** opens the editor on Match. Paste a YouTube link or the 11-character video ID and Library looks it up. Only the ID is sent to YouTube, never your file, and only for a library of the YouTube kind. Once a video is matched the entry no longer appears.
- **Change thumbnail.** In the same "..." menu, opens the editor on Artwork, on the cover.

**Why series and order never touch your files.** A series is how Library shows videos together; it is not a folder on disk. Keeping it in Library's own data means you can rearrange as often as you like, a re-scan keeps your choice, and Cancel really does cancel. The one exception is the rename switch: a file name is changed on disk and cannot be changed back by Library, so it is off by default, listed last in Review marked "Cannot be undone", and run one file at a time. Series and order rows in Review are marked "Library only" so you can see at a glance that no file is involved.

**Why there is no "order by file name" rule.** The sort buttons are a one-time tidy-up, not a standing rule. A guess from names like "Part 2" can look like your own choice when it is wrong, so Library never reorders on its own; you decide, and what you save is what you get.

## Fix a wrong match

Open **Match** and pick the right candidate (see above). If its parent or place in a series changes, check **Previous Path → Target Path** before you apply it. The provider match and main artwork change first. Wikidata links and richer details may arrive later. Art you uploaded stays available.

Applying a match to an episode or track elsewhere moves it, with its own preview and confirm step; in a Managed folder its file moves too, with the amber footer warning first. A normal text edit does not move it to a different show, season or album, and a match never moves your files in a Read-only folder.

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
- [Name supporting files so Library places them](naming-supporting-files.md)
- [Understand library source safety](library-settings.md)
- [How the editor is built](../architecture/inline-media-editing.md)
