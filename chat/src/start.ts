require('like-server')
import { Model } from 'objection'
import { ENV } from './config/constants'
import { knex } from './database/knex'
import { UserSignedUpListener } from './events/listeners/user-signed-up-listener'
import { logger } from './logger/pino'
import { natsWrapper } from './nats/nats-wrapper'
import * as liveness from './probes/liveness'
import * as readiness from './probes/readiness'
import { app } from './server/server'
import { subscribeToProcessEvents } from './utils/subscribe-to-process-events'

const start = async () => {
  Model.knex(knex)
  liveness.setStatus(true)
  readiness.setStatus(true)

  await natsWrapper.connect(
    ENV.NATS_CLUSTER_ID,
    ENV.NATS_CLIENT_ID,
    ENV.NATS_URL,
  )
  natsWrapper.client.on('close', () => {
    logger.warn('Connection to NATS closed.')
  })

  new UserSignedUpListener(natsWrapper.client).listen()

  const server = app.listen({ port: ENV.PORT }, () => {
    logger.info(`Server listening on port ${ENV.PORT}`)
  })

  subscribeToProcessEvents({ logger, server })
}

start()
