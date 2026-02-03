# Supabase Authentication Setup Guide

This guide walks you through setting up user and admin authentication in Supabase for the LETHCON cybersecurity training platform.

## Overview

The LETHCON platform uses Supabase as its database backend with a comprehensive authentication system that includes:

- **User Roles**: USER, CREATOR, ADMIN, INSTRUCTOR, MODERATOR
- **Secure Password Hashing**: Using bcrypt with 12 rounds
- **Row Level Security (RLS)**: Users can only access their own data
- **JWT Token Authentication**: For API access
- **Session Management**: Refresh tokens and session tracking

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **PostgreSQL Client**: Install `psql` or have Docker available
3. **Node.js**: For running the setup script

## Quick Setup

### 1. Configure Environment Variables

Copy the Supabase example configuration:

```bash
cp backend/.env.supabase-example backend/.env
```

Edit the `.env` file with your Supabase credentials:

```env
# Database Configuration (Supabase Connection Pooler)
DATABASE_URL=postgresql://postgres.mmbcmttkzbmilftkxhkx:YOUR_DATABASE_PASSWORD@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pool_mode=transaction

# Supabase API Configuration
SUPABASE_URL=https://mmbcmttkzbmilftkxhkx.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d
```

### 2. Run Setup Script

Navigate to the backend directory and run the automated setup:

```bash
cd backend
./scripts/setup-supabase-auth.sh
```

This script will:
- ✅ Create the database schema with all necessary tables
- ✅ Set up proper indexes and constraints
- ✅ Configure Row Level Security (RLS) policies
- ✅ Create default users and admins
- ✅ Set up lab categories and sample data

### 3. Verify Setup

The setup script will display the created users and their credentials:

```
🔐 Default Login Credentials:
   Admin: admin@lethcon.com / Password123
   User:  user@lethcon.com / Password123
   Creator: creator@lethcon.com / Password123
   System Admin: admin@cybersectraining.com / Admin@2024!
   Lab Creator: creator@cybersectraining.com / Creator@2024!
   Demo User: demo@cybersectraining.com / User@2024!
```

## User Roles and Permissions

### ADMIN Role
- Full system access
- User management
- Lab creation and management
- System configuration
- Analytics and monitoring

### CREATOR Role
- Create and manage labs
- View analytics for their labs
- Manage lab categories

### USER Role
- Access to available labs
- Progress tracking
- Certificate earning
- Profile management

### INSTRUCTOR Role
- Guide users through labs
- Provide mentoring
- Access to teaching tools

### MODERATOR Role
- Content moderation
- User behavior monitoring
- Community management

## Database Schema

### Core Tables

#### users
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT NOT NULL DEFAULT 'USER',
    avatar TEXT,
    bio TEXT,
    company TEXT,
    location TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);
```

#### lab_sessions
```sql
CREATE TABLE lab_sessions (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    lab_id TEXT NOT NULL,
    container_id TEXT,
    status TEXT DEFAULT 'RUNNING',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    progress FLOAT DEFAULT 0,
    hints_used INTEGER DEFAULT 0,
    time_spent INTEGER DEFAULT 0,
    ip_address TEXT,
    user_agent TEXT,
    FOREIGN KEY (lab_id) REFERENCES labs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Security Features

#### Row Level Security (RLS)
Users can only access their own data:

```sql
-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);

-- Users can only see their own lab sessions
CREATE POLICY "Users can view own lab sessions" ON lab_sessions FOR SELECT USING (auth.uid() = user_id);
```

#### Password Security
- bcrypt hashing with 12 rounds
- Minimum 8 character requirement
- Password strength validation
- Secure password reset flow

## API Authentication

### Login Endpoint
```typescript
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@lethcon.com",
  "password": "Password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-44665544044",
      "email": "admin@lethcon.com",
      "username": "lethcon_admin",
      "role": "ADMIN"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 86400
    }
  }
}
```

### Protected Routes
Use the Bearer token for authenticated requests:

```typescript
Authorization: Bearer <access_token>
```

## Environment Configuration

### Development
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/lethcon_dev
JWT_SECRET=dev-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Production
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:password@your-supabase-db.supabase.co:5432/postgres
JWT_SECRET=super-secure-production-key
CORS_ORIGIN=https://your-domain.com
```

## Migration and Seeding

### Manual Migration
If you prefer to run migrations manually:

```bash
# Run schema migration
psql $DATABASE_URL -f prisma/migrations/20260101000001_supabase_auth_setup.sql

# Run data seeding
psql $DATABASE_URL -f scripts/supabase-seed.sql
```

### Prisma Integration
The platform uses Prisma ORM for type-safe database operations:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    username: 'newuser',
    password: hashedPassword,
    role: 'USER'
  }
});
```

## Testing the Setup

### 1. Test Database Connection
```bash
cd backend
npm run db:connect
```

### 2. Test Authentication
```bash
# Test login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lethcon.com","password":"Password123"}'
```

### 3. Test Protected Route
```bash
# Test protected endpoint with token
curl -X GET http://localhost:5000/api/v1/user/profile \
  -H "Authorization: Bearer <your-token
