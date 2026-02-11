# Environment Variable Fix for Vercel Deployment

## Problem Identified - FIXED ✓

The frontend was experiencing ERR_CONNECTION_REFUSED and malformed URL errors because:

1. **Incorrect Vercel Environment Variable**: `VITE_API_URL` was set to `/api/v1` (missing the full `https://lethcon.onrender.com` prefix)
2. **Inconsistent Code Patterns**: Different files handled `VITE_API_URL` differently

## Root Cause Analysis

In the compiled JavaScript we saw:
```javascript
ue="https:///api/v1/api/v1"  // Malformed URL!
```

This happened because:
- `VITE_API_URL` in Vercel = `/api/v1` (wrong!)
- Code pattern = `VITE_API_URL + '/api/v1'`
- Result = `/api/v1/api/v1` ❌

## Solution Implemented ✓

### 1. Created `.env.production` (Reference File)
**File:** `frontend/.env.production`

```bash
VITE_API_URL=https://lethcon.onrender.com
VITE_WS_URL=wss://lethcon.onrender.com
VITE_ENV=production
```

**Note:** This file is in `.gitignore` for security. The actual values must be set in Vercel Dashboard.

### 2. Updated Fallback URLs in Code

**AuthContext.tsx (BEFORE):**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api/v1' : 'http://localhost:5000/api/v1');
```

**AuthContext.tsx (AFTER):**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';
```

**terminal.service.ts (BEFORE):**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';
```

**terminal.service.ts (AFTER):**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';
```

## Required Action - SET VERCEL ENVIRONMENT VARIABLES

⚠️ **IMPORTANT:** You must set these in Vercel Dashboard for the fix to work!

1. Go to your Vercel Project → Settings → Environment Variables
2. Ensure these variables are set for **Production**, **Preview**, and **Development**:

| Variable | Value | Scope |
|----------|-------|-------|
| `VITE_API_URL` | `https://lethcon.onrender.com` | All |
| `VITE_WS_URL` | `wss://lethcon.onrender.com` | All |
| `VITE_ENV` | `production` | Production only |

3. **Remove any incorrect variables** like:
   - `VITE_API_URL=/api/v1` (wrong!)
   - `VITE_API_URL=https://lethcon.onrender.com/api/v1` (double path!)

## How It Works

- **With VITE_API_URL set correctly**: `https://lethcon.onrender.com`
  - Code appends `/api/v1` → `https://lethcon.onrender.com/api/v1` ✓
  
- **Without VITE_API_URL (fallback)**: `/api/v1`
  - Vercel proxy routes `/api/*` → `https://lethcon.onrender.com/api/$1` ✓

## Vercel Proxy Configuration (Already Correct)

The `vercel.json` already has proper routing:
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

## Deployment Steps

1. **Set Environment Variables in Vercel Dashboard** (most important!)
2. Push changes to GitHub
3. Vercel auto-deploys
4. Verify in browser console that API calls go to correct URL

## Verification Steps

1. Open browser Developer Tools → Network tab
2. Check API requests:
   - Should show: `https://lethcon.onrender.com/api/v1/auth/login`
   - Should NOT show: `https:///api/v1/api/v1/auth/login` or `http://localhost:5000/...`
3. Test login/authentication flow
4. Verify terminal service connections

