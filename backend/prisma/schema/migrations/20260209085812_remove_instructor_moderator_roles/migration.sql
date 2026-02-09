-- AlterEnum
ALTER TYPE "UserRole" RENAME TO "UserRole_old";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'LABCREATOR');

-- Update existing users with removed roles to USER (safe default)
UPDATE "users" SET "role" = 'USER' WHERE "role" IN ('INSTRUCTOR', 'MODERATOR');

-- Drop default constraint first
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole" USING "role"::text::"UserRole";

-- Set default value for the new enum type
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropEnum
DROP TYPE "UserRole_old";
