---
title: "HTTPS and certificates explained"
description: "Learn what HTTPS and certificates do, who issues them, how each away-from-home route gets one, how renewal works, and what Library checks about them."
audience: administrator
category: explanation
product_area: networking
status: early-access
---

# HTTPS and certificates explained

Every route to Library from outside depends on HTTPS. This page explains what it is, why it matters here, how each route gets it, and what Library checks.

## What HTTPS does

When you open `http://` something, the words travel across the internet as they are. Anyone along the way, such as someone on the same café Wi-Fi, your provider, or any computer between, could read your password or change what you see.

`https://` wraps the connection in encryption. It does two jobs:

1. **Privacy.** Nobody in between can read it.
2. **Identity.** Your phone checks that it is talking to the real server for that name and not an impostor.

The padlock in the browser shows both jobs worked.

At home you do not need it. Your traffic stays inside your own network. Away from home it is essential, which is why Library's flow sets up a secure address for outside access and asks for a password or passkey (passkeys also need HTTPS to work).

## What a certificate is

A **certificate** is a small file that says "this name belongs to this server," signed by a **certificate authority** (a company everyone's devices already trust). Your server holds the certificate and a matching secret key. Your phone checks the signature. If anything is wrong (expired, wrong name, not signed by a trusted authority), the phone warns or refuses.

Certificates last a limited time, about 90 days for free ones, so a stolen one stops working soon. They must be **renewed** before they end. Almost always that is automatic.

## Where certificates come from

| Route | Who ends the HTTPS connection | Who issues the certificate | Who renews it |
|---|---|---|---|
| Tailscale | Tailscale Serve, on your server | A certificate authority (Let's Encrypt), asked for through Tailscale | Tailscale, automatically |
| Cloudflare Tunnel | Cloudflare, at its edge | Cloudflare | Cloudflare, automatically |
| Caddy | Caddy, on your network | Let's Encrypt or ZeroSSL | Caddy, automatically, about 30 days before the end |
| nginx | nginx, on your network | Whichever you choose, usually Let's Encrypt through certbot | certbot's scheduled job, if it is set up and nginx reloads |
| Router door | Your proxy (Caddy or nginx) | As above | As above |

Library does not issue or hold certificates. It does not contact any certificate service. It reads the certificate your address presents, the same way a browser does, to check it is valid and when it ends.

## What is public about a certificate

Certificate authorities publish every certificate they issue in open logs called **Certificate Transparency** logs. This is a feature: it lets the world spot a wrongly issued certificate. The names in them are public. So `library.yourname.com` becomes publicly listed, and with Tailscale HTTPS your tailnet and machine names do too. Nothing else about you or your files is. This is why these guides tell you not to put anything private in the name.

## How Library and a certificate service relate

| Step | Who makes an outside call | What Library does |
|---|---|---|
| Tailscale HTTPS switched on | You, in the Tailscale admin console (Tailscale then asks the certificate authority) | Nothing |
| Caddy first start | Caddy, to Let's Encrypt or ZeroSSL | Nothing |
| certbot run | certbot, to Let's Encrypt | Nothing |
| Tunnel public hostname | You, in Cloudflare | Nothing |
| Library's check | Library connects to your own address, the same as a visitor | Reads the certificate and its end date |

Library's guide for each route names each step that contacts an outside service before you take it.

## What Library checks

| Message | What it means | Fix |
|---|---|---|
| The secure certificate is valid (with days left) | The address presents a certificate from a trusted authority, for the right name, that has not ended | Nothing to do |
| [`certificate_invalid`](testing-and-troubleshooting.md#certificate_invalid) | Expired, for another name, self-signed, or missing parts of its chain | Fix it in your proxy or tunnel |
| [`certificate_expiring`](testing-and-troubleshooting.md#certificate_expiring) | It ends soon, and renewal has not happened | Find out why renewal stopped |

## Why not "just use a self-signed certificate"?

You can make a certificate yourself. It gives encryption but no identity: nothing trusted signed it. Browsers show a full-page warning, and Library's phone and TV apps refuse it. Library does not support it for outside access.

## Why built-in HTTPS is a separate, later feature

If Library ended HTTPS itself, the router-door route would need no proxy. That would also mean Library holding private keys, renewing certificates, and opening a port to the internet itself. That deserves its own security review, so it is planned as a separate feature and is **not available yet**. Until then, a route that needs you to bring HTTPS uses a proxy. See [Router port forwarding](router-port-forwarding.md).

## Renewal rules of thumb

- Keep the certificate's storage (Caddy's data folder, `/etc/letsencrypt`) safe and backed up with the proxy's own settings.
- After you change routers, providers or computers, do a renewal test (`sudo certbot renew --dry-run`) or watch Caddy's log.
- Keep the clock correct on the server. A wrong clock makes valid certificates look expired.
- Library's check warns you before the end date. Do not wait for it.

## Next steps

- [Caddy](caddy.md) and [nginx](nginx.md)
- [Testing and troubleshooting](testing-and-troubleshooting.md)
- [Why it works this way](why-it-works-this-way.md)
