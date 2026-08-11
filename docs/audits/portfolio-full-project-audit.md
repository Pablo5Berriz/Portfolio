# PORTFOLIO — FULL PROJECT AUDIT

Lot : PORTFOLIO-AUDIT-001 | Date : session courante | Auditeur : agent développeur (rôle audit uniquement, développement interdit)

## 1. Résumé exécutif

Le portfolio a été entièrement reconstruit sur Astro (SSG statique, bilingue FR/EN) depuis un ancien site HTML/CSS/JS. Le HEAD local audité (`58c4c0c`) est un ancêtre direct et propre d'`origin/main` (`212f683`, merge à 2 parents confirmé, aucune réécriture d'historique). **Le build de production passe (exit 0, 13 pages), le typecheck passe (0 erreur), 0 erreur console/HTTP sur les 12 routes testées, aucun lien `href="#"` ni lien mort interne.** L'architecture est saine : zéro duplication de layout, i18n natif, bundle client minimal (4,5 Ko JS + 9,5 Ko CSS pour tout le site).

Deux problèmes **CRITIQUES**, tous deux vérifiés par preuve HTTP/outil réel et non par lecture de documentation, ternissent cet état par ailleurs solide :
1. Le lien GitHub de Cosmechic pointe vers un dépôt qui n'existe pas (404 confirmé) ; le vrai dépôt public existe sous un nom différent et révèle une stack technique différente de celle affichée sur le site.
2. Un audit `axe-core` (WCAG 2.2 AA) révèle des violations de contraste couleur "serious", reproductibles, sur les thèmes clair et sombre, sur toutes les pages testées.

