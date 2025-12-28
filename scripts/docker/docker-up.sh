#!/bin/bash

# Docker Startup Script for Cybersecurity Training Platform
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Cybersecurity Training Platform...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}📝 Please update .env file with your configuration before running this script again.${NC}"
        exit 1
    else
        echo -e "${RED}❌ .env.example not found. Cannot create .env file.${NC}"
        exit 1
    fi
fi

# Determine environment
ENVIRONMENT=${1:-development}
echo -e "${YELLOW}📦 Environment: $ENVIRONMENT${NC}"

# Build and start services
case $ENVIRONMENT in
    "production")
        echo -e "${GREEN}🔨 Building production images...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache
        echo -e "${GREEN}🚀 Starting production services...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
        ;;
    "development")
        echo -e "${GREEN}🔨 Building development images...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose.override.yml build
        echo -e "${GREEN}🚀 Starting development services...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
        ;;
    *)
        echo -e "${GREEN}🔨 Building images...${NC}"
        docker-compose build
        echo -e "${GREEN}🚀 Starting services...${NC}"
        docker-compose up -d
        ;;
esac

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check service health
echo -e "${GREEN}✅ Service Status:${NC}"
docker-compose ps

# Show logs if requested
if [ "$2" == "--logs" ]; then
    echo -e "${YELLOW}📋 Showing logs (Ctrl+C to exit):${NC}"
    docker-compose logs -f
fi

echo -e "${GREEN}🎉 Platform is ready!${NC}"
echo -e "${GREEN}📱 Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}🔗 Backend API: http://localhost:5000${NC}"
echo -e "${GREEN}🗄️  Database: localhost:5432${NC}"
