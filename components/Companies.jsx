import React from 'react'
import Reveal from '@/components/Reveal'

const CompanyLogo = ({ name, href, icon }) => {
  const logo = (
    <img
      src={icon.src}
      alt={name}
      className="h-8 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0 md:h-10"
    />
  )

  if (!href) return logo

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={name}
      className="inline-flex"
    >
      {logo}
    </a>
  )
}

const Companies = ({ title, list }) => (
  <div className="flex h-12 flex-wrap items-center justify-between gap-x-10 gap-y-6">
    {title && <h4 className="mb-4 w-full text-white lg:mb-0 lg:w-auto">{title}</h4>}
    {list &&
      list.map((item, i) => (
        <Reveal key={item.name || i} animation="fade-in zoom-in" delay={i * 250} className="group">
          {item.icon && <CompanyLogo {...item} />}
        </Reveal>
      ))}
  </div>
)

export default Companies
