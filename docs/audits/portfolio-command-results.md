# Portfolio — Command Results (PORTFOLIO-AUDIT-001)

Toutes les commandes ci-dessous ont réellement été exécutées dans ce lot, dans le répertoire `/home/user/Portfolio`, sur la branche `claude/portfolio-refonte-audit-7j4213` (HEAD `58c4c0c`). Aucune commande de mutation Git n'a été exécutée.

## CMD-001
Commande : `git remote -v && git branch --show-current && git rev-parse HEAD && git status --short && git status && git branch -vv && git branch -a && git tag --list && git worktree list && git submodule status`
Répertoire : `/home/user/Portfolio`
Objectif : établir la baseline Git (preflight obligatoire, section 5)
Exit code : 0
Résultat :
- Remote `origin` → `https://github.com/Pablo5Berriz/Portfolio`
- Branche locale active : `claude/portfolio-refonte-audit-7j4213`
- HEAD local : `58c4c0c64c4b276a0fb571a641decfafc32b2cc6`
- `git status` : `On branch claude/portfolio-refonte-audit-7j4213 — nothing to commit, working tree clean`
- Branches locales : `claude/portfolio-refonte-audit-7j4213` (courante), `main`
- Branches distantes : `origin/claude/portfolio-refonte-audit-7j4213`, `origin/main`
- Aucun tag, aucun worktree additionnel, aucun sous-module
Warnings : aucun
Erreurs : aucune
Impact : lecture seule, aucun effet de bord

## CMD-002
Commande : `git config --get branch.claude/portfolio-refonte-audit-7j4213.merge` et `.remote`
Répertoire : `/home/user/Portfolio`
Objectif : vérifier la configuration de tracking upstream de la branche locale
Exit code : 1 (les deux, clé absente)
Résultat : aucune configuration de tracking upstream n'est définie pour la branche locale courante dans cette session — anomalie mineure d'hygiène Git, sans impact sur l'intégrité du contenu.
Warnings : aucun
Erreurs : configuration absente (comportement attendu de `git config --get` sur une clé inexistante)
Impact : lecture seule

## CMD-003
Commande : `git merge-base HEAD origin/main` puis `git merge-base --is-ancestor HEAD origin/main` puis `git rev-list --left-right --count HEAD...origin/main` puis `git log origin/main -3 --oneline` puis `git show --no-patch --format="%H %P" origin/main` puis `git log --graph --oneline --all -10`
Répertoire : `/home/user/Portfolio`
Objectif : déterminer la relation entre le HEAD local et `origin/main`, confirmer la nature du merge annoncé par le PM
Exit code : 0
Résultat :
- `HEAD` local est un ancêtre direct de `origin/main` (fast pas de divergence)
- `origin/main` (`212f6836...`) est un commit de merge réel à 2 parents : `6686956...` (ancien tip de `main`) et `58c4c0c...` (tip de la branche locale actuelle)
- Aucune réécriture d'historique, aucun squash, aucun force-push détecté — le graphe est linéaire et propre
Warnings : aucun
Erreurs : aucune
Impact : lecture seule

## CMD-004
Commande : `find . -path ./.git -prune -o -path ./node_modules -prune -o -type f -print`
Répertoire : `/home/user/Portfolio`
Objectif : inventaire complet des fichiers suivis/présents (hors `.git`, `node_modules`)
Exit code : 0
Résultat : 84 fichiers, structure `src/{components,content,i18n,layouts,pages,styles}` + `public/{cv,images}` + configuration racine (`astro.config.mjs`, `tsconfig.json`, `package.json`). Aucun dossier `.github/`, aucun fichier `.env*`.
Warnings : aucun
Erreurs : aucune
Impact : lecture seule

## CMD-005
Commande : `node --version && npm --version` puis `sha256sum package-lock.json`
Répertoire : `/home/user/Portfolio`
Objectif : établir l'environnement runtime et un checksum de référence du lockfile avant toute installation
Exit code : 0
Résultat : Node v22.22.2, npm 10.9.7 (répond à `engines.node: >=22.12.0` du `package.json`). Lockfile `lockfileVersion: 3`. Checksum initial : `61b2ef647b4353c072be525ca4b5a987309c34f22e2b9d12969ccd7292ac42aa`.
Warnings : aucun
Erreurs : aucune
Impact : lecture seule

## CMD-006
Commande : `npm ci`
Répertoire : `/home/user/Portfolio`
Objectif : installation reproductible des dépendances (autorisée section 21.2, requise pour exécuter build/typecheck)
Exit code : 0
Résultat : 357 packages installés. 12 vulnérabilités rapportées par npm (6 modérées, 6 élevées) — détail en section Sécurité du rapport principal.
Warnings : `whatwg-encoding@3.1.1` déprécié (transitif)
Erreurs : aucune
Impact : écriture dans `node_modules/` uniquement (ignoré par Git). Checksum du lockfile revérifié après coup : identique (`61b2ef6...`) — **aucune modification du lockfile**.

