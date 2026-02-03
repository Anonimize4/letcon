#!/bin/bash

# Supabase Authentication Setup Script for LETHCON Platform
# This script sets up users, admins, and initial data in Supabase

set -e

echo "🚀 Setting up Supabase Authentication for LETHCON Platform..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please copy .env.supabase-example to .env and configure your Supabase credentials."
    exit 1
fi

# Load environment variables
source .env

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not found in .env file. Please configure your Supabase database connection."
    exit 1
fi

echo "📡 Database URL: $DATABASE_URL"

# Function to execute SQL with error handling
execute_sql() {
    local sql_file="$1"
    local description="$2"
    
    echo "🔧 Executing: $description"
    
    if command -v psql; then
        psql "$DATABASE_URL" -f "$sql_file"
    elif command -v docker; then
        # Try with docker if psql is not available
        docker run --rm -i postgres:15 psql "$DATABASE_URL" -f "$sql_file"
    else
        echo "❌ Neither psql nor docker found. Please install PostgreSQL client or Docker."
        exit 1
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ $description completed successfully"
    else
        echo "❌ $description failed"
        exit 1
    fi
}

# Run database migration
echo "📊 Running database migration..."
execute_sql "prisma/migrations/20260101000001_supabase_auth_setup.sql" "Database Schema Setup"

# Run seeding script
echo "🌱 Running data seeding..."
execute_sql "scripts/supabase-seed.sql" "Initial Data Seeding"

# Verify setup
echo "🔍 Verifying setup..."

# Check if users were created
USER_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM users;" 2>/dev/null || echo "0")

if [ "$USER_COUNT" -gt 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo "👥 Created $USER_COUNT users"
    
    # Display created users (without passwords)
    echo ""
    echo "📋 Created Users:"
    psql "$DATABASE_URL" -c "SELECT email, username, role, created_at FROM users ORDER BY created_at;" 2>/dev/null || echo "Could not fetch user list"
    
    echo ""
    echo "🔐 Default Login Credentials:"
    echo "   Admin: admin@lethcon.com / Password123"
    echo "   User:  user@lethcon.com / Password123"
    echo "   Creator: creator@lethcon.com / Password123"
    echo "   System Admin: admin@cybersectraining.com / Admin@2024!"
    echo "   Lab Creator: creator@cybersectraining.com / Creator@2024!"
    echo "   Demo User: demo@cybersectraining.com / User@2024!"
    echo ""
    echo "⚠️  IMPORTANT: Change these passwords in production!"
    
else
    echo "❌ No users found in database. Setup may have failed."
    exit 1
fi

# Check if lab categories were created
CATEGORY_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM lab_categories;" 2>/dev/null || echo "0")

if [ "$CATEGORY_COUNT" -gt 0 ]; then
    echo "📚 Created $CATEGORY_COUNT lab categories"
else
    echo "❌ No lab categories found. Setup may have failed."
    exit 1
fi

# Check if labs were created
LAB_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM labs;" 2>/dev/null || echo "0")

if [ "$LAB_COUNT" -gt 0 ]; then
    echo "🧪 Created $LAB_COUNT sample labs"
else
    echo "ℹ️  No sample labs found (this is expected for basic setup)"
fi

echo ""
echo "🎉 Supabase Authentication Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update your application configuration to use Supabase"
echo "2. Test the authentication endpoints"
echo "3. Configure Row Level Security (RLS) policies as needed"
echo "4. Set up proper CORS configuration for your Supabase project"
echo ""
echo "🔗 Supabase Dashboard: https://app.supabase.com"
echo "📚 Documentation: docs/SUPABASE_CONNECTION_TROUBLESHOOTING.md"
