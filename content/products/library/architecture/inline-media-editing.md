---
title: "Inline Media Editing"
description: "How Tuvima lets users correct media from the surface where they find the issue, in one pop-over editor."
audience: "developer"
category: "architecture"
product_area: "editing"
tags:
  - "dashboard"
  - "editing"
  - "review"
status: current
---

# Inline Media Editing

## In this page

How Tuvima lets users correct media from the surface where they find the issue: one pop-over editor, opened from Edit anywhere, with a rail of dropdowns, tabs, Quick Facts and a fixed footer. For the user's view see [Correct an item](../guides/editing-items.md).

## Where this lives in the code

- `src/MediaEngine.Web/Services/Editing/EditorHost.cs`: the one scoped service that owns the staged changes, the permission answer and the artwork picker; every entry point calls `OpenAsync(entityId, tool)`.
- `src/MediaEngine.Web/Services/Editing/EditorDeviceRule.cs`: the desktop-only rule.
- `src/MediaEngine.Web/Components/Details/EditorPopover.razor` and `EditorPanelHost.razor`: the window, drawn once by the main layout as a native modal dialog.
- `src/MediaEngine.Web/Components/Details/EditorFamilyRail.razor` and `EditorUniverseRail.razor`: the rail of dropdowns.
- `src/MediaEngine.Web/Components/Details/EditorItemHeader.razor`, `EditorQuickFacts.razor`, `EditorDetailsPanel.razor`, `EditorContentsTab.razor`, `EditorArtworkTool.razor`, `EditorMatchPanel.razor`, `EditorLineUpPanel.razor`, `EditorFileSortPanel.razor`, `EditorFilesTab.razor`, `EditorHistoryTool.razor` and `BulkEditPanel.razor`: the header, Quick Facts and the tabs.
- `src/MediaEngine.Web/Components/Details/ReviewChangesView.razor`: Review changes.
- `src/MediaEngine.Api/Endpoints/MetadataEndpoints.cs` and `LibraryEndpoints.cs`: the Engine reads and the edit session the editor saves through.

Tuvima no longer uses a separate media management workbench. Users browse through Home, Read, Watch, Listen, Search, and detail pages. When a media item needs correction, the edit action appears on that same surface and opens the pop-over editor.

## Product model

- Every correction of one item, and of ticked rows, happens in the **pop-over editor**: choosing Edit in an item's "..." menu (or Fix on a Needs Review row) opens it at once over the page. Deep links never open it.
- Review Queue is only for blocked, uncertain, or low-confidence items that need human confirmation.
- Settings and Admin are for folders, providers, profiles, ingestion status, system health, logs, and configuration.
- Creating a collection or playlist, and managing items and rules, still use the collection editor; photos and documents keep their own editor.
- No current feature should route users to a separate media library workspace.

**Desktop-only rule.** `EditorDeviceRule.CanEdit` is the one device rule: the form factor is desktop AND the primary pointer is fine and can hover. It gates every Dashboard launcher and edit handler, not just the buttons. Where it is false the launcher returns `EditorLaunchResult.NotAvailableOnThisDevice` and shows the toast "Edit on a computer". The Engine's permission check still decides who may edit.

## The pop-over editor

Editing is a pop-over, not a state of the page. `EditorHost` is one scoped service, so a detail page's "..." menu, library list rows, Recently Added, Needs Review Fix, the player's lyrics button, and ticked rows all open the same window.

