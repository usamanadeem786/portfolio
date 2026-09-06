---
layout: Post
title: Student Record Management System with Role-Based Access
description: A role-based student management system built with Streamlit and SQLite — student CRUD, an analytics dashboard, and bulk Excel import for Admin, Teacher, and Student roles.
date: '2026-09-06'
tags:
  - python
  - backend
images:
  - src: /photos/project-student-lms.jpg
    alt: Student record management system with role-based access and analytics dashboard
logo:
  alt: Student Records
attributes:
  - label: Role
    value: Solo developer
  - label: Type
    value: Personal project
  - label: Stack
    value: Python, Streamlit, SQLite
---

### Problem

Managing student records by hand — grades, attendance, who's allowed to see or edit what — doesn't scale past a handful of students, and most schools need at least a basic separation between what admins, teachers, and students can each do.

### Solution

I built a role-based student management system in Streamlit, backed by SQLite. Three roles — Admin, Teacher, and Student — get different views and permissions: admins have full control, teachers can manage student records, and students see a read-only view of their own performance. Password hashing is used for stored credentials, and bulk data entry is handled through Excel upload rather than requiring one-by-one manual entry.

### Technologies Used

- **Python** and **Streamlit** for the application
- **SQLite** for data storage
- **Pandas** and **openpyxl** for bulk Excel import/export
- **Plotly** for the analytics dashboard

### Key Features

- Role-based authentication and access control (Admin / Teacher / Student)
- Full CRUD on student records, scoped by role
- An analytics dashboard: total/passed/failed student counts and interactive charts
- Bulk student import via Excel upload, with a provided template
- Hashed password storage for user accounts

### My Contribution

I designed and built the full application solo: the database schema, the role-based access logic, the CRUD flows, the bulk Excel import, and the analytics dashboard.

### Source Code

[View source on GitHub](https://github.com/usamanadeem786/student-record-management-system)
