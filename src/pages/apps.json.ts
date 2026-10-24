// apps.json: every app's current facts as JSON, for other sites that list Niko
// apps (such as the maker's portfolio). Built from the apps collection, so it
// changes with each deploy and never needs editing by hand.
import type { APIContext } from 'astro';
import { getApps, hasPage } from '../lib/apps';

export async function GET(context: APIContext) {
  const url = (path: string) => new URL(path, context.site).href;
  const apps = (await getApps()).map((app) => {
    const { name, order, status, summary, icon, version, released, minAndroid, download, source } = app.data;
    return {
      id: app.id,
      name,
      order,
      status,
      summary,
      icon: url(`/assets/icons/${icon}.svg`),
      // Planned apps have no page or release yet, so these are left out.
      ...(hasPage(app) && {
        url: url(`/${app.id}/`),
        version,
        released: released?.toISOString().slice(0, 10),
        minAndroid,
        download,
        source,
      }),
    };
  });

  const body = { site: url('/'), updated: new Date().toISOString(), apps };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
