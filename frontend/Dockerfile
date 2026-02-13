# --- Stage 1: Build ---
FROM node:22-alpine AS builder

# Install build dependencies for Vite 7
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy root configs needed for inheritance
COPY tsconfig.base.json ./
COPY package*.json ./
COPY package-lock.json ./

# Install root dependencies (includes TypeScript)
RUN npm ci --legacy-peer-deps

# Copy frontend specific metadata
COPY frontend/package*.json ./frontend/

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm ci --legacy-peer-deps

# Copy the rest of the frontend source
COPY frontend/ ./

# Build steps with Vite 7 compatibility
RUN npm run build

# --- Stage 2: Production ---
FROM nginx:alpine AS production

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy built static files to Nginx html directory
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Security: Set up non-root user and fix permissions for Nginx folders
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Use sed to remove the "user nginx;" directive from main nginx.conf 
# which causes a warning when running as a non-root user
RUN sed -i 's/^user\s\+nginx;/# user nginx;/' /etc/nginx/nginx.conf

USER nginx

# Port 3000 (Ensure your nginx.conf also listens on 3000)
EXPOSE 3000

# Healthcheck targeting port 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
