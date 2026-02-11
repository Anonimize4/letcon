import cors from 'cors'
import config from './env'

// Support multiple origins for different environments
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000', // Backend API server
  'http://localhost:5173', // Vite dev server
  'https://lethcon-frontend.vercel.app',
  'https://www.lethcon-frontend.vercel.app',
  'https://lethcon.com',
  'https://www.lethcon.com'
].concat(config.CORS_ORIGIN ? [config.CORS_ORIGIN] : [])

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, curl requests, or server-to-server)
    if (!origin) {
      console.log('CORS: Allowing request with no origin')
      return callback(null, true)
    }
    
    if (allowedOrigins.includes(origin)) {
      console.log(`CORS: Allowing origin: ${origin}`)
      callback(null, true)
    } else {
      console.error(`CORS: Blocked origin: ${origin}`)
      console.error(`CORS: Allowed origins: ${allowedOrigins.join(', ')}`)
      callback(new Error(`Not allowed by CORS - Origin: ${origin}`), false)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}

export default cors(corsOptions)
