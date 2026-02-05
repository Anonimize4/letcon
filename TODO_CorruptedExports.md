# Plan to Fix Corrupted Export Statements

## Problem Analysis
103 files in the backend have corrupted export statements:
- They contain `export default backend/src/...` instead of proper TypeScript exports
- TypeScript interprets `backend`, `src`, `utils`, etc. as undefined variable names
- This causes TS2304: Cannot find name errors during compilation

## Files with Corrupted Exports (by category)

### Utils (7 files)
- `src/utils/flagGenerator.ts`
- `src/utils/logger.ts`
- `src/utils/validators.ts`
- `src/utils/constants/labStatus.ts`
- `src/utils/constants/roles.ts`
- `src/utils/constants/difficulty.ts`
- `src/utils/types/global.d.ts`
- `src/utils/helpers/flagGenerator.ts`
- `src/utils/helpers/errorHandler.ts`
- `src/utils/helpers/validators.ts`
- `src/utils/helpers/logger.ts`

### Services (~35 files)
- Various services under `src/services/*`

### Middleware (5 files)
- `src/middleware/validation.middleware.ts`
- `src/middleware/role.middleware.ts`
- `src/middleware/rateLimit.middleware.ts`
- `src/middleware/payment.middleware.ts`
- `src/middleware/logger.middleware.ts`

### Routes (~15 files)
- `src/routes/meeting.routes.ts`
- `src/routes/payment.routes.ts`
- `src/routes/docker.ts`

### Controllers (~15 files)
- Various controllers

### Models (5 files)
- `src/models/Lab.ts`
- `src/models/Challenge.ts`
- `src/models/User.ts`
- `src/models/DockerSession.ts`
- `src/models/UserProgress.ts`

### Docker (4 files)
- `src/docker/securityConfig.ts`
- `src/docker/cleanupScheduler.ts`
- `src/docker/queueManager.ts`
- `src/docker/dockerUtils.ts`

### Scripts (2 files)
- `src/scripts/backup-docker.ts`

### Schemas (5 files)
- `src/schemas/user.schema.ts`
- `src/schemas/admin.schema.ts`
- `src/schemas/challenge.schema.ts`
- `src/schemas/lab.schema.ts`
- `src/schemas/auth.schema.ts`

### Jobs (4 files)
- `src/jobs/containerCleanup.job.ts`
- `src/jobs/imageCleanup.job.ts`
- `src/jobs/queueProcessor.job.ts`
- `src/jobs/sessionExpiry.job.ts`

## Solution
For each corrupted file:
1. Remove the corrupted `export default backend/src/...` line
2. Add appropriate placeholder content with proper exports

## Files to Keep (Working Files)
These files have actual code and don't need fixing:
- `src/utils/helpers/logger.ts` - has proper winston logger
- `src/app.ts` - has actual Express app code
- `src/server.ts` - has actual server code
- `src/health.ts` - has health check code

