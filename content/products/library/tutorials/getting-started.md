---
title: "Getting started"
description: "Start Tuvima Library with Docker, create your profile, and choose your first media folders."
audience: "user"
category: "tutorial"
product_area: "library configuration"
status: current
---

# Getting started

Get Tuvima Library running, create your profile, and open the Dashboard. Docker configuration takes about 10 minutes; image downloads and optional AI models can take longer.

## Choose an installation

| Your setup | Start here |
| --- | --- |
| Docker host or Docker Desktop | [Docker Compose](../install/docker.md), the recommended starting path |
| Synology, Unraid, TrueNAS SCALE, or QNAP | [Synology](../install/synology.md), [Unraid](../install/unraid.md), [TrueNAS](../install/truenas-scale.md), or [QNAP](../install/qnap.md) |
| Windows 10 or 11 PC | [Windows installer](../install/windows.md) (Early Access) |
| Development or source evaluation | [Run from source](../install/from-source.md) |

## Start with Docker

1. Install Docker with Compose.
2. Download the maintained configuration in a new deployment folder:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/Tuvima/tuvima-library/main/docker-compose.yml -o docker-compose.yml
   ```

   In PowerShell:

   ```powershell
   Invoke-WebRequest https://raw.githubusercontent.com/Tuvima/tuvima-library/main/docker-compose.yml -OutFile docker-compose.yml
   ```

3. Edit every host folder under `volumes`, then set your user/group IDs and timezone. The [Docker guide](../install/docker.md) explains permissions and origins.
4. Keep all seven persistent mounts:

   | Mount | Contents |
   | --- | --- |
   | `/library` | Managed media |
   | `/config` | Settings and credentials |
   | `/db` | Catalogue |
   | `/models` | Optional AI models |
   | `/artwork-cache` | Artwork, cache, and logs |
   | `/backups` | Recovery archives |
   | `/transcode` | Prepared playback files |

5. Start Tuvima:

   ```bash
   docker compose config --quiet
   docker compose pull
   docker compose up -d
   docker compose ps
   ```

6. Open `http://SERVER-IP:5016/setup`. Use `localhost` only from the Docker host itself.

If the image download is refused, [build the image from source](../install/docker.md#build-the-image-from-source) and continue with profile setup below.

Only the Dashboard is published. Leave Engine port `61495` internal.

You can add the Dashboard to your home screen or install it as an app from your browser's menu. Browsers offer installation only over HTTPS or from `localhost`, so a plain `http://SERVER-IP:5016` address may not show the option. An installed copy opens in its own window and reconnects when the server is reachable; it does not keep a copy of your library offline.

## The setup steps

Setup has seven steps (six if you are not offered the Vault). A side list shows where you are, and you can go back at any time.

1. **Welcome.** Choose your language and region, then give the server a friendly name that phones, TVs and other computers can find. **Restore a backup** is offered here if you are moving from another server.
2. **Your profile.** Type your name and choose how you sign in: **Just my name** (recommended on the computer that runs the server) or **Email and password** (needed to use Library on your other devices). You can add a profile PIN. When you carry on you are signed in straight away.
3. **Tools.** Library lists the outside programs it uses (FFmpeg, Tesseract, ExifTool and others) with the same rows you see later in **Settings → Tools and requirements**. Anything missing that is optional has a **Download now** tick, on by default. Nothing here stops you opening your library.
4. **Libraries.** The same table as **Settings → Libraries**, shown as **Cards** or a **List**. Add the folders for Watch, Listen, Read or View, or **Skip for now**. Nothing is required.
5. **Vault.** Offered once, only to the first administrator on a desktop or tablet. **Not now** removes it from the list; see [Turning the Vault on in setup](../explanation/vault.md#turning-the-vault-on-in-setup).
6. **Metadata.** The same source cards as **Settings → Plugins**, with a **Connect** button for the ones that need a key, filtered to the libraries you added (use **Show all sources** to see the rest). The one button reads **Skip for now** until you save a key, then **Continue**.
7. **All set.** One line per step with a tick, **Later** (with a link to Settings) or **Needs attention**. A download that is still running finishes in the background.

Tuvima's own library folder is created for you under the server's data location (`TUVIMA_DATA_DIR`, otherwise your per-user local data folder). You are never asked about it.

## Create your profile

1. Finish setup before you open any router port: until the profile exists, anyone who can reach the server can claim it.
2. Type your name. Choose **Just my name** or **Email and password**; with a password, use the strong-password rules shown.
3. Optionally add a profile PIN (4 to 12 digits).
4. If you chose a password, save the recovery codes in a password manager or another safe place outside this server.
5. Continue through setup. Media folders and metadata connections can be added later.

Setup needs no code from any device on your home network (see [Claim your server](../install/docker.md#claim-your-server)). Once the profile exists, setup requires sign-in. Profile PINs and administrator unlock are separate from your account password.

## Choose your first media

Use the **Libraries** step, or later **Settings → Libraries**, for books, comics, movies, TV, music, and audiobooks. Start with a few files so you can check matching and folder permissions.

For private photos, home videos, or documents, use [View Personal Space](../guides/view-personal-space.md). Those files follow a local path without catalogue providers.

The default Standard AI profile uses one 1,260 MB text model. The separate 1,500 MB Whisper audio pack starts disabled. You can begin library setup while downloads run or AI features remain disabled.

## Next steps

- [Add your first library](first-library.md).
- [Connect metadata providers](../guides/configuring-providers.md).
- [Protect accounts and recovery access](../guides/account-security.md).
- [Resolve setup problems](../guides/troubleshooting.md).
