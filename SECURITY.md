### Sécurité – Durcissements appliqués et guide de configuration

Ce document résume les mesures de sécurité ajoutées à l’API Express ainsi que les étapes de configuration nécessaires pour un déploiement sûr.

### Mesures implémentées

- **Middleware de sécurité**
  - `helmet()` activé pour ajouter des en-têtes HTTP de protection.
  - `cors` restreint via la variable `ALLOWED_ORIGINS` (liste séparée par virgules).
  - Limitation de la taille de payload: `express.json({ limit: "100kb" })`.
  - `app.set('trust proxy', 1)` pour un déploiement derrière proxy/CDN.

- **Authentification & Sessions (JWT)**
  - Jetons d’accès signés avec `JWT_SECRET` (obligatoire en production).
  - Claims améliorés: `sub` (id ou email), `username`, `iat/exp` gérés par TTL.
  - TTL configurable via `JWT_TTL_SECONDS` (défaut: 15 minutes).
  - Middleware `authMiddleware` pour protéger les routes.

- **Protection contre la force brute**
  - `express-rate-limit` appliqué aux routes `POST /api/auth/register` et `POST /api/auth/login`.

- **Gestion des mots de passe**
  - Hachage avec `argon2id` et secret (poivre) côté serveur.
  - Migration automatique des anciens hachages `bcrypt` vers `argon2` lors du login.

- **Validation et hygiène des entrées**
  - Validation `zod` sur `register`/`login`.
  - Normalisation des emails (trim + lowercase) et politique minimale de mot de passe (longueur min.).

- **Base de données / Prisma**
  - URL de connexion déplacée dans l’environnement via `DATABASE_URL` (suppression des credentials en dur dans le code).

### Variables d’environnement

Ajouter (au minimum) les clés suivantes dans `.env`:

```bash
# JWT
JWT_SECRET=remplace_moi_par_un_secret_long_et_aleatoire
JWT_TTL_SECONDS=900

# CORS (origines autorisées, séparées par des virgules)
ALLOWED_ORIGINS=http://localhost:5173

# Base de données
DATABASE_URL=postgresql://user:password@host:5432/db?schema=public
```

Selon votre configuration de hachage argon2, vous pouvez aussi définir des paramètres (mémoire, temps, parallélisme, longueur, secret/poivre) dans `server/env.ts` et `.env`.

### Installation des dépendances

```bash
pnpm add helmet zod
pnpm add -D @types/helmet
```

### Routes affectées / ajoutées

- `POST /api/auth/register`
  - Rate-limité, validation `zod`, hachage argon2id, retour d’un JWT.
- `POST /api/auth/login`
  - Rate-limité, validation `zod`, vérification du hachage, migration bcrypt→argon2 si nécessaire, retour d’un JWT.

### Recommandations supplémentaires (à considérer)

- Implémenter des tokens de rafraîchissement rotatifs (stockage serveur + révocation).
- Invalider les sessions actives lors d’un changement de mot de passe.
- Activer HSTS au niveau du reverse-proxy (et TLS partout).
- Journaliser les événements sensibles (échecs de login, verrous, changements de mot de passe).
- Mettre en place des politiques de mot de passe plus strictes (longueur 12+, complexité, blacklist HaveIBeenPwned, etc.).
- Ajuster les limites de `rate-limit` et ajouter un verrou progressif par compte/IP si nécessaire.

### Démarrage

1) Renseigner le fichier `.env` (voir ci-dessus).
2) Installer les dépendances de sécurité (`helmet`, `zod`).
3) Lancer le serveur: `pnpm dev`.


