# PORTFOLIO-CONTENT-SYNC-008

## 1. Baseline

- `origin/main` vérifié au début du lot : `863687eff142e13f973b6c7c1e4cca6af5c1d322` — confirmé identique au SHA connu du PM, aucune divergence.
- Branche de travail créée depuis `origin/main` : `content/portfolio-content-sync-008`.
- Baseline documentaire : `docs/audits/portfolio-reverify-007.md` (source de vérité pour ce lot).
- `qa/portfolio-qa-006` non fusionnée dans `main` à ce jour : les scripts `check`/`test`/`qa` sont absents de cette branche. Conformément à la section 17 de la directive, ils n'ont pas été récupérés par cherry-pick — les gates disponibles (`npx astro check`, `npm run build`, validations runtime manuelles) ont été utilisées à la place.

## 2. Décisions PM appliquées

Toutes les décisions de la section 15/25 de la directive ont été appliquées telles quelles, sans extension de périmètre :
- Cosmechic : stack corrigée, lien GitHub conservé
- Bilik Farm : stack corrigée, lien GitHub ajouté, visuel réexaminé (non remplacé, décision documentée)
- EduQuiz : texte rééquilibré web/mobile, mention Proxmox adoucie
- Paroisse Hub : contenu enrichi, aucun lien public ajouté, aucune donnée sensible reproduite
- SLG Tech : lien GitHub retiré, affirmations non prouvées neutralisées, étude de cas conservée
- Forum Sportif : aucune modification (stack déjà correcte, statut historique conservé)

## 3. Cosmechic

Avant :
```
stack: [Next.js, Stripe, Tailwind CSS]
```
Après :
```
stack: [C#, ASP.NET Core, Entity Framework Core, SQL Server, Bootstrap, Stripe]
```
Fichiers : `src/content/legacyProjects/fr/cosmechic.md`, `src/content/legacyProjects/en/cosmechic.md`
Preuve technique : `Pablo5Berriz/cosmechic-`, branche `codex/import-cosmechic` (commit `edd53b9`) — solution ASP.NET Core (.NET 8) réelle inspectée directement (`Cosmechic.csproj` : `TargetFramework net8.0`), migrations Entity Framework Core datées (`20240221071448_Added Front Image.cs`), `UseSqlServer` dans `Program.cs`, intégration Stripe (`StripeSettings.cs`), 25 modèles, 8 contrôleurs — documenté en détail dans `portfolio-reverify-007.md` §6 (bloc COSMECHIC)
Niveau de preuve : ÉLEVÉ (code source directement inspecté)

`githubUrl` conservé inchangé (`https://github.com/Pablo5Berriz/cosmechic-`), conformément à la directive — le code étant sur une branche non par défaut, l'URL n'a pas été modifiée vers une URL de branche spécifique (aucune nécessité UX démontrée dans ce lot).

Visuel : **non modifié**. Le logo actuellement utilisé (`/images/projects/cosmechic.jpg`) est un asset déjà qualifié de "logo réel" lors de PORTFOLIO-VISUALS-005 (résolu avant même la découverte du code réel). Aucune photo produit n'a été utilisée, conformément à l'interdiction explicite de la directive.

Aucune affirmation Next.js/Tailwind concernant cette version du projet n'a été conservée.

## 4. Bilik Farm

Avant :
```
stack: [PHP, JavaScript, MySQL]
githubUrl: null
```
Après :
```
stack: [Next.js, NestJS, Prisma, PostgreSQL]
githubUrl: https://github.com/Pablo5Berriz/bilik-farm
```
Fichiers : `src/content/caseStudies/fr/bilik-farm.md`, `src/content/caseStudies/en/bilik-farm.md`
Preuve technique : `Pablo5Berriz/bilik-farm`, branche `main` (commit `307c30b`) — monorepo réel avec `frontend/` (Next.js 15.5.20), `admin/` (Next.js 14) et `backend/` (structure NestJS complète : modules `users`, `auth`, `orders`, `blog`, `categories`, `testimonials`, `contact`, `products`), `backend/src/prisma/schema.prisma` avec `provider = "postgresql"` — documenté dans `portfolio-reverify-007.md` §6 (bloc BILIK FARM)
Niveau de preuve : ÉLEVÉ (code + manifests directement inspectés)

Fonctionnalités : les deux features existantes ("Site web vitrine", "CRM pour la gestion des opérations") ont été réexaminées — aucune n'est incompatible avec le code réel (modules `orders`/`products`/`categories`/`contact` supportent bien un CRM). **Aucune modification** apportée à cette section : rien à retirer, rien inventé.

