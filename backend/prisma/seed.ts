import { prisma } from '../src/config/database';
import * as bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Starting database seeding...')

  // ==========================================
  // LETHCON Users (Targeting prisma - Neon)
  // ==========================================
  
  const adminPassword = await bcrypt.hash('Admin@2024!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lethcon.com' },
    update: {},
    create: {
      email: 'admin@lethcon.com',
      username: 'admin',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  })
  console.log('✅ Created admin user:', admin.username)

  const demoPassword = await bcrypt.hash('User@2024!', 12)
  const demo = await prisma.user.upsert({
    where: { email: 'demo@lethcon.com' },
    update: {},
    create: {
      email: 'demo@lethcon.com',
      username: 'demo',
      password: demoPassword,
      firstName: 'Demo',
      lastName: 'User',
      role: 'USER',
    },
  })
  console.log('✅ Created demo user:', demo.username)

  const labcreatorPassword = await bcrypt.hash('LabCreator@2024!', 12)
  const labcreator = await prisma.user.upsert({
    where: { email: 'labcreator@lethcon.com' },
    update: {},
    create: {
      email: 'labcreator@lethcon.com',
      username: 'labcreator',
      password: labcreatorPassword,
      firstName: 'Lab',
      lastName: 'Creator',
      role: 'LAB_CREATOR',
    },
  })
  console.log('✅ Created labcreator user:', labcreator.username)

  // ==========================================
  // Example for Lab Seeding (Targeting prisma - Local)
  // ==========================================
  // If you add Lab seeds later, use:
  // await prisma.lab.upsert(...)

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
