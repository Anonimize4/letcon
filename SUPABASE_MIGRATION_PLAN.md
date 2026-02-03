# Supabase Migration Plan

## Overview
Migrate database from Neon to Supabase for the Cybersecurity Training Platform.

## Current State Analysis
- **Current Database**: PostgreSQL (via Prisma ORM)
- **Configuration Location**: `backend/src/config/env.ts`
- **Environment Variables**: `DATABASE_URL`
- **Current Default**: `postgresql://postgres:password@localhost:5432/cybersecurity_training`

## Changes Required

### 1. Environment Variables Update (`backend/src/config/env.ts`)
**Current:**
```typescript
DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/cybersecurity_training',
```

**Proposed Changes:**
- Update default fallback to use Supabase connection format
- Add Supabase-specific environment variables for better configuration management

### 2. Database Connection Configuration
**Supabase Connection String Format:**
```
postgresql://postgres:[PASSWORD]@[HOST]:5432/[DATABASE]?schema=public
```

**Example Supabase URL:**
```
postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres
```

### 3. Documentation Updates
- Update `.env.example` (if exists)
- Update `README.md` with Supabase setup instructions
- Update `docs/SETUP.md` with new database configuration

### 4. Optional: Connection Pooling Configuration
For Supabase, you might want to add PgBouncer configuration:
```
DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:[PASSWORD]@[HOST]:5432/[DATABASE]?schema=public&pgbouncer=true'
```

## Implementation Steps

### Step 1: Update Environment Configuration
- [ ] Modify `backend/src/config/env.ts` to support Supabase
- [ ] Create/Update `.env.example` with Supabase template
- [ ] Add Supabase-specific environment variables

### Step 2: Update Documentation
- [ ] Update `README.md` with Supabase setup
- [ ] Update `docs/SETUP.md` 
- [ ] Add Supabase connection troubleshooting guide

### Step 3: Test Database Connection
- [ ] Verify Prisma connection to Supabase
- [ ] Run database migrations
- [ ] Test application functionality

### Step 4: Deployment Configuration
- [ ] Update Docker environment variables
- [ ] Update any CI/CD pipeline configurations
- [ ] Update docker-compose files if needed

## Supabase Setup Checklist
- [ ] Create Supabase project
- [ ] Get connection credentials
- [ ] Set up database schema
- [ ] Configure connection pooling (optional but recommended)
- [ ] Set up row level security (RLS) policies if needed

## Rollback Plan
- Keep Neon connection string as backup
- Document any Neon-specific features used
- Test both connections during migration

## Risk Assessment
- **Low Risk**: Prisma supports both Neon and Supabase seamlessly
- **No code changes required**: Only environment variable updates
- **Testing Required**: Verify all database operations work correctly

## Success Criteria
- [ ] Application connects to Supabase successfully
- [ ] All database operations work correctly
- [ ] Performance meets or exceeds previous setup
- [ ] Documentation updated with new setup instructions

## Timeline
- **Configuration Update**: 5-10 minutes
- **Testing**: 15-30 minutes
- **Documentation**: 10-15 minutes
- **Total Estimated Time**: 30-60 minutes
