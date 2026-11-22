---
title: Build apps with Tuvima Developers
description: "Set up a developer account, register an app, and publish it on tuvima.app after a short review."
audience: developer
category: guide
product_area: tuvima-id
status: early-access
---

Tuvima Developers is where you register the apps you build with Tuvima ID. It is part of Tuvima ID, and you sign in to it with your own Tuvima ID.

The site has two sections. The **Tuvima ID** section covers sign-in, plans and paid features, and app pages. The **Tuvima** section (add-ons, bots, community numbers and embeds) is coming soon.

> **Early Access.** You can set up and publish apps now. Apps start signing people in with the next update. For now Tuvima Developers is open to invited developers only; everyone else can join once Tuvima opens to the public.

## Before you start

- Turn on [two-step sign-in](../guides/two-step-sign-in.md). Tuvima Developers asks for it every time, because your apps act for other people.
- Have your invitation link from Tuvima ready.

## Join

1. Open your invitation link while signed in.
2. Choose your **publisher name**. People see it on your app pages, for example "By Pantry Co". You can change it later.
3. Read and accept the developer terms.

Developers who were invited before launch get their first year of the developer subscription free.

## Two kinds of app

| | For your own places | Published on tuvima.app |
|---|---|---|
| Who uses it | Your own communities, sites or servers | Anyone |
| Cost | Free | Needs the developer subscription ($29 a year) |
| Listed | Never | Gets its own app page |
| Review | None: ready at once | Tuvima reviews it before anyone can use it |
| Limits | Tighter | Higher |
| Plans and paid features | No | Yes |

You choose the kind when you create the app. You can have up to 10 apps.

## Create an app

1. Open **Your apps** and choose **New app**.
2. Give it a name and an **address**. The address becomes the app page, for example `pantry.tuvima.app`. It cannot change later, and some words (including "tuvima") are kept for Tuvima.
3. Choose who it is for and what kind of app it is: a website, a self-hosted app, or a phone or desktop app.
4. Pick only the features it needs. People see this list before they sign in.

Every app gets **Sign in with Tuvima ID**. Your app receives a private member number for each person, different in every app, and the persona the person picks. It never receives their email, their other personas, or anything they do elsewhere on Tuvima. [What apps can use](../explanation/privacy.md) explains the rest.

### Sign-in addresses

Tell Tuvima ID where to send people back after they sign in. Websites and self-hosted apps use `https` addresses only. Phone and desktop apps can also use a local address (`http://127.0.0.1`) or their own app link (for example `com.example.pantry:/callback`).

## Publish an app

A published app needs, in this order:

1. An active developer subscription.
2. An app page: a one-line description, a longer description, your website and an icon colour.
3. Your terms and privacy note addresses, and a licence label (open source or closed source).
4. Review by Tuvima. Reviews usually take up to 5 working days, and the result shows on the **Publish** tab.

Tuvima checks some things automatically (for example that sign-in addresses belong to your site) and a person checks the rest: that the app does what its page says, asks only for what it needs, describes paid features honestly, and that its terms do not allow selling data or training AI on it.

Once published, the app's name and address are fixed. If you later ask for a new feature, the app keeps working while Tuvima reviews the change; features you remove stop at once.

## If something goes wrong

- **Changes requested.** The review note says what to fix. Fix it and send the app for review again.
- **Suspended.** Tuvima can suspend any app that breaks the terms, including apps for your own places. You see the reason on the app, and its settings are read-only until Tuvima restores it. A published app's page stays up and shows the reason, and no one new can start using it.
- **Your subscription ends.** You have 30 days to renew. After that your published apps stop taking new people until you renew. People already using them are not cut off, and nothing is deleted.

## See how your app is doing

Each app's **Overview** shows counts only: how many people have signed in and how many are on a paid plan. It never shows who.

## Next

- [Plans and plan notes](plans-and-plan-notes.md): sell plans and check what each person has.
