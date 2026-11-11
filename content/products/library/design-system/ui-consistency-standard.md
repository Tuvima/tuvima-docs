---
title: "UI Consistency Standard"
description: "The Dashboard design rules: color roles, type, icons, rows, windows, tooltips, alignment, and how each is enforced."
audience: "designer"
category: "reference"
product_area: "dashboard"
status: current
---

# UI Consistency Standard

## In this page

Apply the shared Dashboard rules for color, type, icons, rows, windows, buttons, tooltips and alignment when designing or reviewing a screen. Exceptions must preserve the same intent and remain explicit. Each rule says what the app does and why, so a new screen feels like the same product as every other screen. `/design-system/components` in the running Dashboard shows every token and every state of every shared part.

## Where this lives in the code

- `src/MediaEngine.Web/Components/Shared`
- `src/MediaEngine.Web/wwwroot/tuvima.tokens.css`
- `src/MediaEngine.Web/wwwroot/native-fields.css`
- `tests/MediaEngine.Web.Tests/UiConsistencyGuardrailTests.cs`
- `engineering/design/design-system.md` (the developer reference, kept in step with the token file by a test)

Date: 2026-11-07

## Button hierarchy

Every Dashboard action uses `AppButton` or `AppIconButton`. Pages express intent with app-owned `ButtonStyle`, `Tone`, and `AppControlSize` values; the wrappers expose first-party contracts and render native elements.

- Primary commit or start action: `Filled` + `Primary`. Examples: Save, Create, Continue.
- Secondary action: `Outlined`, normally `Neutral` or `Primary`. Examples: Test connection, Edit, Set up manually.
- Tertiary or low-emphasis action: `Text`, normally `Neutral` or `Primary`. Examples: Learn more, View all, Cancel in a lightweight context.
- Destructive entry action: `Outlined` + `Error`.
- Confirmed destructive action: `Filled` + `Error`.
- Warning is reserved for a risky but non-destructive action. Success and Info communicate state; they are not alternate brand colors.

Icon buttons are one shared part with five looks: outlined (the default, on surfaces), text (no border), filled (primary and the Like state), over-artwork (a soft dark scrim for covers and heroes) and soft. They come in 36, 44 and 48px sizes and always carry a tooltip and an accessible name. The hero's one main action (Play, Watch, Resume, Read, Listen) is a wide, light button that reads over any artwork, with the companions (My List, Like, Edit, More, and Open for a folder of videos) as text icon buttons beside it.

Use only one filled primary action in an action region. A page may contain multiple independent cards, dialogs, or forms, each with its own primary action. Loading actions retain their label, show a spinner, expose `aria-busy`, and cannot be clicked again.


## Color roles

The Dashboard is dark only. Surfaces are neutral near-black grays, not blue or violet: the page, the navigation and rail, cards, a raised step, a hover step and the elevated surface used by menus and tooltips. Every background in the Dashboard is one of these surface tokens.

- Purple (`--tl-accent-primary`) is the one accent. It appears only as: the selected item (navigation row, tab underline, chip, menu row), the primary button, a switch that is on, progress, the focus ring and the Like state. Text and icons that need the accent use the lighter hover purple.
- Menus and dropdowns are neutral: the elevated surface, a hairline border, a neutral hover wash, a purple wash only on the selected row, and neutral icons. A menu never has a purple border.
- Area colors (Watch rose, Listen amber, Read blue, View teal, Vault gold) appear only in chips, icon tiles and area labels. Status colors (success green, info blue, warning amber, danger red) appear only on status. Green means healthy or done and nothing else.
- Icons ask for a tone (neutral, accent, info, success, warning, danger, an area or a media type), never a color.

Why: a color should tell you something. When purple, green or amber turn up as decoration, they stop meaning "selected", "healthy" or "needs attention". Keeping every background neutral also lets artwork be the only colorful thing on a page. An automated check fails a component style that types its own hex or `rgb()` color outside a short, named list (charts, subtitle swatches, the map, avatars).

## Typography

- Interface: `--font-ui` (Inter, shipped with the app, then the system UI font) for every piece of interface text. Why: the Dashboard looks the same on Windows, Mac, phones and TVs, because the font comes with the app instead of depending on the device.
- Brand: `--font-brand` (Tuvima Sans), used for the wordmark and top navigation only, never for other interface text. The wordmark is the only uppercase text in the app.
- Reader: `--font-reader` (Merriweather), scoped to long-form reading and its preview.
- Technical values: `--tl-font-mono` (JetBrains Mono with system monospace fallbacks), used for paths, URLs, identifiers, and code.

The type ladder has seven named steps. A screen picks a step; it does not type its own number.

