---
layout: Post
title: How I Would Design an AI Application in Production
description: The interesting engineering problems in an AI-powered application aren't the model calls — they're everything around them. A practical architecture for latency, cost, failure, and the fact that the model will sometimes be wrong.
date: '2026-09-04'
tags:
  - ai
  - software-engineering
images:
  - src: /photos/blog-ai-production.jpg
    alt: AI application production architecture
---

### The part that's easy, and the part that isn't

Calling a model API is one HTTP request. That's not the hard part of building an AI application, and treating it as the whole system is how a working demo turns into an incident three weeks after launch. The hard part is everything around that call: it's slow, it's non-deterministic, it costs money per request, and it will occasionally be confidently wrong. A production design has to treat all four of those as first-class constraints, not edge cases.

Here's the shape I'd actually build.

### 1. Never put the model call on the critical request path if you can avoid it

A synchronous `POST /generate` that blocks until the model responds works for a demo and falls apart under real traffic — a slow model call (or a provider outage) takes your whole request thread down with it. The more resilient shape:

```
Client → API (enqueue job, return job_id immediately)
              ↓
         Queue (Redis / SQS / Celery)
              ↓
         Worker (calls the model, writes result)
              ↓
Client → poll GET /jobs/{id}, or receive a webhook/websocket push
```

This buys you three things at once: the API stays responsive even when the model is slow, you get natural backpressure (a queue that's growing is a metric, not an outage), and retries on a failed model call don't need to re-run anything the user already did.

For genuinely latency-sensitive cases (a chat UI), streaming the response token-by-token is the right answer instead of a queue — but the principle is the same: don't let one slow, external, unreliable call become a single point of failure for your whole request path.

### 2. Cache aggressively, but cache the right layer

Model calls are the most expensive thing your app does, in both latency and dollars. Three layers are worth caching independently:

- **Exact-input caching** — if the same prompt (or the same normalized input) comes in twice, don't call the model twice. A hash of the normalized request as the cache key, short TTL, is often enough to cut real cost meaningfully.
- **Embedding/retrieval caching** — if you're doing RAG, the retrieval step (vector search, reranking) is often as slow as the generation step and much easier to cache safely, since it's deterministic.
- **Semantic caching**, carefully — caching "similar enough" prompts to the same response is powerful and also where subtle correctness bugs live. I'd only reach for it after exact-match caching is in place and proven insufficient, with a clear similarity threshold and a way to audit false-positive hits.

### 3. Design for the model being wrong, not just for the model being slow

This is the part that's easy to skip in an architecture diagram and expensive to skip in reality. Concretely:

- **A confidence or self-check step** for anything that triggers a real-world action (sending an email, modifying a database, charging a card). Either a second, cheaper model call that specifically checks "does this output look wrong," or deterministic validation (does this output parse as valid JSON matching the expected schema, is this a real product ID) before anything downstream trusts it.
- **A human-in-the-loop gate for high-stakes actions**, at least until you have enough production data to trust the automated path. "The model drafts it, a human approves it" is a completely legitimate permanent architecture for anything with real consequences, not just a v1 compromise.
- **Guardrails at the input and output boundary** — input moderation before the prompt is built, output filtering before the response reaches the user. Cheap to add, and the failure mode without them (the model reproducing something harmful or off-brand that a user then screenshots) is disproportionately expensive.

### 4. Version prompts like you version code, because they are code

A prompt template is a dependency your entire feature relies on, and it changes behavior in ways that are much harder to unit test than a function signature change. Concretely: prompts live in version control, not in a database field someone can edit from an admin panel with no review; every response is logged with which prompt version produced it, so a quality regression can be traced to the exact change that caused it; and there's an evaluation set — even a small one, 20–50 representative cases — that gets run before a prompt change ships, the same way you'd run tests before merging.

### 5. Log what you need to debug, without logging what you shouldn't keep

You need enough to reconstruct "what did the user ask, what did we send the model, what came back, how long did it take, what did it cost" for any request, after the fact — that's the difference between debugging a quality regression in ten minutes and guessing at it for a day. You also need to be deliberate about not retaining sensitive input longer than necessary, and about who inside the company can read raw user prompts. Those two needs pull in opposite directions, and the answer is usually structured logging with clear retention policies and access controls, not "log everything forever" or "log nothing."

### 6. Put a real budget control between users and the model provider

Per-user rate limits and token budgets aren't a nice-to-have — they're the thing standing between one misbehaving client (or one bug in a retry loop) and a bill that gets someone paged. This is a cheap thing to build early and a genuinely painful thing to retrofit after a cost incident.

### The actual takeaway

None of the six points above is about making the model smarter. They're about accepting that the model is a slow, non-deterministic, costly, occasionally-wrong external dependency, and building the same kind of defensive architecture around it that you'd build around any other unreliable external service — queues instead of synchronous blocking calls, caching layers, validation at the boundary, versioned configuration, budget controls. The AI-specific part of "AI application architecture" is smaller than it looks. Most of it is just distributed-systems discipline applied honestly to a component that happens to be a model.
