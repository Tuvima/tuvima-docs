---
title: "Use Library away from home: overview and how to choose"
description: "Understand the ways to reach Library from outside your home, compare Tailscale, a tunnel, Caddy, nginx and router port forwarding, and pick the one that fits."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Use Library away from home: overview and how to choose

At home, Library already works. Phones, TVs and computers on your home network open it with no password and no router changes. This set of guides is about the other half: reaching your Library from a hotel, a friend's house or your phone's mobile data, and letting a few people you choose do the same.

Away from home, two things must be true. Something has to carry the traffic from the internet to your server, and everyone who arrives that way has to sign in with a password or a passkey. This overview explains the routes, compares them, and tells you which to try first.

> **Early access.** The guided **Remote access** flow in **Settings → Network & Remote Access → Remote access** is rolling out. These pages describe it step by step. Where a page says what Library "checks" or "ticks", that is the flow doing the work for you. Every route here also works by hand, and each guide shows the manual steps.

## How the flow works

Library walks an administrator through five steps. Each guide in this set matches one or more of them.

| Step | What happens | Guide |
|---|---|---|
| 1. **Check** | Library looks at Tailscale, your router, whether your internet provider shares one public address between homes, and your public address. It reports what it found in plain sentences, with a tick, a warning or a cross. | [Overview](overview.md) (this page) |
| 2. **Choose** | You pick Tailscale, My own address, or Not now. Library suggests the best fit from what it found. A "Share with friends" card appears here too. | [Overview](overview.md), [Invite friends](invite-friends.md) |
| 3. **Passwords** | Library lists every profile and says which ones can sign in from outside. Profiles with no password stay home only. The administrator doing the setup must have a password to continue. | [Passwords and who can sign in](passwords-and-outside-sign-in.md) |
| 4. **Connect** | You follow the steps for your route. Each step ticks by itself when Library sees it is done, and shows **Check again** when it is not. | The guide for your route, below |
| 5. **Test** | Library tests the address from outside, shows a QR code for your phone, lists recent outside sign-ins, and gives you one switch that turns outside access off. | [Testing and troubleshooting](testing-and-troubleshooting.md), [Turn access off](turn-access-off.md) |

If you already run a proxy or a tunnel, the start page has an **I already have a proxy or tunnel** link. It opens the address and proxy fields directly and skips the walk-through.

## What stays the same at home

Nothing in these guides changes how Library works on your home network. Home needs no password, no certificate and no tool. The old "Remote access is off" notice is gone because home working is the normal state, not a fault. Turning outside access off never affects home.

## The five routes

### Tailscale

Tailscale builds a private network between your own devices. Your server, your phone and your laptop each run the Tailscale app, sign in to the same account, and can then reach each other as if they were on one home network, wherever they are. Library is not open to the internet. Only devices in your Tailscale network, or ones you share the server with, can even connect.

Reasoning: this is the route Library suggests first because it needs no router changes, works behind a shared public address, gives you a real HTTPS address, and keeps Library invisible to everyone else. The price is that every person and device that connects needs the Tailscale app. See [Tailscale](tailscale.md).

### Your own address through a Cloudflare Tunnel

You own a web address such as `library.yourname.com`. A small program on your server (the Cloudflare connector) makes an outgoing connection to Cloudflare, and Cloudflare passes visitors back through it. You open nothing in your router, and your home address stays hidden. The trade-offs are that Cloudflare carries and can read the traffic, and that Cloudflare's free plan has terms about serving video. Read them first. This is not the default. See [Cloudflare Tunnel](cloudflare-tunnel.md).

### Your own address through Caddy

Caddy is a free web server that sits in front of Library, answers on your web address, and gets and renews the HTTPS certificate by itself. Library offers a ready-made Caddy file with your address filled in. It is the easiest of the "run it yourself" routes. Because the visitors connect straight to your home, it needs ports 80 and 443 opened in your router, which fails behind a shared public address. See [Caddy](caddy.md).

### Your own address through nginx

nginx does the same job as Caddy and is a good choice if you already run it for something else. You write the settings yourself and get certificates with a separate tool. It needs the same open ports. See [nginx](nginx.md).

### Router port forwarding

Here you open a door in your router so the internet can reach your server. It is the last choice: it exposes your home address, it fails behind a shared address, and today it still needs a proxy such as Caddy or nginx in front of Library, because Library's own listener does not do HTTPS (built-in HTTPS is planned as a later, separate feature). See [Router port forwarding](router-port-forwarding.md).

Routes 2 to 5 use your own web address. [Getting and pointing a domain](domain-names.md) covers buying one, and [HTTPS and certificates](https-and-certificates.md) explains the padlock.

