import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ServiceAction from '@/components/ServiceAction'

const offerings = [
  {
    title: 'WordPress business website',
    price: '£400–£600',
    summary: 'For a branded service website your team can update in WordPress.',
    details:
      'A typical scope is up to five pages, responsive layouts, a contact form, page titles and descriptions, and an editing handover.',
    service: 'wordpress',
    action: 'Enquire about WordPress',
  },
  {
    title: 'Shopify store setup',
    price: '£650–£1,200',
    summary: 'For a store using Shopify’s catalogue, checkout and order management.',
    details:
      'A typical scope includes a branded theme, homepage, collections, product pages, up to 10 products supplied by you, and checkout testing.',
    service: 'shopify',
    action: 'Enquire about Shopify',
  },
  {
    title: 'Custom website',
    price: '£1,200–£2,500',
    summary: 'For specific design, content or integration requirements.',
    details:
      'The quote defines the pages, editing workflow, integrations, hosting approach and tests needed for your project.',
    service: 'custom-website',
    action: 'Enquire about a custom website',
  },
  {
    title: 'Custom web application',
    price: 'From £2,500',
    summary: 'For portals, dashboards and workflows with business rules.',
    details:
      'User accounts, permissions, APIs, databases and integrations are scoped and quoted against the requirements.',
    service: 'web-application',
    action: 'Enquire about a web application',
  },
]

const steps = [
  [
    'Discovery',
    'We discuss your audience, goals, content, required features and preferred launch date.',
  ],
  [
    'Scope & quote',
    'You receive a written scope, deliverables, timeline, third-party costs and fixed quote.',
  ],
  [
    'Build & review',
    'I build a preview, gather two consolidated feedback rounds and test the agreed features.',
  ],
  [
    'Launch & handover',
    'After approval, I launch the site, check its core flows and hand over access and editing guidance.',
  ],
]

const Section = ({ id, eyebrow, title, children }) => (
  <section id={id} className="scroll-mt-12 border-t border-omega-700/70 py-10 md:py-14">
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 font-mono text-sm uppercase tracking-widest text-alpha">{eyebrow}</p>
      <h2 className="mb-4 text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
    </div>
    {children}
  </section>
)