Au-delà de ces deux points, l'audit a mis au jour un **écart significatif entre le contenu du site et l'état réel du compte GitHub du propriétaire** : 4 études de cas affichent `githubUrl: null` alors que des dépôts publics réels existent désormais sous ces noms exacts, et 4 dépôts publics supplémentaires (dont deux — BikeTrip, Infotech Solutions — étaient explicitement en attente d'information au moment de la dernière session de développement) ne sont représentés nulle part. Aucune de ces découvertes n'a été corrigée dans ce lot : conformément à la directive, ce rapport est un audit, pas une correction.

## 2. Baseline Git

| Élément | Valeur |
|---|---|
| Répertoire local | `/home/user/Portfolio` |
| Remote `origin` | `https://github.com/Pablo5Berriz/Portfolio` |
| Branche locale active | `claude/portfolio-refonte-audit-7j4213` |
| Upstream configuré | **Non** (clé `branch.<name>.remote` absente — voir CMD-002) |
| SHA local (HEAD) | `58c4c0c64c4b276a0fb571a641decfafc32b2cc6` |
| SHA `origin/main` | `212f6836545de3a9f49034b1e16fd9ab27d9b3da` |
| Relation | HEAD local = ancêtre direct de `origin/main`. `origin/main` est un commit de **merge réel à 2 parents** (`6686956` + `58c4c0c`), pas un squash ni un rewrite |
| Ahead/behind vs origin/main | 0 ahead / 1 behind (le seul commit manquant est le commit de merge lui-même, qui n'existe que sur `main`) |
| Working tree initial | Propre (`nothing to commit, working tree clean`) |
| Working tree final | Propre — identique à l'initial (voir section 40) |
| Tags | Aucun |
| Worktrees | 1 seul (`/home/user/Portfolio`) |
| Sous-modules | Aucun |

L'observation préalable du PM (HEAD `main` = `212f683`) est **confirmée** par preuve indépendante (`git show --no-patch --format="%H %P" origin/main`).

## 3. Historique récent

7 commits au total dans tout le dépôt (historique complet inspecté, sous le seuil de 20-50 demandé) :

| SHA | Message | Nature |
|---|---|---|
| `212f683` | Merge PR (message repris du commit de refonte) | Merge 2-parents vers `main` |
| `58c4c0c` | Ajoute Cv Expert, Paroisse Hub et ComptaClems | Ajout de contenu (3 études de cas) |
| `ae5f520` | Ajoute les vrais logos de projets et le serveur Proxmox | Remplacement d'images placeholder + nouvelle étude de cas (Proxmox) + nouveau badge `infra` |
| `8745ae9` | Ajuste la liste des projets selon les nouvelles priorités | Suppression de 3 études de cas (business plan, affichage TV, Streamr/Aura), promotion de 2 projets antérieurs vers le format complet |
| `81b54cf` | Refonte complète du portfolio sur Astro (bilingue FR/EN) | **Migration d'architecture majeure** : HTML/CSS/JS statique → Astro, 205 fichiers changés |
| `6686956` | Ajout du fichier .gitattributes | Hygiène |
| `6a1185e` | Initial commit | Squelette `.gitignore`/`LICENSE`/`README` |

Aucune régression, aucun commit de correctif d'urgence, aucun revert détecté. La migration d'architecture (commit `81b54cf`) est le point de bascule central de tout l'historique.

## 4. Inventaire du dépôt

84 fichiers suivis (hors `.git`, `node_modules`). Type : **single-app**, pas de monorepo.

```
src/
  components/            9 fichiers .astro (Header, Footer, ProjectCard, LegacyProjectCard + 6 "views")
  content/               26 fichiers Markdown (10 caseStudies + 2 legacyProjects, x2 langues, + 8 experiences x2 langues)
  content.config.ts       schéma Zod des 3 collections
  i18n/                  ui.ts + utils.ts + 4 fichiers content/*.ts
  layouts/               BaseLayout.astro (unique)
  pages/                 13 fichiers .astro (routing fin fr/en + racine)
  styles/global.css      design tokens + primitives
public/
  cv/, images/{education,experience,profile,projects}/, favicon.svg, robots.txt
```

Absents notables : `.github/` (aucun CI/CD), `.env*` (aucun), `tests/`/`e2e/` (aucun test), `404.astro` (aucune page 404 personnalisée), aucun fichier de déploiement (Vercel/Netlify/Dockerfile).

## 5. Stack technique

| Catégorie | Valeur constatée | Source |
|---|---|---|
| Framework | Astro `^7.0.4` (mode `static`) | `package.json`, `astro.config.mjs` |
| Langage | TypeScript (`tsconfig.json` étend `astro/tsconfigs/strict`) | `tsconfig.json` |
| Runtime attendu | Node `>=22.12.0` | `package.json engines` |
| Runtime réel de l'audit | Node v22.22.2, npm 10.9.7 | CMD-005 |
| Package manager | npm (`package-lock.json`, `lockfileVersion: 3`) | inventaire |
| CSS | CSS natif avec design tokens (custom properties), pas de préprocesseur, pas de Tailwind | `src/styles/global.css` |
| Icônes | `astro-icon` + `@iconify-json/{lucide,simple-icons}` (tree-shaken, pas de CDN Font Awesome) | `package.json`, usages `<Icon>` |
| i18n | Natif Astro (`i18n.routing.prefixDefaultLocale: true`), `fr` par défaut, `en` | `astro.config.mjs` |
| Contenu | Astro Content Collections, loader `glob`, 3 collections | `src/content.config.ts` |
| Formulaire/email | `@emailjs/browser` en dépendance npm (pas de CDN), utilisé uniquement sur `/contact` | `ContactView.astro` |
| Sitemap | `@astrojs/sitemap` | `astro.config.mjs`, `dist/sitemap-index.xml` généré |
| Tests unitaires/intégration/E2E | **Absents** (aucun script, aucun fichier) | `package.json`, inventaire |
| Lint/formatter | **Absents** (aucun script, aucune config ESLint/Prettier) | `package.json`, inventaire |
| Hébergement | Non configuré dans le dépôt (README documente une intention Proxmox+Traefik, non implémentée en code) | inventaire, README |
| CI/CD | **Absent** | inventaire |

## 6. Architecture réelle

Architecture en couches propres :
- **Pages fines** (`src/pages/{fr,en}/*.astro`, 5 lignes chacune) qui instancient un composant "vue" partagé avec `locale` en prop — élimine la duplication de template entre langues.
- **Vues** (`src/components/views/*.astro`) contiennent la logique de page et consomment soit les content collections (projets, expériences), soit des objets de contenu typés (`src/i18n/content/*.ts`) pour le texte long (bio, hero, intitulés de compétences).
- **Composants partagés** (`Header`, `Footer`, `ProjectCard`, `LegacyProjectCard`) : un seul exemplaire de chacun, aucune duplication constatée en grep.
- **Layout unique** (`BaseLayout.astro`) porte le SEO, le Schema.org, l'initialisation du thème et englobe systématiquement `Header`/`Footer`.
- Pas de dépendance circulaire détectée, pas de fichier monolithique (le plus gros fichier source, `ContactView.astro`, reste sous 300 lignes template+script inclus).
- Couplage content ↔ présentation : correct — les composants de carte (`ProjectCard`/`LegacyProjectCard`) sont génériques et pilotés par les données de collection, pas de contenu en dur mélangé au template.

## 7. Diagramme d'architecture

```
Navigateur
   |
   v
Astro Pages (src/pages/{fr,en}/*.astro — 5 lignes, routing seul)
   |
   +--> Views (src/components/views/*) — logique de page, un seul jeu pour fr+en
   |        |
   |        +--> BaseLayout.astro --> Header.astro / Footer.astro (source unique)
   |        |
   |        +--> Content Collections (src/content/{caseStudies,legacyProjects,experiences})
   |        |
   |        +--> i18n content objects (src/i18n/{ui.ts,content/*.ts})
   |
   +--> Client script isolé (ContactView.astro) --> @emailjs/browser --> API EmailJS externe
   |
   +--> Assets statiques (public/images, public/cv) servis tels quels
```

Aucun backend applicatif : le site est 100% statique après build, le seul point de sortie réseau côté client est l'appel EmailJS sur `/contact`.

## 8. Routes et pages

13 pages générées (confirmé CMD-008, HTML inspecté dans `dist/`), toutes en 200 lors du test runtime (CMD-009) :

| Route | FR | EN | Buildée | Accessible | Contenu réel | Placeholder | Erreurs |
|---|---|---|---|---|---|---|---|
| Accueil | `/fr` | `/en` | Oui | 200 | Oui | Non | Aucune |
| À propos | `/fr/about` | `/en/about` | Oui | 200 | Oui | Non | Aucune |
| Compétences | `/fr/skills` | `/en/skills` | Oui | 200 | Oui | Non | Aucune |
| Expériences | `/fr/experiences` | `/en/experiences` | Oui | 200 | Oui | Non | Aucune |
| Projets | `/fr/projects` | `/en/projects` | Oui | 200 | Partiel (voir §10) | Oui (images) | Aucune technique |
| Contact | `/fr/contact` | `/en/contact` | Oui | 200 | Oui | Non | Aucune |
| Racine | `/` | — | Oui | 200 | Redirection JS + fallback lien | Non | Aucune |
| 404 | — | — | **Absente** | N/A | N/A | N/A | Page générique de l'hébergeur |

Aucune page CV/blog/mentions légales/confidentialité — cohérent avec le périmètre d'un portfolio personnel, mais absence de mentions légales/politique de confidentialité malgré la collecte de données via le formulaire de contact (case de consentement présente en compensation partielle).

## 9. Internationalisation FR/EN

- Stratégie : préfixe d'URL (`/fr/...`, `/en/...`), `fr` par défaut, `prefixDefaultLocale: true`.
- Parité de fichiers **parfaite** : `diff` entre les jeux de fichiers FR et EN des 3 collections de contenu (caseStudies, legacyProjects, experiences) → identiques (CMD exécuté en section Études de cas).
- Parité de champs structurés (order/badges/stack) vérifiée sur les 10 études de cas : 10/10 OK sur `order` et `badges` ; 1 écart apparent sur `stack` (Logigest : `Agents IA` vs `AI agents`) qui est une **traduction volontaire d'un terme descriptif**, pas une incohérence de données — les noms de technologies propres (Next.js, PostgreSQL, etc.) restent non traduits partout ailleurs.
- `hreflang` (fr/en/x-default) et attribut `lang` corrects sur les 12 pages testées (CMD-009).
- Changement de langue : composant dédié dans `Header.astro`, préférence persistée en `localStorage` (`preferred-locale`), relue par la page racine.

## 10. Études de cas / projets

**10 études de cas complètes** (`src/content/caseStudies/`) + **2 projets antérieurs condensés** (`src/content/legacyProjects/`). Détail champ par champ en `docs/audits/portfolio-module-status.csv`.

Points saillants avec preuve :

- **6 des 10 études de cas complètes** portent encore `imagePlaceholder: true` (Cv Expert, EduQuiz, Forum Sportif, Logigest, Paroisse Hub, Proxmox) — affiché à l'écran comme un bloc "Capture à venir" explicite, pas une image cassée silencieuse.
- **4 études de cas** (Garage Auto Gonzague, Logigest, Bilik Farm, ComptaClems) ont `githubUrl: null`. Vérification HTTP réelle (WebFetch, non destructive) : **des dépôts publics existent désormais sous ces 4 noms exacts** sur `github.com/Pablo5Berriz`. Le contenu du site est donc en retard sur l'état réel du compte GitHub.
- **Cosmechic** (projet antérieur) : `githubUrl` pointe vers `https://github.com/Pablo5Berriz/Cosmechic` → **HTTP 404 confirmé**. Le dépôt réel existe sous le nom `cosmechic-` (tiret final inclus) et sa description publique indique une stack **Next.js, Stripe, Tailwind CSS** — alors que le contenu du site affiche `HTML, CSS, ASP.NET, SQL Server`. Il s'agit soit d'une réécriture du projet non répercutée dans le contenu, soit d'une confusion entre deux versions du projet ; dans les deux cas, l'affirmation actuellement publiée est incorrecte.
- **4 dépôts publics supplémentaires vérifiés** ne correspondent à aucune étude de cas actuelle : `biketrip` (React Native/Expo/Supabase — c'est le projet "BikeTrip" resté en attente d'information lors de la dernière session de contenu), `infotechs-solutions` (Next.js/Tailwind — c'est "Infotech Solutions", également en attente), `workflow-ai-agents` (plateforme d'orchestration d'agents IA — recoupe fortement la section "Expertise transversale" déjà présente sur la page d'accueil, mais sans étude de cas dédiée), `mediahub` (plateforme de streaming Jellyfin/Proxmox — recoupe le concept "Streamr/Aura" explicitement retiré du site sur demande antérieure).
- **SLG Tech, EduQuiz, Forum Sportif, WeatherWise** : liens GitHub vérifiés fonctionnels (200), contenu cohérent avec la description publique du dépôt.

Aucun `href="#"` ni lien générique détecté sur la page Projets (CMD-009).

## 11. Contenu professionnel

- Identité, titre professionnel, localisation, CTA (contact/projets/CV/GitHub/LinkedIn) : présents et cohérents FR/EN.
- Bio (`src/i18n/content/about.ts`) : chaque affirmation de compétence est rattachée à un projet nommé (ex. "8 vulnérabilités critiques corrigées" → SLG Tech), conforme à l'exigence de traçabilité du mandat d'origine.
- Aucun `lorem ipsum`, aucun `TODO`/`FIXME` dans le contenu (CMD-014).
- Incohérence factuelle identifiée : voir §10 (Cosmechic — stack incorrecte). C'est la seule affirmation de compétence trouvée en contradiction avec une source externe vérifiable.
- Statuts de projet ("en production"/"en cours") : déclaratifs, fournis par le propriétaire lors des sessions de contenu précédentes, non re-vérifiables par ce lot au-delà de l'existence des dépôts.

## 12. UI/UX

- Design system par tokens CSS (`global.css`) : palette claire/sombre, échelle typographique `clamp()`, échelle d'espacement 4px, un seul fichier source — aucune valeur de couleur/espacement en dur détectée en dehors de ce fichier lors de l'inspection des composants.
- Composants cohérents entre pages : cartes, badges, boutons, formulaire — mêmes classes/tokens réutilisés partout (`ProjectCard`, `LegacyProjectCard`, `.btn`, `.card`, `.badge`).
- Thème clair/sombre : bascule fonctionnelle, persistée en `localStorage`, script anti-FOUC inline dans `BaseLayout.astro`.
- Micro-interactions : hover sur boutons/cartes (translation, changement de couleur de bordure), transitions définies par tokens (`--transition-fast`, `--transition-base`).
- Réserve : jugement "design original" non quantifiable par un outil — observation qualitative seulement, cohérente avec l'absence de composants issus d'une librairie UI générique (pas de Bootstrap, pas de shadcn dans **ce** dépôt).

## 13. Responsive

5 largeurs testées (360, 390, 768, 1280, 1440 px) sur 3 pages représentatives (`/fr`, `/fr/projects`, `/fr/contact`) via mesure réelle `scrollWidth` vs `clientWidth` (CMD-010) : **0 débordement horizontal détecté sur les 15 combinaisons.**

Limite explicite de cette vérification : elle détecte le débordement global de page, pas les problèmes de mise en page fine (chevauchement, texte tronqué visuellement, taille de zone tactile). Ces derniers nécessiteraient une inspection visuelle par capture d'écran à chaque breakpoint, non réalisée exhaustivement dans ce lot pour rester dans un temps d'audit raisonnable — seule la page d'accueil a été capturée visuellement lors de sessions de développement antérieures (non re-vérifiée ici par preuve fraîche).

## 14. Accessibilité

Référence : WCAG 2.2 AA via `axe-core` (règles `wcag2a`+`wcag2aa`+`wcag21aa`+`wcag22aa`), sur 4 pages (`/fr`, `/fr/projects`, `/fr/contact`, `/en/skills`), thèmes clair **et** sombre (CMD-013).

**PASS confirmés :**
- `html lang` correct sur toutes les pages
- Landmarks, hiérarchie de titres (1 seul `<h1>` par page), noms accessibles, labels de formulaire, ARIA (`aria-expanded`, `aria-current`, `aria-label`) : 0 violation
- Menu hamburger : clavier-accessible, `Escape` fonctionnel (CMD-011)
- Focus visible : règle `:focus-visible` définie globalement

**VIOLATION confirmée (impact "serious", reproductible) :**
- **Thème clair** : `--color-accent` (`#0f9c8c`) sur fond `--color-bg` (`#f7f8fb`) → ratio **3.21:1** (texte) ; texte blanc sur bouton `--color-accent` → ratio **3.41:1**. Seuil requis : 4.5:1.
- **Thème sombre** : `--color-text-faint` (`#64748b`) sur `--color-bg-inset` (`#0a0f1d`) → ratio **4.01:1**. Seuil requis : 4.5:1.
- Éléments affectés : lien de navigation actif, libellés "eyebrow", bouton primaire, badges de statut, tags de stack technique — **systémique**, présent sur les 4 pages testées, dans les deux thèmes.

Classification : violation certaine (pas un risque théorique), preuve reproductible par outil automatisé standard.

## 15. SEO

- `<title>` et meta description uniques par page × langue : confirmé sur les 12 titres capturés (CMD-009).
- `hreflang` (fr/en/x-default), canonical, Open Graph, Twitter Card : balises présentes dans le HTML généré (inspection directe de `dist/*/index.html`).
- `sitemap-index.xml` et `robots.txt` : générés et présents dans `dist/` après build.
- Schema.org JSON-LD (`Person`/`ProfilePage`) : présent dans `BaseLayout.astro`, données statiques de confiance.
- **Point bloquant pour la production** : `SITE_URL` dans `astro.config.mjs` est un placeholder documenté (`https://paulquentinondoa.dev`, commentaire `TODO(user)` explicite) — toutes les URLs canoniques, `hreflang` et OG générées à ce jour utilisent ce domaine fictif.
- Page 404 personnalisée : absente.

## 16. Performance

- Bundle client total : **4,5 Ko JS** (script du formulaire de contact uniquement, chargé seulement sur `/contact`) + **9,5 Ko CSS** (un seul fichier partagé). Aucun autre JavaScript client.
- Images de projets : `loading="lazy"` + `width`/`height` explicites sur 6/6 balises `<img>` de la page Projets (anti-CLS). L'image hero (candidate LCP) est volontairement **non** lazy-loadée — bonne pratique.
- Absence de pipeline d'optimisation d'image (pas de conversion WebP/AVIF, pas d'usage d'`astro:assets`) — les images sont servies telles quelles depuis `public/`.
- Aucun outil Lighthouse disponible dans cet environnement d'audit : **aucun score n'a été inventé**. Les signaux structurels (bundle minimal, lazy loading, dimensions explicites) sont favorables mais ne remplacent pas une mesure réelle.

## 17. Formulaire de contact

Vérification structurelle réelle (CMD-012) :
- Aucun champ de type fichier dans le DOM (décision antérieure documentée : champ retiré plutôt que laissé décoratif).
- Honeypot (`#company`) présent, positionné hors écran (`x: -9999`), hors tabulation.
- Case de consentement (`#consent`) marquée `required`.
- Service : `@emailjs/browser`, clé publique et IDs de service/template en dur dans `ContactView.astro` (par conception EmailJS — la protection réelle dépend d'une restriction de domaine configurée côté dashboard, non vérifiable depuis le dépôt).
- Rate limiting : **client uniquement** (timestamp en `localStorage`), contournable par navigation privée ou purge du stockage — limitation réelle et déjà documentée dans le README.
- **Non testé dans ce lot** : la livraison effective d'un email. Le déclenchement d'un envoi réel constituerait une action ayant un effet de bord externe (email réellement envoyé), explicitement hors du périmètre non-destructif de cet audit. Un formulaire qui ne fait qu'illusion (pas de preuve d'envoi) doit être classé prudemment : ici, la **structure** est fonctionnelle et vérifiée, mais la **livraison de bout en bout n'est pas prouvée** par ce lot.

## 18. Sécurité

- `.env*` : absent. Aucun secret commité détecté (CMD-016).
- XSS : aucun `innerHTML`/`dangerouslySetInnerHTML` ; 2 usages de `set:html`, tous deux sur du JSON généré à partir de constantes de build (pas d'entrée utilisateur).
- Liens externes : 7/7 `target="_blank"` avec `rel="noopener noreferrer"`.
- CSP/en-têtes de sécurité : absents du dépôt (attendu — dépendent de la configuration future de l'hébergeur/reverse-proxy, non applicable à un export statique).
- SRI : non nécessaire — plus aucune ressource chargée depuis un CDN externe (Font Awesome et EmailJS CDN ont été remplacés par des dépendances npm bundlées lors de la refonte).
- **Dépendance de production `astro` (<=7.0.9)** : 3 CVE modérées (XSS reflété via View Transitions, contournement de `security.checkOrigin` sur le pipeline Hono composable, XSS via attributs spread non échappés). Le site n'utilise ni View Transitions ni middleware Hono actif — exploitabilité réduite mais **non nulle et non corrigée**.
- 9 CVE supplémentaires (modérées/élevées) dans la chaîne de dépendances de `@astrojs/check` (tooling de développement uniquement — `fast-uri`, `js-yaml`, `nanoid`, `postcss`, `svgo`, `tar`, `undici`, `yaml`) : non livrées dans `dist/`.

## 19. Dépendances

- 6 dépendances de production, 2 dépendances de développement (`@astrojs/check`, `typescript`).
- Aucun package dupliqué constaté, aucune dépendance manifestement disproportionnée pour l'usage (astro-icon + 2 sets iconify pour un usage d'icônes tree-shaken est cohérent avec l'objectif de légèreté affiché).
- `npm ci` reproductible : succès, lockfile inchangé avant/après (checksum identique).
- Vulnérabilités : voir §18. Distinction faite entre risque de production (`astro`, modéré) et risque de tooling dev uniquement (le reste).

## 20. Tests

**ABSENT.** Aucun script `test`/`test:unit`/`test:e2e` dans `package.json`, aucun fichier de test dans l'inventaire du dépôt. Toute vérification comportementale de ce rapport (CMD-009 à CMD-013) a été réalisée par des scripts Playwright/axe-core **ad hoc, écrits pour cet audit et non versionnés dans le dépôt produit** — ils ne constituent pas une suite de tests répétable pour l'équipe. C'est un vide de QA réel, pas seulement une case administrative.

## 21. Build

**BUILD : PASS** (CMD-008). `astro build`, exit 0, 13 pages générées en 1,58 s, aucun warning, aucune erreur masquée détectée dans la sortie. `dist/` = 1,7 Mo. Le typecheck (CMD-007) passe également, 0 erreur, 0 warning (41 hints cosmétiques liés à une API interne dépréciée d'`astro:content`).

## 22. Documentation

`README.md` (7,4 Ko) lu intégralement. Comparaison documentation vs réalité :

| Affirmation du README | Réalité constatée | Verdict |
|---|---|---|
| Stack Astro, i18n natif, content collections | Confirmé par inspection du code et build | Exacte |
| "Un projet sans lien GitHub public vérifié n'affiche jamais de bouton" | Vrai pour l'affichage (aucun `href="#"`), mais le lien Cosmechic affiché **est** cassé (pointe vers un mauvais nom) — le README ne couvre pas ce cas | Partiellement exacte |
| Liste des actions manuelles restantes (clé EmailJS, DNS, SITE_URL, captures manquantes) | Toujours d'actualité | Exacte mais incomplète : ne mentionne pas les écarts GitHub découverts dans ce lot (P0-1, P1-1, P1-2, P1-3) |
| "Ne jamais inventer de stack, de statut ou de lien GitHub" (recette d'ajout de projet) | Principe respecté pour Cv Expert/Paroisse Hub/ComptaClems (stack fournie par le propriétaire) ; **non respecté a posteriori** pour Cosmechic dont la stack affichée s'avère incorrecte suite à vérification | Contradictoire avec l'état actuel de Cosmechic |

Aucune autre documentation présente (pas de `docs/` préexistant, pas de CHANGELOG, pas de guide de contribution).

## 23. Déploiement

Aucune configuration de déploiement dans le dépôt (pas de `vercel.json`, `netlify.toml`, `wrangler.toml`, `Dockerfile`). Le README décrit une intention (Proxmox + Traefik + conteneur Nginx/Caddy) mais aucun fichier concret ne l'implémente. Le domaine cible (`SITE_URL`) est un placeholder. **Le site n'est pas déployé publiquement à ce jour**, au meilleur de ce qui est vérifiable depuis ce dépôt.

## 24. CI/CD

**Absent.** Aucun `.github/workflows/`, aucun autre pipeline détecté. Aucune vérification automatique n'est exécutée aujourd'hui avant un merge vers `main`.

## 25. Dette technique

- Absence totale de tests automatisés versionnés (le plus significatif).
- Absence de CI/CD.
- Dépendance de production avec CVE non corrigées.
- Contenu désynchronisé de l'état réel du compte GitHub (4 liens à mettre à jour, 4 dépôts non représentés, 1 lien cassé).
- Domaine placeholder non remplacé.
- Pas de pipeline d'optimisation d'image.

## 26. Blocages

- **P0-1 et P0-2** (voir backlog) bloquent une publication du lien Cosmechic et une conformité WCAG AA affichée comme objectif, mais **ne bloquent pas** le fonctionnement général du site (build/typecheck/runtime tous PASS).
- La décision sur les 4 `githubUrl: null` obsolètes et sur les 4 dépôts non représentés est **éditoriale**, pas technique — elle requiert un arbitrage du PM/propriétaire, pas une correction de code autonome.

## 27. Risques

| ID | Sévérité | Domaine | Description | Preuve | Impact | Probabilité | Bloque la suite |
|---|---|---|---|---|---|---|---|
| R1 | CRITIQUE | Contenu | Lien GitHub Cosmechic mort (404) | WebFetch HTTP 404 sur l'URL publiée | Visible publiquement, nuit à la crédibilité | Certaine (déjà le cas) | Non |
| R2 | CRITIQUE | Contenu | Stack de Cosmechic incorrecte (ASP.NET annoncé vs Next.js/Stripe réel) | WebFetch description du vrai dépôt `cosmechic-` | Affirmation de compétence fausse | Certaine | Non |
| R3 | ÉLEVÉ | Accessibilité | Contraste WCAG AA en échec, 2 thèmes, systémique | axe-core, ratios mesurés | Non-conformité à l'objectif affiché | Certaine | Non |
| R4 | ÉLEVÉ | Contenu | 4 `githubUrl: null` obsolètes (dépôts publics réels existants) | WebFetch, 4 dépôts confirmés | Sous-représentation | Certaine | Non |
| R5 | ÉLEVÉ | Sécurité | CVE modérées non corrigées sur `astro` (dépendance de production) | `npm audit` | Surface d'attaque théorique (View Transitions/Hono non utilisés ici) | Faible exploitabilité réelle | Non |
| R6 | ÉLEVÉ | QA | Aucun test automatisé, aucune preuve de livraison email réelle | Inventaire + non-test volontaire (portée non destructive) | Régressions non détectables ; formulaire non prouvé de bout en bout | Certaine (absence constatée) | Non |
| R7 | MOYEN | SEO | `SITE_URL` placeholder | Lecture directe `astro.config.mjs` | Casse canonical/hreflang/OG en prod réelle | Certaine tant que non corrigé | Oui, pour un déploiement propre |
| R8 | MOYEN | Contenu | 6/10 études de cas en placeholder image | Inspection frontmatter | Présentation incomplète | Certaine | Non |
| R9 | MOYEN | Contenu | BikeTrip/Infotech Solutions réels non intégrés | WebFetch, dépôts confirmés | Opportunité de contenu manquée | Certaine | Non |
| R10 | MOYEN | Contenu | 2 dépôts non référencés (workflow-ai-agents, mediahub) | WebFetch | Décision éditoriale en attente | Certaine | Non |
| R11 | MOYEN | Sécurité | Rate limiting contact client-only | Inspection du code | Contournable trivialement | Faible impact réel (portfolio perso) | Non |
| R12 | FAIBLE | Sécurité | Pas de CSP/en-têtes | Inspection | Dépend de l'hébergeur futur | N/A | Non |
| R13 | FAIBLE | Performance | Pas d'optimisation format image | Inspection | Poids non minimal | N/A | Non |
| R14 | FAIBLE | Sécurité | 9 CVE tooling dev uniquement | `npm audit` | Non livré en production | N/A | Non |
| R15 | FAIBLE | Git | Pas de tracking upstream local | CMD-002 | Hygiène uniquement | N/A | Non |

## 28. Classification des modules

Voir `docs/audits/portfolio-module-status.csv` pour le détail exhaustif (48 lignes, un module par ligne, avec statut/%/preuve/tests/risque/action).

## 29. Calcul de l'avancement

Méthode : domaines pondérés (poids en % du total, somme = 100), score par domaine estimé à partir des preuves collectées dans ce lot (0-100), avancement global = Σ(score × poids) / 100.

| Domaine | Poids | Score | Justification synthétique |
|---|---|---|---|
| Architecture/stabilité | 15 | 90 | Build+typecheck PASS, structure propre, 0 duplication |
| UI/UX | 10 | 85 | Design system cohérent, thèmes fonctionnels |
| Responsive | 8 | 90 | 0 débordement sur 15 combinaisons testées |
| Contenu professionnel | 12 | 55 | Bio/skills/expériences solides ; 1 affirmation factuelle fausse (Cosmechic) |
| Études de cas/projets | 15 | 45 | 6/10 sans image, 4 liens obsolètes, 1 lien mort, 4 projets réels non intégrés |
| SEO | 8 | 65 | Structure complète mais domaine placeholder, pas de 404 |
| Accessibilité | 8 | 55 | Sémantique/clavier PASS, mais contraste en échec confirmé |
| Performance | 6 | 60 | Bundle minimal et bonnes pratiques structurelles, mais aucune mesure Lighthouse possible, pas d'optim image |
| Sécurité | 8 | 65 | Pas de secret, XSS propre, mais CVE prod non corrigée et restriction EmailJS non vérifiable |
| Tests/QA | 5 | 10 | Aucune suite versionnée |
| Déploiement | 3 | 0 | Non déployé, aucune config |
| Documentation | 2 | 70 | README solide mais incomplet sur les écarts GitHub |

**Avancement global calculé = 63 %** (Σ pondérée = 6285 / 100).

Un module "présent mais non validé" (ex. la plupart des études de cas récentes) n'a jamais reçu 100 % dans ce calcul — conformément à la règle de preuve de la directive.

## 30. Phase réelle

**Phase 3 — Contenu professionnel (en cours), avec dette non résolue des Phases 1/2/5 partiellement en parallèle.**

Justification de l'écart avec la séquence théorique : les Phases 1 (stabilisation technique) et 2 (UI/UX/responsive) sont, sur preuve, largement acquises (build/typecheck/responsive tous PASS) — le projet n'est donc pas bloqué en Phase 1. Une partie de la Phase 5 (SEO structurel, sémantique d'accessibilité) est également déjà en place. Mais le projet ne peut pas être qualifié de "Phase 4/5/6 en cours" tant que le contenu central (études de cas, exactitude des liens) contient une affirmation factuelle fausse et des liens obsolètes : c'est un blocage de fond, pas un détail de polish. Le sous-domaine "accessibilité" de la Phase 5 contient par ailleurs une régression concrète (contraste) qui devra être traitée avant de considérer cette phase close, même si le reste de la Phase 5 est avancé.

## 31. Backlog de reprise

Voir `docs/audits/portfolio-recovery-backlog.md` (P0 à P3 + lot recommandé).

## 32. Prochain lot recommandé

**PORTFOLIO-STABILIZE-002 — Corrections P0 ciblées (contraste WCAG AA + lien Cosmechic)**

- Objectif : traiter uniquement R1/R2 (Cosmechic) et R3 (contraste), les 2 seuls risques CRITIQUES/ÉLEVÉ confirmés par preuve directe et à fort impact de crédibilité.
- Justification : périmètre minimal, testable indépendamment (axe-core pour le contraste, vérification HTTP pour le lien), sans toucher au reste du contenu ni à l'architecture.
- Ne pas embarquer la mise à jour des 4 `githubUrl` obsolètes ni la décision sur les projets non représentés dans ce même lot : ce sont des décisions éditoriales (P1) qui nécessitent un arbitrage du PM sur *quels* dépôts publier, pas une simple correction technique.

## 33. Décisions requises du PM

1. Quelle version de Cosmechic présenter (ancienne ASP.NET décrite actuellement, ou nouvelle Next.js/Stripe réellement publique) ? Conditionne la correction P0-1.
2. Les 4 dépôts désormais publics (Garage Auto Gonzague, Logigest, Bilik Farm, ComptaClems) doivent-ils être liés depuis le site, ou est-ce intentionnellement privé/non désiré ?
3. BikeTrip et Infotech Solutions (dépôts publics réels, contenu disponible) : créer les études de cas correspondantes ?
4. `workflow-ai-agents` et `mediahub` : les représenter comme projets à part entière, ou les laisser en dehors du portfolio (le premier recoupe la section "Expertise" existante, le second recoupe un concept explicitement retiré précédemment) ?
5. Valider (ou non) la correction des tokens de contraste proposée en P0-2 avant qu'elle soit implémentée dans un lot de développement.
6. Confirmer le domaine de production réel pour remplacer le placeholder `SITE_URL`.

## 34. Verdict

**GO SOUS CONDITIONS**

Justification : l'architecture, le build, le typecheck, le responsive et la structure d'accessibilité de base sont solides et vérifiés par preuve directe — rien n'indique une reprise architecturale nécessaire. Mais deux défauts CRITIQUES vérifiés (lien Cosmechic mort + affirmation de stack incorrecte, contraste WCAG AA en échec) empêchent un verdict "GO — continuation sûre" sans réserve. Le développement peut reprendre sereinement sur le reste du périmètre, à condition de traiter le lot P0 recommandé (§32) avant toute publication du domaine réel, et de faire arbitrer par le PM les décisions de contenu listées en §33.
