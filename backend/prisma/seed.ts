import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

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

  // Create lab categories
  const categories = [
    {
      name: 'Web Security',
      description: 'Learn about web application vulnerabilities and defenses',
      icon: '🌐',
      color: '#3B82F6',
    },
    {
      name: 'Network Security',
      description: 'Master network protocols and security concepts',
      icon: '🔒',
      color: '#10B981',
    },
    {
      name: 'Cryptography',
      description: 'Understand encryption and cryptographic protocols',
      icon: '🔐',
      color: '#8B5CF6',
    },
    {
      name: 'System Security',
      description: 'Learn operating system and system-level security',
      icon: '💻',
      color: '#F59E0B',
    },
    {
      name: 'Malware Analysis',
      description: 'Analyze and understand malicious software',
      icon: '🦠',
      color: '#EF4444',
    },
  ]

  for (const category of categories) {
    await prisma.labCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  console.log('✅ Created lab categories:', categories.length)

  // Create sample labs
  const webSecurityCategory = await prisma.labCategory.findUnique({
    where: { name: 'Web Security' },
  })

  if (webSecurityCategory) {
    const sampleLabs = [
      {
        title: 'SQL Injection Basics',
        description: 'Learn the fundamentals of SQL injection vulnerabilities and how to prevent them',
        difficulty: 'BEGINNER',
        dockerImage: 'cybersec-labs/sql-injection-basic',
        port: 3000,
        environment: {
          DB_HOST: 'localhost',
          DB_NAME: 'vulnerable_app',
        },
        instructions: 'Find and exploit the SQL injection vulnerability to retrieve the flag.',
        hints: [
          'Look for login forms that might be vulnerable',
          'Try using SQL syntax in input fields',
          'Consider using UNION-based injection',
        ],
        flag: 'FLAG{SQL_INJECTION_MASTER}',
        estimatedTime: 45,
        tags: ['sql', 'injection', 'web', 'database'],
        objectives: [
          'Identify SQL injection vulnerabilities',
          'Exploit basic SQL injection',
          'Understand prevention techniques',
        ],
        prerequisites: [
          'Basic SQL knowledge',
          'Understanding of HTTP requests',
        ],
        categoryId: webSecurityCategory.id,
      },
      {
        title: 'Cross-Site Scripting (XSS)',
        description: 'Discover and exploit XSS vulnerabilities in web applications',
        difficulty: 'INTERMEDIATE',
        dockerImage: 'cybersec-labs/xss-challenge',
        port: 8080,
        environment: {
          APP_ENV: 'vulnerable',
        },
        instructions: 'Find a way to inject JavaScript that executes in other users browsers.',
        hints: [
          'Look for user input that gets reflected back',
          'Try different XSS payload variations',
          'Check both reflected and stored XSS',
        ],
        flag: 'FLAG{XSS_EXPERT_FOUND}',
        estimatedTime: 60,
        tags: ['xss', 'javascript', 'web', 'client-side'],
        objectives: [
          'Identify XSS vulnerabilities',
          'Craft effective XSS payloads',
          'Understand XSS impact and prevention',
        ],
        prerequisites: [
          'JavaScript knowledge',
          'Understanding of web browsers',
          'Basic HTML knowledge',
        ],
        categoryId: webSecurityCategory.id,
      },
    ]

    for (const lab of sampleLabs) {
      const existingLab = await prisma.lab.findFirst({
        where: { title: lab.title },
      })
      
      if (!existingLab) {
        await prisma.lab.create({
          data: {
            ...lab,
            difficulty: lab.difficulty as any, // Cast to any to handle enum
          },
        })
      }
    }

    console.log('✅ Created sample labs:', sampleLabs.length)
  }

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
