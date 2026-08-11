# PORTFOLIO-CONTENT-003 — Rapport

Lot : PORTFOLIO-CONTENT-003 | Type : réconciliation du contenu projets avec les dépôts GitHub réels

## 1. Baseline

| Élément | Valeur |
|---|---|
| Baseline exigée | `6bd3c29af379662a9187648b125621748183a1a3` (validé PORTFOLIO-STABILIZE-002) |
| `origin/main` au preflight | `212f6836...` — **ne contient pas encore `6bd3c29`** |
| Décision prise | Conformément à la directive, la branche part de `fix/portfolio-stabilize-002` (à `6bd3c29`), pas de `main`, pour ne pas perdre les corrections du lot 002 |
| Branche de travail | `content/portfolio-content-003`, créée depuis `6bd3c29` |
| Working tree initial | Propre |

## 2. Inventaire initial

12 projets affichés au départ (10 études de cas complètes + 2 projets antérieurs condensés) :

| Projet | Type/badges | Statut | FR/EN | Stack (avant) | githubUrl (avant) | Image | Niveau de détail |
|---|---|---|---|---|---|---|---|
| Paroisse Hub | saas, web | progress | ✓/✓ | Next.js 15, TypeScript, Prisma, NextAuth, next-intl, Tailwind CSS | null | placeholder | Complet |
| EduQuiz | mobile | progress | ✓/✓ | TypeScript, Proxmox | réel (eduquiz) | placeholder | Complet |
| Cv Expert | saas, backend | progress | ✓/✓ | Next.js 14, TypeScript, Tailwind, shadcn/ui, Prisma, PostgreSQL, pgvector, Auth.js | null | placeholder | Complet |
| Garage Auto Gonzague | web, saas, backend | production | ✓/✓ | Next.js 14, TypeScript, Prisma, PostgreSQL, Vonage, Resend | null | réelle | Complet |
| SLG Tech | web, backend | completed | ✓/✓ | Node.js, Express, PostgreSQL | réel (SLG-Tech) | réelle | Complet |
| Logigest | saas | progress | ✓/✓ | SaaS, Agents IA | null | placeholder | Complet |
| Bilik Farm | web | completed | ✓/✓ | PHP, JavaScript, MySQL | null | réelle | Complet |
| ComptaClems | saas, backend | progress | ✓/✓ | Node.js, Express, PostgreSQL, JWT, Tailwind CSS | null | réelle | Complet |
| Forum Sportif | web | completed | ✓/✓ | C#, ASP.NET, SQL Server, HTML, CSS, JS | réel (Forum-Sportif) | placeholder | Complet |
| Proxmox | infra | production | ✓/✓ | Proxmox, Linux | null | placeholder | Complet |
| Cosmechic (antérieur) | web | — | ✓/✓ | Next.js, Stripe, Tailwind CSS | réel (cosmechic-, corrigé lot 002) | réelle | Condensé |
| WeatherWise (antérieur) | web | — | ✓/✓ | HTML, CSS, JavaScript, Python | réel (WeatherWise) | réelle | Condensé |

## 3. Inventaire GitHub

Vérification directe (WebFetch, code/manifestes en priorité sur README) des 8 dépôts désignés par le PM, plus EduQuiz (déjà lié mais jamais vérifié au niveau code) :

| Dépôt | Existe | Commits | Code réel visible | package.json | Tests | CI | Stars/Forks |
|---|---|---|---|---|---|---|---|
| `garage-auto-gonzague` | Oui | 2 | **Non — README seul** | Non | — | — | 0/0 |
| `logigest` | Oui | 2 | **Non — README seul** | Non | — | — | 0/0 |
| `bilik-farm` | Oui | 2 | **Non — README seul** | Non | — | — | 0/0 |
| `comptaclems` | Oui | 2 | **Non — README seul** | Non | — | — | 0/0 |
| `biketrip` | Oui | **27** | **Oui — arborescence complète** (`app/`, `src/`, `supabase/`, `.github/workflows/`, `docs/`) | Oui | Oui (Jest + RLS SQL) | Oui | 0/0 |
| `infotechs-solutions` | Oui | 3 | **Non — README seul** | Non | — | — | 0/0 |
| `workflow-ai-agents` | Oui | 2 | **Non — README seul** | Non | — | — | 0/0 |
| `mediahub` | Oui | 2 | **Non — README seul** | Non | — | — | 0/0 |
| `eduquiz` | Oui | **70** | **Oui — monorepo Turborepo/pnpm** (`apps/`, `packages/`, `.github/`, `.husky/`, `infra/docker/`) | Oui | CI présente (`.github/`) | Oui | non relevé |

