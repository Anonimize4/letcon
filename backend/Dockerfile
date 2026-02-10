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

RUN apk add --no-cache ttyd openssl
WORKDIR /app
ENV NODE_ENV=production

# Copy package files and install prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built app and the prisma schemas
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Generate the clients specifically where the code expects them
RUN npx prisma generate --schema=./prisma/schema/neon.prisma
RUN npx prisma generate --schema=./prisma/schema/local.prisma

# Final safety: If your code still insists on looking in @prisma/client, 
# we symlink the generated user client to the default location.
RUN ln -s /app/node_modules/@prisma-user/client /app/node_modules/@prisma/client

RUN mkdir -p uploads logs
EXPOSE 5000
CMD ["node", "dist/src/server.js"]

