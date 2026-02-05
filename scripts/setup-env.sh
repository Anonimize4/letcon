#!/bin/bash

# =============================================================================
# Environment Setup Script
# =============================================================================
# This script helps set up the environment files for local development

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

# Check if we're in the project root
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Setting up environment files..."

# Create .env from .env.example if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating .env from .env.example..."
    cp .env.example .env
    print_success "Created .env file"
else
    print_warning ".env file already exists, skipping"
fi

# Create backend .env from backend/.env.example if it doesn't exist
if [ ! -f "backend/.env" ]; then
    print_status "Creating backend/.env from backend/.env.example..."
    cp backend/.env.example backend/.env
    print_success "Created backend/.env file"
else
    print_warning "backend/.env file already exists, skipping"
fi

# Create frontend .env.local from frontend/.env.example if it doesn't exist
if [ ! -f "frontend/.env.local" ]; then
    print_status "Creating frontend/.env.local from frontend/.env.example..."
    cp frontend/.env.example frontend/.env.local
    print_success "Created frontend/.env.local file"
else
    print_warning "frontend/.env.local file already exists, skipping"
fi

echo ""
print_status "Environment files have been set up!"
echo ""
print_warning "IMPORTANT: You need to update these files with your actual values:"
echo ""
echo "  📝 .env"
echo "     - Supabase URL and keys"
echo "     - Database connection strings"
echo "     - JWT secrets"
echo "     - Email configuration"
echo ""
echo "  📝 backend/.env"
echo "     - Backend-specific configurations"
echo "     - Local database settings"
echo ""
echo "  📝 frontend/.env.local"
echo "     - Frontend API URLs"
echo "     - Client-side Supabase configuration"
echo ""
print_status "See docs/ENVIRONMENT_SETUP.md for detailed instructions"
echo ""
print_success "Setup complete! 🎉"
echo ""
print_status "Next steps:"
echo "  1. Update the environment files with your actual values"
echo "  2. Install dependencies: npm install"
echo "  3. Start development: npm run dev"
