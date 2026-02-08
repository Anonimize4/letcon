import { PrismaClient as UserClient } from '@prisma-user/client'
import type { PrismaClient as LabClientType } from '@prisma-lab/client'
import config from '../src/config/env'

const globalForPrisma = globalThis as unknown as {
  userDB: UserClient | undefined
  labDB: LabClientType | null | undefined
}

// 1. Initialize the User Database (Neon / Cloud)
export const userDB =
  globalForPrisma.userDB ??
  new UserClient({
    log: config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })

// 2. Initialize the Lab Database (Local PC / Datacenter)
// In production (e.g., Render), skip creating the lab client to avoid connecting to localhost
let labClient: LabClientType | null = null
if (config.NODE_ENV !== 'production') {
  const { PrismaClient: LabClient } = require('@prisma-lab/client') as { PrismaClient: LabClientType }
  labClient =
    (globalForPrisma.labDB as LabClientType | null) ??
    new LabClient({
      log: config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      errorFormat: 'pretty',
    })
}

export const labDB = labClient as LabClientType | null

// Prevent multiple instances during Hot Module Replacement (HMR) in development
if (config.NODE_ENV !== 'production') {
  globalForPrisma.userDB = userDB
  globalForPrisma.labDB = labDB ?? undefined
}

// Export a default object for compatibility, though named exports are preferred
export default { userDB, labDB }
