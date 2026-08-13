# PORTFOLIO-RELEASE-012

## 1. Baseline

- `origin/main` avant fusion : `0deae983f7d35bf98495c6ce6d65bdc1a1fbb01a` — confirmé identique à la baseline PM
- `origin/release/portfolio-prod-010` : `1873e81669489e55a5c5c03d091d12f126ca2cdb` — confirmé identique à la release candidate PM
- PR #3 revérifiée avant fusion : `state: open`, `mergeable_state: clean`, `head.sha` inchangé (`1873e81`) — aucune divergence

## 2. PR #3 avant fusion

- CI reconfirmée sur le HEAD exact `1873e81` : check `Check, test, build` (workflow `Quality`) → `completed` / `success`
- Aucun nouveau commit ajouté avant fusion
- 3 checks Netlify (`Redirect rules`, `Header rules`, `Pages changed` — site `paul-quentin-porfolio`) : `completed` / `neutral` (informationnels, non bloquants)

## 3. Méthode de fusion

`git merge --ff-only` : `main` local était exactement au point de divergence de `release/portfolio-prod-010` (`0deae98`), donc un fast-forward pur a été possible — les 5 commits atomiques de la branche sont préservés intégralement, **aucun commit de fusion synthétique**, aucun `force push`, aucun rebase destructif. `git push origin main` a fait avancer `main` de `0deae98` à `1873e81`.

GitHub a automatiquement détecté la PR #3 comme fusionnée (`merged: true`, `merged_at` renseigné) dès réception du push — aucune recréation de PR n'a été nécessaire.

## 4. Main final

```
1873e81 docs(portfolio): add PORTFOLIO-PROD-010 report
87bd03e fix(portfolio): resolve heading order and link text a11y/SEO issues
4e4ce2a fix(portfolio): add accessible bilingual 404 page
26b8091 fix(portfolio): harden production configuration
cb3e9a4 chore(portfolio): remediate vulnerable dependencies
0deae98 docs(portfolio): add PORTFOLIO-INTEGRATE-009 report
c18d98f docs(portfolio): reverify project evidence after repository updates
246cea8 content(portfolio): sync project case studies with verified repositories
```

`origin/main` = `1873e81669489e55a5c5c03d091d12f126ca2cdb`

## 5. CI main

