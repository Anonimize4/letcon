import { userDB, labDB } from '../src/config/database'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Starting database seeding...')

  // ==========================================
  // LETHCON Test Users (Targeting userDB - Neon)
  // ==========================================
  
  const lethconAdminPassword = await bcrypt.hash('Password123', 12)
  const lethconAdmin = await userDB.user.upsert({
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

  const lethconUserPassword = await bcrypt.hash('Password123', 12)
  const lethconUser = await userDB.user.upsert({
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

  // ==========================================
  // System Accounts (Targeting userDB - Neon)
  // ==========================================
  const adminPassword = await bcrypt.hash('Admin@2024!', 12)
  await userDB.user.upsert({
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

  const demoPassword = await bcrypt.hash('User@2024!', 12)
  await userDB.user.upsert({
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