## Compare the routes

### Cost, effort and reach

| | Tailscale | Cloudflare Tunnel | Caddy | nginx | Router port forwarding |
|---|---|---|---|---|---|
| Money | Free for personal use at the time of writing; check Tailscale's current plans | The tunnel is free; a domain costs about $10 a year | Software is free; a domain costs about $10 a year | Software is free; a domain costs about $10 a year | Free, but you still need a domain and a proxy for HTTPS |
| Effort | Easy, about 5 minutes | Medium, 20 to 30 minutes | Medium, 30 to 45 minutes | Harder, 45 to 60 minutes | Hardest and last choice |
| Router changes | None | None | Yes: ports 80 and 443 | Yes: ports 80 and 443 | Yes, and that is the whole route |
| Works behind a shared public address | Yes | Yes | No | No | No |
| Needs your own domain | No (Tailscale gives a `.ts.net` name) | Yes | Yes | Yes | Yes |
| Who can reach it | Only devices in your Tailscale network or that you share the server with | Anyone who knows the address, then a password | Anyone who knows the address, then a password | Anyone who knows the address, then a password | Anyone who knows the address, then a password |

### Privacy, apps, TVs and video

| | Tailscale | Cloudflare Tunnel | Caddy | nginx | Router port forwarding |
|---|---|---|---|---|---|
| Who can see your traffic | Nobody in between: devices talk to each other with end-to-end encryption. Tailscale coordinates the connection but does not read your media | Cloudflare, because it ends the HTTPS connection | Nobody in between | Nobody in between | Nobody in between |
| Is your home address visible | No | No | Yes, in the name's DNS record | Yes | Yes |
| Is Library visible to the whole internet | No | Yes, behind a password | Yes, behind a password | Yes, behind a password | Yes, behind a password |
| Extra app on every phone | Yes: Tailscale | No | No | No | No |
| Smart TVs | Android TV and Apple TV can run Tailscale. Roku, Samsung and LG TVs cannot, so they need an address route | Yes | Yes | Yes | Yes |
| Library phone and tablet apps | Yes, with Tailscale running | Yes | Yes | Yes | Yes |
| Video limits | None from Tailscale. Speed depends on whether the connection is direct or relayed | The free plan's terms limit serving video through Cloudflare. Read the current terms | None from the route; your home upload speed is the limit | Same as Caddy | Same as Caddy |
| Large uploads from a browser | No route limit | Free plans cap each request body at 100 MB at the time of writing; Library uploads in 64 MB pieces, which fit | Allowed | Allowed if you raise the limit (see [nginx](nginx.md)) | Same as nginx |

Two limits apply to every route. First, your home internet's upload speed is the ceiling for what you can stream away from home, however you connect. **Settings → Playback → Quality** has a remote streaming quality setting that lowers quality to fit. Second, Library never forwards its Engine port (61495). Only the Dashboard is ever reached.

## How to choose

Answer these in order and stop at the first one that fits.

1. **Is it you, your family and a few friends, and are you happy for each to install one app?** Choose **Tailscale**. It is the safest and the quickest.
2. **Do you need a smart TV that cannot run Tailscale (Roku, Samsung, LG), or friends who will not install anything?** You need an address anyone can open. Continue to question 3.
3. **Does Check say your internet provider shares your public address?** (Library calls this a *shared address*.) Router doors do not work for you, so use a **Cloudflare Tunnel**, or ask your provider for a real public address.
4. **Can you open ports 80 and 443 in your router, and do you want to keep everything on your own hardware?** Choose **Caddy**. Choose **nginx** instead only if you already run it.
5. **Anything else?** Router port forwarding is the fallback, and you still need a proxy.

If you are unsure, start with Tailscale. It can sit alongside any other route later.

## What Library will never do

- It never buys a domain for you or stores your registrar's login or API keys.
- It never installs Tailscale, Caddy, nginx or a tunnel program on its own. It tells you what to run and where.
- It never lets someone without a password sign in from outside.

These limits are on purpose. See [Why it works this way](why-it-works-this-way.md).

## Before you start

- Know which computer is **the server**: the one that runs the Engine and Dashboard. Steps tagged **On the server computer** run there, not on your phone.
- Have your Library working at home first.
- Back up before network changes if you can. See [Operations and recovery](../operations-and-recovery.md).
- Set aside a quiet half hour the first time.

## Next steps

- [Tailscale](tailscale.md), the suggested start.
- [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md), which every route needs.
- [Testing and troubleshooting](testing-and-troubleshooting.md), if a check does not tick.
- [Secure remote access (advanced and manual settings)](../remote-access.md).
