import React from 'react'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import layouts from '@/layouts/index'
import { getPageBySlug } from '@/lib/mdx'
import { siteMetaData } from '../theme.config'

// Statically generated so Next.js serves this with a real HTTP 404 status
// for any unmatched route, while reusing the same not-found content/design
// as the rest of the site (see content/not-found.md).
export async function getStaticProps() {
  const page = await getPageBySlug(['not-found'])
  return { props: { page } }
}

export default function NotFoundPage({ page = {} }) {
  const { meta = {}, ...content } = page
  const DynamicLayout = layouts[meta.layout]
  const pageUrl = siteMetaData.siteUrl + '/404'

  if (!DynamicLayout) return null

  return (
    <>
      <Seo {...meta} pageUrl={pageUrl} noindex />
      <DynamicLayout {...meta} {...content} pageUrl={pageUrl} />
    </>
  )
}

NotFoundPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
