import { PrismaClient as UserClient } from '@prisma-user/client'
import { PrismaClient as LabClient } from '@prisma-lab/client'
import config from '../src/config/env'

const globalForPrisma = globalThis as unknown as {
  userDB: UserClient | undefined
  labDB: LabClient | undefined
}

// 1. Initialize the User Database (Neon / Cloud)
export const userDB =
  globalForPrisma.userDB ??
  new UserClient({
    log: config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })

// 2. Initialize the Lab Database (Local PC / Datacenter)
export const labDB =
  globalForPrisma.labDB ??
  new LabClient({
    log: config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })

// Prevent multiple instances during Hot Module Replacement (HMR) in development
if (config.NODE_ENV !== 'production') {
  globalForPrisma.userDB = userDB
  globalForPrisma.labDB = labDB
}

// Export a default object for compatibility, though named exports are preferred
export default { userDB, labDB }
