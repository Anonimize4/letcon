# Dockerfile for LETHCON Backend
# Optimized for Render deployment

FROM node:20-alpine AS builder

# Install ttyd for terminal functionality and openssl for Prisma
RUN apk add --no-cache ttyd openssl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Generate package-lock.json if it doesn't exist
# This is needed for npm ci to work in Render deployments
RUN if [ ! -f package-lock.json ]; then \
    echo "package-lock.json not found, generating from package.json..."; \
    npm install --package-lock-only; \
fi && \
npm ci

# Copy source code explicitly into subdirectories to ensure tsc finds inputs
COPY src/ ./src
COPY prisma/ ./prisma

# Copy TypeScript config files (needed because backend/tsconfig.json extends tsconfig.base.json)
COPY tsconfig.base.json ./
COPY tsconfig.json ./

# Ensure schema exists before prisma generate
RUN ls -la /app && ls -la /app/src && ls -la /app/prisma || true
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install ttyd and openssl
RUN apk add --no-cache ttyd openssl

WORKDIR /app

ENV NODE_ENV=production

# Copy package files AND the lockfile
COPY package.json package-lock.json ./

# Install production deps
RUN npm ci --omit=dev

# 2. ENSURE THIS PATH IS CORRECT
# If building from the backend folder, this is fine. 
# If building from the root, change this to: COPY backend/prisma ./prisma/
COPY prisma ./prisma/

# 3. GENERATE WITH EXPLICIT PATH
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
# (Optionally copy the generated client if it's not in node_modules)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create necessary directories
RUN mkdir -p uploads logs

CMD ["node", "dist/src/server.js"]
