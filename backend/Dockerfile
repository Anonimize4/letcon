# --- Stage 1: Builder ---
FROM node:22-alpine AS builder

# Install build dependencies (openssl is required for Prisma)
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copy root package files for workspace support
COPY package*.json ./
COPY package-lock.json ./

# Install root dependencies (this enables npm workspaces)
RUN npm ci --legacy-peer-deps

# Copy backend package files and install backend dependencies
COPY backend/package*.json ./backend/

# Install backend dependencies (including @prisma/client) using npm install
# This works because the root npm ci has already set up the workspace
RUN cd backend && npm install --legacy-peer-deps

# Copy source and config
COPY tsconfig.base.json ./
COPY backend/tsconfig.json ./
COPY backend/prisma/ ./prisma/
COPY backend/prisma/ ./backend/prisma/
COPY backend/src/ ./src/
COPY backend/src/ ./backend/src/

# Generate Prisma Client with explicit schema path
RUN npx prisma generate --schema=prisma/schema.prisma

# Build TypeScript
RUN cd backend && npm run build

# Prune node_modules for production to keep the image small
RUN cd backend && npm prune --production --legacy-peer-deps

# --- Stage 2: Production ---
FROM node:22-alpine AS production

# Install runtime dependencies (ttyd for terminal, openssl for Prisma, wget for healthcheck)
RUN apk add --no-cache ttyd openssl wget libc6-compat

WORKDIR /app
ENV NODE_ENV=production

# Copy only what is needed from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma

# Create necessary directories with proper permissions
RUN mkdir -p uploads logs && \
    chown -R node:node /app

# Switch to non-root user for security
USER node

EXPOSE 5000

# Healthcheck targeting the backend port
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application
CMD ["node", "backend/dist/src/server.js"]
