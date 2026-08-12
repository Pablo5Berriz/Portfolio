# PORTFOLIO-VISUALS-005 — Rapport

Lot : PORTFOLIO-VISUALS-005 | Type : crédibilité visuelle des études de cas

## 1. Baseline

| Élément | Valeur |
|---|---|
| Baseline exigée | `12a902189cf89d9e11004730bae7202285f80f9a` |
| `origin/main` au preflight | `12a902189cf89d9e11004730bae7202285f80f9a` — **conforme, aucune divergence** |
| Branche de travail | `content/portfolio-visuals-005`, créée depuis `origin/main` |
| Working tree initial | Propre |

## 2. Inventaire visuel initial

| Projet | Classe | Image actuelle | Placeholder | Asset réel disponible | Source | Action recommandée |
|---|---|---|---|---|---|---|
| EduQuiz | A | `null` | Oui | Non — repo réel (70 commits) mais aucun screenshot/logo committé, seulement des icônes SVG de matières scolaires non représentatives du produit | github.com/Pablo5Berriz/eduquiz | Rechercher (voir §3) — aucun résultat exploitable |
| Garage Auto Gonzague | A | logo réel | Non | — (déjà résolu, hors périmètre de ce lot) | — | Aucune (déjà une image réelle) |
| BikeTrip | A | `null` | Oui | **Oui — icône d'application réelle** (`assets/images/icon.png`, 1024×1024) | github.com/Pablo5Berriz/biketrip | **Intégrer** |
| Paroisse Hub | B | `null` | Oui | Non — aucun dépôt public à ce nom | — | Rechercher — aucune source possible |
| Cv Expert | B | `null` | Oui | Non — aucun dépôt public à ce nom | — | Rechercher — aucune source possible |
| Logigest | B | `null` | Oui | Non — repo réel mais README seul, 0 asset | github.com/Pablo5Berriz/logigest | Rechercher — aucun résultat exploitable |
| SLG Tech | B | logo réel | Non | — (déjà résolu) | — | Aucune |
| Bilik Farm | B | logo réel | Non | — (déjà résolu) | — | Aucune |
| ComptaClems | B | logo réel | Non | — (déjà résolu) | — | Aucune |
| Proxmox | B | `null` | Oui | Non accessible depuis cette session (infrastructure personnelle, aucun accès réseau/identifiants) | — | Documenter l'impossibilité (voir §8) |
| Cosmechic | C | logo réel | — | — (déjà résolu) | — | Aucune |
| WeatherWise | C | logo réel | — | — (déjà résolu) | — | Aucune |
| Forum Sportif | C | `null` (pas de mécanisme placeholder en tier historique) | — | Non — repo réel mais README seul, 0 asset (2 commits ; le contenu du dépôt a changé depuis PORTFOLIO-AUDIT-001, qui décrivait un projet C#/ASP.NET avec du code — le dépôt ne contient aujourd'hui plus qu'un README) | github.com/Pablo5Berriz/Forum-Sportif | Rechercher — aucun résultat exploitable |

**6 projets en `imagePlaceholder: true`** au départ (EduQuiz, BikeTrip, Paroisse Hub, Cv Expert, Logigest, Proxmox), plus Forum Sportif sans image en tier historique.

## 3. Sources inspectées

Recherche menée dans l'ordre prescrit (assets du Portfolio → dépôt GitHub réel → dossiers `public/assets/docs/screenshots/images` → README → environnement local → application exécutable), pour chaque projet en priorité A puis B puis C :

- **BikeTrip** : listing complet du dépôt (`app/`, `src/`, `supabase/`, `assets/images/`) déjà obtenu lors du lot 003. Ce lot a inspecté précisément `assets/images/` : 5 fichiers (`adaptive-icon.png`, `favicon.png`, `icon.png`, `notification-icon.png`, `splash-icon.png`) — icônes d'application Expo, pas des captures d'interface. README vérifié : aucune image embarquée.
- **EduQuiz** : structure `apps/web/public/images/subjects/` inspectée — contient 11 icônes SVG de matières scolaires (mathématiques, français, sciences, etc.) destinées au contenu de l'app, pas à son identité visuelle. Aucun dossier `public/` racine avec logo/favicon trouvé dans le contenu accessible. `apps/mobile/` inspecté — aucun dossier `assets/`. README de `apps/web` vérifié — aucune image embarquée.
- **Logigest, garage-auto-gonzague, bilik-farm, comptaclems** : re-vérifiés (root listing) — toujours README seul, 2 commits chacun, aucun changement depuis le lot 003.
- **Forum-Sportif** : re-vérifié — **le contenu du dépôt a changé** depuis PORTFOLIO-AUDIT-001 (qui documentait un projet C#/ASP.NET avec du code réel, `Forum_rufine_et_paul`, 4 commits). Le dépôt ne contient aujourd'hui plus qu'un `README.md`, 2 commits, décrivant le projet en termes génériques. Aucun asset disponible dans l'état actuel.
- **Paroisse Hub, Cv Expert** : aucun dépôt public sous ces noms (confirmé lots précédents, re-confirmé ici) — recherche non applicable.
- **Proxmox** : pas de dépôt de code par nature (infrastructure personnelle). Aucun accès réseau vers un serveur Proxmox privé n'est disponible dans cette session — impossible de capturer un dashboard réel. Aucune tentative de contournement (pas de génération d'image de substitution).

Aucune capture locale (Étape "Captures locales" de la directive) n'a été tentée : aucun des projets candidats n'est présent dans l'environnement de travail actuel pour un lancement non destructif.

## 4. Visuels retenus

**Un seul visuel intégré : BikeTrip.**

- **Provenance** : `https://github.com/Pablo5Berriz/biketrip/blob/main/assets/images/icon.png` — icône officielle de l'application, présente dans le code source réel du projet (pas une capture d'écran de l'interface, mais un asset authentique appartenant au projet, de la même famille que les logos déjà utilisés pour Cosmechic/SLG Tech/Garage Auto Gonzague).
- **Traitement appliqué** : l'icône source est un carré 1024×1024 (fond vert uni `#16A34A`, pictogramme de vélo blanc). Les cartes de projet utilisent un ratio 16:9 ; un recadrage `object-fit: cover` naïf aurait coupé le bas des roues du pictogramme. L'image a donc été recomposée sur un canevas natif 1200×675 (16:9 exact), fond de la même couleur verte extraite du fichier source (extension transparente et sans coupure), icône centrée à taille pleine hauteur — **aucun contenu inventé, aucune interface fabriquée, uniquement un repositionnement du visuel réel sur son propre fond de couleur**. Traitement effectué avec Pillow (Python), installé en local pour cette tâche ponctuelle, **sans aucune modification de `package.json` ni `package-lock.json`** du projet (aucune nouvelle dépendance produit).
- **Format final** : PNG, 1200×675, 62,6 Ko.
- **Fichier** : `public/images/projects/biketrip.png`

## 5. Visuels refusés

| Source envisagée | Projet | Raison du refus |
|---|---|---|
| `apps/web/public/images/subjects/*.svg` | EduQuiz | Icônes de matières scolaires génériques, non représentatives du produit EduQuiz lui-même — les utiliser comme "visuel du projet" aurait été trompeur sur ce qu'elles montrent réellement |
| README des dépôts README-only (logigest, garage-auto-gonzague, bilik-farm, comptaclems, forum-sportif) | Multiples | Aucune image embarquée à extraire ; utiliser la page GitHub elle-même comme visuel est explicitement exclu par la directive |
| Aucune capture générée | EduQuiz, Paroisse Hub, Cv Expert, Logigest, Proxmox, Forum Sportif | Directive explicite : "Aucune fausse capture ne doit être créée" — préféré un placeholder honnête à une reconstruction approximative |

## 6. Fichiers ajoutés

```
A  public/images/projects/biketrip.png   (62,6 Ko, 1200×675, PNG)
```

## 7. Études de cas modifiées

| Fichier | Champ | Avant | Après |
|---|---|---|---|
| `src/content/caseStudies/fr/biketrip.md` | `image` | `null` | `/images/projects/biketrip.png` |
| `src/content/caseStudies/fr/biketrip.md` | `imagePlaceholder` | `true` | `false` |
| `src/content/caseStudies/en/biketrip.md` | `image` | `null` | `/images/projects/biketrip.png` |
| `src/content/caseStudies/en/biketrip.md` | `imagePlaceholder` | `true` | `false` |

Aucune autre étude de cas modifiée. Aucun texte (problème/fonctionnalités/stack/statut) touché — conforme au périmètre interdit.

## 8. Placeholders restants

**5 projets restent en `imagePlaceholder: true` (+ Forum Sportif sans image en tier historique)** :

| Projet | Pourquoi | Preuve manquante | Action future |
|---|---|---|---|
| **EduQuiz** | Dépôt réel et actif (70 commits) mais aucun asset visuel committé représentant le produit (seulement des icônes de contenu non représentatives) | Un logo/icône d'application, ou une capture d'écran des "14 écrans" du site vitrine mentionné dans le README | Demander au propriétaire une capture réelle du site vitrine en production, ou ajouter un `icon.png`/logo au dépôt |
| **Paroisse Hub** | Aucun dépôt public à ce nom | Un dépôt public (même partiel) ou une capture fournie directement par le propriétaire | Créer/publier le dépôt, ou fournir une capture directement |
| **Cv Expert** | Aucun dépôt public à ce nom | Idem | Idem |
| **Logigest** | Dépôt réel mais README seul, 0 asset | Code poussé avec au moins un logo ou une capture | Pousser du code/un asset vers le dépôt existant |
| **Proxmox** | Infrastructure personnelle, aucun accès réseau/identifiants disponibles dans cette session pour capturer le dashboard réel | Une capture du dashboard Proxmox, nettoyée de toute IP/secret/identifiant, fournie directement par le propriétaire | Le propriétaire capture et fournit l'image (cette session ne peut pas y accéder) |
| **Forum Sportif** (tier historique) | Le contenu du dépôt a changé depuis l'audit initial — ne contient plus que README, 0 code, 0 asset | Un dépôt réactivé avec du code/captures | Réévaluer si le dépôt est de nouveau alimenté |

Conformément à la directive : "Un placeholder honnête est préférable à une fausse preuve visuelle" — ces 6 cas restent volontairement non résolus.

## 9. Accessibilité

L'attribut `alt` des images de projet est hérité du mécanisme existant du site (`alt={title}`, défini dans `ProjectCard.astro`/`LegacyProjectCard.astro`, non modifié dans ce lot). Pour la nouvelle image BikeTrip, cela produit `alt="BikeTrip"` — un nom de projet réel et pertinent, pas un texte générique de la liste à éviter (`alt="image"`, `alt="screenshot"`). Aucune modification du composant n'a été nécessaire ni effectuée (le mécanisme s'applique automatiquement à toute nouvelle image, conforme au périmètre interdit "changer le design system").

## 10. Responsive

Vérifié aux 5 largeurs demandées (360, 390, 768, 1280, 1440 px) sur `/fr/projects` et `/en/projects` : **0 débordement horizontal détecté** sur les 10 combinaisons testées. Capture visuelle de la carte BikeTrip rendue (desktop) : image pleine largeur de carte, aucun recadrage visible, aucune déformation — le traitement en §4 a spécifiquement évité le problème de crop qu'aurait causé un `object-fit: cover` naïf sur l'icône carrée d'origine. Rendu vérifié en thème clair et en thème sombre (la carte elle-même ne change pas avec le thème, seul l'arrière-plan de la page change — aucun problème de contraste introduit, voir §12).

## 11. Performance assets

| Métrique | Valeur |
|---|---|
| Taille de `biketrip.png` | 62,6 Ko |
| Taille originale de l'icône source (1024×1024) | 15,7 Ko |
| Taille totale des nouveaux assets ajoutés à `dist/images/projects/` | 62,6 Ko (1 fichier) |
| Taille totale de `dist/images/projects/` après ajout | 568 Ko |
| Taille totale de `dist/` avant ce lot | 1,7 Mo |
| Taille totale de `dist/` après ce lot | 1,8 Mo |

Aucune image ne dépasse 500 Ko (le seuil de signalement de la directive) — la seule image ajoutée pèse 62,6 Ko. Aucun score Lighthouse inventé ; aucun outil de mesure Lighthouse disponible dans cet environnement.

## 12. Tests

| Commande | Résultat |
|---|---|
| `sha256sum package-lock.json` avant/après `npm ci` | Identique (`61b2ef6...`) — lockfile non modifié malgré l'installation locale de Pillow (Python, hors périmètre npm) |
| `npm ci` | PASS |
| `npx astro check` | PASS — 0 erreurs, 0 warnings |
| `npm run build` | PASS — 13 pages, 0 erreur |
| `git diff --check` | Aucune erreur d'espace blanc |
| Runtime Playwright (`/fr/projects`, `/en/projects`) | 0 erreur console, 0 erreur HTTP, **0 image cassée** (vérification `naturalWidth > 0` sur toutes les `<img>`), 0 `href="#"` |
| Responsive (5 largeurs × 2 pages) | 0 débordement |
| `axe-core` (wcag2a/2aa/21aa/22aa), thèmes clair+sombre, 2 pages | **0 violation** sur les 4 combinaisons — aucune nouvelle violation introduite |

## 13. Build

**PASS** — 13 pages générées, aucune erreur, aucun warning.

## 14. Risques restants

- 5 projets (+ Forum Sportif) restent sans visuel réel, documentés en §8 — la crédibilité visuelle du portfolio reste partielle tant que ces sources ne deviennent pas disponibles.
- Le contenu du dépôt Forum-Sportif ayant changé depuis l'audit initial (perte du code C#/ASP.NET précédemment documenté), il serait utile de confirmer avec le propriétaire si ce changement est intentionnel avant tout futur lot touchant ce projet.
- Pillow (Python) a été installé au niveau système pour ce lot ponctuel ; il ne fait partie d'aucune dépendance du projet et n'a aucun effet sur le build ou le runtime du Portfolio, mais ne sera pas nécessairement disponible dans une session future si un traitement d'image similaire est requis à nouveau.

## 15. Verdict

**PASS SOUS RÉSERVES**

Justification de la réserve : le lot respecte intégralement le principe fondamental (aucune fausse capture créée) et tous les critères d'acceptation techniques (build/typecheck/runtime/axe-core/responsive tous PASS, provenance documentée, aucun changement hors périmètre). La réserve porte uniquement sur le résultat de fond, pas sur la qualité d'exécution : **un seul projet sur les 6 priorisés a pu recevoir un visuel réel** (BikeTrip), les 5 autres restant sans preuve visuelle exploitable faute de dépôts contenant du code/assets à ce jour. C'est un résultat honnête et conforme à la directive ("un placeholder honnête est préférable à une fausse preuve visuelle"), mais l'objectif de "réduire les placeholders visuels" n'est que partiellement atteint (1 résolu sur 6).
