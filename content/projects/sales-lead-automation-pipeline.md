---
layout: Post
title: Multi-Source Sales Lead Automation Pipeline
description: A production lead-generation pipeline built at my first job at InvoZone — scraping job postings across multiple portals, extracting decision-makers, validating contacts, and discovering verified emails automatically.
date: '2024-02-05'
tags:
  - python
  - automation
  - backend
images:
  - src: /photos/project-sales-automation.jpg
    alt: Multi-source sales lead automation pipeline built at InvoZone
logo:
  alt: Sales Automation
attributes:
  - label: Role
    value: Associate Software Engineer, InvoZone
  - label: Type
    value: Professional project — first job
  - label: Stack
    value: Python, Selenium, MySQL, Redis, Docker
---

### Problem

InvoZone's sales team needed a steady stream of qualified leads — specifically, the right decision-makers at companies that were actively hiring, since active hiring is a strong signal a company has budget and is worth pitching. Doing this by hand meant manually browsing job boards, guessing at who to contact, and guessing at their email address — slow, inconsistent, and not something that scales past a handful of leads a day.

### Solution

I worked on a backend automation pipeline that scrapes new job postings across multiple job portals (including LinkedIn, Glassdoor, Indeed, Monster, and several regional boards), extracts the hiring company and role details, and identifies likely decision-makers using named-entity recognition. From there, it cross-validates each lead against several independent search engines before attempting to discover a verified email address — trying realistic address permutations (`firstname.lastname@`, `firstname_lastname@`, and similar patterns against the company's domain) and confirming deliverability through an email-validation API, rather than guessing and hoping. Verified leads are written into the company's CRM, and a webhook-based reporting layer tracks how many leads were found, how many validated successfully, and how each scraper is performing over time.

### Technologies Used

- **Python** for the full pipeline
- **Selenium** and **BeautifulSoup** for scraping job portals that vary widely in structure
- **Stanford NER** for extracting names and entities from scraped text
- **MySQL** for lead and CRM storage, **Redis** for coordination between scraper jobs
- **Docker** for packaging, with a CI pipeline (GitLab CI, pre-commit hooks, static analysis) for the team's workflow

### Key Features

- Scrapers for multiple job portals running on independent schedules, with health tracking per scraper
- Decision-maker identification from unstructured job posting text via NER
- Multi-search-engine cross-validation before treating a lead as real
- Email discovery through domain-pattern permutation plus third-party verification, instead of a single guessed address
- Webhook-driven reporting on lead volume and validation rate over time

### My Contribution

This was my first project in my first software engineering role, working as part of a team on an existing, actively-used system. I contributed to the scraper and validation layers and worked directly with the lead-to-email discovery pipeline described above — it's where I first had to write automation that had to keep running unattended in production, not just work once in a demo.

### What I Learned

This is the project where a lot of "textbook" backend lessons became real for me. Scrapers break constantly when a job portal changes its markup, so error handling and logging aren't optional — they're what tells you something's wrong before a client notices leads have stopped coming in. Data quality compounds: a bad decision-maker match early in the pipeline wastes everyone's time downstream, which is why the validation step exists at all rather than trusting the first guess. And working inside an existing, already-deployed team codebase — with CI, code review, and other engineers depending on the same scrapers — was a different discipline than any personal project I'd built before.

### Source Code

This was built as part of my employment at InvoZone and includes company infrastructure, so the source isn't publicly shared.
