import { PrismaClient } from '@prisma/client'
import config from '../src/config/env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })

if (config.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
