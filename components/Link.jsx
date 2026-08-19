import React from 'react'
import NextLink from 'next/link'

const Link = ({ href, children, ...props }) => {
  const isInternalLink = href && !props.download && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    )
  }

  const { passHref, legacyBehavior, ...rest } = props

  // Mirror next/link's legacyBehavior: clone the child (e.g. <Button>) into
  // the anchor instead of wrapping it, so it doesn't render a nested <a>.
  if (legacyBehavior && React.isValidElement(children)) {
    return React.cloneElement(children, { href, ...rest })
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}

export default Link
