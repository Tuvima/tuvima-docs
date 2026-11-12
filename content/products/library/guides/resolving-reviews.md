---
title: "Resolve review items"
description: "Clear Needs Review quickly: confirm a match, pick between answers, try again, keep an item as it is, or open the editor."
audience: user
category: guide
product_area: review
status: current
---

# Resolve review items

Use [Needs Review](../reference/glossary.md#needs-review) in Tuvima Library when an item needs your help. Most items take one click. The list is built so you can see at a glance what only needs a yes, what needs a choice, and what needs real work.

Only server administrators can see and resolve Needs Review. Household administrators and Kids profiles do not see the Needs Review menu entry, its count, or the list. Apps that a server administrator has given review permission can also list and resolve items.

## Open the list

Open the account menu and choose **Needs Review**, or open **Settings**, then **Libraries**, then the **Needs Review** tab. The page works the same on a computer, a tablet and a phone.

The list is sorted into four groups, in the order that is quickest to clear:

| Group | What it holds | What you usually do |
|---|---|---|
| **Ready to confirm** | Library found one answer and wants a yes. | **Use this** |
| **Choose a match** | Library found two or three answers that fit. | Pick one in the row |
| **No match found** | Library looked and found nothing it trusts. | **Fix**, **Try again** or **Keep as it is** |
| **File problems** | The file could not be read or written. | Fix the cause, then **Try again** |

Why groups: a long flat list hides the easy items among the hard ones. Putting the one-click items first lets you clear most of the list in a minute and leaves a short list that needs thought.

Each row shows the file's own cover when it has one, its title, the library it is in, and one plain sentence that says what is wrong, such as "Two films share this title" or "The file's details could not be saved because the file is read-only". Files of the same show, album or book series are folded into one row; open it to see each file.

## Settle an item in the row

- **Use this** accepts the answer Library found. The row turns into a line such as "Dune matched to Dune (2021)" and the counts drop at once. That line stays until you leave the page, so you can see what you did.
- **Choices in the row.** When more than one answer fits, each is shown with its picture, name and one line of detail, and its own **Use this** button. A film that looks like a TV title offers **Move to TV** and **Keep** instead. Picking an answer here does the same thing as saving that match in the editor, and never moves the item to a different show, album or series by itself.
- **Try again** looks the file up again now, or retries saving its details after you have fixed the cause.
- **Keep as it is** tells Library to stop asking about this item. It leaves the list and nothing about the file changes.
- **Fix** opens the item in the editor on its Match tab, where you can search for a match or correct its details. Use it when none of the offered answers is right.
- **Show in Activity** and **Delete** are in the row's "..." menu. Delete asks once.

If an action does not work, the reason shows under that row and the row stays where it is. If the list itself cannot load, you see an error with **Try again** rather than an empty list.

Fix, Delete and editing several items need a device that can open the editor. Until the editor is available on phones, a phone shows every other action and leaves those three out.

## Work on several items at once

Tick the box on a row, a folded row or a group heading. On a phone, choose **Select** in a row's "..." menu first. A bar appears at the bottom with the number ticked and the actions that fit them: **Use suggestions**, **Keep as they are**, **Try again**, **Edit** and **Delete**.

The bar only ever acts on the rows you ticked. **Use suggestions** says how many items it will change and asks once, and it skips any ticked row that does not have exactly one suggestion. A wrong match accepted this way can still be corrected from the item's own page.

## Bring back items you kept

Items you kept are hidden, not gone. A line at the bottom of the list says how many are hidden. Choose **Show them** to see them, and **Put back** on any one to return it to its group. This is there so that Keep as it is is never a one-way door.

## What is not in the list

An item that is fully usable but has no Wikidata entry yet is not shown. Library keeps looking for one in the background, and there is nothing for you to decide. Background work, provider waits and retries stay in Operations until they need your help.

## Edit normal mistakes on the item

If you find a wrong title, cover, note, or match while browsing, open **Edit** there. This works for albums, episodes, books, comics, and movies where supported. You do not need to create a review item first.

Needs Review is for decisions you can act on. Background work, provider waits, and retries stay in Operations until they need your help. A missing Wikidata ID alone need not keep a ready item out of browse.

<details>
<summary>Technical details</summary>

Review and normal edits share one media editor. Every action on this page (use this, choose, try again, keep, put back, move to TV, delete) calls the Engine, which checks that the person is a server administrator (or the app has review permission) and works out the groups, the folded rows and the choices itself. The Dashboard only draws what the Engine returns, so a paired app sees the same list. A local Dashboard flag does not replace saved job state. See the [review actions](../reference/api-endpoints.md) in the Engine reference.

See [inline editing](../architecture/inline-media-editing.md) and [file intake](../explanation/how-ingestion-works.md) for save and browse-readiness rules.

</details>

## Next steps

- [Correct an item from its detail page](editing-items.md)
- [Check Operations and provider health](library-settings.md)
- [Understand matching and enrichment](../explanation/how-hydration-works.md)
