---
title: Warnings, word filters and the approval queue
description: Set up warning points, a warning ladder and word filters, review held posts, reports and join requests in one approval queue, and restore removed posts.
audience: user
category: guide
product_area: tuvima
status: early-access
---

These tools help your moderators act early and fairly. Nothing here bans anyone automatically: moderators always decide.

Owners and admins set them up in **Manage**, then **Warnings and word filters**.

## Newcomers

Newcomers are members who haven't yet met your [newcomer limits](../guides/newcomers.md).

- **Hold first posts from newcomers for review**: their first posts wait in the approval queue until a moderator approves them.
- **What newcomers can use**: switch photos, polls, looking-for-group posts and links on or off for newcomers. Off means it opens up once they are no longer a newcomer.

## Warnings

A moderator can give a member a warning with points, from the member's side panel or page, or for several people at once from the [members list](members.md#act-on-several-people-at-once).

- Giving or taking back a warning needs the **Suspend and ban** permission, even when the moderator is also removing a post.
- The moderator picks one of your **ready-made reasons**, which comes with its points, or writes their own reason and chooses the points, from 1 to 20.
- A warning can also name one of your community's rules and carry a message to the member.
- A warning can be taken back from the member's side panel or page. Its points stop counting at once.

### What the member sees

The member is told they have a warning. On **Your warnings** in your community they see the reason, the points, when the points expire and what the next step on your ladder is, for example "at 3 points, new posts wait for review for 7 days". They never see which moderator gave the warning.

They must choose **I understand** before posting or replying again, and can still read in the meantime. See [if you get a warning](../guides/reporting-and-moderation.md#if-you-get-a-warning).

### When points expire

Under **Points expire after**, choose how many days warning points keep counting, 90 to begin with. After that, each warning's points stop counting on their own.

### Ready-made reasons

Give each reason a name and a number of points, for example "Off-topic posting, 1 point". Moderators see them as a list to pick from when they warn someone. You can have up to 20, and put them in the order you like.

### The warning ladder

The ladder is a list of steps. Each step starts when a member's points still counting reach a number you choose, and does one of these:

- **Hold new posts for review**: their new posts wait in the approval queue for the number of days you choose.
- **Suggest a suspension**: moderators see a suggested suspension of the number of days you choose.
- **Suggest a ban**: moderators see a suggested ban.

A suggestion never happens on its own. Nobody is suspended or banned unless a moderator decides to do it.

You can add, change and remove steps, up to 10.

### What new communities start with

Every new community starts with a ladder and reasons you can change:

- Points expire after 90 days.
- Reasons: **Minor problem** (1 point) and **Serious problem** (3 points).
- At 3 points, new posts wait for review for 7 days.
- At 6 points, moderators see a suggested 7-day suspension.

## Word filters

Add words or phrases your community doesn't allow, up to 200. For each, choose what happens:

- **Hold for approval**: the post waits in the approval queue, with the matching words highlighted for moderators.
- **Block the post**: the post isn't posted. The writer sees your message, or "This post has words this community doesn't allow", and can change their words.
- **Replace with \*\*\*\***: the words are replaced with \*\*\*\* and the post shows.

Filters never hide a post silently: the writer is always told what happened, for example that their post is waiting for a moderator.

For each filter you can also:

- Choose **where** it applies: **Every forum**, or **Only these forums** with a tick for each forum.
- Name one of your community's rules. Moderators then see that rule as the **Rule it may break** when they review a held post.
- See how many times it matched in the last 30 days.

The table of filters lets you change a filter's action straight away, without opening it.

When a removed post is deleted after 30 days, the words a filter matched in it are deleted too.

### Word filters in chat channels

In [chat channels](chat-channels.md), only filters set for **Every forum** apply. **Replace with \*\*\*\*** works as it does for posts. A filter set to hold or block refuses the message, and the writer is asked to change it and send again.

## The approval queue

Open **Manage**, then **Approval queue**. Everything that needs a moderator's decision waits here together:

- **Held posts**: posts held by a word filter, by warning points, or because they are a newcomer's first posts.
- **Join requests**: people asking to join.
- **Reported posts** and **Reported messages**: what members have reported.

Each kind has its own tab with a count. You only see the tabs for the kinds your role lets you review. You can show one forum at a time, and choose **Oldest first** or **Newest first**. To look back at reports that have already been handled, choose **Reports already dealt with**, which opens the moderation record of past reports.

### What each item shows

- **Why it was held**: for example a word filter (with the words highlighted in the post), warning points, or a first post from a newcomer.
- Facts about the writer, such as when they joined, how many posts they have made, their level, warning points and any earlier removals.
- **Rule it may break**: taken from the reports, or from the word filter's rule.

### Deciding on a held post

- **Approve**: the post appears.
- **Reject**: the post doesn't appear. You can name a rule, give a warning (this needs the **Suspend and ban** permission), and tick **Tell [name] why** to send the writer a note.
- **Approve and edit**: fix the post, then **Save and approve**. Your edit is saved as a new version of the post, the moderation record shows "Approved after editing", and the writer is told.
- **Skip**: leave it in the queue for now.
- **Message**: write privately to the person the item is about, without leaving the queue's decision behind. It shows if you hold a moderation permission, and the message carries a **Moderator** tag.

### Deciding on reports and join requests

- **Reported post**: **Keep it** or **Remove post**.
- **Reported message**: **No action needed** or **Warn**. You only see the lines the reporter sent, under **What the reporter sent**. The rest of the conversation stays private.
- **Join request**: **Approve** or **Decline**. Declining doesn't tell the person why.

If another moderator decides an item before you, you see "Someone else already decided this one." and the next one opens.

### Working faster

- Turn on **Go to the next one after each decision** to move straight on.
- With **Use keyboard keys** on, press **A** to approve or keep, **R** to reject or remove, **S** to skip, and **J** and **K** for the next and previous item. Turn the switch off if you don't want the keys.

### On a phone

The queue shows one card at a time, with a progress bar at the top. **Reject**, **Approve** and **Skip** stay in a bar at the bottom of the screen. You can also swipe a card right to approve or left to reject. The buttons always work too.

## Removed posts

Open **Manage**, then **Removed posts**. It lists posts moderators removed in the last 30 days, with who removed each one, the rule it broke and how many days are left to restore it. You can show one forum, or the posts one moderator removed.

To bring a post back, choose **Restore**:

- Say why you are restoring it. Your reason is kept in the moderation record.
- **Tell the author it was restored** is ticked to begin with.
- If the removal came with a warning, you can also tick **Also take back** the warning points. This is off to begin with and needs the **Suspend and ban** permission.

A restored post goes back exactly where it was, with its replies, votes and reactions.

After 30 days a removed post can't be brought back. Posts that people delete themselves aren't listed here.

## Next steps

- [Look after members](members.md)
- [Reporting and moderation](../guides/reporting-and-moderation.md)
