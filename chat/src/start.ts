import { Model } from 'objection'
import { ENV } from './config/constants'
import { knex } from './database/knex'
import { UserSignedUpListener } from './events/listeners/user-signed-up-listener'
import { natsWrapper } from './nats/nats-wrapper'
import { server } from './server/server'

Model.knex(knex)

const start = async () => {
  await natsWrapper.connect(
    ENV.NATS_CLUSTER_ID,
    ENV.NATS_CLIENT_ID,
    ENV.NATS_URL,
  )
  natsWrapper.client.on('close', () => {
    console.log('Connection to NATS closed.')
    process.exit()
  })

  new UserSignedUpListener(natsWrapper.client).listen()

  server.listen({ port: ENV.PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

start()
