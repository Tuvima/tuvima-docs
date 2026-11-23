---
title: "Pair an Android TV or Fire TV"
description: "Install the Library app on an Android TV or an Android-based Fire TV by hand, then pair it with your server using a code you approve in the Dashboard."
audience: user
category: guide
product_area: apps
status: early-access
---

# Pair an Android TV or Fire TV

The Library app for Android TV also runs on Android-based Fire TV devices. It is in **Early Access**: it is not in the Google Play Store or Amazon Appstore, so you install it by hand (this is called sideloading), and its first test on a real television is still to come. Allow about 30 minutes the first time.

## Before you start

- A Library server running on your network. See [Apps on your phone and TV](apps-on-your-phone-and-tv.md).
- The server's address from **Settings → Overview → Apps** in the Dashboard.
- A television that runs Android 9 or newer (the app's minimum). Which Fire OS versions that covers is Amazon's to say, so check your model's Android version.
- The app's installation file (an APK). **No download is published yet.** Until it is, you build it from the source code on a computer with JDK 17, the Android SDK and Gradle 9.3.1, as the [Android clients' readme](../../clients/android/README.md) describes: run `gradle :tv:assembleDebug` in the `clients/android` folder. Gradle writes the APK under `clients/android/tv/build/outputs/apk/debug/`. A published APK is planned on the project's GitHub releases page.

## Install on an Android TV

1. On the TV, turn on Developer options (**Settings → Device Preferences → About**, then select **Build** seven times) and turn on **USB debugging** or **Wireless debugging**. Menu names differ between makers; use your TV's own help if you do not see them.
2. On your computer, install Google's Android platform tools (`adb`). Connect with `adb connect <tv-ip-address>` and accept the prompt on the TV.
3. Install the app with `adb install <path-to-the-APK>`.
4. Open **Library** from the TV's apps row.

## Install on a Fire TV (sideload)

Only **Android-based Fire TV devices** can run the app. Newer Fire TV sticks that run Amazon's own Vega OS may not run Android apps at all, and no promise is made for them. No list of tested Fire TV models exists yet; if you try one, note its model and Fire OS version.

1. On the Fire TV open **Settings → My Fire TV → Developer Options**. If you do not see it, open **About** and select the device name several times. Turn on **ADB debugging** and **Install unknown apps** (Amazon has also called this **Apps from Unknown Sources**).
2. Find the Fire TV's IP address under **Settings → My Fire TV → About → Network**.
3. On your computer, install Google's Android platform tools (`adb`), then run `adb connect <fire-tv-ip-address>`. Accept the prompt that appears on the TV.
4. Run `adb install <path-to-the-APK>`.
5. Open **Library** from **Your Apps & Channels** (select **See all**).

Amazon changes these menus between Fire OS versions. If a name differs, follow Amazon's own help for turning on ADB debugging and installing apps from unknown sources, and turn both off again when you finish.

## Pair the TV

1. Open **Library**. The first screen asks for the **Dashboard address**. Type the address from **Settings → Overview → Apps**. Tick **Allow access to my photos and videos** only if you want this TV to show your photos.
2. Select **Connect**. The TV shows **Pair this television**, a web address and a short code.
3. On your phone or computer, sign in to the Dashboard as an administrator, open that web address and check that the code matches the one on the TV.
4. Read the device name and what it asks for, then approve it. The TV says **Waiting for approval…** until you do, then opens Home.

If the code expires, select **Connect again**. Nothing is paired until you approve it, so never approve a code you did not start yourself.

## What you can do today

- **Home** starts with Continue, then your shelves. **Collections** opens your collections and each Universe with its Series, cast and adaptations. Photos show only if you allowed them at pairing.
- **Playback** uses the shared player: five transport buttons, a tool row with side panels for Episodes, Audio & subtitles, Bookmarks and Playback settings, paused details, and an **Up next** card with an Autoplay switch. Songs show **Lyrics**, and **Find subtitles…** and **Find lyrics…** appear when your server can look them up.
- **Remote.** The arrows move focus, Left and Right on the timeline skip by your profile's seconds, and Back closes a panel first, then the controls, then leaves. Some Fire TV remotes have no Rewind or Fast-forward button, so the on-screen skip buttons cover them.
- **Away from home.** The Android apps use your home address first and your outside address when you set one up in [Secure remote access](remote-access.md).

## What is missing

- **No Cast button.** The TV app does not cast yet. When it does, the button stays hidden on Fire TV, which does not support Google Cast.
- No downloads, no reader for books and comics, and no editing.
- Lessons and Homework for folders of videos are not listed.
- Bookmarks cannot be renamed on the TV and you cannot type a note.
- Not yet tried on a real television or emulator by the Library team, so report anything that looks wrong.

## If something goes wrong

- **Cannot connect.** Check the address, and that the TV and the server are on the same network. See [Troubleshooting](troubleshooting.md).
- **Sign a TV out.** In the Dashboard open **Settings → Security & Devices → Devices** and choose **Sign out** on the TV. It has to be paired again.
