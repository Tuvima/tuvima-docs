---
title: "Reach Library away from home through your router"
description: "Open a door in your router for Library with automatic UPnP, NAT-PMP or PCP or manual steps, understand shared public addresses, and learn why this route is last."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Reach Library away from home through your router

Port forwarding means telling your home router: "when someone on the internet knocks on this door (a port number), send them to this computer." It is the oldest way to reach a home server, and it is the **last** route Library suggests. Read the reasons first. Most people are better served by [Tailscale](tailscale.md) or a [Cloudflare Tunnel](cloudflare-tunnel.md).

## Why this is the last choice

1. **It may not work at all.** Many internet providers share one public address between several homes. A door in your router then leads nowhere, because the real front door belongs to the provider. See [Shared public addresses](#shared-public-addresses).
2. **It exposes your home.** Anyone can look up your name, find your home's public address and try the door. Library asks for a password, but the door is open to be tried, day and night.
3. **Library's own listener is plain http.** The Dashboard does not do HTTPS by itself. If you forwarded its port, every sign-in and pairing code would cross the internet readable by anyone on the path. So today, the door must lead to a **proxy that does HTTPS** (Caddy or nginx), not to Library. See [Why HTTPS is needed](#why-https-is-needed-and-what-is-coming).
4. **Addresses change.** Most homes get a new public address from time to time, which breaks the name until you update it.
5. **More moving parts.** The router, the provider, a proxy, a certificate and a name all have to line up.

If you have read this and still want it, the rest of this page is complete.

## What Library never forwards

Only the proxy's HTTPS port (usually 443) is ever opened. Never forward:

- **5016**, the Dashboard's main port (plain http, home use).
- **5017**, the proxy port (meant only for a proxy on the same computer or network).
- **61495**, the Engine's port (internal only, never published or proxied).

Library also refuses to map its own http listener automatically. Automatic mapping targets only a local HTTPS listener that you set up.

## Automatic: UPnP, NAT-PMP and PCP

Routers have three standard ways to let a program on your network ask for a door.

| Name | What it is |
|---|---|
| **UPnP** (IGD) | The oldest and most common. Often a switch in the router's settings, sometimes on by default. |
| **NAT-PMP** | A simpler method used by many Apple-style and newer routers. |
| **PCP** | The successor to NAT-PMP, on newer routers. |

You find these under **Settings → Network & Remote Access → Advanced**, in the router section, and Library's own-address flow offers them as the first thing to try for the router route. When automatic setup is on, Library:

- Tries PCP, then NAT-PMP, then UPnP, in that order.
- Asks for a door that leads to your configured local HTTPS proxy listener, not to the Dashboard's http port.
- Renews its request about every 15 minutes, because routers give doors only a limited lifetime, and again after a safe port change.
- Removes **only the door it created** when you turn automatic setup off or Library shuts down cleanly. It does not touch doors you made by hand.

The result is one of these states: not attempted, protocol unavailable, router refused, active, or expired. Library's check turns the two ends of this into messages: [`router_door_ready`](testing-and-troubleshooting.md#router_door_ready) and [`router_door_unavailable`](testing-and-troubleshooting.md#router_door_unavailable).

**Docker.** In Docker's default bridge setup, the Library container sees Docker's own gateway as its router, not your real router, so it cannot ask your router for anything. Library does not send discovery traffic in that case and says so. Make the door by hand (below), or run the proxy on the Docker host.

**A security note.** UPnP lets any program on your network open doors. Many people turn it off on principle. If you do, use the manual steps.

## Manual steps

### 1. Give the proxy computer a fixed address at home

The router must keep sending the door to the same computer.

1. Find the computer's home address (Windows: `ipconfig`; macOS and Linux: `ip addr` or the network settings). It looks like `192.168.1.20`.
2. In your router, find **DHCP reservation**, **address reservation** or **static lease**, and reserve that address for this computer.

### 2. Open your router's settings

Open the address on the router's label (often `192.168.1.1` or `192.168.0.1`) in a browser and sign in. If you have a provider box plus your own router, note that two routers in a row (a "double NAT") each need the door, or the provider box needs to be set to pass everything through ("bridge mode" or "IP passthrough").

### 3. Add the forwarding rule

Find **Port forwarding**, **Virtual server**, **NAT** or **Applications** (the name varies). Add a rule:

| Field | Value |
|---|---|
| Protocol | TCP |
| External (WAN) port | 443 |
| Internal (LAN) address | The proxy computer's address, for example `192.168.1.20` |
| Internal port | 443, or the HTTPS port your proxy listens on |

If your certificate service needs port 80 (Caddy and certbot both usually do), add a second rule for TCP 80 to the same computer.

### 4. Know your public address

Your home's public address is the one the internet sees. Find it by opening a "what is my IP" page from the proxy computer. Then compare it with the **WAN** or **Internet** address in your router's status page. If they match, your address is yours. If not, see the next section.

### 5. Point the name at it

Make a DNS **A** record from your name to the public address. See [Getting and pointing a domain](domain-names.md).

### 6. Test from outside

Open the address on your phone with Wi-Fi **off**. Testing from inside your own home often fails even when the door is right, because many routers cannot loop traffic back ("hairpin" or "NAT loopback"). Library's Test step runs the check from outside for you.

## Shared public addresses

Internet providers are running out of addresses and often put many customers behind one shared public address. The technique is called **CGNAT** (carrier-grade network address translation). Library calls it a **shared address**.

**How you know.** Look at the router's WAN address:

- If it is in `100.64.0.0` to `100.127.255.255`, or a private range such as `10.x.x.x`, `172.16.x.x` to `172.31.x.x` or `192.168.x.x`, your provider is giving you a private address and sharing a public one.
- If it differs from what a "what is my IP" page shows, the same is true.

Library's Check also looks for this and warns first: [`shared_address`](testing-and-troubleshooting.md#shared_address).

**What it means.** The door in your router opens onto the provider's network, not the internet. No setting at home can fix it.

**What to do:**

1. Use [Tailscale](tailscale.md) or a [Cloudflare Tunnel](cloudflare-tunnel.md). Neither needs a door.
2. Or ask your provider for a public address of your own. Some give one for free, many charge a small monthly fee, and some business plans include one.
3. Or ask about a public IPv6 address. If your provider gives IPv6 and your devices use it, a rule that allows incoming IPv6 to the proxy computer can work where IPv4 cannot. This is advanced; the visitor's network must also support IPv6.

## Why HTTPS is needed, and what is coming

HTTPS encrypts the connection and proves the visitor reached your server and not an impostor. Without it, a password typed in a café could be read by anyone on the café's network, and a pairing code could be stolen. See [HTTPS and certificates](https-and-certificates.md).

**Library's own web listener does not do HTTPS today.** Tailscale supplies HTTPS itself, and tunnels get theirs from the provider. Only this route needs you to bring your own. So at present the door in your router must lead to [Caddy](caddy.md) or [nginx](nginx.md), which serve HTTPS and pass the visitor to Library's proxy port.

Built-in HTTPS, so that this route needs no proxy, is planned as a separate, later feature with its own security review. It is **not available yet**, and these pages will say when it is.

## Next steps

- [Caddy](caddy.md) or [nginx](nginx.md), the proxy this route needs.
- [Getting and pointing a domain](domain-names.md)
- [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md)
- [Testing and troubleshooting](testing-and-troubleshooting.md)
