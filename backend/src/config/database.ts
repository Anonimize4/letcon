import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default { prisma }

// Backward compatibility exports
export const isUsingNeonDatabase = (): boolean => {
  const dbUrl = process.env.DATABASE_URL || process.env.DIRECT_URL
  return dbUrl?.includes('neon.tech') || dbUrl?.includes('neon') || false
}

export const getConnectionState = (): boolean => true

export async function connectDatabase(): Promise<void> {
  await prisma.$connect()
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect()
}

export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  _operationName: string = 'query'
): Promise<T> {
  return await queryFn()
}