| Step | Size | Used for |
|---|---|---|
| Caption | 12px | Captions, compact metadata |
| Secondary | 13px | Helper lines, form labels, tooltips |
| Body | 14px | Body copy |
| Controls | 16px | Controls, menus, rows |
| Section | 20px | Section and shelf titles, window titles |
| Page title | 24px (28px at 1180px and wider) | Page titles |
| Hero | 32px | Hero titles |

Weights are 400 for body text, 500 for labels, menu rows and chips, 600 for group headings and card and row titles, and 700 for page and hero titles only. Line heights are 1.2, 1.3 and 1.5. Why: nearly three hundred slightly different sizes made neighboring screens look almost, but not quite, the same.

Do not use a smaller font to solve layout pressure. Shorten copy, allow wrapping, widen the region, or change the information density instead.

### Control typography

Buttons, segmented controls, tabs, and other shared action controls use the interface font and one consistent semibold weight. Visual priority comes from fill, border, and color, not heavier label text.

- Font weight: `--tl-control-font-weight` (600) for primary, secondary, tertiary, selected, and unselected labels alike.
- Compact size: `--tl-control-font-size-sm` (13px).
- Normal size: `--tl-control-font-size-md` (14px).
- Line height: `--tl-control-line-height` (1.25).
- Letter spacing: `--tl-control-letter-spacing` (0).

Do not use 700 weight, all caps, or extra tracking to make a button primary or a segmented option selected.

## Icons

Icons come in one ladder of six sizes: 16 (inline and in chips), 20 (inside 36px controls), 24 (inside 44px and 48px controls, menus, rail rows and list rows), 32 (dialog and card icon tiles), 48 (choice tiles) and 64 (empty states and the hero of a setup step). Nothing else sizes an icon.

There are two placements. Above text, a choice tile puts a 48px icon on a soft tinted square (the area color at 14% for area tiles, neutral otherwise) with the name under it. Beside text, in a row or button, the icon leads, sits on the first line of text and is neutral gray unless the row is selected or carries a tone. Icons never sit to the right of their label except a trailing chevron or a "..." in a row. Why: people find the same kind of thing in the same place on every screen, and one size ladder means an icon never looks borrowed from another app.

## Rows, heights and alignment

Row heights come from a ladder: 44px for menu, rail and toolbar rows, 56px for settings and list rows, and 64px for rows that carry a picture. Controls are 36, 44 or 48px tall. The rules that keep a screen tidy:

- Every row is one line with its label, helper and control centered on the same axis. A label may wrap only in a settings or list row; in a toolbar or button row it is shortened with an ellipsis and the full text appears in a tooltip.
- A form field's label sits above the field, never beside it or inside it, and helper text sits under it. A settings or list row is the other shape: label and helper on the left, the control at the right end. The two shapes never mix in one group.
- Text is left-aligned, except numbers and durations (right-aligned, with tabular numerals) and choice tiles (centered).
- A toolbar holds one group on the left and one on the right. When it needs more than three actions, the rest go in a "..." menu.
- Text that belongs to a control, such as "Saved" or "Key is invalid", never sits above or below the control inside its column. It gets its own full-width line directly under the row, and that line is reserved so nothing jumps when it appears.

Why: when every label and control share one centre line, the eye can scan down a column without hunting, and a result message appearing never pushes the thing you were about to click.

## Windows

Everything that floats over the page is one of four kinds, each a single shared part:

- **Window:** centered, with a dimmed page behind it. Three widths: 480px for a confirmation or short form, 640px for a form or picker, 900px for a workspace such as the editor. It has a title, an optional one-line description, a close button, a body and a footer.
- **Sheet:** the Window on phones. Under 600px every Window slides up from the bottom, with rounded top corners and a handle.
- **Pop-out:** anchored to its control with no dimming, closed by pressing elsewhere or Escape. Menus are 272px wide with 44px rows; Panels are 400px wide and hold tools such as the player's speed, audio, subtitles and queue.
- **Viewer:** full screen, for the reader, photos, documents, search and the details overlay.

In a footer, buttons sit in one row at the right: a quiet text button first, then a destructive button (outlined red), then Cancel or Discard, then the one primary button last. On phones they stack full width with the primary first. Why: people learn where "keep" and "delete" are once, and pressing Enter or Escape never destroys anything by accident.

## Tooltips

A tooltip appears only when it adds information: the control is icon-only, the control is disabled and the tooltip says why, or the text is cut off and the tooltip shows it in full. A control with a visible label never repeats it in a tooltip, and list and menu rows do not have tooltips. A tooltip hides when its control leaves the page, on any press, when a menu or dialog opens, and after four seconds with a mouse. Why: about three hundred tooltips said what the label already said, and a few stayed stuck on screen.

## Feedback after an action

Library has no pop-up notices. What you did is confirmed where you did it, so your eye never has to leave the thing that changed and nothing covers the page.

