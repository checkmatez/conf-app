import { Model } from 'objection'
import pino from 'pino'
import { ENV } from './config/constants'
import { knex } from './database/knex'
import { UserSignedUpListener } from './events/listeners/user-signed-up-listener'
import { logger } from './logger/pino'
import { natsWrapper } from './nats/nats-wrapper'
import { app } from './server/server'

Model.knex(knex)

const start = async () => {
  await natsWrapper.connect(
    ENV.NATS_CLUSTER_ID,
    ENV.NATS_CLIENT_ID,
    ENV.NATS_URL,
  )
  natsWrapper.client.on('close', () => {
    logger.warn('Connection to NATS closed.')
    process.exit()
  })

  new UserSignedUpListener(natsWrapper.client).listen()

  app.listen({ port: ENV.PORT }, () => {
    logger.info(`🚀  Server ready at ${ENV.PORT}`)
  })
}

start()

process.on(
  'uncaughtException',
  pino.final(logger as any, (err, finalLogger) => {
    finalLogger.error(err, 'uncaughtException')
    process.exit(1)
  }),
)

process.on(
  'unhandledRejection',
  pino.final(logger as any, (err, finalLogger) => {
    finalLogger.error(err, 'unhandledRejection')
    process.exit(1)
  }),
)
