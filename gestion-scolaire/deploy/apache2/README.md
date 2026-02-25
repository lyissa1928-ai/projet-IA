# Déploiement sous Apache2

## Prérequis

- Ubuntu/Debian avec Apache2
- Node.js 20+
- PostgreSQL
- pnpm

## 1. Activer les modules Apache

```bash
sudo a2enmod proxy proxy_http headers
sudo systemctl restart apache2
```

## 2. Build de l'application

```bash
# Depuis la racine du projet
cd gestion-scolaire

# Installer les dépendances
pnpm install

# Build pour production (mode standalone pour Next.js)
APACHE_DEPLOY=1 pnpm build

# Migrations base de données
pnpm db:migrate
pnpm db:seed
```

## 3. Lancer les services (PM2 recommandé)

```bash
# Installer PM2
npm install -g pm2

# Démarrer l'API
cd apps/api && pnpm start:prod
# Ou avec PM2 : pm2 start dist/main.js --name "gestion-api"

# Démarrer le frontend
cd apps/web && pnpm start
# Ou avec PM2 : pm2 start node_modules/next/dist/bin/next -- start --name "gestion-web"
```

## 4. Configuration Apache

```bash
# Copier la config
sudo cp deploy/apache2/gestion-scolaire.conf /etc/apache2/sites-available/

# Activer le site
sudo a2ensite gestion-scolaire

# Tester la config
sudo apache2ctl configtest

# Recharger Apache
sudo systemctl reload apache2
```

## 5. Variables d'environnement

Créer `.env` dans `apps/api` :

```
DATABASE_URL="postgresql://scolarite:scolarite@localhost:5432/gestion_scolaire"
PORT=3001
```

Créer `.env.local` dans `apps/web` :

```
NEXT_PUBLIC_API_URL=http://votredomaine.com/api/v1
```

## 6. HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d votredomaine.com
```
