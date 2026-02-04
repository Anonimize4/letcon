import { Request, Response } from 'express'
import { logger } from './utils/helpers/logger'

export const healthCheck = (req: Request, res: Response) => {
  try {
    const healthData = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      memory: process.memoryUsage(),
    }

    logger.info('Health check accessed', healthData)
    res.status(200).json(healthData)
  } catch (error) {
    logger.error('Health check failed:', error)
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      message: 'Service unavailable'
    })
  }
}

export default healthCheck
