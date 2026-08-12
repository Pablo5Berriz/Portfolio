# PORTFOLIO-QA-006 — Mise en place d'une couche QA/CI minimale

## 1. Baseline

- Branche de référence : `main`
- SHA `main` vérifié avant travail : `863687eff142e13f973b6c7c1e4cca6af5c1d322`
- Branche de travail créée depuis ce SHA : `qa/portfolio-qa-006` (nouvelle branche, jamais réutilisée)
- SHA après commit QA : `972b2609a06c58de249bf3ffaeb5c11b3a024857`
- Vérification d'ancêtre : `863687e` est bien ancêtre direct de `972b260` (fast-forward simple, un seul commit ajouté)

## 2. Intégration de PORTFOLIO-VISUALS-005

Le SHA de baseline `863687e` correspond au commit `content(portfolio): replace project placeholders with verified visuals`, c'est-à-dire à l'état de `main` **après** intégration de PORTFOLIO-VISUALS-005. Aucune régression visuelle n'a été introduite par ce lot : aucun fichier sous `src/content/`, `src/pages/`, `src/components/` ou `public/images/` n'a été modifié — seuls des fichiers d'infrastructure QA ont été ajoutés (voir section 13).

## 3. Architecture QA choisie

Philosophie : minimalisme délibéré, proportionné à un site statique Astro sans backend.

- **Pas de framework de test** (pas de Vitest/Jest) : les invariants à vérifier sont des règles de cohérence de contenu (parité FR/EN, liens valides, images présentes), pas de la logique métier complexe. Un script Node natif (`node:fs`, `node:path`, `node:url`) suffit et n'ajoute aucune dépendance.
- **Pas de bibliothèque YAML** : le frontmatter du projet est un ensemble restreint et cohérent de champs scalaires sur une seule ligne ; une extraction ciblée par regex est suffisante et évite une dépendance pour un besoin aussi limité.
- **Pas d'ESLint** dans ce lot (voir section 11, dette documentée).
- `astro check` (TypeScript strict, déjà en place) est réutilisé tel quel comme gate de typage.
- Tests d'exécution réelle (`npm run build` + vérification post-build des routes) plutôt que des mocks, pour détecter des régressions de build réelles.

## 4. Scripts npm ajoutés

```diff
   "scripts": {
     "dev": "astro dev",
     "build": "astro build",
     "preview": "astro preview",
-    "astro": "astro"
+    "astro": "astro",
+    "check": "astro check",
+    "test": "node scripts/validate-content.mjs",
+    "qa": "npm run check && npm run test && npm run build && node scripts/validate-routes.mjs"
   },
```

`npm run qa` exécute la chaîne complète en une seule passe (pas de build dupliqué) : typecheck → tests de contenu → build → vérification des routes essentielles sur le build produit.

## 5. Tests ajoutés

### `scripts/validate-content.mjs` (avant build)

1. **Parité FR/EN des slugs** — pour `caseStudies`, `legacyProjects`, `experiences` : détecte les fichiers présents dans une langue et absents dans l'autre, les incohérences slug/nom de fichier, les incohérences `lang`/dossier, et les doublons de slug.
2. **Aucun lien placeholder** — recherche `href="#"` codé en dur dans les fichiers `.astro`, et `githubUrl`/`demoUrl` valant `"#"` ou `""` dans le contenu Markdown.
3. **Existence des images** — tout champ `image:` non nul doit pointer vers un fichier réellement présent sous `public/`.
4. **Cohérence `imagePlaceholder`** — `imagePlaceholder: false` sans image définie est un échec bloquant ; `imagePlaceholder: true` avec une image définie est un avertissement non bloquant (état ambigu à clarifier).
5. **Validité syntaxique des `githubUrl`** — doit commencer par `https://github.com/` et être une URL syntaxiquement valide (`new URL()`). Aucun appel réseau volontairement (pour ne pas rendre la CI dépendante de la disponibilité de GitHub).

### `scripts/validate-routes.mjs` (après build)

