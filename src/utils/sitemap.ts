import { siteConfig } from '../templates/layout.js';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

export function generateSitemap(urls: SitemapUrl[]): string {
  const urlTags = urls
    .map((item) => {
      return `  <url>
    <loc>${item.loc.startsWith('http') ? item.loc : `${siteConfig.url}${item.loc}`}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
    ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ''}
    ${item.priority !== undefined ? `<priority>${item.priority.toFixed(1)}</priority>` : ''}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;
}
