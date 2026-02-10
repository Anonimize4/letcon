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

# Copy package files and install production dependencies only
COPY package*.json ./
RUN if [ -f package-lock.json ]; then \
    npm ci --omit=dev; \
else \
    npm install --omit=dev; \
fi

# Copy the built app from builder
COPY --from=builder /app/dist ./dist

# FIX: Copy the prisma folder so we can re-generate the clients for the production OS
COPY --from=builder /app/prisma ./prisma

# Re-generate Prisma Clients in the production stage to ensure engines match Alpine
# and that the @prisma-user and @prisma-lab internal paths are correctly initialized
RUN npx prisma generate --schema=./prisma/schema/neon.prisma
RUN npx prisma generate --schema=./prisma/schema/local.prisma

# Create storage directories
RUN mkdir -p uploads logs

EXPOSE 5000

# Start the application
CMD ["node", "dist/src/server.js"]
