---
title: "Inline Media Editing"
description: "How Tuvima lets users correct media from the surface where they find the issue."
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

How Tuvima lets users correct media from the surface where they find the issue.

## Where this lives in the code

- `src/MediaEngine.Web/Services/Editing/MediaEditorLauncherService.cs`
- `src/MediaEngine.Web/Services/Editing/EditorDeviceRule.cs`
- `src/MediaEngine.Web/Services/Editing/EditingModeContext.cs`
- `src/MediaEngine.Web/Components/Details/EditingBanner.razor`
- `src/MediaEngine.Web/Components/Details/EditingSectionSlot.razor`
- `src/MediaEngine.Web/Components/Shared/AppConfirmDialog.razor`
- `src/MediaEngine.Web/Components/MediaEditor/SharedMediaEditorShell.razor`
- `src/MediaEngine.Api/Endpoints/MetadataEndpoints.cs`

Tuvima no longer uses a separate media management workbench. Users browse through Home, Read, Watch, Listen, Search, and detail pages. When a media item needs correction, the edit action appears on that same surface: on a single item's detail page it turns on Editing Mode, elsewhere it opens the shared media editor in a dialog.

## Product model

- Normal single-item correction happens in **Editing Mode** on the detail page: choosing Edit in the page's "..." menu shows a banner and per-field pencils, and Manage Artwork, Match and Identity and History open as one section directly below the hero (`EditingSectionSlot`), which hosts the same `SharedMediaEditorShell` sections in line. There is no drawer. See [Editing Mode](#editing-mode).
- Review, browse-row and Recently Added correction, and the people, series-shelf and curated-collection editors, open the same editor shell in a dialog through `MediaEditorLauncherService.OpenAsync` because they originate outside a single item's detail page.
- Review Queue is only for blocked, uncertain, or low-confidence items that need human confirmation.
- Settings/Admin is for folders, providers, profiles, ingestion status, system health, logs, and configuration.
- No current feature should route users to a separate media library workspace.

## Shared editor

**Desktop-only rule.** `EditorDeviceRule.CanEdit` is the one device rule: the form factor is desktop AND the primary pointer is fine and can hover (`DeviceContextService.CanEdit`, fed by the same four signals the browser snapshot reports). `MediaEditorLauncherService`, `CollectionEditorLauncherService` and `GalleryEditorLauncherService` check it before anything else (before the administrator unlock). Where it is false `TryOpenAsync` returns `EditorLaunchResult.NotAvailableOnThisDevice`, shows the toast "Edit on a computer" and opens no dialog; `OpenAsync` keeps its boolean contract (true only when a change was applied). A missing device context also refuses. Entry points are hidden off the desktop too, so the refusal is a safety net for deep links and query-string launches. Phone, tablet, TV, a native shell, an unknown form factor and an undetectable pointer cannot edit in the Dashboard. This is a Dashboard rule: the Engine never receives the device, its permission check (the Edit action it offers and the authorization on each save) still decides who may edit, and the Engine does not block coarse-pointer or touch devices.

All media editing renders `SharedMediaEditorShell`: through `MediaEditorLauncherService.OpenAsync` as a dialog for Review, Batch and the callers listed above, and in line in the Editing Mode section slot on a single item's detail page (and on a Universe page). Review supplies its review context and Batch is limited to a real selection. `MediaEditorSurface` supplies the common shell without duplicating editor state or persistence logic.

The launch request should include the current context:

- `EntityIds`
- `LaunchEntityId`
- `LaunchEntityKind`
- `ActiveProfileId` for profile-owned notes and tags
- `Mode`
- `InitialScope` or `InitialTab`
- `MediaType`
- `HeaderTitle`
- `HeaderSubtitle`
- `CoverUrl`
- `PreviewItems`
- `ReviewItemId` plus the review-specific trigger/context when opened from Review Queue

Use `SharedMediaEditorMode.Normal` from media surfaces, `SharedMediaEditorMode.Review` from Review Queue, and `SharedMediaEditorMode.Batch` only when a real list/table selection exists.

