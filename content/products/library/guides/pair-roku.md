---
title: "Pair a Roku"
description: "Put the Library channel on your Roku with developer mode, then pair it with your server by approving a code in the Dashboard."
audience: user
category: guide
product_area: apps
status: early-access
---

# Pair a Roku

Library has a Roku channel written for Roku's SceneGraph system. It is in **Early Access** and is **not in the Roku Channel Store**: Roku has not yet confirmed that the way the channel signs in meets its rules, so a public listing is on hold. Until then you install it on your own Roku with developer mode. The channel's own first test on a real Roku is still to come. Allow about 30 minutes.

## Before you start

- A Library server on your network and its address from **Settings → Overview → Apps**. See [Apps on your phone and TV](apps-on-your-phone-and-tv.md).
- A computer with Node.js and a copy of the Library source code, because the channel is packaged from it. No Roku tools are needed.
- A Roku on the same network as the computer.

## Install the channel

1. On the computer, from the source code's top folder, run `node tools/Package-RokuChannel.mjs`. It checks the channel's manifest and pictures and writes `clients/roku/dist/library-roku.zip`.
2. On the Roku remote press **Home** three times, **Up** twice, then **Right**, **Left**, **Right**, **Left**, **Right**. Developer mode opens. Accept the terms, set a web password you will remember, and let the Roku restart. Note its IP address on screen.
3. On the computer open `http://<roku-ip-address>` in a browser and sign in with the user name `rokudev` and your password.
4. Choose **Upload**, pick `library-roku.zip` and choose **Install**. The channel opens on the TV.

The Roku developer pages are the final word on these steps if your Roku's menus differ.

## Pair the Roku

1. In the channel, type your server's full address, starting with `http://` or `https://`, using the on-screen keyboard.
2. The Roku shows a short code and the Dashboard address.
3. On your phone or computer, sign in to the Dashboard as an administrator, open that address and check that the code matches.
4. Approve the Roku. The channel opens Home.

Nothing is paired until you approve it. Sign a Roku out under **Settings → Security & Devices → Devices**; it must be paired again.

The Roku has no secure place for sign-in tokens, so the channel keeps its token in the Roku's own registry. The server rotates tokens and ends a device's sign-in if one is replayed.

## What you can do today

- **Home** shows Continue first, then your shelves, a **Collections** row and a **Photos** row. Select a Universe in Collections to see its Series.
- **Photos** open full screen and left and right step through the row. You must tick photos and videos when you pair. Photo videos are not played.
- **Profiles** lists the people this Roku may switch to, with a PIN box when one is needed.
- **Playback** uses the shared player. The overlay shows five transport buttons and a tool row (Episodes, Audio & subtitles, Bookmarks, Playback settings) with side panels, paused details and an **Up next** card. Rewind and Fast-forward skip by your profile's seconds, and Back closes a panel, then the overlay, then the video.
- **Find subtitles…** and **Find lyrics…** are in the player when your server can look them up.

## What is missing

- **No downloads** on Roku.
- **No playback speed**, because Roku's player cannot change speed.
- **Music and audiobooks** play in Roku's own playback screen, with Lyrics but without a full Now playing screen, queue or chapters.
- **Subtitle appearance** follows Roku's own captions settings.
- Episode pictures and bookmark pictures are not drawn yet.
- Lessons and Homework for folders of videos are not listed.
- A remote cannot type a note, so bookmarks have no note field.
- The channel has not yet been checked for focus, text sizes from the sofa and some remote keys on a real Roku.
