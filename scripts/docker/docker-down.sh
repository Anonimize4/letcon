#!/bin/bash

# Docker Shutdown Script for Cybersecurity Training Platform
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🛑 Stopping Cybersecurity Training Platform...${NC}"

# Determine environment
ENVIRONMENT=${1:-development}

# Stop and remove containers
case $ENVIRONMENT in
    "production")
        echo -e "${YELLOW}🛑 Stopping production services...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
        ;;
    "development")
        echo -e "${YELLOW}🛑 Stopping development services...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose.override.yml down
        ;;
    *)
        echo -e "${YELLOW}🛑 Stopping services...${NC}"
        docker-compose down
        ;;
esac

# Clean up if requested
if [ "$2" == "--clean" ]; then
    echo -e "${YELLOW}🧹 Cleaning up Docker resources...${NC}"
    
    # Remove unused containers
    docker container prune -f
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes
    echo -e "${YELLOW}⚠️  This will remove all data in volumes. Are you sure? (y/N)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        docker volume prune -f
    fi
    
    # Remove unused networks
    docker network prune -f
    
    echo -e "${GREEN}✅ Docker cleanup completed${NC}"
fi

echo -e "${GREEN}✅ Platform stopped successfully${NC}"
