import React from 'react'
import { NextSeo } from 'next-seo'
import { siteMetaData } from '../theme.config'

const Seo = (props) => {
  const { seo = {}, title, description, images, pageUrl } = props

  const metaData = {
    ...siteMetaData,
    title,
    description,
    ...seo,
  }

  const ogImagePath = images?.[0]?.src || '/hero.jpg'
  const ogImageUrl = metaData.siteUrl + ogImagePath

  const openGraph = {
    url: pageUrl,
    title: metaData.title,
    description: metaData.description,
    images: [{ url: ogImageUrl, width: 500, height: 718, alt: metaData.title }],
    site_name: metaData.siteName,
    locale: metaData.locale,
  }

  return <NextSeo {...metaData} openGraph={openGraph} />
}

export default Seo
