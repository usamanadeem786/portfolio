/** *************************************************************
 * Please refer to the Theme Options section in documentation   *
 ****************************************************************/

/**
 * Icons from react-icons: https://react-icons.github.io/react-icons
 */

import { IoLogoLinkedin, IoLogoGithub, IoLogoWhatsapp } from 'react-icons/io5'
import { TfiHome, TfiPencilAlt } from 'react-icons/tfi'
import { SlUser, SlBriefcase, SlEnvolope, SlTrophy } from 'react-icons/sl'

/**
 * WhatsApp contact link, shared across the header, contact page, and
 * the homepage closing CTA.
 */

export const whatsapp = {
  number: '923362817890',
  url: 'https://wa.me/923362817890?text=' + encodeURIComponent(
    "Hi Usama, I found your portfolio and would like to get in touch."
  ),
}

/**
 * Main Menu Items
 */

export const menu = [
  {
    name: 'Home',
    slug: '/',
    Icon: TfiHome,
    number: 1,
  },
  {
    name: 'About',
    slug: '/about',
    Icon: SlUser,
  },
  {
    name: 'Services',
    slug: '/services',
    Icon: SlBriefcase,
  },
  {
    name: 'Projects',
    slug: '/projects',
    Icon: SlTrophy,
  },
  {
    name: 'Blog',
    slug: '/blog',
    Icon: TfiPencilAlt,
  },
  {
    name: 'Contact',
    slug: '/contact',
    Icon: SlEnvolope,
  },
]

/**
 * Social Links under the Main Menu
 */

export const social = [
  {
    name: 'GitHub',
    url: 'https://github.com/usamanadeem786',
    Icon: IoLogoGithub,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/usama-nadeem-853749269/',
    Icon: IoLogoLinkedin,
  },
  {
    name: 'WhatsApp',
    url: whatsapp.url,
    Icon: IoLogoWhatsapp,
  },
]

/**
 * General configurations
 */

export const config = {
  dateLocale: 'en-US',
  dateOptions: {
    // dateOptions is passed to JavaScript's toLocaleDateString()
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  },
  convertKit: {
    tipUrl: 'https://fantastic-mover-3439.ck.page/products/blog',
  },
  contactForm: {
    inputs: require('./content/contact-form.json'),
    recipient: 'usamanadeem7866@gmail.com',
    sender: 'usamanadeem7866@gmail.com',
    subject: 'New Contact Form Submission',
  },
}

/**
 * MDX/Markdown configurations
 */

export const mdxConfig = {
  publicDir: 'public',
  pagesDir: 'content',
  fileExt: '.md',
  collections: ['/blog', '/projects'],
  remarkPlugins: [],
  rehypePlugins: [],
}

/**
 * Global SEO configuration for next-seo plugin
 * https://github.com/garmeeh/next-seo
 */

export const siteMetaData = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000',
  authorName: 'Usama Bin Nadeem',
  siteName: 'Usama Bin Nadeem',
  defaultTitle: 'Usama Bin Nadeem Personal Site',
  titleTemplate: 'Usama Bin Nadeem | %s',
  description:
    'Portfolio of Usama Nadeem, a Python Developer specializing in FastAPI, Django, Flask, web scraping, automation, AI, and custom software solutions.',
  email: 'usamanadeem7866@gmail.com',
  locale: 'en_US',
  twitter: {
    handle: '@usamanadeem786',
    site: '@site',
    cardType: 'summary_large_image',
  },
}
