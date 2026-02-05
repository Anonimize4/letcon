import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cybersecurity-training-backend-helpers' },
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

// Validator helper functions
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

export function isValidUsername(username: string): boolean {
  // 3-20 characters, alphanumeric and underscore only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  return usernameRegex.test(username)
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function validateApiKey(apiKey: string): boolean {
  return apiKey.length >= 32 && apiKey.startsWith('lethcon_')
}

export function isValidDockerContainerId(containerId: string): boolean {
  const containerIdRegex = /^[a-f0-9]{64}$/
  return containerIdRegex.test(containerId)
}

export function isValidLabId(labId: string): boolean {
  const labIdRegex = /^[a-zA-Z0-9-]{1,50}$/
  return labIdRegex.test(labId)
}

export function isValidChallengeId(challengeId: string): boolean {
  const challengeIdRegex = /^[a-zA-Z0-9-]{1,50}$/
  return challengeIdRegex.test(challengeId)
}

