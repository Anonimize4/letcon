# TODO: Fix Prisma `recorded` Column Migration

## Problem
The `recorded` column is missing from the `users` table in the database, causing Prisma Client requests to fail.

## Root Cause
- The Prisma schema (`neon.prisma`) has the `recorded` field defined in the User model
- There's a migration file (`20260209092059_add_recorded_field/migration.sql`) that should add it
- But this migration has NOT been applied to the actual database

## Solution Steps

### Step 1: Apply Prisma Migration
Apply the migration that adds the `recorded` column to the user database:
```bash
cd /home/login/LETHCON/backend
npm run db:migrate:user
```

### Step 2: Regenerate Prisma Client
Ensure the Prisma client reflects the latest schema:
```bash
npm run db:gen
```

### Step 3: Restart Backend Server
Restart the backend server to use the updated Prisma client:
```bash
# If running with nodemon
npm run dev

# Or if running in production
npm run build && npm start
```

## Verification
After applying the fix, the following query should work:
```prisma
await prisma.user.findMany({
  select: {
    id: true,
    recorded: true,
    // ... other fields
  }
})
```

## Alternative: Manual SQL Fix
If Prisma migrate fails, you can apply the SQL directly:
```sql
ALTER TABLE "users" ADD COLUMN "recorded" BOOLEAN NOT NULL DEFAULT false;
```

## Files Involved
- `/home/login/LETHCON/backend/prisma/schema/neon.prisma` - Prisma schema with `recorded` field
- `/home/login/LETHCON/backend/prisma/schema/migrations/20260209092059_add_recorded_field/migration.sql` - Migration file
- `/home/login/LETHCON/backend/scripts/apply-recorded-field-migration.sql` - Manual SQL script

