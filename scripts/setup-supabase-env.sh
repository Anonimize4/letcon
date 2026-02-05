#!/bin/bash

# ============================================================================
# Supabase Environment Setup Script
# ============================================================================
# This script creates the necessary .env files from the example templates
# and provides guidance for obtaining Supabase credentials
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Supabase Environment Configuration Setup              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to prompt for input with default value
prompt_input() {
    local prompt="$1"
    local default="$2"
    local var_name="$3"
    local is_secret="${4:-false}"
    
    if [ "$is_secret" = true ]; then
        read -s -p "$prompt [$default]: " "$var_name"
        echo
    else
        read -p "$prompt [$default]: " "$var_name"
    fi
    
    if [ -z "${!var_name}" ]; then
        eval "$var_name=$default"
    fi
}

echo -e "${YELLOW}Step 1: Backend Configuration${NC}"
echo "────────────────────────────────────────────"
echo ""

# Backend .env file
BACKEND_ENV_FILE="backend/.env"
BACKEND_ENV_TEMPLATE="backend/.env.example"

if [ ! -f "$BACKEND_ENV_FILE" ]; then
    echo -e "${GREEN}Creating $BACKEND_ENV_FILE from template...${NC}"
    cp "$BACKEND_ENV_TEMPLATE" "$BACKEND_ENV_FILE"
else
    echo -e "${YELLOW}$BACKEND_ENV_FILE already exists. Backing up and recreating...${NC}"
    cp "$BACKEND_ENV_FILE" "$BACKEND_ENV_FILE.backup.$(date +%Y%m%d%H%M%S)"
    cp "$BACKEND_ENV_TEMPLATE" "$BACKEND_ENV_FILE"
fi

echo ""
echo -e "${YELLOW}Please provide your Supabase credentials:${NC}"
echo ""

prompt_input "Supabase Project URL" "https://your-project.supabase.co" "SUPABASE_URL"
prompt_input "Supabase Anon Key" "your-anon-key" "SUPABASE_ANON_KEY"
prompt_input "Supabase Service Role Key (SERVER-ONLY!)" "" "SUPABASE_SERVICE_ROLE_KEY" true

# Update backend .env file
sed -i "s|SUPABASE_URL=.*|SUPABASE_URL=$SUPABASE_URL|" "$BACKEND_ENV_FILE"
sed -i "s|SUPABASE_ANON_KEY=.*|SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY|" "$BACKEND_ENV_FILE"
sed -i "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY|" "$BACKEND_ENV_FILE"

echo ""
echo -e "${GREEN}✓ Backend configuration updated${NC}"
echo ""

echo -e "${YELLOW}Step 2: Frontend Configuration${NC}"
echo "────────────────────────────────────────────"
echo ""

# Frontend .env.development file
FRONTEND_ENV_FILE="frontend/.env.development"
FRONTEND_ENV_TEMPLATE="frontend/.env.development.example"

if [ ! -f "$FRONTEND_ENV_FILE" ]; then
    echo -e "${GREEN}Creating $FRONTEND_ENV_FILE from template...${NC}"
    cp "$FRONTEND_ENV_TEMPLATE" "$FRONTEND_ENV_FILE"
else
    echo -e "${YELLOW}$FRONTEND_ENV_FILE already exists. Backing up and recreating...${NC}"
    cp "$FRONTEND_ENV_FILE" "$FRONTEND_ENV_FILE.backup.$(date +%Y%m%d%H%M%S)"
    cp "$FRONTEND_ENV_TEMPLATE" "$FRONTEND_ENV_FILE"
fi

# Update frontend .env.development file (only ANON key, not service role)
sed -i "s|VITE_SUPABASE_URL=.*|VITE_SUPABASE_URL=$SUPABASE_URL|" "$FRONTEND_ENV_FILE"
sed -i "s|VITE_SUPABASE_ANON_KEY=.*|VITE_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY|" "$FRONTEND_ENV_FILE"

echo ""
echo -e "${GREEN}✓ Frontend configuration updated${NC}"
echo ""

echo -e "${YELLOW}Step 3: Security Verification${NC}"
echo "────────────────────────────────────────────"
echo ""

# Verify that service role key is NOT in frontend
if grep -q "SERVICE_ROLE_KEY" "frontend/.env.development" 2>/dev/null; then
    echo -e "${RED}⚠️  WARNING: Service role key found in frontend configuration!${NC}"
    echo -e "${RED}   This is a security risk!${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Service role key is NOT exposed to frontend${NC}"
fi

# Verify that service role key IS in backend
if grep -q "SUPABASE_SERVICE_ROLE_KEY" "$BACKEND_ENV_FILE" 2>/dev/null; then
    echo -e "${GREEN}✓ Service role key is present in backend configuration${NC}"
else
    echo -e "${RED}⚠️  WARNING: Service role key missing from backend configuration!${NC}"
fi

echo ""
echo -e "${YELLOW}Step 4: Summary${NC}"
echo "────────────────────────────────────────────"
echo ""
echo -e "${GREEN}Environment files created/updated:${NC}"
echo "  - $BACKEND_ENV_FILE (with SUPABASE_SERVICE_ROLE_KEY)"
echo "  - $FRONTEND_ENV_FILE (ANON key only)"
echo ""
echo -e "${YELLOW}Security checks:${NC}"
echo "  ✓ Service role key restricted to backend"
echo "  ✓ Frontend only has anon key"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Verify your Supabase credentials are correct"
echo "  2. Run 'npm install' in both backend and frontend directories"
echo "  3. Start the development servers"
echo ""
echo -e "${GREEN}Setup complete!${NC}"

