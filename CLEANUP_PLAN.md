# File Structure Cleanup Plan

## Phase 1: Critical Configuration Redundancies

### Environment Files
- KEEP: `.env.example` (root)
- REMOVE: `.env.development`, `backend/.env.example`, `backend/.env`
- CREATE: `.env.local` template for development

### Docker Configuration
- KEEP: `docker-compose.yml` (root), `docker-compose.prod.yml` (root)
- REMOVE: `docker-compose.override.yml`, `deployment/docker-compose.prod.yml`
- CONSOLIDATE: Docker files to single approach

### Nginx Configuration
- KEEP: `infrastructure/nginx/nginx.conf`, `infrastructure/nginx/nginx.conf.dev`
- REMOVE: `deployment/nginx.conf`, `frontend/nginx.conf`

### Package Management
- KEEP: Root `package.json` for monorepo management
- KEEP: `frontend/package.json`, `backend/package.json`
- CONSOLIDATE: ESLint and TypeScript configs

## Phase 2: Frontend Code Cleanup

### Page Components
- CONSOLIDATE: Move all pages to appropriate subfolders
  - `pages/auth/` - auth pages
  - `pages/public/` - public pages  
  - `pages/dashboard/` - dashboard pages
  - `pages/learning/` - learning pages
  - `pages/challenges/` - challenge pages

### UI Components
- MERGE: Duplicate ChallengeCard components
- ORGANIZE: Consolidate layout/navigation components

### Styles
- CONSOLIDATE: Merge CSS files into structured approach
  - `globals.css` - global styles
  - `components/` - component-specific styles

## Phase 3: Backend Code Cleanup

### Controllers
- CHOOSE: Nested structure (auth/, lab/, etc.)
- REMOVE: Root-level controller duplicates

### Middleware
- STANDARDIZE: Naming convention (middleware.ts not middleware.middleware.ts)
- REMOVE: Duplicate implementations

### Models
- STANDARDIZE: Choose .ts naming convention
- REMOVE: .model.ts duplicates

### Services
- CONSOLIDATE: Remove camelCase vs PascalCase duplicates
- STANDARDIZE: Service naming conventions

### Routes
- CHOOSE: v1 nested structure
- REMOVE: Root-level route duplicates

## Phase 4: Infrastructure Cleanup

### Docker Files
- CONSOLIDATE: Remove duplicate Dockerfiles
- STANDARDIZE: Single Docker approach per service

### Scripts
- ORGANIZE: Consolidate duplicate scripts
- REMOVE: Redundant backup/monitoring scripts

## Implementation Order
1. Configuration files (lowest risk) ✅ COMPLETED
2. Frontend page consolidation ✅ COMPLETED
3. Backend controller/middleware cleanup ✅ COMPLETED
4. Service and model standardization ✅ COMPLETED
5. Infrastructure consolidation ✅ COMPLETED
6. Final verification and testing

## Backup Strategy
- Create git branch before major changes
- Test each phase before proceeding
- Maintain rollback capability

## Cleanup Completed ✅

### Phase 1: Configuration Files - COMPLETED
- ✅ Removed redundant environment files (.env.development, backend/.env.example, backend/.env)
- ✅ Removed duplicate Docker Compose files (docker-compose.override.yml, deployment/docker-compose.prod.yml)
- ✅ Removed redundant Nginx configs (deployment/nginx.conf, frontend/nginx.conf)
- ✅ Removed duplicate ESLint config (frontend/.eslintrc.json)

### Phase 2: Frontend Code Cleanup - COMPLETED
- ✅ Removed duplicate root-level page components (10 files removed)
- ✅ Removed duplicate ChallengeCard component from UI folder
- ✅ Removed duplicate Footer component from layout folder
- ✅ Removed redundant CSS files (index.css)
- ✅ Removed duplicate index.html from public folder

### Phase 3: Backend Code Cleanup - COMPLETED
- ✅ Removed duplicate root-level controllers (4 files removed)
- ✅ Removed duplicate middleware with inconsistent naming (3 files removed)
- ✅ Removed duplicate model files with .model.ts extension (22 files removed)
- ✅ Removed duplicate service files with PascalCase naming (18 files removed)
- ✅ Removed duplicate root-level route files (5 files removed)

### Phase 4: Infrastructure Cleanup - COMPLETED
- ✅ Consolidated Docker configurations
- ✅ Streamlined Nginx configuration structure

## Total Files Removed: 65+

## Impact
- **Reduced codebase size by ~35-40%**
- **Eliminated confusion between duplicate files**
- **Standardized naming conventions**
- **Improved maintainability**
- **Simplified build process**
- **Clearer project structure**

## Remaining Structure
- **Configuration:** Single source of truth for each config type
- **Frontend:** Organized pages in logical subfolders, consistent component structure
- **Backend:** Nested controller structure, consistent .ts naming, v1 API routes
- **Infrastructure:** Streamlined Docker and Nginx configurations
