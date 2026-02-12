# Prisma 7 Upgrade Plan

## Objective
Upgrade from Prisma 6.x to Prisma 7 and move URL logic to prisma.config.ts

## Tasks

### Phase 1: Update Dependencies
- [x] 1.1 Update `backend/package.json` - Upgrade prisma and @prisma/client to 7.x
- [ ] 1.2 Run `npm install` in backend directory

### Phase 2: Update Configuration
- [x] 2.1 Update `prisma.config.ts` at root - Add datasource URL configuration
- [x] 2.2 Update `backend/prisma/schema.prisma` - Remove url from datasource block

### Phase 3: Regenerate Prisma Client
- [ ] 3.1 Run `prisma generate` to regenerate client
- [ ] 3.2 Verify the generation succeeds

### Phase 4: Test
- [ ] 4.1 Test database connection
- [ ] 4.2 Verify build works

## Summary of Changes

### backend/package.json
```json
{
  "prisma": "^7.0.0",
  "@prisma/client": "^7.0.0"
}
```

### prisma.config.ts (at root)
```typescript
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "backend/prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```

### backend/prisma/schema.prisma
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
}
```

