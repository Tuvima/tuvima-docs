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

How Tuvima lets users correct media from the surface where they find the issue: one pop-over editor, opened from Edit anywhere, with a header that is the map of the item's family (home button, Season or Section dropdown, item dropdown with supporting files and a folder button), tabs, Quick facts and a fixed footer. For the user's view see [Correct an item](../guides/editing-items.md).

## Where this lives in the code

- `src/MediaEngine.Web/Services/Editing/EditorHost.cs`: the one scoped service that owns the staged changes, the permission answer and the artwork picker; every entry point calls `OpenAsync(entityId, tool)`.
- `src/MediaEngine.Web/Services/Editing/EditorDeviceRule.cs`: the desktop-and-mouse rule, which no longer gates the editor and remains for the Settings and Vault tools listed below.
- `src/MediaEngine.Web/Services/Editing/EditorPhoneArrangement.cs`: when the editor is drawn in its phone arrangement (a phone or tablet form factor).
- `src/MediaEngine.Web/Components/Details/EditorPopover.razor` and `EditorPanelHost.razor`: the window, drawn once by the main layout as a native modal dialog.
- `src/MediaEngine.Web/Components/Details/EditorHeaderNav.razor`, `EditorItemHeader.razor` and `EditorWindowChrome.razor`: the header (cover, label, title, facts, the gradient from the cover's colors) and its navigation row; `EditorUniverseRail.razor` holds a Universe's kind dropdowns. The Engine builds the navigation model in `EditorHeaderReadService`, with the per-kind rules and numbers (tabs, inline file count, page sizes) from `config/editor.json`.
- `src/MediaEngine.Web/Components/Details/EditorItemHeader.razor`, `EditorQuickFacts.razor`, `EditorDetailsPanel.razor`, `EditorArtworkTool.razor`, `EditorMatchPanel.razor` (with `EditorTvMatchFlow`, `EditorMusicMatchFlow`, `EditorWikidataMatch` and `EditorMatchResults`), `EditorSupportingFilePanel.razor`, `EditorPreviewTab.razor`, `EditorBookmarksPanel.razor`, `EditorHistoryTool.razor` and `BulkEditPanel.razor`: Quick facts and the tabs.
- `src/MediaEngine.Web/Components/Details/EditorFileBrowserDialog.razor` (with its `EditorFileBrowser*` parts and `EditorFileSortPanel.razor`): the supporting-files browser and the Folders and files view, on the shared browser frame.
- `src/MediaEngine.Api/Services/Extras/` and `src/MediaEngine.Ingestion/Extras/ExtraPlacementInference.cs`: supporting files (the list, search, bulk actions, disk moves, and the five checks that place a file from its folder and name, with the words in `config/extras.json`).
- `src/MediaEngine.Web/Components/Details/ReviewChangesView.razor`: Review changes.
- `src/MediaEngine.Api/Endpoints/MetadataEndpoints.cs` and `LibraryEndpoints.cs`: the Engine reads and the edit session the editor saves through.

Tuvima no longer uses a separate media management workbench. Users browse through Home, Read, Watch, Listen, Search, and detail pages. When a media item needs correction, the edit action appears on that same surface and opens the pop-over editor.

## Product model

- Every correction of one item, and of ticked rows, happens in the **pop-over editor**: choosing Edit in an item's "..." menu (or Fix on a Needs Review row) opens it at once over the page. Deep links never open it.
- Review Queue is only for blocked, uncertain, or low-confidence items that need human confirmation.
- Settings and Admin are for folders, providers, profiles, ingestion status, system health, logs, and configuration.
- Creating a collection or playlist, and managing items and rules, still use the collection editor; photos and documents keep their own editor.
- No current feature should route users to a separate media library workspace.

**Devices.** The editor, everything that opens it, Delete and collection membership work on desktop, tablet and phone; the Engine's permission check decides who may edit, and TVs do not edit. On a phone or tablet form factor (under 1024 px wide, so a tablet in portrait) the editor is drawn in its phone arrangement: a full-screen sheet, a one-line header that opens the navigation as a sheet, a scrolling tab row, a footer with Discard and Save changes (Delete moves to the header's "..." menu) and Review changes as a full-screen step. It is the same editor and the same staged changes; only the layout differs. Reason: most people use only their phones, and one editor is one thing to test (Maintenance). `EditorDeviceRule.CanEdit` (desktop form factor AND a fine pointer that can hover) still gates the tools that are desktop-only for their own reasons: plugin settings and setup, the import page, the ingestion flow editor, and the Vault's unmatched list, identify panel and gallery tools. See [Editing on a phone](../guides/editing-items.md#editing-on-a-phone).

## The pop-over editor