- **Why a host, not a page mode.** The earlier design put the page into "Editing Mode" (a sticky bar and pencils) and then opened a window, so people saw two things at once and a list row had to navigate away first. One host that any page can call removes the second surface and lets Fix open over the list it came from. Maintenance: one editor. Reliability: a list never loses its place.
- **Always the item you chose.** Opening always loads the item it was opened for, whatever was loaded before. The first versions reused a field session that was shared by the whole browser session, which showed the first title when a second was opened. Reliability.
- **The frame.** A rail of dropdowns (only when the item has a family), the item header, tabs, the tab content with Quick Facts beside the form, and a footer. The window keeps its size while tabs change and only the tab content scrolls. Below 1280 px wide the rail keeps its last two levels.
- **The rail.** `EditorFamilyState` reads the item's family (the Engine's navigator and owned-children reads, which carry matched state and a plain-words reason) and pages children in as you scroll, so a long show stays quick. Staged changes are kept per item while you switch along the rail. A Universe uses `EditorUniverseState`: the Universe and its kinds as searchable dropdowns with counts and Add. Maintenance: one rail component per family shape, no left column to lay out around.
- **Tabs.** Details, Artwork, Match & Identity, Files and History for every item; Contents for a show, season, album, series and film series. A Universe and its things get Details, Pictures, Match and History. There is no separate Organization tab: where files live and what they are called sits in Files.
- **Staging and Save.** Every change is staged in a pending list and counted in the footer. Save changes opens Review changes (before and after); saving runs the staged changes through the edit session (`POST /library/edit-session`), a retail re-match refreshes title, poster and cast before the pop-over closes, and the ribbon follows the durable identity job by named step. **Delete is the one exception**: it asks once and runs at once through the existing delete preview and confirm actions (plus a single-file delete), because its confirm box already says everything Review would.
- **Several items.** Ticked rows (from a list or from Contents) open the same window as "Editing N items". `BulkEditFields`, `BulkEditRules` and `BulkEditStager` offer only fields every ticked item can take and that make sense as one value for all; identifying fields (title, number, ISBN, file name) are never offered, and a change that would make items collide is blocked with the reason.
- **Needs Review.** One list merges items the Engine was unsure about with files it could not identify (`GET /review/queue`); Fix opens the pop-over on Match & Identity.

## Details, Quick Facts and Contents

Details is a form where every field has a lock (keep my value when the provider refreshes) and, once changed, a revert arrow. Quick Facts are read-only facts per item (`ItemQuickFactsRepository`; the Engine's read describes the kind, the Dashboard's `EditorQuickFacts` lays them out). Contents lists children with a picture, number, title, matched mark and size, with tick boxes that switch the editor to several-items editing and, for a series of videos, the order the person sets (drag or arrows; the arrows do exactly what dragging does).

Canonical presentation overrides are limited to `title`, `description`, `tagline`, `sort_title`, and `genre`. The Engine atomically saves those durable work-level overrides together with profile-owned notes and tags using an optimistic revision. A stale revision returns `409 Conflict`; the editor stays open, preserves the user's input, and offers an explicit reload action.

Description resolution follows the selected item scope. A comic issue reads `issue_description` or `issue_overview`, including asset-owned canonical values, and never substitutes the parent series description. Comic Vine issue copy retains its issue URL, provider terms, and retrieval attribution on the detail surface. Series copy appears only on a series or container surface.

## Match & Identity

Search starts from the parsed file and folder names (`GET /metadata/{id}/match-context`) and can also use a provider ID or link, a different title, year, episode title, number (including absolute numbers) or air date, as each kind allows. Candidates carry a confidence score from the existing scoring, with a plain-words reason. Only the deciding facts per kind are shown (the per-kind table lives in the editor spec). For one item the highlighted row shows a before and after. For several files the two-step table (`EditorLineUpPanel`, `EditorTvMatchCandidates`) lines files up with the provider's episodes or tracks, each Ready or Needs choice; "Apply to" selected files or all files. Doubtful rows are counted before Save and listed in Review. A match never moves files unless its own switch is on.

Applying a different retail match is a two-speed operation. The selected provider identity and its primary artwork are committed synchronously: stale provider-managed artwork is removed, the replacement cover is downloaded into managed storage, and the detail hero refreshes while the editor remains open. User-uploaded artwork remains available. Wikidata alignment and deeper enrichment are then queued and may finish in the background. The manual update and queued identity job must both be visible in application logs and item History.

A retail candidate that changes the hierarchy previews Previous Path → Target Path before Apply, and Apply is the only confirmation. Episodes and tracks expose Parent & position; structural moves are previewed and confirmed separately from ordinary metadata saves. The normal editor and Review Queue do not offer a Change Type action. Structural parent moves live in Match, not Details.

### What is this file?

