/**
 * Sitemap is generated via the next-sitemap plugin. For more options see:
 * https://www.npmjs.com/package/next-sitemap
 */

module.exports = {
  // Falls back to the production domain — see the matching note in
  // theme.config.js. Set NEXT_PUBLIC_SITE_URL in the hosting provider so
  // this (and canonical/OG URLs) is never silently wrong.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    'https://usamadev.company',
  generateRobotsTxt: true,
  // /X/page/1 is always identical to /X (page 1 of a 1-page list, in
  // practice) — see the matching canonical-URL fix in components/Seo.jsx.
  exclude: ['/api', '/api/*', '/404', '/500', '/not-found', '**/page/1'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Homepage gets top priority; blog/project detail pages get a slight
    // boost over generic pages.
    let priority = config.priority
    if (path === '/') priority = 1.0
    else if (path.startsWith('/blog/') || path.startsWith('/projects/')) priority = 0.8

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
