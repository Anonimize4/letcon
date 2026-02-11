import { PrismaClient } from '@prisma/client';
import config from './env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Track connection state
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY_MS = 2000;

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
const createPrismaClient = (): PrismaClient => {
  const dbUrl = getDatabaseUrl();
  
  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl
      }
    },
    log: config.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
  });
};

export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient();

// Prevent multiple instances during Hot Module Replacement (HMR) in development
if (config.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Helper function to check if we're using Neon database
export const isUsingNeonDatabase = (): boolean => {
  const dbUrl = getDatabaseUrl()
  return dbUrl?.includes('neon.tech') || dbUrl?.includes('neon')
}

// Get current connection state
export const getConnectionState = () => isConnected;

// Connect with retry logic
async function connectWithRetry(): Promise<void> {
  const dbUrl = getDatabaseUrl();
  const dbType = isUsingNeonDatabase() ? 'Neon' : 'Local';
  
  console.log(`🔄 Attempting to connect to ${dbType} database...`);
  
  try {
    await prisma.$connect();
    isConnected = true;
    reconnectAttempts = 0;
    
    console.log(`✅ Database connected successfully (${dbType})`);
    
    // Test the connection with a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection verified');
    
  } catch (error) {
    isConnected = false;
    reconnectAttempts++;
    
    console.error(`❌ Database connection failed (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}):`, error);
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('connection refused')) {
        console.error('💡 Make sure the database server is running and accessible');
      } else if (error.message.includes('authentication failed')) {
        console.error('💡 Check your database credentials in environment variables');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.error('💡 Database may not exist. Run migrations first.');
      } else if (error.message.includes('Closed')) {
        console.error('💡 Connection was closed. This may be due to network issues or database server restart.');
      }
    }
    
    // Retry logic
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      const delay = RECONNECT_DELAY_MS * Math.pow(2, reconnectAttempts - 1); // Exponential backoff
      console.log(`🔄 Retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return connectWithRetry();
    } else {
      console.error(`❌ Max reconnection attempts (${MAX_RECONNECT_ATTEMPTS}) reached`);
      throw error;
    }
  }
}

// Ensure connection is active before each operation
async function ensureConnection(): Promise<void> {
  if (!isConnected) {
    console.log('⚠️  Database not connected, attempting to reconnect...');
    await connectWithRetry();
  }
}

export async function connectDatabase(): Promise<void> {
  await connectWithRetry();
}

export async function disconnectDatabase(): Promise<void> {
  try {
    isConnected = false;
    await prisma.$disconnect();
    console.log('🔌 Database disconnected');
  } catch (error) {
    console.error('Error during database disconnect:', error);
  }
}

// Safe query wrapper with auto-reconnect
export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  operationName: string = 'query'
): Promise<T> {
  try {
    await ensureConnection();
    return await queryFn();
  } catch (error) {
    console.error(`❌ ${operationName} failed:`, error);
    
    // Try to reconnect once more
    isConnected = false;
    await ensureConnection();
    
    // Retry the operation
    return await queryFn();
  }
}

export default { 
  prisma, 
  connectDatabase, 
  disconnectDatabase, 
  isUsingNeonDatabase,
  getConnectionState,
  safeQuery
}
