import pino, { LogFn } from 'pino'
import { ENV } from '../config/constants'

interface Logger {
  trace: LogFn
  debug: LogFn
  info: LogFn
  warn: LogFn
  error: LogFn
  fatal: LogFn
}

export const logger: Logger = pino({
  name: 'auth',
  timestamp: true,
  level: ENV.LOG_LEVEL,
  prettyPrint: ENV.isDevelopment
    ? {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: true,
      }
    : false,
  redact: [],
})
