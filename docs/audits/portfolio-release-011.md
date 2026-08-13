# PORTFOLIO-RELEASE-011

## 1. Baseline

- `origin/main` : `0deae983f7d35bf98495c6ce6d65bdc1a1fbb01a` — confirmé identique à la baseline PM
- `origin/release/portfolio-prod-010` : `1873e81669489e55a5c5c03d091d12f126ca2cdb` — confirmé identique à la release candidate PM
- Aucune divergence détectée sur l'un ou l'autre au `git fetch origin`
- PR #3 revérifiée : `state: open`, `merged: false`, `mergeable_state: clean`, `head.sha` inchangé (`1873e81`), `base.sha` inchangé (`0deae98`)
- Branche de travail créée depuis `origin/main` : `release/portfolio-release-011` (documentaire uniquement, aucun changement fonctionnel)

## 2. Domaine

Testé : `paulquentinondoa.dev` et `www.paulquentinondoa.dev`.

`nslookup`/`dig` ne sont pas installés dans cet environnement ; contournement via `dnspython` interrogeant directement `8.8.8.8` et `1.1.1.1` (requêtes DNS brutes, indépendantes du proxy HTTP du bac à sable — voir section 8 pour la distinction importante entre les deux).

| Domaine | A | AAAA | CNAME | NS |
|---|---|---|---|---|
| `paulquentinondoa.dev` | NXDOMAIN | NXDOMAIN | NXDOMAIN | NXDOMAIN |
| `www.paulquentinondoa.dev` | NXDOMAIN | NXDOMAIN | NXDOMAIN | NXDOMAIN |

Vérification de contrôle : la zone `.dev` elle-même résout normalement (`NS dev.` renvoie les serveurs de la Charleston Road Registry, l'opérateur du TLD `.dev`) — ce n'est donc pas un problème de résolution générale, ni un souci propre à cet environnement : le nom `paulquentinondoa.dev` **n'est pas délégué du tout au niveau du registre**, il n'existe même pas de NS pour ce nom. Cela indique un domaine **jamais enregistré** (ou dont l'enregistrement a expiré sans laisser de délégation), pas simplement « enregistré mais mal configuré ».

**Classification : `DOMAIN UNRESOLVED`**

Ce n'est pas classé `DOMAIN POINTS TO WRONG HOST` (le domaine ne pointe nulle part, il n'existe simplement pas dans le DNS public) ni `DOMAIN CONFIRMED`. Conformément à la directive, **aucune valeur de domaine n'a été modifiée ni remplacée par supposition** dans le code.

## 3. DNS

Voir section 2 pour le détail complet. Complément : pour établir si l'hébergement lui-même est réel indépendamment du domaine personnalisé, le sous-domaine Netlify par défaut du site a été testé :

| Nom | A | AAAA |
|---|---|---|
| `paul-quentin-porfolio.netlify.app` | `98.84.224.111`, `18.208.88.157` | `2600:1f18:16e:df01::259`, `2600:1f18:16e:df01::258` |

Ces adresses résolvent vers de vraies infrastructures Netlify. **Ceci confirme que l'hébergement Netlify est réel et fonctionnel**, indépendamment du fait que le domaine personnalisé `paulquentinondoa.dev` n'ait jamais été enregistré/pointé.

## 4. Hébergement

Preuves rassemblées (au moins deux sources indépendantes, conformément à la directive) :

1. **Checks GitHub sur les PR** (déjà documentés en PROD-010) : `Redirect rules`, `Header rules`, `Pages changed` — tous nommés `paul-quentin-porfolio`, avec `details_url` pointant vers `app.netlify.com/projects/paul-quentin-porfolio/...`
2. **Résolution DNS réelle du sous-domaine Netlify par défaut** (section 3) — preuve indépendante des checks de PR, confirmant que le site est effectivement déployé sur l'infrastructure Netlify, pas seulement que l'intégration GitHub existe

Absence d'indices pour d'autres hébergeurs : aucun `vercel.json`, aucun `wrangler.toml`, aucun fichier `CNAME` (GitHub Pages), aucun workflow `.github/workflows/` de déploiement (seul `quality.yml`, un gate de qualité, existe).

**Conclusion : hébergement = Netlify, confirmé par deux preuves indépendantes** (checks de PR + résolution DNS réelle du sous-domaine par défaut). Le domaine personnalisé n'est en revanche pas configuré (section 2).

## 5. Fusion PR #3

**Non effectuée.**

L'étape 5 de la directive autorise la fusion uniquement si : CI PR #3 = PASS **et** domaine confirmé ou clairement prêt à être configuré **et** hébergement confirmé.

- CI PR #3 : PASS (confirmé, section 1)
- Hébergement : confirmé (section 4)
- **Domaine : `DOMAIN UNRESOLVED`, ni confirmé ni démontrablement « prêt à être configuré »** — rien dans le dépôt ni dans l'environnement ne permet de savoir si le domaine a été acheté et est en attente de configuration DNS, ou s'il n'a simplement jamais été acquis

La condition de fusion n'est donc pas remplie. Conformément à la règle de gouvernance de ce projet (arrêter, signaler, attendre la décision PM en cas de blocage — ne jamais prendre d'autorisation implicite), **la fusion n'a pas été effectuée**.

