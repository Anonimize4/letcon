# Prisma Schema Consolidation Plan

## Current State Analysis

### Existing Schema Files:
1. **`/home/login/LETHCON/backend/prisma/schema.prisma`** - Main unified schema (appears complete)
2. **`/home/login/LETHCON/backend/prisma/neon/schema.prisma`** - Neon-specific schema (duplicate)
3. **`/home/login/LETHCON/backend/prisma/local/schema.prisma`** - Local-specific schema (duplicate)

### Issue Found:
The Dockerfile currently generates Prisma clients for BOTH neon and local schemas, which is redundant since all three schemas appear to be identical.

## Consolidation Plan

### 1. Update Dockerfile (`/home/login/LETHCON/backend/Dockerfile`)
**Changes:**
- Remove duplicate schema generation commands:
  - ❌ Remove: `RUN npx prisma generate --schema=./prisma/neon/schema.prisma`
  - ❌ Remove: `RUN npx prisma generate --schema=./prisma/local/schema.prisma`
- Keep only: `RUN npx prisma generate --schema=./prisma/schema.prisma`

### 2. Delete Duplicate Schema Files
**Files to delete:**
- `/home/login/LETHCON/backend/prisma/neon/schema.prisma` (entire directory)
- `/home/login/LETHCON/backend/prisma/local/schema.prisma` (entire directory)

### 3. Verify No Other References
**Check for any other files that might reference the deleted schemas:**
- No other files found referencing the neon/local schemas in search results

## Files to be Modified:
1. `backend/Dockerfile` - Remove duplicate prisma generate commands

## Files to be Deleted:
1. `backend/prisma/neon/` directory (contains `schema.prisma`)
2. `backend/prisma/local/` directory (contains `schema.prisma`)

## Benefits:
- ✅ Single source of truth for database schema
- ✅ Faster build times (no duplicate client generation)
- ✅ Reduced Docker image size
- ✅ Easier maintenance

## Rollback Plan:
If issues arise, the duplicate schemas can be restored from git history.

---
**Status:** Ready to implement
**Risk Level:** Low (simple cleanup task)