**Constat central de ce lot** : **7 sur 8 dépôts ciblés sont README-only** (2-3 commits, 0 code source vérifiable). **BikeTrip est le seul des 8 avec du code substantiel.** EduQuiz a été audité en complément comme neuvième dépôt (hors des 8 désignés par le PM), et s'avère lui aussi contenir du code réel substantiel. Ce constat détermine directement les décisions de liaison en section 6.

## 4. Matrice de classification A/B/C/D/E

| Projet | Classe | Justification |
|---|---|---|
| EduQuiz | **A — Phare** | Monorepo réel vérifié (70 commits, Turborepo, apps web+mobile, CI, docs, changelog) ; démonstration technique la plus solide du portfolio |
| Garage Auto Gonzague | **A — Phare** | Projet client réel en production (facturation, conformité Loi 25) ; la faiblesse du dépôt public (README seul) ne retire rien à la valeur du projet lui-même, qui n'est pas un projet open-source |
| Paroisse Hub | **B — Secondaire** | Stack riche et vérifiable via manifeste fourni par le propriétaire ; pas de dépôt public à ce nom, non vérifiable indépendamment |
| Cv Expert | **B — Secondaire** | Idem : profondeur technique réelle (schéma Prisma, Auth.js, conformité Loi 25) mais non vérifiable via un dépôt public |
| SLG Tech | **B — Secondaire** | Dépôt public réel et fonctionnel, signal de compétence sécurité clair (remédiation de vulnérabilités) |
| Logigest | **B — Secondaire** | Dépôt réel mais README seul (aucun code) ; stack corrigée d'après les technologies déclarées via les topics GitHub du dépôt — une métadonnée déclarative du propriétaire, pas une vérification par le code |
| Bilik Farm | **B — Secondaire** | Dépôt réel mais README seul ; contenu existant déjà cohérent avec la description du dépôt |
| ComptaClems | **B — Secondaire** | Dépôt réel mais README seul ; fonctionnalités de sécurité (2FA, rate limiting) déjà bien documentées dans l'étude de cas |
| BikeTrip | **B — Secondaire (nouveau)** | Preuve de code la plus solide après EduQuiz (27 commits, tests, CI) mais pas encore déployé/publié — statut "en cours" honnête |
| Proxmox | **B — Secondaire** | Infrastructure personnelle réelle, complémentaire aux autres projets (héberge EduQuiz) ; pas de dépôt de code par nature |
| Cosmechic | **C — Antérieur** | Dépôt réel mais README seul (déjà traité lot 002) ; format condensé déjà approprié |
| WeatherWise | **C — Antérieur** | Dépôt réel et fonctionnel, projet de formation ; format condensé approprié |
| Forum Sportif | **C — Antérieur** *(reclassé ce lot)* | Explicitement un projet de formation ("réalisé en formation, développé en binôme") ; dépôt réel mais modeste (4 commits, projet scolaire) — mieux à sa place en format condensé qu'en étude de cas complète |
| Infotechs Solutions | **E — Information insuffisante** | Dépôt réel mais README seul, 3 commits, aucun code, aucune preuve de fonctionnalités implémentées |
| workflow-ai-agents | **E — Information insuffisante** | Dépôt réel mais README seul, 2 commits ; hors périmètre de ce lot de toute façon |
| MediaHub | **E — Information insuffisante** | Dépôt réel mais README seul, 2 commits ; hors périmètre de ce lot de toute façon |

Aucun projet classé **D — Ne pas afficher** : tous les projets actuellement affichés ont une justification de présence suffisante (soit code vérifié, soit faits détaillés fournis directement par le propriétaire).

## 5. Projets conservés

