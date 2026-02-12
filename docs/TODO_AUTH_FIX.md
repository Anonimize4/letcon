# Auth & Database Fix Plan

## Issues Identified:
1. PostgreSQL connection closed error - Neon DB connection dropping
2. Duplicate Prisma client configurations
3. Missing User model in local schema
4. Poor error handling in auth controllers

## Fix Tasks:

### 1. Fix Database Connection (`backend/src/config/database.ts`)
- [x] Add connection retry logic with exponential backoff
- [x] Add connection keep-alive settings
- [x] Improve error logging

### 2. Remove Duplicate Prisma Client (`backend/prisma/client.ts`)
- [x] Delete the duplicate client file

### 3. Add User Model to Local Schema (`backend/prisma/schema/local.prisma`)
- [x] Add User model
- [x] Add RefreshToken model
- [x] Add Token model

### 4. Improve Auth Controller Error Handling
- [x] Update login.controller.ts with safeQuery wrapper
- [x] Update register.controller.ts with safeQuery wrapper

### 5. Regenerate Prisma Clients
- [ ] Run prisma generate for local schema
- [ ] Run prisma generate for neon schema

### 6. Test the Fix
- [ ] Start the backend server
- [ ] Test login endpoint
- [ ] Test register endpoint

