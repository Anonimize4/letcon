# LETHCON Authentication Flow

## Overview

The LETHCON platform implements a complete authentication system with:
- **Backend**: Node.js/Express API (deployed on Render)
- **Database**: PostgreSQL via Prisma ORM
- **Frontend**: React/Vite application

## Login Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          LETHCON AUTHENTICATION FLOW                            │
└─────────────────────────────────────────────────────────────────────────────────┘

    FRONTEND (React)                    BACKEND (Express)                  DATABASE
    ──────────────                      ────────────────                    ─────────
         │                                    │                                  │
         │  1. User submits login form        │                                  │
         │  (email + password)               │                                  │
         │ ─────────────────────────────────>│                                  │
         │                                    │                                  │
         │                                    │  2. Validate credentials          │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │                                    │  3. Find user by email           │
         │                                    │     (Prisma Query)               │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │                                    │  4. Compare password with bcrypt │
         │                                    │     (bcrypt.compare)             │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │                                    │  5. Generate JWT tokens          │
         │                                    │     • Access Token (15 min)      │
         │                                    │     • Refresh Token (7 days)     │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │                                    │  6. Store refresh token          │
         │                                    │     (RefreshToken table)          │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │  7. Return tokens + user data     │                                  │
         │     ◦ accessToken                 │                                  │
         │     ◦ refreshToken                │                                  │
         │     ◦ user (id, email, role)     │                                  │
         │ <──────────────────────────────────│                                  │
         │                                    │                                  │
         │  8. Store tokens in localStorage  │                                  │
         │     ◦ accessToken                 │                                  │
         │     ◦ refreshToken                │                                  │
         │                                    │                                  │
         │  9. Redirect based on role:        │                                  │
         │     • ADMIN → /admin              │                                  │
         │     • CREATOR → /dashboard/creator│                                  │
         │     • USER → /dashboard            │                                  │
         │                                    │                                  │
         ▼                                    ▼                                  ▼


┌─────────────────────────────────────────────────────────────────────────────────┐
│                          PROTECTED ROUTE ACCESS FLOW                             │
└─────────────────────────────────────────────────────────────────────────────────┘

    API REQUEST                        BACKEND MIDDLEWARE                     DATABASE
    ────────────                       ───────────────────                    ─────────
         │                                    │                                  │
         │  1. API Request with              │                                  │
         │     Authorization header           │                                  │
         │     "Bearer <access_token>"       │                                  │
         │ ─────────────────────────────────>│                                  │
         │                                    │                                  │
         │                                    │  2. Extract token from header     │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │                                    │  3. Verify JWT signature          │
         │                                    │     (jwt.verify)                 │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │                                    │  4. Decode userId from token     │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │                                    │  5. Query user from database     │
         │                                    │     (Prisma Query)               │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │                                    │            ▼                     │
         │                                    │  6. Check role permissions        │
         │                                    │     (authorize middleware)       │
         │                                    │ ────────────────────────────────  │
         │                                    │            │                     │
         │         7. Return response         │            │                     │
         │         ◦ Success: 200 OK         │            │                     │
         │         ◦ Error: 401/403          │            │                     │
         │ <──────────────────────────────────│            │                     │
         │                                    │                                  │
         ▼                                    ▼                                  ▼


┌─────────────────────────────────────────────────────────────────────────────────┐
│                          TOKEN REFRESH FLOW                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

    FRONTEND                           BACKEND                                DATABASE
    ──────────                         ────────                               ─────────
         │                                   │                                    │
         │  1. Detect expired access token   │                                    │
         │     (401 error or time check)     │                                    │
         │ ─────────────────────────────────>│                                    │
         │                                   │                                    │
         │  2. POST /auth/refresh-token      │                                    │
         │     with refreshToken             │                                    │
         │ ─────────────────────────────────>│                                    │
         │                                   │                                    │
         │                                   │  3. Validate refresh token         │
         │                                   │     (check in database)            │
         │                                   │ ────────────────────────────────    │
         │                                   │            │                        │
         │                                   │            ▼                        │
         │                                   │  4. Generate new access token     │
         │                                   │ ────────────────────────────────    │
         │                                   │            │                        │
         │                                   │            ▼                        │
         │                                   │  5. Invalidate old refresh token   │
         │                                   │     (if single-session)           │
         │                                   │ ────────────────────────────────    │
         │                                   │            │                        │
         │                                   │            ▼                        │
         │  6. Return new access token      │                                    │
         │ <─────────────────────────────────│                                    │
         │                                   │                                    │
         │  7. Update localStorage           │                                    │
         │     with new accessToken          │                                    │
         │                                   │                                    │
         ▼                                   ▼                                    ▼
