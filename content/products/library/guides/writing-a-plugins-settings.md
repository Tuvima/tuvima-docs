---
title: "Writing a plugin's settings"
description: "Every word a plugin can use in its settings_schema to describe its settings, credentials, links and tests, and the screen each one makes in Settings."
audience: "developer"
category: "guide"
product_area: "plugins"
tags:
  - "plugins"
  - "settings"
  - "json"
status: early-access
---

# Writing a plugin's settings

You describe a plugin's settings once, in JSON, and Library draws the same page for it as for every other plugin. You write no screen code, and Library has no screen written for any one plugin. This guide lists every word you can use, with a short example and the screen it makes. This is Early Access: the vocabulary is fixed by a published schema, but installing plugins from outside Tuvima is not open yet, so today the main users are the official plugins and Private plugins you write for yourself.

## Why a plugin supplies content, never layout

A plugin tells Library what its settings are (a name, a kind of control, a range). Library decides how they look. This is deliberate:

- **Every plugin page behaves the same.** Once you have used one plugin's page, you know them all, on a computer, tablet or phone.
- **A plugin cannot disguise anything.** It cannot draw its own button that looks like an approval, or bury where it sends data. The Privacy card comes from the destinations the plugin declared, not from text it lays out.
- **The page keeps working when Library changes.** Colours, spacing and dark mode are Library's job, so a plugin written today still looks right after a redesign.

The page is built from the plugin's own JSON: the **Access** card from its declared credentials and links, **What it provides** from its capabilities, **Settings** from the words in this guide, **Privacy** from its declared network destinations, **About** from its description, and the [Plugin file card](using-plugins.md#the-plugin-file-card) last. A card the plugin has nothing for is left out.

## Where the words go

Settings live in the plugin's `settings_schema`: in `plugin.json` for a plugin, or in the provider source file under `config/providers/` for a metadata source. Both formats are read the same way. A published schema, `plugin-settings.schema.json`, lists every word below, and the Plugin file card checks your file against it.

```json
{
  "settings_schema": {
    "type": "object",
    "title": "Example channels",
    "properties": {
      "refresh_hours": { "control": "number", "title": "Refresh every", "unit": "hours", "minimum": 1, "maximum": 24, "default": 6 }
    },
    "actions": ["check_now"]
  }
}
```

Every word except the setting's own name is optional and has a plain default. Settings written before these words existed (a bare `type`, `enum`, `minimum`) keep working unchanged.

## Control types

`control` says what kind of control the setting gets. If you leave it out, Library infers one so older plugins need no change: a boolean becomes a toggle, an `enum` or `choices` becomes a choice, an integer or number becomes a number, `format: "uri"` a URL, `format: "path"` a path, `format: "secret"` a secret, an array with choices a list of choices, a setting with `fields` a group list, and anything else text.

### toggle

A switch for on or off.

```json
"skip_intros": { "control": "toggle", "title": "Skip intros", "default": true }
```

Makes a switch with the title beside it and the description under it.

### choice

One option from a short list, with readable labels. Use `choices` (a value and a label each) or `enum` with `enum_labels`.

```json
"language_strategy": {
  "control": "choice",
  "title": "Language",
  "choices": [
    { "value": "source", "label": "Source" },
    { "value": "localized", "label": "Localized" },
    { "value": "both", "label": "Both" }
  ],
  "default": "localized"
}
```

Makes a menu showing the labels. The saved value is the `value`, so you can reword a label later without breaking anyone's saved choice.

### number

A whole or decimal number. Add `unit`, `minimum` and `maximum`. When the range is small, Library draws a slider; otherwise a number box.

```json
"timeout_seconds": { "control": "number", "title": "Wait for a reply", "unit": "seconds", "minimum": 5, "maximum": 120, "default": 30 }
```

Makes a number box (or slider) with "seconds" beside it. A value outside the range is refused when the person saves.

### text

A line of text.

```json
"label": { "control": "text", "title": "Name shown in lists", "placeholder": "My channels" }
```

### url

A web address. Library checks it looks like one before saving.

```json
"list_address": { "control": "url", "title": "List address", "placeholder": "https://lists.example.com/a.m3u" }
```

### path

A folder or file on the computer that runs the Engine.

