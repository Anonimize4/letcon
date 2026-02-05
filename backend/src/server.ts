import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import dotenv from 'dotenv'
import './config/env'

import { connectDatabase, disconnectDatabase } from './config/database'
import { setupDockerClient } from './config/docker'
import { connectRedis, disconnectRedis, getRedisClient } from './config/redis'

import { errorHandler } from './middleware/error.middleware'
import { notFoundHandler } from './middleware/error.middleware'

import routes from './routes'
import { setupWebSocket } from './websocket'
import { healthCheck } from './health'

import { logger } from './utils/helpers/logger'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === 'production' ? 100 : 1000,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Speed limiting for API calls
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: NODE_ENV === 'production' ? 50 : 200, // allow 50 requests per windowMs without delay
  delayMs: () => 500 // add 500ms delay per request after delayAfter
})

app.use(limiter)
app.use(speedLimiter)

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression
app.use(compression())

// Cookie parsing
app.use(cookieParser())

// Session configuration will be set up after Redis connection in initializeServices()

// Logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Health check
app.get('/health', healthCheck)

// API routes
app.use('/api/v1', routes)

// WebSocket setup
setupWebSocket(io)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully')
  
  httpServer.close(() => {
    logger.info('HTTP server closed')
  })
  
  await disconnectServices()
  process.exit(0)
})

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully')
  
  httpServer.close(() => {
    logger.info('HTTP server closed')
  })
  
  await disconnectServices()
  process.exit(0)
})

async function disconnectServices() {
  try {
    // Close database connections
    await disconnectDatabase()
    
    // Disconnect Redis
    await disconnectRedis()
    
    // Clean up Docker resources
    // await cleanupDockerResources()
    
    logger.info('All services disconnected')
  } catch (error) {
    logger.error('Error during service disconnection:', error)
  }
}

// Setup session middleware after Redis is connected
function setupSessionMiddleware() {
  // Session configuration
  if (NODE_ENV === 'production') {
    app.set('trust proxy', 1)
  }

  // Configure session store
  let sessionStore: any = undefined

  // Try to use Redis store if available
  try {
    const redisClient = getRedisClient()
    if (redisClient) {
      const RedisStore = require('connect-redis')(session)
      sessionStore = new RedisStore({ client: redisClient })
      logger.info('✅ Using Redis session store')
    } else {
      logger.warn('⚠️  Redis not available, using MemoryStore (not recommended for production)')
    }
  } catch (error) {
    logger.warn('⚠️  Failed to initialize Redis session store, using MemoryStore:', error)
  }

  const sessionConfig: any = {
    secret: process.env.SESSION_SECRET || 'session-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
    },
  }

  app.use(session(sessionConfig))
  logger.info('Session middleware configured')
}

// Initialize services
async function initializeServices() {
  try {
    // Connect to Redis first (for session store)
    await connectRedis()
    
    // Setup session middleware after Redis is connected
    setupSessionMiddleware()
    
    // Connect to database
    await connectDatabase()
    logger.info('Database connected')
    
    // Setup Docker client
    await setupDockerClient()
    logger.info('Docker client configured')
    
    // Start server
    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`)
    })
  } catch (error) {
    logger.error('Failed to initialize services:', error)
    process.exit(1)
  }
}

// Start the application
initializeServices()

export { app, io }