Visuel : **NE PAS MODIFIER LE VISUEL — décision documentée.** Trois candidats ont été trouvés dans le dépôt (`frontend/public/images/{Bilik_Farm.png, Logo.png, "Logo ferme.png"}`). Seul `Logo.png` est réellement référencé par le code du site (`Header.tsx:77`, `Footer.tsx:32` : `<img src="/images/Logo.png">`) ; les deux autres portent le texte "Ferme du Village / Épicerie Biologique" — un nom différent, signe d'un asset générique/non utilisé, non représentatif du projet. Le visuel actuellement dans le Portfolio (`bilik-farm.jpg`) affiche correctement la marque "BILIK FARM" et avait déjà été qualifié de "logo réel" lors de PORTFOLIO-VISUALS-005 (résolu avant l'existence de code dans le dépôt, donc fourni directement par le propriétaire). Comparé à `Logo.png` (500×500, résolution plus faible, format carré peu adapté aux cartes du Portfolio), le visuel actuel n'est pas objectivement surpassé par un asset du dépôt. Aucune photo de ferme n'a été envisagée comme preuve d'interface, conformément à l'interdiction explicite.

## 5. EduQuiz

Avant (FR, extrait) :
```
badges: [mobile, web]
features:
  - Application mobile éducative couvrant le primaire 3 au secondaire 5
  - ...
  - Infrastructure auto-hébergée sur Proxmox
```
Après (FR, extrait) :
```
badges: [web, mobile]
features:
  - Monorepo pnpm/Turborepo avec une application web (Next.js) et une application mobile (Expo)
  - ...
  - Suite de tests automatisés (Vitest) et intégration continue (lint, typecheck, tests, build)
  - Infrastructure Proxmox auto-hébergée préparée (Docker, base de données, sauvegardes)
```
Fichiers : `src/content/caseStudies/fr/eduquiz-public.md`, `src/content/caseStudies/en/eduquiz-public.md`
Preuve technique : `Pablo5Berriz/eduquiz`, branche `main` — `docs/09-implementation-status.md` (daté 2026-05-05, document de statut interne du dépôt) : "Mobile Expo | Squelette | `_layout.tsx` et écran d'accueil seulement" et "Infra Docker/Proxmox | Préparé | ... validation production réelle à faire" ; `docs/05-screens-inventory.md` confirme "Total : 122 écrans" ; `.github/workflows/{ci.yml,migrations-check.yml}` confirmés — documenté dans `portfolio-reverify-007.md` §6 (bloc EDUQUIZ)
Niveau de preuve : ÉLEVÉ (document de statut interne daté + code + CI directement inspectés)

Changements : badges réordonnés `[web, mobile]` pour refléter que le web est la partie la plus avancée ; le texte ne présente plus le projet comme une "application mobile" en premier lieu mais comme une plateforme monorepo web+mobile ; la mention Proxmox "déployé... de la conception à l'hébergement" (affirmation de production non démontrée) a été remplacée par "préparée... en cours de validation en production" (formulation fidèle au document de statut du dépôt lui-même) ; ajout de la mention des tests/CI réels (Vitest + CI). Le fait "122 écrans inventoriés" (déjà exact) a été conservé sans changement.

FR/EN : les deux fichiers portent exactement les mêmes faits (monorepo, web avancé/mobile en démarrage, 122 écrans, tests+CI, Proxmox préparé) en formulation naturelle propre à chaque langue.

## 6. Paroisse Hub

Avant (FR, extrait) :
```
features:
  - Interface multilingue (next-intl)
  - Authentification sécurisée (NextAuth)
  - Notifications par email (Nodemailer)
  - Tableaux de bord avec visualisation de données (Recharts)
  - Suite de tests automatisés (Vitest et Playwright)
```
Après (FR, extrait) :
```
features:
  - Interface multilingue (next-intl)
  - Authentification sécurisée (NextAuth) et gestion des rôles administrateurs
  - Notifications par email (Nodemailer)
  - Pipelines d'import de données réelles (paroisses et églises de plusieurs diocèses québécois) avec vérifications préalables et plan de retour arrière
  - Tableaux de bord avec visualisation de données (Recharts)
  - Suite de tests automatisés (Vitest et Playwright de bout en bout) et intégration continue
```
Fichiers : `src/content/caseStudies/fr/paroisse-hub.md`, `src/content/caseStudies/en/paroisse-hub.md`
Preuve technique : `Pablo5Berriz/paroisse-hub` (dépôt privé), branche `feat/lot4-migration` (commit `cab2b44`) — 37 fichiers `*.test.ts` (Vitest), `e2e/admin-flows.spec.ts` (Playwright), `.github/workflows/ci.yml`, scripts d'import de données réelles avec garde-fous explicites (`scripts/import-trois-rivieres-*-dry-run*`, `*-rollback*`, `*-certify-db-environment*`) — documenté dans `portfolio-reverify-007.md` §6 (bloc PAROISSE HUB)
Niveau de preuve : ÉLEVÉ (code, tests et CI directement inspectés — dépôt privé)

