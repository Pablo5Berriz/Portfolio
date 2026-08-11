# Portfolio Recovery Backlog

Backlog issu de PORTFOLIO-AUDIT-001. Aucune tâche ci-dessous n'a été exécutée dans ce lot — audit uniquement, développement interdit.

## P0

| ID | Domaine | Tâche | Justification | Fichiers | Dépendances | DoD |
|---|---|---|---|---|---|---|
| P0-1 | Contenu / Sécurité de la crédibilité | Corriger le lien GitHub cassé de Cosmechic (`Cosmechic` → 404 réel ; vrai dépôt = `cosmechic-`) et sa stack technique incorrecte (annoncée ASP.NET/SQL Server, réalité vérifiée Next.js/Stripe/Tailwind) | Lien mort public + affirmation de compétence factuellement fausse, contraire à l'exigence "aucune affirmation non vérifiable" du mandat d'origine | `src/content/legacyProjects/{fr,en}/cosmechic.md` | Décision PM sur la version du projet à présenter (l'ancienne ASP.NET ou la nouvelle Next.js/Stripe) | Le lien résout en 200 vers le vrai dépôt ; la stack affichée correspond à la version réellement présentée |
| P0-2 | Accessibilité | Corriger les violations de contraste WCAG AA confirmées par axe-core sur les deux thèmes (`--color-accent` en clair, `--color-text-faint` en sombre) | Violation "serious" reproductible, non conforme à la cible WCAG 2.2 AA affichée comme objectif du projet | `src/styles/global.css` | Aucune | axe-core (wcag2aa) ne rapporte plus de violation `color-contrast` sur les 4 pages testées, dans les deux thèmes |

## P1

| ID | Domaine | Tâche | Justification | Fichiers | Dépendances | DoD |
|---|---|---|---|---|---|---|
| P1-1 | Contenu | Décider et mettre à jour les `githubUrl: null` pour Garage Auto Gonzague, Logigest, Bilik Farm, ComptaClems — des dépôts publics réels existent maintenant sous ces noms exacts | Sous-représentation de projets réels et vérifiables | `src/content/caseStudies/{fr,en}/{garage-auto-gonzague,logigest,bilik-farm,comptaclems}.md` | Décision PM : ces dépôts doivent-ils être publics/liés, ou rester privés intentionnellement ? | Chaque fichier reflète une décision explicite (lien réel ou `null` assumé), pas un oubli |
| P1-2 | Contenu | Décider si BikeTrip et Infotech Solutions (dépôts publics réels `biketrip`, `infotechs-solutions` vérifiés) doivent devenir des études de cas | Contenu réel disponible et non exploité | Nouveaux fichiers `src/content/caseStudies/{fr,en}/{biketrip,infotech-solutions}.md` si validé | Stack/features/statut à confirmer par le PM à partir du contenu des dépôts | Décision actée (créer ou non), documentée |
| P1-3 | Contenu | Décider du sort de deux dépôts publics découverts sans étude de cas : `workflow-ai-agents` (probable correspondance avec l'expertise "orchestration multi-agents IA" déjà mentionnée qualitativement sur la page d'accueil) et `mediahub` (probable évolution de l'ancien concept Streamr/Aura, explicitement retiré du site sur demande antérieure) | Écart contenu/réalité GitHub ; décision éditoriale non technique | Nouveaux fichiers potentiels si validé | Décision PM | Décision actée et documentée |
| P1-4 | Sécurité | Mettre à jour `astro` vers une version corrigeant les 3 CVE modérées (XSS View Transitions, bypass `security.checkOrigin`, XSS `renderHTMLElement`) | Dépendance de production avec CVE connues | `package.json`, `package-lock.json` | Vérifier la compatibilité de la nouvelle version avec `astro-icon`, `@astrojs/sitemap` | `npm audit` ne rapporte plus ces 3 CVE ; build et typecheck toujours PASS |
| P1-5 | Tests | Mettre en place une suite de tests minimale versionnée (au moins un smoke test Playwright : 12 routes, 0 erreur console/HTTP, liens `href="#"` absents) | Actuellement aucune régression n'est détectable automatiquement (script `test` absent de `package.json`) | Nouveau dossier `tests/` ou `e2e/`, `package.json` | Aucune | `npm test` (ou équivalent) exécutable en local et en CI, exit 0 sur l'état actuel |

## P2

| ID | Domaine | Tâche | Justification | Fichiers | Dépendances | DoD |
|---|---|---|---|---|---|---|
| P2-1 | SEO | Remplacer le domaine placeholder `paulquentinondoa.dev` par le domaine réel de production | Casse canonical/hreflang/OG tant que non corrigé | `astro.config.mjs` | Domaine réel choisi et DNS configuré | `site` dans `astro.config.mjs` reflète le domaine réel ; sitemap/canonical/OG régénérés en conséquence |
| P2-2 | Contenu | Fournir les 6 captures d'écran manquantes (Cv Expert, EduQuiz, Forum Sportif, Logigest, Paroisse Hub, Proxmox) | Blocs "Capture à venir" encore visibles publiquement | `public/images/projects/*`, frontmatter correspondant (`imagePlaceholder: false`) | Visuels fournis par le PM/propriétaire | 0 bloc "Capture à venir" restant, sauf décision explicite contraire |
| P2-3 | Déploiement | Choisir et configurer un hébergement réel (le README documente une intention Proxmox+Traefik non implémentée) | Le site n'est pas accessible publiquement à ce jour | Nouveau : config de déploiement / CI selon la plateforme choisie | Décision PM sur la plateforme | Le site répond en HTTP 200 sur le domaine de production |
| P2-4 | Sécurité | Confirmer manuellement la restriction de domaine de la clé publique EmailJS sur le dashboard EmailJS | Action déjà documentée au README, non vérifiable depuis le code | Aucun (action externe) | Accès au compte EmailJS | Confirmation manuelle par le propriétaire du compte |
| P2-5 | CI/CD | Ajouter un workflow minimal (`.github/workflows/`) exécutant `npm ci && npx astro check && npm run build` sur chaque push/PR | Aucune vérification automatique n'existe aujourd'hui avant merge | Nouveau `.github/workflows/ci.yml` | Aucune | Le workflow s'exécute et passe sur l'état actuel du dépôt |

## P3

| ID | Domaine | Tâche | Justification | Fichiers | Dépendances | DoD |
|---|---|---|---|---|---|---|
| P3-1 | Performance | Convertir les images de projets en WebP/AVIF avec fallback, ou adopter `astro:assets` | Poids actuel raisonnable mais non optimal ; pas de mesure Lighthouse disponible dans cet environnement | `public/images/projects/*`, composants `ProjectCard.astro`/`LegacyProjectCard.astro` | Aucune | Poids d'image réduit mesurable ; build toujours PASS |
| P3-2 | SEO/UX | Créer une page 404 personnalisée (`src/pages/404.astro`) | Absente actuellement ; page d'erreur générique non brandée | Nouveau fichier | Aucune | Une URL inexistante affiche la page 404 du site, pas l'erreur générique de l'hébergeur |
| P3-3 | Git hygiène | Configurer le tracking upstream de la branche de travail locale (`git branch --set-upstream-to`) | Absence constatée en préflight (CMD-002), sans impact fonctionnel actuel | Configuration Git locale uniquement | Aucune | `git status` affiche l'état ahead/behind par rapport à `origin` |
| P3-4 | Accessibilité | Étendre la couverture `prefers-reduced-motion` au-delà du smooth-scroll (transitions hover/thème) | Amélioration, pas une violation WCAG confirmée | `src/styles/global.css` | Aucune | Les transitions non essentielles respectent `prefers-reduced-motion` |
| P3-5 | Sécurité | Mettre à jour `@astrojs/check` quand une version corrigeant les 9 CVE de tooling (fast-uri, js-yaml, nanoid, postcss, svgo, tar, undici, yaml) est disponible | Dépendances de développement uniquement, non livrées en production | `package.json` | Version corrigée disponible en amont | `npm audit` ne rapporte plus ces CVE |

## Recommended Next Lot

**PORTFOLIO-STABILIZE-002 — Corrections P0 ciblées (contraste WCAG AA + lien Cosmechic)**

Objectif : traiter les deux seuls risques CRITIQUES identifiés (P0-1, P0-2), sans toucher au reste du contenu ni de l'architecture. Périmètre volontairement étroit : une correction de tokens CSS (2-3 valeurs dans `global.css`) et une correction de contenu (URL + stack de Cosmechic, après décision PM sur la version du projet à présenter). Testable indépendamment via axe-core (contraste) et une vérification HTTP du lien (Cosmechic). Ne pas embarquer P1/P2/P3 dans ce même lot.
