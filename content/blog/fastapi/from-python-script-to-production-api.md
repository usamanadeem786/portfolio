---
layout: Post
title: From Python Script to Production API
description: Most APIs start as a script that worked once on someone's laptop. Here's the specific, concrete set of changes that separates that script from something you can hand to another team and trust.
date: '2026-08-13'
tags:
  - python
  - fastapi
images:
  - src: /photos/blog-script-to-api.jpg
    alt: Turning a Python script into a production API
---

### The script everyone starts with

It usually looks something like this. Someone needed to process an uploaded file and get some numbers back, so they wrote a function, ran it a few times, and it worked:

```python
import pandas as pd

def process_report(filepath):
    df = pd.read_csv(filepath)
    df["total"] = df["quantity"] * df["price"]
    summary = df.groupby("category")["total"].sum()
    return summary.to_dict()

result = process_report("sales.csv")
print(result)
```

This is a completely reasonable way to answer a one-off question. It is not an API, and the gap between the two isn't "wrap it in a framework" — it's a specific list of things this version silently assumes that a real API can't assume. Walking through them in order is more useful than a generic checklist, because each one maps to a failure this exact script would hit in production.

### 1. It assumes the input is well-formed

`df["quantity"] * df["price"]` will happily produce garbage — or throw a raw `KeyError`/`TypeError` deep inside pandas — the moment a column is missing, misnamed, or the wrong type. A caller of an API doesn't get to see that traceback; they need a clear, structured reason their request failed.

```python
from pydantic import BaseModel, Field

class ReportRow(BaseModel):
    category: str
    quantity: float = Field(gt=0)
    price: float = Field(gt=0)
```

Validation moves from "hope pandas doesn't choke" to "reject the request with a 422 and a specific field-level error before any processing happens."

### 2. It assumes it's the only thing running

`process_report("sales.csv")` reads a fixed path. An API handling concurrent requests from different users can't share one file path — two uploads at once will corrupt or race each other. Every piece of per-request state needs to actually be per-request:

```python
@app.post("/reports")
async def create_report(file: UploadFile):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    ...
```

No shared mutable path, no global variable holding "the current file" — everything scoped to the request that owns it.

### 3. It assumes failure means a stack trace in a terminal someone is watching

`print(result)` and an unhandled exception are fine when you're the one running the script and watching it fail. In production, nobody is watching the terminal. Errors need to become responses, and unexpected ones need to become logs someone can find later:

```python
@app.post("/reports")
async def create_report(file: UploadFile):
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="File is empty")
    except Exception:
        logger.exception("Failed to parse uploaded report")
        raise HTTPException(status_code=422, detail="Could not parse file")

    return process_report(df)
```

The distinction that matters: an error you anticipated (empty file, bad format) gets a specific, honest status code and message. An error you didn't anticipate gets logged in full detail server-side and a generic message client-side — never a raw traceback.

### 4. It assumes "it worked on my machine" is the same as "it will work"

The script has no tests, which was fine when running it manually was the test. Once other people depend on this behavior not changing out from under them, you need something that fails loudly the moment it breaks:

```python
def test_process_report_sums_by_category():
    df = pd.DataFrame({
        "category": ["a", "a", "b"],
        "quantity": [2, 1, 3],
        "price": [10, 10, 5],
    })
    result = process_report_df(df)
    assert result == {"a": 30, "b": 15}

def test_missing_column_is_rejected(client):
    response = client.post("/reports", files={"file": ("bad.csv", "category,quantity\na,1\n")})
    assert response.status_code == 422
```

Refactoring the internals later — swapping pandas for polars, changing the aggregation logic — is safe exactly to the extent that tests like these exist to catch a behavior change.

### 5. It assumes configuration never changes

The path `"sales.csv"` and any hardcoded thresholds or credentials need to come from environment-specific configuration, not literals in the function body. This is the difference between "works on my laptop" and "works identically in staging and production" — see the settings-object pattern in [Building a Production-Ready FastAPI Backend in 2026](/blog/fastapi/building-a-production-ready-fastapi-backend-in-2026) for the concrete pattern.

### 6. It assumes one machine, forever

The script runs to completion on one process. An API needs to answer "what happens if this pod restarts mid-request," "what happens under 50 concurrent uploads," and "how do we deploy a new version without downtime." None of that is solved by better Python — it's solved by packaging (a Dockerfile that starts the app the same way every time), a process manager (Uvicorn workers behind Gunicorn, or an orchestrator), and making the app itself stateless so any instance can handle any request.

### What actually changed, in one sentence

The script encodes "this worked, once, for me." The API has to encode "this works, every time, for anyone, including when something goes wrong" — and every change above is just a different facet of closing that gap. None of it requires the logic to get smarter. It requires the code around the logic to stop assuming the easy case is the only case.