Enrichissement : ajout de la gestion des rôles administrateurs (réelle, RBAC documenté) et des pipelines d'import de données réelles multi-diocèses avec garde-fous (dry-run + rollback), et mention explicite de l'intégration continue. Les fonctionnalités déjà présentes (multilingue, NextAuth, Nodemailer, Recharts, Vitest/Playwright) ont toutes été vérifiées réelles et conservées sans suppression injustifiée.

**Confidentialité respectée** : `githubUrl: null` conservé inchangé dans les deux langues. Aucune IP, aucun hostname interne, aucun secret, aucun email technique et aucun détail d'infrastructure sans intérêt professionnel public n'a été reproduit — seule la portée fonctionnelle (multi-diocèses québécois, garde-fous d'import) a été mentionnée, sans nommer de diocèse précis ni de détail d'environnement.

## 7. SLG Tech

Avant (FR) :
```
problem: >-
  La boutique en ligne vendait des appareils informatiques et technologiques
  avec des vulnérabilités de sécurité critiques et un stockage de données
  fragile (fichiers JSON).
features:
  - Boutique en ligne de vente d'appareils informatiques et technologiques
  - Remédiation de 8 vulnérabilités critiques identifiées lors d'un audit de sécurité
  - Migration du stockage de données de fichiers JSON vers PostgreSQL
githubUrl: https://github.com/Pablo5Berriz/SLG-Tech
```
Après (FR) :
```
problem: >-
  La boutique en ligne d'appareils informatiques et technologiques
  nécessitait un travail de renforcement de la sécurité et de fiabilisation
  du stockage des données.
features:
  - Boutique en ligne de vente d'appareils informatiques et technologiques
  - Travail de renforcement de la sécurité de la plateforme
  - Attention portée à la fiabilité du stockage des données
githubUrl: null
```
Fichiers : `src/content/caseStudies/fr/slg-tech.md`, `src/content/caseStudies/en/slg-tech.md`
Preuve technique / pourquoi le retrait : `Pablo5Berriz/slg-tech`, branche `main` (commit `e64b832`) — 1 seul fichier (`README.md`), aucun code. Le README réel décrit une boutique en ligne générique avec topics `nextjs, stripe, tailwindcss` — ne mentionne ni audit de sécurité, ni "8 vulnérabilités", ni migration JSON→PostgreSQL, ni même Node.js/Express. **Nuance d'équité** : PORTFOLIO-CONTENT-003 (lot antérieur) avait noté ce dépôt comme "réel et fonctionnel, signal de compétence sécurité clair" — le contenu du dépôt a donc vraisemblablement changé entre ce constat et REVERIFY-007 (régression de dépôt, comme observé aussi pour Forum Sportif dans l'autre sens), et non une fabrication initiale. Documenté dans `portfolio-reverify-007.md` §6 (bloc SLG TECH) et §21 (Risques, point 2).
Niveau de preuve : FAIBLE (README seul, aucune preuve accessible pour les affirmations retirées)

Suppression justifiée : "remédiation de 8 vulnérabilités critiques" et "migration JSON→PostgreSQL" sont des affirmations très spécifiques dont la seule preuve accessible à un visiteur (le dépôt lié) est aujourd'hui inexistante — retirées conformément à la directive. L'étude de cas n'a pas été supprimée ni entièrement réécrite : structure, `stack`, `status`, image et badges inchangés ; seules les phrases non prouvables ont été neutralisées vers une formulation plus générale et défendable.

`stack: [Node.js, Express, PostgreSQL]` et `status: completed` **non modifiés** — la directive ne demandait pas leur correction, et les remplacer par une supposition tout aussi faible (ex. les topics du dépôt) n'aurait rien amélioré ; signalé comme réserve en section 18 (Écarts).

## 8. Forum Sportif

