# PORTFOLIO-PROD-010

## 1. Baseline

`origin/main` vérifié au preflight : `0deae983f7d35bf98495c6ce6d65bdc1a1fbb01a` — identique au SHA imposé par la directive, aucune divergence. Branche créée depuis ce SHA : `release/portfolio-prod-010`.

## 2. Dependency audit

`npm ci` puis `npm audit` (état réel, pas supposé) :

| Package | Sévérité | CVE | Chemin de dépendance | Exploitabilité réelle |
|---|---|---|---|---|
| `astro` (direct) | modérée ×3 | GHSA-8mv7-9c27-98vc (bypass `security.checkOrigin` du pipeline hono/middleware) | direct | **Nulle** — ce site est `output: "static"`, aucun middleware, aucun SSR |
| `astro` (direct) | modérée | GHSA-f48w-9m4c-m7f5 (XSS via attributs spread non échappés) | direct | Faible — aucun `{...objet}` non fiable dans le code du site |
| `astro` (direct) | modérée | GHSA-4g3v-8h47-v7g6 (XSS via View Transitions) | direct | Nulle — View Transitions non utilisées |
| `fast-uri`, `yaml`, `yaml-language-server`, `volar-service-yaml`, `@astrojs/language-server` | modérée | divers | `@astrojs/check` → `@astrojs/language-server` → ... | **Nulle** — outillage `astro check` uniquement (devDependency), jamais exécuté en production |
| `nanoid`, `postcss` | haute/modérée | GHSA-28wg-ghj8-5hjv, GHSA-r28c-9q8g-f849, etc. | `astro` → `vite` → `postcss` | **Nulle** — traitement CSS au build uniquement, jamais d'entrée non fiable |
| `svgo` (×2 chemins), `extract-zip`, `@iconify/tools`, `astro-icon`, `undici`, `tar` | haute | GHSA-2p49-hgcm-8545, GHSA-jmr9-qjv8-65gv, etc. | `astro-icon` → `@iconify/tools` → {svgo, extract-zip, tar, undici} | **Très faible** — traite exclusivement les paquets d'icônes propres et épinglés du dépôt (`@iconify-json/lucide`, `@iconify-json/simple-icons`) au build ; jamais de zip/SVG non fiable, jamais exécuté côté navigateur |

## 3. Vulnerabilities

- **Avant** : 15 (6 modérées, 9 hautes)
- **Après** : 3 (0 modérée, 3 hautes)

Les 3 restantes sont toutes dans la même chaîne `astro-icon` → `@iconify/tools` → `{extract-zip, svgo, undici}`. `fixAvailable` pour ces trois-là exige un **downgrade majeur** (`astro-icon` 1.1.5 → 0.8.2, breaking change, API différente) — refusé conformément à la règle « préférer patch/minor avant majeure » et à l'absence de bénéfice réel (chaîne build-time uniquement, entrées de confiance). Risque accepté et documenté, pas ignoré silencieusement.

## 4. Updates applied

| Package | Avant | Après | Type | Justification |
|---|---|---|---|---|
| `astro` | 7.0.4 | 7.2.1 | minor | Corrige les 3 CVE modérées de la dépendance directe |
| `@astrojs/check` | 0.9.9 | 0.9.10 | patch (dev) | Suit `astro`, sans effet fonctionnel |
| (transitifs via `npm audit fix`, jamais `--force`) | — | — | patch/minor | `postcss`, `nanoid`, `tar`, `undici`, `fast-uri`, `yaml`, `volar-service-yaml`, `yaml-language-server`, `@astrojs/language-server` mis à jour sans breaking change |

`npm run qa` PASS après chaque changement (vérifié à chaque étape, pas seulement à la fin). `package-lock.json` mis à jour en conséquence, aucune dépendance ajoutée « pour le plaisir ».

## 5. Production domain

`astro.config.mjs` contient déjà :
```js
// TODO(user): replace with the real production domain before deploying.
const SITE_URL = 'https://paulquentinondoa.dev';
```
Cette valeur est utilisée de façon cohérente partout (canonical, hreflang, OG, sitemap, `public/robots.txt`) — ce n'est pas un placeholder générique type `example.com`, mais elle porte elle-même un TODO explicite du propriétaire indiquant qu'elle n'est pas confirmée pour la production. **Aucune valeur n'a été inventée ni modifiée.**

