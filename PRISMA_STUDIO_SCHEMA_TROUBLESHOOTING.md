# Prisma Studio Schema Connection Troubleshooting

## Issue Analysis

Based on the deployment error and your feedback about Prisma Studio potentially connecting to a different schema, here are the likely issues and solutions:

## 1. Original Docker Deployment Issue ✅ FIXED

**Problem:** `Error: Cannot find module '../../node_modules/.prisma/client'`

**Root Cause:** Database configuration was importing from wrong path:
```typescript
// Incorrect
import { PrismaClient as LabPrismaClient } from '../../node_modules/.prisma/client'

// Correct  
import { PrismaClient as LabPrismaClient } from '@prisma-lab/client'
```

**Status:** ✅ Fixed in `backend/src/config/database.ts`

## 2. Potential Prisma Studio Schema Issue

### Current Schema Configuration

**Neon Schema (`neon.prisma`):**
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("NEON_DATABASE_URL")
  directUrl = env("NEON_DIRECT_DATABASE_URL")
}
```

**Table Mappings:** All models use explicit `@@map` directives:
- `User` → `@@map("users")`
- `labs` → `@@map("labs")`
- etc.

### Potential Issues

#### Issue A: Default Schema vs Custom Schema
- **Current:** Tables are created in default `public` schema (no explicit schema specified)
- **Prisma Studio:** Might be looking in a different schema
- **Neon Console:** Shows tables in `public` schema by default

#### Issue B: Connection URL Schema
- **Current URLs:** No explicit schema in connection strings
- **Potential Fix:** Add schema to connection URL

### Diagnostic Commands

#### 1. Check What Schema Prisma Studio is Using
```bash
# Check Prisma Studio connection
cd backend
npx prisma studio --schema=./prisma/schema/neon.prisma
```

#### 2. Verify Tables in Neon Database
```sql
-- Connect to Neon and check schemas
SELECT schema_name FROM information_schema.schemata 
WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast');

-- Check tables in each schema
SELECT table_schema, table_name 
FROM information_schema.tables 
WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
ORDER BY table_schema, table_name;
```

#### 3. Test Connection with Explicit Schema
```bash
# Test with explicit public schema
NEON_DATABASE_URL="postgresql://neondb_owner:npg_FnaQULMf6y5w@ep-soft-band-ad15o99l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&schema=public" npx prisma studio --schema=./prisma/schema/neon.prisma
```

### Solutions

#### Solution 1: Add Explicit Schema to Prisma Schema
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("NEON_DATABASE_URL")
  directUrl = env("NEON_DIRECT_DATABASE_URL")
  schema    = "public"  // Add this line
}
```

#### Solution 2: Update Connection URLs with Schema
```env
# In .env file
NEON_DATABASE_URL="postgresql://neondb_owner:npg_FnaQULMf6y5w@ep-soft-band-ad15o99l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&schema=public"
NEON_DIRECT_DATABASE_URL="postgresql://neondb_owner:npg_FnaQULMf6y5w@ep-soft-band-ad15o99l.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&schema=public"
```

#### Solution 3: Check for Multiple Schemas in Neon
If tables exist in multiple schemas, Prisma Studio might be connecting to the wrong one. Use the SQL commands above to identify all schemas and tables.

### Migration Analysis

From the migration files, we can see:
- Tables are created without explicit schema (defaults to `public`)
- Table names use lowercase with quotes: `"users"`, `"labs"`, etc.
- No schema-specific operations in migrations

### Next Steps

1. **Immediate:** Verify which schema Prisma Studio is actually connecting to
2. **Check:** Run the SQL diagnostic commands to see all schemas/tables
3. **Test:** Try connecting with explicit `schema=public` parameter
4. **Update:** If needed, modify the Prisma schema to include explicit schema

### Docker Impact

The Docker deployment should work with the current fix. The schema issue only affects:
- Prisma Studio connection
- Local development database browsing
- Database administration tools

Production deployment doesn't use Prisma Studio, so the original deployment fix should resolve the Render deployment issue.