## CMD-007
Commande : `npx astro check`
Répertoire : `/home/user/Portfolio`
Objectif : typecheck (section 21.3)
Exit code : 0
Résultat : `Result (33 files): 0 errors, 0 warnings, 41 hints`. Les 41 hints sont tous `ts(6385) 'z' is deprecated` sur `src/content.config.ts`, liés au typage interne de `astro:content` (API Zod historique exposée par Astro), sans impact fonctionnel.
Warnings : 0 (hints uniquement)
Erreurs : 0
Impact : lecture seule (génère `.astro/types.d.ts`, ignoré par Git)

## CMD-008
Commande : `npm run build` (→ `astro build`)
Répertoire : `/home/user/Portfolio`
Objectif : validation du build de production (gate majeure, section 22)
Exit code : 0
Résultat : **BUILD : PASS**. 13 pages générées (`/`, `/fr/*` ×6, `/en/*` ×6) en 1,58 s. Sortie `dist/` = 1,7 Mo. Un seul bundle JS client (`ContactView...js`, 4,5 Ko) et un seul bundle CSS (`BaseLayout...css`, 9,5 Ko) — cohérent avec l'architecture "zéro JS par défaut" revendiquée.
Warnings : aucun
Erreurs : aucune
Impact : écriture dans `dist/` uniquement (ignoré par Git)

## CMD-009
Commande : script Playwright — 12 routes (FR ×6, EN ×6) contre `astro preview` (port 4322), avec écoute `console`/`pageerror`/`response`
Répertoire : `/home/user/Portfolio` (serveur), script exécuté depuis `/tmp/audit-scratch`
Objectif : vérification runtime réelle (comportement, pas déclaration) — section 3, ordre de preuve n°1
Exit code : 0 (script), 200 sur les 12 routes + `/`
Résultat : 0 erreur console, 0 erreur `pageerror`, 0 requête HTTP ≥ 400, exactement un `<h1>` par page, attribut `lang` correct (`fr`/`en`) sur chaque page. 0 lien `href="#"` ou `href=""` détecté sur les 12 pages (tous les `<a href>` inspectés).
Warnings : aucun
Erreurs : aucune
Impact : lecture seule (contre un serveur `preview` local temporaire, tué après usage)

## CMD-010
Commande : script Playwright — mesure `document.documentElement.scrollWidth` vs `clientWidth` sur `/fr`, `/fr/projects`, `/fr/contact` à 5 largeurs (360, 390, 768, 1280, 1440 px)
Répertoire : idem CMD-009
Objectif : détection de débordement horizontal (responsive, section 15)
Exit code : 0
Résultat : **aucun débordement détecté** sur les 15 combinaisons page × largeur testées.
Warnings : aucun
Erreurs : aucune
Impact : lecture seule

## CMD-011
Commande : script Playwright — clic sur `#menu-toggle` à 390×844, lecture `aria-expanded`, puis touche `Escape`
Répertoire : idem CMD-009
Objectif : vérification comportementale du menu hamburger (section 16)
Exit code : 0
Résultat : `aria-expanded` passe `false → true` à l'ouverture, revient à `false` après `Escape`. Comportement conforme.
Warnings : aucun
Erreurs : aucune
Impact : lecture seule

## CMD-012
Commande : script Playwright — inspection DOM de `/fr/contact` (`input[type=file]`, `#company` boundingBox, `#consent[required]`)
Répertoire : idem CMD-009
Objectif : vérification du formulaire de contact (section 19)
Exit code : 0
Résultat : aucun champ fichier présent dans le DOM. Honeypot `#company` positionné hors écran (`x: -9999`). Case de consentement `#consent` porte l'attribut `required`.
Note de portée : ceci valide la **structure** du formulaire, pas la livraison réelle d'un email (dépend du service EmailJS externe, non vérifiable depuis ce dépôt sans déclencher un envoi réel — non tenté, hors périmètre non destructif).
Warnings : aucun
Erreurs : aucune
Impact : lecture seule

## CMD-013
Commande : `axe-core@latest` (installé en `devDependency` scratch dans `/tmp/audit-scratch`, **jamais** dans le dépôt produit) injecté via Playwright sur `/fr`, `/fr/projects`, `/fr/contact`, `/en/skills`, règles `wcag2a`+`wcag2aa`+`wcag21aa`+`wcag22aa`
Répertoire : `/tmp/audit-scratch` (script), cible = serveur `preview` du dépôt
Objectif : audit accessibilité automatisé réel (section 16)
Exit code : 0
Résultat : **violation `color-contrast` (impact "serious") sur les 4 pages testées**, thème clair et thème sombre. Détail :
- Thème clair : `--color-accent` (`#0f9c8c`) sur fond `#f7f8fb` → ratio 3.21:1 (attendu 4.5:1) ; texte blanc sur bouton `--color-accent` → ratio 3.41:1 (attendu 4.5:1)
- Thème sombre : `--color-text-faint` (`#64748b`) sur `--color-bg-inset` (`#0a0f1d`) → ratio 4.01:1 (attendu 4.5:1)
- Aucune autre catégorie de violation WCAG 2.2 AA détectée (labels, landmarks, noms accessibles, structure de titres, etc. — tous PASS)
Warnings : aucun
Erreurs : aucune
Impact : lecture seule. `axe-core` n'a été ajouté à aucun fichier de dépendances du produit (`package.json`/`package-lock.json` du dépôt inchangés).

