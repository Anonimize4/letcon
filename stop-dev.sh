#!/bin/bash

# LETHCON Development Stop Script
# This script stops both backend and frontend servers

echo "🛑 Stopping LETHCON Development Environment..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Kill processes on ports 5000 and 3000
echo "Stopping servers on ports 5000 and 3000..."

# Find and kill backend (port 5000)
BACKEND_PID=$(lsof -ti:5000)
if [ ! -z "$BACKEND_PID" ]; then
    kill $BACKEND_PID
    echo -e "${GREEN}✅ Backend server stopped${NC}"
else
    echo -e "${RED}⚠️  No backend server running on port 5000${NC}"
fi

# Find and kill frontend (port 3000)
FRONTEND_PID=$(lsof -ti:3000)
if [ ! -z "$FRONTEND_PID" ]; then
    kill $FRONTEND_PID
    echo -e "${GREEN}✅ Frontend server stopped${NC}"
else
    echo -e "${RED}⚠️  No frontend server running on port 3000${NC}"
fi

echo ""
echo -e "${GREEN}✅ All servers stopped${NC}"
