# PORTFOLIO-REVERIFY-007

## 1. Baseline Portfolio

- `origin/main` vérifié à l'émission de la directive : `863687eff142e13f973b6c7c1e4cca6af5c1d322` — **confirmé identique**, aucune divergence (`git fetch origin` puis `git rev-parse origin/main` exécutés au début de ce lot).
- Working tree au moment du preflight : clean.
- Branche de travail créée depuis `origin/main` : `audit/portfolio-reverify-007`.
- État QA (`qa/portfolio-qa-006`, PR #2) : **non consulté, non modifié**. Aucune action git n'a touché cette branche ou cette PR pendant ce lot.
- Aucun fichier produit (`src/`, `public/`, `package.json`, `package-lock.json`, `.github/`) n'a été modifié. Seuls les deux livrables de ce lot ont été créés.

## 2. Méthode

Ordre de confiance appliqué systématiquement, projet par projet : code source actuellement présent > fichiers de configuration > manifests de dépendances > schémas DB/migrations > tests > CI/CD > historique Git > assets réellement committés > documentation technique > README > metadata/topics GitHub.

**Contrainte d'outillage rencontrée et contournement** : les endpoints GitHub authentifiés (API `api.github.com`, pages `github.com`) sont bloqués par le proxy de cette session pour tout dépôt hors `Pablo5Berriz/Portfolio` ("GitHub access to this repository is not enabled for this session"). Il a donc été impossible de faire un `WebFetch`/scraping classique. Contournement utilisé : l'outil `add_repo` (lecture anonyme Git pour les dépôts publics, attachement explicite pour les dépôts privés), suivi d'un **clone local réel** (`git clone --depth 1`) de chacun des 15 dépôts candidats dans un répertoire de travail hors du dépôt Portfolio (`/tmp/.../scratchpad/repos/`, jamais dans l'arbre de travail Git audité). Ceci constitue une preuve **supérieure** à un simple scraping de page web : inspection directe du code source réel, des manifests, des migrations et de l'historique Git.

**Limitation documentée** : l'inventaire exhaustif automatique de tous les dépôts du compte `Pablo5Berriz` (listing via API) est bloqué par le même proxy ("sessions are bound to their configured repositories"). Il n'a donc pas été possible de découvrir des dépôts additionnels non nommés dans la directive par une recherche automatisée du compte complet. L'inventaire de ce lot couvre les 16 projets explicitement nommés par la directive (15 avec dépôt candidat + Proxmox sans dépôt logiciel). Voir section 21 (Risques) pour la portée exacte de cette limite.

**Dépôts privés** : `cv-expert` et `paroisse-hub` n'ont pas été servis en lecture anonyme (contrairement aux 13 autres, publics) — ils ont nécessité un attachement explicite via `add_repo`. Ils sont traités comme preuve technique interne valide, jamais comme lien public recommandable par défaut (voir section 12).

## 3. Inventaire GitHub actuel

| Projet Portfolio | Dépôt identifié | Visibilité | Branche par défaut | Autres branches | Correspondance certaine |
|---|---|---|---|---|---|
| BikeTrip | `Pablo5Berriz/biketrip` | Public | `main` | 6 (`chore/*` — migrations Expo, sécurité, ESLint) | OUI |
| EduQuiz | `Pablo5Berriz/eduquiz` | Public | `main` | 13 (`dependabot/*`, `fix/typecheck-phase2`, `claude/eduquiz-repo-audit-*`) | OUI |
| Cosmechic | `Pablo5Berriz/cosmechic-` | Public | `main` | 1 (`codex/import-cosmechic`) | OUI |
| Forum Sportif | `Pablo5Berriz/forum-sportif` | Public | `main` | 0 (branche unique) | OUI |
| SLG Tech | `Pablo5Berriz/slg-tech` | Public | `main` | 0 (branche unique) | OUI |
| WeatherWise | `Pablo5Berriz/weatherwise` | Public | `main` | 0 (branche unique) | OUI |
| Garage Auto Gonzague | `Pablo5Berriz/garage-auto-gonzague` | Public | `main` | 0 (branche unique) | OUI |
| Bilik Farm | `Pablo5Berriz/bilik-farm` | Public | `main` | 0 (branche unique) | OUI |
| ComptaClems | `Pablo5Berriz/comptaclems` | Public | `main` | 0 (branche unique) | OUI |
| Logigest | `Pablo5Berriz/logigest` | Public | `main` | 0 (branche unique) | OUI |
| Cv Expert | `Pablo5Berriz/cv-expert` | **Privé** | `main` | 1 (`claude/saas-cv-ats-matching-*`) | OUI |
| Paroisse Hub | `Pablo5Berriz/paroisse-hub` | **Privé** | `feat/lot4-migration` (pas de `main`) | 8 (`codex/*`, `feat/data-import-*`, `fix/prod-nodemailer-*`, `ux/redesign-1-cadrage`) | OUI |
| Infotechs Solutions | `Pablo5Berriz/infotechs-solutions` | Public | `main` | 0 (branche unique) | OUI |
| MediaHub | `Pablo5Berriz/mediahub` | Public | `main` | 0 (branche unique) | OUI |
| workflow-ai-agents | `Pablo5Berriz/workflow-ai-agents` | Public | `main` | 0 (branche unique) | OUI |
| Proxmox | *aucun dépôt logiciel* | — | — | — | Projet d'infrastructure, non un dépôt de code (voir section 21 de la directive) |

Nombre de dépôts examinés : **15**. Nombre de projets examinés (dépôts + Proxmox) : **16**.

## 4. Mapping projets ↔ dépôts

Correspondance établie sur la base du contenu réel des README (description du domaine métier en français, cohérente avec le nom et la description du projet dans le Portfolio) et non uniquement sur la ressemblance du nom de dépôt. Aucune ambiguïté rencontrée : les 15 dépôts trouvés correspondent chacun sans équivoque à un seul projet nommé, et leur contenu (quand du code existe) confirme le domaine métier attendu (ex. Forum Sportif → contrôleurs `QuestionsController`/`ResponsesController`, Cosmechic → `CartController`/`ProduitsController`).

## 5. Branches inspectées

| Dépôt | Branches inspectées | Justification de la couverture |
|---|---|---|
| `biketrip` | `main` (contenu complet) | Les 6 autres branches sont des `chore/*` déjà fusionnées via PR (`git log` de `main` montre `Merge pull request #5 from .../chore/expo-required-assets`) — `main` reflète leur contenu. |
| `eduquiz` | `main` (contenu complet) | 9 branches `dependabot/*` (bumps de dépendances, non représentatives du code produit) non inspectées individuellement — hors périmètre pertinent. `claude/eduquiz-repo-audit-*` déjà fusionnée (`Merge pull request #12` visible dans `main`). `fix/typecheck-phase2` non fusionnée, **non inspectée séparément** — limitation documentée, `main` reste la branche la plus représentative de l'état livré (confirmé par son propre document `docs/09-implementation-status.md`, mis à jour et nuancé). |
| `cosmechic-` | `main` **et** `codex/import-cosmechic` (contenu complet des deux) | Les deux branches existantes ont été inspectées intégralement — c'est précisément ce cas que la directive anticipait : `main` seul aurait conclu à tort "README-only". |
| `forum-sportif` | `main` (branche unique) | Aucune autre branche n'existe. |
| `slg-tech` | `main` (branche unique) | Aucune autre branche n'existe. |
| `weatherwise` | `main` (branche unique) | Aucune autre branche n'existe. |
| `garage-auto-gonzague` | `main` (branche unique) | Aucune autre branche n'existe. |
| `bilik-farm` | `main` (branche unique) | Aucune autre branche n'existe. |
| `comptaclems` | `main` (branche unique) | Aucune autre branche n'existe. |
| `logigest` | `main` (branche unique) | Aucune autre branche n'existe. |
| `cv-expert` | `main` (contenu complet) | `claude/saas-cv-ats-matching-*` : le rapport interne du dépôt (`RAPPORT_PHASE_1.md`, présent sur `main`) documente que son contenu a déjà été intégré à `main` (commit `17fb503` référence explicitement le SHA `77b0d4c` de cette branche) — pas de contenu supplémentaire à découvrir. |
| `paroisse-hub` | `feat/lot4-migration` (branche par défaut du dépôt, 645 fichiers, contenu complet) | **Aucune branche `main` n'existe sur ce dépôt** — `feat/lot4-migration` est la branche HEAD du dépôt (confirmé objectivement par `git remote show origin`), et de loin la plus volumineuse/récente. Les 8 autres branches (`codex/*`, `feat/data-import-*`, `fix/*`, `ux/redesign-1-cadrage`) n'ont **pas** été diffées individuellement — limitation documentée, mais la sélection de la branche HEAD du dépôt comme "branche la plus représentative" repose sur un signal objectif (le symref HEAD du dépôt lui-même), pas sur une supposition. |
| `infotechs-solutions` | `main` (branche unique) | Aucune autre branche n'existe. |
| `mediahub` | `main` (branche unique) | Aucune autre branche n'existe. |
| `workflow-ai-agents` | `main` (branche unique) | Aucune autre branche n'existe. |

