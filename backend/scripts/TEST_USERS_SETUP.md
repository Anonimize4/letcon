# LETHCON Test Users Setup

This document explains how to create the three test users with different roles for testing the authentication and role-based routing system.

## Test User Credentials

| Role    | Email                  | Password    | Redirect After Login    |
|---------|------------------------|-------------|-------------------------|
| ADMIN   | admin@lethcon.com      | Password123 | `/admin`                |
| USER    | user@lethcon.com       | Password123 | `/dashboard`            |
| CREATOR | creator@lethcon.com    | Password123 | `/dashboard/creator`    |

## Setup Methods

### Method 1: Using Prisma Seed Script (Recommended)

The seed script has been updated to include these test users. To run it:

```bash
cd backend
npm run db:seed
```

**Note:** Make sure your database connection is properly configured in `backend/.env`

### Method 2: Using Direct SQL

If the seed script fails due to connection issues, you can run the SQL directly:

```bash
# Connect to your PostgreSQL database
psql -U postgres -d cybersecurity_training

# Then run:
\i backend/prisma/migrations/add_test_users.sql
```

Or if using Supabase SQL Editor:
1. Open your Supabase project
2. Go to SQL Editor
3. Copy and paste the contents of `backend/prisma/migrations/add_test_users.sql`
4. Run the query

### Method 3: Using the TypeScript Script

```bash
cd backend
npx ts-node scripts/create-test-users.ts
```

## Verification

After creating the users, verify they were created correctly:

```bash
# Using psql
psql -U postgres -d cybersecurity_training -c "SELECT email, username, role FROM users WHERE email LIKE '%@lethcon.com';"
```

Expected output:
```
         email          |    username     |  role   
------------------------+-----------------+---------
 admin@lethcon.com      | lethcon_admin   | ADMIN
 creator@lethcon.com    | lethcon_creator | CREATOR
 user@lethcon.com       | lethcon_user    | USER
```

## Testing Login & Redirect

1. Navigate to `http://localhost:3000/login`
2. Try logging in with each user:
   - **Admin user** should redirect to `/admin`
   - **Creator user** should redirect to `/dashboard/creator`
   - **Regular user** should redirect to `/dashboard`

## Password Hash

All three users use the same password (`Password123`) for testing purposes.
The bcrypt hash used is: `$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWV.H3SC`

## Troubleshooting

### Database Connection Issues

If you're getting database connection errors:

1. Check if your database is running:
   ```bash
   docker ps | grep postgres
   ```

2. Verify your `backend/.env` file has the correct DATABASE_URL

3. For local development with docker-compose:
   ```bash
   # Start the database
   docker-compose up -d postgres
   
   # Wait for it to be ready
   docker-compose logs -f postgres
   ```

4. For Supabase, ensure your connection string and credentials are correct

### Permission Issues

If you get permission errors, make sure:
- Your database user has INSERT permissions
- The `users` table exists (run migrations first if needed)
- The table schema matches the Prisma schema

## Security Note

⚠️ **These are test accounts only!** Do not use these credentials in production. 
- Change the passwords before deploying to production
- Use strong, unique passwords
- Consider using environment-specific test accounts
