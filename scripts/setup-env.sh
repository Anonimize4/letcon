#!/bin/bash

# =============================================================================
# Environment Setup Script
# =============================================================================
# This script helps set up the environment files for local development
# =============================================================================

set -e

echo "🚀 Setting up LETHCON Environment Configuration"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_security_note() {
    echo -e "${RED}🔒 SECURITY:${NC} $1"
}

# Check if we're in the project root
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Setting up environment files..."

# =============================================================================
# Backend Configuration
# =============================================================================
print_status "Configuring backend environment..."

# Create backend/.env from backend/.env.example if it doesn't exist
if [ ! -f "backend/.env" ]; then
    print_status "Creating backend/.env from backend/.env.example..."
    cp backend/.env.example backend/.env
    print_success "Created backend/.env file"
    print_security_note "⚠️  IMPORTANT: backend/.env contains sensitive secrets"
    print_security_note "   This file should NEVER be committed to version control!"
else
    print_warning "backend/.env file already exists, skipping"
fi

# =============================================================================
# Frontend Configuration
# =============================================================================
print_status "Configuring frontend environment..."

# Create frontend/.env.development from frontend/.env.development.example if it doesn't exist
if [ ! -f "frontend/.env.development" ]; then
    print_status "Creating frontend/.env.development from frontend/.env.development.example..."
    cp frontend/.env.development.example frontend/.env.development
    print_success "Created frontend/.env.development file"
else
    print_warning "frontend/.env.development file already exists, skipping"
fi

# =============================================================================
# Summary
# =============================================================================
echo ""
print_success "Environment files have been set up!"
echo ""
print_warning "IMPORTANT: You need to update these files with your actual values:"
echo ""
echo "  📝 backend/.env"
echo "     - Database connection strings (DATABASE_URL)"
echo "     - JWT secrets (JWT_SECRET)"
echo "     - Email configuration (SMTP_*)"
echo "     - Docker configuration"
echo ""
echo "  📝 frontend/.env.development"
echo "     - VITE_API_BASE_URL (backend API URL)"
echo "     - VITE_WS_URL (WebSocket URL)"
echo ""
print_security_note "⚠️  SECURITY RULES:"
echo "     1. Never commit .env files with real secrets to version control"
echo "     2. Keep backend/.env in .gitignore"
echo "     3. Only expose public-safe variables to the frontend"
echo ""

# Verify .gitignore has backend/.env
if grep -q "backend/.env" ".gitignore" 2>/dev/null; then
    print_success "✅ backend/.env is properly ignored by git"
else
    print_warning "⚠️  backend/.env is NOT in .gitignore - this is a security risk!"
fi

echo ""
print_status "For detailed setup instructions, see:"
echo "  - docs/ENVIRONMENT_SETUP.md"
echo "  - docs/SETUP.md"
echo ""
print_success "Setup complete! 🎉"
echo ""
print_status "Next steps:"
echo "  1. Update backend/.env with your database credentials"
echo "  2. Update frontend/.env.development with API endpoints"
echo "  3. Install dependencies: npm install"
echo "  4. Start development: npm run dev"

