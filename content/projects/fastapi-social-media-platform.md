---
layout: Post
title: Full-Stack Social Media Platform Built with FastAPI and MongoDB
description: A Twitter-style social media application built with FastAPI, MongoDB, and Azure Blob Storage — with posts, retweets, following, profile editing, and search.
date: '2026-09-06'
tags:
  - python
  - fastapi
  - backend
images:
  - src: /photos/project-social-media-app.jpg
    alt: Full-stack social media platform built with FastAPI and MongoDB
logo:
  alt: Social Feed App
attributes:
  - label: Role
    value: Solo developer
  - label: Type
    value: Personal project
  - label: Stack
    value: FastAPI, MongoDB, Azure Blob Storage
---

### Problem

A short-form social feed needs several pieces working together correctly: accounts and sessions, a data model for posts and relationships between users (who follows whom), media storage for profile and post images, and search — all while keeping the backend fast and the codebase readable.

### Solution

I built a full-stack, Twitter-style application on FastAPI with MongoDB as the data store and Azure Blob Storage (Azurite locally) for media. The backend serves server-rendered Jinja2 templates rather than a separate frontend framework, keeping the whole stack in Python. Authentication supports both a custom email/password flow and Google Sign-In through Firebase.

### Technologies Used

- **FastAPI** for the backend and routing
- **MongoDB** (via PyMongo) for users, posts, and the follow graph
- **Azure Blob Storage / Azurite** for storing and serving uploaded images
- **Firebase Authentication** for Google Sign-In
- **Jinja2** for server-rendered templates

### Key Features

- Create, edit, and delete posts, with optional image attachments
- Retweet another user's post to your own timeline
- Follow / unfollow other users — the home timeline shows posts from accounts you follow
- Editable profile with bio and profile photo
- Search for users by username and posts by content
- Uploaded images stored in Blob Storage and served back through the app

### My Contribution

I designed and built the entire application solo: the data model in MongoDB, every route and template, the Blob Storage integration for media uploads, and both authentication flows (custom + Firebase).

### Known Limitations

This was built as a learning project, not a production system, and it's documented honestly as such in the repository: passwords in the custom email/password flow are stored unhashed, and there's no rate limiting or CSRF protection on the form endpoints. Both are called out explicitly in the README as things that would need to be fixed before any real-world use.

### Source Code

[View source on GitHub](https://github.com/usamanadeem786/socialmedia-linkedin)
