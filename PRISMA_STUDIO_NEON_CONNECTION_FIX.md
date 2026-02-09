# Prisma Studio Neon Connection Fix

## Issue Identified

**Problem:** You can see data in Prisma Studio but the Neon console shows empty tables.

**Root Cause:** Prisma Studio is connecting to your **local SQLite database** (`dev.db`) instead of the **Neon PostgreSQL database**.

## Evidence Found

1. **Local SQLite Database:** `backend/prisma/dev.db` file exists
2. **Multiple Schema Files:** You have multiple Prisma schemas:
   - `backend/prisma/schema/neon.prisma` (Neon PostgreSQL)
   - `backend/prisma/schema/local.prisma` (Local PostgreSQL)
   - Possibly a default SQLite schema that created `dev.db`

3. **Environment Variables:** Multiple database URLs configured:
   - `LOCAL_DATABASE_URL` (Local PostgreSQL)
   - `NEON_DATABASE_URL` (Neon PostgreSQL)
   - `DATABASE_URL` (Legacy, points to Neon)

## How Prisma Studio Chooses Database

When you run `npx prisma studio`, it follows this priority:
1. Looks for `schema.prisma` in current directory
2. If not found, looks for `prisma/schema.prisma`
3. Uses the database URL defined in that schema file

Since you don't have a default `schema.prisma`, Prisma Studio might be:
1. Creating a default SQLite database (`dev.db`)
2. Using a cached schema configuration
3. Connecting to the wrong schema file

## Solutions

### Solution 1: Explicitly Specify Neon Schema (Recommended)

```bash
# Always specify the neon schema when opening Prisma Studio
cd backend
npx prisma studio --schema=./prisma/schema/neon.prisma
```

### Solution 2: Create Default Schema Symbolic Link

```bash
cd backend/prisma
ln -sf schema/neon.prisma schema.prisma
```

### Solution 3: Update Package.json Scripts

Add specific scripts to `package.json`:

```json
{
  "scripts": {
    "studio:neon": "npx prisma studio --schema=./prisma/schema/neon.prisma",
    "studio:local": "npx prisma studio --schema=./prisma/schema/local.prisma",
    "studio": "npm run studio:neon"
  }
}
```

### Solution 4: Check Current Prisma Studio Connection

To verify which database Prisma Studio is actually using:

1. **Open Prisma Studio with explicit schema:**
   ```bash
   cd backend
   npx prisma studio --schema=./prisma/schema/neon.prisma
   ```

2. **Check the connection info in the browser:**
   - Look at the browser URL/address bar
   - Check if it shows "Neon" or connection details
   - Verify the database name and connection type

### Solution 5: Remove Conflicting SQLite Database

If you don't need the local SQLite database:

```bash
cd backend
rm prisma/dev.db
```

## Verification Steps

### Step 1: Verify Neon Connection
```bash
cd backend
npx prisma studio --schema=./prisma/schema/neon.prisma
```

### Step 2: Check Data in Both Places
1. **Prisma Studio:** Should show your data
2. **Neon Console:** Should show the same data
3. **If mismatch:** Still connecting to wrong database

### Step 3: Test Database URL
```bash
# Test the Neon connection directly
cd backend
npx prisma db pull --schema=./prisma/schema/neon.prisma
```

If this succeeds and shows tables, your Neon connection is working.

## Quick Fix Command

```bash
# Go to backend directory
cd backend

# Remove any conflicting default schema
rm -f prisma/schema.prisma

# Create symbolic link to neon schema
ln -sf schema/neon.prisma prisma/schema.prisma

# Now run Prisma Studio
npx prisma studio
```

## Why This Happens

1. **Multiple Schemas:** Having multiple schema files confuses Prisma CLI
2. **No Default:** Without a default `schema.prisma`, Prisma falls back to SQLite
3. **Environment Variables:** Prisma Studio doesn't always use the same environment variables as your application

## Prevention

1. **Always Specify Schema:** Always use `--schema` parameter
2. **Use Package Scripts:** Create specific npm scripts for different databases
3. **Default Schema:** Keep a default schema that points to your primary database
4. **Clean Environment:** Remove unused database files and schemas

## Testing the Fix

After applying the fix:

1. **Open Prisma Studio:** `npx prisma studio --schema=./prisma/schema/neon.prisma`
2. **Add Test Data:** Create a test user or record
3. **Check Neon Console:** Verify the same data appears
4. **Verify Consistency:** Both should show identical data

## Docker Deployment Impact

This issue only affects local development and Prisma Studio usage. The Docker deployment fix we applied earlier (correcting the import path) is separate and will still work for production deployment.

## Summary

The issue is that Prisma Studio is connecting to your local SQLite database instead of Neon. The solution is to explicitly specify the Neon schema when opening Prisma Studio or set up the correct default schema.
