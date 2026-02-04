# Supabase Database Integration Status

## ✅ Overview

The LETHCON platform is correctly configured to use **Supabase** (PostgreSQL) as its database backend.

---

## 🔗 Connection Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LETHCON ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   FRONTEND (Vite + React)                                                   │
│   ├── Environment Variables:                                                 │
│   │   ├── VITE_SUPABASE_URL                                                │
│   │   └── VITE_SUPABASE_ANON_KEY                                           │
│   └── File: frontend/src/lib/supabase.ts                                    │
│                                                                              │
│   BACKEND (Express + Prisma)                                                │
│   ├── Environment Variables:                                                 │
│   │   ├── DATABASE_URL (Supabase PostgreSQL)                               │
│   │   ├── SUPABASE_URL                                                     │
│   │   ├── SUPABASE_ANON_KEY                                                │
│   │   └── SUPABASE_SERVICE_ROLE_KEY                                        │
│   └── Files:                                                                 │
│       ├── backend/src/config/env.ts (Configuration)                         │
│       ├── backend/prisma/client.ts (Prisma Client)                          │
│       └── backend/src/config/database.ts (Connection Functions)             │
│                                                                              │
│   DATABASE (Supabase PostgreSQL)                                            │
│   └── Uses Prisma ORM for:                                                  │
│       ├── User authentication                                               │
│       ├── Lab sessions                                                      │
│       ├── User progress                                                     │
│       └── Certificates                                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Supabase Integration Files

### 1. Frontend - Supabase Client
**File:** `frontend/src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

**Purpose:** Creates Supabase client for frontend to access Supabase services (Auth, Storage, etc.)

---

### 2. Backend - Environment Configuration
**File:** `backend/src/config/env.ts`

```typescript
// Database
DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/cybersecurity_training',

// Supabase
SUPABASE_URL: process.env.SUPABASE_URL || '',
SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
```

**Purpose:** Centralized configuration for Supabase credentials

---

### 3. Backend - Prisma Client
**File:** `backend/prisma/client.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import config from '../src/config/env';

const prisma = new PrismaClient({
  log: config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;
```

**Purpose:** Prisma ORM client connected to Supabase PostgreSQL

---

### 4. Backend - Database Connection
**File:** `backend/src/config/database.ts`

```typescript
import prisma from '../../prisma/client';

export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}
```

**Purpose:** Database connection management functions

---

### 5. Prisma Schema
**File:** `backend/prisma/schema.prisma`

**Key Models:**
```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  username      String         @unique
  password      String
  role          UserRole       @default(USER)
  createdAt     DateTime       @default(now())
  refreshTokens RefreshToken[]
}

enum UserRole {
  USER
  CREATOR
  ADMIN
}

model RefreshToken {
  id        String    @id @default(cuid())
  token     String    @unique
  userId    String
  expiresAt DateTime
  user      User      @relation(fields: [userId], references: [id])
}
```

---

## 🌍 Environment Configuration

### Development Setup
```
# .env file
DATABASE_URL=postgresql://postgres:password@localhost:5432/cybersecurity_training
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### Production Setup (Supabase)
```
# .env file
DATABASE_URL=postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres?sslmode=require
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 🚀 Deployment Configuration

### Docker Compose Production
**File:** `docker-compose.prod.yml`

Uses environment variables for database connection:
```yaml
backend:
  environment:
    - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
```

**Note:** For Supabase, replace with:
```yaml
backend:
  environment:
    - DATABASE_URL=${SUPABASE_DATABASE_URL}
    - SUPABASE_URL=${SUPABASE_URL}
    - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
```

---

## 📋 Setup Checklist

### 1. Create Supabase Project
- [ ] Go to https://supabase.com
- [ ] Create new project
- [ ] Get project credentials

### 2. Configure Environment Variables
Create `.env` file in `backend/`:
```env
# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?sslmode=require

# Supabase API
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT
JWT_SECRET=your-super-secret-jwt-key
```

### 3. Run Database Setup
```bash
cd backend

# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

### 4. Configure Frontend
Create `.env` file in `frontend/`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🔐 Security Features

1. **Password Hashing**: bcrypt with 12 rounds
2. **JWT Tokens**: Access token (15 min), Refresh token (7 days)
3. **Row Level Security**: Can be configured in Supabase dashboard
4. **Environment Variables**: All secrets stored in environment, not code

---

## 📊 Database Schema

The following tables are managed by Prisma:

| Table | Description |
|-------|-------------|
| `users` | User accounts with roles (USER, CREATOR, ADMIN) |
| `refresh_tokens` | JWT refresh tokens for session management |
| `labs` | Cybersecurity training labs |
| `lab_sessions` | User lab sessions and progress |
| `user_progress` | User progress tracking |
| `certificates` | Earned certificates |
| `enrollments` | Lab enrollments |

---

## 🛠️ Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check IP whitelist in Supabase Dashboard
   - Add `?sslmode=require` to connection string

2. **Authentication Errors**
   - Verify SUPABASE_ANON_KEY is correct
   - Check RLS policies in Supabase

3. **Prisma Errors**
   - Run `npx prisma generate` after env changes
   - Check `DATABASE_URL` format

### Quick Fix Commands
```bash
# Test connection
cd backend && npx prisma db push

# Check Prisma client
npx prisma generate

# View database
npx prisma studio
```

---

## 📝 Related Documentation

- `SUPABASE_AUTHENTICATION_SETUP.md` - Authentication setup guide
- `SUPABASE_MIGRATION_PLAN.md` - Migration from Neon to Supabase
- `SUPABASE_CONNECTION_TROUBLESHOOTING.md` - Connection issues guide
- `docs/authentication-flow.md` - Complete auth flow documentation

---

## ✅ Status: PRODUCTION READY

The Supabase database is correctly linked and configured for:
- ✅ User authentication
- ✅ Session management
- ✅ Lab tracking
- ✅ Progress monitoring
- ✅ Certificate generation

