---
title: "Reach Library away from home with Tailscale"
description: "Install Tailscale on your server and phone, sign in, turn on a private HTTPS address with tailscale serve, and see what Library checks at each step."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Reach Library away from home with Tailscale

Tailscale is the route Library suggests first. It needs no router changes, no domain and no certificate tool, and it works even when your internet provider shares one public address between homes. Allow about 5 to 15 minutes.

## How it works, and why this route is private

Tailscale makes a private network, which it calls a **tailnet**, out of your own devices. Each device runs the Tailscale app and signs in to the same account. Devices find each other through Tailscale's coordination service and then talk directly, with end-to-end encryption, wherever they are. If a direct connection is not possible, Tailscale relays the encrypted traffic, which is slower but still unreadable to the relay.

For Library this means:

- The server is **not** open to the internet. Nobody who is not in your tailnet (or given access to this one server) can even attempt to connect.
- You get a real HTTPS address such as `https://library.tail1234.ts.net`, so passwords and passkeys are protected.
- Everyone who connects, including you on your phone, needs the Tailscale app running.

Library only reads Tailscale's status from the program on your own computer. It never signs in to Tailscale for you and never holds your Tailscale account details.

## Before you start

- You need an account with a sign-in provider Tailscale supports (for example Google, Microsoft, Apple or GitHub). Tailscale is free for personal use at the time of writing; check [Tailscale's current plans](https://tailscale.com/pricing) because they change.
- The steps below marked **On the server computer** must run on the computer that runs Library's Engine and Dashboard, not on your phone.
- Have the Library working at home first.

## Step 1: Install Tailscale on the server computer

Library's first tick is **Install Tailscale on this server**. It ticks when Library sees Tailscale on the computer and shows its version.

### Windows

1. Download the installer from [tailscale.com/download](https://tailscale.com/download) and run it, or open a terminal and run `winget install Tailscale.Tailscale`.
2. Tailscale starts in the notification area at the bottom right. Click its icon and choose **Log in**.
3. A browser window opens. Sign in and approve the new device.

### macOS

1. Install Tailscale from the Mac App Store or from [tailscale.com/download](https://tailscale.com/download).
2. Open it. A Tailscale icon appears in the menu bar. Choose **Log in** and complete the sign-in in your browser.
3. The `tailscale` command used later comes with the standalone download. With the App Store version, use the path Tailscale shows in its documentation for the command-line tool.

### Linux

1. Run the official install script, which sets up Tailscale for your distribution:

   ```text
   curl -fsSL https://tailscale.com/install.sh | sh
   ```

2. Start it and sign in:

   ```text
   sudo tailscale up
   ```

3. The command prints a web address. Open it in any browser and approve the device.

### Docker

A container cannot see Tailscale on its host, so for Docker use the Tailscale overlay that ships with Library in `deploy/tailscale`. It runs the official Tailscale image beside Library, points Tailscale Serve at the Dashboard's proxy port, and keeps Funnel off. In short:

1. Create a reusable, tagged auth key in the Tailscale admin console, with the least access this one device needs.
2. Save the key in a root-readable file **outside** Library's `/config` and `/backups` folders. Never put it in `.env` or in the repository.
3. Set `TAILSCALE_AUTH_KEY_FILE` to that file and `TUVIMA_TAILSCALE_URL` to the address you expect, such as `https://tuvima-library.example.ts.net`.
4. Start both:

   ```text
   docker compose -f docker-compose.yml -f deploy/tailscale/docker-compose.tailscale.yml up -d
   ```

Download the overlay and its configuration files together; the base Compose file alone is not enough. The [complete Docker instructions](https://github.com/Tuvima/tuvima-library/blob/main/deploy/tailscale/README.md) cover the details. With the overlay, Serve is already set up, so skip to the test.

### NAS devices

Synology, QNAP, Unraid and TrueNAS have their own Tailscale packages or apps. Install Tailscale there (see the install pages for [Synology](../../install/synology.md), [QNAP](../../install/qnap.md), [Unraid](../../install/unraid.md) and [TrueNAS Scale](../../install/truenas-scale.md)), and then continue with step 3. Where Library runs in a container, the Docker route above applies.

## Step 2: Sign in

Library's second tick is **Sign in to Tailscale**. It ticks when Tailscale reports that this computer is signed in, and shows the account.

If the sign-in screen never appears, run `tailscale up` (Linux and macOS) or `tailscale login` in a terminal. If your tailnet requires an administrator to approve new devices, approve this one in the Tailscale admin console under **Machines**.

## Step 3: Turn on HTTPS for your tailnet

HTTPS is what protects your password on the way. For Tailscale it takes two parts: a one-time switch in Tailscale's admin console, and one command on the server computer.

### Part A: allow HTTPS certificates (once, in the admin console)

1. Open the [DNS page of the Tailscale admin console](https://login.tailscale.com/admin/dns).
2. Make sure **MagicDNS** is on. New tailnets have it on already.
3. Under **HTTPS Certificates**, choose **Enable HTTPS** and read the note.

The note matters. When you enable HTTPS, your tailnet's name and the names of machines that get a certificate are published in the public Certificate Transparency logs, as for any certificate. The names appear; nothing else about your devices or media does. If you do not want the names listed, choose another route.

**This step contacts Tailscale and, through Tailscale, a certificate authority (Let's Encrypt).** Library itself makes neither call. It names the step here so you know before you do it.

### Part B: put Library behind a private HTTPS address (on the server computer)

1. In Library's **Connect** step, copy the command with its **Copy** button. It looks like this:

   ```text
   tailscale serve --bg 5017
   ```

2. Run it in a terminal on the server computer. If HTTPS is not yet enabled, the command prints a link to enable it; do Part A and run it again.
3. Check it:

   ```text
   tailscale serve status
   ```

   You should see an address ending in `.ts.net` pointing at `127.0.0.1:5017`.

Library's third tick is **Turn on a private secure address**. It ticks when Library finds Serve answering over HTTPS and shows the address (for example `https://library.tail1234.ts.net`). If it does not tick, press **Check again**.

**Why 5017 and not 5016?** Library listens on two Dashboard ports. The main port (5016) is for your home network. The second one, the **proxy port** (5017 unless you changed `remote.proxy_port` in `config/network.json`), is for anything that sits in front of Library. Everything that arrives on the proxy port is treated as coming from outside, even though Tailscale Serve runs on the same computer. That is exactly what you want: a visitor over Tailscale must sign in with a password, and a profile with no password can never be opened that way. If you aimed Serve at 5016 instead, Library would see a visit from the same computer and could treat it as home. See [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md).

**Do not use Tailscale Funnel.** Funnel publishes a service to the whole internet. This route is meant to stay inside your tailnet. Library's Docker overlay turns Funnel off for the same reason.

If your browser shows "This address isn't allowed for Tuvima Library", the Dashboard does not yet know that name. Library's flow allows it for you. If you are setting it up by hand, add the name (only the name, no `https://`) to `local.allowed_hostnames` in `config/network.json` and restart the Dashboard. See [Configuration](../../reference/configuration.md).

## Step 4: Install Tailscale on your phone

1. In Library's step, scan the QR code with your phone's camera. It opens the right app store page for your phone.
2. Install **Tailscale** and open it.
3. Sign in with the **same account** you used on the server.
4. Switch it on.

Library cannot see your phone from the server, so this step has a QR code and no automatic tick. The **Test** step is the proof.

To let someone else in, share the server from the Tailscale admin console (sharing a machine gives that person access to just that one device) or invite them to your tailnet. They also install Tailscale. Then use [Invite friends](invite-friends.md) to give them a Library sign-in.

## Step 5: Passwords and Test

Library asks for passwords before it lets you finish: see [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md). The Test step then tries your address from outside and shows a QR code for your phone. Open the address on your phone with Wi-Fi off (mobile data, Tailscale on). If the Library appears and asks you to sign in, it works.

## What Library checks at each tick

| Tick | What Library looks at | If it will not tick |
|---|---|---|
| Install Tailscale on this server | Whether the Tailscale program is present on this computer and which version | [`tailscale_not_installed`](testing-and-troubleshooting.md#tailscale_not_installed) |
| Sign in to Tailscale | Whether Tailscale says this computer is signed in, and the account | [`tailscale_not_signed_in`](testing-and-troubleshooting.md#tailscale_not_signed_in) |
| Turn on a private secure address | Whether Serve is answering over HTTPS and the `.ts.net` address it uses | [`tailscale_https_off`](testing-and-troubleshooting.md#tailscale_https_off) |
| Everything ready | All three above are good | [`tailscale_ready`](testing-and-troubleshooting.md#tailscale_ready) |

Each check reads Tailscale's status from the program on your computer. None of them calls Tailscale's servers from Library.

## Turn it off, or remove it

Library's switch for outside access is in the Test step; see [Turn access off](turn-access-off.md). That does not remove Tailscale. To remove the private address itself, run `tailscale serve reset` on the server computer.

## Next steps

- [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md)
- [Invite friends](invite-friends.md)
- [Testing and troubleshooting](testing-and-troubleshooting.md)
- [Back to the overview](overview.md)
