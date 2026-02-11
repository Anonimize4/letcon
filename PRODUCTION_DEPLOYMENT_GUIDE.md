# Production Deployment Guide

This guide covers deploying the LETHCON platform to production with Neon database integration for both Vercel (frontend) and Render (backend).

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │     Render      │    │     Neon        │
│  (Frontend)     │◄──►│   (Backend)    │◄──►│  (Database)     │
│                 │    │                 │    │                 │
│ React App        │    │ Node.js API     │    │ PostgreSQL      │
│ Static Files     │    │ Prisma ORM      │    │ User Data       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

1. **Neon Database Account**
   - Neon console access
   - Database created and running
   - Connection strings available

2. **Vercel Account**
   - Frontend project created
   - Custom domain configured (optional)

3. **Render Account**
   - Backend service created
   - Custom domain configured (optional)

## 🔗 Neon Database Configuration

### Step 1: Get Neon Connection Details

From your Neon dashboard, collect these values:

```bash
# Pooled Connection (for application)
NEON_DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require&pgbouncer=true"

# Direct Connection (for migrations)
NEON_DIRECT_DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"

# Individual Parameters
DB_HOST=ep-xxx-xxx.us-east-1.aws.neon.tech
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
```

### Step 2: Set Up Database Schema

Run migrations on your Neon database:

```bash
# From backend directory
cd backend

# Use direct connection for migrations
npx prisma migrate deploy --schema=./prisma/schema/neon.prisma

# Generate Prisma client
npx prisma generate --schema=./prisma/schema/neon.prisma

# Test connection
node test-neon-connection.js
```

## 🚀 Render Backend Deployment

### Step 1: Configure Environment Variables

In your Render dashboard, set these environment variables:

```bash
# Database Configuration
NEON_DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require&pgbouncer=true
NEON_DIRECT_DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require

# Security
JWT_SECRET=your-super-strong-jwt-secret-key-32-chars-min
SESSION_SECRET=your-super-strong-session-secret-key-32-chars-min
CORS_ORIGIN=https://lethcon-frontend.vercel.app

# Application
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Optional Services
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Step 2: Deploy to Render

1. Connect your GitHub repository to Render
2. Set build command: `npm install && npm run build`
3. Set start command: `npm start`
4. Deploy the service

### Step 3: Verify Backend Deployment

```bash
# Test health endpoint
curl https://lethcon.onrender.com/health

# Test API endpoint
curl https://lethcon.onrender.com/api/v1/status
```

## 🌐 Vercel Frontend Deployment

### Step 1: Configure Environment Variables

In your Vercel dashboard, set these environment variables:

```bash
# API Configuration
VITE_API_URL=https://lethcon.onrender.com/api/v1
VITE_NODE_ENV=production

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MOCK_DATA=false

# Optional Services
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

### Step 2: Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set build command: `cd frontend && npm install && npm run build`
3. Set output directory: `frontend/dist`
4. Deploy the application

### Step 3: Verify Frontend Deployment

```bash
# Check frontend loads
curl https://lethcon-frontend.vercel.app

# Check API connectivity
# (Browser console should show successful API calls)
```

## 🔒 Security Configuration

### Generate Strong Secrets

```bash
# Generate JWT Secret (32+ characters)
openssl rand -base64 32

# Generate Session Secret (32+ characters)
openssl rand -base64 32
```

### CORS Configuration

Ensure CORS is properly configured:

- **Backend**: Only allow `https://lethcon-frontend.vercel.app`
- **Frontend**: Only communicate with `https://lethcon.onrender.com`

## 🧪 Production Testing

### Step 1: Database Connectivity

```bash
# Test Neon connection from production
# (Add this as a temporary endpoint in your backend)
app.get('/api/v1/test-db', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT version()`;
    res.json({ status: 'connected', version: result[0].version });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Step 2: End-to-End Testing

1. **User Registration**
   - Create a new account
   - Verify email confirmation
   - Check database for new user

2. **Authentication**
   - Login with created user
   - Verify JWT tokens
   - Test refresh token flow

3. **API Endpoints**
   - Test all protected routes
   - Verify rate limiting
   - Check error handling

## 📊 Monitoring & Logging

### Render Monitoring

1. Enable Render metrics
2. Set up log aggregation
3. Configure health checks

### Vercel Analytics

1. Enable Vercel Analytics
2. Set up custom events
3. Monitor performance

### Database Monitoring

1. Use Neon console metrics
2. Monitor connection pooling
3. Track query performance

## 🚨 Troubleshooting

### Database Connection Issues

```bash
# Common problems and solutions:

# 1. Connection Timeout
# Solution: Check firewall, SSL settings

# 2. Authentication Failed
# Solution: Verify username/password, database name

# 3. SSL Certificate Error
# Solution: Ensure ?sslmode=require in connection string

# 4. Connection Pool Exhaustion
# Solution: Increase pool size or optimize queries
```

### CORS Issues

```bash
# Frontend can't connect to backend:
# 1. Check CORS_ORIGIN matches exactly
# 2. Verify HTTPS protocols
# 3. Check subdomain matching
```

### Environment Variable Issues

```bash
# Variables not loading:
# 1. Check exact variable names
# 2. Verify no extra spaces
# 3. Restart services after changes
```

## 🔄 Deployment Pipeline

### Automated Deployments

Set up GitHub Actions for continuous deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        # Render auto-deploys on push

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        # Vercel auto-deploys on push
```

## 📝 Environment Variables Checklist

### Render (Backend) - Required
- [ ] `NEON_DATABASE_URL`
- [ ] `NEON_DIRECT_DATABASE_URL`
- [ ] `DATABASE_URL`
- [ ] `JWT_SECRET`
- [ ] `SESSION_SECRET`
- [ ] `CORS_ORIGIN=https://lethcon-frontend.vercel.app`

### Vercel (Frontend) - Required
- [ ] `VITE_API_URL=https://lethcon.onrender.com/api/v1`

### Optional Services
- [ ] Email configuration (SMTP)
- [ ] Payment processing (Stripe)
- [ ] Analytics (Google Analytics)
- [ ] Error tracking (Sentry)

## 🎉 Go Live!

Once all steps are complete:

1. **Verify all services are running**
2. **Test critical user flows**
3. **Monitor for 24-48 hours**
4. **Set up alerts and monitoring**
5. **Document any custom configurations**

Your LETHCON platform is now live in production with Neon database integration!
