---
title: "Understand shelves, Collections, and universes"
description: "Learn how related titles form shelves and broader Collections while editions, file placement, and story relationships stay distinct."
audience: user
category: explanation
product_area: concepts
status: current
---

# Understand shelves, Collections, and universes

Learn how Tuvima Library groups related media in about four minutes. Start with a [shelf](../reference/glossary.md#shelf) in Read, Watch, or Listen, then explore broader connections when your library supports them.

## Find related titles in a lane

A book series belongs in Read, a movie series in Watch, and albums or audio series in Listen. Comics use volume and issue wording. TV shows have their own Watch scope, with only episodes you own.

Book, movie, and audiobook series normally need at least two distinct owned works to appear as series cards. A single title remains a normal item. TV shows can appear with one owned episode; music albums have their own grouping rules.

Local or provider metadata can establish a shelf even when Wikidata cannot resolve an identity. A useful lane group does not require a broader universe.

### How a Series is told apart, numbered and ordered

A Series is identified by its Wikidata Series plus its kind of media. The Expanse novels, the Expanse audiobooks and the Expanse TV show are three separate Series, never merged, even though they share a name. When there is no Wikidata identity, the Series falls back to the retail name for that kind of media.

Each Series shows its own numbering, and decimal positions are kept as the source gives them (1, 1.5, 2). Only the main sequence is numbered and counted in "x of y". Novellas, short fiction and other collected or companion works that Wikidata lists for the same world appear in a separate **Also in this world** row under the Series, never inside the numbered run. Works with no position stay in the Series after the numbered run, unnumbered.

The shelf, the item page and the apps all use the same order: Wikidata's position first, then the position the work carries itself, then its date, then its title. A work is placed in one Series by one rule, so reprocessing the library never moves a sibling to a different shelf. If Wikidata puts a work in the main sequence of two different Series and nothing tells them apart, the work waits in **Needs Review** instead of being guessed into one.

You can also choose the Series yourself. On a computer, open the item's editor and go to **Match & Identity**: the **Series override** block sits below the re-match controls and says that re-matching the item is the normal fix. It shows the Series the item is on, the Series that list it ("In the main run (#3)" or "Also in this world"), **Pick a different Series** (a search over any other Series of the same kind) and **Remove from its Series**. A Series you pick is saved with **Save override**, marked **Overridden by you**, and the Library keeps it every time it scans, refreshes or reorganises. **Go back to the Library's choice** gives it back.

## Understand broader Collections

Automatic Collections need trusted shared series, franchise, or universe evidence. They connect at least two distinct lower-level groups, or a trusted series containing distinct owned titles across multiple lanes.

Owning several Matrix films creates a Watch series shelf. It does not also create a top-level collection just to repeat that shelf. Related Middle-earth book and movie shelves can support a broader collection when trusted relationships connect them.

Several formats of the same work remain variants. An ebook and audiobook alone do not create a collection, nor do same-title formats become separate owned story installments.

## Find and read a Universe

A Universe is the larger world your Series belong to: Dune, Marvel, The Expanse. Three ways in, and the first is the one to remember:

- **The Universe icon on a title.** Any movie, show, season, book, audiobook, comic or album that belongs to a Universe shows a small galaxy at the top right of its page (on a phone, over the cover). Hover it and the galaxy spins and a small card names the Universe and how much of it you own; click it and the Universe page opens. A title with no Universe shows nothing, and the icon only appears once the Universe can really be opened, so it is never a dead link.
- **Collections.** The **Universes** row sits at the top of Collections, and the **Universes** group is also a filter.
- **Search**, by the Universe's name.

**Why the icon, and why one Series is enough.** A Universe page opens even when your Library holds only one Series of it. Someone who owns the John Wick films should still be able to see the world they belong to, with its cast and adaptations, without first owning a second Series. Collections is stricter on purpose: it lists a Universe only when you hold two or more Series of it, so it does not fill up with a "Universe" for every single book series. A Series that simply is its own Universe (nothing wider named it) gets no Universe page, because the page would only repeat the Series. The icon replaces the old small "Part of the … Universe" line, which was easy to miss and only appeared with two Series or two formats.

The Universe page shows its name and how much of it you own, then each Series in order with "Also in this world" underneath, any standalone works, and a Connections section listing the people who appear across formats and what was adapted from what. Every row there says where it came from (Wikidata, or an approved lore source such as a Fandom wiki), and choosing a person shows every Work you own that shares them. The Universe's characters are not repeated in Connections: they have their own rail above it, and each one has its own page (see below). Characters follow your **spoiler level** (Settings, Preferences, Playback, Spoilers; **Up to where I am** unless you choose **Everything**). With the default, a character first seen in a later episode than you have reached, or marked as a spoiler for something you have not finished, is held back, and the page says how many were hidden; one the Library cannot place (they appear only in something you have not started, or somewhere in a book or show with no episode to point to) is listed by name only, with "No plot details". The Library works out where a character first appears from the episodes you own, matched by Wikidata item and never by a name; books and audiobooks carry no chapter information from any source, so they are never narrowed to a chapter. A character you have met in any one title is shown, even when another title first sees them later. Entries you do not own can be shown as dashed "Not in library" placeholders in their place if you chose to see missing entries for that Series; otherwise only a quiet count is shown. While the Library is still learning about a Universe the page says so and shows how far it has got, rather than inventing connections. On a computer, Connections links to the explorer for paths between characters and the family tree.

## What a Universe holds besides its Works

Below the Series, a Universe page shows rails of picture tiles for everything the world contains: **Characters**, **Factions**, **Places**, **Events**, **Objects**, **Species** and **Concepts**. A rail appears only when it has something to show, and each tile says where it came from (Wikidata, a lore source such as a Fandom wiki, or you).

The spoiler rule that already protects Characters protects every kind. A Place or Faction you have not reached yet is left out and only counted ("3 more are held back to avoid spoilers"), and one the Library cannot place is listed by name only, with "No plot details". The reasoning: a Universe page should never tell you something the stories you own have not told you yet, whatever kind of thing it is.

Pictures come from the Library's own copies, never from a live link, so a tile loads quickly and works offline. Factions and Objects show their logo when they have one, on a plain tile so a wide logo is never cropped. A thing with no picture shows its first letter instead of a broken image.

**Concepts** (ideas such as a religion or a kind of magic) have no reliable structured source on Wikidata, so they appear only when an approved lore source describes them, or when you add one yourself. This keeps the page from filling with vague, unverifiable entries.

A **Timeline** strip appears when at least three things have a known date. It opens in story order when the stories give years, with a switch to release order; things with no story year come last. Fewer than three dated things would not make a useful line, so the strip stays hidden.

You can add things Wikidata does not know (marked **Added by you**), give any thing extra names, say which other thing it belongs to, or hide it. Your changes are kept separately from provider facts, so a refresh never overwrites them, and a thing you added is never replaced or removed by enrichment.

## A page for each thing

Choose any tile, or any stop on the Timeline, and that character, faction, place, event, object, species or concept opens on its own page. The page shows its picture or logo, its name and kind, a short description, the Works you own that it appears in, and the other things it is connected to.

- **Where the description comes from is always shown**: Wikidata, Fandom (only when you turned the Fandom Lore plugin on for this Universe and Wikidata has nothing to say), or your own wording. The reasoning: a Universe mixes facts from several places, and you should always be able to tell a sourced fact from something somebody typed.
- **Appears in** lists only Works you own and are allowed to see, earliest first, with the part the thing plays there when it is known. It never lists a Work you do not own, because the page describes your library, not a catalog.
- **Connections between things** are grouped under plain headings such as *Member of*, *Located in*, *Took place at*, *Who took part* and *Belongs to*. Every link reads both ways: if Paul is a member of House Atreides, the faction's page lists Paul under *Members*. The links come from facts the Library already stored from Wikidata and lore sources, plus the ones you set yourself. A connected thing you are not meant to know about yet is simply left out, so a link can never leak a spoiler.
- **A thing you have not reached yet** has no page at all (it is answered as not found), and one the Library cannot place shows its name and picture with "Hidden until you reach it" instead of a description or its Works. The page follows the same spoiler setting as the rails, so there is no side door around it.

On a computer, if your role allows it, **Edit** on a thing's page opens the same pop-over editor as everywhere else. Besides its name, description and other names, the Details tab has **Belongs to** (a faction, place or species of the same Universe; a character can belong to a faction, a faction to a place) and **On the Universe page** (Shown or Hidden). The list for *Belongs to* never offers a choice that would make two things belong to each other, so the links cannot go round in a circle. A hidden thing disappears from the rails, the Timeline and every connection list but is not deleted, and nothing is saved until you press Save changes and review it.

### What Wikidata can and cannot tell the Library

Characters, places and factions are well covered by Wikidata. Events and Objects are found through the links the Library already follows from characters and places (who took part in an event, what a thing is part of), and Species has its own list of properties to read once a species is known. Wikidata has no reliable way to say "this character is of that species", and it deliberately does not treat the biological parent-taxon property as one, so Species is often thin unless you turn on Fandom Lore or add them yourself. A thin rail is the Library being honest, not a failure to look.

### Open a Universe from a cover or your TV

The "..." menu on a cover in Home and on shelves has an **Open Universe** row whenever the title's Series belongs to a Universe whose page can open. On a TV, a title's page has a **Universe** button beside Play and Back, in the TV browser app and the Android TV app.

**Why it is there.** Covers are where most people browse, and the Universe icon only lives on a title's own page. Putting the same way in on the cover saves opening the title first, and the TV has no hover, so a plain button is the way to reach a Universe from the couch. All three use one rule: the Engine (the part of Library that holds your data and does the matching) decides whether a title has a Universe you can open, and the cover and the TV only show what it decided. So a cover offers the row only when the Engine found a Universe for that title that your profile can open, so a Kids or private profile is never shown a way into a Universe hidden from it, and a title without one shows nothing at all. A Series that is its own Universe gets no row, for the same reason it gets no Universe page: the page would only repeat the Series.

## Build your own collections separately

A custom collection can use manual membership or complete dynamic rules. Profile-owned collections are private unless supported sharing policy allows otherwise. Only administrators publish or manage library-wide collections.

Your collections appear in For Me. Accessible library collections enter My List only when you save them. Playlists stay in Listen and use their own queue/edit experience.

Collections also offers a Shelves index and a People list. The Shelves index covers eligible same-media book, movie, and audiobook series. It does not turn albums, TV shows, comic issue groups, or contributor lists into automatic top-level collections.

## Keep files, titles, and story facts distinct

A **work** is an underlying title. An **edition** is a particular release or format. A **media asset** is an actual file. One title can have several editions or files without becoming several story installments.

A **universe** describes a larger creative world. Its graph can connect characters, places, organizations, events, objects, and works. Those story facts do not silently move files or reorder your authored collections.

On a computer you can edit a Universe in the same editor as any other item, from **Edit** on its page: the editor's top row lists the Universe and its kinds (Characters, Places, Factions and the rest) as dropdowns with **Add** in each, so a character you own can get a portrait and a faction a logo. Your own edits win over the provider's facts, and the provider's value returns if you clear yours. The reason it is the same editor: one layout and one Review before saving, and later kinds slot in without a new screen. See [Correct an item](../guides/editing-items.md#edit-a-universe-its-characters-places-and-factions).

Applying a different provider match can propose a structural move. The editor previews the old and new paths before Apply. Confirming a universe relationship alone does not change shelf placement.

## Follow the evidence

Relationship surfaces show stored library data and grounded enrichment results. An unavailable graph shows its unavailable state rather than sample characters. Related recommendations need a reason such as a shared series or creator.

Owned counts describe your media. Missing entries may come from a provider manifest, but they are not files you own. Only authoritative totals support a completion target; comic issues use issue identity and owned count.

<details>
<summary>Technical details</summary>

The catalog model is `Library → optional Series → Work → Edition → MediaAsset`. The knowledge graph is `Universe → fictional entities ↔ qualified links to Works`. Authored containers keep user-owned canonical titles and explicit order; these are separate models.

Each Universe is one record tied to its Wikidata ID, and the same record backs both the Universe you browse and its Connections. A book, its audiobook and its TV adaptation land in one Universe as three Series when Wikidata links them: the works name the same fictional universe or franchise, or the show is based on the book Series. Where sources disagree, retail providers win for titles, descriptions and cover art, Wikidata wins for identity, Series membership and order, and a work in two Series keeps its own number in each. The optional Fandom lore plugin only adds facts and never moves a work.

Trusted Wikidata evidence can include P1434 (fictional universe), P8345 (franchise), P179 (series), P144 (based on), and P361 (part of). A shared label, author name, folder, or file format is not enough to merge identities or create a universe rollup. Broader collections require trusted shared relationship rows; local/provider shelf identities can support lane grouping without a QID.

Sequence placement uses `ordinal_sort`, immediate shelf identity, `sequence_total`, `sequence_total_scope`, and child identity keys. MainSequence members have positioned P179/direct P527 evidence. Supplementary covers P361 links; expanded P527 children are CollectedContent; explicit franchise expansion is BroaderContext. Unpositioned members lack ordinal or chain evidence beside a positioned run. Source ordinals, including decimals, retain their meaning rather than being densely renumbered.

Graph appearances can carry role, work context, anchor, narrative-time, date-range, and spoiler qualifiers. Real-world dates, fictional chronology, and editor History are different facts. Organization membership and event participation are distinct projections of qualified relationships.

Stage 2 establishes canonical identity; bounded Stage 3 enriches grounded entities and relationships. Enrichment does not silently realign structural placement or overwrite an authored container's title/order. Consumer Explore is read-only; authorized entity editing uses the shared editor.

Universe grouping lives in the data store and does not create a universe folder hierarchy. Internal `Collection` and `ParentCollection` records have several roles; do not translate every stored Collection into the same user-facing label. The surface determines whether the user sees a series, show, album, or broader collection.

Default series-card thresholds are configured through `lane_group_display.*.minimum_series_items`. Missing-item defaults live in `config/ui/library-preferences.json`; explicit profile/series overrides live in `profile_sequence_preferences` and can be removed to restore inheritance.

See [Universe Graph architecture](../architecture/universe-graph.md) and [the processing pipeline](../architecture/ingestion-identity-enrichment-pipeline.md) for the stored relationship model.

</details>

## Follow along on your phone

While something plays on a TV or another device on your profile, Home on your phone shows a **Now playing** card with a **Companion** button. The companion shows who is on screen up to where you are, where else you have met those characters in your own library, and what happened in the episode before. Reading a book or listening somewhere the Library cannot see? Open any title's ... menu, choose **Companion**, and pick the episode or chapter you are at. The small **Up to here / Everything** switch is the same spoiler setting as in Settings. When the Library has no character details for something, the companion says so rather than guessing.

## Next steps

- [Tour Collections and the media lanes](../guides/dashboard-tour.md)
- [Find your collections in For Me](../guides/for-me.md)
- [Correct a match or structural position](../guides/editing-items.md)
- [Look up product terms](../reference/glossary.md)