**Aucune modification apportée** — état vérifié :
Fichiers concernés : `src/content/legacyProjects/fr/forum-sportif.md`, `src/content/legacyProjects/en/forum-sportif.md` (inspectés, non modifiés)
Preuve technique : `Pablo5Berriz/forum-sportif`, branche `main` (commit `2e3d456`, branche unique) — solution ASP.NET MVC complète (`Forum_rufine_et_paul.sln`), contrôleurs `Categories`/`Questions`/`Users`/`Responses`/`Home`, `Forum_23105.sql` (157 lignes) — documenté dans `portfolio-reverify-007.md` §6 (bloc FORUM SPORTIF)
Niveau de preuve : ÉLEVÉ

La stack déjà affichée (`[C#, ASP.NET, SQL Server]`) correspond exactement au code réellement inspecté — **aucune correction nécessaire**. CONTENT-PROVENANCE-01 est confirmé obsolète (le code est bien de retour) mais ce constat n'entraîne aucun changement de contenu puisque le texte était déjà correct. Statut historique conservé : le projet reste en `legacyProjects`, formulation "Built as a school project, developed with a partner" / "Projet réalisé en formation, développé en binôme" inchangée. Forum Sportif n'a pas été promu en projet phare, conformément à l'interdiction explicite.

## 9. FR/EN

Chaque modification factuelle (Cosmechic, Bilik Farm, EduQuiz, Paroisse Hub, SLG Tech) a été appliquée identiquement en FR et en EN : mêmes technologies, même statut, même disponibilité GitHub, mêmes fonctionnalités factuelles, même niveau de maturité. Les textes ne sont pas des traductions littérales (formulations naturelles propres à chaque langue) mais ne divergent sur aucun fait. Vérifié par relecture croisée des 10 fichiers modifiés et confirmé dans le HTML généré (`dist/fr/projects/index.html`, `dist/en/projects/index.html`).

## 10. GitHub links

| Projet | Avant | Après | Statut final |
|---|---|---|---|
| Cosmechic | `https://github.com/Pablo5Berriz/cosmechic-` | Inchangé | PUBLIC (conservé) |
| Bilik Farm | `null` | `https://github.com/Pablo5Berriz/bilik-farm` | **PUBLIC (ajouté)** |
| EduQuiz | `https://github.com/Pablo5Berriz/eduquiz` | Inchangé | PUBLIC (conservé, hors périmètre de retrait) |
| Paroisse Hub | `null` | Inchangé | **Reste non affiché (dépôt privé)** |
| SLG Tech | `https://github.com/Pablo5Berriz/SLG-Tech` | `null` | **PUBLIC (retiré)** |
| Forum Sportif | `https://github.com/Pablo5Berriz/Forum-Sportif` | Inchangé | PUBLIC (conservé) |

Vérifié dans le build produit (`dist/fr/projects/index.html`) : aucun lien `SLG-Tech` présent, lien `bilik-farm` présent, aucun `href="#"`.

## 11. Visuels

