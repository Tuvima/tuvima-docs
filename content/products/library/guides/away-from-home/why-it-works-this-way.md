---
title: "Why away-from-home access works this way"
description: "Understand the reasoning behind Library's away-from-home design: local first, home with no password, passwords for outside, no hidden outside calls, and nothing bought or stored for you."
audience: administrator
category: explanation
product_area: networking
status: early-access
---

# Why away-from-home access works this way

The guides in this set tell you what to do. This page explains why Library works the way it does, so you can judge for yourself whether it fits you.

## Library is local first

Your Engine, Dashboard and catalog run on your own computer, with no Tuvima account and no hosted service in the middle. Away-from-home access keeps that. There is no Tuvima relay. Nothing about your Library passes through Tuvima. The route you choose, Tailscale, Cloudflare, or your own proxy and router, is yours, so you decide who sees what. See [Privacy and local-first](../../explanation/privacy-local-first.md).

**Why:** a library of your own media is personal. A design where a company carries your traffic would need an account, a bill, and trust, and would stop working the day the company did.

## Home works with no password

At home, Library opens without a password on your own network. Phones, TVs and computers on your home network just work.

**Why:** the people on your home network are the people you live with. Typing a password into every TV remote is a cost, with little protection in return for a network you already control. Making home easy is what makes Library pleasant to use every day.

## Outside always needs a password

An address on the internet can be tried by anyone. So from outside, every sign-in needs a password or passkey, and a profile without one stays home only.

**Why:** the whole risk of going outside is that a stranger might arrive. A password is the lock for that. Making the rule absolute, with no "just this once" switch, means a mistake in setup cannot turn into an open door.

How Library decides what is outside is built to fail safe. It looks at the connection itself, never at a label a visitor could write, and it treats anything forwarded through a proxy or tunnel as outside. See [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md).

## The administrator must have a password to continue

**Why:** an administrator with no password cannot sign in from outside. Setting up access without one would lock you out of Library's settings exactly when you are away and need them.

## A second port for proxies

Library listens on a main port for home and a second, the proxy port, for anything in front of it, and treats everything on the second as outside.

**Why:** a proxy or tunnel on the same computer looks like the computer itself. Without a separate port, Caddy running on your server would make every internet visitor look like someone sitting at the keyboard. The second port removes the doubt, and the guides tell you to use it.

## Tailscale first

**Why:** it is private (nobody else can even connect), needs no router changes, gives HTTPS without effort and works behind a shared address. Its cost, that every person installs an app, is real but small, so it is where Library starts. The own-address routes exist for TVs and people who will not install an app.

## Cloudflare is not the default

**Why:** a tunnel is the easiest own-address route behind a shared address, but Cloudflare carries and can read your traffic, and its free plan's terms limit serving video. Both are things a person should choose knowingly. Library names them beside the route and tells you to read the current terms.

## The router is the last choice

**Why:** it works least often (shared addresses), exposes your home address, depends on you remembering renewals, and needs a proxy for HTTPS today. It stays available, and its automatic doors only ever point at an HTTPS listener you set up, never at the plain-http Dashboard.

## HTTPS is required, and built-in HTTPS comes later

**Why:** without HTTPS a password can be read in transit. Tailscale and tunnels bring theirs. Putting certificate handling inside Library means it holds keys and opens a port to the internet by itself, which deserves its own security review. It is planned as a separate feature and is not available yet.

## What Library calls outside

The guided flow makes **no outside calls beyond the connection test**: Library reading your own address the way a visitor would. It does not phone Tuvima, send analytics, or contact a certificate service.

Steps that involve an outside company are done by you or by the tool you installed, and each guide says so before the step:

| Step | Who contacts whom |
|---|---|
| Sign in to Tailscale, enable HTTPS certificates | You, with Tailscale (Tailscale then asks a certificate authority) |
| `tailscale serve` | Your Tailscale, on your computer |
| Add a domain, create a tunnel, add a hostname | You, with Cloudflare |
| Caddy first start, renewal | Caddy, with Let's Encrypt or ZeroSSL |
| certbot | certbot, with Let's Encrypt |
| Buying or pointing a domain | You, with your registrar |

Library only reads Tailscale's status from the program on your computer, and resolves your name and connects to your address to check them.

## Library never buys or stores the keys to your name

Library does not buy a domain or hold registrar logins, DNS tokens or Cloudflare or Tailscale account details. It shows you commands and files and checks that they worked. Where a command needs a secret (a Cloudflare tunnel token, a Tailscale key), Library shows a placeholder and you paste your own into your own terminal. Library never asks you to type it into Library.

**Why:** a domain is worth more than any one server. Software that runs on that server should not hold its keys. A compromised Library would then be a problem for Library, not for your name, your mail and your other sites.

## One switch, and home is untouched

**Why:** when something feels wrong you should be able to stop it in one move, without having to understand the route. Turning outside access off never touches home, so there is no cost to doing it at the first doubt. See [Turn access off](turn-access-off.md).

## Things Library does not do here

- It does not offer a guest account with no password.
- It does not send invitation emails; you send the link.
- It does not change anything on your router, domain or accounts without you.

## Next steps

- [Overview and how to choose](overview.md)
- [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md)
- [Security](../../architecture/security.md)
