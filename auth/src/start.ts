import { Model } from 'objection'
import pino from 'pino'
import { ENV } from './config/constants'
import { knex } from './database/knex'
import { logger } from './logger/pino'
import { natsWrapper } from './nats/nats-wrapper'
import { app } from './server/server'
import { createAdminUserIfNotExist } from './services/create-admin-user-if-not-exist'

const start = async () => {
  await createAdminUserIfNotExist()

  await natsWrapper.connect(
    ENV.NATS_CLUSTER_ID,
    ENV.NATS_CLIENT_ID,
    ENV.NATS_URL,
  )
  natsWrapper.client.on('close', () => {
    logger.warn('Connection to NATS closed.')
    process.exit()
  })

  app.listen({ port: ENV.PORT }, () => {
    logger.info(`Server listening on port ${ENV.PORT}`)
  })
}

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

Model.knex(knex)

start()
