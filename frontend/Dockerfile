# --- Stage 1: Build ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files first for better caching
# (Make sure package-lock.json exists in your frontend folder!)
COPY package*.json ./
RUN npm ci

# Copy configuration and source
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY public/ ./public/
COPY src/ ./src/

# Build steps
RUN npm run type-check
RUN npm run build

# --- Stage 2: Production ---
FROM nginx:alpine AS production

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy built static files to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

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
