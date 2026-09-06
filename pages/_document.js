import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config } from '../theme.config'

class MyDocument extends Document {
  render() {
    return (
      <Html lang={config.dateLocale} className="relative scroll-smooth antialiased">
        <Head>
          <meta name="theme-color" content="#27272a" />
          {/* Set these in your host's env vars once you have the codes from
              Search Console / Bing Webmaster Tools — no code change needed. */}
          {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
            <meta
              name="google-site-verification"
              content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
            />
          )}
          {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
            <meta
              name="msvalidate.01"
              content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION}
            />
          )}
          <link rel="icon" href="/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="alternate" type="application/rss+xml" href="/feed/blog/feed.xml" />
        </Head>
        <body className="scrollbar-thin scrollbar-thumb-omega-500 hover:scrollbar-thumb-omega-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
