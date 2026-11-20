---
title: "Get alerts on your phone"
description: "Send Library alerts to your phone, email or a chat channel, set up from Settings in a couple of minutes, with a clear note on what leaves your computer."
audience: "administrator"
category: "guide"
product_area: "notifications"
status: current
---

# Get alerts on your phone

Library can tell you when something needs you: a backup failed, a drive filled up, a drive went offline, a new device signed in. The Dashboard inbox always works. This page is for also sending those alerts to your phone, your email or a chat channel you already use. Allow about two minutes per channel. Only administrators can set this up, and only administrators are told.

Open **Settings > General > Notifications**.

## Pick a channel

Press **Add a channel** and pick a tile. Each tile says what it costs and what it needs.

| Channel | Cost | You need | Good for |
|---|---|---|---|
| Email | Free | A mail account (see below) | People who live in their inbox |
| Phone alerts (ntfy) | Free | The ntfy app on your phone | The simplest push to an iPhone or Android phone |
| Discord | Free | A channel in your own server | People who already use Discord |
| Telegram | Free | A bot you create in a minute | A private chat on your phone |
| Pushover | One-time fee per phone | A Pushover account | The most reliable push |
| Slack or Teams | Free | An incoming-webhook link | Households or teams that already use them |
| Gotify | Free | Your own Gotify server | Android, fully self-hosted |
| Web address (webhook) | Free | An address that accepts messages | Home Assistant, n8n and other tools |
| Other services (Apprise) | Free | Your own Apprise server | Anything Apprise reaches, under Advanced |

You can add several of the same kind, such as two Discord channels or two ntfy topics. Each form has one or two fields and a sentence on where to find the link or token. The last thing on every form is a **Send test**; a new channel is tested as soon as you add it.

## Email

Email needs a mail server, which is also what password reset by email uses. Under **Mail server**, pick Gmail, Outlook, iCloud, Fastmail or Other. The form fills in the server, port and security. Type your username and an **app password** (Gmail and iCloud need one: a password made just for apps, not your normal one). The password is written once, stored encrypted and never shown again. **Send test to me** sends a message to your own address, and **Save** turns on after one test succeeds.

## Choose what goes where

The table under **What goes where** has one row per kind of alert and one column per channel. Tick the places each kind should go. On a phone it becomes one card per alert with a switch per channel. New alerts start in the inbox only.

The alerts you can choose from:

- A backup failed, finished, or a needed tool is missing
- A plugin is broken or has an update
- The disk is low, ingestion finished, or items are waiting in Needs Review
- Someone was invited, or a deleted item is about to leave the recycle bin for good
- **A new device signed in**
- **Several sign-ins failed in a row** (five in ten minutes for the same address)
- **A library drive went offline**
- **A Library update is available**
- **Video preparing keeps failing** (three in a row)

## Quiet hours and the daily summary

**Quiet hours** hold everything that leaves your computer until they end; the inbox still fills.

**Daily summary** is optional. Turn it on and pick a time, and calm updates (a finished backup, items waiting, a plugin update) wait and go out as one message a day. Anything that needs you, such as a failed backup, still arrives at once.

## What leaves your computer

Every message you send through a channel passes through whatever carries it. Each form ends with a line saying exactly that, and the details are in [Understand privacy and network access](../explanation/privacy-local-first.md#know-what-alerts-send). In short:

- By default a message carries only a short generic title, such as "A backup did not finish", and "Open your Library to see what happened." Turn on **Include details** for a channel only if you are comfortable with the full text going there. The switch is per channel and off by default.
- Nothing is sent during quiet hours, and no channel gets more than one message a minute per kind of alert.
- A channel that fails five times in a row switches itself off and shows **Needs attention** with the plain reason. Fix it and turn it back on, or press **Send test**.
- Logins, tokens and links are stored encrypted. They are never shown again and never appear in an error message.

## When it does not work

- **Needs attention, "link not accepted"**: the link was copied incompletely or the channel was deleted at the other end. Paste it again.
- **ntfy messages do not arrive on a phone**: on a public ntfy.sh topic, check the phone is subscribed to exactly the same topic and that the ntfy app is allowed to notify.
- **Email test fails**: Gmail and iCloud reject your normal password; use an app password.
- **Nothing arrives at night**: quiet hours or the daily summary are holding it.

## Next steps

- [Understand privacy and network access](../explanation/privacy-local-first.md)
- [Secure remote access](remote-access.md)
- [Operations and recovery](operations-and-recovery.md)
