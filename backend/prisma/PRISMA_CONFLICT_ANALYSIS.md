# Prisma Schema Analysis and Conflict Resolution Plan

## Overview
This document analyzes two Prisma schema files (`neon.prisma` and `local.prisma`) to ensure they work with distinct databases without conflicts.

## Current State Analysis

### 1. Datasource Configuration ✅ NO CONFLICT

| Schema | Environment Variable | Purpose |
|--------|---------------------|---------|
| neon.prisma | `NEON_DATABASE_URL` | Production PostgreSQL on Neon |
| neon.prisma | `NEON_DIRECT_DATABASE_URL` | Direct connection for migrations |
| local.prisma | `LOCAL_DATABASE_URL` | Local development PostgreSQL |

### 2. Generator Configuration ✅ NO CONFLICT

| Schema | Output Path | Client Name |
|--------|-------------|-------------|
| neon.prisma | `../../node_modules/@prisma-user/client` | PrismaUserClient |
| local.prisma | `../../node_modules/@prisma-lab/client` | PrismaLabClient |

### 3. Model Conflicts ⚠️ NEED ATTENTION

#### Completely Shared Models (Same Purpose, Slightly Different Structure)

| Neon Schema | Local Schema | Status |
|-------------|--------------|--------|
| User | User | ⚠️ Similar but local has additional relations |
| RefreshToken | RefreshToken | ✅ Identical |
| Token | Token | ✅ Identical |
| enrollments | Enrollment | ⚠️ Slightly different field names |
| certificates | Certificate | ⚠️ Local has more fields |
| lab_sessions | LabSession | ⚠️ Local has different structure |
| user_progress | UserProgress | ⚠️ Local has different structure |
| labs | Lab | ⚠️ Completely different structure |
| lab_categories | LabCategory | ✅ Similar |

#### Neon-Only Models
- `api_keys` - API keys management
- `system_logs` - Logging system

#### Local-Only Models
- `LearningPath`, `LearningModule`, `Lesson` - Learning content
- `Challenge`, `ChallengeSubmission` - Challenge system
- `LabInstance` - Lab container instances
- `Category` - Hierarchical categories
- `Achievement` - Gamification achievements
- `SystemConfig` - System configuration

### 4. Enum Conflicts ⚠️ NEED ATTENTION

| Enum | Neon | Local | Status |
|------|------|-------|--------|
| UserRole | ✅ | ✅ | Identical |
| TokenType | ✅ | ✅ | Identical |
| Difficulty | ✅ | ✅ | Identical |
| ProgressStatus | ✅ | ✅ | Identical |
| SessionStatus | ✅ | ✅ | Identical |
| - | - | LessonType | Local only |
| - | - | LabStatus | Local only |
| - | - | AchievementType | Local only |
| LogLevel | Neon only | - | Neon only |

## Conflict Resolution Plan

### Phase 1: Rename Conflicting Models in Local Schema

To avoid confusion and potential runtime issues, rename models in `local.prisma` that have the same name but different structures:

#### Option A: Prefix Approach (Recommended)
```prisma
// In local.prisma, rename:
User → LocalUser (or LabUser)
enrollments → LabEnrollments
certificates → LabCertificates
lab_sessions → LabLabSessions
user_progress → LabUserProgress
labs → LabDefinition
lab_categories → LabCategories
```

#### Option B: Keep As-Is with Documentation
Document the differences clearly and ensure application code uses the correct client.

### Phase 2: Recommended Changes

#### 2.1 Add Missing Models to Local Schema (Optional)
If the local database should also have API keys and logging:
```prisma
model api_keys {
  id         String    @id
  name       String
  key        String    @unique
  scopes     String[]
  userId     String?
  isActive   Boolean   @default(true)
  expiresAt  DateTime?
  lastUsedAt DateTime?
  usageCount Int       @default(0)
  createdAt  DateTime  @default(now())
  updatedAt  DateTime
}

model system_logs {
  id        String   @id
  level     LogLevel
  message   String
  metadata  Json?
  userId    String?
  action    String?
  resource  String?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
}

enum LogLevel {
  DEBUG
  INFO
  WARN
  ERROR
  FATAL
}
```

#### 2.2 Add DirectUrl to Local Schema (Optional for migrations)
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("LOCAL_DATABASE_URL")
  directUrl = env("LOCAL_DIRECT_DATABASE_URL")
}
```

### Phase 3: Environment Variables Check

Ensure both `.env` files have the required variables:

```bash
# .env for Neon
NEON_DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neon_db"
NEON_DIRECT_DATABASE_URL="postgres://user:password@ep-xxx.us-east-1.aws.neon.tech/neon_db?sslmode=require"

# .env for Local
LOCAL_DATABASE_URL="postgresql://postgres:password@localhost:5432/lethcon_lab"
```

### Phase 4: Application Code Integration

Ensure the application correctly uses both clients:

```typescript
// Example: Using both clients
import { PrismaClient as NeonClient } from '@prisma-user/client'
import { PrismaClient as LocalClient } from '@prisma-lab/client'

const neonPrisma = new NeonClient()
const localPrisma = new LocalClient()
```

## Recommendations

### Option 1: Keep As-Is (Current State)
✅ Pros:
- Minimal changes required
- Already working for current use case
- Clear separation by client

⚠️ Cons:
- Potential confusion with duplicate model names
- Risk of import confusion in TypeScript

### Option 2: Rename Models in Local Schema
✅ Pros:
- Clearer separation
- No naming conflicts
- Better TypeScript experience

⚠️ Cons:
- Requires migration of local database
- More code changes needed
- Backward compatibility issues

## Decision Required

Please choose an option:
1. **Keep As-Is** - No changes needed, schemas are compatible for distinct databases
2. **Rename Models** - Rename conflicting models in local.prisma for better separation

## Implementation Notes

### If Keeping As-Is:
- Both schemas are compatible with distinct databases
- Ensure different Prisma clients are used in application code
- Document the database purposes clearly

### If Renaming Models:
- Will need to update local.prisma with renamed models
- May need local database migration
- Update all references in application code

