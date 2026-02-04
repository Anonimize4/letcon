# Render Deployment Guide for LETHCON

This guide provides step-by-step instructions to deploy LETHCON on Render using Docker.

## Prerequisites

Before deploying, ensure you have:
- A [Render account](https://render.com)
- A [Supabase project](https://supabase.com)
- Your code pushed to GitHub/GitLab/Bitbucket

## Quick Deploy (One-Click)

### Deploy with Docker
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `lethcon-backend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `Dockerfile`
   - **Docker Command**: `node dist/server.js`
5. Add Environment Variables (see below)
6. Click "Create Web Service"

### Deploy Full Stack with Blueprint
Use the `render.yaml` file for automatic deployment:
1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render will detect `render.yaml` and configure all services
5. Add required secrets and environment variables
6. Click "Apply"

## Environment Variables

### Required Secrets
Go to Render Dashboard → Your Service → Environment and add:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Supabase (get from Supabase Dashboard > Settings > API)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.onrender.com
```

### Setting Secrets
```bash
# Using Render CLI
render secret create SUPABASE_URL="https://your-project.supabase.co"
render secret create SUPABASE_KEY="your-anon-key"
render secret create SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## Database Setup

### Option 1: Use Render PostgreSQL
1. Render Dashboard → "New +" → "PostgreSQL"
2. Configure:
   - **Name**: `lethcon-db`
   - **Plan**: Starter ($7/month) or Free
3. Click "Create Database"
4. Copy the "Connection String" (DATABASE_URL)
5. Add to your backend service's Environment Variables

### Option 2: Use External PostgreSQL
If using Supabase or another provider:
1. Get your PostgreSQL connection string
2. Format: `postgresql://username:password@hostname:5432/database`
3. Add as `DATABASE_URL` environment variable

### Initialize Database
Run migrations after deployment:
```bash
# In Render's Console or via post-deploy command
cd backend
npx prisma migrate deploy
npx prisma db seed
```

## Frontend Deployment

### Static Site Deployment
1. Render Dashboard → "New +" → "Static Site"
2. Connect your repository
3. Configure:
   - **Name**: `lethcon-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Static Publish Path**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL (e.g., `https://lethcon-backend.onrender.com/api/v1`)
5. Click "Create Static Site"

## Supabase Setup

### 1. Create Supabase Project
1. Go to [Supabase](https://supabase.com)
2. Click "New Project"
3. Configure:
   - **Name**: `lethcon`
   - **Database Password**: Save this!
4. Wait for project creation (~2 minutes)

### 2. Get API Credentials
1. Go to Project Settings → API
2. Copy:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: Safe to expose
3. Go to Project Settings → Database
4. Copy:
   - **Connection string**: For DATABASE_URL

### 3. Configure Row Level Security (RLS)
```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your needs)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

## Troubleshooting

### Build Fails
```bash
# Common issues:
# 1. Missing dependencies
npm ci

# 2. TypeScript errors
npm run build

# 3. Check tsconfig.json
cat backend/tsconfig.json
```

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure DATABASE_URL points to external database, not localhost.

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Update `CORS_ORIGIN` environment variable to match your frontend URL.

### JWT Errors
```
JsonWebTokenError: invalid signature
```
**Solution**: Ensure JWT_SECRET is consistent across deployments.

## Deployment Checklist

- [ ] Push code to GitHub
- [ ] Create Render account
- [ ] Create Supabase project
- [ ] Configure environment variables
- [ ] Deploy backend service
- [ ] Deploy PostgreSQL database
- [ ] Run database migrations
- [ ] Deploy frontend service
- [ ] Test registration/login
- [ ] Configure custom domain (optional)

## Useful Commands

```bash
# Test locally
npm run build
npm start

# View logs
render logs -s lethcon-backend

# Restart service
render restart -s lethcon-backend

# Set environment variable
render secret update SUPABASE_KEY="new-value"
```

## Security Best Practices

1. **Never commit `.env` files** - Use Render secrets
2. **Use different keys** for production vs development
3. **Enable RLS** on all Supabase tables
4. **Rotate secrets** periodically
5. **Use HTTPS** in production

## Next Steps

After successful deployment:
1. Configure custom domain
2. Set up SSL certificates
3. Enable email provider (SendGrid/AWS SES)
4. Configure rate limiting
5. Set up monitoring and alerts

