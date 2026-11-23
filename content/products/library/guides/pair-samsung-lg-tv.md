---
title: "Pair a Samsung or LG TV"
description: "Understand the Library TV web app for Samsung and LG televisions, what is built so far, and the developer steps to try it before store listings exist."
audience: user
category: guide
product_area: apps
status: early-access
---

# Pair a Samsung or LG TV

Samsung and LG TVs run the **Library TV web app**: one plain web app with its own television screens, wrapped as a Samsung Tizen package and an LG webOS package. It is in **Early Access**.

**Store listings are not live yet.** You cannot find Library in the Samsung or LG app stores today. The packages have also not yet been built, installed or run on a real Samsung or LG TV, because no TV or simulator was available when they were written. This page tells you what exists and how developers try it. If you are not comfortable with developer tools, wait for the store listings.

## Before you start

- A Library server on your network and its address from **Settings → Overview → Apps**. See [Apps on your phone and TV](apps-on-your-phone-and-tv.md).
- A computer with the Library source code and the TV maker's tools: Tizen Studio for Samsung, or the webOS command line tools for LG.
- **Allow packaged TV apps on the server.** A packaged TV app runs from a non-web address, so the Dashboard refuses it until you turn on `native_app_access.allow_browser_apps` in `config/network.json`, then restart. It is off by default. While it is on, a website could start a pairing request, although nothing is paired until you approve its code, so turn it on only if you use a Samsung or LG TV app. See [Configuration](../reference/configuration.md).

## Try it on a Samsung TV

1. On the TV open Apps, press **1 2 3 4 5** on the remote, switch **Developer mode** on, enter your computer's IP address and restart the TV.
2. In Tizen Studio make a certificate profile in Certificate Manager.
3. From the source code's top folder run `pwsh -NoProfile -File clients/tv-web/platforms/tizen/package.ps1 -Certificate <profile> -Tv <tv-name>`. It prepares the package and prints the `tizen` commands to build, sign, install and run it. Run them.
4. The app id in the package is a placeholder. Samsung issues the real one when an app is listed in its store.

The full steps are in the [Samsung Tizen readme](../../clients/tv-web/platforms/tizen/README.md).

## Try it on an LG TV

1. On the TV install **Developer Mode** from the LG Content Store, sign in with an LG developer account, switch it on and turn on **Key Server**. The TV restarts; note its IP address and passphrase.
2. On your computer install the webOS TV command line tools (`@webos-tv/ares-cli`).
3. Run `pwsh -File clients/tv-web/platforms/webos/package.ps1 -Device tv`. It prepares the package and prints the `ares-package`, `ares-setup-device`, `ares-install` and `ares-launch` commands. Run them.

The full steps are in the [LG webOS readme](../../clients/tv-web/platforms/webos/README.md).

## Pair the TV

1. Open **Library** on the TV and type your server's address with the on-screen keyboard. With no `http://` or `https://`, the app tries `https` first and then `http`.
2. The TV shows a short code and the Dashboard page to open.
3. On your phone or computer, sign in to the Dashboard as an administrator, open that page and check that the code matches.
4. Approve the TV. The app opens Home.

Sign out from the TV under **Settings** in the app, or from **Settings → Security & Devices → Devices** in the Dashboard.

## What you can do today

- **Home**, **Watch**, **Read** and **Listen** shelves, **Collections**, each **Universe**, **Search** and an item's details with its seasons and episodes. Read is browse only: books and comics open a details page but cannot be read on the TV.
- **Playback** through the shared player, with five transport buttons, a tool row with side panels (Episodes, Audio & subtitles, Bookmarks, Playback settings), paused details and an **Up next** card. Songs show **Lyrics**. **Find subtitles…** and **Find lyrics…** appear when your server can look them up.
- **Profiles** with a PIN pad, and **Settings** for video quality, HEVC on or off, and **Sign out**.
- Remote keys: arrows move focus, Select chooses, Back goes back, and the media keys work in the player.

## What is missing

- No store listing, and no Samsung or LG hardware sign-off for HEVC, captions or remote keys.
- No photos on TV.
- No full-screen Now playing for music, and no audiobook player.
- Playback settings you change on the TV stay on the TV and do not change your profile.
- Lessons and Homework for folders of videos are not listed, and the rating card is not drawn.
- **A setting you change by hand:** turning on `native_app_access.allow_browser_apps` means editing a file, because there is no switch for it in the Dashboard yet.
