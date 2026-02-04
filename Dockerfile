# Multi-stage build for Node.js backend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy workspace package files first
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies for the entire workspace
RUN npm ci --omit=dev

# Copy backend source code
COPY backend/ ./backend/

# Build the backend
RUN cd backend && npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/backend/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules/backend/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/backend/package*.json ./

# Create uploads directory
RUN mkdir -p uploads && chown nodejs:nodejs uploads

USER nodejs

EXPOSE 5000

CMD ["node", "dist/server.js"]
