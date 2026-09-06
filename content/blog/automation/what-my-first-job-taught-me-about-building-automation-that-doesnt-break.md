---
layout: Post
title: What My First Job Taught Me About Building Automation That Doesn't Break
description: Lessons from building a production lead-generation pipeline at my first job at InvoZone — on scrapers that break, data that compounds errors downstream, and the difference between code that works once and code that has to keep working.
date: '2024-02-05'
tags:
  - python
  - automation
  - backend
images:
  - src: /photos/project-sales-automation.jpg
    alt: Lessons from building a production sales automation pipeline
---

### The gap between a working demo and a working system

My first real engineering job was at InvoZone, working on a sales automation system: scrape job postings across a dozen-plus job portals, figure out who the actual decision-maker at each hiring company is, validate that they're a real, reachable contact, and find a verified email address — all running unattended, continuously, feeding a sales team that depended on it every day. I'd written scripts before that worked. This was the first time I had to write something that had to *keep* working, for people who weren't me, without me watching it.

That distinction changed how I thought about almost everything.

### Scrapers break — the question is whether you find out first

A scraper that depends on a job portal's HTML structure is one redesign away from silently returning nothing. That's not a hypothetical; it happened regularly, across more than ten different portals, each with its own layout and its own quirks. The lesson wasn't "write more defensive selectors" — you can't out-code a website that changes without telling you. The lesson was that **you need to know a scraper is failing before a human notices leads have dried up.**

That's what per-scraper health tracking was for: recording how long each run took, how many leads it actually produced, and whether it completed at all. Without that, "the scraper is broken" is a fact you learn from a frustrated salesperson three days later, not from a dashboard the same morning it happens.

### Bad data early costs more the later you catch it

The pipeline had a specific shape for a reason: scrape → identify the decision-maker → validate against multiple sources → *then* attempt to find their email. It would have been faster to skip straight from "found a name" to "guess an email and send it." It also would have meant every mistake in the name-extraction step turned into a wasted, and possibly embarrassing, outreach email to the wrong person.

Validating before acting, not after, is a boring lesson that's easy to skip when you're moving fast — and it's exactly the step that determines whether "automation" means "does the work reliably" or "does the work fast and occasionally humiliatingly wrong." The validation step wasn't there because anyone loved writing it. It was there because the cost of a bad lead reaching a salesperson was much higher than the cost of an extra verification step.

### Working in someone else's codebase is a different skill than writing your own

Every project I'd built before this was mine end to end — my structure, my conventions, my mistakes to fix on my own schedule. This was a live system other engineers depended on, with CI running on every commit, pre-commit hooks catching style issues before review, and code review from people who'd been maintaining it longer than I'd been on the team. The skill I hadn't practiced yet wasn't writing code — it was writing code that fit into a system I didn't design, in a way the next person touching it wouldn't have to reverse-engineer.

That's a genuinely different muscle than solo-project discipline, and I don't think there's a shortcut to building it other than doing it: reading more of the existing codebase than you think you need to before changing it, and treating a code review comment as information about the system, not just a note on your PR.

### The honest summary

None of this is exotic. It's logging, validation, and reading the room in an existing codebase — unglamorous stuff that doesn't show up in a tutorial about scraping or automation. But it's the actual difference between a script that works when you run it and a system that keeps working when you're not looking, which turned out to be the real job the whole time.