**`PRODUCTION_DOMAIN_REQUIRED`** — décision PM/utilisateur nécessaire : confirmer que `paulquentinondoa.dev` est bien le domaine de production réel (ou fournir le domaine réel), avant mise en ligne. Tant que ce point n'est pas tranché, considérer `HSTS` (section 11) et le déploiement effectif comme bloqués.

## 6. SEO production

Vérifié dans `src/layouts/BaseLayout.astro` :
- Canonical FR/EN : présent, généré dynamiquement par page (`<link rel="canonical">`)
- hreflang : `fr`, `en`, et `x-default` → FR (locale par défaut) : présents
- Sitemap : généré par `@astrojs/sitemap`, `sitemap-index.xml` → `sitemap-0.xml`, 13 URLs (toutes les pages FR/EN + racine), pas de doublon, pas de page 404 incluse
- Robots : `public/robots.txt` — `Allow: /`, référence le sitemap, cohérent avec le domaine ci-dessus
- Open Graph : `og:type/title/description/url/image/locale` présents
- Twitter/X : `twitter:card=summary_large_image`, title/description/image présents
- Schema.org : JSON-LD `ProfilePage` → `Person` (nom, URL, jobTitle, `sameAs` GitHub + LinkedIn) via `set:html` sur un objet JS statique (contenu développeur, pas d'entrée utilisateur — usage sûr, revérifié en section 10)
- Favicon : `public/favicon.svg` présent et référencé
- Image sociale : `public/images/profile.jpg` présente, utilisée comme `og:image`/`twitter:image` par défaut
- Indexabilité : aucune page normale n'a `noindex` ; la nouvelle page 404 en a un (correct)

Aucun texte SEO existant n'a été réécrit (aucune erreur factuelle trouvée). Score Lighthouse SEO = 100 sur les 4 routes échantillonnées après correction du lien générique (section 18).

## 7. 404

Créée : `src/pages/404.astro`. Le site étant 100% statique (`output: "static"`), ce fichier unique est servi par l'hébergeur pour toute URL non reconnue, quelle que soit la langue visée — il n'y a pas de rendu par requête pour détecter la locale voulue. Plutôt que de deviner une langue, le contenu affiche **les deux langues simultanément** (titre, message, boutons retour accueil/projets FR et EN), chacun avec ses propres liens localisés. Réutilise `BaseLayout`/`Header`/`Footer` et les classes existantes (`.section`, `.container`, `.btn`, tokens `--space-*`) — aucune nouvelle dépendance, aucun nouveau pattern de design. `noindex` appliqué via le nouveau prop de `BaseLayout`. Liens natifs `<a>`, donc accessibles au clavier sans code supplémentaire. Responsive vérifié aux 5 largeurs requises (section 21).

## 8. Contact form

Formulaire (`src/components/views/ContactView.astro`) audité en intégralité :

| Élément | État |
|---|---|
| Honeypot | ✓ champ `company` masqué (`aria-hidden`, hors flux visuel, `tabindex="-1"`), soumission silencieusement ignorée si rempli |
| Consentement | ✓ case à cocher `required`, message d'erreur dédié |
| Validation | ✓ champs requis vérifiés côté client avant tout appel réseau |
| Gestion succès | ✓ message de succès (`aria-live="polite"`), formulaire réinitialisé |
| Gestion erreur | ✓ message d'erreur générique en cas d'échec EmailJS, bouton réactivé |
| Double soumission | ✓ bouton désactivé pendant l'envoi (`submitButton.disabled`) |
| Rate limiting | Client uniquement — voir section 26 |
| Dépendance réseau | `@emailjs/browser`, appel `POST` à `api.emailjs.com` au moment de la soumission |
| Accessibilité | ✓ labels associés, `aria-live="polite"` sur le statut, focus géré nativement (pas de piège au clavier) |

## 9. EmailJS

- `service_5ch69jb`, `template_zzri904`, clé publique `iP6iXrt0fsKUx7RP0` : codés en dur dans `ContactView.astro`. **Ce ne sont pas des secrets** — la clé publique EmailJS est explicitement conçue pour être exposée côté navigateur (elle finirait de toute façon dans le bundle JS livré, que ce soit codé en dur ou lu depuis une variable d'environnement `PUBLIC_*` — même exposition finale). Correctement qualifiée comme clé publique, pas de fuite de secret privé.
- `.env.example` : **non créé**, décision documentée — le projet n'utilise **aucune** variable d'environnement (`grep -rn "import.meta.env\|process.env"` sur `src/` et `astro.config.mjs` : zéro résultat). Créer un `.env.example` vide ou fictif aurait été trompeur ; rien à documenter tant que rien n'est lu depuis `import.meta.env`.
- Aucun secret trouvé dans le dépôt (voir section 10).
- Test d'envoi réel : voir section 26 (« Email delivery test »).

## 10. Security (source scan)

`grep` ciblé sur `password|secret|api_key|apikey|private_key|BEGIN PRIVATE KEY|sk_live|sk_test|Bearer |localhost|http://|innerHTML|set:html|eval(` sur `src/` et `public/` :

- Aucun mot de passe, secret, clé privée, jeton Bearer, ni `localhost`
- `http://` : un seul résultat, `xmlns="http://www.w3.org/2000/svg"` dans `favicon.svg` — espace de noms XML requis par la spec SVG, faux positif
- `innerHTML` : aucun usage — le vecteur XSS le plus commun est absent du code
- `set:html` : 2 usages, tous deux sur des objets JavaScript statiques écrits par le développeur (schéma JSON-LD dans `BaseLayout.astro`, chaînes i18n dans `ContactView.astro`) — aucune entrée utilisateur n'y transite, usage sûr et revu
- `eval(` : aucun usage

## 11. CSP/headers

`public/_headers` créé, lu nativement par les hébergeurs qui le supportent (Netlify notamment, sans nécessiter de `netlify.toml`).

**Inventaire des ressources réelles avant construction de la CSP** : aucun analytics, aucun script CDN, aucune police externe, aucun iframe. Domaines externes réellement contactés par le site : `github.com`/`linkedin.com` (liens, pas des ressources chargées), `api.emailjs.com` (appel XHR/fetch du formulaire).

**4 scripts inline/inline-bundlés identifiés** (vérifiés par observation directe des violations CSP réelles dans Chromium, pas par une regex sur le code source — une regex naïve a d'ailleurs raté 2 des 4 car Astro peut minifier/inliner de petits scripts non marqués `is:inline`) :
1. Script anti-flash de thème (`BaseLayout.astro`, toutes les pages)
2. Redirection de langue racine (`index.astro`, page `/` uniquement)
3. Bascule du menu mobile (`Header.astro`, toutes les pages)
4. Filtres de la page projets (`ProjectsView.astro`, `/projects` uniquement)

Chacun autorisé par son hash SHA-256 exact — **aucun `'unsafe-inline'`** sur `script-src`.

`astro.config.mjs` définit `build.inlineStylesheets: 'never'` : plus aucun `<style>` inline dans le HTML généré, donc `style-src 'self'` sans hash ni `unsafe-inline` à maintenir — plus fiable qu'une liste de hash par page qui se périmerait à chaque modification de contenu non liée.

CSP complète :
```
default-src 'self';
script-src 'self' 'sha256-9kjhxFzhVktVfegQYtA7w6kOJwQEpvGN0OspwQ4zcII=' 'sha256-FqN8YP6S+wCgwV2/ms01NS0bnyanfbyKf/4RTAZsm8k=' 'sha256-F7YY8lR2h37owlpVg4yRF56CgjUIQoX6L7nYo6t5ecQ=' 'sha256-fiFKg7AkfLshjknGH/wyEaDcjKVS7kA8b869IysUNDs=';
style-src 'self';
img-src 'self';
font-src 'self';
connect-src 'self' https://api.emailjs.com;
form-action 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none'
```
Plus : `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`, `X-Frame-Options: DENY`.

Aucun `unsafe-eval`, aucun `*`. **`HSTS` volontairement omis** : la directive l'exige uniquement si l'HTTPS de production est garanti, ce qui n'est pas encore le cas tant que `PRODUCTION_DOMAIN_REQUIRED` (section 5) et l'hébergement (section 13) ne sont pas confirmés.

**Validation réelle** : CSP rejouée via injection d'en-têtes de réponse Playwright sur `/fr /en /fr/projects /en/projects /fr/contact /en/contact /404` — **0 violation** sur les 7 routes.

## 12. Environment variables

| Variable | Existe dans le code ? |
|---|---|
| — | **Aucune.** `import.meta.env`/`process.env` : 0 occurrence dans tout `src/` et `astro.config.mjs` |

`.env.example` non créé (rien à documenter). Aucun secret commité.

## 13. Hosting

Recherché : `netlify.toml`, `vercel.json`, `wrangler.toml`, `public/_headers` (créé dans ce lot), `public/_redirects` — **aucun fichier de configuration d'hébergement présent dans le dépôt** avant ce lot. `.github/workflows/` ne contient que `quality.yml` (CI de qualité, pas de déploiement).

**Netlify** : les checks GitHub observés sur la PR #2 (lot QA-006) et sur les pushs `main` ultérieurs montrent 3 checks nommés `Redirect rules — paul-quentin-porfolio`, `Header rules — paul-quentin-porfolio`, `Pages changed — paul-quentin-porfolio`, tous avec `details_url` pointant vers `app.netlify.com/projects/paul-quentin-porfolio/...`. Ceci indique que l'application GitHub de Netlify **est connectée à ce dépôt** et déploie automatiquement (détection zéro-config d'Astro, sans nécessiter de `netlify.toml`). **Ceci reste une preuve indirecte** (des checks de PR), pas une confirmation par un fichier de configuration présent dans le dépôt lui-même — ce n'est pas supposé être automatiquement « la production officielle » sans confirmation PM explicite. `public/_headers` fonctionne nativement si Netlify est bien la plateforme réelle ; si ce n'est pas le cas, ce fichier reste inoffensif (simplement ignoré par un hébergeur qui ne le lit pas).

**Aucun déploiement n'a été effectué**, conformément à la directive.

## 14. External links

| Lien | Vérification | Résultat |
|---|---|---|
| `github.com/Pablo5Berriz` (profil) | Fetch direct bloqué par le proxy réseau de cette session (domaine non repo-scopé) | Confirmé indirectement réel : plusieurs dépôts sous ce compte (`biketrip`, `eduquiz`, `bilik-farm`, `cosmechic-`, `WeatherWise`, `Forum-Sportif`) clonés avec succès plus tôt dans cette même session (lot REVERIFY-007) |
| `linkedin.com/in/paul-quentin-ondoa-5352951b5/` | Fetch direct bloqué (domaine hors liste blanche du proxy) | **NON VÉRIFIABLE depuis cet environnement** |
| `github.com/Pablo5Berriz/{eduquiz,biketrip,bilik-farm,cosmechic-}` | Clonés avec succès (REVERIFY-007, même session) | Réels et accessibles |
| `github.com/Pablo5Berriz/WeatherWise`, `.../Forum-Sportif` | Clonés avec succès (REVERIFY-007, même session) | Réels et accessibles |
| Tous les `target="_blank"` du site | `grep` exhaustif sur `src/` | 100% portent `rel="noopener noreferrer"` |
| `href="#"` | Scan automatisé Playwright sur toutes les routes testées | 0 occurrence |

Aucun contrôle HTTP externe n'a été intégré comme gate CI permanente, conformément à la directive.

## 15. CV

`public/cv/CV_Paul_Quentin.pdf` : présent, `file` confirme un PDF valide (version 1.3, 5 pages). Lien fonctionnel dans `Footer.astro` (`download` natif). Un seul fichier utilisé pour FR et EN (stratégie déjà en place, non modifiée). Contenu du CV **non relu ni réécrit**, conformément au périmètre interdit.

## 16. Analytics

Aucun analytics actuellement installé (confirmé : aucun script de tracking dans le code ou dans l'inventaire CSP). **Aucun ajouté dans ce lot**, conformément à l'interdiction explicite.

Options compatibles à évaluer par le PM pour un lot futur (non installées) :
- **Netlify Analytics** (si Netlify est confirmé comme hébergeur — section 13) : basé sur les logs serveur, aucun script client, aucun impact CSP/RGPD
- Solution auto-hébergée respectueuse de la vie privée type Plausible/Umami : nécessiterait un `script-src`/`connect-src` CSP additionnel et une décision d'hébergement séparée

## 17. Monitoring

Pour un site statique sans backend, recommandations proportionnées (aucune infrastructure construite) :
- **Disponibilité du domaine/HTTPS** : un service de ping uptime gratuit externe (ex. UptimeRobot) une fois le domaine confirmé
- **Erreurs de formulaire** : consultation périodique du tableau de bord EmailJS (logs de livraison/échecs) — aucune télémétrie côté site nécessaire
- **Déploiement** : déjà couvert par `.github/workflows/quality.yml` (échoue avant que du code cassé n'atteigne `main`)

## 18. Performance

Lighthouse (mobile, throttling simulé) réellement exécuté (installé ad hoc, jamais ajouté aux dépendances du projet) — scores réels, aucun n'a été inventé :

| Route | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/fr` | 97 | 100 | 100 | 100 |
| `/en` | 97 | 100 | 100 | 100 |
| `/fr/projects` | 100 | 100 | 100 | 100 |
| `/fr/contact` | 100 | 100 | 100 | 100 |

Avant corrections (commit `fix(portfolio): resolve heading order and link text a11y/SEO issues`) : `/fr/projects` accessibility=98 (ordre de titres invalide, `h3`/`h4` sautant un niveau), `/en` seo=92 (texte de lien générique « Learn more »). Les deux corrigés et revérifiés (voir section 22).

Les scores Performance de 97 (au lieu de 100) sur les pages d'accueil restent très élevés ; aucune optimisation supplémentaire n'a été tentée pour ne pas dépasser le périmètre de ce lot (pas de refonte d'image/build).

## 19. QA

`npm ci` → PASS (lockfile stable après commit). `npm run qa` (check + test + build + routes) → **PASS**, exécuté après chaque changement de dépendance et une dernière fois sur l'état final committé. `git diff --check` → PASS (aucun problème d'espace blanc).

## 20. Runtime

Testé via Playwright sur `/fr /en /fr/projects /en/projects /fr/contact /en/contact /404` :
- HTTP 200 partout, 0 erreur console, 0 requête échouée, 0 `href="#"`, 0 image cassée
- Bascule de thème : vérifiée fonctionnelle (`light → dark`)
- Changement de langue : lien `/en/contact` présent et correct depuis `/fr/contact`
- Formulaire de contact : soumission vide bloquée avec message d'erreur inline, sans navigation ni appel réseau

## 21. Responsive

360/390/768/1280/1440px sur `/fr /en /fr/projects /en/projects /fr/contact /en/contact /404` : **0 débordement horizontal**, 0 carte cassée observée (35 combinaisons route × largeur testées).

## 22. Accessibility

`axe-core` sur les 7 routes requises, thèmes clair/sombre : **0 violation** au total (14 combinaisons). Note de méthode : une première passe avait rapporté 3 fausses violations de contraste (thème sombre sur `/en`, `/fr/contact`, `/404`) — diagnostiquées comme un artefact de test (la transition CSS de 220ms du changement de thème n'avait pas fini de s'appliquer au moment de la mesure, capturant une couleur intermédiaire mi-transition), pas un vrai défaut de production : en usage réel, le thème est fixé avant le premier rendu par le script `is:inline` de `BaseLayout`. Revérifié en laissant la transition se stabiliser avant mesure : 0 violation, confirmé stable.

Lighthouse accessibility (mobile) : 100 sur les 4 routes échantillonnées après correction de l'ordre des titres (section 18).

## 23. CI

PR à ouvrir vers `main` depuis `release/portfolio-prod-010` pour déclencher la CI réelle (workflow `Quality`). Résultat documenté dans le retour PM final une fois le run observé.

## 24. Release checklist

| Gate | État | Preuve | Bloquant production |
|---|---|---|---|
| Build | PASS | `astro build`, 14 pages, 0 erreur | Non |
| QA | PASS | `npm run qa` (check+test+build+routes) | Non |
| A11y | PASS | axe-core 0 violation (7×2) ; Lighthouse a11y 100 (4 routes) | Non |
| Responsive | PASS | 0 overflow (7 routes × 5 largeurs) | Non |
| SEO | PASS | canonical/hreflang/sitemap/robots/OG/JSON-LD présents ; Lighthouse SEO 100 | Non |
| Domain | **PRODUCTION_DOMAIN_REQUIRED** | `astro.config.mjs` TODO explicite | **Oui — décision PM requise** |
| Security (headers/CSP) | PASS (proposé, non déployé) | `public/_headers`, 0 violation CSP simulée | Non (nécessite l'hébergeur confirmé pour prendre effet) |
| Dependencies | PASS SOUS RÉSERVES | 15→3 vulnérabilités, 3 restantes = risque accepté documenté | Non |
| Contact form | PASS | Audit complet, honeypot/consentement/validation/a11y OK | Non |
| Email delivery | **NON VÉRIFIÉ** | Réseau externe bloqué dans cet environnement | Non bloquant seul (PASS SOUS RÉSERVES) |
| CI | En attente | PR à ouvrir, run réel à observer | À confirmer avant merge |
| 404 | PASS | Page créée, testée, noindex | Non |
| External links | PASS SOUS RÉSERVES | GitHub confirmé indirectement, LinkedIn non vérifiable ici | Non |

## 25. Blocking items

1. **`PRODUCTION_DOMAIN_REQUIRED`** — confirmer `paulquentinondoa.dev` ou fournir le domaine réel avant toute mise en ligne
2. **Hébergement non confirmé par un fichier de configuration du dépôt** — preuve indirecte (checks Netlify) seulement ; à confirmer explicitement avant d'activer HSTS ou de considérer `public/_headers` comme définitivement pertinent

## 26. Decisions PM required

1. Confirmer le domaine de production (section 5/25)
2. Confirmer que Netlify est bien l'hébergement officiel (section 13), ou indiquer l'hébergeur réel
3. Une fois domaine + hébergement confirmés : activer `Strict-Transport-Security` dans `public/_headers`
4. Vérifier/configurer la restriction de domaine EmailJS sur le tableau de bord EmailJS (hors dépôt, non vérifiable depuis le code)
5. Décider si un test d'envoi EmailJS réel doit être effectué manuellement par le PM — bloqué depuis cet environnement : une tentative d'envoi contrôlé (contenu marqué « PORTFOLIO-PROD-010 TEST ») vers `api.emailjs.com` a été faite et a échoué avec `CONNECT tunnel failed, response 403` — le proxy réseau de cette session bloque ce domaine externe. **EMAIL DELIVERY NOT VERIFIED**, conformément à la tolérance explicite de la directive (contribue à un PASS SOUS RÉSERVES, pas un FAIL).
6. Décider si une protection serveur du formulaire de contact est nécessaire pour un lot futur (le rate limiting actuel — 60s via `localStorage` — est une mesure UX, pas une protection réelle contre un attaquant scripté appelant directement l'API EmailJS en contournant le JavaScript du site). La protection réelle contre l'abus repose sur : (a) les quotas du compte EmailJS lui-même, (b) une éventuelle restriction de domaine côté tableau de bord EmailJS (point 4 ci-dessus), (c) le honeypot (dissuade les bots simples, pas un abus ciblé). Aucun backend n'a été construit dans ce lot ; si nécessaire, cela doit faire l'objet d'un lot séparé avec décision PM explicite.
7. Décider d'un outil analytics (ou aucun) parmi les options documentées (section 16), une fois l'hébergement confirmé

## 27. Release verdict

**PRODUCTION READY SOUS CONDITIONS**

Tous les gates techniques sont au vert (build, QA, a11y, responsive, SEO, CSP, formulaire, CI en attente de confirmation). Les deux conditions bloquantes (section 25) sont des décisions produit/PM par nature — confirmer le domaine réel et l'hébergeur réel — pas des défauts techniques. Une fois ces deux points tranchés, activer HSTS et considérer la configuration comme définitivement prête pour un déploiement réel.

## 28. Lot verdict

**PASS**

Toutes les corrections demandées ont été appliquées et vérifiées avec des preuves réelles (pas de score inventé, pas de lien non testé silencieusement supposé fonctionnel). Les deux points bloquants restants pour la mise en production (domaine, hébergement) sont des décisions PM par nature, pas des défauts techniques laissés de côté — documentés précisément plutôt que devinés.