- **Workflow** : `Quality`
- **Run ID** : `31745216317` (run #7)
- **Commit testé** : `1873e81669489e55a5c5c03d091d12f126ca2cdb` (HEAD exact de `main` après fusion)
- **Événement** : `push`
- **Statut** : `completed` — **conclusion : `success`**

## 6. Netlify

Preuves rassemblées avec les outils disponibles (API GitHub — aucun outil/API Netlify direct n'est connecté à cette session) :

- Les checks observés sur les commits de ce dépôt (PR #2, PR #3, et les pushs directs vers `main`) portent systématiquement le nom de site **`paul-quentin-porfolio`**, avec des URLs de détail pointant vers `app.netlify.com/projects/paul-quentin-porfolio/deploys/...`
- Le fait que ces checks apparaissent sur les commits de **ce dépôt précis** (`Pablo5Berriz/Portfolio`) est en soi la preuve que le site Netlify `paul-quentin-porfolio` est relié à ce dépôt — un site Netlify non connecté ne poste pas de check sur les commits d'un dépôt GitHub
- Orthographe du nom de site (`porfolio`, sans le second `t`) conservée telle quelle, non « corrigée », conformément à la directive

**Ce qui n'a pas pu être vérifié directement** (aucun accès au tableau de bord ou à l'API Netlify depuis cette session) : la commande de build exacte configurée côté Netlify, le répertoire de publication exact configuré côté Netlify, la version de Node configurée côté Netlify, et l'état du tout dernier déploiement (succès/échec) au sens propre de Netlify. Ces valeurs ne sont pas devinées ni affirmées comme confirmées — voir sections 8–9.

## 7. Site Netlify identifié

**`paul-quentin-porfolio`** — nom confirmé par observation directe et répétée dans les checks GitHub sur plusieurs commits de ce dépôt, sur plusieurs lots (QA-006, PROD-010).

## 8. Production branch

**Non confirmée directement** (pas d'accès au tableau de bord Netlify). Élément indirect : les checks Netlify apparaissent systématiquement sur les commits poussés vers `main` (aussi bien via fusion de PR que push direct), ce qui est cohérent avec `main` configurée comme branche de production — mais ceci reste une inférence, pas une lecture directe de la configuration Netlify.

## 9. Build settings

**Non confirmés directement** (pas d'accès au tableau de bord/API Netlify, aucun `netlify.toml` dans le dépôt pour les fixer explicitement). Ce que le dépôt permet d'établir avec certitude, sans supposer la configuration Netlify elle-même :
- `package.json` → script `build` = `astro build`, ce qui correspond à `npm run build`
- Sortie de build Astro (`output: "static"` dans `astro.config.mjs`) = répertoire `dist/` par défaut, non redéfini
- `package.json` → `engines.node` = `>=22.12.0`

Ces valeurs sont **cohérentes avec la cible attendue** (`npm run build` / `dist` / Node 22) mais elles décrivent ce que le dépôt produit, pas une lecture confirmée de ce que Netlify exécute réellement — la détection zéro-config d'Astro par Netlify applique normalement ces mêmes valeurs par défaut en l'absence de `netlify.toml`, ce qui est cohérent, sans être une preuve directe.

## 10. Staging URL

**`paul-quentin-porfolio.netlify.app`** — sous-domaine par défaut du site Netlify. Résolution DNS réelle confirmée (requête directe à `8.8.8.8`/`1.1.1.1`, indépendante du proxy HTTP de cette session) :

| Type | Valeurs |
|---|---|
| A | `98.84.224.111`, `18.208.88.157` |
| AAAA | `2600:1f18:16e:df01::259`, `2600:1f18:16e:df01::258` |

Ces adresses correspondent à de l'infrastructure Netlify réelle. **Traité comme environnement de staging/validation, pas comme domaine officiel** — non substitué à `paulquentinondoa.dev` dans le code, conformément à la directive.

Un `curl -I` direct vers ce sous-domaine reste bloqué par le proxy réseau de cette session (`CONNECT tunnel failed, response 403`, déjà documenté en RELEASE-011) — la résolution DNS est confirmée réelle, mais le contenu HTTP réellement servi n'a pas pu être inspecté depuis cet environnement.

## 11. Domaine cible

`paulquentinondoa.dev` — confirmé par le PM comme cible officielle (contexte de cette directive). Conservé tel quel dans `astro.config.mjs`, `public/robots.txt`, et dans tout le SEO généré (canonical, hreflang, OG, JSON-LD) — **aucune modification apportée** (interdiction explicite de ce lot).

Statut DNS inchangé depuis RELEASE-011 : non ré-interrogé dans ce lot (la directive ne le demande pas ; le lot précédent l'a déjà établi comme `DOMAIN UNRESOLVED`, aucune action d'enregistrement de domaine n'étant du ressort de ce lot).

## 12. DOMAIN ACTION REQUIRED

```
Domaine à enregistrer :
paulquentinondoa.dev

Action propriétaire :
acheter/enregistrer le domaine auprès d'un registrar

Action suivante :
raccorder le domaine à Netlify (site "paul-quentin-porfolio")
```

## 13. DNS future procedure

Procédure de principe uniquement — **aucun enregistrement DNS créé dans ce lot**, aucune adresse IP ni valeur CNAME préinventée :

1. Une fois `paulquentinondoa.dev` enregistré auprès d'un registrar, ouvrir le tableau de bord Netlify du site `paul-quentin-porfolio`
2. Ajouter `paulquentinondoa.dev` (et `www.paulquentinondoa.dev` si souhaité) comme domaine personnalisé du site
3. Netlify fournira alors les valeurs DNS réelles à utiliser à ce moment précis (généralement soit des enregistrements `A`/`AAAA` vers l'infrastructure Netlify, soit un `CNAME` vers `apex-loadbalancer.netlify.com` ou équivalent, soit la délégation des NS vers Netlify DNS si cette option est choisie — la méthode exacte dépend du choix fait dans le tableau de bord au moment de l'ajout, non prédictible à l'avance)
4. Configurer ces enregistrements chez le registrar (ou déléguer les NS à Netlify, selon l'option choisie à l'étape 3)
5. Attendre la propagation DNS et l'émission automatique du certificat HTTPS par Netlify (Let's Encrypt, automatique une fois le domaine validé)
6. Revérifier avec `dig`/résolution DNS que `paulquentinondoa.dev` pointe bien vers Netlify, puis avec `curl -I https://paulquentinondoa.dev` que le site répond correctement en HTTPS
7. Alors seulement : activer HSTS (section 14) et considérer la production comme officiellement ouverte

## 14. HSTS

**Non activé**, conformément à la directive — le domaine n'est pas encore enregistré, le DNS n'est pas configuré, aucun certificat HTTPS n'est actif sur `paulquentinondoa.dev`. Aucune des trois conditions requises n'est remplie.

## 15. EmailJS

Aucune nouvelle tentative réseau depuis cet environnement (le proxy reste bloquant pour tout domaine externe, déjà démontré en RELEASE-011 pour `api.emailjs.com` et pour `paul-quentin-porfolio.netlify.app`).

Le test réel devra être effectué :
- **depuis un navigateur normal, avec un accès réseau non restreint**
- **sur le sous-domaine Netlify (`paul-quentin-porfolio.netlify.app`) dès maintenant possible**, ou sur le domaine final une fois raccordé
- en soumettant le formulaire de contact avec un contenu explicitement marqué, en vérifiant la réception du message, le retour visuel de succès dans l'UI, l'absence d'erreur console, et — si accessible — la restriction de domaine/les quotas dans le tableau de bord EmailJS

## 16. npm run qa

Exécuté sur le nouveau `main` (`1873e81`) après fusion :
- `npm ci` : succès
- `npm run qa` (check + test + build + routes) : **PASS**
- `git diff --check` : **PASS** (aucun problème d'espace blanc)
- `git status --short` : working tree clean

## 17. État release

- Code fusionné dans `main` : ✓
- CI verte sur le HEAD final de `main` : ✓
- Hébergement Netlify confirmé (site relié au dépôt, sous-domaine par défaut résolvant vers une infrastructure Netlify réelle) : ✓
- Aucun blocage applicatif : ✓ (QA, build, a11y, responsive déjà validés en PROD-010 ; aucune régression introduite par ce lot, qui n'a touché aucun fichier produit)
- Seul manque : le domaine personnalisé `paulquentinondoa.dev`, non enregistré

## 18. Prochaines actions propriétaire

1. Enregistrer `paulquentinondoa.dev` auprès d'un registrar
2. Raccorder ce domaine au site Netlify `paul-quentin-porfolio` (tableau de bord Netlify → Domain settings)
3. Configurer les enregistrements DNS fournis par Netlify au moment du raccordement (section 13)
4. Attendre la propagation DNS et l'émission du certificat HTTPS
5. Effectuer un test réel du formulaire de contact EmailJS (section 15) — possible dès maintenant sur `paul-quentin-porfolio.netlify.app`, sans attendre le domaine
6. Une fois domaine + HTTPS confirmés : demander l'ajout de `Strict-Transport-Security` (lot dédié, minimal, conformément à la directive)
7. Déclarer officiellement la production ouverte

## 19. Verdict

**READY FOR DOMAIN SETUP**

Code fusionné, CI verte, hébergement Netlify confirmé par deux preuves indépendantes (checks GitHub + résolution DNS réelle du sous-domaine par défaut), aucun blocage applicatif. Il ne manque plus que l'enregistrement du domaine personnalisé et son raccordement — actions qui relèvent du propriétaire, pas d'une correction technique supplémentaire.
