import { siteMetaData, social } from '../theme.config'

const humanize = (segment) =>
  segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const profileUrl = (name) => social.find((item) => item.name === name)?.url

/**
 * Person schema for Usama Bin Nadeem. Only fields that are actually present
 * in theme.config.js / the site's own content — never invented.
 */
export function getPersonSchema() {
  const sameAs = [profileUrl('GitHub'), profileUrl('LinkedIn')].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetaData.authorName,
    url: siteMetaData.siteUrl,
    image: `${siteMetaData.siteUrl}/hero.jpg`,
    jobTitle: 'Software Engineer',
    description: siteMetaData.description,
    email: `mailto:${siteMetaData.email}`,
    ...(sameAs.length && { sameAs }),
    knowsAbout: [
      'Python',
      'Backend Development',
      'FastAPI',
      'Django',
      'Flask',
      'REST APIs',
      'PostgreSQL',
      'MySQL',
      'SQLAlchemy',
      'Docker',
      'Artificial Intelligence',
      'Machine Learning',
      'Automation',
      'Web Scraping',
    ],
  }
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetaData.siteName,
    url: siteMetaData.siteUrl,
    description: siteMetaData.description,
    author: { '@type': 'Person', name: siteMetaData.authorName },
  }
}

/**
 * BreadcrumbList derived from the URL path. The last crumb uses the page's
 * own title; intermediate segments are humanized from the URL slug.
 *
 * Blog posts live at /blog/<tag-folder>/<slug>, but /blog/<tag-folder> on
 * its own isn't a real route — only /tags/<tag-folder> is — so that one
 * case is special-cased to avoid linking a breadcrumb to a 404.
 */
export function getBreadcrumbSchema(path, pageTitle) {
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) return null

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteMetaData.siteUrl + '/',
    },
  ]

  const isBlogPostPath = segments[0] === 'blog' && segments.length === 3

  let acc = ''
  segments.forEach((segment, i) => {
    if (segment === 'page') return // pagination segments aren't real crumbs
    const isLast = i === segments.length - 1
    const isBlogTagSegment = isBlogPostPath && i === 1

    acc += `/${segment}`
    const linkPath = isBlogTagSegment ? `/tags/${segment}` : acc

    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      name: isLast && pageTitle ? pageTitle : humanize(segment),
      item: siteMetaData.siteUrl + linkPath,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

export function getArticleSchema({ title, description, pageUrl, date, imageUrl }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: date,
    dateModified: date,
    author: { '@type': 'Person', name: siteMetaData.authorName, url: siteMetaData.siteUrl },
    publisher: { '@type': 'Person', name: siteMetaData.authorName },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  }
}

export function getCreativeWorkSchema({ title, description, pageUrl, date, imageUrl, tags }) {
  const keywords = (tags || [])
    .map((tag) => (typeof tag === 'string' ? tag : tag.title))
    .filter(Boolean)
    .join(', ')

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image: imageUrl,
    url: pageUrl,
    dateCreated: date,
    creator: { '@type': 'Person', name: siteMetaData.authorName, url: siteMetaData.siteUrl },
    ...(keywords && { keywords }),
  }
}
