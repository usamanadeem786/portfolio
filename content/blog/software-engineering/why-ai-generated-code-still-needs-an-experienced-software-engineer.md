---
layout: Post
title: Why AI-Generated Code Still Needs an Experienced Software Engineer
description: AI can write working code faster than most humans. It still can't tell you whether that code should exist, what it's quietly assuming, or what happens when it's wrong. Notes from actually shipping with it.
date: '2026-09-06'
tags:
  - ai
  - software-engineering
images:
  - src: /photos/blog-ai-engineer.jpg
    alt: AI-generated code reviewed by an experienced engineer
---

### The claim I actually want to make

Not "AI can't code." It can, and for a lot of code, it's faster and more consistent than I am. The claim is narrower and, I think, more useful: **the gap between "AI wrote code that runs" and "AI wrote the right code" is exactly where an experienced engineer earns their keep** — and that gap doesn't close as the models get better, because it isn't a capability gap. It's a context gap.

I'll use a real example instead of a hypothetical one. I recently had Claude build [TaskFlow API](/blog/python/i-built-a-production-api-with-claude), a FastAPI + PostgreSQL + Redis + Celery task management backend, end to end, and documented exactly what happened — bugs included. That project is a good case study for this article because it shows both halves clearly: where the AI was genuinely excellent, and where it produced correct-looking code that still needed a human decision behind it.

### Where AI is genuinely good

Scaffolding consistent, repetitive structure. Once the pattern for one resource (model → schema → CRUD → routes) was established, generating the same shape for the next three resources without it drifting was fast and reliable — the kind of work that's tedious and error-prone for a human doing it by hand for the fifth time that day.

Diagnosing errors it can actually read. When SQLAlchemy 2.0.29 crashed on import under Python 3.13 with an `AssertionError` about `TypingOnly`, or when `pydantic-core` failed to find a prebuilt wheel, the fix came from reading the actual error text and reasoning about *why* it happened — not guessing. That's a real, useful capability, not a party trick.

Keeping a rule consistent everywhere it applies. An authorization check that has to be enforced on every endpoint is exactly the kind of thing humans get inconsistent about under deadline pressure and AI doesn't.

### Where it quietly needs a human

**Deciding what not to build.** Nobody asks an AI "should this feature exist," and if you don't ask, you'll often get it anyway — because it's a reasonable, buildable thing, not because it's needed. In the TaskFlow build, async SQLAlchemy, refresh tokens, and a fully isolated test-database container were all *reasonable* things to add. They were left out on purpose, because a demo-scale project doesn't need the complexity, and every one of those is a maintenance cost forever. An AI optimizing for "a complete, well-built system" has no reason to leave any of them out. Scope is a judgment call about the actual project, not a property of the code.

**Design decisions that only matter under conditions the code doesn't show.** The project's Redis caching uses a version counter instead of deleting cache keys by pattern on every write. Both approaches "work" in a quick test. They behave completely differently under concurrent writes at scale, which is precisely the condition a demo run never exercises. Choosing between them requires knowing what the system needs to survive, not just what makes the current test pass.

**Reading past the first error to what it's actually telling you.** During that same build, a dependency installation failed with "No space left on device." The obvious read is "this package is too big" or "clear pip's cache." The actual cause was that the machine's C: drive had zero bytes free — a real, serious, completely unrelated problem that had nothing to do with the package being installed. Treating an error as a puzzle to solve locally, instead of a symptom that might point somewhere else entirely, is a habit, not a prompt.

**Knowing when "it passed the tests" isn't the same as "it's secure" or "it's correct."** Tests verify the behaviors you thought to write tests for. A 96%-coverage suite is genuinely valuable and it is not a security audit, a load test, or proof the architecture holds up in three years. Conflating "the tests are green" with "we're done" is exactly the kind of overconfidence that's easy to fall into when the code in front of you looks polished — and AI-generated code is *very* good at looking polished.

### The pattern underneath all of this

Every example above has the same shape: the AI had complete information about the code and incomplete information about the world the code has to survive in — the team's actual constraints, what's already broken elsewhere, what the business will tolerate, what "done" means for this specific project. An experienced engineer isn't valuable because they can out-code the model. They're valuable because they can hold the parts of the problem that were never in the prompt.

That's also why "an experienced engineer" and not just "a person" matters here. Someone without the scar tissue from having shipped something similar before doesn't necessarily know which of the AI's reasonable-looking choices is the one that bites you in eight months. Judgment like that isn't a prompting technique. It's the thing prompting can't produce, because it comes from having been wrong about something similar before.

### What I'd actually recommend

Use AI aggressively for scaffolding, boilerplate, and triage — it's a genuine multiplier there. Don't use it as a substitute for the conversation about what should be built, how much complexity is earned, and what happens when the happy path isn't the one that occurs. That conversation is still an engineering job, and I don't think it's going away — it's just moving up a level, from writing the code to deciding what the code should be.
