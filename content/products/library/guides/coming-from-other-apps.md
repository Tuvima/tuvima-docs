---
title: "Coming from Plex, Jellyfin, Emby or Kodi"
description: "How Library uses the IDs in your folder names and NFO files to match films and shows exactly, and how to have Library write NFO files for your other apps."
audience: user
category: guide
product_area: libraries
status: current
---

# Coming from Plex, Jellyfin, Emby or Kodi

If another app already organised your films and shows, Library can use what it left behind, so your titles match exactly on the first scan and fewer land in **Needs Review**.

## IDs in folder and file names

Plex writes IDs in curly brackets (`Dune (2021) {tmdb-438631}`) and Jellyfin in square brackets (`Dune (2021) [tmdbid-438631]`). Library reads TMDB, TheTVDB and IMDb IDs written either way, and skips the search.

## IDs in NFO files

An NFO file is a small text file beside a film or show that names the exact title. Movies and TV libraries read these files automatically. There is no setting.

- **Films:** `<film file name>.nfo`, or `movie.nfo` in a folder that holds only that one film.
- **Shows:** `tvshow.nfo` in the show folder applies to every episode under it. An episode's own `<episode file name>.nfo` gives its season and episode number when the file name does not.
- **What is read:** only the TMDB, TheTVDB and IMDb IDs (and an episode's numbers). Titles, descriptions, cast and pictures in an NFO file are not used; what Library shows still comes from its chosen sources. Library reads an address in an NFO file for the ID and never opens it.
- **Shows use TheTVDB.** If a show's NFO has only an IMDb or TMDB ID, Library asks TheTVDB which show carries it; if TheTVDB has no match it falls back to a normal name search.
- **Disagreements:** if an NFO ID and an ID in the folder name name different titles, Library trusts neither and searches as usual. The item may wait in **Needs Review**.
- **Later changes:** editing an NFO file does not rematch a title that is already matched. Change a match in the editor's **Match** tab.
- Files that are not NFO metadata (old release notes) and very large files are skipped.

## Writing NFO files for your other apps

Open the library's **File handling** tab and turn on **Write NFO files** (Movies and TV libraries, off by default), then **Save changes**.

- Library writes `<film or episode file name>.nfo` beside each matched title and `tvshow.nfo` in each show folder, with the title, year, description, season and episode numbers and the TMDB, TheTVDB and IMDb IDs. No pictures, cast, ratings or watch history.
- Only in folders Library may change. A library with only Read-only folders cannot switch it on.
- An NFO file that another app wrote is never changed. Library updates only files it wrote itself (they carry a line saying so).
- Files are written during Library's regular pass over your files, not during the scan, and only while file writing is on. Turning the switch off stops new writes; existing files stay.
