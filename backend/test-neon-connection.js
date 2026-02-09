const { PrismaClient } = require('@prisma-user/client');

async function testNeonConnection() {
  console.log('🔍 Testing Neon Database Connection...\n');
  
  const userDB = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    // Test basic connection
    console.log('1. Testing basic connection...');
    await userDB.$connect();
    console.log('✅ Successfully connected to Neon database!\n');

    // Test database query
    console.log('2. Testing database query...');
    const result = await userDB.$queryRaw`SELECT version()`;
    console.log('✅ Database query successful!');
    console.log('📊 PostgreSQL version:', result[0].version, '\n');

    // Test table access
    console.log('3. Testing table access...');
    const userCount = await userDB.user.count();
    console.log(`✅ Successfully accessed users table! Found ${userCount} users.\n`);

    // Test schema inspection
    console.log('4. Testing schema inspection...');
    const tables = await userDB.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    console.log('✅ Successfully accessed schema information!');
    console.log('📋 Available tables:', tables.map(t => t.table_name).join(', '), '\n');

    console.log('🎉 All tests passed! Neon database is properly connected.');

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('🔧 Error details:', error);
    
    // Provide specific troubleshooting advice
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting: Check if Neon database URL is correct and accessible');
    } else if (error.message.includes('authentication')) {
      console.log('\n💡 Troubleshooting: Check database credentials in NEON_DATABASE_URL');
    } else if (error.message.includes('timeout')) {
      console.log('\n💡 Troubleshooting: Check network connection and firewall settings');
    }
  } finally {
    await userDB.$disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

testNeonConnection();
