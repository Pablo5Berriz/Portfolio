---
slug: cv-expert
lang: fr
title: Cv Expert
badges: [saas, backend]
problem: >-
  Les chercheurs d'emploi manquent d'un outil qui génère des CV et lettres de
  motivation réellement optimisés pour chaque offre, tout en respectant leurs
  droits sur leurs données personnelles.
features:
  - Schéma Prisma complet (candidat, CV, lettres, offres, matching, gouvernance) avec migration initiale appliquée
  - Authentification scindée en configuration Edge (middleware) et configuration complète (Prisma/bcrypt) pour un build de production propre
  - Dashboard protégé avec CRUD profil/expériences/formations/compétences/langues via Server Actions validées par Zod
  - Suppression de compte (droit à l'effacement, Loi 25) avec cascade Prisma et conservation du journal d'audit
  - Rapport de phase avec preuves d'exécution (build, migrations, tests Playwright bout-en-bout, requêtes SQL de vérification)
stack: [Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, pgvector, Auth.js]
status: progress
githubUrl: null
demoUrl: null
image: null
imagePlaceholder: true
order: 4
---

Outil de génération de CV et de lettres de motivation optimisés pour les offres d'emploi grâce à l'IA (recherche vectorielle via pgvector). La phase actuelle couvre les fondations : authentification, schéma de données complet, CRUD du profil candidat et conformité (droit à l'effacement, journal d'audit), validées par des tests bout-en-bout.
