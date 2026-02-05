# Dockerfile for LETHCON Backend
# Optimized for Render deployment

FROM node:20-alpine AS builder

# Install ttyd for terminal functionality
RUN apk add --no-cache ttyd

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

# Install ttyd for terminal functionality
RUN apk add --no-cache ttyd

WORKDIR /app

# Set NODE_ENV first - npm ci will skip devDependencies automatically
ENV NODE_ENV=production

# Copy package files and install production deps only
COPY package*.json ./

# Generate package-lock.json if it doesn't exist
# This is needed for npm ci to work in Render deployments
RUN if [ ! -f package-lock.json ]; then \
    echo "package-lock.json not found, generating from package.json..."; \
    npm install --package-lock-only; \
fi && \
npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Create necessary directories
RUN mkdir -p uploads logs

# Don't expose a specific port - Render will set PORT environment variable
# and the server will use process.env.PORT

CMD ["node", "dist/src/server.js"]
