#!/bin/bash

# Docker Status Check Script for Cybersecurity Training Platform
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Checking Docker Platform Status...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Docker is running${NC}"
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ docker-compose is not installed${NC}"
    exit 1
else
    echo -e "${GREEN}✅ docker-compose is available${NC}"
fi

# Check service status
echo -e "\n${BLUE}📊 Service Status:${NC}"
docker-compose ps

# Check health status
echo -e "\n${BLUE}🏥 Health Status:${NC}"
docker-compose ps --format "table {{.Service}}\t{{.Status}}\t{{.Ports}}"

# Check disk usage
echo -e "\n${BLUE}💾 Disk Usage:${NC}"
docker system df

# Check recent logs
echo -e "\n${BLUE}📋 Recent Logs (Last 10 lines):${NC}"
docker-compose logs --tail=10 --no-color

# Network connectivity test
echo -e "\n${BLUE}🌐 Network Connectivity:${NC}"

# Test backend health
if curl -f -s http://localhost:5000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend API is responding${NC}"
else
    echo -e "${YELLOW}⚠️  Backend API is not responding${NC}"
fi

# Test frontend
if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is responding${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend is not responding${NC}"
fi

# Test nginx
if curl -f -s http://localhost/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Nginx is responding${NC}"
else
    echo -e "${YELLOW}⚠️  Nginx is not responding${NC}"
fi

# Database connection test
if docker-compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database is ready${NC}"
else
    echo -e "${YELLOW}⚠️  Database is not ready${NC}"
fi

echo -e "\n${GREEN}🎉 Status check completed!${NC}"
