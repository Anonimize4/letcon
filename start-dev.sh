#!/bin/bash

# LETHCON Development Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting LETHCON Development Environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if environment files exist
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}❌ Backend .env file not found!${NC}"
    echo "Creating backend/.env from .env.example..."
    cp .env.example backend/.env
    echo -e "${YELLOW}⚠️  Please update backend/.env with your configuration${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  Frontend .env file not found (already created with defaults)${NC}"
fi

# Check if PostgreSQL is running
echo -e "${YELLOW}📊 Checking PostgreSQL...${NC}"
if ! pg_isready -q 2>/dev/null; then
    echo -e "${RED}❌ PostgreSQL is not running!${NC}"
    echo "Please start PostgreSQL first:"
    echo "  sudo systemctl start postgresql"
    echo "  OR"
    echo "  docker-compose up -d postgres"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL is running${NC}"
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Start Backend
echo -e "${YELLOW}🔧 Starting Backend Server...${NC}"
cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Run database migrations
echo "Running database migrations..."
npm run db:generate
npm run db:push

# Start backend in background
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
echo "   Logs: tail -f backend.log"
echo ""

# Wait for backend to be ready
echo -e "${YELLOW}⏳ Waiting for backend to be ready...${NC}"
for i in {1..30}; do
    if check_port 5000; then
        echo -e "${GREEN}✅ Backend is ready on port 5000${NC}"
        break
    fi
    sleep 1
done

# Start Frontend
echo ""
echo -e "${YELLOW}🎨 Starting Frontend Server...${NC}"
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
echo "   Logs: tail -f frontend.log"
echo ""

# Wait for frontend to be ready
echo -e "${YELLOW}⏳ Waiting for frontend to be ready...${NC}"
for i in {1..30}; do
    if check_port 3000; then
        echo -e "${GREEN}✅ Frontend is ready on port 3000${NC}"
        break
    fi
    sleep 1
done

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 LETHCON Development Environment is Ready!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "📱 Frontend:  ${GREEN}http://localhost:3000${NC}"
echo -e "🔧 Backend:   ${GREEN}http://localhost:5000${NC}"
echo -e "❤️  Health:    ${GREEN}http://localhost:5000/health${NC}"
echo ""
echo -e "Backend PID:  $BACKEND_PID"
echo -e "Frontend PID: $FRONTEND_PID"
echo ""
echo -e "To stop the servers:"
echo -e "  kill $BACKEND_PID $FRONTEND_PID"
echo -e "  OR"
echo -e "  ./stop-dev.sh"
echo ""
echo -e "Logs:"
echo -e "  Backend:  tail -f backend.log"
echo -e "  Frontend: tail -f frontend.log"
echo ""
