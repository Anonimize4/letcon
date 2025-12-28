import prisma from '../../prisma/client'

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
}

export default prisma