| What happened | What you see |
| --- | --- |
| A change you made worked, and the changed thing is on screen | That row, card or cover glows once |
| A change worked and there is no single row to point at, such as a settings form | A quiet "Saved" line beside the Save button, which fades by itself |
| The control already shows the new state, such as a switch or a tick | Nothing more: the new state is the confirmation |
| Something failed | A message in place, at the top of the window or section, that stays until you act |
| Something finished in the background, such as a scan | The Activity indicator at the top right |
| You marked something watched, read or listened | A short line with Undo, right there, for about ten seconds |
| Something in the background failed | The Activity indicator turns amber and says "Needs attention" until you open Activity (administrators only) |
| Something was copied | The button itself says "Copied" for a moment |
| A quick action on photos, documents or galleries | The slim ribbon at the top of the View page |

**Why it works this way.** A notice that pops up in a corner is easy to miss, covers what you are doing, and disappears before you can read a failure. Keeping the answer beside the action means a failure stays visible until it is dealt with, and a success never interrupts.

## Intentional exceptions

The October 5 shared-control family is `AppSelect` (with typed/native/int/media-type adapters), `AppTooltip`, `AppRangeSlider`, `AppProgressBar`, and `AppSpinner`. Use explicit intrinsic selector sizing for bounded series/set selectors; forms retain full-width fields. Tooltip help supports hover, keyboard focus, Escape, and optional touch long-press without replacing accessible labels. Lyrics and Queue player modes use glyphs with tooltips, without visible label spans. See [the player/control verification report](../../engineering/reports/player-controls-2026-10-05.md) for acceptance evidence and remaining device checks.

- Playback controls use the shared purple playback token family and existing player surfaces.
- Semantic warning, error, success, and information states keep their token colors.
- Provider logos and media artwork keep source/brand color.
- The EPUB reading surface uses Merriweather for content, while its controls remain in the interface font.

## Inventory snapshot

The 2026-09-12 source inventory found 368 `AppButton`, 67 `AppIconButton`, 67 `AppSelect`, 98 `AppTextField`, and 284 `AppNativeButton` usages. The button migration removed all legacy `Variant` and `Color` attributes from shared button call sites. The typography pass replaced 300 sub-12px declarations with the shared caption floor.

`/design-system/components` is the visual reference for hierarchy, tones, loading/disabled states, typography roles, and shared controls. `UiConsistencyGuardrailTests` prevents legacy button APIs, raw page-level button primitives, and sub-floor text sizes from returning.

## CSS ownership and removal

Keep presentation rules with the component that owns the rendered elements. Moving scoped CSS requires reviewing the emitted scope and descendant/portal behavior; splitting files alone does not reduce delivered styling. Use `scripts/css/audit.py` for conservative duplicate and retired-selector evidence, then compare affected desktop and phone states. Different-value browser fallbacks, conditional states, and active vendor overrides remain unless their replacement is proven. The [October 5 cleanup report](../../engineering/reports/css-cleanup-2026-10-05.md) records the current measurements and remaining ownership work.

## CSS ownership and verification

Place native-element rules beside the component that emits that element. Inspect compiled isolation selectors and actual DOM attributes for C# renderers, render fragments and shared controls. Keep documented contextual `::deep` boundaries for shared native-control internals; keep portal bridges global when popups leave the scoped ancestor. A rule that formerly did not match must not start matching just because ownership changes. Preserve specificity, media conditions and source-order winners.

Isolated CSS is capped at 2,000 lines per owner. Extract cohesive existing markup with explicit presentation inputs when an owner is too large; CSS-only shards, wrappers, formatting compression and shared scope IDs do not satisfy this standard. No new `!important` is permitted. Retained overrides move through balanced budgets, and removals require a proven ordinary winner and desktop/phone comparisons. Tokens, vendor CSS, reader CSS and parser-unsupported files require their own explicitly scoped work.

The [Dashboard ownership evidence](../../engineering/reports/css-ownership-2026-10-06.md) records measurements and acceptance. Use `scripts/css/audit.py`, `StyleOwnershipGuardrailTests`, and the documented CUA capture/offline comparison workflow. Record unsupported hover, high-density and device coverage; do not silently count them as passing checks.

## Native primitive ownership

`Components/Shared/App*` owns native controls, layout atoms, typography, alerts,
tables, tabs, expansion panels and SVG charts. Native enum contracts live in
`AppLegacyUiTypes.cs`; new page APIs should prefer intent-level `AppUiTone`,
`AppButtonStyle` and `AppControlSize`. `AppTabs` preserves controlled active-index
and keep-alive behavior, with tab/panel roles and keyboard selection. Expansion
panels preserve controlled state and single/multiple expansion. Existing data
and playback ownership stays in its established services.

