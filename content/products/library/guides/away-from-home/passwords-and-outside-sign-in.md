---
title: "Passwords and who can sign in from outside"
description: "Learn why every sign-in from outside your home needs a password or passkey, how Library decides what counts as outside, and what the Passwords step does."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Passwords and who can sign in from outside

Library has one rule for away-from-home access, and it is the same on every route:

> **Anyone signing in from outside your home needs a password or a passkey. A profile with neither stays home only.**

This page explains the rule, how Library decides what counts as "outside", what the **Passwords** step shows you, and what to do about each profile.

## Why the rule exists

At home, Library works with no password. That is on purpose: you should be able to open it on the family TV without typing anything. It trusts that whoever is on your home network is at home.

A route to outside changes that. An address on the internet can be opened by anyone who finds it, not only your family. If a profile with no password could be opened from there, whoever found the address could open it, and a no-password administrator would hand them your whole Library. So:

- Home stays easy, with no password.
- Outside is always protected.
- Library enforces it. It does not rely on you remembering.

Passwords on the way are protected by HTTPS; see [HTTPS and certificates](https-and-certificates.md).

## How Library decides what counts as outside

Library does not trust anything a visitor says about themselves. It looks at the connection itself: the address the connection came from and the port it arrived on. It never reads a header or a flag that a browser could send, and it never decides by a web address in the page.

| Where the visit came from | Library treats it as |
|---|---|
| The same computer that runs Library, directly (loopback) | This computer |
| A private home address (`10.x.x.x`, `172.16.x.x` to `172.31.x.x`, `192.168.x.x`, or link-local and local IPv6 addresses) | Home network |
| An address range you added yourself in `auth.trusted_local_networks` | Home network |
| **Anything that arrives on the proxy port** (usually 5017) | **Outside** |
| A proxy you listed as trusted, connecting to the main port | **Outside** |
| A public internet address | **Outside** |
| An address Library cannot read | **Outside** |
| On Docker, the Docker gateway address (an internet visitor behind Docker's address translation looks like this) | **Outside**, unless you list it yourself as home |
| A Tailscale address (`100.x.x.x`) connecting directly to the main port | **Outside** |

Three consequences are worth knowing.

**1. Forwarded visits count as outside, always.** If a request carries any of the usual "I was passed along" headers (`X-Forwarded-For`, `X-Real-IP`, `Forwarded`, `Via`, `CF-Connecting-IP` and similar), Library treats it as outside, even when it appears to come from the same computer. This matters because a proxy or tunnel running on the server looks like the server itself. Without this rule, a Caddy or Cloudflare connector on the same computer would make every visitor look as if they were sitting at the server, and no-password profiles would open for the whole internet. With it, they cannot.

**2. This is why the proxy port exists.** Everything on port 5017 counts as outside, so a proxy aimed there is safe by design. A proxy aimed at the main port (5016) has its forwarded headers ignored there. Library defends against that mistake too: a visit that arrives from a trusted proxy on the main port is also treated as outside. The fix is to move the proxy to the proxy port.

**3. The failure is always on the safe side.** If Library cannot tell, it says outside. The worst case is a password prompt at home, never an open door from outside. If a home network is refused (for example a Docker Desktop network or an IPv6-only network), add its range to `auth.trusted_local_networks` in `config/network.json` and restart the Dashboard. Add only ranges you control. Adding a broad range tells Library that anyone in it is at home.

## What the Passwords step shows

In the guided flow, step 3 is **Passwords**. It reads the sentence "Away from home, every sign-in needs a password or passkey. Profiles without one will keep working at home but cannot sign in from outside." and lists every profile with its state:

| What you see | What it means | What you can do |
|---|---|---|
| Password set, reachable away from home | The profile has a password or passkey and an email to sign in with. | Nothing. |
| No password, home only | The profile works at home, and an outside sign-in is refused. | **Set a password**, or leave it as home only. |
| No password, home only (for example a living-room TV profile) | Same. A shared TV profile often should stay this way. | **Keep home only**. |

Choosing **Set a password** opens the same dialog used elsewhere in Library, in **Settings → Security & Devices** and **Users & Households**. A sign-in that works away from home needs an email address, and the dialog asks for it when the profile has none. See [Account security](../account-security.md).

Nothing is forced on anyone except the administrator below. Profiles you leave alone simply stay home only.

## The administrator needs a password to continue

The **Continue** button stays disabled until the administrator doing the setup has a password. Reason: if you set up outside access and the only administrator profile has no password, that profile cannot sign in from outside, and you would be locked out of Library's settings exactly when you are away from home and want to fix something.

If you began with **Use Tuvima on this computer** (no password, name only), secure the account first: **Settings → Security & Devices → Password**, then **Secure your account**. See [Account security](../account-security.md#secure-a-this-computer-account). The Passwords step offers the same.

## What happens to someone without a password who tries from outside

- They are refused at sign-in with a plain message.
- The attempt shows in **Recent sign-ins from outside** on the Test step, marked as blocked and why, for example "blocked, no password".
- Nothing about the profile changes.

Repeated wrong passwords from anywhere slow down and lock a sign-in, as they always do. Five failures lock the credential for 15 minutes.

## Passkeys

A passkey is a sign-in that lives on your phone or computer, unlocked with your face, finger or screen lock. It counts the same as a password for this rule. Passkeys need HTTPS and the server's saved public address, so they work only after the route is secure. Add them after setup in **Settings → Security & Devices → Extra protection**.

## Guests

A person you invite from outside always chooses a password or a passkey as part of accepting. There is no no-password guest. See [Invite friends](invite-friends.md).

## Troubleshooting

- [`profiles_without_password`](testing-and-troubleshooting.md#profiles_without_password)
- [`admin_without_password`](testing-and-troubleshooting.md#admin_without_password)
- [`proxy_not_trusted`](testing-and-troubleshooting.md#proxy_not_trusted)
- [`no_outside_visitors_seen`](testing-and-troubleshooting.md#no_outside_visitors_seen)

## Next steps

- [Invite friends](invite-friends.md)
- [Test your connection](testing-and-troubleshooting.md)
- [Account security](../account-security.md)
