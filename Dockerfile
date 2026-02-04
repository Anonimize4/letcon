# Dockerfile for LETHCON Backend
# Optimized for Render deployment

FROM node:20-alpine AS builder

WORKDIR /app

# Copy from backend subfolder
COPY backend/package*.json ./
RUN npm ci

# Copy backend source
COPY backend/ ./

# Prisma generate before build
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy only production dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/prisma ./prisma

# Create necessary directories
RUN mkdir -p uploads logs

ENV NODE_ENV=production
EXPOSE 10000

CMD ["node", "dist/server.js"]