const WebsiteDevelopment = () => (
  <div className="w-full max-w-6xl px-4 py-10 text-omega-200 md:px-8 md:py-16 lg:px-12">
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-omega-300">
      <Link href="/services" className="underline underline-offset-4 hover:text-white">
        Services
      </Link>
      <span aria-hidden="true" className="mx-2">
        /
      </span>
      <span aria-current="page" className="text-white">
        Website development
      </span>
    </nav>

    <header className="grid gap-8 rounded-3xl border border-omega-600 bg-gradient-to-br from-alpha/10 via-omega-800 to-omega-900 p-6 md:p-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)] lg:items-center">
      <div>
        <h1 className="mb-5 text-4xl leading-tight text-white md:text-5xl">
          WordPress, Shopify &amp; custom web development
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-omega-300">
          Launch a business website, sell online or build a tool around your workflow. I’ll help you
          choose an approach based on what you need and how you’ll manage it after launch.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ServiceAction href="/contact">Request a project quote</ServiceAction>
          <ServiceAction href="#pricing" secondary>
            Compare packages
          </ServiceAction>
        </div>
      </div>
      <dl className="space-y-4 rounded-2xl border border-omega-600 bg-omega-900/70 p-5 sm:p-6">
        <div>
          <dt className="text-sm text-omega-300">Simple WordPress website</dt>
          <dd className="mt-1 text-3xl font-bold text-white">£400–£600</dd>
        </div>
        <div className="border-t border-omega-700 pt-4">
          <dt className="text-sm text-omega-300">Included in the project</dt>
          <dd className="mt-1 text-white">Two feedback rounds and 30 days of launch support</dd>
        </div>
      </dl>
    </header>
    <nav
      aria-label="On this page"
      className="my-6 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-omega-200"
    >
      <a className="py-2 underline underline-offset-4 hover:text-white" href="#platform">
        Platform choice
      </a>
      <a className="py-2 underline underline-offset-4 hover:text-white" href="#process">
        Project process
      </a>
      <a className="py-2 underline underline-offset-4 hover:text-white" href="#terms">
        Support &amp; revisions
      </a>
      <a className="py-2 underline underline-offset-4 hover:text-white" href="#work">
        Selected work
      </a>
    </nav>

    <Section id="pricing" eyebrow="Services & pricing" title="Choose the right starting point">
      <div className="grid gap-5 md:grid-cols-2">
        {offerings.map(({ title, price, summary, details, service, action }) => (
          <article
            key={title}
            className="flex flex-col rounded-2xl border border-omega-600 bg-omega-800/60 p-6 md:p-8"
          >
            <div className="mb-4">
              <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
              <p className="text-3xl font-bold tracking-tight text-white">{price}</p>
            </div>
            <p className="mb-3 leading-relaxed text-white">{summary}</p>
            <p className="mb-7 flex-1 leading-relaxed text-omega-300">{details}</p>
            <ServiceAction
              href={`/contact?service=${service}`}
              secondary
              className="w-full sm:w-fit"
            >
              {action}
            </ServiceAction>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-4xl leading-relaxed text-omega-300">
        Prices are indicative in GBP. The WordPress range is negotiable according to the agreed
        scope. Domain, hosting, Shopify subscriptions, premium themes, paid plugins and apps,
        third-party services, copywriting and substantial content migration are quoted separately. I
        will identify expected recurring costs before you approve the project.
      </p>
    </Section>

    <Section
      id="platform"
      eyebrow="Platform choice"
      title="When does custom development make sense?"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-omega-700 bg-omega-800/60 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">WordPress</h3>
          <p className="leading-relaxed">
            A strong fit for branded business sites, service pages, blogs and content your team
            wants to edit. Bespoke visual design is possible on WordPress.
          </p>
        </div>
        <div className="rounded-2xl border border-omega-700 bg-omega-800/60 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">Shopify</h3>
          <p className="leading-relaxed">
            A practical fit for selling products with an established checkout, catalogue and order
            workflow. Store design and setup can be tailored to your brand.
          </p>
        </div>
        <div className="rounded-2xl border border-omega-700 bg-omega-800/60 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">Custom development</h3>
          <p className="leading-relaxed">
            Useful when your core requirements include a client portal, complex quoting, role-based
            dashboards or integrations with specific business rules.
          </p>
        </div>
      </div>
      <p className="mt-6 max-w-4xl leading-relaxed">
        I’ll explain the cost and maintenance trade-offs in the quote, based on your actual
        requirements.
      </p>
    </Section>

    <Section id="process" eyebrow="The process" title="A clear path from idea to launch">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([title, description], index) => (
          <li key={title} className="rounded-2xl border border-omega-700 p-5">
            <span className="text-sm font-medium text-omega-300">Step {index + 1}</span>
            <h3 className="mt-3 mb-2 text-xl font-semibold text-white">{title}</h3>
            <p className="leading-relaxed">{description}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 leading-relaxed">
        The proposed payment schedule is 50% to start and 50% after preview approval, before launch
        and handover.
      </p>
    </Section>

    <Section id="terms" eyebrow="Working terms" title="Revisions, changes and support">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-omega-700 bg-omega-800/40 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">Two feedback rounds</h3>
          <p className="leading-relaxed">
            Each round is one consolidated list of feedback on the preview. A minor change might be
            replacing a supplied image, editing a heading or updating a button link. Correcting a
            defect in an agreed feature is included and does not consume a round.
          </p>
        </div>
        <div className="rounded-2xl border border-omega-700 bg-omega-800/40 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">Major changes</h3>
          <p className="leading-relaxed">
            A new page template, redesign of an approved layout, booking system or new CRM
            integration changes the scope. I provide a written estimate and any timeline impact
            before work begins. The proposed rate for extra work is £40 per hour, or a fixed quote
            for larger changes. I ask for written approval before exceeding an estimate.
          </p>
        </div>
        <div className="rounded-2xl border border-omega-700 bg-omega-800/40 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">30 days of launch support</h3>
          <p className="leading-relaxed">
            For 30 calendar days after launch, I fix issues where the delivered site does not work
            as agreed. You also get up to 60 minutes total for small content edits and help using
            the site. I aim to respond within two business days and complete straightforward edits
            within three to five business days after receiving the details.
          </p>
        </div>
        <div className="rounded-2xl border border-omega-700 bg-omega-800/40 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">Optional ongoing care</h3>
          <p className="leading-relaxed">
            A WordPress care plan starts at £75 per month for a small business site. It covers
            monthly core, theme and plugin updates, weekly backups, a backup before updates, basic
            security checks and checks of key pages and forms. Hosting, paid licences, new features
            and substantial repairs are quoted separately. Shopify and custom application
            maintenance is scoped individually.
          </p>
        </div>
      </div>
    </Section>

    <Section id="ownership" eyebrow="Handover" title="Your website stays under your control">
      <p className="max-w-4xl text-lg leading-relaxed">
        Your business controls the domain and hosting account, or the Shopify store owner account
        and subscription. I hand over administrator access, agreed project files and editing
        guidance. You retain ownership of content and media you supply. After final payment,
        original deliverables created specifically for your project transfer as agreed in the
        written quote. Third-party themes, plugins, stock assets and libraries remain subject to
        their own licences, which I identify before purchase.
      </p>
    </Section>

    <Section id="work" eyebrow="Selected work" title="Custom development projects">
      <p className="mb-6 max-w-3xl leading-relaxed">
        Explore how I’ve built account management, publishing tools and other features into web
        applications.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          [
            'Django blogging platform',
            'A custom web application with user accounts, post publishing and a public feed.',
            '/projects/django-blogging-platform-with-user-authentication',
            '/photos/project-django-blog.jpg',
          ],
          [
            'FastAPI social platform',
            'A full-stack project with profiles, posts, following, search and media storage.',
            '/projects/fastapi-social-media-platform',
            '/photos/project-social-media-app.jpg',
          ],
        ].map(([title, description, href, photo]) => (
          <Link
            href={href}
            key={title}
            className="flex flex-col overflow-hidden rounded-2xl border border-omega-700 bg-omega-800/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpha hover:border-alpha motion-safe:transition-colors"
          >
            <div className="aspect-[1200/630] relative bg-omega-900">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(min-width: 1152px) 510px, (min-width: 640px) 48vw, 92vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
              <p className="mb-4 flex-1 leading-relaxed text-omega-300">{description}</p>
              <span className="text-sm font-semibold text-alpha">View case study</span>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/projects"
        className="mt-5 inline-flex min-h-[44px] items-center font-semibold text-white underline underline-offset-4 hover:text-alpha"
      >
        Browse all projects
      </Link>
    </Section>

    <section className="rounded-3xl border border-omega-600 bg-gradient-to-br from-alpha/10 via-omega-800 to-omega-900 p-6 md:p-10">
      <h2 className="mb-3 text-3xl font-semibold text-white md:text-4xl">
        Let’s plan your website
      </h2>
      <p className="mb-7 max-w-2xl text-lg">
        Share your pages, must-have features and preferred launch date. I’ll recommend a suitable
        approach and prepare a quote for the agreed scope.
      </p>
      <ServiceAction href="/contact" className="w-full sm:w-auto">
        Request a project quote
      </ServiceAction>
    </section>
  </div>
)

export default WebsiteDevelopment