## 6. Main final

Inchangé : `0deae983f7d35bf98495c6ce6d65bdc1a1fbb01a` (aucune fusion effectuée, voir section 5).

## 7. CI

CI de la PR #3 déjà vérifiée verte sur son HEAD exact (`1873e81`, run `31744145381`, conclusion `success`) — reconfirmée à l'identique au début de ce lot (section 1), aucun changement.

## 8. Déploiement

**Non déclenché par ce lot** (aucune fusion, aucun mécanisme de déploiement créé ou modifié, conformément à la directive).

Limite d'environnement importante à documenter : le proxy réseau HTTPS de cette session (`CONNECT` via proxy local) bloque tout domaine externe non explicitement autorisé, avec un code `403`. Cette restriction est **indépendante de la résolution DNS** (qui passe par des requêtes UDP/TCP directes sur le port 53 vers `8.8.8.8`/`1.1.1.1`, non filtrées par ce proxy). Concrètement :
- La résolution DNS fonctionne et donne des résultats réels et fiables (sections 2–3)
- **Aucun `curl`/fetch HTTPS n'est possible vers un domaine externe arbitraire** depuis cet environnement — testé et confirmé pour `paulquentinondoa.dev` (403, sans rapport avec le NXDOMAIN puisque le tunnel échoue avant même la résolution) et pour `paul-quentin-porfolio.netlify.app` (403 également, alors que ce domaine résout parfaitement)

**Conséquence directe** : les étapes 9 (recette production), 10 (headers production), 11 (EmailJS réel), 14 (Lighthouse production) de la directive sont **techniquement impossibles à exécuter depuis cet environnement**, quel que soit l'état du domaine ou de l'hébergement. Ce n'est pas un choix, c'est une limite d'outillage — documentée ici plutôt que contournée par des résultats inventés.

## 9. HTTPS

Non vérifiable depuis cet environnement (section 8). Aucune affirmation n'est faite sur l'état HTTPS réel de production.

## 10. Headers

Non vérifiable depuis cet environnement (section 8) — aucun `curl -I` vers un domaine de production réel n'a pu être exécuté. Les en-têtes proposés dans `public/_headers` (PR #3) restent une **proposition non déployée et non vérifiée en conditions réelles**, exactement comme documenté dans le rapport PROD-010 ; ce lot n'ajoute aucune preuve nouvelle sur ce point faute d'accès réseau.

## 11. HSTS

**Non ajouté.** Conditions requises par la directive (HTTPS confirmé, domaine final confirmé, hébergement final confirmé) non toutes réunies : le domaine reste `DOMAIN UNRESOLVED` (section 2) et HTTPS n'est pas vérifiable (section 9).

