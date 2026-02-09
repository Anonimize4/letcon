# Neon Database Migration Setup

## Overview

This project uses Neon PostgreSQL for user data and requires a dual-URL configuration to handle Prisma migrations properly. The Neon Pooler (PgBouncer) does not support advisory locks that Prisma Migrate needs, so we use a direct database connection during migrations.

## Configuration

### Environment Variables

The following environment variables are configured in `.env`:

```bash
# Neon PostgreSQL with Pooler (for regular operations)
NEON_DATABASE_URL=postgresql://neondb_owner:npg_LHgM1iqGayQ3@ep-fancy-sound-a49alp70-pooler.us-east-1.aws.neon.tech/prisma_migrate_shadow_db_4d394e99-d3f9-4634-bf55-3b51ec59bf81?sslmode=require&channel_binding=require&pgbouncer=true

# Neon Direct Connection (for migrations, bypasses pooler)
NEON_DIRECT_DATABASE_URL=postgresql://neondb_owner:npg_LHgM1iqGayQ3@ep-fancy-sound-a49alp70.us-east-1.aws.neon.tech/prisma_migrate_shadow_db_4d394e99-d3f9-4634-bf55-3b51ec59bf81?sslmode=require&channel_binding=require
```

### Prisma Schema Configuration

The Neon schema (`backend/prisma/schema/neon.prisma`) is configured with both URLs:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("NEON_DATABASE_URL")
  directUrl = env("NEON_DIRECT_DATABASE_URL")
}
```

## How It Works

1. **Regular Operations**: Uses `NEON_DATABASE_URL` with the pooler (`pgbouncer=true`) for efficient connection pooling
2. **Migrations**: Automatically uses `NEON_DIRECT_DATABASE_URL` to bypass the pooler and establish a direct connection that supports advisory locks
3. **Prisma Migrate**: Automatically detects the `directUrl` and uses it for migration operations

## Migration Commands

### User Database (Neon)
```bash
# Generate Prisma client
npm run db:gen

# Run migrations for user database (Neon)
npm run db:migrate:user

# Push schema changes without migration
npm run db:push:user
```

### Lab Database (Local)
```bash
# Run migrations for lab database (Local PostgreSQL)
npm run db:migrate:lab

# Push schema changes without migration
npm run db:push:lab
```

## Important Notes

- **Never use the pooler URL for migrations**: The pooler doesn't support advisory locks
- **Keep both URLs in sync**: Both URLs should point to the same database, just with different connection methods
- **Environment-specific**: This setup is specifically for Neon's architecture
- **Security**: The direct URL bypasses connection pooling, so use it only for migrations

## Troubleshooting

### Migration Issues
If you encounter migration errors, verify:
1. `NEON_DIRECT_DATABASE_URL` is set correctly (without `pgbouncer=true`)
2. Both URLs point to the same database
3. Network connectivity to Neon's direct endpoint

### Connection Issues
If regular operations fail:
1. Check `NEON_DATABASE_URL` includes `pgbouncer=true`
2. Verify pooler configuration
3. Test connection with both URLs separately

## References

- [Neon Prisma Documentation](https://neon.tech/docs/guides/prisma)
- [Prisma Migrate Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Neon Connection Pooling](https://neon.tech/docs/connect/connection-pooling)
