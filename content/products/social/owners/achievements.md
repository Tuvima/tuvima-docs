---
title: Run achievements in your community
description: Start from the ready-made achievements, build your own with the rule builder and emblem builder, give them by hand, import and export packs, and retire them.
audience: administrator
category: guide
product_area: tuvima
status: early-access
---

[Achievements](../guides/achievements.md) are small marks of recognition for what members do in your community. They never open areas or give powers. This page shows how to run them.

## Open the achievements page

Choose **Manage**, then **Achievements** under **Members and access**. You see it if you are the owner or an admin, or if one of your roles has the **Give achievements** permission. Someone with only that permission sees only the hand-given log.

The page has three tabs:

- **Achievements**: every achievement rule you have, one row each.
- **Hand-given log**: every award and take-back made by hand.
- **Packs**: import and export.

A line above the table shows how many are switched on, for example "47 of 500 active", and how many of those come from "each place" rules (see below). The table shows each rule's emblem, kind, where it counts, how many members hold it, where it came from (**Starter kit**, **An add-on**, **A pack** or **You**) and whether it is **On**, **Off** or **Retired**. Search it, or filter by status, kind or origin.

## The starter kit

Every community starts with a ready-made set, switched on:

| Achievement | What earns it |
| --- | --- |
| **New joiner** | Joining the community. |
| **Years as a member** | One for each year from 1 to 10. |
| **First words** | Your first post or reply here. |
| **Welcomer** | Well-received replies to newcomers' first posts: 5, 25 and 100. |
| **Helpful** | Answers accepted as the answer: 10, 25, 50, 100 and 250. |
| **Well received** | Positive reactions and up votes on your posts: 100, 500, 1,000, 5,000 and 10,000. |
| **Insightful** | "Insightful" reactions from different members: 25, 100 and 500. |
| **Regular** | Days active: 30, 100 and 365. |
| **Sparked a conversation** | A post that got well-received replies from at least 5 different members. Counted each time. |
| **Made the front page** | A thread of yours reached the Tuvima front page. Counted each time. |
| **Top contributor** | Being in the top 10 for Reputation earned over the last 30 days. |
| **Poll starter** | Polls that 10 or more members voted in: 1, 10 and 50. Comes with the Polls add-on. |
| **Helpful in each forum** | Accepted answers in one forum: 10, 25 and 50. One set for every forum. |
| **Regular in each forum** | 30 active days in one forum. One for every forum. |

