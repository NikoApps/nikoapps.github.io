// Structured data (schema.org JSON-LD) shared by pages. BaseLayout adds the
// organization to every page; pages pass anything else through jsonLd.
import type { App } from './apps';

const site = 'https://nikoapps.github.io';

export const organization = {
  '@type': 'Organization',
  '@id': `${site}/#organization`,
  name: 'Niko',
  url: `${site}/`,
  logo: `${site}/assets/icon-192.png`,
  email: 'hello@gopalkhadka.com.np',
  sameAs: ['https://github.com/NikoApps'],
};

export const website = {
  '@type': 'WebSite',
  '@id': `${site}/#website`,
  name: 'Niko',
  url: `${site}/`,
  inLanguage: 'en',
  publisher: { '@id': organization['@id'] },
};

export function appSchema(app: App) {
  const { name, description, version, minAndroid, download, released } = app.data;
  return {
    '@type': 'MobileApplication',
    '@id': `${site}/${app.id}/#app`,
    name,
    description,
    url: `${site}/${app.id}/`,
    image: `${site}/assets/icons/${app.data.icon}.svg`,
    operatingSystem: 'Android',
    softwareRequirements: `Android ${minAndroid} or newer`,
    applicationCategory: 'UtilitiesApplication',
    softwareVersion: version,
    datePublished: released?.toISOString().slice(0, 10),
    downloadUrl: download,
    installUrl: download,
    isAccessibleForFree: true,
    license: 'https://www.gnu.org/licenses/gpl-3.0.html',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': organization['@id'] },
  };
}
