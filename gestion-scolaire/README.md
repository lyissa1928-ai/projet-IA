# Gestion Scolaire

Système de gestion scolaire — développement et déploiement sous Apache2.

## Structure

```
gestion-scolaire/
├── apps/
│   ├── api/          # Backend NestJS + Prisma
│   └── web/          # Frontend Next.js
├── deploy/
│   └── apache2/      # Configuration Apache2
├── docker-compose.yml
└── package.json
```

## Développement

```bash
# Démarrer la base de données
pnpm db:up

# Créer le fichier .env dans apps/api
# DATABASE_URL="postgresql://scolarite:scolarite@localhost:5432/gestion_scolaire"

# Migrations
pnpm db:migrate
pnpm db:seed

# Lancer le projet
pnpm dev
```

- Frontend : http://localhost:3000
- API : http://localhost:3001/api/v1

## Déploiement Apache2

Voir [deploy/apache2/README.md](deploy/apache2/README.md) pour les instructions complètes.
