# ============================================================================
# Supabase Environment Variables Configuration
# ============================================================================
# 
# Security Requirements:
# - Backend: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
# - Frontend: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
# 
# ⚠️  CRITICAL: Never expose SUPABASE_SERVICE_ROLE_KEY to the frontend!
# ============================================================================

## Supabase Configuration Guide

### Backend Environment Variables (backend/.env)

```bash
# Supabase Project URL
# Get from: Project Settings > API > Project URL
SUPABASE_URL=https://your-project.supabase.co

# Supabase Anon Key (Public - safe for both backend and frontend)
# Get from: Project Settings > API > anon key
SUPABASE_ANON_KEY=your-anon-key

# ⚠️  CRITICAL: Service Role Key - Server-side only!
# Get from: Project Settings > API > service_role key
# NEVER expose this to frontend/client-side code
# This key bypasses Row Level Security (RLS)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Frontend Environment Variables (frontend/.env.development)

```bash
# Supabase Project URL (Public - safe for frontend)
VITE_SUPABASE_URL=https://your-project.supabase.co

# Supabase Anon Key (Public - safe for frontend)
# Get from: Project Settings > API > anon key
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### ⚠️  Security Rules

1. **NEVER put SUPABASE_SERVICE_ROLE_KEY in frontend/.env*** files
2. **ALWAYS use ANON key for frontend client**
3. **Service role key is server-side only**

### Why This Separation?

| Key Type | Frontend Safe? | Backend Safe? | Purpose |
|----------|----------------|---------------|---------|
| ANON Key | ✅ Yes | ✅ Yes | Public operations, respects RLS |
| SERVICE_ROLE_KEY | ❌ No | ✅ Yes | Admin operations, bypasses RLS |

### How to Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Project Settings** > **API**
4. Copy the following:
   - **Project URL** → Use for `SUPABASE_URL` and `VITE_SUPABASE_URL`
   - **anon public** → Use for `SUPABASE_ANON_KEY` and `VITE_SUPABASE_ANON_KEY`
   - **service_role** → Use ONLY for `SUPABASE_SERVICE_ROLE_KEY` (backend only)

### Quick Setup

Run the setup script to configure environment variables:

```bash
chmod +x scripts/setup-supabase-env.sh
./scripts/setup-supabase-env.sh
```

### File Structure

```
LETHCON/
├── backend/
│   ├── .env                 # ⚠️ Contains SERVICE_ROLE_KEY
│   ├── .env.example        # Template with placeholders
│   └── .env.production     # Production settings
│
├── frontend/
│   ├── .env.development    # ⚠️ ANON key only
│   ├── .env.production     # ⚠️ ANON key only
│   └── .env.development.example
│
└── scripts/
    └── setup-supabase-env.sh  # Automated setup script
```

### Verification

To verify your setup is secure, run:

```bash
# Check backend has service role key
grep "SUPABASE_SERVICE_ROLE_KEY" backend/.env

# Check frontend does NOT have service role key
grep "SERVICE_ROLE_KEY" frontend/.env.development
# Should return nothing (exit code 1)
```

### Environment Variable Mapping

| Backend (.env) | Frontend (.env.development) | Purpose |
|----------------|----------------------------|---------|
| `SUPABASE_URL` | `VITE_SUPABASE_URL` | Project endpoint |
| `SUPABASE_ANON_KEY` | `VITE_SUPABASE_ANON_KEY` | Public anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ NOT USED | Admin key (server-only) |

### Common Issues

#### Issue: "Service role key exposed to frontend"
**Solution:** Remove `SUPABASE_SERVICE_ROLE_KEY` from frontend/.env* files immediately.

#### Issue: "Frontend can't access Supabase"
**Solution:** Verify `VITE_SUPABASE_ANON_KEY` is set correctly in frontend/.env.development.

#### Issue: "Backend operations fail with permission errors"
**Solution:** Verify `SUPABASE_SERVICE_ROLE_KEY` is set in backend/.env.

