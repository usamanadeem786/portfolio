---
layout: Post
title: I Built a Production-Style Python API With Claude — Here's Exactly What Happened
description: An honest, evidence-based account of building a FastAPI + PostgreSQL + Redis + Celery task management API with Claude — including the real bugs, the real fixes, and where AI assistance actually helped versus where engineering judgment still mattered.
date: '2026-09-02'
tags:
  - python
  - ai
images:
  - src: /photos/blog-taskflow-api.jpg
    alt: TaskFlow API — a FastAPI, PostgreSQL, Redis, and Celery project built with Claude
---

### Introduction

I set out to answer a question a lot of developers are quietly asking right
now: when an AI assistant builds a real backend service — not a toy script,
but something with authentication, a real database, background jobs, and a
test suite — what does that actually look like? Not the marketing version.
The real one, bugs included.

This article is that record. I had Claude build **TaskFlow API**, a
project/task management REST API, end to end: FastAPI, PostgreSQL,
SQLAlchemy, Alembic, Redis, Celery, Docker, and a real pytest suite. What
follows is what actually happened — including three dependency bugs, one
unrelated but serious discovery about my own machine, and a Docker daemon
that stopped responding partway through.

### Why I Didn't Run an "AI vs Human" Comparison

My original plan was more ambitious: build the same API twice — once with
Claude, once by hand — and compare them on development time, code quality,
security, and performance. I dropped that plan, and I think the reason why
is more interesting than the comparison would have been.

If Claude writes "the hand-written version," it isn't hand-written. It's
still Claude, just told to call itself something else. And metrics like
development time or debugging time only mean something if they come from an
actual person at an actual keyboard, tracked in real time — not an AI
estimating plausible-sounding numbers afterward. Building a two-arm
comparison where I authored both arms and invented the metrics wouldn't
be an experiment. It would be a demo dressed up as one.

So this piece is scoped honestly: one real build, documented as it happened,
with a clear line between **what was actually measured** and **what
wasn't**.

### The Project

TaskFlow API is a project/task management backend: users register and log
in with JWT auth, create projects, add members with owner/member roles,
create tasks with status/priority/due dates, assign tasks to members, and
list tasks with filtering, search, and pagination. Project listings are
cached in Redis. Task assignment triggers a background notification via
Celery (simulated — more on that below).

### Technology Stack

FastAPI, SQLAlchemy 2.0 (sync), Alembic, PostgreSQL, Redis, Celery,
python-jose + bcrypt for auth, pytest for testing, Docker + Docker Compose
for packaging. Every choice is documented with its reasoning in the
project's README and case-study notes.

### Methodology

Claude designed the architecture, wrote every line of the application code,
generated the test suite, and then **actually ran it** — installing
dependencies, building the Docker image, and executing pytest for real —
rather than just producing code that looked plausible. Every number in this
article (test count, coverage percentage, the specific error messages) came
from a real command actually executing, not from Claude describing what it
expected to happen.

Where something couldn't be genuinely measured in this session — wall-clock
development time, live load-test throughput — I'm reporting that plainly as
**not measured**, rather than filling the gap with an estimate.

### Building It: What Went Smoothly

The architecture came together in a fairly standard layered shape: models →
schemas → CRUD functions → route handlers, with a small `deps.py` handling
authentication and authorization as reusable FastAPI dependencies. Two
decisions are worth calling out specifically, because they're the kind of
thing that separates "code that works" from "code that's actually
maintainable":

**Authorization is two-layered.** A global `role` (admin/user) on the user
model, and a separate per-project `role` (owner/member) on a
`project_members` join table. An admin can see every project; a regular
project owner can only manage their own. This is a deliberately small amount
of complexity — just enough to be realistic, not so much that it becomes its
own project.

**Redis caching uses a version counter, not key deletion.** Instead of
deleting every paginated cache entry when a project changes (which needs a
`SCAN` over key patterns — slow and easy to get wrong), each user has a
version counter that increments on writes. Cache keys embed the current
version, so a write instantly makes all previously-cached pages
unreachable — they just age out via TTL instead of needing to be found and
deleted. It's a small design choice, but it's the difference between
"caching that happens to work in testing" and caching that's actually safe
under concurrent writes.

### What Actually Went Wrong (In Order)

This is the part most "AI built my app" writeups skip. Here's what really
happened, as it happened.

**1. SQLAlchemy 2.0.29 crashed on import under Python 3.13**, with:

```
AssertionError: Class <class 'sqlalchemy.sql.elements.SQLCoreOperations'>
directly inherits TypingOnly but has additional attributes
{'__firstlineno__', '__static_attributes__'}.
```

Python 3.13 added new internal class attributes that this SQLAlchemy
version's metaclass checks didn't account for. Fix: bump to SQLAlchemy
2.0.36.

