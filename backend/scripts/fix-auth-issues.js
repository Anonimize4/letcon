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
  const hasDatabaseUrl = envContent.includes('DATABASE_URL=');
  const hasJwtSecret = envContent.includes('JWT_SECRET=');
  
  if (hasDatabaseUrl && hasJwtSecret) {
    console.log('   ✅ Database and JWT configuration found');
  } else {
    console.log('   ❌ Missing configuration');
    console.log('   Please ensure DATABASE_URL and JWT_SECRET are set in .env');
  }
} else {
  console.log('   ❌ .env file missing');
  console.log('   Creating template...');
  
  const template = `# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/cybersecurity_training

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
`;
  
  fs.writeFileSync(envPath, template);
  console.log('   ✅ Template created at backend/.env');
  console.log('   Please update with your actual database credentials');
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

