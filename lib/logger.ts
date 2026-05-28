/**
 * Logging utility for Takhton
 * Centralized logging with environment-aware behavior
 * @module lib/logger
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogMessage {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
}

const isDevelopment = process.env.NODE_ENV === 'development'

class Logger {
  private static instance: Logger

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): LogMessage {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    }
  }

  private shouldLog(level: LogLevel): boolean {
    if (isDevelopment) return true
    // In production, only log warn and above
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error']
    const levelIndex = levels.indexOf(level)
    const minLevelIndex = levels.indexOf('warn')
    return levelIndex >= minLevelIndex
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('debug')) return
    const logMessage = this.formatMessage('debug', message, context)
    // eslint-disable-next-line no-console
    console.log('[DEBUG]', logMessage)
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('info')) return
    const logMessage = this.formatMessage('info', message, context)
    // eslint-disable-next-line no-console
    console.log('[INFO]', logMessage)
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('warn')) return
    const logMessage = this.formatMessage('warn', message, context)
    // eslint-disable-next-line no-console
    console.warn('[WARN]', logMessage)
  }

  error(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('error')) return
    const logMessage = this.formatMessage('error', message, context)
    // eslint-disable-next-line no-console
    console.error('[ERROR]', logMessage)
  }
}

export const logger = Logger.getInstance()
