---
title: "Keep your place with For Me"
description: "Use My List and For Me to return to what you saved and what you started, without confusing saved state with progress."
audience: user
category: guide
product_area: profiles
status: current
---

# Keep your place with For Me

Use For Me in Tuvima Library to return to saved items and work in progress. This two-minute guide explains the shelves for your active [profile](../reference/glossary.md#profile).

## Find your shelves

**My List** is your personal page. Open it with the bookmark in the top bar, or with the **My List** tab on a phone. From top to bottom it shows your profile (with links to Activity, Liked, Switch profile and Settings), a Downloads card in the Tuvima app, **Continue** for anything you have started, and then everything you saved for later as a grid of covers.

Home also shows a **My List** row directly under Continue with your 20 newest saves. It disappears when the list is empty.

Open **For Me** for the wider picture: Continue, My List, Favorites, Your Collections, Your Playlists, and Your Galleries when they have items.

Continue follows reading or playback progress. My List saves items for later. Favorites holds songs you have marked with a heart and opens inside Listen as a playlist you can put in your own order. You can save, favorite, or start an item on its own. One choice does not make the others.

## Save something for later

1. Open an item's details page, the Home hero, or a cover's "..." menu.
2. Select **Add to My List** (the plus). The plus becomes a tick once the item is saved.
3. Open **My List** to find it. The newest save comes first.

You can save a movie, TV show, book, comic, audiobook, album, or collection you can access. You can also save a library or shared playlist as one entry. For songs, use the heart (Favorite) or Add to Playlist instead.

Why a plus and not a heart: the plus means "keep this for later", and the heart is kept for songs you love. Like and Dislike are separate again, because saving something does not say what you think of it.

## Work with the list

- **Narrow it.** The row of kinds (All, Movies, TV shows, Books and so on) shows only the kinds you have saved, each with a count. The row is hidden when everything on the list is one kind.
- **Sort it.** Date added (the default), Title or Release year. Your choice is remembered for your profile on every device, and it applies inside a kind too, so Movies sorted by Title gives your saved movies from A to Z.
- **Remove one.** Use the cover's "..." menu and choose **Remove from My List**. Nothing asks "are you sure"; an **Undo** line appears for about ten seconds and puts the title back exactly where it was.
- **Remove several.** Choose **Select**, tick the covers, then **Remove from My List**. On a phone, Select is in the page's "..." menu. Undo works for the whole group.
- **Clear what you finished.** Finished titles stay on the list until you take them off, so nothing vanishes by surprise. **Remove finished** in the page's "..." menu takes off everything you have completed in one go.

Everything above works the same on a phone as on a desktop.

## Find favorites and your own groups

Open **Favorites** in the Listen rail for your favorite songs: it is a playlist inside Listen, newest heart first, which you can sort by any column or put in your own order (see [Favorites](dashboard-tour.md#favorites)). For Me also lists them. Favorites does not browse favorite items across all media types. Like/Dislike ratings are separate from Favorite. A song's heart adds it to Favorites. Favorites in View belong to that separate personal-media surface.

Your own collections, playlists, and galleries appear in their **Your** shelves. Library collections and shared playlists enter My List only when you choose to save them.

Switch profiles to change whose progress and saved items you see. You can switch only to profiles your account is allowed to use.

<details>
<summary>Technical details</summary>

My List is at `/my-list`. For Me's overview uses `/for-me`, and its Favorites view uses `/for-me?view=favorites`, and the Favorites playlist in Listen is at `/listen/music/playlists/system/favorite-songs`. Saved items, reactions, and progress have separate profile records. They are not stored as hidden collections or playlists.

Watchlist, Reading List and Listening Queue are retired terms. The older addresses `/my-library`, `/for-me?view=my-list` and `/all/personal/my-list` no longer exist.

</details>

## Next steps

- [Start or resume an experience](playback-and-reading.md)
- [Organize personal media in Galleries](view-personal-space.md)
- [Tour the Dashboard](dashboard-tour.md)
