-- Apply Recorded Field Migration
-- Run this script manually when Neon database connection is restored
-- Usage: psql $NEON_DATABASE_URL < apply-recorded-field-migration.sql

-- Add the recorded column to users table
ALTER TABLE "users" ADD COLUMN "recorded" BOOLEAN NOT NULL DEFAULT false;

-- Update existing LABCREATOR users to be recorded
UPDATE "users" SET "recorded" = true WHERE "role" = 'LABCREATOR';

-- Optional: Set some admin users as recorded for testing
UPDATE "users" SET "recorded" = true WHERE "role" = 'ADMIN' AND "email" LIKE '%admin%';

COMMIT;

-- Verification query (optional)
SELECT id, email, username, role, recorded FROM "users" WHERE role IN ('LABCREATOR', 'ADMIN');