You can switch any of them off, change it, or add your own. A member tier can also add a past-supporter achievement; see [member tiers](member-tiers.md#give-an-achievement-to-past-supporters).

**Sparked a conversation** and **Top contributor** can also be switched on and off on the **Levels** page. Switching one off stops new ones and hides the ones members hold; switching it back on brings them back.

## Make an achievement

Choose **New achievement**, or open a row to change it. The rule builder is one page with four short parts. There are no scripts: every rule is built from a fixed menu. On the right, **What members will see** and **In plain words** update as you go.

### 1. What it is

A **name** (up to 60 characters in the builder), a **description** (up to 200), and an emblem. Put `{place}` or `{step}` in the name to fill in a place's name or a step's number, for example "Helpful in {place}".

### 2. How it is earned: what counts, how many, where and when

Choose a **kind**. It can't change once the achievement is made.

| Kind | Meaning |
| --- | --- |
| **Count** | A tally reaches a number. |
| **Time as a member** | Years in the community. |
| **Event** | Was there. Today you give these by hand. |
| **First time** | The first time someone does it. |
| **Limited time** | Only counts between two dates. |
| **Community goal** | A shared target. Everyone who helped earns it when it is met. |
| **Collection** | Holding a set of other achievements. |
| **Standing** | Held while in the top places. |
| **Given by hand** | You, or a role you allow, give it. |

Then fill in what that kind needs:

- **What counts**, from a menu: posts and replies, conversations started, accepted answers, positive reactions, "Insightful" from different members, days active, replies that welcome newcomers, photos shared, posts that sparked a conversation, threads that made the front page, and joining. Add-ons add more, such as polls with 10 or more voters and looking-for-group posts filled.
- **How many**: add one or more numbers. Each number is a step, and each step is its own achievement, shown together as a series. You can add up to 12 steps in the builder, each from 1 to 1,000,000. For years, use whole numbers from 1 to 50.
- **Where it counts**: the whole community, chosen forums, each forum, each category or each tag. An "each" choice makes one achievement for every place, including places you add later.
- **When**: for a limited-time achievement, a first day and a last day.
- For a community goal, the target for the whole community. For a collection, the achievements it asks for.

### 3. Who can earn it

Choose **Every member**, or **Only some members** and ask for a minimum level, a [member tier](member-tiers.md) or a [role](roles.md). This only limits who can earn the achievement. It never gives anyone access or powers.

### 4. Options

- **Keep it secret**: members see "?" and no name until they earn it.
- **Count past activity**: members who already reach it are given it that night, quietly.
- **Switched on**: when off, nobody earns it and it stays in the list.

### The preview

As you fill in the parts, **In plain words** says the rule back to you. Under it you see how many achievements the rule makes now, for example "36 achievements now", how many places are left under your limit, and about how many members would earn it today. Read it before you choose **Make achievement** or **Save changes**.

## The emblem builder

Choose **Edit emblem** to design the emblem. You choose:

- a **shape**: circle, square, hexagon, octagon, diamond or shield,
- a **symbol** from Tuvima's own set of 30,
- an **outer** and an **inner colour** from a fixed set. Every colour keeps the symbol easy to read, so an emblem can't end up unreadable,
- whether to **show the number** (the step or year),
- the **shine**: **When rare**, **Always** or **Never**. "When rare" shines once fewer than 5% of members hold it.

A preview shows the emblem as it appears on cards, beside names and before it is earned. Nothing changes until you choose **Use emblem**. Uploading your own pictures is not available yet.

## Give and take back by hand

Only achievements of the kind **Given by hand** or **Event** can be given by hand, and only while they are switched on. Choose **Give by hand** at the top of the page, or **Give** on a row.

1. Pick the achievement.
2. Add members by typing the start of their name. You can add up to 100 at a time.
3. Add an optional **public note**, up to 280 characters. It shows with the achievement for those members.
4. Choose **Give**.

Tuvima tells you how many were given, how many already had it, and how many can't earn it, such as a held or banned member.

To take one back, open the **Hand-given log** and choose **Take back** next to the award. You can add a reason. Only awards you gave by hand can be taken back; achievements members earned stay with them.

Owners and admins can give and take back. To let another role do it, switch on **Give achievements** in [Roles and permissions](roles.md).

The **Hand-given log** lists every award and take-back: when, which achievement, which member, who did it and the note, 50 at a time. It is for people who can give, and members don't see it.

## Packs

A **pack** is a file of ready-made achievements in a format called JSON. On the **Packs** tab:

- **Import a pack**: choose a file or paste the text, then **Check the pack**. You see each item marked **New** or **Skipped** with the reason, and how many achievements the pack makes. Tick the ones to keep, then import. Members who already qualify get them that night, quietly.
- **Export as a pack**: saves your own achievements as a file you can share with another community.

A pack only uses the fixed rule menu, so it can never run code. A pack is up to 200 KB and 100 achievements. The format, `tuvima-achievements/1`, is in [Achievement pack format](../reference/achievement-packs.md).

## Retire an achievement

Open the achievement and choose **Retire**. Everyone who holds it keeps it, marked **Retired**, and nobody new can earn it. **You can't bring a retired achievement back.**

The window also offers **Switch off instead**. That is gentler: nobody new earns it while it is off, and you can switch it back on.

## The limit of 500

A community can have up to **500** achievements switched on at once. The count includes every achievement a rule makes, so "Helpful in each forum" with 30 forums and 3 steps counts as 90. Retired and switched-off achievements don't count.

- A save or import that would go past 500 is refused. An import is refused as a whole, so pick fewer items or retire some first.
- If a new forum, category or tag would push an "each" rule past 500, that place's achievements are not made.

## Next steps

- [Achievements for members](../guides/achievements.md)
- [Achievement pack format](../reference/achievement-packs.md)
- [Roles and permissions](roles.md)