```json
"comskip_path": { "control": "path", "title": "Comskip program", "format": "file-path" }
```

Use `format: "directory"` for a folder and `"file-path"` for a file.

### secret

A key or token. A secret is never shown back: the page says only whether one is set, and offers Replace and Remove. A household secret is stored apart from the plugin's file.

```json
"api_token": { "control": "secret", "title": "Access token", "scope": "profile" }
```

### list of choices

Several options ticked from a list. Use `control: "choices"` with `choices`.

```json
"mood_words": {
  "control": "choices",
  "title": "Mood words",
  "choices": ["calm", "tense", "playful"]
}
```

A choice may be a plain value or an object with `value` and `label`. Makes a set of tick boxes.

### group list

A repeating group: a list the person can add to, each item having the same fields. Describe one item with `fields`, using the same words as any setting. The extra words are under [Group lists](#group-lists).

## Wording

- **`title`** is the setting's name on the page. If you leave it out, Library makes one from the key (`request_delay_ms` becomes "Request delay ms"), so always write one.
- **`description`** is the help text under the control. Say what changing it does.
- **`placeholder`** is the grey example inside an empty text, URL or path box.
- **`unit`** is the word beside a number, such as seconds, ms or hours.
- **`group`** is a heading inside the Settings card. Settings with the same `group` sit together under it.
- **`order`** is a whole number that sets the position. Without it, the order of your file is kept.

```json
"throttle_ms": { "control": "number", "title": "Minimum gap between requests", "unit": "ms", "group": "Connection", "order": 20 }
```

## Behaviour

**`advanced`** (true or false) moves the setting into the collapsed **Advanced** section, so everyday settings stay short. Put tunables there that most people never change.

**`read_only`** (true or false) shows the value but does not let anyone change it. Use it for a fact the person should be able to see but not alter, such as a source's weight.

**`show_when`** shows the setting only while another setting has a given value, so the page does not fill up with options that cannot matter yet.

```json
"ffmpeg_fallback": { "control": "toggle", "title": "Use FFmpeg instead", "show_when": { "setting": "use_comskip", "equals": false } }
```

**`requires`** says the setting needs a `tool`, `local_ai` or a `key`. Until it is there, the control is greyed and your `reason` is shown beside it, so the person learns what to do rather than meeting a control that silently does nothing.

```json
"scene_detection": { "control": "toggle", "title": "Detect scenes", "requires": { "kind": "tool", "name": "ffmpeg", "reason": "Needs FFmpeg to read the video." } }
```

## Scope: household or profile

`scope` says whose setting it is.

- **`household`** (the default) is one value for everyone using this Library.
- **`profile`** means each person sets their own. A ListenBrainz token is the usual example: your listens are yours, not your household's.

```json
"listenbrainz_token": { "control": "secret", "title": "ListenBrainz token", "scope": "profile" }
```

A per-person secret is entered by each person for themselves. The administrator's plugin page does not show or reveal it.

## Group lists

A group list adds these words:

- **`item_title`** is what one item is called, such as "Server".
- **`add_label`** is the words on the Add button, such as "Add a server".
- **`locked`** is a list of item ids that cannot be removed. StashDB uses it so its default server stays.
- **`row_actions`** are the buttons each row gets, chosen from a fixed list: `test_connection`, `remove`, `check_now` and `open_link`.
- **`fields`** says what one item looks like; each field uses the words in this guide.
- **`value_source`** names an Engine-side list that holds the current items, for values kept in the data store rather than in the plugin's own saved settings. It is used by official plugins; a Private plugin keeps its items in its own settings.

```json
"servers": {
  "control": "group_list",
  "title": "Servers",
  "item_title": "Server",
  "add_label": "Add a server",
  "locked": ["stashdb"],
  "row_actions": ["test_connection", "remove"],
  "fields": {
    "name": { "control": "text", "title": "Name" },
    "address": { "control": "url", "title": "Address" },
    "key": { "control": "secret", "title": "Key" }
  }
}
```

This makes a list. Each row shows its title and state ("Key missing" when its key is not there) and its buttons, with the Add button below. A locked row has no Remove.

Locked items exist because some entries are what the plugin is for. A server list with no default would leave a fresh install with nothing to try, and removing the default would only create a support problem.

## Declared tests

`actions` lists the tests the plugin supports. The Engine runs them and the page shows the standard button and result.

| Word | Button | What it does |
|---|---|---|
| `test_connection` | Test connection | Tries the plugin's address and key. |
| `check_now` | Check now | Runs the plugin's own health check at once. |
| `dry_run` | Dry run | Does the plugin's work without keeping anything. |

Write a bare word, or an object to rename the button:

```json
"actions": ["test_connection", { "kind": "check_now", "label": "Check the list" }]
```

A plugin that declares none shows none. A button that cannot do anything is worse than no button, so Library never invents one for a plugin. A source file that has an authentication probe is treated as supporting `test_connection`, and any other non-core source as supporting `check_now`.

## Credentials, links and privacy

Keys are described once, whichever format the plugin uses. A manifest lists them under `secrets`, and a source file under `onboarding.credentials`. Library reads both into one credentials list, which the **Access** card shows. Each credential can carry:

- a name and label, and help text saying where to find it;
- a minimum and maximum length, so a pasted-in mistake is caught early (a pattern, if you set one, is checked by the Engine but never sent to the Dashboard);
- whether it is for the household or for each person (`scope`);
- the sign-in method, if the credential comes from signing in rather than pasting.

Four links feed the Access and Privacy cards. In a source file they sit under `onboarding`; in a manifest they sit under `links`:

```json
"links": {
  "signup_url": "https://example.com/signup",
  "help_url": "https://example.com/help/api",
  "terms_url": "https://example.com/terms",
  "privacy_url": "https://example.com/privacy"
}
```

`signup_url` becomes the way to get a key, `help_url` the help link, and `terms_url` and `privacy_url` the Terms and Privacy buttons. The Privacy card also lists every host the plugin declared under `network`, with what it sends to each one. A source file has no per-host sentence, so Library writes one plain default (what it is asked about, and "and your key" when it needs one). A key is sent only to the host it was set up for.

## What happens to words Library does not know

A word that is not in the published schema is **ignored**, never an error. The page still draws, and the Plugin file card lists each such word under **Things to know**, with where it is, so you can tell a typo from an intentional extra. The same goes for an unknown control type, row action or action kind, and for a `show_when` or `requires` that is malformed.

The reason is that plugins outlive Library versions. A plugin written for a newer Library should still open on an older one, and a typo in one hint should not take a plugin's whole settings page away. A setting that is saved but has no entry in `settings_schema` is not drawn either; it is reported the same way. Words that could change what a plugin is allowed to do, such as network hosts and permissions, are not part of this vocabulary at all.

## Why checks run before saving

When an administrator edits a plugin's file in Settings, the checks run as they type, and **Save changes** stays off until the file is valid. A plugin file is read when the Engine loads it, so a broken file would otherwise show up later as a plugin that fails with nobody looking. The checks have two layers: the structure (the published schemas) and Library's own rules (the same host, permission and range rules applied when a plugin is installed). Some findings only deserve a note, such as a very long cache time, and do not block saving. See [the Plugin file card](using-plugins.md#the-plugin-file-card) for what the administrator sees.

## Words at a glance

| Word | Where | Purpose |
|---|---|---|
| `control` | setting | toggle, choice, number, text, url, path, secret, choices, group_list |
| `title`, `description`, `placeholder`, `unit` | setting | The wording around the control |
| `group`, `order` | setting | Heading and position inside Settings |
| `advanced`, `read_only` | setting | Collapsed section; shown but not editable |
| `show_when`, `requires` | setting | Appears only when; greyed with a reason |
| `scope` | setting | `household` or `profile` |
| `minimum`, `maximum`, `default`, `choices`, `enum`, `enum_labels`, `format` | setting | Range, starting value, options, kind of text |
| `item_title`, `add_label`, `locked`, `row_actions`, `fields`, `value_source` | group list | Repeating groups |
| `actions` | settings description | test_connection, check_now, dry_run |
| `secrets`, `onboarding.credentials`, `links` | plugin | Credentials and the four links |

## Next steps

- [Build a plugin](building-a-plugin.md)
- [Use plugins](using-plugins.md)
- [Add a metadata source](adding-a-provider.md)