For a single item, Details is intentionally small: Appearance contains display title, description, provider-native tagline, sort title, and durable genre overrides; My Library contains profile-owned notes and local tags. Genre and tag entry both suggest existing library values, preserve spaces while typing, and commit only on Enter or explicit selection. The editor header owns the sole primary artwork preview, while custom artwork is managed on Artwork. Provider-managed people, dates, language, runtime, and ratings remain visible as source facts and change through Matching or ingestion rather than becoming a large editable form. Batch editing may retain a separate Options step for bulk-only controls. Files is limited to physical-file state, while identity, metadata, artwork, and ingestion events belong exclusively in History.

### Universe and fictional-entity editing

Universe and fictional-entity administration is rendered as content inside `SharedMediaEditorShell`, not as a separate route, dialog, or media workbench. A media detail with a Universe QID passes both its original media target and a typed `SharedEntityEditorTargetDto`; the editor can switch from that media to the Universe, navigate category/entity selectors in place, return from an entity to the Universe root, and return to the original media. Every surface switch uses the same save/discard/stay guard as other editor retargets. Consumer Explore remains a separate read-only experience.

The Universe root presents Engine-ordered Characters, Locations/Places, Organizations/Groups, Events, and Objects. Category and sibling controls open anchored, viewport-bounded, searchable selector popovers; the category rail stays a single horizontally scrollable row with keyboard navigation, visible overflow controls, and touch/wheel support. The shell composes tabs only from the target's readable capabilities, so graph targets never gain the physical-media Files section. Organization `members` and Event `participants` are friendly, filtered projections of the qualified relationship data; the full Relationships section remains separate. Details and managed EntityAsset Artwork use the authorized shared-editor endpoints. Entity artwork is owned by the Universe/entity target, not inherited from a media work or parent container. Appearances carry work-scoped role, context, anchor, temporal, and spoiler qualifiers. Graph facts are read-only; authored-container canonical titles/order and media cross-navigation paths are not changed by graph editing.

The editor's media Context Rail replaces the former generic Contents editor tab. It shows the real hierarchy and retargets the same media editor; it does not turn series, seasons, albums, or collections into knowledge-graph entities. Audiobook chapter-title overrides remain available under the explicitly named Chapters section. Retail Match handles provider identity and structural placement together: a candidate that changes the hierarchy previews Previous Path → Target Path before Apply, and Apply is the only confirmation. The normal editor and Review Queue do not offer a Change Type action; media type correction remains outside this editor surface.

Keep the data models distinct: structural placement groups media works, authored containers retain their user-owned canonical title/order, and the knowledge graph links a Universe to fictional entities and to works through qualified appearances/relationships. Real-world release/claim dates, in-universe narrative time, and editor History are different facts and must not be substituted for one another. Stage 2 establishes canonical identity; bounded Stage 3 enriches already grounded narrative entities and relationships without silently rewriting authored containers or structural placement.

Description resolution follows the selected item scope. A comic issue reads `issue_description` or `issue_overview`, including asset-owned canonical values, and never substitutes the parent series description. Comic Vine issue copy retains its issue URL, provider terms, and retrieval attribution on the detail surface. Series copy appears only on a series/container surface.

TV shows, seasons, music albums, and other structural containers use the media Context Rail and their existing consumer browse/detail arrays. Episodes and tracks expose a deliberate Parent & position workflow inside Matching; structural moves are previewed and confirmed separately from ordinary metadata saves. Audiobook chapter-title overrides use a dedicated Chapters section while file-derived chapter timing and boundaries remain read-only. Collection membership is edited only in the collection editor, not repeated on the collection detail page.

Canonical presentation overrides are limited to `title`, `description`, `tagline`, `sort_title`, and `genre`. The Engine atomically saves those durable work-level overrides together with profile-owned notes and tags using an optimistic revision. A stale revision returns `409 Conflict`; the editor stays open, preserves the user's input, and offers an explicit reload action.

## The pop-over editor

