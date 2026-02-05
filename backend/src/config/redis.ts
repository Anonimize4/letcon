import { createClient } from 'redis'
import { logger } from '../utils/helpers/logger'

let redisClient: any = null

export function getRedisClient(): any {
  return redisClient
}

export async function connectRedis(): Promise<void> {
  try {
    const redisUrl = process.env.REDIS_URL || process.env.REDIS_URI
    
    if (!redisUrl) {
      logger.warn('Redis URL not provided, skipping Redis connection')
      return
    }

    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries: number) => {
          if (retries > 10) {
            logger.error('Redis reconnection failed after 10 attempts')
            return false
          }
          return Math.min(retries * 100, 3000)
        }
      }
    })

    redisClient.on('connect', () => {
      logger.info('✅ Redis connected successfully')
    })

    redisClient.on('error', (error: any) => {
      logger.error('❌ Redis connection error:', error)
    })

    redisClient.on('end', () => {
      logger.warn('Redis connection ended')
    })

    await redisClient.connect()
    
    // Test connection
    await redisClient.ping()
    logger.info('✅ Redis client configured successfully')
  } catch (error) {
    logger.error('❌ Redis setup failed:', error)
    redisClient = null
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit()
    redisClient = null
    logger.info('Redis disconnected')
  }
}
