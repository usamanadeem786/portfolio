import React from 'react'
import classNames from 'clsx'

const CompanyLogo = ({ name, href, icon, hidden }) => {
  const logo = (
    <img
      src={icon.src}
      alt={name}
      className="h-8 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 md:h-10"
      draggable={false}
    />
  )

  const wrapperClassName = 'mr-12 inline-flex shrink-0 items-center md:mr-16'

  if (!href) return <div className={wrapperClassName}>{logo}</div>

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={name}
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      className={wrapperClassName}
    >
      {logo}
    </a>
  )
}

// The visible track is built from two identical halves. Every logo -
// including the very last one - carries the same trailing margin (set on
// CompanyLogo itself, not via a container `gap`), so each half is *exactly*
// half the total track width. That makes `translateX(-50%)` land pixel-perfect
// on the start of the second half, so the loop has no visible jump.
//
// REPEAT controls how many times the 2-logo pair repeats per half - enough
// so a half is always wider than the viewport and the track never runs out
// of logos before looping.
const REPEAT = 8

const Companies = ({ title, list }) => {
  if (!list?.length) return null

  const half = Array.from({ length: REPEAT }, () => list).flat()
  const track = [...half, ...half]

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:gap-10">
      {title && <h4 className="shrink-0 text-center text-white md:text-left">{title}</h4>}
      <div
        className={classNames(
          // min-w-0 overrides the flex default of min-width:auto - without it,
          // this item refuses to shrink below the (huge) intrinsic width of the
          // w-max track inside it, blowing out the page's layout width.
          'relative w-full min-w-0 overflow-hidden',
          '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'
        )}
      >
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((item, i) => (
            <CompanyLogo key={i} {...item} hidden={i >= half.length} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Companies
