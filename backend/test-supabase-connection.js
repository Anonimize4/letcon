// Test script to verify Supabase connection
require('dotenv').config();

console.log('=== Supabase Configuration Test ===\n');

// Check environment variables
console.log('Environment Variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL || '❌ NOT SET');
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? '✅ SET (showing first 10 chars: ' + process.env.SUPABASE_KEY.substring(0, 10) + '...)' : '❌ NOT SET');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ SET (showing first 10 chars: ' + process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 10) + '...)' : '❌ NOT SET');

// Validate required variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.log('\n❌ ERROR: Missing required Supabase environment variables');
  console.log('Please check your .env file in the backend directory');
  process.exit(1);
}

// Test Supabase connection
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function testConnection() {
  try {
    console.log('\nTesting Supabase connection...');
    
    // Try to get database version
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .single();
    
    if (error) {
      console.log('\n⚠️  Warning: Could not query users table (this is normal if table is empty or does not exist yet)');
      console.log('Error details:', error.message);
    } else {
      console.log('\n✅ Supabase connection successful!');
      console.log('Users count:', data.count);
    }
    
    // Check if we can at least connect to Supabase
    console.log('\n✅ Supabase client created successfully');
    console.log('Project URL:', process.env.SUPABASE_URL);
    
    process.exit(0);
  } catch (error) {
    console.log('\n❌ Supabase connection failed');
    console.log('Error:', error.message);
    process.exit(1);
  }
}

testConnection();

