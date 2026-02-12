# --- Stage 1: Builder ---
FROM node:20-alpine AS builder

# Install build dependencies (openssl is required for Prisma)
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files (Ensure package-lock.json exists in your /backend folder!)
COPY package*.json ./
RUN npm ci

# Copy source and config
COPY tsconfig.base.json ./
COPY tsconfig.json ./
COPY prisma/ ./prisma/
COPY src/ ./src/

# Generate Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build TypeScript
RUN npm run build

# Prune node_modules for production to keep the image small
RUN npm prune --production

# --- Stage 2: Production ---
FROM node:20-alpine AS production

# Install runtime dependencies (ttyd for terminal, openssl for Prisma, wget for healthcheck)
RUN apk add --no-cache ttyd openssl wget

WORKDIR /app
ENV NODE_ENV=production

# Copy only what is needed from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Create necessary directories
RUN mkdir -p uploads logs

EXPOSE 5000

# Healthcheck targeting the backend port
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application
# Note: Ensure your build output puts the entry point at dist/src/server.js
CMD ["node", "dist/src/server.js"]
