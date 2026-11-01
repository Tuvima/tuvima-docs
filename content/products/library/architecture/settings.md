---
title: "Settings Architecture"
description: "How Tuvima separates JSON-owned runtime configuration from SQLite-owned operational and user state."
audience: "developer"
category: "architecture"
product_area: "settings"
status: current
---

# Settings Architecture

## In this page

How Tuvima separates JSON-owned runtime configuration from SQLite-owned operational and user state.

## Where this lives in the code

- `src/MediaEngine.Web/Models/ViewDTOs/SettingsNav.cs`
- `src/MediaEngine.Web/Components/Settings`
- `src/MediaEngine.Storage/ConfigurationDirectoryLoader.cs`

Tuvima Library uses one rule for settings ownership: runtime configuration lives in JSON, while operational/user state lives in SQLite.

## JSON-Owned Configuration

Use JSON for settings that affect startup, background workers, provider behavior, library organization, or runtime policy:

- `config/core.json`: server identity, paths, organization templates, auth, storage policy.
- `config/libraries.json`: source libraries and watched roots.
- `config/providers/*.json` and `config/secrets/*.json`: provider capabilities, endpoints, credentials, weights, and limits.
- `config/ai.json`: model files, hardware profile, Local AI limits and the default plugin allowance. AI feature switches, schedules and the vibe word list are plugin settings.
- `config/transcoding.json`: playback encoding, offline variants, cache retention.
- `config/hydration.json`, `config/pipelines.json`, `config/scoring.json`, `config/field_priorities.json`, `config/media_types.json`: metadata decision policy.
- `config/maintenance.json` and `config/writeback*.json`: cleanup and file write-back policy.

## SQLite-Owned State

Use SQLite for records created or changed by product workflows:

- profiles, profile external logins, and API keys.
- provider health and recent failures.
- review queue entries and resolution history.
- ingestion logs, per-file work rows, identity jobs, and Libraries status inputs.
- system activity, encode jobs, and playback/reading progress.

## Library Admin Pages

The Settings menu is flat: every row is a page, in three groups. **Personal** holds Profile, Manage Profiles and Security & Devices. **Library** holds Libraries and Playback. **Server** holds General, Users & Households, Network & Remote Access, Tools, Local AI, Plugins, Integrations, Backups and System. There is no separate Library & Ingestion overview: Libraries is one page with five tabs (Libraries, Activity, Needs Review with its count, Matching and Rules), each at its own address (`/settings/libraries` and its tab addresses), with the live state as one status line above the table. Matching is the former Ingestion Flow, with the same content. A page's tabs may belong to different sections of the Dashboard; the menu model (`SettingsNav.MenuGroups`) names which section and sub-page each tab opens, and the row stays lit on every one of them. Retired addresses are not found and do not redirect. The shared tab style is the same one every other page uses.

Every page that has advanced settings (for example Playback, Users & Households, Network & Remote Access, Local AI, Backups and System) ends with the same last tab, **Advanced**: right-aligned, drawn with a gear icon and an amber tint, and opening on one warning line ("These settings are for experienced administrators. Everyday use never needs them."). Nothing advanced is shown outside that tab, so a setting stays next to the thing it changes and there is no single Advanced page.

The Libraries status line and Activity tab are a read-heavy operational view, not a configuration editor and not a raw background-job log. Its Engine views (`GET /ingestion/queue-progress` and `GET /ingestion/presentation`) combine JSON-owned configuration with SQLite-owned state:

- JSON supplies configured source folders, provider definitions, and organization templates.
- SQLite supplies lifecycle counts, the groups in flight and recently added, review reasons, provider health records, and pipeline progress.
- SignalR supplies live `IngestionQueueProgress` and per-file `IngestionItemProgress` updates between refreshes.

When a backing signal does not exist yet, the UI should show an unavailable or not-tracked state instead of static sample data.

## Settings Status Labels

Settings/Admin uses explicit status labels so admins can tell whether a control changes the Engine or is only informational:

- **Live** means the visible setting loads from the Engine and saves through an Engine endpoint or typed Dashboard client.
- **Partial** means part of the section is live, while other controls are read-only, planned, or dependent on Engine data.
- **Planned** means the product surface is intentionally visible, but it does not save or affect runtime behavior yet.
- **Experimental** means the capability is real enough to test but not guaranteed as stable product behavior.
- **Not connected** means a control has no persistence path and must be disabled.
- **Engine unavailable** means the Dashboard could not load Engine state and must not substitute fake defaults.
- **Read-only** means the setting is loaded from config/state but cannot be changed at runtime from the Dashboard.
- **Requires restart**, **Requires provider credentials**, and **Requires admin role** describe specific blockers before a setting can take effect.

Folders, provider configuration, media-scoped pipeline configuration, transcoding policy, profile management, API keys, activity retention, plugin enablement, and dynamic plugin settings should use typed Engine API/orchestrator paths. Metadata, Local AI, Delivery, Access, and Plugin subsections that are not fully backed must remain disabled or explicitly marked partial/not connected.

Folder saves update `config/libraries.json`; the Engine attempts to hot-swap
watchers when configured source folders exist and are accessible. Catalogued
Read/Watch/Listen sources may need an administrator rescan when a newly attached
folder already contains files. A View source feeds the owning profile's single
Personal Space; its scan endpoint is recovery/diagnostic behavior, not an
ordinary Photos action. The old single `WatchDirectory` value is not a normal
runtime fallback for ingestion.

Provider settings load from `config/providers/*.json`, `config/secrets/*.json`, provider health records, and `config/pipelines.json`. Credentials are never returned in plaintext; the UI can show only whether a required credential is present. Provider strategy meanings are:

- **Waterfall**: first confident match wins.
- **Cascade**: providers run and claims are merged.
- **Sequential**: one provider feeds identifiers into the next.

Access/API key management is SQLite-backed. New API keys show plaintext only once on creation, list views expose labels and creation dates, and revoke actions remove individual or all keys without returning secrets.

## Deprecated Public Settings

Palette, accent, and color customization are no longer product-facing settings. Any remaining palette files or accent fields are treated as internal design tokens used by theming services, not as user/admin options.

## UI Rule

Every visible settings page should declare its source of truth, editability, role requirement, validation shape, and whether a restart is required. Placeholder or local-only controls should stay hidden until backed by a real persistence path.

