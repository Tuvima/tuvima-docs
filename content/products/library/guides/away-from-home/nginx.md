---
title: "Reach Library away from home with nginx"
description: "A full nginx server block for Library with websockets for live updates, large uploads, forwarded headers, certificates with certbot, and adding the proxy to Library's trusted list."
audience: administrator
category: guide
product_area: networking
status: early-access
---

# Reach Library away from home with nginx

nginx is a widely used web server and proxy. Use this route if you already run nginx for something else, or you prefer to control every setting. If you have no preference, [Caddy](caddy.md) does the same job with far less to write and renews its certificate without help.

This guide gives a complete working configuration and explains every part, because the parts nginx leaves out are exactly the ones that break Library. Library installs nothing and writes no nginx files; you do.

## Before you start

- Library works at home.
- You have a web address pointed at your home. See [Getting and pointing a domain](domain-names.md).
- Ports 80 and 443 can reach the computer that runs nginx. Library's Check warns you if your provider shares your public address, which blocks this route. See [Router port forwarding](router-port-forwarding.md).
- You know which port nginx should send traffic to: Library's **proxy port**, 5017 unless you changed `remote.proxy_port` in `config/network.json`.

## Step 1: Get a certificate

nginx does not get certificates itself. The usual tool is certbot, from the Electronic Frontier Foundation, which uses the free Let's Encrypt service. **Certbot contacts Let's Encrypt, not Library.** Run this on the computer that runs nginx, once the name already points at your home and port 80 reaches nginx:

```text
sudo certbot certonly --nginx -d library.yourname.com
```

Certbot saves the certificate in `/etc/letsencrypt/live/library.yourname.com/`. It sets up automatic renewal. Confirm it:

```text
sudo certbot renew --dry-run
```

If the dry run succeeds, renewal will work. On Windows, use a tool such as win-acme, or run nginx on a small Linux computer. See [HTTPS and certificates](https-and-certificates.md) for how renewal works and what stops it.

## Step 2: The server block

Save this as `/etc/nginx/conf.d/library.conf` (or in `sites-available` and link it into `sites-enabled`, as your distribution does). Replace `library.yourname.com` in all three places.

```nginx
# Lets a connection upgrade to a websocket when the browser asks, and stay a normal request otherwise.
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

# Send plain http to https.
server {
    listen 80;
    listen [::]:80;
    server_name library.yourname.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name library.yourname.com;

    ssl_certificate     /etc/letsencrypt/live/library.yourname.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/library.yourname.com/privkey.pem;

    # Uploads arrive in pieces of 64 MB by default. Allow a little more than one piece.
    client_max_body_size 100m;

    location / {
        proxy_pass http://127.0.0.1:5017;
        proxy_http_version 1.1;

        # Who the visitor really is. Replace, never append, so a visitor cannot fake an address.
        proxy_set_header Host              $host;
        proxy_set_header X-Forwarded-For   $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;

        # Websockets, used for live updates.
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Do not hold video, audio and uploads in nginx's memory or on its disk.
        proxy_buffering         off;
        proxy_request_buffering off;

        # Library keeps connections open for a long time.
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
```

Check and apply it:

```text
sudo nginx -t
sudo systemctl reload nginx
```

## What each part does, and why it is there

