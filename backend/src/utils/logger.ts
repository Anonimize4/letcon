import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cybersecurity-training-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

export { logger }

// Additional logging utilities
export function createModuleLogger(moduleName: string) {
  return {
    info: (message: string, meta?: Record<string, unknown>) => {
      logger.info(message, { module: moduleName, ...meta })
    },
    error: (message: string, error?: Error) => {
      logger.error(message, { module: moduleName, error: error?.message, stack: error?.stack })
    },
    warn: (message: string, meta?: Record<string, unknown>) => {
      logger.warn(message, { module: moduleName, ...meta })
    },
    debug: (message: string, meta?: Record<string, unknown>) => {
      logger.debug(message, { module: moduleName, ...meta })
    }
  }
}

export type LogLevel = 'info' | 'error' | 'warn' | 'debug'

export function setLogLevel(level: LogLevel): void {
  logger.level = level
}