6. **Routes essentielles présentes dans `dist/`** : `fr/index.html`, `en/index.html`, `fr/projects/index.html`, `en/projects/index.html`, `fr/contact/index.html`, `en/contact/index.html`.

## 6. Mutations contrôlées (preuve que les tests détectent de vraies régressions)

Deux mutations ont été appliquées temporairement en local, chacune suivie d'une exécution de `npm run test` (ou `npm run qa` pour la mutation post-build), puis immédiatement annulée (`git checkout --` / suppression du fichier temporaire) avant tout commit :

| # | Mutation | Résultat attendu | Résultat observé |
|---|----------|-------------------|-------------------|
| 1 | Suppression de la référence `image:` d'un cas d'étude ayant `imagePlaceholder: false` (mise à `image: null` sans repasser `imagePlaceholder` à `true`) | Échec TEST 4 | ✅ `validate-content` a échoué avec `[TEST 4] ... imagePlaceholder: false mais aucune image définie` |
| 2 | Suppression temporaire du fichier `.md` EN correspondant à un cas d'étude FR existant (asymétrie FR/EN) | Échec TEST 1 | ✅ `validate-content` a échoué avec `[TEST 1] ... existe en FR mais pas en EN` |

Après chaque mutation, l'état du dépôt a été restauré et revérifié propre (`git status` / `git diff` vides) avant de poursuivre. Aucune de ces mutations n'a été commise.

## 7. CI GitHub Actions

Fichier : `.github/workflows/quality.yml`

- Déclencheurs : `pull_request` (toutes branches cibles) et `push` sur `main`.
- Job unique `qa` (`Check, test, build`) sur `ubuntu-latest` :
  1. `actions/checkout@v4`
  2. `actions/setup-node@v4` (Node 22, cache npm)
  3. `npm ci` (installation reproductible depuis le lockfile)
  4. `npm run qa` (typecheck + tests de contenu + build + vérification des routes)

## 8. Sécurité du workflow

- `permissions: contents: read` déclaré explicitement au niveau du workflow (principe du moindre privilège — aucune écriture, aucun accès aux PR/issues).
- Uniquement des actions officielles GitHub (`actions/checkout@v4`, `actions/setup-node@v4`), aucune action tierce.
- Aucun secret utilisé ni requis.
- `npm ci` (et non `npm install`) pour garantir une installation strictement dérivée du lockfile commis.
- Aucun accès réseau sortant dans les scripts de test (vérification `githubUrl` purement syntaxique, sans requête HTTP).

## 9. Résultats locaux

Exécutés depuis la racine du dépôt, sur la branche `qa/portfolio-qa-006` :

- `npm ci` : succès, `package-lock.json` inchangé (vérifié par comparaison de checksum avant/après)
- `npm run check` (`astro check`) : succès, 0 erreur, 0 avertissement TypeScript
- `npm run test` (`validate-content.mjs`) : `validate-content: OK (0 échec, 0 avertissement)`
- `npm run build` : succès
- `node scripts/validate-routes.mjs` : `validate-routes: OK (6/6 routes essentielles présentes)`
- `npm run qa` (chaîne complète) : succès de bout en bout

## 10. Résultats CI (exécution réelle)

CI déclenchée par l'ouverture de la PR #2 (`qa/portfolio-qa-006` → `main`).

