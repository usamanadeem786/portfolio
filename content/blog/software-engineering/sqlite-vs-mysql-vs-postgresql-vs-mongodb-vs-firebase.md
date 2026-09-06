---
layout: Post
title: 'SQLite vs MySQL vs PostgreSQL vs MongoDB vs Firebase: Which Database Should You Use?'
description: Five databases that get compared constantly, and almost never on the axis that actually matters — what your data looks like and who else needs to write to it at the same time. A practical, use-case-first breakdown.
date: '2026-09-06'
tags:
  - backend
  - software-engineering
images:
  - src: /photos/blog-database-comparison.jpg
    alt: SQLite vs MySQL vs PostgreSQL vs MongoDB vs Firebase comparison
---

### The question underneath the question

"Which database should I use" is really two separate questions people tend to collapse into one: does your data have a clear relational structure worth enforcing, and does more than one process need to write to it at the same time? Answering those two honestly rules out most of the options before price, hosting, or ecosystem ever matter.

### SQLite — a database that's also just a file

SQLite is a single file on disk, with no separate server process to run or configure. That makes it genuinely excellent for local development, embedded applications, small internal tools, and anything single-user or single-process — it's what I reach for by default when testing a FastAPI app locally, exactly because there's nothing to set up.

Its real limitation isn't scale in the way people usually mean it — SQLite handles surprisingly large datasets fine. It's concurrent writes: SQLite locks the entire database file for a write, so multiple processes writing at once will serialize or fail, not run in parallel. The moment you have more than one server instance writing to the same database, SQLite is the wrong tool, full stop.

### MySQL — the default that's still a reasonable default

MySQL is a mature, widely-hosted relational database that handles standard CRUD web applications well, with broad tooling and hosting support that predates most of its competitors. If you're working in an environment that already standardizes on MySQL, or a framework whose ecosystem leans that way, there's rarely a strong reason to fight it.

Where it tends to fall short of PostgreSQL specifically: less strict standards compliance historically, weaker native support for advanced data types and full-text search, and a less capable JSON story. None of that makes MySQL a bad choice — it makes it a slightly less capable one for anything beyond straightforward relational CRUD.

### PostgreSQL — the reasonable default for new relational projects

PostgreSQL does everything MySQL does, plus stronger standards compliance, genuinely good native JSON support (`jsonb`), full-text search, and a large ecosystem of extensions (PostGIS for geospatial data, for example) that cover a lot of ground before you'd need a separate specialized database. For a new project starting from a relational data model with no strong reason to pick otherwise, Postgres is the reasonable starting point.

The tradeoff versus SQLite is operational: you need an actual database server running somewhere, with connection pooling, backups, and a bit more setup than "the app opens a file." That's a real cost for a tiny project, and a non-issue for anything meant to run in production with real users.

### MongoDB — when the schema is genuinely the variable part

MongoDB stores documents (JSON-like objects) rather than rows in fixed-schema tables, which is a real advantage when your data's shape genuinely varies record to record, or evolves faster than a migration workflow comfortably supports — content with wildly different fields per item, event logs with varying payloads, that kind of thing.

The honest cost: relationships between documents (the equivalent of a SQL join) are more awkward, and MongoDB's flexibility makes it easier to end up with inconsistent document shapes across a collection if you're not disciplined about validation at the application layer. If your data is naturally tabular with clear relationships, forcing it into documents just to use MongoDB is solving a problem you don't have.

### Firebase (Firestore) — when someone else should run the backend

Firebase (specifically Firestore, its current document database) is a managed, real-time-sync NoSQL database aimed at apps that want live-updating UI without hand-building a WebSocket/subscription layer — a chat app, a collaborative tool, a mobile app that needs offline support with automatic sync. It comes bundled with authentication and hosting, which is genuinely convenient for small teams or solo projects that don't want to run a backend at all.

The tradeoffs are real: you're tied to Firebase's query model (no arbitrary joins, limited complex queries), costs can scale unpredictably with read/write volume as an app grows, and you're accepting real vendor lock-in — migrating off Firestore later is a genuine project, not a config change. It's a strong choice specifically when "no backend to run" is worth more to you than control over the data layer.

### A practical way to decide

Start with two questions, in order: does more than one process need to write to this data concurrently — if not, and you want zero setup, SQLite is legitimately fine. If yes, does your data have a clear, fairly stable relational structure — if yes, reach for PostgreSQL by default (MySQL if your environment already standardizes on it). If your data's shape is genuinely variable or evolves quickly, and you're comfortable handling relationships in application code, MongoDB is a reasonable fit. And if you want to avoid running a backend at all and real-time sync is a core feature, Firebase trades control for convenience in a way that's worth it for the right project.

None of these are wrong choices in general — they're each the right choice for a specific shape of problem, and the mistake is usually picking based on familiarity or hype rather than actually looking at what the data looks like and who's touching it.
