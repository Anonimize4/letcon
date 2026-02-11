# Vite Environment Mode Configuration Guide

This guide explains how the project uses Vite's Env Mode system to manage environment variables across different deployment scenarios.

## 📁 Environment File Structure

### Root Level Files
- **`.env.local`** - Personal local overrides (gitignored)
- **`.env.development`** - Shared development settings
- **`.env.production`** - Production structure template (no secrets)

### Frontend Files (`frontend/`)
- **`.env.development`** - Frontend-specific development overrides
- **`.env.production.example`** - Frontend production template

### Backend Files (`backend/`)
- **`.env`** - Backend development settings
- **`.env.production.example`** - Backend production template

## 🚀 Vite Env Mode Priority

Vite loads environment files in this order (later files override earlier ones):

1. `.env` - Base variables (always loaded)
2. `.env.local` - Local overrides (gitignored)
3. `.env.[mode]` - Mode-specific files (e.g., `.env.development`, `.env.production`)
4. `.env.[mode].local` - Mode-specific local overrides (gitignored)

## 🛠️ Development Workflow

### Local Development
```bash
# Frontend development
cd frontend
npm run dev  # Loads: .env + .env.local + .env.development + .env.development.local

# Backend development  
cd backend
npm run dev  # Uses: backend/.env + ../.env.development + ../.env.local
```

### Personal Overrides
Use `.env.local` for your personal settings:
```bash
# .env.local (gitignored)
DATABASE_URL=postgresql://myuser:mypass@localhost:5432/mydb
JWT_SECRET=my-personal-jwt-secret
SMTP_USER=myemail@gmail.com
SMTP_PASS=my-app-password
```

## 🏭 Production Deployment

### Vercel (Frontend)
1. Set environment variables in Vercel dashboard
2. Variables will be available as `VITE_*` prefixed
3. Use `frontend/.env.production.example` as reference

### Render (Backend)
1. Set environment variables in Render dashboard
2. Use `backend/.env.production.example` as reference
3. Do NOT commit actual secrets to repository

## 📋 Required Production Environment Variables

### Frontend (Vercel)
```bash
VITE_API_URL=https://your-api-domain.com/api/v1
VITE_NODE_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

### Backend (Render)
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-strong-jwt-secret
SESSION_SECRET=your-strong-session-secret
CORS_ORIGIN=https://your-frontend-domain.com
STRIPE_SECRET_KEY=sk_live_...
SMTP_HOST=smtp.your-provider.com
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
```

## 🔒 Security Best Practices

### ✅ DO
- Use `.env.local` for personal development secrets
- Set production secrets in deployment platform dashboards
- Use example files (`.env.production.example`) as templates
- Keep development secrets weak (they're for local use only)

### ❌ DON'T
- Commit real secrets to any `.env` file
- Share `.env.local` files
- Use production secrets in development
- Hard-code sensitive values in code

## 🔄 Environment Variable Flow

```
Development:
├── .env (base)
├── .env.local (personal overrides)
├── .env.development (shared dev settings)
└── frontend/.env.development (frontend overrides)
└── backend/.env (backend overrides)

Production:
├── Deployment Platform Environment Variables
└── .env.production (structure only, no secrets)
```

## 🧪 Testing Different Modes

### Test Production Mode Locally
```bash
# Frontend
cd frontend
npm run build
npm run preview  # NODE_ENV=production

# Backend  
cd backend
NODE_ENV=production npm start
```

### Test with Custom Environment
```bash
# Create custom mode
echo "VITE_CUSTOM_VAR=test" > .env.staging
npm run dev -- --mode staging
```

## 📝 File Naming Conventions

- `.env` - Base variables
- `.env.local` - Local overrides (gitignored)
- `.env.development` - Development mode
- `.env.production` - Production mode
- `.env.staging` - Staging mode (if needed)
- `.env.example` - Template files
- `.env.production.example` - Production template

## 🚨 Important Notes

1. **Frontend variables must be prefixed with `VITE_`** to be exposed to the browser
2. **Backend variables can use any naming** but should follow conventions
3. **Never commit `.env.local`** - it's in `.gitignore`
4. **Production builds use different loading order** than development
5. **Database URLs and secrets should always come from environment variables**

## 🔍 Troubleshooting

### Variables Not Loading?
1. Check file naming (must be `.env.[mode]`)
2. Verify `VITE_` prefix for frontend variables
3. Restart dev server after changes
4. Check `.gitignore` isn't blocking files

### Production Issues?
1. Verify all required variables are set in deployment platform
2. Check variable names match exactly
3. Ensure no hardcoded values in code
4. Review deployment logs for missing environment variables

## 📚 Additional Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Render Environment Variables](https://render.com/docs/environment-variables)
