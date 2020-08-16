import { Server } from 'http'
import { constants } from 'os'
import pino from 'pino'
import { ENV } from '../config/constants'
import { Logger } from '../logger/pino'
import { natsWrapper } from '../nats/nats-wrapper'
import * as readiness from '../probes/readiness'

export const subscribeToProcessEvents = ({
  logger,
  server,
}: {
  logger: Logger
  server: Server
}) => {
  process.on(
    'uncaughtException',
    ENV.isDevelopment
      ? (err) => {
          logger.fatal('uncaughtException: %o', err)
          process.exit(1)
        }
      : pino.final(logger as any, (err, finalLogger) => {
          finalLogger.fatal(err, 'uncaughtException')
          process.exit(1)
        }),
  )

  process.on(
    'unhandledRejection',
    ENV.isDevelopment
      ? (err) => {
          logger.fatal('unhandledRejection: %o', err)
          process.exit(1)
        }
      : pino.final(logger as any, (err, finalLogger) => {
          finalLogger.fatal(err, 'unhandledRejection')
          process.exit(1)
        }),
  )

  const signalHandler: NodeJS.SignalsListener = (signal) => {
    logger.info('Received signal: %s', signal)

    if (signal === 'SIGTERM') {
      logger.warn('Initiating graceful shutdown')
      readiness.setStatus(false) // Stop receiving new traffic
      setTimeout(() => {
        logger.warn('Stopping server')
        server.close(() => {
          logger.warn('Server stopped')
          natsWrapper.client.close()
        })
      }, ENV.GRACEFUL_TIMEOUT_MS)
    }
  }

  const UNPROCESSABLE_SIGNALS: Set<string> = new Set([
    'SIGKILL',
    'SIGSTOP',
    'SIGPROF',
  ])

  for (const signal of Object.keys(constants.signals)) {
    if (UNPROCESSABLE_SIGNALS.has(signal)) {
      continue
    }
    process.on(signal, signalHandler)
  }
}
