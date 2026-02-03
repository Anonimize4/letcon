/**
 * Script to create test users via the backend API
 * Run this if your backend server is already running
 */

const API_BASE = 'http://localhost:5000/api/v1';

const testUsers = [
  {
    email: 'admin@lethcon.com',
    username: 'lethcon_admin',
    password: 'Password123',
    firstName: 'Admin',
    lastName: 'LETHCON',
    targetRole: 'ADMIN',
    redirect: '/admin'
  },
  {
    email: 'user@lethcon.com',
    username: 'lethcon_user',
    password: 'Password123',
    firstName: 'User',
    lastName: 'LETHCON',
    targetRole: 'USER',
    redirect: '/dashboard'
  },
  {
    email: 'creator@lethcon.com',
    username: 'lethcon_creator',
    password: 'Password123',
    firstName: 'Creator',
    lastName: 'LETHCON',
    targetRole: 'CREATOR',
    redirect: '/dashboard/creator'
  },
];

async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      }),
    });

    const data = await response.json();
    return { success: response.ok, data, userData };
  } catch (error) {
    return { success: false, error: error.message, userData };
  }
}

async function main() {
  console.log('🚀 Creating LETHCON test users via API...');
  console.log('=========================================\n');

  const results = [];

  for (const user of testUsers) {
    console.log(`📝 Registering: ${user.email}`);
    const result = await registerUser(user);
    
    if (result.success) {
      console.log(`✅ Successfully registered: ${user.email}`);
      console.log(`   Username: ${user.username}`);
      results.push({ ...user, status: 'registered' });
    } else {
      console.log(`❌ Failed to register: ${user.email}`);
      console.log(`   Error: ${result.error || result.data?.message || 'Unknown error'}`);
      results.push({ ...user, status: 'failed', error: result.error || result.data?.message });
    }
    console.log('');
  }

  console.log('=========================================');
  console.log('✨ Registration completed!\n');

  // Check if any users need role updates
  const needsRoleUpdate = results.filter(r => 
    r.status === 'registered' && r.targetRole !== 'USER'
  );

  if (needsRoleUpdate.length > 0) {
    console.log('⚠️  IMPORTANT: Manual Role Update Required');
    console.log('==========================================');
    console.log('The following users were registered with USER role.');
    console.log('You need to manually update their roles in the database:\n');
    
    for (const user of needsRoleUpdate) {
      console.log(`UPDATE users SET role = '${user.targetRole}' WHERE email = '${user.email}';`);
    }
    console.log('');
  }

  console.log('📝 Test Login Credentials:');
  console.log('----------------------------');
  for (const user of testUsers) {
    console.log(`${user.targetRole}:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Password: ${user.password}`);
    console.log(`  Expected Redirect: ${user.redirect}`);
    console.log('');
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
