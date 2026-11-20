---
title: "Reach Library away from home with a Cloudflare Tunnel"
description: "Use your own web address through a Cloudflare Tunnel with no router changes, with every step, the trade-offs, and the video terms to read first."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Reach Library away from home with a Cloudflare Tunnel

A Cloudflare Tunnel gives Library its own web address, such as `https://library.yourname.com`, without opening anything in your router. It is the way to get an address anyone can open when your internet provider shares one public address between homes. It comes with two honest trade-offs, so read this section before you start.

> **Read Cloudflare's current terms before you choose this route.** At the time of writing, Cloudflare's free plan terms limit how much video, audio and other non-web content you may serve through its network. A media library is exactly that kind of content. Terms change, so read the current [Cloudflare terms of service](https://www.cloudflare.com/terms/) yourself and decide whether your use fits. Library does not offer this as its default route, and it cannot tell you whether your use is allowed. If streaming video is the main point, Tailscale or Caddy are usually the safer choices.

## How it works

1. You install a small program called **cloudflared** (the connector) on your server computer.
2. It makes an **outgoing** connection from your home to Cloudflare. Outgoing connections need no router changes.
3. You tell Cloudflare that `library.yourname.com` should be sent through that connection to Library.
4. When someone opens `https://library.yourname.com`, they reach Cloudflare, and Cloudflare passes the request through the connection to your server.

Cloudflare ends the HTTPS connection at its side and starts a new one to your server. That is why you do not need a certificate on your server, and also why Cloudflare can see what passes through.

## What you give and what you get

| | |
|---|---|
| Cost | The tunnel is free. You need your own domain, about $10 a year. |
| Effort | Medium, 20 to 30 minutes the first time. |
| Router changes | None. |
| Works behind a shared public address | Yes. |
| Privacy | Cloudflare carries and can read the traffic, and your home address stays hidden. |
| Who can reach it | Anyone who knows the address, then a password or passkey. |
| Smart TVs and phone apps | Yes. Nobody installs an extra app. |
| Video | Limited by the terms above. |
| Uploads from a browser | A free plan caps each request at 100 MB at the time of writing. Library uploads in 64 MB pieces by default, which fit. |

## Before you start

- Library works at home.
- You have a domain, or you are ready to get one. See [Getting and pointing a domain](domain-names.md).
- You will move the domain's **name servers** to Cloudflare. That is how Cloudflare takes over its DNS. This step is required for a tunnel with your own name.
- You have a password on the administrator profile. See [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md).

## Step 1: Choose your address (Library's Address screen)

In the own-address flow, Library asks whether you own a domain and which front name you want. People type only the front part, for example `library`, and Library shows the full address, `https://library.yourname.com`. The name is public: it appears in DNS and in public certificate records, so do not put anything private in it.

## Step 2: Add your domain to Cloudflare

1. Create a free Cloudflare account and choose **Add a site**. Enter `yourname.com` and pick the free plan.
2. Cloudflare shows two name servers. At your registrar, replace the existing name servers with these two. (See [Getting and pointing a domain](domain-names.md) for where this setting lives.)
3. Wait until Cloudflare says the site is **Active**. This takes minutes to a day.

Library's tick here is **Create a free Cloudflare account and add your domain**. It ticks when it can see that your domain's DNS is on Cloudflare. **This step contacts Cloudflare**, through the account you create yourself; Library does not sign in to it.

## Step 3: Install the connector on the server computer

1. In the Cloudflare dashboard, open **Zero Trust** and then **Networks → Tunnels** (the menu names change from time to time; search for "Tunnels"). Choose **Create a tunnel**, pick **Cloudflared**, and name it, for example `library`.
2. Cloudflare shows the install command for your system. It includes a long **token**. Copy the whole command.
3. On the server computer, run it.

   - **Windows:** install `cloudflared` (for example `winget install --id Cloudflare.cloudflared`), then run the command Cloudflare shows in a terminal started as administrator. It looks like `cloudflared service install YOUR-TOKEN`.
   - **macOS:** `brew install cloudflared`, then the command from Cloudflare.
   - **Linux:** install the package from Cloudflare's instructions, then the command from Cloudflare.
   - **Docker:** run the official `cloudflare/cloudflared` image with `tunnel --no-autoupdate run --token YOUR-TOKEN` on the same Docker network as Library.

Treat the token like a password. Anyone who has it can run a connector for your tunnel. Never paste it into a chat, a ticket or a screenshot. Library shows the command with a placeholder (`YOUR-TOKEN`) for you to replace with your own, and it never asks you to enter the token into Library.

Library's tick is **Install the Cloudflare connector on this server**. It ticks when the tunnel shows as connected.

## Step 4: Send the name to Library

In the tunnel's settings, add a **public hostname**:

| Field | Value |
|---|---|
| Subdomain and domain | `library` and `yourname.com` |
| Service type | `HTTP` |
| URL | `localhost:5017` (the connector and Library on the same computer) |

Cloudflare adds the DNS record itself (a CNAME pointing the name at your tunnel). Use **5017**, the proxy port, and not 5016: everything arriving on the proxy port is treated as coming from outside, which is what keeps no-password profiles home only. See [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md).

If the connector runs in Docker or on another computer, use the address that reaches Library from there, such as `http://library:5017`, in place of `localhost:5017`.

Library's tick is **Send library.yourname.com to this server**. It ticks when the name leads to your tunnel.

## Step 5: Tell Library to trust the connector

Library reads the visitor's real address from forwarded headers, but only from a proxy it trusts, and only on the proxy port. A connector on the **same computer** is trusted already. A connector in Docker or on another machine is not. Library's check will say so with a red cross and a **Fix it for me** button, which adds the connector's address to the trusted list. See [`proxy_not_trusted`](testing-and-troubleshooting.md#proxy_not_trusted) and [nginx](nginx.md#tell-library-to-trust-the-proxy), which explains the trusted list in full.

Do not put Cloudflare Access (Cloudflare's own sign-in page) in front of Library. Library's phone and TV apps cannot complete a browser sign-in page and would stop working. Library's own sign-in is the protection.

## Step 6: Secure it and check it

Library's **Secure it** screen has no certificate to install, because Cloudflare provides one at its edge. Library checks that the name points where it should, that the certificate is valid, and that Library recognizes visitors as outside. If any of those fails, the message matches an entry in [Testing and troubleshooting](testing-and-troubleshooting.md).

## Things to keep in mind

- **The tunnel is only as private as Cloudflare.** If that is not acceptable, use Tailscale.
- **Keep the connector running.** If the server restarts, the connector must start with it. The `service install` command does that on Windows, macOS and Linux.
- **Cloudflare account security matters.** Turn on two-step sign-in for your Cloudflare account. Anyone who controls it can send your name anywhere.
- **Library never stores your Cloudflare or registrar login.** The steps in Cloudflare are yours to take.

## Next steps

- [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md)
- [Testing and troubleshooting](testing-and-troubleshooting.md)
- [Invite friends](invite-friends.md)
- [Turn access off](turn-access-off.md)