Aucune conclusion "README-only / aucun code" n'a été tirée dans ce rapport sans vérification qu'aucune autre branche n'existait, ou (pour Cosmechic) sans inspection de l'autre branche disponible.

## 6. Vérification projet par projet

### BIKETRIP
Repository : `Pablo5Berriz/biketrip`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main`
Relevant branch : `main`
SHA : `9728ad1` (tip, `Merge pull request #5 from Pablo5Berriz/chore/expo-required-assets`)
Code present : OUI — 105 fichiers, app React Native/Expo Router complète (`app/`, `src/{types,stores,components,config,hooks,features,styles,lib}`), migrations Supabase (`supabase/migrations`)
Architecture : App mobile Expo Router, état géré par stores dédiés, backend Supabase (migrations SQL versionnées), tests RLS SQL (`supabase/tests/rls_security.sql`)
Stack verified : React Native, Expo (SDK 53), TypeScript, Supabase (`@supabase/supabase-js`), NativeWind, React Hook Form, TanStack Query
Evidence level : ÉLEVÉ (code + manifests + migrations directement inspectés)
Tests : Jest — 2 fichiers de tests unitaires trouvés (`labels.test.ts`, `geoUtils.test.ts`) + test SQL RLS dédié
CI/CD : `.github/workflows/ci.yml` présent
Assets : `assets/images/{icon,favicon,adaptive-icon,splash-icon,notification-icon}.png` — déjà exploité en VISUALS-005 (`public/images/projects/biketrip.png`)
Current Portfolio content : stack `[React Native, Expo, TypeScript, Supabase]`, status `progress`, image réelle intégrée
Divergences : Aucune — le Portfolio est actuellement le plus fidèle à la réalité du dépôt parmi tous les projets audités.
GitHub link recommendation : OUI (déjà en place, correct)
Visual recommendation : Image déjà intégrée (VISUALS-005), aucun changement nécessaire
Portfolio classification recommendation : PROJET PHARE
Action recommended : Aucune correction requise
Confidence : ÉLEVÉ

### EDUQUIZ
Repository : `Pablo5Berriz/eduquiz`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (13 autres branches recensées, non inspectées individuellement — voir section 5)
Relevant branch : `main`
SHA : `4c1dd7a` (tip, `Merge pull request #12 from .../claude/eduquiz-repo-audit-hwtp2e`)
Code present : OUI — 334 fichiers, monorepo pnpm/Turborepo (`apps/web`, `apps/mobile`, `packages/{types,ui,config,auth,email,db,utils,i18n,rate-limit}`), infra Docker (`infra/docker`)
Architecture : Monorepo Turborepo ; web Next.js ; mobile Expo (état "squelette" selon le propre document de statut du dépôt) ; DB via `packages/db` (Prisma probable, RLS mentionné) ; auth adulte livrée partiellement
Stack verified : TypeScript, Next.js (web), Expo (mobile), Turborepo, pnpm, Docker (infra), Proxmox (préparé, non validé en production réelle selon `docs/09-implementation-status.md`)
Evidence level : ÉLEVÉ (code + manifests + document de statut interne daté et nuancé)
Tests : Vitest (auth/email/rate-limit/scoring/mastery, 11 cas cités) + Playwright web minimal ("découplé du seed") ; Maestro mobile absent
CI/CD : `.github/workflows/ci.yml` + `migrations-check.yml`
Assets : `apps/web/public/images/subjects/*.svg` (12 icônes de matières scolaires, avec fichier `ATTRIBUTIONS.md` de crédits) — pas de logo/screenshot d'application
Current Portfolio content : badges `[mobile, web]`, "Application mobile éducative...", stack `[TypeScript, Next.js, Expo, Turborepo, Proxmox]`, "122 écrans inventoriés" (confirmé exact : `docs/05-screens-inventory.md` = 122 écrans), "déployé sur une infrastructure Proxmox auto-hébergée"
Divergences : **INCOMPLET** — le texte du Portfolio présente EduQuiz avant tout comme une "application mobile", mais l'app mobile est un "squelette" (écran d'accueil seul) selon le document de statut interne du dépôt lui-même ; le web est la partie la plus avancée. La formulation "déployé sur une infrastructure Proxmox auto-hébergée" est optimiste : le document interne indique "validation production réelle à faire" pour l'infra Docker/Proxmox — préparée mais pas confirmée en production réelle.
GitHub link recommendation : OUI (dépôt public, code substantiel, lien déjà en place)
Visual recommendation : AUCUN VISUEL VÉRIFIABLE représentant l'application (icônes de matières uniquement, pas de screenshot d'écran)
Portfolio classification recommendation : PROJET PHARE (à nuancer dans le texte)
Action recommended : Rééquilibrer le texte vers "web-first, mobile en cours" et adoucir la formulation sur l'hébergement Proxmox ("infrastructure préparée" plutôt que "déployé")
Confidence : ÉLEVÉ

