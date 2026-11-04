import routes from '../.generated/routes.json';

export type Item = { area: string; id: string; name: string; icon?: string; logo?: string; wordmark?: string; description: string; path: string; status: string; startPage?: string; bar?: boolean; groups: string[] };
export type PageRecord = { slug: string; route: string; title: string; item?: string; group?: string; section?: string; generated?: boolean; area?: string };
const catalog = routes.catalog as { areas: { id: string; name: string; path: string }[]; items: Item[] };
const pages = routes.pages as PageRecord[];
const withBar = catalog.items.filter(item => item.bar !== false);

export function itemStart(item: Item): string {
  return `${routes.base}/${item.path}/${item.startPage ? `${item.startPage}/` : ''}`;
}
/** Where a reader is: the page record, its item, its area, and the item's groups with their first page. */
export function hubContext(pathname: string) {
  const route = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const record = pages.find(page => page.route === route || page.route === pathname);
  const item = catalog.items.find(i => i.id === record?.item);
  const area = catalog.areas.find(a => a.id === (item?.area ?? record?.area));
  const home = `${routes.base}/`;
  const groups = (item?.groups ?? []).map(name => {
    const first = pages.find(page => page.item === item?.id && page.group === name);
    return first ? { name, href: first.route, current: record?.group === name } : undefined;
  }).filter((group): group is NonNullable<typeof group> => Boolean(group));
  const landing = item && pages.find(page => page.slug === item.path);
  const crumbs: { label: string; href?: string }[] = [];
  if (record && record.slug !== '' && record.slug !== '404') {
    crumbs.push({ label: 'Tuvima', href: home });
    if (area) crumbs.push({ label: area.name, href: `${routes.base}/${area.path}/` });
    if (item && item.bar !== false) crumbs.push({ label: item.name, href: landing?.route ?? itemStart(item) });
    if (item && item.bar !== false && record.group) crumbs.push({ label: record.group, href: groups.find(group => group.current)?.href });
    if (record.slug !== area?.path && record.slug !== item?.path) crumbs.push({ label: record.title });
  }
  return {
    base: routes.base, home, record, item: item?.bar === false ? undefined : item, area, groups, crumbs,
    areas: catalog.areas.map(a => ({ ...a, href: `${routes.base}/${a.path}/`, current: a.id === area?.id })),
    switcher: withBar.map(i => ({ id: i.id, name: i.name, areaName: catalog.areas.find(a => a.id === i.area)?.name ?? '', href: `${routes.base}/${i.path}/`, current: i.id === item?.id })),
  };
}