**2. `pydantic-core` had no prebuilt wheel** for the pinned `pydantic==2.6.1`
(it predates Python 3.13), so pip tried to compile it from source via a Rust
toolchain. Fix: bump to `pydantic==2.9.2`.

**3. That source build failed with "No space left on device."** Chasing
that down turned up something with nothing to do with this project: **the
machine's C: drive had zero bytes free.** That's a real, pre-existing
problem worth fixing on its own, independent of anything here. I worked
around it for this session by pointing pip's temp directory at a drive with
space.

**4. `psycopg2-binary` also has no Python 3.13 wheel**, and building it
needs a full MSVC C++ toolchain, which wasn't installed. Rather than forcing
that dependency onto anyone who wants to run the tests locally, I added a
`DATABASE_URL` override so the test suite can run against SQLite instead —
while the Docker image (built against Python 3.11, where `psycopg2-binary`
installs cleanly) stays the actual source of truth for how this runs in
production.

**5. Docker's daemon stopped responding partway through verification.**
After the image built successfully, `docker compose up` started producing
inconsistent container state, and shortly after, even `docker ps` began
hanging indefinitely. I don't know the root cause — it reads as a Docker
Desktop backend issue, not an application bug — but I'm not going to paper
over it. It's why the final verification below ran against SQLite rather
than a live Postgres/Redis stack.

### Testing

41 tests, 96% statement coverage of the application code, all genuinely
executed and passing:

```
================= 41 passed, 71 warnings in 120.98s (0:02:00) ==================

---------- coverage: platform win32, python 3.13.3-final-0 -----------
TOTAL                          649     24    96%
```

The suite covers authentication (registration validation, login failure
modes, token tampering), authorization (non-members blocked, non-owners
blocked, admin bypass), task filtering/search/pagination, cache
invalidation, and the background notification tasks directly. This is
observed output, not a summary.

### Security

I didn't run a penetration test, and I'm not going to claim this is
"secure" because tests pass — tests verify behavior, not the absence of
vulnerabilities. What I can say concretely: passwords are hashed with
bcrypt (never stored or logged in plaintext), JWTs are signed and verified
server-side with tamper detection covered by a dedicated test, and the
global error handler strips internal exception details from client-facing
responses so database errors or stack traces can't leak. Anything beyond
that — a real audit, dependency vulnerability scanning, rate limiting — is
future work, not a claim I'm making here.

### Performance

Not measured. Getting genuine throughput and latency numbers needs a live
stack under sustained load, and Docker became unusable in this session
before that step. I'd rather say that plainly than estimate.

### Developer Experience

The parts that felt fastest: scaffolding a new resource (model → schema →
CRUD → routes) once the pattern was established for the first one. The part
that took real back-and-forth: each dependency failure required reading the
actual error, understanding why it happened, and picking a fix appropriate
to the constraint (bump a version, add a fallback, redirect a temp
directory) rather than a generic "just reinstall it."

### What Claude Did Well

Generating consistent, repetitive structure across multiple resources
without it drifting. Diagnosing dependency and environment failures by
actually reading the error text (the `TypingOnly` assertion, the missing
wheel notice, the MSVC message, the disk-space error) instead of guessing.
Keeping the authorization model consistent across every single endpoint.

### Where Engineering Judgment Still Mattered

Deciding what *not* to build — async SQLAlchemy, refresh tokens, a fully
isolated test database container were all reasonable options that were
deliberately left out because they added complexity a demo project didn't
need. Designing the cache-invalidation scheme instead of reaching for the
first thing that "adds caching." And recognizing that "No space left on
device" pointed at something real on the host machine, worth reporting
rather than only working around.

### Unexpected Findings

The most interesting failure wasn't in the code at all — it was discovering
a completely full system drive while debugging an unrelated pip install.
That's a good reminder that AI-assisted debugging still benefits from
reading *past* the first error to what it's actually telling you.

### Final Results

| Metric | Result |
|---|---|
| Tests | 41, all passing |
| Coverage | 96% of application code |
| Docker image build | Succeeds |
| Live Postgres/Redis integration run | Not completed (Docker daemon issue) |
| Development time | Not measured |
| Performance benchmarks | Not measured |

### Conclusion

Claude built a working, reasonably well-tested backend service, and did it
by actually running the tools rather than describing expected output. It
also hit real dependency and environment problems along the way — which is
normal, and worth showing rather than hiding.

### Lessons for Developers

Pin dependency versions against the Python version you're actually running,
not just "a version that should work." When a build fails with an
unexpected error, read past the headline message — "no space left on
device" can be telling you something true and unrelated to the package
you're installing. And when an AI assistant reports a limitation instead of
a clean success, that's a feature, not a failure of the assistant.

### When Should Developers Use AI for This Kind of Work?

For scaffolding consistent, well-understood patterns across a codebase, and
for triaging errors quickly. Less so as a replacement for deciding what a
project actually needs — that still benefits from someone asking "do we
need this" before it gets built.