Editing is a pop-over, not a state of the page. `EditorHost` is one scoped service, so a detail page's "..." menu, library list rows, Recently Added, Needs Review Fix, the player's lyrics button, and ticked rows all open the same window.

- **Why a host, not a page mode.** The earlier design put the page into "Editing Mode" (a sticky bar and pencils) and then opened a window, so people saw two things at once and a list row had to navigate away first. One host that any page can call removes the second surface and lets Fix open over the list it came from. Maintenance: one editor. Reliability: a list never loses its place.
- **Always the item you chose.** Opening always loads the item it was opened for, whatever was loaded before. The first versions reused a field session that was shared by the whole browser session, which showed the first title when a second was opened. Reliability.
- **The frame.** The item header with its navigation row (home, Season or Section, item dropdown; a film or standalone book has only what it needs), tabs, the tab content with Quick facts beside the form, and a footer (Delete, the file write-back status, the unsaved count, Discard, Save changes). The window keeps its size while tabs change and only the tab content scrolls. Below 1180 px wide it is full screen and Quick facts move under the form.
- **The navigation row.** The Engine reads the item's family and the supporting files at each level (`GET` editor header read), with the matched state and a plain-words reason, and the item dropdown pages children in as you scroll, so a long show stays quick. `EditorFamilyState` keeps the family loaded for switching and for removing deleted items. Staged changes are kept per item while you switch along the rail. A Universe uses `EditorUniverseState`: the Universe and its kinds as searchable dropdowns with counts and Add. Maintenance: one rail component per family shape, no left column to lay out around.
- **Tabs.** Details, Artwork, Match and History (Bookmarks as well, for administrators, on titles that play). A supporting file has Details, Preview and History; a Series has Details and History and is read-only. A Universe and its things get Details, Pictures, Match and History. There is no Contents tab and no Files tab: the file's facts are in Quick facts, the family is in the header, and the supporting-files browser opens from the item dropdown. Guardrail tests (`EditorV5HeaderGuardrailTests`, `EditorV5RetiredSurfacesGuardrailTests`) keep them gone.
- **Staging and Save.** Every change is staged in a pending list and counted in the footer. Save changes opens Review changes (before and after); saving runs the staged changes through the edit session (`POST /library/edit-session`), a retail re-match refreshes title, poster and cast before the pop-over closes, and the ribbon follows the durable identity job by named step. **Delete is the one exception**: it asks once and runs at once through the existing delete preview and confirm actions (plus a single-file delete), because its confirm box already says everything Review would.
- **Several items.** Ticked rows (from a list, a season page or the supporting-files browser) open the same window as "Editing N items". `BulkEditFields`, `BulkEditRules` and `BulkEditStager` offer only fields every ticked item can take and that make sense as one value for all; identifying fields (title, number, ISBN, file name) are never offered, and a change that would make items collide is blocked with the reason.
- **Needs Review.** One list merges items the Engine was unsure about with files it could not identify (`GET /review/queue`); Fix opens the pop-over on Match & Identity.

## Details, Quick facts and supporting files

Details is a form where every provider-filled field is locked by default; unlocking one marks it as the person's, so it is kept on every later refresh, and Revert puts back the provider's value. Quick Facts are read-only facts per item (`ItemQuickFactsRepository`; the Engine's read describes the kind, the Dashboard's `EditorQuickFacts` lays them out). Details rows are built on one shared row part (`AppFormRow`: a label line, a control line and a message line), so help text under one field cannot push its neighbor out of line; the collection and playlist rule rows use the same part. Quick Facts show the name of the library folder that holds the file and, once at the foot of the panel, the file path. For a series of videos the order the person sets (drag or arrows; the arrows do exactly what dragging does) is edited from the item dropdown's Reorder mode and the browser; Reorder mode ends with Save order or Cancel on the shared reorder bar, and Save order stages the order like any other change. Changing a video's series follows the Managed or Read-only rule too: in a Managed folder the file moves into that series' folder on Save changes, after the amber footer warning, and in a Read-only folder nothing on disk changes. A supporting file is its own editable record (title, description, group, role, Belongs to, Shown alongside, tags); changing Belongs to follows the same Managed or Read-only rule as a changed match, and nothing else about a supporting file moves or rewrites it.

Canonical presentation overrides are limited to `title`, `description`, `tagline`, `sort_title`, and `genre`. The Engine atomically saves those durable work-level overrides together with profile-owned notes and tags using an optimistic revision. A stale revision returns `409 Conflict`; the editor stays open, preserves the user's input, and offers an explicit reload action.

Description resolution follows the selected item scope. A comic issue reads `issue_description` or `issue_overview`, including asset-owned canonical values, and never substitutes the parent series description. Comic Vine issue copy retains its issue URL, provider terms, and retrieval attribution on the detail surface. Series copy appears only on a series or container surface.

