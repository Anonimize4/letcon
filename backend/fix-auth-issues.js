// Fix Authentication Issues Script
// Run this to diagnose and fix common login problems

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('=== LETHCON Authentication Fix Script ===\n');

// Check 1: Verify .env file exists
console.log('1. Checking .env file...');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('   ✅ .env file exists');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasSupabaseUrl = envContent.includes('SUPABASE_URL=') && !envContent.includes('SUPABASE_URL=');
  const hasSupabaseKey = envContent.includes('SUPABASE_KEY=');
  
  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('   ✅ Supabase credentials configured');
  } else {
    console.log('   ❌ Missing Supabase credentials');
    console.log('   Please add SUPABASE_URL and SUPABASE_KEY to .env');
  }
} else {
  console.log('   ❌ .env file missing');
  console.log('   Creating template...');
  
  const template = `# Supabase Configuration
SUPABASE_URL=https://mmbcmttkzbmilftkxhkx.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
`;
  
  fs.writeFileSync(envPath, template);
  console.log('   ✅ Template created at backend/.env');
  console.log('   Please add your actual Supabase keys');
}

// Check 2: Verify database connection
console.log('\n2. Checking database connection...');
console.log('   Make sure PostgreSQL is running');
console.log('   Run: docker-compose up -d postgres');

// Check 3: Run database migrations
console.log('\n3. Database migrations...');
console.log('   Run these commands to set up the database:');
console.log('   cd backend');
console.log('   npm run db:generate');
console.log('   npm run db:push');

// Check 4: Test registration
console.log('\n4. To test registration:');
console.log('   curl -X POST http://localhost:5000/api/v1/auth/register \\');
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"email":"test@lethcon.com","username":"testuser","password":"Test123!","firstName":"Test","lastName":"User"}\'');

// Check 5: Common fixes
console.log('\n5. Common fixes if login fails:');
console.log('   a) Register a new user first');
console.log('   b) Check backend logs for errors: tail -f logs/app.log');
console.log('   c) Restart backend: npm run dev');
console.log('   d) Clear browser cache');

console.log('\n=== Next Steps ===');
console.log('1. Start backend: cd backend && npm run dev');
console.log('2. In another terminal, start frontend: cd frontend && npm run dev');
console.log('3. Register a new user at http://localhost:3000/register');
console.log('4. Login at http://localhost:3000/login');
console.log('5. Check browser console for any errors');

console.log('\n=== Quick Test ===');
console.log('Run this to test the API directly:');
console.log('cd backend && node test-auth-api.js');

