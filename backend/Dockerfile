# Dockerfile for LETHCON Backend
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache ttyd openssl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN if [ ! -f package-lock.json ]; then \
    npm install --package-lock-only; \
fi && npm ci

# Copy configuration and source
COPY tsconfig.base.json ./
COPY tsconfig.json ./
COPY prisma/ ./prisma/
COPY src/ ./src/

# Generate both Prisma clients explicitly
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
RUN if [ -f package-lock.json ]; then \
    npm ci --omit=dev; \
else \
    npm install --package-lock-only && npm ci --omit=dev; \
fi

# Copy the Prisma directory (needed for generation/engines)
COPY prisma ./prisma/

# Re-generate clients in production environment to ensure binary compatibility
RUN npx prisma generate --schema=./prisma/schema/neon.prisma
RUN npx prisma generate --schema=./prisma/schema/local.prisma

# Copy built app and specific generated clients from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma-user ./node_modules/@prisma-user
COPY --from=builder /app/node_modules/@prisma-lab ./node_modules/@prisma-lab

# Create storage directories
RUN mkdir -p uploads logs

EXPOSE 3000
CMD ["node", "dist/src/server.js"]
