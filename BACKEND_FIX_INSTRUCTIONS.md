# Backend Authentication Fix Instructions

## Problem Summary

The backend Docker container is running a simple `index.js` file that doesn't have the authentication endpoints. This is why you're getting `"Unexpected token '<', "<!DOCTYPE "..."` error - the API endpoints don't exist, so the frontend receives an HTML 404 page instead of JSON.

## Solution Options

### Option 1: Replace the Running Backend (Quick Fix)

1. **Copy the proper backend file into the Docker container:**
   ```bash
   docker cp backend/index-with-auth.js docker-train-backend-1:/app/index.js
   ```

2. **Restart the backend container:**
   ```bash
   docker restart docker-train-backend-1
   ```

3. **Verify it's working:**
   ```bash
   curl -X POST http://localhost:5000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test"}' 
   ```

### Option 2: Run Backend Locally (For Development)

1. **Set up environment variables:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

2. **Install dependencies (if not done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   # Option A: Use the simple auth server
   node index-with-auth.js

   # Option B: Fix TypeScript issues and use the full server
   npm run dev
   ```

4. **Update frontend to use local backend:**
   - The frontend already proxies to `http://localhost:5000`
   - Make sure the backend is running on port 5000

### Option 3: Create Test Users in Database (Required for Either Option)

You need to add the test users to your PostgreSQL database:

#### Using PostgreSQL Client:

1. Connect to your PostgreSQL database
2. Navigate to: **SQL Editor**
3. Run this SQL:

```sql
-- Create test users with proper roles
-- Password for all: Password123
-- Hashed using bcrypt with 12 rounds

INSERT INTO users (id, email, username, password, "firstName", "lastName", role, "createdAt", "updatedAt")
VALUES 
  (
    gen_random_uuid(),
    'admin@lethcon.com',
    'lethcon_admin',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWV.H3SC',
    'Admin',
    'LETHCON',
    'ADMIN',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'user@lethcon.com',
    'lethcon_user',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWV.H3SC',
    'User',
    'LETHCON',
    'USER',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'creator@lethcon.com',
    'lethcon_creator',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWV.H3SC',
    'Creator',
    'LETHCON',
    'CREATOR',
    NOW(),
    NOW()
  )
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "updatedAt" = NOW();

-- Verify users were created
SELECT email, username, role FROM users WHERE email LIKE '%@lethcon.com';
```

## Testing the Fix

After completing the steps above, test the login:

1. **Open the application:**
   ```
   http://localhost:3000/login
   ```

2. **Try logging in with:**
   - **Admin:** admin@lethcon.com / Password123 → Should redirect to `/admin`
   - **User:** user@lethcon.com / Password123 → Should redirect to `/dashboard`
   - **Creator:** creator@lethcon.com / Password123 → Should redirect to `/dashboard/creator`

## Verification Commands

```bash
# Check if backend is running
curl http://localhost:5000/health

# Test login endpoint
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lethcon.com","password":"Password123"}'

# Check Docker logs
docker logs docker-train-backend-1 --tail 50

# Check what's running in the container
docker exec docker-train-backend-1 ps aux
```

## Common Issues & Solutions

### Issue: "Can't reach database server"
**Solution:** Check your `.env` file has the correct PostgreSQL connection string:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/cybersecurity_training
```

### Issue: "Unexpected token '<', "<!DOCTYPE"..."
**Solution:** This means the API endpoint doesn't exist. Follow Option 1 to fix the backend.

### Issue: "Invalid credentials"
**Solution:** Make sure you've created the users in the database (Option 3).

### Issue: CORS errors
**Solution:** The backend should allow `http://localhost:3000`. Check the CORS configuration in the backend code.

## Next Steps

1. **Choose a solution** (Option 1 is quickest)
2. **Create the test users** in PostgreSQL (Option 3)
3. **Test the login** with all three user types
4. **Verify role-based routing** works correctly

## Production Deployment

For production:
1. Fix the TypeScript compilation errors in the backend
2. Build the backend properly: `npm run build`
3. Use the production Dockerfile
4. Set up proper environment variables
5. Use strong passwords (not Password123!)