The pinned `AppMaterialIcons` catalog uses the original 24-unit SVG view box.
`AppMaterialIcon` owns 1.25/1.5/2.25rem glyph sizing and tone classes; peer action
rows retain their shared targets and icon-family rules. Regenerate from
`scripts/icons/material-icon-paths.json` with the checked-in generator, keeping
third-party attribution. Checkboxes keep one labeled native input for checked,
disabled, read-only and keyboard behavior; a decorative pinned Material
glyph shows the controlled value inside the original 42px target. Checkbox rows
retain their 48px minimum height. Typography/layout classes are owned by
`native-structure.css`, and the used spacing/display utility subset by
`native-utilities.css`. Do not introduce a second control styling system.

Release minification is a build transform, not a source-editing step. Review the
rendered desktop/phone geometry and states using the exported CSS ownership
capture/keyboard helpers. Legacy captures retain strict coverage; reviewed
semantic target mappings may change locator spelling while preserving counts,
geometry, styles, pseudo-elements and control state. Paired screenshot review
remains required and separate from computed-style comparison.

## October 6 shared-control corrections

Detail hero Rate, My List, Shuffle and More circles use PlaybackUtilityGlyph: a 24-unit view box, 1.5-unit outline stroke, 24px rendered glyph and 56px target. Existing song actions keep their separate 22px/44px size role. My List in the global app bar uses the original ringed-planet icon with its existing accessible name and tooltip.

AppChoiceRow is the single-choice row (a title, an optional second line, a radio mark): it renders its own button, owns its styling with no deep rules from the page, reports `aria-pressed` as the text `true` or `false`, marks the selected row with the accent border and uses the shared focus-ring tokens for keyboard focus. AppSwitchRow keeps row ownership; native-fields.css owns the switch track and thumb. Small/medium/large geometry uses tracks 30×10, 34×14 and 38×18, thumbs 14, 20 and 26px, and 20px travel. Thumb elevation and checked accent remain shared; disabled switches use neutral track/thumb treatment. Validate on/off/focus/disabled states at the intended viewport rather than inferring appearance from source.

Video volume appears as a 100px overlay beside Mute without moving peer controls. Video speed is intrinsic and heading-free. Info uses a pressed state with accent and a filled background. Continue progress can brighten and grow by 2px on hover/focus without moving the artwork; reduced motion disables that transition.

## Look pass rules, and why

These rules came from the look passes (November 2026). Each one says what the app does and the reason.

- **One dialog.** A dialog has a bold title, a close button, a short body and its buttons on the right. The safe choice is filled purple, sits last and has the focus. A destructive choice is outlined red and sits to its left. Why: people learn where "keep" and "delete" are once.
- **One menu.** Rows are 44 pixels tall with 16 pixel text, 24 pixel icons and one shared width. Why: the "..." menu is used on every tile, so a cramped row would be felt everywhere, and touch targets stay comfortable.
- **Three button heights.** 36 pixels for dense desktop rows, 44 for standard touch-safe buttons, 48 for large controls. The hero button is taller still. Resume shows progress as a thin bar along the bottom edge of the button. Why: the main action on a page should look like the main action.
- **Square corners on chips and icon buttons.** Round shapes are kept for avatars, switches, progress and seek bars and the player dock. Why: round pills next to square controls looked unfinished, and one corner rule is easier to keep.
- **One chip.** Labels such as "Kids", "Smart" or "Not matched" are one chip shape with square 3 pixel corners; an automated check caps how often fully round corners appear.
- **Tiles are one size.** Posters, squares and landscape tiles each have one size app-wide, with no size control. The "..." button on a tile is always visible. Why: a hidden button is invisible to touch screens and easy to miss with a mouse, and the menu is where Like, Details and Remove live.
- **Settings is rows, not cards.** Each settings page is a list of groups, and each group is rows with the control at the right end. Cards are kept for objects such as a backup destination, a connected device or a plugin, and for the danger group. Why: a wall of bordered cards made every page look equally important.
- **Destructive is said, not guessed.** A confirmation that removes or discards something is marked as destructive by the screen that asks, which turns its main button outlined red and moves focus to the safe choice. Why: guessing from the button's wording broke the moment a button was renamed or translated.
- **Shared buttons, fields and menus.** Plain buttons, text fields and drop-downs use the app's shared parts instead of raw browser controls. Playback controls, the book reader, tiles and toggle controls stay as they are. Why: one place to change a button's height, focus ring or hover changes every screen.
- **Central control.** All of these values live in the token file and the shared parts, and automated checks fail the build if a screen uses a shape, size or color of its own, or if the developer reference for the design system lists a value that differs from the token file. Why: changing one value changes every screen, and nobody can drift away from the rules by accident.
