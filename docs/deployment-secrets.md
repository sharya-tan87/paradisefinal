# GitHub Actions Deployment Secrets Setup

## Required Secrets

Configure these secrets in your GitHub repository:
**Settings > Secrets and variables > Actions > New repository secret**

### SSH Configuration

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SSH_HOST` | Hostinger server hostname | `123.456.789.0` or `server123.hostinger.com` |
| `SSH_USER` | SSH username | `u123456789` |
| `SSH_PRIVATE_KEY` | SSH private key (full content) | See below |

### Application URLs

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `PRODUCTION_URL` | Production website URL | `https://paradisedental.com` |
| `PRODUCTION_API_URL` | API base URL for frontend | `https://paradisedental.com/api` |

## SSH Key Setup

### 1. Generate SSH Key Pair (on your local machine)

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/hostinger_deploy
```

### 2. Add Public Key to Hostinger

1. Log into Hostinger control panel
2. Go to **Advanced > SSH Access**
3. Enable SSH access
4. Add the contents of `~/.ssh/hostinger_deploy.pub` to authorized keys

### 3. Add Private Key to GitHub

1. Copy the entire contents of `~/.ssh/hostinger_deploy`
2. Add as `SSH_PRIVATE_KEY` secret in GitHub

```bash
cat ~/.ssh/hostinger_deploy
# Copy everything including:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ... key content ...
# -----END OPENSSH PRIVATE KEY-----
```

## Environment Configuration

### Create Environment: "production"

1. Go to **Settings > Environments**
2. Click **New environment**
3. Name it `production`
4. Add protection rules (optional):
   - Required reviewers
   - Wait timer
   - Deployment branches: `main` only

## Hostinger Server Setup

### 1. Create Backend Directory

```bash
mkdir -p ~/backend
mkdir -p ~/backend/logs
mkdir -p ~/backend/uploads
```

### 2. Create Production .env File

```bash
nano ~/backend/.env
```

Add production environment variables:

```env
NODE_ENV=production
PORT=3000

# Database (Hostinger MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_secure_password

# JWT Secrets (generate with: openssl rand -hex 32)
JWT_SECRET=your-production-jwt-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Encryption Key for PHI
ENCRYPTION_KEY=your-64-char-hex-key

# Email (production SMTP)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@paradisedental.com
SMTP_PASS=your-email-password
EMAIL_FROM="Paradise Dental <noreply@paradisedental.com>"

# URLs
ADMIN_URL=https://paradisedental.com
FRONTEND_URL=https://paradisedental.com

# Business Config
CLINIC_NAME=Paradise Dental Clinic
CLINIC_EMAIL=contact@paradisedental.com
```

### 3. Install PM2 for Process Management

```bash
npm install -g pm2

# Start the application
cd ~/backend
pm2 start server.js --name paradise-dental

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 4. Configure Node.js App in Hostinger

If using Hostinger's Node.js App Manager:
1. Go to **Advanced > Node.js**
2. Create new application:
   - Node.js version: 20
   - Application root: `/backend`
   - Application startup file: `server.js`
   - Environment: Production

## Manual Deployment (Alternative)

If GitHub Actions deployment fails, deploy manually:

```bash
# On your local machine
cd /path/to/paradisefinal

# Build frontend
cd frontend
npm run build

# Upload frontend
rsync -avz --delete dist/ user@host:~/public_html/

# Upload backend
cd ../backend
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.env' \
  --exclude 'logs/*' \
  --exclude 'uploads/*' \
  . user@host:~/backend/

# SSH to server and install dependencies
ssh user@host
cd ~/backend
npm ci --production
pm2 restart paradise-dental
```

## Verification Checklist

After deployment:

- [ ] Website loads at https://paradisedental.com
- [ ] API health check passes: `curl https://paradisedental.com/health`
- [ ] Database connected: `curl https://paradisedental.com/ready`
- [ ] Login works with test credentials
- [ ] SSL certificate is valid
- [ ] No console errors in browser
