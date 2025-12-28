import { createWriteStream, WriteStream } from 'fs'
import { join } from 'path'

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

class Logger {
  private logStream?: WriteStream
  private logLevel: LogLevel = LogLevel.INFO

  constructor() {
    this.initializeLogger()
  }

  private initializeLogger() {
    const logDir = process.env.LOG_DIR || 'logs'
    const logFile = join(logDir, 'app.log')

    try {
      this.logStream = createWriteStream(logFile, { flags: 'a' })
    } catch (error) {
      console.error('Failed to create log stream:', error)
    }

    // Set log level from environment
    const envLogLevel = process.env.LOG_LEVEL?.toUpperCase()
    if (envLogLevel && Object.values(LogLevel).includes(envLogLevel as LogLevel)) {
      this.logLevel = envLogLevel as LogLevel
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG]
    return levels.indexOf(level) <= levels.indexOf(this.logLevel)
  }

  private formatMessage(level: LogLevel, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString()
    const formattedArgs = args.length > 0 ? ` ${JSON.stringify(args)}` : ''
    return `[${timestamp}] [${level}] ${message}${formattedArgs}`
  }

  private writeLog(level: LogLevel, message: string, ...args: any[]) {
    if (!this.shouldLog(level)) return

    const formattedMessage = this.formatMessage(level, message, ...args)

    // Always log to console
    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedMessage)
        break
      case LogLevel.WARN:
        console.warn(formattedMessage)
        break
      case LogLevel.INFO:
        console.info(formattedMessage)
        break
      case LogLevel.DEBUG:
        console.debug(formattedMessage)
        break
    }

    // Write to file if stream is available
    if (this.logStream) {
      this.logStream.write(formattedMessage + '\n')
    }
  }

  error(message: string, ...args: any[]) {
    this.writeLog(LogLevel.ERROR, message, ...args)
  }

  warn(message: string, ...args: any[]) {
    this.writeLog(LogLevel.WARN, message, ...args)
  }

  info(message: string, ...args: any[]) {
    this.writeLog(LogLevel.INFO, message, ...args)
  }

  debug(message: string, ...args: any[]) {
    this.writeLog(LogLevel.DEBUG, message, ...args)
  }

  close() {
    if (this.logStream) {
      this.logStream.end()
    }
  }
}

export const logger = new Logger()

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.close()
})

process.on('SIGINT', () => {
  logger.close()
})
