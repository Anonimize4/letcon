-- AlterEnum
ALTER TYPE "UserRole" RENAME TO "UserRole_old";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'LABCREATOR');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole" USING "role"::text::"UserRole";

-- DropEnum
DROP TYPE "UserRole_old";
