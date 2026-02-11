import { PrismaClient } from '@prisma-user/client';
import config from './env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Determine which database URL to use based on environment and purpose
const getDatabaseUrl = () => {
  const isProduction = config.NODE_ENV === 'production'
  
  // In production, always use Neon for user authentication
  if (isProduction) {
    return config.NEON_DATABASE_URL || config.DATABASE_URL
  }
  
  // In development, check if we're specifically testing Neon
  if (process.env.USE_NEON_DB === 'true') {
    return config.NEON_DATABASE_URL
  }
  
  // Default to local database for development
  return config.DATABASE_URL
}

// Initialize Prisma Client with appropriate database URL
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl()
      }
    },
    log: config.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
  })

// Prevent multiple instances during Hot Module Replacement (HMR) in development
if (config.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect()
    
    const dbType = config.NODE_ENV === 'production' ? 'Neon (Production)' : 
                  process.env.USE_NEON_DB === 'true' ? 'Neon (Development)' : 'Local'
    
    console.log(`✅ Database connected successfully (${dbType})`)
    
    // Test the connection with a simple query
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection verified')
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('connection refused')) {
        console.error('💡 Make sure the database server is running and accessible')
      } else if (error.message.includes('authentication failed')) {
        console.error('💡 Check your database credentials in environment variables')
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.error('💡 Database may not exist. Run migrations first.')
      }
    }
    
    throw error
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect()
  console.log('🔌 Database disconnected')
}

// Helper function to check if we're using Neon database
export const isUsingNeonDatabase = (): boolean => {
  const dbUrl = getDatabaseUrl()
  return dbUrl?.includes('neon.tech') || dbUrl?.includes('neon')
}

export default { prisma, connectDatabase, disconnectDatabase, isUsingNeonDatabase }
