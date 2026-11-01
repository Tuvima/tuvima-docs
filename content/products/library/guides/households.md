---
title: "Set up a household"
description: "Add people to a household, give them their own sign-in, use the profile picker, back up a phone's photos, and share photos to the Shared Library."
audience: administrator
category: guide
product_area: profiles
status: current
---

# Set up a household

A household is the group of people who live together and the sign-ins that open them. It holds up to eight people, and each person has a profile with their own progress, lists, favourites and private photo space. This guide shows how to set one up, and how to give someone their own sign-in.

## Before you start

- You need to be a server administrator or a household administrator. Both look after profiles from **Settings → Manage Profiles**, which only administrators see: choose **Edit** on a person's row to open their page. Server administrators also get **Add household** there, and **Settings → Users & Households → Households**, which lists every household and lets you rename or remove one.
- Users (sign-ins) are looked after only by the server administrator, in **Settings → Users & Households**.

## Add a person to the household

1. Open **Settings → Manage Profiles** and choose **Add profile** in the household's list (a server administrator picks the household by using the row in its group).
2. Enter a name. Switch on **Kid's profile** if this person is a child. A Kid's profile never has administrator access or Vault access, and a new profile starts with nothing hidden.
3. Optionally set a **PIN**. Anyone who switches into that profile is asked for it. Use 4 to 12 digits. You can change it later from the person's **Profile details**.
4. Save. The person appears in the list. They can use the profile straight away by switching to it, and they do not need a sign-in of their own. A household holds up to eight people; at eight, Tuvima shows the Engine's sentence instead of adding a ninth.

Adult profiles should have a PIN if others can reach the household's sign-in. Tuvima reminds you about this but does not force it.

## Someone's sign-in

A sign-in (an email with a password, a passkey or two-step codes) is only a way in to a person's profile; the person, their access and their roles live in the profile. A profile can have one sign-in, or none: a person without one is opened by signing in as someone else in the household and switching to them.

Only the server administrator adds, changes and removes sign-ins, in **Settings → Users & Households**. A person's **Sign-in** row on their profile page shows their email (or *No sign-in*) and, for a server administrator, links there. Changing a sign-in's email keeps the profile and everything in it. Deleting a sign-in keeps the profile too; a new sign-in can be attached to it later.

Signing in opens the person's own profile, and from there they can switch to any other profile of their household (a profile with a PIN asks for it), never into another household.

## Change what someone can open

A person's access belongs to their profile, and it is set in one place: their page. Under **Access**, each area (Watch, Listen, Read and View) is a switch. Under an area that is on, its libraries are listed with a tick each and an **All libraries** tick; untick a library to take it away from that person. An area with one library shows no list. Press **Save changes** to apply everything at once, or **Discard** to put it back (the list is read-only on phones). A library the household cannot use is greyed with "Not available to {household}". Every library in an area a person has is visible to them, including libraries added later, until you untick it. The Vault is a separate area with its own access and is never in this list.

A household administrator can change only people in their own household, only within what the household can use, and never above what their own profile holds. A server administrator's profile can open everything. See [Who sees a library](library-settings.md#who-sees-a-library).

## Choose which libraries a household can use

Only the server administrator sees this. On **Settings → Users & Households → Households**, each household has **Libraries this household can use**: every library is ticked by default, and you press **Save changes** after unticking. A household can restrict its people only from the libraries it already has: a household administrator can untick more for the household's profiles but can never show a library the household lacks. A new library appears for every household, and the Vault is never listed here.

## Set what Kids can see

A Kid's profile is simply a switch on the person's page. What every Kid's profile can see is one setting on the household, under **What Kids can see** in the household's group on **Settings → Manage Profiles** (administrators only). Choose a maximum level for each of **Watch**, **Read** and **Listen**: G, PG, PG-13 or R, each described by what it shows (the default is PG for all three). One **Show unrated items** switch, on by default, decides whether items with no rating (home videos, most books and music) are shown to Kids. Changing these updates every Kid's profile in the household at once. Explicit and adult content counts as adult-rated. The levels guide what Kids see on the home page and in lists; parents still supervise, and a profile PIN stops a child switching into an adult profile.