## 12. Runtime production

Non exécutable (section 8). Le runtime a déjà été validé de façon exhaustive en environnement de prévisualisation locale lors du lot PROD-010 (7 routes, 0 erreur console, 0 lien cassé) — cette preuve reste valide pour le code lui-même, mais ne remplace pas une recette sur le domaine de production réel, qui n'existe pas encore (section 2).

## 13. EmailJS

Aucun nouveau test tenté dans ce lot au-delà de ce qui est déjà documenté en PROD-010 (tentative d'envoi contrôlé vers `api.emailjs.com`, bloquée par le même proxy réseau — `EMAIL DELIVERY NOT VERIFIED`). Un test EmailJS "depuis la production" est par construction impossible tant que (a) le domaine n'existe pas et (b) cet environnement ne peut de toute façon pas atteindre `api.emailjs.com` (section 8).

**Ce test doit être effectué manuellement par le PM depuis un navigateur avec accès réseau normal**, une fois le site accessible sur un domaine réel — conformément à ce que le PM a lui-même déjà validé dans sa revue précédente.

## 14. SEO production

Non vérifiable en conditions réelles (section 8). Le code du dépôt reste cohérent en interne (canonical/OG/JSON-LD/sitemap/robots pointent tous vers `https://paulquentinondoa.dev`, de façon uniforme — voir PROD-010 section 6) ; aucune incohérence introduite. Mais tant que ce domaine n'existe pas dans le DNS public, ce point ne peut pas être vérifié « en production » au sens propre.

## 15. Lighthouse production

Non exécutable (section 8 — aucun accès réseau à un domaine de production réel). Les scores Lighthouse réels obtenus en environnement de prévisualisation locale restent ceux déjà rapportés en PROD-010 (Performance 97–100, Accessibility/Best Practices/SEO 100 sur les 4 routes testées) ; aucun score de production n'a été inventé pour combler cette absence.

## 16. Risques acceptés

- Les 3 vulnérabilités `npm audit` restantes (chaîne `astro-icon` → `@iconify/tools`, build-time uniquement) — reconduites depuis PROD-010, aucun changement
- Rate limiting du formulaire de contact côté client uniquement — **ACCEPTED FOR V1** : conformément à l'étape 12 de la directive, EmailJS (quotas + restriction de domaine potentielle) + honeypot + consentement sont jugés suffisants pour le niveau de risque d'un portfolio personnel statique. Si un abus réel est observé après mise en ligne, un backend/rate-limit serveur pourra faire l'objet d'un lot séparé
- Absence de vérification HTTPS/headers/EmailJS/Lighthouse en conditions de production réelles — risque non accepté mais **non résolu par ce lot**, faute d'accès réseau ; reste une tâche pour le PM ou un environnement disposant d'un accès réseau non restreint

## 17. Incidents

Aucun incident. Le lot s'est arrêté proprement avant la fusion, conformément aux conditions explicites de la directive (domaine non confirmé) et à la limite d'environnement découverte et documentée (section 8), sans qu'aucune action irréversible n'ait été tentée.

## 18. Release verdict

**NO-GO PRODUCTION**

Non pas parce qu'un défaut technique a été trouvé dans le code (aucun — QA, CI, a11y, responsive restent au vert, cf. PROD-010), mais parce que **la condition préalable au go-live n'est pas remplie** : le domaine `paulquentinondoa.dev` n'est pas enregistré (`DOMAIN UNRESOLVED`), et cet environnement ne dispose d'aucun moyen de conduire la recette de production (HTTPS, headers, EmailJS, Lighthouse) exigée par la directive avant tout GO. La PR #3 reste ouverte, verte, non fusionnée, prête à être fusionnée dès que le domaine sera confirmé — mais la fusion elle-même n'a pas été déclenchée dans ce lot, faute de remplir la condition de l'étape 5.
