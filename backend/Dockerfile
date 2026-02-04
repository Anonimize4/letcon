# Dockerfile for LETHCON Backend
# Optimized for Render deployment

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY src/ ./
COPY prisma/ ./

# Prisma generate before build
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Set NODE_ENV first - npm ci will skip devDependencies automatically
ENV NODE_ENV=production

# Copy package files and install production deps only
COPY package*.json ./
RUN npm ci

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Create necessary directories
RUN mkdir -p uploads logs

EXPOSE 10000

CMD ["node", "dist/server.js"]

