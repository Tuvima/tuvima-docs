---
title: "Turn away-from-home access off"
description: "Stop outside access with one switch, keep home working, and learn how to fully remove each route, sign out devices and clear unused invitations."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Turn away-from-home access off

You can stop outside access at any time with one switch. Home keeps working exactly as before. This page explains what the switch does, what it does not do, and how to remove each route completely.

## The switch

When away-from-home access is on, the Remote access page shows its status, a QR code, the recent outside sign-ins, and **Allow connections from outside**. Turn that switch off.

- Library stops accepting visits from outside straight away.
- Visits at home, on the computer itself and on your home network, are not touched. Nothing changes for the family TV.
- Nothing is deleted. Your choices stay, so you can switch it on again later and run the Test step.

Use it whenever you want to be sure, for example while you troubleshoot, when you lose a phone, or when you go on a long trip and will not need it.

## What the switch does not do

It tells Library to refuse outside visits. It does not uninstall or stop the tools that carry them. If you want the route gone completely, remove each part below. It is a good habit to do so if you will not use it again, because an unused open route is something you must keep updated.

## Remove a route completely

### Tailscale

1. On the server computer, run `tailscale serve reset` to remove the private HTTPS address. (In Docker, stop the Tailscale overlay.)
2. To leave your tailnet entirely, run `tailscale down` or sign out in the Tailscale app, and remove the machine in the admin console under **Machines**.
3. If you shared the server with other people, remove the sharing in the admin console.

### Cloudflare Tunnel

1. In the Cloudflare dashboard, delete the tunnel (or at least its public hostname).
2. On the server computer, remove the connector: `cloudflared service uninstall` (or stop and remove the Docker container).
3. Delete the DNS record for the name in Cloudflare.

### Caddy

1. Remove the Library block from the Caddyfile and reload (`sudo systemctl reload caddy`), or stop Caddy (`sudo systemctl stop caddy`, or close it on Windows and macOS).
2. Close the router doors for ports 80 and 443 if nothing else uses them.
3. Delete the DNS record.

### nginx

1. Remove or disable `library.conf`, run `sudo nginx -t` and reload.
2. Close the router doors for 80 and 443 if nothing else uses them.
3. Delete the DNS record. Certbot's renewal for that name can be removed with `sudo certbot delete --cert-name library.yourname.com`.

### Router door

- If Library made it automatically, turn off automatic router setup under **Settings → Network & Remote Access → Advanced**. Library removes only the door it created.
- A door you made by hand is yours to remove: open the router's port forwarding page and delete the rule.

### Your domain

If you no longer need the name, delete its DNS records. Keep paying for the domain only if you want to keep the name. Library does not manage the domain, so there is nothing to cancel in Library.

## Clean up people and devices

After turning access off, decide what to do with what was set up for it.

| What | What to do |
|---|---|
| Paired phones and TVs | **Settings → Security & Devices → Devices** lists each one. **Sign out** ends it; it must be paired again. The Android app keeps the outside address until it is paired again, so re-pair a phone that should forget it. |
| Browsers still signed in | The same page lists **Signed-in browsers**, each with **Sign out**. |
| Friends you invited | In **Settings → Users & Households → Users**, use **Delete sign-in** for anyone who should not come back. |
| Unused invitations | They end after 7 days by default. Delete the sign-in they belong to if you want them gone sooner. |
| The saved public address | `remote.public_hostname` in `config/network.json` still holds your address. Passkeys and reset links are built from it. Clear it if you will not use the address again. |
| Passwords you added | Keep them. Passwords do not hurt at home and protect you if you set up again. |

## Turning it back on

Open the Remote access page and use the same flow. Check, Choose, Passwords, Connect and Test run again, and steps that are still in place tick straight away.

## Next steps

- [Overview and how to choose](overview.md)
- [Testing and troubleshooting](testing-and-troubleshooting.md)
- [Account security](../account-security.md)
