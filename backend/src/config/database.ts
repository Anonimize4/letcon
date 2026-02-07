import { userDB, labDB } from '../../prisma/client'

export async function connectDatabase(): Promise<void> {
  try {
    // Connect to both databases individually
    await userDB.$connect()
    await labDB.$connect()
    console.log('✅ Databases (User & Lab) connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

export async function disconnectDatabase(): Promise<void> {
  // Disconnect both instances
  await Promise.all([
    userDB.$disconnect(),
    labDB.$disconnect()
  ])
  console.log('🔌 Databases disconnected')
}

// Export the instances directly for usage throughout the app
export { userDB, labDB }
export default { userDB, labDB }
