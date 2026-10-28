import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

type Entry = { type: 'link'; href: string; label: string; isCurrent: boolean; attrs: Record<string, unknown> } | { type: 'group'; label: string; entries: Entry[]; collapsed: boolean; badge?: unknown };

function links(entries: Entry[]): Extract<Entry, { type: 'link' }>[] {
  return entries.flatMap(entry => (entry.type === 'link' ? [entry] : links(entry.entries)));
}
function containsCurrent(entry: Entry): boolean {
  return entry.type === 'link' ? entry.isCurrent : entry.entries.some(containsCurrent);
}

// The configured sidebar holds every item's groups. Show only the group the reader is in,
// so a Library page never lists Tuvima.Wikidata's menu, and keep previous/next inside it.
export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const group = (route.sidebar as Entry[]).find(containsCurrent);
  if (!group || group.type !== 'group') {
    route.sidebar = [];
    route.pagination = { prev: undefined, next: undefined };
    return;
  }
  route.sidebar = group.entries as typeof route.sidebar;
  const flat = links(group.entries);
  const index = flat.findIndex(link => link.isCurrent);
  const only = (link?: (typeof flat)[number]) => (link ? { ...link, type: 'link' as const } : undefined);
  route.pagination = { prev: only(flat[index - 1]) as never, next: only(flat[index + 1]) as never };
});
