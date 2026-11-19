import Link from 'next/link'
import clsx from 'clsx'

export default function ServiceAction({ href, children, secondary = false, className }) {
  const Action = href.startsWith('#') ? 'a' : Link

  return (
    <Action
      href={href}
      className={clsx(
        'inline-flex min-h-[48px] items-center justify-center rounded-xl border px-5 py-3 text-center text-sm font-semibold leading-snug no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpha motion-safe:transition-colors',
        secondary
          ? 'border-omega-500 bg-omega-900 text-white hover:border-alpha hover:bg-omega-800'
          : 'border-transparent bg-white text-black hover:bg-alpha-100',
        className
      )}
    >
      {children}
    </Action>
  )
}
