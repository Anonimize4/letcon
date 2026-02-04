import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // ==========================================
  // LETHCON Test Users
  // ==========================================
  
  // Admin test user: admin@lethcon.com / Password123
  const lethconAdminPassword = await bcrypt.hash('Password123', 12)
  const lethconAdmin = await prisma.user.upsert({
    where: { email: 'admin@lethcon.com' },
    update: {},
    create: {
      email: 'admin@lethcon.com',
      username: 'lethcon_admin',
      password: lethconAdminPassword,
      firstName: 'Admin',
      lastName: 'LETHCON',
      role: 'ADMIN',
    },
  })
  console.log('✅ Created LETHCON admin user:', lethconAdmin.username)

  // User test user: user@lethcon.com / Password123
  const lethconUserPassword = await bcrypt.hash('Password123', 12)
  const lethconUser = await prisma.user.upsert({
    where: { email: 'user@lethcon.com' },
    update: {},
    create: {
      email: 'user@lethcon.com',
      username: 'lethcon_user',
      password: lethconUserPassword,
      firstName: 'User',
      lastName: 'LETHCON',
      role: 'USER',
    },
  })
  console.log('✅ Created LETHCON user:', lethconUser.username)

  // Creator test user: creator@lethcon.com / Password123
  const lethconCreatorPassword = await bcrypt.hash('Password123', 12)
  const lethconCreator = await prisma.user.upsert({
    where: { email: 'creator@lethcon.com' },
    update: {},
    create: {
      email: 'creator@lethcon.com',
      username: 'lethcon_creator',
      password: lethconCreatorPassword,
      firstName: 'Creator',
      lastName: 'LETHCON',
      role: 'CREATOR',
    },
  })
  console.log('✅ Created LETHCON creator user:', lethconCreator.username)

  // ==========================================
  // Create dedicated admin user
  // Credentials: admin / Admin@2024!
  // Access: Full admin dashboard (/admin/*)
  // ==========================================
  const adminPassword = await bcrypt.hash('Admin@2024!', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cybersectraining.com' },
    update: {},
    create: {
      email: 'admin@cybersectraining.com',
      username: 'admin',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Created admin user:', adminUser.username)

  // ==========================================
  // Create dedicated lab creator user
  // Credentials: creator / Creator@2024!
  // Access: Lab creation dashboard (/dashboard/create)
  // ==========================================
  const creatorPassword = await bcrypt.hash('Creator@2024!', 12)
  
  const creatorUser = await prisma.user.upsert({
    where: { email: 'creator@cybersectraining.com' },
    update: {},
    create: {
      email: 'creator@cybersectraining.com',
      username: 'creator',
      password: creatorPassword,
      firstName: 'Lab',
      lastName: 'Creator',
      role: 'CREATOR',
    },
  })

  console.log('✅ Created lab creator user:', creatorUser.username)

  // ==========================================
  // Create demo user for testing
  // Credentials: demo / User@2024!
  // Access: Standard dashboard (/dashboard)
  // ==========================================
  const demoPassword = await bcrypt.hash('User@2024!', 12)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@cybersectraining.com' },
    update: {},
    create: {
      email: 'demo@cybersectraining.com',
      username: 'demo',
      password: demoPassword,
      firstName: 'Demo',
      lastName: 'User',
      role: 'USER',
    },
  })

  console.log('✅ Created demo user:', demoUser.username)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
