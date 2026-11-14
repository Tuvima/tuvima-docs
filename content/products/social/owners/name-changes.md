---
title: Name changes
description: Approve or decline private persona rename requests, change an unsuitable name straight away, hide an offensive name with a follow-up, and see what members are shown.
audience: user
category: guide
product_area: tuvima
status: early-access
---

Members who use a **private persona** in your community can't change their name on their own. They ask the admins, and an admin decides. You can also change a name yourself, or hide a name that is offensive. This page covers all of it. Members' side: [Change your name in a community](../guides/community-pages.md#change-your-name-in-a-community).

A member's **global persona** is different. Its name is the same across Tuvima, so it is changed in their Tuvima profile, not here. See [global personas](#global-personas).

## Who can do this

Approving, declining and changing names needs the **Approve and change member names** permission. Admins have it to begin with, and you can give it to other roles. See [Roles](roles.md#approve-and-change-member-names). Marking a name as offensive also needs **Suspend and ban**, because it comes with a follow-up such as a mute or a ban.

You can't act on yourself, or on anyone whose role is as high as yours or higher.

## Name requests

Open **Manage**, then **Name changes**. The page lists requests that are waiting, oldest first, with:

- **Now**: the member's name today,
- **Wants**: the handle they asked for, and a display name if they added one,
- **Reason**: what they wrote, if anything,
- **Asked**: when.

A member can have one request waiting at a time, and nothing is reserved or shown to anyone until you decide.

Choose **Approve** to rename them. It is the same persona: their posts, level, achievements and followers stay. If someone else has taken the name in the meantime, the rename does not go through and the request stays on the list.

Choose **Decline** to turn it down. You can add a note, and the member is told with the note. They can ask again.

You can't decide your own request. The row says so, and another admin decides it. A member is told when their request is approved or declined.

After a rename, members see what the [name history setting](leaving-and-coming-back.md#name-history) says. By default the old name shows as "formerly @old" next to the new name for 90 days, and a **Name changed recently** label may sit on their posts.

## Change a name now

Use this for a name that is unsuitable but not worth a ban.

1. Open the member's side panel (**Members**, then **Details**) or their member page.
2. In **Unsuitable name**, choose **Change the name now**.
3. Tuvima suggests a neutral name: `member_` followed by four digits, for example `member_4821`. You can edit it.
4. Choose **Apply**.

What changes:

- The handle is replaced at once. Their display name is cleared.
- Their posts, level and achievements stay.
- Members are **not** shown "formerly". It would show the unsuitable name again. The **Name changed recently** label follows your setting.
- The old name stays in the [moderation record](moderator-tools.md#name-entries-in-the-moderation-record), which only staff can read.
- The member is told an admin changed their name. They can still ask for a different name afterwards.

## Mark a name as offensive

Use this when the name should not stay in front of members while you decide what else to do.

1. Open the member's side panel or page, and find **Unsuitable name**.
2. Choose **Mark as offensive**. The name is hidden from members everywhere.
3. Under **Then**, choose what else happens. You must pick one:
   - **Mute for 7 days**: they can read but not post. It is a 7-day suspension.
   - **Suspend**: they can read, but can't post, reply or react until it ends. You choose how long.
   - **Ban**: they are removed for good.
   - **Warn only**: a warning, and nothing else. You fill in the warning as usual.
4. Choose **Apply**.

Mute, Suspend, Ban and Warn follow the same rules as everywhere else: they need the **Suspend and ban** permission, and they count in the record like any other. See [warnings](warnings-and-filters.md#warnings).

### Who sees a hidden name

- **The member** sees their own name, with a **Name hidden** label.
- **Staff who can rename or suspend** see the real name in the member's side panel, the members list, the name requests list, the moderation record and the mention picker, with the same label.
- **Everyone else** sees **Name hidden**. On posts, in lists and in alerts, the name is a blurred bar, with no text to copy or read out. The member's page in the community is not found for them.

The real name is not sent to other people's browsers at all. This is deliberate: a blur on top of real text could be undone.

### Show the name again

If you hid a name by mistake, or you have thought again, choose **Show the name again** in **Unsuitable name**. The name returns for everyone.

Any rename also clears the mark: an approved request, or **Change the name now**.

### What the member can do

The member gets an alert that an admin hid their name, with a link to **Change my name here**. They can ask for a new name even while the name is hidden. When you approve it, the name is shown again.

A persona with a hidden name can't [switch](../guides/switch-persona.md) between private and global until it has been renamed or shown again.

## Global personas

For a global persona, **Unsuitable name** only explains that the name is used across Tuvima and can't be changed here. There is no **Change the name now** or **Mark as offensive**. Use **Warn**, **Suspend** or **Ban** from the same panel. Global renames work as before, in the member's Tuvima profile.

## Next steps

- [Look after members](members.md#unsuitable-names)
- [Leaving and coming back](leaving-and-coming-back.md)
- [Roles](roles.md)