## Match

On Match the header is one line, and Media providers and Wikidata are tabs. The tab opens on the current match, read by its provider ID, in the Match card; picking a search result shows the same card, with the verdict in words (Strong match, Possible match or Weak match; `strong`, `possible` and `weak` on the wire) and a compare table of Field, Your file and Selected result, one row per fact the Engine compared, marked agree, differ or unknown (unknown never counts against the match). Results are a plain list with no verdict. It searches only when the person presses Search or Enter, for providers and for Wikidata (`GET /metadata/{id}/match-context` supplies the values pre-filled from the file name, embedded metadata and folder hints, cleaned with `config/filename_cleaning.json`). The two tabs are independent: Media providers (the retail match) and Wikidata (the canonical identity); changing one never touches the other. TV, music, Wikidata and several ticked items use the same search row, list and card. Apply always stages the change and Save commits it, following the library's file-management mode: a match that moves a file in a Managed folder shows the amber footer warning first, and nothing moves in a Read-only folder. There is no placement picker and no line-up table: files are matched one at a time from the header, and applying a match to an episode or track elsewhere re-parents it through the same staged relationship and file-move changes every move uses.

## Artwork

The Artwork tool (`EditorArtworkTool`, `ArtworkPickerSession`, `ArtworkCandidateFilter`) shows a card per role from the roles the Engine declares for the item, a large zoomable preview at the role's real shape, file facts, a versions strip where clicking a version makes it Preferred (staged like any change), and Add artwork with Provider (filtered by language and size), Upload and Link. A line under the preview says which items the change reaches. Episode stills keep Fetch all for a season.

Deleting provider artwork removes the item association but keeps shared provider and image cache data when another work, edition, collection, or descendant still references it. Deleting user-uploaded artwork can also clean up the owned local file. Artwork type behavior is documented for users in [Artwork Types](../reference/artwork-types.md).

## Delete

Delete is the red button at the left of the footer for the item being edited (including a whole show, season, album or series), and is offered on ticked rows in the supporting-files browser. `EditorDeleteFlow` and `EditorDeleteRules` build the one confirm box (what goes, how many files, space freed, collections affected, the Recycle bin wording) from the Engine's delete preview; confirming calls the delete action and the editor updates at once: the family drops the removed ids, unsaved changes on a deleted item are dropped, and the editor moves to the parent when its own item went. Files in read-only folders are never deleted; the item leaves the Library and is excluded from scans.

## Universes and other subjects

People, Series, curated collections and Universes (with their characters, places, factions and other kinds) edit in the same window. The Engine describes each one through `GET /library/editor-subjects/{id}` (and `/library/editor-subjects/universes/{qid}` for a Universe), and `POST /library/edit-session` saves it with the existing Details and Artwork change kinds, plus a "thing add" change for things added by hand.

- **Person:** Details (name, biography, sort name, tags), the provider facts read-only, and the photo.
- **Series:** title and description as local overrides over the provider's values; cover and background.
- **Curated collection:** its own name and description (a name is required, and a curated collection must keep at least one item); cover and background. Creating a collection, a playlist or a gallery, and managing items and rules, still use `CollectionEditorShell`.
- **Universe and its things:** the editor reads kinds, fields and picture slots from the Engine, so a new kind needs no editor change. Name and description are local overrides stored in `collections.display_overrides_json` (the Wikidata values are never touched and come back when the override is cleared). Every thing has a main picture, a logo where it makes sense, and a background; a thing added by hand shows "Not on Wikidata, added by you" in Match and can be deleted. The Timeline is a read-only view. Media detail pages link actual accessible Universe relationships through **Open Universe** in Match & Identity, which asks about unsaved changes first.

Every save is refused for a profile that may not edit (`EditSessionAccessService`), whatever the device.

Keep the data models distinct: structural placement groups media works, authored containers retain their user-owned canonical title and order, and the knowledge graph links a Universe to fictional entities and to works through qualified appearances and relationships. Real-world release and claim dates, in-universe narrative time, and editor History are different facts and must not be substituted for one another. Stage 2 establishes canonical identity; bounded Stage 3 enriches already grounded narrative entities and relationships without silently rewriting authored containers or structural placement.

## After save

After an edit is applied, the detail surface refreshes after the editor closes with a successful result. The editor scrolls internally; Discard returns to the unchanged page. Save failures and structural confirmations keep the editor visible. Dirty item switches and route changes are guarded, focus enters the editor on open and returns to the Edit action on close, and editing never changes the detail URL or navigates to a management workspace.

In Review mode, resolving a row is explicit. Saving field changes, applying a provider or canonical match, or approving the current metadata must call the Engine review API for the concrete review item. If that call fails, the item stays in the Review Queue.
