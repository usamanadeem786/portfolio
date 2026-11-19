import ContentRenderer from '@/components/ContentRenderer'
import Icon from '@/components/Icon'
import ServiceAction from '@/components/ServiceAction'

export default function Services({ main, services = [] }) {
  const website = services.find((service) => service.href)
  const engineering = services.filter((service) => !service.href)

  return (
    <div className="w-full max-w-6xl px-5 py-10 text-omega-200 sm:px-8 md:py-16 lg:px-12">
      <header className="prose prose-invert mb-8 max-w-3xl md:mb-10">
        <ContentRenderer source={main} />
      </header>

      {website && (
        <section className="mb-12 grid gap-6 rounded-3xl border border-omega-600 bg-gradient-to-br from-alpha/10 via-omega-800 to-omega-900 p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-9">
          <div>
            <h2 className="mb-3 text-3xl text-white">{website.title}</h2>
            <div className="prose prose-invert max-w-xl">
              <ContentRenderer source={website} />
            </div>
          </div>
          <ServiceAction href={website.href}>View website services and pricing</ServiceAction>
        </section>
      )}

      <section aria-labelledby="engineering-services">
        <h2 id="engineering-services" className="mb-6 text-3xl text-white">
          Software engineering services
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {engineering.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-omega-700 bg-omega-800/60 p-6"
            >
              {item.icon && (
                <Icon {...item.icon} aria-hidden="true" className="mb-4 h-9 w-9 fill-alpha" />
              )}
              <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
              <div className="prose prose-invert">
                <ContentRenderer source={item} />
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-omega-700 pt-7">
        <p>Have a project in mind? Share what you need and I’ll help define the scope.</p>
        <ServiceAction href="/contact" secondary className="w-full sm:w-auto">
          Request a project quote
        </ServiceAction>
      </div>
    </div>
  )
}
