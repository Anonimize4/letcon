import { PrismaClient as UserPrismaClient } from '@prisma-user/client'
import { PrismaClient as LabPrismaClient } from '../../node_modules/.prisma/client'

// Initialize the clients
const userDB = new UserPrismaClient()
// labDB is only initialized in development, otherwise it's null
const labDB = process.env.NODE_ENV === 'development' ? new LabPrismaClient() : null


export async function connectDatabase(): Promise<void> {
  try {
    // Always connect the User DB (Neon / Cloud)
    await userDB.$connect()

    // Connect the Lab DB only if it is initialized (non-production)
    if (labDB) {
      await labDB.$connect()
      console.log('✅ Databases (User & Lab) connected successfully')
    } else {
      console.log('✅ User DB connected. Lab DB is disabled in this environment')
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

export async function disconnectDatabase(): Promise<void> {
  // Disconnect both instances (labDB may be null in production)
  await Promise.all([
    userDB.$disconnect(),
    labDB ? labDB.$disconnect() : Promise.resolve()
  ])
  console.log('🔌 Databases disconnected')
}

// Export the instances directly for usage throughout the app
export { userDB, labDB }
export default { userDB, labDB }
