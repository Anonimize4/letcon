# LETHCON Deployment Guide

This guide covers deploying LETHCON with Vercel frontend and Render backend, focusing on authentication and CORS configuration.

## Overview

- **Frontend**: Vercel (React + TypeScript)
- **Backend**: Render (Node.js + Express + Neon PostgreSQL)
- **Database**: Neon PostgreSQL (multi-schema setup)

## Prerequisites

1. **Render Account**: Create account at [render.com](https://render.com)
2. **Vercel Account**: Create account at [vercel.com](https://vercel.com)
3. **Neon Database**: Create account at [neon.tech](https://neon.tech)
4. **Domain**: Optional custom domain for production

## Backend Deployment (Render)

### 1. Environment Variables

Set these environment variables in your Render dashboard:

```bash
# Essential
NODE_ENV=production
PORT=5000
NEON_DATABASE_URL=your_neon_database_url
NEON_DIRECT_DATABASE_URL=your_neon_direct_database_url
JWT_SECRET=your-secure-jwt-secret-32-chars-min
CORS_ORIGIN=https://lethcon-frontend.vercel.app

# Optional but recommended
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### 2. Database Setup

Your backend uses two Prisma schemas:

1. **Neon Schema** (`backend/prisma/schema/neon.prisma`): User data, authentication
2. **Local Schema** (`backend/prisma/schema/local.prisma`): Learning content, labs

The Neon schema is used for production. Ensure your Neon database is running migrations:

```bash
# In your local environment
cd backend
npx prisma migrate deploy --schema=./prisma/schema/neon.prisma
npx prisma generate --schema=./prisma/schema/neon.prisma
```

### 3. Build Configuration

The Dockerfile is configured to handle missing package-lock.json files and will work with Render's build process.

## Frontend Deployment (Vercel)

### 1. Environment Variables

Set these in your Vercel dashboard:

```bash
VITE_API_URL=https://lethcon.onrender.com/api/v1
VITE_NODE_ENV=production
```

### 2. Vercel Configuration

The `vercel.json` file handles API proxying:

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://lethcon.onrender.com/api/$1"
    }
  ]
}
```

### 3. Build Process

Vercel will automatically build your frontend using the configuration in `frontend/package.json`.

## CORS Configuration

### Backend CORS (Updated)

The backend CORS configuration now supports:

- Multiple origins for different environments
- Proper credential handling
- Detailed error logging

**Allowed Origins:**
- `http://localhost:3000` (local dev)
- `http://localhost:5173` (Vite dev server)
- `https://lethcon-frontend.vercel.app` (production)
- `https://www.lethcon-frontend.vercel.app` (production www)
- Custom origins from `CORS_ORIGIN` env var

### Frontend API Calls

The frontend now includes:
- `credentials: 'include'` in fetch requests
- Enhanced error handling for CORS issues
- Better user feedback for connection problems

## Authentication Flow

### 1. Login Process

1. User submits credentials to frontend
2. Frontend sends POST to `/api/v1/auth/login`
3. Backend validates credentials against Neon database
4. Backend returns JWT tokens (access + refresh)
5. Frontend stores tokens in localStorage
6. User is redirected to dashboard

### 2. Token Management

- **Access Token**: 24h expiration, used for API calls
- **Refresh Token**: 7d expiration, used for token renewal
- **Storage**: localStorage (consider HttpOnly cookies for production)

### 3. Protected Routes

Backend middleware validates JWT tokens for protected endpoints. Frontend uses AuthContext for route protection.

## Troubleshooting

### Common CORS Issues

1. **"CORS policy: No 'Access-Control-Allow-Origin' header"**
   - Check backend CORS configuration
   - Verify frontend URL is in allowed origins
   - Ensure backend is running and accessible

2. **"CORS policy: Credentials not supported"**
   - Ensure `credentials: 'include'` in frontend fetch
   - Verify backend CORS has `credentials: true`

3. **"Network error: Unable to connect"**
   - Check backend URL in frontend environment
   - Verify backend is deployed and running
   - Check Render service logs

### Authentication Issues

1. **"Invalid credentials"**
   - Verify user exists in Neon database
   - Check password hashing consistency
   - Review backend login controller

2. **"Token expired"**
   - Check JWT expiration times
   - Implement token refresh logic
   - Verify system clock sync

3. **"Unauthorized" on protected routes**
   - Check token storage in frontend
   - Verify token format and content
   - Review backend auth middleware

### Database Issues

1. **Connection refused**
   - Verify Neon database URLs
   - Check SSL configuration
   - Review database network settings

2. **Schema not found**
   - Run Prisma migrations on Neon
   - Verify schema file paths
   - Check Prisma client generation

## Production Considerations

### Security

1. **Environment Variables**: Never commit secrets to Git
2. **JWT Secrets**: Use strong, unique secrets
3. **Database URLs**: Use SSL connections
4. **Rate Limiting**: Configure appropriate limits
5. **CORS**: Restrict to specific origins

### Monitoring

1. **Logs**: Monitor Render service logs
2. **Errors**: Set up error tracking (Sentry, etc.)
3. **Performance**: Monitor API response times
4. **Database**: Track query performance

### Scaling

1. **Backend**: Render auto-scaling
2. **Database**: Neon connection pooling
3. **CDN**: Vercel's built-in CDN
4. **Caching**: Implement Redis if needed

## Environment-Specific Configurations

### Development

```bash
# Frontend (.env.development)
VITE_API_URL=http://localhost:5000/api/v1

# Backend (.env)
CORS_ORIGIN=http://localhost:3000
NEON_DATABASE_URL=your_dev_neon_url
```

### Production

```bash
# Frontend (.env.production)
VITE_API_URL=https://lethcon.onrender.com/api/v1

# Backend (Render env vars)
CORS_ORIGIN=https://lethcon-frontend.vercel.app
NEON_DATABASE_URL=your_prod_neon_url
```

## Testing the Setup

### 1. Local Testing

```bash
# Start backend
cd backend
npm install
npm run dev

# Start frontend
cd frontend
npm install
npm run dev
```

### 2. Production Testing

1. Deploy both frontend and backend
2. Test login with real credentials
3. Verify CORS preflight requests
4. Check protected routes
5. Test token refresh flow

## Support

For issues:

1. Check Render service logs
2. Review Vercel build logs
3. Verify Neon database status
4. Test API endpoints directly
5. Check browser developer tools for CORS errors
