# Multi-stage build for LETHCON Backend
# Optimized for Render deployment

# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy monorepo package files
COPY package*.json lerna.json ./

# Copy backend package files
COPY backend/package*.json ./backend/
COPY backend/tsconfig.json ./backend/
COPY backend/tsconfig.base.json ./

# Install dependencies (including dev for build)
RUN npm ci

# Copy backend source code
COPY backend/ ./backend/

# Build backend TypeScript
WORKDIR /app/backend
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/backend/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/backend/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/backend/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/backend/prisma ./prisma

# Copy environment file template
COPY --from=builder --chown=nodejs:nodejs /app/backend/.env.example ./.env.example

# Create necessary directories
RUN mkdir -p uploads logs && \
    chown nodejs:nodejs uploads logs

# Switch to non-root user
USER nodejs

# Expose port (Render will use PORT environment variable)
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application
CMD ["node", "dist/server.js"]

