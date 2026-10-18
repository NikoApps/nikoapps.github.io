import { getCollection, type CollectionEntry } from 'astro:content';

export type App = CollectionEntry<'apps'>;

export async function getApps(): Promise<App[]> {
  const apps = await getCollection('apps');
  return apps.sort((a, b) => a.data.order - b.data.order);
}

// Planned apps are listed on the home page but have no detail page yet.
export function hasPage(app: App): boolean {
  return app.data.status !== 'planned';
}

export const statusLabel: Record<App['data']['status'], string> = {
  planned: 'Planned',
  test: 'Test release',
  released: 'Released',
};
