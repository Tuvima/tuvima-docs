---
title: "Test your connection and fix what a check reports"
description: "Test away-from-home access from outside, then find every Library check by its key with what it means, why it happens, the next step, and what to do if that fails."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Test your connection and fix what a check reports

The last step of the guided flow, **Test**, tries your address from outside and tells you the result in plain words. Earlier steps run smaller checks and tick when they pass. When a check does not pass, Library shows one sentence and one next step. This page is the longer version of each one.

Every message in the flow has an entry here, filed under a short **key** such as `shared_address`. The key is the same in the flow, in this page and in anything you send to someone who is helping you. Use your browser's find on the key, or jump straight to it from the list below.

## Test it yourself, from outside

Library's test is real, but nothing beats trying it.

1. Take your phone and **turn Wi-Fi off**, so it uses mobile data. (With Tailscale, leave Tailscale on.)
2. Scan the QR code on the Test step, or type the address.
3. You should see Library's sign-in page with a padlock.
4. Sign in with a profile that has a password.

Testing from inside your own home can fail even when everything is right, because many routers cannot send traffic back to themselves. Always test from outside.

## What a good result looks like

"Away-from-home access works. Library was reached from the internet at your address just now. Passwords are required." Under it: a QR code to open Library on your phone, the **Recent sign-ins from outside** list, and the **Allow connections from outside** switch.

## Find your check

