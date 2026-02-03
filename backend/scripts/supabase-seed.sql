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
    'USER',
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert LETHCON Creator User
INSERT INTO users (id, email, username, password, first_name, last_name, role, created_at, updated_at)
VALUES (
    '550e8400-e29b-41d4-a716-44665544046',
    'creator@lethcon.com',
    'lethcon_creator',
    '$2b$12$LQv3c1yqBWVHxkd0LHAuOa/8Fz2v7Q2J8K5N6vQ5Y2O7Q',
    'Creator',
    'LETHCON',
    'CREATOR',
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert Lab Categories
INSERT INTO lab_categories (id, name, description, icon, color, created_at, updated_at)
VALUES 
    ('cat-001', 'Web Security', 'Learn about web application vulnerabilities and defenses', '🌐', '#3B82F6', NOW(), NOW()),
    ('cat-002', 'Network Security', 'Master network protocols and security concepts', '🔒', '#10B981', NOW(), NOW()),
    ('cat-003', 'Cryptography', 'Understand encryption and cryptographic protocols', '🔐', '#8B5CF6', NOW(), NOW()),
    ('cat-004', 'System Security', 'Learn operating system and system-level security', '💻', '#F59E0B', NOW(), NOW()),
    ('cat-005', 'Malware Analysis', 'Analyze and understand malicious software', '🦠', '#EF4444', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert Sample Labs (Web Security)
INSERT INTO labs (
    id, title, description, difficulty, docker_image, port, environment, 
    instructions, hints, flag, estimated_time, tags, objectives, 
    prerequisites, category_id, created_at, updated_at, is_active
)
VALUES 
    (
        'lab-001',
        'SQL Injection Basics',
        'Learn fundamentals of SQL injection vulnerabilities and how to prevent them',
        'BEGINNER',
        'cybersec-labs/sql-injection-basic',
        3000,
        environment: {
            DB_HOST: 'localhost',
            DB_NAME: 'vulnerable_app',
        },
        instructions: 'Find and exploit the SQL injection vulnerability to retrieve the flag.',
        hints: [
            'Look for login forms that might be vulnerable',
            'Try using SQL syntax in input fields',
            'Consider using UNION-based injection',
        ],
        flag: '
