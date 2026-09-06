import React from 'react'
import { useRouter } from 'next/router'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import layouts from '@/layouts/index'
import { getPaths, getPageBySlug, generateCollectionRss } from '@/lib/mdx'
import { siteMetaData } from '../theme.config'

// Fetch data at build time
export async function getStaticProps({ params }) {
  let slug = params.slug || []
  let currentPage = 1

  const pageIndex = slug.indexOf('page')

  if (pageIndex !== -1) {
    currentPage = parseInt(slug[pageIndex + 1])
    slug = slug.slice(0, pageIndex)
  }

  let page = await getPageBySlug(slug)

  // A genuinely missing page must return a real HTTP 404, not silently
  // render the not-found content with a 200 status (a "soft 404" that
  // confuses search engines and dilutes crawl budget).
  if (!page) {
    return { notFound: true }
  }

  const props = { page }

  // Add pagination props for collection pages
  if (page.meta && page.meta.collection) {
    const {
      meta: {
        collection: { totalPages, records, recordsPerPage, infinitePaging },
      },
    } = page

    const pageRecords = records?.slice(
      recordsPerPage * (currentPage - 1),
      recordsPerPage * currentPage
    )

    page.meta.collection.records = pageRecords

    props.pagination = {
      infinitePaging,
      totalPages,
      currentPage,
    }
  }

  // Generate RSS feed for collections
  await generateCollectionRss(slug)

  return { props }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const pages = await getPaths()

  const paths = pages.map((page) => ({
    params: {
      slug: page.slug,
    },
  }))

  // 'blocking' (not `true`) matters here: for an *optional* catch-all route,
  // the root path ("/") and the generic fallback shell are the same file on
  // disk, so `fallback: true` silently serves the homepage's own HTML for
  // any unrecognized URL instead of ever resolving to a real 404.
  // 'blocking' skips the static fallback shell and renders on demand,
  // so getStaticProps' `notFound: true` reaches the client correctly.
  return { paths, fallback: 'blocking' }
}

export default function Page({ pagination, page = {} }) {
  const { meta = {}, ...content } = page
  const router = useRouter()

  const layout = router.isFallback ? 'Fallback' : meta.layout
  const DynamicLayout = layouts[layout]
  const pageUrl = siteMetaData.siteUrl + router.asPath

  if (!DynamicLayout) return null

  return (
    <>
      <Seo {...meta} pageUrl={pageUrl} />
      <DynamicLayout {...meta} {...content} pagination={pagination} pageUrl={pageUrl} />
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
