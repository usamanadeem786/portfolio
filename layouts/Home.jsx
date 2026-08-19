import React from 'react'
import classNames from 'clsx'
import ContentRenderer from '@/components/ContentRenderer'
import Image from '@/components/Image'
import Sep from '@/components/Sep'
import Reveal from '@/components/Reveal'
import Companies from '@/components/Companies'
import ProjectCardFeatured from '@/components/ProjectCardFeatured'
import RepositoryCardFeatured from '@/components/RepositoryCardFeatured'

const HeroPhoto = ({ main }) => (
  <>
    {main.images?.[0] && (
      <div className="with-back-plate hidden md:block">
        <Image
          src={main.images[0].src}
          width={main.images[0].width}
          height={main.images[0].height}
          alt={main.images[0].alt}
          animation="mask-left"
          priority
        />
      </div>
    )}
    {main.images?.[1] && (
      <div className="with-back-plate md:hidden">
        <Image
          src={main.images[1].src}
          width={main.images[1].width}
          height={main.images[1].height}
          alt={main.images[1].alt}
          animation="mask-left"
          priority
        />
      </div>
    )}
  </>
)

const HeroAbout = ({ main }) => (
  <Reveal
    animation="fade-in slide-in-right"
    className={classNames(
      'md:mr-52',
      'prose prose-invert prose-headings:my-4 first-of-type:prose-headings:mt-0 prose-p:hidden',
      'md:prose-headings:my-6 md:prose-p:block'
    )}
  >
    <ContentRenderer source={main} />
  </Reveal>
)

const Achievements = ({ achievements }) => (
  <Reveal
    animation="fade-in slide-in-left"
    className={classNames(
      'prose prose-invert relative z-10 flex flex-wrap md:mt-12',
      'md:bg-gradient-omega-900 md:shadow-2xl'
    )}
  >
    <Sep line className="hidden md:block" />
    {achievements?.map((item, i) => (
      <div
        key={i}
        className="flex flex-1 flex-col items-center justify-center px-1 py-4 md:flex-row md:justify-start md:p-6"
      >
        <h2
          className={classNames(
            'm-0 md:pr-4',
            i === 0 && 'text-accent',
            i === 1 && 'text-beta',
            i >= 2 && 'text-alpha'
          )}
        >
          {item.number}
        </h2>
        <div className="text-white">{item.text}</div>
      </div>
    ))}
  </Reveal>
)

const FeaturedProjects = ({ companies, projects }) => (
  <div className="mt-16 md:mt-24">
    <Reveal
      animation="fade-in slide-in-top"
      className="prose prose-invert mx-auto max-w-2xl text-center"
    >
      <ContentRenderer source={companies} />
    </Reveal>
    <div className="mt-8 grid grid-cols-fluid gap-4 [--tw-fluid-col-min:16rem] md:mt-12 md:gap-6">
      {projects?.collection?.records?.map((item, i) => (
        <Reveal key={item.slug.join('/')} animation="fade-in slide-in-top" delay={i * 100}>
          <ProjectCardFeatured index={i} {...item} />
        </Reveal>
      ))}
    </div>
    <div className="prose prose-invert mt-8 text-center md:mt-12">
      <ContentRenderer source={projects} />
    </div>
  </div>
)

const OpenSourceProjects = ({ githubTitle, github }) => {
  if (!github?.repositories?.records?.length) return null

  return (
    <div className="mt-16 md:mt-24">
      <Reveal
        animation="fade-in slide-in-top"
        className="prose prose-invert mx-auto max-w-2xl text-center"
      >
        <ContentRenderer source={githubTitle} />
      </Reveal>
      <div className="mt-8 grid grid-cols-fluid gap-4 [--tw-fluid-col-min:16rem] md:mt-12 md:gap-6">
        {github.repositories.records.map((item, i) => (
          <Reveal
            key={`${item.owner}/${item.name}`}
            animation="fade-in slide-in-top"
            delay={i * 100}
          >
            <RepositoryCardFeatured index={i} {...item} />
          </Reveal>
        ))}
      </div>
      <div className="prose prose-invert mt-8 text-center md:mt-12">
        <ContentRenderer source={github} />
      </div>
    </div>
  )
}

const Layout = ({
  main = {},
  cta = {},
  achievements = [],
  companies,
  projects,
  githubTitle,
  github,
}) => (
  <div className="mx-auto my-auto p-4 md:p-10 lg:p-20">
    <div className="items-center text-center md:flex md:text-left">
      <div className="inline-block shrink-0 md:order-2 md:-ml-40">
        <HeroPhoto main={main} />
      </div>
      <div className="z-10 mt-6 basis-full md:m-0">
        <HeroAbout main={main} />
        <Achievements achievements={achievements} />
        <div className="prose prose-invert mt-6 md:mt-12">
          <ContentRenderer source={cta} />
        </div>
      </div>
    </div>
    <div className="mt-6 mt-12 hidden px-4 md:block">
      <Companies {...companies} />
    </div>
    <FeaturedProjects companies={companies} projects={projects} />
    <OpenSourceProjects githubTitle={githubTitle} github={github} />
  </div>
)

export default Layout
