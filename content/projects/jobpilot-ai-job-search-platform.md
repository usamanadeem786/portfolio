---
layout: Post
title: 'JobPilot: AI-Assisted Job Search and Application Tracking Platform'
description: A full-stack platform for finding compliant job sources, tailoring a CV per job, and tracking every application in one place — an AI-assisted build I directed and specified, with a compliance-first design instead of naive scraping.
date: '2026-08-25'
tags:
  - ai
  - backend
  - software-engineering
images:
  - src: /photos/project-jobpilot.jpg
    alt: JobPilot, an AI-assisted job search and application tracking platform
logo:
  alt: JobPilot
attributes:
  - label: Role
    value: Directed and specified (AI-assisted build)
  - label: Type
    value: Personal project
  - label: Stack
    value: Next.js, NestJS, PostgreSQL, Redis, Prisma
---

### A note on how this one was built

I'm including this one because the *decisions* behind it are mine, even though the code itself was AI-assisted (built with Claude, in a Turborepo monorepo) rather than hand-typed line by line. I specified the requirements, the compliance constraints, and the scope across the project's ten build phases, and reviewed the result — I didn't write every line myself. I'd rather say that plainly than let a polished result imply otherwise; if you want to see a project I wrote solo start to finish, my [Django blog](/projects/django-blogging-platform-with-user-authentication) or [gender detection](/projects/real-time-gender-detection-with-opencv-and-deep-learning) case studies are that.

### Problem

Most "AI job search tool" ideas run straight into the same wall: the platforms with the most job listings — LinkedIn, Indeed, Glassdoor — explicitly prohibit scraping in their terms of service, and guessing at recruiter email addresses to "find contacts" is exactly the kind of unverified personal-data processing that GDPR doesn't have a lawful basis for. A tool that ignores that isn't clever, it's just a compliance problem waiting to happen. The actual engineering problem is building something genuinely useful within those real constraints, not around them.

### Solution

JobPilot pulls jobs from sources that actually permit programmatic access (Greenhouse and Lever board APIs), ranks them against an uploaded CV, tailors that CV per job without inventing experience that isn't there, and tracks every application through a defined pipeline. Sources that need a partner agreement — LinkedIn, Indeed, Glassdoor — ship disabled by default and clearly say so in the UI rather than silently scraping around the restriction. Where a platform doesn't allow automated submission (nearly all of them), the app opens the real application page for you to apply manually instead of pretending to submit on your behalf.

### Technologies Used

- **Next.js** (web) and **NestJS** (API) in a Turborepo monorepo, with **Prisma**/**PostgreSQL** for data and **Redis**/**BullMQ** for background job processing
- **Zod** schemas shared between frontend and backend for a single source of validation truth
- JWT auth with rotating refresh tokens, plus Google/GitHub sign-in
- A pluggable AI abstraction for CV matching/tailoring that runs on a transparent keyword heuristic when no model API key is configured, rather than silently degrading

### Key Features

- CV upload (PDF/DOCX), parsing, and a section editor with autosave and multiple templates
- Job search — synchronous or queued with live progress over server-sent events
- An application pipeline with server-enforced status transitions and a full event log
- Contact info stored only when a source actually published it publicly — no pattern-guessed emails
- Outreach drafts with a mandatory human-approval step; nothing is ever sent automatically
- 33 API endpoints exercised end to end against a live database as part of the test suite

### Where Engineering Judgment Mattered

The interesting decisions here weren't "how do I scrape LinkedIn" — they were about scope and constraints: which job sources were legitimately usable without a partner agreement, where automated action needed a human approval gate instead of full automation, and what "AI-assisted" should honestly mean when no model API key is present (a transparent heuristic, not a fake result dressed up as one). Those are the decisions that came from me directing the build, not from the model.

### Source Code

I'm not linking directly to the repo here — its commit history reflects the AI-assisted build process rather than something structured for public browsing, and I'd rather that not create confusion about authorship on top of the explanation above.
