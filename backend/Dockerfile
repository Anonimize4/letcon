# Dockerfile for LETHCON Backend
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache ttyd openssl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDeps for Prisma and TS)
RUN if [ ! -f package-lock.json ]; then \
    npm install --package-lock-only; \
fi && npm ci

# Copy configuration and source
COPY tsconfig.base.json ./
COPY tsconfig.json ./
COPY prisma/ ./prisma/
COPY src/ ./src/

# Generate both Prisma clients
RUN npx prisma generate --schema=./prisma/schema/neon.prisma
RUN npx prisma generate --schema=./prisma/schema/local.prisma

# Build TypeScript
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS production

RUN apk add --no-cache ttyd openssl
WORKDIR /app
ENV NODE_ENV=production

# Copy package files and install prod-only deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built app
COPY --from=builder /app/dist ./dist

# FIX: Copy the specific clients AND the hidden .prisma engine folder
# This ensures the internal imports in @prisma-user/client find the engines
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma-user ./node_modules/@prisma-user
COPY --from=builder /app/node_modules/@prisma-lab ./node_modules/@prisma-lab

# Create storage directories
RUN mkdir -p uploads logs

EXPOSE 5000
CMD ["node", "dist/src/server.js"]
