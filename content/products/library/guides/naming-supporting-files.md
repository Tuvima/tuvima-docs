---
title: "Naming supporting files"
description: "How Library decides which show, season, episode or lesson a guide, worksheet, trailer or picture belongs to, from its folder and file name."
audience: user
category: guide
product_area: editing
status: current
---

# Naming supporting files

A **supporting file** is a guide, worksheet, transcript, booklet, trailer, featurette, picture or other clip that sits beside a show, film, album, book or course. Library reads where it belongs, what it is and what to call it from its **folder** and its **file name**. If your files are laid out the way this page describes, Library places them with no editing at all. If they are not, nothing is lost: the file still appears (as **Other** or **Clip**), and you can fix it in the [editor](editing-items.md#supporting-files).

**Why it reads names instead of asking.** A course can have two hundred worksheets. Asking you to place each one would be the whole job. Folder and file names already say most of it ("Season 02", "S02E03 - homework.pdf"), so Library guesses first, shows you why, and lets you correct only what is wrong.

## What counts as a supporting file

Only files Library can open and show:

- Documents: `.pdf`, `.txt`, `.md`, `.epub`.
- Pictures: `.jpg`, `.png`, `.webp`, `.gif` and similar.
- Video and audio clips: `.mp4`, `.mkv`, `.webm`, `.mp3`, `.m4a`, `.flac` and similar.

These are **never** supporting files, and Library never shows them as items: archives (`.zip`, `.7z`, `.rar`), `.nfo`, `.xml`, `.json` and other metadata files, subtitle files (`.srt`, `.sub`, `.ass`, which belong to the video they go with), posters, fanart and thumbnails named for a media file, and anything else Library cannot open. They are not hidden from you: the editor's **Browse files and folders** view still lists them in grey as "Not shown in the library".

**Why.** A zip or an `.nfo` as a card on a show page would be clutter, and a poster or subtitle mistaken for an extra would be wrong twice.

## Which title, season or episode it belongs to ("Belongs to")

Library looks at the deepest title folder the file sits in. The first rule that fits wins.

| Where the file is | It belongs to |
|---|---|
| In the show's own folder | The show |
| In a season folder (`Season 02`) | That season |
| Named after an episode's file, or in a folder named after it | That episode |
| In a course: in the course folder, in a section folder, or sharing the number or words of a lesson | The course, that section, or that lesson |
| In a film's, album's or book's folder | That film, album or book |

Folders called **Extras**, **Featurettes**, **Bonus**, **Documents**, **Materials** or **Resources** do not change the owner. They are hints about the file's role and group instead.

## "Shown alongside"

A file that belongs to a whole season or course can also be shown beside one episode or lesson, without becoming that episode's file. Library picks it when the file name shares:

- an episode code, such as `S02E03`;
- a leading number, such as `03 - Homework.pdf` for lesson 3; or
- the words of the episode's or lesson's title.

Otherwise there is no "Shown alongside". The result is a small chip under that episode or lesson ("Worksheet · PDF") and, on a course, a **Homework for this lesson** block on the player's end card.

## What it is (the role)

The role comes from the type of file first, then words in the folder and file name. The words are kept in `config/extras.json`, so they can grow without changing the app.

| Role | Words and folders that suggest it |
|---|---|
| Trailer | trailer, teaser, promo; folder `Trailers` |
| Featurette | featurette; folder `Featurettes` |
| Behind the scenes | behind the scenes, bts, making of; folder `Behind the scenes` |
| Deleted scene | deleted scene, outtake, blooper, gag reel; folder `Deleted scenes` |
| Interview | interview; folder `Interviews` |
| Worksheet | workbook, exercise, homework, worksheet, assignment; folders `Worksheets`, `Homework`, `Exercises` |
| Guide | guide, handbook, manual, companion, cheat sheet; folder `Guides` |
| Transcript | transcript, lyrics, script; folder `Transcripts` |
| Notes | notes, readme; folder `Notes` |
| Booklet | booklet, liner notes, artbook; folder `Booklets` |
| Pictures | a folder of pictures; folder `Pictures` |
| Clip, Other | anything else (a video is a Clip, a document is Other) |

## Groups

A sub-folder inside an **Extras**, **Bonus**, **Documents**, **Materials** or **Resources** folder, whose name is not a role word, becomes a **group**. `Extras/Character guides/Elves.pdf` is in the group "Character guides". Groups only tidy the Extras row and the browser; they never move a file. A title with many supporting files and no groups is grouped by kind (Documents, Videos, Pictures) until you name groups.

## The title

The title is the file name without its extension, tidied up (separators become spaces, leading numbers stay). **Suggest details from the document** in the editor can replace it with the document's own title and description, read on your computer with no provider.

## Examples

| File | Belongs to | Shown alongside | Role | Group |
|---|---|---|---|---|
| `The Expanse/Season 02/Documents/S02E03 - homework.pdf` | Season 2 | Episode 3 | Worksheet | none |
| `The Expanse/Extras/Trailers/teaser.mkv` | The Expanse | none | Trailer | none |
| `The Expanse/Extras/Character guides/Amos.pdf` | The Expanse | none | Guide or Other | Character guides |
| `MasterClass/Section 2/Workbook.pdf` | Section 2 | none | Worksheet | none |
| `MasterClass/Section 2/03 - Ball handling - worksheet.pdf` (beside `03 - Ball handling.mp4`) | Lesson 3 | none (it already belongs to the lesson) | Worksheet | none |
| `MasterClass/Section 2/03 - Homework.pdf` | Section 2 | Lesson 3 (shares the number) | Worksheet | none |
| `Dune (2021)/Featurettes/Making Dune.mkv` | Dune (2021) | none | Featurette | none |
| `Some Album/booklet.pdf` | Some Album | none | Booklet | none |

## When the guess is wrong

Open the supporting file in the editor (from the item dropdown, or **Browse files and folders** for any file Library found) and change **Belongs to**, **Role**, **Group** or **Shown alongside**. Under **Belongs to** a line says "From its folder location" or "Set by you"; **Use folder location** takes your choice back to what the folder says. A value you set is kept across rescans.

- In a **Managed** folder, changing **Belongs to** moves the file into the matching folder (the show, `Season 02` or the episode's folder), and the editor's footer shows the amber from → to path before you save.
- In a **Read-only** folder nothing moves. Only the file's place in the Library changes.
- Changing the group, role, title, description, tags or "Shown alongside" never moves or rewrites a file.

A file Library could not place at all is sorted from the browser's **Folders and files** view ([What is this file?](editing-items.md#what-is-this-file)): an episode, a supporting file with a role and a place, another title's file, or ignored.

## See also

- [Correct an item](editing-items.md#supporting-files)
- [Adding media](adding-media.md#extras-beside-a-title)
