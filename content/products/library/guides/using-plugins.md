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

**The tabs** are named for when the Library uses a plugin: **Getting items in** (sources that find and match your files, such as TMDB and MusicBrainz), **After import** (things done once an item is in, such as artwork, subtitles, skip markers and Local AI helpers) and **Accounts & lists** (services you sign in to, such as Trakt, and list sources).

**The filters** are tick-box menus, and you can tick several at once. **Status** offers On, Off, Needs a key, Missing tools, Waiting for Local AI and Broken. **Show** offers Official, Private and AI enabled.

**A tile** says five things: the logo with a small coloured dot (green is working, amber needs something from you, red is broken, grey is off or always on; hover or focus the dot for the sentence), the name and the switch, one **Provides** line (what the plugin gives the Library, such as Identification, Artwork or Lyrics), a short description and one button. When the dot is amber or red the button is the fix ("Add a key", "Set up Local AI", "Fix tools"); otherwise it is **Configure**. Official plugins carry no badge; only a Private upload stands out, with a dashed edge. A plugin that runs on Local AI has a purple sparkle logo and stays locked off, with a **Set up Local AI** button, until Local AI is ready.

## Upload a plugin

Press **Upload plugin** (desktop only, administrators only) and choose a zip file. The dialog warns "Only upload plugins you trust. A plugin can read and change your library." Only JSON-only plugins can be uploaded: the zip may hold `plugin.json` plus plain notes (`.md`, `.txt`) and pictures (`.png`), and nothing that could run code. The Library checks the file is really what its name says, reads `plugin.json` strictly (a repeated or capitalised field name is refused), and refuses a plugin whose id is already installed. An uploaded plugin is **Private** and arrives switched **off**; switching it on shows the usual approval step. Every upload, accepted or refused, is written to the activity log. Plugins that run code still need a signature and cannot be uploaded.

Official plugins ship as part of Tuvima. You can switch them off, but cannot remove them or edit their files. Dynamic plugins have their own folder and manifest.

## What a plugin's page and the approval step tell you

Open a tile with its button to reach the plugin's own page. It is one short column: the logo with its dot, the name, one status sentence and the switch, then two tabs, **Set up** (the default) and **Activity**, which have their own addresses. **Set up** shows at most five cards, in this order, and leaves out any with nothing to say: **Access** (keys and sign-in), **What it provides**, **Settings**, **Privacy**, **About**. A metadata source uses the same **Access** card as first-run setup, with the same words (**Connect**, **Replace key**, **Test connection**, **Remove key**). **Activity** shows what ran, when, and **Check now**.

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
9. In **Plugin details**, choose the plugin and run **Health & Jobs > Check health** before relying on its scheduled work.

## Change settings

Open the plugin's tile, then use the **Settings** card on its **Set up** tab for on/off, number and text values, who can use it and which libraries it works on. Use **Check now** on the **Activity** tab after changing tool paths, AI settings or job settings.

If a plugin needs a tool such as FFmpeg, its health check tells you how that tool was found. It may use `PATH`, a cached copy, or a path you set. If none works, the check reports that failure.

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
- [Build a plugin](building-a-plugin.md)
- [Understand privacy and external services](../explanation/privacy-local-first.md)
