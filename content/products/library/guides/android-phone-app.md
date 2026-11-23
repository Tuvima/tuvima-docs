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
- The app's installation file (an APK). **No download is published yet.** Until it is, you build it from the source code with JDK 17, the Android SDK and Gradle 9.3.1, as the [Android clients' readme](../../clients/android/README.md) describes: run `gradle :mobile:assembleDebug` in the `clients/android` folder and install the APK on your phone. The plan is a signed APK on the project's GitHub releases page first, then Google Play after a small closed test with friends.
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
- **Watch, Read, Listen, View, Collections.** Watch lists movies and shows with the Dashboard's sort and filter. Listen has Songs, Albums, Artists, Audiobooks and Favorites. View has Timeline, Galleries, People and Places for your photos (a Places entry cannot be opened yet). Collections lists your collections and each Universe with its Series, cast and adaptations. Read lists books and comics and opens their details.
- **Search.** The dock's Search tab opens a full-screen search with results grouped by kind.
- **My List.** A plus (or tick) on covers and details saves a title to your list, a heart saves songs, and the My List page has sort, kind chips, **Select** for removing many at once and an Undo for about ten seconds.
- **Recently added** from the menu.
- **Downloads and offline.** Download a movie, episode, song or audiobook, or a whole show, season, album, playlist or audiobook with **Download all…**. Downloads play with no connection, and your place and bookmarks sync when you are back online. **Downloads** shows progress with Pause, Resume, Retry and Cancel, plus a storage limit and **Download on Wi-Fi only**. A download stops when less than 500 MB would stay free on the phone. Signing out removes every download from the phone. A Kids profile has no download settings.
- **Video player.** It follows the shared player: a title line, five transport buttons, and tools for **Audio & subtitles**, **Episodes** and **Bookmarks** in bottom sheets, plus **Playback settings** and **Picture in picture** in the "..." menu. Double-tap the left or right half to skip, slide on the right half for volume and on the left for brightness. After an episode, an **Up next** card offers the next one. **Find subtitles…** appears when your server can look them up. Video plays in landscape and everything else stays in portrait.
- **Edit in browser.** A title's "..." menu has **Edit** (not for a Kids profile). It opens that title's own page in the Dashboard in your phone's browser, where you sign in as usual. It does not open the editor for you.

## What is missing

- **Music and audiobook screens.** Songs and audiobooks play through your phone's media notification and lock screen, but the app has no full Now playing screen, queue, lyrics view, audiobook chapters or sleep timer yet.
- **A reader.** Books and comics can be browsed but not read in the app.
- **Editing inside the app.** Edit opens the Dashboard in the browser, by design for this version.
- **Playlists** are not listed, and the app has no Add library, since setup stays on the Dashboard.
- **Android Auto** is not ready. See [Apple apps and cars](apple-apps-and-cars.md).