| Key | Plain meaning |
|---|---|
| [`tailscale_not_installed`](#tailscale_not_installed) | Tailscale is not on this computer |
| [`tailscale_not_signed_in`](#tailscale_not_signed_in) | Tailscale is installed but not signed in |
| [`tailscale_https_off`](#tailscale_https_off) | Tailscale has no secure address for Library yet |
| [`tailscale_ready`](#tailscale_ready) | Tailscale is ready |
| [`shared_address`](#shared_address) | Your provider shares your public address |
| [`router_door_unavailable`](#router_door_unavailable) | Library cannot open a door in your router |
| [`router_door_ready`](#router_door_ready) | A door in your router is open |
| [`public_address_unreachable`](#public_address_unreachable) | The test could not reach your address from outside |
| [`proxy_not_trusted`](#proxy_not_trusted) | Library answered, but only as a visitor from the proxy |
| [`certificate_invalid`](#certificate_invalid) | The address's certificate is not valid |
| [`certificate_expiring`](#certificate_expiring) | The certificate is close to ending |
| [`name_not_pointing_here`](#name_not_pointing_here) | The name does not lead to this server |
| [`no_outside_visitors_seen`](#no_outside_visitors_seen) | Library has not yet seen anyone arrive from outside |
| [`profiles_without_password`](#profiles_without_password) | Some profiles have no password and stay home only |
| [`admin_without_password`](#admin_without_password) | The administrator setting this up has no password |

## Tailscale checks

<a id="tailscale_not_installed"></a>

### Tailscale is not installed on this computer

Key: `tailscale_not_installed`

**What it means.** Library looked on the computer that runs it and did not find Tailscale.

**Why it happens.** Tailscale is not installed yet. Or it is installed on another computer, such as your phone or laptop, and not on the server. Or Library runs in a Docker container, which cannot see Tailscale on its host.

**The next step.** Install Tailscale **on the server computer** (the one that runs Library), then press **Check again**. See [Tailscale, step 1](tailscale.md#step-1-install-tailscale-on-the-server-computer).

**If that fails.**
- On Docker, use Library's Tailscale overlay in `deploy/tailscale` instead. A Tailscale on the host is not visible to the container.
- On Linux, confirm `tailscale version` works in a terminal. If it does not, the `tailscale` command is not on the path of the user running Library's Engine.
- Close and reopen the Remote access page so Library looks again.

<a id="tailscale_not_signed_in"></a>

### Tailscale is installed but not signed in

Key: `tailscale_not_signed_in`

**What it means.** Tailscale is on this computer but has no account behind it, so it is not part of any tailnet.

**Why it happens.** You installed it but did not finish the sign-in. Or the device's key ended (Tailscale ends a device's key after a set period, 180 days by default at the time of writing, unless it is turned off for that device). Or you signed out. Or your tailnet needs an administrator to approve new devices.

**The next step.** Sign in again: click the Tailscale icon and choose **Log in** (Windows and macOS), or run `sudo tailscale up` (Linux). Then press **Check again**.

**If that fails.**
- Open the Tailscale admin console, **Machines**, and look for this computer. Approve it if it is waiting, or remove the old entry and sign in again.
- If the browser sign-in loops, sign in with the same sign-in provider you used for the account.

<a id="tailscale_https_off"></a>

### Tailscale has no secure address for Library yet

Key: `tailscale_https_off`

**What it means.** Tailscale is signed in, but nothing is answering over HTTPS at a `.ts.net` address for Library. Without it, your password would cross the network unprotected.

**Why it happens.** Either HTTPS Certificates are not switched on for your tailnet, or the Serve command has not been run (or was run with the wrong port, or was reset).

**The next step.** On the server computer, run the command Library shows:

```text
tailscale serve --bg 5017
```

If it prints a link to enable HTTPS, open it, enable **HTTPS Certificates** in the admin console and run it again. Then press **Check again**.

**If that fails.**
- Run `tailscale serve status`. It should list a `.ts.net` address pointing at `127.0.0.1:5017`. If it points at 5016 or something else, run `tailscale serve reset` and the command again.
- Use the port Library shows (5017 unless you changed `remote.proxy_port`). It must be the proxy port. Library must be listening on it; restart the Dashboard if you changed the setting.
- Check that **MagicDNS** is on in the admin console.
- Do not use Funnel.

<a id="tailscale_ready"></a>

### Tailscale is ready

Key: `tailscale_ready`

**What it means.** Tailscale is installed, signed in, and Serve is answering over HTTPS with your `.ts.net` address. Library has what it needs on the server.

**Why you see it.** All three Tailscale ticks passed.

**The next step.** Install Tailscale on your phone, sign in with the same account, switch it on, and go on to the Test step.

**If that fails.** If the phone cannot open the address, check that the phone's Tailscale is **on** and signed in to the same account, or has been shared this server. Then check the phone is not using a "private DNS" or VPN setting that overrides Tailscale's names. Turn Wi-Fi off and test over mobile data to rule out the home network.

## Router and shared address checks

<a id="shared_address"></a>

### Your internet provider shares your public address

Key: `shared_address`

**What it means.** Your provider puts several homes behind one public address (the technique is called CGNAT). A door in your router opens onto the provider's network, not the internet, so it will probably not work.

**Why it happens.** Providers run short of public addresses. Mobile and fibre providers do it most. Library found it because your router's internet-facing address is in a private or shared range (for example `100.64.x.x` to `100.127.x.x`) or differs from the address the internet sees.

**The next step.** Choose a route that needs no door: [Tailscale](tailscale.md) or a [Cloudflare Tunnel](cloudflare-tunnel.md). Library puts the router route last and shows this warning first.

**If that fails.**
- Ask your provider for a public address of your own. Some offer one free, many for a small fee.
- Double-check by comparing the address in your router's status page with a "what is my IP" page. If they match and Library still says shared, you may have two routers in a row (a "double NAT"). Put the provider box in bridge mode, or forward the door on both.
- A public IPv6 address can work where IPv4 cannot, if the visitor's network also supports IPv6. See [Router port forwarding](router-port-forwarding.md#shared-public-addresses).

<a id="router_door_unavailable"></a>

### Library cannot open a door in your router automatically

Key: `router_door_unavailable`

**What it means.** Library asked the router to open a door (using UPnP, NAT-PMP or PCP) and either got no answer or was refused. It is not proof the router cannot be set up. It only means Library could not do it for you.

**Why it happens.**
- The router has these features switched off (common, and sensible).
- The router does not support them.
- Library runs in Docker's default network and sees Docker's gateway rather than your router. Library does not even try in that case.
- A second router sits between Library and the internet.
- Your provider shares your address, so any door would be useless ([`shared_address`](#shared_address)).

**The next step.** Open the door by hand: reserve the server's address and add a TCP forwarding rule for port 443 (and 80 if your certificate tool needs it) to your proxy. See [Manual steps](router-port-forwarding.md#manual-steps).

**If that fails.**
- Look at [`shared_address`](#shared_address) first. If you are on a shared address, no door will work.
- Turn on UPnP in the router settings and check again, if you are comfortable with that.
- Use [Tailscale](tailscale.md) or a [Cloudflare Tunnel](cloudflare-tunnel.md) instead.

<a id="router_door_ready"></a>

### A door in your router is open

Key: `router_door_ready`

**What it means.** Library's request for a door was accepted, and the door is active. It does not mean the whole route works. Something must still answer at the other side and the name must lead here.

**Why you see it.** The router accepted a UPnP, NAT-PMP or PCP request. Library renews it about every 15 minutes.

**The next step.** Point your name at your public address ([Getting and pointing a domain](domain-names.md)), then secure it with your proxy ([Caddy](caddy.md) or [nginx](nginx.md)). Then run the Test step.

**If the Test step fails after this.**
- The door leads to your proxy, so the proxy must be running and listening on the port the door sends traffic to.
- Some providers block incoming ports 80 or 443 on home plans. Ask the provider, or use another route.
- Test from mobile data, not from inside your home.
- See [`public_address_unreachable`](#public_address_unreachable).

## Address, proxy and certificate checks

<a id="public_address_unreachable"></a>

### The test could not reach your address from outside

Key: `public_address_unreachable`

**What it means.** Library tried to open your address the way a visitor would, and got no answer, or an answer that was not Library.

**Why it happens.** The cause is somewhere along the route, so the first job is to see how it fails.

**The next step.** Open the address on your phone with Wi-Fi off. Read what the phone says, then find it below.

| What you see | Most likely cause |
|---|---|
| "Can't find the server" or "site can't be reached", immediately | The name does not lead anywhere. See [`name_not_pointing_here`](#name_not_pointing_here). |
| It spins for a long time and then times out | The door is closed or blocked: router forwarding is missing, your provider blocks the port, or your address is shared ([`shared_address`](#shared_address)). Or the proxy computer is off. |
| "Connection refused" | The door is open but nothing is listening. Start Caddy or nginx. |
| A certificate warning | See [`certificate_invalid`](#certificate_invalid). |
| A Cloudflare error page (52x or 1033) | The tunnel connector is not running or cannot reach Library. Start `cloudflared` and check the service URL is `localhost:5017`. |
| A "502 Bad Gateway" or "503" page from nginx, Caddy or Cloudflare | The proxy works, but Library is not answering on port 5017. Check that the Dashboard is running and `remote.proxy_port` is set, and restart the Dashboard. |
| "This address isn't allowed for Tuvima Library" | The Dashboard does not know the name yet. Save it as the public address, or add it to `local.allowed_hostnames`, and restart the Dashboard. |
| Library appears | The route works. Run the test again. |

**If that fails.**
- Test the pieces in order: Library at home (`http://<server>:5016`), then the proxy on the same computer (`http://127.0.0.1:5017` from the server), then the name from inside, then from outside.
- With Tailscale, the test needs the phone to be in your tailnet. Check the phone's Tailscale is on.
- Look at the proxy's own log. It usually says why.

<a id="proxy_not_trusted"></a>

### Library answered, but only as a visitor from the proxy

Key: `proxy_not_trusted`

**What it means.** Your route reaches Library, but Library cannot see who the real visitor is, so every visit looks like it comes from the proxy itself. Library does not recognize outside visitors properly, so sign-in limits and the recent sign-in list would be wrong.

**Why it happens.** Library only believes the forwarded headers (the visitor's real address and HTTPS) from a proxy you have named, and only on its proxy port. This check fails when the proxy is not on the trusted list, which is common when the proxy is on another computer or in Docker. It also fails when the proxy aims at the main port (5016), which ignores forwarded headers.

**The next step.** Press **Fix it for me**, which adds the proxy's address to **Advanced → Reverse Proxy Trust**, then restart the Dashboard (the trusted lists are read at start-up). To do it by hand: [nginx, Tell Library to trust the proxy](nginx.md#tell-library-to-trust-the-proxy).

**If that fails.**
- Make sure the proxy sends to **5017**, not 5016.
- In Docker, trust the proxy network's explicit range (for example `172.20.0.0/16`), not a wide one.
- With several layers (a tunnel in front of nginx, say), trust the address that connects **directly** to Library, which is the nearest layer.
- A proxy on the **same computer** needs no entry; if you see this with one, check the port.
- Do not enable any setting that trusts forwarded headers from every address. That would let anyone claim to be at home.

<a id="certificate_invalid"></a>

### The address's secure certificate is not valid

Key: `certificate_invalid`

**What it means.** The address presents a certificate that devices will not accept. Browsers show a warning and Library's phone and TV apps refuse to connect.

**Why it happens.** The certificate has ended, is for a different name, is self-signed, or is missing the intermediate certificates (in nginx, using `cert.pem` instead of `fullchain.pem`). A proxy can also answer your name with the certificate of another site on the same computer.

**The next step.** Open the address in a browser and look at the warning, which names the cause. Then fix it where the certificate is made:
- Caddy: read its log and make sure the name points here and ports 80 and 443 reach Caddy.
- nginx: point `ssl_certificate` at `fullchain.pem`, run `sudo nginx -t`, reload.
- Tailscale: run `tailscale serve status`, and check HTTPS Certificates are on.
- Tunnel: the certificate belongs to Cloudflare. Check the hostname is added to the tunnel and the domain is active on Cloudflare.

**If that fails.**
- Check the server's clock. A wrong date makes valid certificates look expired.
- Check the name has no typo and matches the certificate.
- Wait a few minutes after a first start, since the first certificate can take a short while to arrive.

<a id="certificate_expiring"></a>

### The certificate is close to ending

Key: `certificate_expiring`

**What it means.** The certificate still works but its end date is near, closer than renewal should have allowed. Certificates from free services last about 90 days and normally renew about a month before the end, so a certificate this near its end usually means renewal has been failing.

**Why it happens.** Automatic renewal stopped: ports 80 or 443 no longer reach the proxy, the proxy or the certbot timer is not running, the computer was off, the proxy cannot write to its certificate folder, or the name changed.

**The next step.** Make renewal run now. Caddy: restart it and read its log. certbot: `sudo certbot renew --dry-run`, fix what it reports, then `sudo certbot renew` and reload nginx. Tailscale and Cloudflare renew on their own, so check their status as under [`certificate_invalid`](#certificate_invalid).

**If that fails.** Check the name still points here ([`name_not_pointing_here`](#name_not_pointing_here)), the ports are open from outside, and the server clock is right. See [HTTPS and certificates](https-and-certificates.md).

<a id="name_not_pointing_here"></a>

### The name does not lead to this server

Key: `name_not_pointing_here`

**What it means.** Library looked up your web address in DNS, and the answer is nothing, the wrong address, or an address that is not your home or tunnel.

**Why it happens.** The record is missing or has a typo; it points at an old home address (yours changed); the change has not spread yet (can take minutes, rarely hours); the domain's name servers are somewhere other than where you made the record; a Cloudflare record is "proxied" (orange) when you meant "DNS only"; or the domain has lapsed.

**The next step.** Compare what DNS says with the truth. Run `nslookup library.yourname.com` (Windows) or `dig +short library.yourname.com` (macOS, Linux). For a home route the answer should be your home's public address. For a tunnel, Cloudflare addresses. Fix the record at the place that hosts your DNS. See [Getting and pointing a domain](domain-names.md).

**If that fails.**
- Wait 15 minutes and check again.
- Check that the domain's name servers are the ones where you edited records.
- If your home address changes, use a dynamic DNS updater.
- Check the domain has not expired.

<a id="no_outside_visitors_seen"></a>

### Library has not yet seen anyone arrive from outside

Key: `no_outside_visitors_seen`

**What it means.** The test step's **Recent sign-ins from outside** list is empty: no visit or sign-in has reached Library through your route. This is normal before your first test.

**Why it happens.** Nobody has tried yet, or every try so far was from inside your home network (which counts as home, not outside), or the visits reached the proxy but never Library.

**The next step.** Open the address on your phone with Wi-Fi off and sign in with a profile that has a password. The list should show the visit within a moment.

**If that fails.**
- If the page does not open, go to [`public_address_unreachable`](#public_address_unreachable).
- If it opens but the list stays empty, Library is not recognizing visitors as outside, so check [`proxy_not_trusted`](#proxy_not_trusted) and that the proxy sends to 5017.
- A visit from your own phone on your home Wi-Fi is "home", not outside, even if you typed the outside address.

## Passwords checks

<a id="profiles_without_password"></a>

### Some profiles have no password and stay home only

Key: `profiles_without_password`

**What it means.** One or more profiles have no password or passkey. They work at home as always, but outside sign-in is refused for them.

**Why it happens.** At home Library does not need passwords, so profiles often have none. This is a notice, not a fault.

**The next step.** For each profile that should work away from home, press **Set a password**. Leave the others, such as a shared TV profile, as home only. See [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md).

**If that fails.** If the password dialog asks for an email, the profile has no sign-in address yet. Away-from-home sign-ins need one. Add it in **Settings → Users & Households**. See [Account security](../account-security.md).

<a id="admin_without_password"></a>

### The administrator setting this up has no password

Key: `admin_without_password`

**What it means.** The administrator running this setup has no password or passkey. **Continue** stays off until that is fixed.

**Why it happens.** You started with **Use Tuvima on this computer**, or the account was made without a password. An administrator with no password could not sign in from outside, so you could not manage Library once away.

**The next step.** Press **Set a password** on the administrator's row (or go to **Settings → Security & Devices → Password**), enter an email if asked, and choose a password of at least 12 characters. Save the recovery codes. Return and press **Check again**.

**If that fails.** If the dialog refuses the password, it is probably too short. If it says the profile belongs to someone else, sign in as the administrator you mean to use. If you are locked out, see [Account security](../account-security.md).

## Still stuck

- Turn outside access off while you work it out ([Turn access off](turn-access-off.md)). Home keeps working.
- Run the checks in order from the top of the flow; a later failure is often caused by an earlier one.
- Read the log of the piece that failed (Tailscale, `cloudflared`, Caddy, nginx), since each is quite specific.
- General Library problems are in [Troubleshooting](../troubleshooting.md).

## Next steps

- [Turn access off](turn-access-off.md)
- [Back to the overview](overview.md)
