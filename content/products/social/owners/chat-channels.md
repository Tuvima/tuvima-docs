---
title: Set up chat channels
description: Add live chat channels beside your forums, choose who can read and post, set slow mode and automatic clearing, and start a community that opens on chat.
audience: user
category: guide
product_area: tuvima
status: early-access
---

**Chat channels** are live chat rooms for your members, beside your forums. Use forums for conversations worth keeping and channels for quick, everyday talk. [Chat channels](../guides/chat-channels.md) explains how members use them.

Channels are always for members only. Visitors never see them, even in a public community, and nothing from a channel shows on the Tuvima front page, the Home feed or search engines.

Owners and admins set up channels.

## The Chat channels add-on

Chat channels are one of Tuvima's built-in [add-ons](add-ons.md), and the add-on is **on** by default.

To switch it off, open **Manage**, then **Add-ons**, and untick **Chat channels**.

- Switching it off hides the **Chat** tab and every channel from everyone.
- **Nothing is deleted.** Switch it on again and the channels and their messages are back.

A community only shows the **Chat** tab once it has at least one channel a member can read.

## Three ways to start a community

When you [start a community](start-a-community.md), the **Forums** step asks **How will people talk?**

- **Forum community.** Lasting conversations in forums, with no channels to begin with. You can add chat at any time.
- **Chat community.** Tuvima sets up three starter channels, and the community **opens on chat**. You still get a forum for things worth keeping.
- **Both.** Forums on the home page, with the same three starter channels beside them.

The three starter channels are:

- **general**, for talking about anything;
- **introductions**, for new members to say hello;
- **announcements**, a read-only channel where only moderators and up can post.

You can rename, change or delete them afterwards.

### What "opens on chat" means

In a chat community, a member who opens the community's address lands on the **Chat** tab instead of the home page. The **Home** tab is still there and shows the home page as usual.

Visitors, and people who have not joined, always see the home page. They never see chat.

## Add a channel

1. Open **Manage**, then **Forums and categories**. The page is titled **Categories and forums**.
2. In the category you want, choose **Add a chat channel**, next to **Add a forum**.
3. Fill in:
   - **Name**, up to 50 characters. Each channel in a community needs its own name.
   - **What it is for** (optional), a short description shown under the channel's name.
   - **Category**.
   - **Who can post**: **Everyone who can read**, or **Only moderators and up**, which makes an announcements channel.
   - **Slow mode**, if you want it.
4. Choose **Add channel**.

A new channel can be read by every member who can open its category. A community can have up to 50 channels.

Each channel is listed under its category's forums with a **Chat channel** badge. Use **Up** and **Down** to change the order, **Edit** to open its settings, and **Delete** to remove it. These buttons only show while the Chat channels add-on is on.

People who can manage channels also see **Manage channels** at the top of the channel list in **Chat**.

## Channel settings

Choose **Edit** next to a channel. Each part of the page saves by itself.

### Name and purpose

Change the **Name**, **What it is for** and the **Category**. Moving a channel puts it last in its new category. Choose **Save**.

### Who can read and post

Choose **Who can see and post** to open the same choices a forum has; see [choose who can see and post in each area](area-access.md). Two things are different for a channel:

- A channel can never be opened to visitors. The widest choice is all members.
- A channel can only narrow what its category allows.

**Only some members** lets you pick who can read, or who can post, by level, role or member tier.

### Read-only channels

A read-only channel is one where only some members can post, for example **announcements**. Everyone else who can read it sees "Only moderators can post here" in place of the message box. They can still read and react.

### Slow mode

**Slow mode** sets how long each member waits between their own messages: 30 seconds, 1 minute, 5 minutes, 15 minutes or 1 hour. It keeps a busy channel readable. Members see a line under the message box telling them when they can write again.

### Clear old messages

By default a channel keeps its history: **Never: keep the history**. Under **Clear old messages** you can have messages cleared automatically **After 30 days**, **After 90 days** or **After a year**.

:::caution
Cleared messages are gone for good. When you switch clearing on, or choose a shorter time, every message already older than that is deleted within the hour, and nobody can bring it back. You tick a box to confirm before it is saved.
:::

After that, each message is deleted as it reaches that age. Forum conversations that members made from chat messages stay in their forums. Members can see in the channel's info that its messages are cleared.

## Delete a channel

Choose **Delete** next to the channel, or **Delete channel** at the bottom of its settings. Tick the box to confirm, then choose **Delete channel**.

:::caution
Deleting a channel deletes every message in it for good, along with any reports about those messages. This can't be undone. Forum conversations made from its messages stay in their forums.
:::

To hide chat without deleting anything, switch off the Chat channels add-on instead.

A category that still holds channels can't be deleted. Move or delete its channels first.

## Moderating chat

The rules you already have apply in chat: suspensions, bans, [newcomer limits and word filters](warnings-and-filters.md) all work as they do for posts. A newcomer's hourly limit counts chat messages and forum posts together.

- **Removing messages.** Moderators can open **Message options** on any message and choose **Remove message**. A line saying "This message was removed" stays in its place. The removal is written in your community's moderation log as "Removed a message in a chat channel", **without the message's text**.
- **Reports.** When a member reports a channel message, it goes to your community's moderators, with the message and up to 5 messages before and after it. A moderator only receives reports about channels they can read.
- **Keeping good chat.** Moderators can turn anyone's messages into a forum conversation with **Turn into a conversation**. Members can do the same with their own messages. Every writer is credited, and a link is left in the channel.
- **Moderator tag.** Messages from people who hold a moderation permission carry a **Moderator** tag.

## What to tell your members about privacy

- Channels are not end-to-end encrypted, the kind of protection where even the company running a service cannot read them.
- You and your moderators can read every channel you have access to. Unlike [private messages](../guides/messages.md), a channel is a shared room, not a private conversation.
- Like everything else stored on Tuvima, channel messages can be read by the Tuvima team.

## Next steps

- [Categories, forums and the front page](categories-and-forums.md)
- [Add-ons](add-ons.md)
- [Moderator tools](moderator-tools.md)