### COSMECHIC
Repository : `Pablo5Berriz/cosmechic-`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` **et** `codex/import-cosmechic`
Relevant branch : **`codex/import-cosmechic`** (contient le seul code réel du dépôt)
SHA : `edd53b9` (`Import Cosmechic application`, commit unique sur cette branche)
Code present : OUI, mais **uniquement sur `codex/import-cosmechic`** — `main` ne contient qu'un `README.md`
Architecture : ASP.NET Core MVC (.NET 8), Entity Framework Core avec migrations réelles datées (`20240221071448_Added Front Image.cs`), SQL Server (LocalDB de développement), ASP.NET Identity, Bootstrap (vendor committé), 25 modèles, 8 contrôleurs (`Cart`, `Avis`, `OrderHeaders`, `Categories`, `Produits`, `AspNetUsers`, `OrderDetails`, `Home`), intégration Stripe (`StripeSettings.cs`)
Stack verified : **C#, ASP.NET Core (.NET 8), Entity Framework Core, SQL Server, Bootstrap, Stripe** — niveau de preuve CODE
Evidence level : ÉLEVÉ pour le code (inspecté directement) ; le README/topics du dépôt (mêmes sur les deux branches) affichent au contraire `nextjs, stripe, tailwindcss` — niveau TOPICS, **contredit par le code**
Tests : Aucun trouvé
CI/CD : Aucun
Assets : Images produits réelles committées (`wwwroot/assets/img/Logo.png`, photos catégories) — logo et visuels e-commerce réels disponibles
Current Portfolio content (legacyProjects) : stack `[Next.js, Stripe, Tailwind CSS]` — cette valeur avait été **corrigée** lors de PORTFOLIO-STABILIZE-002 sur la base du README/topics de `main`, sans qu'aucune autre branche n'ait alors été inspectée.
Divergences : **FAUX** — la stack actuellement affichée (Next.js/Tailwind) est contredite par le code réel (ASP.NET Core/Bootstrap). La correction de STABILIZE-002 est elle-même devenue une régression de fidélité, car elle a fait confiance au README plutôt qu'au code (qui n'était pas visible depuis `main`).
GitHub link recommendation : OUI, mais **le lien devrait pointer vers l'état réel** (le code n'étant que sur `codex/import-cosmechic`, un lien vers `main` seul reste trompeur)
Visual recommendation : Logo et images produits réelles disponibles dans `wwwroot/assets/img/` et `wwwroot/Images Categories/` — utilisables sous réserve de vérification des droits (images stock non attribuées observées, ex. noms de fichiers type `OIP (6).jpeg`)
Portfolio classification recommendation : PROJET ANTÉRIEUR (structure caractéristique d'un projet d'apprentissage e-commerce ASP.NET Core, à formuler prudemment)
Action recommended : **Corriger la stack** vers ASP.NET Core/EF/SQL Server/Stripe ; clarifier que le code vit sur une branche non-défaut
Confidence : ÉLEVÉ (code) / FAIBLE (README/topics, qui sont trompeurs ici)

### FORUM SPORTIF
Repository : `Pablo5Berriz/forum-sportif`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `2e3d456` (`Ajoute le projet Forum Sportif`)
Code present : **OUI** — 156 fichiers, solution ASP.NET MVC complète (`Forum_rufine_et_paul.sln`, `.csproj`), `Forum_23105.sql` (157 lignes)
Architecture : ASP.NET MVC (C#), contrôleurs `Categories`, `Questions`, `Users`, `Responses`, `Home`, vues Razor complètes par domaine (`Views/{Responses,Users,Shared,Home,Questions,Categories}`), script SQL Server de base de données
Stack verified : **C#, ASP.NET, SQL Server** — niveau de preuve CODE
Evidence level : ÉLEVÉ
Tests : Aucun trouvé
CI/CD : Aucun
Assets : `wwwroot/assets` présent (contenu non détaillé plus avant, hors périmètre visuel prioritaire de ce lot)
Current Portfolio content (legacyProjects) : stack `[C#, ASP.NET, SQL Server]`, image `null` — **CONTENT-PROVENANCE-01** (établi lors de PORTFOLIO-QA-006) affirmait que "le dépôt public actuel ne contient qu'un README"
Divergences : **CONTENT-PROVENANCE-01 EST OBSOLÈTE** — à la date de ce lot, le dépôt contient du code C#/ASP.NET substantiel et réel, cohérent avec la stack déjà affichée dans le Portfolio. Le dépôt a donc de nouveau basculé vers un état "code présent", confirmant la remarque de la directive selon laquelle ce dépôt a montré plusieurs états différents dans le temps.
GitHub link recommendation : OUI (dépôt public, code présent, cohérent avec le contenu affiché)
Visual recommendation : `wwwroot/assets` à examiner dans un futur lot visuel dédié — non traité en détail ici (hors priorité imposée par la directive, mais noté pour lot suivant)
Portfolio classification recommendation : PROJET ANTÉRIEUR / PROJET SCOLAIRE (le classement actuel en `legacyProjects` reste cohérent avec la nature scolaire du projet, indépendamment de l'état du code)
Action recommended : Mettre à jour la mention CONTENT-PROVENANCE-01 dans toute future documentation (obsolète) ; envisager de vérifier `image: null` → un asset existe peut-être désormais
Confidence : ÉLEVÉ

### SLG TECH
Repository : `Pablo5Berriz/slg-tech`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `e64b832` (`Update README.md`)
Code present : **NON** — 1 seul fichier (`README.md`)
Architecture : N/A
Stack verified : Aucune (README uniquement) — topics GitHub du dépôt : `ecommerce, tech-store, computer-store, online-shop, nextjs, stripe, tailwindcss, admin-dashboard, inventory, electronics`
Evidence level : **FAIBLE** (README/topics uniquement)
Tests : N/A
CI/CD : Aucun
Assets : Aucun
Current Portfolio content : stack `[Node.js, Express, PostgreSQL]`, description détaillée d'un audit de sécurité ("8 vulnérabilités critiques" corrigées, migration JSON→PostgreSQL), **githubUrl actuellement lié** : `https://github.com/Pablo5Berriz/SLG-Tech`
Divergences : **FAUX — divergence majeure et prioritaire.** Le README réel du dépôt ne mentionne ni audit de sécurité, ni migration JSON→PostgreSQL, ni même Node.js/Express — il décrit une "boutique en ligne" générique avec des topics `nextjs, stripe, tailwindcss`, un texte quasi identique en structure à Cosmechic, SLG Tech, Garage Auto Gonzague, etc. (README générés de façon uniforme). **Le récit actuellement publié dans le Portfolio n'est corroboré par aucune preuve dans le dépôt actuellement lié publiquement.**
GitHub link recommendation : **NON, en l'état** — un lien public pointe actuellement vers un dépôt qui ne supporte aucune des affirmations publiées
Visual recommendation : AUCUN VISUEL VÉRIFIABLE
Portfolio classification recommendation : À DÉCIDER (le contenu actuel est NON VÉRIFIABLE dans son intégralité)
Action recommended : **Décision PM requise en priorité** — soit retirer temporairement le `githubUrl` public jusqu'à ce que le code corresponde, soit reformuler le contenu pour ne plus affirmer des faits non vérifiables
Confidence : FAIBLE

### WEATHERWISE
Repository : `Pablo5Berriz/weatherwise`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `ad6a885` (`Create jekyll-gh-pages.yml`)
Code present : OUI — application Flask (`app.py`), templates Jinja (`templates/index.html`), assets statiques (`static/{styles.css,script.js,weather.jpg,WeatherWise.png}`)
Architecture : Backend Flask minimal (une route `/`, une route POST `/weather` proxyant l'API OpenWeatherMap), frontend HTML/CSS/JS servi par Flask
Stack verified : **HTML, CSS, JavaScript, Python (Flask)** — niveau de preuve CODE
Evidence level : ÉLEVÉ
Tests : Aucun
CI/CD : Un workflow existe (`jekyll-gh-pages.yml`) mais **déploie un site Jekyll — sans rapport avec l'application Flask réelle** ; ce workflow ne construit ni ne déploie l'app Python actuelle (probable reliquat d'un template GitHub Pages par défaut)
Assets : `static/WeatherWise.png`, `static/weather.jpg` — visuels déjà utilisés en VISUALS-005
Current Portfolio content (legacyProjects) : stack `[HTML, CSS, JavaScript, Python]`, image réelle intégrée
Divergences : Stack CORRECTE. **Risque de sécurité relevé** (voir section 21) : une clé API OpenWeatherMap est codée en dur dans `app.py` et committée dans ce dépôt public (`api_key = 'ea4b054...'`). Ceci concerne le dépôt externe, pas le Portfolio — aucune action sur le Portfolio n'est requise, mais le fait mérite d'être signalé au PM/propriétaire.
GitHub link recommendation : OUI (déjà en place, code cohérent avec le Portfolio)
Visual recommendation : Déjà intégré, aucun changement nécessaire
Portfolio classification recommendation : PROJET ANTÉRIEUR (déjà en `legacyProjects`, cohérent)
Action recommended : Aucune action Portfolio ; signaler à l'propriétaire l'exposition de la clé API dans le dépôt externe (hors périmètre de ce lot)
Confidence : ÉLEVÉ

### GARAGE AUTO GONZAGUE
Repository : `Pablo5Berriz/garage-auto-gonzague`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `a5befe6` (`Update README.md`)
Code present : NON — 1 seul fichier (`README.md`)
Stack verified : Aucune (README/topics uniquement) — topics : `garage-crm, auto-repair, crm, appointment-booking, nextjs, business-website, admin-dashboard, vehicles, saas, small-business`
Evidence level : FAIBLE
Tests / CI/CD / Assets : Aucun
Current Portfolio content : stack détaillée `[Next.js 14, TypeScript, Prisma, PostgreSQL, Vonage, Resend]`, `githubUrl: null` (non lié — décision déjà correcte)
Divergences : NON VÉRIFIABLE dans le dépôt (topics confirment seulement `nextjs`, rien sur Prisma/Vonage/Resend/Loi 25) — cohérent avec le traitement déjà en place (pas de lien public)
GitHub link recommendation : NON (confirmé, décision existante correcte)
Visual recommendation : AUCUN VISUEL VÉRIFIABLE
Portfolio classification recommendation : PROJET SECONDAIRE (statu quo)
Action recommended : Aucune — traitement actuel déjà cohérent avec les preuves
Confidence : FAIBLE

### BILIK FARM
Repository : `Pablo5Berriz/bilik-farm`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `307c30b` (`Merge remote-tracking branch 'origin/main'`)
Code present : **OUI** — 163 fichiers, monorepo `admin/` + `frontend/` + `backend/`, `docker-compose.yml`, `nginx/nginx.conf`
Architecture : `frontend` (Next.js 15.5.20) + `admin` (Next.js 14) + `backend` (structure NestJS complète : `src/modules/{users,auth,orders,blog,mail,categories,testimonials,contact,products}`, Prisma) ; **mais `backend/package.json`, `backend/nest-cli.json` et `backend/tsconfig.json` sont des fichiers vides (0 octet)** — l'architecture NestJS est réelle et substantielle mais **non installable/exécutable en l'état actuel du dépôt**
Stack verified : **Next.js (×2), NestJS (structure), Prisma + PostgreSQL (`provider = "postgresql"` dans `backend/src/prisma/schema.prisma`), Docker/nginx** — niveau de preuve CODE + MANIFEST (avec anomalie notée)
Evidence level : ÉLEVÉ
Tests : Aucun trouvé
CI/CD : Aucun trouvé
Assets : **Réels et nombreux** — `frontend/public/images/` contient des photos réelles de la ferme (récoltes, animaux, équipe, `Logo.png`, `Bilik_Farm.png`)
Current Portfolio content : stack `[PHP, JavaScript, MySQL]`, `githubUrl: null`
Divergences : **FAUX — divergence majeure.** La stack réelle du code est Next.js/NestJS/PostgreSQL(Prisma), sans aucune trace de PHP ou MySQL. Le dépôt contient par ailleurs son propre dossier `docs/audits/` avec des rapports d'audit internes (vulnérabilités npm, dead code, lint) — signe d'un projet ayant déjà reçu un travail de fiabilisation comparable à celui mené sur ce Portfolio.
GitHub link recommendation : **OUI possible** — dépôt public avec code substantiel (sous réserve de la décision PM, le manifest backend cassé étant à signaler)
Visual recommendation : Assets réels disponibles (`Logo.png`, `Bilik_Farm.png`, photos de la ferme) — utilisables sous réserve de vérification des droits d'image
Portfolio classification recommendation : PROJET SECONDAIRE à PROJET PHARE (à l'issue d'une correction de stack — l'ampleur réelle du code dépasse largement ce que "PHP/MySQL" laisse supposer)
Action recommended : **Corriger la stack** vers Next.js/NestJS/PostgreSQL/Prisma ; envisager d'ajouter le `githubUrl` ; signaler le manifest backend cassé (`package.json` vide) comme information technique à connaître
Confidence : ÉLEVÉ

### COMPTACLEMS
Repository : `Pablo5Berriz/comptaclems`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `5aecc69` (`Update README.md`)
Code present : NON — 1 seul fichier (`README.md`)
Stack verified : Aucune — topics : `tax-platform, accounting, tax-return, client-portal, document-management, nextjs, saas, dashboard, finance, admin-tool`
Evidence level : FAIBLE
Tests / CI/CD / Assets : Aucun
Current Portfolio content : stack détaillée `[Node.js, Express, PostgreSQL, JWT, Tailwind CSS]`, `githubUrl: null` (non lié)
Divergences : NON VÉRIFIABLE (topics indiquent `nextjs`, pas Node/Express — mais aucun code de toute façon) — cohérent avec le traitement déjà en place
GitHub link recommendation : NON (confirmé)
Visual recommendation : AUCUN VISUEL VÉRIFIABLE
Portfolio classification recommendation : PROJET SECONDAIRE (statu quo)
Action recommended : Aucune
Confidence : FAIBLE

### LOGIGEST
Repository : `Pablo5Berriz/logigest`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `0df9d83` (`Update README.md`)
Code present : NON — 1 seul fichier (`README.md`)
Stack verified : Aucune — topics : `farm-management, agriculture, livestock, accounting, saas, nextjs, supabase, postgresql, inventory, dashboard`
Evidence level : FAIBLE
Tests / CI/CD / Assets : Aucun
Current Portfolio content : stack `[Next.js, Supabase, PostgreSQL]` (déjà explicitement documentée comme provenant des topics, pas du code, depuis PORTFOLIO-CONTENT-003/INTEGRATE-004), `githubUrl: null`
Divergences : Aucune nouvelle — cohérent avec le traitement déjà en place, les topics confirment exactement la stack affichée
GitHub link recommendation : NON (confirmé)
Visual recommendation : AUCUN VISUEL VÉRIFIABLE
Portfolio classification recommendation : PROJET SECONDAIRE (statu quo)
Action recommended : Aucune
Confidence : FAIBLE

### CV EXPERT
Repository : `Pablo5Berriz/cv-expert`
Visibility : **PRIVÉ**
Default branch : `main`
Branches inspected : `main` (contenu complet) — `claude/saas-cv-ats-matching-*` déjà fusionnée (voir section 5)
Relevant branch : `main`
SHA : `17fb503` (`Ajoute le SHA du commit Phase 1 au rapport`)
Code present : OUI — 59 fichiers, `prisma/schema.prisma` avec migration appliquée, `src/{app,components,lib,middleware.ts,auth.ts,auth.config.ts}`
Architecture : Next.js 14 App Router, Prisma + PostgreSQL avec extension `pgvector` (`embedding Unsupported("vector(1536)")`, confirmé réel), NextAuth (`next-auth ^5.0.0-beta.31`), Radix UI/shadcn, Zod
Stack verified : **Next.js 14, TypeScript, Tailwind CSS, shadcn/ui (Radix), Prisma, PostgreSQL, pgvector, Auth.js** — correspond exactement à la stack déjà affichée
Evidence level : ÉLEVÉ (code + manifests inspectés directement, dépôt privé)
Tests : `playwright` présent en devDependency ; `RAPPORT_PHASE_1.md` documente 17 scénarios de test Playwright exécutés manuellement et réussis — **mais aucun fichier `.spec.ts` n'est committé dans le dépôt** : les tests ont été exécutés et rapportés, non laissés comme suite automatisée reproductible
CI/CD : Aucun
Assets : Aucun
Current Portfolio content : stack et description très fidèles à l'état réel, `githubUrl: null`, `image: null` (`imagePlaceholder: true`)
Divergences : **INCOMPLET (mineur)** — la mention "tests Playwright bout-en-bout" dans les features est vraie dans les faits (exécutés et documentés) mais légèrement optimiste si interprétée comme une suite automatisée committée ; à nuancer si le texte est retravaillé
GitHub link recommendation : **NON** — dépôt privé, pas de décision PM en ce sens
Visual recommendation : AUCUN VISUEL VÉRIFIABLE (aucune image dans le dépôt)
Portfolio classification recommendation : PROJET SECONDAIRE à PROJET PHARE (stack ambitieuse et vérifiée, en développement actif récent — migration Prisma datée de juillet 2026)
Action recommended : Aucune correction majeure requise ; nuance mineure possible sur la formulation des tests
Confidence : ÉLEVÉ

### PAROISSE HUB
Repository : `Pablo5Berriz/paroisse-hub`
Visibility : **PRIVÉ**
Default branch : `feat/lot4-migration` (aucune branche `main` n'existe sur ce dépôt)
Branches inspected : `feat/lot4-migration` (contenu complet, 645 fichiers) — 8 autres branches recensées, non diffées individuellement (voir section 5)
Relevant branch : `feat/lot4-migration`
SHA : `cab2b44` (`fix(1j-prod-safety-r3): normalize inet_server_addr /32 host mask in production fingerprint`)
Code present : **OUI, très substantiel** — 645 fichiers, `prisma/schema.prisma` + migrations + `seed.ts`, `src/{app,components,lib,i18n}`, `scripts/` (imports réels de données de diocèses/paroisses du Québec avec dry-run/rollback/certification), plus de 250 fichiers dans `docs/` et `reports/` documentant des dizaines de lots de développement réels
Architecture : Next.js App Router, Prisma + PostgreSQL, NextAuth, `next-intl` (fichiers `messages/{fr,en}.json` confirmés), Vitest (37 fichiers `*.test.ts`), Playwright e2e (`e2e/admin-flows.spec.ts`, `playwright.config.ts`), scripts d'import de données réelles avec garde-fous explicites (dry-run, preflight, rollback, certification d'environnement)
Stack verified : **Next.js, TypeScript, Prisma, NextAuth, next-intl, Tailwind CSS** — correspond exactement à la stack déjà affichée
Evidence level : ÉLEVÉ (code + manifests + CI + tests inspectés directement, dépôt privé)
Tests : Vitest (37 fichiers) + Playwright (1 suite e2e) — le plus testé de tous les projets audités
CI/CD : `.github/workflows/ci.yml` présent
Assets : **Aucun fichier image trouvé dans tout le dépôt** (recherche exhaustive `.png/.jpg/.jpeg/.svg/.webp` négative)
Current Portfolio content : badges `[saas, web]`, status `progress`, `image: null` (`imagePlaceholder: true`), description très générale ("Plateforme chrétienne de gestion de diocèses, paroisses et églises")
Divergences : **INCOMPLET — le texte du Portfolio sous-représente très largement la maturité réelle du projet.** Ce dépôt est, de tous les projets audités, celui qui dispose de la couverture de tests la plus large (Vitest + Playwright + CI), de la documentation la plus dense (plus de 250 rapports de lots), et du travail de données réelles le plus avancé (imports réels de paroisses/églises pour plusieurs diocèses québécois, avec garde-fous de sécurité en production). Rien de tout cela n'apparaît dans le texte actuel du Portfolio.
GitHub link recommendation : **NON** — dépôt privé, pas de décision PM en ce sens ; par ailleurs des données de production réelles (import de diocèses) y transitent, renforçant la prudence
Visual recommendation : **AUCUN VISUEL VÉRIFIABLE** reste une conclusion valide — aucune image committée dans le dépôt
Portfolio classification recommendation : **PROJET PHARE** (le projet le plus mature techniquement de tout le portefeuille, sous réserve de rester privé)
Action recommended : Enrichir le texte pour refléter la maturité réelle (tests, CI, ampleur des données) sans changer le statut de confidentialité du dépôt
Confidence : ÉLEVÉ

### INFOTECHS SOLUTIONS
Repository : `Pablo5Berriz/infotechs-solutions`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `0d2d807` (`Update README.md`)
Code present : NON — 1 seul fichier (`README.md`)
Stack verified : Aucune — topics : `startup-website, it-services, web-development, ai-automation, business-website, nextjs, tailwindcss, seo, ui-ux, digital-services`
Evidence level : FAIBLE
Tests / CI/CD / Assets : Aucun
Current Portfolio content : projet non présent dans le Portfolio actuellement (précédemment exclu)
Divergences : Aucune nouvelle preuve de code depuis le dernier audit — conclusion inchangée
Portfolio classification recommendation : NE PAS AJOUTER
Action recommended : **PREUVES INSUFFISANTES** — aucun changement depuis la dernière exclusion
Confidence : FAIBLE

### MEDIAHUB
Repository : `Pablo5Berriz/mediahub`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `e9fadab` (`Update README.md`)
Code present : NON — 1 seul fichier (`README.md`)
Stack verified : Aucune — topics : `media-server, jellyfin, streaming, proxmox, self-hosted, mobile-app, react-native, nextjs, video-player, mediahub`
Evidence level : FAIBLE
Tests / CI/CD / Assets : Aucun
Divergences : Aucune nouvelle preuve de code — conclusion inchangée
Portfolio classification recommendation : NE PAS AJOUTER
Action recommended : **PREUVES INSUFFISANTES**
Confidence : FAIBLE

### WORKFLOW-AI-AGENTS
Repository : `Pablo5Berriz/workflow-ai-agents`
Visibility : PUBLIC
Default branch : `main`
Branches inspected : `main` (branche unique)
Relevant branch : `main`
SHA : `30ffb80` (`Update README.md`)
Code present : NON — 1 seul fichier (`README.md`)
Stack verified : Aucune — topics : `ai-agents, workflow, automation, orchestration, multi-agent-system, llm, saas, task-management, ai-platform, productivity`
Evidence level : FAIBLE
Tests / CI/CD / Assets : Aucun
Divergences : Aucune nouvelle preuve de code — conclusion inchangée
Portfolio classification recommendation : NE PAS AJOUTER
Action recommended : **PREUVES INSUFFISANTES**
Confidence : FAIBLE

### PROXMOX
Repository : Aucun (projet d'infrastructure, pas un dépôt logiciel)
Evidence level : MOYEN (corroboration indirecte)
Preuve disponible : Le dépôt `eduquiz` référence lui-même une infrastructure Proxmox préparée (`docs/02-stack-proxmox.md`, `infra/docker`, statut "Préparé... validation production réelle à faire" dans `docs/09-implementation-status.md`) — corrobore indirectement l'existence réelle du serveur, sans en prouver l'état de production complet
Current Portfolio content : stack `[Proxmox, Linux]`, status `production`, "Serveur personnel Proxmox configuré de A à Z et fonctionnel"
Divergences : NON VÉRIFIABLE directement (pas d'accès à l'infrastructure, conformément à l'interdiction de la directive) ; le statut `production` du Portfolio est légèrement plus affirmatif que ce que documente EduQuiz lui-même ("validation production réelle à faire")
Portfolio classification recommendation : PROJET SECONDAIRE (statu quo)
Action recommended : Aucune action requise sans preuve supplémentaire — signaler la nuance seulement
Confidence : MOYEN

## 7. Stacks vérifiées

| Projet | Stack Portfolio actuelle | Stack vérifiée dépôt | Niveau de preuve | Statut |
|---|---|---|---|---|
| BikeTrip | React Native, Expo, TS, Supabase | Identique | CODE | Stack Portfolio correcte |
| EduQuiz | TS, Next.js, Expo, Turborepo, Proxmox | Identique (mobile = squelette) | CODE | Stack Portfolio correcte, mais incomplète sur l'équilibre web/mobile |
| Cosmechic | Next.js, Stripe, Tailwind CSS | **C#, ASP.NET Core, EF Core, SQL Server, Bootstrap, Stripe** | CODE | **Stack Portfolio fausse** |
| Forum Sportif | C#, ASP.NET, SQL Server | Identique | CODE | Stack Portfolio correcte |
| SLG Tech | Node.js, Express, PostgreSQL | Aucune (README seul, topics contradictoires) | README | **Stack Portfolio non vérifiable / probablement fausse** |
| WeatherWise | HTML, CSS, JS, Python | Identique | CODE | Stack Portfolio correcte |
| Garage Auto Gonzague | Next.js 14, TS, Prisma, PostgreSQL, Vonage, Resend | Non vérifiable (README/topics : nextjs seul confirmé) | TOPICS | Stack Portfolio non vérifiable (déjà traité comme tel) |
| Bilik Farm | PHP, JavaScript, MySQL | **Next.js (×2), NestJS, Prisma, PostgreSQL, Docker** | CODE + MANIFEST | **Stack Portfolio fausse** |
| ComptaClems | Node.js, Express, PostgreSQL, JWT, Tailwind CSS | Non vérifiable (topics : nextjs) | TOPICS | Stack Portfolio non vérifiable (déjà traité comme tel) |
| Logigest | Next.js, Supabase, PostgreSQL | Topics confirment exactement | TOPICS | Stack Portfolio correcte (déjà documentée comme issue des topics) |
| Cv Expert | Next.js 14, TS, Tailwind, shadcn/ui, Prisma, PostgreSQL, pgvector, Auth.js | Identique | CODE (privé) | Stack Portfolio correcte |
| Paroisse Hub | Next.js 15, TS, Prisma, NextAuth, next-intl, Tailwind CSS | Identique | CODE (privé) | Stack Portfolio correcte |
| Infotechs Solutions | N/A (non ajouté) | Aucune | README | Non applicable |
| MediaHub | N/A (non ajouté) | Aucune | README | Non applicable |
| workflow-ai-agents | N/A (non ajouté) | Aucune | README | Non applicable |
| Proxmox | Proxmox, Linux | Corroboré indirectement | MOYEN (indirect) | Stack Portfolio probablement correcte, statut "production" à nuancer |

## 8. États réels

| Projet | État réel |
|---|---|
| BikeTrip | EN DÉVELOPPEMENT (actif, tests + CI) |
| EduQuiz | EN DÉVELOPPEMENT (web partiel livré, mobile prototype) |
| Cosmechic | PROJET ANTÉRIEUR (import unique, structure de tutoriel probable) |
| Forum Sportif | PROJET SCOLAIRE (binôme, code complet mais non maintenu depuis) |
| SLG Tech | INCONNU (aucune preuve de code exploitable) |
| WeatherWise | PROJET ANTÉRIEUR (fonctionnel, non maintenu) |
| Garage Auto Gonzague | INCONNU (aucune preuve de code) |
| Bilik Farm | EN DÉVELOPPEMENT / MVP (architecture complète, backend non exécutable en l'état) |
| ComptaClems | INCONNU (aucune preuve de code) |
| Logigest | INCONNU (aucune preuve de code) |
| Cv Expert | EN DÉVELOPPEMENT (actif, MVP fondations livrées juillet 2026) |
| Paroisse Hub | ACTIF (production track, données réelles, tests+CI matures) |
| Infotechs Solutions | INCONNU |
| MediaHub | INCONNU |
| workflow-ai-agents | INCONNU |
| Proxmox | ACTIF (corroboré indirectement, sans preuve de production complète) |

## 9. Tests et CI des projets

| Projet | Tests | CI/CD |
|---|---|---|
| BikeTrip | Jest (2 fichiers) + test SQL RLS | `ci.yml` |
| EduQuiz | Vitest (11 cas cités) + Playwright web minimal | `ci.yml` + `migrations-check.yml` |
| Cosmechic | Aucun | Aucun |
| Forum Sportif | Aucun | Aucun |
| SLG Tech | N/A (pas de code) | N/A |
| WeatherWise | Aucun | Workflow présent mais sans rapport avec l'app (Jekyll) |
| Garage Auto Gonzague | N/A | N/A |
| Bilik Farm | Aucun | Aucun |
| ComptaClems | N/A | N/A |
| Logigest | N/A | N/A |
| Cv Expert | Playwright (17 scénarios exécutés, non committés en suite auto) | Aucun |
| Paroisse Hub | Vitest (37 fichiers) + Playwright e2e | `ci.yml` |
| Infotechs/MediaHub/workflow-ai-agents | N/A | N/A |
| Proxmox | N/A (infrastructure) | N/A |

## 10. Assets et visuels

| Projet | Asset | Chemin | Branche | Type | Pertinence | Recommandation |
|---|---|---|---|---|---|---|
| BikeTrip | Icône app (déjà utilisée) | `assets/images/icon.png` | `main` | Icône réelle | Haute | Déjà intégré (VISUALS-005) |
| EduQuiz | Icônes de matières scolaires | `apps/web/public/images/subjects/*.svg` | `main` | Icônes UI (pas un logo/screenshot d'app) | Faible pour une image de couverture | Ne résout pas le placeholder — pas un visuel représentatif de l'app |
| Cosmechic | Logo + photos produits | `wwwroot/assets/img/Logo.png`, `wwwroot/Images Categories/*` | `codex/import-cosmechic` | Logo réel + images produits (droits à vérifier) | Moyenne à haute | À évaluer dans un futur lot visuel dédié |
| Forum Sportif | `wwwroot/assets` | `Forum_rufine_et_paul/wwwroot/assets` | `main` | Non inventorié en détail | — | À examiner dans un futur lot |
| WeatherWise | Logo + photo (déjà utilisés) | `static/WeatherWise.png`, `static/weather.jpg` | `main` | Réels | Haute | Déjà intégré (VISUALS-005) |
| Bilik Farm | Logo + photos de la ferme | `frontend/public/images/{Logo.png,Bilik_Farm.png,...}.{jpg,png}` | `main` | Logo + photos réelles de la ferme | Haute | Candidat sérieux pour un futur lot visuel (droits à vérifier) |
| Cv Expert | — | — | — | Aucun | — | AUCUN VISUEL VÉRIFIABLE |
| Paroisse Hub | — | — | — | Aucun | — | AUCUN VISUEL VÉRIFIABLE |
| SLG Tech / Garage Auto Gonzague / ComptaClems / Logigest / Infotechs / MediaHub / workflow-ai-agents | — | — | — | Aucun (README-only) | — | AUCUN VISUEL VÉRIFIABLE |

Aucune fausse capture n'a été générée ni recommandée. Aucun asset n'a été copié ou intégré dans ce lot (audit uniquement).

## 11. Liens GitHub recommandés

| Projet | githubUrl actuel | Dépôt réel | Visibilité | Lien recommandé | Justification |
|---|---|---|---|---|---|
| BikeTrip | `.../biketrip` | Confirmé | PUBLIC | OUI (déjà en place) | Code substantiel et cohérent |
| EduQuiz | `.../eduquiz` | Confirmé | PUBLIC | OUI (déjà en place) | Code substantiel et cohérent |
| Cosmechic | `.../cosmechic-` | Confirmé (code sur branche non-défaut) | PUBLIC | OUI, avec réserve | Code réel mais pas sur la branche par défaut — trompeur sans nuance |
| Forum Sportif | `.../Forum-Sportif` | Confirmé | PUBLIC | OUI (déjà en place) | Code réel désormais présent (CONTENT-PROVENANCE-01 obsolète) |
| SLG Tech | `.../SLG-Tech` | Confirmé, mais README-only | PUBLIC | **NON — à reconsidérer d'urgence** | Aucune preuve dans le dépôt ne corrobore le récit publié |
| WeatherWise | `.../WeatherWise` | Confirmé | PUBLIC | OUI (déjà en place) | Code cohérent |
| Garage Auto Gonzague | `null` | Confirmé, README-only | PUBLIC | NON (confirmé) | Pas de code |
| Bilik Farm | `null` | Confirmé, code substantiel | PUBLIC | OUI possible (décision PM) | Code public et substantiel désormais avéré |
| ComptaClems | `null` | Confirmé, README-only | PUBLIC | NON (confirmé) | Pas de code |
| Logigest | `null` | Confirmé, README-only | PUBLIC | NON (confirmé) | Pas de code |
| Cv Expert | `null` | Confirmé, code substantiel | **PRIVÉ** | **NON** (par défaut) | Dépôt privé |
| Paroisse Hub | `null` | Confirmé, code très substantiel | **PRIVÉ** | **NON** (par défaut) | Dépôt privé, données réelles sensibles |
| Infotechs/MediaHub/workflow-ai-agents | N/A | Confirmés, README-only | PUBLIC | NON | Pas de code, projets non ajoutés |

## 12. Dépôts privés

Deux dépôts privés ont été rencontrés et servent de preuve technique interne valide pour ce rapport, sans jamais avoir été rendus publics :

- `Pablo5Berriz/cv-expert` — attaché en lecture seule via `add_repo`, cloné localement, jamais exposé
- `Pablo5Berriz/paroisse-hub` — attaché en lecture seule via `add_repo`, cloné localement, jamais exposé ; contient en outre des scripts d'import de données réelles (paroisses/églises du Québec) — raison supplémentaire de prudence

Aucun secret, jeton, ou identifiant n'a été copié hors de l'inspection locale. Aucune URL de dépôt privé n'a été rendue publique dans le Portfolio ni dans aucun livrable de ce lot. Conformément à la directive, le lien public recommandé pour ces deux projets reste **NON** par défaut, en l'attente d'une décision PM explicite.

## 13. Projets précédemment exclus

| Projet | Ancienne conclusion | Nouvelle vérification | Nouvelle conclusion |
|---|---|---|---|
| Infotechs Solutions | Aucun code, README seul | Confirmé identique (1 fichier, mêmes topics) | **PREUVES INSUFFISANTES** — NE PAS AJOUTER |
| MediaHub | Aucun code, README seul | Confirmé identique (1 fichier, mêmes topics) | **PREUVES INSUFFISANTES** — NE PAS AJOUTER |
| workflow-ai-agents | Aucun code, README seul | Confirmé identique (1 fichier, mêmes topics) | **PREUVES INSUFFISANTES** — NE PAS AJOUTER |

Aucun des trois ne montre de nouvelle preuve de code, de maturité, de tests ou d'assets depuis le dernier audit. Aucune étude de cas n'a été créée pour ces projets, conformément au périmètre interdit de ce lot.

## 14. Comparaison avec le contenu Portfolio

| Projet | Champ | Portfolio actuel | GitHub vérifié | Statut |
|---|---|---|---|---|
| Cosmechic | stack | Next.js, Stripe, Tailwind CSS | C#, ASP.NET Core, EF Core, SQL Server, Bootstrap, Stripe | **FAUX** |
| Bilik Farm | stack | PHP, JavaScript, MySQL | Next.js, NestJS, Prisma, PostgreSQL | **FAUX** |
| SLG Tech | stack + description | Node.js/Express/PostgreSQL, audit sécurité 8 vulnérabilités | Aucune preuve, README générique sans rapport | **FAUX** |
| Forum Sportif | statut implicite (CONTENT-PROVENANCE-01) | "Dépôt README-only" | Code C#/ASP.NET complet présent | **OBSOLÈTE** |
| EduQuiz | badges/description (framing "app mobile") | "Application mobile éducative..." | Mobile = squelette ; web = plus avancé | **INCOMPLET** |
| EduQuiz | hébergement Proxmox | "déployé... de la conception à l'hébergement" | "Préparé... validation production réelle à faire" | **INCOMPLET** (optimiste) |
| Paroisse Hub | description/statut | Générique, `status: progress` | Production track, tests+CI matures, 250+ rapports de lots | **INCOMPLET** (sous-représenté) |
| Proxmox | statut | `production` | Corroboré indirectement, "validation réelle à faire" côté EduQuiz | **NON VÉRIFIABLE** (nuance) |
| BikeTrip | tout | — | — | **CORRECT** |
| WeatherWise | tout | — | — | **CORRECT** |
| Cv Expert | tout | — | — | **CORRECT** (nuance mineure sur les tests) |
| Logigest | stack | — | — | **CORRECT** (déjà documenté TOPICS) |
| Garage Auto Gonzague / ComptaClems | tout | — | — | **NON VÉRIFIABLE** (déjà traité comme tel) |

## 15. Conclusions devenues obsolètes

| Ancienne conclusion | Projet | Toujours vraie | Nouvelle preuve | Nouvelle conclusion |
|---|---|---|---|---|
| "Dépôt README-only" (CONTENT-PROVENANCE-01) | Forum Sportif | **NON** | Code C#/ASP.NET complet (156 fichiers) présent sur `main` | Code réel actuellement présent — CONTENT-PROVENANCE-01 obsolète |
| Stack corrigée vers Next.js/Stripe/Tailwind (STABILIZE-002) | Cosmechic | **NON** | Code réel = ASP.NET Core/EF/SQL Server/Bootstrap/Stripe, sur `codex/import-cosmechic` | La correction STABILIZE-002 doit elle-même être révisée |
| "6/7 dépôts README-only, repos confirmés réels mais sans code" | Garage Auto Gonzague, ComptaClems | OUI | Aucun changement | Inchangée |
| "6/7 dépôts README-only" | Bilik Farm | **NON** | Code Next.js/NestJS complet (163 fichiers) désormais présent | Stack à corriger, projet à requalifier |
| Stack SLG Tech vérifiée (implicite, projet historique) | SLG Tech | **NON vérifiable désormais** | Dépôt actuel = README générique sans rapport avec le récit publié | Divergence majeure à trancher par le PM |
| "githubUrl à laisser null" | Bilik Farm | À reconsidérer | Code public substantiel désormais avéré | Lien potentiellement recommandable (décision PM) |
| "githubUrl à laisser null" | Garage Auto Gonzague, ComptaClems, Logigest | OUI | Aucun changement | Inchangée |
| "Ne pas ajouter" | Infotechs Solutions, MediaHub, workflow-ai-agents | OUI | Aucun changement | Inchangée |
| "Stack Logigest venant seulement des topics" | Logigest | OUI | Aucun changement | Inchangée, toujours correctement documentée comme telle |

## 16. Nouvelle classification professionnelle

| Projet | Classification recommandée |
|---|---|
| BikeTrip | PROJET PHARE |
| Paroisse Hub | PROJET PHARE |
| EduQuiz | PROJET PHARE (texte à rééquilibrer) |
| Bilik Farm | PROJET SECONDAIRE à PHARE (après correction de stack) |
| Cv Expert | PROJET SECONDAIRE à PHARE |
| Cosmechic | PROJET ANTÉRIEUR |
| Forum Sportif | PROJET ANTÉRIEUR / SCOLAIRE |
| WeatherWise | PROJET ANTÉRIEUR |
| Garage Auto Gonzague | PROJET SECONDAIRE |
| ComptaClems | PROJET SECONDAIRE |
| Logigest | PROJET SECONDAIRE |
| SLG Tech | **À DÉCIDER** (divergence majeure non résolue) |
| Proxmox | PROJET SECONDAIRE |
| Infotechs Solutions / MediaHub / workflow-ai-agents | NE PAS AFFICHER |

## 17. Corrections Portfolio recommandées

(À décision du PM — aucune modification appliquée dans ce lot)

1. **Cosmechic** : corriger `stack` vers `[C#, ASP.NET Core, Entity Framework Core, SQL Server, Stripe]` ; clarifier que le code vit sur la branche `codex/import-cosmechic`
2. **Bilik Farm** : corriger `stack` vers `[Next.js, NestJS, Prisma, PostgreSQL]` (ou équivalent) ; envisager `githubUrl`
3. **SLG Tech** : décision urgente — retirer `githubUrl` ou reformuler le contenu pour ne plus affirmer des faits non vérifiables
4. **EduQuiz** : rééquilibrer le texte "application mobile" vers un framing web-first/mobile-en-cours ; adoucir la formulation sur l'hébergement Proxmox
5. **Paroisse Hub** : enrichir le texte pour refléter la maturité réelle (tests, CI, ampleur du travail de données), sans changer la confidentialité du dépôt ni ajouter de lien public
6. **Forum Sportif** : retirer toute référence à CONTENT-PROVENANCE-01 comme motif de traitement condensé (le dépôt contient à nouveau du code réel)
7. **Proxmox** : nuancer éventuellement `status: production` compte tenu de la corroboration partielle côté EduQuiz

## 18. Projets à ajouter éventuellement

Aucun. Infotechs Solutions, MediaHub et workflow-ai-agents restent à l'état **PREUVES INSUFFISANTES** — aucune création d'étude de cas effectuée, conformément au périmètre interdit de ce lot.

## 19. Placeholders pouvant maintenant être résolus

| Projet | Asset | Chemin | Branche | SHA | Type | Pertinence | Recommandation |
|---|---|---|---|---|---|---|---|
| Bilik Farm | Logo + photos réelles | `frontend/public/images/*` | `main` | `307c30b` | Logo + photos réelles | Haute | Candidat sérieux pour un futur lot visuel dédié (droits à vérifier avant intégration) |
| Cosmechic | Logo + photos produits | `wwwroot/assets/img/*`, `wwwroot/Images Categories/*` | `codex/import-cosmechic` | `edd53b9` | Logo + images produits (droits à vérifier — noms de fichiers suggérant des images stock non attribuées) | Moyenne | À évaluer dans un futur lot visuel, après vérification des droits |

## 20. Placeholders restant réellement bloqués

- **Cv Expert** : aucune image dans le dépôt — `AUCUN VISUEL VÉRIFIABLE` confirmé
- **Paroisse Hub** : aucune image dans le dépôt — `AUCUN VISUEL VÉRIFIABLE` confirmé
- **Logigest, Garage Auto Gonzague, ComptaClems, SLG Tech, Infotechs Solutions, MediaHub, workflow-ai-agents** : README-only, aucun asset — `AUCUN VISUEL VÉRIFIABLE` confirmé
- **Proxmox** : projet d'infrastructure, aucun dépôt logiciel — pas d'asset applicable

## 21. Risques

1. **Inventaire du compte GitHub non exhaustif par outillage** : le listing automatique de tous les dépôts du compte est bloqué par le proxy de session. Ce rapport couvre les 16 projets nommés par la directive avec des noms de dépôts vérifiés un par un ; il ne peut cependant pas garantir l'absence totale de dépôts supplémentaires non nommés et non découverts.
2. **SLG Tech** : un lien GitHub public actuellement affiché dans le Portfolio pointe vers un dépôt dont le contenu ne corrobore aucune des affirmations publiées (audit de sécurité, migration de données). C'est le risque de crédibilité le plus élevé identifié dans ce lot — visible par n'importe quel visiteur cliquant sur le lien.
3. **WeatherWise (dépôt externe)** : une clé API tierce est codée en dur et committée dans le dépôt public `weatherwise`. Hors périmètre de correction pour ce lot (dépôt externe, pas le Portfolio), mais à signaler au propriétaire.
4. **Cosmechic** : le code réel n'est pas sur la branche par défaut du dépôt — un lien public simple vers le dépôt (sans préciser la branche) resterait trompeur pour un visiteur qui ne verrait qu'un README sur `main`.
5. **Bilik Farm** : le `backend/package.json` (et `nest-cli.json`, `tsconfig.json`) sont des fichiers vides — le backend, bien que structurellement réel, n'est pas exécutable en l'état si quelqu'un tentait de le lancer.
6. **Branches non diffées individuellement** : `eduquiz` (`fix/typecheck-phase2`) et `paroisse-hub` (8 branches hors `feat/lot4-migration`) n'ont pas été comparées intégralement à la branche retenue — limite de temps documentée, jugée non bloquante car la branche retenue dans chaque cas est objectivement la plus représentative (HEAD du dépôt / branche par défaut avec historique fusionné).
7. **Droits d'image non vérifiés** : les visuels candidats identifiés (Bilik Farm, Cosmechic) n'ont pas fait l'objet d'une vérification de droits d'auteur/licence — nécessaire avant toute intégration future.

## 22. Décisions requises du PM

1. **SLG Tech** : retirer le lien GitHub public ou reformuler le contenu ? (urgent, risque de crédibilité)
2. **Cosmechic** : valider la correction de stack vers ASP.NET Core, et la façon de présenter un projet dont le code n'est pas sur la branche par défaut
3. **Bilik Farm** : valider la correction de stack, et décider si `githubUrl` doit être ajouté
4. **EduQuiz** : valider le rééquilibrage du texte (mobile squelette vs. web plus avancé ; nuance sur l'hébergement Proxmox)
5. **Paroisse Hub** : valider l'enrichissement du texte (sans changer la confidentialité ni ajouter de lien)
6. **Forum Sportif** : valider que CONTENT-PROVENANCE-01 est levé
7. **Visuels Bilik Farm / Cosmechic** : autoriser (ou non) un futur lot visuel pour ces deux projets, sous réserve de vérification des droits
8. **Proxmox** : valider ou non la nuance sur le statut `production`

## 23. Prochain lot recommandé

**PORTFOLIO-CONTENT-SYNC-008** — application, sous supervision PM, des corrections de contenu identifiées dans ce rapport (stacks Cosmechic/Bilik Farm, décision SLG Tech, rééquilibrage EduQuiz/Paroisse Hub, levée de CONTENT-PROVENANCE-01), strictement sur la base des décisions prises en réponse à la section 22. Un lot visuel séparé (Bilik Farm / Cosmechic, sous réserve de vérification des droits) pourrait suivre une fois le contenu textuel stabilisé.

## 24. Verdict

**PASS — NOUVELLE BASELINE DE PREUVES ÉTABLIE**

L'audit contradictoire a été mené sur les 16 projets nommés, avec le même niveau d'exigence pour chacun, en s'appuyant sur une inspection directe du code réel (clone local) plutôt que sur les conclusions des rapports précédents. Deux divergences majeures ont été identifiées (Cosmechic, Bilik Farm — stacks fausses) et une divergence critique nécessitant une décision urgente (SLG Tech — lien public non corroboré). Une conclusion antérieure est devenue obsolète (Forum Sportif / CONTENT-PROVENANCE-01). Aucune modification du Portfolio n'a été appliquée ; toutes les corrections proposées sont soumises à décision PM.
