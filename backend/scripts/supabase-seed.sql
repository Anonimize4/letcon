-- Supabase Seeding Script for LETHCON Platform
-- This script creates initial users, admins, and lab categories

-- Insert LETHCON Admin User
INSERT INTO users (id, email, username, password, first_name, last_name, role, created_at, updated_at)
VALUES (
    '550e8400-e29b-41d4-a716-44665544044',
    'admin@lethcon.com',
    'lethcon_admin',
    '$2b$12$LQv3c1yqBWVHxkd0LHAuOa/8Fz2v7Q2J8K5N6vQ5Y2O7Q',
    'Admin',
    'LETHCON',
    'ADMIN',
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert LETHCON Regular User
INSERT INTO users (id, email, username, password, first_name, last_name, role, created_at, updated_at)
VALUES (
    '550e8400-e29b-41d4-a716-44665544045',
    'user@lethcon.com',
    'lethcon_user',
    '$2b$12$LQv3c1yqBWVHxkd0LHAuOa/8Fz2v7Q2J8K5N6vQ5Y2O7Q',
    'User',
    'LETHCON',
    '
