import dotenv from 'dotenv'
import path from 'path'

// Load environment variables in order of precedence
// 1. .env.local (for local overrides)
// 2. .env.${NODE_ENV} (environment-specific)
// 3. .env (default)
// 4. Look in backend directory first, then project root

const envPaths = [
  path.join(process.cwd(), `.env.local`),
  path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
  path.join(process.cwd(), `.env`),
  path.join(process.cwd(), 'backend', `.env.local`),
  path.join(process.cwd(), 'backend', `.env.${process.env.NODE_ENV || 'development'}`),
  path.join(process.cwd(), 'backend', `.env`)
]

// Load each environment file if it exists
envPaths.forEach(envPath => {
  const result = dotenv.config({ path: envPath })
  if (result.error) {
    // Ignore file not found errors, but log others
    if ('code' in result.error && result.error.code !== 'ENOENT') {
      console.warn(`Warning: Error loading ${envPath}:`, result.error.message)
    }
  } else {
    console.log(`Loaded environment from: ${envPath}`)
  }
})

export interface Config {
  NODE_ENV: string
  PORT: number
  API_VERSION: string
  
  // Database
  DATABASE_URL: string
  DB_HOST: string
  DB_PORT: number
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string
  
  // Supabase
  SUPABASE_URL: string
  SUPABASE_KEY: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  
  // JWT
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  REFRESH_TOKEN_EXPIRES_IN: string
  
  // Docker
  DOCKER_HOST: string
  DOCKER_NETWORK_NAME: string
  CONTAINER_PREFIX: string
  MAX_CONTAINERS_PER_USER: number
  CONTAINER_TIMEOUT: number
  
  // Security
  BCRYPT_ROUNDS: number
  RATE_LIMIT_WINDOW_MS: number
  RATE_LIMIT_MAX_REQUESTS: number
  CORS_ORIGIN: string
  SESSION_SECRET: string
  
  // Email
  SMTP_HOST: string
  SMTP_PORT: number
  SMTP_USER: string
  SMTP_PASS: string
  FROM_EMAIL: string
  
  // File Upload
  MAX_FILE_SIZE: number
  UPLOAD_DIR: string
  ALLOWED_FILE_TYPES: string
  
  // Lab Configuration
  LAB_INSTANCE_TIMEOUT: number
  LAB_MAX_CONCURRENT_SESSIONS: number
  LAB_CLEANUP_INTERVAL: number
  
  // Monitoring
  LOG_LEVEL: string
  ENABLE_METRICS: boolean
  METRICS_PORT: number
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  API_VERSION: process.env.API_VERSION || 'v1',
  
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/cybersecurity_training',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_NAME: process.env.DB_NAME || 'cybersecurity_training',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_KEY: process.env.SUPABASE_KEY || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  
  DOCKER_HOST: process.env.DOCKER_HOST || 'unix:///var/run/docker.sock',
  DOCKER_NETWORK_NAME: process.env.DOCKER_NETWORK_NAME || 'cybersec-training',
  CONTAINER_PREFIX: process.env.CONTAINER_PREFIX || 'cybersec-',
  MAX_CONTAINERS_PER_USER: parseInt(process.env.MAX_CONTAINERS_PER_USER || '5', 10),
  CONTAINER_TIMEOUT: parseInt(process.env.CONTAINER_TIMEOUT || '3600', 10),
  
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  SESSION_SECRET: process.env.SESSION_SECRET || 'session-secret-key',
  
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@cybersectraining.com',
  
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  ALLOWED_FILE_TYPES: process.env.ALLOWED_FILE_TYPES || '.pdf,.doc,.docx,.txt,.md',
  
  LAB_INSTANCE_TIMEOUT: parseInt(process.env.LAB_INSTANCE_TIMEOUT || '1800', 10),
  LAB_MAX_CONCURRENT_SESSIONS: parseInt(process.env.LAB_MAX_CONCURRENT_SESSIONS || '100', 10),
  LAB_CLEANUP_INTERVAL: parseInt(process.env.LAB_CLEANUP_INTERVAL || '300000', 10),
  
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  ENABLE_METRICS: process.env.ENABLE_METRICS === 'true',
  METRICS_PORT: parseInt(process.env.METRICS_PORT || '9090', 10),
}

export default config
