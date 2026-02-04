#!/bin/bash
# Quick authentication test script
# Run this to test login and registration

API_URL="http://localhost:5000/api/v1"

echo "=== LETHCON Authentication Quick Test ==="
echo ""

# Test 1: Check if server is running
echo "1. Testing server health..."
if curl -s "$API_URL/health" > /dev/null 2>&1; then
    echo "   ✅ Server is running"
    curl -s "$API_URL/health" | head -c 200
    echo ""
else
    echo "   ❌ Server is NOT running"
    echo "   Start it with: cd backend && npm run dev"
    exit 1
fi
echo ""

# Test 2: Register a test user
echo "2. Registering test user..."
TIMESTAMP=$(date +%s)
TEST_EMAIL="test$TIMESTAMP@lethcon.com"
TEST_USERNAME="testuser$TIMESTAMP"

REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"$TEST_EMAIL\",
        \"username\": \"$TEST_USERNAME\",
        \"password\": \"TestPassword123!\",
        \"firstName\": \"Test\",
        \"lastName\": \"User\"
    }")

echo "   Response: $REGISTER_RESPONSE"
echo ""

# Check if registration was successful
if echo "$REGISTER_RESPONSE" | grep -q "success"; then
    echo "   ✅ Registration successful!"
else
    if echo "$REGISTER_RESPONSE" | grep -q "already exists"; then
        echo "   ⚠️  User already exists, trying login with test credentials..."
        TEST_EMAIL="admin@lethcon.com"
        TEST_USERNAME="lethcon_admin"
    else
        echo "   ❌ Registration failed"
    fi
fi
echo ""

# Test 3: Login
echo "3. Logging in..."
echo "   Email: $TEST_EMAIL"
echo "   Password: TestPassword123!"

LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"$TEST_EMAIL\",
        \"password\": \"TestPassword123!\"
    }")

echo "   Response: $LOGIN_RESPONSE"
echo ""

# Check if login was successful
if echo "$LOGIN_RESPONSE" | grep -q "success"; then
    echo "   ✅ Login successful!"
    ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
    echo "   Access Token: ${ACCESS_TOKEN:0:50}..."
else
    echo "   ❌ Login failed"
    if echo "$LOGIN_RESPONSE" | grep -q "Invalid credentials"; then
        echo "   - Check email and password"
    fi
    if echo "$LOGIN_RESPONSE" | grep -q "User"; then
        echo "   - User may not exist, try registering first"
    fi
fi

echo ""
echo "=== Test Complete ==="

