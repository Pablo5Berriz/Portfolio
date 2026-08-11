# PORTFOLIO-STABILIZE-002 — Rapport

Lot : PORTFOLIO-STABILIZE-002 | Type : correctif ciblé | Périmètre : contraste WCAG AA + métadonnées Cosmechic uniquement

## 1. Baseline

| Élément | Valeur |
|---|---|
| Baseline produit exigée par le PM | `212f6836545de3a9f49034b1e16fd9ab27d9b3da` |
| `origin/main` au moment du preflight (`git fetch origin` + `git rev-parse origin/main`) | `212f6836545de3a9f49034b1e16fd9ab27d9b3da` — **conforme** |
| Branche de travail | `fix/portfolio-stabilize-002`, créée depuis `origin/main` (`git checkout -b fix/portfolio-stabilize-002 origin/main`), upstream volontairement non rattaché pour éviter tout push accidentel |
| Working tree initial | Propre (`git status --short` vide) |
| Ancienne branche `claude/portfolio-refonte-audit-7j4213` | Non utilisée pour ce lot, conformément à la directive |

## 2. Fichiers modifiés

Exactement 3 fichiers, 8 insertions / 8 suppressions (`git diff --stat`), aucun autre fichier touché :

- `src/styles/global.css` (tokens de couleur)
- `src/content/legacyProjects/fr/cosmechic.md` (stack + URL)
- `src/content/legacyProjects/en/cosmechic.md` (stack + URL)

`git diff --check` : aucune erreur d'espace blanc.

## 3. Contraste avant

Reproduit avec `axe-core` (règles `wcag2a`+`wcag2aa`+`wcag21aa`+`wcag22aa`) sur `/fr`, `/fr/projects`, `/fr/contact`, `/en/skills`, thèmes clair et sombre, **avant toute modification** :

| Page | Thème | Violations `color-contrast` |
|---|---|---|
| /fr | clair | 30 nœuds |
| /fr/projects | clair | 78 nœuds |
| /fr/contact | clair | 3 nœuds |
| /en/skills | clair | 2 nœuds |
| /fr | sombre | 23 nœuds |
| /fr/projects | sombre | 66 nœuds |
| /fr/contact | sombre | 2 nœuds |
| /en/skills | sombre | 2 nœuds |

Paires de couleurs en échec identifiées (ratios mesurés, seuil requis 4.5:1) :

- Thème clair : `--color-accent` `#0f9c8c` sur `--color-bg` `#f7f8fb` → 3.21:1 ; texte blanc sur bouton `--color-accent` → 3.41:1 ; `--color-accent` sur fond de badge teinté (~16 % accent sur blanc) → 2.84:1 (pire cas) ; `--color-text-faint` `#667085` sur `--color-bg-inset` `#eef1f6` → 4.39:1
- Thème sombre : `--color-text-faint` `#64748b` sur `--color-bg` `#0b1120` → 3.95:1, sur `--color-bg-raised` `#111a2e` → 3.64:1, sur `--color-bg-inset` `#0a0f1d` → 4.01:1

## 4. Correction