Les 9 projets suivants restent inchangés dans leur contenu (structure, stack, statut, liens) : Paroisse Hub, Cv Expert, Garage Auto Gonzague, SLG Tech, Bilik Farm, ComptaClems, Proxmox, Cosmechic, WeatherWise. Décision explicite pour les 4 avec `githubUrl: null` (Garage Auto Gonzague, Bilik Farm, ComptaClems, et Logigest avant correction de stack) : **aucun lien GitHub ajouté**, les dépôts correspondants existent bien et correspondent au projet, mais ne contiennent aucun code vérifiable (README seul, 2 commits, 0 étoile) — les lier créerait une attente ("voir le dépôt") non satisfaite au clic, ce qui nuirait à la crédibilité plutôt que de la renforcer. Cette décision est réversible dès que du code réel sera poussé dans ces dépôts.

## 6. Projets corrigés

| Projet | Champ | Avant | Après | Preuve |
|---|---|---|---|---|
| EduQuiz (fr+en) | `badges` | `[mobile]` | `[mobile, web]` | Monorepo réel contient `apps/` avec une app web Next.js **et** une app mobile Expo |
| EduQuiz (fr+en) | `stack` | `[TypeScript, Proxmox]` | `[TypeScript, Next.js, Expo, Turborepo, Proxmox]` | Structure de dépôt vérifiée : `turbo.json`, `pnpm-workspace.yaml`, `apps/` (web+mobile) |
| Logigest (fr+en) | `stack` | `[SaaS, Agents IA]` | `[Next.js, Supabase, PostgreSQL]` | Technologies déclarées via les topics GitHub du dépôt réel (Next.js, Supabase, PostgreSQL) — une métadonnée renseignée par le propriétaire du dépôt, pas une stack vérifiée par le code (le dépôt ne contient aucun code source, voir §3). L'angle "agents IA" reste pleinement décrit dans les `features` (non perdu, juste déplacé du champ stack, qui doit lister des technologies, vers le champ fonctionnalités où il était déjà) |
| Forum Sportif (fr+en) | Collection | `caseStudies` (étude de cas complète) | `legacyProjects` (format condensé) | Projet de formation explicitement identifié comme tel dans son propre texte ; reclassé en cohérence avec Cosmechic/WeatherWise |

Aucune autre correction : les descriptions/problèmes/fonctionnalités des autres projets n'ont montré aucune incompatibilité avec les preuves disponibles.

## 7. Projets ajoutés

**BikeTrip** (fr+en), unique ajout de ce lot :
- `githubUrl` : `https://github.com/Pablo5Berriz/biketrip` (vérifié réel, code substantiel : 27 commits, `app/`, `src/`, `supabase/`, tests Jest, CI GitHub Actions)
- `stack` : `[React Native, Expo, TypeScript, Supabase]` — vérifiée directement via la structure du dépôt (pas seulement le README)
- `status` : `progress` — factuel : le README confirme "EAS Build and publication on stores remains undelivered", aucun lien App Store/TestFlight trouvé
- `image` : `null`, `imagePlaceholder: true` — aucun visuel fiable disponible, aucune capture inventée
- `demoUrl` : `null` — aucun lien live réel trouvé

## 8. Projets volontairement non ajoutés

- **Infotechs Solutions** : dépôt réel (3 commits) mais **aucun code source visible, README seul**. Insuffisant pour produire une étude de cas honnête au-delà de ce qui est déjà su ("site vitrine pour startup tech"). Non ajouté, conformément à la règle "si les preuves sont insuffisantes, ne pas ajouter et documenter la raison."
- **workflow-ai-agents** et **MediaHub** : hors périmètre explicite de ce lot (section "HORS PÉRIMÈTRE" de la directive) ; vérifiés uniquement pour la matrice de classification (tous deux README seul, 2 commits — E, insuffisant de toute façon).

## 9. Preuves

Toutes les vérifications ci-dessus proviennent de requêtes `WebFetch` directes vers `github.com/Pablo5Berriz/<repo>`, en demandant explicitement le listing de fichiers/dossiers réel (pas seulement la description) — conformément à l'ordre de confiance de la directive (code > manifestes > configuration > tests > historique > documentation > README). Pour les 7 dépôts "README seul" (sur les 8 ciblés), l'absence de code a été confirmée par une lecture directe du listing de fichiers de la page GitHub (pas une supposition). Pour BikeTrip et EduQuiz, l'arborescence complète (dossiers `app/`, `src/`, `apps/`, `packages/`, fichiers de configuration, présence de tests) a été listée explicitement.

## 10. Fichiers modifiés