`EditorFileSortPanel` and `EditorFileSortRules` handle any file the Engine could not place or any file the person opens. The four answers are: an episode, track or book (the normal match); an Extra (a kind and a place); belongs to another title (search any title and attach it there); ignore. The kind comes from a name guess (`ExtraNameGuesser`; "Season 1 trailer.mkv" is a Trailer for Season 1) that only pre-fills the choice. The Extra kind and place are stored on `item_extras` (`extra_kind`, `place_season`, `place_episode`, `place_track`, upgrade step `0080_extra_kinds_and_places`) and are read by the Extras row on show, film and album pages. Ignoring a file reuses `excluded_source_files` with the reason `ignored_by_you`, so a rescan skips it and Settings lists it with Add back; the file stays on disk. Extras never count as episodes. All of it is staged and applied by `ExtraMoveEditSessionChangeHandler` on Save. See the [database schema](../reference/database-schema.md) for the columns.

## Artwork

The Artwork tool (`EditorArtworkTool`, `ArtworkPickerSession`, `ArtworkCandidateFilter`) shows a card per role from the roles the Engine declares for the item, a large zoomable preview at the role's real shape, file facts, a versions strip where clicking a version makes it Preferred (staged like any change), and Add artwork with Provider (filtered by language and size), Upload and Link. A line under the preview says which items the change reaches. Episode stills keep Fetch all for a season.

Deleting provider artwork removes the item association but keeps shared provider and image cache data when another work, edition, collection, or descendant still references it. Deleting user-uploaded artwork can also clean up the owned local file. Artwork type behavior is documented for users in [Artwork Types](../reference/artwork-types.md).

## Delete

Delete is offered from the editor's "..." for the item being edited (including a whole show, season, album or series), from ticked rows in Contents, and from a single file in Files. `EditorDeleteFlow` and `EditorDeleteRules` build the one confirm box (what goes, how many files, space freed, collections affected, the Recycle bin wording) from the Engine's delete preview; confirming calls the delete action and the editor updates at once: the family drops the removed ids, unsaved changes on a deleted item are dropped, and the editor moves to the parent when its own item went. Files in read-only folders are never deleted; the item leaves the Library and is excluded from scans.

## Universes and other subjects

People, Series, curated collections and Universes (with their characters, places, factions and other kinds) edit in the same window. The Engine describes each one through `GET /library/editor-subjects/{id}` (and `/library/editor-subjects/universes/{qid}` for a Universe), and `POST /library/edit-session` saves it with the existing Details and Artwork change kinds, plus a "thing add" change for things added by hand.

- **Person:** Details (name, biography, sort name, tags), the provider facts read-only, and the photo.
- **Series:** title and description as local overrides over the provider's values; cover and background.
- **Curated collection:** its own name and description (a name is required, and a curated collection must keep at least one item); cover and background. Creating a collection, a playlist or a gallery, and managing items and rules, still use `CollectionEditorShell`.
- **Universe and its things:** the editor reads kinds, fields and picture slots from the Engine, so a new kind needs no editor change. Name and description are local overrides stored in `collections.display_overrides_json` (the Wikidata values are never touched and come back when the override is cleared). Every thing has a main picture, a logo where it makes sense, and a background; a thing added by hand shows "Not on Wikidata, added by you" in Match and can be deleted. The Timeline is a read-only view. Media detail pages link actual accessible Universe relationships through **Open Universe** in Match & Identity, which asks about unsaved changes first.

Every save is refused for a profile that may not edit (`EditSessionAccessService`), and every Dashboard entry point checks `EditorDeviceRule.CanEdit`.

Keep the data models distinct: structural placement groups media works, authored containers retain their user-owned canonical title and order, and the knowledge graph links a Universe to fictional entities and to works through qualified appearances and relationships. Real-world release and claim dates, in-universe narrative time, and editor History are different facts and must not be substituted for one another. Stage 2 establishes canonical identity; bounded Stage 3 enriches already grounded narrative entities and relationships without silently rewriting authored containers or structural placement.

## After save

After an edit is applied, the detail surface refreshes after the editor closes with a successful result. The editor scrolls internally; Discard returns to the unchanged page. Save failures and structural confirmations keep the editor visible. Dirty item switches and route changes are guarded, focus enters the editor on open and returns to the Edit action on close, and editing never changes the detail URL or navigates to a management workspace.

In Review mode, resolving a row is explicit. Saving field changes, applying a provider or canonical match, or approving the current metadata must call the Engine review API for the concrete review item. If that call fails, the item stays in the Review Queue.
