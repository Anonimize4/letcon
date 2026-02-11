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

// --- CONFIGURATION CONSTANTS ---
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'
// Synchronized with Vite default port (5173)
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: ALLOWED_ORIGIN,
    credentials: true,
  },
})

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      // Added localhost:5000 and the allowed origin to prevent CSP blocking API/WS calls
      connectSrc: ["'self'", "ws:", "wss:", "http://localhost:5000", ALLOWED_ORIGIN],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: NODE_ENV === 'production' ? 100 : 1000,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Speed limiting
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: NODE_ENV === 'production' ? 50 : 200,
  delayMs: () => 500 
})

app.use(limiter)
app.use(speedLimiter)

// Updated CORS configuration to match Vite frontend
app.use(cors({
  origin: ALLOWED_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(compression())
app.use(cookieParser())

// Logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Routes
app.get('/health', healthCheck)
app.use('/api/v1', routes)

// WebSocket setup
setupWebSocket(io)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

// Graceful shutdown logic
const shutdown = async (signal: string) => {
  logger.info(`${signal} received, shutting down gracefully`)
  httpServer.close(async () => {
    logger.info('HTTP server closed')
    await disconnectServices()
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

async function disconnectServices() {
  try {
    await disconnectDatabase()
    await disconnectRedis()
    logger.info('All services disconnected')
  } catch (error) {
    logger.error('Error during service disconnection:', error)
  }
}

function setupSessionMiddleware() {
  if (NODE_ENV === 'production') {
    app.set('trust proxy', 1)
  }

  let sessionStore: any = undefined

  try {
    const redisClient = getRedisClient()
    if (redisClient) {
      const RedisStore = require('connect-redis').default || require('connect-redis');
      sessionStore = new RedisStore({ client: redisClient })
      logger.info('✅ Using Redis session store')
    } else {
      logger.warn('⚠️  Redis not available, using MemoryStore')
    }
  } catch (error) {
    logger.warn('⚠️  Failed to initialize Redis session store:', error)
  }

  const sessionConfig: any = {
    secret: process.env.SESSION_SECRET || 'session-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
    },
  }

  app.use(session(sessionConfig))
  logger.info('Session middleware configured')
}

async function initializeServices() {
  try {
    await connectRedis()
    setupSessionMiddleware()
    await connectDatabase()
    logger.info('Database connected')
    await setupDockerClient()
    logger.info('Docker client configured')
    
    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`)
      logger.info(`Accepting requests from: ${ALLOWED_ORIGIN}`)
    })
  } catch (error) {
    logger.error('Failed to initialize services:', error)
    process.exit(1)
  }
}

initializeServices()

export { app, io }
