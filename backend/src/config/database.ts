import { PrismaClient } from '@prisma-user/client';
import config from './env'

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

export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect()
  console.log('🔌 Database disconnected')
}

export default { prisma, connectDatabase, disconnectDatabase }
