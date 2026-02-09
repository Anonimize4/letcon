import { userDB, labDB } from '../src/config/database'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Starting database seeding...')

  // ==========================================
  // LETHCON Users (Targeting userDB - Neon)
  // ==========================================
  
  const adminPassword = await bcrypt.hash('Admin@2024!', 12)
  const admin = await userDB.user.upsert({
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
  const demo = await userDB.user.upsert({
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
  const labcreator = await userDB.user.upsert({
    where: { email: 'labcreator@lethcon.com' },
    update: {},
    create: {
      email: 'labcreator@lethcon.com',
      username: 'labcreator',
      password: labcreatorPassword,
      firstName: 'Lab',
      lastName: 'Creator',
      role: 'LABCREATOR',
    },
  })
  console.log('✅ Created labcreator user:', labcreator.username)

  // ==========================================
  // Example for Lab Seeding (Targeting labDB - Local)
  // ==========================================
  // If you add Lab seeds later, use:
  // await labDB.lab.upsert(...)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    // Correctly disconnect both instances; labDB may be null in production
    await userDB.$disconnect()
    if (labDB) await labDB.$disconnect()
  })