```
M  src/content/caseStudies/fr/eduquiz-public.md
M  src/content/caseStudies/en/eduquiz-public.md
M  src/content/caseStudies/fr/logigest.md
M  src/content/caseStudies/en/logigest.md
D  src/content/caseStudies/fr/forum-sportif.md
D  src/content/caseStudies/en/forum-sportif.md
A  src/content/legacyProjects/fr/forum-sportif.md
A  src/content/legacyProjects/en/forum-sportif.md
A  src/content/caseStudies/fr/biketrip.md
A  src/content/caseStudies/en/biketrip.md
A  docs/audits/portfolio-content-003.md
```

6 fichiers de contenu modifiés/déplacés, 2 fichiers de contenu ajoutés (BikeTrip), 2 fichiers de relocalisation (Forum Sportif), 1 rapport. Aucun fichier de composant, configuration, layout ou style touché.

## 11. Tests

| Commande | Résultat |
|---|---|
| `sha256sum package-lock.json` avant/après `npm ci` | Identique (`61b2ef6...`) — lockfile non modifié |
| `npm ci` | Exit 0, aucune erreur |
| `npx astro check` | Exit 0 — **0 erreurs, 0 warnings**, 41 hints cosmétiques inchangés |
| `git diff --check` | Aucune erreur d'espace blanc |
| Runtime Playwright (12 pages) | 0 erreur console, 0 erreur HTTP |
| Scan `href="#"` (12 pages) | 0 occurrence |
| Liens GitHub trouvés dans le rendu | 6 liens, tous vérifiés HTTP 200 : `eduquiz`, `biketrip`, `SLG-Tech`, `cosmechic-`, `WeatherWise`, `Forum-Sportif` |
| Cohérence FR/EN | 13 titres FR et 13 titres EN dans le même ordre, correspondance 1:1 vérifiée |
| `axe-core` (wcag2a/2aa/21aa/22aa) sur `/fr/projects` et `/en/projects`, thèmes clair+sombre | **0 violation** sur les 4 combinaisons — aucune régression WCAG introduite |

## 12. Build

`npm run build` → **PASS**, exit 0, 13 pages générées, aucune erreur, aucun warning. Aucune nouvelle route créée (les études de cas n'ont pas de page dédiée, elles vivent toutes sur `/projects`) — cohérent avec l'absence de changement architectural.

## 13. Risques restants

- Les 4 projets avec `githubUrl: null` maintenu (Garage Auto Gonzague, Bilik Farm, ComptaClems, et désormais aussi Logigest par cohérence) resteront dans cet état tant que du code réel n'aura pas été poussé sur les dépôts publics correspondants — à réévaluer dans un lot futur une fois ces dépôts alimentés.
- Infotechs Solutions, workflow-ai-agents, MediaHub restent non représentés — décision à reconfirmer si ces dépôts évoluent (code ajouté).
- Les risques déjà documentés dans PORTFOLIO-AUDIT-001 non traités par ce lot (6 images placeholder restantes, domaine SEO placeholder, absence de tests permanents/CI, CVE Astro non corrigées, absence de page 404) demeurent inchangés — hors périmètre de ce lot.
- `main` ne contient toujours pas les commits `6bd3c29` (lot 002) ni ce lot — trois branches de travail non fusionnées existent actuellement (`fix/portfolio-stabilize-002`, `content/portfolio-content-003`, et l'ancienne `claude/portfolio-refonte-audit-7j4213`). Le PM devra décider de l'ordre de fusion.

## 14. Recommandations pour le prochain lot

1. Une fois que le PM aura tranché sur l'ordre de fusion des branches en attente (002 et 003), un lot de fusion propre vers `main` serait utile avant d'empiler davantage de contenu.
2. Si de nouveaux commits de code apparaissent sur `garage-auto-gonzague`, `logigest`, `bilik-farm`, `comptaclems`, `infotechs-solutions`, `workflow-ai-agents` ou `mediahub`, un lot de réconciliation ciblé pourrait réévaluer les liens et éventuellement ajouter des études de cas alors justifiées.
3. Fournir des visuels réels pour les 6 études de cas encore en placeholder (Paroisse Hub, Cv Expert, Logigest, Proxmox, EduQuiz, BikeTrip) reste la tâche de contenu la plus impactante pour la crédibilité visuelle du portfolio.
