---
slug: eduquiz-public
lang: en
title: EduQuiz
badges: [web, mobile]
problem: >-
  Quebec students from grade 5 (primaire 3) through grade 11 (secondaire 5)
  need a bilingual revision tool, aligned with the Ministry of Education's
  (MEQ) curriculum, built as a web and mobile platform.
features:
  - pnpm/Turborepo monorepo with a Next.js web app and an Expo mobile app
  - Bilingual FR/EN content aligned with the MEQ curriculum
  - 122 screens inventoried during product design
  - Automated test suite (Vitest) and continuous integration (lint, typecheck, tests, build)
  - Self-hosted Proxmox infrastructure prepared (Docker, database, backups)
stack: [TypeScript, Next.js, Expo, Turborepo, Proxmox]
status: progress
githubUrl: https://github.com/Pablo5Berriz/eduquiz
demoUrl: null
image: null
imagePlaceholder: true
order: 2
---

A Quebec educational platform organized as a pnpm/Turborepo monorepo, with a Next.js web app — the most advanced part — and an early-stage Expo mobile app. The bilingual content, aligned with the Ministry of Education's curriculum, is built on a design inventory of 122 screens. The self-hosted Proxmox infrastructure (Docker, database, backups) is prepared and still being validated in production.
