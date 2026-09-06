import ProjectCardHorizontal from '@/components/ProjectCardHorizontal'
import RepositoryCard from '@/components/RepositoryCard'
import ContentRenderer from '@/components/ContentRenderer'
import TagCard from '@/components/TagCard'
import Newsletter from '@/components/Newsletter'
import Reveal from '@/components/Reveal'
import Sep from '@/components/Sep'

// Tag counts are derived directly from the loaded project records rather
// than a separate collection lookup, so a category only ever appears here
// when at least one project actually carries that tag — and only tags with
// their own /tags/<slug> page are shown, since those are the only ones
// TagCard can link to.
const getProjectCategories = (records = []) => {
  const counts = new Map()

  records.forEach((project) => {
    ;(project.tags || []).forEach((tag) => {
      if (!tag?.slug) return
      const key = tag.slug.join('/')
      const existing = counts.get(key)
      if (existing) {
        existing.collection.totalRecords += 1
      } else {
        counts.set(key, { title: tag.title, slug: tag.slug, collection: { totalRecords: 1 } })
      }
    })
  })

  return Array.from(counts.values()).sort(
    (a, b) => b.collection.totalRecords - a.collection.totalRecords
  )
}

const Layout = ({ categories, projects, github }) => {
  const projectCategories = getProjectCategories(projects?.collection?.records)

  return (
    <div className="mx-auto">
      <div className="prose prose-headings:mb-4 dark:prose-invert">
        {categories && projectCategories.length > 0 && (
          <>
            <div className="grid-cols-2 bg-omega-800 md:grid">
              <div className="p-3 md:p-6 lg:p-12">
                <ContentRenderer source={categories} />
                <div className="mt-4 grid gap-2 lg:grid-cols-2">
                  {projectCategories.map((tag) => (
                    <TagCard key={tag.title} {...tag} />
                  ))}
                </div>
              </div>
              <Reveal
                animation="fade-in slide-in-left"
                className="bg-gradient-omega-900 p-3 md:p-6 lg:p-12"
              >
                <Newsletter />
              </Reveal>
            </div>
            <Sep line />
          </>
        )}
        <div className="p-3 md:p-6 lg:p-12">
          <ContentRenderer source={github} />
          <div className="mt-4 grid grid-cols-fluid gap-4 [--tw-fluid-col-min:15rem] md:mt-12 md:gap-6">
            {github?.repositories?.records?.map((item, i) => (
              <Reveal animation="fade-in slide-in-top" delay={i * 100} key={item.name}>
                <RepositoryCard {...item} />
              </Reveal>
            ))}
          </div>
          <div className="my-6 md:my-12"></div>
          <ContentRenderer source={projects} />
          {projects?.collection?.records?.length ? (
            <div className="mt-4 grid gap-4 md:mt-12 md:gap-6">
              {projects.collection.records.map((item, i) => (
                <ProjectCardHorizontal key={item.slug} index={i} {...item} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-omega-400 md:mt-12">
              Client case studies are being prepared and will be published here soon.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Layout
