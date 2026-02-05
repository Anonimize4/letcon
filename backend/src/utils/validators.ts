// General validation utilities for the application

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email) {
    errors.push('Email is required')
  } else if (!emailRegex.test(email)) {
    errors.push('Invalid email format')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []
  
  if (!password) {
    errors.push('Password is required')
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  } else if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  } else if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  } else if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateUsername(username: string): ValidationResult {
  const errors: string[] = []
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  
  if (!username) {
    errors.push('Username is required')
  } else if (username.length < 3) {
    errors.push('Username must be at least 3 characters')
  } else if (username.length > 20) {
    errors.push('Username must be less than 20 characters')
  } else if (!usernameRegex.test(username)) {
    errors.push('Username can only contain alphanumeric characters and underscores')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isValidPort(port: number): boolean {
  return port >= 1 && port <= 65535
}

export function isValidIpAddress(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipv4Regex.test(ip)
}

export function isValidHexColor(color: string): boolean {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexColorRegex.test(color)
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized as T
}

