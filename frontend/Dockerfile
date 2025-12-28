# Multi-stage build for React frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Install dependencies
RUN npm ci

# Copy source code
COPY public/ ./public/
COPY src/ ./src/

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx
RUN adduser -S nginx -u 1001

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
