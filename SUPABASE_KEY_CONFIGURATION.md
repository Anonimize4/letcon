# Supabase Key Configuration for Render Deployment

## Overview
This document outlines the correct Supabase key configuration for secure deployment on Render, ensuring proper separation of concerns between backend admin operations and frontend client operations.

## Key Types

### 1. Service Role Key (Backend Only)
- **Purpose**: Admin operations that bypass Row Level Security (RLS)
- **Usage**: Backend server-side operations
- **Permissions**: Full database access, bypasses RLS
- **Security**: Must be kept secret, never exposed to client

### 2. Anonymous/Public Key (Frontend Only)
- **Purpose**: Client-side operations with RLS enforcement
- **Usage**: Frontend browser operations
- **Permissions**: Limited by RLS policies
- **Security**: Safe to expose to client

## Configuration Files

### Backend Configuration
**File**: `backend/src/lib/supabase.ts`

```typescript
// Uses SERVICE_ROLE_KEY for admin operations
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

**Environment Variables** (render.yaml):
```yaml
envVars:
  - key: SUPABASE_SERVICE_ROLE_KEY
    fromSecret:
      name: supabase-service-role-key
```

### Frontend Configuration
**File**: `frontend/src/lib/supabase.ts`

```typescript
// Uses ANON_KEY for client operations
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

**Environment Variables** (render.yaml):
```yaml
envVars:
  - key: VITE_SUPABASE_ANON_KEY
    fromSecret:
      name: supabase-key
```

## Render Deployment Configuration

### Backend Service
- **Service**: lethcon-backend
- **Key Used**: `SUPABASE_SERVICE_ROLE_KEY`
- **Purpose**: Admin operations, user management, database administration
- **Security**: Server-side only, never exposed to client

### Frontend Service
- **Service**: lethcon-frontend
- **Key Used**: `VITE_SUPABASE_ANON_KEY`
- **Purpose**: Client-side operations with RLS enforcement
- **Security**: Client-safe, respects RLS policies

## Security Best Practices

### Backend (Service Role Key)
✅ **DO**:
- Use for admin operations (user management, data seeding, etc.)
- Use for server-side API endpoints
- Keep environment variables secret
- Disable auth persistence for admin operations

❌ **DON'T**:
- Expose to client-side code
- Use in browser applications
- Commit to version control

### Frontend (Anonymous Key)
✅ **DO**:
- Use for client-side operations
- Implement proper RLS policies
- Use for user authentication flows
- Expose via build-time environment variables

❌ **DON'T**:
- Use for admin operations
- Bypass RLS policies
- Use server-side without proper validation

## Environment Variable Mapping

| Backend Variable | Frontend Variable | Purpose |
|-----------------|-------------------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | N/A | Backend admin operations |
| `SUPABASE_URL` | `VITE_SUPABASE_URL` | Supabase project URL |
| N/A | `VITE_SUPABASE_ANON_KEY` | Frontend client operations |

## Render Secrets Configuration

The following secrets must be configured in Render:

1. **supabase-url**: Supabase project URL
2. **supabase-key**: Supabase anonymous/public key
3. **supabase-service-role-key**: Supabase service role key

## Testing Configuration

To verify the configuration:

1. **Backend Test**: Ensure service role key can bypass RLS
2. **Frontend Test**: Ensure anon key respects RLS policies
3. **Security Test**: Verify service role key is not exposed in frontend bundle

## Migration Notes

- Previous configuration used `SUPABASE_KEY` in backend (incorrect)
- Updated to use `SUPABASE_SERVICE_ROLE_KEY` for proper admin access
- Frontend correctly uses `VITE_SUPABASE_ANON_KEY` for client operations
- Both services now have proper key separation for security

## Files Modified

1. `backend/src/lib/supabase.ts` - Updated to use service role key
2. `render.yaml` - Added frontend Supabase environment variables
3. `backend/.env.example` - Documents proper key usage

This configuration ensures secure deployment with proper separation of admin and client operations.
