import React from 'react'
import Link from 'next/link'
import Button from '@/components/Button'

const offerings = [
  {
    title: 'WordPress business website',
    price: '£400–£600',
    summary: 'For a branded service website your team can update in WordPress.',
    details:
      'A typical scope is up to five pages, responsive layouts, a contact form, page titles and descriptions, and an editing handover.',
    service: 'wordpress',
  },
  {
    title: 'Shopify store setup',
    price: '£650–£1,200',
    summary: 'For a store using Shopify’s catalogue, checkout and order management.',
    details:
      'A typical scope includes a branded theme, homepage, collections, product pages, up to 10 products supplied by you, and checkout testing.',
    service: 'shopify',
  },
  {
    title: 'Custom website',
    price: '£1,200–£2,500',
    summary: 'For specific design, content or integration requirements.',
    details:
      'The quote defines the pages, editing workflow, integrations, hosting approach and tests needed for your project.',
    service: 'custom-website',
  },
  {
    title: 'Custom web application',
    price: 'From £2,500',
    summary: 'For portals, dashboards and workflows with business rules.',
    details:
      'User accounts, permissions, APIs, databases and integrations are scoped and quoted against the requirements.',
    service: 'web-application',
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
  <section id={id} className="border-t border-omega-700/70 py-12 md:py-16">
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 font-mono text-sm uppercase tracking-widest text-alpha">{eyebrow}</p>
      <h2 className="mb-4 text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
    </div>
    {children}
  </section>
)

const WebsiteDevelopment = () => (
  <div className="w-full max-w-6xl px-4 py-10 text-omega-200 md:px-8 md:py-16 lg:px-12">
    <nav aria-label="Breadcrumb" className="mb-10 text-sm text-omega-400">
      <Link href="/services" className="hover:text-white">
        Services
      </Link>
      <span aria-hidden="true" className="mx-2">
        /
      </span>
      <span className="text-white">Website development</span>
    </nav>

    <header className="mb-14 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(250px,0.7fr)] md:items-end">
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-widest text-alpha">
          Website services
        </p>
        <h1 className="mb-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
          A website built for the way your business works.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-omega-300">
          I build WordPress websites, Shopify stores and custom web applications. I recommend the
          platform after understanding your content, features, budget and who will manage the site.
        </p>
      </div>
      <div className="border-l-2 border-alpha bg-omega-800/70 p-6">
        <p className="mb-2 text-sm uppercase tracking-wider text-omega-400">Starting point</p>
        <p className="mb-2 text-3xl font-semibold text-white">£400–£600</p>
        <p className="mb-5 text-sm leading-relaxed">
          For a simple WordPress business website. Final pricing depends on your requirements.
        </p>
        <Button href="/contact?service=wordpress" size="sm">
          Discuss your project
        </Button>
      </div>
    </header>

    <Section id="pricing" eyebrow="Services & pricing" title="Choose the right starting point">
      <div className="grid gap-5 md:grid-cols-2">
        {offerings.map(({ title, price, summary, details, service }) => (
          <article
            key={title}
            className="flex flex-col border border-omega-700 bg-omega-800/60 p-6 md:p-8"
          >
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <h3 className="max-w-xs text-2xl font-semibold text-white">{title}</h3>
              <span className="font-mono text-lg text-alpha">{price}</span>
            </div>
            <p className="mb-3 leading-relaxed text-white">{summary}</p>
            <p className="mb-7 flex-1 leading-relaxed text-omega-300">{details}</p>
            <Link
              href={`/contact?service=${service}`}
              className="w-fit font-semibold text-alpha underline-offset-4 focus:underline hover:underline"
            >
              Ask about {title.toLowerCase()}
            </Link>
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
        <div className="border-t-2 border-alpha bg-omega-800/50 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">WordPress</h3>
          <p className="leading-relaxed">
            A strong fit for branded business sites, service pages, blogs and content your team
            wants to edit. Bespoke visual design is possible on WordPress.
          </p>
        </div>
        <div className="border-t-2 border-alpha bg-omega-800/50 p-6">
          <h3 className="mb-3 text-xl font-semibold text-white">Shopify</h3>
          <p className="leading-relaxed">
            A practical fit for selling products with an established checkout, catalogue and order
            workflow. Store design and setup can be tailored to your brand.
          </p>
        </div>
        <div className="border-t-2 border-alpha bg-omega-800/50 p-6">
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
      <ol className="grid gap-4 md:grid-cols-4">
        {steps.map(([title, description], index) => (
          <li key={title} className="border border-omega-700 p-5">
            <span className="font-mono text-sm text-alpha">0{index + 1}</span>
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
      <div className="grid gap-7 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-xl font-semibold text-white">Two feedback rounds</h3>
          <p className="leading-relaxed">
            Each round is one consolidated list of feedback on the preview. A minor change might be
            replacing a supplied image, editing a heading or updating a button link. Correcting a
            defect in an agreed feature is included and does not consume a round.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-xl font-semibold text-white">Major changes</h3>
          <p className="leading-relaxed">
            A new page template, redesign of an approved layout, booking system or new CRM
            integration changes the scope. I provide a written estimate and any timeline impact
            before work begins. The proposed rate for extra work is £40 per hour, or a fixed quote
            for larger changes. I ask for written approval before exceeding an estimate.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-xl font-semibold text-white">30 days of launch support</h3>
          <p className="leading-relaxed">
            For 30 calendar days after launch, I fix issues where the delivered site does not work
            as agreed. You also get up to 60 minutes total for small content edits and help using
            the site. I aim to respond within two business days and complete straightforward edits
            within three to five business days after receiving the details.
          </p>
        </div>
        <div>
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

    <Section id="work" eyebrow="Selected work" title="See how I build for real requirements">
      <p className="mb-6 max-w-3xl leading-relaxed">
        My public case studies currently focus on custom software development. You can review the
        live portfolio and two application projects below.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          [
            'This portfolio',
            'A live Next.js portfolio with case studies, a technical blog and a contact flow.',
            '/',
          ],
          [
            'Django blogging platform',
            'A custom web application with user accounts, post publishing and a public feed.',
            '/projects/django-blogging-platform-with-user-authentication',
          ],
          [
            'FastAPI social platform',
            'A full-stack project with profiles, posts, following, search and media storage.',
            '/projects/fastapi-social-media-platform',
          ],
        ].map(([title, description, href]) => (
          <Link
            href={href}
            key={title}
            className="block border border-omega-700 p-6 transition-colors focus:border-alpha hover:border-alpha"
          >
            <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
            <p className="mb-4 leading-relaxed text-omega-300">{description}</p>
            <span className="font-semibold text-alpha">View project</span>
          </Link>
        ))}
      </div>
    </Section>

    <section className="bg-gradient-to-br from-alpha-100 via-alpha to-beta p-8 text-omega-900 md:p-12">
      <h2 className="mb-3 text-3xl font-semibold md:text-4xl">
        Tell me what your website needs to do.
      </h2>
      <p className="mb-7 max-w-2xl text-lg">
        Share your pages, must-have features and preferred launch date. I’ll recommend a suitable
        approach and prepare a quote for the agreed scope.
      </p>
      <Button href="/contact" variant="black" size="sm">
        Request a project quote
      </Button>
    </section>
  </div>
)

export default WebsiteDevelopment
