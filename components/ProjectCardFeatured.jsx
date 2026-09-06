import React from 'react'
import Link from 'next/link'
import classNames from 'clsx'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import Date from '@/components/Date'
import { IoCalendarOutline, IoArrowForward } from 'react-icons/io5'

const ProjectCardFeatured = ({
  className,
  title,
  images,
  slug,
  description,
  date,
  tags,
  featured = true,
  index,
}) => (
  <div
    className={classNames(
      'group prose prose-zinc flex h-full flex-col overflow-hidden',
      'dark:bg-gradient-omega-900 dark:prose-invert dark:shadow-lg',
      className
    )}
  >
    {images?.[0] && (
      <Link
        href={slug.join('/')}
        aria-label={title}
        className="not-prose relative block h-48 w-full overflow-hidden"
      >
        <Image
          src={images[0].src}
          alt={images[0].alt || title}
          animation="fade-in zoom-out"
          wrapperClassName="transition-transform group-hover:scale-105 duration-300 ease-out before:bg-omega-700"
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover"
          priority={index === 0}
          fill
        />
        {featured && (
          <span className="absolute left-3 top-3 z-10 bg-alpha px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-black">
            Featured
          </span>
        )}
      </Link>
    )}
    <div className="flex grow flex-col p-5">
      {tags && (
        <div className="mb-3 h-[26px] space-x-1 space-y-1 overflow-hidden">
          {tags.slice(0, 3).map((tag) => {
            const label = typeof tag === 'string' ? tag : tag.title
            const tagSlug = typeof tag === 'string' ? undefined : tag.slug
            return (
              <Tag key={label} slug={tagSlug} className="m-0.5 font-mono text-xs lg:mr-2">
                {label}
              </Tag>
            )
          })}
          {tags.length > 3 && (
            <Tag className="m-0.5 font-mono text-xs lg:mr-2">+{tags.length - 3}</Tag>
          )}
        </div>
      )}
      <Link href={slug.join('/')} aria-label={title}>
        <h5
          className={classNames(
            'mb-2 min-h-[2.4em] overflow-hidden transition-colors',
            'group-hover:text-accent dark:group-hover:text-alpha',
            '[-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]'
          )}
        >
          {title}
        </h5>
      </Link>
      {description && (
        <small
          className={classNames(
            'mb-4 block min-h-[3.6em] overflow-hidden text-omega-400',
            '[-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box]'
          )}
        >
          {description}
        </small>
      )}
      <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-sm">
        {date && (
          <div className="text-omega-500">
            <IoCalendarOutline className="mr-1.5 inline h-4 w-4" />
            <Date
              className="inline align-middle font-mono text-xs font-bold uppercase"
              date={date}
            />
          </div>
        )}
        <Link
          href={slug.join('/')}
          aria-label={title}
          className={classNames(
            'inline-flex items-center gap-1 whitespace-nowrap no-underline',
            'font-mono text-xs font-bold uppercase text-accent transition-colors dark:text-alpha dark:group-hover:text-beta'
          )}
        >
          Explore Project
          <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </div>
)

export default ProjectCardFeatured