## Roles on a profile

The **Roles** group on a profile page has a **Household administrator** switch. A household administrator looks after the people of their household and what those people can open. The switch is greyed out, with the reason beside it, when the person has no sign-in (a household administrator always has one), is a Kid's profile, or is the household's last household administrator (a household always keeps one). A server administrator also sees a **Server administrator** switch for people in the Library's own household. A household administrator cannot change a server administrator's profile.

## The administrator PIN

If a profile that holds an administrator role has a PIN, turn on **Ask for a PIN to open administrator settings** in the **Administrator PIN** group on its page. The setting is on the profile, so it follows the person wherever they sign in. You can change it on your own profile; a server administrator can change it on anyone's.

## Someone from outside your household

A server administrator can add someone who is not part of an existing household. Choose **Add a sign-in** under **Users & Households → Users**, then **A new person**, set their household to **A new household** and give it a name. They start a household of their own and look after it. Once they are in, give them only what they need on their profile under **Settings → Manage Profiles**.

## The profile picker

Signing in shows your household's profiles as a row of large round pictures with the name underneath (many people wrap onto further centred rows), and nothing opens until you click a person. Your own profile only gets keyboard focus, so Enter opens it. The people appear in the order the household set. Open the picker again from the account menu's **Who's watching?** to switch to another profile of your household, or use the menu's list, which shows the other people first. Choose a person to open their profile; any profile can switch to any other unless it has a PIN. A profile with a PIN opens a number pad: tap the digits (or type them on a keyboard or remote), then choose **Continue** on the pad. The dots shake if the PIN is wrong, and too many wrong tries pause further attempts for a minute.


## Phone backup

A paired phone backs up its photos to one profile. Open **Settings → Security & Devices → Devices**, find the phone in **Paired devices**, and choose a person in its **Whose photos … backs up** list. Only people in the phone's household are offered, and **Not chosen** turns backup off for that phone. The choice does not need a PIN. Photos go to that person's private photo space, and the phone keeps backing up to that profile even when someone else browses on it.

## Shared Library

Each household has one **Shared Library** for photos everyone in the house should see.

- Everyone in a household can open each other's photo space, read only, from the **Household** group in the View scope picker.
- To share a photo, submit it from your photo space to the Shared Library. Nothing is shared until you submit it.
- A household administrator reviews submissions. They can accept or decline each item, and accepted items appear in the household's Shared Library.
- Each household has its own Shared Library. People in one household cannot see another household's Shared Library.

Your private photo space stays private until you choose to submit something.

## Delete a profile

On a person's page choose **Delete profile**. Tuvima lists what goes with it (progress, bookmarks, lists and history), tells you that their sign-in is removed too, and asks what to do with their personal photos: **Move to Shared** (the default) or **Delete**. (Deleting the last sign-in that can look after a household removes the whole household with all of its photos and videos instead, and says so first.) Library files are never touched. You cannot delete the profile you are using, a household's last household administrator, or (as a household administrator) a server administrator's profile.

## What a household administrator can and cannot do

A household administrator can add and remove people in their own household, set their PINs, choose what they can open and make another person with a sign-in a household administrator, all from each person's page under **Settings → Manage Profiles**. They cannot add, change or delete users (sign-ins); the server administrator does that in **Users and Sign-in**. The Households list and the rest of **Settings → Users & Households** stay with a server administrator.

They cannot change another household or a server administrator's profile, and only a server administrator makes someone a server administrator.

## Adding a second household

With one household the Library can be used without passwords. Before you add another household, set an email and password (or a passkey) for your own sign-in: **Settings → Users & Households → Households → Add household** tells you so and has a **Set an email and password** button that opens Security.

## Next steps

- [Manage sign-in methods, passwords and recovery](account-security.md).
- [Set up secure remote access](remote-access.md) before you let people outside the home connect.
- [Configure an external sign-in provider](external-authentication.md).
