import { PrismaClient } from '@prisma/client'
import config from '../src/config/env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma Client for Neon Database
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient()

// Prevent multiple instances during Hot Module Replacement (HMR) in development
if (config.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Export for use throughout the application
export default prisma

