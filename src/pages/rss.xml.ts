// RSS feed of app releases. Each app's current version is one item, so a new
// version shows up in feed readers as a new post.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getApps, hasPage, statusLabel } from '../lib/apps';

export async function GET(context: APIContext) {
  const apps = (await getApps()).filter(hasPage);
  return rss({
    title: 'Niko app releases',
    description: 'New versions of Niko apps: simple, free Android apps that anyone can use.',
    site: context.site!,
    items: apps.map((app) => {
      const { name, version, status, released, tagline, changes = [] } = app.data;
      const list = changes.map((change) => `<li>${change}</li>`).join('');
      return {
        title: `${name} ${version}`,
        link: `/${app.id}/`,
        pubDate: released,
        description: `${statusLabel[status]}. ${tagline}`,
        content: list ? `<p>${tagline}</p><ul>${list}</ul>` : undefined,
        customData: `<guid isPermaLink="false">${app.id}-${version}</guid>`,
      };
    }),
    customData: '<language>en</language>',
  });
}