## CMD-014
Commande : `grep` ciblé — `TODO|FIXME|HACK|XXX`, `href="#"|example\.com|localhost|lorem|dummy|test@example`, `imagePlaceholder: true`, `innerHTML|dangerouslySetInnerHTML`, `set:html`, `target="_blank"` (avec vérification `rel`)
Répertoire : `/home/user/Portfolio/src`, `/home/user/Portfolio/public`, `/home/user/Portfolio/astro.config.mjs`
Objectif : recherche de code mort, placeholders non documentés, vecteurs XSS (sections 20, 26)
Exit code : 0
Résultat :
- Aucun `TODO`/`FIXME`/`HACK`/`XXX` dans `src/`. Un seul `TODO` documenté dans `astro.config.mjs` (domaine placeholder, déjà connu et documenté dans le README)
- Aucun `href="#"`, aucun `localhost` codé en dur, aucun `lorem`, aucun `dummy`, aucun `test@example` dans `src/`
- `you@example.com` trouvé une fois : c'est un texte d'exemple (`placeholder` HTML) dans un champ de formulaire, pas du contenu mort
- 12 fichiers de contenu (6 études de cas × FR/EN) portent `imagePlaceholder: true`, tous documentés comme tels et affichés avec un bloc "Capture à venir" explicite à l'écran (pas une image cassée silencieuse)
- Aucun `innerHTML`/`dangerouslySetInnerHTML`. Deux usages de `set:html`, tous deux sur du JSON généré côté build à partir de données de confiance (Schema.org, chaînes i18n) — pas d'entrée utilisateur
- 7 occurrences de `target="_blank"`, toutes accompagnées de `rel="noopener noreferrer"`
Warnings : aucun
Erreurs : aucune
Impact : lecture seule

## CMD-015
Commande : `npm audit`
Répertoire : `/home/user/Portfolio`
Objectif : audit des dépendances (section 9)
Exit code : non-zéro (npm renvoie un code non-zéro quand des vulnérabilités sont trouvées — comportement standard, pas un échec de commande)
Résultat : 12 vulnérabilités (6 modérées, 6 élevées). Distinction faite dans le rapport principal entre dépendance de **production** (`astro <=7.0.9`, modérée) et dépendances de **tooling de développement uniquement** (`@astrojs/check` → `@astrojs/language-server` → `yaml-language-server` → `fast-uri`, `js-yaml`, `nanoid`, `postcss`, `svgo`, `tar`, `undici`, `yaml` — élevées/modérées, non livrées dans `dist/`).
Warnings : n/a
Erreurs : aucune commande n'a échoué ; aucune dépendance modifiée
Impact : lecture seule (aucune exécution de `npm audit fix`)

## CMD-016
Commande : `find /home/user/Portfolio -maxdepth 3 -iname ".env*"` puis `grep -rniE "api[_-]?key|secret|password|private[_-]?key|token"` sur `src/`, `public/`, configs racine
Répertoire : `/home/user/Portfolio`
Objectif : recherche de secrets commités (section 20)
Exit code : 0
Résultat : aucun fichier `.env*` présent. Aucun secret détecté. Les seules occurrences de mots-clés sensibles sont soit des noms de packages npm dans `package-lock.json` (faux positifs), soit les identifiants publics EmailJS (`iP6iXrt0fsKUx7RP0`, `service_5ch69jb`, `template_zzri904`) dans `src/components/views/ContactView.astro` — par construction publics côté client, leur protection réelle dépend d'une restriction de domaine côté dashboard EmailJS, **non vérifiable depuis ce dépôt**.
Warnings : aucun
Erreurs : aucune
Impact : lecture seule

## CMD-017
Commande : `git status --short` (contrôle final, section 40)
Répertoire : `/home/user/Portfolio`
Objectif : confirmer qu'aucune modification de code produit n'a eu lieu pendant l'audit
Exit code : 0
Résultat : working tree strictement identique à l'état initial (hors `node_modules/` et `dist/`, tous deux ignorés par Git). Checksum du lockfile inchangé. Voir section 40 du rapport principal pour le détail complet.
Warnings : aucun
Erreurs : aucune
Impact : lecture seule
