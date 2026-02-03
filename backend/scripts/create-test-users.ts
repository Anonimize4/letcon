import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

interface TestUser {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'USER' | 'CREATOR'
}

const testUsers: TestUser[] = [
  {
    email: 'admin@lethcon.com',
    username: 'lethcon_admin',
    password: 'Password123',
    firstName: 'Admin',
    lastName: 'LETHCON',
    role: 'ADMIN',
  },
  {
    email: 'user@lethcon.com',
    username: 'lethcon_user',
    password: 'Password123',
    firstName: 'User',
    lastName: 'LETHCON',
    role: 'USER',
  },
  {
    email: 'creator@lethcon.com',
    username: 'lethcon_creator',
    password: 'Password123',
    firstName: 'Creator',
    lastName: 'LETHCON',
    role: 'CREATOR',
  },
]

async function createTestUsers() {
  console.log('🚀 Creating LETHCON test users...')
  console.log('=====================================\n')

  for (const userData of testUsers) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12)

      // Create or update user
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          password: hashedPassword,
          role: userData.role,
        },
        create: {
          email: userData.email,
          username: userData.username,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
        },
      })

      console.log(`✅ Created/Updated user:`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Username: ${user.username}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   Password: ${userData.password}`)
      console.log('')
    } catch (error) {
      console.error(`❌ Failed to create user ${userData.email}:`, error)
    }
  }

  console.log('=====================================')
  console.log('✨ Test users creation completed!')
  console.log('\n📝 Test Login Credentials:')
  console.log('-----------------------------------')
  testUsers.forEach((user) => {
    console.log(`${user.role}:`)
    console.log(`  Email: ${user.email}`)
    console.log(`  Password: ${user.password}`)
    console.log(`  Redirect: ${
      user.role === 'ADMIN' ? '/admin' : user.role === 'CREATOR' ? '/dashboard/creator' : '/dashboard'
    }`)
    console.log('')
  })
}

createTestUsers()
  .catch((error) => {
    console.error('❌ Error creating test users:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
