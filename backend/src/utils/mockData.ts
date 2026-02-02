/**
 * Mock Login Data for Testing
 * 
 * This file contains mock user credentials for development and testing purposes.
 * Password for all accounts: "Password123"
 * 
 * Note: Passwords are bcrypt hashed with cost factor of 10
 */

// Pre-computed bcrypt hash for "Password123"
// Generated using: bcrypt.hash("Password123", 10)
export const MOCK_PASSWORD_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

/**
 * Admin user credentials
 * Role: ADMIN - Full system access
 */
export const mockAdminUser = {
  email: 'admin@lethcon.com',
  username: 'admin',
  password: 'Password123',
  hashedPassword: MOCK_PASSWORD_HASH,
  firstName: 'Admin',
  lastName: 'User',
  role: 'ADMIN' as const,
  bio: 'System administrator with full access to all platform features.',
  company: 'LETHCON Security',
  location: 'San Francisco, CA',
  website: 'https://lethcon.com'
};

/**
 * Regular user credentials
 * Role: USER - Standard platform access
 */
export const mockRegularUser = {
  email: 'user@lethcon.com',
  username: 'user',
  password: 'Password123',
  hashedPassword: MOCK_PASSWORD_HASH,
  firstName: 'John',
  lastName: 'Doe',
  role: 'USER' as const,
  bio: 'Cybersecurity enthusiast and learning platform user.',
  company: 'Tech Corp',
  location: 'New York, NY',
  website: 'https://example.com'
};

/**
 * Creator user credentials (optional additional mock)
 * Role: CREATOR - Can create labs and challenges
 */
export const mockCreatorUser = {
  email: 'creator@lethcon.com',
  username: 'creator',
  password: 'Password123',
  hashedPassword: MOCK_PASSWORD_HASH,
  firstName: 'Sarah',
  lastName: 'Smith',
  role: 'CREATOR' as const,
  bio: 'Lab and challenge creator specializing in penetration testing.',
  company: 'LETHCON Training',
  location: 'Austin, TX',
  website: 'https://creator.lethcon.com'
};

/**
 * Export all mock users as an array for easy iteration
 */
export const mockUsers = [
  mockAdminUser,
  mockRegularUser,
  mockCreatorUser
];

/**
 * Login credentials for API testing
 * Use these objects directly in POST /api/v1/auth/login requests
 */
export const loginCredentials = {
  admin: {
    email: mockAdminUser.email,
    password: mockAdminUser.password
  },
  user: {
    email: mockRegularUser.email,
    password: mockRegularUser.password
  },
  creator: {
    email: mockCreatorUser.email,
    password: mockCreatorUser.password
  }
};

/**
 * Expected user responses after successful login
 */
export const expectedUserResponses = {
  admin: {
    id: 'admin_user_id',
    email: mockAdminUser.email,
    username: mockAdminUser.username,
    firstName: mockAdminUser.firstName,
    lastName: mockAdminUser.lastName,
    role: mockAdminUser.role
  },
  user: {
    id: 'regular_user_id',
    email: mockRegularUser.email,
    username: mockRegularUser.username,
    firstName: mockRegularUser.firstName,
    lastName: mockRegularUser.lastName,
    role: mockRegularUser.role
  },
  creator: {
    id: 'creator_user_id',
    email: mockCreatorUser.email,
    username: mockCreatorUser.username,
    firstName: mockCreatorUser.firstName,
    lastName: mockCreatorUser.lastName,
    role: mockCreatorUser.role
  }
};

/**
 * Helper function to get mock user by role
 */
export function getMockUserByRole(role: 'ADMIN' | 'USER' | 'CREATOR') {
  const userMap = {
    ADMIN: mockAdminUser,
    USER: mockRegularUser,
    CREATOR: mockCreatorUser
  };
  return userMap[role];
}

/**
 * Helper function to get login credentials by role
 */
export function getLoginCredentialsByRole(role: 'ADMIN' | 'USER' | 'CREATOR') {
  const credMap = {
    ADMIN: loginCredentials.admin,
    USER: loginCredentials.user,
    CREATOR: loginCredentials.creator
  };
  return credMap[role];
}