Editing a single item is a pop-over, not a state of the page. `EditorHost` (one scoped service, drawn once by the main layout through `EditorPopover` as a native modal dialog) owns the staged changes, the permission answer and the artwork picker, and every entry point calls `OpenAsync(entityId, tool)`: a detail page's "..." menu, library list rows, Recently Added, Needs Review Fix, the player's lyrics button, and ticked rows. Deep links never open it.

- **Why a host, not a page mode.** The earlier design put the page into "Editing Mode" (a sticky bar and pencils) and then opened a window, so people saw two things at once and a list row had to navigate away first. One host that any page can call removes the second surface and lets Fix open over the list it came from. Maintenance: one editor; Reliability: a list never loses its place.
- **The family tree.** `EditorFamilyState` reads the item's family (the Engine's navigator and owned-children reads, which now carry matched state and a plain-words reason) and pages children 50 at a time. Pending changes are kept per item while you switch.
- **Match.** Search starts from the parsed file name (`GET /metadata/{id}/match-context`), TV uses a Show, Season, Episode browser, and "match the other episodes by number" stages a `sibling_match` change that runs after the identity change, with the Review list showing it.
- **Save.** Save changes opens Review changes; saving runs the staged changes, a TV re-match refreshes title, poster and cast before the pop-over closes, and the ribbon follows the durable identity job by named step.
- **Needs Review.** One list merges items the Engine was unsure about with files it could not identify (`GET /review/queue`); Fix opens the pop-over on Match.

## After save

After an edit is applied, the detail surface refreshes after the dialog closes with a successful result (in Editing Mode it refreshes as soon as each field or section change is saved). The modal editor scrolls internally; Cancel returns to the unchanged detail. Save failures and structural confirmations keep the editor visible. Dirty target and route changes are guarded, focus enters the editor on open and returns to the Edit action on close, and editing never changes the detail URL or navigates to a management workspace.

Applying a different retail match is a two-speed operation. The selected provider identity and its primary artwork are committed synchronously: stale provider-managed artwork is removed, the replacement cover is downloaded into managed storage, and the detail hero refreshes while the editor remains open. User-uploaded artwork remains available. Wikidata alignment and deeper enrichment are then queued and may finish in the background. The manual update and queued identity job must both be visible in application logs and item History.

In Review mode, resolving a row is explicit. Saving field changes, applying a provider/canonical match, or approving the current metadata must call the Engine review API for the concrete review item. If that call fails, the item stays in the Review Queue.

## Artwork editing

The shared editor owns artwork correction for normal and review flows. Each artwork type opens a focused gallery where one click makes a variant active, the magnifier opens a full-size preview, and the delete action removes that variant from the item with inline confirmation.

Deleting provider artwork removes the item association but keeps shared provider/image cache data when another work, edition, collection, or descendant still references it. Deleting user-uploaded artwork can also clean up the owned local file. Artwork type behavior is documented for users in [Artwork Types](../reference/artwork-types.md).



## People, Series, curated collections and Universes

These edit in place with the same bar, right-hand panel, floating artwork picker and Review changes as a title (universal editor spec D17, D17a); the old person pop-up and the Series and curated-collection pop-ups for an existing item are gone. The Engine describes each one through `GET /library/editor-subjects/{id}` (and `/library/editor-subjects/universes/{qid}` for a Universe), and `POST /library/edit-session` saves it with the existing Details and Artwork change kinds: the handlers find the subject by its id.

- **Person:** Details (name, biography, sort name, tags), the provider facts read-only, and the photo (Headshot). Match is not offered until a provider record can be re-matched.
- **Series:** title and description as local overrides over the provider's values; cover and background.
- **Curated collection:** its own name and description (a name is required, and a curated collection must keep at least one item); cover and background. Creating a collection, a playlist or a gallery, and managing items and rules, still use `CollectionEditorShell`.
- **Universe:** name and description as local overrides stored in `collections.display_overrides_json` (the Wikidata values are never touched and come back when the override is cleared), a cover and a background shown on the Universe hero, and a read-only list of its Series. No Match tool.

Every save is refused for a profile that may not edit (`EditSessionAccessService`), and every Dashboard entry point checks `EditorDeviceRule.CanEdit`.