- **Cosmechic** : aucun changement (logo déjà réel, aucune photo produit utilisée)
- **Bilik Farm** : aucun changement — décision documentée en section 4 (aucun asset du dépôt n'est clairement supérieur au logo déjà en place)
- Aucun autre projet n'a reçu de nouveau visuel ; aucun lot visuel général n'a été rouvert.

## 12. Tests

Aucune suite de tests automatisée disponible sur cette branche (QA-006 non fusionnée). Validation manuelle effectuée :
- Contenu FR/EN : parité de fichiers inchangée (aucun fichier ajouté/supprimé/renommé, seules les valeurs de frontmatter et le corps ont été édités)
- `href="#"` : 0 occurrence sur `/fr/projects` et `/en/projects` (vérifié par Playwright)
- Liens GitHub : tous syntaxiquement valides et vérifiés dans le HTML généré
- Images : aucune image cassée détectée (`naturalWidth` de toutes les `<img>` > 0)

## 13. QA

`qa/portfolio-qa-006` non fusionnée dans `main` à ce jour — scripts `check`/`test`/`qa` absents de cette branche, conformément à l'état constaté au preflight. Non cherry-pické, conformément à la directive. Gates alternatives exécutées :
- `npm ci` : succès, `package-lock.json` inchangé (vérifié `git diff --stat`)
- `npx astro check` : **0 erreur**, 0 warning (hints TypeScript `z` deprecated pré-existants, non liés à ce lot)
- `npm run build` : **succès**, 13 pages générées, 0 erreur

## 14. Responsive

Testé via Playwright sur `/fr/projects` et `/en/projects` aux largeurs 360, 390, 768, 1280, 1440px : **aucun débordement horizontal** (`document.documentElement.scrollWidth === clientWidth` à chaque largeur, sur les deux pages). Aucune carte cassée observée.

## 15. Accessibilité

`axe-core` (installé ad hoc en dehors du projet, jamais ajouté aux dépendances) exécuté sur `/fr/projects` et `/en/projects`, thèmes clair et sombre (via `data-theme`) :

| Route | Thème | Violations |
|---|---|---|
| /fr/projects | dark | 0 |
| /fr/projects | light | 0 |
| /en/projects | dark | 0 |
| /en/projects | light | 0 |

**0 nouvelle violation** — conforme à l'attendu.

## 16. Fichiers modifiés

```
 src/content/caseStudies/en/bilik-farm.md     |  4 ++--
 src/content/caseStudies/en/eduquiz-public.md | 15 ++++++++-------
 src/content/caseStudies/en/paroisse-hub.md   | 10 ++++++----
 src/content/caseStudies/en/slg-tech.md       | 12 ++++++------
 src/content/caseStudies/fr/bilik-farm.md     |  4 ++--
 src/content/caseStudies/fr/eduquiz-public.md | 15 ++++++++-------
 src/content/caseStudies/fr/paroisse-hub.md   | 11 ++++++-----
 src/content/caseStudies/fr/slg-tech.md       | 14 +++++++-------
 src/content/legacyProjects/en/cosmechic.md   |  2 +-
 src/content/legacyProjects/fr/cosmechic.md   |  2 +-
 docs/audits/portfolio-content-sync-008.md    | (nouveau)
```
10 fichiers de contenu modifiés (exactement les 6 projets autorisés, Forum Sportif inspecté sans modification) + 1 rapport créé. Aucun fichier `src/pages/`, `src/components/`, `src/styles/`, `package.json`, `package-lock.json` ni `.github/` touché. Aucune image ajoutée ou remplacée.

## 17. Écarts

- **SLG Tech** : `stack` (`Node.js, Express, PostgreSQL`) et `status: completed` n'ont pas été corrigés — la directive ne le demandait pas explicitement, et aucune source de vérité fiable n'existe pour les remplacer (le README du dépôt suggère une stack différente et tout aussi non prouvée). Signalé comme réserve plutôt que corrigé silencieusement.
- **Bilik Farm** : les `badges: [web]` n'ont pas été étendus (ex. `backend`) malgré la découverte d'une architecture NestJS réelle — non demandé par la directive, périmètre volontairement non étendu.
- **EduQuiz** : le nombre exact de tests Vitest et la liste précise des routes e2e n'ont pas été détaillés dans le texte du Portfolio (resté à un niveau de généralité cohérent avec les autres études de cas) pour éviter de transformer l'étude de cas en documentation exhaustive.

## 18. Risques restants

- Le risque de crédibilité SLG Tech est neutralisé (lien retiré, affirmations spécifiques neutralisées) mais la stack affichée reste non vérifiée — à traiter dans un futur lot si une source fiable apparaît.
- Cosmechic : le lien GitHub public mène à `main`, qui ne contient qu'un README — un visiteur cliquant sur le lien sans connaître l'existence de la branche `codex/import-cosmechic` pourrait être surpris. La directive a explicitement choisi de ne pas modifier l'URL dans ce lot ; risque documenté, non résolu par choix du PM.
- Bilik Farm : le `backend/package.json` du dépôt réel est vide (non installable en l'état) — n'affecte pas le contenu du Portfolio mais reste une information technique de fond, déjà signalée dans REVERIFY-007.

## 19. Verdict

**PASS**

Les 20 critères d'acceptation de la directive sont satisfaits : stacks Cosmechic et Bilik Farm corrigées avec preuve code ; toute référence Next.js/Tailwind de Cosmechic supprimée ; lien GitHub Bilik Farm ajouté ; EduQuiz rééquilibré sans surestimation ; Paroisse Hub enrichi sans exposer son dépôt privé ni aucune donnée sensible ; lien SLG Tech retiré et affirmations non prouvées neutralisées ; Forum Sportif vérifié conforme et laissé en l'état historique ; FR/EN cohérents ; aucun nouveau projet ajouté ; aucune refonte ; build PASS ; `astro check` PASS (QA-006 non disponible, gates alternatives utilisées) ; runtime PASS (0 erreur console, 0 requête échouée, 0 `href="#"`, 0 image cassée) ; responsive PASS (5 largeurs × 2 pages, aucun débordement) ; axe-core 0 violation (2 pages × 2 thèmes) ; diff strictement limité aux 6 projets autorisés (10 fichiers de contenu + 1 rapport).
