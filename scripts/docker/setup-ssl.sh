#!/bin/bash

# SSL Certificate Setup Script for Development
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔐 Setting up SSL certificates for development...${NC}"

# Create SSL directories
mkdir -p infrastructure/nginx/ssl
mkdir -p infrastructure/nginx/sites

# Generate self-signed certificate for development
echo -e "${YELLOW}📜 Generating self-signed SSL certificate...${NC}"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout infrastructure/nginx/ssl/key.pem \
    -out infrastructure/nginx/ssl/cert.pem \
    -subj "/C=US/ST=Development/L=Development/O=Development/CN=localhost"

# Set proper permissions
chmod 600 infrastructure/nginx/ssl/key.pem
chmod 644 infrastructure/nginx/ssl/cert.pem

# Create nginx sites configuration
cat > infrastructure/nginx/sites/default.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name localhost;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # For development, allow self-signed certificates
    ssl_verify_client off;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
EOF

echo -e "${GREEN}✅ SSL certificates created successfully!${NC}"
echo -e "${YELLOW}⚠️  Note: These are self-signed certificates for development only${NC}"
echo -e "${YELLOW}   For production, use proper SSL certificates from a trusted CA${NC}"
