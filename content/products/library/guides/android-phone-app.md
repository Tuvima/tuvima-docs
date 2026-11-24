---
title: "Use the Library app on an Android phone"
description: "Pair the Library Android phone app with your server and learn what it can browse, search, save, download and play, and what it leaves to the Dashboard."
audience: user
category: guide
product_area: apps
status: early-access
---

# Use the Library app on an Android phone

The Library app for Android phones and tablets is laid out like the Dashboard on a phone. It is in **Early Access**: it is not in Google Play, no download is published yet, and several screens are still being built. This page says what works today and what does not.

## Before you start

- A Library server on your network. See [Apps on your phone and TV](apps-on-your-phone-and-tv.md).
- A phone or tablet running Android 9 or newer.
- The app's installation file (an APK). **No download is published yet.** Until it is, you build it from the source code with JDK 17, the Android SDK and Gradle 9.3.1, as the [Android clients' readme](../../clients/android/README.md) describes: run `gradle :mobile:assembleDebug` in the `clients/android` folder and install the APK on your phone. The project can sign the phone and TV APKs itself: pushing a version tag signs them with the project's own key and attaches them to a GitHub release (it never uploads to Google Play). The plan is a signed APK on the project's GitHub releases page first, then Google Play after a small closed test with friends.
- **Price.** The store versions are planned at a one-time $4.99 that covers phone and tablet on that store, with no further payments. Nothing can be bought today.

## Pair the phone

1. Open **Library** and type your server's address. **Settings → Overview → Apps** in the Dashboard shows it, with a QR code that fills it in.
2. Choose whether the app may use your photos and videos. It is off unless you tick it, and you can re-pair to change it.
3. The app shows a short code. On another device, sign in to the Dashboard as an administrator, open the page shown and approve the code.

At home you need no password on the phone. The address you type is your **home address**. If you set up an outside address in [Secure remote access](remote-access.md), the app learns it when it pairs and when it starts, tries your home address first, and switches to the outside address by itself when you are away. If you later remove the outside address, pair the phone again so it forgets it. Sign a phone out under **Settings → Security & Devices → Devices**.

## Find your way around

The top bar has a menu button, the logo, **Downloads**, **My List** and your picture. Under it are the section chips **Read**, **Watch**, **Listen**, **View** and **Collections**, and a floating dock at the bottom has **Home**, **Search** and **My List**. The menu lists Home, My List, Recently added, the sections, **Settings**, **Switch profile** (when your household has more than one) and **Sign out**. A Kids profile sees a smaller menu and no Settings page.

## What you can do today

- **Home.** A hero card of featured titles, then Continue, your shelves and a My List row.
- **Watch, Read, Listen, View, Collections.** Watch lists movies and shows with the Dashboard's sort and filter. Listen has Songs, Albums, Artists, Audiobooks, Playlists and Favorites, and the Songs page has **Play** and **Shuffle**. View has Timeline, Galleries, People and Places for your photos; a person or a place opens their photos and videos. Collections lists your collections and each Universe with its Series, cast and adaptations. Read lists books and comics and opens their details.
- **Search.** The dock's Search tab opens a full-screen search with results grouped by kind.
- **My List.** A plus (or tick) on covers and details saves a title to your list, a heart saves songs, and the My List page has sort, kind chips, **Select** for removing many at once and an Undo for about ten seconds.
- **Recently added** from the menu.
- **Downloads and offline.** Download a movie, episode, song or audiobook, or a whole show, season, album, playlist or audiobook with **Download all…**. Downloads play with no connection, and your place and bookmarks sync when you are back online. **Downloads** shows progress with Pause, Resume, Retry and Cancel, plus a storage limit and **Download on Wi-Fi only**. A download stops when less than 500 MB would stay free on the phone. Signing out removes every download from the phone. A Kids profile has no download settings.
- **Music and audiobook players.** Music and audiobooks play in a mini player above the dock, which opens a full **Now playing** screen with the cover, a timeline, the five transport buttons and a row of tools. A song has **Queue**, **Lyrics** (they follow the song, line by line when they are synced), Shuffle and Repeat. The queue lets you play a song next, move it up or down, or remove it, and turning Shuffle off puts the songs back in their order. An audiobook has **Chapters**, **Playback speed**, **Sleep timer** (presets, end of chapter or your own time, and it keeps running with the screen off) and **Bookmarks**, and it picks up where you left it. The lock screen and headset buttons control both.
- **Playlists.** The **Playlists** tab in Listen shows your own playlists as tiles, pinned ones first, with the song count and length. A playlist page has **Play**, **Shuffle**, **Download all** and its songs. Playlists are read-only here: make and change them on the Dashboard. A playlist from a search opens the same page. Offline, only the songs downloaded to the phone play.
- **Place photos.** In View, a place opens the photos and videos taken there, like a person does.
- **Android Auto.** The phone app's media service gives the car four tabs: **Continue**, **Listen** (with **Recently played** as its first shelf), **Audiobooks** and **Playlists**. The car shows only audio, lists are short, and you can ask by voice to play something. The Now playing card has Previous, Play and Next with Shuffle and Repeat for music, and back and forward with Previous and Next chapter and a speed button for an audiobook. The Engine decides what a Kids profile may see.
- **Video player.** It follows the shared player: a title line, five transport buttons, and tools for **Audio & subtitles**, **Episodes** and **Bookmarks** in bottom sheets, plus **Playback settings** and **Picture in picture** in the "..." menu. Double-tap the left or right half to skip, slide on the right half for volume and on the left for brightness. After an episode, an **Up next** card offers the next one. **Find subtitles…** appears when your server can look them up. Video plays in landscape and everything else stays in portrait.
- **Edit in browser.** A title's "..." menu has **Edit** (not for a Kids profile). It opens that title's own page in the Dashboard in your phone's browser, where you sign in as usual. It does not open the editor for you.

## What is missing

- **Not tested on real devices yet.** The player, Playlists and Android Auto are built but have not been tried on a real phone and in a real car. Android Auto has not been checked on the Desktop Head Unit either.
- **A reader.** Books and comics can be browsed but not read in the app.
- **Editing inside the app.** Edit opens the Dashboard in the browser, by design for this version.
- **Making playlists.** The app only reads and plays them. Playlists are made and changed on the Dashboard, and the app has no Add library, since setup stays on the Dashboard.
- **Go to album and Go to artist** from a song in the queue are not there yet.
- **Other cars.** CarPlay is not built into a released app. See [Apple apps and cars](apple-apps-and-cars.md).
