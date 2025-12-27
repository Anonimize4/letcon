import { createClient } from 'redis'

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

export async function connectRedis(): Promise<void> {
  try {
    await redisClient.connect()
    console.log('✅ Redis connected successfully')
  } catch (error) {
    console.error('❌ Redis connection failed:', error)
    throw error
  }
}

export async function disconnectRedis(): Promise<void> {
  await redisClient.quit()
}

export function getRedisClient() {
  return redisClient
}
