# Actors Implementation Summary

## Overview
The LETHCON cybersecurity training platform successfully implements three main actors with distinct roles, permissions, and user experiences:

1. **Users** (USER role)
2. **Creators** (CREATOR role) 
3. **Administrators** (ADMIN role)

## Database Schema Implementation

### User Model with Role-Based Access
```prisma
enum UserRole {
  USER
  CREATOR
  ADMIN
  INSTRUCTOR
  MODERATOR
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  username      String         @unique
  password      String
  firstName     String?
  lastName      String?
  role          UserRole       @default(USER)
  // ... other fields
}
```

## Backend Implementation

### Authentication & Authorization Middleware
- **Authentication**: JWT-based authentication with `authenticate` middleware
- **Role-based Authorization**: `authorize` middleware supporting single and multiple role checks
- **Role Hierarchy**: Implemented in both backend and frontend with proper access control

### API Route Protection
```typescript
// Admin-only routes
router.use(authenticate);
router.use(authorize('admin'));

// Creator and Admin routes
router.post('/creator/labs', authorize(['admin', 'creator']), ...);
```

## Frontend Implementation

### Role-Based Route Protection
```typescript
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>

<ProtectedRoute requiredRole={['admin', 'creator']}>
  <LabWizard />
</ProtectedRoute>
```

### Role Hierarchy System
```typescript
const roleHierarchy: Record<string, number> = {
  'user': 1,
  'creator': 2,
  'pro': 2,
  'admin': 3,
  'instructor': 2,
  'moderator': 2,
};
```

## Actor Details

### 1. Users (USER role)

**Access Level**: Basic platform access
**Credentials**: `demo@cybersectraining.com` / `User@2024!`

**Features**:
- Dashboard with basic functionality
- Access to free labs and learning paths
- Profile management
- Community features (forum, leaderboard)
- Challenge participation
- Upgrade prompts to premium features

**Routes Available**:
- `/dashboard` - Basic dashboard
- `/learning` - Learning paths
- `/challenges` - Challenge participation
- `/community/*` - Community features
- `/profile` - Profile management

**Restrictions**:
- Cannot create labs
- Limited access to premium content
- No administrative functions

### 2. Creators (CREATOR role)

**Access Level**: Content creation capabilities
**Credentials**: `creator@cybersectraining.com` / `Creator@2024!`

**Features**:
- All user features
- Lab creation wizard (`/dashboard/create`)
- Lab management and editing
- Content creation tools
- Analytics for created content

**Routes Available**:
- All user routes
- `/dashboard/create` - Lab creation wizard
- `/dashboard/creator` - Creator dashboard

**Backend Access**:
- POST `/api/v1/admin/creator/labs` - Create labs
- GET `/api/v1/admin/creator/labs` - Get creator labs
- PUT `/api/v1/admin/creator/labs/:id` - Update labs
- DELETE `/api/v1/admin/creator/labs/:id` - Delete labs

### 3. Administrators (ADMIN role)

**Access Level**: Full system control
**Credentials**: `admin@cybersectraining.com` / `Admin@2024!`

**Features**:
- All creator and user features
- Complete admin dashboard
- User management
- System monitoring
- Content moderation
- Database management
- Security center
- Analytics and reporting
- Docker container management
- Audit logs

**Routes Available**:
- All user and creator routes
- `/admin/*` - Complete admin interface
  - `/admin/users` - User management
  - `/admin/content` - Content management
  - `/admin/monitor` - System monitoring
  - `/admin/security` - Security center
  - `/admin/analytics` - Platform analytics
  - `/admin/database` - Database management
  - `/admin/audit` - Audit logs
  - `/admin/docker` - Docker management

**Backend Access**:
- All creator endpoints
- Full admin API access
- System-level operations
- User role management
- Platform configuration

## Seed Data Implementation

The system includes pre-configured accounts for testing:

```typescript
// Admin user
{
  email: 'admin@cybersectraining.com',
  username: 'admin',
  password: 'Admin@2024!',
  role: 'ADMIN'
}

// Creator user
{
  email: 'creator@cybersectraining.com',
  username: 'creator',
  password: 'Creator@2024!',
  role: 'CREATOR'
}

// Demo user
{
  email: 'demo@cybersectraining.com',
  username: 'demo',
  password: 'User@2024!',
  role: 'USER'
}
```

## Security Implementation

### Authentication Flow
1. JWT tokens with user role embedded
2. Role verification on protected routes
3. Automatic token refresh
4. Secure password hashing with bcrypt

### Authorization Checks
- Backend middleware validates roles before API access
- Frontend route guards prevent unauthorized navigation
- Role hierarchy ensures higher roles can access lower role features
- Granular permissions for specific operations

## User Experience Differences

### Dashboard Variations
- **Users**: Basic dashboard with upgrade prompts
- **Creators**: Enhanced dashboard with creation tools
- **Admins**: Comprehensive admin interface

### Feature Access
- **Users**: Read-only access to content
- **Creators**: Read + Create access to labs
- **Admins**: Full CRUD access to all resources

## Additional Roles Supported

The system also supports:
- **INSTRUCTOR**: Teaching-focused role
- **MODERATOR**: Community moderation role
- **PRO**: Premium user role (for subscription features)

## Conclusion

The LETHCON platform successfully implements a robust role-based access control system with three primary actors:

✅ **Users** - Basic platform access with learning capabilities
✅ **Creators** - Content creation and management tools  
✅ **Administrators** - Complete system control and administration

Each role has:
- Distinct authentication credentials
- Appropriate level of access control
- Tailored user interface
- Proper backend API protection
- Clear separation of responsibilities

The implementation follows security best practices and provides a scalable foundation for additional roles and permissions as the platform grows.
