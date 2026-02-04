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

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Create necessary directories
RUN mkdir -p uploads logs

ENV NODE_ENV=production
EXPOSE 10000

CMD ["node", "dist/server.js"]

