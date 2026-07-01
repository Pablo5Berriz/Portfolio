# Portfolio — Paul Quentin Ondoa

Portfolio professionnel bilingue (FR/EN), refondu sur Astro. Contenu et
projets présentés comme études de cas (problème → solution → stack →
résultat), avec un système de design partagé et zéro duplication de
header/nav/footer entre pages.

## Stack

- [Astro](https://astro.build) (SSG, sortie 100% statique)
- i18n natif Astro (`/fr/...`, `/en/...`), sans framework JS lourd côté client
- [astro-icon](https://www.astroicon.dev/) + `@iconify-json/simple-icons` et `@iconify-json/lucide` (icônes tree-shaken, pas de Font Awesome CDN)
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) pour `sitemap-index.xml`
- [@emailjs/browser](https://www.emailjs.com/) chargé en dépendance npm (pas de CDN), utilisé uniquement sur la page Contact
- Content collections Astro (`src/content.config.ts`) pour les projets et expériences, en fichiers Markdown séparés par langue

## Structure du projet

```
src/
  components/          Header, Footer, ProjectCard, LegacyProjectCard...
  components/views/     Un composant "vue" par page (HomeView, AboutView, ...),
                         partagé entre /fr et /en pour éviter toute duplication de markup
  content/
    caseStudies/{fr,en}/   Projets récents (études de cas détaillées)
    legacyProjects/{fr,en}/ Projets antérieurs (timeline condensée)
    experiences/{fr,en}/    Expériences professionnelles
  content.config.ts     Schémas Zod des collections ci-dessus
  i18n/
    ui.ts                Chaînes d'interface (nav, boutons, formulaire...)
    content/             Contenu long (hero, bio, intitulés de compétences...)
    utils.ts             Helpers de routage i18n (localizePath, swapLocale...)
  layouts/BaseLayout.astro   SEO, OG, hreflang, Schema.org, thème clair/sombre
  pages/
    index.astro          Redirection racine vers /fr ou /en (préférence stockée > langue navigateur)
    fr/, en/              Pages fines qui instancient chaque vue avec locale={"fr"|"en"}
  styles/global.css      Design tokens (couleurs, typographie, espacement) + primitives
public/
  images/                Assets réels (profils, projets, éducation, expériences)
  cv/CV_Paul_Quentin.pdf
  robots.txt, favicon.svg
```

## Développement

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # sortie statique dans dist/
npm run preview   # sert dist/ localement pour vérification finale
```

## Déploiement (Proxmox + Traefik)

Le site est 100% statique après `npm run build` (dossier `dist/`). Le plus
simple avec votre infra existante :

1. Build : `npm run build` (idéalement dans une CI/pipeline, ou en local avant déploiement).
2. Servir `dist/` avec un conteneur Nginx ou Caddy minimal sur votre Proxmox.
3. Exposer ce conteneur via Traefik (labels de routage habituels, TLS via votre
   resolver Let's Encrypt existant).
4. Aucune variable d'environnement serveur n'est requise : le seul appel réseau
   côté client est vers l'API EmailJS depuis la page `/contact`.

**Avant de déployer**, mettre à jour `SITE_URL` dans `astro.config.mjs`
(actuellement un placeholder `https://paulquentinondoa.dev`) avec le domaine
réel — il est utilisé pour les URLs canoniques, `hreflang`, Open Graph et le
sitemap.

## i18n

- Routage par préfixe (`/fr/...`, `/en/...`), français par défaut.
- La préférence de langue est mémorisée dans `localStorage` (`preferred-locale`)
  à chaque visite de page, et relue par la page racine `/` pour rediriger un
  visiteur revenant sur le bon lexique sans repasser par la langue du navigateur.
- Toutes les chaînes sont externalisées : `src/i18n/ui.ts` (interface) et
  `src/i18n/content/*.ts` (contenu éditorial). Aucun texte n'est en dur dans les
  templates `.astro`.

## Contenu des projets

- **Études de cas récentes** (`src/content/caseStudies/`) : projets en avant
  avec description problème/solution/stack. Plusieurs utilisent un bloc
  "capture à venir" (`imagePlaceholder: true`) en attente de vraies captures
  d'écran — voir la liste des actions manuelles ci-dessous.
- **Projets antérieurs** (`src/content/legacyProjects/`) : SLG Tech, Bilik
  Farm, WeatherWise, Cosmechic — gardés en format condensé comme jalons de
  progression, pas comme reflet du niveau actuel.
- Un projet sans lien GitHub public vérifié n'affiche jamais de bouton "Voir
  le dépôt" — jamais de lien mort ou de `href="#"`.

## Sécurité — actions manuelles restantes (à faire par vous)

Ces actions ne peuvent pas être effectuées depuis le code :

1. **Restreindre la clé publique EmailJS par domaine** dans le dashboard
   EmailJS (Account → Security → Allowed origins), pour que la clé exposée
   côté client (`iP6iXrt0fsKUx7RP0`) ne fonctionne que depuis votre domaine
   de production.
2. **Fournir les captures d'écran manquantes** pour les projets récents
   (Garage Auto Gonzague, Affichage TV atelier, Business plan Garage
   Saint-Louis, Logigest, EduQuiz, Streamr & Aura) — actuellement en
   placeholder "capture à venir".
3. **DNS et hébergement** : pointer le domaine réel vers le conteneur
   Nginx/Caddy derrière Traefik, puis mettre à jour `SITE_URL` dans
   `astro.config.mjs`.
4. **Valider le texte final** (bio, descriptions de projets, statuts
   "en production"/"en cours") avant publication — plusieurs affirmations
   factuelles (statuts de projets notamment) sont des hypothèses à confirmer.
5. Remplacer le favicon placeholder (initiales "PQ" générées en SVG) par un
   logo réel si souhaité.

## QA effectué

- `npm run build` : succès, 13 pages générées, aucune erreur.
- Test Playwright automatisé sur les 12 pages (6 FR + 6 EN) : aucune erreur
  console, aucune requête HTTP en échec.
- Menu hamburger : `aria-expanded` bascule correctement, `Escape` referme le
  menu.
- Formulaire de contact : champ fichier supprimé, honeypot invisible et hors
  tabulation, case de consentement `required`.
- Vérification manuelle : aucun `href="#"` ni lien mort dans la sortie buildée.
