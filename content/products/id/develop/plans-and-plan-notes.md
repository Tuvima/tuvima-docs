---
title: Plans and plan notes
description: "Describe your app's plans and paid features, give test plans, and check the signed plan note your app receives for each person."
audience: developer
category: guide
product_area: tuvima-id
status: early-access
---

A published app can offer plans, for example a Free plan and a paid Household plan. Tuvima ID keeps track of which plan each person has and tells your app in a **plan note**: a short message signed by Tuvima ID. The plan note is also the licence, so your app needs no separate licence keys.

> **Early Access.** Selling plans opens when Tuvima ID payments are ready. Until then you can give a paid plan to test accounts with a test link.

Plans are for apps published on tuvima.app. Apps for your own places use the Free plan only.

## Features and plans

On your app's **Plans** tab:

1. **Add the features** your app switches on or limits. A feature is either on or off (for example "Meal planner") or a limit (for example "Household members"). Each gets a short key, such as `meal-planner`, that your app reads. Up to 20 features.
2. **Add plans.** Every app has a Free plan for everyone who signs in. A paid plan has a price, monthly or yearly. Up to 6 plans.
3. **Fill in the table**: what each plan switches on, and each limit. Leave a limit empty for no limit.

Tuvima keeps 20% of plan sales.

## Test plans

A test link gives one paid plan, for a number of days you choose (up to 90), to whoever opens it while signed in. Each link works once and lasts 7 days. You never learn who used it.

Send the link to yourself on a test account, or to a tester, to see your app behave as it will for a paying person.

## What your app receives

For each person, your app receives a plan note. Fetch a fresh one each day; each note lasts 8 days, so a short outage on either side does not lock anyone out.

The note is a signed JSON Web Token (a standard signed message format) with the type `tuvima-plan+jwt`, signed with ES256. Its contents look like this:

```json
{
  "iss": "https://id.tuvima.com/",
  "aud": "app_01jd8q2...",
  "sub": "the person's private member number in your app",
  "v": 1,
  "iat": 1795334400,
  "exp": 1796025600,
  "plan": "household",
  "status": "active",
  "features": ["shared-cookbooks", "meal-planner"],
  "limits": { "saved-recipes": null, "household-members": 6 },
  "paidThrough": "2026-12-21T00:00:00Z",
  "graceUntil": "2026-12-28T00:00:00Z"
}
```

| Field | Meaning |
|---|---|
| `aud` | Your app's sign-in name. Refuse a note for any other app. |
| `sub` | The same private member number your app gets at sign-in. |
| `plan` | The plan's key. |
| `status` | `active`, or `grace` in the 7 days after the paid date. |
| `features` | The keys of the on-or-off features this plan switches on. |
| `limits` | Each limit's value. `null` means no limit. |
| `paidThrough`, `graceUntil` | Only for paid plans. |

### Check the note

Before trusting a note, your app checks that:

1. it is signed by one of the keys published at `/.well-known/plan-proof-keys` on Tuvima ID (cache them for a day; Tuvima ID publishes the old key for a while after changing keys);
2. its type is `tuvima-plan+jwt` and it uses ES256;
3. `iss` is Tuvima ID and `aud` is your app;
4. it has not expired.

### When a payment stops

After the paid date the person keeps their plan for 7 days' grace, then moves to the Free plan. Nothing is deleted: design your app so data over a Free limit stays readable and the person can choose what to keep.

## What a plan note never contains

The person's email, name, other personas, or anything about other apps. Your app's dashboard shows only counts of people on each plan, never who.