| Part | What it does | What goes wrong without it |
|---|---|---|
| `map ... $connection_upgrade` | Passes the browser's websocket upgrade request through, and a normal connection otherwise. | Library's pages open, then show a "reconnecting" message and stop updating. Library's Dashboard runs on live connections (SignalR over websockets) and cannot work without them. |
| The port 80 block | Redirects http to https. | Someone typing the name without `https://` hits nothing. Your certificate service may also need port 80 to renew. |
| `listen 443 ssl` and `http2 on` | Serves HTTPS, with HTTP/2 for speed. (`http2 on;` is the form for current nginx; on older versions write `listen 443 ssl http2;` instead.) | Without HTTPS, passwords cross the internet in plain text. Library's Check marks the address as not secure. |
| `ssl_certificate` and `ssl_certificate_key` | The certificate and its private key. Use `fullchain.pem`, not `cert.pem`. | With `cert.pem` some devices, including TVs and apps, refuse the connection because the chain is incomplete. Library reports `certificate_invalid`. |
| `client_max_body_size 100m` | The largest single request nginx accepts. nginx's default is 1 MB. | Uploads into the Import folder fail with "413 Request Entity Too Large". Library sends each upload in pieces (64 MB by default; the `upload_piece_bytes` setting in [Configuration](../../reference/configuration.md) changes it), so allow slightly more than one piece. If you raise the piece size, raise this too. |
| `proxy_pass http://127.0.0.1:5017;` | Sends everything to Library's proxy port on this computer. Use `http`, not `https`: the traffic between nginx and Library stays on one computer. | Aiming at port 5016 hides the real visitor, because the main port ignores forwarded headers. Library would then see every visitor as the proxy. |
| `proxy_http_version 1.1` | Required for websockets and for keeping connections open. | Websocket connections fail. |
| `X-Forwarded-For $remote_addr` | The visitor's real address. | Library cannot tell who is connecting, so sign-in rate limits and the recent outside sign-in list can be wrong. |
| `X-Forwarded-Proto $scheme` | Tells Library the visitor used HTTPS. | Library may build links with `http`, and passkeys and reset links break. |
| `Host` and `X-Forwarded-Host` | The name the visitor typed. | Library may answer "This address isn't allowed" or build links to the wrong name. |
| `Upgrade` and `Connection` | The two websocket headers, filled from the map. | Same as the map. |
| `proxy_buffering off` | Streams video and audio to the viewer as it arrives. | nginx collects large replies first, so playback starts late and uses disk. |
| `proxy_request_buffering off` | Passes uploads on as they arrive. | nginx saves each upload piece to disk before passing it on. Slow and wasteful. |
| `proxy_read_timeout`, `proxy_send_timeout` | How long nginx waits on a quiet connection. The default is 60 seconds. | A paused video or an idle page loses its connection every minute. |

### Why `$remote_addr` and not `$proxy_add_x_forwarded_for`

The common recipe appends to whatever `X-Forwarded-For` the visitor sent. A visitor can then claim to be a home address. Setting it to `$remote_addr` throws away anything the visitor supplied, so the value Library sees is the one nginx measured. Library only trusts the header from a proxy you listed, but there is no reason to pass on a forged one.

## Tell Library to trust the proxy

Library looks at forwarded headers only when they come from a proxy you have named, and only on the proxy port. Without that, Library answers every visit as coming from the proxy itself, and its check says so (`proxy_not_trusted`).

1. nginx **on the same computer** as Library: you need no entry. Loopback (`127.0.0.1`) is trusted on the proxy port already.
2. nginx on **another computer**: open **Settings → Network & Remote Access → Advanced → Reverse Proxy Trust** and add that computer's exact address. In Docker, add the explicit CIDR range of the Docker network that the proxy uses (for example `172.20.0.0/16`), not a wide range.
3. Restart the Dashboard. The trusted lists are read at start-up.

You can do the same in `config/network.json` under `remote.trusted_proxies` (exact addresses) or `remote.trusted_proxy_networks` (ranges). See [Configuration](../../reference/configuration.md).

When Library's check finds this problem it offers **Fix it for me**, which adds the proxy's address to that same list. Never add a range wider than the network your proxy uses. A wider range lets other devices on it pretend to be the proxy.

If your nginx is in front of another proxy (for example, a tunnel), the address to trust is the one that connects directly to Library, which is the nearest hop.

## Step 3: Check it

Library's **Secure it** and **Check** screens test three things: the name points here, the certificate is valid and when it expires, and Library recognizes outside visitors. Any failure matches an entry in [Testing and troubleshooting](testing-and-troubleshooting.md).

From your phone with Wi-Fi off, open `https://library.yourname.com`. The Library sign-in should appear with a padlock.

## Next steps

- [Passwords and who can sign in from outside](passwords-and-outside-sign-in.md)
- [Testing and troubleshooting](testing-and-troubleshooting.md)
- [Turn access off](turn-access-off.md)
