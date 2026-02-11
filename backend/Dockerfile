# Dockerfile for LETHCON Backend
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache ttyd openssl

WORKDIR /app

# Copy package files 
# We use npm install because npm ci is too strict for monorepo subfolders
COPY package*.json ./
RUN npm install

# Copy configuration and source
COPY tsconfig.base.json ./
COPY tsconfig.json ./
COPY prisma/ ./prisma/
COPY src/ ./src/

# Generate Prisma client for the build step (using unified schema)
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build TypeScript
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS production

RUN apk add --no-cache ttyd openssl
WORKDIR /app
ENV NODE_ENV=production

# Copy package files and install production dependencies ONLY
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built app and prisma schema
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# RE-GENERATE CLIENTS IN PRODUCTION
# This fixes the "did not initialize" error by building engines for the final OS
RUN npx prisma generate --schema=./prisma/schema.prisma

# Create storage directories
RUN mkdir -p uploads logs

EXPOSE 5000
CMD ["node", "dist/src/server.js"]
