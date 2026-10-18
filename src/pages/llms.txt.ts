// llms.txt (https://llmstxt.org): a short Markdown summary of the site for AI
// assistants, built from the apps collection so it stays current.
import type { APIContext } from 'astro';
import { getApps, hasPage, statusLabel } from '../lib/apps';

export async function GET(context: APIContext) {
  const url = (path: string) => new URL(path, context.site).href;
  const apps = await getApps();
  const available = apps.filter(hasPage);
  const planned = apps.filter((app) => !hasPage(app));

  const text = `# Niko

> Simple, free Android apps that anyone can use, made for people who can't read, older people and disabled people. Each app does one job, speaks out loud in the phone's own voice and works offline. No ads, no tracking, no accounts, no internet permission.

Niko is a one-person side project made in Nepal. Apps are installed from GitHub releases for now. Google Play and F-Droid are planned for later. Every app is open source under GPLv3 when released.

## Apps

${available.map((app) => `- [${app.data.name}](${url(`/${app.id}/`)}): ${app.data.description} ${statusLabel[app.data.status]}, version ${app.data.version}, Android ${app.data.minAndroid} or newer.`).join('\n')}

## Help

- [Install help](${url('/install/')}): installing an APK from GitHub, updates with Obtainium, and keeping apps running on phones that stop them to save battery.
- [Privacy](${url('/privacy/')}): Niko apps collect nothing. Each app's page lists its permissions and why.
- [Accessibility](${url('/accessibility/')}): how the apps are built and tested, and what hasn't been tested yet.
- [About](${url('/about/')}): who makes Niko, how to help, contact.

## Optional

${planned.map((app) => `- ${app.data.name} (planned): ${app.data.summary}`).join('\n')}
- [Release feed](${url('/rss.xml')})
- [Source code](https://github.com/NikoApps)
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
