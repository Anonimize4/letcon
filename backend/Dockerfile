# Dockerfile for LETHCON Backend
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache ttyd openssl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDeps for Prisma and TS)
RUN if [ -f package-lock.json ]; then \
    npm ci; \
else \
    npm install; \
fi

# Copy configuration and source
COPY tsconfig.base.json ./
COPY tsconfig.json ./
COPY prisma/ ./prisma/
COPY src/ ./src/

# Generate both Prisma clients in builder stage for the build process
RUN npx prisma generate --schema=./prisma/schema/neon.prisma
RUN npx prisma generate --schema=./prisma/schema/local.prisma

# Build TypeScript
RUN npm run build
# --- Production Stage ---
FROM node:20-alpine AS production

# Install runtime dependencies
RUN apk add --no-cache ttyd openssl
WORKDIR /app
ENV NODE_ENV=production

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built app and prisma folder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# GENERATE ALL THREE CLIENTS
# 1. This one fixes the "@prisma/client did not initialize" error (Default)
RUN npx prisma generate --schema=./prisma/schema/neon.prisma

# 2. These fix your custom imports if you use them elsewhere
RUN npx prisma generate --schema=./prisma/schema/neon.prisma --data-proxy
RUN npx prisma generate --schema=./prisma/schema/local.prisma

# Create storage directories
RUN mkdir -p uploads logs

EXPOSE 5000
CMD ["node", "dist/src/server.js"]

