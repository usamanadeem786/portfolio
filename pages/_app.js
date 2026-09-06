import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '@/components/MDX'
import CustomCursor from '@/components/CustomCursor'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <CustomCursor />
      <MDXProvider components={MDXComponents}>
        {getLayout(<Component {...pageProps} />)}
      </MDXProvider>
    </>
  )
}

export default MyApp
