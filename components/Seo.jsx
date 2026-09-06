import React from 'react'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { siteMetaData } from '../theme.config'
import {
  getPersonSchema,
  getWebsiteSchema,
  getBreadcrumbSchema,
  getArticleSchema,
  getCreativeWorkSchema,
} from '@/lib/structured-data'

const Seo = (props) => {
  const { seo = {}, title, description, images, pageUrl, date, tags, noindex = false } = props

  const metaData = {
    ...siteMetaData,
    title,
    description,
    ...seo,
  }

  const ogImagePath = images?.[0]?.src || '/hero.jpg'
  const ogImageUrl = metaData.siteUrl + ogImagePath
  // hero.jpg/hero-mobile.jpg are portrait photos; every other image on the
  // site (blog/project banners) is a 1200x630 landscape social card.
  const isPortraitHero = /^\/hero(-mobile)?\.jpg$/.test(ogImagePath)
  const ogImageSize = isPortraitHero ? { width: 500, height: 718 } : { width: 1200, height: 630 }

  // pageUrl already carries the correct production origin (see [[...slug]].js
  // and pages/404.js) — strip any query string so canonical URLs never
  // accidentally vary by tracking parameters. /page/1 is dropped too: it's
  // always identical to the un-paginated URL, so it canonicalizes to it
  // instead of being treated as separate, duplicate content.
  const rawUrl = pageUrl ? pageUrl.split('?')[0] : metaData.siteUrl
  const url = rawUrl.replace(/\/page\/1\/?$/, '') || metaData.siteUrl
  const path = url.replace(metaData.siteUrl, '') || '/'

  const isBlogPost = /^\/blog\/(?!page\/)[^/]+\/[^/]+\/?$/.test(path)
  const isProject = /^\/projects\/[^/]+\/?$/.test(path)

  const openGraph = {
    url,
    title: metaData.title,
    description: metaData.description,
    type: isBlogPost ? 'article' : 'website',
    images: [{ url: ogImageUrl, ...ogImageSize, alt: metaData.title }],
    site_name: metaData.siteName,
    locale: metaData.locale,
    ...(isBlogPost && date ? { article: { publishedTime: date, authors: [metaData.authorName] } } : {}),
  }

  const jsonLd = [getPersonSchema(), getWebsiteSchema()]

  const breadcrumb = getBreadcrumbSchema(path, metaData.title)
  if (breadcrumb) jsonLd.push(breadcrumb)

  if (isBlogPost) {
    jsonLd.push(
      getArticleSchema({
        title: metaData.title,
        description: metaData.description,
        pageUrl: url,
        date,
        imageUrl: ogImageUrl,
      })
    )
  }

  if (isProject) {
    jsonLd.push(
      getCreativeWorkSchema({
        title: metaData.title,
        description: metaData.description,
        pageUrl: url,
        date,
        imageUrl: ogImageUrl,
        tags,
      })
    )
  }

  return (
    <>
      <NextSeo {...metaData} canonical={url} noindex={noindex} nofollow={noindex} openGraph={openGraph} />
      <Head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
    </>
  )
}

export default Seo
