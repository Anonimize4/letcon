-- Add LETHCON test users
-- Run this SQL directly on your database

-- Note: Passwords are hashed using bcrypt with salt rounds 12
-- Plain text passwords: Password123

-- Admin User: admin@lethcon.com / Password123
INSERT INTO users (id, email, username, password, "firstName", "lastName", role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@lethcon.com',
  'lethcon_admin',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWV.H3SC', -- Password123
  'Admin',
  'LETHCON',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "updatedAt" = NOW();

-- Regular User: user@lethcon.com / Password123
INSERT INTO users (id, email, username, password, "firstName", "lastName", role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'user@lethcon.com',
  'lethcon_user',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWV.H3SC', -- Password123
  'User',
  'LETHCON',
  'USER',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "updatedAt" = NOW();

-- Creator User: creator@lethcon.com / Password123
INSERT INTO users (id, email, username, password, "firstName", "lastName", role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'creator@lethcon.com',
  'lethcon_creator',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWV.H3SC', -- Password123
  'Creator',
  'LETHCON',
  'CREATOR',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "updatedAt" = NOW();

-- Display created users
SELECT email, username, role, "createdAt" FROM users WHERE email LIKE '%@lethcon.com' ORDER BY role;
