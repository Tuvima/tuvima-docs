---
title: "First-run setup"
description: "What each step of Library's first-run setup does, why the steps come in this order, and how the folder check and metadata sources work."
audience: "user"
category: "guide"
product_area: "library"
status: current
---

# First-run setup

Setup opens with a short welcome, then walks through seven steps. It takes a few minutes. Nothing is scanned until setup is finished, so you can add folders and change your mind freely.

## The welcome

A short animation lands on the tagline **One library. Every story.** and three cards say what setup will do: find your media, connect it across formats, and let you enjoy it in one place. A **Private by default** panel explains that Library runs on your own computer, your files and details stay on your server, and nothing is sent anywhere unless you turn on a service that needs it. [How privacy works](../explanation/privacy-local-first.md) goes into detail. Choose **Get started**, or **Restore a backup instead** if you are moving from another Library. The full welcome plays only once; later launches show a short version of the animation while the Dashboard connects, and it disappears the moment the app is ready.

## The steps, and why they are in this order

1. **Your Library.** The name, language and country of this server. These come first because every later screen uses them. The spelling variant of your language (for example English US or UK) is not asked here: Library follows your browser and uses US English otherwise, and you can change it later in **Settings > General > Language and region**. Country is the one that matters for ratings and storefronts, so it stays.
2. **Your profile.** The first administrator account. Setup needs a signed-in administrator before it can offer anything private.
3. **Tools.** The outside programs Library uses, such as FFmpeg. Chips at the top show how many are ready, need setup or are downloading. A missing tool never blocks setup; downloads carry on in the background.
4. **Vault (optional).** A place for anything you want hidden, adult content included. It comes before Libraries on purpose: the Vault kinds appear in **Add library** only when the Vault is on, so deciding first means you are never shown choices that do not apply. It is protected by its own PIN, and kids profiles never see it. Choose **Not now** and the step is marked skipped, and nothing about the Vault appears anywhere else. Press **Back** to see the offer again and change your mind. Once the Vault is on, setup shows **Your Vault is on** with a **Continue** button and this note: "On the next step, press Add library and choose Vault to add a private library." The Vault cannot be turned off during setup; that is done later in Settings.
5. **Libraries.** One table lists your libraries with their area, folder count and status, with the same area chips and **Edit** window as Settings. During setup every status says **Pending**, because nothing is scanned yet. A library with no folders is not listed until you add one; the Import folder row is always there. Settings › Libraries shows the same table with live counts once scanning starts.
6. **Metadata.** Optional services that identify your media. Tiles that need a key come first, then the ones that work as they are. A key is tested before it is saved, so a wrong key is never stored.
7. **All set.** A summary. If you added films, TV shows or comics but connected no metadata source, a warning says they will wait to be identified until you connect one. It appears here only, so setup is never interrupted halfway.

## Adding a library

**Add library** asks four things, one at a time. Each choice is a full-width row with its icon, its name and one line saying what belongs there; press a row to move on:

1. **Area:** Watch, Listen, Read or View (and the Vault, once it is on).
2. **Type:** for example Movies or TV shows within Watch. New areas and types are simply more rows.
3. **Folder:** a plain list of folders on the server that fills the window, with at least five folders in view at once. The header names the area and kind (for example "Watch · Movies"). Click a folder to open it; the folder you are inside is the one you are choosing. A folder with nothing inside says so, and you can still choose it. It opens instantly because it does not look inside folders while you browse. Start from a drive or media location, or choose **Type a path…** in the Locations list for a network path the server can reach, and press **Go**.
4. **The check:** after you press **Add library**, Library looks inside the folder once and says one of three things.
   - **Looks right:** it found files of that type and the library is added.
   - **Heads up:** the folder's contents do not match the type (for example no films in a Movies folder). You can choose another folder or add it anyway.
   - **Already used:** the exact same folder belongs to another library. A folder can only be in one library, so choose another.

The check happens after you pick the folder, instead of while you browse, so browsing stays fast even on large drives and network shares. Folder names are not used to guess what a folder contains, because names are unreliable; the contents decide.

## Why it is set up this way

- **Order follows dependencies.** Each step needs only what came before it, so you never meet a choice you cannot yet make.
- **Pending instead of scanning.** Scanning in the middle of setup slows the computer while you are still deciding, and the metadata sources that name your media are not connected yet.
- **Test before save.** A key that does not work would quietly leave media unidentified, so Library checks it first and tells you the reason if it fails.
