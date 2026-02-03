#!/bin/bash

# Script to register test users via API
API_URL="http://localhost:5000/api/v1/auth/register"

echo "🚀 Registering LETHCON test users..."
echo "====================================="
echo ""

# Function to register a user
register_user() {
    local email=$1
    local username=$2
    local password=$3
    local firstName=$4
    local lastName=$5
    
    echo "📝 Registering: $email"
    response=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{
            \"email\": \"$email\",
            \"username\": \"$username\",
            \"password\": \"$password\",
            \"firstName\": \"$firstName\",
            \"lastName\": \"$lastName\"
        }")
    
    echo "   Response: $response"
    echo ""
}

# Register Admin user
register_user "admin@lethcon.com" "lethcon_admin" "Password123" "Admin" "LETHCON"

# Register Regular user
register_user "user@lethcon.com" "lethcon_user" "Password123" "User" "LETHCON"

# Register Creator user
register_user "creator@lethcon.com" "lethcon_creator" "Password123" "Creator" "LETHCON"

echo "====================================="
echo "✨ Registration completed!"
echo ""
echo "📝 Test Login Credentials:"
echo "-----------------------------------"
echo "ADMIN:"
echo "  Email: admin@lethcon.com"
echo "  Password: Password123"
echo "  Redirect: /admin"
echo ""
echo "USER:"
echo "  Email: user@lethcon.com"
echo "  Password: Password123"
echo "  Redirect: /dashboard"
echo ""
echo "CREATOR:"
echo "  Email: creator@lethcon.com"
echo "  Password: Password123"
echo "  Redirect: /dashboard/creator"
echo ""
echo "⚠️  Note: After registration, you need to manually update"
echo "   the roles in the database for admin and creator users."
