---
title: "Apps on your phone and TV"
description: "See which Library apps exist for phones, TVs and cars today, what they cost, how they connect to your server and which licence covers them."
audience: user
category: guide
product_area: apps
status: early-access
---

# Apps on your phone and TV

Library has apps for televisions and Android phones and tablets, so you can browse and play what you own without opening the Dashboard in a browser. All of them are in **Early Access**: the code is public and being tested, but none is in a store yet, so you install each one by hand.

## You need a Library server first

The apps are players for your own server. They do not contain any movies, shows, music or books, and there is no Library account to create with Tuvima, Roku, Samsung, LG or anyone else. [Install the server](../install/windows.md) and [add your media](adding-media.md) first, then pair an app with it.

Every app talks only to the server address you type in. They show no ads and send nothing to Tuvima. See [Understand privacy and network access](../explanation/privacy-local-first.md).

## What exists today

| Device | Status | How you get it today | Guide |
|---|---|---|---|
| Android TV | Early Access | Install by hand (sideload) | [Android TV and Fire TV](pair-android-tv-fire-tv.md) |
| Fire TV (Android-based models) | Early Access | Install by hand (sideload) | [Android TV and Fire TV](pair-android-tv-fire-tv.md) |
| Roku | Early Access | Install by hand with Roku developer mode; not in the Roku Channel Store | [Roku](pair-roku.md) |
| Samsung TV and LG TV | Early Access | Packages exist but have not been tried on a real TV; store listings are not live | [Samsung and LG TV](pair-samsung-lg-tv.md) |
| Android phone and tablet | Early Access | Build it from the source code; no download is published yet | [Android phone](android-phone-app.md) |
| iPhone, iPad, Apple TV, Android Auto and CarPlay | Planned | Not available | [Apple apps and cars](apple-apps-and-cars.md) |

"Early Access" means the app works well enough to try, parts are missing, and some of it has not yet been tried on a real device by the Library team. Each guide lists what is missing.

## What they cost

- **TV apps are free.**
- **The phone and tablet apps are planned at a one-time $4.99** for each store, with no subscription and no further payments. This is the plan, not a price you can pay today: no store listing is live yet.
- The Dashboard in your browser and the apps' source code stay free.

## What works the same everywhere

- **Pairing.** Type your server's address, the app shows a short code and a web page, and someone signed in to the Dashboard approves it. At home there is no password to type on the TV. Paired devices are listed, and can be signed out, under **Settings → Security & Devices → Devices**.
- **The player.** Every app uses the same player buttons in the same order: Previous, back 10 seconds, Play, forward 30 seconds and Next, with tools for Episodes, Audio & subtitles, Bookmarks and Playback settings. A control that cannot act is dimmed in place instead of hidden. [Why the player works this way](../explanation/why-the-player-works-this-way.md) explains the rules.
- **Your words.** Library, Series, Universe, Work, Edition and Needs Review mean the same in the apps as in the Dashboard.
- **Find your server address.** **Settings → Overview → Apps** shows the address to type and a QR code that fills in the app's server field. The **At home** address works on your home network. For use away from home, set up an outside address with [Secure remote access](remote-access.md). Only the Android app switches between the two addresses on its own so far.

## Licence

The apps are open source under the **Mozilla Public License 2.0** (MPL 2.0), so anyone may use, change and ship them, including through an app store. If you change one of the app's files and share it, you share that change under the same licence. The Library server stays under the **GNU Affero General Public License, version 3** (AGPLv3). See [License](../policies/license.md) and the apps' [contribution note](../../clients/CONTRIBUTING.md).

## What is not built yet

- No app is in a store, so nothing here updates itself.
- Editing an item is not part of the apps. On a phone, **Edit** opens the item's page in the Dashboard in the phone's browser.
- Books and comics can be browsed on a phone or TV but not read there yet.
- Cars and Apple devices are [planned](apple-apps-and-cars.md).
