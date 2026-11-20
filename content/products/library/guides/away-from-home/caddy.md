---
title: "Reach Library away from home with Caddy"
description: "Put Caddy in front of Library with the ready-made file, understand each line, open the right ports, and let Caddy get and renew your HTTPS certificate automatically."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Reach Library away from home with Caddy

Caddy is a free web server that does three jobs for Library: it answers on your web address, it passes visitors to Library, and it gets and renews your HTTPS certificate on its own. It is the easiest of the "run it yourself" routes, and Library offers a ready-made Caddy file with your address filled in. Allow 30 to 45 minutes.

Library installs nothing. You install Caddy, you save the file, and you run Caddy. Library only checks that it works.

## Is this the right route?

Visitors connect **straight to your home**, so you must be able to open ports 80 and 443 in your router and your internet provider must give you a public address of your own. If Library's Check says your provider shares your address, this route will not work. Use [Tailscale](tailscale.md) or a [Cloudflare Tunnel](cloudflare-tunnel.md). See [Router port forwarding](router-port-forwarding.md) for a longer explanation.

You also need your own web address. See [Getting and pointing a domain](domain-names.md).

## What you will end up with

```text
phone  ->  https://library.yourname.com  ->  your router (443)  ->  Caddy  ->  Library (proxy port 5017)
```

Caddy is the only thing the internet touches. Library's Dashboard and Engine are not published.

## Step 1: Choose your address

In Library's own-address flow, the **Address** screen asks for the front part of the name, such as `library`, and builds `https://library.yourname.com`. Library then fills that name into the Caddy file.

## Step 2: Point the name at your home

Create a DNS record at the place that hosts your domain's DNS, as explained in [Getting and pointing a domain](domain-names.md): an **A** record from `library` to your home's public IPv4 address (and an **AAAA** record if you also have a public IPv6 address and Caddy is reachable on it). Library's tick is **The name points to your home**; see [`name_not_pointing_here`](testing-and-troubleshooting.md#name_not_pointing_here).

## Step 3: Open ports 80 and 443 to the Caddy computer

Forward **TCP port 443** (and **80**) from your router to the computer that runs Caddy. Do not forward Library's ports, 5016, 5017 or 61495. Only Caddy's two ports go to the internet. The reason for port 80 is that Caddy uses it to prove to the certificate service that you control the name. Steps are in [Router port forwarding](router-port-forwarding.md#manual-steps).

## Step 4: Install Caddy

Install Caddy on the computer that runs Library (the simplest case) or on another computer on your home network.

- **Windows:** `winget install CaddyServer.Caddy` or `choco install caddy`, or download from [caddyserver.com](https://caddyserver.com/download).
- **macOS:** `brew install caddy`.
- **Debian and Ubuntu Linux:** install the official `caddy` package using the [steps on caddyserver.com](https://caddyserver.com/docs/install). It runs as a service and reads `/etc/caddy/Caddyfile`.
- **Docker:** use the `caddy:2` image. Mount your file at `/etc/caddy/Caddyfile`, and mount volumes at `/data` and `/config` so certificates survive restarts.

## Step 5: Save the Caddy file

Library offers the file with a **Download** button, with your address in place. It is a plain text file named `Caddyfile` with no extension. For `library.yourname.com` it reads:

```text
library.yourname.com {
    reverse_proxy 127.0.0.1:5017
}
```

### What each line means

| Line | What it does and why |
|---|---|
| `library.yourname.com {` | The address this block answers. Because it is a real name with no `http://` in front, Caddy automatically gets a certificate for it and serves it over HTTPS on port 443. It also answers port 80 with a redirect to HTTPS. This one line is the reason you need no certificate tool. |
| `reverse_proxy 127.0.0.1:5017` | Passes every request to Library. `127.0.0.1` means "this computer". `5017` is Library's **proxy port**, the one built for a proxy in front. Caddy also keeps websocket connections working with no extra setting. Library's pages use them for live updates. If Caddy runs on a different computer, replace `127.0.0.1` with the Library computer's address on your home network, and see [trust](#step-6-let-library-trust-caddy) below. |
| `}` | Ends the block. |

Caddy adds the standard forwarded headers on its own: the visitor's real address, the original host and the HTTPS scheme. Library reads them, only on the proxy port and only from a proxy it trusts. That is how it knows a visit came from outside.

**Use 5017 and not 5016.** The main port (5016) ignores forwarded headers, so a proxy aimed there would hide the real visitor. Everything arriving on the proxy port is treated as outside, which is how no-password profiles stay home only.

### Where the file goes

| Install | Put the file here | Then |
|---|---|---|
| Linux package | `/etc/caddy/Caddyfile` | `sudo systemctl reload caddy` |
| Windows or macOS, run by hand | Any folder, for example next to the Caddy program | In that folder run `caddy run` |
| Docker | Mounted at `/etc/caddy/Caddyfile` | Restart the container |

Check the file before using it: `caddy validate --config Caddyfile`.

On Windows, `caddy run` stops when you close the window. To keep it running after restarts, run it as a service with a service wrapper such as WinSW or NSSM (Caddy's documentation explains this). The Library check at the end of the flow tells you when the name stops answering.

## Step 6: Let Library trust Caddy

Library trusts forwarded headers only from proxies you name. A Caddy on the **same computer** needs no entry: loopback is already trusted on the proxy port. If Caddy is on another computer or in a Docker container, add its exact address (or, for a Docker network, the network's CIDR range) under **Settings → Network & Remote Access → Advanced → Reverse Proxy Trust** and restart the Dashboard. When Library finds it is not trusted, its check shows a red cross and a **Fix it for me** button. See [`proxy_not_trusted`](testing-and-troubleshooting.md#proxy_not_trusted).

Library always answers on the host of your saved public address. If you serve it under any other name as well, add that name (name only, no `https://`) to `local.allowed_hostnames` in [Configuration](../../reference/configuration.md).

## Step 7: Secure it and check it

When Caddy first starts with your file, it contacts a certificate service (Let's Encrypt, or ZeroSSL as a fallback) to get your certificate. **This is Caddy making that call, not Library.** It takes a few seconds to a minute. Library's **Secure it** screen then ticks:

- The name points to your home.
- The secure certificate is valid, and when it expires.
- Library recognizes visitors as outside.

## Certificates renew by themselves

Certificates from these services last about 90 days. Caddy starts renewing when about a third of that time is left, which is around 30 days before the end, and keeps trying every day if it fails. You do nothing. Three things stop it:

1. **Ports 80 and 443 stop reaching Caddy** (the router changed, the computer moved, the provider changed your address).
2. **Caddy cannot save its files.** Caddy stores certificates in its data folder (`~/.local/share/caddy` on Linux, `%AppData%\Caddy` on Windows, `/data` in the Docker image). Keep that folder between restarts.
3. **Caddy is not running.**

Library's check warns you when a certificate is close to the end: see [`certificate_expiring`](testing-and-troubleshooting.md#certificate_expiring). More on this in [HTTPS and certificates](https-and-certificates.md).

## Next steps

- [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md)
- [Testing and troubleshooting](testing-and-troubleshooting.md)
- [nginx](nginx.md), if you prefer it
- [Turn access off](turn-access-off.md)
