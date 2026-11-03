---
title: "Use Plugins"
description: "How administrators discover, install, enable, configure, and remove Tuvima Library plugins."
audience: "administrator"
category: "guide"
product_area: "plugins"
tags:
  - "plugins"
  - "settings"
  - "admin"
status: current
---

# Use Plugins

Add optional tools to Tuvima Library with [plugins](../reference/glossary.md#plugin). Allow a few minutes for setup, plus time to get and check the files. Only admins can manage plugins. For how plugins fit with Local AI, Integrations and the approval rule, see [Developer Tools](developer-tools.md).

You can list built-in and dynamic plugins, enable or disable them, edit settings, check health, and view recent jobs. **Available plugins** shows a public list of plugins from GitHub. One-click install and update flows are not ready.

## Open plugin settings

Open **Settings > Plugins**. It is one page: the **Upload plugin** button, a summary strip (how many plugins are installed, switched on and need attention), a search box, two tick-box filters, three tabs and a grid of tiles. A **Cards / List** switch beside the filters changes the layout; the Library remembers your choice on this browser. **Available plugins** follow below. On a phone the page is read-only.

**The tabs** are named for when the Library uses a plugin: **Getting items in** (sources that find and match your files, such as TMDB and MusicBrainz), **After import** (things done once an item is in, such as artwork, subtitles, skip markers and Local AI helpers) and **Accounts & lists** (services you sign in to, such as Trakt, and list sources). The **All** tab shows the same three groups one after another, each with a one-line explainer, a count and a health summary, and a plugin appears once. Grouping by when a plugin runs, rather than by what it is, answers the question you usually have: where in the journey of a file does this act? (These screens are Early Access.)

**The filters** are tick-box menus, and you can tick several at once. **Status** offers On, Off, Needs a key, Missing tools, Waiting for Local AI and Broken. **Show** offers Official, Private and AI enabled.

**A tile** shows the logo, the name and the switch, one **What it provides** line of small coloured icons (Identification, Artwork, Lyrics and so on) and a short description. Its footer is the same on every tile: a **health tick** at the bottom left and a **gear** at the bottom right. The tick is a fixed 22 px round mark that never moves between tiles: green with a tick is working, amber with an exclamation mark needs something from you, red with a cross is broken, grey with a dash is off. Hover or focus it for the sentence, such as "Working, checked 4 minutes ago". It never relies on colour alone. The gear is on every tile and always opens the plugin's page; when something needs you it turns amber, and the page opens with the card that needs attention open and highlighted. A **Key missing** pill appears beside the tick only when a key is missing. There are no "Configure", "Add a key" or "Fix tools" text buttons: one control that is always in the same place is easier to find than a button whose words change. Official plugins carry no badge; only a Private upload stands out, with a dashed edge. A plugin that runs on Local AI has a purple sparkle logo and stays locked off until Local AI is ready; its tick says it is waiting. In the list view, Health and Settings are two narrow fixed columns at the right.

## Upload a plugin

Press **Upload plugin** (desktop only, administrators only) and choose a zip file. The dialog warns "Only upload plugins you trust. A plugin can read and change your library." Only JSON-only plugins can be uploaded: the zip may hold `plugin.json` plus plain notes (`.md`, `.txt`) and pictures (`.png`), and nothing that could run code. The Library checks the file is really what its name says, reads `plugin.json` strictly (a repeated or capitalised field name is refused), and refuses a plugin whose id is already installed. An uploaded plugin is **Private** and arrives switched **off**; switching it on shows the usual approval step. Every upload, accepted or refused, is written to the activity log. Plugins that run code still need a signature and cannot be uploaded.

Official plugins ship as part of Tuvima. You can switch them off, but cannot remove them. An administrator on a computer can edit their files from the [Plugin file card](#the-plugin-file-card), and put Tuvima's version back. Dynamic plugins have their own folder and manifest.

## What a plugin's page and the approval step tell you

Open a tile's gear to reach the plugin's own page. It is one short column: the logo with its tick, the name, one status sentence and the switch, then two tabs, **Set up** (the default) and **Activity**, which have their own addresses. Every plugin page is drawn from the plugin's own JSON by one page builder, so Trakt, TMDB, StashDB and a Private plugin you wrote yourself look and behave alike, and none has a screen of its own. A plugin supplies content, never layout, so no plugin can make a page that hides something. To see how a plugin describes its settings, read [Writing a plugin's settings](writing-a-plugins-settings.md).

**Set up** shows these cards in this order and leaves out any with nothing to say: **Access** (keys, sign-in and links), **What it provides**, **Settings**, **Privacy**, **About**, and last the [Plugin file](#the-plugin-file-card) card. A metadata source uses the same **Access** card as first-run setup, with the same words (**Connect**, **Replace key**, **Test connection**, **Remove key**). A test button appears only if the plugin declares that test.

**What it provides** is a set of small coloured cards, one for each thing the plugin gives the Library: Identification, Details, Artwork, People, Series order, Lyrics, Subtitles, Skip markers, Insights, Lists & ratings and Account sync. Each kind always has the same icon and colour, a plain sentence about what it means (written once by the Library, not by each plugin, so the wording is the same everywhere) and chips for the media types it covers. Under the cards, a line says where the plugin is used, with a link to Ingestion Flow.

**Activity** is the plugin's slice of the standard activity timeline: failures first, routine successes collapsed. **Check now** is part of **Test connection**. The tab is always shown; with nothing to report it says "Nothing has gone wrong." Each plugin keeps a limited log (by default 200 entries or 14 days, whichever comes first), so a noisy plugin cannot fill the data store.

On the **Privacy** card, **Allowed to** lists what it may do, and **Sends data out** says **No** or **Yes, to** followed by the hosts it contacts. For a plugin that connects to the internet, the list has one line per place, such as "Contacts www.wikidata.org: Wikidata item IDs of Universes already in your Library". The same lines appear in the confirmation you see before switching a plugin on. If a plugin later changes where it connects, it stops running and asks again.

A link of the form `/settings/plugins?plugin=<plugin id>` opens this page at that plugin's card, highlighted, with its settings open. If no installed plugin has that id, the page opens as usual.

## Find an available plugin

**Available plugins** is a list of plugins other people have shared. It is a list, not an installer.

- The Library keeps a saved copy of the list and shows that. It checks GitHub when you open the section and the last check is more than a day old, and when you choose **Check now**. It never checks in the background. Nothing about you or your Library is sent.
- The section says when the list was last checked. If GitHub could not be reached it keeps showing the saved copy and says which date it is from.
- The switch at the top turns the lookup off. With it off, no request is made; the saved copy, if there is one, is still shown.
- Each entry has a label. **Official** plugins are built by Tuvima. **Verified** plugins have been checked by Tuvima. **Not verified** plugins have not been checked, and say so beside the entry: "Tuvima hasn't checked this plugin. Only install plugins from people you trust."
- A quiet line, "N new plugins available", appears when plugins have been added since you last looked.
- An **Install** button appears on an entry only once the Library can install plugins; until then it is not shown. When it appears it opens the same confirmation as switching a plugin on, listing what the plugin can do and whether it sends data out.

## Install an available plugin by hand

Until installing is built in, install a plugin from its release page.

1. Open **Settings > Plugins** and scroll to **Available plugins**.
2. Choose **Check now** if the list looks out of date.
3. Open the plugin's **Release** link.
4. Download the versioned archive.
5. Check its published SHA-256 checksum when one is supplied.
6. Extract it into the library data folder:

```text
{library_root}/.data/plugins/{plugin-folder}/
```

The folder must contain `plugin.json` beside the assembly named in that file.

7. Restart the Engine to load the new assembly.
8. Enable the plugin in **Settings > Plugins**.
9. Open the plugin's page and use **Check now** before relying on its scheduled work.

## Change settings

Open the plugin's gear, then use the **Settings** card on its **Set up** tab. The controls come from the plugin's own description: switches, labelled choices, numbers with units, text, addresses, paths, keys and repeating lists such as StashDB's servers. Settings the plugin marks **Advanced** sit in a collapsed section, a setting that only matters in some cases appears only then, and a setting that needs a tool, Local AI or a key is greyed with the reason. Some settings are per person, such as a ListenBrainz token: each person sets their own, because their listens are theirs and not the household's. Nothing is saved until you press **Save changes**, which shows **Review changes** first. Use **Test connection** or **Check now** after changing tool paths, AI settings or job settings.

If a plugin needs a tool such as FFmpeg, its health check tells you how that tool was found. It may use `PATH`, a cached copy, or a path you set. If none works, the check reports that failure.

## The Plugin file card

A plugin that is defined by a file (a metadata source's file under `config/providers`, a JSON-only plugin or a Private upload) shows a **Plugin file** card at the bottom of its page. A plugin written in .NET is described by a small JSON file that ships beside it, so it has the card too, read-only. The card lets you see exactly what a plugin is, and fix a file without leaving Library. It is Early Access.

The card shows the file name, **Valid** or the number of problems, whether the file **differs from Tuvima's version**, and two buttons.

- **View file** opens the file in place, read-only, coloured and with line numbers.
- **Edit file** turns the card into an editor. Editing is for administrators on a computer with a mouse or trackpad, the same rule as editing items. On a phone or tablet the card shows the file name and state and says "Editing is available on a computer". The Engine still checks permission on every save, so the rule is not only in the buttons.

**Checks run as you type.** Each problem names its line and says in plain words what is wrong, such as a number outside its range. Findings that are only worth knowing, such as a longer cache time, are listed as things to know and do not stop you. Words Library does not recognise are listed there too.

**Save changes stays off until the file is valid.** A file that fails the checks could leave the plugin unable to load, so Library will not write it. Pressing **Save changes** first shows **Review changes**: what differs from the saved file, line by line. After you confirm, the Engine reloads the plugin and runs its check. If that check fails, the page says so and offers **Reset**.

**Reset to Tuvima's version** puts back the copy that ships with Library. Library keeps a pristine copy of each shipped file in its install folder, apart from the one you edit, so Reset (and Restore, below) never depends on the internet.

**Locked fields** cannot be changed in the editor: the plugin's id and kind, a source's provider id, its network hosts and its permissions. These decide what a plugin may reach and do, and you approve them when you switch a plugin on. Changing them from a text editor would let an edit quietly widen where your data goes, so a change to one of them goes through the approval step instead.

Keys and settings values are stored apart from the file, so editing or resetting a file never loses them. If you remove a setting from the file, its saved value is kept quietly in case the setting comes back.

## Restore official plugins

If an official plugin's file goes missing or cannot be read, the Engine already puts it back quietly when it starts. **Restore official plugins** is the visible version: a quiet row in Settings, for administrators only, and not on the Plugins page itself. It opens a short dialog listing each official plugin file that is missing, damaged or edited, marked "will be restored" or "will be reset", and how many already match. Confirming restores them from the shipped copies.

It never touches your keys, switches, settings values or Private plugins. The row is quiet because you should rarely need it. It is there for when you edited something and want to start again, or want to see what a repair would do before it happens. When nothing differs, the dialog says "All official plugins match."

## Remove a plugin

Official plugins can only be switched off. A private upload shows a quiet **Remove** link at the bottom of the **About** card; it opens a preview of what goes (its files, settings and schedule), what it saved that can stay or go, and anything else that depends on it, before you confirm.

A source's file under `config/providers` that goes missing or cannot be read is put back quietly when the Engine starts, with a single log line; your keys and choices are kept, because they are stored elsewhere. The integration the Tuvima apps use can be switched off or have its keys revoked, but never deleted.

## When no source can identify your files

Movies and TV Shows are matched by TMDB or TheTVDB, and Comics by Comic Vine. While none of the sources a kind accepts is switched on with its key, new files in that kind's folders are held: **Create library** says "Nothing can identify films yet. Connect TMDB or TheTVDB first." with a **Connect a source** button, and the folder shows **Waiting for a source** on the Libraries page. Nothing is added as an unidentified item. As soon as a source works, the next folder check adds the files by itself; there is nothing to restart. Music, Books, Audiobooks, Photos and Videos are never held.

## Choose trusted code

A plugin is compiled .NET code loaded into the Engine process. It is not sandboxed. Install only code from a source you trust. Available plugins helps you find plugins, and the label shows whether Tuvima has checked one, but it does not remove all risks from outside code.

<details>
<summary>Technical details</summary>

A manifest should name the plugin ID, name, version, entry assembly, and entry type. It should state its features and needed rights, such as `media.read`, `process.execute`, or `tool.download`.

It should also list required tools and checksums when tool downloads are supported. If it calls local AI, it must declare those rights too.

</details>

## Next steps

- [Read the plugin directory format](../reference/plugin-catalog.md)
- [Write a plugin's settings](writing-a-plugins-settings.md)
- [Build a plugin](building-a-plugin.md)
- [Understand privacy and external services](../explanation/privacy-local-first.md)
