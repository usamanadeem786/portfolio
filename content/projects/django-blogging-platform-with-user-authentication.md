---
layout: Post
title: Django Blogging Platform with User Authentication
description: A full-stack Django blogging platform with user registration and login, post creation with media uploads, and a public post feed — built to practice production Django app structure.
date: '2024-01-01'
tags:
  - python
  - django
  - backend
images:
  - src: /photos/project-django-blog.jpg
    alt: Django blogging platform with user authentication and post management
logo:
  alt: Django Blog
attributes:
  - label: Role
    value: Solo developer
  - label: Type
    value: Personal project
  - label: Stack
    value: Python, Django, SQLite
---

### Problem

A blogging platform needs more than a page that displays text — it needs accounts people can actually register and log into, a way to create and publish posts with images, and a clean separation between the parts of the app that handle authentication, content, and the public-facing pages, so the codebase stays maintainable as it grows.

### Solution

I built a Django application structured around three dedicated apps: `account` for registration, login, and user session handling; `core` for the shared post and content models; and `home` for the public-facing feed and page rendering. Posts support media uploads, stored and served through Django's media handling, and the app is backed by a relational database through Django's ORM.

### Technologies Used

- **Python** and **Django** for the application and ORM
- **SQLite** as the database
- **Django's built-in authentication system** for registration, login, and session management
- **Django's media handling** for post image uploads

### Key Features

- User registration and login, with session-based authentication
- Post creation and publishing, including image uploads attached to posts
- A public home feed rendering published posts
- A conventional Django project layout (separate apps for accounts, core models, and the public site) that keeps authentication, data, and presentation concerns independent of each other

### My Contribution

I built the project end to end as a solo developer: the Django app structure, the authentication flow, the post/media models, and the public feed templates — developed incrementally, starting from user registration and login before adding post creation and the public feed.

### Source Code

[View source on GitHub](https://github.com/usamanadeem786/Blogging-app)