4 tokens modifiés dans `src/styles/global.css`, même teinte/saturation conservée (identité visuelle préservée), seule la luminosité (L en HSL) a été réduite/augmentée au minimum nécessaire pour atteindre 4.5:1 sur **tous** les fonds concernés simultanément (y compris le fond de badge dérivé de l'accent par `color-mix`, qui bouge avec le token — vérifié par calcul, pas par approximation) :

| Token | Thème | Avant | Après | Teinte/Saturation conservée |
|---|---|---|---|---|
| `--color-text-faint` | sombre | `#64748b` | `#74849b` | 215.4°, 16.3 % (L 45%→53%) |
| `--color-text-faint` | clair | `#667085` | `#646d82` | 220.6°, 13.2 % (L 46%→45%) |
| `--color-accent` | clair | `#0f9c8c` | `#0b7064` | 173.2°, 82.5 % (L 33.5%→24%) |
| `--color-accent-strong` | clair | `#0b7f72` | `#08544b` | 173.3°, 84.1 % (L 27.1%→18%) |

`--color-focus-ring` (thème clair, actuellement `#0f9c8c`) n'a **pas** été modifié : non signalé par `axe-core` (le contraste des indicateurs de focus suit un seuil WCAG différent, 3:1, déjà largement respecté), et la directive demande le minimum de tokens nécessaire.

## 5. Contraste après

Rebuild + nouveau scan `axe-core`, méthodologie strictement identique (mêmes 4 pages, mêmes 2 thèmes) :

| Page | Thème | Violations totales | `color-contrast` |
|---|---|---|---|
| /fr | clair | 0 | 0 |
| /fr/projects | clair | 0 | 0 |
| /fr/contact | clair | 0 | 0 |
| /en/skills | clair | 0 | 0 |
| /fr | sombre | 0 | 0 |
| /fr/projects | sombre | 0 | 0 |
| /fr/contact | sombre | 0 | 0 |
| /en/skills | sombre | 0 | 0 |

**`color-contrast serious violations = 0` sur les 8 combinaisons testées. `totalViolations = 0` confirme également qu'aucune nouvelle violation (de toute catégorie) n'a été introduite.**

Ratios finaux calculés (méthode WCAG relative luminance, formule officielle) :
- `--color-accent` clair vs blanc : 5.97:1 ; vs `--color-bg` : 5.62:1 ; vs fond de badge dérivé : 4.72:1 (marge de sécurité conservée au-dessus du seuil de 4.5:1)
- `--color-text-faint` clair vs `--color-bg-inset` : 4.58:1 ; vs `--color-bg` : 4.88:1
- `--color-text-faint` sombre vs les 3 fonds sombres : 4.56:1 à 5.02:1

## 6. Cosmechic avant

- `githubUrl` : `https://github.com/Pablo5Berriz/Cosmechic` → **HTTP 404 confirmé** (WebFetch)
- `stack` affichée : `HTML, CSS, ASP.NET, SQL Server`

## 7. Cosmechic après

Vérification directe du dépôt réel avant correction (WebFetch, 2 requêtes indépendantes) :
- URL réelle confirmée : `https://github.com/Pablo5Berriz/cosmechic-` (tiret final inclus) — **HTTP 200 confirmé après correction**
- Contenu réel du dépôt vérifié : **le dépôt ne contient à ce jour qu'un `README.md` (2 commits), aucun code source encore poussé.** La stack `Next.js, Stripe, Tailwind CSS` provient du README du dépôt réel — c'est la seule source disponible, le code ne permettant pas encore de vérification indépendante (aucun `package.json` ou fichier source présent). Ce point est signalé explicitement en section 12 (Écarts), conformément à l'instruction de ne pas déduire une stack du seul README quand le code le permet : ici le code ne le permet pas, faute d'exister.
- `summary` (FR : "Boutique en ligne de produits cosmétiques pour Afro" / EN : "Online store selling cosmetics for Afro hair and skin") : **non modifié** — confirmé compatible avec la description réelle du dépôt ("e-commerce platform specializing in cosmetics for Black, mixed-race, and Afro-textured skin"), aucune incohérence à corriger sur ce champ.

Changements appliqués (FR et EN identiques) :
```diff
-stack: [HTML, CSS, ASP.NET, SQL Server]
-githubUrl: https://github.com/Pablo5Berriz/Cosmechic
+stack: [Next.js, Stripe, Tailwind CSS]
+githubUrl: https://github.com/Pablo5Berriz/cosmechic-
```

## 8. Tests

| Commande | Résultat |
|---|---|
| `sha256sum package-lock.json` (avant) | `61b2ef647b4353c072be525ca4b5a987309c34f22e2b9d12969ccd7292ac42aa` |
| `npm ci` | Exit 0, 357 packages, aucune erreur |
| `sha256sum package-lock.json` (après) | `61b2ef647b4353c072be525ca4b5a987309c34f22e2b9d12969ccd7292ac42aa` — **identique, lockfile non modifié** |
| `npx astro check` | Exit 0 — **0 erreurs, 0 warnings**, 41 hints cosmétiques inchangés (API interne dépréciée d'`astro:content`, non liée à ce lot) |
| `git diff --check` | Aucune erreur d'espace blanc |

## 9. Build

`npm run build` → **PASS**, exit 0, 13 pages générées, aucune erreur, aucun warning. `dist/fr/projects/index.html` et `dist/en/projects/index.html` inspectés directement : contiennent `cosmechic-` (nouvelle URL) et `Next.js`/`Stripe`/`Tailwind CSS` (nouvelle stack).

## 10. Runtime

Playwright contre le build corrigé (`astro preview`), périmètre demandé + extension par prudence à toutes les pages du site :

- `/fr`, `/en`, `/fr/projects`, `/en/projects` : 200, 0 erreur console, 0 erreur `pageerror`
- Extension : les 8 autres routes (`/fr/{about,skills,experiences,contact}`, `/en/{about,skills,experiences,contact}`) également vérifiées : 0 erreur
- Lien Cosmechic vérifié programmatiquement sur `/fr/projects` **et** `/en/projects` : `href` = `https://github.com/Pablo5Berriz/cosmechic-` sur les deux
- Scan `href="#"` sur les 12 pages : **0 occurrence**
- Nouveau scan `axe-core` final sur l'instance de build validée : 0 violation, cohérent avec la section 5

## 11. Git

```
$ git status --short
 M src/content/legacyProjects/en/cosmechic.md
 M src/content/legacyProjects/fr/cosmechic.md
 M src/styles/global.css
```

Diff complet reproduit en section 4 (tokens) et section 7 (Cosmechic) — 3 fichiers, 8 insertions, 8 suppressions, aucun autre changement. Commit unique atomique à suivre, push exclusivement sur `fix/portfolio-stabilize-002`. Aucun commit ni push vers `main`.

## 12. Écarts

Deux écarts mineurs par rapport à une application strictement littérale de la directive, tous deux documentés ici pour revue PM plutôt qu'appliqués silencieusement :

1. **`--color-accent-strong` (thème clair) a été modifié en plus des deux tokens explicitement cités (`--color-accent`, `--color-text-faint`).** Justification : en ne corrigeant que `--color-accent` (33.5%→24% de luminosité), ce nouveau accent devenait *plus foncé* que l'ancien `--color-accent-strong` (27.1%), inversant la hiérarchie hover (l'état survolé serait devenu plus clair que l'état de repos). La règle UI/UX de la directive interdit explicitement de dégrader la hiérarchie visuelle — corriger `--color-accent-strong` en conservant le même delta de luminosité que l'original (-6.4 points) a donc été jugé nécessaire à la conformité de la directive elle-même, pas une extension de périmètre gratuite. Aucune autre valeur n'a été touchée.
2. **La stack Cosmechic corrigée provient du README du dépôt réel, faute de code source présent dans ce dépôt** (2 commits, `README.md` uniquement). La directive demande de ne pas déduire la stack du seul README "si le code permet de les vérifier" — ici le code ne le permet pas. C'est la meilleure source disponible et vérifiée directement (pas une supposition), mais le PM doit savoir que ce n'est pas une vérification par le code lui-même.

Aucune autre découverte hors périmètre n'a été traitée. Pour mémoire (déjà rapporté dans PORTFOLIO-AUDIT-001, non retraité ici) : les 4 autres `githubUrl: null`, les 6 images placeholder, BikeTrip, Infotech Solutions, workflow-ai-agents, mediahub, la page 404, la CI, les tests, ESLint, les CVE Astro, EmailJS, le domaine SEO — tous explicitement hors périmètre de ce lot et non touchés.

## 13. Verdict

**PASS**

Les 17 critères d'acceptation de la directive sont satisfaits : baseline conforme, working tree initial documenté, violations reproduites avant correction, contrastes corrigés avec preuve avant/après, `axe-core` à 0 violation sur les deux thèmes et les 4 pages requises, URL Cosmechic corrigée et vérifiée HTTP 200, stack conforme au dépôt réel (avec la réserve documentée en §12), FR/EN cohérents, `astro check` PASS, build PASS, runtime PASS sur le périmètre demandé et étendu, aucun changement hors périmètre, lockfile inchangé, aucune nouvelle dépendance produit, diff propre et explicable (3 fichiers, 8+8 lignes).