```

## File Structure

### Frontend Authentication Files

```
frontend/src/
├── lib/
│   └── postgres.ts              # PostgreSQL client configuration
├── contexts/
│   └── AuthContext.tsx          # React Context for global auth state
├── components/
│   └── auth/
│       └── ProtectedRoute.tsx   # Route protection with role checking
├── pages/
│   └── auth/
│       ├── LoginPage.tsx        # Login form
│       ├── RegisterPage.tsx      # Registration form
│       └── ForgotPasswordPage.tsx
└── routes.tsx                   # Route definitions with protection
```

### Backend Authentication Files

```
backend/src/
├── controllers/
│   └── auth/
│       ├── login.controller.ts       # Login logic
│       ├── register.controller.ts     # Registration logic
│       ├── verify-email.controller.ts
│       ├── forgot-password.controller.ts
│       ├── reset-password.controller.ts
│       └── token.controller.ts       # Token refresh logic
├── middleware/
│   └── auth.middleware.ts      # JWT verification & role authorization
├── routes/
│   └── v1/
│       └── auth.routes.ts      # Auth API routes
├── schemas/
│   └── auth.validation.ts      # Request validation
└── config/
    ├── env.ts                  # Environment configuration
    └── jwt.ts                  # JWT settings
```

## Database Schema

### Users Table
```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  username      String         @unique
  password      String         // bcrypt hashed
  firstName     String?
  lastName      String?
  role          UserRole       @default(USER)
  avatar        String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  lastLoginAt   DateTime?
  refreshTokens RefreshToken[]
}

enum UserRole {
  USER
  CREATOR
  ADMIN
  INSTRUCTOR
  MODERATOR
}
```

### RefreshToken Table
```prisma
model RefreshToken {
  id        String    @id @default(cuid())
  token     String    @unique
  userId    String
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime  @default(now())
  user      User      @relation(fields: [userId], references: [id])
}
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/logout` | Logout (revoke refresh token) |
| POST | `/api/v1/auth/logout-all` | Logout from all devices |
| POST | `/api/v1/auth/refresh-token` | Refresh access token |
| GET | `/api/v1/auth/verify-email/:token` | Verify email |
| POST | `/api/v1/auth/forgot-password` | Request password reset |
| POST | `/api/v1/auth/reset-password` | Reset password |

### Request/Response Examples

#### Login Request
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@lethcon.com",
  "password": "Password123"
}
```

#### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "admin@lethcon.com",
      "username": "lethcon_admin",
      "firstName": "Admin",
      "lastName": "User",
      "role": "ADMIN"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Environment Configuration

### Required Environment Variables

```env
# Backend (.env)
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
CORS_ORIGIN=http://localhost:3000

# Frontend (.env)
VITE_API_URL=http://localhost:5000/api/v1
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_WS_URL=ws://localhost:5000
```

## Deployment Architecture

### Development (Local)
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
Database: PostgreSQL (localhost:5432)
```

### Production (Render)
```
Frontend: https://lethcon.vercel.app (or similar)
Backend:  https://lethcon-api.onrender.com
Database: PostgreSQL
```

### Docker Production Stack
```
┌─────────────────────────────────────────────────────────┐
│                    Production Stack                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────┐     ┌─────────┐     ┌─────────────┐     │
│   │  Nginx  │────▶│ Backend │────▶│ PostgreSQL  │     │
│   │   (80)  │     │  (5000) │     │  (PostgreSQL) │   │
│   └─────────┘     └─────────┘     └─────────────┘     │
│        │              │                                  │
│        ▼              ▼                                  │
│   ┌─────────┐   ┌─────────┐                            │
│   │Frontend │   │ Docker  │                            │
│   │  (3000) │   │  Host   │                            │
│   └─────────┘   └─────────┘                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Security Features

1. **Password Hashing**: bcrypt with 12 rounds
2. **Token Security**:
   - Access tokens: 15-minute expiry
   - Refresh tokens: 7-day expiry, stored in database
3. **Role-Based Access Control (RBAC)**:
   - Protected routes with role validation
   - Hierarchy: ADMIN > CREATOR/INSTRUCTOR/MODERATOR > USER
4. **CORS Protection**: Configured allowed origins
5. **Rate Limiting**: Prevents brute force attacks

## Login Page Flow Steps

1. **User visits `/login`** → Render `LoginPage.tsx`
2. **User enters credentials** → Form state updated
3. **User clicks "Sign In"** → `handleSubmit` called
4. **AuthContext.login()** → Calls backend API
5. **Backend validates** → Password check via bcrypt
6. **Backend generates tokens** → JWT access + refresh
7. **Tokens stored** → localStorage + RefreshToken table
8. **User redirected** → Based on role (ADMIN → /admin, etc.)
9. **Protected routes** → `ProtectedRoute` checks auth state
10. **Subsequent requests** → Include Bearer token in header