- **Workflow** : `Quality` (`.github/workflows/quality.yml`)
- **Run ID** : `31558790276` (run #1)
- **Événement déclencheur** : `pull_request`
- **Commit testé** : `972b2609a06c58de249bf3ffaeb5c11b3a024857`
- **Job** : `Check, test, build`
- **Statut** : `completed` — **conclusion : `success`**
- **Durée** : ~30 s (03:02:16Z → 03:02:46Z UTC, 2026-08-12)
- **Détail des étapes** (toutes `success`) : Set up job → Checkout → Setup Node → Install dependencies (`npm ci`) → Run quality gate (`npm run qa`) → Post Setup Node → Post Checkout → Complete job
- **URL** : https://github.com/Pablo5Berriz/Portfolio/actions/runs/31558790276/job/93996603494

Trois autres checks apparaissent sur la PR (`Redirect rules`, `Header rules`, `Pages changed` — intégration Netlify préexistante, conclusion `neutral`) : ils sont **hors périmètre** de ce lot, non modifiés, non liés au workflow `Quality` ajouté ici.

La CI a donc été réellement exécutée et est passée au vert — condition posée par la directive pour un verdict PASS.

## 11. Lint

**Non ajouté dans ce lot**, décision documentée (et non un oubli) :

- `astro check` (TypeScript strict, déjà en place) couvre déjà les erreurs de typage.
- Les 5 tests de contenu ci-dessus couvrent les modes de défaillance réels auxquels ce site statique est exposé (asymétrie de contenu, liens cassés, images manquantes).
- Ajouter ESLint nécessiterait une nouvelle pile de configuration (config, plugins Astro/TS, règles) disproportionnée par rapport à la valeur ajoutée pour ce lot, dont le périmètre était strictement limité à la QA/CI minimale.
- Dette explicitement reportée (voir section 14), pas silencieusement ignorée.

## 12. CONTENT-PROVENANCE-01

Rappel du constat établi lors de ce lot (audit, sans modification de contenu) : le dépôt GitHub du projet **Forum Sportif** ne contient plus, au moment de la vérification, que du code réel côté C#/ASP.NET historique — son état a évolué depuis l'audit initial (PORTFOLIO-CONTENT-003) vers un dépôt ne contenant plus qu'un `README` (2 commits constatés). Ce projet est déjà classé dans `legacyProjects` (niveau condensé, sans lien de démo ni promesse de code consultable au-delà du README) depuis PORTFOLIO-CONTENT-003 ; aucune modification de contenu n'a été faite dans ce lot QA-006, conformément au périmètre interdit (« Développement fonctionnel : INTERDIT »). Ce constat reste à traiter, le cas échéant, dans un lot de contenu dédié futur.

## 13. Fichiers modifiés

Un seul commit (`972b260`) sur `qa/portfolio-qa-006` :

- `package.json` (modifié — ajout des scripts `check`, `test`, `qa`)
- `scripts/validate-content.mjs` (nouveau)
- `scripts/validate-routes.mjs` (nouveau)
- `.github/workflows/quality.yml` (nouveau)

Aucun fichier de contenu, composant, style ou image n'a été touché. `package-lock.json` inchangé (aucune dépendance ajoutée).

## 14. Dette restante

- Lint (ESLint) non mis en place — voir section 11.
- `CONTENT-PROVENANCE-01` (Forum Sportif) non traité dans ce lot — nécessite une décision PM sur un futur lot de contenu.
- Les tests de contenu ne valident pas la joignabilité réseau des `githubUrl`/`demoUrl` (choix délibéré, pour ne pas rendre la CI flaky sur des indisponibilités externes) — une vérification périodique hors CI pourrait être envisagée séparément.
- Pas de test automatisé de non-régression visuelle (captures d'écran) ni d'audit `axe-core` en CI — ces vérifications ont été faites manuellement lors des lots précédents (STABILIZE-002, VISUALS-005) mais ne sont pas rejouées automatiquement.

## 15. Verdict

**PASS.**

- Baseline vérifiée et respectée (`863687e`, ancêtre direct du commit QA).
- Périmètre strictement respecté : aucun changement fonctionnel/contenu, uniquement infrastructure QA/CI.
- Tests de contenu ajoutés et prouvés efficaces par mutation contrôlée (2/2 mutations détectées, puis annulées avant commit).
- CI réellement exécutée sur GitHub Actions (run `31558790276`) et passée avec succès.
- Un seul commit atomique, poussé sur la branche dédiée `qa/portfolio-qa-006` (jamais `main` directement).
- PR #2 ouverte pour validation CI réelle, **non fusionnée** — fusion en attente de décision PM, conformément à la directive.
