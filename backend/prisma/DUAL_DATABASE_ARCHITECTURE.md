# Prisma Schema - Dual Database Architecture

## Architecture Decision

| Database | Schema File | Purpose | Models |
|----------|-------------|---------|--------|
| **Neon** | `neon.prisma` | User Management & Auth | User, RefreshToken, Token, api_keys |
| **Local** | `local.prisma` | Labs & Learning Content | Lab, LearningPath, Challenge, etc. |

## Issues Found and Fixes Needed

### Issue 1: local.prisma has duplicate User/Auth models
**Problem**: `local.prisma` defines User, RefreshToken, Token models that should only be in Neon.

**Fix**: Remove User, RefreshToken, Token from local.prisma. Reference userId as String in lab-related models.

### Issue 2: Certificate, Enrollment, LabSession, UserProgress have User relations
**Problem**: These models in local.prisma reference User as a relation, but User is in Neon.

**Fix**: Change relations to plain `userId String` fields that reference Neon user IDs.

## Implementation Plan

1. Remove from local.prisma:
   - User model
   - RefreshToken model  
   - Token model
   - UserRole enum (keep if used elsewhere)
   - TokenType enum (keep if used elsewhere)

2. Update in local.prisma:
   - Certificate: remove User relation, add `userId String`
   - Enrollment: remove User relation, add `userId String`
   - LabSession: remove User relation, add `userId String`
   - UserProgress: remove User relation, add `userId String`

3. Keep in local.prisma (lab-specific only):
   - Lab, LearningPath, LearningModule, Lesson
   - Challenge, LabInstance, ChallengeSubmission
   - Category, Achievement, LabCategory, SystemConfig
   - Difficulty, ProgressStatus, SessionStatus enums

