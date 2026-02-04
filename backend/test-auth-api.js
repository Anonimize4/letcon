// Test script to debug authentication issues
require('dotenv').config();

const http = require('http');

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';
const API_VERSION = 'v1';

async function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE_URL}/api/${API_VERSION}${path}`);
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function testEndpoints() {
  console.log('=== Authentication API Test ===\n');
  
  // Test 1: Health check
  console.log('1. Testing API health...');
  try {
    const health = await makeRequest('GET', '/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   Response: ${JSON.stringify(health.data, null, 2)}\n`);
    
    if (health.status !== 200) {
      console.log('❌ API is not healthy. Is the backend server running?');
      process.exit(1);
    }
  } catch (error) {
    console.log('❌ Cannot connect to API:', error.message);
    console.log('   Make sure backend is running: cd backend && npm run dev');
    process.exit(1);
  }

  // Test 2: Login with test user
  console.log('2. Testing login endpoint...');
  const loginResponse = await makeRequest('POST', '/auth/login', {
    email: 'admin@lethcon.com',
    password: 'lethconAdminPassword'
  });
  
  console.log(`   Status: ${loginResponse.status}`);
  console.log(`   Response: ${JSON.stringify(loginResponse.data, null, 2)}\n`);

  if (loginResponse.status === 200) {
    console.log('✅ Login successful!');
    console.log('   Access Token:', loginResponse.data.data.accessToken.substring(0, 50) + '...');
  } else if (loginResponse.status === 401) {
    console.log('❌ Login failed: Invalid credentials');
    console.log('   Possible issues:');
    console.log('   - User does not exist');
    console.log('   - Password is incorrect');
    console.log('   - User is not registered yet');
  } else if (loginResponse.status === 500) {
    console.log('❌ Server error during login');
    console.log('   Check backend logs for details');
  }

  // Test 3: Register new user (if login fails)
  console.log('3. Testing registration endpoint...');
  const registerResponse = await makeRequest('POST', '/auth/register', {
    email: 'test' + Date.now() + '@lethcon.com',
    username: 'testuser' + Date.now(),
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User'
  });
  
  console.log(`   Status: ${registerResponse.status}`);
  console.log(`   Response: ${JSON.stringify(registerResponse.data, null, 2)}\n`);

  if (registerResponse.status === 201) {
    console.log('✅ Registration successful!');
    console.log('   You can now login with this test user');
  } else if (registerResponse.status === 409) {
    console.log('⚠️  User already exists');
  } else if (registerResponse.status === 500) {
    console.log('❌ Server error during registration');
  }

  // Summary
  console.log('=== Test Summary ===');
  console.log(`API Health: ${loginResponse.status !== null ? '✅' : '❌'}`);
  console.log(`Login: ${loginResponse.status === 200 ? '✅' : '❌'}`);
  console.log(`Registration: ${[201, 409].includes(registerResponse.status) ? '✅' : '❌'}`);
}

testEndpoints().catch(console.error);

