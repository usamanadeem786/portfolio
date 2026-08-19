import React from 'react'
import classNames from 'clsx'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import { IoLogoGithub, IoArrowForward } from 'react-icons/io5'
import { BiStar, BiGitRepoForked } from 'react-icons/bi'

const RepositoryCardFeatured = ({ className, name, owner, url, description, language, topics, stars, forks, index }) => {
  if (!name || !url) return null

  const tags = topics?.length > 0 ? topics : [language].filter(Boolean)

  return (
    <a
      href={url}
      aria-label={`${owner}/${name} on GitHub`}
      target="_blank"
      rel="noreferrer noopener"
      className={classNames(
        'group prose prose-zinc flex flex-col overflow-hidden no-underline',
        'dark:bg-gradient-omega-900 dark:prose-invert dark:shadow-lg',
        className
      )}
    >
      <div className="not-prose relative block h-48 w-full overflow-hidden bg-omega-800">
        <Image
          src={`https://opengraph.githubassets.com/1/${owner}/${name}`}
          alt={`${owner}/${name} repository preview`}
          animation="fade-in zoom-out"
          wrapperClassName="transition-transform group-hover:scale-105 duration-300 ease-out before:bg-omega-700"
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover"
          priority={index === 0}
          fill
        />
        <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 bg-alpha px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-black">
          <IoLogoGithub className="h-3.5 w-3.5" />
          Open Source
        </span>
      </div>
      <div className="flex grow flex-col p-5">
        {tags.length > 0 && (
          <div className="mb-3 space-x-1 space-y-1">
            {tags.map((tag) => (
              <Tag key={tag} className="m-0.5 font-mono text-xs lg:mr-2">
                {tag}
              </Tag>
            ))}
          </div>
        )}
        <h5 className="mb-2 transition-colors group-hover:text-accent dark:group-hover:text-alpha">
          <span className="text-omega-400">{owner}/</span>
          {name}
        </h5>
        <small className="mb-4 block text-omega-400">
          {description || 'An open-source project available on GitHub.'}
        </small>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-sm">
          <div className="flex items-center gap-3 text-omega-500">
            <span className="inline-flex items-center gap-1">
              <BiStar className="h-4 w-4 text-yellow-500" />
              {stars ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <BiGitRepoForked className="h-4 w-4 text-beta" />
              {forks ?? 0}
            </span>
          </div>
          <span
            className={classNames(
              'inline-flex items-center gap-1 whitespace-nowrap',
              'font-mono text-xs font-bold uppercase text-accent transition-colors dark:text-alpha dark:group-hover:text-beta'
            )}
          >
            View Repository
            <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  )
}

export default RepositoryCardFeatured
