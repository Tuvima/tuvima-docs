---
title: "Get a web address and point it at Library"
description: "Own or buy a domain, choose a registrar, create the DNS records that lead to your Library, check them, and see what Library never does with your domain."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Get a web address and point it at Library

Tailscale gives you an address for free. Every other away-from-home route (a tunnel, Caddy, nginx or a router door) uses a web address of your own, such as `library.yourname.com`. This page explains how to get one and how to point it at your Library.

## What a domain is, in plain words

A **domain** is a name you rent, such as `yourname.com`. You rent it for a year at a time from a company called a **registrar**. Renting gives you the right to make any number of **subdomains** under it for free, such as `library.yourname.com`. Library uses a subdomain, so you can keep the main name for something else.

**DNS** is the internet's phone book. A **DNS record** is one entry in it: "this name leads to that place."

## What Library never does

- It never buys a domain for you.
- It never stores your registrar's username, password or API key.
- It never changes your DNS records itself.

You make the changes with your own registrar or DNS host, and Library only reads the result to tell you whether the name leads where it should. This keeps your domain, which is worth more than any one server, out of reach of the software running on it.

## Step 1: Own or buy a domain

**If you own one already**, use it. You will pick a front name for the Library, such as `library`.

**If you need one:**

- Expect about **$10 a year** for a common ending such as `.com`. Prices vary by ending and by registrar. The first year is often discounted and renewal costs more, so look at the renewal price before you buy.
- Buy from any reputable registrar. Cloudflare, Namecheap and Porkbun all work well with Library's routes. Others work too, as long as you can edit DNS records.
- Turn on automatic renewal and two-step sign-in for the registrar account. If the domain lapses, someone else can buy it and receive your traffic.
- Turn on **WHOIS privacy** (a free option at most registrars) so your name and address are not public.

Library's **Address** screen asks "Do you have a web address for your Library?" and its **How to get one** link opens this page. It is a help page, not a purchase.

If you plan to use a Cloudflare Tunnel, the domain's DNS must be on Cloudflare. You can buy from Cloudflare, or buy elsewhere and change the **name servers** (see below).

## Step 2: Choose the front name

Pick a short name for the Library, for example `library`, `media` or `home`. The full address becomes `https://library.yourname.com`. Remember:

- The name is public. It appears in DNS and in public certificate records, so do not put anything private in it.
- Lower-case letters, digits and hyphens are safest.
- You can change it later by making a new record, saving the new address in Library, and removing the old record.

## Step 3: Create the DNS records

Where you make the records depends on who hosts your DNS. That is your registrar by default, or Cloudflare (or another host) if you moved the name servers.

| Route | Record to make | Points to |
|---|---|---|
| Cloudflare Tunnel | **CNAME** `library` | Cloudflare creates it for you when you add the public hostname in the tunnel; check it exists |
| Caddy or nginx at home | **A** `library` | Your home's public IPv4 address |
| Caddy or nginx at home, with IPv6 | **AAAA** `library` | Your home's public IPv6 address, only if the proxy is reachable on it |
| Router door | **A** `library` | Your home's public IPv4 address |
| Tailscale | None | Tailscale gives you a `.ts.net` name |

How to add an A record in most registrars:

1. Sign in and open the domain's **DNS** or **Manage DNS** page.
2. Choose **Add record**.
3. Type **A** as the type, `library` as the name or host, and your public address as the value.
4. Leave the **TTL** (how long other computers remember the answer) at **Automatic** or 5 to 30 minutes while you are setting up.
5. Save.

If you use Cloudflare for DNS with an A record, make sure the cloud icon beside the record is **grey** ("DNS only") unless you mean to put Cloudflare in front, which brings its video terms into play. See [Cloudflare Tunnel](cloudflare-tunnel.md).

### If your home address changes

Most homes get a new public address now and then. When it changes, an A record that holds the old one stops working. Use a **dynamic DNS updater** (a small program on your network that updates the record when the address changes). Many routers have one built in, and Cloudflare and other DNS hosts publish updaters. They need a limited token for that one record. Keep that token in the updater, never in Library. This is not needed for Tailscale or a tunnel, which do not depend on your home address.

### Changing name servers (Cloudflare Tunnel only)

At your registrar, find **Name servers** for the domain and replace them with the two Cloudflare gives you. Cloudflare then hosts all DNS for the domain, so copy over any other records you need first (mail, other sites).

## Step 4: Check that the name points where you think

DNS changes can take a few minutes, and occasionally hours, to spread. Check from any computer:

- Windows: `nslookup library.yourname.com`
- macOS and Linux: `dig +short library.yourname.com`

For an A record you should see your home's public address. For a tunnel you should see Cloudflare addresses.

Library does the same check in its **Point it here** and **Check** screens. It ticks when the name leads to your home or to your tunnel. If it does not, see [`name_not_pointing_here`](testing-and-troubleshooting.md#name_not_pointing_here).

## Step 5: Secure it

A name by itself serves plain http at best. The next step is a certificate, so the address starts with `https://`. See [HTTPS and certificates](https-and-certificates.md).

## Save the address in Library

Passkeys, invitation links and password-reset links are built from your public address, so save the address in Library: **Settings → Network & Remote Access → Remote access**, or `remote.public_hostname` in `config/network.json`. It must start with `https` and carry no path. The own-address flow saves it when you press **Save and check**.

## Next steps

- [HTTPS and certificates](https-and-certificates.md)
- [Cloudflare Tunnel](cloudflare-tunnel.md), [Caddy](caddy.md) or [nginx](nginx.md)
- [Testing and troubleshooting](testing-and-troubleshooting.md)
