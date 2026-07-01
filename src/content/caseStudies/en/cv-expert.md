---
slug: cv-expert
lang: en
title: Cv Expert
badges: [saas, backend]
problem: >-
  Job seekers lack a tool that generates resumes and cover letters truly
  optimized for each job posting, while respecting their rights over their
  personal data.
features:
  - Complete Prisma schema (candidate, resume, cover letters, job postings, matching, governance) with initial migration applied
  - Auth split into an Edge config (middleware) and a full config (Prisma/bcrypt) for a clean production build
  - Protected dashboard with profile/experience/education/skills/languages CRUD via Zod-validated Server Actions
  - Account deletion (right to erasure, Law 25) with Prisma cascade and audit log retention
  - Phase report with execution evidence (build, migrations, end-to-end Playwright tests, verification SQL queries)
stack: [Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, pgvector, Auth.js]
status: progress
githubUrl: null
demoUrl: null
image: null
imagePlaceholder: true
order: 4
---

A tool for generating resumes and cover letters optimized for job postings using AI (vector search via pgvector). The current phase covers the foundations: authentication, complete data schema, candidate profile CRUD, and compliance (right to erasure, audit log), validated with end-to-end tests.
