# Changelog - Système d'Authentification et Sécurité

## Modifications apportées

### 🔐 Système d'Authentification

#### Routes d'authentification créées
- **POST `/api/auth/register`** - Inscription utilisateur
- **POST `/api/auth/login`** - Connexion utilisateur
- **GET `/api/protected`** - Route protégée exemple avec JWT

#### Fonctionnalités implémentées
- Validation des données avec **Zod** (email normalisé, mot de passe min 12 caractères)
- Hachage sécurisé avec **Argon2id** + secret (poivre)
- Migration automatique **bcrypt → Argon2** lors de la connexion
- Génération et vérification de **tokens JWT**
- Middleware d'authentification `authMiddleware`

### 🛡️ Sécurité renforcée

#### Middleware de sécurité
- **Helmet** : En-têtes HTTP de sécurité
- **CORS strict** : Whitelist via `ALLOWED_ORIGINS`
- **Rate limiting** : `express-rate-limit` sur les routes auth (20 req/15min)
- **Limite de taille** : `express.json({ limit: "100kb" })`
- **Trust proxy** : Support des reverse-proxies

#### Configuration JWT améliorée
- **JWT_SECRET obligatoire** en production
- **TTL configurable** via `JWT_TTL_SECONDS` (défaut: 15 minutes)
- **Claims améliorés** : `sub`, `username`, `iat`, `exp`
- **Vérification stricte** des tokens

#### Gestion des mots de passe
- **Argon2id** avec paramètres configurables :
  - `MEMORY_COST`: 65536 (64MB)
  - `TIME_COST`: 3 itérations
  - `PARALLELISM`: 1 thread
  - `HASH_LENGTH`: 32 bytes
- **Secret/poivre** pour renforcer le hachage
- **Migration automatique** des anciens hachages bcrypt

### 🗄️ Base de données

#### Corrections Prisma/PostGIS
- **Requêtes brutes** (`$queryRaw`, `$executeRaw`) pour contourner les problèmes PostGIS
- **Schéma corrigé** avec `prisma format` pour résoudre les conflits de relations
- **Variables d'environnement** : `DATABASE_URL` déplacé dans `.env`

#### Modèles utilisés
- Table `users` avec colonnes : `id`, `email`, `password`, `first_name`, `type_id`, `create_at`
- Relations corrigées pour éviter les conflits de noms

### 🎨 Interface utilisateur

#### Pages d'authentification connectées
- **Client Connexion** : `client-signin` → `/api/auth/login`
- **Client Inscription** : `client-signup` → `/api/auth/register`
- **Livreur Inscription** : `livreur-signup` → `/api/auth/register`

#### Fonctionnalités frontend
- **Gestion d'état** : États de chargement, erreurs, succès
- **Validation côté client** : Mot de passe ≥ 12 caractères, confirmation
- **Stockage JWT** : `localStorage` pour la persistance de session
- **Navigation automatique** après authentification réussie

### 🔧 Configuration et environnement

#### Variables d'environnement ajoutées
```bash
# Base de données
DATABASE_URL="postgresql://postgres:neoncraft64@localhost:5432/nile?schema=public"

# JWT
JWT_SECRET="ton_secret_jwt_long_et_aleatoire_ici"
JWT_TTL_SECONDS=900

# CORS
ALLOWED_ORIGINS="http://localhost:5173"

# Argon2
MEMORY_COST=65536
TIME_COST=3
PARALLELISM=1
HASH_LENGTH=32
ARGON2D_SECRET="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
```

#### Dépendances installées
- `helmet` - En-têtes de sécurité HTTP
- `zod` - Validation de schémas
- `@types/helmet` - Types TypeScript pour helmet

### 📊 Monitoring et debugging

#### Middleware de logging
- **Logs détaillés** de toutes les requêtes HTTP
- **Informations affichées** :
  - Timestamp, méthode, URL
  - Adresse IP, User-Agent
  - Headers, Body, Query, Params
  - Temps de réponse, status code
  - Contenu des réponses d'erreur (4xx/5xx)

#### Gestion d'erreurs améliorée
- **Logs d'erreur détaillés** avec `console.error`
- **Messages d'erreur** en développement vs production
- **Stack traces** pour le debugging

### 📁 Fichiers modifiés

#### Nouveaux fichiers
- `server/routes/auth.ts` - Routes d'authentification
- `SECURITY.md` - Documentation de sécurité
- `CHANGELOG.md` - Ce fichier de changements
- `.env` - Variables d'environnement

#### Fichiers modifiés
- `server/index.ts` - Middleware de sécurité et routes
- `server/auth/jwt.ts` - Configuration JWT améliorée
- `server/auth/migrate.ts` - Migration bcrypt → Argon2
- `server/auth/hash.ts` - Configuration Argon2
- `server/env.ts` - Variables d'environnement avec valeurs par défaut
- `client/pages/Auth.tsx` - Interface d'authentification connectée
- `prisma/schema.prisma` - Schéma corrigé pour PostGIS

### 🚀 Commandes de déploiement

#### Installation des dépendances
```bash
pnpm add helmet zod
pnpm add -D @types/helmet
```

#### Configuration de la base de données
```bash
pnpm prisma generate
pnpm prisma format
```

#### Démarrage du serveur
```bash
pnpm dev
```

### ⚠️ Points d'attention

#### Sécurité en production
- **JWT_SECRET** doit être changé et gardé secret
- **ARGON2D_SECRET** ne doit jamais être exposé
- **ALLOWED_ORIGINS** doit être configuré avec les domaines de production
- **HTTPS** recommandé pour la production

#### Performance
- **Argon2** peut être coûteux en CPU selon les paramètres
- **Rate limiting** peut être ajusté selon les besoins
- **Logs détaillés** peuvent impacter les performances en production

#### Base de données
- **PostGIS** nécessite des requêtes brutes pour les types géographiques
- **Migrations** peuvent être nécessaires pour les changements de schéma
- **Backup** recommandé avant les modifications importantes

---

*Dernière mise à jour : 20 octobre 2025*
